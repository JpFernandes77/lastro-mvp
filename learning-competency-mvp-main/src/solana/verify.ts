import { Connection } from '@solana/web3.js';
import { verifyHandoff, type ReviewedStateRecord } from '../provenance/trace.js';
import { subjectRef } from './attest.js';

/**
 * M3 — Verificação: dado um record_hash e uma tx_signature,
 * confirma que o hash foi registrado on-chain via Memo Program.
 *
 * Hardening M2 → M3 (opcional, recomendado):
 *  - `record`: recalcula o hash do reviewed-state.json (verifyHandoff) e exige que bata com o hash ancorado;
 *  - `expectedSigner`: exige que a transação tenha sido assinada pela carteira emissora esperada.
 *
 * Uso:
 *   npx tsx src/solana/verify.ts <tx_signature> [record_hash]
 */

export interface VerifyOptions {
  record?: ReviewedStateRecord;
  expectedSigner?: string;
}

export interface VerifyChecks {
  hash_on_chain: boolean;
  record_integrity?: boolean;
  signer?: boolean;
  subject_ref?: boolean;
  payload_binding?: boolean;
}

export interface VerifyResult {
  verified: boolean;
  payload?: object;
  error?: string;
  checks?: VerifyChecks;
  signers?: string[];
}

const MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
const ATTESTATION_VERSION = 'm3.attestation.v2';
const MVP_ID = 'learning-competency';

/** Lista as chaves que assinaram a transação (formato parsed ou legado). */
export function extractSigners(tx: any): string[] {
  const msg = tx?.transaction?.message;
  if (!msg) return [];
  const keys: any[] = msg.accountKeys ?? msg.staticAccountKeys ?? [];
  const required: number | undefined = msg.header?.numRequiredSignatures;
  return keys
    .map((k, i) => {
      const pk = k?.pubkey ?? k;
      const str = typeof pk === 'string' ? pk : pk?.toBase58?.() ?? String(pk);
      const isSigner = typeof k?.signer === 'boolean' ? k.signer : required !== undefined ? i < required : i === 0;
      return isSigner ? str : null;
    })
    .filter((s): s is string => !!s);
}

export async function verifyAttestation(
  recordHash: string,
  txSignature: string,
  networkUrl: string = 'https://api.devnet.solana.com',
  options: VerifyOptions = {}
): Promise<VerifyResult> {
  // 1) Integridade do handoff ANTES de consultar a rede: o JSON precisa gerar o mesmo hash.
  if (options.record) {
    if (!verifyHandoff(options.record)) {
      return { verified: false, error: 'reviewed-state.json foi alterado: o record_hash não confere com o conteúdo.', checks: { hash_on_chain: false, record_integrity: false } };
    }
    if (options.record.record_hash !== recordHash) {
      return { verified: false, error: 'O record_hash informado é diferente do record_hash do reviewed-state.json.', checks: { hash_on_chain: false, record_integrity: false } };
    }
  }

  const connection = new Connection(networkUrl, 'confirmed');

  let tx;
  try {
    tx = await connection.getParsedTransaction(txSignature, {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed',
    });
  } catch (e) {
    return { verified: false, error: `Falha ao buscar transação: ${e}` };
  }

  if (!tx) {
    return { verified: false, error: 'Transação não encontrada na rede.' };
  }

  // Percorre as instruções da transação buscando o Memo Program
  const instructions = tx.transaction.message.instructions;
  let payload: any;

  for (const ix of instructions) {
    if ('programId' in ix && ix.programId.toBase58() === MEMO_PROGRAM_ID) {
      // O Memo Program retorna dados como string parsed
      const parsed = ix as any;
      const memoStr = parsed?.parsed ?? parsed?.data;
      if (!memoStr) continue;

      let candidate: any;
      try {
        candidate = JSON.parse(typeof memoStr === 'string' ? memoStr : Buffer.from(memoStr, 'base64').toString('utf-8'));
      } catch {
        continue;
      }

      if (candidate?.record_hash === recordHash) {
        payload = candidate;
        break;
      }
    }
  }

  if (!payload) {
    return {
      verified: false,
      error: `record_hash "${recordHash}" não encontrado na transação ${txSignature}.`,
      checks: { hash_on_chain: false },
    };
  }

  const checks: VerifyChecks = { hash_on_chain: true };
  if (options.record) checks.record_integrity = true;

  // 2) Binding completo do payload v2 ao reviewed-state: encontrar o hash não basta.
  // A verificação deve provar que a attestation representa exatamente o registro fornecido.
  if (options.record) {
    const expectedSubjectRef = subjectRef(options.record.subject, options.record.record_hash);
    checks.subject_ref = payload?.subject_ref === expectedSubjectRef;

    const binding =
      payload?.mvp === MVP_ID &&
      payload?.v === ATTESTATION_VERSION &&
      payload?.record_hash === options.record.record_hash &&
      payload?.competency === options.record.competency_id &&
      payload?.state === options.record.state &&
      checks.subject_ref === true &&
      (!options.expectedSigner || payload?.attester === options.expectedSigner);

    checks.payload_binding = binding;
    if (!binding) {
      return {
        verified: false,
        payload,
        checks,
        error: 'Payload on-chain não está completamente vinculado ao reviewed-state.json.',
      };
    }
  }

  // 3) Assinante: qualquer carteira pode publicar um memo; só vale se quem assinou foi o emissor esperado.
  const signers = extractSigners(tx);
  if (options.expectedSigner) {
    checks.signer = signers.includes(options.expectedSigner);
    if (!checks.signer) {
      return { verified: false, payload, checks, signers, error: `Transação não foi assinada pelo emissor esperado (${options.expectedSigner}).` };
    }
  }

  // 4) Referência do sujeito (payloads v2 não carregam o subject em claro).
  if (options.record && payload.subject_ref) {
    checks.subject_ref = payload.subject_ref === subjectRef(options.record.subject, options.record.record_hash);
    if (!checks.subject_ref) {
      return { verified: false, payload, checks, signers, error: 'subject_ref on-chain não corresponde ao sujeito do reviewed-state.json.' };
    }
  }

  return { verified: true, payload, checks, signers };
}

// CLI Runner
async function main() {
  const [, , arg1, arg2] = process.argv;

  const txSignature = arg1;
  let recordHash = arg2;

  if (!txSignature) {
    console.error('Uso: npx tsx src/solana/verify.ts <tx_signature> [record_hash]');
    process.exit(1);
  }

  const fs = await import('fs');
  let record: ReviewedStateRecord | undefined;
  try {
    record = JSON.parse(fs.readFileSync('out/reviewed-state.json', 'utf-8'));
  } catch {
    record = undefined;
  }

  if (!recordHash) {
    if (!record) {
      console.error('⚠️ Não foi possível ler out/reviewed-state.json e nenhum record_hash foi passado como argumento.');
      process.exit(1);
    }
    recordHash = record.record_hash;
    console.log(`📖 Lendo record_hash do out/reviewed-state.json: ${recordHash}`);
  }

  // Emissor esperado: ATTESTER_PUBKEY no .env, ou derivado da SOLANA_PRIVATE_KEY.
  let expectedSigner: string | undefined;
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
    expectedSigner = process.env.ATTESTER_PUBKEY;
    if (!expectedSigner && process.env.SOLANA_PRIVATE_KEY) {
      const { Keypair } = await import('@solana/web3.js');
      const bs58 = (await import('bs58')).default;
      expectedSigner = Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_PRIVATE_KEY)).publicKey.toBase58();
    }
  } catch {
    expectedSigner = undefined;
  }

  console.log(`\n🔍 Verificando atestação on-chain...`);
  console.log(`   record_hash : ${recordHash}`);
  console.log(`   tx          : ${txSignature}`);
  console.log(`   integridade : ${record ? 'recalculando hash do out/reviewed-state.json' : '⚠️ sem reviewed-state.json (não verificada)'}`);
  console.log(`   emissor     : ${expectedSigner ?? '⚠️ não configurado (defina ATTESTER_PUBKEY no .env)'}\n`);

  const result = await verifyAttestation(recordHash as string, txSignature as string, undefined, { record, expectedSigner });

  if (result.verified) {
    console.log('✅ VERIFICADO — A atestação existe e o hash confere.');
    console.log(`   checks: ${JSON.stringify(result.checks)}`);
    console.log('\nPayload on-chain:');
    console.log(JSON.stringify(result.payload, null, 2));
  } else {
    console.log(`❌ NÃO VERIFICADO — ${result.error}`);
    if (result.checks) console.log(`   checks: ${JSON.stringify(result.checks)}`);
    process.exit(1);
  }
}

// Só roda a CLI quando executado diretamente (não ao importar nos testes).
const invokedDirectly = process.argv[1] && /verify\.(ts|js)$/.test(process.argv[1]);
if (invokedDirectly) {
  main();
}
