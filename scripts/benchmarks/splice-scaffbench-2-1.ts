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
 * Run with `bun run scripts/benchmarks/splice-scaffbench-2-1.ts`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { parseCodexResult, providerForModel } from "@scaffbench/index";

import {
  SCAFFBENCH21_CELLS as EXISTING_CELLS,
  SCAFFBENCH21_META as EXISTING_META,
  SCAFFBENCH21_MODELS as EXISTING_MODELS,
  SCAFFBENCH21_SPECS as EXISTING_SPECS,
} from "@web/components/home/scaffbench-2-1-data";
import { buildPublishedCells, type PublishedCell } from "@scripts/benchmarks/build-scaffbench-2-1-data";
import { scaffbenchIndex } from "@scripts/benchmarks/build-scaffbench-data";

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
  // Empty: every published row lives in the committed data (source dirs for
  // older batches are gone from disk; splice merges, never regenerates).
];

// Extra-lane runs merged into EXISTING rows: their cells are appended under the
// row's modelKey (replacing any same-path cells) but the board row itself —
// label, effort, sortIndex — is left untouched, so the main leaderboard stays a
// prompt-only comparison. These cells feed the MCP tab.
// `createRow: true` lets an assisted-lane source add its (model, effort) row when
// the board has none: the row's sortIndex derives from PROMPT cells only (0 when
// the source is MCP-only), so it sorts last on the prompt-ranked main board and
// surfaces only on tabs whose path it was actually swept on.
const MERGE_SOURCES: { dir: string; specs?: string[]; createRow?: boolean }[] = [
  // MCP lane, GPT-5.6 high ablation (2026-07-17).
  {
    dir: "testing/llm-benchmarks/v2-codex-terra/gpt-5-6-terra-high-mcp-2026-07-17",
    createRow: true,
  },
  { dir: "testing/llm-benchmarks/v2-codex-sol/gpt-5-6-sol-high-mcp-2026-07-17" },
];

const MODEL_LABELS: Record<string, string> = {
  "gpt-5.6-sol": "GPT-5.6 Sol",
  "gpt-5.6-luna": "GPT-5.6 Luna",
  "gpt-5.6-terra": "GPT-5.6 Terra",
  "opencode/hy3-free": "Hy3",
  "opencode-go/glm-5.2": "GLM 5.2",
};

const PATH_ORDER = ["prompt", "mcp", "cli"] as const;
// Step keys may be namespaced "<subroot>:<step>" (multi-root validation);
// the advisory/core split is decided by the base name after the last ":".
const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const W = {
  prompt: { macroPass: 0.75, wired: 0.25, cmd: 0 },
  assisted: { macroPass: 0.6, wired: 0.25, cmd: 0.15 },
} as const;

function prettyModel(model: string): string {
  if (MODEL_LABELS[model]) return MODEL_LABELS[model];
  if (/^gpt/i.test(model)) return model.toUpperCase();
  return model
    .replace(/^claude-/, "")
    .replace(/(\d)-(\d)/g, "$1.$2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type Cell = PublishedCell & { path: (typeof PATH_ORDER)[number] };
type Model = (typeof EXISTING_MODELS)[number];

export function normalizeExistingCell(cell: (typeof EXISTING_CELLS)[number]): Cell {
  const existing = cell as typeof cell & Partial<PublishedCell>;
  const scoredTrials = existing.scoredTrials ?? (cell.scored ? 1 : 0);
  const passCount = existing.passCount ?? (cell.corePass ? 1 : 0);
  return {
    ...cell,
    path: cell.path,
    fullPass: cell.fullPass,
    trials: existing.trials ?? 1,
    scoredTrials,
    passCount,
    passRate: existing.passRate ?? (scoredTrials > 0 ? passCount * 100 : 0),
    passAny: existing.passAny ?? passCount > 0,
    passAll: existing.passAll ?? (scoredTrials === 1 && passCount === 1),
    qualityPassCount:
      cell.fullPass === null ? null : (existing.qualityPassCount ?? (cell.fullPass ? 1 : 0)),
    qualityPassRate:
      cell.fullPass === null ? null : (existing.qualityPassRate ?? (cell.fullPass ? 100 : 0)),
    durationMs: existing.durationMs ?? null,
    lines: typeof existing.lines === "number" ? existing.lines : null,
  };
}

function computeSource(source: { dir: string; specs?: string[] }): {
  model: Model;
  cells: Cell[];
} {
  const summary = JSON.parse(readFileSync(`${source.dir}/summary.json`, "utf8"));
  const first = summary.results[0] ?? {};
  const model: string = first.model ?? summary.options.model;
  const effort: string = first.effort ?? summary.options.efforts[0];
  const provider = providerForModel(model);
  const modelKey = `${model}|${effort}`;
  const cells = buildPublishedCells(summary, source.dir, source.specs).map((cell) => ({
    ...cell,
    path: cell.path as Cell["path"],
  }));
  if (cells.some((cell) => cell.modelKey !== modelKey)) {
    throw new Error(`${source.dir}: splice sources must contain one model|effort row`);
  }

  // Older Codex summaries did not persist priced cost; recover the mean from all
  // trial streams without collapsing the trial dimension.
  if (provider === "codex") {
    for (const cell of cells) {
      if (cell.costUsd !== null) continue;
      const costs = summary.results
        .filter(
          (result: any) =>
            result.model === model &&
            result.effort === effort &&
            result.path === cell.path &&
            result.specId === cell.spec,
        )
        .map((result: any) => {
          try {
            const stdout = readFileSync(path.join(result.runDir, "claude.stdout.json"), "utf8");
            return parseCodexResult(stdout, model)?.total_cost_usd;
          } catch {
            return undefined;
          }
        })
        .filter((cost: unknown): cost is number => typeof cost === "number" && cost > 0);
      if (costs.length > 0) cell.costUsd = mean(costs);
    }
  }

  const scored = cells.filter((cell) => cell.scored);
  const recomputedIndex = Math.round(
    mean(
      scored.map((cell) => scaffbenchIndex(cell.path, cell.passRate, cell.wiredPct, cell.cmdPct)),
    ),
  );
  return {
    model: {
      key: modelKey,
      model,
      effort,
      effectiveReasoning: first.effectiveReasoning ?? effort,
      provider,
      label: prettyModel(model),
      sortIndex: recomputedIndex,
    } as Model,
    cells,
  };
}

function computeNew() {
  const models: Model[] = [];
  const cells: Cell[] = [];
  for (const source of RUN_SOURCES) {
    if (!existsSync(path.join(source.dir, "summary.json"))) {
      console.error(`Skipping missing run source: ${source.dir}`);
      continue;
    }
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
  let cells: Cell[] = [
    ...EXISTING_CELLS.filter((c) => !newKeys.has(c.modelKey)).map(normalizeExistingCell),
    ...newCells,
  ];

  // Extra lanes: append cells under an existing row (replacing same-path cells)
  // without recomputing that row — the board stays prompt-ranked.
  for (const source of MERGE_SOURCES) {
    if (!existsSync(path.join(source.dir, "summary.json"))) {
      console.error(`Skipping missing merge source: ${source.dir}`);
      continue;
    }
    const merged = computeSource(source);
    if (!models.some((m) => m.key === merged.model.key)) {
      if (!source.createRow) {
        throw new Error(
          `${source.dir}: merge target row ${merged.model.key} is not on the board; splice it via RUN_SOURCES first (or set createRow)`,
        );
      }
      const promptCells = merged.cells.filter((c) => c.path === "prompt" && c.scored);
      const promptMacro = promptCells.length
        ? (100 * promptCells.filter((c) => c.corePass).length) / promptCells.length
        : 0;
      models.push({
        ...merged.model,
        sortIndex: Math.round(
          scaffbenchIndex(
            "prompt",
            promptMacro,
            mean(promptCells.map((c) => c.wiredPct)),
            mean(promptCells.map((c) => c.cmdPct)),
          ),
        ),
      });
    }
    const replaced = new Set(merged.cells.map((c) => `${c.modelKey}|${c.path}`));
    cells = cells.filter((c) => !replaced.has(`${c.modelKey}|${c.path}`)).concat(merged.cells);
  }

  // Re-sort exactly like the build script: models by index desc; cells by model
  // rank, then path order, then the canonical spec order.
  models.sort((a, b) => b.sortIndex - a.sortIndex);
  const modelRank = new Map(models.map((m, i) => [m.key, i]));
  const specIds: string[] = [...EXISTING_SPECS];
  cells.sort(
    (a, b) =>
      modelRank.get(a.modelKey)! - modelRank.get(b.modelKey)! ||
      PATH_ORDER.indexOf(a.path as any) - PATH_ORDER.indexOf(b.path as any) ||
      specIds.indexOf(a.spec) - specIds.indexOf(b.spec),
  );

  const out = `// AUTO-GENERATED from the ScaffBench V2.1 run summaries (see scripts/benchmarks/build-scaffbench-2-1-data.ts,
// spliced by scripts/benchmarks/splice-scaffbench-2-1.ts). V2.1 is the expanded 13-spec suite.
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

export const SCAFFBENCH21_META = ${JSON.stringify({ ...EXISTING_META, indexWeights: W }, null, 2)} as const;

export const SCAFFBENCH21_SPECS = ${JSON.stringify(specIds)} as const;

export const SCAFFBENCH21_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};

export const SCAFFBENCH21_CELLS: readonly Scaffbench21Cell[] = ${JSON.stringify(cells, null, 2)};
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

if (import.meta.main) main();
