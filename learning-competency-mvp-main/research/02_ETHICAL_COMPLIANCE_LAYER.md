# Ethical Compliance Layer — Research Specification

> **Status:** Future research hypothesis. Not part of the current MVP or committed roadmap.
> **Proposed position:** Optional pre-consensus governance gate. Not a verification mechanism.
> **Scope:** Defines how the LASTRO architecture can validate organization-specific competency rules against explicit fairness constraints before those rules are applied to evidence.

---

## 1. Purpose

The LASTRO MVP demonstrates that a competency state can be produced through the convergence of independent verification mechanisms. However, the current system does not implement an automated layer for validating whether competency rules themselves are fair, proportionate, and non-discriminatory before they are applied.

The Ethical Compliance Layer is the research hypothesis for how the architecture can evolve to address that upstream governance question without:

- becoming a moral authority;
- replacing human governance;
- introducing subjective judgment into the verification pipeline;
- claiming universal fairness across all cultural, organizational, or legal contexts.

This document specifies the proposed architectural position, executable constraints, reference frameworks, and explicit limitations of the future layer.

---

## 2. Architectural Position

The Ethical Compliance Layer is **not a verification mechanism** and **not a fourth input to the Consensus Core**.

It is proposed as a **governance gate before the Consensus Core**, validating the rule schema itself rather than evaluating evidence.

```
ORGANIZATION DEFINES COMPETENCY RULES
                ↓
┌─────────────────────────────────────┐
│   ETHICAL COMPLIANCE GATE           │
│   (FUTURE RESEARCH)                  │
│                                     │
│   ├─ PASS → Rules versioned &       │
│   │         accepted for execution  │
│   │                                 │
│   └─ FAIL → Rules rejected          │
│             (rationale preserved)   │
└─────────────────────────────────────┘
                ↓
        CONSENSUS CORE
        (operates with validated rules)
          ├─ Evidence Integrity
          ├─ Deterministic Criteria
          └─ AI Interpretation
                ↓
        COMPETENCY STATE
```

### Why this position matters

- If the layer were a verifier inside the Consensus Core, it would conflate **rule validation** with **evidence evaluation**, creating a category error.
- If it were a subjective override, it would reintroduce the single-judge problem the Consensus Core was designed to mitigate.
- As a pre-consensus governance gate, it preserves the independence of the three MVP verification mechanisms while proposing explicit constraints on the rules they operate on.

The current MVP **does not implement this gate**.

---

## 3. Reference Frameworks

The research hypothesis does not claim to invent ethical principles. It proposes operationalizing constraints derived from established frameworks, subject to jurisdictional and legal review.

| Framework | Scope | Proposed relevance |
|---|---|---|
| **AERA Standards for Educational and Psychological Testing** | Fairness in educational and psychological assessment | Validity, fairness, accommodation, and assessment practice |
| **Universal Design for Learning (UDL)** | Inclusive learning design | Multiple means of engagement, representation, action/expression |
| **EU AI Act (2024)** | Regulation of AI systems | Risk, transparency, human oversight, and high-risk contexts where applicable |
| **ISO/IEC 24029** | AI robustness / evaluation | Robustness and evaluation considerations where applicable |
| **OECD AI Principles (2019)** | Responsible AI | Transparency, fairness, accountability, human oversight |
| **FAT/ML** | Algorithmic fairness research | Proxy discrimination, disparate impact, explainability |

**Research status:** these references are not yet a validated legal/compliance mapping for LASTRO. Before implementation, each proposed constraint must be mapped to authoritative source text, applicable jurisdiction, and a concrete machine-evaluable condition.

The layer is therefore **framework-declarable** as a research direction: an organization may specify which frameworks and jurisdictional policies apply to its context.

---

## 4. Proposed Executable Constraints

The future layer should not operate on vague principles such as "be fair" or "do not discriminate". Each constraint should be expressed as an executable condition over a versioned rule schema, producing a **PASS, FAIL, or CONDITIONAL** result with an explicit rationale.

These constraints are research hypotheses, not current MVP capabilities.

### 4.1. Modality Equity (UDL-derived)

**Proposed constraint:** No competency rule should require a single evidence modality without offering at least one functionally equivalent alternative, unless a documented contextual justification exists.

**Example:**

```
RULE: "C4 requires a 10-minute oral video presentation"
CONSTRAINT CHECK: FAIL
RATIONALE: Single modality. No alternative provided.
ACTION: Reject rule. Require alternative paths (e.g., written synthesis,
        recorded audio, live demonstration with transcript).
```

### 4.2. Resource Proportionality

**Proposed constraint:** No rule should require access to tools, platforms, or resources that the organization does not provide or make reasonably accessible to all evaluated subjects.

**Example:**

```
RULE: "C2 requires analysis using [paid proprietary software]"
CONSTRAINT CHECK: FAIL
RATIONALE: Tool not universally accessible. Creates structural exclusion.
ACTION: Reject rule. Require open-source or organization-provided alternative.
```

### 4.3. Proxy Discrimination Prevention (FAT/ML-derived)

**Proposed constraint:** Criteria that may act as proxies for protected attributes should require explicit justification, contextual review, and, where appropriate, mitigation.

**Example:**

```
RULE: "C1 requires 5+ years of continuous formal education in [specific field]"
CONSTRAINT CHECK: CONDITIONAL
RATIONALE: Potential proxy. Requires contextual justification of why duration,
           rather than demonstrated competency, is the criterion.
ACTION: Require documented justification or reframe rule around demonstrated
        outcomes rather than duration.
```

This constraint cannot be fully solved by deterministic schema inspection alone. Empirical proxy detection remains an open research problem.

### 4.4. Transparency and Explainability

**Proposed constraint:** Every competency rule should have a machine-readable justification field and reference to the declared policy or framework basis from which the rule derives.

**Example:**

```
RULE: "C3 requires distinction between observation and interpretation"
JUSTIFICATION: "[framework/policy reference]"
CONSTRAINT CHECK: PASS
```

The framework citation must be verified before being treated as authoritative.

### 4.5. Impact Proportionality

**Proposed constraint:** The rigor and intrusiveness of evidence requirements should be proportionate to the impact of the competency decision on the subject.

**Example:**

```
RULE: "Internal skill badge requires 20 artifacts + 3 peer reviews"
DECISION IMPACT: Low (internal development, no career consequence)
CONSTRAINT CHECK: CONDITIONAL
RATIONALE: Evidence burden may be disproportionate to impact.
ACTION: Governance review.
```

The exact mapping between impact level and permissible evidence burden remains a research question and should not be treated as established law.

### 4.6. Revisability and Contestation

**Proposed constraint:** Every rule should have an explicit contestation path, preserved in provenance, and capable of routing relevant cases to Human Adjudication.

**Example:**

```
RULE: "C2 requires reproducible notebook"
CONTESTATION PATH: Subject may submit alternative evidence +
                   rationale → routed to Human Adjudication on CONFLICT.
CONSTRAINT CHECK: PASS
```

### 4.7. Temporal Validity

**Proposed constraint:** Rules should declare their validity period where temporal validity is material. Expired rules should not be applied to new evidence without explicit renewal.

**Example:**

```
RULE: "C1 requires proficiency in [tool version 2.3]"
VALID_UNTIL: 2025-12-31
CURRENT_DATE: 2026-10-04
CONSTRAINT CHECK: FAIL
RATIONALE: Rule expired. Requires update or renewal.
```

### 4.8. Non-Circularity

**Proposed constraint:** A rule should not require evidence that is itself produced by the system being evaluated, preventing self-referential validation loops.

---

## 5. Operational Flow

```
1. Organization submits versioned rule schema
                ↓
2. Gate parses schema and extracts:
   - criteria definitions
   - evidence requirements
   - modality constraints
   - resource dependencies
   - justification fields
   - impact/context metadata
                ↓
3. Gate evaluates each rule against declared frameworks/policies
                ↓
4. Output:
   ├─ ALL PASS → Schema versioned, accepted for execution
   ├─ ANY FAIL → Schema rejected, rationale preserved
   └─ ANY CONDITIONAL → Human governance review required
                ↓
5. Accepted schema becomes the input for Deterministic Criteria Check
   (which operates on the validated rules, as in the current MVP)
```

This flow is **future architecture**. The current MVP does not execute these steps automatically.

---

## 6. Relationship with Existing Architecture

### 6.1. With Deterministic Criteria Check

The Deterministic Criteria Check remains unchanged: it applies explicit competency rules to evidence. The future Ethical Compliance Layer would validate whether the rule schema is acceptable to execute; it would not alter how evidence criteria are evaluated.

### 6.2. With Human Adjudication

The future Ethical Compliance Layer does not replace Human Adjudication.

It introduces a proposed governance review path for rule schemas, while Human Adjudication continues to resolve evidence-level conflicts and contextual cases in the existing pipeline.

A future implementation must define whether rule-level governance review and evidence-level adjudication share the same operational interface or remain separate processes.

### 6.3. With Provenance

A future implementation should preserve every rule-validation decision (PASS, FAIL, CONDITIONAL) in provenance, creating an auditable trail of why a rule was accepted, rejected, or escalated.

### 6.4. With Vault Boundary

Proprietary rule schemas may remain in the Private Vault. A future implementation should be able to validate them without exposing their content to the Public Vault. Only an appropriate validation result and rationale may be disclosed publicly, subject to publication policy.

This does not imply that the current repository already provides a physically separated Public/Private Vault.

---

## 7. What This Layer Is NOT

To maintain claim discipline:

- **It is not a moral authority.** It does not define what is "right" or "just" in absolute terms.
- **It is not a substitute for legal or compliance review.** It is a proposed technical gate, not a legal opinion.
- **It does not eliminate human bias in rule design.** Passing explicit constraints does not prove absence of bias.
- **It is not universal.** Constraints depend on declared frameworks, organizational policy, and applicable jurisdiction.
- **It is not a fourth verifier.** It does not evaluate evidence.
- **It is not part of the current MVP.** It remains a future research hypothesis.
- **It does not make the system "ethical" in an absolute sense.** At most, a future implementation could make selected constraints explicit, auditable, and contestable.

---

## 8. Open Research Questions

1. **Framework conflict resolution:** What happens when a rule passes Framework A but fails Framework B? Who determines precedence for a given jurisdiction or organizational context?

2. **Empirical proxy detection:** How can the system detect that a seemingly neutral criterion is empirically correlated with a protected attribute in a specific population?

3. **Cross-cultural and multi-jurisdictional fairness:** How should the layer handle deployments where different legal, cultural, or organizational frameworks apply?

4. **Adversarial rule design:** Can an organization design rules that technically pass the gate but remain structurally exclusionary in practice?

5. **Dynamic constraint evolution:** How are previously accepted rules re-evaluated when frameworks, policies, or organizational contexts change?

6. **Measurement of disparate impact:** How can the system detect that a validated rule produces disparate outcomes across groups over time?

7. **Evidence burden calibration:** How should the system determine whether the evidence burden is proportionate to the decision's impact without embedding arbitrary universal thresholds?

---

## 9. Promotion boundary

This layer has no committed implementation milestone. Any future promotion would require, at minimum:

1. validated problem relevance in a real organizational context;
2. authoritative legal/framework mapping for the applicable jurisdiction;
3. machine-evaluable constraints with documented limitations;
4. human governance for conditional or contested outcomes;
5. explicit architecture and product approval before implementation.

Until those conditions are met, this document remains research only.

---

## 9A. Research Evidence — Why Evaluation Needs Constraints and Human Oversight

Recent research supports the narrower premise behind this future governance layer: automated evaluation systems can exhibit systematic bias, and human oversight can be relevant in high-stakes decision contexts.

A 2024 ACL study found that LLM-based evaluators can exhibit positional bias: the ordering of candidate responses changed evaluation outcomes, demonstrating that an apparently objective automated evaluator can be sensitive to superficial properties of the evaluation context. [ECL-01]

A 2024 IEEE BigComp study examined human-in-the-loop systems together with AI fairness toolkits as approaches to reducing age bias in AI hiring algorithms. [ECL-02]

A 2024 study of algorithmic recruitment found that diversity outcomes can be affected by the interaction between algorithmic recommendations and human decision-making, showing that the human/algorithm boundary itself can become a source of bias. [ECL-03]

These findings support the research direction but do not establish that any particular governance architecture eliminates bias. They therefore reinforce the existing position of this document:

- governance constraints should be explicit rather than implicit;
- evaluation mechanisms should be auditable;
- human intervention should remain available for high-stakes or contested decisions;
- fairness should not be represented as a universal property generated by the model itself.

### References

- [ECL-01] Wang et al. — *Large Language Models are not Fair Evaluators*, ACL 2024 — https://aclanthology.org/2024.acl-long.511/
- [ECL-02] Harris — *Combining Human-in-the-Loop Systems and AI Fairness Toolkits to Reduce Age Bias in AI Job Hiring Algorithms*, IEEE BigComp 2024 — https://doi.org/10.1109/BigComp60711.2024.00019
- [ECL-03] Bursell & Roumbanis — *After the algorithms*, 2024 — https://journals.sagepub.com/doi/full/10.1177/20539517231221758

## 10. Connection to the Bigger Opportunity

The Ethical Compliance Layer is a research component of the **Dynamic Role Architecture** hypothesis.

If the system eventually maps:

```
Work Change → Role Delta → Competency Gap → Requalification
```

then emerging competency requirements themselves become governance-sensitive artifacts. A future compliance layer could constrain how those requirements are defined before they propagate through evidence and competency workflows.

Dynamic Role Architecture remains a research direction and is not a validated commercial wedge or current MVP capability.

---

## 11. Summary

The Ethical Compliance Layer is a research hypothesis for how LASTRO could evolve from **verifying evidence against explicit rules** to **also validating rule schemas against explicit governance constraints**.

It is:

- **Architecturally positioned** as a pre-consensus governance gate;
- **Separated from the three MVP verification mechanisms**;
- **Technically framed** around executable constraints rather than vague ethical declarations;
- **Honest about limitations**, avoiding claims of universal fairness or moral authority;
- **Aligned with the current MVP** because it does not alter the existing Consensus Core;
- **Prepared for M2/M3 research**, with open questions and validation requirements explicitly documented.

The defensible claim is not that the layer makes LASTRO "ethical". The defensible research claim is that a future implementation could make selected governance constraints **explicit, auditable, versioned, and contestable**.
