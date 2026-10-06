# LASTRO — Reproducible Demo Contract

**Status:** PUBLIC / canonical demo support  
**Date:** 2026-10-04

## Purpose

This document defines the minimum public contract required to reproduce the LASTRO MVP demonstration from a clean checkout.

It intentionally contains **no team assignments, private execution notes, credentials, customer information, interview material, or confidential strategy**.

## What the demonstration proves

The canonical demonstration shows one bounded technical flow:

```
COMPETENCY
    ↓
ACTIVITY
    ↓
SYNTHETIC EVIDENCE
    ↓
AI INTERPRETATION
    ↓
INDEPENDENT VERIFICATION
    ↓
CONSENSUS
    ↓
COMPETENCY STATE
    ↓
ATTESTATION
    ↓
PUBLIC VERIFICATION
```

The demonstration does **not** claim:

- real-user validation;
- customer adoption;
- commercial traction;
- universal competency assessment;
- that AI determines competency by itself;
- that Solana establishes the truth or merit of a competency claim.

## Canonical synthetic scenario

The public fixture uses a fictional participant, **Ana**, and fictional work evidence.

The scenario contains:

| Activity | Public evidence |
| --- | --- |
| A1 | `fixtures/synthetic/ana/a1_briefing.md` |
| A2 | `fixtures/synthetic/ana/a2_preparacao.ipynb` |
| A3 | `fixtures/synthetic/ana/a3_analise.ipynb` + `a3_resultados.md` |
| A4 | `fixtures/synthetic/ana/a4_sintese.md` |

The fixture also contains the explicit adjudication scenario:

`fixtures/synthetic/ana/adjudication_demonstrated.json`

All of these artifacts are synthetic and must be presented as such.

## Clean reproduction

Requirements:

- Node.js 20 or newer;
- dependencies installed with `npm install`;
- no production/customer data;
- no private credentials for the local evidence/AI pipeline.

Run the local vertical slice:

```bash
npm install
npm run demo
```

The command processes the canonical synthetic evidence and produces:

```
out/reviewed-state.json
out/provenance-trace.json
```

The first file is the handoff consumed by the M3 attestation path.

## Exceptional conflict path

Human adjudication is **not** part of the normal path.

To demonstrate the explicitly supported conflict-resolution path:

```bash
npm run demo:adjudication
```

This uses only the synthetic adjudication fixture and must not be interpreted as evidence that human review is normally required.

## Attestation and verification

After the local reviewed state has been produced:

```bash
npm run m3:attest
npm run m3:verify
```

The M3 path records/verifies the bounded state reference. Sensitive/raw evidence remains off-chain.

A Devnet demonstration requires the environment and signing configuration documented by the implementation itself. **Private keys must never be committed to the repository.**

## Public evidence chain

The reproducible demonstration is distributed across these public artifacts:

1. **Use case:** `docs/product/USE_CASE.md`
2. **Architecture:** `docs/architecture/`
3. **Synthetic evidence:** `fixtures/synthetic/ana/`
4. **Executable demo:** `src/cli/demo.ts`
5. **Automated tests:** `tests/`
6. **Demo overview:** `docs/demo/DEMO_SCRIPT.md`
7. **Attestation model:** `docs/architecture/ATTESTATION_MODEL.md`
8. **Verification implementation:** `src/solana/verify.ts`

Together these files form the public reproducibility surface.

## Data boundary

The public demonstration uses synthetic evidence only.

The following must remain outside the public repository:

- real participant evidence;
- personal data;
- customer data;
- private interview notes;
- credentials and signing keys;
- confidential partner information;
- internal execution instructions that do not contribute to reproducibility.

The public repository should contain enough information to **reproduce and challenge the technical claim**, but not private operational material.

## Reproducibility rule

If a future change makes the canonical demonstration depend on a file, fixture, schema, command or public configuration that is not represented in the public repository, that dependency must be added to the public reproducibility surface before the corresponding internal material is removed.

This rule prevents the private/public boundary from accidentally breaking the demonstrable MVP.
