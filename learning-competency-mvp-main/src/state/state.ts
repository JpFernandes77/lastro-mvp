/**
 * Canonical competency state transitions.
 *
 * UNDER_REVIEW means the competency is awaiting verification/consensus.
 * It does not imply that a human reviewer is required.
 */
import type { CompetencyState, CompetencyStateValue, Origin } from "../domain/types.js";

const ALLOWED: Record<CompetencyStateValue, Partial<Record<CompetencyStateValue, Origin[]>>> = {
  NOT_STARTED: { IN_DEVELOPMENT: ["system"] },
  IN_DEVELOPMENT: { UNDER_REVIEW: ["system"] },
  UNDER_REVIEW: {
    DEMONSTRATED: ["consensus", "adjudicator"],
    IN_DEVELOPMENT: ["consensus", "adjudicator"],
  },
  DEMONSTRATED: {},
};

export class TransitionError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "TransitionError";
  }
}

export function initialState(subject: string, competencyId: string): CompetencyState {
  return { subject, competency_id: competencyId, value: "NOT_STARTED", history: [] };
}

export function transition(
  state: CompetencyState,
  to: CompetencyStateValue,
  by: Origin,
  actor: string,
  reason: string,
  at: string,
): CompetencyState {
  if (state.value === to) return state;
  const who = ALLOWED[state.value][to];
  if (!who) throw new TransitionError(`transição ${state.value} → ${to} não é permitida`);
  if (!who.includes(by)) throw new TransitionError(
    `transição ${state.value} → ${to} não pode ser feita por "${by}" (permitido: ${who.join(", ")})`,
  );
  if (!reason.trim()) throw new TransitionError("toda transição precisa de um motivo registrado");
  return {
    ...state,
    value: to,
    history: [...state.history, { from: state.value, to, at, by, actor, reason }],
  };
}
