# 03 — DevSecOps: Security Review of AI-Generated Code

> **Project:** Learning Competency MVP (LASTRO)  
> **Vertical:** Software Engineering / Application Security  
> **Scenario:** CloudScale Technologies / Mariana, Mid-level Backend Engineer  
> **Technical status:** **B2B expansion blueprint**  
> **Reviewer role in scenario:** AppSec Lead

> **Strategic note:** This case is a verticalization blueprint. It is not evidence of a real CloudScale deployment, a verified vulnerability-remediation program, or a completed SOC 2 / ISO 27001 audit.

## 1. Context & problem

The scenario addresses a practical consequence of AI-assisted software development: faster code production increases the importance of demonstrating that developers can inspect, test and secure machine-generated code.

The source case focuses on injection, authorization, prompt-injection and secret-management risks.

## 2. Audited competency matrix

| Criterion | Technical description | Evidence expected |
|---|---|---|
| C1 | Detect security flaws in AI-generated code | Reviewed code diff |
| C2 | Apply prompt / agent guardrails against injection | Guardrail implementation |
| C3 | Write automated security tests that exercise vulnerabilities | Security test suite |
| C4 | Prevent secrets from entering model context or final code | Secret-management evidence |

## 3. Proposed evidence package

The source case specifies:

1. `pull_request_diff.patch` — security-focused code change.
2. `test_security_exploit.ts` — exploit regression tests.
3. `prompt_security_guardrails.py` — agent-input protection.
4. `analise_post_mortem_vulnerabilidade.md` — explanation of the original weakness and mitigation.

These artifacts are **not currently published as LASTRO fixtures**.

## 4. Evaluation model

The blueprint inherits the current Consensus Core rather than inserting an AppSec reviewer into the normal pipeline:

```
Code / Tests / Security Evidence
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
   └─ CONFLICT → AppSec Human Adjudication
```

The AppSec Lead is therefore an **exception-path adjudicator**, not a fourth vote. When CONFLICT occurs, the adjudicator resolves the relevant signals per criterion and must preserve the evidence, rationale, identity, timestamp and rule/version context.

A DEMONSTRATED outcome requires the criteria to be supported after adjudication. If the evidence remains insufficient, the competency remains IN_DEVELOPMENT; the system does not manufacture a positive result simply because a human reviewer was involved.
## 5. External security foundations

OWASP Top 10:2021 identifies broken access control and injection among the major classes of web-application risk. OWASP also recommends source-code review and automated testing as part of detecting and preventing injection vulnerabilities. These references support the **competency criteria**, not the claim that the scenario has already occurred in production.

- [OWASP Top 10:2021](https://owasp.org/www-project-top-ten/)
- [OWASP A01 — Broken Access Control](https://top10.owasp.org/2021/A01_2021-Broken_Access_Control/)
- [OWASP A03 — Injection](https://top10.owasp.org/2021/A03_2021-Injection/)
- [OWASP A09 — Security Logging and Monitoring](https://owasp.org/Top10/en/A09_2021-Security_Logging_and_Monitoring_Failures/)

## 6. What remains unproven

The case does not establish:

- a measured 40% productivity gain;
- a verified production vulnerability rate;
- SOC 2 or ISO 27001 compliance;
- that a LASTRO attestation replaces AppSec review;
- that a credential is an “incontestable” proof of professional proficiency.

Those require empirical evidence beyond this blueprint.

## Evidence & status boundary

This document is a **case-study artifact**, not evidence of a completed customer deployment unless explicitly stated otherwise.

The case studies distinguish:

- **Implemented / reproducible** — supported by the public MVP code and fixtures.
- **Scenario / blueprint** — a structured application hypothesis derived from the research and product model.
- **External evidence** — claims supported by an identified external source.
- **Illustrative claim** — content supplied by the case-study scenario that still requires external validation.

The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes, or ROI.