import { describe, expect, it } from "vitest";
import { canonicalJSON, sha256 } from "../src/util.js";

describe("canonicalJSON v1", () => {
  it("ordena chaves independentemente da ordem de entrada", () => {
    expect(canonicalJSON({ b: 2, a: 1 })).toBe('{"a":1,"b":2}');
    expect(canonicalJSON({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
  });

  it("preserva ordem de arrays e omite undefined em objetos", () => {
    expect(canonicalJSON({ z: undefined, a: [2, 1], b: null })).toBe('{"a":[2,1],"b":null}');
  });

  it("é determinístico para Unicode e strings escapadas", () => {
    const a = canonicalJSON({ label: "João — análise", quote: "\"evidência\"" });
    const b = canonicalJSON({ quote: "\"evidência\"", label: "João — análise" });
    expect(a).toBe(b);
    expect(sha256(a)).toBe(sha256(b));
  });
});
