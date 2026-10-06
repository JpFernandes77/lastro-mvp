# Source of Truth Map

**Status:** preparation baseline for the future Public Vault.

## Current canonical layers

| Layer | Canonical location | Purpose | Future vault |
| --- | --- | --- | --- |
| Project entry point | README.md | public product narrative | PUBLIC |
| Product contract | docs/product/USE_CASE.md | canonical MVP use case | PUBLIC |
| Architecture | docs/evaluation/02_ARCHITECTURE.md | evidence/verification architecture | PUBLIC |
| Consensus | docs/architecture/CONSENSUS_CORE.md | decision authority | PUBLIC |
| Governance | docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md | consensus, adjudication, attestation boundary | PUBLIC |
| Demo / proof | docs/evaluation/04_DEMO_AND_PROOF.md | reproducible proof path | PUBLIC |
| Claims | docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md | claim discipline | PUBLIC |
| Brand | docs/brand/ | identity and interface handoff | PUBLIC |
| Research | docs/research/ or equivalent research documents | external evidence and benchmarks | PUBLIC-WITH-REVIEW |
| Commercial | docs/business/ | buyer, GTM, pricing and commercial intelligence | PRIVATE |
| Pitch working material | docs/pitch/ | internal positioning | PRIVATE |
| Hackathon internal material | docs/hackathon/ | competition-sensitive planning | PRIVATE |
| Restricted notes | docs/private/ | sensitive internal material | PRIVATE |

## Canonical-state rule

When sources disagree:

1. current implementation and tests define executable behavior;
2. canonical product and architecture documents define intended behavior;
3. research documents define evidence and hypotheses;
4. historical archives preserve prior states but do not override current state.

## Public Vault rule

The future Public Vault should contain only material that can be safely used to understand, evaluate or reproduce the public project.

## Private Vault rule

The Private Vault is the workspace for strategy, confidential context and unpublished material. It must not become an undocumented second source of truth for the public MVP.

## Historical archive

Google Drive and other historical archives can preserve previous documents, meeting records and research snapshots. Historical material may be stale relative to the current GitHub state.

## Migration rule

The vault split must be executed only after a file-by-file inventory and review. No path should be moved solely because its directory name sounds public or private.


## Publication Classes — 2026-10-04 clarification

In addition to PUBLIC and PRIVATE, use the following publication classes:

- **PUBLIC:** safe for general publication and intended to support evaluation or reproduction.
- **RESTRICTED:** controlled disclosure under NDA, redaction, or explicit access review. This is a classification, not a requirement for a third physical repository now.
- **PRIVATE:** core-team material not intended for general disclosure.
- **SECRET STORE:** credentials and cryptographic secrets; never committed.

### Classification guidance

Research, market/GTM, diary, pitch and decision material must be classified by content, not by directory name. Public architecture and source code remain PUBLIC in the current MVP because reproducibility is part of the technical proof strategy. Real customer evidence and non-public market evidence are RESTRICTED or PRIVATE. Future intentionally proprietary implementation should be classified explicitly before publication rather than assumed to be hidden.

### Declassification

Promotion from RESTRICTED/PRIVATE to PUBLIC requires content and metadata review, removal/redaction of sensitive material, claim verification, an update to this map, and a reviewable commit or decision record.

### Controlled disclosure

For evaluators, investors, partners or technical reviewers, disclose the minimum necessary scope, prefer redaction, use NDA/access control where appropriate, record the disclosure, and never copy restricted material into the public repository merely for convenience.

No physical vault migration is required before the hackathon unless explicitly approved.


## Operational classification baseline — 2026-10-04

The file-level publication baseline is maintained in `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md`.

The classification is content-based. The current baseline explicitly keeps the following public: source code, tests, synthetic fixtures, canonical architecture, public product narrative, public GTM framing, public competitive framework, and the public Colosseum ecosystem benchmark.

The following are RESTRICTED by default: hackathon execution strategy, market-validation evidence, strategic research decisions, winning-pattern/readiness audits, and decision records whose contents expose internal trade-offs.

The diary remains PRIVATE by default. Secrets remain SECRET STORE. No physical migration is authorized by this baseline.
