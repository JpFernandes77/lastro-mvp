# Vault Migration Map

**Status:** operational migration map — private Vault separation completed; future public curation remains optional.

## Purpose

Classify the current repository into the current public MVP, the controlled private Vault, and a future curated public knowledge layer:

- 🔵 **MVP** — technical implementation and reproducibility.
- 🟢 **VAULT** — curated project knowledge suitable for public/project documentation.
- 🔴 **CORE** — private/internal operating and strategic intelligence.
- 🟡 **VAULT CURATED** — useful source material that requires a deliberate public derivative.
- ⚪ **HISTORICAL** — retained for lineage, but not canonical.

The separation must preserve:

`RESEARCH → EVIDENCE → DECISION → ARCHITECTURE → IMPLEMENTATION → DEMO → PROOF`

## Current classification

| Area | Destination | Action |
|---|---|---|
| `src/` | 🔵 MVP | Keep implementation |
| `tests/` | 🔵 MVP | Keep executable tests |
| `fixtures/` | 🔵 MVP + 🟡 | Keep fixtures; expose only selected synthetic evidence |
| `.github/` | 🔵 MVP | Keep CI/workflows |
| root config | 🔵 MVP | Keep |
| `docs/evaluation/` | 🟢 + 🔵 | Strong public source; retain technical source |
| `docs/architecture/` | 🟡 + 🔵 | Publish curated architecture; retain implementation detail |
| `docs/product/` | 🟡 + 🔵 | Curate canonical product material |
| `docs/brand/` | 🟢 | Curate consolidated identity |
| `docs/demo/` | 🟡 | Publish proof-oriented demo material |
| `docs/go-to-market/` | 🟡 + 🔴 | Public hypotheses; private operating strategy |
| `docs/governance/` | 🟡 | Publish roles selectively |
| `docs/market/` | 🟡 | Publish evidence-based market view |
| `docs/validation/` | 🟢 | Publish with explicit evidence levels |
| `docs/diario-de-bordo/` | 🔴 + ⚪ | Do not migrate raw diary |
| `docs/PROJECT_STATUS.md` | 🟡 | Derive public status |
| `docs/PROJECT_HANDOFF.md` | 🔵 | Technical continuity |
| `docs/ALIGNMENT_AUDIT.md` | 🟡 | Derive public alignment principles |
| `research/` | 🟡 mixed + 🔴 article working set | Classify by content and research maturity |
| `research/product/` | 🟡 | Curate research/vision |
| `skills/` | 🔴 | Do not migrate |
| `tasks/` | 🔴 + 🔵 | Keep operational planning out of Vault |

## Root

- `README.md` → 🟢 + 🔵. Canonical public entry point.
- `README.pt.md` → 🔵 until vocabulary cleanup.
- `.env.example`, `.gitignore`, `.gitattributes`, `CONTRIBUTING.md`, `package.json`, `package-lock.json`, `tsconfig.json` → 🔵 MVP.

Technical configuration should not be copied into the Vault merely for completeness.

## Source and tests

All `src/` and `tests/` remain 🔵 MVP.

The Vault should contain architectural explanations and evidence of critical tests, not duplicate the executable implementation.

Current source domains include:

`ai / cli / consensus / domain / evidence / provenance / relation / review / state / solana`

## Synthetic evidence

`fixtures/synthetic/ana/` remains 🔵 MVP.

A clearly labeled synthetic case may become 🟡 Vault material:

`Evidence → Verification → Consensus → Competency State → Proof`

Synthetic evidence must never be represented as customer evidence or market validation.

## Evaluation

`docs/evaluation/` is 🟢/🔵.

Prioritize:

- `01_PRODUCT.md`
- `02_ARCHITECTURE.md`
- `03_VERIFICATION_AND_GOVERNANCE.md`
- `04_DEMO_AND_PROOF.md`
- `05_LIMITATIONS_AND_CLAIMS.md`

The last document is especially important because it preserves the boundary between demonstrated capability, external evidence, hypothesis and non-claim.

## Architecture

`docs/architecture/` is 🟡/🔵.

Future public architecture should converge on:

`EVIDENCE → INDEPENDENT VERIFICATION → CONSENSUS CORE → COMPETENCY STATE → ATTESTATION → VERIFICATION`

Human adjudication is an exception route for conflict/ambiguity. **Routine Human Review is not a canonical pipeline stage.**

Recommended Vault architecture set:

- `SYSTEM_OVERVIEW.md`
- `EVIDENCE_MODEL.md`
- `VERIFICATION_MODEL.md`
- `CONSENSUS_CORE.md`
- `STATE_MODEL.md`
- `ATTESTATION_MODEL.md`
- `TRUST_BOUNDARIES.md`

## Product

- `docs/product/PITCH_ARCHITECTURE.md` → 🟢
- `docs/product/USER_JOURNEYS.md` → 🟢
- `docs/product/USE_CASE.md` → 🟢
- `docs/product/MVP_CONTRACT.md` → 🟡/🔵
- `docs/product/FRONTEND_PRODUCT_SPEC.md` → 🟡/🔵
- `docs/product/FRONTEND_SPEC_ERICK_JP.md` → ⚪/🔵; earlier specification, not canonical Vault knowledge.

## Alignment and status

`docs/ALIGNMENT_AUDIT.md` → 🟡.

Public derivative should explain:

`RESEARCH → EVIDENCE → INTERPRETATION → DECISION → ARCHITECTURE → IMPLEMENTATION → PRODUCT → DEMO/PROOF → CLAIM`

without exposing internal operational checklists.

`docs/PROJECT_STATUS.md` → 🟡; derive a public status containing implementation, proof, validation and limitations.

`docs/PROJECT_HANDOFF.md` → 🔵 MVP.

## History

`docs/diario-de-bordo/` → 🔴/⚪.

Do not migrate the raw diary. Reconstruct a public history later:

`09_HISTORY/ORIGIN.md`
`09_HISTORY/M1.md`
`09_HISTORY/M2.md`
`09_HISTORY/M3.md`
`09_HISTORY/HARDENING.md`
`09_HISTORY/RESEARCH_EVOLUTION.md`

The public history should explain evolution without exposing every internal working note.

## Brand

`docs/brand/` → 🟢/🟡.

Publish the consolidated identity, approved naming, visual system and final assets. Do not publish every rejected exploration merely for completeness.

## Demo

`docs/demo/DEMO_SCRIPT.md` → 🟡.

Public derivative should explain the demo objective, canonical journey, what each step proves and reproducibility requirements. Presenter-operational details can remain private.

## GTM / governance / market

- `docs/go-to-market/GTM.md` → 🟡 + 🔴. Public buyer/distribution hypotheses and validation status; private outreach, pricing experiments and sensitive strategy.
- `docs/governance/TEAM_ROLES.md` → 🟡. Publish team/roles/contributions selectively.
- `docs/market/COMPETITIVE_LANDSCAPE.md` → 🟡. Publish evidence, adjacent solutions and unresolved differentiation; protect sensitive intelligence.
- `docs/validation/DEMAND_VALIDATION.md` → 🟢. Preserve evidence levels and do not upgrade hypotheses without evidence.

## Research

- `research/01_DYNAMIC_ROLE_ARCHITECTURE.md` → 🟡
- `research/02_ROLE_DELTA_MODEL.md` → 🟡
- `research/03_DATA_STATISTICAL_ROBUSTNESS.md` → 🟡
- `research/04_MARKET_VALIDATION_EVIDENCE.md` → 🟢
- `research/01_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` → 🟡
- `research/06_DECISIONS.md` → 🟡
- `research/07_VERIFICATION_INFRASTRUCTURE_BENCHMARK.md` → 🔴 initially; future public derivative only by explicit decision.
- Article research track (`research/article/`) → 🟢 public curated research. It must remain labeled as scoped review / research hypothesis. Private drafts or sensitive article working material may remain in the Vault.

All DRA, Role Delta, future-platform and verification-infrastructure work must remain clearly labeled research/hypothesis where it exceeds the implemented MVP.

## Article research

The article research program has a public curated track under `research/article/`. The public versions expose the current scoped review, counterexamples and literature-closure protocol without presenting them as systematic review results or novelty proof.

The publication gate remains methodological: a future article-level claim must survive database expansion, screening, counterexample review and explicit limitation analysis. Private working copies may remain in the Vault when they contain unfinished or sensitive material.

## Product research

`research/product/` → 🟡.

Potential public derivatives:

- current product thesis;
- future platform vision;
- applied AI workforce research;
- open research questions.

Do not silently convert future-platform hypotheses into implemented capabilities.

## Skills and tasks

`skills/` → 🔴 Core.

Includes:

- `skills/hackathon-evaluator/`
- `skills/learning-competency/`

These are internal operating intelligence and should not be migrated as-is.

`tasks/` → 🔴/🔵.

Keep execution planning, milestone tasks and handoffs out of the public Vault. Public history may summarize milestones.

## Future Vault target

```
LASTRO PROJECT VAULT
├── 00_ORIGIN/
├── 01_RESEARCH/
├── 02_EVIDENCE/
├── 03_DECISIONS/
├── 04_ARCHITECTURE/
├── 05_PRODUCT/
├── 06_DEMO/
├── 07_PROOF/
├── 08_GOVERNANCE/
├── 09_HISTORY/
└── 10_BRAND/
```

This is a target model, not authorization to migrate.

## Post-migration follow-ups

### P0 — Canonical vocabulary
Remove remaining canonical references that make Human Review a routine pipeline stage.

Canonical:

`EVIDENCE → INDEPENDENT VERIFICATION → CONSENSUS CORE`

Exception:

`CONFLICT / AMBIGUITY → HUMAN ADJUDICATION`

### P0 — Current proof
Generate and record the current `m3.attestation.v2` Devnet proof before presenting it as current public proof.

### P1 — Historical specifications
Mark superseded frontend/product specifications as historical.

### P1 — Research boundaries
Keep DRA, Role Delta, future platform, AI workforce capability and verification-infrastructure work explicitly bounded as research where appropriate.

### P1 — Public/private review
Review GTM, competitive research, tasks, skills and strategic research before any Vault publication.

## Separation rules

1. Do not delete first.
2. Do not rewrite Git history merely to make the repository cleaner.
3. Do not duplicate implementation unnecessarily.
4. Do not publish hypotheses as facts.
5. Do not publish synthetic evidence as real-world validation.
6. Do not publish internal operating skills.
7. Do not expose sensitive commercial/competitive information without explicit decision.
8. Preserve source lineage for every curated Vault artifact.
9. Mark historical documents explicitly.
10. The Vault must describe the system accurately without exposing every implementation detail.

## Future curation sequence

```
Public MVP (canonical)
      ↓
File-level classification
      ↓
Private Vault for REVIEW / RESTRICTED-LATER
      ↓
Optional curated Public Vault
      ↓
Ongoing reconciliation
```

No MVP file should be removed merely because a curated derivative exists.

## Separation completion status

- [x] every tracked file has a publication class;
- [x] REVIEW / RESTRICTED-LATER files have a controlled Vault destination;
- [x] no canonical document contradicts Consensus Core;
- [x] Human Adjudication remains an exception;
- [x] synthetic evidence is labeled;
- [x] market validation is separated from product demonstration;
- [x] DRA/future platform remain hypotheses;
- [x] MVP remains reproducible;
- [x] no unnecessary history rewrite occurred;
- [x] public narrative matches implementation;
- [ ] optional curated Public Vault created.

## Final principle

> **The Vault is not a copy of the repository. It is the curated knowledge layer that allows an independent person to reconstruct why the project exists, what was researched, what was decided, what was built, what was proven, and what remains unknown.**

> **The MVP repository proves execution. The Vault explains the knowledge behind the execution. The Core protects the intelligence required to continue building.**


## File-level authority

For current repository triage, `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` is authoritative at file level. The area-level mapping below is a planning model and does not override an explicit file classification.