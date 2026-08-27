#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "node:fs";

import { publicationEligibility } from "@scaffbench/summary";
import { CORE_SPEC_IDS, providerForModel } from "@scaffbench/index";
import type { RunResult, SummaryAggregate } from "@scaffbench/types";

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
  validationCacheVersion: 8,
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
      `${dir}: the board metric is the Full tier, so the source run must have quality gates ON ` +
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
    if ((result.provenance?.configuredTrials ?? 0) !== 1) {
      throw new Error(
        `${dir}: ${result.id} records configuredTrials=` +
          `${String(result.provenance?.configuredTrials)}; the board is pass@1`,
      );
    }
  }
  const bySpec = new Map<string, number>();
  for (const result of results) bySpec.set(result.specId, (bySpec.get(result.specId) ?? 0) + 1);
  const missing = CORE_SPECS.filter((id) => !bySpec.has(id));
  if (missing.length > 0) {
    throw new Error(`${dir} (${effort}): no trial for ${missing.join(", ")}`);
  }
  const duplicated = [...bySpec.entries()].filter(([, count]) => count !== 1);
  if (duplicated.length > 0) {
    throw new Error(
      `${dir} (${effort}): expected exactly one trial per spec, got ` +
        duplicated.map(([id, count]) => `${id}×${count}`).join(", "),
    );
  }
}

function specResult(cell: SummaryAggregate | undefined): string {
  if (!cell || cell.scoredRuns === 0) return "inconclusive";
  if (cell.qualityPassCount > 0) return "full";
  if (cell.passCount > 0) return "core";
  return "fail";
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
  const configuredTrials = new Set<number>();
  let generatedAt = "";

  for (const dir of runSources) {
    const summary = JSON.parse(readFileSync(`${dir}/summary.json`, "utf8")) as Summary;
    assertCohort(summary, dir);
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
      assertValidated(effortResults, dir, effort);
      for (const result of effortResults) {
        qualityGateFlags.push(result.validation.qualityGateRequested === true);
        configuredTrials.add(result.provenance?.configuredTrials ?? 0);
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
        specIds.map((specId) => [specId, specResult(cellsBySpec.get(specId))]),
      );
      const outcomes = Object.values(results);
      const costs = effortResults
        .map((result) => result.claude.totalCostUsd)
        .filter((value): value is number => typeof value === "number");

      rows.push({
        key,
        model,
        label: prettyModel(model),
        provider: providerForModel(model),
        effort,
        eligibility: publicationEligibility(effortResults),
        fullPasses: outcomes.filter((outcome) => outcome === "full").length,
        corePasses: outcomes.filter((outcome) => outcome === "full" || outcome === "core").length,
        scoredSpecs: outcomes.filter((outcome) => outcome !== "inconclusive").length,
        wiredPct: Math.round(leaderboard.stackPercent),
        scaffIndex: Math.round(leaderboard.index),
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
    const fullDelta = (b.fullPasses as number) - (a.fullPasses as number);
    return fullDelta !== 0 ? fullDelta : (b.scaffIndex as number) - (a.scaffIndex as number);
  });

  const qualityGates = qualityGateFlags.length > 0 && qualityGateFlags.every(Boolean);
  if (configuredTrials.size !== 1) {
    throw new Error(
      `published rows disagree on trials per spec (${[...configuredTrials].join(", ")})`,
    );
  }
  const trialsPerSpec = [...configuredTrials][0]!;
  return { rows, generatedAt, qualityGates, trialsPerSpec };
}

function main() {
  const { rows, generatedAt, qualityGates, trialsPerSpec } = buildRows(RUN_SOURCES);

  const target = "apps/web/src/components/scaffbench/scaffbench-3-data.ts";
  const current = readFileSync(target, "utf8");
  const specsBlockStart = current.indexOf("export const SCAFFBENCH3_SPECS");
  const specsBlockEnd = current.indexOf("];", specsBlockStart) + 2;
  if (specsBlockStart === -1) throw new Error(`${target}: SCAFFBENCH3_SPECS block not found`);
  const specsBlock = current.slice(specsBlockStart, specsBlockEnd);

  const out = `// AUTO-GENERATED by scripts/benchmarks/build-scaffbench-3-data.ts, do not edit rows by hand.

export type Scaffbench3Provider = "claude" | "codex" | "opencode" | "kilo" | "agy" | "pi";

export type Scaffbench3SpecResult = "full" | "core" | "fail" | "inconclusive";

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
  fullPasses: number;
  corePasses: number;
  scoredSpecs: number;
  wiredPct: number;
  scaffIndex: number;
  totalCostUsd: number | null;
  avgOutTokens: number | null;
  medianMinutes: number | null;
  results: Record<string, Scaffbench3SpecResult>;
};

export const SCAFFBENCH3_META = ${JSON.stringify(
    { ...PROTOCOL, trialsPerSpec, path: "prompt", qualityGates, generatedAt, preview: false },
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
