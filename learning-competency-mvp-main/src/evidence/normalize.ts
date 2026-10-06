/**
 * M2.2 (part 1) — Normalization.
 * Converts raw content into stable segments. Never destroys the reference to the original:
 * every segment keeps a locator (line/cell) back into the source.
 */
import type { Evidence, NormalizedEvidence } from "../domain/types.js";

type Segment = NormalizedEvidence["segments"][number];

function fromLines(text: string): Segment[] {
  const out: Segment[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let inCode = false;
  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const locator = `line:${i + 1}`;
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      return;
    }
    if (!line.trim()) return;
    if (inCode) out.push({ locator, kind: "code", text: line });
    else if (/^\s*#{1,6}\s+/.test(line)) out.push({ locator, kind: "heading", text: line.replace(/^\s*#{1,6}\s+/, "").trim() });
    else if (/^\s*\|.*\|\s*$/.test(line)) out.push({ locator, kind: "table", text: line.trim() });
    else out.push({ locator, kind: "text", text: line.trim() });
  });
  return out;
}

function fromNotebook(json: string): Segment[] {
  const nb = JSON.parse(json) as { cells: Array<{ cell_type: string; source: string | string[]; outputs?: unknown[] }> };
  const out: Segment[] = [];
  nb.cells.forEach((cell, ci) => {
    const src = Array.isArray(cell.source) ? cell.source.join("") : cell.source ?? "";
    const base = `cell:${ci + 1}`;
    if (cell.cell_type === "markdown") {
      fromLines(src).forEach((s) => out.push({ ...s, locator: `${base}/${s.locator}` }));
    } else if (cell.cell_type === "code") {
      if (src.trim()) out.push({ locator: base, kind: "code", text: src.trim() });
      for (const [oi, o] of (cell.outputs ?? []).entries()) {
        const text = outputText(o);
        if (text) out.push({ locator: `${base}/output:${oi + 1}`, kind: "output", text });
      }
    }
  });
  return out;
}

function outputText(o: unknown): string {
  const obj = o as { text?: string | string[]; data?: Record<string, string | string[]> };
  const pick = obj.text ?? obj.data?.["text/plain"];
  if (!pick) return "";
  return (Array.isArray(pick) ? pick.join("") : pick).trim();
}

export function normalizeEvidence(ev: Evidence): NormalizedEvidence {
  let segments: Segment[];
  switch (ev.format) {
    case "ipynb":
      segments = fromNotebook(ev.content);
      break;
    case "csv":
      segments = ev.content
        .split(/\r?\n/)
        .map((l, i) => ({ locator: `line:${i + 1}`, kind: "table" as const, text: l.trim() }))
        .filter((s) => s.text);
      break;
    default:
      segments = fromLines(ev.content);
  }
  return { evidence_id: ev.evidence_id, type: ev.type, segments };
}
