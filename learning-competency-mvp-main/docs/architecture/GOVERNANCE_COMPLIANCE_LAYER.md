# Governance & Compliance Layer — Working Specification

## Objetivo

Reduzir o risco de que uma interpretação ou avaliação individual transforme evidência em estado de competência de forma arbitrária, inconsistente ou não auditável.

A camada não trata revisão humana como etapa obrigatória. Ela **governa as condições sob as quais verificações convergentes ou uma decisão humana podem produzir um estado**.

## Posição arquitetural

`INGEST → NORMALIZE → EXTRACT → INTERPRET → RELATE → VERIFICATION MECHANISMS → GOVERNANCE / COMPLIANCE → CONSENSUS CORE → UPDATE STATE → ATTEST → VERIFY`

A camada de Governance / Compliance contém, entre outros mecanismos, um **Consensus Core**, responsável por operacionalizar a convergência entre verificações independentes.

## Princípio central

O sistema não deve tratar consenso como mera contagem de votos.

O consenso deve ser construído sobre:

- critérios explícitos;
- evidências identificáveis;
- justificativas registradas;
- independência dos avaliadores;
- conflitos de interesse declarados;
- regras de elegibilidade;
- divergências e sua resolução;
- proveniência de cada decisão.

## Problema que a camada endereça

A revisão humana isolada pode introduzir:

- favoritismo;
- conflito de interesse;
- critérios inconsistentes;
- dependência excessiva de um avaliador;
- dificuldade de auditoria;
- decisões sem justificativa estruturada.

A camada não presume que um avaliador seja parcial. Ela registra condições relevantes para que a independência e a qualidade da decisão possam ser verificadas.

## Consensus Core

O Consensus Core opera depois que as regras de governança/compliance aplicáveis foram definidas para o caso. Ele não depende exclusivamente de múltiplos avaliadores humanos. Ele pode receber resultados de diferentes mecanismos de verificação, desde que cada resultado preserve sua origem, regra/modelo, versão, justificativa e timestamp.

Exemplo:

`mechanism → input/reference → result → rationale → version → timestamp`

O Consensus Core compara os resultados e determina o resultado de governança conforme regras previamente definidas.

### Consensus outcomes

Os resultados canônicos do Consensus Core são:

- `AGREEMENT` — avaliações compatíveis segundo os critérios aplicáveis;
- `CONFLICT` — divergência relevante entre verificações;
- `INSUFFICIENT_EVIDENCE` — não há evidência suficiente para sustentar o estado;
- `HUMAN_ADJUDICATION` — resolução contextual necessária.

Esses são resultados do Consensus Core, não estados operacionais do processo de revisão.

### Process states

Estados operacionais podem existir em sistemas de governança mais amplos, mas são distintos dos resultados do Consensus Core. Exemplos conceituais:

- `PENDING_REVIEW`;
- `ADJUDICATED`.

Esses estados **não fazem parte do vocabulário canônico do MVP** e não devem ser usados para introduzir uma etapa de revisão humana no pipeline.

## Competency State

Somente depois da camada de Governance / Compliance o sistema pode atualizar o estado da competência.

Exemplo:

`Evidence → Verification → Governance → Consensus → DEMONSTRATED`

ou:

`Evidence → Verification → Governance → Consensus → INSUFFICIENT_EVIDENCE`

A existência de consenso não significa, por si só, que a competência seja verdadeira. Significa que o processo definido para avaliação foi satisfeito segundo as regras registradas.

## Independência e conflito

A governança deve permitir registrar metadados como:

- relação hierárquica;
- conflito de interesse declarado;
- papel do avaliador;
- competência/requisito do avaliador;
- independência em relação a outros avaliadores;
- versão dos critérios utilizados.

Esses metadados devem influenciar as regras de elegibilidade quando a política do processo exigir, mas não devem ser usados para inferir automaticamente intenção, caráter ou parcialidade.

## Human Adjudication

A intervenção humana não é uma etapa normal do pipeline. O Consensus Core foi introduzido para reduzir a dependência de revisão individual e resolver casos cobertos pelas verificações independentes sem exigir um revisor humano a cada avaliação.

**Human Adjudication** é a camada de exceção para conflitos materiais, ambiguidades, contestações ou casos não cobertos pelas regras.

A IA pode:

- organizar evidências;
- apontar critérios;
- detectar inconsistências;
- propor interpretação;
- identificar necessidade de evidência ou adjudicação adicional.

A IA não deve, sozinha, converter evidência em `DEMONSTRATED`.

O Consensus Core não substitui julgamento humano nos casos em que ele é necessário. Ele reduz a quantidade de casos que dependem de uma decisão subjetiva individual ao operacionalizar regras de governança e convergência.

## Adjudicação

Quando houver divergência material, o sistema deve preservar:

- avaliações originais;
- critérios utilizados;
- evidências consideradas;
- justificativas;
- decisão de resolução;
- responsável pela resolução;
- timestamp;
- versão das regras.

Nenhuma avaliação original deve ser apagada para produzir consenso.

## Relação com Attestation

A atestação continua representando o estado/evento definido, não o conteúdo integral da evidência.

Quando o MVP emitir uma atestação para um `ReviewedStateRecord`, esse registro deverá carregar também o contexto de governança necessário para reconstruir as condições que permitiram a mudança de estado.

A attestation não prova que o processo de governança foi justo em sentido universal. Ela ancora a representação definida pelo sistema.

## Limites e status

Esta é uma especificação arquitetural de pesquisa para o MVP.

Ainda precisam ser definidos empiricamente:

- número mínimo de avaliadores;
- regras de quorum;
- pesos, se houver;
- critérios de independência;
- política de conflito de interesse;
- protocolo de adjudicação;
- métricas de concordância interavaliador;
- mecanismos de teste contra viés;
- requisitos específicos por competência.

Essas regras não devem ser inventadas como constantes universais; devem ser definidas por domínio, evidência e validação.

## Relação com o MVP

A camada pode ser introduzida inicialmente de forma mínima, sem exigir uma rede complexa de avaliadores:

1. registrar os mecanismos de verificação e suas versões;
2. registrar critérios e justificativas estruturadas;
3. encaminhar conflitos e exceções para adjudicação humana;
4. preservar o contexto de governança no `ReviewedStateRecord`.

A implementação mais sofisticada do Consensus Core permanece uma evolução incremental.

## Questão de pesquisa

> Como transformar avaliação humana inevitavelmente contextual em uma decisão de competência mais consistente, auditável e resistente a conflitos, sem substituir o julgamento humano por uma autoridade algorítmica?

