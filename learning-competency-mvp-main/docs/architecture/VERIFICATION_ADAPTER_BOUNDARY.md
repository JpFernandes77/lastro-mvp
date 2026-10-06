# Verification Adapter Boundary

## Status

**Architectural boundary defined. No external verification infrastructure is a hard MVP dependency.**

This document converts the conclusions of `research/07_VERIFICATION_INFRASTRUCTURE_BENCHMARK.md` into a stable architecture boundary.

It does not authorize a CRE, AVS, oracle, or proof-network implementation.

## 1. Purpose

LASTRO may eventually use external infrastructure to execute or validate independent verification mechanisms.

That infrastructure must remain replaceable.

> **External verification infrastructure may produce verifier results. It must not become the semantic authority over competency state.**

The semantic authority remains the LASTRO domain model and Consensus Core.

## 2. Canonical Position

The current MVP remains:

```
EVIDENCE
   ↓
INDEPENDENT VERIFICATION
   ↓
GOVERNANCE / COMPLIANCE
   ↓
CONSENSUS CORE
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
   ↓
PUBLIC VERIFICATION
```

The verification layer may contain local or externally executed mechanisms:

```
                    INDEPENDENT VERIFICATION
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
       LOCAL              EXTERNAL             PROOF
      VERIFIER             ADAPTER              SYSTEM
          │                   │                   │
          │             ┌─────┴─────┐             │
          │             ↓           ↓             │
          │            CRE         AVS          ZK/PROOF
          │             │           │             │
          └─────────────┴───────────┴─────────────┘
                              ↓
                       VERIFIER RESULT
                              ↓
                       CONSENSUS CORE
```

The adapter boundary is therefore between **verification execution** and **domain consensus**.

## 3. What an Adapter Does

A verification adapter translates an external execution environment into a canonical LASTRO verifier result.

```
LASTRO Verification Request
        ↓
External Infrastructure
        ↓
Execution / Observation / Proof
        ↓
External Result
        ↓
Adapter Normalization
        ↓
Canonical Verifier Result
```

The adapter must preserve provenance and execution context. It must not reinterpret the result as a competency decision.

## 4. Canonical Verifier Result

An external adapter should produce a result semantically equivalent to a local verifier result.

Minimum conceptual fields:

```
{
  mechanism,
  input_reference,
  evidence_reference,
  result,
  rationale,
  verifier_version,
  execution_reference,
  provenance,
  timestamp
}
```

Where applicable, preserve:

- infrastructure identifier;
- execution identifier;
- operator / DON reference;
- proof or report reference;
- external transaction reference;
- error or failure reason;
- capability/version metadata.

The exact runtime schema remains an implementation concern and must not be invented by the frontend.

## 5. Independence Boundary

The adapter must not collapse infrastructure consensus into competency consensus.

```
CRE / DON consensus
        ↓
"distributed execution converged"
        ↓
CRE verifier result
        ↓
LASTRO Consensus Core
        ↓
"competency state is supported"
```

These are different claims.

> **CRE consensus ≠ LASTRO competency consensus.**

The same rule applies to AVS quorum, oracle aggregation, dispute resolution, and proof verification.

## 6. Required Adapter Properties

Any future adapter should satisfy:

1. **Semantic preservation** — map to a bounded verifier result without changing meaning.
2. **Provenance preservation** — retain enough context to reconstruct where and how the result was produced.
3. **Version binding** — identify verifier logic and relevant infrastructure versions.
4. **Deterministic normalization** — equivalent external results normalize equivalently.
5. **Failure visibility** — infrastructure failure is never represented as successful verification.
6. **No authority escalation** — an adapter never directly advances competency state.
7. **Replaceability** — Consensus Core does not depend on a specific provider.
8. **Local fallback where practical** — the MVP remains demonstrable without external infrastructure when the verifier can execute locally.

## 7. Candidate Adapters

| Adapter | Initial role | Status |
|---|---|---|
| Local verifier | baseline | MVP |
| CRE | distributed verifier execution | Research / experimental |
| AVS | independent verification network | Research |
| Optimistic oracle | contested external claims | Research |
| First-party oracle | trusted external source ingestion | Research |
| Proof network | provable deterministic execution | Research |

No candidate is the canonical verification layer.

## 8. First Experimental Candidate — CRE

CRE is the strongest candidate for a bounded experiment because it combines distributed execution, DON consensus, external capabilities, computation, and Solana support.

The first experiment should use **one deterministic verifier**.

Preferred order:

1. deterministic rule verification;
2. evidence integrity / provenance verification;
3. robustness verification;
4. replicated AI interpretation;
5. more complex external verification.

The experiment must not change Consensus Core semantics.

## 9. What the First CRE Experiment Must Prove

The narrow question is:

> Can a LASTRO verifier execute through CRE and return a canonical verifier result without changing the verifier's semantics?

```
same evidence
   ↓
same verifier contract
   ↓
local execution ───────── CRE execution
       ↓                       ↓
   verifier result        verifier result
       └───────────┬───────────┘
                   ↓
          semantic equivalence
                   ↓
           Consensus Core
```

Measure:

- result equivalence;
- provenance completeness;
- execution reproducibility;
- failure behavior;
- latency;
- operational complexity;
- deployment dependency;
- Solana integration requirements.

## 10. What This Boundary Prevents

This boundary explicitly prevents:

- replacing Consensus Core with CRE consensus;
- treating blockchain consensus as competency consensus;
- allowing an external oracle to define competency;
- coupling state transitions to a single infrastructure provider;
- adding external infrastructure solely for hackathon narrative;
- making distributed execution mandatory for the MVP;
- storing sensitive evidence on-chain merely because an adapter exists.

## 11. Relationship to Solana

Solana remains the current integrity / attestation anchor.

A future architecture may therefore look like:

```
Evidence
   ↓
Verifier
   ↓
External Adapter (optional)
   ↓
LASTRO Consensus Core
   ↓
Competency State
   ↓
Attestation
   ↓
Solana
```

Solana does not become the semantic competency authority. An external verification provider does not become the semantic competency authority either.

## 12. Relationship to the Consensus Core

The Consensus Core consumes verifier results, not infrastructure-specific semantics.

```
VERIFIER RESULTS
      ↓
CONSENSUS CORE
      ├─ AGREEMENT
      ├─ INSUFFICIENT_EVIDENCE
      ├─ CONFLICT
      └─ HUMAN_ADJUDICATION
```

Human adjudication remains an exception path. Routine Human Review is not part of this boundary.

## 13. MVP Boundary

The current MVP does **not** require:

- CRE deployment;
- AVS deployment;
- optimistic oracle integration;
- external oracle integration;
- proof-network integration.

The local verifier path remains the baseline.

External infrastructure becomes relevant only through a bounded experiment that demonstrates concrete verification value.

## 14. Decision Boundary

This document establishes an architectural rule, not an implementation decision.

**Allowed:** research, simulation, adapter design, isolated experiments, and comparison of execution/verification properties.

**Not authorized:** replacing the Consensus Core, introducing a second semantic consensus layer, making CRE a hard dependency, changing competency-state semantics, or expanding MVP scope without a separate decision.

## 15. Source

Primary research basis:

`research/07_VERIFICATION_INFRASTRUCTURE_BENCHMARK.md`

That document contains the comparative research on CRE, AVS/restaking, optimistic oracles, first-party oracle infrastructure, and proof-based verification.

## Final Principle

> **LASTRO owns the meaning of competency. External infrastructure may help verify the evidence, execute the verifier, or prove the computation — but it does not decide what competency means.**
