# Project Status

## Status atual

**Hardening:** M1→M3 coerente, verifier com payload binding completo, contrato de IA contextualizado, canonicalização v1 documentada e CI com audit de alta severidade bloqueante. Integração real de Devnet disponível via workflow manual (`Solana Devnet Integration`).

**Fase:** MVP tecnicamente fechado — vertical slice concluído e feature freeze ativo.

O fluxo M1 → M2 → M3 está implementado, testável e demonstrável. A capacidade de atestação está implementada; a prova pública Devnet corrente permanece como artefato de fechamento do M4. A interface e a validação externa permanecem como frentes de trabalho.

**Instrumento de fechamento competitivo:** `docs/product/VICTORY_EXECUTION.md`.

## Base definida

- caso de uso concreto;
- trilha curta;
- evidência separada de interpretação;
- IA como assistência;
- adjudicação humana apenas como exceção de conflito ou ambiguidade;
- estado de competência limitado ao que o registro suporta;
- atestação como representação de um estado definido;
- dados sensíveis mantidos off-chain;
- verificação da integridade do registro;
- validação externa de demanda como frente necessária.

## Milestones

### M1 — Caso de uso concreto
**Status: DONE**

Organização → competência → trilha → pessoa → atividade → evidência.

### M2 — Evidência, IA e verificação
**Status: DONE**

Evidência → extração → interpretação → relação → verificação.

**Owner:** JP Carvalho.

### M3 — Estado, atestação e Solana
**Status: DONE**

Estado → atestação → Solana → verificação.

**Owner:** JX.

### Interface — UX/UI
**Status: OWNERSHIP DEFINED**

**Owner:** JP Fernandes.

A interface materializa o fluxo existente e não deve criar lógica paralela.

### M4 — Validação, demonstração e submissão
**Status: IN PROGRESS**

M4 agora segue quatro frentes:

1. **PROVE** — prova técnica pública atualizada;
2. **DEMONSTRATE** — frontend e fluxo end-to-end;
3. **VALIDATE** — buyer, wedge, pain e demand;
4. **COMMUNICATE** — pitch, differentiation e blockchain relevance.

## Limites atuais

O MVP não pretende resolver, nesta fase:

- LMS completo;
- framework universal de competências;
- marketplace ou recrutamento;
- múltiplas organizações;
- tokenomics;
- dados pessoais on-chain;
- arquitetura definitiva de atestação;
- pricing ou modelo comercial validado.

## Governança

Uma proposta pode vir de qualquer integrante, mas se torna requisito somente após a decisão apropriada ser registrada.

Mudanças materiais devem manter rastreabilidade no GitHub.

## Feature Freeze

A camada técnica central está congelada. Novos trabalhos devem priorizar interface, demonstração, validação e correções críticas.

Detalhes estratégicos de mercado, entrevistas e operação comercial são mantidos separadamente pelo time.

## Roadmap de fechamento — M4

### P0 — PROVE: prova técnica atualizada
- [ ] Gerar nova attestation `m3.attestation.v2` em Solana Devnet.
- [ ] Executar a verificação correspondente.
- [ ] Registrar a transação atual em `docs/evaluation/04_DEMO_AND_PROOF.md`.
- [ ] Atualizar o README com a prova pública atual.

### P0 — DEMONSTRATE: produto e demo
- [ ] Implementar o frontend conforme `docs/product/PITCH_ARCHITECTURE.md` e `docs/product/FRONTEND_PRODUCT_SPEC.md`.
- [ ] Demonstrar o fluxo ponta a ponta sem criar lógica paralela.
- [ ] Executar o cenário canônico.
- [ ] Capturar a evidência técnica necessária para os jurados.
- [ ] Finalizar o roteiro de demo.

### P1 — COMMUNICATE: pitch e diferenciação
- [x] Problema concreto.
- [x] One-line product mechanism.
- [x] Aha moment.
- [x] Diferencial técnico/ecossistema sem claim de mercado vazio.
- [x] Explicação objetiva da relevância da blockchain.
- [x] Founder + Market Fit.
- [x] Mercado e hipótese de validação.
- [x] Limitações e próximos passos.
- [x] Estratégia de pitch registrada em `docs/go-to-market/01_PITCH_STRATEGY.md`.

### P1 — VALIDATE: buyer, wedge e demand
- [ ] Identificar primeiro buyer e decisão recorrente.
- [ ] Validar o problema com organizações-alvo.
- [ ] Validar o wedge.
- [ ] Testar consequência econômica do problema.
- [ ] Testar hipótese de piloto.
- [ ] Registrar evidências externas sem convertê-las em claims maiores do que suportam.

### P2 — FINAL SUBMISSION
- [ ] Revisar GitHub e documentação pública.
- [ ] Revisar demo e pitch contra a matriz de vitória.
- [ ] Confirmar que nenhuma hipótese está apresentada como fato.
- [ ] Confirmar que nenhum artefato histórico é apresentado como prova atual.

## Current verification snapshot

The latest `main` CI run on 2026-10-05 completed successfully and included:

- automated test suite;
- TypeScript typecheck;
- dependency audit.

The current source tree contains **11 test files and 76 active test cases**. This is a repository snapshot, not a permanent product metric; if tests change, the count must be regenerated from the source/CI result before publication.

The successful CI run is evidence that the current `main` commit passed the repository's automated checks. It does **not** by itself close the live Devnet proof or frontend demonstration requirements.

## Documentation Freeze — 2026-10-04

The minimum enabling contracts for the next implementation step are now defined:

- `docs/architecture/DOMAIN_MODEL.md`
- `docs/architecture/API_CONTRACT.md`
- `docs/governance/SECURITY_THREAT_MODEL.md`

These documents formalize the current implementation; they do not introduce new MVP capabilities.

**Documentation freeze:** active, with the M4 communication artifact recorded as an explicit closure task rather than an architecture expansion.

No new architecture/documentation expansion should be introduced before the following closure checks:

1. `npm run typecheck` green;
2. `npm test` green;
3. current `m3.attestation.v2` generated and verified on Solana Devnet;
4. frontend implementation rendered against the frozen domain/interface contract.

**Important correction:** PR #12 is the LASTRO v0.2 brand/documentation handoff. It is not, by itself, evidence that the frontend has been rendered or that the end-to-end interface requirement is complete.

Any exception must be justified by a concrete implementation blocker or contradiction in the current system.
