/**
 * Interpretation providers (M2.3 / M2.4 input).
 *  - HeuristicProvider: deterministic and offline. Used in tests and in the demo when no API key is set.
 *    It only checks for the PRESENCE of observable elements; it does not judge quality. It says so in `uncertainty`.
 *  - AnthropicProvider: optional LLM provider. Its output goes through the same contract validation.
 */
import { COMPETENCY, EVIDENCE_CONTRACT } from "../domain/useCase.js";
import type { CriterionId, Evidence, ExtractionResult, SignalSupport } from "../domain/types.js";
import { AI_OUTPUT_INSTRUCTIONS, type AIInterpretation } from "./contract.js";
import { defaultEnv, type Env } from "../util.js";

export interface InterpretationInput {
  subject: string;
  evidences: Evidence[];
  extractions: ExtractionResult[];
}

export interface InterpretationProvider {
  readonly name: string;
  /** Returns RAW output. The pipeline validates it with parseAIOutput — providers are untrusted. */
  interpret(input: InterpretationInput): Promise<unknown>;
}

const has = (ex: ExtractionResult | undefined, f: string) => !!ex?.fields.some((x) => x.name === f);

export class HeuristicProvider implements InterpretationProvider {
  readonly name = "heuristic";
  constructor(private env: Env = defaultEnv) {}

  async interpret({ subject, evidences, extractions }: InterpretationInput): Promise<AIInterpretation> {
    const byType = (t: Evidence["type"]) => extractions.filter((x) => x.type === t);
    const signals: AIInterpretation["signals"] = [];
    const gaps: AIInterpretation["gaps"] = [];
    const interpretations: AIInterpretation["interpretations"] = [];
    let n = 0;

    const rule = (
      criterion: CriterionId,
      sources: ExtractionResult[],
      required: string[],
      label: string,
    ) => {
      const refs = sources.flatMap((s) => required.filter((f) => has(s, f)).map((f) => ({ evidence_id: s.evidence_id, field: f })));
      const found = new Set(refs.map((r) => r.field));
      const missing = required.filter((f) => !found.has(f));
      let support: SignalSupport = "does_not_support";
      if (sources.length && missing.length === 0) support = "supports";
      else if (found.size > 0) support = "partially_supports";

      if (!sources.length) {
        gaps.push({ criterion_id: criterion, description: `Nenhuma evidência para ${criterion} (${label}).`, suggested_evidence: suggest(criterion) });
      } else if (missing.length) {
        gaps.push({ criterion_id: criterion, description: `Elementos não encontrados para ${criterion}: ${missing.join(", ")}.` });
      }
      const cite = refs.length ? refs : sources.slice(0, 1).map((s) => ({ evidence_id: s.evidence_id }));
      if (!cite.length) return; // no evidence at all → only a gap, never a signal without citation
      signals.push({
        signal_id: `sig_${criterion}_${++n}`,
        criterion_id: criterion,
        support,
        rationale:
          support === "supports"
            ? `Foram encontrados os elementos observáveis esperados para ${criterion} (${label}): ${[...found].join(", ")}.`
            : `Elementos encontrados: ${[...found].join(", ") || "nenhum"}; ausentes: ${missing.join(", ")}.`,
        evidence_refs: cite,
        confidence: support === "supports" ? 0.6 : support === "partially_supports" ? 0.45 : 0.3,
      });
    };

    rule("C1", byType("briefing"), ["analytical_question", "objective", "expected_indicator"], "formulação");
    rule("C2", byType("analysis_artifact"), ["data_sources", "documented_steps", "has_executed_outputs"], "tratamento e análise");
    rule("C3", [...byType("analysis_result"), ...byType("communication")], ["quantitative_findings", "limitations"], "evidência");
    rule("C4", byType("communication"), ["conclusion", "audience", "limitations"], "comunicação");

    for (const ex of extractions) {
      interpretations.push({
        evidence_id: ex.evidence_id,
        statement: `Evidência do tipo ${ex.type} pode informar ${EVIDENCE_CONTRACT[ex.type].criteria.join("/")}; ${ex.fields.length} elemento(s) observável(is) extraído(s).`,
        kind: "inference",
      });
    }

    const activitiesCovered = new Set(evidences.map((e) => e.activity_id));
    const complete = ["A1", "A2", "A3", "A4"].every((a) => activitiesCovered.has(a as Evidence["activity_id"]));
    const allPresent = (["C1", "C2", "C3", "C4"] as const).every((c) => signals.some((s) => s.criterion_id === c && s.support !== "does_not_support"));

    return {
      contract_version: "m2.ai-output.v1",
      interpretation_id: this.env.id("int"),
      subject,
      competency_id: COMPETENCY.id,
      generated_at: this.env.now(),
      model: { provider: "local", name: "heuristic-presence-v1" },
      extraction_refs: extractions.map((x) => x.evidence_id),
      interpretations,
      signals,
      gaps,
      uncertainty: [
        { description: "Provedor heurístico: verifica apenas a presença de elementos observáveis; não avalia a qualidade ou a correção da análise." },
      ],
      overall_confidence: signals.length ? Math.min(...signals.map((s) => s.confidence)) : 0,
      proposed_state: complete && allPresent ? "UNDER_REVIEW" : "IN_DEVELOPMENT",
      requires_consensus: true,
    };
  }
}

function suggest(c: CriterionId): string {
  return { C1: "briefing (A1)", C2: "notebook/script (A2/A3)", C3: "resultados (A3) e síntese com limitações (A4)", C4: "síntese/apresentação (A4)" }[c];
}

/** Optional LLM provider (Anthropic Messages API). Enabled with AI_PROVIDER=anthropic + ANTHROPIC_API_KEY. */
export class AnthropicProvider implements InterpretationProvider {
  readonly name = "anthropic";
  constructor(
    private apiKey: string,
    private model: string,
    private env: Env = defaultEnv,
    private fetchImpl: typeof fetch = fetch,
  ) {}

  async interpret({ subject, evidences, extractions }: InterpretationInput): Promise<unknown> {
    const payload = {
      subject,
      competency: COMPETENCY,
      evidence_contract: EVIDENCE_CONTRACT,
      evidences: evidences.map((e) => ({ evidence_id: e.evidence_id, type: e.type, activity_id: e.activity_id, content: e.content.slice(0, 12000) })),
      extractions,
      generated_at: this.env.now(),
      interpretation_id: this.env.id("int"),
    };
    const res = await this.fetchImpl("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": this.apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4000,
        system: AI_OUTPUT_INSTRUCTIONS,
        messages: [{ role: "user", content: JSON.stringify(payload) }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const body = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const text = body.content?.find((c) => c.type === "text")?.text ?? "";
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    return JSON.parse(json);
  }
}

export function providerFromEnv(env: Env = defaultEnv): InterpretationProvider {
  if (process.env.AI_PROVIDER === "anthropic" && process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_MODEL) {
    return new AnthropicProvider(process.env.ANTHROPIC_API_KEY, process.env.ANTHROPIC_MODEL, env);
  }
  return new HeuristicProvider(env);
}
