import { describe, expect, it } from "vitest";
import { relateToCompetency } from "../src/relation/relate.js";
import { HeuristicProvider } from "../src/ai/provider.js";
import { parseAIOutput } from "../src/ai/contract.js";
import { fullSession } from "./helpers.js";
import { CompetencySession } from "../src/pipeline.js";
import { ANA, SUBJECT } from "../src/scenario.js";
import { fixedEnv } from "../src/util.js";

describe("M2.4 — relação evidência → competência", () => {
  it("cada sinal identifica o critério e as evidências que o sustentam", async () => {
    const { s, env } = fullSession();
    const rel = await s.interpret(new HeuristicProvider(env));
    expect(rel.coverage.map((c) => c.criterion_id)).toEqual(["C1", "C2", "C3", "C4"]);
    for (const sig of rel.signals) {
      expect(sig.criterion_title).toBeTruthy();
      expect(sig.evidence_refs.length).toBeGreaterThan(0);
    }
  });

  it("remove citação que viola o contrato (briefing não sustenta C4)", async () => {
    const { s, env } = fullSession();
    const raw = (await new HeuristicProvider(env).interpret({ subject: s.subject, evidences: s.evidences, extractions: s.extractions })) as any;
    const briefing = s.evidences.find((e) => e.type === "briefing")!;
    const c4 = raw.signals.find((x: any) => x.criterion_id === "C4");
    c4.evidence_refs.push({ evidence_id: briefing.evidence_id });
    const interp = parseAIOutput(raw, s.evidences.map((e) => e.evidence_id)).value!;
    const rel = relateToCompetency(interp, s.evidences);
    const sig = rel.signals.find((x) => x.criterion_id === "C4")!;
    expect(sig.evidence_refs.some((r) => r.evidence_id === briefing.evidence_id)).toBe(false);
    expect(sig.rejected_refs[0]!.reason).toMatch(/não pode sustentar C4/);
  });

  it("evidência faltando vira lacuna, não sinal inventado", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    const rel = await s.interpret(new HeuristicProvider(env));
    expect(rel.coverage.find((c) => c.criterion_id === "C1")!.ai_assessment).toBe("supports");
    for (const c of ["C2", "C3", "C4"] as const) expect(rel.coverage.find((x) => x.criterion_id === c)!.ai_assessment).toBe("no_signal");
    expect(s.interpretation!.gaps.map((g) => g.criterion_id)).toEqual(expect.arrayContaining(["C2", "C3", "C4"]));
    expect(s.interpretation!.proposed_state).toBe("IN_DEVELOPMENT");
  });

  it("evidência analisada sobe para N3, nunca para N4", async () => {
    const { s, env } = fullSession();
    await s.interpret(new HeuristicProvider(env));
    expect(s.evidences.every((e) => e.trust_level === "N3_EVIDENCE_ANALYZED")).toBe(true);
  });
});
