import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

/**
 * Data sources:
 * - Claude sweep: testing/llm-benchmarks/benchmark-reports/claude-20260612-005109
 *   (June 12, Claude Code CLI; 36 runs = 3 models x 3 paths x 4 specs)
 * - GPT sweep: testing/llm-benchmarks/results/20260610-230521 (June 10, Codex CLI,
 *   pre-fix generator; 36 runs)
 * - Light sweep: testing/llm-benchmarks/results/oss-20260612-171555 +
 *   results/gemini-20260612-172309 (June 12; Gemini CLI, Kilo free tier, and
 *   opencode Go models; light-ts spec only, one run per model+path, so pass is
 *   0/100 and times carry parallel-contention noise)
 * "Builds passing" = real install + build, generator-bug failures and lint-only
 * failures excluded — see the ScaffBench blog post scoring policy.
 */

type PathId = "mcp" | "cli" | "prompt";

const PATH_ORDER: readonly PathId[] = ["mcp", "cli", "prompt"] as const;

const PATHS: Record<PathId, { glyph: string; short: string; detail: string }> = {
  mcp: {
    glyph: "●",
    short: "MCP",
    detail: "scaffolds through our MCP tools",
  },
  cli: {
    glyph: "●",
    short: "BF mention",
    detail: "agent composes the Better-Fullstack CLI command",
  },
  prompt: {
    glyph: "●",
    short: "Prompt",
    detail: "no Better-Fullstack — agent hand-writes every file",
  },
};

type ModelId =
  | "fable"
  | "opus"
  | "sonnet"
  | "spark"
  | "gpt54"
  | "gpt55"
  | "gemini31"
  | "kimi"
  | "glm51"
  | "minimax"
  | "qwen"
  | "deepseek"
  | "step"
  | "laguna"
  | "nex";

const MODELS: Record<ModelId, { label: string; short: string }> = {
  fable: { label: "Fable 5", short: "Fable" },
  opus: { label: "Opus 4.8", short: "Opus" },
  sonnet: { label: "Sonnet 4.6", short: "Sonnet" },
  spark: { label: "GPT-5.3 Codex Spark", short: "Spark" },
  gpt54: { label: "GPT-5.4", short: "GPT-5.4" },
  gpt55: { label: "GPT-5.5", short: "GPT-5.5" },
  gemini31: { label: "Gemini 3.1 Pro", short: "Gemini" },
  kimi: { label: "Kimi K2.6", short: "Kimi" },
  glm51: { label: "GLM-5.1", short: "GLM" },
  minimax: { label: "MiniMax M3", short: "MiniMax" },
  qwen: { label: "Qwen3.7 Max", short: "Qwen" },
  deepseek: { label: "DeepSeek-V4 Pro", short: "DeepSeek" },
  step: { label: "Step-3.7 Flash", short: "Step" },
  laguna: { label: "Laguna m.1", short: "Laguna" },
  nex: { label: "Nex N2-Pro", short: "Nex" },
};

const MODEL_ORDER: readonly ModelId[] = [
  "fable",
  "opus",
  "sonnet",
  "spark",
  "gpt54",
  "gpt55",
  "gemini31",
  "kimi",
  "glm51",
  "minimax",
  "qwen",
  "deepseek",
  "step",
  "laguna",
  "nex",
] as const;

const MODEL_GROUPS: readonly { label: string; detail: string; models: readonly ModelId[] }[] = [
  { label: "Claude Code", detail: "Jun 12 sweep", models: ["fable", "opus", "sonnet"] },
  { label: "Codex CLI", detail: "Jun 10 sweep", models: ["spark", "gpt54", "gpt55"] },
  { label: "Gemini CLI", detail: "Jun 12 light sweep", models: ["gemini31"] },
  {
    label: "opencode · Go",
    detail: "Jun 12 light sweep",
    models: ["kimi", "glm51", "minimax", "qwen", "deepseek"],
  },
  {
    label: "Kilo · free tier",
    detail: "Jun 12 light sweep",
    models: ["step", "laguna", "nex"],
  },
];

// Curated default: flagship + fastest model per vendor, prompt-only struggles visible.
const DEFAULT_MODELS: readonly ModelId[] = ["fable", "sonnet", "spark", "gpt54"] as const;

interface ChartPalette {
  grid: string;
  axisTick: string;
  axisLabel: string;
  note: string;
  circleStroke: string;
  models: Record<ModelId, string>;
}

const CHART_PALETTE: ChartPalette = {
  grid: "var(--ch-grid)",
  axisTick: "var(--ch-tick)",
  axisLabel: "var(--ch-label)",
  note: "var(--ch-note)",
  circleStroke: "var(--ch-stroke)",
  models: {
    fable: "var(--ch-fable)",
    opus: "var(--ch-opus)",
    sonnet: "var(--ch-sonnet)",
    spark: "var(--ch-spark)",
    gpt54: "var(--ch-gpt54)",
    gpt55: "var(--ch-gpt55)",
    gemini31: "var(--ch-gemini31)",
    kimi: "var(--ch-kimi)",
    glm51: "var(--ch-glm51)",
    minimax: "var(--ch-minimax)",
    qwen: "var(--ch-qwen)",
    deepseek: "var(--ch-deepseek)",
    step: "var(--ch-step)",
    laguna: "var(--ch-laguna)",
    nex: "var(--ch-nex)",
  },
};

const CHART_THEME_VARS = cn(
  "[--ch-grid:#ececec] [--ch-tick:#9c9a93] [--ch-label:#71706a] [--ch-note:#9c9a93] [--ch-stroke:#ffffff]",
  "[--ch-fable:#7ca111] [--ch-opus:#e85d11] [--ch-sonnet:#55534b]",
  "[--ch-spark:#0d9488] [--ch-gpt54:#4c5fd5] [--ch-gpt55:#c13a6e]",
  "[--ch-gemini31:#2563eb] [--ch-kimi:#9333ea] [--ch-glm51:#b45309] [--ch-minimax:#dc2626] [--ch-qwen:#0e7490]",
  "[--ch-deepseek:#4d7c0f] [--ch-step:#db2777] [--ch-laguna:#0369a1] [--ch-nex:#ca8a04]",
  "dark:[--ch-grid:#edebe414] dark:[--ch-tick:#6c6a61] dark:[--ch-label:#8f8d84] dark:[--ch-note:#8f8d84] dark:[--ch-stroke:#161614]",
  "dark:[--ch-fable:#b8d75e] dark:[--ch-opus:#e0894f] dark:[--ch-sonnet:#c9c7bf]",
  "dark:[--ch-spark:#4fd0c0] dark:[--ch-gpt54:#98a6f2] dark:[--ch-gpt55:#e887ad]",
  "dark:[--ch-gemini31:#82aaf2] dark:[--ch-kimi:#c08ef5] dark:[--ch-glm51:#dba05c] dark:[--ch-minimax:#ee8c8c] dark:[--ch-qwen:#5cc3dd]",
  "dark:[--ch-deepseek:#97c45c] dark:[--ch-step:#ee8fba] dark:[--ch-laguna:#6db6e3] dark:[--ch-nex:#e3b84e]",
);

type MetricKey = "time" | "tokens" | "pass" | "error";

interface ComboPoint {
  id: string;
  model: ModelId;
  path: PathId;
  /** avg scaffold seconds */
  time: number;
  /** avg output tokens, thousands */
  tokens: number;
  /** builds passing, % of included specs (generator-bug failures excluded) */
  pass: number;
  /** builds failing, % of included specs */
  error: number;
}

const COMBOS: readonly ComboPoint[] = [
  { id: "fable-mcp", model: "fable", path: "mcp", time: 172.6, tokens: 7.6, pass: 100, error: 0 },
  { id: "fable-cli", model: "fable", path: "cli", time: 405.7, tokens: 17.7, pass: 100, error: 0 },
  {
    id: "fable-prompt",
    model: "fable",
    path: "prompt",
    time: 572.8,
    tokens: 24.9,
    pass: 75,
    error: 25,
  },
  { id: "opus-mcp", model: "opus", path: "mcp", time: 97.1, tokens: 5.2, pass: 100, error: 0 },
  { id: "opus-cli", model: "opus", path: "cli", time: 154.7, tokens: 10.6, pass: 100, error: 0 },
  {
    id: "opus-prompt",
    model: "opus",
    path: "prompt",
    time: 510.8,
    tokens: 21.5,
    pass: 75,
    error: 25,
  },
  { id: "sonnet-mcp", model: "sonnet", path: "mcp", time: 70.3, tokens: 3.9, pass: 100, error: 0 },
  { id: "sonnet-cli", model: "sonnet", path: "cli", time: 98.3, tokens: 4.8, pass: 100, error: 0 },
  {
    id: "sonnet-prompt",
    model: "sonnet",
    path: "prompt",
    time: 464.9,
    tokens: 31.2,
    pass: 75,
    error: 25,
  },
  { id: "spark-mcp", model: "spark", path: "mcp", time: 32.4, tokens: 5.8, pass: 100, error: 0 },
  { id: "spark-cli", model: "spark", path: "cli", time: 65.6, tokens: 9.9, pass: 100, error: 0 },
  {
    id: "spark-prompt",
    model: "spark",
    path: "prompt",
    time: 44.8,
    tokens: 31.4,
    pass: 50,
    error: 50,
  },
  { id: "gpt54-mcp", model: "gpt54", path: "mcp", time: 92.0, tokens: 5.2, pass: 100, error: 0 },
  { id: "gpt54-cli", model: "gpt54", path: "cli", time: 156.0, tokens: 7.1, pass: 100, error: 0 },
  {
    id: "gpt54-prompt",
    model: "gpt54",
    path: "prompt",
    time: 203.1,
    tokens: 13.3,
    pass: 75,
    error: 25,
  },
  { id: "gpt55-mcp", model: "gpt55", path: "mcp", time: 76.5, tokens: 3.8, pass: 100, error: 0 },
  { id: "gpt55-cli", model: "gpt55", path: "cli", time: 74.1, tokens: 4.5, pass: 100, error: 0 },
  {
    id: "gpt55-prompt",
    model: "gpt55",
    path: "prompt",
    time: 264.2,
    tokens: 15.7,
    pass: 100,
    error: 0,
  },
  // Light sweep (light-ts only, one run per cell — pass is 0/100).
  // Gemini cells use the uncontended solo-sweep run.
  {
    id: "gemini31-mcp",
    model: "gemini31",
    path: "mcp",
    time: 60.2,
    tokens: 1.6,
    pass: 100,
    error: 0,
  },
  {
    id: "gemini31-cli",
    model: "gemini31",
    path: "cli",
    time: 26.7,
    tokens: 0.9,
    pass: 100,
    error: 0,
  },
  {
    id: "gemini31-prompt",
    model: "gemini31",
    path: "prompt",
    time: 123.6,
    tokens: 13.2,
    pass: 100,
    error: 0,
  },
  { id: "kimi-mcp", model: "kimi", path: "mcp", time: 311.2, tokens: 2.8, pass: 100, error: 0 },
  { id: "kimi-cli", model: "kimi", path: "cli", time: 24.3, tokens: 1.6, pass: 100, error: 0 },
  {
    id: "kimi-prompt",
    model: "kimi",
    path: "prompt",
    time: 371.9,
    tokens: 13.5,
    pass: 100,
    error: 0,
  },
  { id: "glm51-mcp", model: "glm51", path: "mcp", time: 45.9, tokens: 1.2, pass: 100, error: 0 },
  { id: "glm51-cli", model: "glm51", path: "cli", time: 67.4, tokens: 2.2, pass: 100, error: 0 },
  {
    id: "glm51-prompt",
    model: "glm51",
    path: "prompt",
    time: 693.9,
    tokens: 29.5,
    pass: 100,
    error: 0,
  },
  {
    id: "minimax-mcp",
    model: "minimax",
    path: "mcp",
    time: 68.7,
    tokens: 2.5,
    pass: 100,
    error: 0,
  },
  {
    id: "minimax-cli",
    model: "minimax",
    path: "cli",
    time: 31.9,
    tokens: 0.8,
    pass: 100,
    error: 0,
  },
  {
    id: "minimax-prompt",
    model: "minimax",
    path: "prompt",
    time: 712.9,
    tokens: 36.0,
    pass: 0,
    error: 100,
  },
  { id: "qwen-mcp", model: "qwen", path: "mcp", time: 80.2, tokens: 2.7, pass: 100, error: 0 },
  { id: "qwen-cli", model: "qwen", path: "cli", time: 35.2, tokens: 0.8, pass: 100, error: 0 },
  {
    id: "qwen-prompt",
    model: "qwen",
    path: "prompt",
    time: 378.9,
    tokens: 13.3,
    pass: 100,
    error: 0,
  },
  {
    id: "deepseek-mcp",
    model: "deepseek",
    path: "mcp",
    time: 42.9,
    tokens: 1.4,
    pass: 100,
    error: 0,
  },
  {
    id: "deepseek-cli",
    model: "deepseek",
    path: "cli",
    time: 40.0,
    tokens: 1.4,
    pass: 100,
    error: 0,
  },
  {
    id: "deepseek-prompt",
    model: "deepseek",
    path: "prompt",
    time: 357.4,
    tokens: 11.7,
    pass: 100,
    error: 0,
  },
  { id: "step-mcp", model: "step", path: "mcp", time: 45.5, tokens: 2.0, pass: 100, error: 0 },
  { id: "step-cli", model: "step", path: "cli", time: 15.6, tokens: 0.6, pass: 100, error: 0 },
  {
    id: "step-prompt",
    model: "step",
    path: "prompt",
    time: 166.0,
    tokens: 12.7,
    pass: 0,
    error: 100,
  },
  {
    id: "laguna-mcp",
    model: "laguna",
    path: "mcp",
    time: 224.8,
    tokens: 1.6,
    pass: 100,
    error: 0,
  },
  {
    id: "laguna-cli",
    model: "laguna",
    path: "cli",
    time: 592.5,
    tokens: 3.7,
    pass: 100,
    error: 0,
  },
  {
    id: "laguna-prompt",
    model: "laguna",
    path: "prompt",
    time: 900,
    tokens: 9.4,
    pass: 100,
    error: 0,
  },
  { id: "nex-mcp", model: "nex", path: "mcp", time: 226.6, tokens: 2.4, pass: 100, error: 0 },
  { id: "nex-cli", model: "nex", path: "cli", time: 146.2, tokens: 1.3, pass: 100, error: 0 },
  {
    id: "nex-prompt",
    model: "nex",
    path: "prompt",
    time: 426.4,
    tokens: 7.8,
    pass: 0,
    error: 100,
  },
] as const;

interface AxisSpec {
  key: MetricKey;
  max: number;
  ticks: readonly number[];
  unit: string;
  label: string;
}

type TabId = "speed" | "tokens" | "error";

interface TabSpec {
  id: TabId;
  label: string;
  note: string;
  x: AxisSpec;
  /** y rendered inverted: smaller value sits higher (better) */
  yInverted: boolean;
  y: AxisSpec;
}

// Axis domains extend past the data so points never touch the plot edges.
const PASS_AXIS: AxisSpec = {
  key: "pass",
  max: 110,
  ticks: [0, 25, 50, 75, 100],
  unit: "%",
  label: "Builds passing",
};

// Placeholder max/ticks — time/tokens/error axes are refit to the visible
// model selection by fitAxis() so a few slow outliers don't squeeze the rest.
const TIME_AXIS: AxisSpec = {
  key: "time",
  max: 940,
  ticks: [900, 600, 300, 0],
  unit: "s",
  label: "Avg scaffold time",
};

const AXIS_STEPS: Record<MetricKey, readonly number[]> = {
  time: [100, 200, 300],
  tokens: [2, 5, 10],
  error: [10, 25, 50],
  pass: [25],
};

const AXIS_MIN_MAX: Record<MetricKey, number> = { time: 150, tokens: 10, error: 30, pass: 110 };

function fitAxis(base: AxisSpec, combos: readonly ComboPoint[]): AxisSpec {
  if (base.key === "pass" || combos.length === 0) return base;
  const dataMax = Math.max(...combos.map((combo) => comboValue(combo, base.key)));
  const max = Math.max(dataMax * 1.08, AXIS_MIN_MAX[base.key]);
  const steps = AXIS_STEPS[base.key];
  const step = steps.find((s) => max / s <= 4.2) ?? steps[steps.length - 1];
  const ticks: number[] = [];
  for (let tick = Math.floor(max / step) * step; tick >= 0; tick -= step) ticks.push(tick);
  return { ...base, max, ticks };
}

const CHART_TABS: readonly TabSpec[] = [
  {
    id: "speed",
    label: "Speed",
    note: "most efficient ↗",
    x: TIME_AXIS,
    y: PASS_AXIS,
    yInverted: false,
  },
  {
    id: "tokens",
    label: "Tokens",
    note: "most efficient ↗",
    x: {
      key: "tokens",
      max: 40,
      ticks: [40, 30, 20, 10, 0],
      unit: "k",
      label: "Output tokens per scaffold",
    },
    y: PASS_AXIS,
    yInverted: false,
  },
  {
    id: "error",
    label: "Error rate",
    note: "fast + reliable ↗",
    x: { key: "error", max: 110, ticks: [100, 75, 50, 25, 0], unit: "%", label: "Failed builds" },
    y: TIME_AXIS,
    yInverted: true,
  },
] as const;

function getPathShort(path: PathId): string {
  if (path === "cli") return m.llmPathCliShort();
  if (path === "prompt") return m.llmPathPromptShort();
  return PATHS[path].short;
}

function getPathDetail(path: PathId): string {
  if (path === "mcp") return m.llmPathMcpDetail();
  if (path === "cli") return m.llmPathCliDetail();
  return m.llmPathPromptDetail();
}

function getModelGroupDetail(detail: string): string {
  if (detail === "Jun 12 sweep") return m.llmClaudeSweep();
  if (detail === "Jun 10 sweep") return m.llmCodexSweep();
  if (detail === "Jun 12 light sweep") return m.llmLightSweep();
  return detail;
}

function getAxisLabel(key: MetricKey): string {
  if (key === "pass") return m.llmBuildsPassing();
  if (key === "time") return m.llmAvgScaffoldTime();
  if (key === "tokens") return m.llmOutputTokens();
  return m.llmFailedBuilds();
}

function getChartTabLabel(id: TabId): string {
  if (id === "speed") return m.llmSpeed();
  if (id === "tokens") return m.llmTokens();
  return m.llmErrorRate();
}

function getChartTabNote(id: TabId): string {
  return id === "error" ? m.llmFastReliable() : m.llmMostEfficient();
}

function localizeAxis(axis: AxisSpec): AxisSpec {
  return { ...axis, label: getAxisLabel(axis.key) };
}

function localizeTab(tab: TabSpec): TabSpec {
  return {
    ...tab,
    label: getChartTabLabel(tab.id),
    note: getChartTabNote(tab.id),
    x: localizeAxis(tab.x),
    y: localizeAxis(tab.y),
  };
}

function getAgentHint(agent: AgentTab): string {
  return agent.id === "cursor" ? m.llmPasteCursor() : m.llmRunInTerminal();
}

interface LabelPlacement {
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
  /** no collision-free spot found — label only shows on hover/focus */
  hidden?: boolean;
}

// Tried in order until one fits: right of the dot, left, then stacked rows
// above/below (middle-anchored) and offset left/right rows for edge columns.
const PLACEMENT_CANDIDATES: readonly LabelPlacement[] = [
  { anchor: "start", dx: 10, dy: 4 },
  { anchor: "end", dx: -10, dy: 4 },
  { anchor: "middle", dx: 0, dy: 22 },
  { anchor: "middle", dx: 0, dy: -14 },
  { anchor: "end", dx: -10, dy: 18 },
  { anchor: "end", dx: -10, dy: -10 },
  { anchor: "middle", dx: 0, dy: 36 },
  { anchor: "middle", dx: 0, dy: -28 },
  { anchor: "start", dx: 10, dy: 18 },
  { anchor: "start", dx: 10, dy: -10 },
  { anchor: "end", dx: -10, dy: 32 },
  { anchor: "end", dx: -10, dy: 46 },
  { anchor: "middle", dx: 0, dy: 50 },
  { anchor: "middle", dx: 0, dy: -42 },
];

interface LabelBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Approximate text metrics for fontSize 11 / weight 500 labels.
const LABEL_CHAR_W = 6.2;
const LABEL_ASCENT = 9;
const LABEL_DESCENT = 3;
const DOT_PAD = 8;

function labelBox(x: number, y: number, width: number, p: LabelPlacement): LabelBox {
  const anchorX = x + (p.dx ?? 10);
  const x1 =
    p.anchor === "end" ? anchorX - width : p.anchor === "middle" ? anchorX - width / 2 : anchorX;
  const baseline = y + (p.dy ?? 4);
  return { x1, y1: baseline - LABEL_ASCENT, x2: x1 + width, y2: baseline + LABEL_DESCENT };
}

function boxesOverlap(a: LabelBox, b: LabelBox): boolean {
  return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
}

/**
 * Greedy label placement for whichever model subset is selected: every dot and
 * the corner note are obstacles, rightmost (most crowded) points choose first.
 */
function computeLabelPlacements(
  combos: readonly ComboPoint[],
  tab: TabSpec,
): Record<string, LabelPlacement> {
  const points = combos.map((combo) => ({
    combo,
    x: plotX(comboValue(combo, tab.x.key), tab.x),
    y: plotY(comboValue(combo, tab.y.key), tab.y, tab.yInverted),
    width:
      (MODELS[combo.model].short.length + getPathShort(combo.path).length + 3) * LABEL_CHAR_W,
  }));
  const obstacles: LabelBox[] = points.map((p) => ({
    x1: p.x - DOT_PAD,
    y1: p.y - DOT_PAD,
    x2: p.x + DOT_PAD,
    y2: p.y + DOT_PAD,
  }));
  // Corner note ("most efficient ↗"), end-anchored at the top right of the plot.
  obstacles.push({
    x1: M_L + PLOT_W - 8 - tab.note.length * 6.4,
    y1: M_T + 6,
    x2: M_L + PLOT_W - 8,
    y2: M_T + 22,
  });

  const placements: Record<string, LabelPlacement> = {};
  const ordered = [...points].sort((a, b) => b.x - a.x || a.y - b.y);
  for (const point of ordered) {
    // Rather than overlap when every candidate collides, hide the label —
    // the dot stays, and hover/focus reveals the name.
    let placed: LabelPlacement = { hidden: true };
    for (const candidate of PLACEMENT_CANDIDATES) {
      const box = labelBox(point.x, point.y, point.width, candidate);
      if (box.x1 < 2 || box.x2 > VB_W - 2 || box.y1 < 12 || box.y2 > M_T + PLOT_H + 16) continue;
      if (obstacles.some((o) => boxesOverlap(box, o))) continue;
      placed = candidate;
      obstacles.push(box);
      break;
    }
    placements[point.combo.id] = placed;
  }
  return placements;
}

// Chart geometry (viewBox units).
const VB_W = 1120;
const VB_H = 470;
const M_L = 56;
const M_R = 30;
const M_T = 20;
const M_B = 52;
const PLOT_W = VB_W - M_L - M_R;
const PLOT_H = VB_H - M_T - M_B;
// Right inset keeps best-possible points (value 0) off the plot edge.
const X_INSET = 18;

// X axes are reversed: 0 (best) sits on the right, like the reference chart.
function plotX(value: number, axis: AxisSpec): number {
  return M_L + (1 - value / axis.max) * (PLOT_W - X_INSET);
}

function plotY(value: number, axis: AxisSpec, inverted: boolean): number {
  return inverted ? M_T + (value / axis.max) * PLOT_H : M_T + (1 - value / axis.max) * PLOT_H;
}

function comboValue(combo: ComboPoint, key: MetricKey): number {
  return combo[key];
}

interface AgentTab {
  id: string;
  label: string;
  iconSlug?: string;
  /** simple-icons brands that are monochrome and need theme-aware color */
  mono?: boolean;
  command: string;
  hint: string;
  shell: boolean;
}

const AGENT_TABS: readonly AgentTab[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    iconSlug: "claudecode",
    command:
      "claude mcp add --transport stdio better-fullstack -- npx -y create-better-fullstack@latest mcp",
    hint: "run in your terminal",
    shell: true,
  },
  {
    id: "cursor",
    label: "Cursor",
    iconSlug: "cursor",
    mono: true,
    command: '"better-fullstack": { "command": "npx", "args": ["-y", "create-better-fullstack@latest", "mcp"] }',
    hint: "paste into ~/.cursor/mcp.json under mcpServers",
    shell: false,
  },
  {
    id: "codex",
    label: "Codex",
    command: "codex mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp",
    hint: "run in your terminal",
    shell: true,
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    iconSlug: "googlegemini",
    command: "gemini mcp add better-fullstack npx -y create-better-fullstack@latest mcp",
    hint: "run in your terminal",
    shell: true,
  },
  {
    id: "vscode",
    label: "VS Code",
    iconSlug: "githubcopilot",
    mono: true,
    command:
      "code --add-mcp '{\"name\":\"better-fullstack\",\"command\":\"npx\",\"args\":[\"-y\",\"create-better-fullstack@latest\",\"mcp\"]}'",
    hint: "run in your terminal",
    shell: true,
  },
] as const;

const fadeUpInitial = { opacity: 0, y: 12 } as const;
const fadeUpVisible = { opacity: 1, y: 0 } as const;
const viewportOnceNear = { once: true, margin: "-10%" } as const;
const fadeUpTransition = { duration: 0.6 } as const;
const barEase = [0.2, 0.8, 0.2, 1] as const;
const chartMove = { duration: 0.7, ease: barEase } as const;

const headingStyle: CSSProperties = {
  fontSize: "clamp(2.2rem, 6vw, 4rem)",
  lineHeight: 0.98,
};

const blogPostParams = { _splat: "scaffbench" } as const;

export default function LLMBenchmarkSection() {
  return (
    <section id="benchmark" className="relative scroll-mt-16 border-t border-border bg-muted/20">
      <div className="px-4 py-20 sm:px-8 sm:py-24">
        <Masthead />
        <BenchmarkChartCard />
        <AgentInstallPanel />
      </div>
    </section>
  );
}

function Masthead() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-3 sm:gap-4">
        <ScaffBenchMark className="size-9 shrink-0 text-foreground sm:size-12" />
        <h2 className="font-mono font-bold tracking-[-0.04em]" style={headingStyle}>
          ScaffBench
        </h2>
      </div>
      <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
        {m.llmBenchmarkDescription()}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/blog/$"
          params={blogPostParams}
          className="group inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:gap-2.5"
        >
          {m.llmReadBlog()}
          <ArrowRight className="size-4" />
        </Link>
        <Link
          to="/mcp"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand dark:hover:text-brand"
        >
          {m.llmTryMcp()}
        </Link>
      </div>
    </div>
  );
}

/**
 * ScaffBench logomark ("fast path"): a staircase — the slow step-by-step route —
 * cut through by a straight brand-lime diagonal. On scroll into view the stairs
 * trace in first, then the lime path shoots through.
 */
const pathHidden = { pathLength: 0 } as const;
const pathDrawn = { pathLength: 1 } as const;
const stairsDraw = { duration: 0.7, ease: barEase, delay: 0.1 } as const;
const diagonalDraw = { duration: 0.35, ease: barEase, delay: 0.85 } as const;
const drawNone = { duration: 0 } as const;

function ScaffBenchMark({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion() === true;
  const drawn = inView || reduceMotion;

  return (
    <svg ref={ref} viewBox="0 0 64 64" aria-hidden className={className}>
      <g fill="none" strokeWidth={4} strokeLinecap="square" strokeLinejoin="miter">
        <motion.path
          d="M8 54 H20 V40 H32 V26 H44 V12 H56"
          stroke="currentColor"
          initial={pathHidden}
          animate={drawn ? pathDrawn : pathHidden}
          transition={reduceMotion ? drawNone : stairsDraw}
        />
        <motion.path
          d="M8 54 L56 12"
          stroke="#C6E853"
          initial={pathHidden}
          animate={drawn ? pathDrawn : pathHidden}
          transition={reduceMotion ? drawNone : diagonalDraw}
        />
      </g>
    </svg>
  );
}

function BenchmarkChartCard() {
  const [tabId, setTabId] = useState<TabId>("speed");
  const [selectedModels, setSelectedModels] = useState<readonly ModelId[]>(DEFAULT_MODELS);
  const [hoveredComboId, setHoveredComboId] = useState<string | null>(null);
  const baseTab = CHART_TABS.find((t) => t.id === tabId) ?? CHART_TABS[0];
  const combos = useMemo(
    () => COMBOS.filter((combo) => selectedModels.includes(combo.model)),
    [selectedModels],
  );
  // Refit value axes to the visible selection so outliers don't crowd the rest.
  const fittedTab = useMemo(
    () => ({ ...baseTab, x: fitAxis(baseTab.x, combos), y: fitAxis(baseTab.y, combos) }),
    [baseTab, combos],
  );
  const tab = useMemo(() => localizeTab(fittedTab), [fittedTab]);
  const labelPlacements = useMemo(() => computeLabelPlacements(combos, tab), [combos, tab]);
  const toggleModel = useCallback((model: ModelId) => {
    setSelectedModels((prev) =>
      prev.includes(model)
        ? prev.length > 1
          ? prev.filter((m) => m !== model)
          : prev // keep at least one model selected
        : MODEL_ORDER.filter((m) => m === model || prev.includes(m)),
    );
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const palette = CHART_PALETTE;

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className={cn(
        "mt-12 overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]",
        CHART_THEME_VARS,
      )}
    >
      <div className="border-b border-[#e1e0d8] px-3 py-4 dark:border-[rgba(237,235,228,0.10)] sm:px-6">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-3">
          <div
            className="inline-flex overflow-hidden rounded-md border border-[#d9d8d2] dark:border-[rgba(237,235,228,0.14)]"
            role="tablist"
            aria-label={m.llmBenchmarkMetric()}
          >
            {CHART_TABS.map((t) => (
              <ChartTabButton
                key={t.id}
                tab={localizeTab(t)}
                active={tabId === t.id}
                onSelect={setTabId}
              />
            ))}
          </div>
          <ModelFilter selectedModels={selectedModels} onToggle={toggleModel} />
        </div>
      </div>

      <div ref={ref} className="px-3 pb-2 pt-5 sm:px-6">
        {/* Labeled, focusable section: WAI scrollable-region pattern */}
        <section
          aria-label={m.llmScatterAria()}
          className="overflow-x-auto"
          tabIndex={0}
        >
          <div className="mx-auto w-full min-w-[560px] max-w-[1180px]">
            <p className="px-3 text-sm font-semibold">{tab.y.label}</p>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="mt-2 h-auto w-full">
              <AxisLayer key={`${tab.id}-${tab.x.max}-${tab.y.max}`} tab={tab} palette={palette} />
              {combos.map((combo, index) => (
                <ChartPoint
                  key={combo.id}
                  combo={combo}
                  tab={tab}
                  palette={palette}
                  placement={labelPlacements[combo.id]}
                  index={index}
                  inView={inView}
                  reduceMotion={reduceMotion === true}
                  active={hoveredComboId === combo.id}
                  onActiveChange={setHoveredComboId}
                />
              ))}
            </svg>
          </div>
        </section>
      </div>

      <CardLegend models={selectedModels} />
    </motion.div>
  );
}

// Hoisted so swatches don't allocate style objects per render (react-perf).
const MODEL_SWATCH_STYLES = Object.fromEntries(
  MODEL_ORDER.map((model) => [model, { backgroundColor: CHART_PALETTE.models[model] }]),
) as Record<ModelId, CSSProperties>;

function ModelFilter({
  selectedModels,
  onToggle,
}: {
  selectedModels: readonly ModelId[];
  onToggle: (model: ModelId) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={m.llmFilterModels()}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#d9d8d2] px-3.5 py-2 text-xs font-medium text-[#71706a] transition-colors hover:text-[#1b1a17] dark:border-[rgba(237,235,228,0.14)] dark:text-[#8f8d84] dark:hover:text-[#dad8d0]"
      >
        {m.llmModels()}
        <span className="rounded-sm bg-[#C6E853] px-1.5 font-mono text-[10px] font-semibold text-[#0a0a0a]">
          {selectedModels.length}
        </span>
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-64", CHART_THEME_VARS)}>
        {MODEL_GROUPS.map((group, index) => (
          <DropdownMenuGroup key={group.label}>
            {index > 0 ? <DropdownMenuSeparator /> : null}
            <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-[0.14em]">
              {group.label} · {getModelGroupDetail(group.detail)}
            </DropdownMenuLabel>
            {group.models.map((model) => (
              <ModelMenuItem
                key={model}
                model={model}
                checked={selectedModels.includes(model)}
                onToggle={onToggle}
              />
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ModelMenuItem({
  model,
  checked,
  onToggle,
}: {
  model: ModelId;
  checked: boolean;
  onToggle: (model: ModelId) => void;
}) {
  const handleChange = useCallback(() => {
    onToggle(model);
  }, [onToggle, model]);

  return (
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={handleChange} closeOnClick={false}>
      <span className="size-2.5 shrink-0 rounded-[2px]" style={MODEL_SWATCH_STYLES[model]} />
      {MODELS[model].label}
    </DropdownMenuCheckboxItem>
  );
}

function ChartTabButton({
  tab,
  active,
  onSelect,
}: {
  tab: TabSpec;
  active: boolean;
  onSelect: (id: TabId) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(tab.id);
  }, [onSelect, tab.id]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={cn(
        "cursor-pointer border-r border-[#d9d8d2] px-3.5 py-2 text-xs font-medium transition-colors last:border-r-0 dark:border-[rgba(237,235,228,0.14)]",
        active
          ? "bg-[#C6E853] text-[#0a0a0a]"
          : "bg-transparent text-[#71706a] hover:text-[#1b1a17] dark:text-[#8f8d84] dark:hover:text-[#dad8d0]",
      )}
    >
      {tab.label}
    </button>
  );
}

function AxisLayer({ tab, palette }: { tab: TabSpec; palette: ChartPalette }) {
  return (
    <g>
      {tab.x.ticks.map((tick) => {
        const x = plotX(tick, tab.x);
        return (
          <g key={`x-${tick}`}>
            <line x1={x} y1={M_T} x2={x} y2={M_T + PLOT_H} stroke={palette.grid} />
            <text
              x={x}
              y={M_T + PLOT_H + 22}
              textAnchor="middle"
              fontSize={11}
              fill={palette.axisTick}
              className="font-mono"
            >
              {tick}
              {tab.x.unit}
            </text>
          </g>
        );
      })}
      {tab.y.ticks.map((tick) => {
        const y = plotY(tick, tab.y, tab.yInverted);
        return (
          <g key={`y-${tick}`}>
            <line x1={M_L} y1={y} x2={M_L + PLOT_W} y2={y} stroke={palette.grid} />
            <text
              x={M_L - 10}
              y={y + 4}
              textAnchor="end"
              fontSize={11}
              fill={palette.axisTick}
              className="font-mono"
            >
              {tick}
              {tab.y.unit}
            </text>
          </g>
        );
      })}
      <text
        x={M_L + PLOT_W - 8}
        y={M_T + 18}
        textAnchor="end"
        fontSize={12}
        fontStyle="italic"
        fill={palette.note}
      >
        {tab.note}
      </text>
      <text
        x={M_L + PLOT_W / 2}
        y={VB_H - 6}
        textAnchor="middle"
        fontSize={12}
        fill={palette.axisLabel}
      >
        {tab.x.label}
      </text>
    </g>
  );
}

function ChartPoint({
  combo,
  tab,
  palette,
  placement,
  index,
  inView,
  reduceMotion,
  active,
  onActiveChange,
}: {
  combo: ComboPoint;
  tab: TabSpec;
  palette: ChartPalette;
  placement: LabelPlacement | undefined;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
  active: boolean;
  onActiveChange: (id: string | null) => void;
}) {
  const x = plotX(comboValue(combo, tab.x.key), tab.x);
  const y = plotY(comboValue(combo, tab.y.key), tab.y, tab.yInverted);
  const nearRightEdge = x > M_L + PLOT_W - 150;
  const hex = palette.models[combo.model];

  const animate = useMemo(() => ({ x, y, opacity: inView ? 1 : 0 }), [x, y, inView]);
  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { x: chartMove, y: chartMove, opacity: { duration: 0.45, delay: 0.1 + index * 0.06 } },
    [index, reduceMotion],
  );
  const activate = useCallback(() => onActiveChange(combo.id), [onActiveChange, combo.id]);
  const deactivate = useCallback(() => onActiveChange(null), [onActiveChange]);

  return (
    <motion.g
      initial={false}
      animate={animate}
      transition={transition}
      tabIndex={0}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      className="outline-none"
      focusable="true"
    >
      <HoverGuides active={active} hex={hex} x={x} y={y} />
      <ChartMarker hex={hex} cardBg={palette.circleStroke} />
      {placement?.hidden && !active ? null : (
        <text
          x={placement?.hidden ? (nearRightEdge ? -10 : 10) : (placement?.dx ?? 10)}
          y={placement?.hidden ? 4 : (placement?.dy ?? 4)}
          textAnchor={
            placement?.hidden ? (nearRightEdge ? "end" : "start") : (placement?.anchor ?? "start")
          }
          fontSize={11}
          fontWeight={active ? 600 : 500}
          fill={hex}
          stroke={palette.circleStroke}
          strokeWidth={3}
          paintOrder="stroke"
        >
          {MODELS[combo.model].short} · {getPathShort(combo.path)}
        </text>
      )}
    </motion.g>
  );
}

function HoverGuides({
  active,
  hex,
  x,
  y,
}: {
  active: boolean;
  hex: string;
  x: number;
  y: number;
}) {
  return (
    <g
      opacity={active ? 0.85 : 0}
      className="pointer-events-none transition-opacity duration-150"
    >
      <line
        x1={M_L - x}
        y1={0}
        x2={0}
        y2={0}
        stroke={hex}
        strokeWidth={1.5}
        strokeDasharray="8 8"
      />
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={M_T + PLOT_H - y}
        stroke={hex}
        strokeWidth={1.5}
        strokeDasharray="8 8"
      />
    </g>
  );
}

function ChartMarker({ hex, cardBg }: { hex: string; cardBg: string }) {
  return (
    <>
      <circle r={14} fill="transparent" stroke="transparent" />
      <circle r={4.5} fill={hex} stroke={cardBg} strokeWidth={2} />
    </>
  );
}

function CardLegend({ models }: { models: readonly ModelId[] }) {
  return (
    <div className="border-t border-[#e1e0d8] bg-[#f6f5f1] px-5 py-4 dark:border-[rgba(237,235,228,0.10)] dark:bg-[#100f0e] sm:px-8">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2.5">
        {models.map((model) => (
          <span key={model} className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
            <span className="size-2.5 rounded-[2px]" style={MODEL_SWATCH_STYLES[model]} />
            {MODELS[model].label}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-1.5">
        {PATH_ORDER.map((path) => (
          <span key={path} className="text-xs text-[#71706a] dark:text-[#8a8a8a]">
            <span className="font-mono font-semibold text-[#1b1a17] dark:text-[#dad8d0]">
              {PATHS[path].glyph} {getPathShort(path)}
            </span>{" "}
            — {getPathDetail(path)}
          </span>
        ))}
      </div>
    </div>
  );
}

function AgentInstallPanel() {
  const [agentId, setAgentId] = useState<string>(AGENT_TABS[0].id);
  const [copied, setCopied] = useState(false);
  const agent = AGENT_TABS.find((tab) => tab.id === agentId) ?? AGENT_TABS[0];

  const copy = useCallback(() => {
    const command = AGENT_TABS.find((tab) => tab.id === agentId)?.command ?? "";
    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  }, [agentId]);

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className="mt-14 grid grid-cols-12 items-end gap-x-6 gap-y-6"
    >
      <div className="col-span-12 lg:col-span-4">
        <h3 className="max-w-[16ch] text-balance font-mono text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
          {m.llmAgentTitle()}
        </h3>
        <p className="mt-3 max-w-sm text-pretty text-sm text-muted-foreground">
          {m.llmAgentDescription()}
        </p>
        <a
          href="/docs/ai/mcp"
          className="group mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-ink/70 dark:text-brand dark:no-underline"
        >
          {m.llmAllSupportedClients()}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="col-span-12 lg:col-span-8">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="flex flex-wrap border-b border-border">
            {AGENT_TABS.map((tab) => (
              <AgentTabButton
                key={tab.id}
                tab={tab}
                active={agentId === tab.id}
                onSelect={setAgentId}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
            <code className="truncate font-mono text-xs sm:text-sm">
              {agent.shell ? (
                <span className="text-ink dark:text-brand">$ </span>
              ) : null}
              {agent.command}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label={m.llmCopyAgentSetupCommand({ agent: agent.label })}
              className={cn(
                "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]",
                copied
                  ? "text-ink dark:text-brand"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {getAgentHint(agent)}
        </p>
      </div>
    </motion.div>
  );
}

function AgentTabButton({
  tab,
  active,
  onSelect,
}: {
  tab: AgentTab;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(tab.id);
  }, [onSelect, tab.id]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 border-r border-border px-3 py-2 text-xs font-medium transition-colors last:border-r-0 sm:gap-2 sm:px-4",
        active
          ? "bg-[#C6E853] text-[#0a0a0a]"
          : "bg-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      <AgentTabIcon tab={tab} active={active} />
      {tab.label}
    </button>
  );
}

function AgentTabIcon({ tab, active }: { tab: AgentTab; active: boolean }) {
  const { resolvedTheme } = useTheme();

  if (!tab.iconSlug) {
    return <OpenAIMark className="size-3.5 sm:size-4" />;
  }

  // Active tabs sit on lime, so monochrome marks stay dark there.
  const monoColor = !active && resolvedTheme === "dark" ? "e5e5e5" : "171717";
  const src = tab.mono
    ? `https://cdn.simpleicons.org/${tab.iconSlug}/${monoColor}`
    : `https://cdn.simpleicons.org/${tab.iconSlug}`;

  return <img src={src} alt="" width={16} height={16} className="size-3.5 sm:size-4" />;
}

// OpenAI logomark (simple-icons no longer ships it on the CDN).
function OpenAIMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" />
    </svg>
  );
}
