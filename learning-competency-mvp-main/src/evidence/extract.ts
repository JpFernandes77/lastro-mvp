/**
 * M2.2 (part 2) — Extraction.
 * Extracts ONLY information observable in the evidence. No judgment, no inference.
 * Done when: extracted fields can be traced back to source material (every field carries a SourceLocator).
 */
import type { ExtractedField, ExtractionResult, NormalizedEvidence } from "../domain/types.js";

type Seg = NormalizedEvidence["segments"][number];

const field = (ev: NormalizedEvidence, name: string, value: ExtractedField["value"], seg: Seg): ExtractedField => ({
  name,
  value,
  origin: "evidence",
  source: { evidence_id: ev.evidence_id, locator: seg.locator, excerpt: seg.text.replace(/\s+/g, " ").slice(0, 200) },
});

/** Finds "Label: value" or a heading "Label" followed by text. Returns the value and the segment it came from. */
function labeled(ev: NormalizedEvidence, labels: RegExp): { value: string; seg: Seg } | null {
  const segs = ev.segments;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i]!;
    if (s.kind === "text" || s.kind === "heading") {
      const m = s.text.match(new RegExp(`^\\**(?:${labels.source})\\**\\s*[:\\-–]\\s*(.+)$`, "i"));
      if (m?.[1]) return { value: m[1].replace(/\*+/g, "").trim(), seg: s };
    }
    if (s.kind === "heading" && new RegExp(`^(?:${labels.source})\\b`, "i").test(s.text)) {
      const body = sectionBody(segs, i);
      if (body.length) return { value: body.map((b) => b.text).join(" "), seg: body[0]! };
    }
  }
  return null;
}

/** Text segments under a heading, until the next heading. */
function sectionBody(segs: Seg[], headingIdx: number): Seg[] {
  const out: Seg[] = [];
  for (let j = headingIdx + 1; j < segs.length && segs[j]!.kind !== "heading"; j++) {
    if (segs[j]!.kind === "text") out.push(segs[j]!);
  }
  return out;
}

function extractBriefing(ev: NormalizedEvidence, fields: ExtractedField[], missing: string[]) {
  const q = labeled(ev, /pergunta anal[ií]tica|pergunta|question/) ??
    (() => {
      const seg = ev.segments.find((s) => s.kind === "text" && s.text.includes("?"));
      return seg ? { value: seg.text, seg } : null;
    })();
  q ? fields.push(field(ev, "analytical_question", q.value, q.seg)) : missing.push("analytical_question");

  const bq = labeled(ev, /problema de neg[oó]cio|contexto|business problem/);
  bq ? fields.push(field(ev, "business_problem", bq.value, bq.seg)) : missing.push("business_problem");

  const obj = labeled(ev, /objetivo|objective/);
  obj ? fields.push(field(ev, "objective", obj.value, obj.seg)) : missing.push("objective");

  const ind = labeled(ev, /indicador|resultado esperado|m[eé]trica|expected outcome/);
  ind ? fields.push(field(ev, "expected_indicator", ind.value, ind.seg)) : missing.push("expected_indicator");
}

function extractArtifact(ev: NormalizedEvidence, fields: ExtractedField[], missing: string[]) {
  const code = ev.segments.filter((s) => s.kind === "code");
  const first = ev.segments[0];
  if (!code.length || !first) {
    missing.push("code");
    return;
  }
  fields.push(field(ev, "code_block_count", code.length, code[0]!));

  const langs = new Set<string>();
  for (const c of code) {
    if (/\bimport\s+\w+|\bdef\s+\w+\(|pd\.|\.read_csv\(/.test(c.text)) langs.add("python");
    if (/\bSELECT\b[\s\S]*\bFROM\b/i.test(c.text)) langs.add("sql");
  }
  if (langs.size) fields.push(field(ev, "languages", [...langs], code[0]!));

  const sources: { v: string; seg: Seg }[] = [];
  for (const c of code) {
    for (const m of c.text.matchAll(/read_(?:csv|excel|parquet|json)\(\s*["']([^"']+)["']/g)) sources.push({ v: m[1]!, seg: c });
    for (const m of c.text.matchAll(/\bFROM\s+([\w.]+)/gi)) sources.push({ v: m[1]!, seg: c });
  }
  sources.length
    ? fields.push(field(ev, "data_sources", [...new Set(sources.map((s) => s.v))], sources[0]!.seg))
    : missing.push("data_sources");

  const steps = ev.segments.filter((s) => s.kind === "heading" || (s.kind === "code" && /^#\s/.test(s.text)));
  steps.length
    ? fields.push(field(ev, "documented_steps", steps.map((s) => s.text.split("\n")[0]!.replace(/^#\s*/, "")), steps[0]!))
    : missing.push("documented_steps");

  const outputs = ev.segments.filter((s) => s.kind === "output");
  fields.push(field(ev, "has_executed_outputs", outputs.length > 0, outputs[0] ?? code[0]!));
}

function extractResult(ev: NormalizedEvidence, fields: ExtractedField[], missing: string[]) {
  const tableRows = ev.segments.filter((s) => s.kind === "table" && !/^\|?\s*:?-{2,}/.test(s.text));
  // A markdown table = consecutive table rows; count separator rows as table starts.
  const tables = ev.segments.filter((s) => s.kind === "table" && /^\|?\s*:?-{3,}/.test(s.text.replace(/\|/g, "|").trim()));
  if (tableRows.length) fields.push(field(ev, "table_count", Math.max(tables.length, 1), tableRows[0]!));
  else missing.push("tables");

  const figs = ev.segments.filter((s) => /!\[[^\]]*\]\([^)]+\)|\bfigura\b|\bgr[aá]fico\b/i.test(s.text));
  if (figs.length) fields.push(field(ev, "figure_count", figs.length, figs[0]!));

  const numeric = ev.segments.filter((s) => (s.kind === "text" || s.kind === "output") && /\d+(?:[.,]\d+)?\s*(%|min|pp|x\b)/i.test(s.text));
  numeric.length
    ? fields.push(field(ev, "quantitative_findings", numeric.slice(0, 5).map((s) => s.text), numeric[0]!))
    : missing.push("quantitative_findings");
}

function extractCommunication(ev: NormalizedEvidence, fields: ExtractedField[], missing: string[]) {
  const concl = labeled(ev, /conclus[aã]o|conclus[oõ]es|conclusion/);
  concl ? fields.push(field(ev, "conclusion", concl.value, concl.seg)) : missing.push("conclusion");

  const lim = labeled(ev, /limita[cç][aã]o|limita[cç][oõ]es|limitations/);
  lim ? fields.push(field(ev, "limitations", lim.value, lim.seg)) : missing.push("limitations");

  const aud = labeled(ev, /p[uú]blico|audi[eê]ncia|audience/);
  aud ? fields.push(field(ev, "audience", aud.value, aud.seg)) : missing.push("audience");

  const ev_used = labeled(ev, /evid[eê]ncias utilizadas|base de dados|evidence used/);
  ev_used ? fields.push(field(ev, "evidence_cited", ev_used.value, ev_used.seg)) : missing.push("evidence_cited");
}

export function extractFields(ev: NormalizedEvidence): ExtractionResult {
  const fields: ExtractedField[] = [];
  const missing: string[] = [];
  switch (ev.type) {
    case "briefing":
      extractBriefing(ev, fields, missing);
      break;
    case "analysis_artifact":
      extractArtifact(ev, fields, missing);
      break;
    case "analysis_result":
      extractResult(ev, fields, missing);
      break;
    case "communication":
      extractCommunication(ev, fields, missing);
      break;
  }
  return { evidence_id: ev.evidence_id, type: ev.type, fields, missing };
}
