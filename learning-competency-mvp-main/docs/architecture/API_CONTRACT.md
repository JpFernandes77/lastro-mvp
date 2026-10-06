# LASTRO — API / Interface Contract

**Status:** MVP interface contract  
**Scope:** backend/domain outputs consumed by product and frontend  
**Source:** current TypeScript domain, pipeline, Consensus Core, provenance and attestation implementation

## 1. Scope

The current MVP is primarily a TypeScript pipeline/CLI implementation. It does **not** currently expose a public HTTP API.

Therefore this document defines the **domain interface contract** that a frontend or future adapter must consume. It does not invent REST endpoints.

## 2. Core contract

The frontend projection follows:

```
WORK
 → EVIDENCE
 → AI INTERPRETATION
 → INDEPENDENT VERIFICATION
 → CONSENSUS
 → COMPETENCY STATE
 → ATTESTATION
 → PUBLIC VERIFICATION
```

The frontend must receive or derive these values from the canonical domain path. It must not reproduce business rules.

## 3. Evidence submission

Conceptual input:

```ts
interface EvidenceSubmission {
  type: "briefing" | "analysis_artifact" | "analysis_result" | "communication";
  activityId: "A1" | "A2" | "A3" | "A4";
  submittedBy: string;
  sourceRef: string;
  format: "markdown" | "text" | "ipynb" | "csv" | "url";
  content: string;
  relatedEvidenceIds?: string[];
  submittedAt?: string;
  synthetic?: boolean;
}
```

Validation is fail-closed for invalid types, activity/type mismatch, missing provenance, invalid format/content, oversized content, invalid dates and invalid related-evidence references.

## 4. Evidence output

Canonical `Evidence` contains:

```ts
{
  evidence_id,
  type,
  source_ref,
  activity_id,
  submitted_by,
  submitted_at,
  content_ref,
  format,
  content,
  related_evidence_ids,
  trust_level,
  provenance
}
```

The integrity anchor is:

```
content_ref = sha256(content)
provenance.contentHash = sha256(content)
```

The verifier recomputes the hash rather than trusting the stored value.

## 5. Consensus result

Current executable contract:

```ts
type ConsensusStatus =
  | "AGREEMENT"
  | "INSUFFICIENT_EVIDENCE"
  | "CONFLICT"
  | "HUMAN_ADJUDICATION";

type VerificationStatus = "PASS" | "FAIL";

interface VerificationResult {
  mechanism:
    | "evidence_integrity"
    | "deterministic_criteria"
    | "ai_interpretation";
  criterion_id: "C1" | "C2" | "C3" | "C4";
  status: "PASS" | "FAIL";
  rationale: string;
}

interface CriterionConsensus {
  criterion_id: "C1" | "C2" | "C3" | "C4";
  status:
    | "AGREEMENT"
    | "INSUFFICIENT_EVIDENCE"
    | "CONFLICT";
  verifications: VerificationResult[];
}

interface ConsensusResult {
  status: ConsensusStatus;
  criteria: CriterionConsensus[];
  can_auto_advance: boolean;
  requires_adjudication: boolean;
}
```

Important invariant:

- `AGREEMENT` may auto-advance the state;
- `INSUFFICIENT_EVIDENCE` does not demonstrate competency;
- `CONFLICT` does not auto-advance;
- human adjudication is only allowed after `CONFLICT`.

## 6. Competency state

Current state contract:

```ts
type CompetencyStateValue =
  | "NOT_STARTED"
  | "IN_DEVELOPMENT"
  | "UNDER_REVIEW"
  | "DEMONSTRATED";
```

The frontend must treat this as canonical.

It must not:

- create additional competency states;
- convert consensus outcomes into competency states;
- advance state locally;
- use an opaque confidence score as a replacement.

## 7. Reviewed-state handoff

The M2→M3 handoff is represented by `ReviewedStateRecord`.

The record contains:

- record version;
- synthetic flag;
- subject;
- competency ID;
- state;
- state history;
- criterion assessments;
- evidence references and content hashes;
- interpretation metadata;
- decision metadata;
- record hash.

The record hash is computed over the canonicalized record body.

Raw evidence content is not included in the handoff payload.

## 8. Attestation contract

Current version:

```
m3.attestation.v2
```

Conceptual payload:

```ts
{
  mvp: "learning-competency",
  v: "m3.attestation.v2",
  subject_ref: string,
  competency: string,
  state: string,
  record_hash: string,
  attester: string,
  timestamp: string
}
```

The current implementation writes this payload through the Solana Memo Program.

The payload intentionally excludes the raw subject and raw evidence content.

## 9. Verification contract

Verification can operate at different assurance levels.

Without the reviewed record, the verifier can establish that a matching `record_hash` appears on-chain.

With the reviewed record, it can additionally verify:

- reviewed-state integrity;
- payload binding;
- competency binding;
- state binding;
- pseudonymous subject binding;
- expected signer, when configured.

Therefore:

> **Finding a hash on-chain is not equivalent to proving the complete semantic binding of the attestation.**

The full verification path requires the associated reviewed-state record.

## 10. Interface invariants

Any future HTTP/API adapter must preserve:

1. Evidence and interpretation remain distinct.
2. AI is not competency authority.
3. Deterministic verification remains independent of AI output.
4. Consensus outcomes remain distinct from competency states.
5. Human adjudication remains exceptional.
6. State transitions remain backend-authoritative.
7. Sensitive/raw evidence remains off-chain where not required.
8. Provenance is preserved.
9. Attestation version is explicit.
10. Canonical hashes are recomputed when integrity is being verified.

## 11. Versioning

The current contracts are MVP contracts.

A future external API must version breaking changes rather than silently changing:

- enum semantics;
- payload meaning;
- hash canonicalization;
- attestation version;
- state transition authority.

This document does not define a public REST route structure because none exists in the current MVP.

## 12. Frontend boundary

The frontend is a projection of this contract.

If a value is not provided by the canonical implementation, the frontend should display an unavailable/unsupported state rather than inventing it.

> **The frontend should make the domain contract legible; it should not become a second domain implementation.**
