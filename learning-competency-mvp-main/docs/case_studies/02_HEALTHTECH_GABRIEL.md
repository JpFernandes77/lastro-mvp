# 02 — HealthTech: LLM Governance & Medical-Record De-identification

> **Project:** Learning Competency MVP (LASTRO)  
> **Vertical:** Healthcare / Diagnostic Medicine  
> **Scenario:** MedVanguarda / Gabriel, Data & Health Systems Governance Analyst  
> **Technical status:** **B2B expansion blueprint**  
> **Reviewer role in scenario:** DPO / Data Protection Officer

> **Strategic note:** This is an application blueprint. It is not evidence of a real hospital deployment, real patient-data processing, regulatory approval, or a production DPO decision.

## 1. Context & risk

The scenario explores a healthcare organization adopting AI assistants for clinical-history summarization while needing to control exposure of sensitive personal data.

The source case frames the competency requirement around practical ability to de-identify and protect data before interaction with external model providers.

**Scenario pain point:** a generic “AI + LGPD” credential does not establish that a practitioner can implement and document effective privacy controls.

## 2. Audited competency matrix

| Criterion | Technical description | Evidence expected |
|---|---|---|
| C1 | Build automated de-identification pipelines for names, identifiers, dates and addresses | Python/NLP pipeline |
| C2 | Reduce re-identification risk from contextual combinations | Redaction rules / tests |
| C3 | Configure prompt-traffic controls and audit logs | Security configuration / logs |
| C4 | Produce a privacy-impact assessment aligned with applicable requirements | RIPD / compliance report |

## 3. Proposed evidence package

The source case specifies four artifacts:

1. `pipeline_desidentificacao.py` — biomedical NER / sanitization pipeline.
2. `log_validacao_sanitizacao.csv` — validation report over synthetic records.
3. `arquitetura_seguranca_llm.md` — architecture and retention controls.
4. `relatorio_impacto_anpd.pdf` — proposed technical report for governance review.

These are **scenario artifacts**, not currently published LASTRO fixtures.

## 4. Evaluation model

The blueprint should inherit the current LASTRO decision architecture:

```
Evidence Artifacts
      ↓
┌────────────────────────────────────┐
│ Independent Verification           │
│ • Evidence / Integrity             │
│ • Deterministic Criteria           │
│ • AI Interpretation                │
└────────────────────────────────────┘
      ↓
Consensus Core
   ├─ AGREEMENT → state update
   ├─ INSUFFICIENT_EVIDENCE → request / hold
   └─ CONFLICT → Human Adjudication
```

For this HealthTech scenario, the DPO is therefore **not a routine fourth verifier or an automatic approval authority**. The DPO becomes the human adjudicator when a material conflict cannot be resolved by the defined verification rules, or when contextual/legal interpretation is explicitly required by governance.

The adjudication record should preserve the conflicting signals, evidence references, criterion-level decisions, rationale, reviewer identity, timestamp and rule version. A regulated-context decision must remain attributable to the qualified human; the attestation records the decision state and provenance rather than transferring legal responsibility to LASTRO.
## 5. Regulatory references

The ANPD describes the RIPD as documentation for processing operations that may create high risk to data-protection principles and rights, and identifies the controller as responsible for preparing it. This makes the RIPD a useful reference point for the scenario, but does **not** mean that a LASTRO attestation itself constitutes regulatory compliance. [ANPD — RIPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd)

For AI risk governance, the scenario can also be mapped to the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework).

## 6. What remains unproven

This case does not establish:

- compliance with LGPD or HIPAA;
- zero PII leakage;
- legal responsibility transfer;
- immunity from regulatory sanctions;
- production suitability of the proposed controls.

Those claims require actual organizational evidence, technical testing, legal analysis and qualified review.

## Evidence & status boundary

This document is a **case-study artifact**, not evidence of a completed customer deployment unless explicitly stated otherwise.

The case studies distinguish:

- **Implemented / reproducible** — supported by the public MVP code and fixtures.
- **Scenario / blueprint** — a structured application hypothesis derived from the research and product model.
- **External evidence** — claims supported by an identified external source.
- **Illustrative claim** — content supplied by the case-study scenario that still requires external validation.

The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes, or ROI.