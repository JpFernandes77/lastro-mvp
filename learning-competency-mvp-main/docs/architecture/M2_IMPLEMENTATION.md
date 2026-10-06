# M2 — Implementação: evidência → IA → revisão humana

Status: implementação v0.1 do M2 (owner: Joaopedro0s). Segue `docs/product/USE_CASE.md` v0.1, `docs/architecture/EVIDENCE_PIPELINE.md` e `skills/learning-competency/SKILL.md`.
Classificação (CONTRIBUTING.md): **implementação**. M2 está implementado; este documento descreve o estado técnico atual e não mantém decisões já resolvidas como abertas.

## Como rodar

```
npm install
npm test                    # suíte automatizada atual — conferir contagem no CI
npm run typecheck
npm run demo                # cenário sintético Ana → DEMONSTRATED
npm run demo:revisao-parcial  # revisor corrige C3 e pede evidência em C4 → IN_DEVELOPMENT
```

O demo grava `out/reviewed-state.json` (handoff para o M3) e `out/provenance-trace.json`.
Sem chave de API, a IA roda com o provedor heurístico (offline e determinístico). Para usar um LLM: `AI_PROVIDER=anthropic`, `ANTHROPIC_API_KEY` e `ANTHROPIC_MODEL` (ver `.env.example`).

## Stack

TypeScript (Node ≥ 20), `zod` para validar contratos, `vitest` para testes. Sem banco e sem servidor nesta etapa: o estado vive em memória na `CompetencySession`. Persistência e interface ficam para quando a frente de Interface e o M3 definirem o que precisam (pergunta de controle do CONTRIBUTING.md).

## Mapa: task → código → teste

| Task | Código | Testes | O que garante |
|---|---|---|---|
| M2.1 ingestão | `src/evidence/ingest.ts` | `tests/ingest.test.ts` | Só os 4 tipos do contrato, na atividade certa, com os metadados mínimos (§4 do USE_CASE); `analysis_result` precisa apontar o artefato; hash sha256 do conteúdo; nível N2. |
| M2.2 normalização/extração | `src/evidence/normalize.ts`, `src/evidence/extract.ts` | `tests/extract.test.ts` | Markdown/texto/ipynb/csv viram segmentos com localizador (`line:5`, `cell:3/output:1`). Cada campo extraído aponta para o trecho de origem. Ausências são registradas sem julgamento. |
| M2.3 contrato da IA | `src/ai/contract.ts`, `src/ai/provider.ts` | `tests/ai-contract.test.ts` | Saída separa `extraction_refs`, `interpretations` (sempre inferência), `signals`, `gaps`, `uncertainty` e confiança. Saída inválida é **rejeitada**, nunca corrigida em silêncio. |
| M2.4 relação com a competência | `src/relation/relate.ts` | `tests/relate.test.ts` | Todo sinal aponta o critério C1–C4 e as evidências. Citação que viola o contrato (ex.: briefing sustentando C4) é removida e reportada. Falta de evidência vira lacuna, não sinal. |
| M2.5 revisão humana | `src/review/review.ts`, `src/state/state.ts` | `tests/review.test.ts` | Revisor aceita, corrige, rejeita ou pede evidência. A decisão fica separada da saída da IA. DEMONSTRATED só com confirmação explícita, C1–C4 sustentados e referência às evidências. |
| M2.6 proveniência | `src/provenance/trace.ts` | `tests/provenance.test.ts` | Para cada critério: evidência → campos extraídos → sinal da IA → decisão do revisor → avaliação final, com a origem (`evidence` / `ai` / `reviewer`) em cada passo. |
| M2.7 testes críticos | `tests/*` | — | Evidência válida, evidência faltando, incerteza/saída inválida da IA, correção e rejeição pelo revisor, pedido de evidência, integridade. |

## Regras implementadas

- **A IA propõe, não decide.** O contrato só aceita `proposed_state` = `IN_DEVELOPMENT` ou `UNDER_REVIEW` e exige `requires_human_review: true`. Afirmações como "competência comprovada", "verificada pela instituição" ou "fraude" são recusadas.
- **Só o revisor leva a DEMONSTRATED.** `state.ts` bloqueia essa transição para `system` e `ai`.
- **Nível de confiança:** evidência entra como N2 e vai para N3 depois de analisada. O M2 nunca marca N4.
- **Sem invenção:** sinal sem evidência citada, ou citando evidência inexistente, invalida a saída da IA.
- **Dados sintéticos identificados:** o cenário Ana (`fixtures/synthetic/ana/`) é marcado como `synthetic: true` até o handoff.

## Estados usados pelo M2

`NOT_STARTED → IN_DEVELOPMENT` (sistema, na primeira evidência) → `UNDER_REVIEW` (sistema, com a trilha A1–A4 completa e uma interpretação válida) → `DEMONSTRATED` (revisor) ou de volta para `IN_DEVELOPMENT` (revisor).

O modelo canônico de estado é do **M3.1**. Este módulo cobre só o necessário para o M2 e pode ser substituído.

## Contrato M2 → M3 (implementado)

`CompetencySession.handoff()` gera um `ReviewedStateRecord` (`m2.reviewed-state.v1`):

- `subject`, `competency_id`, `state`, `state_history`
- `criteria[]`: avaliação final do revisor por critério + ids das evidências usadas
- `evidence[]`: id, tipo, atividade, **hash do conteúdo** e nível de confiança. Nunca o conteúdo bruto.
- `interpretation`: id, modelo e versão do contrato da IA
- `review`: id, revisor, papel, data e confirmação
- `record_hash`: sha256 do JSON canônico (chaves ordenadas) do registro

O M3 atual registra um payload mínimo via **Solana Memo Program**. O Memo funciona como âncora de integridade; não é Solana Attestation Service (SAS). Uma futura migração para SAS (Credential → Schema → Attestation) é uma opção de evolução, não parte do MVP atual.

## Decisões resolvidas no M3

1. **Provedor de IA:** heurístico offline/determinístico permanece disponível; LLM é opcional.
2. **Persistência:** o MVP continua sem banco; o handoff é materializado em arquivo.
3. **Handoff:** o reviewed-state é validado por hash antes da atestação e novamente na verificação quando o registro é fornecido.
4. **Attestation:** o MVP usa Solana Memo com payload versionado e verificador que vincula MVP, versão, competência, estado, record_hash, subject_ref e attester esperado.
