/**
 * M2.1 — Evidence ingestion.
 * Done when: evidence enters the system with source/provenance metadata.
 */
import { EVIDENCE_CONTRACT, REQUIRES_RELATED } from "../domain/useCase.js";
import type { Evidence, EvidenceSubmission, EvidenceType } from "../domain/types.js";
import { defaultEnv, sha256, ValidationError, type Env } from "../util.js";

const TYPES = Object.keys(EVIDENCE_CONTRACT) as EvidenceType[];
const FORMATS = ["markdown", "text", "ipynb", "csv", "url"];
const MAX_CONTENT_BYTES = 2_000_000;

export function validateSubmission(sub: EvidenceSubmission, known: Evidence[] = []): string[] {
  const issues: string[] = [];
  if (!TYPES.includes(sub.type)) issues.push(`type "${sub.type}" não faz parte do contrato de evidência (${TYPES.join(", ")})`);
  else if (!EVIDENCE_CONTRACT[sub.type].activities.includes(sub.activityId))
    issues.push(`evidência "${sub.type}" não é aceita na atividade ${sub.activityId} (aceita: ${EVIDENCE_CONTRACT[sub.type].activities.join(", ")})`);
  if (!sub.submittedBy?.trim()) issues.push("submittedBy é obrigatório");
  if (!sub.sourceRef?.trim()) issues.push("sourceRef é obrigatório (proveniência mínima)");
  if (!FORMATS.includes(sub.format)) issues.push(`format "${sub.format}" inválido`);
  if (!sub.content?.trim()) issues.push("content está vazio");
  else if (Buffer.byteLength(sub.content) > MAX_CONTENT_BYTES) issues.push("content excede o limite do MVP (2 MB)");
  if (sub.format === "ipynb" && sub.content?.trim()) {
    try {
      const nb = JSON.parse(sub.content);
      if (!Array.isArray(nb.cells)) issues.push("ipynb sem lista de cells");
    } catch {
      issues.push("ipynb não é JSON válido");
    }
  }
  if (sub.submittedAt && Number.isNaN(Date.parse(sub.submittedAt))) issues.push("submittedAt não é uma data ISO válida");

  const required = REQUIRES_RELATED[sub.type];
  if (required) {
    const rel = (sub.relatedEvidenceIds ?? []).map((id) => known.find((e) => e.evidence_id === id));
    if (!rel.some((e) => e?.type === required))
      issues.push(`"${sub.type}" precisa referenciar uma evidência "${required}" já ingerida (relatedEvidenceIds)`);
  }
  for (const id of sub.relatedEvidenceIds ?? [])
    if (!known.some((e) => e.evidence_id === id)) issues.push(`relatedEvidenceIds contém id desconhecido: ${id}`);
  return issues;
}

/** Validates and registers one submission. Throws ValidationError with all issues found. */
export function ingestEvidence(sub: EvidenceSubmission, known: Evidence[] = [], env: Env = defaultEnv): Evidence {
  const issues = validateSubmission(sub, known);
  if (issues.length) throw new ValidationError(issues);

  const evidence_id = env.id("ev");
  const ingestedAt = env.now();
  const submitted_at = sub.submittedAt ?? ingestedAt;
  const contentHash = sha256(sub.content);

  return {
    evidence_id,
    type: sub.type,
    source_ref: sub.sourceRef,
    activity_id: sub.activityId,
    submitted_by: sub.submittedBy,
    submitted_at,
    content_ref: `sha256:${contentHash}`,
    format: sub.format,
    content: sub.content,
    related_evidence_ids: sub.relatedEvidenceIds ?? [],
    // Presented evidence starts at N2. N3 only after analysis; N4 is never set by M2.
    trust_level: "N2_EVIDENCE_PRESENTED",
    provenance: {
      sourceRef: sub.sourceRef,
      submittedBy: sub.submittedBy,
      submittedAt: submitted_at,
      activityId: sub.activityId,
      contentHash,
      ingestedAt,
      synthetic: sub.synthetic ?? false,
    },
  };
}

/** Recompute the hash to detect evidence altered after ingestion. */
export function verifyEvidenceIntegrity(ev: Evidence): boolean {
  return sha256(ev.content) === ev.provenance.contentHash && ev.content_ref === `sha256:${ev.provenance.contentHash}`;
}
