/**
 * Provenance for the canonical MVP decision path.
 *
 * The trace preserves evidence, AI interpretation, independent verification /
 * consensus and, only when conflict occurs, human adjudication.
 *
 * The M2 → M3 handoff contains references and hashes only. Raw evidence never
 * enters the handoff or the future attestation payload.
 */
import { EVIDENCE_CONTRACT } from "../domain/useCase.js";
import type { AdjudicationOutcome } from "../adjudication/adjudication.js";
import type {
  CompetencyState,
  CriterionId,
  Evidence,
  ExtractionResult,
  Origin,
} from "../domain/types.js";
import type { AIInterpretation } from "../ai/contract.js";
import type { RelationResult } from "../relation/relate.js";
import type { ConsensusResult } from "../consensus/consensus.js";
import { canonicalJSON, sha256 } from "../util.js";

export interface TraceNode {
  origin: Origin;
  kind:
    | "evidence"
    | "extracted_field"
    | "ai_signal"
    | "adjudication_decision"
    | "consensus_decision"
    | "final";
  ref: string;
  detail: string;
}

export interface CriterionTrace {
  criterion_id: CriterionId;
  chain: TraceNode[];
}

export interface ProvenanceTrace {
  subject: string;
  interpretation: { id: string; model: string };
  criteria: CriterionTrace[];
  rejected_ai_citations: Array<{ signal_id: string; evidence_id: string; reason: string }>;
  invalid_ai_signals: RelationResult["invalid_signals"];
}

export function buildTrace(
  evidences: Evidence[],
  extractions: ExtractionResult[],
  interp: AIInterpretation,
  relation: RelationResult,
  adjudication: AdjudicationOutcome | undefined,
  consensus?: ConsensusResult,
): ProvenanceTrace {
  const evById = new Map(evidences.map((e) => [e.evidence_id, e]));
  const exById = new Map(extractions.map((x) => [x.evidence_id, x]));

  const criteria = (
    adjudication?.criteria ??
    consensus?.criteria.map((c) => ({
      criterion_id: c.criterion_id,
      final_assessment: c.status === "AGREEMENT" ? "supports" : "not_assessed",
      evidence_refs: [],
    })) ??
    []
  ).map<CriterionTrace>((criterion) => {
    const chain: TraceNode[] = [];
    const signals = relation.signals.filter((s) => s.criterion_id === criterion.criterion_id);
    const citedEvidence = new Set(
      signals.flatMap((s) => s.evidence_refs.map((r) => r.evidence_id)),
    );

    for (const id of citedEvidence) {
      const ev = evById.get(id)!;
      chain.push({
        origin: "evidence",
        kind: "evidence",
        ref: id,
        detail: `${ev.type} (${ev.activity_id}) · ${ev.source_ref} · ${ev.content_ref}`,
      });

      const cited = new Set(
        signals
          .flatMap((s) =>
            s.evidence_refs
              .filter((r) => r.evidence_id === id && r.field)
              .map((r) => r.field!),
          ),
      );

      for (const field of exById.get(id)?.fields ?? []) {
        if (cited.size && !cited.has(field.name)) continue;
        chain.push({
          origin: "evidence",
          kind: "extracted_field",
          ref: `${id}#${field.name}`,
          detail: `${field.source.locator}: "${field.source.excerpt}"`,
        });
      }
    }

    for (const signal of signals) {
      chain.push({
        origin: "ai",
        kind: "ai_signal",
        ref: signal.signal_id,
        detail: `${signal.support} (confiança ${signal.confidence}) — ${signal.rationale} [${interp.model.provider}/${interp.model.name}]`,
      });

      if (adjudication) {
        const decision = adjudication.adjudication.decisions.find(
          (x) => x.signal_id === signal.signal_id,
        );
        if (decision) {
          chain.push({
            origin: "adjudicator",
            kind: "adjudication_decision",
            ref: `${adjudication.adjudication.adjudication_id}:${signal.signal_id}`,
            detail: `${decision.action}${decision.corrected_support ? ` → ${decision.corrected_support}` : ""}${decision.note ? ` — "${decision.note}"` : ""} · ${adjudication.adjudication.adjudicator.name}`,
          });
        }
      }
    }

    if (adjudication) {
      chain.push({
        origin: "adjudicator",
        kind: "final",
        ref: criterion.criterion_id,
        detail: `avaliação final: ${criterion.final_assessment}`,
      });
    } else {
      const criterionConsensus = consensus!.criteria.find(
        (x) => x.criterion_id === criterion.criterion_id,
      )!;
      chain.push({
        origin: "consensus",
        kind: "consensus_decision",
        ref: `consensus:${criterion.criterion_id}`,
        detail: `resultado: ${criterionConsensus.status}; ${criterionConsensus.verifications.map((v) => `${v.mechanism}=${v.status}`).join(", ")}`,
      });
      chain.push({
        origin: "consensus",
        kind: "final",
        ref: criterion.criterion_id,
        detail: `avaliação final: ${criterion.final_assessment}`,
      });
    }

    return { criterion_id: criterion.criterion_id, chain };
  });

  return {
    subject: interp.subject,
    interpretation: {
      id: interp.interpretation_id,
      model: `${interp.model.provider}/${interp.model.name}`,
    },
    criteria,
    rejected_ai_citations: relation.signals.flatMap((s) =>
      s.rejected_refs.map((r) => ({
        signal_id: s.signal_id,
        evidence_id: r.evidence_id,
        reason: r.reason,
      })),
    ),
    invalid_ai_signals: relation.invalid_signals,
  };
}

/**
 * M2 → M3 handoff. Contains only references and hashes.
 * Kept as ReviewedStateRecord for compatibility with the M3 attestation layer;
 * the decision vocabulary itself is now human_adjudication | consensus.
 */
export interface ReviewedStateRecord {
  record_version: "m2.reviewed-state.v1";
  synthetic: boolean;
  subject: string;
  competency_id: string;
  state: string;
  state_history: CompetencyState["history"];
  criteria: Array<{
    criterion_id: CriterionId;
    final_assessment: string;
    evidence_ids: string[];
  }>;
  evidence: Array<{
    evidence_id: string;
    type: string;
    activity_id: string;
    content_hash: string;
    trust_level: string;
  }>;
  interpretation: {
    id: string;
    model: string;
    contract_version: string;
  };
  decision: {
    mode: "human_adjudication" | "consensus";
    adjudication_id?: string;
    adjudicator_id?: string;
    adjudicator_role?: string;
    decided_at: string;
    confirm_demonstrated: boolean;
  };
  record_hash: string;
}

export function buildHandoff(
  evidences: Evidence[],
  interp: AIInterpretation,
  adjudication: AdjudicationOutcome | undefined,
  consensus?: ConsensusResult,
  state?: CompetencyState,
): ReviewedStateRecord {
  if (!adjudication && !consensus) throw new Error("handoff exige consenso ou adjudicação humana");

  const used = new Set(
    adjudication
      ? adjudication.criteria.flatMap((c) => c.evidence_refs.map((r) => r.evidence_id))
      : evidences.map((e) => e.evidence_id),
  );

  const body: Omit<ReviewedStateRecord, "record_hash"> = {
    record_version: "m2.reviewed-state.v1",
    synthetic: evidences.some((e) => e.provenance.synthetic),
    subject: adjudication?.state.subject ?? interp.subject,
    competency_id: adjudication?.state.competency_id ?? "comp:data-analysis-reproducible",
    state: adjudication?.state.value ?? "DEMONSTRATED",
    state_history: adjudication?.state.history ?? state?.history ?? [],
    criteria: adjudication
      ? adjudication.criteria.map((c) => ({
          criterion_id: c.criterion_id,
          final_assessment: c.final_assessment,
          evidence_ids: [...new Set(c.evidence_refs.map((r) => r.evidence_id))],
        }))
      : consensus!.criteria.map((c) => ({
          criterion_id: c.criterion_id,
          final_assessment: c.status === "AGREEMENT" ? "supports" : "not_assessed",
          evidence_ids: [...new Set(relationEvidenceIds(evidences, c.criterion_id))],
        })),
    evidence: evidences
      .filter((e) => used.has(e.evidence_id))
      .map((e) => ({
        evidence_id: e.evidence_id,
        type: e.type,
        activity_id: e.activity_id,
        content_hash: e.provenance.contentHash,
        trust_level: e.trust_level,
      })),
    interpretation: {
      id: interp.interpretation_id,
      model: `${interp.model.provider}/${interp.model.name}`,
      contract_version: interp.contract_version,
    },
    decision: adjudication
      ? {
          mode: "human_adjudication",
          adjudication_id: adjudication.adjudication.adjudication_id,
          adjudicator_id: adjudication.adjudication.adjudicator.id,
          adjudicator_role: adjudication.adjudication.adjudicator.role,
          decided_at: adjudication.adjudication.adjudicated_at,
          confirm_demonstrated: adjudication.adjudication.confirm_demonstrated,
        }
      : {
          mode: "consensus",
          decided_at: state?.history.at(-1)?.at ?? (() => {
            throw new Error("consensus handoff exige histórico de estado");
          })(),
          confirm_demonstrated: true,
        },
  };

  return { ...body, record_hash: sha256(canonicalJSON(body)) };
}

function relationEvidenceIds(evidences: Evidence[], criterionId: CriterionId): string[] {
  return evidences
    .filter((e) => EVIDENCE_CONTRACT[e.type].criteria.includes(criterionId))
    .map((e) => e.evidence_id);
}

export function verifyHandoff(rec: ReviewedStateRecord): boolean {
  const { record_hash, ...body } = rec;
  return sha256(canonicalJSON(body)) === record_hash;
}
