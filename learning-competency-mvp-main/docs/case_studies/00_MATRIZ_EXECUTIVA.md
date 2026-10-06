# 00 — Case Study Portfolio Matrix

> **Project:** Learning Competency MVP (LASTRO)  
> **Source:** Case-study portfolio supplied in the project dataroom, dated 1 October 2026  
> **Purpose:** Show how the same evidence-to-competency pattern can be instantiated across distinct operating environments without presenting future scenarios as current product capability.

## Portfolio thesis

The portfolio explores a common problem across enterprise work and talent-development contexts: **completion signals and generic credentials are weaker evidence of practical capability than inspectable work artifacts**.

The four cases below test the same conceptual chain across different domains. Only Case 01 is tied to the current public MVP fixture set. Cases 02–04 are expansion blueprints and should be read as **application hypotheses**, not deployed customer evidence.

| # | Vertical | Persona | Competency focus | Public status |
|---|---|---|---|---|
| 01 | FinTech / AI Finance | Ana — Data Scientist | Prompt engineering, hallucination mitigation, traceability | **MVP anchor — synthetic, reproducible** |
| 02 | HealthTech / AI governance | Gabriel — Data & AI Governance | De-identification, re-identification risk, prompt traffic controls, regulatory documentation | **B2B expansion blueprint** |
| 03 | DevSecOps | Mariana — Backend Engineer | AI-generated code security, prompt-injection defenses, security testing, secrets management | **B2B expansion blueprint** |
| 04 | Reskilling / Social Impact | Rafael — AI developer trainee | RAG ingestion, retrieval, evaluation, API deployment | **Funding / employability blueprint** |
| 05 | Enterprise B2B | CHROs / CTOs / L&D / Talent Acquisition | Corporate competency trails, reskilling & evidence-based hiring | **Commercialization blueprint — hypothesis** |

## Common architectural pattern

The case-study portfolio must follow the current Consensus Core rather than a simplified “AI recommends → human decides” model:

```
EVIDENCE
   ↓
┌─────────────────────────────────────────────┐
│ Independent Verification Mechanisms         │
│                                             │
│ • Evidence / Integrity Check                │
│ • Deterministic Criteria Check              │
│ • AI Interpretation                         │
└─────────────────────────────────────────────┘
   ↓
CONSENSUS CORE
   ├── AGREEMENT → automatic state update
   ├── INSUFFICIENT_EVIDENCE → request / hold
   └── CONFLICT → HUMAN ADJUDICATION
                         ↓
                  DEMONSTRATED
                  or IN_DEVELOPMENT
   ↓
ATTESTATION
   ↓
VERIFICATION
```

Consensus is not a vote count. It is convergence between independent mechanisms observing different properties of the same evidence.

Human adjudication is therefore an **exception path**, not a normal review stage. It is entered only when the Consensus Core returns CONFLICT (or when a contextual decision cannot be resolved by the defined rules). INSUFFICIENT_EVIDENCE does not become a human “override”; it remains unresolved until additional evidence or an appropriate next action is supplied.

For the MVP, the human adjudication record must preserve the adjudicator, evidence considered, criteria, decisions, rationale, timestamp, rule/version context, and references to the preceding interpretation and consensus state. Prior verification results are never erased.
## Evidence & status boundary

This document is a **case-study artifact**, not evidence of a completed customer deployment unless explicitly stated otherwise.

The case studies distinguish:

- **Implemented / reproducible** — supported by the public MVP code and fixtures.
- **Scenario / blueprint** — a structured application hypothesis derived from the research and product model.
- **External evidence** — claims supported by an identified external source.
- **Illustrative claim** — content supplied by the case-study scenario that still requires external validation.

The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes, or ROI.