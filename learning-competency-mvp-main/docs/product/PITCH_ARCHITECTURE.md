# Pitch Architecture — LASTRO Capability Verification

**Status:** product / presentation contract

## 1. One-line thesis

> **LASTRO provides an evidence and verification layer for demonstrated capability.**

### One-line mechanism

> **LASTRO turns evidence of work into a competency state that can be independently verified — giving organizations a stronger evidence layer for capability decisions.**

### Problem statement

> **Organizations can see certificates, profiles and job titles, but cannot reliably trace a claimed competency back to observable work and an independently verified decision.**

This is a product hypothesis and must not be presented as customer-validated without external evidence.

## 2. External Evidence of the Pain

The pitch should establish that the underlying workforce problem exists independently of LASTRO.

### Market signals

- **63% of employers** surveyed by the World Economic Forum identify skills gaps as a primary barrier to business transformation for 2025–2030; employers expect **39% of workers' core skills to change by 2030**. citeturn0search7turn0search14
- PwC's 2026 Global AI Jobs Barometer finds that skills in the most AI-exposed jobs are changing **more than twice as fast** as in the least exposed jobs, based on more than one billion job postings. citeturn0search10turn0search38
- Deloitte's 2026 enterprise AI research identifies **insufficient worker skills as the biggest barrier** to integrating AI into existing workflows; 53% of surveyed organizations report workforce AI education and 48% report upskilling/reskilling strategies as responses. citeturn0search0turn0search1

### Narrative interpretation

These sources support the external problem chain:

```text
WORK CHANGES
   ↓
SKILLS CHANGE
   ↓
ORGANIZATIONS MUST DEVELOP CAPABILITY
   ↓
THE EVIDENCE OF THAT CAPABILITY MATTERS
```

They validate the **pain context**, not LASTRO's commercial success.

> **The market signal tells us the capability problem is real. LASTRO's thesis is that the evidence layer around demonstrated capability is still weak.**

The next sections must therefore distinguish external evidence from our own technical proof and future commercial hypotheses.

## 3. Product Wedge

O MVP começa deliberadamente menor:

~~~text
Evidence → Competency → Verification → State → Attestation → Verification
~~~

The MVP starts deliberately narrow: prove that observable work can become a bounded, independently verifiable capability state.

## 4. The Concrete MVP

The strategic product narrative is intentionally broader than the current implementation. The MVP proves one complete vertical slice:

```text
ONE PERSON → ONE COMPETENCY → FOUR ACTIVITIES → FOUR EVIDENCE TYPES
→ AI INTERPRETATION → INDEPENDENT VERIFICATION → CONSENSUS
→ COMPETENCY STATE → SOLANA ATTESTATION → PUBLIC VERIFICATION
```

The canonical synthetic scenario is **Ana**, developing one applied-AI/data-analysis competency through four activities: formulation, data preparation/exploration, reproducible analysis, and communication.

The four evidence classes are briefing, analysis artifact, analysis result, and communication. AI interprets evidence, independent mechanisms verify it, and the Consensus Core produces a bounded state. Conflict is routed to exceptional human adjudication.

The MVP therefore proves the **verification mechanism**, not the entire enterprise capability platform.

### MVP vs. product hypothesis

| Current MVP | Broader product hypothesis |
|---|---|
| One bounded competency | Multiple competencies and evolving capability models |
| One short evidence trail | Broader organizational evidence workflows |
| Synthetic demonstration | External pilots and real-world validation |
| Technical verification proof | Better capability decisions |
| Solana Devnet attestation | Production-grade public verification |
| No validated commercial model | Pricing, adoption, ROI and market fit |

This boundary should remain visible in every pitch, demo and evaluator-facing artifact.

## 5. Strategic Expansion

~~~text
Work Change → Role Delta → Competency Gap → Requalification → Proof of Competency
~~~

### Verified Capability → Better Decisions

Once capabilities can be represented as bounded, independently verifiable states, they can become inputs to evolving roles, competency-gap analysis, requalification and internal mobility.

This is a strategic extension of the MVP, not a currently implemented commercial capability.

Dynamic Role Architecture continues to be a research hypothesis rather than a validated commercial wedge.

## 6. Frontend narrative

The narrative below is the product-level information architecture. The implementation contract for the frontend is defined in `docs/product/FRONTEND_PRODUCT_SPEC.md`.

### Tela 1 — Mudanças no Trabalho

Mostrar competências rastreadas, competências em transformação, gaps e sinais de mudança de tarefa.

**Pergunta:** Como o trabalho está mudando?

### Tela 2 — Role Delta

Comparar antes/agora em tarefas, responsabilidades, competências e ferramentas. Mudanças devem mostrar evidência e nível de confiança.

### Tela 3 — Competency Gap

Mostrar o estado de cada competência necessária e destacar gaps.

### Tela 4 — Requalification

Conectar cada gap a atividades e evidências esperadas.

### Tela 5 — Evidence

Mostrar evidência, origem, hash, atividade, critério relacionado e proveniência.

### Tela 6 — Verification

Mostrar mecanismos separadamente:

~~~text
Evidence Integrity       PASS
Deterministic Rules      PASS
AI Interpretation        PASS
Consensus                AGREEMENT
~~~

Nunca reduzir a decisão a um score opaco.

### Tela 7 — Proof of Competency

Mostrar competência, estado, referências de evidência, decisão, record hash, attestation e verificação pública.

## 7. Product narrative flow

~~~text
ORGANIZATION
↓
WORK CHANGE
↓
ROLE DELTA
↓
COMPETENCY GAP
↓
REQUALIFICATION
↓
EVIDENCE
↓
VERIFICATION
↓
CONSENSUS
↓
DEMONSTRATED
↓
ATTESTATION
↓
PUBLIC VERIFICATION
~~~

## 8. Technical demo wedge

The hackathon's technical proof begins at the MVP wedge and follows:

~~~text
Competency → Activities → Evidence → AI interpretation → Independent verification → Consensus → DEMONSTRATED → Attestation → Public verification
~~~

This distinction prevents the strategic product narrative from being confused with the narrower implemented vertical slice.

## 9. Aha Moment

The aha moment is not “we use blockchain”.

> **A demonstrated capability stops being only a claim inside an application and becomes a bounded state that can be independently verified.**

Blockchain aparece como infraestrutura dessa etapa.

### Blockchain role

The blockchain does not determine whether a person is competent.

The role of Solana in the MVP is:

~~~text
Verified competency state
        ↓
Integrity / attestation reference
        ↓
Public verification
~~~

The competency state is produced by the evidence, verification, governance and Consensus Core process. Solana anchors the resulting attestation/integrity reference.

## 10. Claims discipline

### Podemos afirmar

- o vertical slice funciona;
- evidências são estruturadas;
- IA interpreta;
- regras determinísticas verificam condições objetivas;
- Consensus Core pode produzir AGREEMENT no cenário coberto;
- estados podem gerar attestation;
- integridade pode ser verificada;
- o MVP possui uma arquitetura explícita para transformar evidência em estado de competência verificável.

### Ainda são hipóteses

- buyer definitivo;
- pricing;
- willingness to pay;
- recorrência comercial;
- Dynamic Role Architecture como wedge;
- impacto econômico quantitativo;
- superioridade frente a workflows existentes;
- demanda específica pelo produto;
- retorno econômico específico do produto.

## 11. Pitch Compression

The buyer, judge or investor should understand the business problem before seeing the architecture.

Recommended sequence:

~~~text
PROBLEM
  ↓
INSIGHT
  ↓
ONE-LINE MECHANISM
  ↓
LIVE EVIDENCE
  ↓
VERIFICATION
  ↓
COMPETENCY STATE
  ↓
PUBLIC PROOF
  ↓
VALUE / MARKET HYPOTHESIS
  ↓
WHY THIS TEAM
~~~

Do not open the pitch with infrastructure terminology. Architecture is evidence for the claim, not the claim itself.

## 12. Pergunta final

> **Se o trabalho muda continuamente, por que a representação de competência deveria continuar sendo estática?**
