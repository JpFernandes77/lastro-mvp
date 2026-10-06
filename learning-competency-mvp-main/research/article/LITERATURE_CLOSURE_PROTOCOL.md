# Literature Closure Protocol — Evidence to Competency Verification

> **Public research boundary:** This document is a scoped research artifact published to make LASTRO's reasoning auditable and challengeable. It is not a systematic review, legal novelty analysis, commercial validation, or proof of academic novelty.

**Public status:** PUBLIC RESEARCH ARTIFACT — METHODOLOGICAL PROTOCOL

**Status:** PROTOCOL FROZEN — screening ready
**Date:** 2026-10-04
**Review type:** Scoping / structured literature review
**Scope:** Observable work evidence → competency inference/state → verification → consensus → provenance → attestation

## 1. Purpose

This protocol defines how the related-work corpus should be expanded and screened before the research gap is stated as an article-level finding.

The protocol exists to prevent confirmation bias: the search must actively seek evidence that contradicts the current LASTRO gap hypothesis.

The current repository matrix remains a scoped review until this protocol is executed against external academic databases with reproducible search records.

## 2. Primary research question

> How can observable work or performance evidence support defensible inference of a bounded competency state, and what mechanisms exist for independently verifying, aggregating, tracing and attesting that inference?

## 3. Secondary questions

- RQ1 — Evidence: What models explain the relationship between observable work/performance and competency claims?
- RQ2 — Aggregation: How are heterogeneous observations combined into competency judgments or longitudinal states?
- RQ3 — Computational inference: How are computational systems or AI used to interpret performance evidence?
- RQ4 — Independent verification: What mechanisms independently evaluate evidence, interpretations or assessment outputs?
- RQ5 — Consensus: How are disagreement, uncertainty and multiple assessment signals resolved?
- RQ6 — Provenance: How is evidence lineage represented and used in assessment or competency decisions?
- RQ7 — Attestation: How are competency claims or assessment outcomes represented as independently verifiable records?
- RQ8 — Composition: Are there existing systems or architectures that explicitly combine these layers in one end-to-end pipeline?

## 4. Search concept blocks

### A — Work / performance evidence
- work evidence; workplace evidence; workplace performance; authentic performance; performance evidence; work sample; work artifact; workplace-based assessment; real-world performance; professional practice

### B — Competency inference
- competency; competence; capability; competency assessment; competency inference; competence judgment; competency state; competency development; performance assessment

### C — Aggregation / longitudinal reasoning
- triangulation; aggregation; programmatic assessment; longitudinal; multiple observations; multiple raters; multiple sources; portfolio assessment; evidence synthesis; developmental assessment

### D — Computational / verification
- automated assessment; AI assessment; artificial intelligence AND assessment; machine learning AND competency; automated scoring; verification; independent verification; validation; test evaluation verification validation; consensus; adjudication

### E — Trust / infrastructure
- provenance; evidence provenance; data provenance; attestation; verifiable credential; machine-verifiable; cryptographic credential; tamper evident; auditability

## 5. Primary search strings

### Evidence → competency
1. "work evidence" AND competency
2. "workplace performance" AND competency assessment
3. "performance evidence" AND competency
4. "workplace-based assessment" AND competence
5. "authentic performance" AND competency
6. "work samples" AND competency assessment

### Aggregation / state
7. "multiple observations" AND competency
8. "multiple raters" AND competency assessment
9. "programmatic assessment" AND competency
10. "longitudinal assessment" AND competency
11. "portfolio assessment" AND competency
12. "evidence synthesis" AND competency assessment

### Computational inference
13. "automated assessment" AND competency
14. "artificial intelligence" AND competency assessment
15. "machine learning" AND performance assessment
16. "AI" AND "workplace-based assessment"
17. "automated" AND "workplace-based assessment"

### Verification / consensus
18. "independent verification" AND competency assessment
19. "multiple verification" AND competency
20. "inter-rater agreement" AND competency assessment
21. verification AND "competency state"
22. consensus AND competency assessment
23. adjudication AND competency assessment

### Provenance / attestation
24. "evidence provenance" AND competency
25. "data provenance" AND assessment
26. "verifiable credentials" AND competency
27. "verifiable credentials" AND skills
28. attestation AND competency
29. cryptographic AND "competency credential"

### Composition / counterexample searches
30. "work evidence" AND competency AND verification
31. "workplace assessment" AND provenance AND verification
32. "competency assessment" AND provenance AND attestation
33. competency AND "independent verification" AND provenance
34. competency AND consensus AND attestation
35. evidence AND competency AND "verifiable credential"
36. "workplace performance" AND "verifiable credential"

## 6. Target databases / indexes

Priority: Scopus, Web of Science, ERIC, PubMed/MEDLINE, ACM Digital Library, IEEE Xplore, Google Scholar.

Standards and infrastructure are searched separately: W3C, NIST, ISO/IEC where relevant, and major credential/provenance specifications.

Market/ecosystem sources remain a separate evidence class and must not be mixed into the academic screening count.

## 7. Inclusion criteria

Include a source when it: (1) concerns competency, competence, capability or a closely equivalent construct; (2) contains observable performance/work evidence, assessment evidence or an explicit inference mechanism; (3) provides conceptual, empirical or technical information relevant to at least one research question; (4) is sufficiently documented to extract methods and conclusions; and (5) has established publication date and provenance.

Technical standards and systems may be included for the composition question, but must be classified separately from academic publications.

## 8. Exclusion criteria

Exclude purely philosophical discussions without an assessment/inference mechanism; generic employee performance-management articles without competency inference; generic blockchain credential marketing; vendor material without technical documentation; papers where competency is only a keyword; duplicates; inaccessible sources where the relevant claim cannot be verified; and generic AI capability marketing.

## 9. Screening procedure

Stage 1 — title/abstract: INCLUDE, EXCLUDE, or UNCERTAIN.

Stage 2 — full text: INCLUDE — DIRECT; INCLUDE — ADJACENT; EXCLUDE — OUT OF SCOPE; EXCLUDE — INSUFFICIENT EVIDENCE.

Stage 3 — extract citation, domain, research design, context, evidence type, competency construct, inference model, observations, raters, aggregation, longitudinal component, computational/AI component, verification, disagreement handling, provenance, attestation, limitations, and relevance to RQ1–RQ8.

## 10. Counterexample rule

Flag GAP-THREAT when a source contains most of: real-world/work evidence; explicit competency inference; multiple independent verification mechanisms; explicit consensus; bounded competency state; provenance; cryptographic or machine-verifiable attestation; and an integrated end-to-end architecture.

If a GAP-THREAT source is found, the research gap must be rewritten before the article is drafted.

## 11. Evidence-strength classification

- HIGH — direct empirical or normative support from a primary source.
- MODERATE — multiple compatible sources or a strong secondary synthesis.
- LOW — single study, conceptual proposal or indirect analogy.
- HYPOTHESIS — proposed architecture or interpretation without sufficient external validation.

The LASTRO contribution must never be upgraded from HYPOTHESIS solely because multiple project documents repeat it.

## 12. Extraction matrix

| ID | Citation | Domain | Evidence | Competency claim | Evidence contract | Multi-source | Longitudinal | AI/computational | Verification | Consensus | Provenance | Attestation | State | Composition | Evidence strength | Gap impact |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Gap impact values: SUPPORTS GAP; WEAKENS GAP; NEUTRAL; GAP-THREAT.

## 13. Current search limitation

At protocol freeze, the available public web search interface did not return usable results for the targeted academic queries.

Therefore no fabricated search counts are reported; no PRISMA flow numbers are claimed; no database coverage is claimed as completed; the current related-work matrix remains a scoped review; and this protocol is ready for execution when reliable database retrieval is available.

## 14. Current evidence baseline

The existing corpus establishes strong prior art for evidence-centered assessment, workplace-based assessment, programmatic assessment, triangulation, longitudinal competency judgment, portfolio assessment, learning analytics, AI-assisted assessment, provenance, verifiable credentials, AI evaluation/TEVV, and distributed verification infrastructure.

The unresolved composition remains:

WORK → EVIDENCE → INTERPRETATION → INDEPENDENT VERIFICATION → CONSENSUS → BOUNDED COMPETENCY STATE → ATTESTATION

This remains a research hypothesis, not an established novelty claim.

## 15. Stop condition for the literature phase

The literature phase is closed only when: all primary search strings have been executed; duplicates removed; title/abstract screening complete; full-text screening complete; all GAP-THREAT candidates resolved; extraction is sufficient to answer RQ1–RQ8; the research-gap statement survives counterexample review; and the final included corpus is frozen.

## 16. Article transition

After closure, the article can state, with appropriate qualification, that the review identified established evidence-centered and competency-assessment foundations, adjacent verification/provenance infrastructures, and a remaining research gap concerning their explicit composition into an auditable competency-verification pipeline.

---

## Public interpretation boundary

This document should be read as a bounded research artifact. Established external findings are separated from LASTRO's interpretation and research hypotheses. Where the review is incomplete, the document says so explicitly. Nothing here overrides the current MVP implementation or canonical architecture.