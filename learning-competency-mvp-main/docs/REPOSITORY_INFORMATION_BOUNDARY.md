# Repository Information Boundary

## Purpose

LASTRO uses an explicit information boundary to distinguish material that is intentionally public from material that belongs to the team's restricted working environment.

The public repository is the canonical surface for **reproducible product, technical, research, and architectural claims**. It is not intended to contain every piece of internal project knowledge.

## Classification model

| Class | Location | Default visibility | Purpose |
|---|---|---:|---|
| Public — Product | `README.md`, `docs/`, canonical product docs | Public | Explain what LASTRO is, what the MVP does, its boundaries, and current claims. |
| Public — Research | selected `research/` artifacts | Public | Preserve consolidated prior art, evidence, limitations, and research findings needed to support public claims. |
| Public — Implementation | `src/`, `tests/`, `fixtures/`, `skills/` | Public | Make the MVP reproducible and technically auditable. |
| Public — Project governance | `CONTRIBUTING.md`, selected decision records and task documentation | Public | Explain how the public project is developed and maintained. |
| Restricted — Internal strategy | Outside the public repository | Restricted | Unreleased commercial strategy, negotiation positions, competitive intelligence, internal prioritization, and sensitive strategic hypotheses. |
| Restricted — Partner/confidential | Outside the public repository | Restricted | NDA material, partner communications, private customer information, private datasets, credentials, and other information whose disclosure is not authorized. |
| Restricted — Working material | Outside the public repository | Restricted | Drafts, private meeting notes, exploratory material, article working sets, or experiments that are not yet intended to support a public claim. |

## Core rule

**If a document is necessary to understand, reproduce, audit, challenge, or contextualize a claim made by the public LASTRO project, it should normally be public.**

Conversely:

**If publication would expose confidential information, private data, credentials, contractual restrictions, unreleased commercial strategy, or information that the team has explicitly decided not to disclose, it belongs outside the public repository.**

## Research boundary

The `research/` directory is **public by default for bounded, auditable research artifacts**, while private drafts, confidential strategy and sensitive working material remain outside the repository.

Public research documents may contain:

- literature and standards;
- prior-art analysis;
- counterexamples;
- research questions;
- methodological protocols;
- evidence matrices;
- architectural hypotheses;
- documented research decisions;
- limitations and unresolved gaps.

Research documents must **not** be treated as proof of novelty merely because they identify a gap. Claims of novelty, invention priority, patentability, or scientific contribution require independent evidence and appropriate qualification.

The public research layer should favor:

1. traceable sources;
2. explicit uncertainty;
3. counterexample searches;
4. separation between established knowledge and LASTRO hypotheses;
5. dated decisions where useful;
6. clear distinction between evidence and interpretation.

## Article research boundary

The public article track under `research/article/` contains curated research artifacts that are relevant to understanding and challenging the LASTRO thesis. They are explicitly labeled as scoped reviews, matrices, protocols, or hypotheses. Private drafts and unreleased article working material may remain in the Vault, but the existence of private working copies does not justify hiding evidence needed to audit a public claim.

## Restricted boundary

There is intentionally no `restricted/` directory in the public repository.

A folder named `restricted/` inside a public repository would create a false security boundary: GitHub would still publish its contents.

Restricted material must therefore live in an access-controlled system outside the public repository, such as the team's private workspace, private document store, or private repository.

Do not place secrets or confidential material in the public repository and rely on `.gitignore` as protection. `.gitignore` prevents accidental tracking; it does not make already-committed or intentionally shared files private.

## Classification test

Before adding a file, ask:

1. Does it contain confidential or personal information?
2. Is it covered by an NDA, contractual restriction, or partner confidentiality expectation?
3. Does it contain credentials, private keys, tokens, or operational secrets?
4. Does publication expose unreleased commercial strategy or negotiation positions?
5. Is the material necessary to substantiate a public claim or make the MVP auditable?
6. Would a reasonable external reviewer benefit from seeing it to understand the project's evidence and limitations?

If **1–4 = yes**, keep it restricted.

If **1–4 = no** and **5–6 = yes**, default to public.

If the answer remains uncertain, classify it as restricted until the team explicitly decides otherwise.

## Relationship to source of truth

The public repository remains the canonical source for the current public state of LASTRO.

Historical conversations, private working notes, partner material, and internal strategy may inform decisions but do not automatically become public simply because they influenced the project.

When a private decision materially changes the public architecture or product claim, publish the resulting decision at the appropriate level of abstraction without exposing confidential underlying material.

## Anti-leak principle

The boundary is about **information classification**, not about hiding implementation.

LASTRO's public technical implementation, tests, synthetic fixtures, canonical architecture, and public research are intentionally visible because auditability and reproducibility are part of the project's proof strategy.
