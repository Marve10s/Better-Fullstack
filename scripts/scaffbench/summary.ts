import * as Effect from "effect/Effect";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  BenchmarkSpec,
  Effort,
  PublicationEligibility,
  RunOutcome,
  RunResult,
  ScaffbenchOptions,
  ScaffbenchSummary,
  SummaryAggregate,
} from "@/types";

import { agentLabelForModel, providerForModel } from "@/agents";
import {
  indexWeightsForPath,
  resolvedBfVersion,
  SCAFFBENCH_INDEX_WEIGHTS,
  MIN_CI_RUNS,
  MIN_RANKED_TRIALS,
  HARNESS_VERSION,
  PROMPT_VERSION,
  SCAFFBENCH_SUITE_VERSION,
  VALIDATION_CACHE_VERSION,
  tryCommandText,
} from "@/constants";
import { validationPassed, qualityPassed, classifyOutcome, scoredOutcome } from "@/scoring";

export function aggregateResults(results: readonly RunResult[]) {
  return {
    bySpecCell: aggregateBy(results, (result) =>
      [result.specId, result.model, result.effort, result.path].join("|"),
    ),
    leaderboard: aggregateBy(results, (result) =>
      [result.model, result.effort, result.path].join("|"),
    ),
  };
}

function aggregateBy(
  results: readonly RunResult[],
  keyFor: (result: RunResult) => string,
): SummaryAggregate[] {
  const groups = new Map<string, RunResult[]>();
  for (const result of results) {
    const key = keyFor(result);
    groups.set(key, [...(groups.get(key) ?? []), result]);
  }
  return [...groups.entries()]
    .map(([key, group]) => {
      const first = group[0];
      if (!first) throw new Error(`empty aggregate group: ${key}`);
      const scored = group.filter(scoredOutcome);
      const inconclusiveCount = group.length - scored.length;
      const passCount = scored.filter(validationPassed).length;
      const qualityMeasured = scored.filter((result) => qualityPassed(result) !== "na");
      const qualityPassCount = qualityMeasured.filter(
        (result) => qualityPassed(result) === true,
      ).length;
      const ci = wilsonInterval(passCount, scored.length);

      // Per-spec macro statistics: treat each spec as a unit rather than pooling
      // heterogeneous-difficulty specs into one binomial (which understates
      // variance). pass@k / pass^k summarise reliability across repeats.
      // Track total repeats (from the full group) alongside scored/pass so that
      // pass^k cannot be overstated: a spec with one passing scored repeat and
      // the rest infra-inconclusive must NOT count as "passed every repeat".
      const bySpec = new Map<string, { total: number; scored: number; pass: number }>();
      for (const result of group) {
        const entry = bySpec.get(result.specId) ?? { total: 0, scored: 0, pass: 0 };
        entry.total += 1;
        if (scoredOutcome(result)) {
          entry.scored += 1;
          if (validationPassed(result)) entry.pass += 1;
        }
        bySpec.set(result.specId, entry);
      }
      const specEntries = [...bySpec.values()];
      // Macro pass rate averages only specs that were actually measured.
      const measuredSpecs = specEntries.filter((entry) => entry.scored > 0);
      const macroPassRate = average(
        measuredSpecs.map((entry) => (entry.pass / entry.scored) * 100),
      );
      // pass^k: passed on EVERY repeat (all repeats measured and passing).
      const passAllSpecs = specEntries.filter((entry) => entry.pass === entry.total).length;
      // pass@k: passed on at least one repeat.
      const passAnySpecs = specEntries.filter((entry) => entry.pass > 0).length;

      // Every composite component uses the same eligible trial set as validation.
      const stackPercent = average(scored.map((result) => result.stackScore.percent));
      const commandDisciplinePercent = average(
        scored.map((result) =>
          result.toolCompliance.total > 0
            ? Math.round((result.toolCompliance.score / result.toolCompliance.total) * 100)
            : 0,
        ),
      );
      const weights = indexWeightsForPath(first.path);
      const index = Math.round(
        weights.validation * macroPassRate +
          weights.wiredLibs * stackPercent +
          weights.discipline * commandDisciplinePercent,
      );
      const durations = group.map((result) => result.claude.durationMs);

      return {
        key,
        specId: key.startsWith(first.specId) ? first.specId : undefined,
        model: first.model,
        effort: first.effort,
        effectiveReasoning: first.effectiveReasoning,
        path: first.path,
        runs: group.length,
        scoredRuns: scored.length,
        inconclusiveCount,
        passCount,
        passRate: scored.length > 0 ? Math.round((passCount / scored.length) * 100) : 0,
        qualityPassCount,
        qualityScoredRuns: qualityMeasured.length,
        qualityPassRate:
          qualityMeasured.length > 0
            ? Math.round((qualityPassCount / qualityMeasured.length) * 100)
            : 0,
        passCi95: ci,
        ciReportable: scored.length >= MIN_CI_RUNS,
        specCount: specEntries.length,
        macroPassRate,
        passAnySpecs,
        passAllSpecs,
        stackPercent,
        faithfulnessPercent: maybeAverage(
          scored.map((result) => result.generatorFaithfulness?.percent),
        ),
        acceptancePercent: maybeAverage(scored.map((result) => result.acceptanceScore?.percent)),
        commandDisciplinePercent,
        index,
        avgDurationMs: average(durations),
        medianDurationMs: percentile(durations, 50),
        p95DurationMs: percentile(durations, 95),
        avgOutputTokens: maybeAverage(group.map((result) => result.claude.outputTokens)),
        avgCostUsd: maybeAveragePrecise(group.map((result) => result.claude.totalCostUsd)),
        failureTags: countFailureTags(group),
        outcomeCounts: countOutcomes(group),
        publicationEligibility: publicationEligibility(group),
      };
    })
    .sort(
      (a, b) =>
        b.index - a.index || b.macroPassRate - a.macroPassRate || a.avgDurationMs - b.avgDurationMs,
    );
}

function countOutcomes(group: readonly RunResult[]) {
  const counts: Partial<Record<RunOutcome, number>> = {};
  for (const result of group) {
    const outcome = classifyOutcome(result);
    counts[outcome] = (counts[outcome] ?? 0) + 1;
  }
  return counts;
}

export function publicationEligibility(group: readonly RunResult[]): PublicationEligibility {
  if (group.length === 0 || group.some((result) => !result.provenance)) return "exploratory";
  const signatures = new Set(
    group.map((result) => {
      const provenance = result.provenance!;
      return JSON.stringify([
        provenance.suiteVersion,
        provenance.harnessVersion,
        provenance.validationCacheVersion,
        provenance.promptVersion,
        provenance.agentAdapter,
      ]);
    }),
  );
  if (signatures.size !== 1) return "exploratory";
  const trialsBySpec = new Map<string, Set<number>>();
  for (const result of group) {
    const trials = trialsBySpec.get(result.specId) ?? new Set<number>();
    trials.add(result.trial);
    trialsBySpec.set(result.specId, trials);
    if ((result.provenance?.configuredTrials ?? 0) < MIN_RANKED_TRIALS) return "exploratory";
  }
  return [...trialsBySpec.values()].every((trials) => trials.size >= MIN_RANKED_TRIALS)
    ? "ranked"
    : "exploratory";
}

function wilsonInterval(successes: number, total: number) {
  if (total === 0) return { low: 0, high: 0 };
  const z = 1.96;
  const p = successes / total;
  const denom = 1 + (z * z) / total;
  const center = p + (z * z) / (2 * total);
  const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * total)) / total);
  return {
    low: Math.max(0, Math.round(((center - margin) / denom) * 100)),
    high: Math.min(100, Math.round(((center + margin) / denom) * 100)),
  };
}

function average(values: readonly number[]) {
  if (values.length === 0) return 0;
  return Math.round(averagePrecise(values));
}

/** Unrounded mean — used for sub-unit quantities like USD cost, where rounding
 * to a whole number before formatting would print a $0.40 mean as `0.000`. */
function averagePrecise(values: readonly number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Nearest-rank percentile (p in 0..100), rounded. Wall-clock and cost move with
 * provider load, so median/p95 are reported alongside the mean. */
function percentile(values: readonly number[], p: number) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = Math.ceil((p / 100) * sorted.length);
  const index = Math.min(sorted.length - 1, Math.max(0, rank - 1));
  return Math.round(sorted[index] ?? 0);
}

function maybeAverage(values: readonly (number | undefined)[]) {
  const present = values.filter((value): value is number => typeof value === "number");
  return present.length > 0 ? average(present) : undefined;
}

function maybeAveragePrecise(values: readonly (number | undefined)[]) {
  const present = values.filter((value): value is number => typeof value === "number");
  return present.length > 0 ? averagePrecise(present) : undefined;
}

function countFailureTags(group: readonly RunResult[]) {
  const counts: Record<string, number> = {};
  for (const result of group) {
    for (const tag of result.failureTags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return counts;
}

export async function writeSummary(
  outDir: string,
  results: readonly RunResult[],
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
  metadata: Record<string, unknown>,
) {
  const { listSpecs, writeMatrixOnly, ...summaryOptions } = options;
  void listSpecs;
  void writeMatrixOnly;
  const persistedResults = results.map((result) => ({
    ...result,
    outcome: classifyOutcome(result),
  }));
  const aggregates = aggregateResults(persistedResults);
  const summary: ScaffbenchSummary = {
    harnessVersion: HARNESS_VERSION,
    generatedAt: new Date().toISOString(),
    options: summaryOptions,
    metadata: {
      ...metadata,
      publicationEligibility: Object.fromEntries(
        aggregates.leaderboard.map((row) => [row.key, row.publicationEligibility]),
      ),
    },
    specs: [...specs],
    aggregates,
    results: persistedResults,
  };
  await writeFile(path.join(outDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
  await writeFile(path.join(outDir, "summary.md"), renderMarkdown(summary));
}

export function renderMarkdown(summary: ScaffbenchSummary) {
  const rows = summary.results
    .map((result) =>
      [
        result.specId,
        result.trial,
        result.effort,
        result.effectiveReasoning ?? "",
        result.model,
        result.path,
        formatOutcome(classifyOutcome(result)),
        result.failureTags.join(", "),
        result.claude.exitCode ?? "null",
        formatSeconds(result.claude.durationMs),
        result.claude.outputTokens ?? "",
        result.claude.totalCostUsd?.toFixed(3) ?? "",
        result.stackScore.percent,
        `${result.stackScore.matched}/${result.stackScore.total}`,
        result.generatorFaithfulness
          ? `${result.generatorFaithfulness.matched}/${result.generatorFaithfulness.total}`
          : "—",
        result.acceptanceScore
          ? `${result.acceptanceScore.matched}/${result.acceptanceScore.total}`
          : "—",
        result.validation.install?.exitCode ?? "",
        result.validation.build?.exitCode ?? "",
        result.validation.checkTypes?.exitCode ?? "",
        result.validation.lint?.exitCode ?? "",
        result.validation.test?.exitCode ?? "",
        result.validation.deferred
          ? "deferred"
          : result.validation.cacheHit
            ? "hit"
            : result.validation.cacheKey
              ? "miss"
              : "",
      ].join(" | "),
    )
    .join("\n");

  const aggregateRows = summary.aggregates.leaderboard
    .map((aggregate) =>
      [
        aggregate.model,
        aggregate.effort,
        aggregate.effectiveReasoning ?? "",
        aggregate.path,
        aggregate.index,
        `${aggregate.passCount}/${aggregate.scoredRuns}`,
        aggregate.qualityScoredRuns > 0
          ? `${aggregate.qualityPassCount}/${aggregate.qualityScoredRuns}`
          : "na",
        aggregate.inconclusiveCount > 0 ? `${aggregate.inconclusiveCount}/${aggregate.runs}` : "0",
        `${aggregate.macroPassRate}%`,
        `${aggregate.passAnySpecs}/${aggregate.specCount}`,
        `${aggregate.passAllSpecs}/${aggregate.specCount}`,
        aggregate.ciReportable
          ? `${aggregate.passRate}% (${aggregate.passCi95.low}-${aggregate.passCi95.high})`
          : `n<${MIN_CI_RUNS}`,
        `${aggregate.stackPercent}%`,
        aggregate.faithfulnessPercent !== undefined ? `${aggregate.faithfulnessPercent}%` : "—",
        aggregate.acceptancePercent !== undefined ? `${aggregate.acceptancePercent}%` : "—",
        `${aggregate.commandDisciplinePercent}%`,
        `${formatSeconds(aggregate.medianDurationMs)} / ${formatSeconds(aggregate.p95DurationMs)}`,
        aggregate.avgOutputTokens ?? "",
        aggregate.avgCostUsd?.toFixed(3) ?? "",
        aggregate.publicationEligibility,
        formatFailureTags(aggregate.failureTags),
      ].join(" | "),
    )
    .join("\n");

  const cohortRows = cohortPassRates(summary.results, summary.specs)
    .map(
      (cohort) =>
        `| ${cohort.introducedAt} | ${cohort.specs} | ${cohort.passCount}/${cohort.scoredRuns} | ${cohort.passRate}% |`,
    )
    .join("\n");

  return `# ScaffBench 2 Run

Harness: ${summary.harnessVersion}
Agent: ${agentLabelForModel(summary.options.model)} (single agent; single model family per row)
Specs: ${summary.specs.map((spec) => spec.id).join(", ")}
Repeats: ${summary.options.repeats}
Prompt style: ${summary.options.promptStyle}

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(${agentLabelForModel(summary.options.model)}), not a cross-vendor leaderboard. Pass rate is over *scored* runs.
Provider, harness, and validation infrastructure outcomes are inconclusive and
excluded; budget and generation-deadline exhaustion remain scored failures.

"Pass@1" is the CORE pass rate — install + build + typecheck + native compile,
i.e. does the project actually build and run. "Quality" is the stricter advisory
tier (core + lint/format/test/doctor/route): a project can be Pass@1-green but
Quality-red because it is mis-formatted or a style-lint warns. Formatting is a
quality metric, never a brokenness verdict, so it does not move Pass@1. "Wired
libs" is scored from the generated artifact (deps + imports + files);
"Faithful" is the assisted-path bts.jsonc-vs-requested diagnostic.

Reliability is reported per spec, not pooled: "Macro" is the mean of per-spec
pass rates; "pass@k" counts specs solved on at least one repeat and "pass^k"
specs solved on every repeat. The Wilson "CI95" is shown only when a cell has
≥ ${MIN_CI_RUNS} scored runs (below that it reads \`n<${MIN_CI_RUNS}\`, since e.g. 3/3 and 0/3
intervals overlap and the interval is not informative).

"Index" is the single rankable 0-100 composite the table is sorted by. Prompt
uses ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.prompt.validation * 100)}% macro validation + ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.prompt.wiredLibs * 100)}% wired-libs; assisted lanes use ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.assisted.validation * 100)}% + ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.assisted.wiredLibs * 100)}% + ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.assisted.discipline * 100)}% command discipline.
Latency is median / p95 (wall-clock
moves with provider load, so the mean alone is misleading over small samples).

| Model | Effort | Effective reasoning | Path | Index | Pass@1 | Quality | Inconclusive | Macro | pass@k | pass^k | CI95 | Wired libs | Faithful | Acceptance | Command discipline | Median / p95 | Avg output tokens | Avg cost | Publication | Failure tags |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
${aggregateRows}

## Introduction cohorts

| Introduced | Specs | Pass@1 | Pass rate |
| --- | ---: | ---: | ---: |
${cohortRows}

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${rows}
`;
}

function formatOutcome(outcome: RunOutcome) {
  if (outcome === "success") return "pass";
  return outcome;
}

export function cohortPassRates(results: readonly RunResult[], specs: readonly BenchmarkSpec[]) {
  const introducedBySpec = new Map(specs.map((spec) => [spec.id, spec.introducedAt]));
  const cohorts = new Map<
    string,
    { introducedAt: string; specIds: Set<string>; scoredRuns: number; passCount: number }
  >();
  for (const result of results) {
    const introducedAt = introducedBySpec.get(result.specId) ?? "unknown";
    const cohort = cohorts.get(introducedAt) ?? {
      introducedAt,
      specIds: new Set<string>(),
      scoredRuns: 0,
      passCount: 0,
    };
    cohort.specIds.add(result.specId);
    if (scoredOutcome(result)) {
      cohort.scoredRuns += 1;
      if (validationPassed(result)) cohort.passCount += 1;
    }
    cohorts.set(introducedAt, cohort);
  }
  return [...cohorts.values()]
    .map((cohort) => ({
      introducedAt: cohort.introducedAt,
      specs: cohort.specIds.size,
      scoredRuns: cohort.scoredRuns,
      passCount: cohort.passCount,
      passRate:
        cohort.scoredRuns > 0 ? Math.round((cohort.passCount / cohort.scoredRuns) * 100) : 0,
    }))
    .sort((a, b) => a.introducedAt.localeCompare(b.introducedAt));
}

function formatFailureTags(tags: Record<string, number>) {
  const entries = Object.entries(tags);
  if (entries.length === 0) return "";
  return entries.map(([tag, count]) => `${tag}:${count}`).join(", ");
}

function formatSeconds(ms: number) {
  return `${(ms / 1000).toFixed(1)}s`;
}

export function collectMetadata(options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const gitHead = yield* tryCommandText("git", ["rev-parse", "HEAD"], process.cwd());
    const gitBranch = yield* tryCommandText("git", ["branch", "--show-current"], process.cwd());
    const bunVersion = yield* tryCommandText(
      existsSync(`${process.env.HOME}/.bun/bin/bun`) ? `${process.env.HOME}/.bun/bin/bun` : "bun",
      ["--version"],
      process.cwd(),
    );
    // The assisted paths exercise the PUBLISHED generator (pinned at run start via
    // resolvedBfVersion() and used by every assisted invocation), not repo HEAD, so
    // record the exact version under test; gitHead only describes the local checkout.
    const bfGeneratorVersion = resolvedBfVersion() === "latest" ? undefined : resolvedBfVersion();
    const toolchains = yield* collectToolchainVersions();
    return {
      cwd: process.cwd(),
      gitHead,
      gitBranch,
      bunVersion,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      // Validation runs non-frozen network installs on the host toolchains below,
      // so a published pass/fail is qualified by this environment.
      environmentQualified: true,
      toolchains,
      suiteVersion: SCAFFBENCH_SUITE_VERSION,
      harnessVersion: HARNESS_VERSION,
      validationCacheVersion: VALIDATION_CACHE_VERSION,
      promptVersion: PROMPT_VERSION,
      agentAdapter: providerForModel(options.model),
      configuredTrials: options.repeats,
      bfGeneratorVersion,
      model: options.model,
      effectiveReasoning: options.efforts.map((effort) => ({
        effort,
        effectiveReasoning: effectiveReasoning(options.model, effort),
      })),
    };
  });
}

export function collectToolchainVersions() {
  const probes: Record<string, readonly [string, readonly string[]]> = {
    rustc: ["rustc", ["--version"]],
    cargo: ["cargo", ["--version"]],
    go: ["go", ["version"]],
    dotnet: ["dotnet", ["--version"]],
    python: ["python3", ["--version"]],
    uv: ["uv", ["--version"]],
    protoc: ["protoc", ["--version"]],
    psql: ["psql", ["--version"]],
  };
  return Effect.gen(function* () {
    const entries = yield* Effect.forEach(
      Object.entries(probes),
      ([name, [command, args]]) =>
        Effect.gen(function* () {
          const version = yield* tryCommandText(command, [...args], process.cwd());
          return [name, version] as const;
        }),
      { concurrency: "unbounded" },
    );
    return Object.fromEntries(entries);
  });
}

export function effectiveReasoning(model: string, effort: Effort) {
  if (effort !== "default") return effort;
  const normalized = model.toLowerCase();
  if (normalized.includes("4-7") || normalized.includes("4.7")) return "xhigh";
  if (normalized.includes("4-6") || normalized.includes("4.6")) return "high";
  return undefined;
}
