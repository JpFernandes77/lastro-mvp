# src/

Implementação do vertical slice. Nesta versão: M2 (evidência → IA → revisão humana).

```
domain/      tipos e caso de uso canônico (USE_CASE.md)
evidence/    M2.1 ingestão · M2.2 normalização e extração
ai/          M2.3 contrato de saída da IA + provedores (heurístico e LLM opcional)
relation/    M2.4 relação evidência → critério C1–C4
review/      M2.5 revisão humana
state/       estados mínimos usados pelo M2 (modelo final: M3.1)
provenance/  M2.6 trace de proveniência + handoff para o M3
pipeline.ts  orquestra as etapas (CompetencySession)
cli/demo.ts  roda o cenário sintético Ana
```

Detalhes: `docs/architecture/M2_IMPLEMENTATION.md`.
