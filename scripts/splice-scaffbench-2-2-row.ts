/**
 * Splice ONE cohort run into the published 2.2 board data.
 *
 * Why this exists: build-scaffbench-2-2-data.ts regenerates the board wholesale
 * from every dir in RUN_SOURCES, but those live under gitignored testing/ and
 * get cleaned up — once an older cohort dir is gone, a full regen is impossible
 * (and would silently publish a board missing those rows). This script adds a
 * single new run to the existing generated file, leaving published rows byte-
 * identical. The new run must still be listed in RUN_SOURCES so a future full
 * regen (with all artifacts present) reproduces the same board.
 *
 * Run with `bun run scripts/splice-scaffbench-2-2-row.ts <run-dir>`.
 */
import { readFileSync, writeFileSync } from "node:fs";

import { providerForModel } from "@/index";
import { publicationEligibility } from "@/summary";

import {
  SCAFFBENCH22_CELLS,
  SCAFFBENCH22_META,
  SCAFFBENCH22_MODELS,
  SCAFFBENCH22_SPECS,
} from "../apps/web/src/components/home/scaffbench-2-2-data";
import { buildPublishedCells } from "./build-scaffbench-2-1-data";

const MODEL_LABELS: Record<string, string> = {
  "gemini-3.6-flash": "Gemini 3.6 Flash",
  "gemini-3.5-flash": "Gemini 3.5 Flash",
};

function prettyModel(model: string): string {
  if (MODEL_LABELS[model]) return MODEL_LABELS[model];
  if (/^gpt/i.test(model)) return model.toUpperCase();
  return model
    .replace(/^claude-/, "")
    .replace(/(\d)-(\d)/g, "$1.$2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type SummaryResult = {
  model?: string;
  effort?: string;
  path?: string;
  specId?: string;
  provenance?: {
    suiteVersion?: string;
    harnessVersion?: string;
    validationCacheVersion?: number;
    promptVersion?: string;
  };
  validation?: {
    qualityGateRequested?: boolean;
  };
};

export function assertCompleteSpecList(
  specs: readonly string[],
  expectedSpecs: readonly string[],
  source: string,
) {
  const counts = new Map<string, number>();
  for (const spec of specs) counts.set(spec, (counts.get(spec) ?? 0) + 1);
  const expected = new Set(expectedSpecs);
  const missing = expectedSpecs.filter((spec) => !counts.has(spec));
  const unknown = [...counts.keys()].filter((spec) => !expected.has(spec));
  const duplicates = [...counts.entries()].filter(([, count]) => count > 1).map(([spec]) => spec);
  if (missing.length > 0 || unknown.length > 0 || duplicates.length > 0) {
    throw new Error(
      `${source}: specs must exactly match the 2.2 board` +
        (missing.length > 0 ? `; missing: ${missing.join(", ")}` : "") +
        (unknown.length > 0 ? `; unknown: ${unknown.join(", ")}` : "") +
        (duplicates.length > 0 ? `; duplicate: ${duplicates.join(", ")}` : ""),
    );
  }
}

export function assertSinglePromptRow(
  results: readonly SummaryResult[],
  model: string,
  effort: string,
  source: string,
) {
  const rowKeys = new Set(
    results.map(
      (result) =>
        `${result.model ?? "unknown"}|${result.effort ?? "unknown"}|${result.path ?? "unknown"}`,
    ),
  );
  const expectedKey = `${model}|${effort}|prompt`;
  if (rowKeys.size !== 1 || !rowKeys.has(expectedKey)) {
    throw new Error(
      `${source}: expected exactly one model/effort prompt row (${expectedKey}); found ${[
        ...rowKeys,
      ].join(", ")}`,
    );
  }
}

export function assertBoardProtocol(
  results: readonly SummaryResult[],
  board: {
    suiteVersion: string;
    harnessVersion: string;
    validationCacheVersion: number;
    promptVersion: string;
  },
  source: string,
) {
  const expected = JSON.stringify([
    board.suiteVersion,
    board.harnessVersion,
    board.validationCacheVersion,
    board.promptVersion,
  ]);
  const mismatches = results.filter((result) => {
    const provenance = result.provenance;
    return (
      !provenance ||
      JSON.stringify([
        provenance.suiteVersion,
        provenance.harnessVersion,
        provenance.validationCacheVersion,
        provenance.promptVersion,
      ]) !== expected
    );
  });
  if (mismatches.length > 0) {
    throw new Error(`${source}: run provenance does not match the ScaffBench 2.2 board protocol`);
  }
}

export function assertFullTierValidation(
  qualityGate: boolean | undefined,
  results: readonly SummaryResult[],
  source: string,
) {
  if (
    qualityGate !== true ||
    results.some((result) => result.validation?.qualityGateRequested !== true)
  ) {
    throw new Error(`${source}: ScaffBench 2.2 publication requires Full-tier validation`);
  }
}

function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error("usage: splice-scaffbench-2-2-row.ts <run-dir>");

  const summary = JSON.parse(readFileSync(`${dir}/summary.json`, "utf8"));
  const first = summary.results[0] ?? {};
  const model: string = first.model ?? summary.options.model;
  const effort: string = first.effort ?? summary.options.efforts[0];
  const key = `${model}|${effort}`;

  // Re-splicing an existing row is how a published row picks up a policy change
  // (e.g. MIN_RANKED_TRIALS) or a re-validated summary; the row is replaced, not
  // duplicated. Pass --replace so it can never happen by accident.
  const replacing = SCAFFBENCH22_MODELS.some((m) => m.key === key);
  if (replacing && !process.argv.includes("--replace")) {
    throw new Error(`${key} is already published — pass --replace to update it`);
  }
  // The board compares rows cell-for-cell; a run on a different spec set is not
  // comparable and must not be spliced in silently.
  const specs: string[] = summary.options.specs;
  assertCompleteSpecList(specs, SCAFFBENCH22_SPECS, dir);
  assertSinglePromptRow(summary.results, model, effort, dir);
  assertCompleteSpecList(
    [
      ...new Set(summary.results.map((result: SummaryResult) => result.specId).filter(Boolean)),
    ] as string[],
    SCAFFBENCH22_SPECS,
    `${dir} results`,
  );
  assertBoardProtocol(summary.results, SCAFFBENCH22_META, dir);
  assertFullTierValidation(summary.options.qualityGate, summary.results, dir);

  const lb = summary.aggregates.leaderboard.find(
    (row: any) => row.model === model && row.effort === effort && row.path === "prompt",
  );
  if (!lb) throw new Error(`${dir}: no prompt leaderboard row for ${key}`);

  // Eligibility is recomputed from the raw runs under the CURRENT constants
  // rather than read from summary.json, where it was frozen at run time. A
  // policy change (MIN_RANKED_TRIALS) must move published rows, not just future
  // ones — otherwise two rows with identical evidence carry different labels.
  const eligibility = publicationEligibility(summary.results);
  const models = [
    ...SCAFFBENCH22_MODELS.filter((m) => m.key !== key),
    {
      key,
      model,
      effort,
      effectiveReasoning: first.effectiveReasoning ?? effort,
      provider: providerForModel(model),
      label: prettyModel(model),
      sortIndex: lb.index,
      eligibility,
    },
  ];
  const cells = [
    ...SCAFFBENCH22_CELLS.filter((c) => c.modelKey !== key),
    ...buildPublishedCells(summary, dir),
  ];

  models.sort((a, b) => b.sortIndex - a.sortIndex);
  const rank = new Map(models.map((m, i) => [m.key, i]));
  const specOrder = SCAFFBENCH22_SPECS as readonly string[];
  cells.sort(
    (a, b) =>
      (rank.get(a.modelKey) ?? 99) - (rank.get(b.modelKey) ?? 99) ||
      specOrder.indexOf(a.spec) - specOrder.indexOf(b.spec),
  );

  const out = `// AUTO-GENERATED from the ScaffBench 2.2 cohort summaries by
// scripts/build-scaffbench-2-2-data.ts — regenerate, don't hand-edit.
// 2.2 protocol: harness 2.2.1, self-verify prompt, quality gates ON (the board
// metric is the Full tier natively), 13 specs per row. Trials per row VARY —
// the original GPT-5.6 cohort ran 3 interleaved trials, later rows run 1. Read
// the per-cell scoredTrials, never SCAFFBENCH22_META.trialsPerSpec (which only
// reflects the first run source).
import type { ScaffbenchCell, ScaffbenchModel } from "./scaffbench-2-data";

export const SCAFFBENCH22_META = ${JSON.stringify(SCAFFBENCH22_META, null, 2)} as const;

export const SCAFFBENCH22_SPECS = ${JSON.stringify(SCAFFBENCH22_SPECS)} as const;

export const SCAFFBENCH22_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};

export const SCAFFBENCH22_CELLS: readonly ScaffbenchCell[] = ${JSON.stringify(cells, null, 2)};
`;
  const target = "apps/web/src/components/home/scaffbench-2-2-data.ts";
  writeFileSync(target, out);
  const mine = cells.filter((c) => c.modelKey === key && c.scored);
  const trials = mine.reduce((s, c) => s + (c.scoredTrials ?? 1), 0);
  const passes = mine.reduce((s, c) => s + (c.passCount ?? 0), 0);
  const quality = mine.reduce((s, c) => s + (c.qualityPassCount ?? 0), 0);
  console.error(
    `${replacing ? "Replaced" : "Spliced"} ${prettyModel(model)} (${effort}) in ${target}: ` +
      `build ${passes}/${trials}, quality ${quality}/${trials}, index ${lb.index}, ${eligibility}` +
      (eligibility === lb.publicationEligibility
        ? ""
        : ` (was ${lb.publicationEligibility} at run time)`),
  );
}

if (import.meta.main) main();
