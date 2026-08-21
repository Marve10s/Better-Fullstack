#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "node:fs";

import { publicationEligibility } from "@/summary";
import { providerForModel } from "@/index";
import type { RunResult, SummaryAggregate } from "@/types";

const RUN_SOURCES: readonly string[] = [];

const MODEL_LABELS: Record<string, string> = {
  "gpt-5.6-sol": "GPT-5.6 Sol",
  "gpt-5.6-terra": "GPT-5.6 Terra",
  "gpt-5.6-luna": "GPT-5.6 Luna",
};

const PROTOCOL = {
  suiteVersion: "3.0",
  harnessVersion: "3.1.0",
  validationCacheVersion: 7,
  promptVersion: "2026-08-21-scaffbench-3",
  resourceProfileId: "low-2w-v1",
} as const;

type Summary = {
  harnessVersion: string;
  generatedAt: string;
  options: { model: string; efforts: string[]; specs: string[]; repeats: number };
  results: RunResult[];
  aggregates: { bySpecCell: SummaryAggregate[]; leaderboard: SummaryAggregate[] };
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

function specResult(cell: SummaryAggregate | undefined): string {
  if (!cell || cell.scoredRuns === 0) return "inconclusive";
  if (cell.qualityPassCount > 0) return "full";
  if (cell.passCount > 0) return "core";
  return "fail";
}

function main() {
  if (RUN_SOURCES.length === 0) {
    throw new Error(
      "RUN_SOURCES is empty. Add published 3.0 run dirs before regenerating the board " +
        "(the checked-in data file stays the design preview until then).",
    );
  }

  let specIds: string[] = [];
  const rows: Record<string, unknown>[] = [];
  let generatedAt = "";

  for (const dir of RUN_SOURCES) {
    const summary = JSON.parse(readFileSync(`${dir}/summary.json`, "utf8")) as Summary;
    if (summary.options.repeats !== 1) {
      throw new Error(
        `${dir}: the 3.0 board is pass@1; a --repeats ${summary.options.repeats} run is ` +
          "analysis-only and does not publish",
      );
    }
    const promptResults = summary.results.filter((result) => result.path === "prompt");
    assertProtocol(promptResults, dir);
    if (specIds.length === 0) specIds = summary.options.specs;
    if (summary.generatedAt > generatedAt) generatedAt = summary.generatedAt;

    const model = summary.options.model;
    const effort = promptResults[0]?.effort ?? summary.options.efforts[0]!;
    const leaderboard = summary.aggregates.leaderboard.find(
      (row) => row.model === model && row.effort === effort && row.path === "prompt",
    );
    if (!leaderboard) throw new Error(`${dir}: no prompt leaderboard row for ${model}|${effort}`);

    const cellsBySpec = new Map(
      summary.aggregates.bySpecCell
        .filter((cell) => cell.model === model && cell.effort === effort && cell.path === "prompt")
        .map((cell) => [cell.specId ?? "", cell]),
    );
    const results = Object.fromEntries(
      specIds.map((specId) => [specId, specResult(cellsBySpec.get(specId))]),
    );
    const outcomes = Object.values(results);
    const costs = promptResults
      .map((result) => result.claude.totalCostUsd)
      .filter((value): value is number => typeof value === "number");

    rows.push({
      key: `${model}|${effort}`,
      model,
      label: prettyModel(model),
      provider: providerForModel(model),
      effort,
      eligibility: publicationEligibility(promptResults),
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

  rows.sort((a, b) => {
    const fullDelta = (b.fullPasses as number) - (a.fullPasses as number);
    return fullDelta !== 0 ? fullDelta : (b.scaffIndex as number) - (a.scaffIndex as number);
  });

  const target = "apps/web/src/components/scaffbench/scaffbench-3-data.ts";
  const current = readFileSync(target, "utf8");
  const specsBlockStart = current.indexOf("export const SCAFFBENCH3_SPECS");
  const specsBlockEnd = current.indexOf("];", specsBlockStart) + 2;
  if (specsBlockStart === -1) throw new Error(`${target}: SCAFFBENCH3_SPECS block not found`);
  const specsBlock = current.slice(specsBlockStart, specsBlockEnd);

  const out = `// AUTO-GENERATED by scripts/build-scaffbench-3-data.ts — do not edit rows by hand.

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
    { ...PROTOCOL, trialsPerSpec: 1, path: "prompt", qualityGates: true, generatedAt, preview: false },
    null,
    2,
  )} as const;

${specsBlock}

export const SCAFFBENCH3_ROWS: readonly Scaffbench3Row[] = ${JSON.stringify(rows, null, 2)};
`;

  writeFileSync(target, out);
  console.log(`Wrote ${rows.length} rows to ${target}`);
}

main();
