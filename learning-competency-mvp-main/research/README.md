# Research

This directory is the public research index for LASTRO.

It connects **external evidence → research interpretation → project thesis → canonical product/architecture → implementation and reproducible proof**, while preserving the distinction between what is established, what is inferred, what has been adopted, and what remains hypothetical.

Research is **not the source of truth for current runtime behavior**. The current implementation, canonical product/architecture documentation, and governance records take precedence where they conflict.

## How to navigate the research

If you are new to LASTRO, follow this path:

1. **Start here** — understand the research library and its epistemic boundaries.
2. **[Research Map](./RESEARCH_MAP.md)** — see every public research track, question, status, and promotion target.
3. **[Related Work, Prior Art & External Evidence](./RELATED_WORK_AND_EVIDENCE.md)** — trace the main public arguments to external sources and adjacent systems.
4. **[Article Research Track](./article/README.md)** — inspect the focused literature/research line behind the evidence → competency verification thesis.
5. **Product thesis** — understand the bounded strategic thesis that contextualizes the current MVP.
6. **Canonical implementation** — move from research to the current product/architecture and executable proof in `docs/`, `src/`, `tests/`, and `fixtures/`.

### The public evidence chain

```
PROBLEM / CONTEXT
      ↓
EXTERNAL EVIDENCE
      ↓
RELATED WORK / PRIOR ART
      ↓
RESEARCH INTERPRETATION
      ↓
LASTRO THESIS / HYPOTHESIS
      ↓
CANONICAL PRODUCT & ARCHITECTURE
      ↓
IMPLEMENTATION / TESTS
      ↓
REPRODUCIBLE DEMO
      ↓
LIMITATIONS / WHAT REMAINS UNPROVEN
```

The repository intentionally keeps these layers separate. A source can support the problem without validating the product; research can motivate an architecture without proving it; implementation proves what the system does, not that the underlying commercial or scientific hypothesis is true.

## Research boundary

Research material must preserve the distinction between:

- **Observed** — supported by a source, experiment, implementation artifact, or documented observation.
- **Interpreted** — a conclusion drawn from one or more observations.
- **Adopted** — a project decision explicitly promoted into product, architecture, governance, or execution.
- **Hypothesis** — a proposition that still requires validation.
- **Open** — a question for which the current evidence is insufficient.
- **Deferred** — a direction intentionally kept outside the current MVP.

> **Hypothesis must not become fact through repetition.**

## Active research tracks

### Article research — evidence to competency verification

The article research track is intentionally public because its literature foundations, counterexamples, methodological limits, and unresolved research questions are relevant to understanding and challenging LASTRO's public thesis.

- [Article Research Track](./article/README.md)
- [09 — Work Evidence → Competency Inference](./article/01_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md)
- [10 — Verification, Consensus, Provenance & Attestation](./article/02_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md)
- [Related Work Matrix](./article/RELATED_WORK_MATRIX.md)
- [Literature Closure Protocol](./article/LITERATURE_CLOSURE_PROTOCOL.md)

**Status:** scoped review / research hypothesis. These documents are not a systematic review, legal novelty analysis, or proof of academic novelty.

### Product thesis

The public product-research surface is intentionally limited to the bounded thesis that contextualizes the current MVP.

- [Product Thesis](./product/PRODUCT_THESIS.md)

Broader workforce-capability research, future product hypotheses, and research planning are maintained in the private LASTRO Operational Brain. They are not part of the current public research surface.

### Market, related work & ecosystem evidence

- [Related Work, Prior Art & External Evidence](./RELATED_WORK_AND_EVIDENCE.md)
- [Colosseum Ecosystem Benchmark](./01_COLOSSEUM_ECOSYSTEM_BENCHMARK.md)

Some historical or internal market/strategy research is retained in the private Vault and is not linked from the public index.

### Architecture & verification infrastructure

Public research is limited to evidence and bounded mechanisms that help reviewers understand the current thesis.

- [Ethical Compliance Layer](./02_ETHICAL_COMPLIANCE_LAYER.md)

The broader Data & Statistical Robustness research remains in the private Vault as future architecture research.

Verification-infrastructure benchmark material is maintained in the private Vault unless a public derivative is explicitly promoted.

### Future research boundary

Dynamic Role Architecture, Role Delta, broader workforce-capability research, and research-planning material are maintained in the private Vault.

They remain part of LASTRO's research lineage, but are intentionally excluded from the current public surface because they sit beyond the closed MVP contract.

## Research → evidence → decision → implementation

The intended flow is:

`RESEARCH → EVIDENCE → INTERPRETATION → DECISION → PROMOTION → IMPLEMENTATION`

A research artifact may influence the project only when the relevant conclusion is explicitly promoted into the appropriate canonical layer.

For current product and implementation claims, continue to:

- [Product / MVP documentation](../docs/product/README.md)
- [Architecture documentation](../docs/architecture/README.md)
- [Evaluation & proof](../docs/evaluation/README.md)
- [Reproducible demo contract](../docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md)
- [Repository README](../README.md)

## What research currently supports

The current research library supports several bounded conclusions:

1. **The broader workforce/capability problem is materially relevant.**
2. **The ecosystem is populated by adjacent solutions.**
3. **Observable work/performance evidence and multiple observations provide established foundations for bounded competency inference.**
4. **Provenance and verifiable-credential standards provide traceability, integrity and machine verification, while distinguishing verification from truth.**
5. **LASTRO's evidence → independent verification → consensus → competency state → attestation composition remains a research hypothesis.**
6. **The MVP should remain narrow and verifiable.**
7. **Dynamic Role Architecture and broader future-platform concepts remain private future research, not current public capability.**

These are bounded conclusions, not universal claims.

## What research does not currently prove

The research library does **not** establish:

- product-market fit;
- willingness to pay;
- a definitive primary buyer;
- pricing or commercial model;
- universal competency taxonomy;
- superiority over all competing systems;
- universal automated competency assessment;
- autonomous hiring, promotion, compensation, or termination;
- that blockchain makes a competency claim true;
- academic or patent novelty of the complete LASTRO architecture.

## Promotion rule

Before promoting a research conclusion into product or architecture, record:

1. the observation/evidence;
2. the interpretation;
3. the uncertainty that remains;
4. the resulting decision;
5. the target canonical document or implementation boundary.

This keeps the repository auditable and prevents research language from silently becoming product claims.

## Related governance

- [Source of Truth](../docs/governance/SOURCE_OF_TRUTH.md)
- [Repository Information Boundary](../docs/REPOSITORY_INFORMATION_BOUNDARY.md)
- [Publication Classification Matrix](../docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md)
