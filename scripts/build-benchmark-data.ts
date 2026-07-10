/**
 * ScaffBench 2 — publishable dataset builder.
 *
 * Transforms a harness `summary.json` (ScaffbenchSummary) into a small, stable
 * `benchmark-data.json` that the homepage chart can render directly, so the
 * published numbers are mechanically derived from the run artifacts instead of
 * hand-typed into a React component. A CI step can regenerate this and diff it
 * against the committed dataset to catch drift.
 *
 * Usage:
 *   bun run scripts/build-benchmark-data.ts <summary.json> [out.json]
 * (omit out.json to write the dataset to stdout)
 */
import { readFile, writeFile } from "node:fs/promises";

import type { ScaffbenchSummary } from "@/index";

type Aggregate = ScaffbenchSummary["aggregates"]["leaderboard"][number];

export type BenchmarkRow = {
  model: string;
  effort: string;
  effectiveReasoning?: string;
  path: string;
  scoredRuns: number;
  inconclusiveCount: number;
  /** CORE pass rate: install/build/typecheck/native compile. The headline. */
  passRate: number;
  /** Advisory tier (core + lint/format/test). Separate from passRate so a
   * formatting failure is shown as a quality miss, never as a broken project. */
  qualityPassRate: number;
  macroPassRate: number;
  passAnySpecs: number;
  passAllSpecs: number;
  specCount: number;
  index: number;
  wiredLibsPercent: number;
  faithfulnessPercent?: number;
  acceptancePercent?: number;
  commandDisciplinePercent: number;
  avgDurationMs: number;
  medianDurationMs: number;
  p95DurationMs: number;
  avgOutputTokens?: number;
  avgCostUsd?: number;
  failureTags: Record<string, number>;
};

export type BenchmarkDataset = {
  /** Benchmark version this dataset describes. */
  version: "2";
  harnessVersion: string;
  generatedAt: string;
  /** Resolved create-better-fullstack version actually exercised (from metadata). */
  generatorVersion?: string;
  promptStyle?: string;
  repeats?: number;
  specs: string[];
  rows: BenchmarkRow[];
};

function rowFromAggregate(aggregate: Aggregate): BenchmarkRow {
  return {
    model: aggregate.model,
    effort: aggregate.effort,
    effectiveReasoning: aggregate.effectiveReasoning,
    path: aggregate.path,
    scoredRuns: aggregate.scoredRuns,
    inconclusiveCount: aggregate.inconclusiveCount,
    passRate: aggregate.passRate,
    qualityPassRate: aggregate.qualityPassRate,
    macroPassRate: aggregate.macroPassRate,
    passAnySpecs: aggregate.passAnySpecs,
    passAllSpecs: aggregate.passAllSpecs,
    specCount: aggregate.specCount,
    index: aggregate.index,
    wiredLibsPercent: aggregate.stackPercent,
    faithfulnessPercent: aggregate.faithfulnessPercent,
    acceptancePercent: aggregate.acceptancePercent,
    commandDisciplinePercent: aggregate.commandDisciplinePercent,
    avgDurationMs: aggregate.avgDurationMs,
    medianDurationMs: aggregate.medianDurationMs,
    p95DurationMs: aggregate.p95DurationMs,
    avgOutputTokens: aggregate.avgOutputTokens,
    avgCostUsd: aggregate.avgCostUsd,
    failureTags: aggregate.failureTags,
  };
}

export function buildBenchmarkDataset(summary: ScaffbenchSummary): BenchmarkDataset {
  const metadata = (summary.metadata ?? {}) as Record<string, unknown>;
  const generatorVersion =
    typeof metadata.bfGeneratorVersion === "string" ? metadata.bfGeneratorVersion : undefined;
  return {
    version: "2",
    harnessVersion: summary.harnessVersion,
    generatedAt: summary.generatedAt,
    generatorVersion,
    promptStyle: summary.options?.promptStyle,
    repeats: summary.options?.repeats,
    specs: summary.specs.map((spec) => spec.id),
    // Sorted by the leaderboard's own order (descending ScaffBench Index).
    rows: summary.aggregates.leaderboard.map(rowFromAggregate),
  };
}

export function serializeBenchmarkDataset(dataset: BenchmarkDataset): string {
  return `${JSON.stringify(dataset, null, 2)}\n`;
}

if (import.meta.main) {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (!inputPath) {
    console.error("usage: bun run scripts/build-benchmark-data.ts <summary.json> [out.json]");
    process.exit(1);
  }
  const summary = JSON.parse(await readFile(inputPath, "utf8")) as ScaffbenchSummary;
  const serialized = serializeBenchmarkDataset(buildBenchmarkDataset(summary));
  if (outputPath) {
    await writeFile(outputPath, serialized);
    console.error(`Wrote ${outputPath}`);
  } else {
    process.stdout.write(serialized);
  }
}
