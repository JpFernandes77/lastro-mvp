/**
 * Canonical synthetic demo:
 * evidence → interpretation → verification → consensus → competency state.
 *
 * Human adjudication is available only with --adjudicate after a Consensus
 * Core CONFLICT. It is not part of the normal demo path.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CompetencySession } from "../pipeline.js";
import { providerFromEnv } from "../ai/provider.js";
import { ANA, ADJUDICATOR, SUBJECT } from "../scenario.js";
import type {
  AdjudicationDecision,
  AdjudicationRecord,
  CriterionId,
} from "../domain/types.js";
import { defaultEnv } from "../util.js";

interface AdjudicationFile {
  confirm_demonstrated: boolean;
  summary_note?: string;
  decisions: Array<Omit<AdjudicationDecision, "signal_id"> & { criterion_id: CriterionId }>;
}

const arg = (name: string) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
};

async function main() {
  const adjudicationPath = arg("--adjudicate");
  const env = defaultEnv;
  const s = new CompetencySession(SUBJECT, env);
  const log = (message: string) => console.log(message);

  log("⚠  Cenário SINTÉTICO (Ana) — não representa usuário real, piloto ou tração.\n");
  log("1) INGEST + NORMALIZE + EXTRACT");

  s.submit(ANA.briefing());
  s.submit(ANA.preparation());
  const analysis = s.submit(ANA.analysis());
  s.submit({ ...ANA.results(), relatedEvidenceIds: [analysis.evidence_id] });
  s.submit(ANA.synthesis());

  for (const extraction of s.extractions) {
    log(
      `   ${extraction.evidence_id} ${extraction.type.padEnd(18)} campos: ${extraction.fields.map((f) => f.name).join(", ")}${extraction.missing.length ? ` | ausentes: ${extraction.missing.join(", ")}` : ""}`,
    );
  }

  const provider = providerFromEnv(env);
  log(`\n2) INTERPRET + RELATE (provedor: ${provider.name})`);
  const relation = await s.interpret(provider);

  for (const coverage of relation.coverage) {
    log(`   ${coverage.criterion_id} ${coverage.title.padEnd(22)} IA: ${coverage.ai_assessment}`);
  }

  if (relation.invalid_signals.length) {
    log(`   sinais inválidos descartados: ${relation.invalid_signals.map((x) => x.signal_id).join(", ")}`);
  }

  log(`   estado proposto pela IA: ${s.interpretation!.proposed_state} (apenas proposta)`);

  log("\n3) SUBMIT FOR VERIFICATION");
  log(`   estado: ${s.submitForVerification().value}`);

  log("\n4) CONSENSUS CORE");
  const consensus = s.consensusAdvance();
  log(`   resultado: ${consensus.status}`);
  log(`   adjudicação necessária: ${consensus.requires_adjudication ? "SIM" : "NÃO"}`);
  for (const criterion of consensus.criteria) {
    log(
      `   ${criterion.criterion_id}: ${criterion.status} — ${criterion.verifications.map((v) => `${v.mechanism}=${v.status}`).join(", ")}`,
    );
  }

  if (consensus.status === "CONFLICT" && adjudicationPath) {
    log(`\n5) HUMAN ADJUDICATION (exceção: ${adjudicationPath})`);
    const file = JSON.parse(readFileSync(adjudicationPath, "utf8")) as AdjudicationFile;

    const decisions: AdjudicationDecision[] = file.decisions.flatMap((decision) =>
      relation.signals
        .filter((signal) => signal.criterion_id === decision.criterion_id)
        .map((signal) => ({ ...decision, signal_id: signal.signal_id })),
    );

    const record: AdjudicationRecord = {
      adjudication_id: env.id("adj"),
      adjudicator: ADJUDICATOR,
      adjudicated_at: env.now(),
      interpretation_id: s.interpretation!.interpretation_id,
      consensus_status: "CONFLICT",
      decisions,
      confirm_demonstrated: file.confirm_demonstrated,
      summary_note: file.summary_note,
    };

    const out = s.adjudicate(record);
    for (const criterion of out.criteria) {
      log(`   ${criterion.criterion_id}: IA=${criterion.ai_assessment} → adjudicador=${criterion.final_assessment}`);
    }
    log(`   estado final: ${s.state.value}`);
  } else {
    log(`   estado final: ${s.state.value}`);
  }

  log("\n5) PROVENANCE");
  const trace = s.trace();

  for (const criterion of trace.criteria) {
    log(`   ${criterion.criterion_id}`);
    for (const node of criterion.chain) {
      log(`     [${node.origin.padEnd(11)}] ${node.kind.padEnd(22)} ${node.detail.slice(0, 110)}`);
    }
  }

  mkdirSync("out", { recursive: true });
  const handoff = s.handoff();
  writeFileSync(join("out", "reviewed-state.json"), JSON.stringify(handoff, null, 2));
  writeFileSync(join("out", "provenance-trace.json"), JSON.stringify(trace, null, 2));

  log(`\n6) HANDOFF → M3: out/reviewed-state.json (record_hash ${handoff.record_hash.slice(0, 16)}…)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
