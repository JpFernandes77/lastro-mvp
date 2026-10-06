# Work Evidence → Competency Inference / State — Academic Research

> **Public research boundary:** This document is a scoped research artifact published to make LASTRO's reasoning auditable and challengeable. It is not a systematic review, legal novelty analysis, commercial validation, or proof of academic novelty.

**Public status:** PUBLIC RESEARCH ARTIFACT — SCOPED ACADEMIC REVIEW

**Status:** RESEARCH COMPLETE — focused initial review
**Date:** 2026-10-04

## 1. Research question

> When observable work or performance evidence is collected under defined competency criteria, what academic methods support an inference about a person's competency or competency state?

This review deliberately narrows the question. It is not a generic review of competency frameworks; it investigates the transition from observable work/performance evidence to a bounded competency inference or state.

## 2. Executive conclusion

The academic literature strongly establishes that:

- competency claims are inferential claims rather than direct observations;
- evidence-centered design formalizes claim → evidence → task relationships;
- workplace-based assessment uses authentic performance evidence to inform competency judgments;
- single observations are generally insufficient for strong competency claims;
- multiple observations, methods, contexts, raters and time points can strengthen generalization;
- longitudinal programmatic assessment can represent competency development over time;
- portfolios can aggregate heterogeneous evidence for competency decisions;
- learning analytics can translate workplace tasks and artifacts into computational models of development.

The literature does not, from this focused review, establish a general-purpose architecture that explicitly combines provenance-bound work evidence, AI-assisted interpretation, independent verification mechanisms, explicit consensus, bounded competency-state formation and cryptographic attestation.

> The academic foundation for LASTRO's core problem is strong. The full verification composition remains a research hypothesis.

## 3. Evidence-centered design is the foundational inferential model

Mislevy, Almond and Lukas' 2003 work on Evidence-Centered Design (ECD) treats assessment as evidentiary reasoning. The basic relationship is claim → evidence → task.

ECD begins by specifying the claim about a construct, defining observable evidence that would support that claim, and designing tasks capable of eliciting that evidence.

This is directly relevant to LASTRO: an artifact does not become evidence merely because it exists. Its observable features must be justified as evidence for a defined competency claim.

Source: Mislevy, R. J., Almond, R. G., & Lukas, J. F. (2003), A Brief Introduction to Evidence-Centered Design.
https://citeseerx.ist.psu.edu/document?doi=933902121f34c3bfdb48aea7437025d3dca97b08&repid=rep1&type=pdf

Recent ECD work on automated analysis of produced artifacts extends this reasoning toward knowledge-in-use and automated tracking, while explicitly retaining validity and reliability as concerns.

Source: Using Evidence-Centered Design to Develop an Automated System.
https://watermark02.silverchair.com/oso-9780198882077-chapter-11.pdf

## 4. Workplace-based assessment is the closest established precedent

Workplace-based assessment (WBA) is the closest academic family to the research question. Competence is informed by authentic observations rather than only examinations.

Established evidence types include direct observation, multisource feedback, narrative feedback, performance ratings, case discussions, reflections and workplace portfolios.

Bok et al. (2018) analyzed 327,974 assessment data points from 962 students across up to 124 weeks, using multiple workplace-based assessment methods across seven competency domains. The study explicitly frames the problem as an inference problem: observed performance scores must support claims about competency development over time, and those inferences require validity evidence.

Source: Bok, H. G. J., de Jong, L. H., O'Neill, T., Maxey, C., & Hecker, K. G. (2018), Validity evidence for programmatic assessment in competency-based education.
DOI: 10.1007/s40037-018-0481-2
https://doi.org/10.1007/s40037-018-0481-2

The study reports reliability coefficients of 0.86–0.90 and emphasizes that inference from observation-based scores is complicated by multiple competencies, methods, raters, contexts and time points.

## 5. Programmatic assessment provides strong prior art for state formation

Programmatic assessment treats individual observations as pieces of information that must be aggregated, triangulated and interpreted across a broader assessment program.

The conceptual transition is:

individual observations → multiple methods → multiple contexts → triangulation → competency judgment

Schuwirth and van der Vleuten describe a shift away from trying to measure isolated competency fragments toward constructing a meaningful holistic narrative about competence.

Source: Schuwirth, L. W. T., & van der Vleuten, C. P. M. (2019), How 'Testing' Has Become 'Programmatic Assessment for Learning'.
https://researchnow-admin.flinders.edu.au/ws/files/20461944/Schuwirth_How_P2019.pdf

This is strong prior art for evidence aggregation and competency inference, but it is not equivalent to LASTRO's Consensus Core: the academic model generally relies on human/programmatic judgment rather than an explicit machine-auditable consensus protocol.

## 6. Portfolio research exposes the interpretation problem

Competency portfolios already aggregate heterogeneous evidence. Research on competency-based portfolio assessment shows, however, that assessors may interpret the same portfolio differently.

Reported differences include which evidence assessors consider credible, how much evidence they inspect, whether they prioritize narrative feedback or scores, and how their own theories of performance and competence shape inference.

Source: Competency-based portfolio assessment — Maastricht University research repository, section From aggregation to interpretation: How assessors judge complex data in a competency-based portfolio.
https://cris.maastrichtuniversity.nl/files/53973664/c6850.pdf

This supports an important LASTRO hypothesis:

> The hard problem is not only collecting work evidence. It is making the inferential transformation from heterogeneous evidence to a bounded competency state explicit, reproducible and auditable.

## 7. Learning analytics provides a computational bridge

Research on e-portfolios enhanced with learning analytics describes a pipeline in which workplace-related tasks are defined, assessment procedures are aligned to those tasks, evidence such as products and performance scores is collected, and the evidence is translated into probabilistic models of development.

Source: van der Schaaf et al., Improving workplace-based assessment and feedback.
https://centaur.reading.ac.uk/69849/1/Improving%20workplace-based%20assessment%20and%20feedback.pdf

This demonstrates academic precedent for work tasks → evidence → computational development model.

However, it does not establish the rest of LASTRO's architecture: independent verification, explicit consensus, deterministic state formation and cryptographic attestation.

## 8. Validity is the central constraint

The literature repeatedly warns against treating observation as equivalent to competence.

The safer relationship is:

observation → evidence/score → generalization → extrapolation → competency claim

Kane's argument-based validity framework treats validity as a sequence of inferences whose warrants must be supported by evidence. The programmatic-assessment literature applies this logic directly to workplace performance.

Implication for LASTRO:

> A competency state should encode the scope and conditions under which the evidence supports the claim.

This directly supports LASTRO's current bounded language: demonstrated under a defined evidence contract and context.

## 9. Academic landscape

| Mechanism | Evidence in literature | LASTRO interpretation |
|---|---|---|
| Competency frameworks | Strong | Foundation |
| Observable performance as evidence | Strong | Foundation |
| Workplace-based assessment | Strong | Foundation |
| Authentic work samples | Strong | Foundation |
| Portfolio evidence | Strong | Foundation |
| Multiple evidence sources | Strong | Foundation |
| Longitudinal progression | Strong | Foundation |
| Triangulation | Strong | Foundation |
| Evidence-centered design | Strong | Foundation |
| Probabilistic development models | Established | Supporting precedent |
| AI analysis of produced artifacts | Emerging | Supporting precedent |
| Independent verification of competency evidence | Less established | Differentiation hypothesis |
| Explicit machine-auditable consensus between verification mechanisms | Not identified as a standard pattern in this review | Differentiation hypothesis |
| Deterministic competency-state record | Partially represented | Differentiation hypothesis |
| Cryptographic attestation of competency state | Adjacent credential/provenance literature | Differentiation hypothesis |
| Full evidence → independent verification → consensus → state → attestation composition | Not established by this focused review | Core LASTRO hypothesis |

## 10. The most important finding

The defensible academic statement is NOT:

> Nobody has researched turning work into competency.

That would be false. A substantial body of research already studies performance evidence, workplace observation, competency assessment, portfolios, longitudinal assessment, triangulation and competency progression.

The defensible statement is:

> Academic research has extensively studied how observations of performance and workplace evidence can support competency judgments. However, this focused review did not identify a general-purpose architecture that explicitly combines provenance-bound work evidence, AI-assisted interpretation, independent verification mechanisms, explicit consensus, bounded competency-state formation and cryptographic attestation into one auditable infrastructure pipeline.

This is a bounded research finding, not a claim of invention, patentability or market uniqueness.

## 11. Implications for LASTRO

1. **Evidence contract:** competency claims should specify what observable evidence is relevant. This follows directly from ECD.
2. **Multiple evidence sources:** a single artifact should rarely determine a broad competency state.
3. **Context binding:** evidence should retain task and context conditions.
4. **Longitudinal state:** competency can change over time, so the state should not be treated as immutable.
5. **Provenance:** source and nature of evidence matter to interpretation.
6. **Explicit uncertainty:** insufficient evidence is a legitimate state, not a failure of the system.
7. **AI as interpretation:** AI can assist artifact interpretation, but the validity of the resulting competency claim is a separate question.

Recent ECD research on human-AI collaborative writing demonstrates that artifacts and process data can be used as evidence for capability claims, while still framing the problem through evidence-centered assessment.

Source: Cheng, Y., Lyons, K., Chen, G., Gasevic, D., & Swiecki, Z. (2024), Evidence-centered Assessment for Writing with Generative AI.
https://arxiv.org/abs/2401.08964

## 12. What this research does not establish

This review does not establish:

- academic novelty of LASTRO;
- patentable novelty or legal novelty;
- commercial validation;
- reliable AI inference of competency across arbitrary domains;
- that work evidence is always representative of underlying capability;
- that competency states are permanent;
- that cryptographic attestation improves the validity of competency inference;
- that verification mechanisms are statistically independent merely because they are implemented separately;
- that consensus between mechanisms guarantees correctness.

## 13. Research gap

The strongest gap is not:

> Can work evidence indicate competence?

That question is already well established.

The more precise research gap is:

> Can heterogeneous evidence of real work be transformed into a bounded competency state through an explicit, auditable, multi-mechanism verification process in which provenance, interpretation, independent verification, uncertainty and state formation remain separately inspectable?

This positions LASTRO as a proposed verification infrastructure for competency inference rather than as a generic competency-assessment product.

## 14. Final verdict

**Work evidence → competency inference:** STRONG academic foundation.

**Competency progression/state:** STRONG academic foundation.

**Computational inference:** ESTABLISHED but domain-specific.

**Independent verification:** UNDERDEVELOPED in the specific competency-assessment literature reviewed.

**Consensus Core:** RESEARCH HYPOTHESIS; aggregation and triangulation are established, but an explicit machine-auditable consensus mechanism between independent verification mechanisms was not identified as a standard competency-assessment pattern.

**Attestation:** ADJACENT infrastructure, not established as part of competency inference itself.

> **The academic literature validates LASTRO's starting premise but does not validate its complete architecture.**

Therefore the academically credible contribution is:

> **LASTRO investigates whether established principles of evidence-centered assessment and workplace competency inference can be composed with independent verification, explicit consensus, provenance and attestation into an auditable capability-verification infrastructure.**

---

## Public interpretation boundary

This document should be read as a bounded research artifact. Established external findings are separated from LASTRO's interpretation and research hypotheses. Where the review is incomplete, the document says so explicitly. Nothing here overrides the current MVP implementation or canonical architecture.