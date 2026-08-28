#!/usr/bin/env bun

import type { RunResult, SummaryAggregate } from "@scaffbench/types";

import { CORE_SPEC_IDS, providerForModel } from "@scaffbench/index";
import { publicationEligibility } from "@scaffbench/summary";
import { readFileSync, writeFileSync } from "node:fs";

const RUN_SOURCES: readonly string[] = [];

const MODEL_LABELS: Record<string, string> = {
  "gpt-5.6-sol": "GPT-5.6 Sol",
  "gpt-5.6-terra": "GPT-5.6 Terra",
  "gpt-5.6-luna": "GPT-5.6 Luna",
  // Ran behind opencode's "Ox Alpha Free" stealth alias; the model is GLM 5.3 Flash.
  "opencode/x-preview-f-free": "GLM 5.3 Flash",
};

const PROTOCOL = {
  suiteVersion: "3.0",
  harnessVersion: "3.1.0",
  validationCacheVersion: 9,
  promptVersion: "2026-08-21-scaffbench-3.1",
  resourceProfileId: "low-2w-v1",
} as const;

type Summary = {
  harnessVersion: string;
  generatedAt: string;
  options: {
    model: string;
    efforts: string[];
    specs: string[];
    repeats: number;
    paths?: string[];
    qualityGate?: boolean;
    noQualityGate?: boolean;
  };
  results: RunResult[];
  aggregates: { bySpecCell: SummaryAggregate[]; leaderboard: SummaryAggregate[] };
};

const CORE_SPECS = [...CORE_SPEC_IDS].sort();

function prettyModel(model: string): string {
  if (MODEL_LABELS[model]) return MODEL_LABELS[model];
  if (/^gpt/i.test(model)) return model.toUpperCase();
  return model
    .replace(/^claude-/, "")
    .replace(/(\d)-(\d)/g, "$1.$2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function assertProtocol(results: readonly RunResult[], dir: string) {
  for (const result of results) {
    const p = result.provenance;
    if (
      !p ||
      p.suiteVersion !== PROTOCOL.suiteVersion ||
      p.harnessVersion !== PROTOCOL.harnessVersion ||
      p.validationCacheVersion !== PROTOCOL.validationCacheVersion ||
      p.promptVersion !== PROTOCOL.promptVersion ||
      p.resourceProfileId !== PROTOCOL.resourceProfileId
    ) {
      throw new Error(
        `${dir}: result ${result.id} provenance does not match the 3.0 board protocol ` +
          `(${JSON.stringify(p)} vs ${JSON.stringify(PROTOCOL)})`,
      );
    }
    if (result.promptStyle !== "explicit") {
      throw new Error(`${dir}: discovery-lane (natural) runs are not publishable`);
    }
  }
}

function assertCohort(summary: Summary, dir: string) {
  if (summary.options.repeats !== 1) {
    throw new Error(
      `${dir}: the 3.0 board is pass@1; a --repeats ${summary.options.repeats} run is ` +
        "analysis-only and does not publish",
    );
  }
  const specs = [...summary.options.specs].sort();
  if (specs.length !== CORE_SPECS.length || specs.some((id, i) => id !== CORE_SPECS[i])) {
    throw new Error(
      `${dir}: published rows must cover the exact 13-spec core cohort; this run selected ` +
        `${specs.join(", ") || "(none)"}`,
    );
  }
  if (summary.options.qualityGate !== true || summary.options.noQualityGate === true) {
    throw new Error(
      `${dir}: the index scores lint and format, so the source run must have quality gates ON ` +
        "(this run recorded --no-quality-gate)",
    );
  }
}

function assertValidated(results: readonly RunResult[], dir: string, effort: string) {
  for (const result of results) {
    if (result.validation.deferred) {
      throw new Error(`${dir}: ${result.id} is still deferred; validate the run before publishing`);
    }
    if (result.validation.skipped) {
      throw new Error(`${dir}: ${result.id} was generated with --skip-validation`);
    }
    if (Object.keys(result.validation.steps).length === 0) {
      throw new Error(`${dir}: ${result.id} recorded no validation steps`);
    }
    if (result.validation.qualityGateRequested !== true) {
      throw new Error(`${dir}: ${result.id} was validated without quality gates`);
    }
  }
  const trialsBySpec = new Map<string, number[]>();
  for (const result of results) {
    trialsBySpec.set(result.specId, [...(trialsBySpec.get(result.specId) ?? []), result.trial]);
  }
  const missing = CORE_SPECS.filter((id) => !trialsBySpec.has(id));
  if (missing.length > 0) {
    throw new Error(`${dir} (${effort}): no trial for ${missing.join(", ")}`);
  }
  const ragged = [...trialsBySpec.entries()].filter(([, trials]) =>
    [...trials].sort((a, b) => a - b).some((trial, index) => trial !== index + 1),
  );
  if (ragged.length > 0) {
    throw new Error(
      `${dir} (${effort}): trials must be numbered 1..n per spec, got ` +
        ragged.map(([id, trials]) => `${id}:${trials.join("/")}`).join(", "),
    );
  }
  return new Map([...trialsBySpec].map(([id, trials]) => [id, trials.length]));
}

function specCell(cell: SummaryAggregate | undefined) {
  return {
    trials: cell?.runs ?? 0,
    scored: cell?.scoredRuns ?? 0,
    core: cell?.passCount ?? 0,
    quality: cell?.qualityPassCount ?? 0,
    score: cell && cell.scoredRuns > 0 ? cell.specScore : null,
  };
}

function topUpKind(trialCounts: ReadonlyMap<string, number>) {
  const distinct = new Set(trialCounts.values());
  if (distinct.size > 1) return "partial" as const;
  return Math.max(...distinct) > 1 ? ("uniform" as const) : ("none" as const);
}

export function buildRows(runSources: readonly string[]) {
  if (runSources.length === 0) {
    throw new Error(
      "RUN_SOURCES is empty. Add published 3.0 run dirs before regenerating the board " +
        "(the checked-in data file stays the design preview until then).",
    );
  }

  const specIds = [...CORE_SPEC_IDS];
  const rows: Record<string, unknown>[] = [];
  const seenTreatments = new Set<string>();
  const qualityGateFlags: boolean[] = [];
  const launchRepeats = new Set<number>();
  let generatedAt = "";

  for (const dir of runSources) {
    const summary = JSON.parse(readFileSync(`${dir}/summary.json`, "utf8")) as Summary;
    assertCohort(summary, dir);
    launchRepeats.add(summary.options.repeats);
    const recordedPaths = summary.options.paths ?? ["prompt"];
    if (recordedPaths.length !== 1 || recordedPaths[0] !== "prompt") {
      throw new Error(
        `${dir}: board rows are prompt-only, but this run recorded paths=${recordedPaths.join(",")}; ` +
          "re-run with --paths prompt instead of publishing a filtered slice of a multi-path run",
      );
    }
    const promptResults = summary.results.filter((result) => result.path === "prompt");
    assertProtocol(promptResults, dir);
    if (summary.generatedAt > generatedAt) generatedAt = summary.generatedAt;

    const model = summary.options.model;
    const efforts = [...new Set(promptResults.map((result) => result.effort))].sort();
    if (efforts.length === 0) throw new Error(`${dir}: no prompt-path results`);

    for (const effort of efforts) {
      const key = `${model}|${effort}`;
      if (seenTreatments.has(key)) throw new Error(`${key}: published by more than one run dir`);
      seenTreatments.add(key);
      const effortResults = promptResults.filter((result) => result.effort === effort);
      const trialCounts = assertValidated(effortResults, dir, effort);
      const topUp = topUpKind(trialCounts);
      for (const result of effortResults) {
        qualityGateFlags.push(result.validation.qualityGateRequested === true);
      }

      const leaderboard = summary.aggregates.leaderboard.find(
        (row) => row.model === model && row.effort === effort && row.path === "prompt",
      );
      if (!leaderboard) throw new Error(`${dir}: no prompt leaderboard row for ${key}`);

      const cellsBySpec = new Map(
        summary.aggregates.bySpecCell
          .filter(
            (cell) => cell.model === model && cell.effort === effort && cell.path === "prompt",
          )
          .map((cell) => [cell.specId ?? "", cell]),
      );
      const results = Object.fromEntries(
        specIds.map((specId) => [specId, specCell(cellsBySpec.get(specId))]),
      );
      const scoredCells = Object.values(results).filter((cell) => cell.scored > 0);
      const macroPassRate = (
        count: (cell: { scored: number; core: number; quality: number }) => number,
      ) => scoredCells.reduce((sum, cell) => sum + count(cell) / cell.scored, 0);
      const qualityRate = macroPassRate((cell) => cell.quality);
      const coreRate = macroPassRate((cell) => cell.core);
      const scoredSpecs = scoredCells.length;
      const pct = (rate: number) => (scoredSpecs > 0 ? Math.round((100 * rate) / scoredSpecs) : 0);
      const costs = effortResults
        .map((result) => result.claude.totalCostUsd)
        .filter((value): value is number => typeof value === "number");

      rows.push({
        key,
        model,
        label: prettyModel(model),
        provider: providerForModel(model),
        effort,
        eligibility: topUp === "partial" ? "exploratory" : publicationEligibility(effortResults),
        trials: Math.max(...trialCounts.values()),
        topUp,
        qualityPasses: Number(qualityRate.toFixed(1)),
        corePasses: Number(coreRate.toFixed(1)),
        qualityPassPct: pct(qualityRate),
        corePassPct: pct(coreRate),
        scoredSpecs,
        wiredPct: Math.round(leaderboard.stackPercent),
        index: Math.round(leaderboard.index),
        totalCostUsd: costs.length > 0 ? Number(costs.reduce((a, b) => a + b, 0).toFixed(1)) : null,
        avgOutTokens: leaderboard.avgOutputTokens ?? null,
        medianMinutes:
          leaderboard.medianDurationMs > 0
            ? Math.round(leaderboard.medianDurationMs / 60_000)
            : null,
        results,
      });
    }
  }

  rows.sort((a, b) => {
    const indexDelta = (b.index as number) - (a.index as number);
    return indexDelta !== 0
      ? indexDelta
      : (b.qualityPassPct as number) - (a.qualityPassPct as number);
  });

  const qualityGates = qualityGateFlags.length > 0 && qualityGateFlags.every(Boolean);
  if (launchRepeats.size !== 1) {
    throw new Error(`published rows disagree on launch repeats (${[...launchRepeats].join(", ")})`);
  }
  const launchRepeatsValue = [...launchRepeats][0]!;
  const trialsPerSpec = Math.max(launchRepeatsValue, ...rows.map((row) => row.trials as number));
  return { rows, generatedAt, qualityGates, launchRepeats: launchRepeatsValue, trialsPerSpec };
}

function main() {
  const { rows, generatedAt, qualityGates, launchRepeats, trialsPerSpec } = buildRows(RUN_SOURCES);

  const target = "apps/web/src/components/scaffbench/scaffbench-3-data.ts";
  const current = readFileSync(target, "utf8");
  const specsBlockStart = current.indexOf("export const SCAFFBENCH3_SPECS");
  const specsBlockEnd = current.indexOf("];", specsBlockStart) + 2;
  if (specsBlockStart === -1) throw new Error(`${target}: SCAFFBENCH3_SPECS block not found`);
  const specsBlock = current.slice(specsBlockStart, specsBlockEnd);

  const out = `// AUTO-GENERATED by scripts/benchmarks/build-scaffbench-3-data.ts, do not edit rows by hand.

export type Scaffbench3Provider = "claude" | "codex" | "opencode" | "kilo" | "agy" | "pi";

export type Scaffbench3SpecCell = {
  trials: number;
  scored: number;
  core: number;
  quality: number;
  score: number | null;
};

export type Scaffbench3Spec = {
  id: string;
  index: number;
  family: string;
  title: string;
  trap: string | null;
};

export type Scaffbench3Row = {
  key: string;
  model: string;
  label: string;
  provider: Scaffbench3Provider;
  effort: string;
  eligibility: "ranked" | "exploratory";
  trials: number;
  topUp: "none" | "uniform" | "partial";
  qualityPasses: number;
  corePasses: number;
  qualityPassPct: number;
  corePassPct: number;
  scoredSpecs: number;
  wiredPct: number;
  index: number;
  totalCostUsd: number | null;
  avgOutTokens: number | null;
  medianMinutes: number | null;
  results: Record<string, Scaffbench3SpecCell>;
};

export const SCAFFBENCH3_META = ${JSON.stringify(
    {
      ...PROTOCOL,
      launchRepeats,
      trialsPerSpec,
      path: "prompt",
      qualityGates,
      generatedAt,
      preview: false,
    },
    null,
    2,
  )} as const;

${specsBlock}

export const SCAFFBENCH3_ROWS: readonly Scaffbench3Row[] = ${JSON.stringify(rows, null, 2)};
`;

  writeFileSync(target, out);
  console.log(`Wrote ${rows.length} rows to ${target}`);
}

if (import.meta.main) main();
