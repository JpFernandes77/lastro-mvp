# Consensus, Governance & Attestation

## Consensus Core

The Consensus Core is designed to **reduce dependence on individual judgment**, not to eliminate human judgment.

The principle is:

```
Evidence
   ↓
Independent verification mechanisms
   ↓
Consensus
   ├─ AGREEMENT → STATE
   ├─ INSUFFICIENT_EVIDENCE → MORE EVIDENCE
   └─ CONFLICT → HUMAN ADJUDICATION
```

Consensus is not simple vote counting. It evaluates whether independently produced verification results satisfy explicit requirements and whether relevant conflicts or insufficiencies exist.

## Consensus outcomes

- **AGREEMENT** — applicable verification requirements converge;
- **INSUFFICIENT_EVIDENCE** — available evidence does not support the required conclusion;
- **CONFLICT** — relevant verification mechanisms disagree;
- **HUMAN_ADJUDICATION** — a CONFLICT has entered the explicit human exception path.

The competency state must not be advanced while the case is materially insufficient or conflicted.

## Human Adjudication

Human adjudication is not a normal pipeline step.

It is the exception path for:
- conflicting verification results;
- ambiguous evidence;
- contextual criteria that cannot be adequately formalized;
- contestation;
- high-impact decisions requiring additional review;
- cases not covered by existing rules.

When adjudication occurs, the system preserves the original evidence references, criteria, verification results, rationale, decision, responsible actor, timestamp, and applicable rule version.

## Governance

Governance defines the conditions under which a verification result can produce a state transition.

Relevant governance metadata can include:
- eligibility criteria;
- adjudicator role;
- independence;
- conflicts of interest;
- escalation rules;
- required adjudication;
- policy version.

The system does not infer character, intent, or bias from these fields. They exist to make decision conditions explicit and auditable.

## Attestation model

The attestation represents a **defined state or event**, not the complete evidence file.

Conceptually:

```
SUBJECT
  ↓
COMPETENCY
  ↓
STATE
  ↓
EVIDENCE REFERENCE
  ↓
VERIFICATION / GOVERNANCE CONTEXT
  ↓
ISSUED AT
```

Sensitive learning data and full evidence content remain off-chain.

## MVP verification boundary

The current MVP has exactly **three** verification mechanisms:

1. **Evidence Integrity Check — structural:** recomputes the canonical evidence hash and fails closed on tampering.
2. **Deterministic Criteria Check — structural:** evaluates competency-contract coverage directly from canonical evidence and does not consume AI signals.
3. **AI Interpretation — semantic:** interprets evidence content and produces a proposal, never the final competency state.

Statistical / Robustness verification is explicitly **Future Research / M4+** and is not part of the current MVP decision path.

## Current implementation

The MVP uses the **Solana Memo Program** as an integrity anchor on Solana Devnet.

The attestation payload is versioned as `m3.attestation.v2` and binds the relevant MVP/version, subject reference, competency, state, record hash, attester, and timestamp.

When a current Devnet transaction is available, the verifier can:
- confirm the transaction contains the expected reference;
- recompute record integrity when the associated record is available;
- check payload binding;
- compare the transaction signer with the expected issuer when applicable.

## What attestation does not prove

An attestation does not, by itself, prove:
- that the underlying evidence is objectively true;
- that a competency is universally true;
- the merit or worth of a person;
- that the governance process is universally fair;
- that blockchain independently assessed the competency.

It anchors the representation defined by the system so that the recorded state can later be checked for integrity.

## Current proof status

The attestation implementation is part of the completed M3 vertical slice. The current `m3.attestation.v2` Devnet transaction is an M4 closing artifact and must be generated and registered before it is presented as the project's current public proof.