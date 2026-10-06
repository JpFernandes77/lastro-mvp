import { describe, expect, it, vi, beforeEach } from "vitest";
import { verifyAttestation } from "../src/solana/verify.js";
import { Connection, PublicKey } from "@solana/web3.js";
import { underVerification } from "./helpers.js";
import type { ReviewedStateRecord } from "../src/provenance/trace.js";

// Mock do @solana/web3.js para simular a rede
vi.mock("@solana/web3.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    Connection: vi.fn(),
    sendAndConfirmTransaction: vi.fn(),
    Keypair: {
      fromSecretKey: vi.fn().mockReturnValue({ publicKey: { toBase58: () => "mocked_pubkey" } }),
    },
  };
});

const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
const ATTESTER = "AttesterPubkey1111111111111111111111111111";
const FAKE_KEY = "4wBqpZM9xaSheZzJSMawUKKwhdpChKbZ5eu5ky4Vigw6X9SHVWJwBR3N9YuSpeaGYNWDuW4GpjdQDQd7Rmh6Zzg2";

/** Handoff real produzido pelo pipeline do M2 (cenário sintético Ana → DEMONSTRATED). */
async function realHandoff(): Promise<ReviewedStateRecord> {
  const { s } = await underVerification();
  const result = s.consensusAdvance();
  if (result.status !== "AGREEMENT") throw new Error(`expected AGREEMENT, got ${result.status}`);
  return s.handoff();
}

const mockTransaction = (memoData: any, opts: { programId?: string; signers?: string[] } = {}) => ({
  transaction: {
    message: {
      accountKeys: (opts.signers ?? []).map((pk) => ({ pubkey: { toBase58: () => pk }, signer: true, writable: true })),
      instructions: [
        {
          programId: new PublicKey(opts.programId ?? MEMO_PROGRAM_ID),
          parsed: typeof memoData === "string" ? memoData : JSON.stringify(memoData),
        },
      ],
    },
  },
});

describe("M3 — Attestation e Verification", () => {
  let mockGetParsedTransaction: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetParsedTransaction = vi.fn();
    (Connection as any).mockImplementation(() => ({ getParsedTransaction: mockGetParsedTransaction }));
  });

  it("3.1: Attestation payload usa o record_hash real e NÃO publica o subject em claro", async () => {
    const { createAttestationOnChain, subjectRef } = await import("../src/solana/attest.js");
    const { sendAndConfirmTransaction } = await import("@solana/web3.js");
    (sendAndConfirmTransaction as any).mockResolvedValue("mock_signature_123");

    const record = await realHandoff();
    const sig = await createAttestationOnChain(record, FAKE_KEY);
    expect(sig).toBe("mock_signature_123");

    const txArg = (sendAndConfirmTransaction as any).mock.calls[0][1];
    expect(txArg.instructions).toHaveLength(1);
    const instruction = txArg.instructions[0];
    expect(instruction.programId.toBase58()).toBe(MEMO_PROGRAM_ID);

    const payloadStr = instruction.data.toString("utf-8");
    const payload = JSON.parse(payloadStr);

    expect(payload.subject).toBeUndefined();
    expect(payloadStr).not.toContain(record.subject);
    expect(payload.subject_ref).toBe(subjectRef(record.subject, record.record_hash));
    expect(payload.competency).toBe(record.competency_id);
    expect(payload.state).toBe("DEMONSTRATED");
    expect(payload.record_hash).toBe(record.record_hash);
    expect(payload.attester).toBe("mocked_pubkey");
    expect(payload.timestamp).toBeDefined();
  });

  it("3.1a: Recusa atestar um estado que não seja DEMONSTRATED", async () => {
    const { createAttestationOnChain } = await import("../src/solana/attest.js");
    const { sendAndConfirmTransaction } = await import("@solana/web3.js");
    const record = await realHandoff();
    const { canonicalJSON, sha256 } = await import("../src/util.js");
    const { record_hash: _hash, ...body } = { ...record, state: "IN_DEVELOPMENT" };
    const nonDemonstrated = { ...body, record_hash: sha256(canonicalJSON(body)) } as ReviewedStateRecord;
    await expect(createAttestationOnChain(nonDemonstrated, FAKE_KEY)).rejects.toThrow(/precisa estar em DEMONSTRATED/);
    expect(sendAndConfirmTransaction).not.toHaveBeenCalled();
  });

  it("3.1b: Recusa atestar um reviewed-state.json adulterado", async () => {
    const { createAttestationOnChain } = await import("../src/solana/attest.js");
    const { sendAndConfirmTransaction } = await import("@solana/web3.js");
    const record = await realHandoff();
    const tampered = { ...record, state: "IN_DEVELOPMENT" };
    await expect(createAttestationOnChain(tampered, FAKE_KEY)).rejects.toThrow(/Handoff inválido/);
    expect(sendAndConfirmTransaction).not.toHaveBeenCalled();
  });

  it("3.1 e 3.2: Payload legado (v1) continua verificável pelo hash (compatibilidade)", async () => {
    const validPayload = {
      mvp: "learning-competency",
      subject: "ana@synthetic.com",
      competency: "LID-01",
      state: "DEMONSTRATED",
      record_hash: "hash_correto_123",
      timestamp: new Date().toISOString(),
    };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(validPayload));

    const result = await verifyAttestation("hash_correto_123", "tx_valid");
    expect(result.verified).toBe(true);
    const payload = result.payload as any;
    expect(payload.record_hash).toBe("hash_correto_123");
    expect(payload.competency).toBe("LID-01");
    expect(payload.state).toBe("DEMONSTRATED");
  });

  it("3.4: Verificação negativa (hash incorreto)", async () => {
    const validPayload = { mvp: "learning-competency", competency: "LID-01", state: "DEMONSTRATED", record_hash: "hash_diferente_999" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(validPayload));

    const result = await verifyAttestation("hash_correto_123", "tx_valid");
    expect(result.verified).toBe(false);
    expect(result.error).toContain("não encontrado");
  });

  it("3.5: Memo inválido / malformado é ignorado/rejeitado", async () => {
    mockGetParsedTransaction.mockResolvedValue(mockTransaction("não é json"));
    let result = await verifyAttestation("hash_correto_123", "tx_invalid");
    expect(result.verified).toBe(false);

    mockGetParsedTransaction.mockResolvedValue(mockTransaction({ competency: "LID-01" }));
    result = await verifyAttestation("hash_correto_123", "tx_invalid2");
    expect(result.verified).toBe(false);
  });

  it("3.5: Rejeita quando a transação não é encontrada", async () => {
    mockGetParsedTransaction.mockResolvedValue(null);
    const result = await verifyAttestation("hash_correto_123", "tx_not_found");
    expect(result.verified).toBe(false);
    expect(result.error).toContain("não encontrada");
  });
});

describe("Hardening do handoff M2 → M3", () => {
  let mockGetParsedTransaction: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetParsedTransaction = vi.fn();
    (Connection as any).mockImplementation(() => ({ getParsedTransaction: mockGetParsedTransaction }));
  });

  async function anchored(record: ReviewedStateRecord, signers = [ATTESTER]) {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(buildAttestationPayload(record, ATTESTER), { signers }));
  }

  // 1) verify recalcula o hash do reviewed-state.json via verifyHandoff()
  it("H1: reviewed-state.json íntegro + emissor correto → verificado com todos os checks", async () => {
    const record = await realHandoff();
    await anchored(record);
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(true);
    expect(r.checks).toEqual({ hash_on_chain: true, record_integrity: true, payload_binding: true, signer: true, subject_ref: true });
  });

  it("H1: JSON adulterado mantendo o hash antigo → falha (antes passava)", async () => {
    const record = await realHandoff();
    await anchored(record);
    const tampered = { ...record, state: "DEMONSTRATED", criteria: record.criteria.map((c) => ({ ...c, final_assessment: "supports" })), synthetic: false };
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record: tampered });
    expect(r.verified).toBe(false);
    expect(r.error).toMatch(/foi alterado/);
    expect(r.checks?.record_integrity).toBe(false);
    expect(mockGetParsedTransaction).not.toHaveBeenCalled();
  });

  it("H1: record_hash informado diferente do JSON → falha", async () => {
    const record = await realHandoff();
    await anchored(record);
    const r = await verifyAttestation("outro_hash", "tx", undefined, { record });
    expect(r.verified).toBe(false);
    expect(r.error).toMatch(/diferente/);
  });

  // 2) validação do signer
  it("H2: memo com o mesmo hash publicado por outra carteira → falha", async () => {
    const record = await realHandoff();
    await anchored(record, ["CarteiraQualquer111111111111111111111111111"]);
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.signer).toBe(false);
    expect(r.error).toMatch(/emissor esperado/);
  });

  it("H2: lista os assinantes da transação", async () => {
    const record = await realHandoff();
    await anchored(record, [ATTESTER]);
    const r = await verifyAttestation(record.record_hash, "tx");
    expect(r.signers).toEqual([ATTESTER]);
  });

  // 3) subject fora do payload on-chain
  it("H3: subject_ref on-chain precisa corresponder ao sujeito do JSON", async () => {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    const record = await realHandoff();
    const payload = { ...buildAttestationPayload(record, ATTESTER), subject_ref: "ref_de_outra_pessoa" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(payload, { signers: [ATTESTER] }));
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.subject_ref).toBe(false);
  });

  it("H4: payload com competência divergente falha mesmo com record_hash correto", async () => {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    const record = await realHandoff();
    const payload = { ...buildAttestationPayload(record, ATTESTER), competency: "competency:other" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(payload, { signers: [ATTESTER] }));
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.payload_binding).toBe(false);
  });

  it("H4: payload com estado divergente falha mesmo com record_hash correto", async () => {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    const record = await realHandoff();
    const payload = { ...buildAttestationPayload(record, ATTESTER), state: "IN_DEVELOPMENT" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(payload, { signers: [ATTESTER] }));
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.payload_binding).toBe(false);
  });

  it("H4: payload com versão ou MVP divergente falha", async () => {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    const record = await realHandoff();
    const versionPayload = { ...buildAttestationPayload(record, ATTESTER), v: "m3.attestation.v1" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(versionPayload, { signers: [ATTESTER] }));
    let r = await verifyAttestation(record.record_hash, "tx-version", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.payload_binding).toBe(false);

    const mvpPayload = { ...buildAttestationPayload(record, ATTESTER), mvp: "other-mvp" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(mvpPayload, { signers: [ATTESTER] }));
    r = await verifyAttestation(record.record_hash, "tx-mvp", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.payload_binding).toBe(false);
  });

  it("H4: attester divergente falha quando o emissor esperado está configurado", async () => {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    const record = await realHandoff();
    const payload = { ...buildAttestationPayload(record, "OutraCarteira111111111111111111111111111") };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(payload, { signers: [ATTESTER] }));
    const r = await verifyAttestation(record.record_hash, "tx", undefined, { record, expectedSigner: ATTESTER });
    expect(r.verified).toBe(false);
    expect(r.checks?.payload_binding).toBe(false);
  });

  it("H3: payload on-chain não contém o subject em claro", async () => {
    const { buildAttestationPayload } = await import("../src/solana/attest.js");
    const record = await realHandoff();
    const json = JSON.stringify(buildAttestationPayload(record, ATTESTER));
    expect(json).not.toContain(record.subject);
    expect(json).not.toContain('"subject"');
  });
});
