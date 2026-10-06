import type { CriterionId } from "../domain/types.js";
import type { ReviewedStateRecord } from "./trace.js";

export interface VerifiableClaim {
  claim_id: string;
  subject: string;
  competency_id: string;
  state: string;
  criterion_support: Array<{
    criterion_id: CriterionId;
    assessment: string;
    evidence_ids: string[];
  }>;
  evidence_refs: string[];
  review_ref: string;
  scope: {
    competency: string;
    state: string;
    evidence_bound: true;
    reviewer_confirmed: boolean;
  };
}

/**
 * Builds an explicit, bounded declaration from the existing reviewed state.
 * This is additive: it does not replace ReviewedStateRecord or change the M1→M3 flow.
 *
 * Compatibility note: the claim layer historically called the decision reference
 * "review_ref". The source of truth is now ReviewedStateRecord.decision, which
 * may be human review or Consensus Core.
 */
export function buildVerifiableClaim(record: ReviewedStateRecord): VerifiableClaim {
  const evidenceRefs = [...new Set(record.criteria.flatMap((c) => c.evidence_ids))];
  const decisionRef = record.decision.adjudication_id ?? "consensus-core";

  return {
    claim_id: `claim:${record.record_hash.slice(0, 16)}`,
    subject: record.subject,
    competency_id: record.competency_id,
    state: record.state,
    criterion_support: record.criteria.map((c) => ({
      criterion_id: c.criterion_id,
      assessment: c.final_assessment,
      evidence_ids: [...c.evidence_ids],
    })),
    evidence_refs: evidenceRefs,
    review_ref: decisionRef,
    scope: {
      competency: record.competency_id,
      state: record.state,
      evidence_bound: true,
      reviewer_confirmed: record.decision.confirm_demonstrated,
    },
  };
}

/**
 * Structural support check for the claim.
 * It establishes references and decision confirmation, not truth or competency correctness.
 */
export function verifyClaimSupport(claim: VerifiableClaim, record: ReviewedStateRecord): boolean {
  const decisionRef = record.decision.adjudication_id ?? "consensus-core";

  if (claim.claim_id !== `claim:${record.record_hash.slice(0, 16)}`) return false;
  if (claim.scope.evidence_bound !== true) return false;
  if (claim.subject !== record.subject) return false;
  if (claim.competency_id !== record.competency_id) return false;
  if (claim.state !== record.state) return false;
  if (claim.review_ref !== decisionRef) return false;
  if (claim.scope.reviewer_confirmed !== record.decision.confirm_demonstrated) return false;
  if (claim.scope.competency !== claim.competency_id) return false;
  if (claim.scope.state !== claim.state) return false;

  const recordEvidence = new Set(record.evidence.map((e) => e.evidence_id));
  const claimEvidence = new Set(claim.evidence_refs);
  if ([...claimEvidence].some((id) => !recordEvidence.has(id))) return false;

  const expectedEvidence = new Set(record.criteria.flatMap((c) => c.evidence_ids));
  if (claimEvidence.size !== expectedEvidence.size) return false;
  if ([...expectedEvidence].some((id) => !claimEvidence.has(id))) return false;

  if (claim.criterion_support.length !== record.criteria.length) return false;
  const recordCriteria = new Set(record.criteria.map((c) => c.criterion_id));
  const claimCriteria = claim.criterion_support.map((c) => c.criterion_id);
  if (new Set(claimCriteria).size !== claimCriteria.length) return false;
  if (claimCriteria.some((id) => !recordCriteria.has(id))) return false;

  for (const criterion of claim.criterion_support) {
    if (!record.criteria.some((c) =>
      c.criterion_id === criterion.criterion_id &&
      c.final_assessment === criterion.assessment &&
      criterion.evidence_ids.length === c.evidence_ids.length &&
      criterion.evidence_ids.every((id) => c.evidence_ids.includes(id))
    )) return false;
  }

  return true;
}
