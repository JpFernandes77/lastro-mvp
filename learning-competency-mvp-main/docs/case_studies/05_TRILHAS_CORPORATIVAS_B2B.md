# 05 — Corporate Competency Trails: Reskilling & Evidence-Based Hiring

> **Project:** Learning Competency MVP (LASTRO)  
> **Vertical:** Enterprise / HR / Learning & Development / Talent Acquisition  
> **Audience:** CHROs, CTOs, L&D leaders and Talent Acquisition leaders  
> **Authors:** JX & Erick — Market Research, GTM & Dataroom  
> **Status:** **B2B commercialization blueprint — hypothesis, not validated traction**

> **Editorial boundary:** This document translates the LASTRO technical architecture into a possible enterprise operating and monetization model. It is not a fifth technical case, customer proof, pricing validation, or production deployment.

## 1. Commercial thesis

The source document identifies two recurring enterprise problems:

1. **Reskilling:** organizations can measure participation and completion in learning systems more easily than demonstrated application of new skills at work.
2. **Hiring:** conventional screening can produce weak evidence of whether a candidate can actually perform the target work.

The proposed LASTRO response is to make **inspectable work artifacts** the center of competency evaluation: practical challenges, explicit criteria, evidence, independent verification, consensus and an auditable decision record.

The claims in this section are a **commercial thesis to validate**, not measured market outcomes.

## 2. Corporate competency trail

A corporate trail should not be represented as a video playlist. It is a structured sequence of work challenges with explicit competency criteria.

### Proposed operating model

```
Target Role / Competency
        ↓
Observable Criteria
        ↓
Work Challenge
        ↓
Evidence Artifacts
        ↓
┌──────────────────────────────────────┐
│ Independent Verification             │
│ • Evidence / Integrity               │
│ • Deterministic Criteria             │
│ • AI Interpretation                  │
└──────────────────────────────────────┘
        ↓
Consensus Core
   ├─ AGREEMENT → state update
   ├─ INSUFFICIENT_EVIDENCE → request / hold
   └─ CONFLICT → Human Adjudication
                         ↓
                  DEMONSTRATED /
                  IN_DEVELOPMENT
        ↓
Attestation / Verification
```

This replaces the source document's simplified “AI pre-analysis → leader attestation” description with the current LASTRO architecture. Human adjudication is an **exception path**, not a routine approval stage.

## 3. Reskilling / Upskilling application

### Trail A — Operational automation & AI

**Hypothesis:** operational, support or finance analysts could demonstrate readiness for automation-oriented roles through practical work rather than course completion alone.

Example criteria from the source document:

- **C1:** structure corporate prompts for real operational contexts;
- **C2:** build a no-code/low-code workflow with error handling;
- **C3:** validate AI outputs against organizational data or systems;
- **C4:** demonstrate an integrated automation in a sandbox.

Example evidence:

- prompt templates;
- workflow implementation;
- validation/audit report;
- functional sandbox demonstration.

The source document proposes a manager or Tech Lead as the relevant organizational reviewer. In the current architecture, that person should be treated as the **human adjudicator only when the Consensus Core reaches a material conflict or contextual decision boundary**.

### Trail B — AI Product Ownership & Governance

The source document proposes evidence such as:

- product requirements and cost/latency assumptions;
- hallucination-risk and fallback policy;
- data-governance / LGPD documentation.

These can be mapped to explicit competency criteria and evaluated through the same evidence-to-state architecture.

**Validation required:** whether organizations would actually use such trails for promotion, mobility or qualification decisions.

## 4. Evidence-based hiring application

The source document proposes a practical hiring trail in which a company provides an anonymized business dataset and asks candidates to solve a concrete problem.

A representative sequence is:

1. **Challenge:** solve a defined business/technical problem using an anonymized dataset.
2. **Submission:** notebook, implementation, tests and an executive rationale.
3. **Evidence processing:** preserve provenance and integrity and relate artifacts to the target criteria.
4. **Independent verification:** deterministic checks and AI interpretation operate separately.
5. **Consensus:** convergent cases may advance automatically; insufficient evidence remains unresolved; conflicts can be escalated to human adjudication.
6. **Decision:** the organization's authorized decision-maker acts on the resulting evidence and state.

The source PDF proposes a “5-minute review” and candidate ranking outcomes. Those figures are retained here only as **commercial hypotheses**; the public MVP does not validate those time savings or hiring outcomes.

Likewise, plagiarism detection against public repositories is an **extension hypothesis**, not a current LASTRO MVP claim.

## 5. B2B monetization hypotheses

The source document proposes two complementary commercial models.

### Model A — Corporate SaaS

**Target:** organizations using structured reskilling/upskilling programs.

**Source proposal:** a platform fee plus approximately **R$25–R$45 per attested employee**.

This is a **pricing hypothesis**. No willingness-to-pay study or recurring customer evidence is claimed here.

### Model B — Pay-per-Hiring

**Target:** organizations recruiting technical and AI roles.

**Source proposal:** approximately **R$500–R$1,500 per hiring trail**, with the source scenario describing up to 100 candidates.

Again, these values are **commercial hypotheses**, not validated price points.

### What must be validated

Before presenting either model as a business fact, LASTRO needs evidence on:

- buyer and budget owner;
- willingness to pay;
- acceptable assessment cost;
- conversion from challenge to interview/offer;
- reviewer time saved;
- candidate acceptance;
- recurring usage;
- procurement and compliance requirements.

## 6. Strategic value hypotheses

The source document proposes three potential value propositions:

### Talent mobility

Portable, verifiable records could make demonstrated work more reusable across organizational contexts.

**Status:** hypothesis requiring candidate and employer validation.

### Auditability

Evidence-linked decision records may improve reconstruction of how a competency state was produced.

**Status:** technically aligned with the current architecture, but regulatory value depends on the applicable organization, process and legal context.

An attestation does **not** by itself establish regulatory compliance.

### Low-cost verification infrastructure

The source document proposes that low-cost blockchain anchoring could support a high-volume B2B model.

**Status:** infrastructure hypothesis. Unit economics must be measured from actual production architecture, transaction behavior, storage, operations, support and enterprise requirements before a gross-margin claim is made.

## 7. Connection to the public MVP

Case 01 provides the current public, synthetic and reproducible anchor for the evidence-to-competency mechanism.

Case 05 does **not** claim that the commercial models are already implemented. Instead:

```
Public MVP
    ↓
Evidence → Verification → Consensus → State → Attestation
    ↓
Commercial Product Hypothesis
    ↓
Customer / Buyer Validation
    ↓
Pricing Validation
    ↓
Pilot
    ↓
Recurring Adoption
```

This distinction is deliberate. A technically reproducible MVP is evidence of technical feasibility; it is not evidence of product-market fit.

## 8. Investor / evaluator reading guide

Case 05 answers:

> **How could the LASTRO verification infrastructure become an enterprise product?**

It should be read together with:

- **Case 01** — what is currently reproducible;
- **Consensus Core** — how competency state is actually produced;
- **Research Map / Article Track** — why the evidence-to-competency problem is worth investigating;
- **Project Status / Limitations & Claims** — what remains unvalidated.

The strongest defensible proposition is therefore not “LASTRO has already solved enterprise hiring and reskilling.”

It is:

> **LASTRO has a reproducible evidence-to-competency vertical slice and a structured hypothesis for turning that mechanism into enterprise competency trails; the commercial layer remains an empirical validation program.**

## 9. Evidence boundary

This document distinguishes four classes of claims:

- **Implemented:** supported by public code, fixtures and tests.
- **Architecture:** supported by the documented design and executable implementation.
- **Commercial hypothesis:** proposed pricing, workflow, ROI or buyer assumptions requiring validation.
- **External evidence:** claims supported by independently sourced research, standards or market data.

No section of this document should be read as proof of customer adoption, revenue, ROI, regulatory approval, hiring outcomes or product-market fit.
