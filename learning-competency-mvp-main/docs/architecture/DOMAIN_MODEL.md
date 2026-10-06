# LASTRO — Domain Model

**Status:** implementation contract  
**Scope:** MVP vertical slice  
**Source:** `src/domain/types.ts`, `src/pipeline.ts`, `src/consensus/consensus.ts`, `src/state/state.ts`, `src/provenance/trace.ts`

## 1. Purpose

This document freezes the semantic vocabulary of the current MVP so product, frontend and architecture use the same domain meanings.

It documents the model that exists today. It does not introduce future product objects.

## 2. Canonical domain

```
Organization
   ↓
Competency
   ↓
Trail
   ↓
Activity
   ↓
Evidence
   ↓
AI Interpretation / Relation
   ↓
Independent Verification
   ↓
Consensus
   ↓
Competency State
   ↓
Attestation
   ↓
Public Verification
```

The MVP domain types currently define:

- `Competency`
- `Criterion`
- `Trail`
- `Activity`
- `EvidenceSubmission`
- `Evidence`
- `ExtractionResult`
- `AdjudicationRecord`
- `CompetencyState`
- provenance and state-transition records.

## 3. Critical semantic boundaries

These distinctions are normative for the MVP:

```
Evidence           ≠ Interpretation
Interpretation     ≠ Verification
Verification       ≠ Consensus
Consensus          ≠ Competency
Competency State   ≠ Attestation
Attestation        ≠ Evidence
```

### Evidence

An observable submission ingested under the evidence contract.

It carries:

- evidence ID;
- type;
- activity;
- source reference;
- submitter;
- content/reference;
- related evidence;
- trust level;
- provenance;
- content hash.

Evidence is the object from which later interpretation and verification operate.

### AI Interpretation

A semantic interpretation produced by an external/provider adapter and validated against the AI contract.

AI output is a signal or interpretation. It is not authority over competency state.

The pipeline protects canonical evidence from provider mutation by passing detached snapshots to providers.

### Independent Verification

Verification mechanisms inspect different properties of the same case.

The current MVP Consensus Core uses:

1. Evidence Integrity Check;
2. Deterministic Criteria Check;
3. AI Interpretation.

The deterministic criteria check does not consume AI confidence, summaries or classifications.

### Consensus

Consensus is the explicit convergence decision over verification results.

Canonical outcomes:

- `AGREEMENT`
- `INSUFFICIENT_EVIDENCE`
- `CONFLICT`
- `HUMAN_ADJUDICATION`

These are **consensus outcomes**, not competency states and not routine review states.

### Competency State

The bounded state of the subject for a specific competency.

Current values:

- `NOT_STARTED`
- `IN_DEVELOPMENT`
- `UNDER_REVIEW`
- `DEMONSTRATED`

`UNDER_REVIEW` means the competency is awaiting verification/consensus. It does **not** imply that a human reviewer is required.

The frontend must never perform these transitions itself.

### Human Adjudication

An exceptional resolution path.

It is allowed only after a Consensus Core `CONFLICT`.

It preserves:

- adjudicator;
- reason/context;
- decisions;
- evidence references;
- timestamp;
- result.

Human adjudication is not a normal pipeline stage.

### Attestation

A compact representation of a defined competency state/event.

Current MVP implementation:

- Solana Memo Program;
- version `m3.attestation.v2`;
- pseudonymous subject reference;
- competency;
- state;
- record hash;
- attester;
- timestamp.

Raw/sensitive evidence is not the attestation payload.

## 4. Evidence trust levels

The domain currently contains:

```
N1_SELF_DECLARED
N2_EVIDENCE_PRESENTED
N3_EVIDENCE_ANALYZED
N4_SOURCE_VERIFIED
```

These are **evidence/trust maturity labels**, not competency states.

They must not be presented as an alternative competency-state taxonomy.

Current ingestion starts submitted evidence at N2. Analysis may move supported evidence to N3. The current MVP does not automatically establish N4.

## 5. Provenance

Information origin is explicitly represented as:

```
evidence
ai
adjudicator
consensus
system
```

The provenance chain must remain inspectable:

```
EVIDENCE
  ↓
AI INTERPRETATION
  ↓
VERIFICATION
  ↓
CONSENSUS
  ↓
COMPETENCY STATE
  ↓
ATTESTATION
```

When human adjudication occurs, it is inserted as an explicit exceptional decision node.

## 6. State transition authority

Current transition authority:

| From | To | Authority |
|---|---|---|
| NOT_STARTED | IN_DEVELOPMENT | system |
| IN_DEVELOPMENT | UNDER_REVIEW | system |
| UNDER_REVIEW | DEMONSTRATED | consensus / adjudicator |
| UNDER_REVIEW | IN_DEVELOPMENT | consensus / adjudicator |

The state module rejects unsupported transitions.

## 7. Canonical rule

> **The domain state is produced by the backend decision path. Presentation layers project it; they do not manufacture it.**

Any change to these semantic boundaries is an architecture/product decision and must be recorded before implementation.
