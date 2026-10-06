/**
 * Canonical MVP orchestration:
 * INGEST → NORMALIZE → EXTRACT → INTERPRET → RELATE
 * → INDEPENDENT VERIFICATION → CONSENSUS
 * → COMPETENCY STATE → (exceptional HUMAN ADJUDICATION).
 */
import { COMPETENCY, TRAIL } from "./domain/useCase.js";
import type {
  AdjudicationRecord,
  CompetencyState,
  Evidence,
  EvidenceSubmission,
  ExtractionResult,
} from "./domain/types.js";
import { ingestEvidence, verifyEvidenceIntegrity } from "./evidence/ingest.js";
import { normalizeEvidence } from "./evidence/normalize.js";
import { extractFields } from "./evidence/extract.js";
import { parseAIOutput, type AIInterpretation } from "./ai/contract.js";
import type { InterpretationProvider } from "./ai/provider.js";
import { relateToCompetency, type RelationResult } from "./relation/relate.js";
import { evaluateConsensus, type ConsensusResult } from "./consensus/consensus.js";
import { applyAdjudication, type AdjudicationOutcome } from "./adjudication/adjudication.js";
import { initialState, transition, TransitionError } from "./state/state.js";
import { buildHandoff, buildTrace, type ProvenanceTrace, type ReviewedStateRecord } from "./provenance/trace.js";
import { defaultEnv, type Env } from "./util.js";

export class InterpretationRejected extends Error {
  constructor(public readonly errors: string[]) {
    super(`Saída da IA rejeitada pelo contrato: ${errors.join("; ")}`);
    this.name = "InterpretationRejected";
  }
}

export class CompetencySession {
  readonly evidences: Evidence[] = [];
  readonly extractions: ExtractionResult[] = [];
  interpretation?: AIInterpretation;
  relation?: RelationResult;
  consensus?: ConsensusResult;
  adjudication?: AdjudicationOutcome;
  state: CompetencyState;

  constructor(
    readonly subject: string,
    private env: Env = defaultEnv,
  ) {
    this.state = initialState(subject, COMPETENCY.id);
  }

  submit(sub: EvidenceSubmission): Evidence {
    if (this.state.value === "UNDER_REVIEW" || this.state.value === "DEMONSTRATED") {
      throw new TransitionError(`não é possível enviar evidência com o estado em ${this.state.value}`);
    }

    const ev = ingestEvidence(sub, this.evidences, this.env);
    this.evidences.push(ev);
    this.extractions.push(extractFields(normalizeEvidence(ev)));

    if (this.state.value === "NOT_STARTED") {
      this.state = transition(
        this.state,
        "IN_DEVELOPMENT",
        "system",
        "pipeline",
        `primeira evidência recebida (${ev.evidence_id})`,
        this.env.now(),
      );
    }

    this.interpretation = undefined;
    this.relation = undefined;
    this.consensus = undefined;
    this.adjudication = undefined;
    return ev;
  }

  async interpret(provider: InterpretationProvider): Promise<RelationResult> {
    if (!this.evidences.length) throw new TransitionError("não há evidências para interpretar");

    // Providers are untrusted. Give them detached snapshots so an AI adapter
    // cannot mutate the canonical evidence objects before verification.
    const providerEvidences = structuredClone(this.evidences);
    const providerExtractions = structuredClone(this.extractions);
    const raw = await provider.interpret({
      subject: this.subject,
      evidences: providerEvidences,
      extractions: providerExtractions,
    });

    const check = parseAIOutput(raw, this.evidences.map((e) => e.evidence_id), {
      subject: this.subject,
      competency_id: COMPETENCY.id,
      extraction_refs: this.extractions.map((x) => x.evidence_id),
    });

    if (!check.ok) throw new InterpretationRejected(check.errors);

    this.interpretation = check.value!;
    this.relation = relateToCompetency(this.interpretation, this.evidences);

    const analyzed = new Set(
      this.relation.signals.flatMap((s) => s.evidence_refs.map((r) => r.evidence_id)),
    );

    for (const ev of this.evidences) {
      if (analyzed.has(ev.evidence_id) && ev.trust_level === "N2_EVIDENCE_PRESENTED") {
        ev.trust_level = "N3_EVIDENCE_ANALYZED";
      }
    }

    return this.relation;
  }

  missingActivities(): string[] {
    const have = new Set(this.evidences.map((e) => e.activity_id));
    return TRAIL.activities.filter((a) => !have.has(a.id)).map((a) => `${a.id} — ${a.title}`);
  }

  /** Moves a complete trail into the verification/consensus state. No human review is implied. */
  submitForVerification(): CompetencyState {
    if (!this.relation || !this.interpretation) {
      throw new TransitionError("interprete as evidências antes de enviar para verificação");
    }

    const missing = this.missingActivities();
    if (missing.length) {
      throw new TransitionError(`atividades sem evidência: ${missing.join("; ")}`);
    }

    this.state = transition(
      this.state,
      "UNDER_REVIEW",
      "system",
      "pipeline",
      `trilha completa; interpretação ${this.interpretation.interpretation_id} pronta para verificação e consenso`,
      this.env.now(),
    );

    return this.state;
  }

  /** Consensus Core is the normal decision path. */
  consensusAdvance(): ConsensusResult {
    if (this.state.value !== "UNDER_REVIEW") {
      throw new TransitionError(
        `consenso só pode ser aplicado em UNDER_REVIEW (estado atual: ${this.state.value})`,
      );
    }
    if (!this.relation) throw new TransitionError("não há interpretação para consenso");
    if (!this.evidences.every(verifyEvidenceIntegrity)) {
      throw new TransitionError("integridade da evidência falhou antes do Consensus Core");
    }

    const result = evaluateConsensus(this.evidences, this.relation);
    this.consensus = result;
    this.adjudication = undefined;

    if (result.status === "AGREEMENT") {
      this.state = transition(
        this.state,
        "DEMONSTRATED",
        "consensus",
        "consensus-core",
        "verificações independentes convergiram para todos os critérios",
        this.env.now(),
      );
    } else if (result.status === "INSUFFICIENT_EVIDENCE") {
      this.state = transition(
        this.state,
        "IN_DEVELOPMENT",
        "consensus",
        "consensus-core",
        "evidência insuficiente; novas evidências são necessárias antes de nova verificação",
        this.env.now(),
      );
    }

    return result;
  }

  /** Exceptional path: only a Consensus Core CONFLICT can trigger human adjudication. */
  adjudicate(record: AdjudicationRecord): AdjudicationOutcome {
    if (!this.consensus) throw new TransitionError("execute o Consensus Core antes da adjudicação");
    if (this.consensus.status !== "CONFLICT") {
      throw new TransitionError(
        `adjudicação humana só é permitida após CONFLICT (estado atual: ${this.consensus.status})`,
      );
    }
    if (!this.relation) throw new TransitionError("não há interpretação para adjudicação");

    this.adjudication = applyAdjudication(this.state, this.relation, this.consensus, record);
    this.consensus = { ...this.consensus, status: "HUMAN_ADJUDICATION" };
    this.state = this.adjudication.state;
    return this.adjudication;
  }

  trace(): ProvenanceTrace {
    if (
      (!this.adjudication && !this.consensus?.can_auto_advance) ||
      !this.interpretation ||
      !this.relation
    ) {
      throw new TransitionError(
        "trace disponível após consenso ou adjudicação humana",
      );
    }

    return buildTrace(
      this.evidences,
      this.extractions,
      this.interpretation,
      this.relation,
      this.adjudication,
      this.consensus,
    );
  }

  handoff(): ReviewedStateRecord {
    if (
      !this.interpretation ||
      (!this.consensus?.can_auto_advance && !this.adjudication)
    ) {
      throw new TransitionError("handoff disponível após consenso ou adjudicação humana");
    }

    return buildHandoff(
      this.evidences,
      this.interpretation,
      this.adjudication,
      this.consensus,
      this.state,
    );
  }
}
