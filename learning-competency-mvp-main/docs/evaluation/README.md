# LASTRO — Evaluation Documentation

**LASTRO** is the product identity. **Learning Competency** is the technical domain and repository context. This directory contains the English-language documentation intended for external evaluation, hackathon reviewers, technical reviewers, and other readers who need a concise understanding of the project.

The Portuguese documentation remains the team's primary working documentation. This evaluation layer is deliberately smaller: it explains the product, architecture, verification model, demonstration path, and current limitations without exposing internal operating material.

## Start here

1. [Product Overview](01_PRODUCT.md)
2. [Architecture & Evidence Pipeline](02_ARCHITECTURE.md)
3. [Consensus, Governance & Attestation](03_VERIFICATION_AND_GOVERNANCE.md)
4. [Demo & Technical Proof](04_DEMO_AND_PROOF.md)
5. [Limitations & Claims](05_LIMITATIONS_AND_CLAIMS.md)

## One-line thesis

> **We turn changing work into evidence-based competency intelligence, requalification pathways, and verifiable competency states.**

## Current MVP wedge

```
Evidence → Competency → Verification → State → Attestation → Verification
```

The MVP proves a narrower claim before expanding toward organizational intelligence:

```
Evidence
  ↓
Independent verification
  ↓
Consensus
  ↓
Competency state
  ↓
Attestation
  ↓
Public verification
```

## Current implementation status

The repository contains a working M1→M3 vertical slice covering:

- structured evidence ingestion;
- evidence extraction and provenance;
- AI-assisted interpretation;
- deterministic criteria checks independent from AI signals;
- human review;
- Consensus Core for covered convergent cases;
- competency state transitions;
- attestation capability on Solana Devnet;
- integrity and payload-binding verification;
- automated tests and type checking.

The attestation implementation is complete, while the current `m3.attestation.v2` public Devnet proof is a remaining M4 validation artifact. Market validation, pricing, recurring commercial adoption, and the broader Dynamic Role Architecture remain hypotheses under validation.

## Important distinction

This documentation describes what the current MVP implements and what remains a hypothesis. It does not present synthetic demonstration data as customer evidence or claim that blockchain independently proves competency.

## Evaluator reading path

For a fast technical evaluation, use this order:

**Product → Architecture → Verification & Governance → Demo & Proof → Limitations & Claims**

The repository root README is the public entry point. This directory is the curated evidence layer for judging the implementation and its claims.
