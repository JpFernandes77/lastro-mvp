# File-Level Publication Classification Matrix

**Status:** operational baseline — file-level triage
**Review pass:** 2026-10-05 — publication class + public-surface role reconciliation + future-research migration
**Date:** 2026-10-05

This is the authoritative file-level classification for the current LASTRO repository. It marks every file currently tracked in the public repository; migrated files are recorded in the private Vault manifest.

The matrix now separates two questions that were previously conflated:

1. **Publication Class** — how the file should be treated from a publication/exposure perspective.
2. **Public Surface Role** — what function the file serves, if any, in the current public surface.

This prevents `PUBLIC-WITH-REVIEW` from meaning “this must remain part of the canonical public surface.” A file may be publicly accessible today while still being optional, future-facing, or awaiting curation.

## Classes

| Class | Meaning | Action now |
|---|---|---|
| `PUBLIC` | Intentionally public and part of the current public surface; useful for reproducibility, evaluation, auditability, or understanding | Keep public and treat as current canonical public material |
| `PUBLIC-WITH-REVIEW` | Publicly accessible today, but not necessarily part of the canonical public surface; future-facing, optional, or awaiting curation | Keep public for now; do not treat as required current-state material; review at the next curation pass |
| `REVIEW` | Potentially sensitive or historically internal; requires explicit decision before being treated as public canonical knowledge | Do not promote; assess |
| `RESTRICTED-LATER` | Intended for the future controlled Vault/workspace | Do not copy into a future public Vault without review |
| `SECRET STORE` | Secrets/credentials/signing material | Never commit |

> **Important:** Because this GitHub repository is already public, `REVIEW` and `RESTRICTED-LATER` do not make a file private today. They describe intended handling. Physical separation happens through migration to the private Vault or another controlled store.

## Public Surface Roles

The role column answers: **“What function does this file have in the current public surface?”**

| Role | Meaning |
|---|---|
| `CORE` | Current product, architecture, implementation, tests, reproducible fixtures, or governance required to understand/reproduce/audit the MVP |
| `EVIDENCE` | External evidence, related work, benchmarks, or methodological material supporting evaluation of the current thesis |
| `NAVIGATION` | Indexes, maps, READMEs, and orientation documents that help a reviewer traverse the public repository |
| `RESEARCH-ARTICLE` | Curated article research intentionally exposed as part of the public evidence/methodological boundary |
| `PRODUCT-THESIS` | Product thesis or bounded strategic framing that contextualizes the current public MVP |
| `FUTURE-RESEARCH` | Research or hypotheses beyond the closed MVP contract; public today only as optional/future-facing material |
| `RESEARCH-PLANNING` | Research agenda, open questions, or planning material for work beyond the current MVP |
| `PACKAGE` | Dependency/package metadata required by the public implementation |

### Interpretation rule

**Publication Class controls exposure. Public Surface Role controls necessity.**

Therefore, `PUBLIC-WITH-REVIEW + FUTURE-RESEARCH/RESEARCH-PLANNING` means publicly accessible but not part of the canonical current-state narrative. A future curation pass may promote, consolidate, archive, or migrate such a file without changing the historical record.

No role implies implementation authority. Research and thesis documents do not alter the MVP contract unless explicitly promoted through the normal product/architecture process.

## File inventory

| Path | Publication Class | Public Surface Role |
|---|---|
| `.env.example` | `PUBLIC` | `CORE` |
| `.gitattributes` | `PUBLIC` | `CORE` |
| `.github/workflows/ci.yml` | `PUBLIC` | `CORE` |
| `.github/workflows/solana-devnet.yml` | `PUBLIC` | `CORE` |
| `.gitignore` | `PUBLIC` | `CORE` |
| `CONTRIBUTING.md` | `PUBLIC` | `NAVIGATION` |
| `README.md` | `PUBLIC` | `NAVIGATION` |
| `README.pt.md` | `PUBLIC` | `NAVIGATION` |
| `docs/ALIGNMENT_AUDIT.md` | `PUBLIC` | `CORE` |
| `docs/PROJECT_HANDOFF.md` | `PUBLIC` | `CORE` |
| `docs/PROJECT_STATUS.md` | `PUBLIC` | `CORE` |
| `docs/REPOSITORY_INFORMATION_BOUNDARY.md` | `PUBLIC` | `CORE` |
| `docs/VAULT_MIGRATION_MAP.md` | `PUBLIC` | `CORE` |
| `docs/architecture/API_CONTRACT.md` | `PUBLIC` | `CORE` |
| `docs/architecture/ATTESTATION_MODEL.md` | `PUBLIC` | `CORE` |
| `docs/architecture/CANONICALIZATION.md` | `PUBLIC` | `CORE` |
| `docs/architecture/CONSENSUS_CORE.md` | `PUBLIC` | `CORE` |
| `docs/architecture/DOMAIN_MODEL.md` | `PUBLIC` | `CORE` |
| `docs/architecture/EVIDENCE_PIPELINE.md` | `PUBLIC` | `CORE` |
| `docs/architecture/GOVERNANCE_COMPLIANCE_LAYER.md` | `PUBLIC` | `CORE` |
| `docs/architecture/M2_IMPLEMENTATION.md` | `PUBLIC` | `CORE` |
| `docs/architecture/README.md` | `PUBLIC` | `NAVIGATION` |
| `docs/architecture/TECHNICAL_ARCHITECTURE.md` | `PUBLIC` | `CORE` |
| `docs/architecture/VERIFICATION_ADAPTER_BOUNDARY.md` | `PUBLIC` | `CORE` |
| `docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png` | `PUBLIC` | `CORE` |
| `docs/brand/BRANDBOOK_DRAFT.md` | `PUBLIC` | `CORE` |
| `docs/brand/DESIGN_BRIEF_JP_FERNANDES.md` | `PUBLIC` | `CORE` |
| `docs/brand/LASTRO_IDENTIDADE_v0.2.html` | `PUBLIC` | `CORE` |
| `docs/brand/NAMING_EXPLORATION.md` | `PUBLIC` | `CORE` |
| `docs/brand/README.md` | `PUBLIC` | `NAVIGATION` |
| `docs/brand/VISUAL_SYSTEM_SPEC.md` | `PUBLIC` | `CORE` |
| `docs/brand/assets/learning-competency-symbol-reference-3d.png` | `PUBLIC` | `CORE` |
| `docs/brand/assets/learning-competency-symbol-reference-flat.png` | `PUBLIC` | `CORE` |
| `docs/brand/assets/learning-competency-symbol-v0.svg` | `PUBLIC` | `CORE` |
| `docs/decisions/0001-repository-operating-model.md` | `PUBLIC` | `CORE` |
| `docs/decisions/README.md` | `PUBLIC` | `NAVIGATION` |
| `docs/demo/DEMO_SCRIPT.md` | `PUBLIC` | `CORE` |
| `docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md` | `PUBLIC` | `CORE` |
| `docs/evaluation/01_PRODUCT.md` | `PUBLIC` | `CORE` |
| `docs/evaluation/02_ARCHITECTURE.md` | `PUBLIC` | `CORE` |
| `docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md` | `PUBLIC` | `CORE` |
| `docs/evaluation/04_DEMO_AND_PROOF.md` | `PUBLIC` | `CORE` |
| `docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md` | `PUBLIC` | `CORE` |
| `docs/evaluation/README.md` | `PUBLIC` | `NAVIGATION` |
| `docs/go-to-market/GTM.md` | `PUBLIC` | `PRODUCT-THESIS` |
| `docs/governance/PROJECT_AUDIT_2026-10-04.md` | `PUBLIC` | `CORE` |
| `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` | `PUBLIC` | `CORE` |
| `docs/governance/SECURITY_THREAT_MODEL.md` | `PUBLIC` | `CORE` |
| `docs/governance/SOURCE_OF_TRUTH.md` | `PUBLIC` | `CORE` |
| `docs/governance/TEAM_ROLES.md` | `PUBLIC` | `CORE` |
| `docs/governance/VAULT_BOUNDARY.md` | `PUBLIC` | `CORE` |
| `docs/market/COMPETITIVE_LANDSCAPE.md` | `PUBLIC` | `EVIDENCE` |
| `docs/product/FRONTEND_PRODUCT_SPEC.md` | `PUBLIC` | `CORE` |
| `docs/product/MVP_CONTRACT.md` | `PUBLIC` | `CORE` |
| `docs/product/PITCH_ARCHITECTURE.md` | `PUBLIC` | `PRODUCT-THESIS` |
| `docs/product/README.md` | `PUBLIC` | `NAVIGATION` |
| `docs/product/USER_JOURNEYS.md` | `PUBLIC` | `CORE` |
| `docs/product/USE_CASE.md` | `PUBLIC` | `CORE` |
| `docs/validation/DEMAND_VALIDATION.md` | `PUBLIC` | `EVIDENCE` |
| `fixtures/synthetic/ana/README.md` | `PUBLIC` | `NAVIGATION` |
| `fixtures/synthetic/ana/a1_briefing.md` | `PUBLIC` | `CORE` |
| `fixtures/synthetic/ana/a2_preparacao.ipynb` | `PUBLIC` | `CORE` |
| `fixtures/synthetic/ana/a3_analise.ipynb` | `PUBLIC` | `CORE` |
| `fixtures/synthetic/ana/a3_resultados.md` | `PUBLIC` | `CORE` |
| `fixtures/synthetic/ana/a4_sintese.md` | `PUBLIC` | `CORE` |
| `fixtures/synthetic/ana/adjudication_demonstrated.json` | `PUBLIC` | `CORE` |
| `package-lock.json` | `PUBLIC` | `PACKAGE` |
| `package.json` | `PUBLIC` | `PACKAGE` |
| `research/01_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` | `PUBLIC` | `EVIDENCE` |
| `research/02_ETHICAL_COMPLIANCE_LAYER.md` | `PUBLIC` | `EVIDENCE` |
| `research/README.md` | `PUBLIC` | `NAVIGATION` |
| `research/RELATED_WORK_AND_EVIDENCE.md` | `PUBLIC` | `EVIDENCE` |
| `research/RESEARCH_MAP.md` | `PUBLIC` | `NAVIGATION` |
| `research/article/README.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/01_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/02_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/RELATED_WORK_MATRIX.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/LITERATURE_CLOSURE_PROTOCOL.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/product/PRODUCT_THESIS.md` | `PUBLIC` | `PRODUCT-THESIS` |
| `src/.gitkeep` | `PUBLIC` | `CORE` |
| `src/README.md` | `PUBLIC` | `NAVIGATION` |
| `src/adjudication/adjudication.ts` | `PUBLIC` | `CORE` |
| `src/ai/contract.ts` | `PUBLIC` | `CORE` |
| `src/ai/provider.ts` | `PUBLIC` | `CORE` |
| `src/cli/demo.ts` | `PUBLIC` | `CORE` |
| `src/consensus/consensus.ts` | `PUBLIC` | `CORE` |
| `src/domain/types.ts` | `PUBLIC` | `CORE` |
| `src/domain/useCase.ts` | `PUBLIC` | `CORE` |
| `src/evidence/extract.ts` | `PUBLIC` | `CORE` |
| `src/evidence/ingest.ts` | `PUBLIC` | `CORE` |
| `src/evidence/normalize.ts` | `PUBLIC` | `CORE` |
| `src/pipeline.ts` | `PUBLIC` | `CORE` |
| `src/provenance/claim.ts` | `PUBLIC` | `CORE` |
| `src/provenance/trace.ts` | `PUBLIC` | `CORE` |
| `src/relation/relate.ts` | `PUBLIC` | `CORE` |
| `src/scenario.ts` | `PUBLIC` | `CORE` |
| `src/solana/attest.ts` | `PUBLIC` | `CORE` |
| `src/solana/demo.ts` | `PUBLIC` | `CORE` |
| `src/solana/integration.ts` | `PUBLIC` | `CORE` |
| `src/solana/verify.ts` | `PUBLIC` | `CORE` |
| `src/state/state.ts` | `PUBLIC` | `CORE` |
| `src/util.ts` | `PUBLIC` | `CORE` |
| `tests/.gitkeep` | `PUBLIC` | `CORE` |
| `tests/adjudication.test.ts` | `PUBLIC` | `CORE` |
| `tests/ai-contract.test.ts` | `PUBLIC` | `CORE` |
| `tests/canonicalization.test.ts` | `PUBLIC` | `CORE` |
| `tests/claim.test.ts` | `PUBLIC` | `CORE` |
| `tests/consensus.test.ts` | `PUBLIC` | `CORE` |
| `tests/extract.test.ts` | `PUBLIC` | `CORE` |
| `tests/helpers.ts` | `PUBLIC` | `CORE` |
| `tests/ingest.test.ts` | `PUBLIC` | `CORE` |
| `tests/m3.test.ts` | `PUBLIC` | `CORE` |
| `tests/pipeline.test.ts` | `PUBLIC` | `CORE` |
| `tests/provenance.test.ts` | `PUBLIC` | `CORE` |
| `tests/relate.test.ts` | `PUBLIC` | `CORE` |
| `tsconfig.json` | `PUBLIC` | `CORE` |

## Classification rules

1. `src/`, `tests/`, synthetic fixtures, canonical architecture and bounded research remain public when they are part of the reproducible proof.
2. Strategic execution, private operating intelligence, internal agent skills and task planning are candidates for the future restricted layer.
3. Research is **not** public by default. It is classified by content, maturity, and current public-surface role. Future research that is not needed to understand the closed MVP may be migrated to the private Vault.
4. `PUBLIC-WITH-REVIEW` means **publicly accessible but not necessarily canonical current-state material**. It must not be interpreted as “required to understand the current MVP.”
5. A `PUBLIC-WITH-REVIEW` file may later be promoted to `PUBLIC`, consolidated with another document, archived, or migrated to the private Vault after an explicit curation decision.
6. A file may move to `REVIEW` or `RESTRICTED-LATER` when publication would expose non-public strategy, partner information, sensitive competitive intelligence, private deliberation, or other controlled information.
7. Credentials, private keys, tokens and signing material are never solved by classification; they must not enter the repository.
8. **Current MVP closure takes precedence over future research surface area.** Future-facing material should remain visibly subordinate to the closed MVP contract.

## Article research track

The curated article-research artifacts are intentionally public because they provide evidence, prior-art boundaries, counterexamples, and methodological constraints needed to understand or challenge the public LASTRO thesis.


| `research/article/README.md` | `PUBLIC` |
| `research/article/01_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | `PUBLIC` |
| `research/article/02_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | `PUBLIC` |
| `research/article/RELATED_WORK_MATRIX.md` | `PUBLIC` |
| `research/article/LITERATURE_CLOSURE_PROTOCOL.md` | `PUBLIC` |

## Current interpretation

The repository is already public. This matrix is the **file-level publication authority for the current public repository**.

The public surface should be read in this order:

`CORE → EVIDENCE → NAVIGATION → RESEARCH-ARTICLE / PRODUCT-THESIS → FUTURE-RESEARCH / RESEARCH-PLANNING`

Files migrated to the private Vault are no longer tracked here; their migration is recorded in `MIGRATION_MANIFEST_2026-10-04.md` in `SH1W4/lastro-vault-1`.

The authoritative principle is:

> **Publication class tells us what may be public. Surface role tells us why it is public. Neither makes future research part of the current MVP.**

## Reclassification

Any classification change should be made through a reviewable commit and, where material, recorded in the project decision history. No file should be hidden merely because it has competitive value; the distinction is between public auditability and genuinely controlled information.

## Completed Vault migration

On 2026-10-04, the initial controlled migration moved **29 files: 9 `RESTRICTED-LATER` + 20 `REVIEW`** into the private Vault. Four article-research artifacts were subsequently curated back into a public `research/article/` track because their evidence and methodological boundaries materially support public auditability.

On 2026-10-05, a second curation pass migrated six `PUBLIC-WITH-REVIEW` future-research artifacts into the private Vault: Dynamic Role Architecture, Role Delta Model, Data & Statistical Robustness, Applied AI — Workforce Capability, Research Agenda, and the Product Research index. These materials remain preserved in the Vault and are no longer part of the current public research surface.

The public repository therefore contains the current canonical research surface; the private Vault preserves future research, operational context, and lineage.
