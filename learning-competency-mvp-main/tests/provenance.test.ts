import { describe, expect, it } from "vitest";
import { HeuristicProvider } from "../src/ai/provider.js";
import { verifyHandoff } from "../src/provenance/trace.js";
import { ANA } from "../src/scenario.js";
import { adjudicationFor, underVerification } from "./helpers.js";
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
  expect(s.consensusAdvance().status).toBe("CONFLICT");
  return { s, env };
}

describe("Provenance and M2 → M3 handoff", () => {
  it("shows evidence, AI and adjudicator only on the exceptional path", async () => {
    const { s, env } = await conflictingSession();
    s.adjudicate(
      adjudicationFor(
        s,
        { C3: { action: "correct", corrected_support: "supports", note: "conflict resolved by evidence", evidence_refs: [{ evidence_id: s.evidences.at(-1)!.evidence_id }] } },
        true,
        env,
      ),
    );

    const trace = s.trace();
    for (const c of trace.criteria) {
      const origins = new Set(c.chain.map((n) => n.origin));
      expect(origins).toEqual(new Set(["evidence", "ai", "adjudicator"]));
      expect(c.chain.at(-1)!.kind).toBe("final");
    }

    const c3 = trace.criteria.find((c) => c.criterion_id === "C3")!;
    expect(c3.chain.find((n) => n.kind === "adjudication_decision")!.detail).toMatch(/correct → supports/);
  });

  it("consensus-only provenance contains no human actor", async () => {
    const env = fixedEnv();
    const { s } = await underVerification(env);
    await s.interpret(new HeuristicProvider(env));
    expect(s.consensusAdvance().status).toBe("AGREEMENT");

    const trace = s.trace();
    for (const c of trace.criteria) {
      const origins = new Set(c.chain.map((n) => n.origin));
      expect(origins).toEqual(new Set(["evidence", "ai", "consensus"]));
    }
  });

  it("handoff never carries raw evidence and detects tampering", async () => {
    const env = fixedEnv();
    const { s } = await underVerification(env);
    await s.interpret(new HeuristicProvider(env));
    s.consensusAdvance();

    const h = s.handoff();
    expect(h.state).toBe("DEMONSTRATED");
    expect(h.synthetic).toBe(true);
    const json = JSON.stringify(h);

    for (const ev of s.evidences) expect(json).not.toContain(ev.content.slice(0, 40));
    expect(h.evidence.every((e) => /^[0-9a-f]{64}$/.test(e.content_hash))).toBe(true);
    expect(verifyHandoff(h)).toBe(true);

    expect(verifyHandoff({ ...h, state: "IN_DEVELOPMENT" })).toBe(false);
    expect(verifyHandoff({ ...h, subject: "hacked@email.com" })).toBe(false);
    expect(verifyHandoff({ ...h, record_hash: "0".repeat(64) })).toBe(false);
  });

  it("handoff is deterministic for the same session", async () => {
    const a = await underVerification();
    await a.s.interpret(new HeuristicProvider(a.env));
    a.s.consensusAdvance();

    const b = await underVerification();
    await b.s.interpret(new HeuristicProvider(b.env));
    b.s.consensusAdvance();

    expect(a.s.handoff().record_hash).toBe(b.s.handoff().record_hash);
  });

  it("new evidence is rejected after consensus advances to DEMONSTRATED", async () => {
    const env = fixedEnv();
    const { s } = await underVerification(env);
    await s.interpret(new HeuristicProvider(env));
    s.consensusAdvance();

    expect(s.consensus).toBeDefined();
    expect(() => s.submit(ANA.synthesis())).toThrow(/DEMONSTRATED/);
  });
});
