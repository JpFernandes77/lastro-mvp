# LASTRO — Product Overview

## The problem

Completion records and certificates can show that an activity or course was completed. They do not necessarily preserve what a person actually demonstrated, which evidence supported the assessment, or how a competency state was reached.

LASTRO is the product identity for this Learning Competency infrastructure. It explores a traceable path from observable work to a bounded, verifiable competency state.

## Product thesis

> **We turn changing work into evidence-based competency intelligence, requalification pathways, and verifiable competency states.**

The product direction connects:

```
Work Change
   ↓
Role Delta
   ↓
Competency Gap
   ↓
Requalification
   ↓
Evidence
   ↓
Proof of Competency
```

The first MVP intentionally starts with the smallest testable wedge:

```
Evidence → Competency → Verification → State → Attestation → Verification
```

Dynamic Role Architecture is a research hypothesis and strategic extension, not a validated commercial capability of the current MVP.

## Core user journey

```
Organization
   ↓
Competency definition
   ↓
Short development trail
   ↓
Person performs activities
   ↓
Evidence is produced
   ↓
Evidence is interpreted
   ↓
Independent verification mechanisms
   ↓
Consensus Core
   ↓
Competency state
   ↓
Attestation
   ↓
External verification
```

When verification mechanisms do not converge, the case is not silently promoted:

- insufficient evidence returns the competency to development;
- conflict remains pending for explicit human adjudication;
- only agreement or an exceptional adjudication can produce a demonstrated state.

## What makes the vertical slice different

The key product object is not a certificate alone. It is the relationship between:

- an observable piece of evidence;
- a competency criterion;
- the verification mechanisms applied;
- the resulting bounded state;
- the provenance of the decision;
- a verifiable integrity reference.

The product therefore treats evidence and decision context as first-class objects rather than hiding them behind a single score.

## Aha moment

The central product demonstration is:

> **A demonstrated competency stops being only a claim inside the application and gains a verifiable integrity reference.**

Blockchain is infrastructure for that final property, not the opening value proposition.

## Current status

Implemented:

- one concrete competency scenario;
- a short evidence-producing trail;
- evidence normalization and extraction;
- AI-assisted interpretation;
- deterministic verification;
- Consensus Core for agreement, insufficient evidence and conflict;
- human adjudication as an explicit conflict exception;
- competency state transition;
- Solana Devnet attestation capability;
- verification of an anchored record when a current Devnet transaction is available.

Not yet validated:

- definitive buyer;
- pricing;
- willingness to pay;
- recurring adoption;
- quantitative economic impact;
- Dynamic Role Architecture as a commercial wedge.
