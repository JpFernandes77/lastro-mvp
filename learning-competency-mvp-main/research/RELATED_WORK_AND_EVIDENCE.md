# Related Work, Prior Art & External Evidence

**Status:** Active public evidence map  
**Date:** 2026-10-04

This document maps the external foundations, standards, research, and adjacent systems that inform LASTRO's argument.

It exists to answer three separate questions:

1. **What was already known or built before LASTRO?**
2. **Which external sources strengthen the problem and architectural argument?**
3. **What is actually distinctive about LASTRO's current MVP?**

This is a **related-work map, not a claim of invention priority**. LASTRO does not claim to have invented competency frameworks, provenance, verifiable credentials, AI evaluation, distributed verification, or attestations individually.

## 1. Epistemic boundary

The evidence is classified into four roles:

- **FOUNDATION** — prior standards, frameworks, or established research that provides concepts LASTRO builds upon.
- **SUPPORT** — external evidence that strengthens a problem statement or architectural rationale.
- **ADJACENT PRIOR ART** — existing systems that solve a neighboring part of the problem.
- **LASTRO DIFFERENTIATION HYPOTHESIS** — a bounded composition or boundary that LASTRO is testing; not established uniqueness.

A source can support an argument without proving the product claim.

> **Prior art explains the landscape. It does not automatically determine whether LASTRO's composition is novel, useful, or commercially valuable.**

## 2. Problem & capability-change evidence

### 2.1 World Economic Forum — Future of Jobs Report 2025

**Role:** SUPPORT

The report provides external evidence for the broader problem of changing skills and organizational transformation.

**LASTRO relevance:**

`changing work → changing skills → capability development problem`

It supports the premise that organizations face a material capability challenge. It does **not** validate LASTRO demand, pricing, adoption, or ROI.

Source: https://www.weforum.org/publications/the-future-of-jobs-report-2025/

### 2.2 PwC — 2026 Global AI Jobs Barometer

**Role:** SUPPORT

PwC's analysis provides evidence that skill requirements are changing particularly rapidly in jobs exposed to AI.

**LASTRO relevance:**

`AI-driven work change → need to understand demonstrated capability`

Again, this supports the problem context rather than the commercial thesis.

Source: https://www.pwc.com/gx/en/issues/artificial-intelligence/publications/artificial-intelligence-study.html

### 2.3 Deloitte — State of AI in the Enterprise 2026

**Role:** SUPPORT

Deloitte's research identifies insufficient worker skills as a major barrier to integrating AI into workflows.

**LASTRO relevance:**

`AI adoption → capability gap → need for evidence-backed development`

Source: https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html

## 3. Competency & AI capability frameworks

### 3.1 UNESCO — AI Competency Framework for Students

**Role:** FOUNDATION / CONTEXT

UNESCO defines AI competencies across dimensions and progression levels, including understanding, application and creation.

**LASTRO relevance:**

It demonstrates that competency can be represented as an explicit, structured construct rather than as an undifferentiated claim.

It does **not** provide LASTRO's evidence-verification mechanism.

Source: https://www.unesco.org/en/articles/ai-competency-framework-students

### 3.2 UNESCO — AI Competency Framework for Teachers

**Role:** FOUNDATION / CONTEXT

The framework defines knowledge, skills and values required for AI-related professional capability and organizes them into dimensions and progression levels.

**LASTRO relevance:**

It supports the use of explicit competency criteria and progression models as a legitimate conceptual foundation.

Source: https://www.unesco.org/en/articles/ai-competency-framework-teachers

### 3.3 UNESCO — Guidance for Generative AI in Education and Research

**Role:** SUPPORT / GOVERNANCE CONTEXT

The guidance emphasizes human agency, responsible use, privacy, equity and the need to reconsider how learning and assessment are validated in the presence of generative AI.

**LASTRO relevance:**

This reinforces the project's separation between AI assistance and final competency authority.

Source: https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research

## 4. Verifiable credentials & attestations

### 4.1 W3C — Verifiable Credentials Data Model v2.0

**Role:** FOUNDATION / ADJACENT PRIOR ART

W3C Recommendation 2.0 defines a machine-verifiable model for claims made by issuers, including issuer, holder and verifier roles, with security and privacy considerations.

**LASTRO relevance:**

It establishes prior art for:

- machine-verifiable claims;
- issuer/verifier separation;
- tamper-evident credential representations;
- verification-oriented digital claims.

LASTRO's distinction is upstream of the credential representation:

`work evidence → verification → competency state → attestation`

rather than simply:

`issuer → credential → verifier`

LASTRO should therefore not describe attestations as a novel concept.

Source: https://www.w3.org/TR/vc-data-model/

### 4.2 W3C — Verifiable Credential Data Integrity

**Role:** FOUNDATION / ADJACENT PRIOR ART

The W3C VC family includes cryptographic mechanisms for integrity and authenticity of verifiable credentials and related documents.

**LASTRO relevance:**

This supports the architectural distinction between:

- semantic decision;
- integrity of the resulting representation.

LASTRO's current Solana Memo attestation is intentionally an MVP integrity anchor, not a replacement for the broader VC ecosystem.

Source family: https://www.w3.org/2025/credentials/

## 5. Evidence provenance

### 5.1 W3C — PROV

**Role:** FOUNDATION

The W3C PROV family provides a model for representing provenance involving entities, activities and agents, including provenance relevant to assessing quality, reliability and trustworthiness.

**LASTRO relevance:**

It provides established conceptual prior art for the project's emphasis on:

`source → transformation/activity → result → provenance`

This strengthens the rationale for preserving evidence lineage and separating source evidence from downstream interpretation.

LASTRO does **not** claim to have invented provenance or provenance graphs.

Source: https://www.w3.org/TR/prov-overview/

Accessible primer: https://www.w3.org/TR/prov-primer/

## 6. AI evaluation & independent verification

### 6.1 NIST AI Risk Management Framework

**Role:** FOUNDATION / SUPPORT

NIST's AI RMF frames trustworthy AI around characteristics including validity, reliability, safety, security, resilience, accountability, transparency, explainability, privacy and fairness.

**LASTRO relevance:**

It supports placing AI systems within explicit trustworthiness, evaluation, accountability, transparency and governance considerations. LASTRO applies that broader principle to its narrower architecture by treating AI interpretation as one signal rather than the sole competency authority.

Source: https://www.nist.gov/itl/ai-risk-management-framework

### 6.2 NIST AI measurement and evaluation

**Role:** SUPPORT

NIST's AI measurement and evaluation work emphasizes reliable measurement and evaluation as important to trustworthy AI systems.

**LASTRO relevance:**

It strengthens the conceptual separation between:

`AI output`

and

`independent evaluation / verification of the output or underlying condition`

Source: https://www.nist.gov/ai-measurement-and-evaluation

### 6.3 NIST TEVV-Athlon

**Role:** CONTEMPORARY RESEARCH / SUPPORT

NIST's 2026 **initial public draft** of the TEVV-Athlon Framework proposes a structured approach for developing customized test, evaluation, verification and validation assessments of AI systems. It is a draft under public review, not a finalized standard.

**LASTRO relevance:**

It is relevant to future verifier design, especially where AI interpretation becomes one input among independently assessed signals.

This is supporting evidence for the verification direction, not evidence that LASTRO's architecture is equivalent to NIST TEVV or that the framework validates LASTRO.

Source: https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems

## 7. Distributed verification infrastructure

The detailed verification-infrastructure benchmark is currently maintained in the private Vault. This public document therefore limits itself to the bounded architectural conclusion supported by the public research track.

Relevant prior-art classes include:

- Chainlink CRE / DON workflows;
- AVS / restaking-based verification;
- optimistic oracle and dispute systems;
- first-party oracle infrastructure;
- proof-based verification.

The key finding is architectural:

> External verification infrastructure can provide execution, cryptographic reports, economic security, dispute resolution or proofs, but none of these systems automatically defines LASTRO's semantic competency state.

Therefore:

`external verifier result → LASTRO Consensus Core → competency state`

rather than:

`external infrastructure = competency authority`

## 8. Competitive / ecosystem prior art

The Colosseum ecosystem is mapped separately because it answers a different question: **what adjacent products have already been built in the relevant ecosystem?**

See [Colosseum Ecosystem Benchmark](./05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md).

The benchmark covers:

- LearnProof;
- VeriCred;
- Solana Matcher;
- SpineDAO;
- Strikesense;
- Rei.

The benchmark conclusion is intentionally bounded:

> Publicly described adjacent projects cover credentials, talent verification, skills matching, performance verification and proof-of-talent. The scan did not identify a project whose public description explicitly combines the complete LASTRO evidence-to-competency workflow.

This remains a **research-backed differentiation hypothesis**, not proof of market uniqueness.

## 9. Argument-to-source matrix

| LASTRO argument | Relevant prior work / evidence | What it supports | What it does not prove |
|---|---|---|---|
| Skills and work are changing | WEF, PwC, Deloitte | Problem relevance | LASTRO demand |
| Competency can be explicitly defined | UNESCO competency frameworks | Structured competency model | LASTRO's assessment mechanism |
| AI interpretation should sit within human-centered evaluation and governance | UNESCO, NIST | Human agency / evaluation boundary | LASTRO superiority |
| Evidence needs provenance | W3C PROV | Evidence lineage and traceability | LASTRO provenance novelty |
| Claims can be machine-verifiable | W3C VC | Verification-oriented representations | LASTRO credential novelty |
| AI systems require evaluation | NIST TEVV / AI RMF | Verification and evaluation rationale | Competency semantics |
| Distributed infrastructure can verify computation/data | CRE, AVS, oracles, proof systems | External verification substrate | Semantic competency authority |
| Adjacent products already exist | Colosseum benchmark | Competitive context | Complete market landscape |
| LASTRO separates interpretation from verification | Multiple foundations + project architecture | Architectural rationale | Empirical superiority |
| LASTRO combines evidence → verification → consensus → state → attestation | Project architecture + adjacent prior art | Differentiation hypothesis | Legal patent novelty / PMF |

## 10. What is actually LASTRO's claimed contribution?

The project should avoid claiming novelty at the level of individual primitives.

The defensible claim is narrower:

> **LASTRO investigates a domain-level composition in which observable work is bound to explicit competency criteria, interpreted by AI, independently verified through separate mechanisms, resolved through a bounded consensus model, represented as a competency state, and then anchored for later verification.**

The potentially differentiating boundary is therefore:

```
WORK
 ↓
EVIDENCE
 ↓
AI INTERPRETATION ─────┐
                       ├→ CONSENSUS → COMPETENCY STATE → ATTESTATION
INDEPENDENT VERIFICATION┘
```

The project does **not** claim that any individual component is new.

The project also does **not** claim patentability, legal novelty, or freedom from prior art.

Those require dedicated legal / patent research.

## 11. Research gaps still open

The following areas could strengthen the argument further but should not be fabricated or overstated:

1. Academic literature specifically connecting work artifacts to competency-state inference.
2. Empirical studies comparing AI-only assessment against independent verification.
3. Research on inter-rater / verifier agreement for competency assessment.
4. Research on evidence sufficiency and uncertainty in workplace competency decisions.
5. Existing systems that explicitly combine evidence provenance, multiple verification mechanisms and state transition.
6. Empirical willingness-to-pay and buyer research.
7. Formal novelty / patent landscape analysis.

These are **OPEN**, not missing citations to be filled merely for completeness.

## 12. Reading order for evaluators

For a technical evaluator:

1. [Research Map](./RESEARCH_MAP.md)
2. [Article Research Track](./article/README.md)
3. [Related Work, Prior Art & External Evidence](./RELATED_WORK_AND_EVIDENCE.md)
4. [Technical Architecture](../docs/architecture/README.md)
5. [Consensus Core](../docs/architecture/CONSENSUS_CORE.md)
6. [Evaluation & Proof](../docs/evaluation/README.md)

For a non-technical evaluator:

1. [Repository README](../README.md)
2. [Research Map](./RESEARCH_MAP.md)
3. [Related Work, Prior Art & External Evidence](./RELATED_WORK_AND_EVIDENCE.md)
4. [Evaluation & Proof](../docs/evaluation/README.md)
5. [Reproducible Demo Contract](../docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md)

---

## Source discipline

The project distinguishes:

```
SOURCE
  ↓
OBSERVATION
  ↓
INTERPRETATION
  ↓
PROJECT DECISION
  ↓
IMPLEMENTATION
```

A source appearing here does not mean LASTRO has adopted its framework.

A source supporting the problem does not validate the product.

A prior system occupying an adjacent space does not prove LASTRO's uniqueness.

The purpose of this document is to make those boundaries explicit.
