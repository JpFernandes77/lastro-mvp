# Frontend Product Specification — LASTRO

**Status:** implementation contract  
**Audience:** frontend engineer, UX/UI owner, product/architecture reviewers  
**Source of truth:** product and architecture documents in this repository

> **Core invariant:** the frontend is a projection of the existing LASTRO architecture. It must not invent business logic, verification logic, competency rules, or parallel state transitions.

## 1. Product objective

LASTRO provides an evidence and verification layer for demonstrated capability, turning observable work evidence into a bounded, verifiable competency state.

The core progression is:

```text
WORK
  ↓
EVIDENCE
  ↓
AI INTERPRETATION
  ↓
INDEPENDENT VERIFICATION
  ↓
CONSENSUS
  ↓
COMPETENCY STATE
  ↓
ATTESTATION
  ↓
PUBLIC VERIFICATION
```

**Primary product statement:** **Evidence-backed capability.**

**Aha moment:** a demonstrated capability stops being only a claim inside the application and becomes a bounded state backed by evidence and independently verifiable.

Blockchain is infrastructure for the proof layer, not the product story or competency authority.

## 2. MVP vs strategic narrative

### MVP wedge — must be demonstrable

```text
Competency → Activities → Evidence → Interpretation
→ Independent Verification → Consensus
→ Demonstrated Competency → Attestation → Public Verification
```

### Strategic / research narrative — presentation only

```text
Work Change → Role Delta → Competency Gap → Requalification
```

Dynamic Role Architecture is a research hypothesis. Do not present these strategic screens as validated backend capabilities unless the corresponding implementation exists and is explicitly validated.

## 3. Canonical demo journey

The full product narrative may be shown as:

```text
ORGANIZATION
↓
WORK CHANGE
↓
ROLE DELTA
↓
COMPETENCY GAP
↓
REQUALIFICATION
↓
EVIDENCE
↓
VERIFICATION
↓
CONSENSUS
↓
DEMONSTRATED
↓
ATTESTATION
↓
PUBLIC VERIFICATION
```

If time is constrained, **MVP core + proof always take priority over strategic narrative screens.**

## 4. Information architecture

Recommended routes:

| Route | Purpose |
|---|---|
| `/` | Product entry / demo context |
| `/work-change` | Strategic work-change context |
| `/role` | Role Delta |
| `/competencies` | Competency states and gaps |
| `/requalification` | Proposed development path |
| `/evidence` | Evidence inspection |
| `/verification` | Verification mechanisms and consensus |
| `/proof` | Attestation and public verification |

A single-page implementation is acceptable if it makes the journey clearer. Do not add routing complexity for its own sake.

## 5. Core domain objects

### Organization
Show organization context, role and competency need.

### Role
Show role name, previous/current responsibilities, tools and required competencies.

### Competency
Show name, description, criteria, current state and evidence coverage.

### Activity
Show observable task, competency relation, expected evidence and completion state.

### Evidence
Evidence is the primary object supporting a competency claim.

Show, when available:
- evidence ID;
- type;
- origin/source;
- activity;
- criterion;
- provenance;
- integrity/hash reference;
- interpretation status;
- verification status.

**Evidence and interpretation are separate concepts.**

### Verification
Show each verification mechanism separately.

Current conceptual mechanisms include:
- Evidence Integrity;
- Deterministic Rule Check;
- AI Interpretation.

Statistical / Robustness and Source / Provenance remain contextual/future or provenance dimensions, not additional current Consensus mechanisms.

### Consensus
Supported outcomes:

```text
AGREEMENT
INSUFFICIENT_EVIDENCE
CONFLICT
HUMAN_ADJUDICATION
```

### Competency State
Use only:

```text
NOT_STARTED
IN_DEVELOPMENT
UNDER_REVIEW
DEMONSTRATED
```

Do not invent additional competency states.

### Attestation
Show competency, state, decision, record hash, attestation reference and public verification reference.

Attestation is not the full evidence payload.

## 6. Screen specifications

### Screen 1 — Work Change

**Question:** How is work changing?

Show competency-change signals, task-change context, identified gaps and role context.

If synthetic, label it clearly as demo/synthetic data.

### Screen 2 — Role Delta

Compare previous/current:
- tasks;
- responsibilities;
- tools;
- competencies.

Expose source/evidence references when available.

### Screen 3 — Competency Gap

Each competency card should show:
- competency name;
- required state;
- current state;
- criteria;
- evidence coverage;
- gap status.

Use explicit state labels; never rely on color alone.

### Screen 4 — Requalification

Connect a competency gap to:
- target competency;
- missing criteria;
- recommended activities;
- expected evidence;
- progress;
- next observable proof.

Use **recommended/proposed** language. Do not claim an optimal or guaranteed learning path unless such logic exists.

### Screen 5 — Evidence

The evaluator must be able to inspect:
1. source metadata;
2. activity relation;
3. criterion relation;
4. extracted information;
5. AI interpretation;
6. provenance;
7. integrity information;
8. verification results.

Visually distinguish:
**observed evidence ≠ AI interpretation ≠ human adjudication ≠ consensus decision.**

### Screen 6 — Verification

Show mechanisms independently.

Example:

```text
Evidence Integrity       PASS
Deterministic Rules      PASS
AI Interpretation        PASS
Consensus                AGREEMENT
```

Never reduce the decision to an opaque score such as “87% competency confidence”.

For each mechanism show:
- name;
- status;
- what was checked;
- relevant evidence/criteria;
- result;
- short rationale;
- provenance when available.

Deterministic checks must be presented as independent from AI interpretation.

AI is an assistive/interpretive mechanism. Never say “AI proved the competency”.

### Screen 7 — Consensus

Show the convergence decision.

**AGREEMENT**
- participating mechanisms;
- individual results;
- convergence;
- resulting state;
- decision context.

**INSUFFICIENT_EVIDENCE**
- what is missing;
- unsupported criterion;
- evidence needed next.

**CONFLICT**
- conflicting mechanisms;
- divergence;
- why automatic advancement did not occur;
- adjudication path.

**HUMAN_ADJUDICATION**
- reason for escalation;
- review context;
- decision, when available;
- provenance.

> Human adjudication is an explicit exception, not a normal pipeline stage.

### Screen 8 — Proof of Competency

This is the strongest visual moment.

Answer:

> **What was demonstrated, based on what evidence, and how can another person verify it?**

Show:

```text
COMPETENCY
STATE
EVIDENCE REFERENCES
DECISION
RECORD HASH
ATTESTATION
PUBLIC VERIFICATION
```

The key transition is:

```text
claim
  ↓
evidence
  ↓
verification
  ↓
demonstrated state
  ↓
verifiable proof
```

## 7. State and interaction rules

### Competency state

```text
NOT_STARTED
    ↓
IN_DEVELOPMENT
    ↓
UNDER_REVIEW
    ↓
DEMONSTRATED
```

The frontend does not perform these transitions.

### Verification presentation

Use only states supported by the underlying implementation, such as:

```text
PASS
FAIL
INSUFFICIENT
CONFLICT
NOT_RUN
```

Do not turn INSUFFICIENT into FAIL or CONFLICT into a lower confidence score.

### Evidence interaction

```text
Evidence Card
→ Evidence Detail
→ Interpretation
→ Verification
→ Provenance
```

### Verification interaction

```text
Mechanism
→ What was checked
→ Input/context
→ Result
→ Rationale
```

### Consensus interaction

```text
Consensus
→ Mechanism results
→ Convergence/divergence
→ Governance outcome
→ State transition
```

### Attestation interaction

```text
Attestation
→ Record
→ Hash/reference
→ Public verification
```

The user must be able to move from a final claim backward to its supporting evidence.

## 8. Provenance

Keep provenance explicit.

Canonical visual chain:

```text
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

Do not collapse all origins into “system generated”.

Existing origin vocabulary includes:
```text
evidence
ai
reviewer
consensus
system
```

Routine human review must not be implied. Human adjudication appears only when it actually occurs.

## 9. Visual system requirements

Follow `docs/brand/LASTRO_IDENTIDADE_v0.2.html`.

Preserve:
- layered/symmetric symbol;
- black, white and gray foundation;
- #1683FF as semantic proof/verification color;
- high contrast;
- technical/editorial minimalism;
- no generic crypto aesthetic.

Recommended brand line:

> **Competências que deixam lastro.**

Product thesis:

> **Evidence-backed competency.**

The interface must visually distinguish evidence, AI interpretation, verification, consensus, competency state, attestation and public verification.

### Blue is semantic

Use #1683FF for:
- registered proof;
- attestation;
- public verification;
- explicitly verified elements.

Do not use it as generic decoration.

## 10. Synthetic demo data

Synthetic data is allowed for the hackathon demo.

Where confusion with real customer evidence is possible, show:

> **Demo scenario — synthetic data**

Never imply:
- customer deployment;
- production traction;
- pilot results;
- validated market demand;
- real organizational data.

## 11. No parallel domain logic

Do not duplicate or invent frontend logic for:
- competency criteria;
- evidence eligibility;
- deterministic rules;
- consensus;
- state transitions;
- attestation validation;
- governance;
- reviewer authority;
- verification results;
- market claims.

If the backend does not provide a value, show the missing/unavailable state.

## 12. Responsive behavior

Desktop first, responsive on smaller screens.

Mobile priority:

```text
State
↓
Why
↓
Evidence
↓
Verification
↓
Proof
```

Avoid dense verification tables on narrow screens.

## 13. UX principles

1. **Evidence before assertion** — every competency claim should lead to supporting evidence.
2. **State before detail** — show the state first, then explain how it was reached.
3. **Mechanisms stay separate** — no magical combined score.
4. **Explainability without overload** — simple first layer, technical detail progressively.
5. **Human adjudication remains visible** — only when it occurs.
6. **Infrastructure is subordinate to product value** — Solana belongs in the proof layer.
7. **No false certainty** — use precise language such as “supports”, “verified against”, “agreement”, “insufficient evidence”, and “requires adjudication”.

Avoid “guaranteed”, “objective truth”, “bias-free”, and “AI certified”.

## 14. Demo hierarchy

The evaluator should understand these in order:

```text
1. WHAT changed?
2. WHAT competency is affected?
3. WHAT evidence exists?
4. HOW was it verified?
5. WHAT can now be verified externally?
```

Do not lead with blockchain, hashes, model names or implementation details.

## 15. Implementation priority

### P0 — Core wedge
- application shell;
- competency;
- evidence;
- verification;
- consensus;
- competency state.

### P1 — Proof
- attestation;
- record hash;
- public verification.

### P2 — Strategic narrative
- work change;
- role delta;
- competency gap;
- requalification.

If time becomes constrained, **P0 + P1 win over P2.**

## 16. Definition of Done

### Product
- evaluator understands the problem without reading technical documentation;
- aha moment is visible;
- MVP wedge is clear;
- strategic hypotheses are not presented as validated facts.

### Journey
- canonical demo runs end-to-end;
- evidence is inspectable;
- verification mechanisms are separate;
- consensus is visible;
- competency state is explicit;
- attestation is inspectable;
- public verification path is visible.

### Integrity
- no duplicated backend business logic;
- no opaque competency score replacing verification;
- AI interpretation is distinct from evidence;
- human adjudication is visible when applicable;
- provenance is inspectable;
- synthetic data is identified.

### Technical
- existing tests remain passing;
- typecheck remains passing;
- frontend does not modify the frozen core without an explicit architecture decision;
- no unnecessary backend abstractions are introduced.

## 17. Final principle

> **The frontend should make the architecture legible. It should not become a second architecture.**

The strongest implementation is the one where an evaluator can follow:

```text
Work
→ Evidence
→ Verification
→ Consensus
→ Demonstrated Competency
→ Attestation
→ Public Proof
```

and understand why each step exists.

## Related documents

- `docs/brand/LASTRO_IDENTIDADE_v0.2.html`
- `docs/product/PITCH_ARCHITECTURE.md`
- `docs/product/USER_JOURNEYS.md`
- `docs/architecture/CONSENSUS_CORE.md`
- `docs/architecture/GOVERNANCE_COMPLIANCE_LAYER.md`
- `docs/PROJECT_STATUS.md`
- `docs/PROJECT_HANDOFF.md`
