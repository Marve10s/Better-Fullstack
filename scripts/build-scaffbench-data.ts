/**
 * Regenerate apps/web/src/components/home/scaffbench-2-data.ts from the six
 * ScaffBench 2 run summaries (Opus 4.8/4.7/4.6/4.5 + GPT-5.5 low/medium).
 *
 * Per cell we derive: scored (not infra-inconclusive), corePass (validation steps
 * minus the quality gate), fullPass (harness gate-inclusive pass), wired/cmd from
 * the aggregate, steps from the saved trajectory, and cost (claude: metered;
 * codex/GPT: estimated from token usage × pricing). Run with `bun run`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  codexCostUsd,
  extractToolUses,
  parseCodexResult,
  providerForModel,
} from "./scaffbench-v2-lib";

const BASE = "testing/llm-benchmarks/v2";
const RUNS = [
  "opus48-default-2026-06-26",
  "opus48-max-2026-06-26",
  "opus47-default-2026-06-26",
  "opus46-default-2026-06-26",
  "opus45-default-2026-06-26",
  "gpt55-low-2026-06-26",
  "gpt55-medium-2026-06-26",
  "gpt55-xhigh-2026-06-26",
  // Free-tier contrast: two free models driven through opencode / Kilo Code.
  "opencode-northmini-2026-06-26",
  "kilo-nemotron-2026-06-26",
];
// The free models carry long provider/model slugs that prettyModel would mangle
// ("Kilo/Nvidia/Nemotron 3 Super 120b A12b:Free"); give them clean display labels.
const MODEL_LABELS: Record<string, string> = {
  "opencode/north-mini-code-free": "North-mini Code",
  "kilo/nvidia/nemotron-3-super-120b-a12b:free": "Nemotron-3 Super",
};
const PATH_ORDER = ["prompt", "mcp", "cli"] as const;
// Quality-gate steps excluded from Core pass — they only affect Full pass. A
// failed route-check (dev server didn't boot) must not fail Core, same as a
// failed lint/format/test/doctor. (No step uses `clippy`/`fmt` keys, so those
// dead alternatives were removed.)
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

// A step is green when it actually ran and exited 0. A "skip" (a gate check that
// should have run but no tool was configured) is NOT green — it carries exitCode
// null and disqualifies the run. (Matches validationPassed in the harness lib.)
export function stepGreen(s: any): boolean {
  return s.status !== "skip" && s.exitCode === 0 && !s.timedOut && !s.spawnError;
}

export function corePass(result: any): boolean {
  const v = result?.validation;
  if (!v || !v.projectExists) return false;
  // "na" steps are excluded (not applicable); core steps are the non-gate ones.
  const core = Object.entries(v.steps || {})
    .filter(([k]) => !GATE.test(k))
    .filter(([, s]: any) => s.status !== "na");
  if (!core.length) return false;
  return core.every(([, s]: any) => stepGreen(s));
}

// Full pass = Core pass AND every applicable quality-gate step actually ran and
// passed. We compute it here (not via the harness `passRate === 100`) so the
// status semantics are honored: passRate was VACUOUSLY 100 when zero steps ran,
// and skipped lint/test / a `biome check --write` format step exited 0 and passed
// silently (the Finding-1 inflation). "na" steps (genuinely testless scaffolds)
// are excluded; a "skip" disqualifies. This also keeps fullPass ⊆ corePass.
export function fullPass(result: any): boolean {
  if (!corePass(result)) return false;
  const v = result.validation;
  const applicable = Object.entries(v.steps || {}).filter(([, s]: any) => s.status !== "na");
  if (!applicable.length) return false;
  return applicable.every(([, s]: any) => stepGreen(s));
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
      generatorVersion: s.metadata?.bfGeneratorVersion ?? "2.1.1",
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
    // multi-dotnet-ops is unvalidatable in this environment (no .NET SDK), so
    // exclude it UNIFORMLY — the harness otherwise scores it inconsistently
    // (toolchain-missing exit 127 → inconclusive when a .NET project exists, but
    // a plain model-failure when the agent produced no .NET project at all),
    // which would give a handful of configs a 5-spec denominator vs everyone
    // else's 4. Excluding it keeps every cell's denominator consistent.
    const scored = c.scoredRuns > 0 && c.specId !== "multi-dotnet-ops";
    const core = scored ? corePass(result) : false;
    let cost: number | null = null;
    if (provider === "codex") {
      const parsed = parseCodexResult(stdout, model);
      cost = parsed?.total_cost_usd ?? null;
    } else {
      cost = c.avgCostUsd && c.avgCostUsd > 0 ? c.avgCostUsd : null;
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
    });
    if (scored) {
      coreFlags.push(core);
      wiredAll.push(c.stackPercent ?? 0);
      cmdAll.push(c.commandDisciplinePercent ?? 0);
    }
  }
  const coreMacro = coreFlags.length ? (100 * coreFlags.filter(Boolean).length) / coreFlags.length : 0;
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

// Sort model groups by overall Index (desc) — the leaderboard's own ordering.
models.sort((a, b) => b.sortIndex - a.sortIndex);
// Order cells by model (sorted), then path, then spec — stable + readable.
const modelRank = new Map(models.map((m, i) => [m.key, i]));
cells.sort(
  (a, b) =>
    (modelRank.get(a.modelKey)! - modelRank.get(b.modelKey)!) ||
    PATH_ORDER.indexOf(a.path as any) - PATH_ORDER.indexOf(b.path as any) ||
    specIds.indexOf(a.spec) - specIds.indexOf(b.spec),
);

const out = `// AUTO-GENERATED from ten ScaffBench 2 run summaries (see scripts/build-scaffbench-data.ts).
// Models: Opus 4.8/4.7/4.6/4.5 (Claude Code), GPT-5.5 low/medium/xhigh (Codex), and two
// free-tier models — North-mini Code (opencode) + Nemotron-3 Super (Kilo Code). 2026-06-26.
// Per-cell signals from the harness bySpecCell aggregate (wired = stackPercent, cmd =
// commandDisciplinePercent); corePass derived from validation steps minus the quality gate;
// steps from the saved trajectory; GPT cost estimated from token usage × OpenAI pricing.
export type ScaffbenchPath = "mcp" | "cli" | "prompt";

export type ScaffbenchModel = {
  key: string;
  model: string;
  effort: string;
  effectiveReasoning: string;
  provider: "claude" | "codex" | "opencode" | "kilo" | "agy";
  label: string;
  /** overall ScaffBench Index across all scored cells — the group sort key. */
  sortIndex: number;
};

export type ScaffbenchCell = {
  /** "<model>|<effort>" — joins a cell to its ScaffbenchModel. */
  modelKey: string;
  path: ScaffbenchPath;
  spec: string;
  /** false when the run was infra-inconclusive (timed-out toolchain) — excluded from rates. */
  scored: boolean;
  corePass: boolean;
  fullPass: boolean;
  wiredPct: number;
  cmdPct: number;
  costUsd: number | null;
  outTokens: number | null;
  steps: number;
};

export const SCAFFBENCH2_META = {
  harnessVersion: ${JSON.stringify(meta.harnessVersion)},
  generatorVersion: ${JSON.stringify(meta.generatorVersion)},
  generatedAt: ${JSON.stringify(meta.generatedAt)},
  indexWeights: { macroPass: ${W.macroPass}, wired: ${W.wired}, cmd: ${W.cmd} },
} as const;

export const SCAFFBENCH2_SPECS = ${JSON.stringify(specIds)} as const;

export const SCAFFBENCH2_MODELS: readonly ScaffbenchModel[] = ${JSON.stringify(models, null, 2)};

export const SCAFFBENCH2_CELLS: readonly ScaffbenchCell[] = ${JSON.stringify(cells, null, 2)};
`;

const target = "apps/web/src/components/home/scaffbench-2-data.ts";
writeFileSync(target, out);
console.error(`Wrote ${target}: ${models.length} models, ${cells.length} cells`);
for (const m of models) console.error(`  ${m.label.padEnd(12)} ${m.effort.padEnd(8)} index=${m.sortIndex} (${m.provider})`);
}

// Only regenerate the data file when run directly (`bun run scripts/build-scaffbench-data.ts`);
// importing this module (e.g. from the test) exposes the gate helpers without side effects.
if (import.meta.main) main();
