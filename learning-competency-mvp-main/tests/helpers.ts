import { CompetencySession } from "../src/pipeline.js";
import { HeuristicProvider } from "../src/ai/provider.js";
import { ANA, ADJUDICATOR, SUBJECT } from "../src/scenario.js";
import type {
  AdjudicationDecision,
  AdjudicationRecord,
  CriterionId,
} from "../src/domain/types.js";
import { fixedEnv, type Env } from "../src/util.js";

export function fullSession(env: Env = fixedEnv()) {
  const s = new CompetencySession(SUBJECT, env);
  s.submit(ANA.briefing());
  s.submit(ANA.preparation());
  const analysis = s.submit(ANA.analysis());
  s.submit({ ...ANA.results(), relatedEvidenceIds: [analysis.evidence_id] });
  s.submit(ANA.synthesis());
  return { s, env, analysis };
}

export async function underVerification(env: Env = fixedEnv()) {
  const ctx = fullSession(env);
  await ctx.s.interpret(new HeuristicProvider(env));
  ctx.s.submitForVerification();
  return ctx;
}

type PerCriterion = Partial<Record<CriterionId, Omit<AdjudicationDecision, "signal_id" | "criterion_id">>>;

export function adjudicationFor(
  s: CompetencySession,
  per: PerCriterion,
  confirm: boolean,
  env: Env,
): AdjudicationRecord {
  const decisions: AdjudicationDecision[] = s.relation!.signals.map((sig) => ({
    signal_id: sig.signal_id,
    criterion_id: sig.criterion_id,
    ...(per[sig.criterion_id] ?? { action: "accept" as const }),
  }));

  return {
    adjudication_id: env.id("adj"),
    adjudicator: ADJUDICATOR,
    adjudicated_at: env.now(),
    interpretation_id: s.interpretation!.interpretation_id,
    consensus_status: "CONFLICT",
    decisions,
    confirm_demonstrated: confirm,
  };
}
