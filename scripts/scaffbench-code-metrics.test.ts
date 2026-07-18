import { describe, expect, it } from "bun:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { backfillCohortDirectory } from "./backfill-scaffbench-code-metrics";
import { buildPublishedCells } from "./build-scaffbench-2-1-data";
import { measureProjectCode } from "./scaffbench/code-metrics";
import { aggregateResults } from "./scaffbench/summary";
import type { RunResult } from "./scaffbench/types";
import { normalizeExistingCell } from "./splice-scaffbench-2-1";

function run(overrides: Partial<RunResult> = {}): RunResult {
  return {
    id: "run-1",
    specId: "spec-a",
    specTitle: "Spec A",
    model: "model",
    effort: "high",
    path: "prompt",
    trial: 1,
    promptStyle: "explicit",
    runDir: "/tmp/run-1",
    projectName: "project",
    projectDir: "/tmp/run-1/project",
    claude: { exitCode: 0, timedOut: false, durationMs: 1 },
    validation: {
      projectExists: true,
      qualityGateRequested: false,
      steps: {
        build: {
          command: "build",
          exitCode: 0,
          timedOut: false,
          durationMs: 1,
          stdoutTail: "",
          stderrTail: "",
        },
      },
    },
    stackScore: { matched: 1, total: 1, percent: 100, misses: [] },
    toolCompliance: { score: 1, total: 1, checks: [] },
    failureTags: [],
    ...overrides,
  };
}

describe("ScaffBench code metrics", () => {
  it("excludes lockfiles, sniffed/extension binaries, and nested skip directories", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "scaffbench-code-metrics-"));
    try {
      await mkdir(path.join(dir, "src", "node_modules", "pkg"), { recursive: true });
      await mkdir(path.join(dir, "src", "build"), { recursive: true });
      await writeFile(path.join(dir, "main.ts"), "first\nsecond");
      await writeFile(path.join(dir, "empty.txt"), "");
      await writeFile(path.join(dir, "bun.lock"), "lock\nlines\n");
      await writeFile(path.join(dir, "Cargo.lock"), "lock\nlines\n");
      await writeFile(path.join(dir, "picture.PNG"), "not really an image\n");
      await writeFile(path.join(dir, "opaque.data"), new Uint8Array([65, 0, 66, 10]));
      await writeFile(path.join(dir, "src", "node_modules", "pkg", "index.ts"), "ignored\n");
      await writeFile(path.join(dir, "src", "build", "bundle.js"), "ignored\n");

      expect(await measureProjectCode(dir)).toEqual({ files: 2, lines: 2, bytes: 12 });
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("counts only scored trials in cell means and macro-averages scored cells", () => {
    const aggregates = aggregateResults([
      run({ id: "a-1", trial: 1, codeMetrics: { files: 1, lines: 10, bytes: 10 } }),
      run({ id: "a-2", trial: 2, codeMetrics: { files: 1, lines: 20, bytes: 20 } }),
      run({
        id: "a-infra",
        trial: 3,
        codeMetrics: { files: 1, lines: 1_000, bytes: 1_000 },
        validation: {
          projectExists: true,
          qualityGateRequested: false,
          deferred: true,
          steps: {},
        },
      }),
      run({
        id: "b-1",
        specId: "spec-b",
        specTitle: "Spec B",
        codeMetrics: { files: 1, lines: 100, bytes: 100 },
      }),
    ]);

    expect(aggregates.bySpecCell.find((cell) => cell.specId === "spec-a")?.avgLines).toBe(15);
    expect(aggregates.bySpecCell.find((cell) => cell.specId === "spec-b")?.avgLines).toBe(100);
    expect(aggregates.leaderboard[0]?.avgLines).toBe(58);
  });

  it("publishes raw legacy metrics when available and otherwise propagates null", () => {
    const aggregate = {
      model: "model",
      effort: "high",
      path: "prompt",
      specId: "spec-a",
      scoredRuns: 1,
      passCount: 1,
      qualityScoredRuns: 0,
      qualityPassCount: 0,
      stackPercent: 100,
      commandDisciplinePercent: 100,
      medianDurationMs: 1,
    };
    const summary = {
      options: { qualityGate: false },
      results: [run({ codeMetrics: { files: 2, lines: 33, bytes: 44 } })],
      aggregates: { bySpecCell: [aggregate] },
    };
    expect(buildPublishedCells(summary, "/legacy")[0]?.lines).toBe(33);
    expect(
      buildPublishedCells(
        { ...summary, results: [run({ codeMetrics: undefined })] },
        "/legacy-null",
      )[0]?.lines,
    ).toBeNull();

    const normalized = normalizeExistingCell({
      modelKey: "model|high",
      path: "prompt",
      spec: "spec-a",
      scored: true,
      corePass: true,
      fullPass: null,
      wiredPct: 100,
      cmdPct: 100,
      costUsd: null,
      outTokens: null,
      steps: 1,
    } as never);
    expect(normalized.lines).toBeNull();
  });

  it("backfills archived results and is idempotent without --force", async () => {
    const cohortDir = await mkdtemp(path.join(tmpdir(), "scaffbench-backfill-"));
    const projectDir = path.join(cohortDir, "runs", "run-1", "project");
    try {
      await mkdir(projectDir, { recursive: true });
      await writeFile(path.join(projectDir, "source.ts"), "one\ntwo");
      await writeFile(
        path.join(cohortDir, "summary.json"),
        `${JSON.stringify(
          {
            results: [run({ projectDir, runDir: path.dirname(projectDir) })],
            aggregates: {
              bySpecCell: [
                { model: "model", effort: "high", path: "prompt", specId: "spec-a" },
              ],
            },
          },
          null,
          2,
        )}\n`,
      );

      expect(await backfillCohortDirectory(cohortDir)).toEqual({ changed: true, measured: 1 });
      const first = await readFile(path.join(cohortDir, "summary.json"), "utf8");
      const parsed = JSON.parse(first);
      expect(parsed.results[0].codeMetrics).toEqual({ files: 1, lines: 2, bytes: 7 });
      expect(parsed.aggregates.bySpecCell[0].avgLines).toBe(2);

      expect(await backfillCohortDirectory(cohortDir)).toEqual({ changed: false, measured: 0 });
      expect(await readFile(path.join(cohortDir, "summary.json"), "utf8")).toBe(first);
    } finally {
      await rm(cohortDir, { recursive: true, force: true });
    }
  });
});
