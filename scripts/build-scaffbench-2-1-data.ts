/** Build the expanded ScaffBench 2.1 board data from run summaries. */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { extractToolUses, providerForModel } from "@/index";

import { corePass, fullPass, scaffbenchIndex } from "./build-scaffbench-data";

const RUN_SOURCES: { dir: string; specs?: string[] }[] = [
  { dir: "testing/llm-benchmarks/v2/fable5-low-prompt-2026-07-06" },
  { dir: "testing/llm-benchmarks/v2/fable5-high-prompt-2026-07-06" },
  { dir: "testing/llm-benchmarks/v2/opus48-low-prompt-2026-06-30" },
  { dir: "testing/llm-benchmarks/v2/opus48-max-prompt-2026-06-30" },
  { dir: "testing/llm-benchmarks/early-sonnet/sonnet5-max-EARLY" },
  { dir: "testing/llm-benchmarks/v2/sonnet46-high-prompt-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-codex/spark-high-prompt-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-gemini/gemini35flash-high-prompt-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2/gpt-5-5-high-prompt-2026-07-03" },
  { dir: "testing/llm-benchmarks/v2-f1/deepseek-v4-flash-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-f2/mimo-v2.5-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-f4/nemotron-nano-30b-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-f3/nemotron-ultra-550b-2026-07-01" },
];

const MODEL_LABELS: Record<string, string> = {
  "gpt-5.3-codex-spark": "Codex Spark",
  "opencode/deepseek-v4-flash-free": "DeepSeek V4 Flash",
  "opencode/mimo-v2.5-free": "MiMo V2.5",
  "kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free": "Nemotron 3 Nano 30B",
  "kilo/nvidia/nemotron-3-ultra-550b-a55b:free": "Nemotron 3 Ultra 550B",
};

const PATH_ORDER = ["prompt", "mcp", "cli"] as const;
const GATE = /(?:^|:)(lint|format|test|doctor|route|tidy)$/i;
const W = {
  prompt: { macroPass: 0.75, wired: 0.25, cmd: 0 },
  assisted: { macroPass: 0.6, wired: 0.25, cmd: 0.15 },
} as const;
const mean = (values: number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

function prettyModel(model: string): string {
  if (MODEL_LABELS[model]) return MODEL_LABELS[model];
  if (/^gpt/i.test(model)) return model.toUpperCase();
  return model
    .replace(/^claude-/, "")
    .replace(/(\d)-(\d)/g, "$1.$2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function coreStepCount(result: any): number {
  return Object.entries(result?.validation?.steps ?? {}).filter(
    ([key, step]: any) => !GATE.test(key) && step && step.status !== "na",
  ).length;
}

export function resultTrialKey(result: any) {
  return [result.model, result.effort, result.path, result.specId, result.trial].join("|");
}

function aggregateCellKey(aggregate: any) {
  return [aggregate.model, aggregate.effort, aggregate.path, aggregate.specId].join("|");
}

function resultCellKey(result: any) {
  return [result.model, result.effort, result.path, result.specId].join("|");
}

export type PublishedCell = {
  modelKey: string;
  path: string;
  spec: string;
  scored: boolean;
  corePass: boolean;
  fullPass: boolean | null;
  trials: number;
  scoredTrials: number;
  passCount: number;
  passRate: number;
  passAny: boolean;
  passAll: boolean;
  qualityPassCount: number | null;
  qualityPassRate: number | null;
  wiredPct: number;
  cmdPct: number;
  costUsd: number | null;
  outTokens: number | null;
  steps: number;
  durationMs: number | null;
};

export function buildPublishedCells(summary: any, sourceDir: string, specs?: readonly string[]) {
  const wanted = specs ? new Set(specs) : null;
  const exactKeys = summary.results.map(resultTrialKey);
  if (new Set(exactKeys).size !== exactKeys.length) {
    throw new Error(`${sourceDir}: duplicate model|effort|path|spec|trial result keys`);
  }
  const resultsByCell = new Map<string, any[]>();
  for (const result of summary.results) {
    const key = resultCellKey(result);
    resultsByCell.set(key, [...(resultsByCell.get(key) ?? []), result]);
  }

  const cells: PublishedCell[] = [];
  for (const aggregate of summary.aggregates.bySpecCell) {
    if (wanted && !wanted.has(aggregate.specId)) continue;
    const trials = (resultsByCell.get(aggregateCellKey(aggregate)) ?? []).sort(
      (a, b) => a.trial - b.trial,
    );
    if (trials.length === 0) continue;
    const measurable = trials.filter((result) => coreStepCount(result) > 0);
    const scoredTrials = Math.min(aggregate.scoredRuns ?? 0, measurable.length);
    const passCount = Math.min(aggregate.passCount ?? 0, scoredTrials);
    const trialCount = trials.length;
    const qualityRequested = trials.map(
      (result) =>
        result.validation?.qualityGateRequested ?? Boolean(summary.options?.qualityGate),
    );
    const qualityOutcomes = trials.map((result, index) =>
      qualityRequested[index]
        ? fullPass({
            ...result,
            validation: { ...result.validation, qualityGateRequested: true },
          })
        : null,
    );
    const qualityScoredRuns =
      aggregate.qualityScoredRuns ?? qualityOutcomes.filter((value) => value !== null).length;
    const qualityPassCount =
      qualityScoredRuns > 0
        ? (aggregate.qualityPassCount ?? qualityOutcomes.filter((value) => value === true).length)
        : null;
    const outputStreams = trials.map((result) => {
      try {
        return readFileSync(path.join(result.runDir, "claude.stdout.json"), "utf8");
      } catch {
        return "";
      }
    });
    const scored = scoredTrials > 0;
    const passAll = scoredTrials === trialCount && passCount === trialCount;
    cells.push({
      modelKey: `${aggregate.model}|${aggregate.effort}`,
      path: aggregate.path,
      spec: aggregate.specId,
      scored,
      corePass: passAll,
      fullPass:
        qualityPassCount === null
          ? null
          : qualityScoredRuns === trialCount && qualityPassCount === trialCount,
      trials: trialCount,
      scoredTrials,
      passCount,
      passRate: scoredTrials > 0 ? Math.round((passCount / scoredTrials) * 100) : 0,
      passAny: passCount > 0,
      passAll,
      qualityPassCount,
      qualityPassRate:
        qualityPassCount === null || qualityScoredRuns === 0
          ? null
          : Math.round((qualityPassCount / qualityScoredRuns) * 100),
      wiredPct: aggregate.stackPercent ?? 0,
      cmdPct: aggregate.commandDisciplinePercent ?? 0,
      costUsd: aggregate.avgCostUsd && aggregate.avgCostUsd > 0 ? aggregate.avgCostUsd : null,
      outTokens:
        aggregate.avgOutputTokens && aggregate.avgOutputTokens > 0
          ? Math.round(aggregate.avgOutputTokens)
          : null,
      steps: Math.round(mean(outputStreams.map((stdout) => extractToolUses(stdout).length))),
      durationMs:
        aggregate.medianDurationMs && aggregate.medianDurationMs > 0
          ? Math.round(aggregate.medianDurationMs)
          : null,
    });
  }
  return cells;
}

export function discriminationRows(cells: readonly PublishedCell[]) {
  const promptCells = cells.some((cell) => cell.path === "prompt")
    ? cells.filter((cell) => cell.path === "prompt")
    : [...cells];
  const bySpec = new Map<string, PublishedCell[]>();
  for (const cell of promptCells) bySpec.set(cell.spec, [...(bySpec.get(cell.spec) ?? []), cell]);
  return [...bySpec.entries()]
    .map(([spec, specCells]) => {
      const scored = specCells.filter((cell) => cell.scored);
      const rates = scored.map((cell) => cell.passRate);
      const passCount = scored.reduce((sum, cell) => sum + cell.passCount, 0);
      const scoredTrials = scored.reduce((sum, cell) => sum + cell.scoredTrials, 0);
      const passRate = scoredTrials > 0 ? Math.round((passCount / scoredTrials) * 100) : 0;
      return {
        spec,
        models: scored.length,
        spread: rates.length > 0 ? Math.max(...rates) - Math.min(...rates) : 0,
        passRate,
        flag: passRate > 90 ? ("ceiling" as const) : passRate === 0 ? ("floor" as const) : null,
      };
    })
    .sort((a, b) => a.spec.localeCompare(b.spec));
}

function main() {
  const models: any[] = [];
  const cells: PublishedCell[] = [];
  let meta: any = null;
  const specSet = new Set<string>();

  for (const source of RUN_SOURCES) {
    const summary = JSON.parse(readFileSync(`${source.dir}/summary.json`, "utf8"));
    if (!meta) {
      meta = {
        harnessVersion: summary.harnessVersion,
        generatorVersion: summary.metadata?.bfGeneratorVersion ?? "2.1.3",
        generatedAt: summary.generatedAt,
      };
    }
    const sourceCells = buildPublishedCells(summary, source.dir, source.specs);
    cells.push(...sourceCells);
    for (const cell of sourceCells) specSet.add(cell.spec);

    const rowGroups = new Map<string, PublishedCell[]>();
    for (const cell of sourceCells) {
      rowGroups.set(cell.modelKey, [...(rowGroups.get(cell.modelKey) ?? []), cell]);
    }
    for (const [modelKey, rowCells] of rowGroups) {
      const [model = "unknown", effort = "default"] = modelKey.split("|");
      const firstResult = summary.results.find(
        (result: any) => result.model === model && result.effort === effort,
      );
      const scored = rowCells.filter((cell) => cell.scored);
      const sortIndex = Math.round(
        mean(
          scored.map((cell) =>
            scaffbenchIndex(cell.path, cell.passRate, cell.wiredPct, cell.cmdPct),
          ),
        ),
      );
      models.push({
        key: modelKey,
        model,
        effort,
        effectiveReasoning: firstResult?.effectiveReasoning ?? effort,
        provider: providerForModel(model),
        label: prettyModel(model),
        sortIndex,
      });
    }
  }

  const specIds = [...specSet];
  models.sort((a, b) => b.sortIndex - a.sortIndex);
  const modelRank = new Map(models.map((model, index) => [model.key, index]));
  cells.sort(
    (a, b) =>
      modelRank.get(a.modelKey)! - modelRank.get(b.modelKey)! ||
      PATH_ORDER.indexOf(a.path as any) - PATH_ORDER.indexOf(b.path as any) ||
      specIds.indexOf(a.spec) - specIds.indexOf(b.spec),
  );

  const output = `// AUTO-GENERATED from ScaffBench V2.1 summaries.
import type { ScaffbenchCell, ScaffbenchModel } from "./scaffbench-2-data";

export type Scaffbench21Cell = Omit<ScaffbenchCell, "fullPass"> & {
  fullPass: boolean | null;
  trials: number;
  scoredTrials: number;
  passCount: number;
  passRate: number;
  passAny: boolean;
  passAll: boolean;
  qualityPassCount: number | null;
  qualityPassRate: number | null;
};

export const SCAFFBENCH21_META = {
  harnessVersion: ${JSON.stringify(meta.harnessVersion)},
  generatorVersion: ${JSON.stringify(meta.generatorVersion)},
  generatedAt: ${JSON.stringify(meta.generatedAt)},
  indexWeights: ${JSON.stringify(W)},
} as const;

export const SCAFFBENCH21_SPECS = ${JSON.stringify(specIds)} as const;
export const SCAFFBENCH21_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};
export const SCAFFBENCH21_CELLS: readonly Scaffbench21Cell[] = ${JSON.stringify(cells, null, 2)};
`;

  const target = "apps/web/src/components/home/scaffbench-2-1-data.ts";
  writeFileSync(target, output);
  console.error(`Wrote ${target}: ${models.length} models, ${cells.length} cells`);
  for (const row of discriminationRows(cells)) {
    console.error(
      `DISCRIMINATION ${row.spec}: spread=${row.spread}pp pass=${row.passRate}% models=${row.models}${row.flag ? ` ${row.flag.toUpperCase()}` : ""}`,
    );
  }
}

if (import.meta.main) main();
