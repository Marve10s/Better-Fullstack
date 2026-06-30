/**
 * Regenerate apps/web/src/components/home/scaffbench-2-1-data.ts from the
 * ScaffBench V2.1 run summaries.
 *
 * V2.1 is the expanded 13-spec suite (Java + Elixir ecosystems, two prompt-only
 * frontier specs, dotnet validated for real now that the SDK is installed). The
 * first run is a single-agent ablation: Claude Opus 4.8 at low effort, Prompt
 * path only. Per cell we derive the same signals as the V2 generator
 * (build-scaffbench-data.ts): scored, corePass, fullPass, wired/cmd, cost,
 * tokens, steps. Unlike V2 there is NO multi-dotnet-ops exclusion — every spec
 * was validated with a real toolchain. Run with `bun run`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { corePass, fullPass } from "./build-scaffbench-data";
import { extractToolUses, providerForModel } from "./scaffbench-v2-lib";

const BASE = "testing/llm-benchmarks/v2";
// Append future V2.1 runs (more models / efforts on the expanded suite) here;
// the leaderboard + chart fill in automatically as rows are added.
const RUNS = ["opus48-low-prompt-2026-06-30"];

const MODEL_LABELS: Record<string, string> = {};
const PATH_ORDER = ["prompt", "mcp", "cli"] as const;
const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const W = { macroPass: 0.6, wired: 0.25, cmd: 0.15 };

function prettyModel(model: string): string {
  if (MODEL_LABELS[model]) return MODEL_LABELS[model];
  if (/^gpt/i.test(model)) return model.toUpperCase();
  return model
    .replace(/^claude-/, "")
    .replace(/(\d)-(\d)/g, "$1.$2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type Cell = {
  modelKey: string;
  path: string;
  spec: string;
  scored: boolean;
  corePass: boolean;
  fullPass: boolean;
  wiredPct: number;
  cmdPct: number;
  costUsd: number | null;
  outTokens: number | null;
  steps: number;
};

function main() {
  const models: any[] = [];
  const cells: Cell[] = [];
  let meta: any = null;
  let specIds: string[] = [];

  for (const dir of RUNS) {
    const s = JSON.parse(readFileSync(`${BASE}/${dir}/summary.json`, "utf8"));
    const model: string = s.options.model;
    const effort: string = s.options.efforts[0];
    const provider = providerForModel(model);
    const modelKey = `${model}|${effort}`;
    if (!meta) {
      meta = {
        harnessVersion: s.harnessVersion,
        generatorVersion: s.metadata?.bfGeneratorVersion ?? "2.1.3",
        generatedAt: s.generatedAt,
      };
      specIds = s.specs.map((x: any) => x.id);
    }
    const resByCell = new Map(s.results.map((r: any) => [`${r.path}|${r.specId}`, r]));

    const coreFlags: boolean[] = [];
    const wiredAll: number[] = [];
    const cmdAll: number[] = [];
    for (const c of s.aggregates.bySpecCell) {
      const result: any = resByCell.get(`${c.path}|${c.specId}`);
      let stdout = "";
      try {
        stdout = readFileSync(path.join(result.runDir, "claude.stdout.json"), "utf8");
      } catch {}
      // No per-spec exclusion: V2.1 validates every ecosystem (incl. .NET) with a
      // real toolchain, so every scored cell counts toward a uniform denominator.
      const scored = c.scoredRuns > 0;
      const core = scored ? corePass(result) : false;
      const cost = c.avgCostUsd && c.avgCostUsd > 0 ? c.avgCostUsd : null;
      cells.push({
        modelKey,
        path: c.path,
        spec: c.specId,
        scored,
        corePass: core,
        fullPass: scored ? fullPass(result) : false,
        wiredPct: c.stackPercent ?? 0,
        cmdPct: c.commandDisciplinePercent ?? 0,
        costUsd: cost,
        outTokens: c.avgOutputTokens && c.avgOutputTokens > 0 ? Math.round(c.avgOutputTokens) : null,
        steps: extractToolUses(stdout).length,
      });
      if (scored) {
        coreFlags.push(core);
        wiredAll.push(c.stackPercent ?? 0);
        cmdAll.push(c.commandDisciplinePercent ?? 0);
      }
    }
    const coreMacro = coreFlags.length
      ? (100 * coreFlags.filter(Boolean).length) / coreFlags.length
      : 0;
    const sortIndex = Math.round(
      W.macroPass * coreMacro + W.wired * mean(wiredAll) + W.cmd * mean(cmdAll),
    );
    models.push({
      key: modelKey,
      model,
      effort,
      effectiveReasoning: (resByCell.values().next().value as any)?.effectiveReasoning ?? effort,
      provider,
      label: prettyModel(model),
      sortIndex,
    });
  }

  models.sort((a, b) => b.sortIndex - a.sortIndex);
  const modelRank = new Map(models.map((m, i) => [m.key, i]));
  cells.sort(
    (a, b) =>
      modelRank.get(a.modelKey)! - modelRank.get(b.modelKey)! ||
      PATH_ORDER.indexOf(a.path as any) - PATH_ORDER.indexOf(b.path as any) ||
      specIds.indexOf(a.spec) - specIds.indexOf(b.spec),
  );

  const out = `// AUTO-GENERATED from the ScaffBench V2.1 run summaries (see scripts/build-scaffbench-2-1-data.ts).
// V2.1 is the expanded 13-spec suite (adds Java + Elixir ecosystems and two
// prompt-only frontier specs; .NET validated for real). First run: Claude Opus
// 4.8 at low effort, Prompt path only — a single-agent ablation on the new suite,
// so the leaderboard shows one model row until more configs are run. Per-cell
// signals from the harness bySpecCell aggregate; corePass derived from validation
// steps minus the quality gate; steps from the saved trajectory; cost metered.
import type { ScaffbenchCell, ScaffbenchModel } from "./scaffbench-2-data";

export const SCAFFBENCH21_META = {
  harnessVersion: ${JSON.stringify(meta.harnessVersion)},
  generatorVersion: ${JSON.stringify(meta.generatorVersion)},
  generatedAt: ${JSON.stringify(meta.generatedAt)},
  indexWeights: { macroPass: ${W.macroPass}, wired: ${W.wired}, cmd: ${W.cmd} },
} as const;

export const SCAFFBENCH21_SPECS = ${JSON.stringify(specIds)} as const;

export const SCAFFBENCH21_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};

export const SCAFFBENCH21_CELLS: readonly ScaffbenchCell[] = ${JSON.stringify(cells, null, 2)};
`;

  const target = "apps/web/src/components/home/scaffbench-2-1-data.ts";
  writeFileSync(target, out);
  console.error(`Wrote ${target}: ${models.length} models, ${cells.length} cells`);
  for (const m of models) {
    console.error(`  ${m.label.padEnd(12)} ${m.effort.padEnd(8)} index=${m.sortIndex}`);
  }
}

if (import.meta.main) main();
