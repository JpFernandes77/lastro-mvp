# 01 — FinTech: AI-Assisted Financial Analysis

> **Project:** Learning Competency MVP (LASTRO)  
> **Vertical:** Financial Services / FinTech B2B  
> **Scenario:** Nexus Capital / Ana, Junior Data Scientist  
> **Technical status:** **MVP anchor — synthetic and reproducible**  
> **Evidence source:** `fixtures/synthetic/ana/`  
> **Evaluation model:** AI recommendation + human adjudication

> **Evaluator note:** This is the canonical scenario used by the public MVP. The repository identifies Ana's evidence as **synthetic fixtures**. It is therefore presented here as a reproducible demonstration scenario, not as evidence of a real customer deployment.

## 1. Context & problem

The scenario describes a financial organization using LLMs to accelerate credit-risk analysis and financial-statement summarization. The competency problem is not whether Ana completed training, but whether her work artifacts demonstrate specific operational capabilities relevant to safe financial analysis.

The source case study frames the problem through a distinction between course completion and demonstrated ability to verify sources, structure prompts, mitigate hallucination risk, and document the provenance of analysis.

**Scenario pain point:** a generic certificate does not, by itself, expose whether a practitioner can perform the work required in a high-stakes environment.

## 2. Audited competency matrix

| Criterion | Technical description | Evidence expected |
|---|---|---|
| C1 | Structure complex prompts around dense financial context and output constraints | Prompt / briefing artifact |
| C2 | Apply active hallucination-mitigation and cross-checking techniques | Analysis notebook / verification chain |
| C3 | Iteratively optimize queries for quality and token efficiency | Analysis iterations / results |
| C4 | Preserve traceability between source financial data and inferred output | Executive synthesis with source references |

## 3. Evidence artifacts

The public repository contains the synthetic fixture set described by the case:

1. `a1_briefing.md` — analysis scope and risk constraints.
2. `a2_preparacao.ipynb` — data preparation notebook.
3. `a3_analise.ipynb` — chained analysis and verification.
4. `a4_sintese.md` — executive synthesis with traceable references.

The fixture directory also contains `a3_resultados.md` and `adjudication_demonstrated.json` used by the public demonstration path.

## 4. Evaluation pipeline

The public MVP does **not** use a simple “AI recommendation → human review” pipeline. It uses three independent verification mechanisms before any human intervention.

### 4.1 Evidence / Integrity Check

The system verifies that eligible evidence exists, is associated with the expected subject/activity, and passes its cryptographic integrity check.

### 4.2 Deterministic Criteria Check

The system applies explicit competency-contract rules directly to the evidence structure. This check is deliberately independent from AI signals, confidence or classification.

### 4.3 AI Interpretation

The AI interprets the semantic content of evidence and produces an interpretive signal. It is **not an authority over competency state**.

### 4.4 Consensus Core

The three results are evaluated together:

- **AGREEMENT** → the competency state may advance automatically.
- **INSUFFICIENT_EVIDENCE** → the state does not advance; the case remains unresolved until the evidence contract is satisfied.
- **CONFLICT** → the case enters the exceptional human-adjudication path.

This is the critical architectural distinction: **human adjudication is not the default decision-maker. It is the resolution mechanism for unresolved conflict.**

### 4.5 Human Adjudication — exception path

When CONFLICT occurs, the adjudicator does not simply “approve or reject the AI recommendation”. The adjudication record resolves the conflicting signals **per criterion**.

For each relevant signal, the adjudicator may:

- accept the signal;
- correct the interpretation, with an explicit corrected assessment and rationale;
- reject the signal, with rationale;
- request_more_evidence.

A DEMONSTRATED transition requires all competency criteria to be supported by evidence after adjudication. Otherwise the outcome resolves to IN_DEVELOPMENT, with any open evidence requests preserved.

The adjudication is linked to the previous interpretation and CONFLICT result; it does not overwrite or erase the prior verification history.

The public fixture `adjudication_demonstrated.json` exists specifically to exercise this exceptional path.
## 5. Attestation layer

The repository contains a Solana attestation implementation and verification path:

- [Solana attestation implementation](../../src/solana/attest.ts)
- [Solana demo](../../src/solana/demo.ts)
- [Solana verification](../../src/solana/verify.ts)
- `npm run demo`
- `npm run demo:adjudication`
- `npm run m3:attest`
- `npm run m3:verify`

The current scenario should be understood as **Devnet demonstration infrastructure**, not a production credentialing deployment. Solana's own documentation describes Devnet as a public testing/development environment rather than the production network.

## 6. What this case demonstrates

**Demonstrated by the public MVP:**

```
Synthetic Work Artifacts
        ↓
Deterministic Evidence Processing
        ↓
AI Recommendation
        ↓
Human Adjudication
        ↓
Attestation / Verification Path
```

**Not demonstrated by this case:**

- customer adoption;
- production financial decision-making;
- regulatory approval;
- economic ROI;
- universal competency assessment;
- that an on-chain record makes a competency claim true.

## 7. References & frameworks

- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Solana Devnet documentation](https://solana.com/docs/references/clusters)

## Evidence & status boundary

This document is a **case-study artifact**, not evidence of a completed customer deployment unless explicitly stated otherwise.

The case studies distinguish:

- **Implemented / reproducible** — supported by the public MVP code and fixtures.
- **Scenario / blueprint** — a structured application hypothesis derived from the research and product model.
- **External evidence** — claims supported by an identified external source.
- **Illustrative claim** — content supplied by the case-study scenario that still requires external validation.

The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes, or ROI.