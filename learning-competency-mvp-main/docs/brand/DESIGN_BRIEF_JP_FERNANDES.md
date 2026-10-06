# Brief de Identidade e Interface — JP Fernandes

**Status:** execução / exploração visual  
**Responsável:** JP Fernandes  
**Contexto:** LASTRO — Learning Competency / Colosseum

## Objetivo

Materializar no produto a identidade visual do LASTRO e tornar legível, para um avaliador, a arquitetura já implementada.

O trabalho de frontend/UX/UI deve **projetar a arquitetura existente**, não criar uma segunda arquitetura.

## Fontes de trabalho

- [Brandbook v0.2](./LASTRO_IDENTIDADE_v0.2.html)
- [Frontend Product Spec](../product/FRONTEND_PRODUCT_SPEC.md)
- [User Journeys](../product/USER_JOURNEYS.md)
- [Pitch Architecture](../product/PITCH_ARCHITECTURE.md)
- [README](../../README.md)
- [Consensus Core](../architecture/CONSENSUS_CORE.md)

## Referência de identidade

A identidade deve preservar:
- geometria em camadas;
- estrutura simétrica de sustentação;
- anel associado a integridade/verificação;
- preto, branco e cinza;
- azul #1683FF reservado para prova/atestado/verificação;
- ausência de texto dentro do símbolo;
- alto contraste;
- linguagem técnica sem estética crypto genérica.

O símbolo e a identidade não devem depender de IA, blockchain, Solana, certificado ou microcredencial.

## Posicionamento visual

A marca é **LASTRO**.

Tagline recomendada no Brandbook v0.2:

> **Competências que deixam lastro.**

A tese de produto é:

> **Evidence-backed competency.**

Mecanismo visual central:

```text
EVIDENCE
   ↓
VERIFICATION
   ↓
CONSENSUS
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
   ↓
PUBLIC VERIFICATION
```

A narrativa estratégica pode contextualizar:

```text
WORK CHANGE
   ↓
ROLE DELTA
   ↓
COMPETENCY GAP
   ↓
REQUALIFICATION
```

Mas essa camada é **narrativa estratégica / hipótese de pesquisa**. Não deve parecer uma capacidade backend já validada.

## Gramática visual do produto

A interface deve diferenciar visualmente:

```text
EVIDÊNCIA
    ↓
INTERPRETAÇÃO IA
    ↓
VERIFICAÇÃO
    ↓
CONSENSO
    ↓
ESTADO DE COMPETÊNCIA
    ↓
ATTESTATION
    ↓
VERIFICAÇÃO PÚBLICA
```

### Princípios
- evidência original ≠ interpretação da IA;
- interpretação da IA ≠ decisão de consenso;
- verificação ≠ consenso;
- estado de competência ≠ certificado;
- attestation ≠ evidência bruta;
- prova pública ≠ autoridade sobre competência.

### Human Adjudication

**Human Adjudication não é uma etapa normal do pipeline.**

Ela aparece somente como exceção quando houver:
- conflito entre verificações;
- evidência ambígua;
- contexto não formalizado;
- contestação;
- impacto que exija resolução adicional;
- caso não coberto pelas regras.

Quando ocorrer, deve ser visualmente explícita e preservar sua proveniência.

## Estados que não devem ser confundidos

### Competency State

Usar somente:

```text
NOT_STARTED
IN_DEVELOPMENT
UNDER_REVIEW
DEMONSTRATED
```

### Consensus Outcome

Usar somente:

```text
AGREEMENT
INSUFFICIENT_EVIDENCE
CONFLICT
HUMAN_ADJUDICATION
```

### Evidence / verification presentation

Não criar novos estados de domínio apenas para facilitar a interface.

## Azul como semântica

#1683FF não é decoração.

Usar azul para:
- prova registrada;
- attestation;
- verificação pública;
- elementos explicitamente verificados.

Evitar azul em:
- decoração;
- backgrounds genéricos;
- cards sem significado de prova;
- elementos que ainda representam hipótese ou interpretação.

Isso mantém o azul como sinal semântico de **proof**.

## Jornada principal da interface

A experiência deve permitir que o avaliador acompanhe:

```text
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
```

A parte realmente demonstrável do MVP começa no núcleo:

```text
Competency
→ Activities
→ Evidence
→ AI Interpretation
→ Independent Verification
→ Consensus
→ DEMONSTRATED
→ Attestation
→ Public Verification
```

## Prioridade de implementação

### P0 — Core wedge
1. Competency
2. Evidence
3. Verification
4. Consensus
5. Competency State

### P1 — Proof
6. Attestation
7. Record hash
8. Public verification

### P2 — Strategic narrative
9. Work Change
10. Role Delta
11. Competency Gap
12. Requalification

Se houver restrição de tempo, **P0 + P1 vencem P2**.

## Critério de produto

O avaliador deve conseguir responder:
1. O que aconteceu?
2. Que competência está sendo demonstrada?
3. Que evidência sustenta isso?
4. Como a evidência foi verificada?
5. Qual foi o resultado de consenso?
6. Qual estado foi produzido?
7. Como esse estado pode ser verificado externamente?

O frontend não deve começar pela blockchain.

A blockchain aparece como infraestrutura da camada de prova:

```text
Verified competency state
        ↓
Integrity / attestation reference
        ↓
Public verification
```

## O frontend NÃO deve criar

Não implementar lógica própria para:
- critérios de competência;
- elegibilidade de evidência;
- regras determinísticas;
- consenso;
- transições de estado;
- validação de attestation;
- governança;
- autoridade de reviewer;
- resultados de verificação;
- claims de mercado;
- traction.

Se o backend não fornecer um dado, a interface deve mostrar o estado ausente — não inventar um valor.

## Dados sintéticos

O demo pode usar dados sintéticos.

Quando houver risco de confusão, mostrar claramente:

> **Demo scenario — synthetic data**

Nunca apresentar dados sintéticos como:
- cliente;
- piloto;
- produção;
- traction;
- validação de mercado.

## Sistema visual mínimo

O handoff deve permitir reprodução sem depender do autor original.

Documentar:
- símbolo;
- variantes;
- proporções;
- área de proteção;
- tamanho mínimo;
- paleta;
- tipografia;
- hierarquia;
- componentes visuais;
- uso do azul;
- estados;
- aplicações;
- usos incorretos.

## Critérios de aceite

1. O símbolo funciona sem nome?
2. Funciona em tamanhos pequenos?
3. Funciona em preto e branco?
4. A identidade é consistente entre produto, apresentação, GitHub e documentação?
5. Comunica competência/evidência/verificação sem depender de blockchain?
6. Evidência e interpretação de IA são visualmente distintas?
7. Consensus e Human Adjudication são visualmente distintos?
8. Competency State não é apresentado como certificado?
9. O azul mantém significado de prova/verificação?
10. O sistema pode ser reproduzido por outro integrante?
11. Dados sintéticos estão identificados?
12. Nenhuma lógica de domínio foi duplicada no frontend?

## Regra final

> **O frontend deve tornar a arquitetura legível. Ele não deve se tornar uma segunda arquitetura.**