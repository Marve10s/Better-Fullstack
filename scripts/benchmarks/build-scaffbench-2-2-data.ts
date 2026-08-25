import { readFileSync, writeFileSync } from "node:fs";

import { providerForModel } from "@scaffbench/index";
import { publicationEligibility } from "@scaffbench/summary";

import { buildPublishedCells } from "@scripts/benchmarks/build-scaffbench-2-1-data";

const RUN_SOURCES = [
  "testing/llm-benchmarks/v2-codex-sol/gpt-5-6-sol-high-r3-2026-07-17",
  "testing/llm-benchmarks/v2-codex-terra/gpt-5-6-terra-high-r3-2026-07-17",
  "testing/llm-benchmarks/v2-codex-luna/gpt-5-6-luna-high-r3-2026-07-17",
] as const;

const MODEL_LABELS: Record<string, string> = {
  "gpt-5.6-sol": "GPT-5.6 Sol",
  "gpt-5.6-terra": "GPT-5.6 Terra",
  "gpt-5.6-luna": "GPT-5.6 Luna",
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

function main() {
  const models: any[] = [];
  const cells: any[] = [];
  let meta: any = null;
  let specIds: string[] = [];

  for (const dir of RUN_SOURCES) {
    const summary = JSON.parse(readFileSync(`${dir}/summary.json`, "utf8"));
    const first = summary.results[0] ?? {};
    const model: string = first.model ?? summary.options.model;
    const effort: string = first.effort ?? summary.options.efforts[0];
    const lb = summary.aggregates.leaderboard.find(
      (row: any) => row.model === model && row.effort === effort && row.path === "prompt",
    );
    if (!lb) throw new Error(`${dir}: no prompt leaderboard row for ${model}|${effort}`);
    if (!meta) {
      meta = {
        suiteVersion: first.provenance?.suiteVersion ?? summary.metadata?.suiteVersion ?? null,
        harnessVersion: summary.harnessVersion,
        validationCacheVersion:
          first.provenance?.validationCacheVersion ??
          summary.metadata?.validationCacheVersion ??
          null,
        promptVersion: summary.metadata?.promptVersion ?? null,
        generatorVersion: summary.metadata?.bfGeneratorVersion ?? null,
        generatedAt: summary.generatedAt,
        trialsPerSpec: summary.options?.repeats ?? 1,
        indexWeights: { macroPass: 0.75, wired: 0.25, cmd: 0 },
      };
      specIds = summary.options.specs;
    }
    models.push({
      key: `${model}|${effort}`,
      model,
      effort,
      effectiveReasoning: first.effectiveReasoning ?? effort,
      provider: providerForModel(model),
      label: prettyModel(model),
      sortIndex: lb.index,
      eligibility: publicationEligibility(
        summary.results.filter(
          (result: any) =>
            result.model === model && result.effort === effort && result.path === "prompt",
        ),
      ),
    });
    cells.push(...buildPublishedCells(summary, dir));
  }

  models.sort((a, b) => b.sortIndex - a.sortIndex);
  const rank = new Map(models.map((m, i) => [m.key, i]));
  cells.sort(
    (a, b) =>
      (rank.get(a.modelKey) ?? 99) - (rank.get(b.modelKey) ?? 99) ||
      specIds.indexOf(a.spec) - specIds.indexOf(b.spec),
  );

  const out = `
import type { ScaffbenchCell, ScaffbenchModel } from "./scaffbench-2-data";

export const SCAFFBENCH22_META = ${JSON.stringify(meta, null, 2)} as const;

export const SCAFFBENCH22_SPECS = ${JSON.stringify(specIds)} as const;

export const SCAFFBENCH22_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};

export const SCAFFBENCH22_CELLS: readonly ScaffbenchCell[] = ${JSON.stringify(cells, null, 2)};
`;
  const target = "apps/web/src/components/home/scaffbench-2-2-data.ts";
  writeFileSync(target, out);
  console.error(`Wrote ${target}: ${models.length} models, ${cells.length} cells`);
  for (const m of models) {
    const mc = cells.filter((c) => c.modelKey === m.key && c.scored);
    const trials = mc.reduce((s, c) => s + (c.scoredTrials ?? 1), 0);
    const passes = mc.reduce((s, c) => s + (c.passCount ?? 0), 0);
    const q = mc.reduce((s, c) => s + (c.qualityPassCount ?? 0), 0);
    console.error(
      `  ${m.label} (${m.effort}): build ${passes}/${trials}, quality ${q}/${trials}, index ${m.sortIndex}, ${m.eligibility}`,
    );
  }
}

main();
