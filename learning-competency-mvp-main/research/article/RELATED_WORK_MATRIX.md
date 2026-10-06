# Related Work Matrix — Evidence to Competency Verification

> **Public research boundary:** This document is a scoped research artifact published to make LASTRO's reasoning auditable and challengeable. It is not a systematic review, legal novelty analysis, commercial validation, or proof of academic novelty.

**Public status:** PUBLIC RESEARCH ARTIFACT — SCOPED RELATED-WORK MATRIX

**Status:** REVIEW MATRIX CLOSED — current scoped corpus
**Date:** 2026-10-04
**Purpose:** compare established literature, standards and adjacent systems against the LASTRO research pipeline.

This matrix is a scoped related-work analysis, not a systematic-review claim and not a legal novelty analysis. Its purpose is to determine whether the proposed composition has identifiable prior art at the level of individual mechanisms or as an integrated architecture.

## 1. Comparison dimensions

The corpus is evaluated against these dimensions:

1. observable work/performance;
2. explicit competency claim;
3. evidence contract;
4. evidence interpretation;
5. multiple evidence sources;
6. longitudinal state;
7. computational/AI interpretation;
8. independent verification;
9. explicit consensus/aggregation;
10. provenance;
11. cryptographic attestation;
12. bounded competency state;
13. full end-to-end composition.

Legend:

- **● Established / central**
- **○ Present / supporting**
- **△ Partial / adjacent**
- **— Not a material focus**
- **? Unresolved / requires further investigation**

## 2. Core academic matrix

| Work / framework | Work evidence | Competency claim | Evidence contract | Multi-source | Longitudinal state | AI/computational | Independent verification | Consensus / aggregation | Provenance | Attestation | Bounded state | Full composition |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Mislevy, Almond & Lukas — Evidence-Centered Design (2003) | ○ | ● | ● | ○ | ○ | — | — | ○ | — | — | ● | — |
| Workplace-Based Assessment literature | ● | ● | ○ | ● | ○ | — | △ | ● | ○ | — | ● | — |
| Bok et al. — Programmatic Assessment validity (2018) | ● | ● | ○ | ● | ● | ○ | △ | ● | ○ | — | ● | — |
| Schuwirth & van der Vleuten — Programmatic Assessment (2019) | ● | ● | ○ | ● | ● | — | △ | ● | ○ | — | ● | — |
| Competency portfolio assessment | ● | ● | ○ | ● | ● | — | △ | ● | ○ | — | ● | — |
| Learning analytics / workplace assessment research | ● | ○ | ○ | ● | ● | ● | △ | ● | ○ | — | ○ | — |
| Cheng et al. — Evidence-centered assessment with GenAI (2024) | ○ | ● | ● | ○ | ○ | ● | △ | ○ | ○ | — | ● | — |
| W3C PROV | — | — | — | — | — | — | — | — | ● | — | — | — |
| W3C Verifiable Credentials 2.0 | — | ○ | — | — | — | — | ● | — | ● | ● | — | — |
| NIST AI RMF / TEVV | ○ | — | — | ○ | — | ● | ● | ○ | ○ | — | — | — |
| Distributed verification infrastructure (oracles, AVS, proof systems) | — | — | — | — | — | ○ | ● | ● | ● | ● | — | — |

## 3. Interpretation of the matrix

### 3.1 The first half of the pipeline is not novel

The literature already provides substantial foundations for:

WORK → EVIDENCE → COMPETENCY INFERENCE

This includes Evidence-Centered Design, workplace-based assessment, programmatic assessment, portfolios, triangulation, longitudinal competency judgment and learning analytics.

Therefore the article must not claim that LASTRO invented evidence-based competency inference.

### 3.2 The verification layer exists in neighboring disciplines

Independent verification, provenance and cryptographic integrity are not novel primitives.

They are strongly established in adjacent technical domains:

PROV → provenance

VC → verifiable claims

NIST TEVV → evaluation / verification / validation

oracles / proof systems / AVS → distributed verification

The research question therefore cannot be:

> Can digital claims be verified?

That has already been answered.

The relevant question is:

> What exactly should be independently verified in a competency inference pipeline, and how should those verification results affect the resulting bounded state?

### 3.3 Consensus is established as aggregation, but not necessarily as LASTRO's protocol

Programmatic assessment already provides strong precedent for:

multiple observations → aggregation → triangulation → competency judgment

This is a major constraint on any novelty claim.

The potentially differentiating research question is narrower:

> Can the aggregation/consensus layer be represented as an explicit, machine-auditable protocol whose inputs remain separately inspectable and whose output preserves insufficient evidence and conflict?

That is materially different from claiming that aggregation itself is new.

## 4. Strongest potential counterexamples

A serious paper must actively test the gap against the following categories.

### Counterexample A — competency portfolios

Portfolios already combine heterogeneous evidence and support competency judgments.

**Effect on LASTRO claim:** weakens any claim that heterogeneous evidence aggregation is novel.

**Surviving distinction:** explicit independent verification, machine-auditable consensus and cryptographically anchored state are not inherent to portfolio assessment.

### Counterexample B — programmatic assessment

Programmatic assessment already combines observations across methods, contexts, raters and time.

**Effect:** weakens any claim that longitudinal multi-signal competency state formation is novel.

**Surviving distinction:** the LASTRO hypothesis concerns explicit verification semantics and auditable state transition rather than merely assessment-program design.

### Counterexample C — verifiable credentials

W3C VC already defines issuer/holder/verifier relationships and cryptographically verifiable claims.

**Effect:** completely removes any novelty claim around verifiable competency credentials.

**Surviving distinction:** LASTRO places the research question upstream, at the evidence-to-state transformation.

### Counterexample D — provenance standards

W3C PROV already provides provenance semantics.

**Effect:** provenance cannot be presented as a LASTRO invention.

**Surviving distinction:** LASTRO investigates how provenance constrains a competency inference pipeline.

### Counterexample E — AI evaluation / TEVV

NIST and related AI evaluation research already establish test, evaluation, verification and validation concepts.

**Effect:** AI plus verification is not sufficient differentiation.

**Surviving distinction:** the semantic object being verified is a bounded competency inference derived from work evidence.

### Counterexample F — distributed verification

Oracles, AVSs, proof systems and dispute mechanisms already establish distributed verification patterns.

**Effect:** distributed verification is not novel.

**Surviving distinction:** external verification infrastructure does not automatically define competency semantics or the competency-state transition.

## 5. Composition matrix

The strongest way to state the research gap is to compare layers, not buzzwords.

| Layer | Existing prior art? | LASTRO research question |
|---|---|---|
| Observable work as evidence | Yes | How should work be bounded by an evidence contract? |
| Evidence-centered competency claim | Yes | How should criteria map to observable evidence? |
| Heterogeneous evidence aggregation | Yes | How should heterogeneous signals remain inspectable? |
| Longitudinal competency state | Yes | What bounded state semantics are appropriate? |
| AI interpretation | Increasingly yes | What role can AI safely play? |
| Independent verification | Yes in adjacent domains; less standardized in competency assessment | What should be independently verified? |
| Explicit machine-auditable consensus | Aggregation is established; exact protocol is less established | Can verification results be resolved without hiding uncertainty/conflict? |
| Provenance-bound inference | Provenance is established; competency application varies | Can provenance constrain and audit the inference chain? |
| Cryptographic attestation | Yes | Can the resulting state be anchored without confusing integrity with validity? |
| Complete composition | **Not established by this scoped review** | **Core hypothesis** |

## 6. The actual gap

The matrix supports a much narrower statement than "there is no prior art":

> The individual components of LASTRO's architecture have substantial prior art across assessment science, AI evaluation, provenance and verifiable-credential infrastructure. The unresolved research question is the composition of these components into a competency-specific pipeline in which evidence interpretation, independent verification, consensus/state formation, provenance and post-decision attestation remain explicitly separated and auditable.

This is the strongest statement currently supported by the review.

## 7. What the matrix rules out

The following claims should be prohibited in the paper:

- LASTRO is the first competency verification system.
- No one has converted work evidence into competency.
- Blockchain verifies competency.
- Two AI models prove competency.
- Consensus proves truth.
- Provenance proves competency.
- Verifiable credentials solve competency assessment.
- LASTRO has no prior art.
- The architecture is patent-novel.

The paper can instead state:

- established components exist;
- their boundaries are often treated separately;
- the proposed composition is a research hypothesis;
- empirical validation is required.

## 8. Article-level contribution candidates

After closing this matrix, there are three plausible contribution levels.

### Contribution A — conceptual

A taxonomy separating:

evidence validity → interpretation → verification → consensus → state → attestation.

This is the safest contribution.

### Contribution B — architectural

A reference architecture for composing those layers around bounded competency claims.

This is stronger, but must be presented as a proposal rather than validated fact.

### Contribution C — empirical

An experiment comparing:

- AI-only interpretation;
- single-verifier assessment;
- multi-verifier consensus;
- human adjudication;
- provenance/attestation-enabled auditability.

This would provide the strongest scientific contribution, but requires actual experiments and data.

## 9. Final related-work verdict

### Established

- Work/performance evidence can support competency inference.
- Evidence-centered assessment provides an inferential foundation.
- Multiple observations and triangulation improve competency judgment.
- Longitudinal assessment can represent competency development.
- Computational and AI-assisted assessment exists.
- Provenance is standardized.
- Verifiable credentials are standardized.
- Cryptographic integrity and verification are established.
- AI evaluation and verification frameworks exist.

### Partially established / adjacent

- Independent verification specifically for competency inference.
- Machine-auditable consensus between heterogeneous verification mechanisms.
- Provenance as an explicit constraint on competency-state inference.
- Cryptographic attestation integrated downstream of competency-state formation.

### Not established by this review

The following complete composition was not identified in the scoped corpus:

WORK
→ EVIDENCE
→ INTERPRETATION
→ INDEPENDENT VERIFICATION
→ CONSENSUS
→ BOUNDED COMPETENCY STATE
→ ATTESTATION

This is therefore the current research hypothesis, not a proven novelty claim.

## 10. Methodological caution

This matrix should be described in the article as the result of a scoped literature and prior-art review, unless the corpus is subsequently expanded using a formal database search protocol with documented inclusion/exclusion criteria.

It should not be called a systematic review solely because the comparison is structured.

## 11. Next research step

Before drafting the final article, the remaining high-value task is empirical literature closure:

1. define inclusion/exclusion criteria;
2. search academic databases systematically;
3. record candidate studies;
4. screen titles/abstracts;
5. extract full-text evidence;
6. add possible counterexamples to this matrix;
7. document exclusions;
8. produce a PRISMA-style search/screening record where applicable;
9. freeze the related-work corpus;
10. only then write the article's research-gap and contribution sections.

That prevents the article from making a gap claim based only on papers we already expected to find.


---

## Public interpretation boundary

This document should be read as a bounded research artifact. Established external findings are separated from LASTRO's interpretation and research hypotheses. Where the review is incomplete, the document says so explicitly. Nothing here overrides the current MVP implementation or canonical architecture.