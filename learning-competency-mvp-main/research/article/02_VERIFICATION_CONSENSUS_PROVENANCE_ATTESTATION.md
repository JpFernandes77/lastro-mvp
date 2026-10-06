# Verification, Consensus, Provenance and Attestation — Research Layer

> **Public research boundary:** This document is a scoped research artifact published to make LASTRO's reasoning auditable and challengeable. It is not a systematic review, legal novelty analysis, commercial validation, or proof of academic novelty.

**Public status:** PUBLIC RESEARCH ARTIFACT — SCOPED CONCEPTUAL REVIEW

**Status:** RESEARCH COMPLETE — focused conceptual review  
**Date:** 2026-10-04

## 1. Research question

> What is the distinction between validity of a competency inference, verification of the resulting record, provenance of the evidence, and cryptographic attestation of the resulting state?

This review exists to prevent a category error in the LASTRO research program: treating cryptographic verifiability or agreement between mechanisms as proof that a competency claim is true.

## 2. Central finding

The research supports a strict separation:

**Evidence validity** → whether the evidence warrants an inference.

**Interpretive validity** → whether the interpretation from evidence to claim is justified.

**Verification** → whether a specified condition or record can be independently checked.

**Consensus** → how multiple signals or verification results are combined into a state.

**Provenance** → how the origin, derivation, agents and activities associated with evidence or data are represented.

**Attestation** → how a resulting claim/state is authoritatively recorded and made tamper-evident or cryptographically verifiable.

These functions are related but non-equivalent.

## 3. Verifiable Credentials provide an important boundary

W3C Verifiable Credentials Data Model 2.0 explicitly distinguishes cryptographic verification from evaluation of the truth of claims.

The specification states that verifiability of a credential does not imply truth of the claims encoded in it. A verifier first establishes authenticity and currency, then evaluates the claims according to its own policies.

Source:
W3C, Verifiable Credentials Data Model v2.0, Recommendation, 15 May 2025.
https://www.w3.org/TR/vc-data-model-2.0/

This is directly relevant to LASTRO.

A cryptographically valid attestation can establish properties such as:

- who issued a statement;
- whether its securing mechanism is valid;
- whether the protected representation has been altered;
- whether required structural/status conditions hold.

It does not independently establish that:

- the underlying evidence was representative;
- the competency inference was valid;
- the AI interpretation was correct;
- the verification mechanisms were genuinely independent;
- the consensus rule was epistemically sufficient.

Therefore:

> **Attestation preserves the integrity of a competency state; it does not establish the validity of the competency inference that produced that state.**

## 4. Provenance is a separate evidentiary layer

W3C PROV defines provenance as information about entities, activities and people involved in producing a data item or thing. Its purpose includes enabling assessments about quality, reliability and trustworthiness.

PROV-DM models:

- entities;
- activities;
- derivations;
- agents and responsibility;
- bundles;
- collections.

It also explicitly supports representation of processing steps, derivation, responsibility, reproducibility and versioning.

Sources:
W3C PROV-Overview.
https://www.w3.org/TR/prov-overview/

W3C PROV-DM.
https://www.w3.org/TR/prov-dm/

For LASTRO, provenance should therefore answer questions such as:

> Where did this evidence originate?

> Which activity produced it?

> Which agent or system was responsible?

> What transformations produced the interpreted representation?

> Which version of the evidence or interpretation was used?

This is different from asking:

> Is the competency claim valid?

Provenance provides information that can support trust and auditability; it does not by itself establish competency.

## 5. Verification must be scoped

The term "verification" is overloaded.

At least four verification problems should be distinguished:

### 5.1 Artifact verification

Can the evidence be retrieved and checked against its recorded identity/integrity?

### 5.2 Rule verification

Does the evidence satisfy an explicit objective condition?

### 5.3 Interpretation verification

Does an interpretation satisfy a specified rubric, schema or independent check?

### 5.4 State verification

Was the competency state produced according to the declared evidence, verification and consensus rules?

LASTRO's current architecture is strongest when these are kept separate.

## 6. Independence is not automatic

Two mechanisms implemented as separate modules are not necessarily statistically or epistemically independent.

For example:

AI interpretation A and AI interpretation B may appear independent while sharing:

- the same source artifact;
- the same model family;
- the same prompt;
- the same hidden assumptions;
- the same training data;
- the same preprocessing;
- the same failure modes.

Therefore the research claim should not be:

> two independent verifiers guarantee correctness.

The defensible claim is:

> the architecture makes verification mechanisms separately inspectable and allows their assumptions, inputs and outputs to be evaluated for independence.

Actual statistical independence would require empirical testing.

## 7. Consensus is aggregation, not truth

Assessment literature already establishes aggregation and triangulation as mechanisms for improving competency inference.

The LASTRO research question is narrower:

> Can aggregation rules be made explicit and machine-auditable while preserving uncertainty and conflict?

A consensus state should therefore support at least:

- agreement;
- insufficient evidence;
- conflict;
- human adjudication.

This is important because a system that always produces a positive competency state is not a verification system; it is a classification system with no explicit rejection state.

## 8. The role of uncertainty

A defensible competency state should not collapse all evidence into binary truth.

At minimum:

**DEMONSTRATED**
- evidence contract satisfied;
- sufficient evidence;
- verification mechanisms agree.

**IN DEVELOPMENT / INSUFFICIENT**
- evidence exists but does not support the bounded claim strongly enough.

**CONFLICT**
- verification mechanisms disagree materially.

**ADJUDICATED**
- authorized human resolves an exceptional conflict.

This is consistent with the broader validity problem identified in workplace and programmatic assessment research: inference must remain bounded by the evidence and context.

## 9. Architectural decomposition

The resulting conceptual model is:

WORK
↓
OBSERVABLE EVIDENCE
↓
EVIDENCE CONTRACT
↓
INTERPRETATION
↓
INDEPENDENT VERIFICATION
↓
CONSENSUS / AGGREGATION
↓
BOUNDED COMPETENCY STATE
↓
PROVENANCE RECORD
↓
ATTESTATION
↓
INDEPENDENT RECORD VERIFICATION

The final verification step verifies the integrity and authenticity of the recorded state.

It does not retroactively prove the epistemic validity of every preceding inference.

## 10. Research-gap refinement

The research gap should therefore not be expressed as:

> "No one has used blockchain to verify competence."

That would be too broad and academically weak.

A more defensible gap is:

> **Existing assessment research provides substantial foundations for evidence-centered inference, workplace assessment, triangulation and longitudinal competency judgment, while provenance and verifiable-credential research provides established mechanisms for traceability and cryptographic verification. The unresolved research problem is whether these layers can be composed into an auditable competency-verification architecture that explicitly separates evidence interpretation, independent verification, consensus, bounded state formation and subsequent attestation.**

This is a composition hypothesis, not a claim that each individual component is novel.

## 11. Implications for the article

The paper should distinguish two validity questions:

### Epistemic validity

Does the evidence support the competency claim?

Relevant foundations:
- evidence-centered design;
- workplace-based assessment;
- validity theory;
- programmatic assessment;
- triangulation;
- longitudinal assessment.

### Record integrity / verifiability

Can another party inspect and verify what state was produced, by whom, from which representation, under which rules, and whether the recorded representation was altered?

Relevant foundations:
- provenance;
- verifiable credentials;
- cryptographic signatures;
- verifiable data registries.

LASTRO sits at the proposed interface between these two domains.

## 12. Strongest formulation

The research now supports the following formulation:

> **LASTRO does not propose cryptography as a solution to competency validity. It proposes an architecture in which competency inference and record integrity are treated as distinct problems and connected through explicit provenance, independent verification, consensus and attestation layers.**

This is substantially stronger than a generic "blockchain credentials" framing.

## 13. What remains unproven

This research does not establish:

- that the architecture improves competency validity;
- that multiple verification mechanisms can be made independent in practice;
- that AI interpretation is reliable enough for high-stakes competency decisions;
- that consensus improves accuracy;
- that provenance improves assessor agreement;
- that attestation improves organizational decision quality;
- that the proposed architecture generalizes across domains;
- that LASTRO is academically novel as a complete system.

These remain empirical research questions.

## 14. Research status

| Component | Literature status | LASTRO status |
|---|---|---|
| Evidence-centered inference | Established | Foundation |
| Workplace evidence | Established | Foundation |
| Aggregation / triangulation | Established | Foundation |
| Longitudinal competency state | Established | Foundation |
| Computational inference | Established/emerging by domain | Supporting precedent |
| Provenance | Established standard | Supporting infrastructure |
| Cryptographic verification | Established | Supporting infrastructure |
| Verifiable credentials | Established standard | Adjacent precedent |
| Independent competency verification | Less established as a unified pattern | Research hypothesis |
| Machine-auditable consensus | Not identified as a standard competency-assessment pattern | Research hypothesis |
| Full composition | Not established by this review | Core research hypothesis |

## 15. Conclusion

The literature does not give LASTRO permission to claim that cryptography makes competency true.

It does, however, provide a coherent basis for investigating a more precise question:

> **Can an evidence-centered competency inference process be augmented with explicit verification, provenance, consensus and attestation so that both the epistemic decision and the integrity of its resulting record remain separately inspectable?**

That is the research problem worth taking into the article.


---

## Public interpretation boundary

This document should be read as a bounded research artifact. Established external findings are separated from LASTRO's interpretation and research hypotheses. Where the review is incomplete, the document says so explicitly. Nothing here overrides the current MVP implementation or canonical architecture.