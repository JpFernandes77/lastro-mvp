/**
 * M2.4 — Evidence → competency relation.
 * Done when: every proposed signal identifies which competency criterion it supports or fails to support.
 *
 * Also enforces the evidence contract: a signal for C1 may only cite a briefing, etc.
 * Citations that break the contract are removed and reported — never silently accepted.
 */
import { ALL_CRITERIA, COMPETENCY, EVIDENCE_CONTRACT } from "../domain/useCase.js";
import type { CriterionId, Evidence, EvidenceRef } from "../domain/types.js";
import type { AIInterpretation, Signal } from "../ai/contract.js";

export interface RelatedSignal extends Signal {
  criterion_title: string;
  /** Citations kept after contract check. */
  evidence_refs: EvidenceRef[];
  rejected_refs: Array<EvidenceRef & { reason: string }>;
}

export interface CriterionCoverage {
  criterion_id: CriterionId;
  title: string;
  observables: string[];
  signal_ids: string[];
  /** Best AI assessment for this criterion, or "no_signal". Still a proposal. */
  ai_assessment: Signal["support"] | "no_signal";
}

export interface RelationResult {
  interpretation_id: string;
  signals: RelatedSignal[];
  invalid_signals: Array<{ signal_id: string; criterion_id: CriterionId; reason: string }>;
  coverage: CriterionCoverage[];
}

const RANK: Record<Signal["support"], number> = { supports: 2, partially_supports: 1, does_not_support: 0 };

export function relateToCompetency(interp: AIInterpretation, evidences: Evidence[]): RelationResult {
  const byId = new Map(evidences.map((e) => [e.evidence_id, e]));
  const signals: RelatedSignal[] = [];
  const invalid: RelationResult["invalid_signals"] = [];

  for (const s of interp.signals) {
    const kept: EvidenceRef[] = [];
    const rejected: RelatedSignal["rejected_refs"] = [];
    for (const ref of s.evidence_refs) {
      const ev = byId.get(ref.evidence_id);
      if (!ev) rejected.push({ ...ref, reason: "evidência inexistente" });
      else if (!EVIDENCE_CONTRACT[ev.type].criteria.includes(s.criterion_id))
        rejected.push({ ...ref, reason: `evidência ${ev.type} não pode sustentar ${s.criterion_id} pelo contrato` });
      else kept.push(ref);
    }
    if (!kept.length) {
      invalid.push({ signal_id: s.signal_id, criterion_id: s.criterion_id, reason: "nenhuma citação válida pelo contrato de evidência" });
      continue;
    }
    const crit = COMPETENCY.criteria.find((c) => c.id === s.criterion_id)!;
    signals.push({ ...s, criterion_title: crit.title, evidence_refs: kept, rejected_refs: rejected });
  }

  const coverage: CriterionCoverage[] = ALL_CRITERIA.map((cid) => {
    const crit = COMPETENCY.criteria.find((c) => c.id === cid)!;
    const mine = signals.filter((s) => s.criterion_id === cid);
    const best = mine.reduce<Signal["support"] | "no_signal">(
      (acc, s) => (acc === "no_signal" || RANK[s.support] > RANK[acc] ? s.support : acc),
      "no_signal",
    );
    return { criterion_id: cid, title: crit.title, observables: crit.observables, signal_ids: mine.map((s) => s.signal_id), ai_assessment: best };
  });

  return { interpretation_id: interp.interpretation_id, signals, invalid_signals: invalid, coverage };
}
