import { describe, expect, it } from "bun:test";

import { buildBenchmarkDataset, serializeBenchmarkDataset } from "./build-benchmark-data";
import type { ScaffbenchSummary } from "@/index";

function fixtureSummary(): ScaffbenchSummary {
  return {
    harnessVersion: "2.0.0",
    generatedAt: "2026-06-26T00:00:00.000Z",
    metadata: { bfGeneratorVersion: "2.1.1", environmentQualified: true },
    options: { promptStyle: "explicit", repeats: 3 },
    specs: [{ id: "ai-search-workbench" }, { id: "rust-leptos-axum" }],
    aggregates: {
      bySpecCell: [],
      leaderboard: [
        {
          key: "claude-opus-4-8|high|mcp",
          model: "claude-opus-4-8",
          effort: "high",
          effectiveReasoning: "high",
          path: "mcp",
          runs: 6,
          scoredRuns: 6,
          inconclusiveCount: 0,
          passCount: 6,
          passRate: 100,
          passCi95: { low: 61, high: 100 },
          ciReportable: false,
          specCount: 2,
          macroPassRate: 100,
          passAnySpecs: 2,
          passAllSpecs: 2,
          index: 95,
          stackPercent: 100,
          faithfulnessPercent: 100,
          commandDisciplinePercent: 100,
          avgDurationMs: 60_000,
          medianDurationMs: 58_000,
          p95DurationMs: 82_000,
          avgOutputTokens: 4000,
          avgCostUsd: 1.2,
          failureTags: {},
        },
      ],
    },
    results: [],
    // unused-by-builder fields the real summary carries:
    specsMeta: undefined,
  } as unknown as ScaffbenchSummary;
}

describe("ScaffBench 2 benchmark dataset builder", () => {
  it("derives a publishable dataset from a harness summary", () => {
    const dataset = buildBenchmarkDataset(fixtureSummary());

    expect(dataset.version).toBe("2");
    expect(dataset.harnessVersion).toBe("2.0.0");
    expect(dataset.generatorVersion).toBe("2.1.1");
    expect(dataset.promptStyle).toBe("explicit");
    expect(dataset.repeats).toBe(3);
    expect(dataset.specs).toEqual(["ai-search-workbench", "rust-leptos-axum"]);

    expect(dataset.rows).toHaveLength(1);
    expect(dataset.rows[0]).toMatchObject({
      model: "claude-opus-4-8",
      path: "mcp",
      index: 95,
      macroPassRate: 100,
      wiredLibsPercent: 100, // mapped from aggregate.stackPercent
      passAllSpecs: 2,
      medianDurationMs: 58_000,
      avgCostUsd: 1.2,
    });
  });

  it("is deterministic and round-trips through JSON (drift-check foundation)", () => {
    const a = serializeBenchmarkDataset(buildBenchmarkDataset(fixtureSummary()));
    const b = serializeBenchmarkDataset(buildBenchmarkDataset(fixtureSummary()));
    expect(a).toBe(b);
    expect(JSON.parse(a).rows[0].wiredLibsPercent).toBe(100);
  });

  it("tolerates a summary without generator metadata", () => {
    const summary = fixtureSummary();
    (summary as unknown as { metadata: Record<string, unknown> }).metadata = {};
    expect(buildBenchmarkDataset(summary).generatorVersion).toBeUndefined();
  });
});
