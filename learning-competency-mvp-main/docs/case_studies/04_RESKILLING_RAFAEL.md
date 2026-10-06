# 04 — Reskilling & Social Impact: Evidence-Backed AI Skills

> **Project:** Learning Competency MVP (LASTRO)  
> **Vertical:** Technical Education / Social Impact / Funding Programs  
> **Scenario:** Instituto Futuro Tech / Rafael, AI Developer Trainee  
> **Technical status:** **Funding and employability blueprint**  
> **Reviewer role in scenario:** Senior mentor / software engineer

> **Strategic note:** This case is a proposed application model. It is not evidence of an actual employment outcome, grant audit, or deployment by the named scenario organization.

## 1. Context & problem

The scenario addresses the gap between course completion and demonstrable technical capability. It proposes replacing a generic completion signal with inspectable project evidence evaluated against explicit competency criteria.

The scenario also frames a funding perspective: program sponsors may need evidence of technical outcomes beyond enrollment or attendance.

## 2. Audited competency matrix

| Criterion | Technical description | Evidence expected |
|---|---|---|
| C1 | Connect and ingest knowledge sources into a vector database | RAG ingestion pipeline |
| C2 | Apply semantic chunking and retrieval strategies | Retrieval implementation |
| C3 | Evaluate answer relevance, faithfulness and precision | RAG evaluation metrics |
| C4 | Deploy a functional authenticated API | OpenAPI specification / deployed endpoint |

## 3. Proposed evidence package

The source case specifies:

1. `pipeline_rag_cooperativa.py` — ingestion and retrieval pipeline.
2. `benchmark_precisao_ragas.json` — evaluation metrics.
3. `openapi_spec.json` — API contract.
4. `video_demonstracao_execucao.md` — execution logs and stakeholder testimony.

These are **scenario artifacts**, not current public MVP fixtures.

## 4. Evaluation model

The proposed application should use the same decision architecture already implemented in the MVP:

```
Practical Project Evidence
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
   └─ CONFLICT → Mentor Human Adjudication
                         ↓
                 DEMONSTRATED
                 or IN_DEVELOPMENT
```

The mentor is **not a routine fourth verifier**. Human adjudication is activated when the independent mechanisms conflict or when the defined rules cannot resolve a material contextual question.

The adjudicator must resolve the conflicting signals per criterion, preserve the evidence references and rationale, and may request additional evidence. A positive competency state requires all required criteria to remain supported after adjudication; otherwise the result remains IN_DEVELOPMENT.
## 5. Broader workforce context

The World Economic Forum's *Future of Jobs Report 2025* describes substantial labour-market transformation driven by technological and other macrotrends; it estimates that job creation and displacement associated with these trends could represent 22% of today's formal employment by 2030. That context supports investigation into how organizations assess changing capabilities, but it does not validate this specific scenario or LASTRO's commercial model. [WEF — Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/)

For trustworthy AI evaluation and governance, the [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) provides a relevant external framework.

## 6. What remains unproven

This case does not establish:

- a real 15-day hiring outcome;
- that 100% of a program's graduates could be proven competent;
- grant-compliance outcomes;
- employer willingness to accept LASTRO credentials;
- a causal relationship between blockchain attestation and hiring.

Those are future empirical questions.

## Evidence & status boundary

This document is a **case-study artifact**, not evidence of a completed customer deployment unless explicitly stated otherwise.

The case studies distinguish:

- **Implemented / reproducible** — supported by the public MVP code and fixtures.
- **Scenario / blueprint** — a structured application hypothesis derived from the research and product model.
- **External evidence** — claims supported by an identified external source.
- **Illustrative claim** — content supplied by the case-study scenario that still requires external validation.

The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes, or ROI.