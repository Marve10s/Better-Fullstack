import { describe, expect, it } from "bun:test";

import {
  assertRecommendationEvaluationGate,
  runRecommendationEvaluation,
} from "./recommendation-evaluation";

describe("deterministic recommendation evaluation", () => {
  it("keeps the deterministic product when its controlled gate passes", () => {
    const report = assertRecommendationEvaluationGate();

    expect(report.baseline.accuracy).toBeGreaterThanOrEqual(report.gate.requiredAccuracy);
    expect(report.baseline.deterministic).toBe(true);
    expect(report.baseline.schemaValid).toBe(true);
    expect(report.baseline.constraintsPresent).toBe(true);
    expect(report.decision).toBe("keep-deterministic");
    expect(report.modelEvaluation).toMatchObject({
      status: "not-triggered",
      modelLayerEnabled: false,
    });
  });

  it("returns only bounded fixture IDs and aggregate facts, not brief content", () => {
    const serialized = JSON.stringify(runRecommendationEvaluation());

    expect(serialized).not.toContain("brief");
    expect(serialized).not.toContain("subscription billing product");
    expect(serialized).toContain('"promptTelemetryCollected":false');
  });
});
