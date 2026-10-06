import { describe, expect, it } from "vitest";
import { ingestEvidence, verifyEvidenceIntegrity } from "../src/evidence/ingest.js";
import { ANA } from "../src/scenario.js";
import { fixedEnv, ValidationError } from "../src/util.js";

describe("M2.1 — ingestão de evidências", () => {
  it("registra evidência válida com metadados mínimos e proveniência", () => {
    const ev = ingestEvidence(ANA.briefing(), [], fixedEnv());
    expect(ev).toMatchObject({ type: "briefing", activity_id: "A1", submitted_by: "person:ana-synthetic", trust_level: "N2_EVIDENCE_PRESENTED" });
    expect(ev.evidence_id).toBeTruthy();
    expect(ev.submitted_at).toBeTruthy();
    expect(ev.content_ref).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(ev.provenance).toMatchObject({ sourceRef: "fixtures/synthetic/ana/a1_briefing.md", activityId: "A1", synthetic: true });
  });

  it("recusa tipo fora do contrato", () => {
    expect(() => ingestEvidence({ ...ANA.briefing(), type: "video" as never }, [], fixedEnv())).toThrow(ValidationError);
  });

  it("recusa evidência na atividade errada", () => {
    expect(() => ingestEvidence({ ...ANA.briefing(), activityId: "A3" }, [], fixedEnv())).toThrow(/não é aceita na atividade A3/);
  });

  it("exige autor, origem e conteúdo", () => {
    try {
      ingestEvidence({ ...ANA.briefing(), submittedBy: " ", sourceRef: "", content: "" }, [], fixedEnv());
      expect.unreachable();
    } catch (e) {
      const issues = (e as ValidationError).issues.join(" | ");
      expect(issues).toMatch(/submittedBy/);
      expect(issues).toMatch(/sourceRef/);
      expect(issues).toMatch(/content/);
    }
  });

  it("analysis_result precisa referenciar o artefato que o gerou", () => {
    expect(() => ingestEvidence(ANA.results(), [], fixedEnv())).toThrow(/precisa referenciar/);
    const env = fixedEnv();
    const art = ingestEvidence(ANA.analysis(), [], env);
    const res = ingestEvidence({ ...ANA.results(), relatedEvidenceIds: [art.evidence_id] }, [art], env);
    expect(res.related_evidence_ids).toEqual([art.evidence_id]);
  });

  it("recusa notebook inválido", () => {
    expect(() => ingestEvidence({ ...ANA.preparation(), content: "{not json" }, [], fixedEnv())).toThrow(/ipynb não é JSON/);
  });

  it("detecta evidência alterada depois da ingestão", () => {
    const ev = ingestEvidence(ANA.briefing(), [], fixedEnv());
    expect(verifyEvidenceIntegrity(ev)).toBe(true);
    expect(verifyEvidenceIntegrity({ ...ev, content: ev.content + " editado" })).toBe(false);
  });
});
