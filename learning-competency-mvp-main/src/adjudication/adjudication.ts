/**
 * Human adjudication — exceptional path only.
 *
 * The normal decision path is Consensus Core. This module may be invoked only
 * after Consensus Core returns CONFLICT.
 */
import { ALL_CRITERIA } from "../domain/useCase.js";
import type {
  AdjudicationDecision,
  AdjudicationRecord,
  CompetencyState,
  CriterionId,
  EvidenceRef,
  SignalSupport,
} from "../domain/types.js";
import type { RelationResult } from "../relation/relate.js";
import type { ConsensusResult } from "../consensus/consensus.js";
import { transition } from "../state/state.js";
import { ValidationError } from "../util.js";

export type CriterionFinal = SignalSupport | "pending_more_evidence" | "not_assessed";

export interface CriterionAdjudication {
  criterion_id: CriterionId;
  ai_assessment: RelationResult["coverage"][number]["ai_assessment"];
  final_assessment: CriterionFinal;
  decided_by: "adjudicator";
  evidence_refs: EvidenceRef[];
  notes: string[];
}

export interface AdjudicationOutcome {
  adjudication: AdjudicationRecord;
  criteria: CriterionAdjudication[];
  evidence_requests: Array<{ criterion_id: CriterionId; note: string }>;
  state: CompetencyState;
}

const RANK: Record<SignalSupport, number> = {
  supports: 2,
  partially_supports: 1,
  does_not_support: 0,
};

export function validateAdjudication(
  record: AdjudicationRecord,
  relation: RelationResult,
  consensus: ConsensusResult,
): string[] {
  const issues: string[] = [];
  if (consensus.status !== "CONFLICT") issues.push("adjudicação humana só é permitida após CONSENSUS=CONFLICT");
  if (!record.adjudicator?.id || !record.adjudicator?.name) issues.push("adjudicador precisa de id e nome");
  if (record.consensus_status !== "CONFLICT") issues.push("adjudication record precisa declarar consensus_status=CONFLICT");
  if (record.interpretation_id !== relation.interpretation_id) issues.push("adjudicação não corresponde a esta interpretação");

  const signals = new Map(relation.signals.map((s) => [s.signal_id, s]));
  const seen = new Set<string>();

  for (const d of record.decisions) {
    const signal = signals.get(d.signal_id);
    if (!signal) {
      issues.push(`decisão para sinal inexistente: ${d.signal_id}`);
      continue;
    }
    if (seen.has(d.signal_id)) issues.push(`mais de uma decisão para ${d.signal_id}`);
    seen.add(d.signal_id);
    if (d.criterion_id !== signal.criterion_id) issues.push(`${d.signal_id}: critério ${d.criterion_id} diferente do sinal (${signal.criterion_id})`);
    if (d.action === "correct") {
      if (!d.corrected_support) issues.push(`${d.signal_id}: "correct" exige corrected_support`);
      if (!d.note?.trim()) issues.push(`${d.signal_id}: "correct" exige uma nota do adjudicador`);
      if (d.corrected_support === "supports" && !d.evidence_refs?.length)
        issues.push(`${d.signal_id}: corrigir para "supports" exige evidence_refs`);
    }
    if ((d.action === "reject" || d.action === "request_more_evidence") && !d.note?.trim())
      issues.push(`${d.signal_id}: "${d.action}" exige uma nota explicando o motivo`);
  }

  for (const signal of relation.signals) {
    if (!seen.has(signal.signal_id)) issues.push(`sinal sem decisão do adjudicador: ${signal.signal_id}`);
  }

  return issues;
}

function finalFor(
  decision: AdjudicationDecision,
  aiSupport: SignalSupport,
): SignalSupport | "pending_more_evidence" {
  switch (decision.action) {
    case "accept":
      return aiSupport;
    case "correct":
      return decision.corrected_support!;
    case "reject":
      return "does_not_support";
    case "request_more_evidence":
      return "pending_more_evidence";
  }
}

export function applyAdjudication(
  state: CompetencyState,
  relation: RelationResult,
  consensus: ConsensusResult,
  record: AdjudicationRecord,
): AdjudicationOutcome {
  if (state.value !== "UNDER_REVIEW")
    throw new ValidationError([`adjudicação só pode ser aplicada em UNDER_REVIEW (estado atual: ${state.value})`]);

  const issues = validateAdjudication(record, relation, consensus);
  if (issues.length) throw new ValidationError(issues);

  const signals = new Map(relation.signals.map((s) => [s.signal_id, s]));
  const requests: AdjudicationOutcome["evidence_requests"] = [];

  const criteria: CriterionAdjudication[] = ALL_CRITERIA.map((criterionId) => {
    const decisions = record.decisions.filter((d) => d.criterion_id === criterionId);
    const coverage = relation.coverage.find((c) => c.criterion_id === criterionId)!;
    let final: CriterionFinal = "not_assessed";
    const refs: EvidenceRef[] = [];
    const notes: string[] = [];

    for (const decision of decisions) {
      const signal = signals.get(decision.signal_id)!;
      const value = finalFor(decision, signal.support);
      if (decision.note) notes.push(decision.note);

      if (value === "pending_more_evidence") {
        requests.push({ criterion_id: criterionId, note: decision.note! });
        if (final === "not_assessed") final = value;
        continue;
      }

      if (
        final === "not_assessed" ||
        final === "pending_more_evidence" ||
        RANK[value] > RANK[final as SignalSupport]
      ) {
        final = value;
      }

      if (value === "supports") {
        refs.push(...(decision.evidence_refs?.length ? decision.evidence_refs : signal.evidence_refs));
      }
    }

    if (requests.some((r) => r.criterion_id === criterionId) && final !== "supports") {
      final = "pending_more_evidence";
    }

    return {
      criterion_id: criterionId,
      ai_assessment: coverage.ai_assessment,
      final_assessment: final,
      decided_by: "adjudicator",
      evidence_refs: refs,
      notes,
    };
  });

  const allSupported = criteria.every(
    (c) => c.final_assessment === "supports" && c.evidence_refs.length > 0,
  );
  const actor = `${record.adjudicator.name} (${record.adjudicator.id})`;
  let next = state;

  if (record.confirm_demonstrated) {
    if (!allSupported) {
      const bad = criteria
        .filter((c) => c.final_assessment !== "supports")
        .map((c) => `${c.criterion_id}=${c.final_assessment}`);
      throw new ValidationError([
        `confirm_demonstrated exige C1–C4 sustentados com evidência; pendentes: ${bad.join(", ")}`,
      ]);
    }

    const used = [...new Set(criteria.flatMap((c) => c.evidence_refs.map((r) => r.evidence_id)))];
    next = transition(
      state,
      "DEMONSTRATED",
      "adjudicator",
      actor,
      `Adjudicador resolveu o conflito e confirmou C1–C4 com base nas evidências ${used.join(", ")}`,
      record.adjudicated_at,
    );
  } else {
    const open = criteria
      .filter((c) => c.final_assessment !== "supports")
      .map((c) => `${c.criterion_id}=${c.final_assessment}`);
    next = transition(
      state,
      "IN_DEVELOPMENT",
      "adjudicator",
      actor,
      `Adjudicação não demonstrou todos os critérios: ${open.join(", ")}`,
      record.adjudicated_at,
    );
  }

  return {
    adjudication: record,
    criteria,
    evidence_requests: requests,
    state: next,
  };
}
