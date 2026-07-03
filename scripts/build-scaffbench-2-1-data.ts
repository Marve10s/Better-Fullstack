/**
 * Regenerate apps/web/src/components/home/scaffbench-2-1-data.ts from the
 * ScaffBench V2.1 run summaries.
 *
 * V2.1 is the expanded 13-spec suite (Java + Elixir ecosystems, two prompt-only
 * frontier specs, dotnet validated for real). Rows so far:
 *   - Opus 4.8 · low  — full 13-spec ablation (first V2.1 run).
 *   - Opus 4.8 · max  — 8-spec slice (the common set both max runs share so far).
 *   - Sonnet 5 · max  — 8-spec slice (early-validated snapshot).
 * The two max rows publish the 8 specs that are validated for both models; the
 * remaining specs are added once both full runs finish.
 *
 * Per cell we derive the same signals as build-scaffbench-data.ts. A spec whose
 * validator produced ZERO core steps is marked INCONCLUSIVE (scored:false) and
 * excluded from the rate — e.g. multi-ts-go-grpc, where the models built a
 * frontend/+backend/ layout but the harness only scans the project root. Run with
 * `bun run`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { corePass, fullPass } from "./build-scaffbench-data";
import { extractToolUses, providerForModel } from "./scaffbench-v2-lib";

// Each source = one (model, effort) leaderboard row. `specs` restricts which
// cells are emitted (omit = all specs in the summary).
const RUN_SOURCES: { dir: string; specs?: string[] }[] = [
  { dir: "testing/llm-benchmarks/v2/opus48-low-prompt-2026-06-30" },
  // Opus max is a COMPLETE 13-spec run — publish all of it (full low-vs-max).
  { dir: "testing/llm-benchmarks/v2/opus48-max-prompt-2026-06-30" },
  // Sonnet 5 max full 13 (clean re-validation snapshot).
  { dir: "testing/llm-benchmarks/early-sonnet/sonnet5-max-EARLY" },
  // High-effort field: Sonnet 4.6 (Claude), GPT-5.3 Codex Spark (Codex adapter),
  // Gemini 3.5 Flash (Antigravity `agy` adapter).
  { dir: "testing/llm-benchmarks/v2/sonnet46-high-prompt-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-codex/spark-high-prompt-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-gemini/gemini35flash-high-prompt-2026-07-01" },
  // GPT-5.5 High (Codex adapter) — full 13-spec prompt-only run.
  { dir: "testing/llm-benchmarks/v2/gpt-5-5-high-prompt-2026-07-03" },
  // Free tier — opencode (DeepSeek, MiMo) and Kilo (Nemotron 30B/550B). Near-zero
  // build pass; the opencode pair wire ~82% (frontier-level stack selection, can't
  // assemble), the Kilo nemotrons barely produce measurable projects (7-19% wired).
  { dir: "testing/llm-benchmarks/v2-f1/deepseek-v4-flash-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-f2/mimo-v2.5-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-f4/nemotron-nano-30b-2026-07-01" },
  { dir: "testing/llm-benchmarks/v2-f3/nemotron-ultra-550b-2026-07-01" },
];

// Long/uppercased model slugs get a clean leaderboard label.
const MODEL_LABELS: Record<string, string> = {
  "gpt-5.3-codex-spark": "Codex Spark",
  "opencode/deepseek-v4-flash-free": "DeepSeek V4 Flash",
  "opencode/mimo-v2.5-free": "MiMo V2.5",
  "kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free": "Nemotron 3 Nano 30B",
  "kilo/nvidia/nemotron-3-ultra-550b-a55b:free": "Nemotron 3 Ultra 550B",
};

const PATH_ORDER = ["prompt", "mcp", "cli"] as const;
const GATE = /^(lint|format|test|doctor|route)$/i;
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

// Count CORE validation steps that actually ran (excludes the quality gate and
// "na" steps). Zero means the harness couldn't measure the project at all.
function coreStepCount(result: any): number {
  const steps = result?.validation?.steps ?? {};
  return Object.entries(steps).filter(
    ([k, s]: any) => !GATE.test(k) && s && s.status !== "na",
  ).length;
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
  durationMs: number | null;
};

function main() {
  const models: any[] = [];
  const cells: Cell[] = [];
  let meta: any = null;
  const specSet = new Set<string>();

  for (const source of RUN_SOURCES) {
    const s = JSON.parse(readFileSync(`${source.dir}/summary.json`, "utf8"));
    // Derive model/effort from the per-result fields, not options: a
    // --validate-existing pass (e.g. the Sonnet snapshot) rewrites options.model
    // to its own default ("opus"), but each result keeps its true generation model.
    const first = s.results[0] ?? {};
    const model: string = first.model ?? s.options.model;
    const effort: string = first.effort ?? s.options.efforts[0];
    const provider = providerForModel(model);
    const modelKey = `${model}|${effort}`;
    if (!meta) {
      meta = {
        harnessVersion: s.harnessVersion,
        generatorVersion: s.metadata?.bfGeneratorVersion ?? "2.1.3",
        generatedAt: s.generatedAt,
      };
    }
    const resByCell = new Map(s.results.map((r: any) => [`${r.path}|${r.specId}`, r]));
    const wanted = source.specs ? new Set(source.specs) : null;

    const coreFlags: boolean[] = [];
    const wiredAll: number[] = [];
    const cmdAll: number[] = [];
    for (const c of s.aggregates.bySpecCell) {
      if (wanted && !wanted.has(c.specId)) continue;
      specSet.add(c.specId);
      const result: any = resByCell.get(`${c.path}|${c.specId}`);
      let stdout = "";
      try {
        stdout = readFileSync(path.join(result.runDir, "claude.stdout.json"), "utf8");
      } catch {}
      // A run is scored only if it generated a project AND the harness ran at
      // least one CORE validation step. Zero core steps = INCONCLUSIVE (validator
      // couldn't locate the project, e.g. a non-root frontend/+backend/ layout).
      const measurable = coreStepCount(result) > 0;
      const scored = c.scoredRuns > 0 && measurable;
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
        durationMs: c.medianDurationMs && c.medianDurationMs > 0 ? Math.round(c.medianDurationMs) : null,
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

  // Spec order: the canonical 13-spec order (low run defines it).
  const specIds = [...specSet];
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
// prompt-only frontier specs; .NET validated for real). Rows: Opus 4.8 low (full
// 13-spec ablation), Opus 4.8 max + Claude Sonnet 5 max (the 8 specs validated for
// both so far). Per-cell signals from the harness bySpecCell aggregate; corePass
// from validation steps minus the quality gate; a run with zero core steps is
// INCONCLUSIVE (scored:false) — e.g. multi-ts-go-grpc's frontend/+backend/ layout
// the root-only validator can't locate. Cost metered; steps from the trajectory.
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
    const mc = cells.filter((c) => c.modelKey === m.key);
    const scored = mc.filter((c) => c.scored);
    const pass = scored.filter((c) => c.corePass).length;
    console.error(
      `  ${m.label.padEnd(11)} ${m.effort.padEnd(6)} index=${m.sortIndex} | ${mc.length} cells, core ${pass}/${scored.length} (${mc.length - scored.length} inconclusive)`,
    );
  }
}

if (import.meta.main) main();
