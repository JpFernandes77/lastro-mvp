# MVP Use Case

> **Status:** canonical MVP use case v0.2 — operational specification aligned with the Consensus Core.
> **Note:** this closes the vertical-slice scope; it does not constitute external demand validation.

## 1. Organizational context

**Program:** internal applied-AI competency development program for analysts and career-transition professionals.
**Problem owner:** People Development / L&D.
**Learner:** employee participating in the program.
**Adjudicator:** authorized human who resolves an exceptional verification conflict.
**Verifier:** authorized person or system that checks the resulting attestation and integrity reference.

### MVP operational problem

The organization needs to observe development of one practical competency through activities and observable work. The MVP organizes those outputs, relates them to competency criteria, produces an AI-assisted interpretation, applies independent verification mechanisms, and reaches a bounded competency state through Consensus Core.

Human adjudication is available only when the verification mechanisms materially conflict or the case falls outside the rules.

## 2. Canonical competency

> **Use AI tools as support to transform a business question into a reproducible data analysis and communicate evidence-supported conclusions.**

### Observable criteria

**C1 — Formulation**
- transforms a business need/question into a clear analytical question;
- defines what it intends to answer.

**C2 — Treatment and analysis**
- identifies/prepares required data;
- executes analysis coherent with the question;
- records enough steps for reproduction.

**C3 — Evidence**
- presents results supported by data;
- distinguishes observation, interpretation and limitation;
- avoids conclusions not supported by the presented material.

**C4 — Communication**
- communicates result, context and limitations understandably for the defined audience.

### Rule

AI may propose signals for C1–C4, but it cannot determine competency by itself.

## 3. Short canonical trail

### A1 — Formulate the question
Output: short analytical briefing. Criteria: C1.

### A2 — Prepare and explore data
Output: notebook/script with data preparation and exploration. Criteria: C2.

### A3 — Execute reproducible analysis
Output: reproducible analysis plus results. Criteria: C2, C3.

### A4 — Communicate result
Output: short synthesis/presentation with conclusions, evidence and limitations. Criteria: C3, C4.

## 4. Minimum evidence contract

The MVP accepts four evidence classes:

| Type | Content | Minimum provenance | Relation |
| --- | --- | --- | --- |
| briefing | question and objective | activity A1 + author | C1 |
| analysis_artifact | notebook, script or queries | activity A2/A3 + origin reference | C2/C3 |
| analysis_result | results/tables/visualizations | activity A3 + artifact reference | C3 |
| communication | synthesis/presentation | activity A4 + author | C3/C4 |

Minimum metadata:
- evidence_id;
- type;
- source_ref;
- activity_id;
- submitted_by;
- submitted_at;
- content_ref;
- provenance.

The system distinguishes:
- source evidence;
- AI interpretation;
- independent verification results;
- Consensus Core decision;
- human adjudication, only when the exception path occurs.

## 5. Decision and verification model

The canonical path is:

    EVIDENCE
       ↓
    INTERPRETATION
       ↓
    INDEPENDENT VERIFICATION
       ↓
    CONSENSUS CORE
       ├─ AGREEMENT → DEMONSTRATED
       ├─ INSUFFICIENT_EVIDENCE → IN_DEVELOPMENT
       └─ CONFLICT → HUMAN ADJUDICATION → STATE

`UNDER_REVIEW` is the competency state used while a complete evidence set is awaiting verification/consensus. It does not mean that a human reviewer is required.

### Consensus outcomes

- **AGREEMENT** — verification mechanisms converge;
- **INSUFFICIENT_EVIDENCE** — required support is missing; the state returns to development so more evidence can be produced;
- **CONFLICT** — relevant verification mechanisms disagree;
- **HUMAN_ADJUDICATION** — the conflict has entered the explicit human exception path.

## 6. Competency states

### NOT_STARTED
No relevant evidence has been presented.

### IN_DEVELOPMENT
Evidence exists, but the required criteria are not yet sufficiently supported or additional evidence is needed.

### UNDER_REVIEW
The complete trail is ready for independent verification and Consensus Core evaluation.

### DEMONSTRATED
Consensus Core has reached agreement, or an exceptional human adjudication has resolved a conflict with sufficient evidence.

Human adjudication never replaces the evidence or verification history; it resolves an explicit conflict.

## 7. Canonical synthetic demonstration

**Participant:** Ana — synthetic professional developing applied-AI competency.
**Program:** Applied AI for Business Problems.
**Problem:** understand factors associated with increased service time in a fictional operation using AI as analysis support.

### Synthetic evidence

1. analytical briefing;
2. preparation/exploration notebook;
3. reproducible analysis and results;
4. synthesis with conclusion and limitations.

### Normal flow

    ORGANIZATION
     → COMPETENCY
     → TRAIL
     → PERSON
     → ACTIVITIES
     → EVIDENCE
     → INTERPRETATION
     → VERIFICATION
     → CONSENSUS
     → DEMONSTRATED
     → ATTESTATION
     → VERIFICATION

### Exceptional flow

    CONSENSUS
       ↓
    CONFLICT
       ↓
    HUMAN ADJUDICATION
       ↓
    DEMONSTRATED or IN_DEVELOPMENT

The scenario is synthetic and must not be presented as a real user, pilot, traction, or market-validation evidence.

## 8. What the MVP demonstrates

The MVP demonstrates technically that an organization can define a bounded competency, collect evidence from a short trail, interpret that evidence with AI assistance, apply independent verification mechanisms, reach a consensus outcome, preserve provenance, and produce a bounded competency state.

## 9. What the MVP does not demonstrate

It does not demonstrate:
- that all companies have this problem;
- willingness to pay;
- universal competency measurement;
- that `DEMONSTRATED` equals professional mastery;
- that attestation guarantees evidence quality;
- traction;
- superiority over existing alternatives.

## 10. M1 decisions

| Item | Decision |
| --- | --- |
| Context | corporate applied-AI competency development |
| Problem owner | L&D / People Development |
| Learner | employee participant |
| Adjudicator | authorized human, exception path only |
| Verifier | authorized person/system |
| Competency | applied AI-supported reproducible data analysis |
| Trail | A1–A4 |
| Evidence | briefing, analysis artifact, analysis result, communication |
| States | NOT_STARTED, IN_DEVELOPMENT, UNDER_REVIEW, DEMONSTRATED |
| Consensus | AGREEMENT, INSUFFICIENT_EVIDENCE, CONFLICT, HUMAN_ADJUDICATION |
| Synthetic scenario | participant + synthetic case/data |
| Attestation | DEMONSTRATED state + context/references |
| Sensitive on-chain | prohibited |
| External validation | remains M4 |

## 11. Status

**M1 operational contract aligned with the current Consensus Core.**

Changes to the competency, trail, evidence contract or states require an explicit MVP contract change.