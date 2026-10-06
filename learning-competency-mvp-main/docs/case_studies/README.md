# LASTRO — Case Studies

This directory contains a **curated case-study layer** showing how the LASTRO evidence-to-competency pattern can be applied across domains.

## Start here

**For evaluators:** start with **[Case 01 — FinTech / Ana](./01_FINTECH_ANA.md)**.

It is the only case in this portfolio currently tied directly to the public MVP fixture set. The repository labels those fixtures as synthetic, so the case is presented as a reproducible anchor scenario rather than a customer pilot.

## Portfolio

| Case | Domain | Status | What it is for |
|---|---|---|---|
| [00 — Executive Matrix](./00_MATRIZ_EXECUTIVA.md) | Cross-vertical | Public portfolio map | Understand the portfolio |
| [01 — FinTech / Ana](./01_FINTECH_ANA.md) | Financial AI | **Implemented synthetic scenario** | Reproduce the MVP |
| [02 — HealthTech / Gabriel](./02_HEALTHTECH_GABRIEL.md) | Healthcare / AI governance | **B2B blueprint** | Test regulated-sector applicability |
| [03 — DevSecOps / Mariana](./03_DEVSECOPS_MARIANA.md) | Software security | **B2B blueprint** | Test engineering-security applicability |
| [04 — Reskilling / Rafael](./04_RESKILLING_RAFAEL.md) | Education / impact | **Funding blueprint** | Test evidence-backed skills model |
| [05 — Corporate Trails / B2B](./05_TRILHAS_CORPORATIVAS_B2B.md) | Enterprise / HR / Talent | **Commercialization blueprint** | Test the B2B operating and monetization hypothesis |

## Shared decision architecture

All case studies should use the **current LASTRO Consensus Core**, not a simplified “AI recommendation → human review” model.

```
EVIDENCE
   ↓
Independent Verification
   ├─ Evidence / Integrity
   ├─ Deterministic Criteria
   └─ AI Interpretation
   ↓
CONSENSUS CORE
   ├─ AGREEMENT → automatic state update
   ├─ INSUFFICIENT_EVIDENCE → request / hold
   └─ CONFLICT → HUMAN ADJUDICATION
                         ↓
                  DEMONSTRATED
                  or IN_DEVELOPMENT
   ↓
ATTESTATION
   ↓
VERIFICATION
```

Human adjudication is an **exception path**. It is not a fourth verifier and is not invoked merely because a case is high-stakes. The adjudicator resolves a material conflict with a criterion-level record of evidence, action, rationale, identity, timestamp and rule/version context. Previous verification results remain preserved.

The canonical implementation is documented in [Consensus Core](../architecture/CONSENSUS_CORE.md) and [Human Adjudication tests](https://github.com/SH1W4/learning-competency-mvp/blob/main/tests/adjudication.test.ts).
## Evidence hierarchy

The case-study layer deliberately distinguishes:

**Implemented**
→ public code + fixtures + tests.

**Scenario**
→ structured hypothesis about how the architecture could be applied.

**External evidence**
→ standards, academic literature or market evidence linked to its original source.

**Unproven**
→ claims that require pilots, experiments, legal review, customer validation or additional research.

## Navigation

- [Research Map](../../research/RESEARCH_MAP.md)
- [Article Research Track](../../research/article/README.md)
- [Reproducible Demo Contract](../demo/REPRODUCIBLE_DEMO_CONTRACT.md)
- [Evaluator Walkthrough](../evaluation/EVALUATOR_WALKTHROUGH.md)
- [Project Status](../PROJECT_STATUS.md)
- [Technical Architecture](../architecture/TECHNICAL_ARCHITECTURE.md)
- [Consensus Core](../architecture/CONSENSUS_CORE.md)
- [Publication Classification Matrix](../governance/PUBLICATION_CLASSIFICATION_MATRIX.md)

## External references

- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [ANPD — RIPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd)
- [WEF — Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/)
