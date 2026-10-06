/**
 * M2.3 — AI output contract.
 * Done when: output separates extraction, interpretation, competency signals, gaps and confidence/uncertainty.
 *
 * Rules enforced here (docs/product/USE_CASE.md §2, §6; SKILL.md §4):
 *  - AI output is a PROPOSAL. It never changes state by itself.
 *  - Every signal must cite evidence.
 *  - The AI may suggest UNDER_REVIEW at most; DEMONSTRATED requires an explicit adjudicator decision.
 *  - The AI cannot claim source verification (N4) or accreditation.
 */
import { z } from "zod";

export const CriterionIdSchema = z.enum(["C1", "C2", "C3", "C4"]);
export const SupportSchema = z.enum(["supports", "partially_supports", "does_not_support"]);

export const EvidenceRefSchema = z.object({
  evidence_id: z.string().min(1),
  field: z.string().optional(),
});

export const SignalSchema = z.object({
  signal_id: z.string().min(1),
  criterion_id: CriterionIdSchema,
  support: SupportSchema,
  rationale: z.string().min(1),
  evidence_refs: z.array(EvidenceRefSchema).min(1, "todo sinal precisa citar ao menos uma evidência"),
  confidence: z.number().min(0).max(1),
});

export const InterpretationItemSchema = z.object({
  evidence_id: z.string().min(1),
  /** What the AI reads into the evidence. Always an inference, never an observed fact. */
  statement: z.string().min(1),
  kind: z.literal("inference").default("inference"),
});

export const GapSchema = z.object({
  criterion_id: CriterionIdSchema.optional(),
  description: z.string().min(1),
  suggested_evidence: z.string().optional(),
});

export const UncertaintySchema = z.object({
  description: z.string().min(1),
  evidence_id: z.string().optional(),
});

export const AIInterpretationSchema = z
  .object({
    contract_version: z.literal("m2.ai-output.v1"),
    interpretation_id: z.string().min(1),
    subject: z.string().min(1),
    competency_id: z.string().min(1),
    generated_at: z.string().min(1),
    model: z.object({ provider: z.string().min(1), name: z.string().min(1) }),
    /** Pointers to the extraction results the AI was given (the extraction itself stays in M2.2 output). */
    extraction_refs: z.array(z.string()).min(1),
    interpretations: z.array(InterpretationItemSchema),
    signals: z.array(SignalSchema),
    gaps: z.array(GapSchema),
    uncertainty: z.array(UncertaintySchema),
    overall_confidence: z.number().min(0).max(1),
    proposed_state: z.enum(["IN_DEVELOPMENT", "UNDER_REVIEW"]),
    /** Always true: marks the whole object as a proposal awaiting Consensus Core evaluation. */
    requires_consensus: z.literal(true),
  })
  .strict();

export type AIInterpretation = z.infer<typeof AIInterpretationSchema>;
export type Signal = z.infer<typeof SignalSchema>;

const FORBIDDEN_CLAIMS = [
  /\bcompet[eê]ncia (foi )?(comprovada|demonstrada|certificada)\b/i,
  /\bverificad[oa] (pela|junto [aà]) (institui[cç][aã]o|fonte)\b/i,
  /\bacreditad[oa]\b/i,
  /\bfraude\b/i,
  /\bcompetency (is )?(proven|certified)\b/i,
];

export interface AIContractContext {
  subject: string;
  competency_id: string;
  extraction_refs: string[];
}

export interface ContractCheck {
  ok: boolean;
  value?: AIInterpretation;
  errors: string[];
}

/**
 * Parses untrusted AI output. Invalid output is never "fixed" silently — it is rejected with reasons,
 * so the pipeline can surface it as uncertainty to the adjudicator.
 */
export function parseAIOutput(raw: unknown, knownEvidenceIds: string[], context?: AIContractContext): ContractCheck {
  const parsed = AIInterpretationSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`) };
  }
  const v = parsed.data;
  const errors: string[] = [];
  const known = new Set(knownEvidenceIds);
  const ids = new Set<string>();
  if (context) {
    if (v.subject !== context.subject) errors.push("subject da interpretação não corresponde à sessão atual");
    if (v.competency_id !== context.competency_id) errors.push("competency_id da interpretação não corresponde à competência atual");
    const expected = new Set(context.extraction_refs);
    const actual = new Set(v.extraction_refs);
    if (expected.size !== actual.size || [...expected].some((id) => !actual.has(id))) errors.push("extraction_refs não correspondem às extrações fornecidas à IA");
  }
  for (const s of v.signals) {
    if (ids.has(s.signal_id)) errors.push(`signal_id duplicado: ${s.signal_id}`);
    ids.add(s.signal_id);
    for (const r of s.evidence_refs) if (!known.has(r.evidence_id)) errors.push(`${s.signal_id} cita evidência inexistente: ${r.evidence_id}`);
  }
  for (const it of v.interpretations) if (!known.has(it.evidence_id)) errors.push(`interpretação cita evidência inexistente: ${it.evidence_id}`);
  const text = [...v.signals.map((s) => s.rationale), ...v.interpretations.map((i) => i.statement)].join("\n");
  for (const re of FORBIDDEN_CLAIMS) if (re.test(text)) errors.push(`afirmação proibida para a IA: ${re.source}`);
  return errors.length ? { ok: false, errors } : { ok: true, value: v, errors: [] };
}

/** JSON Schema-ish description sent to LLM providers so they answer in this exact shape. */
export const AI_OUTPUT_INSTRUCTIONS = `Responda SOMENTE com um objeto JSON com as chaves:
contract_version ("m2.ai-output.v1"), interpretation_id, subject, competency_id, generated_at, model {provider,name},
extraction_refs [string], interpretations [{evidence_id, statement, kind:"inference"}],
signals [{signal_id, criterion_id ("C1"|"C2"|"C3"|"C4"), support ("supports"|"partially_supports"|"does_not_support"), rationale, evidence_refs [{evidence_id, field?}], confidence 0..1}],
gaps [{criterion_id?, description, suggested_evidence?}], uncertainty [{description, evidence_id?}],
overall_confidence 0..1, proposed_state ("IN_DEVELOPMENT"|"UNDER_REVIEW"), requires_consensus: true.
Regras: você propõe, não decide. Não afirme que a competência foi comprovada, não declare verificação institucional,
não acuse fraude, não invente evidências. Cite apenas evidence_id fornecidos. Um sinal por critério C1–C4.`;
