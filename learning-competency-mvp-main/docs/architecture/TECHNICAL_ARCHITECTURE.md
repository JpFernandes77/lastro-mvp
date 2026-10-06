# Technical Architecture

> **Status:** working architecture. Components and boundaries below are implementation guidance derived from the current MVP contract and architecture documents.

## System view

~~~text
┌──────────────────────┐
│ Organization / Program│
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Competency Definition │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Trail / Activities   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Evidence Ingestion   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Evidence Pipeline    │
│ normalize/extract    │
│ interpret/relate     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Independent          │
│ Verification         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Consensus Core       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Competency State     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Attestation Layer    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Solana               │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Verification         │
└──────────────────────┘
~~~

## Pipeline boundary

The evidence pipeline follows:

~~~text
INGEST
  → NORMALIZE
  → EXTRACT
  → INTERPRET
  → RELATE TO COMPETENCY
  → INDEPENDENT VERIFICATION
  → CONSENSUS
  → UPDATE STATE
  → ATTEST
  → VERIFY

Exceptional path:
CONSENSUS CONFLICT → HUMAN ADJUDICATION → STATE
~~~

The existing EVIDENCE_PIPELINE.md remains the source for evidence semantics.

## Logical components

### Product layer

Owns:

- organizations/programs;
- competency definitions;
- trails;
- activities;
- learner progression;
- verification / adjudication workflow.

### Evidence layer

Owns:

- ingestion;
- provenance;
- normalization;
- extraction;
- evidence references;
- trust levels.

### Intelligence layer

Owns:

- structured interpretation;
- evidence-to-competency relation;
- gap identification;
- synthesis.

AI outputs are proposals/interpretations, not automatic institutional truth.

### Consensus / adjudication layer

Owns:

- Consensus Core outcomes;
- convergence/divergence across independent verification mechanisms;
- exceptional human adjudication after conflict;
- state transition authorization.

### State layer

Owns the canonical competency state and its history.

### Attestation layer

Owns the representation of a defined state/event, its evidence reference and review context.

### Verification layer

Resolves an attestation and reports only what the underlying mechanism supports.

## Data boundary

Sensitive or raw evidence remains off-chain.

The chain should carry only the minimum information required for integrity and verification. **Current MVP:** the attestation layer uses the Solana Memo Program. The payload is versioned and contains only the minimum fields needed to bind the reviewed state: MVP id, attestation version, pseudonymous subject reference, competency, state, record hash, attester and timestamp. The verifier checks the payload binding when the reviewed record is supplied.

**Future option:** Solana Attestation Service (SAS) may be evaluated separately if it provides a property required by the product. It is not the current MVP mechanism.

## MVP implementation rule

Prefer one end-to-end vertical slice over broad abstractions.

A component is justified when it helps prove:

**competency → trail → evidence → interpretation → independent verification → consensus → state → attestation → verification.**

Avoid premature multi-agent orchestration, generalized integrations and infrastructure that does not contribute to this proof.
