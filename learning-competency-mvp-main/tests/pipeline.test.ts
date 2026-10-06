import { describe, expect, it } from "vitest";
import { CompetencySession } from "../src/pipeline.js";
import { HeuristicProvider } from "../src/ai/provider.js";
import { ANA, SUBJECT } from "../src/scenario.js";
import { fixedEnv } from "../src/util.js";

describe("canonical MVP decision flow", () => {
  it("NOT_STARTED → IN_DEVELOPMENT → UNDER_REVIEW → DEMONSTRATED via consensus", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);

    expect(s.state.value).toBe("NOT_STARTED");
    s.submit(ANA.briefing());
    expect(s.state.value).toBe("IN_DEVELOPMENT");
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());
    await s.interpret(new HeuristicProvider(env));
    s.submitForVerification();

    const result = s.consensusAdvance();

    expect(result.status).toBe("AGREEMENT");
    expect(s.state.value).toBe("DEMONSTRATED");
    expect(s.state.history.map((h) => h.to)).toEqual([
      "IN_DEVELOPMENT",
      "UNDER_REVIEW",
      "DEMONSTRATED",
    ]);
    expect(s.state.history.at(-1)).toMatchObject({ by: "consensus" });
    expect(s.handoff().decision.mode).toBe("consensus");
  });

  it("Consensus Core sends insufficient evidence back to development", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);

    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    await s.interpret(new HeuristicProvider(env));

    expect(() => s.submitForVerification()).toThrow(/A3.*A4|atividades sem evidência/);
  });

  it("new evidence invalidates previous interpretation and consensus", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);

    s.submit(ANA.briefing());
    await s.interpret(new HeuristicProvider(env));
    s.submit(ANA.preparation());

    expect(s.interpretation).toBeUndefined();
    expect(s.consensus).toBeUndefined();
    expect(() => s.submitForVerification()).toThrow(/interprete/);
  });

  it("does not accept new evidence while awaiting consensus", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);

    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());
    await s.interpret(new HeuristicProvider(env));
    s.submitForVerification();

    expect(() => s.submit(ANA.synthesis())).toThrow(/UNDER_REVIEW/);
  });

  it("does not permit human adjudication without a Consensus Core conflict", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());

    await expect(async () => {
      s.adjudicate({
        adjudication_id: env.id("adj"),
        adjudicator: { id: "a", name: "A", role: "adjudicator" },
        adjudicated_at: env.now(),
        interpretation_id: "missing",
        consensus_status: "CONFLICT",
        decisions: [],
        confirm_demonstrated: false,
      });
    }).rejects.toThrow();
  });

  it("isolates canonical evidence from an untrusted AI provider", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());

    const original = s.evidences.map(({ content, activity_id, type }) => ({ content, activity_id, type }));
    const malicious = {
      name: "malicious-provider",
      interpret: async ({ evidences }: { evidences: typeof s.evidences }) => {
        evidences[0]!.content = "tampered";
        evidences[0]!.activity_id = "A4";
        evidences[0]!.type = "communication";
        return new HeuristicProvider(env).interpret({
          subject: SUBJECT,
          evidences,
          extractions: structuredClone(s.extractions),
        });
      },
    };

    await s.interpret(malicious);
    expect(s.evidences.map(({ content, activity_id, type }) => ({ content, activity_id, type }))).toEqual(original);
    s.submitForVerification();
    expect(s.consensusAdvance().status).toBe("AGREEMENT");
  });

  it("rejects evidence tampering before consensus", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());
    await s.interpret(new HeuristicProvider(env));
    s.submitForVerification();

    s.evidences[0]!.content = "tampered after ingestion";
    expect(() => s.consensusAdvance()).toThrow(/integridade da evidência/);
  });

});
