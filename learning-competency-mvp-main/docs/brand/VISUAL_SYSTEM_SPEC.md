# LASTRO — Visual System Specification v0.2

**Status:** working mini design system aligned with LASTRO Identity v0.2  
**Owner:** JP Fernandes — UX/UI, Interface & Product Presentation  
**Scope:** visual identity, design tokens, typography, semantic states, components, responsive behavior, accessibility, assets and handoff  
**Related:** BRANDBOOK_DRAFT.md · LASTRO_IDENTIDADE_v0.2.html · DESIGN_BRIEF_JP_FERNANDES.md · FRONTEND_PRODUCT_SPEC.md

> This document translates the brand direction into executable visual rules. It does not redefine product architecture, competency logic, verification logic or state transitions.

## 01. North Star

The identity communicates:

**WORK × LEARNING × COMPETENCY × EVIDENCE × VERIFICATION**

The core product mechanism should be visually legible as:

**EVIDENCE → INTERPRETATION → INDEPENDENT VERIFICATION → CONSENSUS → COMPETENCY STATE → ATTESTATION → PUBLIC VERIFICATION**

The visual language should feel like infrastructure for evidence and verification — not a course platform, generic crypto product or AI showcase.

## 02. Identity hierarchy

### Level 1 — Symbol

Independent mark for avatar, favicon, GitHub, WhatsApp and product surfaces.

### Level 2 — Visual system

Symbol + typography + color + spacing + composition + components + semantic states + application rules.

### Level 3 — Verbal identity

**LASTRO**

Primary tagline:

> **Competências que deixam lastro.**

Product statement:

> **Evidence-backed competency.**

Supporting line:

> **From evidence to verifiable competency.**

### Level 4 — Product

Identity supports functional clarity; it must not compete with the interface.

### Level 5 — Infrastructure

Attestation, verification and Solana appear as infrastructure when relevant, not as the center of the brand.

## 03. Symbol system

### Current conceptual language

- **Ring** — integrity / verification;
- **Layered V forms** — evidence and state;
- **Blue diamond** — proof / attestation.

### Independence rule

The symbol must not depend on:

- AI;
- blockchain;
- Solana;
- certificates;
- diplomas;
- coins;
- brains;
- literal chains.

### Current references

- `learning-competency-symbol-v0.svg`
- `learning-competency-symbol-reference-flat.png`
- `learning-competency-symbol-reference-3d.png`

### Production variants

Required:

1. primary;
2. monochrome;
3. inverted;
4. reduced/small-size, if necessary.

Do not create arbitrary variants.

## 04. Design tokens

The following values are the current working tokens.

### Color

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#000000` | primary background |
| `--color-fg` | `#FFFFFF` | primary text |
| `--color-muted` | `#D9D9D9` | secondary text / structural contrast |
| `--color-surface` | `#2A2A2E` | restrained elevated surface |
| `--color-proof` | `#1683FF` | proof / attestation / verification |

### Semantic color rule

Proof Blue is semantic, not decorative.

Do not introduce additional accent colors until the semantic system requires them and the design owner validates them.

For outcome/status communication, **shape, label and text must carry meaning in addition to color**.

### Spacing

Use a 4 px base spacing unit.

Working scale:

| Token | Value |
|---|---:|
| `space-1` | 4 px |
| `space-2` | 8 px |
| `space-3` | 12 px |
| `space-4` | 16 px |
| `space-5` | 20 px |
| `space-6` | 24 px |
| `space-8` | 32 px |
| `space-10` | 40 px |
| `space-12` | 48 px |
| `space-16` | 64 px |
| `space-20` | 80 px |

The scale is a working implementation token set, not a new product rule.

### Radius

Use restrained geometry:

| Token | Value |
|---|---:|
| `radius-sm` | 6 px |
| `radius-md` | 10 px |
| `radius-lg` | 14 px |
| `radius-pill` | 999 px |

Prefer square/low-radius containers when the content is structural or technical. Use larger radii only where they improve grouping or touch interaction.

### Borders

| Token | Value |
|---|---|
| `border-subtle` | 1 px solid rgba(255,255,255,.12) |
| `border-strong` | 1 px solid rgba(255,255,255,.24) |
| `border-proof` | 1 px solid #1683FF |

Avoid heavy borders and decorative outlines.

### Layout

Working content widths:

- compact: 640 px;
- standard: 960 px;
- wide: 1200 px;
- presentation/wide canvas: fluid with controlled margins.

Minimum horizontal page padding:

- mobile: 20 px;
- desktop: 32 px.

## 05. Typography system

### Families

**Inter Tight**
- primary interface text;
- headings;
- navigation;
- explanatory copy.

**JetBrains Mono**
- technical metadata;
- IDs;
- evidence references;
- states;
- hashes;
- timestamps;
- system labels.

### Type scale

| Role | Family | Size | Weight | Line height |
|---|---|---:|---:|---:|
| Display | Inter Tight | 64 px | 600 | 1.0 |
| H1 | Inter Tight | 40 px | 600 | 1.1 |
| H2 | Inter Tight | 30 px | 600 | 1.15 |
| H3 | Inter Tight | 22 px | 600 | 1.2 |
| Body | Inter Tight | 16 px | 400 | 1.5 |
| Body strong | Inter Tight | 16 px | 600 | 1.5 |
| Small | Inter Tight | 14 px | 400 | 1.45 |
| Label | JetBrains Mono | 11 px | 500 | 1.3 |
| Metadata | JetBrains Mono | 12 px | 400 | 1.4 |

Responsive reduction may be applied to Display/H1/H2; hierarchy must remain intact.

Avoid excessive all-caps. Use uppercase primarily for compact system labels.

## 06. Composition

Prioritize:

- negative space;
- alignment;
- clear hierarchy;
- restrained density;
- geometric structure;
- layers;
- thin structural lines;
- editorial rhythm;
- high contrast.

Avoid:

- excessive cards;
- dense dashboards;
- decorative containers;
- visual noise;
- excessive borders;
- crypto-generic compositions.

The interface should feel **structured, not crowded**.

## 07. Semantic visual grammar

Canonical flow:

**EVIDENCE → AI INTERPRETATION → INDEPENDENT VERIFICATION → CONSENSUS → COMPETENCY STATE → ATTESTATION → PUBLIC VERIFICATION**

### Evidence

Visual priority: source and provenance.

Show, where available:

- activity;
- evidence type;
- source;
- timestamp;
- provenance;
- evidence reference.

### AI Interpretation

Must look derived from evidence, not equivalent to source evidence.

Use a secondary treatment and explicit AI/interpretation label.

### Independent Verification

Should visibly communicate that verification is a separate mechanism from AI interpretation.

Prefer mechanism name + result + provenance/context.

### Consensus

Should communicate convergence, insufficiency or disagreement.

Do not reduce consensus to a single opaque score.

### Competency State

Use the bounded state vocabulary:

**NOT_STARTED · IN_DEVELOPMENT · UNDER_REVIEW · DEMONSTRATED**

### Attestation

Represent as the integrity/reference layer of the resulting state.

It is not a certificate substitute or a visual trophy.

### Public Verification

Make the verification action/result explicit and traceable.

### Human Adjudication

Exception path only.

Visually distinguish it from the normal flow without making it appear mandatory.

## 08. Consensus outcome system

Canonical outcomes:

**AGREEMENT · INSUFFICIENT_EVIDENCE · CONFLICT · HUMAN_ADJUDICATION**

Working visual treatment:

| Outcome | Primary signal | Required text |
|---|---|---|
| AGREEMENT | proof-blue confirmation treatment | AGREEMENT |
| INSUFFICIENT_EVIDENCE | neutral / muted treatment | INSUFFICIENT EVIDENCE |
| CONFLICT | high-contrast warning treatment | CONFLICT |
| HUMAN_ADJUDICATION | distinct exception treatment | HUMAN ADJUDICATION |

The exact secondary accent for conflict/exception remains a design validation point. Until then, use contrast, iconography and labels rather than adding a broad new palette.

## 09. Evidence provenance

Evidence must visually preserve its origin and context.

Recommended metadata:

- source;
- activity;
- timestamp;
- evidence type;
- provenance;
- verification mechanism;
- decision context.

AI interpretation must be visually distinguishable from original evidence.

Synthetic/demo evidence must be explicitly labeled as synthetic.

## 10. Core component inventory

The MVP visual system should establish reusable patterns for:

### 01 — Evidence Card

Contains source evidence and provenance.

### 02 — Interpretation Block

Shows AI-assisted interpretation separately from source evidence.

### 03 — Verification Result

Shows mechanism, result, provenance and relevant context.

### 04 — Consensus Result

Shows the consensus outcome and contributing verification results.

### 05 — Competency State

Shows one of the four bounded competency states.

### 06 — State Transition

Shows movement between states with evidence/context, not arbitrary progress animation.

### 07 — Attestation / Proof Block

Shows attestation reference and verification action.

### 08 — Provenance Row

Compact source/context metadata.

### 09 — Status Label

Reusable semantic label with text + optional icon/shape.

### 10 — Exception / Adjudication Block

Only used when Human Adjudication is actually required.

### Component rule

Components may represent architecture. They must not create new domain rules.

## 11. Component anatomy rules

Every major evidence/verification component should answer:

1. **What is this?**
2. **Where did it come from?**
3. **What was checked?**
4. **What was the result?**
5. **What state does it support?**
6. **Can the result be verified?**

Do not hide critical provenance behind decorative UI.

## 12. Responsive system

### Mobile — < 768 px

- single-column primary flow;
- minimum 20 px page padding;
- evidence and verification blocks stack;
- metadata may wrap;
- horizontal timelines become vertical;
- tables become stacked/key-value layouts;
- primary proof action remains visible.

### Tablet — 768–1199 px

- two-column layouts only where content benefits;
- preserve readable line lengths;
- avoid squeezing verification/provenance data.

### Desktop — ≥ 1200 px

- standard 960–1200 px content area;
- use multi-column composition where it improves comparison;
- preserve generous negative space;
- avoid dashboard density.

### Wide / presentation

- allow fluid canvas;
- preserve a clear reading axis;
- use diagrams sparingly;
- never scale UI cards simply to fill empty space.

## 13. Accessibility

Minimum requirements:

- do not communicate meaning through color alone;
- every status has readable text;
- interactive elements have visible focus;
- body text remains readable at zoom;
- proof blue must be tested for contrast in each context;
- icons require labels/tooltips where meaning is not obvious;
- semantic order must survive responsive rearrangement;
- motion must not be required to understand state.

Accessibility is part of acceptance, not a post-production enhancement.

## 14. Logo and asset governance

### Required asset families

- symbol SVG;
- monochrome symbol;
- inverted symbol;
- reduced symbol if required;
- wordmark;
- lockups;
- favicon/app icon;
- presentation export;
- social/export sizes.

### Repository organization

Working structure:

`docs/brand/`
- identity reference;
- brandbook;
- visual system;
- design brief;
- naming history.

Production assets should live in a dedicated asset directory when the final files are committed.

Suggested:

`assets/brand/`
- `symbol/`
- `wordmark/`
- `icons/`
- `fonts/` (only where licensing permits)
- `templates/`
- `exports/`

Do not commit licensed font binaries unless redistribution is permitted.

## 15. Image and illustration rules

Prefer:

- real work/learning contexts;
- evidence;
- collaboration;
- analysis;
- systems;
- editorial abstractions.

Avoid:

- generic corporate training stock;
- AI brains;
- humanoid robots;
- crypto imagery;
- decorative 3D technology clichés.

The symbol should not be overlaid on every image.

## 16. Strategic narrative layer

The research/product narrative may use:

**WORK CHANGE → ROLE DELTA → COMPETENCY GAP → REQUALIFICATION**

This layer is presentation/research context, not proof that every capability is implemented or commercially validated.

When space is constrained, prioritize:

**Evidence → Verification → Consensus → Competency State → Proof**

## 17. Do / Don't

### DO

- preserve high contrast;
- use black as the visual base;
- use blue semantically;
- distinguish evidence from interpretation;
- distinguish verification from competency state;
- distinguish consensus outcomes;
- represent Human Adjudication as an exception;
- preserve provenance;
- maintain consistency across product, presentation and documentation;
- test at small sizes and zoom.

### DON'T

- turn the symbol into a blockchain icon;
- use certificate imagery as the primary metaphor;
- make AI/robots the visual language;
- use neon by default;
- create a different identity for every channel;
- imply absolute truth;
- imply AI is competency authority;
- present Human Adjudication as routine;
- invent product capabilities through visual treatment.

## 18. Handoff for JP Fernandes

### Symbol

- geometric refinement;
- primary / monochrome / inverted / reduced versions;
- scale tests;
- clear-space rules;
- usage rules.

### System

- implement tokens;
- implement type hierarchy;
- implement semantic status system;
- build core components;
- establish responsive behavior;
- establish accessibility rules;
- establish asset/export structure.

### Product

Apply the system to the vertical slice:

- evidence;
- interpretation;
- verification;
- consensus;
- competency states;
- attestation;
- public verification.

### Handoff package

Deliver editable/source files where possible, final exports and sufficient rules for another designer to reproduce the system without depending on the original author.

## 19. Acceptance criteria

The visual system is complete for MVP handoff when:

1. symbol works without wordmark;
2. symbol works at small sizes;
3. monochrome version works;
4. core tokens are implemented;
5. typography hierarchy is explicit;
6. semantic blue is consistently applied;
7. consensus outcomes are distinguishable without color alone;
8. competency states are visually distinct;
9. evidence and interpretation are visually distinct;
10. verification is visibly independent;
11. Human Adjudication is clearly an exception;
12. provenance is visible;
13. mobile and desktop behavior is defined;
14. accessibility requirements are met;
15. core components are reusable;
16. product, presentation and documentation share the same language;
17. research/strategic capabilities are not presented as validated implementation;
18. another designer can reproduce the system from the documentation.

## 20. Governance

Design can propose and test.

Visual decisions must not silently alter:

- product thesis;
- MVP flow;
- architecture;
- competency model;
- AI role;
- independent verification;
- Consensus Core;
- Human Adjudication semantics;
- attestation/Solana role.

If a visual decision requires a product or architecture change, return it to product/architecture ownership.

## 21. Status

**v0.2 — mini design system / working implementation specification.**

Canonical visual reference:

`docs/brand/LASTRO_IDENTIDADE_v0.2.html`

Brand direction:

`docs/brand/BRANDBOOK_DRAFT.md`

Operational design handoff:

`docs/brand/DESIGN_BRIEF_JP_FERNANDES.md`

Product implementation contract:

`docs/product/FRONTEND_PRODUCT_SPEC.md`

This specification makes the visual system executable while preserving the distinction between **identity, product semantics and research hypotheses**.