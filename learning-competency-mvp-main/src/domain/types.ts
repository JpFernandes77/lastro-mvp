/**
 * Canonical domain model for the MVP vertical slice.
 *
 * Semantic boundary:
 * evidence → AI interpretation → independent verification → consensus
 * → competency state. Human adjudication exists only as an exception for conflict.
 */

export type CriterionId = "C1" | "C2" | "C3" | "C4";
export type ActivityId = "A1" | "A2" | "A3" | "A4";

export type EvidenceType = "briefing" | "analysis_artifact" | "analysis_result" | "communication";
export type TrustLevel = "N1_SELF_DECLARED" | "N2_EVIDENCE_PRESENTED" | "N3_EVIDENCE_ANALYZED" | "N4_SOURCE_VERIFIED";
export type CompetencyStateValue = "NOT_STARTED" | "IN_DEVELOPMENT" | "UNDER_REVIEW" | "DEMONSTRATED";

/** Where a piece of information came from. Human input is represented as adjudication only. */
export type Origin = "evidence" | "ai" | "adjudicator" | "consensus" | "system";

export interface Criterion {
  id: CriterionId;
  title: string;
  observables: string[];
}

export interface Competency {
  id: string;
  statement: string;
  criteria: Criterion[];
}

export interface Activity {
  id: ActivityId;
  title: string;
  objective: string;
  expectedEvidence: EvidenceType[];
  criteria: CriterionId[];
}

export interface Trail {
  id: string;
  title: string;
  competencyId: string;
  activities: Activity[];
}

export type ContentFormat = "markdown" | "text" | "ipynb" | "csv" | "url";

export interface EvidenceSubmission {
  type: EvidenceType;
  activityId: ActivityId;
  submittedBy: string;
  sourceRef: string;
  format: ContentFormat;
  content: string;
  relatedEvidenceIds?: string[];
  submittedAt?: string;
  synthetic?: boolean;
}

export interface Provenance {
  sourceRef: string;
  submittedBy: string;
  submittedAt: string;
  activityId: ActivityId;
  contentHash: string;
  ingestedAt: string;
  synthetic: boolean;
}

export interface Evidence {
  evidence_id: string;
  type: EvidenceType;
  source_ref: string;
  activity_id: ActivityId;
  submitted_by: string;
  submitted_at: string;
  content_ref: string;
  format: ContentFormat;
  content: string;
  related_evidence_ids: string[];
  trust_level: TrustLevel;
  provenance: Provenance;
}

export interface SourceLocator {
  evidence_id: string;
  locator: string;
  excerpt: string;
}

export interface ExtractedField {
  name: string;
  value: string | number | boolean | string[];
  origin: "evidence";
  source: SourceLocator;
}

export interface NormalizedEvidence {
  evidence_id: string;
  type: EvidenceType;
  segments: Array<{ locator: string; kind: "heading" | "text" | "code" | "table" | "output"; text: string }>;
}

export interface ExtractionResult {
  evidence_id: string;
  type: EvidenceType;
  fields: ExtractedField[];
  missing: string[];
}

export type SignalSupport = "supports" | "partially_supports" | "does_not_support";

export interface EvidenceRef {
  evidence_id: string;
  field?: string;
}

/** Human decisions are only valid on the exceptional adjudication path. */
export type AdjudicationAction = "accept" | "correct" | "reject" | "request_more_evidence";

export interface AdjudicationDecision {
  signal_id: string;
  criterion_id: CriterionId;
  action: AdjudicationAction;
  corrected_support?: SignalSupport;
  note?: string;
  evidence_refs?: EvidenceRef[];
}

export interface Adjudicator {
  id: string;
  name: string;
  role: string;
}

export interface AdjudicationRecord {
  adjudication_id: string;
  adjudicator: Adjudicator;
  adjudicated_at: string;
  interpretation_id: string;
  consensus_status: "CONFLICT";
  decisions: AdjudicationDecision[];
  confirm_demonstrated: boolean;
  summary_note?: string;
}

export interface StateTransition {
  from: CompetencyStateValue;
  to: CompetencyStateValue;
  at: string;
  by: Origin;
  actor: string;
  reason: string;
}

export interface CompetencyState {
  subject: string;
  competency_id: string;
  value: CompetencyStateValue;
  history: StateTransition[];
}
