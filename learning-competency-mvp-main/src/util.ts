import { createHash, randomUUID } from "node:crypto";

export const sha256 = (s: string): string => createHash("sha256").update(s, "utf8").digest("hex");

/** Injectable clock and id generator so tests and the demo are deterministic. */
export interface Env {
  now: () => string;
  id: (prefix: string) => string;
}

export const defaultEnv: Env = {
  now: () => new Date().toISOString(),
  id: (prefix) => `${prefix}_${randomUUID().slice(0, 8)}`,
};

export function fixedEnv(start = "2026-09-28T12:00:00.000Z"): Env {
  let t = Date.parse(start);
  const counters: Record<string, number> = {};
  return {
    now: () => new Date((t += 1000)).toISOString(),
    id: (prefix) => `${prefix}_${String((counters[prefix] = (counters[prefix] ?? 0) + 1)).padStart(3, "0")}`,
  };
}

/** JSON with sorted keys — same object always yields the same hash (used for handoff to M3). */
export function canonicalJSON(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonicalJSON).join(",")}]`;
  if (v && typeof v === "object") {
    return `{${Object.keys(v as object)
      .sort()
      .filter((k) => (v as Record<string, unknown>)[k] !== undefined)
      .map((k) => `${JSON.stringify(k)}:${canonicalJSON((v as Record<string, unknown>)[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(v);
}

export class ValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Validation failed: ${issues.join("; ")}`);
    this.name = "ValidationError";
  }
}
