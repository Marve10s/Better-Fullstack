import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { measureProjectCode } from "./scaffbench/code-metrics";
import { scoredOutcome } from "./scaffbench/scoring";
import type { RunResult } from "./scaffbench/types";

export const DEFAULT_COHORT_DIRS = [
  "testing/llm-benchmarks/v2-codex-sol/gpt-5-6-sol-high-r3-2026-07-17",
  "testing/llm-benchmarks/v2-codex-terra/gpt-5-6-terra-high-r3-2026-07-17",
  "testing/llm-benchmarks/v2-codex-luna/gpt-5-6-luna-high-r3-2026-07-17",
] as const;

function sameCell(aggregate: any, result: RunResult) {
  return (
    aggregate.specId === result.specId &&
    aggregate.model === result.model &&
    aggregate.effort === result.effort &&
    aggregate.path === result.path
  );
}

function avgLines(results: readonly RunResult[]) {
  const lines = results
    .filter(scoredOutcome)
    .flatMap((result) =>
      typeof result.codeMetrics?.lines === "number" ? [result.codeMetrics.lines] : [],
    );
  return lines.length > 0
    ? Math.round(lines.reduce((sum, value) => sum + value, 0) / lines.length)
    : null;
}

export async function backfillCohortDirectory(cohortDir: string, force = false) {
  const summaryPath = path.join(cohortDir, "summary.json");
  const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
  const results = summary.results as RunResult[];
  let measured = 0;
  let changed = false;

  for (const result of results) {
    if (!result.projectDir || !existsSync(result.projectDir)) continue;
    if (!force && result.codeMetrics) continue;

    // Cohort archives were already pruned of dependency/build trees. Applying
    // the same skip list here therefore changes no archived source coverage.
    result.codeMetrics = await measureProjectCode(result.projectDir);
    measured += 1;
    changed = true;
  }

  for (const aggregate of summary.aggregates?.bySpecCell ?? []) {
    const next = avgLines(results.filter((result) => sameCell(aggregate, result)));
    if (aggregate.avgLines !== next) {
      aggregate.avgLines = next;
      changed = true;
    }
  }

  if (changed) writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
  return { changed, measured };
}

async function main() {
  const force = process.argv.slice(2).includes("--force");
  const argvDirs = process.argv.slice(2).filter((argument) => argument !== "--force");
  const dirs =
    argvDirs.length > 0
      ? argvDirs
      : DEFAULT_COHORT_DIRS.map((cohortDir) => path.resolve(import.meta.dir, "..", cohortDir));
  for (const cohortDir of dirs) {
    const result = await backfillCohortDirectory(cohortDir, force);
    console.log(
      `${cohortDir}: ${result.measured} project${result.measured === 1 ? "" : "s"} measured${
        result.changed ? "" : " (unchanged)"
      }`,
    );
  }
}

if (import.meta.main) await main();
