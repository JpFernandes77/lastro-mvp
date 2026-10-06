import { Connection, Keypair, Transaction, PublicKey, sendAndConfirmTransaction, TransactionInstruction } from '@solana/web3.js';
import bs58 from 'bs58';
import { verifyHandoff, type ReviewedStateRecord } from '../provenance/trace.js';
import { sha256 } from '../util.js';

// Endereço do Memo Program nativo da Solana (usado para registrar dados arbitrários off-chain)
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export const ATTESTATION_VERSION = 'm3.attestation.v2';

/**
 * Referência pseudônima do sujeito: nunca publicamos o `subject` em texto aberto.
 * Usa o record_hash como "sal": só quem tem o reviewed-state.json consegue recalcular e conferir.
 */
export function subjectRef(subject: string, recordHash: string): string {
  return sha256(`${subject}|${recordHash}`);
}

/** Payload mínimo que vai on-chain (hardening M2 → M3: sem dados pessoais em claro). */
export function buildAttestationPayload(record: ReviewedStateRecord, attester: string) {
  return {
    mvp: 'learning-competency',
    v: ATTESTATION_VERSION,
    subject_ref: subjectRef(record.subject, record.record_hash),
    competency: record.competency_id,
    state: record.state,
    record_hash: record.record_hash, // Hash principal (âncora)
    attester,
    timestamp: new Date().toISOString(),
  };
}

/**
 * M3.2: Registra a atestação de competência na Solana.
 * O payload é enxuto, priorizando o record_hash (comprovante de integridade).
 * Recusa registros cujo record_hash não confere com o conteúdo (handoff adulterado).
 */
export async function createAttestationOnChain(
  record: ReviewedStateRecord,
  signerPrivateKeyBase58: string,
  networkUrl: string = 'https://api.devnet.solana.com'
): Promise<string> {
  if (!verifyHandoff(record)) {
    throw new Error('Handoff inválido: o record_hash não confere com o conteúdo do reviewed-state.json. Atestação recusada.');
  }
  if (record.state !== 'DEMONSTRATED' || !record.decision.confirm_demonstrated) {
    throw new Error('Atestação recusada: o reviewed-state precisa estar em DEMONSTRATED com decisão válida.');
  }

  const connection = new Connection(networkUrl, 'confirmed');
  const signer = Keypair.fromSecretKey(bs58.decode(signerPrivateKeyBase58));

  const attestationPayload = buildAttestationPayload(record, signer.publicKey.toBase58());
  const memoData = Buffer.from(JSON.stringify(attestationPayload), 'utf-8');

  // Instrução do Memo Program
  const memoInstruction = new TransactionInstruction({
    keys: [{ pubkey: signer.publicKey, isSigner: true, isWritable: true }],
    programId: MEMO_PROGRAM_ID,
    data: memoData,
  });

  const transaction = new Transaction().add(memoInstruction);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [signer]);
    return signature;
  } catch (error) {
    throw new Error(`Falha ao registrar atestação na Solana: ${error}`);
  }
}
