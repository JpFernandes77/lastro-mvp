import { describe, expect, it } from "vitest";
import { HeuristicProvider } from "../src/ai/provider.js";
import { ANA } from "../src/scenario.js";
import { fullSession, underVerification, adjudicationFor } from "./helpers.js";
import { fixedEnv } from "../src/util.js";

async function conflictingSession() {
  const env = fixedEnv();
  const { s } = await underVerification(env);
  s.relation = {
    ...s.relation!,
    coverage: s.relation!.coverage.map((c) => ({
      ...c,
      ai_assessment: "does_not_support" as const,
    })),
  };
  const consensus = s.consensusAdvance();
  expect(consensus.status).toBe("CONFLICT");
  return { s, env };
}

describe("Human Adjudication — exceptional conflict path", () => {
  it("cannot run before Consensus Core returns CONFLICT", async () => {
    const { s, env } = await fullSession();
    await s.interpret(new HeuristicProvider(env));
    s.submitForVerification();

    expect(() => s.adjudicate({
      adjudication_id: env.id("adj"),
      adjudicator: { id: "a", name: "A", role: "adjudicator" },
      adjudicated_at: env.now(),
      interpretation_id: s.interpretation!.interpretation_id,
      consensus_status: "CONFLICT",
      decisions: [],
      confirm_demonstrated: false,
    })).toThrow(/Consensus Core/);
  });

  it("resolves a conflict to DEMONSTRATED when the adjudicator confirms all criteria", async () => {
    const { s, env } = await conflictingSession();

    const out = s.adjudicate(adjudicationFor(s, {}, true, env));

    expect(out.criteria.every((c) => c.final_assessment === "supports")).toBe(true);
    expect(s.state.value).toBe("DEMONSTRATED");
    expect(s.state.history.at(-1)).toMatchObject({
      by: "adjudicator",
      to: "DEMONSTRATED",
    });
    expect(s.consensus?.status).toBe("HUMAN_ADJUDICATION");
    expect(s.handoff().decision.mode).toBe("human_adjudication");
  });

  it("resolves a conflict back to IN_DEVELOPMENT when evidence remains insufficient", async () => {
    const { s, env } = await conflictingSession();

    const out = s.adjudicate(
      adjudicationFor(
        s,
        {
          C3: {
            action: "reject",
            note: "evidence does not resolve the conflict",
          },
        },
        false,
        env,
      ),
    );

    expect(out.criteria.find((c) => c.criterion_id === "C3")?.final_assessment).toBe("does_not_support");
    expect(s.state.value).toBe("IN_DEVELOPMENT");
    expect(s.state.history.at(-1)).toMatchObject({
      by: "adjudicator",
      to: "IN_DEVELOPMENT",
    });
  });

  it("a new evidence submission clears the previous consensus/adjudication context", async () => {
    const { s, env } = await conflictingSession();
    s.adjudicate(adjudicationFor(s, {}, false, env));
    expect(s.consensus?.status).toBe("HUMAN_ADJUDICATION");
    expect(s.adjudication).toBeDefined();

    s.submit(ANA.synthesis());

    expect(s.consensus).toBeUndefined();
    expect(s.adjudication).toBeUndefined();
    expect(s.state.value).toBe("IN_DEVELOPMENT");
  });
});
