# LASTRO — Security Threat Model

**Status:** MVP security boundary  
**Scope:** current vertical slice  
**Method:** assets → trust boundaries → threat → existing mitigation → residual risk

## 1. Security objective

Protect the integrity and provenance of the evidence-to-state pipeline.

The MVP does not claim to provide universal security, perfect evidence authenticity, or absolute truth.

## 2. Trust boundaries

```
UNTRUSTED INPUT
   ↓
Evidence ingestion
   ↓
Canonical evidence
   ↓
AI / external provider boundary
   ↓
Independent verification
   ↓
Consensus Core
   ↓
Competency state
   ↓
Attestation
   ↓
Public verification
```

Key rule:

> External providers and user-submitted evidence are untrusted inputs until validated by the relevant contract and verification mechanism.

## 3. Threat matrix

| Asset | Threat | Existing mitigation | Residual risk |
|---|---|---|---|
| Evidence content | Post-ingestion mutation | SHA-256 recorded at ingestion; integrity recomputed before consensus | Hash proves content integrity, not truth/authorship |
| Evidence metadata | Invalid or unsupported submission | Input validation; type/activity contract; provenance requirements; size limit | Valid structure can still contain misleading content |
| Canonical record | Hash mismatch / tampering | Canonical JSON + SHA-256; `verifyHandoff` before attestation | Canonicalization/version changes require controlled compatibility |
| AI provider boundary | Provider mutates canonical evidence objects | `structuredClone` snapshots supplied to provider | Provider output can still be semantically wrong; AI is not authority |
| AI output | Invalid citations or contract violations | AI output schema/contract validation and relation validation | Valid schema does not prove semantic correctness |
| Deterministic verification | AI influence on objective criteria | Deterministic check reads evidence/contract directly and does not consume AI confidence | Rules may be incomplete or imperfect |
| Consensus | Single mechanism silently deciding competency | Three distinct verification mechanisms; explicit consensus outcomes | Correlated mechanisms can still share blind spots |
| State transition | Unauthorized local advancement | State transition module enforces allowed origins/transitions; frontend boundary forbids parallel logic | Future integrations must preserve backend authority |
| Conflict resolution | Hidden human override | Adjudication allowed only after `CONFLICT`; decision/provenance retained | Human decisions remain contextual and can be wrong |
| Attestation | Forged/incorrect handoff | `createAttestationOnChain` verifies handoff and requires `DEMONSTRATED` + confirmation | Wallet/key compromise remains possible |
| On-chain payload | Sensitive data exposure | Raw evidence and subject are not written in clear; pseudonymous `subject_ref` used | Metadata remains public; hashes may have correlation considerations |
| Attestation verification | Hash-only false assurance | Full verification can bind payload to supplied reviewed state and expected signer | Without reviewed state, semantic binding cannot be fully established |
| External verification infrastructure | Provider/adaptor compromise | Adapter boundary keeps external execution below canonical verifier/consensus semantics | External result still requires appropriate trust assumptions |
| Secret key | Attester key compromise | Signer is externalized through environment; verification can require expected signer | Key custody/rotation is not a production-grade KMS design in MVP |

## 4. Security invariants

The current MVP must preserve:

1. raw sensitive evidence does not enter the attestation payload;
2. evidence integrity is recomputed, not trusted from stored hashes alone;
3. AI cannot mutate canonical evidence through the provider boundary;
4. deterministic verification does not consume AI signals;
5. consensus does not silently convert conflict into agreement;
6. competency state cannot be advanced by frontend code;
7. human adjudication is traceable and exceptional;
8. attestation is refused for a non-`DEMONSTRATED` handoff;
9. on-chain verification distinguishes hash presence from full payload binding;
10. external verification infrastructure cannot become semantic authority over competency.

## 5. Residual risks explicitly accepted for the MVP

The MVP does **not** fully solve:

- authenticity of the person who produced evidence;
- truthfulness of user-supplied content;
- model bias or semantic error;
- correctness/fairness of competency criteria;
- compromised provider infrastructure;
- production-grade secret management;
- replay prevention as a generalized distributed protocol;
- universal resistance to correlated verifier failure;
- legal/regulatory validity of a competency claim.

These are boundaries, not hidden capabilities.

## 6. Security principle

> **Integrity of a record is not the same thing as truth of the claim represented by that record.**

LASTRO protects the trace from evidence through verification, consensus and attestation. It does not claim that cryptography alone makes the underlying human claim true.
