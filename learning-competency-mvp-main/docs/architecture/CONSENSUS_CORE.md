# Consensus Core — Working Specification

## Objetivo

Reduzir a dependência de julgamento individual na transformação de evidências em estados de competência, exigindo convergência entre mecanismos de verificação independentes antes de atualizar o estado.

O Consensus Core não pretende eliminar julgamento humano. Ele desloca a intervenção humana para os casos em que as verificações são insuficientes, conflitantes ou exigem decisão contextual.

**Regra de independência:** o Deterministic Rule Check não consome sinais, confiança ou classificação produzidos pela IA. Ele opera diretamente sobre o contrato da competência, atividades, tipos de evidência e evidências presentes.

## Princípio

O sistema deve preferir:

**evidência + verificações independentes + regras explícitas → convergência → estado**

em vez de:

**evidência → interpretação individual → estado**

Consenso não é simplesmente contagem de votos. É convergência verificável entre mecanismos que observam aspectos diferentes do mesmo caso.

## Posição arquitetural

```
EVIDENCE
   ↓
┌─────────────────────────────────────────────┐
│ Independent Verification Mechanisms (MVP)   │
│                                             │
│ • Evidence / Integrity Check                │
│ • Deterministic Rule Check                  │
│ • AI Interpretation                         │
└─────────────────────────────────────────────┘
   ↓
CONSENSUS CORE
   ├── AGREEMENT → STATE UPDATE
   ├── INSUFFICIENT EVIDENCE → REQUEST / HOLD
   └── CONFLICT → HUMAN ADJUDICATION
   ↓
ATTESTATION
   ↓
VERIFICATION
```

Governance defines the conditions under which the process may operate, but governance is **not a fourth verification mechanism** and does not enter the Consensus Core as an additional vote.

A future Ethical Compliance Gate may validate the rule schema **before** it is applied to evidence. That capability is research and is not implemented in the current MVP.

## Mecanismos de Verificação Independentes (MVP)

O Consensus Core do MVP opera com **três** mecanismos de verificação distintos, separando rigidamente a validação estrutural da interpretação semântica:

### 1. Evidence Integrity Check (Estrutural)

Verifica a existência, origem identificável, integridade criptográfica (`sha256` recalculado e comparado com `contentHash`) e associação da evidência ao sujeito e atividade corretos. **Falha fechada (fail-closed)** em caso de qualquer adulteração pós-ingestão.

### 2. Deterministic Criteria Check (Estrutural)

Aplica regras objetivas e pré-definidas diretamente sobre os metadados e a estrutura da evidência canônica (ex: "a atividade C2 possui um artefato do tipo `analysis_artifact` vinculado?").

**Nota crítica:** Este verificador **não consome** sinais, confiança, resumos ou classificações geradas pela IA. Ele valida a *cobertura estrutural* exigida pelo contrato da competência.

### 3. AI Interpretation (Semântico)

Modelos de linguagem interpretam o conteúdo semântico da evidência (ex: "o briefing realmente formula uma pergunta analítica clara?"). A saída é tratada como um sinal interpretativo, não como autoridade final.

---

> **Nota sobre Statistical / Robustness Check:** A arquitetura prevê a adição futura de verificações estatísticas (tamanho de amostra, estabilidade, baseline) para cenários de múltiplas observações. No entanto, esta camada está explicitamente classificada como **Future Research / M4+** e não faz parte do escopo de verificação do MVP atual, que foca na trilha curta de evidência única.

## Consensus Core

O Consensus Core recebe os resultados dos três mecanismos e aplica regras explícitas.

Cada resultado deve preservar:

`mechanism → input/reference → result → rationale → version → timestamp`

### Consensus outcomes

O Consensus Core deve distinguir os seguintes resultados canônicos:

- **AGREEMENT** — verificações compatíveis e requisitos satisfeitos;
- **INSUFFICIENT_EVIDENCE** — evidência ou robustez insuficiente;
- **CONFLICT** — verificações relevantes divergem;
- **HUMAN_ADJUDICATION** — decisão contextual necessária.

Esses são **resultados de consenso**, não estados operacionais de revisão.

O estado da competência não deve ser atualizado enquanto o caso estiver em `CONFLICT` ou `INSUFFICIENT_EVIDENCE`.

## Dimensões de convergência

O sistema não deve reduzir toda a decisão a um único score opaco.

Devem ser preservadas dimensões separadas, quando aplicáveis:

- integridade da evidência;
- aderência aos critérios;
- robustez dos dados;
- convergência interpretativa;
- qualidade/proveniência da fonte;
- requisitos de governança.

Uma regra de decisão pode exigir condições mínimas em cada dimensão.

## Papel humano

A intervenção humana não é uma etapa normal do pipeline. O Consensus Core existe precisamente para reduzir a dependência de revisão individual. **Human Adjudication** é a camada de exceção acionada somente quando:

- há conflito entre verificações;
- a evidência é ambígua;
- o critério depende de contexto não formalizado;
- há contestação;
- o impacto da decisão exige resolução adicional;
- as regras existentes não cobrem o caso.

A decisão de adjudicação deve preservar:

- responsável;
- evidências consideradas;
- critérios;
- justificativa;
- resultado;
- timestamp;
- versão das regras;
- referências às verificações anteriores.

Nenhuma verificação anterior deve ser apagada para produzir uma decisão final.

## O que o Consensus Core não afirma

O Consensus Core não prova:

- verdade absoluta;
- ausência de viés;
- mérito universal;
- competência em qualquer contexto;
- correção automática de avaliações subjetivas;
- que as regras aplicadas sejam universalmente justas ou não discriminatórias.

Ele reduz dependência de julgamento individual ao exigir múltiplas condições verificáveis e tornar divergências explícitas.

## Relação com Governance

Governance defines the policy and organizational conditions under which the Consensus Core may operate.

```
GOVERNANCE / POLICY
        ↓
RULE SCHEMA
        ↓
CONSENSUS CORE
        ↓
STATE UPDATE
```

No current MVP component automatically validates whether a rule schema is fair, proportionate, or non-discriminatory.

The future **Ethical Compliance Gate** is proposed as a **pre-consensus governance layer**:

```
ORGANIZATION RULE SCHEMA
        ↓
ETHICAL COMPLIANCE GATE  [FUTURE RESEARCH]
        ↓
VALIDATED RULE SCHEMA
        ↓
EVIDENCE + MVP VERIFICATION
        ↓
CONSENSUS CORE
```

The future gate is **not** a verifier, **not** a fourth Consensus mechanism, and **not** an implementation claim of the current MVP.

Its research specification is documented separately in:

`research/ETHICAL_COMPLIANCE_LAYER.md`

Governance remains responsible for:

- criteria of eligibility;
- independence;
- conflicts of interest;
- escalation rules;
- need for human adjudication;
- policy versioning.

The current MVP operationalizes explicit competency rules; it does not claim universal ethical validation of those rules.

## Relação com Attestation

A atestação deve representar o estado produzido pelo processo e permitir reconstruir quais condições de governança e verificação sustentaram sua emissão.

O MVP não precisa colocar os resultados completos de todos os mecanismos on-chain. O registro local deve preservar o contexto necessário; a attestation pode carregar uma representação mínima e verificável desse contexto.

## Research Evidence — Automated Evaluation and Human Oversight

The current Consensus Core is grounded in a documented limitation of automated evaluation: an AI evaluator can produce systematically distorted judgments even when the output is structurally valid.

A 2024 ACL study, *Large Language Models are not Fair Evaluators*, found positional bias in LLM-based evaluation: changing the order of candidate responses could materially alter rankings. The authors report that a simple calibration approach reduced the observed evaluation bias and brought results closer to human judgments. [CC-01]

A 2024 IEEE BigComp paper investigated combining human-in-the-loop systems with AI fairness toolkits to reduce age bias in AI hiring algorithms, treating human review and fairness tooling as complementary mitigation approaches in a high-stakes domain. [CC-02]

A 2024 study of algorithmic recruitment also found that bias can emerge from the interaction between algorithmic recommendations and human decision-makers, rather than originating exclusively in the algorithm itself. [CC-03]

These findings do **not** prove that the LASTRO Consensus Core is optimal or universally bias-resistant. They support the narrower architectural rationale already implemented:

> **AI interpretation should remain an input to a broader verification process rather than become the sole authority over competency state.**

In particular, the current Deterministic Criteria Check is intentionally isolated from AI-generated signals, confidence scores and classifications.

### References

- [CC-01] Wang et al. — *Large Language Models are not Fair Evaluators*, ACL 2024 — https://aclanthology.org/2024.acl-long.511/
- [CC-02] Harris — *Combining Human-in-the-Loop Systems and AI Fairness Toolkits to Reduce Age Bias in AI Job Hiring Algorithms*, IEEE BigComp 2024 — https://doi.org/10.1109/BigComp60711.2024.00019
- [CC-03] Bursell & Roumbanis — *After the algorithms: A study of meta-algorithmic judgments and diversity in the hiring process at a large multisite company*, 2024 — https://journals.sagepub.com/doi/full/10.1177/20539517231221758

## MVP

A implementação atual compreende:

1. Evidence / Integrity Check;
2. Deterministic Rule Check;
3. AI Interpretation;
4. Governance / Policy as an external condition, not a fourth verifier;
5. Consensus Core;
6. Human Adjudication somente quando necessário.

O Statistical / Robustness Check é Future Research / M4+.

O Ethical Compliance Gate é **Future Research** e **não faz parte do MVP atual nem do roadmap comprometido**.

## Evolução

A arquitetura deve permitir adicionar novos mecanismos de verificação sem alterar o conceito central:

`NEW VERIFIER → CONSENSUS CORE`

Governance layers are different from verification mechanisms and must not be added to the Consensus Core merely because they constrain its operation.

## Questão de pesquisa

> Qual o menor conjunto de verificações independentes necessário para produzir um estado de competência suficientemente consistente, auditável e verificável, mantendo intervenção humana apenas onde a automação não é adequada?

Uma questão adicional de pesquisa para a governança futura é:

> Como validar que um rule schema é explicitamente justificável, contestável e proporcional ao contexto sem transformar o sistema em uma autoridade moral ou jurídica?

## Interface boundary

The frontend exposes Consensus Core results and provenance but does not reproduce its rules. UI state must remain a projection of the domain decision; no frontend code may independently advance competency state or manufacture verification results.
