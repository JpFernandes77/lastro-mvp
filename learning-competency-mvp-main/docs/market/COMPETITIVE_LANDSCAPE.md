# Competitive Landscape

> **Status:** research framework. No competitive claim is treated as validated until supported by current research or user interviews.

## Purpose

Understand adjacent categories without prematurely defining the product as a generic LMS, LXP, credential wallet, assessment platform or HR system.

## Categories to investigate

| Category | Core job | Questions for our thesis |
| --- | --- | --- |
| LMS | Deliver/manage learning | Does it close the evidence → competency-state loop? |
| LXP | Discover/personalize learning | How does it represent demonstrated competency? |
| Skills platforms | Map skills to people/roles | How are evidence and review represented? |
| Assessment platforms | Measure performance | What persists after assessment? |
| Credential platforms | Issue/share credentials | What is actually being attested? |
| Talent/recruiting platforms | Match people to roles | What evidence can be trusted and verified? |
| Portfolio/evidence tools | Collect work | How is evidence interpreted and reviewed? |

## Comparison dimensions

Research each relevant alternative against:

1. competency definition;
2. learning trail;
3. evidence capture;
4. evidence provenance;
5. AI interpretation;
6. human review;
7. competency state;
8. attestation;
9. verification;
10. interoperability;
11. privacy/data control;
12. organizational workflow;
13. learner experience.

## Product distinction to test

The current differentiation hypothesis is not “we issue better certificates.”

It is:

> **Close the loop between an organizational competency need, a development trail, evidence produced by the person, assisted interpretation, human review, a competency state and a verifiable proof.**

This is a hypothesis, not a market fact.

## Research discipline

For each competitor/alternative record:

- source;
- date accessed;
- target user;
- core workflow;
- relevant capabilities;
- limitations observed;
- evidence for the observation.

Do not claim that an alternative “cannot” perform a function unless the evidence supports that claim.

## Evidence and Credential Trust Boundary

Blockchain-backed credentials and W3C Verifiable Credentials address an important problem: making claims tamper-evident, portable and machine-verifiable. They do not, by themselves, establish that the underlying competency claim is true or that the issuer's assessment process is substantively reliable.

The W3C Verifiable Credentials Data Model 2.0 explicitly describes a trust model in which the verifier expects the issuer to stand behind the claims made about the subject. It also states that how verifiers decide which issuers to trust is outside the specification's scope. [CL-01]

The same specification allows an issuer to include **evidence** that can help a verifier determine how much confidence to place in a credential. This is important because cryptographic verification of a credential's provenance and integrity is distinct from verification of the evidence and assessment process behind the claim. [CL-01]

Therefore the defensible LASTRO distinction is not:

> "Blockchain credentials are untrustworthy."

It is:

> **Cryptographic credential integrity and issuer authenticity solve a different problem from evidence quality and competency validation.**

LASTRO's current model uses the blockchain as an integrity anchor **after** the off-chain evidence, verification and consensus path has produced a competency state. The chain is not presented as an oracle of truth or merit.

This distinction is also consistent with the current MVP threat model: integrity of a record is explicitly separated from truth of the underlying claim.

### References

- [CL-01] W3C — *Verifiable Credentials Data Model v2.0*, Recommendation, 15 May 2025 — https://www.w3.org/TR/vc-data-model/
- W3C — *Verifiable Credentials 2.0* publication announcement, 15 May 2025 — https://www.w3.org/press-releases/2025/verifiable-credentials-2-0/

## Output

The final competitive analysis should identify:

- direct alternatives;
- adjacent alternatives;
- workflow gaps;
- integration opportunities;
- language/categories to avoid;
- implications for MVP positioning.

No ranking or winner is required.
