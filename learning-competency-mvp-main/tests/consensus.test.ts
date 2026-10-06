import { describe, expect, it } from "vitest";
import { HeuristicProvider } from "../src/ai/provider.js";
import { evaluateConsensus } from "../src/consensus/consensus.js";
import { fullSession } from "./helpers.js";
import { fixedEnv } from "../src/util.js";

describe("Consensus Core", () => {
  it("produces AGREEMENT when evidence, deterministic criteria and interpretation converge", async () => {
    const env = fixedEnv();
    const { s } = fullSession(env);
    await s.interpret(new HeuristicProvider(env));

    const result = evaluateConsensus(s.evidences, s.relation!);

    expect(result.status).toBe("AGREEMENT");
    expect(result.can_auto_advance).toBe(true);
    expect(result.requires_adjudication).toBe(false);
    expect(result.criteria.every((c) => c.status === "AGREEMENT")).toBe(true);
  });

  it("does not mutate session state", async () => {
    const env = fixedEnv();
    const { s } = fullSession(env);
    await s.interpret(new HeuristicProvider(env));
    const before = s.state.value;
    const historyBefore = structuredClone(s.state.history);

    evaluateConsensus(s.evidences, s.relation!);

    expect(s.state.value).toBe(before);
    expect(s.state.history).toEqual(historyBefore);
  });

  it("keeps deterministic criteria independent from AI signals", async () => {
    const env = fixedEnv();
    const { s } = fullSession(env);
    await s.interpret(new HeuristicProvider(env));

    const relation = {
      ...s.relation!,
      signals: [],
      coverage: s.relation!.coverage.map((c) => ({
        ...c,
        ai_assessment: "does_not_support" as const,
      })),
    };

    const result = evaluateConsensus(s.evidences, relation);

    expect(
      result.criteria.every(
        (c) => c.verifications.find((v) => v.mechanism === "deterministic_criteria")?.status === "PASS",
      ),
    ).toBe(true);
    expect(result.status).toBe("CONFLICT");
    expect(result.requires_adjudication).toBe(true);
  });

  it("returns INSUFFICIENT_EVIDENCE when a criterion has no eligible evidence", async () => {
    const env = fixedEnv();
    const { s } = fullSession(env);
    await s.interpret(new HeuristicProvider(env));

    const evidence = s.evidences.filter((e) => e.activity_id !== "A4");
    const relation = {
      ...s.relation!,
      coverage: s.relation!.coverage.map((c) =>
        c.criterion_id === "C4"
          ? { ...c, ai_assessment: "supports" as const }
          : c,
      ),
      signals: s.relation!.signals.filter((signal) => signal.criterion_id !== "C4"),
    };

    const result = evaluateConsensus(evidence, relation);
    const c4 = result.criteria.find((c) => c.criterion_id === "C4")!;

    expect(c4.status).toBe("INSUFFICIENT_EVIDENCE");
    expect(result.status).toBe("INSUFFICIENT_EVIDENCE");
    expect(result.requires_adjudication).toBe(false);
    expect(result.can_auto_advance).toBe(false);
  });
});
