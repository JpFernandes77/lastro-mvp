import type { Competency, CriterionId, EvidenceType, Trail } from "./types.js";

/**
 * Canonical use case v0.2 — transcribed from docs/product/USE_CASE.md.
 * If the use case changes, change it there first and then here.
 */

export const COMPETENCY: Competency = {
  id: "comp:data-analysis-reproducible",
  statement:
    "Usar ferramentas de IA como apoio para transformar uma pergunta de negócio em uma análise de dados reproduzível e comunicar conclusões sustentadas por evidências.",
  criteria: [
    {
      id: "C1",
      title: "Formulação",
      observables: [
        "transforma uma necessidade/pergunta de negócio em uma pergunta analítica clara",
        "define o que pretende responder",
      ],
    },
    {
      id: "C2",
      title: "Tratamento e análise",
      observables: [
        "identifica/prepara os dados necessários",
        "executa uma análise coerente com a pergunta",
        "registra passos suficientes para reprodução",
      ],
    },
    {
      id: "C3",
      title: "Evidência",
      observables: [
        "apresenta resultados apoiados pelos dados",
        "diferencia observação, interpretação e limitação",
        "evita conclusões que não sejam sustentadas pelo material apresentado",
      ],
    },
    {
      id: "C4",
      title: "Comunicação",
      observables: ["comunica resultado, contexto e limitações de forma compreensível para o público definido"],
    },
  ],
};

export const TRAIL: Trail = {
  id: "trail:applied-data-analysis",
  title: "Trilha de Análise de Dados Aplicada",
  competencyId: COMPETENCY.id,
  activities: [
    {
      id: "A1",
      title: "Formular a pergunta",
      objective: "transformar um problema de negócio em uma pergunta analítica",
      expectedEvidence: ["briefing"],
      criteria: ["C1"],
    },
    {
      id: "A2",
      title: "Preparar e explorar os dados",
      objective: "preparar o conjunto de dados e identificar padrões relevantes",
      expectedEvidence: ["analysis_artifact"],
      criteria: ["C2"],
    },
    {
      id: "A3",
      title: "Executar análise reproduzível",
      objective: "responder à pergunta analítica por meio de uma análise reproduzível",
      expectedEvidence: ["analysis_artifact", "analysis_result"],
      criteria: ["C2", "C3"],
    },
    {
      id: "A4",
      title: "Comunicar resultado",
      objective: "transformar a análise em uma comunicação útil para decisão",
      expectedEvidence: ["communication"],
      criteria: ["C3", "C4"],
    },
  ],
};

/** Evidence contract (USE_CASE.md §4): which activities may produce each type, and which criteria it can inform. */
export const EVIDENCE_CONTRACT: Record<EvidenceType, { activities: string[]; criteria: CriterionId[]; description: string }> = {
  briefing: { activities: ["A1"], criteria: ["C1"], description: "pergunta e objetivo" },
  analysis_artifact: { activities: ["A2", "A3"], criteria: ["C2", "C3"], description: "notebook, script ou consultas" },
  analysis_result: { activities: ["A3"], criteria: ["C3"], description: "resultados/tabelas/visualizações" },
  communication: { activities: ["A4"], criteria: ["C3", "C4"], description: "síntese/apresentação" },
};

/** analysis_result must reference the artifact that produced it (USE_CASE.md §4, proveniência mínima). */
export const REQUIRES_RELATED: Partial<Record<EvidenceType, EvidenceType>> = {
  analysis_result: "analysis_artifact",
};

export const ALL_CRITERIA: CriterionId[] = ["C1", "C2", "C3", "C4"];
