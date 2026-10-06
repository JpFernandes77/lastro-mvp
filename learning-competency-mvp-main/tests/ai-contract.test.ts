import { describe, expect, it } from "vitest";
import { parseAIOutput } from "../src/ai/contract.js";
import { HeuristicProvider, type InterpretationProvider } from "../src/ai/provider.js";
import { InterpretationRejected } from "../src/pipeline.js";
import { fullSession } from "./helpers.js";
import { fixedEnv } from "../src/util.js";

describe("M2.3 — contrato de saída da IA", () => {
  it("saída do provedor heurístico respeita o contrato e separa extração/interpretação/sinais/gaps/incerteza", async () => {
    const { s, env } = fullSession();
    const raw = await new HeuristicProvider(env).interpret({ subject: s.subject, evidences: s.evidences, extractions: s.extractions });
    const check = parseAIOutput(raw, s.evidences.map((e) => e.evidence_id));
    expect(check.errors).toEqual([]);
    const v = check.value!;
    expect(v.extraction_refs.length).toBe(5);
    expect(v.interpretations.every((i) => i.kind === "inference")).toBe(true);
    expect(v.signals.map((x) => x.criterion_id).sort()).toEqual(["C1", "C2", "C3", "C4"]);
    expect(v.uncertainty.length).toBeGreaterThan(0);
    expect(v.requires_consensus).toBe(true);
  });

  it("recusa sinal sem evidência citada", () => {
    const { s } = fullSession();
    const bad = baseOutput(s.evidences[0]!.evidence_id);
    bad.signals[0]!.evidence_refs = [];
    expect(parseAIOutput(bad, s.evidences.map((e) => e.evidence_id)).ok).toBe(false);
  });

  it("recusa evidência inventada pela IA", () => {
    const { s } = fullSession();
    const bad = baseOutput("ev_inventada");
    const r = parseAIOutput(bad, s.evidences.map((e) => e.evidence_id));
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/inexistente/);
  });

  it("IA não pode propor DEMONSTRATED", () => {
    const { s } = fullSession();
    const bad = { ...baseOutput(s.evidences[0]!.evidence_id), proposed_state: "DEMONSTRATED" };
    expect(parseAIOutput(bad, s.evidences.map((e) => e.evidence_id)).ok).toBe(false);
  });

  it("recusa afirmações proibidas (competência comprovada, fraude)", () => {
    const { s } = fullSession();
    const bad = baseOutput(s.evidences[0]!.evidence_id);
    bad.signals[0]!.rationale = "A competência foi comprovada.";
    expect(parseAIOutput(bad, s.evidences.map((e) => e.evidence_id)).errors.join()).toMatch(/proibida/);
  });

  it("recusa subject divergente quando o contexto da sessão é fornecido", () => {
    const { s } = fullSession();
    const bad = { ...baseOutput(s.evidences[0]!.evidence_id), subject: "person:other" };
    const r = parseAIOutput(bad, s.evidences.map((e) => e.evidence_id), {
      subject: s.subject,
      competency_id: "comp:data-analysis-reproducible",
      extraction_refs: s.evidences.map((e) => e.evidence_id),
    });
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/subject/);
  });

  it("recusa competency_id divergente no contexto da sessão", () => {
    const { s } = fullSession();
    const bad = { ...baseOutput(s.evidences[0]!.evidence_id), competency_id: "comp:other" };
    const r = parseAIOutput(bad, s.evidences.map((e) => e.evidence_id), {
      subject: s.subject,
      competency_id: "comp:data-analysis-reproducible",
      extraction_refs: s.evidences.map((e) => e.evidence_id),
    });
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/competency_id/);
  });

  it("recusa extraction_refs divergentes do conjunto fornecido", () => {
    const { s } = fullSession();
    const bad = { ...baseOutput(s.evidences[0]!.evidence_id), extraction_refs: ["ev_inventada"] };
    const r = parseAIOutput(bad, s.evidences.map((e) => e.evidence_id), {
      subject: s.subject,
      competency_id: "comp:data-analysis-reproducible",
      extraction_refs: s.evidences.map((e) => e.evidence_id),
    });
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/extraction_refs/);
  });

  it("pipeline rejeita saída inválida em vez de corrigir em silêncio", async () => {
    const { s } = fullSession();
    const broken: InterpretationProvider = { name: "broken", interpret: async () => ({ hello: "world" }) };
    await expect(s.interpret(broken)).rejects.toBeInstanceOf(InterpretationRejected);
    expect(s.interpretation).toBeUndefined();
  });
});

function baseOutput(evidenceId: string) {
  const env = fixedEnv();
  return {
    contract_version: "m2.ai-output.v1" as const,
    interpretation_id: env.id("int"),
    subject: "person:ana-synthetic",
    competency_id: "comp:data-analysis-reproducible",
    generated_at: env.now(),
    model: { provider: "test", name: "fixture" },
    extraction_refs: [evidenceId],
    interpretations: [{ evidence_id: evidenceId, statement: "informa C1", kind: "inference" as const }],
    signals: [{ signal_id: "s1", criterion_id: "C1" as const, support: "supports" as const, rationale: "pergunta clara", evidence_refs: [{ evidence_id: evidenceId }], confidence: 0.7 }],
    gaps: [],
    uncertainty: [],
    overall_confidence: 0.7,
    proposed_state: "UNDER_REVIEW" as const,
    requires_consensus: true as const,
  };
}

describe("AnthropicProvider (fetch simulado)", () => {
  it("resposta do LLM passa pela mesma validação de contrato", async () => {
    const { AnthropicProvider } = await import("../src/ai/provider.js");
    const { s, env } = fullSession();
    const good = await new HeuristicProvider(env).interpret({ subject: s.subject, evidences: s.evidences, extractions: s.extractions });
    const fakeFetch = (async () =>
      new Response(JSON.stringify({ content: [{ type: "text", text: "Aqui está:\n" + JSON.stringify({ ...good, model: { provider: "anthropic", name: "test" } }) }] }), { status: 200 })) as typeof fetch;
    const p = new AnthropicProvider("key", "model", env, fakeFetch);
    const rel = await s.interpret(p);
    expect(rel.signals.length).toBe(4);
    expect(s.interpretation!.model.provider).toBe("anthropic");
  });

  it("erro da API vira exceção, sem estado parcial", async () => {
    const { AnthropicProvider } = await import("../src/ai/provider.js");
    const { s, env } = fullSession();
    const fakeFetch = (async () => new Response("quota", { status: 429 })) as typeof fetch;
    await expect(s.interpret(new AnthropicProvider("k", "m", env, fakeFetch))).rejects.toThrow(/429/);
    expect(s.interpretation).toBeUndefined();
  });
});
