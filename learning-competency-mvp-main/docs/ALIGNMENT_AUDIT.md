
# Alignment Audit — LASTRO

**Status:** active alignment control  
**Track:** Learning Competency  
**Date:** 2026-10-04  
**Baseline:** existing MVP architecture and current documentation set

## 1. Purpose

This document records the cross-layer alignment audit of the LASTRO project.

The audit verifies whether research, research decisions, architecture, implementation, product documentation, frontend specification, evaluation claims, demo proof, and submission narrative describe the **same system at the same level of maturity**.

This is a control artifact. It is not a new architecture, product roadmap, market-validation report, pitch, or request to expand the MVP.

The central rule is:

> **The existing MVP architecture is the baseline. Documentation and product narrative must align to it; research must not force architectural expansion without a separate decision.**

## 2. Audit principle

~~~text
RESEARCH
   ↓
EVIDENCE
   ↓
INTERPRETATION
   ↓
DECISION
   ↓
ARCHITECTURE
   ↓
IMPLEMENTATION
   ↓
PRODUCT
   ↓
DEMO / PROOF
   ↓
CLAIM
~~~

The chain must not be read backwards.

> **The existence of an implemented MVP does not prove market demand, commercial viability, or the truth of broader research hypotheses.**

A research hypothesis must not become an implemented capability merely because it appears repeatedly in product narratives or mockups.

## 3. Canonical MVP architecture

The current MVP architecture remains unchanged.

~~~text
WORK / ACTIVITY
      ↓
EVIDENCE
      ↓
INTERPRETATION
      ↓
INDEPENDENT VERIFICATION
      ↓
GOVERNANCE / POLICY
      ↓
CONSENSUS CORE
      ↓
COMPETENCY STATE
      ↓
ATTESTATION
      ↓
VERIFICATION
~~~

The canonical technical wedge is:

~~~text
Evidence
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
~~~

The shorter product shorthand, Evidence → Competency → Verification → State → Attestation → Verification, may be used in pitch/product communication, but must not replace the detailed architectural representation.

## 4. Canonical domain boundaries

### 4.1 Evidence

Evidence represents an observable artifact, activity output, or record.

Evidence must remain distinguishable from interpretation, competency state, verification result, and attestation. Evidence retains provenance and origin.

### 4.2 Interpretation

AI may organize evidence, identify relationships, map evidence to criteria, detect inconsistencies, propose classifications, identify evidence gaps, and request additional evidence.

AI interpretation is not final competency authority.

### 4.3 Independent verification

Verification mechanisms must remain meaningfully distinguishable.

The deterministic verifier must operate directly on explicit competency criteria, activities, eligible evidence, and related domain contracts.

It must not silently consume AI confidence, AI classification, or AI-generated relation signals as its authority.

### 4.4 Governance / Policy

Governance defines the conditions under which verification results may produce a state transition. The proposed Ethical Compliance Gate is a separate future research option; it is not part of the current MVP pipeline.

Relevant context can include eligibility, reviewer role, independence, conflicts of interest, escalation rules, policy version, and additional review requirements.

Governance is not itself the competency state.

### 4.5 Consensus

Consensus is the convergence layer between verification results and state transition.

Consensus is not simple vote counting.

Canonical consensus outcomes are:

~~~text
AGREEMENT
INSUFFICIENT_EVIDENCE
CONFLICT
HUMAN_ADJUDICATION
~~~

The competency state must not advance while the case is materially insufficient or conflicted.

### 4.6 Human Adjudication as Exception

Human Review is not a normal pipeline stage.

**Human Adjudication** is an exception path used only when verification mechanisms conflict, evidence remains materially ambiguous, contextual judgment is required, an existing rule does not adequately cover the case, or a contestation requires resolution.

Canonical shape:

~~~text
EVIDENCE
   ↓
INDEPENDENT VERIFICATION
   ↓
CONSENSUS CORE
   ├─ AGREEMENT → STATE
   ├─ INSUFFICIENT_EVIDENCE → HOLD
   └─ CONFLICT → HUMAN ADJUDICATION → STATE
~~~

The Consensus Core exists precisely to reduce dependence on routine individual review.

No canonical MVP flow should require a human reviewer before Consensus Core.

### 4.7 Competency State

The state represents only what the available evidence, verification results, and governance rules support.

A competency state is not a universal measure of human ability, a truth score, a hiring decision, a ranking, or a measure of human worth.

### 4.8 Attestation

Attestation represents a defined state or event.

It is an output of the verification/governance process, not the primary product object.

Sensitive evidence remains off-chain.

Solana is used as an integrity anchor and does not determine whether a person is competent.

## 5. Research alignment

### 5.1 Market validation

research/04_MARKET_VALIDATION_EVIDENCE.md remains a separate evidence track.

It may support existence of broad workforce/skills pressures, material relevance of changing work and skills gaps, and the need for further customer validation.

It does not, by itself, establish a definitive buyer, willingness to pay, pricing, recurring adoption, product-market fit, or superiority over alternatives.

**Audit result: ALIGNED.**

No architectural change is justified by the current market evidence.

### 5.2 Colosseum ecosystem benchmark

research/05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md establishes an adjacent ecosystem landscape.

The benchmark identifies projects involving credentials, verified professionals, profiles, skills, talent matching, achievements, and performance verification.

The benchmark does not justify the claim that nobody has attempted competency verification.

The defensible research finding remains:

> The reviewed public material contains adjacent solutions, while the complete combination of evidence of work → independent verification → consensus → competency state → attestation was not identified in the public descriptions reviewed.

**Audit result: ALIGNED.**

The finding remains a differentiation hypothesis rather than a proof of market uniqueness.

### 5.3 Research decisions

research/06_DECISIONS.md is aligned with the current architecture.

D-001 preserves evidence / competency separation; D-002 establishes evidence-backed competency as the research wedge; D-004 keeps the complete trust pipeline as a differentiation hypothesis; D-006 keeps Dynamic Role Architecture as research; D-007 keeps the MVP technically bounded; D-008 prevents AI from becoming competency authority; D-009 preserves independent verification; D-010 preserves human adjudication; D-011 keeps sensitive evidence off-chain; D-012 treats attestation as output; D-013 keeps frontend downstream of the domain model.

**Audit result: ALIGNED.**

## 6. Research extension boundary

Dynamic Role Architecture remains outside the current MVP.

Research chain:

~~~text
Work Change
   ↓
Role Delta
   ↓
Competency Gap
   ↓
Requalification
   ↓
Proof of Competency
~~~

Current MVP:

~~~text
Evidence
   ↓
Verification
   ↓
Consensus
   ↓
Competency State
   ↓
Attestation
~~~

DRA must build above the existing competency/proof foundation rather than modify its trust boundary.

**Audit result: ALIGNED.**

No DRA capability should be presented as implemented unless it exists in the implementation, its architecture is explicitly adopted, its evidence requirements are defined, and its claims are separately validated.

## 7. Product alignment

The broader workforce/role-engineering thesis remains a strategic research hypothesis. The current product positioning is **Capability Evidence & Verification Infrastructure**, with the implemented wedge centered on evidence-backed competency.

The narrower implemented product is:

> Evidence-backed competency.

The MVP proves the narrower wedge.

**Audit result: ALIGNED, WITH CURRENT-POSITIONING BOUNDARY.**

The broader thesis must continue to be labeled as strategic/research direction where it exceeds the implemented MVP.

The current product object is the relationship between evidence, competency criterion, verification mechanisms, resulting bounded state, provenance, and integrity reference.

It is not simply a certificate, profile, credential, talent score, or NFT.

## 8. Frontend alignment

The frontend specification correctly defines the frontend as a projection of the domain model.

The frontend must not invent competency rules, calculate an independent competency state, manufacture verification results, reproduce Consensus Core logic, or imply backend capabilities that do not exist.

### Two narrative layers

**MVP / demonstrable layer**

~~~text
Evidence
   ↓
Verification
   ↓
Consensus
   ↓
Competency State
   ↓
Proof
~~~

**Strategic / research layer**

~~~text
Work Change
   ↓
Role Delta
   ↓
Competency Gap
   ↓
Requalification
~~~

The strategic layer may explain the larger product direction, but must not visually imply that corresponding backend capabilities are already validated or fully implemented.

**Audit result: ALIGNED. Strategic/research presentation boundary is explicit in the frontend contract.**

## 9. Consensus vocabulary alignment

The vocabulary has been normalized across the current architecture/evaluation documents.

### Canonical consensus outcomes

~~~text
AGREEMENT
INSUFFICIENT_EVIDENCE
CONFLICT
HUMAN_ADJUDICATION
~~~

### Process / governance states

If needed, operational states such as:

~~~text
PENDING_REVIEW
ADJUDICATED
~~~

may exist separately.

They must not be presented as interchangeable with Consensus Core outcomes.

**Acceptance:** a reader can distinguish what the verification mechanisms concluded from any separate operational process state.

**Status: CLOSED — documentation vocabulary consolidated.**

## 10. Evidence / review alignment

The MVP documentation correctly separates evidence from interpretation.

~~~text
SOURCE EVIDENCE
      ↓
EXTRACTION
      ↓
INTERPRETATION
      ↓
REVIEW / VERIFICATION
      ↓
CONSENSUS
      ↓
STATE
~~~

No layer may silently overwrite the provenance of the previous layer.

For every demonstrated state, the documentation and implementation should make it possible to answer:

1. What evidence existed?
2. What interpretation was produced?
3. Which verification mechanisms were applied?
4. What criteria were evaluated?
5. What governance conditions applied?
6. What consensus outcome occurred?
7. Why did the state transition?
8. What record was attested?
9. How can the integrity reference be verified?

**Status: ALIGNED.**

## 11. Attestation alignment

Current model:

~~~text
Competency State
      ↓
Deterministic Record
      ↓
Attestation
      ↓
Public Integrity Verification
~~~

The current m3.attestation.v2 implementation is complete as an M3 capability.

The current public Devnet transaction remains an M4 closing artifact.

No historical transaction should be presented as the current public proof.

The current m3.attestation.v2 transaction must be generated and verified before being registered as the current demo proof.

**Status: ALIGNED. M4 ACTION REMAINS OPEN.**

## 12. Demo alignment

Canonical technical demo:

~~~text
Competency
   ↓
Activities
   ↓
Evidence
   ↓
AI Interpretation
   ↓
Independent Verification
   ↓
Consensus
   ↓
DEMONSTRATED
   ↓
Attestation
   ↓
Public Verification
~~~

The demo uses synthetic data.

Synthetic data must never be represented as customer evidence, pilot evidence, traction, or market validation.

**Status: ALIGNED.**

## 13. Claim alignment

The project can currently claim that the MVP demonstrates:

- structured evidence;
- provenance-aware processing;
- AI-assisted interpretation;
- deterministic verification independent of AI signals;
- bounded competency states;
- human adjudication only when required by unresolved conflict, ambiguity, contestation, or unsupported context;
- consensus handling for covered scenarios;
- conflict and insufficient-evidence handling;
- deterministic record hashing;
- Solana Devnet integrity anchoring capability;
- public verification when a current Devnet transaction is available.

The project cannot currently claim:

- universal competency assessment;
- absence of bias;
- elimination of human judgment;
- blockchain proving truth or merit;
- autonomous hiring/firing;
- definitive buyer;
- willingness to pay;
- validated pricing;
- recurring commercial adoption;
- proven economic impact;
- universal suitability of automated competency assessment.

**Status: ALIGNED.**

## 14. Documentation dependency graph

~~~text
PHASE #0 / ORIGIN
       │
       ├──────────────→ MARKET VALIDATION ──────┐
       │                                        │
       └──────────────→ COLOSSEUM BENCHMARK ────┤
                                                ↓
                                         RESEARCH DECISIONS
                                                │
                                                ↓
                                       EXISTING MVP ARCHITECTURE
                              │
              ┌───────────────┼────────────────┐
              ↓               ↓                ↓
          PRODUCT         EVALUATION       FRONTEND
              │               │                │
              └───────────────┼────────────────┘
                              ↓
                         DEMO / PROOF
                              ↓
                          SUBMISSION
~~~

Market validation and ecosystem research are parallel evidence tracks, not a causal sequence.

## 15. Alignment matrix

| Layer | Source of truth | Current status | Required action |
|---|---|---|---|
| Research origin | Phase #0 library | Aligned | Preserve |
| Market evidence | research/04 | Aligned | Continue validation |
| Ecosystem benchmark | research/05 | Aligned | Preserve research boundary |
| Research decisions | research/06 | Aligned | Use as decision register |
| MVP architecture | docs/architecture/ | Baseline | Do not expand |
| Implementation | src/ + tests | Aligned with MVP boundary | Preserve feature freeze |
| Product | docs/product/ | Aligned | Preserve strategic boundary |
| Frontend | FRONTEND_PRODUCT_SPEC | Aligned | Do not create parallel logic |
| Evaluation | docs/evaluation/ | Aligned | Preserve vocabulary discipline |
| Attestation | M3 implementation | Aligned | Generate current M4 proof |
| Demo | 04_DEMO_AND_PROOF | Aligned | Execute canonical scenario |
| Claims | 05_LIMITATIONS_AND_CLAIMS | Aligned | Preserve discipline |
| Submission | M4 | In progress | Close proof + demo + validation |

## 16. Required corrections

### A-001 — Normalize Consensus vocabulary

**Priority:** P0

**Status: CLOSED.**

Consensus outcomes are explicitly separated from operational governance/process states. The canonical vocabulary remains AGREEMENT, INSUFFICIENT_EVIDENCE, CONFLICT, HUMAN_ADJUDICATION.

### A-002 — Keep Human Adjudication as the only human exception path

**Priority:** P0

**Status: CLOSED.**

Human review is no longer represented as a normal MVP pipeline stage. Human Adjudication remains only as an exception for unresolved conflict, ambiguity, contestation or unsupported context.

**Acceptance:** no canonical MVP flow requires a human reviewer before Consensus Core; Human Adjudication appears only as an exception.

### A-003 — Correct research dependency map

**Priority:** P1

**Status: CLOSED.**

Market Validation and Colosseum Benchmark are represented as parallel evidence tracks feeding Research Decisions.

**Acceptance:**

~~~text
PHASE #0
  ├→ MARKET
  └→ COLOSSEUM
        ↓
    DECISIONS
~~~

### A-004 — Mark strategic frontend screens explicitly

**Priority:** P1

**Status: CLOSED.**

The frontend contract explicitly separates the MVP demonstrable layer from the Strategic / Research layer and marks Work Change, Role Delta, Competency Gap and Requalification as strategic/research narrative when they exceed the implemented MVP.

**Acceptance:** a juror should not reasonably interpret these screens as proof of implemented organizational intelligence.

### A-005 — Preserve canonical architecture

**Priority:** P0 / permanent

No documentation correction may introduce a new backend layer or alter the current MVP trust boundary unless a separate architectural decision is recorded.

**Acceptance:** all product/documentation changes remain projections of the existing architecture.

### A-006 — Close current Devnet proof

**Priority:** P0 / M4

Generate, verify and register the current m3.attestation.v2 Devnet transaction.

**Acceptance:** docs/evaluation/04_DEMO_AND_PROOF.md and README reference the current verified proof only.

## 17. Non-actions

The audit explicitly authorizes **no** architectural expansion for:

- Dynamic Role Architecture;
- universal competency taxonomy;
- full LMS;
- recruiting marketplace;
- multi-organization infrastructure;
- tokenomics;
- sensitive on-chain evidence;
- universal automated assessment;
- new consensus mechanisms solely for narrative completeness.

These remain research or future product questions.

## 18. Definition of Alignment

The project is considered aligned when:

### Research

- observed evidence, interpretation, hypothesis and decision remain distinguishable;
- market evidence is not confused with customer validation;
- ecosystem overlap is not confused with architectural equivalence.

### Architecture

- one canonical MVP pipeline exists;
- evidence remains distinct from interpretation and state;
- verification mechanisms remain independent where required;
- Consensus Core remains the convergence layer;
- governance remains explicit;
- attestation remains an output.

### Product

- the MVP wedge is clear;
- broader product vision is clearly bounded as strategic/research;
- the product object is competency state backed by evidence and provenance.

### Frontend

- UI projects domain state;
- UI does not create domain decisions;
- strategic research flows are clearly separated from demonstrated capabilities.

### Evaluation

- claims match implementation;
- claims match available proof;
- synthetic demo data is not presented as market evidence;
- current public Devnet proof is used.

### Submission

- demo, pitch, repository and public proof tell the same story.

## 19. Final audit conclusion

The current audit does **not** identify a need to redesign or expand the MVP architecture.

The architecture is sufficiently consolidated to serve as the project's technical baseline.

The principal work now is alignment, not invention:

~~~text
RESEARCH
   ↓
DECISIONS
   ↓
EXISTING ARCHITECTURE
   ↓
IMPLEMENTATION
   ↓
PRODUCT
   ↓
FRONTEND
   ↓
DEMO
   ↓
CLAIMS
~~~

The governing principle for the next phase is:

> **Do not make the architecture fit the narrative. Make the narrative accurately expose the architecture.**

## Audit status

**Architecture:** 🟢 Baseline preserved

**Research:** 🟢 Aligned

**Product:** 🟢 Aligned with strategic boundary

**Frontend contract:** 🟢 Aligned

**Evaluation claims:** 🟢 Aligned

**Documentation vocabulary:** 🟢 Consolidated

**Current Devnet proof:** 🟡 M4 closure required

**Overall alignment:** 🟢 **Structurally aligned; architectural/documentary baseline consolidated**

**Next authorized action:** close A-006 on PC by generating and verifying the current m3.attestation.v2 Devnet proof, then synchronize demo/submission artifacts.
