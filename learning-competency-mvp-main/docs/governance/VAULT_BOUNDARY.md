# Vault Boundary & Publication Policy

**Status:** operational publication boundary — private Vault migration completed on 2026-10-04.

## Purpose

Define and maintain the boundary between the public MVP repository, the controlled Private Vault and any future curated Public Vault.

### Public Vault

Canonical public state, reproducible technical proof, research supporting the thesis, public product and brand documentation.

### Private Vault

Commercial strategy, sensitive team material, unpublished research, private deliberation and restricted operational information.

### Secrets

Credentials, API keys, private keys, tokens and passwords never belong in either vault. They belong in a secret manager.

## Current Migration Status

The first controlled physical separation has been completed.

- Public MVP repository: `SH1W4/learning-competency-mvp` — remains canonical and unchanged as the public execution/reproducibility layer.
- Private Vault: `SH1W4/lastro-vault-1` — contains the 29 files classified `REVIEW` or `RESTRICTED-LATER`.
- File-level authority: `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md`.
- Migration manifest: `MIGRATION_MANIFEST_2026-10-04.md` in the Private Vault.

This does not mean the public repository is a complete curated Public Vault. A separate public curation layer remains optional.

## Current repository status

This repository remains the **canonical public MVP repository**. Controlled material classified for the private layer has been copied to the Private Vault; files were not deleted or history-rewritten.

Important: .gitignore does not make an already tracked file private. A later migration must classify tracked content explicitly.

## Publication classes

### PUBLIC

Candidate material:
- README;
- product and use-case specifications;
- public architecture;
- Consensus Core;
- selected research and benchmarks;
- brand system;
- demo and proof documentation;
- limitations and claims discipline;
- source code, tests and synthetic fixtures.

### PUBLIC-WITH-REVIEW

Material that is useful publicly but needs a release review:
- detailed competitive analysis;
- unpublished benchmark conclusions;
- future roadmap research;
- internal decision records;
- research containing non-public collaborator context.

### PRIVATE

Keep in the Private Vault:
- commercial strategy;
- pricing and buyer experiments;
- private interviews;
- private meeting notes;
- negotiation or partnership material;
- internal deliberation;
- unpublished security findings.

## Current classification baseline

| Area | Default | Reason |
| --- | --- | --- |
| README | PUBLIC | project entry point |
| Product / Use Case | PUBLIC | explains the MVP |
| Architecture | PUBLIC | technical proof |
| Consensus Core | PUBLIC | core differentiator |
| Research | PUBLIC-WITH-REVIEW | valuable depth; claims require discipline |
| Brand | PUBLIC | product identity |
| Tests / synthetic fixtures | PUBLIC | reproducibility |
| Demo / proof | PUBLIC | hackathon evidence |
| Limitations / claims | PUBLIC | credibility |
| Commercial strategy | PRIVATE | competitive sensitivity |
| Pitch working material | PRIVATE | internal positioning |
| Hackathon internal planning | PRIVATE | competition-sensitive |
| Private meeting notes | PRIVATE | confidentiality |
| Secrets | SECRET STORE | never committed |

## Ongoing publication gate

For future changes or a possible curated Public Vault:
1. repository inventory is complete;
2. every file has a publication class;
3. tracked private files are identified;
4. secret scanning is clean;
5. public claims match implementation;
6. research citations are preserved;
7. synthetic examples are separated from real evidence;
8. every private file has a destination;
9. the Public Vault has a canonical README and source-of-truth map;
10. migration happens through a reviewable commit/PR.

## Decision

**The initial private Vault separation is complete.** Future publication changes must use the file-level matrix, preserve source lineage, and be recorded through reviewable changes.

The public repository remains the canonical implementation and reproducibility surface.


## Publication Classes — 2026-10-04 clarification

The publication model is more granular than a binary public/private split:

### PUBLIC
Safe for general publication and intended to support understanding, evaluation, or reproduction.

### RESTRICTED
Controlled-disclosure material. Access may require NDA, redaction, or case-by-case technical review. Examples include non-public market-validation evidence, customer/partner interviews, unpublished benchmark material, and technical due-diligence details.

**RESTRICTED is a publication class, not a requirement to create a third physical repository before the hackathon.** Until a physical topology is approved, restricted material remains outside the public repository in the team's controlled workspace.

### PRIVATE
Core-team material such as commercial strategy, pricing/buyer experiments, private meeting notes, negotiations, internal deliberation, unpublished competitive intelligence, and unpublished security findings.

### SECRET STORE
Credentials, API keys, private keys, tokens, passwords and signing material never belong in any vault or repository. They belong in an appropriate secret manager.

## IP Boundary

The current MVP repository intentionally exposes implementation as part of reproducibility and technical auditability. Do not retroactively label the current source tree as proprietary merely because competitors can learn from it.

If a future component intentionally contains proprietary prompts, heuristics, weights, models, or other competitive implementation details, classify that component before publication and expose the corresponding public contract separately where appropriate. A public architecture document does not require every future implementation detail to be public.

## Declassification Protocol

A RESTRICTED or PRIVATE artifact may be promoted to PUBLIC only after review that:
1. removes or redacts commercial, contractual, personal, security-sensitive and credential material;
2. removes sensitive metadata or identifiers where necessary;
3. verifies that public claims remain supported;
4. updates SOURCE_OF_TRUTH.md;
5. records the promotion in a reviewable commit or decision record.

## Controlled Disclosure Protocol

For hackathon evaluation, investor diligence, partnership discussion, or technical review:
1. identify the minimum information required;
2. prepare a redacted or purpose-specific package;
3. use NDA/access control for RESTRICTED material when appropriate;
4. disclose only the approved scope;
5. record who received it, why, and when;
6. define an expiry/review date when access is temporary;
7. never copy restricted material into the public repository merely for convenience.

## Pre-Hackathon Publication Audit

Before public submission or a major release, review the tracked repository file-by-file. Inspect research, market, GTM, diary, pitch, decision and configuration material individually; run dedicated secret scanning; distinguish synthetic fixtures from real evidence; and verify public claims against implementation. A keyword grep alone is not sufficient.

## Physical Migration Decision

**Private Vault migration was explicitly executed on 2026-10-04.** The public repository was not deleted, rewritten or stripped. The eventual curated Public Vault remains a separate future decision and is not required for the current MVP.


## Operational classification baseline — 2026-10-04

The file-level publication baseline is maintained in `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` and overrides directory-based assumptions for the current review.

The important correction is that `research/`, `docs/product/`, and `docs/decisions/` are not intrinsically public or private. Each artifact is classified by actual information content. Current source code remains PUBLIC because reproducibility and technical auditability are part of the MVP proof strategy.

No physical file movement is authorized by this classification. RESTRICTED means controlled disclosure, not a requirement for a third repository before the hackathon.


## File-level authority

For current repository triage, `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` is authoritative at file level. Directory-level labels in this document are defaults and do not override an explicit file classification.

## Operational Brain — 2026-10-04

The Private Vault now serves as the storage layer for the **LASTRO Operational Brain**.

The distinction is intentional:

- **Vault** = private storage and publication boundary.
- **Operational Brain** = functional role: private operational memory, decision context, execution history and working knowledge.
- **MCP** = read-only interface through which compatible AI agents can query that private context.

The current MCP implementation is maintained inside `SH1W4/lastro-vault-1/mcp/` and is read-only by design.

The MCP does not change the source-of-truth hierarchy:

1. current implementation/tests remain canonical for executable behavior;
2. public canonical documents remain authoritative for current public architecture and claims;
3. Operational Brain material provides private operational or historical context;
4. historical/lineage material must never silently override current public state.

No write-capable MCP surface is authorized by this boundary. Any future write capability requires a separate security, authorization, audit and concurrency review.
