import { describe, expect, it } from "bun:test";

import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  GOLDEN_RUNTIME_RECIPES,
} from "../packages/types/src";
import { buildCapabilityMaintenanceReport } from "./capability-maintenance-report";

function receipt(createdAt: string, mutate?: (recipes: Recipe[]) => void) {
  const recipes: Recipe[] = GOLDEN_RUNTIME_RECIPES.map((recipe) => ({
    id: recipe.id,
    definitionVersion: recipe.definitionVersion,
    success: true,
    startedAt: createdAt,
    completedAt: createdAt,
    flakyRuns: 0,
    repairMinutes: 0,
    dependencyChanges: 0,
    maintainerPresent: true,
  }));
  mutate?.(recipes);
  return {
    schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
    evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
    receiptType: "better-fullstack/capability-runtime",
    sourceSha: "a".repeat(40),
    catalogVersion: "2.9.0",
    producerFingerprint: "b".repeat(64),
    createdAt,
    toolchains: { bun: "1.3.12" },
    recipes,
  };
}

type Recipe = {
  id: (typeof GOLDEN_RUNTIME_RECIPES)[number]["id"];
  definitionVersion: number;
  success: boolean;
  startedAt: string;
  completedAt: string;
  flakyRuns: number;
  repairMinutes: number;
  dependencyChanges: number;
  maintainerPresent: boolean;
};

describe("capability maintenance report", () => {
  it("aggregates recurring cost and recommends watch or quarantine", () => {
    const first = receipt("2026-08-01T00:00:00.000Z", (recipes) => {
      recipes[0]!.flakyRuns = 1;
      recipes[0]!.repairMinutes = 30;
      recipes[0]!.dependencyChanges = 2;
    });
    const second = receipt("2026-08-23T00:00:00.000Z", (recipes) => {
      recipes[1]!.success = false;
      recipes[2]!.maintainerPresent = false;
    });

    const report = buildCapabilityMaintenanceReport([second, first]);
    expect(report.period).toEqual({
      from: "2026-08-01T00:00:00.000Z",
      to: "2026-08-23T00:00:00.000Z",
    });
    expect(report.recipes[0]).toMatchObject({
      runs: 2,
      flakyRuns: 1,
      repairMinutes: 30,
      dependencyChanges: 2,
      maintainerCoverage: 1,
      decision: "watch",
    });
    expect(report.recipes[1]).toMatchObject({ failedRuns: 1, decision: "quarantine" });
    expect(report.recipes[2]).toMatchObject({ maintainerCoverage: 0.5, decision: "quarantine" });
    expect(report.summary).toMatchObject({ watch: 1, quarantine: 2, totalFlakyRuns: 1 });
  });

  it("rejects missing receipt history", () => {
    expect(() => buildCapabilityMaintenanceReport([])).toThrow(
      "At least one capability receipt is required",
    );
  });
});
