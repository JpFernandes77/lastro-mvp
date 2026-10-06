# Research Map

**Status:** Active public research index  
**Date:** 2026-10-04

This map is the navigation layer for LASTRO's public research. It answers four questions:

1. **What are we investigating?**
2. **What does the current evidence support?**
3. **What remains a hypothesis or open question?**
4. **Where does a research conclusion become a canonical product, architecture, or implementation decision?**

## Public reading path

```
RESEARCH/README
      ↓
RESEARCH_MAP
      ↓
RELATED WORK + EXTERNAL EVIDENCE
      ↓
ARTICLE RESEARCH / PRODUCT RESEARCH
      ↓
CANONICAL PRODUCT + ARCHITECTURE
      ↓
IMPLEMENTATION + TESTS
      ↓
REPRODUCIBLE DEMO
```

For a first pass, use:

1. [Research README](./README.md)
2. [Related Work, Prior Art & External Evidence](./RELATED_WORK_AND_EVIDENCE.md)
3. [Article Research Track](./article/README.md)
4. [Product Thesis](./product/PRODUCT_THESIS.md)
5. [Canonical Product Documentation](../docs/product/README.md)
6. [Technical Architecture](../docs/architecture/README.md)
7. [Evaluation & Proof](../docs/evaluation/README.md)
8. [Reproducible Demo Contract](../docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md)

## Research register

| Artifact | Primary question | Current conclusion | Status | Promotion target |
|---|---|---|---|---|
| `01_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` | What adjacent solutions already exist? | Adjacent solutions exist; complete workflow differentiation remains a hypothesis | **OBSERVED / INFERRED** | Positioning |
| `RELATED_WORK_AND_EVIDENCE.md` | What prior standards, research and adjacent systems support or bound LASTRO's argument? | Foundational work and adjacent systems support parts of the thesis; the full composition remains a bounded research hypothesis | **FOUNDATION / SUPPORT / ADJACENT** | Argument / positioning |
| `02_ETHICAL_COMPLIANCE_LAYER.md` | Can competency rules receive explicit governance constraints? | Interesting future mechanism; cannot claim universal fairness | **HYPOTHESIS / DEFERRED** | Future governance |
| `product/PRODUCT_THESIS.md` | What broader product thesis follows from the evidence and MVP? | Evidence-backed capability verification is the current strategic thesis | **THESIS** | Product narrative |
| `article/01_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | What does the literature establish about work evidence → competency inference? | Strong academic foundation; full LASTRO composition remains unestablished | **PUBLIC SCOPED REVIEW** | Research / article |
| `article/02_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | How should validity, verification, consensus, provenance and attestation be separated? | The layers are non-equivalent; composition remains a research hypothesis | **PUBLIC SCOPED REVIEW** | Research / article |
| `article/RELATED_WORK_MATRIX.md` | What prior art and counterexamples constrain the LASTRO composition claim? | Individual components have substantial prior art; the complete composition remains unresolved | **PUBLIC SCOPED MATRIX** | Research / article |
| `article/LITERATURE_CLOSURE_PROTOCOL.md` | How should the literature review be expanded and challenged before article-level claims? | Protocol frozen; external database closure remains open | **PUBLIC METHODOLOGICAL PROTOCOL** | Research / article |

## Evidence status model

- **OBSERVED** — directly supported by a source, experiment, implementation artifact, or documented observation.
- **INFERRED** — conclusion derived from observations.
- **SUPPORTED** — bounded conclusion materially supported by available evidence, with limitations.
- **ADOPTED** — explicitly promoted into current product, architecture, governance, or execution.
- **THESIS** — strategic synthesis organizing evidence and decisions into a product hypothesis.
- **HYPOTHESIS** — proposition requiring further validation.
- **OPEN** — material question with insufficient current evidence.
- **DEFERRED** — intentionally excluded from the current MVP or commercial wedge.
- **FOUNDATION** — established external standard, framework, or body of work used as conceptual/technical context.
- **SUPPORT** — external evidence that strengthens a bounded project argument without validating the product itself.
- **ADJACENT** — existing system or architecture that occupies a neighboring problem space.

## How evidence becomes a project decision

Research is not automatically promoted into the MVP.

```
SOURCE / EXPERIMENT
        ↓
OBSERVATION
        ↓
INTERPRETATION
        ↓
HYPOTHESIS / OPEN QUESTION
        ↓
VALIDATION
        ↓
PROJECT DECISION
        ↓
CANONICAL DOCUMENT
        ↓
IMPLEMENTATION / TEST
```

The canonical-state hierarchy remains:

1. current implementation and tests;
2. canonical product and architecture documents;
3. research evidence and hypotheses;
4. historical archives.

See [Source of Truth](../docs/governance/SOURCE_OF_TRUTH.md).

## Article research status

The public article track is deliberately labeled **scoped review**, not systematic review. Its purpose is to expose the reasoning behind the current research hypothesis and make it falsifiable.

The literature-closure protocol remains open. The repository therefore does not claim exhaustive database coverage, definitive novelty, patentability, or academic contribution.

## Current bounded conclusions

1. The workforce/capability problem is materially relevant.
2. Explicit competency frameworks, provenance models, machine-verifiable claims, AI evaluation frameworks and distributed verification systems provide established external foundations or adjacent prior art.
3. Academic research strongly supports using observable performance/work evidence and multiple observations to infer bounded competency states.
4. Provenance and verifiable-credential standards establish useful mechanisms for traceability, integrity and machine verification, while distinguishing verification from truth of claims.
5. LASTRO's evidence → independent verification → consensus → competency state → attestation composition is a defensible research hypothesis, not an established novelty claim.
6. The MVP should remain narrow and verifiable.
7. Dynamic Role Architecture, Role Delta, statistical robustness, broader workforce-capability research, and research-planning material remain private future research.
8. External verification infrastructure may become an adapter or substrate, not LASTRO's semantic authority.

These do **not** establish product-market fit, willingness to pay, market uniqueness, legal/patent novelty, or universal competency assessment.

## Do not promote by repetition

Unless new evidence changes the decision register, keep these explicitly bounded:

- universal competency claims;
- definitive primary buyer;
- pricing;
- willingness to pay;
- autonomous employment decisions;
- universal competency taxonomy;
- Dynamic Role Architecture as the initial commercial wedge;
- privacy-preserving transfer of arbitrary human knowledge;
- blockchain as a source of competency truth;
- external verification infrastructure as a replacement for the Consensus Core;
- legal/patent novelty claims.

## Relationship to governance and implementation

- [Source of Truth](../docs/governance/SOURCE_OF_TRUTH.md) — authoritative repository layers.
- [Repository Information Boundary](../docs/REPOSITORY_INFORMATION_BOUNDARY.md) — public/private information boundary.
- [Publication Classification Matrix](../docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md) — file-level publication baseline.
- [Product documentation](../docs/product/README.md) — canonical product contract and narrative.
- [Architecture documentation](../docs/architecture/README.md) — canonical technical architecture.
- [Evaluation & proof](../docs/evaluation/README.md) — what the MVP demonstrates and how.
- [Demo contract](../docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md) — reproducibility boundary.

Research answers **what we investigated and what remains uncertain**. Governance answers **what the project currently decides**. Implementation answers **what the system actually does**.
