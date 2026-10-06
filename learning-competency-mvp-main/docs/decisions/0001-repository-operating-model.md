# ADR 0001 — Modelo operacional do repositório

## Contexto

O projeto evoluiu de uma hipótese inicial sobre microcredenciais para uma tese mais ampla de desenvolvimento e representação verificável de competências.

O repositório precisa preservar essa evolução sem misturar hipótese, decisão, implementação e evidência de validação.

## Decisão

O GitHub será tratado como a base de execução técnica do projeto:

- código;
- testes;
- especificações técnicas validadas;
- decisões de arquitetura;
- issues;
- pull requests;
- histórico de implementação;
- material necessário para reproduzir a demonstração.

O contexto de pesquisa, atas, referências e alinhamentos de produto permanece complementar ao repositório.

A regra operacional é:

> Pesquisa informa a implementação. Uma decisão validada autoriza a implementação.

O repositório deve preservar a distinção entre:

1. decisão atual do time;
2. contrato/specificação validada;
3. arquitetura;
4. implementação;
5. experimento;
6. hipótese futura.

## Consequências

- Evita que ideias futuras entrem automaticamente no MVP.
- Mantém a evolução da tese rastreável.
- Permite que novos colaboradores entendam o contexto antes de alterar o núcleo.
- Torna o histórico de execução parte da evidência do projeto.
- Mantém a Skill como inteligência operacional, e não como substituta das decisões do time.

## Escopo

Esta decisão define o modelo de trabalho do repositório. Não define o produto comercial final, o schema definitivo de attestation ou a metodologia universal de competências.
