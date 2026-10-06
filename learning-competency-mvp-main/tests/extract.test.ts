import { describe, expect, it } from "vitest";
import { ingestEvidence } from "../src/evidence/ingest.js";
import { normalizeEvidence } from "../src/evidence/normalize.js";
import { extractFields } from "../src/evidence/extract.js";
import { ANA } from "../src/scenario.js";
import { fixedEnv } from "../src/util.js";
import type { EvidenceSubmission } from "../src/domain/types.js";

const run = (sub: EvidenceSubmission) => {
  const env = fixedEnv();
  const known = sub.type === "analysis_result" ? [ingestEvidence(ANA.analysis(), [], env)] : [];
  const ev = ingestEvidence({ ...sub, relatedEvidenceIds: known.map((k) => k.evidence_id) }, known, env);
  return { ev, ex: extractFields(normalizeEvidence(ev)) };
};

describe("M2.2 — normalização e extração", () => {
  it("todo campo extraído aponta para um trecho real da evidência", () => {
    for (const sub of [ANA.briefing(), ANA.preparation(), ANA.analysis(), ANA.results(), ANA.synthesis()]) {
      const { ev, ex } = run(sub);
      expect(ex.fields.length).toBeGreaterThan(0);
      for (const f of ex.fields) {
        expect(f.origin).toBe("evidence");
        expect(f.source.evidence_id).toBe(ev.evidence_id);
        // the locator resolves to a real segment of the original, and the excerpt comes from it
        const seg = normalizeEvidence(ev).segments.find((x) => x.locator === f.source.locator);
        expect(seg, `${f.name} → ${f.source.locator}`).toBeDefined();
        expect(seg!.text.replace(/\s+/g, " ")).toContain(f.source.excerpt.slice(0, 40));
      }
    }
  });

  it("briefing: extrai pergunta, objetivo e indicador", () => {
    const { ex } = run(ANA.briefing());
    const names = ex.fields.map((f) => f.name);
    expect(names).toEqual(expect.arrayContaining(["analytical_question", "objective", "expected_indicator"]));
    expect(ex.fields.find((f) => f.name === "analytical_question")!.value).toMatch(/quais fatores/);
  });

  it("notebook: localiza células e saídas executadas", () => {
    const { ex } = run(ANA.analysis());
    const src = ex.fields.find((f) => f.name === "data_sources")!;
    expect(src.value).toEqual(["dados/atendimentos_2026_limpo.csv"]);
    expect(src.source.locator).toMatch(/^cell:\d+$/);
    expect(ex.fields.find((f) => f.name === "has_executed_outputs")!.value).toBe(true);
  });

  it("registra ausências observáveis sem julgar", () => {
    const { ex } = run({ ...ANA.synthesis(), content: "# Síntese\n\n## Conclusão\nO TMA subiu no telefone." });
    expect(ex.missing).toEqual(expect.arrayContaining(["limitations", "audience"]));
    expect(ex.fields.map((f) => f.name)).toContain("conclusion");
  });
});
