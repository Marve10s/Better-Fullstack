/**
 * Splice new model rows into apps/web/src/components/home/scaffbench-2-1-data.ts
 * WITHOUT regenerating the existing rows.
 *
 * build-scaffbench-2-1-data.ts is a full regenerate that reads every RUN_SOURCES
 * summary — but most of those testing/ dirs are gitignored and gone, so a full
 * regen would silently drop opus/sonnet/spark/gemini/free-tier. This script instead
 * imports the committed data, computes ONLY the new (model,effort) rows below, and
 * merges them in. Same per-cell computation as the build script.
 *
 * Run with `bun run scripts/splice-scaffbench-2-1.ts`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { corePass, fullPass } from "./build-scaffbench-data";
import { extractToolUses, parseCodexResult, providerForModel } from "./scaffbench-v2-lib";
import {
  SCAFFBENCH21_CELLS as EXISTING_CELLS,
  SCAFFBENCH21_META as EXISTING_META,
  SCAFFBENCH21_MODELS as EXISTING_MODELS,
  SCAFFBENCH21_SPECS as EXISTING_SPECS,
} from "../apps/web/src/components/home/scaffbench-2-1-data";

// hy3 published WITHOUT the two opencode free-tier infra deaths (elixir stalled
// mid-stream, react-native-expo returned 0 bytes — both are endpoint failures,
// not model build failures). The two frontier specs never generated. So hy3 is
// scored only on the 9 specs that genuinely ran.
const HY3_GOOD = [
  "ai-search-workbench",
  "rust-leptos-axum",
  "python-ingestion-api",
  "go-realtime-api",
  "multi-dotnet-ops",
  "ts-svelte-edge-orpc",
  "dotnet-blazor-cqrs",
  "multi-ts-go-grpc",
  "java-spring-jooq-keycloak",
];

// New (model, effort) rows to add — plus every pre-existing row whose run
// artifacts survive on disk, re-scored under the 2026-07-10 validator fixes
// (multi-root manifest discovery, no vacuous install-only passes). Rows whose
// artifacts are gone keep their old-validator numbers; see the blog note.
const RUN_SOURCES: { dir: string; specs?: string[] }[] = [
  { dir: "testing/llm-benchmarks/v2-codex-sol/gpt-5-6-sol-high-2026-07-09" },
  { dir: "testing/llm-benchmarks/v2-codex/gpt-5-6-luna-medium-2026-07-09" },
  { dir: "testing/llm-benchmarks/v2-codex-terra/gpt-5-6-terra-medium-2026-07-09" },
  { dir: "testing/llm-benchmarks/v2-f/hy3-free-2026-07-09", specs: HY3_GOOD },
  { dir: "testing/llm-benchmarks/v2/gpt-5-5-high-prompt-2026-07-03" },
  { dir: "testing/llm-benchmarks/v2/fable5-low-prompt-2026-07-06" },
  { dir: "testing/llm-benchmarks/v2/fable5-high-prompt-2026-07-06" },
  // Max-effort ablation (2026-07-10).
  { dir: "testing/llm-benchmarks/v2-codex-sol/gpt-5-6-sol-max-2026-07-10" },
  { dir: "testing/llm-benchmarks/v2-codex/gpt-5-6-luna-max-2026-07-10" },
];

// Extra-lane runs merged into EXISTING rows: their cells are appended under the
// row's modelKey (replacing any same-path cells) but the board row itself —
// label, effort, sortIndex — is left untouched, so the main leaderboard stays a
// prompt-only comparison. These cells feed the MCP tab.
const MERGE_SOURCES: { dir: string; specs?: string[] }[] = [
  { dir: "testing/llm-benchmarks/v2-codex/gpt-5-6-luna-medium-mcp-2026-07-10" },
];

const MODEL_LABELS: Record<string, string> = {
  "gpt-5.6-sol": "GPT-5.6 Sol",
  "gpt-5.6-luna": "GPT-5.6 Luna",
  "gpt-5.6-terra": "GPT-5.6 Terra",
  "opencode/hy3-free": "Hy3",
};

const PATH_ORDER = ["prompt", "mcp", "cli"] as const;
// Step keys may be namespaced "<subroot>:<step>" (multi-root validation);
// the advisory/core split is decided by the base name after the last ":".
const GATE = /(?:^|:)(lint|format|test|doctor|route)$/i;
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

function coreStepCount(result: any): number {
  const steps = result?.validation?.steps ?? {};
  return Object.entries(steps).filter(([k, s]: any) => !GATE.test(k) && s && s.status !== "na")
    .length;
}

type Cell = (typeof EXISTING_CELLS)[number];
type Model = (typeof EXISTING_MODELS)[number];

function computeSource(source: { dir: string; specs?: string[] }): {
  model: Model;
  cells: Cell[];
} {
  const cells: Cell[] = [];
  {
    const s = JSON.parse(readFileSync(`${source.dir}/summary.json`, "utf8"));
    const first = s.results[0] ?? {};
    const model: string = first.model ?? s.options.model;
    const effort: string = first.effort ?? s.options.efforts[0];
    const provider = providerForModel(model);
    const modelKey = `${model}|${effort}`;
    // The path|spec key collapses multi-effort/multi-trial dirs to an arbitrary
    // result — refuse them instead of publishing a mismatched verdict.
    const cellKeys = s.results.map((r: any) => `${r.path}|${r.specId}`);
    if (new Set(cellKeys).size !== cellKeys.length) {
      throw new Error(
        `${source.dir}: duplicate path|spec cells (multi-effort or repeated trials); the splice supports single-effort, repeats=1 dirs only`,
      );
    }
    const resByCell = new Map(s.results.map((r: any) => [`${r.path}|${r.specId}`, r]));
    const wanted = source.specs ? new Set(source.specs) : null;

    const coreFlags: boolean[] = [];
    const wiredAll: number[] = [];
    const cmdAll: number[] = [];
    for (const c of s.aggregates.bySpecCell) {
      if (wanted && !wanted.has(c.specId)) continue;
      const result: any = resByCell.get(`${c.path}|${c.specId}`);
      let stdout = "";
      try {
        stdout = readFileSync(path.join(result.runDir, "claude.stdout.json"), "utf8");
      } catch {}
      const measurable = coreStepCount(result) > 0;
      const scored = c.scoredRuns > 0 && measurable;
      const core = scored ? corePass(result) : false;
      // Codex (GPT) runs report no cost at generation time, so the summary carries
      // none. Recompute from the run's raw token usage now that CODEX_PRICING knows
      // the GPT-5.6 tiers. Free opencode runs (Hy3) legitimately stay null ($0).
      let cost = c.avgCostUsd && c.avgCostUsd > 0 ? c.avgCostUsd : null;
      if (!cost && provider === "codex" && stdout) {
        const recomputed = parseCodexResult(stdout, model)?.total_cost_usd;
        if (recomputed && recomputed > 0) cost = recomputed;
      }
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
      } as Cell);
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
    return {
      model: {
        key: modelKey,
        model,
        effort,
        effectiveReasoning: (resByCell.values().next().value as any)?.effectiveReasoning ?? effort,
        provider,
        label: prettyModel(model),
        sortIndex,
      } as Model,
      cells,
    };
  }
}

function computeNew() {
  const models: Model[] = [];
  const cells: Cell[] = [];
  for (const source of RUN_SOURCES) {
    const computed = computeSource(source);
    models.push(computed.model);
    cells.push(...computed.cells);
  }
  return { models, cells };
}

function main() {
  const { models: newModels, cells: newCells } = computeNew();
  const newKeys = new Set(newModels.map((m) => m.key));

  // Merge: keep every existing row whose key we are not replacing, add the new ones.
  const models = [...EXISTING_MODELS.filter((m) => !newKeys.has(m.key)), ...newModels];
  let cells = [...EXISTING_CELLS.filter((c) => !newKeys.has(c.modelKey)), ...newCells];

  // Extra lanes: append cells under an existing row (replacing same-path cells)
  // without recomputing that row — the board stays prompt-ranked.
  for (const source of MERGE_SOURCES) {
    const merged = computeSource(source);
    if (!models.some((m) => m.key === merged.model.key)) {
      throw new Error(
        `${source.dir}: merge target row ${merged.model.key} is not on the board; splice it via RUN_SOURCES first`,
      );
    }
    const replaced = new Set(merged.cells.map((c) => `${c.modelKey}|${c.path}`));
    cells = cells.filter((c) => !replaced.has(`${c.modelKey}|${c.path}`)).concat(merged.cells);
  }

  // Re-sort exactly like the build script: models by index desc; cells by model
  // rank, then path order, then the canonical spec order.
  models.sort((a, b) => b.sortIndex - a.sortIndex);
  const modelRank = new Map(models.map((m, i) => [m.key, i]));
  const specIds = [...EXISTING_SPECS];
  cells.sort(
    (a, b) =>
      modelRank.get(a.modelKey)! - modelRank.get(b.modelKey)! ||
      PATH_ORDER.indexOf(a.path as any) - PATH_ORDER.indexOf(b.path as any) ||
      specIds.indexOf(a.spec) - specIds.indexOf(b.spec),
  );

  const out = `// AUTO-GENERATED from the ScaffBench V2.1 run summaries (see scripts/build-scaffbench-2-1-data.ts,
// spliced by scripts/splice-scaffbench-2-1.ts). V2.1 is the expanded 13-spec suite.
import type { ScaffbenchCell, ScaffbenchModel } from "./scaffbench-2-data";

export const SCAFFBENCH21_META = ${JSON.stringify(EXISTING_META, null, 2)} as const;

export const SCAFFBENCH21_SPECS = ${JSON.stringify(specIds)} as const;

export const SCAFFBENCH21_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};

export const SCAFFBENCH21_CELLS: readonly ScaffbenchCell[] = ${JSON.stringify(cells, null, 2)};
`;
  const target = "apps/web/src/components/home/scaffbench-2-1-data.ts";
  writeFileSync(target, out);
  console.error(
    `Wrote ${target}: ${models.length} models (${newModels.length} new), ${cells.length} cells`,
  );
  for (const m of newModels) {
    const mc = newCells.filter((c) => c.modelKey === m.key && c.path === "prompt");
    const scored = mc.filter((c) => c.scored);
    const pass = scored.filter((c) => c.corePass);
    console.error(
      `  + ${m.label} (${m.effort}): ${pass.length}/${scored.length} pass, index ${m.sortIndex}`,
    );
  }
}

main();
