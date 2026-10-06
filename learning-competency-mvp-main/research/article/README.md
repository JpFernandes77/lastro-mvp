# LASTRO — Article Research Track

**Status:** PUBLIC RESEARCH TRACK — SCOPED REVIEW  
**Date:** 2026-10-04

This directory contains the public research artifacts supporting LASTRO's investigation of **evidence-to-competency verification**.

These documents are intentionally public because they contain literature foundations, counterexamples, methodological boundaries, and unresolved questions that an external evaluator can use to understand or challenge the project's research thesis.

They are **not**:

- the source of truth for current runtime behavior;
- a systematic literature review;
- a legal novelty or patent analysis;
- proof that LASTRO is academically novel;
- evidence of product-market fit or commercial validation.

## Research status

The current track is a **scoped review**. The documents distinguish established prior art from LASTRO hypotheses and explicitly record what remains unproven.

The current research question is:

> Can heterogeneous evidence of real work be transformed into a bounded competency state through an explicit, auditable, multi-mechanism verification process in which provenance, interpretation, independent verification, uncertainty and state formation remain separately inspectable?

## Public artifacts

- [09 — Work Evidence → Competency Inference](./01_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md) — academic foundation and bounded research gap.
- [10 — Verification, Consensus, Provenance & Attestation](./02_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md) — separation of epistemic validity from record integrity.
- [Related Work Matrix](./RELATED_WORK_MATRIX.md) — prior-art comparison and counterexample analysis.
- [Literature Closure Protocol](./LITERATURE_CLOSURE_PROTOCOL.md) — reproducible protocol for expanding and challenging the current review.

## Epistemic rule

The project follows:

OBSERVATION → EVIDENCE → INTERPRETATION → HYPOTHESIS → VALIDATION → PROMOTION

Repeated project documentation does not upgrade a hypothesis into an established fact.

## Relationship to the MVP

The public MVP implementation and canonical architecture remain authoritative for what LASTRO currently does. This research track explains the external foundations and research questions around that implementation; it does not silently expand the product contract.

For current implementation and product claims, use the canonical documentation under `docs/`, `src/`, `tests/`, and the repository README.
