import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import {
  SCAFFBENCH2_CELLS,
  SCAFFBENCH2_MODELS,
  SCAFFBENCH2_SPECS,
  type ScaffbenchCell,
  type ScaffbenchModel,
} from "./scaffbench-2-data";
import {
  SCAFFBENCH21_CELLS,
  SCAFFBENCH21_MODELS,
  SCAFFBENCH21_SPECS,
} from "./scaffbench-2-1-data";
import { OpenAIMark, ProviderLogo, type ProviderLogoId } from "./provider-marks";

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
 * V1 "validation passing" = the original build-pass policy: real install +
 * build, generator-bug failures and lint-only failures excluded — see the
 * ScaffBench blog post scoring policy.
 */

type BenchmarkVersionId = "v1" | "v2" | "v2.1";
type PathId = "mcp" | "cli" | "prompt";

const PATH_TAB_ORDER: readonly PathId[] = ["prompt", "mcp", "cli"] as const;
// V2 surfaces only the Prompt path: the MCP/CLI (assisted) paths run our own
// generator + templates, so their pass/fail reflects our codebase (template
// hygiene, the quality-gate fixes) more than model capability. Prompt — where the
// model writes everything itself — is the clean model-capability signal.
const V2_PATH_TABS: readonly PathId[] = ["prompt"] as const;
// v2.1 additionally surfaces the MCP path (DeepSeek V4 Flash and GPT-5.6 Luna
// medium have MCP sweeps). Per the note above, the assisted MCP numbers run our
// own scaffolder, so this tab reads model+scaffolder, not raw model capability.
const V2_1_PATH_TABS: readonly PathId[] = ["prompt", "mcp"] as const;
function pathTabsFor(version: BenchmarkVersionId | LeaderboardVersion): readonly PathId[] {
  return version === "v2.1" ? V2_1_PATH_TABS : V2_PATH_TABS;
}

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
    detail: "no Better-Fullstack — agent hand-writes every file, closed-book (no installs, no dev server)",
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
  fable: { label: "Claude Fable 5", short: "Fable" },
  opus: { label: "Claude Opus 4.8", short: "Opus" },
  sonnet: { label: "Claude Sonnet 4.6", short: "Sonnet" },
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

const MODEL_GROUPS: readonly {
  version: BenchmarkVersionId;
  label: string;
  detail: string;
  models: readonly ModelId[];
}[] = [
  {
    version: "v1",
    label: "Claude Code",
    detail: "Jun 12 sweep",
    models: ["fable", "opus", "sonnet"],
  },
  {
    version: "v1",
    label: "Codex CLI",
    detail: "Jun 10 sweep",
    models: ["spark", "gpt54", "gpt55"],
  },
  { version: "v1", label: "Gemini CLI", detail: "Jun 12 light sweep", models: ["gemini31"] },
  {
    version: "v1",
    label: "opencode · Go",
    detail: "Jun 12 light sweep",
    models: ["kimi", "glm51", "minimax", "qwen", "deepseek"],
  },
  {
    version: "v1",
    label: "Kilo · free tier",
    detail: "Jun 12 light sweep",
    models: ["step", "laguna", "nex"],
  },
];

const DEFAULT_MODELS_BY_VERSION: Record<BenchmarkVersionId, readonly ModelId[]> = {
  // Curated default: flagship + fastest model per vendor, prompt-only struggles visible.
  v1: ["sonnet", "spark", "gpt55", "gemini31"],
  // V2 / V2.1 are single-agent ablations (Opus only) — the model filter is hidden,
  // so these entries exist only to satisfy the version-keyed record.
  v2: ["opus"],
  "v2.1": ["opus"],
} as const;

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
  // Free-tier model dots — kept in step with the leaderboard bars (opencode violet, kilo cyan).
  "[--ch-northmini:#6d28d9] [--ch-nemotron:#0891b2]",
  "[--ch-deepseek:#4d7c0f] [--ch-step:#db2777] [--ch-laguna:#0369a1] [--ch-nex:#ca8a04]",
  "dark:[--ch-grid:#edebe414] dark:[--ch-tick:#6c6a61] dark:[--ch-label:#8f8d84] dark:[--ch-note:#8f8d84] dark:[--ch-stroke:#161614]",
  "dark:[--ch-fable:#b8d75e] dark:[--ch-opus:#e0894f] dark:[--ch-sonnet:#c9c7bf]",
  "dark:[--ch-spark:#4fd0c0] dark:[--ch-gpt54:#98a6f2] dark:[--ch-gpt55:#e887ad]",
  "dark:[--ch-gemini31:#82aaf2] dark:[--ch-kimi:#c08ef5] dark:[--ch-glm51:#dba05c] dark:[--ch-minimax:#ee8c8c] dark:[--ch-qwen:#5cc3dd]",
  "dark:[--ch-northmini:#a78bfa] dark:[--ch-nemotron:#22d3ee]",
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
  if (path === "cli") return "CLI";
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

function getModelLabel(model: ModelId): string {
  return MODELS[model].label;
}

function getAxisLabel(key: MetricKey): string {
  if (key === "pass") return "Validation passing";
  if (key === "time") return m.llmAvgScaffoldTime();
  if (key === "tokens") return m.llmOutputTokens();
  return "Validation failures";
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
    width: (MODELS[combo.model].short.length + getPathShort(combo.path).length + 3) * LABEL_CHAR_W,
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
    command:
      '"better-fullstack": { "command": "npx", "args": ["-y", "create-better-fullstack@latest", "mcp"] }',
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
      'code --add-mcp \'{"name":"better-fullstack","command":"npx","args":["-y","create-better-fullstack@latest","mcp"]}\'',
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

const blogPostParams = { _splat: "scaffbench-2-1" } as const;

// ── ScaffBench 2 leaderboard ────────────────────────────────────────────────
// A pass-rate bar chart + data table for the per-path (MCP / CLI / Prompt)
// ScaffBench 2 run, with a v1 fallback that reuses the cross-vendor COMBOS sweep.

type LeaderboardVersion = "v2.1" | "v2" | "v1";
type ValidationMode = "core" | "full";

// The "v2-family" views (v2 = original 5-spec ablation, v2.1 = expanded 13-spec
// suite) share all rendering machinery — they differ only in the underlying run
// data. A dataset bundles the per-cell records, model list, and spec list for one
// version so the compute helpers can be pointed at either.
type ScaffbenchDataset = {
  cells: readonly ScaffbenchCell[];
  models: readonly ScaffbenchModel[];
  specs: readonly string[];
};

const SCAFFBENCH_V2: ScaffbenchDataset = {
  cells: SCAFFBENCH2_CELLS,
  models: SCAFFBENCH2_MODELS,
  specs: SCAFFBENCH2_SPECS,
};
const SCAFFBENCH_V2_1: ScaffbenchDataset = {
  cells: SCAFFBENCH21_CELLS,
  models: SCAFFBENCH21_MODELS,
  specs: SCAFFBENCH21_SPECS,
};

// v2.1 is the current default; only the literal "v2" maps to the legacy dataset.
function v2Dataset(version: BenchmarkVersionId | LeaderboardVersion): ScaffbenchDataset {
  return version === "v2" ? SCAFFBENCH_V2 : SCAFFBENCH_V2_1;
}

// opencode / Kilo runs hit free endpoints — the leaderboard pins them below the
// paid tier and the graph hides them by default (opt-in via the model picker).
function isFreeProvider(provider: ScaffbenchModel["provider"]): boolean {
  return provider === "opencode" || provider === "kilo";
}

type V2Version = "v2" | "v2.1";

// Default graph selection: paid models only; free-tier dots are opt-in.
function v2DefaultModelKeys(version: V2Version): string[] {
  return v2Dataset(version)
    .models.filter((model) => !isFreeProvider(model.provider))
    .map((model) => model.key);
}

const LEADERBOARD_LABELS: Record<PathId, string> = {
  mcp: "MCP",
  cli: "CLI",
  prompt: "Prompt",
};

// Per-provider bar colors as theme-aware CSS vars (set on the card wrapper).
// claude = burnt orange, codex = green, opencode = violet, kilo = cyan
// (the two free-tier agents get cooler hues so they read as a separate group).
const LEADERBOARD_THEME_VARS = cn(
  "[--bar-claude:#c2410c] [--bar-codex:#15803d] [--bar-opencode:#6d28d9] [--bar-kilo:#0891b2] [--bar-agy:#1a73e8] [--bar-track:#ececec]",
  "dark:[--bar-claude:#fb923c] dark:[--bar-codex:#4ade80] dark:[--bar-opencode:#a78bfa] dark:[--bar-kilo:#22d3ee] dark:[--bar-agy:#8ab4f8] dark:[--bar-track:#edebe414]",
);

const PROVIDER_BAR_COLOR: Record<"claude" | "codex" | "opencode" | "kilo" | "agy", string> = {
  claude: "var(--bar-claude)",
  codex: "var(--bar-codex)",
  opencode: "var(--bar-opencode)",
  kilo: "var(--bar-kilo)",
  agy: "var(--bar-agy)",
};

const BAR_TRACK_STYLE: CSSProperties = { backgroundColor: "var(--bar-track)" };

// One row per model: Model · bar · Core · Full · Wired · Time · Avg cost · Out tok · Steps.
const LEADERBOARD_GRID =
  "grid grid-cols-[minmax(9rem,13rem)_minmax(0,1fr)_4.25rem_4.25rem_4.5rem_4rem_4.5rem_4rem_3rem] items-center gap-x-3";

const PASS_AXIS_TICKS: readonly number[] = [0, 20, 40, 60, 80, 100] as const;

// The whole row block crossfades when the version / path / mode tab changes.
const leaderFadeHidden = { opacity: 0 } as const;
const leaderFadeVisible = { opacity: 1 } as const;
const leaderFadeTransition = { duration: 0.16, ease: barEase } as const;

/** Which creation path the per-model numbers reflect ("all" = pooled across paths). */
type LeaderPath = "all" | PathId;

interface ModelLeaderRow {
  key: string;
  label: string;
  /** reasoning-effort tag (e.g. "max"), or "" for the v1 cross-vendor models. */
  effort: string;
  /** bar fill color. */
  color: string;
  /** brand logo shown to the left of the model name (undefined = no logo). */
  logo?: ProviderLogoId;
  /** Core pass 1 as a 0–100 percentage; doubles as the bar fill width. */
  pass: number;
  /** Full (core + quality gate) pass as a percentage; null when not measured (v1). */
  full: number | null;
  /** mean wired-libs percentage across scored cells, preformatted ("93%" / "—"). */
  wired: string;
  /** mean scaffold wall-clock, preformatted ("47s" / "4.5m" / "—"). */
  time: string;
  /** numeric avg cost for sorting (Infinity when unpriced). */
  costNum: number;
  cost: string;
  outTok: string;
  steps: string;
}

function formatPercent(passing: number, total: number): number {
  return total === 0 ? 0 : Math.round((100 * passing) / total);
}

// Scaffold wall-clock: seconds under 2 min, else minutes (one decimal). Median
// per spec, averaged across a model's scored cells.
function formatDuration(ms: number): string {
  const seconds = ms / 1000;
  return seconds < 120 ? `${Math.round(seconds)}s` : `${(seconds / 60).toFixed(1)}m`;
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

// One unified ranking across every model: best pass-rate first, cheaper as the
// tiebreak. Free and subscription ($0-reported) models rank on merit alongside
// paid ones — no separate tier.
function sortLeaderRows(rows: ModelLeaderRow[]): ModelLeaderRow[] {
  return [...rows].sort((a, b) => b.pass - a.pass || a.costNum - b.costNum);
}

// Brand logos shown left of the model name. Only Anthropic + OpenAI marks are
// wired (the current v2.1 field); other providers render no logo.
const PROVIDER_LOGO: Partial<
  Record<"claude" | "codex" | "opencode" | "kilo" | "agy", ProviderLogoId>
> = {
  claude: "anthropic",
  codex: "openai",
  agy: "google",
};
const V1_MODEL_LOGO: Partial<Record<ModelId, ProviderLogoId>> = {
  fable: "anthropic",
  opus: "anthropic",
  sonnet: "anthropic",
  spark: "openai",
  gpt54: "openai",
  gpt55: "openai",
  gemini31: "google",
};

// V2: one row per (model, effort), pooled over the chosen path's scored cells.
function computeV2ModelRows(
  dataset: ScaffbenchDataset,
  leaderPath: LeaderPath,
  mode: ValidationMode,
  specs: ReadonlySet<string>,
): ModelLeaderRow[] {
  const rows = dataset.models.flatMap((model) => {
    const cells = dataset.cells.filter(
      (cell) =>
        cell.modelKey === model.key &&
        (leaderPath === "all" || cell.path === leaderPath) &&
        specs.has(cell.spec),
    );
    // On a specific creation path (not the pooled "all"), a model with no cells
    // for that path was never run on it — drop it entirely rather than show a
    // fake 0% row. This is what keeps the MCP tab to just the models we swept.
    if (leaderPath !== "all" && cells.length === 0) return [];
    const scored = cells.filter((cell) => cell.scored);
    const passing = scored.filter((cell) =>
      mode === "core" ? cell.corePass : cell.fullPass,
    ).length;
    const fullPassing = scored.filter((cell) => cell.fullPass).length;
    const costs = scored.map((cell) => cell.costUsd).filter((v): v is number => v !== null);
    const tokens = scored.map((cell) => cell.outTokens).filter((v): v is number => v !== null);
    const durations = scored
      .map((cell) => cell.durationMs)
      .filter((v): v is number => v !== null && v !== undefined && v > 0);
    return {
      key: model.key,
      label: model.label,
      effort: model.effort,
      color: PROVIDER_BAR_COLOR[model.provider],
      logo: PROVIDER_LOGO[model.provider],
      pass: formatPercent(passing, scored.length),
      full: scored.length > 0 ? formatPercent(fullPassing, scored.length) : null,
      wired: scored.length > 0 ? `${Math.round(mean(scored.map((cell) => cell.wiredPct)))}%` : "—",
      time: durations.length > 0 ? formatDuration(mean(durations)) : "—",
      costNum: costs.length > 0 ? mean(costs) : Number.POSITIVE_INFINITY,
      cost: costs.length > 0 ? `$${mean(costs).toFixed(2)}` : "—",
      outTok: tokens.length > 0 ? `${(mean(tokens) / 1000).toFixed(1)}k` : "—",
      steps: scored.length > 0 ? String(Math.round(mean(scored.map((cell) => cell.steps)))) : "—",
    };
  });
  return sortLeaderRows(rows);
}

// V1: one row per cross-vendor model, pooled over the chosen path's COMBOS.
function computeV1ModelRows(leaderPath: LeaderPath): ModelLeaderRow[] {
  const modelIds = MODEL_ORDER.filter((m) => COMBOS.some((combo) => combo.model === m));
  const rows = modelIds.map((m) => {
    const combos = COMBOS.filter(
      (combo) => combo.model === m && (leaderPath === "all" || combo.path === leaderPath),
    );
    return {
      key: m,
      label: getModelLabel(m),
      effort: "",
      color: CHART_PALETTE.models[m],
      logo: V1_MODEL_LOGO[m],
      pass: combos.length > 0 ? Math.round(mean(combos.map((combo) => combo.pass))) : 0,
      full: null,
      wired: "—",
      time: "—",
      costNum: Number.POSITIVE_INFINITY,
      cost: "—",
      outTok: combos.length > 0 ? `${mean(combos.map((combo) => combo.tokens)).toFixed(1)}k` : "—",
      steps: "—",
    };
  });
  return sortLeaderRows(rows);
}

// ── ScaffBench 2 chart (V2 graph view) ──────────────────────────────────────
// The V2 run is a single-agent ablation (one model — Claude Opus 4.8), so the
// cross-vendor scatter collapses to a single color. Instead the V2 graph plots
// the three creation paths on an efficiency-vs-reliability plane: Core pass-rate
// (y, higher = better) against an efficiency metric (x, reversed so the cheapest
// / fewest sits on the right). Aggregated over measured specs, matching the
// leaderboard table's Core column. There is no per-cell duration in the V2
// dataset, so "Speed"/time tabs are intentionally absent here.

type V2Metric = "tokens" | "cost" | "steps";

interface V2ChartTabSpec {
  id: V2Metric;
  label: string;
  note: string;
  /** suffix appended to axis ticks ("k" for tokens; cost/steps carry units in the label) */
  unit: string;
  axisLabel: string;
}

const V2_CHART_TABS: readonly V2ChartTabSpec[] = [
  {
    id: "tokens",
    label: "Tokens",
    note: "cheap + reliable ↗",
    unit: "k",
    axisLabel: "Avg output tokens per scaffold",
  },
  {
    id: "cost",
    label: "Cost",
    note: "cheap + reliable ↗",
    unit: "",
    axisLabel: "Avg cost per scaffold ($)",
  },
  {
    id: "steps",
    label: "Steps",
    note: "cheap + reliable ↗",
    unit: "",
    axisLabel: "Avg tool steps per scaffold",
  },
] as const;

// V2 dots are colored per MODEL (like v1), one color per model group in order.
// Reuses the v1 model palette vars.
const V2_MODEL_COLORS: readonly string[] = [
  "var(--ch-opus)",
  "var(--ch-gpt55)",
  "var(--ch-sonnet)",
  "var(--ch-spark)",
  "var(--ch-gpt54)",
  "var(--ch-gemini31)",
  "var(--ch-kimi)",
  "var(--ch-glm51)",
  "var(--ch-northmini)",
  "var(--ch-nemotron)",
];

interface PathMetrics {
  /** Core pass-rate over scored specs, 0–100. */
  pass: number;
  /** avg output tokens, thousands. null = the adapter didn't report tokens. */
  tokens: number | null;
  /** avg cost, USD. null = the harness couldn't meter cost for this run. */
  cost: number | null;
  /** avg tool steps over scored cells. null = no readable trajectory. */
  steps: number | null;
  /** scored cells on this path. 0 = the model was never swept on this path. */
  scoredCount: number;
}

// Aggregate one model's cells for one path over its scored specs. A metric with
// NO underlying data is null (not 0) — plotting an unmetered run at 0 would
// crown it "cheapest" on the reversed efficiency axis. Steps of 0 on a scored
// cell means the trajectory wasn't readable (a real scaffold takes ≥1 step).
function aggregatePathMetrics(
  dataset: ScaffbenchDataset,
  modelKey: string,
  path: PathId,
): PathMetrics {
  const cells = dataset.cells.filter((cell) => cell.modelKey === modelKey && cell.path === path);
  const scored = cells.filter((cell) => cell.scored);
  const tokens = scored
    .map((cell) => cell.outTokens)
    .filter((value): value is number => value !== null);
  const costs = scored
    .map((cell) => cell.costUsd)
    .filter((value): value is number => value !== null);
  const steps = scored.map((cell) => cell.steps).filter((value) => value > 0);
  return {
    pass: formatPercent(scored.filter((cell) => cell.corePass).length, scored.length),
    tokens: tokens.length > 0 ? mean(tokens) / 1000 : null,
    cost: costs.length > 0 ? mean(costs) : null,
    steps: steps.length > 0 ? mean(steps) : null,
    scoredCount: scored.length,
  };
}

type MetricBearing = { tokens: number | null; cost: number | null; steps: number | null };

function v2MetricValue(point: MetricBearing, metric: V2Metric): number | null {
  if (metric === "cost") return point.cost;
  if (metric === "steps") return point.steps;
  return point.tokens;
}

function formatV2Metric(point: MetricBearing, metric: V2Metric): string {
  if (metric === "cost") return point.cost === null ? "—" : `$${point.cost.toFixed(2)}`;
  if (metric === "steps") return point.steps === null ? "—" : `${Math.round(point.steps)} steps`;
  return point.tokens === null ? "—" : `${point.tokens.toFixed(1)}k tokens`;
}

// Compact value for the on-axis hover label ("$3.36" / "50.0k" / "54") — no unit
// word, since it sits directly on the (already-labeled) x-axis.
function formatV2MetricCompact(point: MetricBearing, metric: V2Metric): string {
  if (metric === "cost") return point.cost === null ? "—" : `$${point.cost.toFixed(2)}`;
  if (metric === "steps") return point.steps === null ? "—" : `${Math.round(point.steps)}`;
  return point.tokens === null ? "—" : `${point.tokens.toFixed(1)}k`;
}

// A "nice" step (1/2/5 × 10ⁿ) so V2 axis ticks land on round numbers.
function niceStep(maxValue: number): number {
  if (maxValue <= 0) return 1;
  const target = maxValue / 3.5;
  const magnitude = 10 ** Math.floor(Math.log10(target));
  const normalized = target / magnitude;
  const niceNormalized = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return niceNormalized * magnitude;
}

function buildV2Axis(metric: V2Metric, points: readonly MetricBearing[]): AxisSpec {
  const tab = V2_CHART_TABS.find((entry) => entry.id === metric) ?? V2_CHART_TABS[0];
  const dataMax = Math.max(
    0,
    ...points
      .map((point) => v2MetricValue(point, metric))
      .filter((value): value is number => value !== null),
  );
  const step = niceStep(dataMax);
  const max = Math.max(Math.ceil((dataMax * 1.12) / step) * step, step);
  const ticks: number[] = [];
  for (let tick = max; tick >= 0; tick -= step) {
    ticks.push(Math.round(tick * 100) / 100);
  }
  // `key` is unused for V2 (we don't route through comboValue); "tokens" is a valid placeholder.
  return { key: "tokens", max, ticks, unit: tab.unit, label: tab.axisLabel };
}

interface V2ModelPoint extends PathMetrics {
  key: string;
  /** model name shown on hover + in the legend, e.g. "Opus 4.8". */
  label: string;
  /** reasoning effort, shown on the dot label/tooltip. */
  reasoning: string;
  color: string;
  /** free-endpoint run (opencode/Kilo) — grouped under "Free tier" in the picker. */
  free: boolean;
}

// The dots to plot for the selected path: one per MODEL (like v1 plots one dot
// per model), colored by model. With six models this is a real multi-model
// scatter — the legend maps colors to models, hover shows the values.
// Colors are assigned over the FULL model list (before any per-metric filtering)
// so a model keeps its color across the Tokens/Cost/Steps tabs.
function computeV2ModelPoints(dataset: ScaffbenchDataset, path: PathId): V2ModelPoint[] {
  return dataset.models.map((model, index) => {
    const metrics = aggregatePathMetrics(dataset, model.key, path);
    const free = isFreeProvider(model.provider);
    // Free endpoints (opencode / Kilo) genuinely cost $0 — plot them at zero,
    // but ONLY when the model was actually swept on this path (an unswept model
    // must not materialize on the Cost axis just because $0 is coercible). A
    // PAID model whose adapter doesn't meter cost stays null and is dropped
    // from the Cost axis instead of masquerading as the cheapest run.
    if (metrics.cost === null && free && metrics.scoredCount > 0) {
      metrics.cost = 0;
    }
    return {
      key: model.key,
      label: model.label,
      reasoning: model.effort,
      color: V2_MODEL_COLORS[index % V2_MODEL_COLORS.length],
      free,
      ...metrics,
    };
  });
}

// Whether a model belongs on the current path+metric view at all — in the
// model picker AND on the plot. A model with no scored runs on the path has
// nothing to show (e.g. only DeepSeek was swept on MCP). On the Cost axis:
// the Prompt lane is the paid-model comparison, so free-tier endpoints are
// excluded there — their $0 dots would fake "cheapest" (some "free" routes are
// paid subscriptions that report $0) — as are paid runs the harness couldn't
// meter. Assisted lanes only ever swept free endpoints, so those keep their
// honest $0 placement.
function v2PointEligible(point: V2ModelPoint, metric: V2Metric, path: PathId): boolean {
  if (point.scoredCount === 0) return false;
  if (metric === "cost") {
    if (path === "prompt" && point.free) return false;
    return point.cost !== null;
  }
  return true;
}

export default function LLMBenchmarkSection() {
  return (
    <section id="benchmark" className="relative scroll-mt-16 border-t border-border bg-muted/20">
      <div className="px-4 py-20 sm:px-8 sm:py-24">
        <Masthead />
        <BenchmarkChartCard />
        <ScaffbenchLeaderboardCard />
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
        <a
          href="/run"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand dark:hover:text-brand"
        >
          {m.llmRunItYourself()}
        </a>
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

// Hammer-strike pose angles (degrees): rest → wind-up → strike-down → settle.
// After the icon draws in, the hammer slams once and rests (no loop).
const HAMMER_REST = -6;
const HAMMER_WIND = -34;
const HAMMER_STRIKE = 43;
const HAMMER_SLAM_DELAY = 1.3; // fires after the draw-in finishes (~1.2s)
const HAMMER_SLAM_DUR = 0.62;
const SPARK_HIDDEN_STYLE: CSSProperties = { opacity: 0 };

function ScaffBenchMark({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const hammerRef = useRef<SVGGElement>(null);
  const sparkRef = useRef<SVGGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion() === true;
  const drawn = inView || reduceMotion;

  // Drive the hammer's pivot rotation as a motion value written straight into the
  // SVG transform string (translate to the pivot, then rotate) — the design's
  // exact formula, no transform-origin guesswork.
  const angle = useMotionValue(HAMMER_REST);
  const sparkOpacity = useMotionValue(0);
  useEffect(() => {
    const unsubAngle = angle.on("change", (value) => {
      hammerRef.current?.setAttribute("transform", `translate(8.5 7) rotate(${value.toFixed(2)})`);
    });
    const unsubSpark = sparkOpacity.on("change", (value) => {
      if (sparkRef.current) sparkRef.current.style.opacity = String(value);
    });
    return () => {
      unsubAngle();
      unsubSpark();
    };
  }, [angle, sparkOpacity]);

  // Slam once, after the icon has fully drawn in.
  useEffect(() => {
    if (!inView || reduceMotion) return;
    const slam = animate(angle, [HAMMER_REST, HAMMER_WIND, HAMMER_STRIKE, HAMMER_REST], {
      delay: HAMMER_SLAM_DELAY,
      duration: HAMMER_SLAM_DUR,
      times: [0, 0.32, 0.5, 1],
      ease: ["easeOut", "easeIn", "easeOut"],
    });
    const spark = animate(sparkOpacity, [0, 1, 0], {
      delay: HAMMER_SLAM_DELAY + HAMMER_SLAM_DUR * 0.5,
      duration: 0.28,
      times: [0, 0.18, 1],
      ease: "easeOut",
    });
    return () => {
      slam.stop();
      spark.stop();
    };
  }, [inView, reduceMotion, angle, sparkOpacity]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Anvil. */}
      <motion.path
        d="M5 18.5 L19.5 18.5 L24.5 20.4 L19.5 22.3 L5 22.3 Z"
        initial={pathHidden}
        animate={drawn ? pathDrawn : pathHidden}
        transition={reduceMotion ? drawNone : stairsDraw}
      />
      <motion.path
        d="M9.5 22.3 L8 28 L16.5 28 L15 22.3"
        initial={pathHidden}
        animate={drawn ? pathDrawn : pathHidden}
        transition={reduceMotion ? drawNone : stairsDraw}
      />
      {/* Hammer — drawn in at rest, then the pivot rotation (ref) slams it down. */}
      <g ref={hammerRef} transform="translate(8.5 7) rotate(-6)">
        <motion.path
          d="M-4.5 0 L11.5 0"
          initial={pathHidden}
          animate={drawn ? pathDrawn : pathHidden}
          transition={reduceMotion ? drawNone : diagonalDraw}
        />
        <motion.rect
          x="9.7"
          y="-4.8"
          width="4.6"
          height="9.6"
          rx="1.3"
          initial={pathHidden}
          animate={drawn ? pathDrawn : pathHidden}
          transition={reduceMotion ? drawNone : diagonalDraw}
        />
      </g>
      {/* Impact spark — a brief lime flash at the strike point on the slam. */}
      <g ref={sparkRef} stroke="#C6E853" strokeWidth={1.2} style={SPARK_HIDDEN_STYLE} aria-hidden>
        <circle cx="14" cy="18.2" r="1.5" fill="#C6E853" stroke="none" />
        <line x1="14" y1="18.2" x2="9.8" y2="15.6" />
        <line x1="14" y1="18.2" x2="11.2" y2="13.8" />
        <line x1="14" y1="18.2" x2="16" y2="13.4" />
        <line x1="14" y1="18.2" x2="18.2" y2="15.4" />
      </g>
    </svg>
  );
}

function BenchmarkChartCard() {
  const [version, setVersion] = useState<BenchmarkVersionId>("v2.1");
  const [activePath, setActivePath] = useState<PathId>("prompt");
  const [tabId, setTabId] = useState<TabId>("speed");
  const [v2Metric, setV2Metric] = useState<V2Metric>("tokens");
  const [selectedModels, setSelectedModels] = useState<readonly ModelId[]>(
    DEFAULT_MODELS_BY_VERSION.v1,
  );
  const [hoveredComboId, setHoveredComboId] = useState<string | null>(null);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  // V1 (cross-vendor) derived state.
  const baseTab = CHART_TABS.find((t) => t.id === tabId) ?? CHART_TABS[0];
  const combos = useMemo(
    () =>
      COMBOS.filter((combo) => combo.path === activePath && selectedModels.includes(combo.model)),
    [activePath, selectedModels],
  );
  // Refit value axes to the visible selection so outliers don't crowd the rest.
  const fittedTab = useMemo(
    () => ({ ...baseTab, x: fitAxis(baseTab.x, combos), y: fitAxis(baseTab.y, combos) }),
    [baseTab, combos],
  );
  const tab = useMemo(() => localizeTab(fittedTab), [fittedTab]);
  const labelPlacements = useMemo(() => computeLabelPlacements(combos, tab), [combos, tab]);

  // V2 derived state. The tabs select the PATH; the dots are the models for that
  // path (one per model, colored + labeled). The axis is fit to the active path's
  // models (like v1's fitAxis) so the dots spread across the plot — on the
  // assisted paths the models cluster, and a fixed all-path axis would crush them
  // into an unreadable corner with no room for labels.
  // "v2-family" = the v2 (legacy 5-spec) and v2.1 (current 13-spec) prompt-only
  // ablation views; both share this chart's rendering and differ only in dataset.
  const isV2 = version === "v2" || version === "v2.1";
  const v2DatasetValue = useMemo(() => v2Dataset(version), [version]);
  // V2-family exposes a restricted tab set (pathTabsFor): v2 legacy is Prompt-only;
  // v2.1 adds MCP. Clamp to a tab this version actually offers so a stale v1
  // selection (e.g. cli) can't leak the wrong data into the v2 chart.
  const v2Tabs = pathTabsFor(version);
  const v2Path: PathId = isV2 ? (v2Tabs.includes(activePath) ? activePath : "prompt") : activePath;
  const v2ModelPoints = useMemo(
    () => computeV2ModelPoints(v2DatasetValue, v2Path),
    [v2DatasetValue, v2Path],
  );
  // Per-version graph selection; free-tier models start OFF (opt-in via the
  // model picker). Kept per version so a v2.1 toggle doesn't leak into v2.
  const [v2SelectedKeys, setV2SelectedKeys] = useState<Record<V2Version, readonly string[]>>(
    () => ({ "v2": v2DefaultModelKeys("v2"), "v2.1": v2DefaultModelKeys("v2.1") }),
  );
  // On v1 this reads (and ignores) the v2.1 selection — keeps the reference
  // stable so the derived memos don't recompute every render.
  const v2ActiveSelection = v2SelectedKeys[version === "v2" ? "v2" : "v2.1"];
  const toggleV2Model = useCallback(
    (key: string) => {
      if (version === "v1") return;
      const v = version as V2Version;
      setV2SelectedKeys((prev) => {
        const current = prev[v];
        const next = current.includes(key)
          ? current.length > 1
            ? current.filter((k) => k !== key)
            : current // keep at least one model selected
          : v2Dataset(v)
              .models.map((model) => model.key)
              .filter((k) => k === key || current.includes(k));
        return { ...prev, [v]: next };
      });
    },
    [version],
  );
  // Models that belong on this path+metric view at all: swept on the path, and
  // (on Cost) priced. Drives both the picker list and the plot, so the picker
  // never offers a model the chart can't honestly place.
  const v2EligiblePoints = useMemo(
    () => v2ModelPoints.filter((point) => v2PointEligible(point, v2Metric, v2Path)),
    [v2ModelPoints, v2Metric, v2Path],
  );
  // On the Prompt tab the model picker drives visibility. On the assisted MCP tab
  // the picker's paid-only default would hide the only model swept there (DeepSeek,
  // a free provider), so show every eligible model instead; points with no data
  // for the active metric are dropped by v2PlottedPoints below.
  const v2VisiblePoints = useMemo(
    () =>
      v2Path === "prompt"
        ? v2EligiblePoints.filter((point) => v2ActiveSelection.includes(point.key))
        : v2EligiblePoints,
    [v2EligiblePoints, v2ActiveSelection, v2Path],
  );
  // A visible model with no data for the active metric is left OFF the plot
  // (footnoted below the chart) — plotting it at 0 would fake "cheapest".
  const v2PlottedPoints = useMemo(
    () => v2VisiblePoints.filter((point) => v2MetricValue(point, v2Metric) !== null),
    [v2VisiblePoints, v2Metric],
  );
  const v2UnmeteredLabels = useMemo(
    () =>
      v2VisiblePoints
        .filter((point) => v2MetricValue(point, v2Metric) === null)
        .map((point) => `${point.label} · ${point.reasoning}`),
    [v2VisiblePoints, v2Metric],
  );
  const v2Axis = useMemo(() => buildV2Axis(v2Metric, v2PlottedPoints), [v2Metric, v2PlottedPoints]);
  const v2LabelPlacements = useMemo(
    () => computeV2LabelPlacements(v2PlottedPoints, v2Axis, v2Metric),
    [v2PlottedPoints, v2Axis, v2Metric],
  );
  const v2AxisNote = (V2_CHART_TABS.find((t) => t.id === v2Metric) ?? V2_CHART_TABS[0]).note;
  const v2AxisTab = useMemo<TabSpec>(
    () => ({ id: "tokens", label: "", note: v2AxisNote, x: v2Axis, y: PASS_AXIS, yInverted: false }),
    [v2AxisNote, v2Axis],
  );

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
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-start justify-between gap-4 px-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <VersionDropdown value={version} onSelect={setVersion} />
            <PathTabs
              active={isV2 ? v2Path : activePath}
              onSelect={setActivePath}
              paths={isV2 ? v2Tabs : PATH_TAB_ORDER}
            />
            {isV2 ? null : <PathsHelp />}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <div
              className="inline-flex overflow-hidden rounded-md border border-[#d9d8d2] dark:border-[rgba(237,235,228,0.14)]"
              role="tablist"
              aria-label={m.llmBenchmarkMetric()}
            >
              {isV2
                ? V2_CHART_TABS.map((t) => (
                    <MetricTabButton
                      key={t.id}
                      id={t.id}
                      label={t.label}
                      active={v2Metric === t.id}
                      onSelect={setV2Metric}
                    />
                  ))
                : CHART_TABS.map((t) => (
                    <ChartTabButton
                      key={t.id}
                      tab={localizeTab(t)}
                      active={tabId === t.id}
                      onSelect={setTabId}
                    />
                  ))}
            </div>
            {isV2 ? (
              <V2ModelFilter
                points={v2EligiblePoints}
                selected={v2ActiveSelection}
                onToggle={toggleV2Model}
              />
            ) : (
              <ModelFilter
                benchmarkVersion={version}
                selectedModels={selectedModels}
                onToggle={toggleModel}
              />
            )}
          </div>
        </div>
      </div>

      <div ref={ref} className="px-3 pb-2 pt-5 sm:px-6">
        {/* Labeled, focusable section: WAI scrollable-region pattern */}
        <section aria-label={m.llmScatterAria()} className="overflow-x-auto" tabIndex={0}>
          <div className="mx-auto w-full min-w-[560px] max-w-[1180px]">
            <p className="px-3 text-sm font-semibold">{isV2 ? getAxisLabel("pass") : tab.y.label}</p>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="mt-2 h-auto w-full">
              {isV2 ? (
                <>
                  <AxisLayer key={`v2-${v2Metric}-${v2Axis.max}`} tab={v2AxisTab} palette={palette} />
                  {v2PlottedPoints.map((point, index) => (
                    <V2Dot
                      key={point.key}
                      point={point}
                      x={plotX(v2MetricValue(point, v2Metric) ?? 0, v2Axis)}
                      y={plotY(point.pass, PASS_AXIS, false)}
                      cardBg={palette.circleStroke}
                      metricLabel={formatV2Metric(point, v2Metric)}
                      xAxisValue={formatV2MetricCompact(point, v2Metric)}
                      placement={v2LabelPlacements[point.key]}
                      index={index}
                      inView={inView}
                      reduceMotion={reduceMotion === true}
                      active={hoveredModel === point.key}
                      onActiveChange={setHoveredModel}
                    />
                  ))}
                </>
              ) : (
                <>
                  <AxisLayer
                    key={`${tab.id}-${tab.x.max}-${tab.y.max}`}
                    tab={tab}
                    palette={palette}
                  />
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
                </>
              )}
            </svg>
          </div>
        </section>
        {/* Models the harness couldn't meter on the active axis are dropped from
            the plot (not shown at 0, which would fake "cheapest") and listed here. */}
        {isV2 && v2UnmeteredLabels.length > 0 ? (
          <p className="mx-auto w-full max-w-[1180px] px-3 pb-1 pt-1 text-xs text-[#71706a] dark:text-[#8f8d84]">
            {m.llmScatterUnmetered({ models: v2UnmeteredLabels.join(", ") })}
          </p>
        ) : null}
      </div>

      {isV2 ? null : <CardLegend models={selectedModels} />}
    </motion.div>
  );
}

// Hoisted so swatches don't allocate style objects per render (react-perf).
const MODEL_SWATCH_STYLES = Object.fromEntries(
  MODEL_ORDER.map((model) => [model, { backgroundColor: CHART_PALETTE.models[model] }]),
) as Record<ModelId, CSSProperties>;

function PathTabs({
  active,
  onSelect,
  paths = PATH_TAB_ORDER,
}: {
  active: PathId;
  onSelect: (path: PathId) => void;
  paths?: readonly PathId[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Creation path">
      {paths.map((path) => (
        <PathTabButton key={path} path={path} active={active === path} onSelect={onSelect} />
      ))}
    </div>
  );
}

// "?" help icon next to the path tabs — hovering explains what each creation
// path (MCP / CLI / Prompt) actually does, replacing the per-path legend line.
function PathsHelp() {
  return (
    <Tooltip delay={0}>
      <TooltipTrigger
        type="button"
        aria-label="What do the MCP, CLI, and Prompt paths mean?"
        className="flex size-[18px] shrink-0 cursor-help items-center justify-center rounded-full border border-[#d9d8d2] text-[10px] font-bold leading-none text-[#71706a] transition-colors hover:border-[#1b1a17] hover:text-[#1b1a17] dark:border-[rgba(237,235,228,0.2)] dark:text-[#8f8d84] dark:hover:border-[#dad8d0] dark:hover:text-[#dad8d0]"
      >
        ?
      </TooltipTrigger>
      <TooltipContent className="max-w-[18rem]">
        <p className="mb-1.5 font-semibold">Creation path — how the agent builds the project:</p>
        <ul className="space-y-1">
          {PATH_TAB_ORDER.map((path) => (
            <li key={path}>
              <span className="font-mono font-semibold">{getPathShort(path)}</span> —{" "}
              {getPathDetail(path)}
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}

// Compact "?" affix for a leaderboard column header — hover explains the metric.
// Mirrors PathsHelp, sized down to sit inside the 10px uppercase header labels.
function MetricHelp({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip delay={0}>
      <TooltipTrigger
        type="button"
        aria-label={`What does ${label} mean?`}
        className="flex size-3.5 shrink-0 cursor-default items-center justify-center rounded-full border border-[#d9d8d2] text-[9px] font-bold leading-none text-[#71706a] transition-colors hover:border-[#1b1a17] hover:text-[#1b1a17] dark:border-[rgba(237,235,228,0.2)] dark:text-[#8f8d84] dark:hover:border-[#dad8d0] dark:hover:text-[#dad8d0]"
      >
        ?
      </TooltipTrigger>
      <TooltipContent className="max-w-[17rem] normal-case tracking-normal">
        <p className="font-semibold">{label}</p>
        <p className="mt-1 font-normal">{children}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function PathTabButton({
  path,
  active,
  onSelect,
}: {
  path: PathId;
  active: boolean;
  onSelect: (path: PathId) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(path);
  }, [onSelect, path]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={cn(
        "cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "bg-[#1b1a17] text-[#faf9f5] dark:bg-[#dad8d0] dark:text-[#100f0e]"
          : "text-[#71706a] hover:bg-[#edebe4] hover:text-[#1b1a17] dark:text-[#8f8d84] dark:hover:bg-[rgba(237,235,228,0.10)] dark:hover:text-[#dad8d0]",
      )}
    >
      {getPathShort(path)}
    </button>
  );
}

function ModelFilter({
  benchmarkVersion,
  selectedModels,
  onToggle,
}: {
  benchmarkVersion: BenchmarkVersionId;
  selectedModels: readonly ModelId[];
  onToggle: (model: ModelId) => void;
}) {
  const groups = MODEL_GROUPS.filter((group) => group.version === benchmarkVersion);

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
      <DropdownMenuContent
        align="end"
        className={cn("w-80 max-w-[calc(100vw-2rem)]", CHART_THEME_VARS)}
      >
        {groups.map((group, index) => (
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
      <span className="min-w-0 flex-1">{getModelLabel(model)}</span>
    </DropdownMenuCheckboxItem>
  );
}

// V2-family model picker (mirrors the v1 ModelFilter dropdown). One flat list —
// every model eligible for the active path+metric, ranked together, with no
// paid/free grouping. The badge counts selected models among the OFFERED ones,
// so switching to Cost (which hides free/unpriced models) can't show a count
// larger than the list.
function V2ModelFilter({
  points,
  selected,
  onToggle,
}: {
  points: readonly V2ModelPoint[];
  selected: readonly string[];
  onToggle: (key: string) => void;
}) {
  const selectedShown = points.filter((point) => selected.includes(point.key)).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={m.llmFilterModels()}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#d9d8d2] px-3.5 py-2 text-xs font-medium text-[#71706a] transition-colors hover:text-[#1b1a17] dark:border-[rgba(237,235,228,0.14)] dark:text-[#8f8d84] dark:hover:text-[#dad8d0]"
      >
        {m.llmModels()}
        <span className="rounded-sm bg-[#C6E853] px-1.5 font-mono text-[10px] font-semibold text-[#0a0a0a]">
          {selectedShown}
        </span>
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn("w-80 max-w-[calc(100vw-2rem)]", CHART_THEME_VARS)}
      >
        <DropdownMenuGroup>
          {points.map((point) => (
            <V2ModelMenuItem
              key={point.key}
              point={point}
              checked={selected.includes(point.key)}
              onToggle={onToggle}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function V2ModelMenuItem({
  point,
  checked,
  onToggle,
}: {
  point: V2ModelPoint;
  checked: boolean;
  onToggle: (key: string) => void;
}) {
  const handleChange = useCallback(() => {
    onToggle(point.key);
  }, [onToggle, point.key]);
  const swatchStyle = useMemo(() => ({ background: point.color }), [point.color]);

  return (
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={handleChange} closeOnClick={false}>
      <span className="size-2.5 shrink-0 rounded-[2px]" style={swatchStyle} />
      <span className="min-w-0 flex-1">
        {point.label} · {point.reasoning}
      </span>
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
      <title>
        {getModelLabel(combo.model)} · {getPathShort(combo.path)}
      </title>
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
    <g opacity={active ? 0.85 : 0} className="pointer-events-none transition-opacity duration-150">
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
          <span
            key={model}
            className="flex min-w-0 items-center gap-2 text-xs font-semibold sm:text-sm"
          >
            <span className="size-2.5 rounded-[2px]" style={MODEL_SWATCH_STYLES[model]} />
            <span>{getModelLabel(model)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Generic segmented tab button (used for the V2 metric switch). Mirrors
// ChartTabButton's styling but is not coupled to the v1 TabId union.
function MetricTabButton<T extends string>({
  id,
  label,
  active,
  onSelect,
}: {
  id: T;
  label: string;
  active: boolean;
  onSelect: (id: T) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

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
      {label}
    </button>
  );
}

// Greedy, collision-avoiding placement for the per-model dot labels (model +
// reasoning), mirroring the v1 computeLabelPlacements: rightmost dots choose
// first, each label takes the first candidate slot that clears every dot and
// already-placed label; if none fits it's hidden and shown on hover instead.
function computeV2LabelPlacements(
  points: readonly V2ModelPoint[],
  axis: AxisSpec,
  metric: V2Metric,
): Record<string, LabelPlacement> {
  const mapped = points.map((point) => ({
    point,
    // Callers pass only plotted points (metric value non-null); `?? 0` narrows.
    x: plotX(v2MetricValue(point, metric) ?? 0, axis),
    y: plotY(point.pass, PASS_AXIS, false),
    width: (`${point.label} · ${point.reasoning}`.length + 1) * LABEL_CHAR_W,
  }));
  const obstacles: LabelBox[] = mapped.map((p) => ({
    x1: p.x - DOT_PAD,
    y1: p.y - DOT_PAD,
    x2: p.x + DOT_PAD,
    y2: p.y + DOT_PAD,
  }));
  // Corner note ("cheap + reliable ↗"), end-anchored at the top right.
  obstacles.push({ x1: M_L + PLOT_W - 8 - 18 * 6.4, y1: M_T + 6, x2: M_L + PLOT_W - 8, y2: M_T + 22 });

  const placements: Record<string, LabelPlacement> = {};
  const ordered = [...mapped].sort((a, b) => b.x - a.x || a.y - b.y);
  for (const p of ordered) {
    let placed: LabelPlacement = { hidden: true };
    for (const candidate of PLACEMENT_CANDIDATES) {
      const box = labelBox(p.x, p.y, p.width, candidate);
      if (box.x1 < 2 || box.x2 > VB_W - 2 || box.y1 < 12 || box.y2 > M_T + PLOT_H + 16) continue;
      if (obstacles.some((o) => boxesOverlap(box, o))) continue;
      placed = candidate;
      obstacles.push(box);
      break;
    }
    placements[p.point.key] = placed;
  }
  return placements;
}

// A single V2 model point for the active path. Reuses the shared marker/hover
// machinery; the dot is labeled with the MODEL name + reasoning (placed to avoid
// collisions; a label with no free slot is shown on hover instead).
function V2Dot({
  point,
  x,
  y,
  cardBg,
  metricLabel,
  xAxisValue,
  placement,
  index,
  inView,
  reduceMotion,
  active,
  onActiveChange,
}: {
  point: V2ModelPoint;
  x: number;
  y: number;
  cardBg: string;
  metricLabel: string;
  xAxisValue: string;
  placement: LabelPlacement | undefined;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
  active: boolean;
  onActiveChange: (key: string | null) => void;
}) {
  const nearRightEdge = x > M_L + PLOT_W - 150;
  const animate = useMemo(() => ({ x, y, opacity: inView ? 1 : 0 }), [x, y, inView]);
  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { x: chartMove, y: chartMove, opacity: { duration: 0.45, delay: 0.1 + index * 0.08 } },
    [index, reduceMotion],
  );
  const activate = useCallback(() => onActiveChange(point.key), [onActiveChange, point.key]);
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
      aria-label={`${point.label} · ${point.reasoning} · ${point.pass}% Core pass · ${metricLabel}`}
    >
      <HoverGuides active={active} hex={point.color} x={x} y={y} />
      <ChartMarker hex={point.color} cardBg={cardBg} />
      {/* Model + reasoning label, placed to avoid collisions. If no slot was
          found (placement.hidden) the label only appears on hover/focus. */}
      {placement && !placement.hidden ? (
        <text
          x={placement.dx ?? 10}
          y={placement.dy ?? 4}
          textAnchor={placement.anchor ?? "start"}
          fontSize={11}
          fontWeight={active ? 700 : 600}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3}
          paintOrder="stroke"
        >
          {point.label} · {point.reasoning}
        </text>
      ) : active ? (
        <text
          x={nearRightEdge ? -10 : 10}
          y={-12}
          textAnchor={nearRightEdge ? "end" : "start"}
          fontSize={11}
          fontWeight={700}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3}
          paintOrder="stroke"
        >
          {point.label} · {point.reasoning}
        </text>
      ) : null}
      {/* On hover, project the dot's value onto each axis in its own color,
          replacing the native tooltip. Geometry mirrors AxisLayer's tick rows:
          y-value sits at the y-axis (end-anchored), x-value on the x-axis row. */}
      <g className="pointer-events-none transition-opacity duration-150" opacity={active ? 1 : 0}>
        <text
          x={M_L - x - 10}
          y={4}
          textAnchor="end"
          fontSize={11}
          fontWeight={700}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3}
          paintOrder="stroke"
          className="font-mono"
        >
          {point.pass}%
        </text>
        <text
          x={0}
          y={M_T + PLOT_H - y + 22}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3}
          paintOrder="stroke"
          className="font-mono"
        >
          {xAxisValue}
        </text>
      </g>
    </motion.g>
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
              {agent.shell ? <span className="text-ink dark:text-brand">$ </span> : null}
              {agent.command}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label={m.llmCopyAgentSetupCommand({ agent: agent.label })}
              className={cn(
                "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]",
                copied ? "text-ink dark:text-brand" : "text-muted-foreground hover:text-foreground",
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

function ScaffbenchLeaderboardCard() {
  const [version, setVersion] = useState<LeaderboardVersion>("v2.1");
  const [leaderPath, setLeaderPath] = useState<LeaderPath>("all");
  const [selectedSpecs, setSelectedSpecs] = useState<readonly string[]>(SCAFFBENCH21_SPECS);
  const [selectedModelKeys, setSelectedModelKeys] = useState<readonly string[]>(() =>
    v2Dataset("v2.1").models.map((model) => model.key),
  );

  // "v2-family" = the v2 (legacy 5-spec) and v2.1 (current 13-spec) prompt-only
  // leaderboards; both share rendering and differ only in dataset.
  const isV2 = version === "v2" || version === "v2.1";
  const dataset = useMemo(() => v2Dataset(version), [version]);

  // The two v2-family versions track different spec suites (5 vs 13), so reset the
  // spec filter to the active version's full spec list whenever the version flips.
  useEffect(() => {
    if (version === "v1") return;
    setSelectedSpecs(version === "v2" ? SCAFFBENCH2_SPECS : SCAFFBENCH21_SPECS);
    setSelectedModelKeys(v2Dataset(version).models.map((model) => model.key));
  }, [version]);

  // We publish a single metric — Core pass (install/build/typecheck). The Full /
  // quality-gate pass is withheld until a re-run with the corrected gate produces
  // honest numbers (the old gate skipped lint/test and auto-fixed format, which
  // overstated Full). computeV2ModelRows still takes a mode so Full can return
  // with one line once that re-run lands.
  const MODE = "core" as const;
  // V2-family exposes a restricted tab set (pathTabsFor): v2 legacy is Prompt-only;
  // v2.1 adds the assisted MCP path. Clamp to a tab this version offers so the
  // pooled "all" default (or a stale v1 selection) resolves to Prompt.
  const v2LeaderTabs = pathTabsFor(version);
  const effectiveLeaderPath: LeaderPath = isV2
    ? v2LeaderTabs.includes(leaderPath as PathId)
      ? leaderPath
      : "prompt"
    : leaderPath;
  const specsSet = useMemo(() => new Set<string>(selectedSpecs), [selectedSpecs]);
  const modelKeysSet = useMemo(() => new Set<string>(selectedModelKeys), [selectedModelKeys]);
  // One row per model, sorted best-first, for the chosen creation path. V2-family
  // rows are further filtered to the models the user has selected in the picker.
  const rows = useMemo(
    () =>
      isV2
        ? computeV2ModelRows(dataset, effectiveLeaderPath, MODE, specsSet).filter((row) =>
            modelKeysSet.has(row.key),
          )
        : computeV1ModelRows(effectiveLeaderPath),
    [isV2, dataset, effectiveLeaderPath, specsSet, modelKeysSet],
  );

  const toggleSpec = useCallback(
    (spec: string) => {
      setSelectedSpecs((prev) =>
        prev.includes(spec)
          ? prev.filter((s) => s !== spec)
          : dataset.specs.filter((s) => s === spec || prev.includes(s)),
      );
    },
    [dataset],
  );

  const toggleModel = useCallback(
    (key: string) => {
      setSelectedModelKeys((prev) =>
        prev.includes(key)
          ? prev.filter((k) => k !== key)
          : dataset.models.filter((m) => m.key === key || prev.includes(m.key)).map((m) => m.key),
      );
    },
    [dataset],
  );

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className={cn(
        "mt-8 overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]",
        LEADERBOARD_THEME_VARS,
        // v1 rows color their bars from the per-model chart palette (--ch-*).
        CHART_THEME_VARS,
      )}
    >
      <div className="border-b border-[#e1e0d8] px-3 py-4 dark:border-[rgba(237,235,228,0.10)] sm:px-6">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <VersionDropdown value={version} onSelect={setVersion} />
            <div className="flex items-center gap-1" role="tablist" aria-label="Creation path">
              {isV2 ? (
                // V2-family shows the version's restricted tab set (pathTabsFor):
                // v2 legacy is Prompt-only; v2.1 adds the assisted MCP path.
                v2LeaderTabs.map((p) => (
                  <PillButton
                    key={p}
                    value={p}
                    label={LEADERBOARD_LABELS[p]}
                    active={effectiveLeaderPath === p}
                    onSelect={setLeaderPath}
                    accent="teal"
                  />
                ))
              ) : (
                <>
                  <PillButton
                    value="all"
                    label="All"
                    active={leaderPath === "all"}
                    onSelect={setLeaderPath}
                    accent="teal"
                  />
                  <PillButton
                    value="mcp"
                    label="MCP"
                    active={leaderPath === "mcp"}
                    onSelect={setLeaderPath}
                    accent="teal"
                  />
                  <PillButton
                    value="cli"
                    label="CLI"
                    active={leaderPath === "cli"}
                    onSelect={setLeaderPath}
                    accent="teal"
                  />
                  <PillButton
                    value="prompt"
                    label="Prompt"
                    active={leaderPath === "prompt"}
                    onSelect={setLeaderPath}
                    accent="teal"
                  />
                </>
              )}
            </div>
          </div>
          {isV2 ? (
            <div className="flex items-center gap-2">
              <ModelPicker
                models={dataset.models}
                selectedKeys={selectedModelKeys}
                onToggle={toggleModel}
              />
              <SpecFilter specs={dataset.specs} selectedSpecs={selectedSpecs} onToggle={toggleSpec} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="px-3 pb-4 pt-5 sm:px-6">
        <section
          aria-label="ScaffBench 2 pass-rate leaderboard"
          className="overflow-x-auto"
          tabIndex={0}
        >
          <div className="mx-auto w-full min-w-[920px] max-w-[1180px] px-3">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-semibold">Pass 1 by model</p>
              <p className="text-xs text-[#71706a] dark:text-[#8f8d84]">
                {effectiveLeaderPath === "all"
                  ? "All creation paths"
                  : LEADERBOARD_LABELS[effectiveLeaderPath]}
                {isV2 ? " · Core + Full pass, wired libs & time" : ""}
              </p>
            </div>

            <div
              className={cn(
                LEADERBOARD_GRID,
                "mb-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#71706a] dark:text-[#8f8d84]",
              )}
            >
              <span>Model</span>
              <span aria-hidden />
              <span className="flex items-center justify-end gap-1">
                Core
                <MetricHelp label="Core pass@1">
                  The project installs, builds, type-checks, and native-compiles from the prompt — the
                  real "does it actually run" pass. Closed-book: agents may not run installs or dev
                  servers while generating, so every manifest is written from model knowledge; our
                  validator runs the real toolchains afterward.
                </MetricHelp>
              </span>
              <span className="flex items-center justify-end gap-1">
                Full
                <MetricHelp label="Full pass">
                  Core, plus every applicable quality gate (lint, format, tests). Stricter than Core —
                  a project can build green yet still fail Full.
                </MetricHelp>
              </span>
              <span className="flex items-center justify-end gap-1">
                Wired
                <MetricHelp label="Wired libs">
                  How many of the spec's required libraries actually show up in the generated
                  project — dependencies, imports, and files — not just mentioned by name.
                </MetricHelp>
              </span>
              <span className="text-right">Time</span>
              <span className="text-right">Avg cost</span>
              <span className="text-right">Out tok</span>
              <span className="text-right">Steps</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${version}-${leaderPath}`}
                initial={leaderFadeHidden}
                animate={leaderFadeVisible}
                exit={leaderFadeHidden}
                transition={leaderFadeTransition}
              >
                {rows.map((row) => (
                  <ModelLeaderRow key={row.key} row={row} />
                ))}
              </motion.div>
            </AnimatePresence>

            <div className={cn(LEADERBOARD_GRID, "mt-1.5")}>
              <span aria-hidden />
              <div className="flex justify-between font-mono text-[10px] text-[#9c9a93] dark:text-[#6c6a61]">
                {PASS_AXIS_TICKS.map((tick) => (
                  <span key={tick}>{tick}%</span>
                ))}
              </div>
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

// Distinct active background per segmented group, so the three controls
// (version · validation mode · creation path) read as separate switches.
type PillAccent = "ink" | "lime" | "teal";
const PILL_ACTIVE_CLASS: Record<PillAccent, string> = {
  ink: "bg-[#0a0a0a] text-white dark:bg-[#dad8d0] dark:text-[#100f0e]",
  lime: "bg-[#C6E853] text-[#0a0a0a] dark:bg-[#C6E853] dark:text-[#0a0a0a]",
  teal: "bg-[#0f766e] text-white dark:bg-[#5eead4] dark:text-[#06302b]",
};

function PillButton<T extends string>({
  value,
  label,
  active,
  onSelect,
  accent = "ink",
}: {
  value: T;
  label: ReactNode;
  active: boolean;
  onSelect: (value: T) => void;
  accent?: PillAccent;
}) {
  const handleClick = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={cn(
        "cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? PILL_ACTIVE_CLASS[accent]
          : "text-[#71706a] hover:bg-[#edebe4] hover:text-[#1b1a17] dark:text-[#8f8d84] dark:hover:bg-[rgba(237,235,228,0.10)] dark:hover:text-[#dad8d0]",
      )}
    >
      {label}
    </button>
  );
}

// Quiet "legacy" caption that rides inside the v2 pill, just right of the "v2"
// label, so the version reads "v2 legacy". Uses opacity (not a fixed grey) so it
// stays legible whether the pill is active (dark fill) or idle.
function VersionLegacyTag() {
  return (
    <span className="ml-1 select-none font-mono text-[9px] font-medium uppercase tracking-[0.12em] opacity-60">
      legacy
    </span>
  );
}

// Benchmark-generation picker for both the graph and the leaderboard. The
// generations outgrew the pill row (v1 · v2 legacy · v2.1 crowded the toolbar
// next to the path pills), so they live in a compact dropdown: the trigger
// names the active generation, the menu single-selects among all three.
function VersionDropdown({
  value,
  onSelect,
}: {
  value: BenchmarkVersionId;
  onSelect: (version: BenchmarkVersionId) => void;
}) {
  const handleChange = useCallback(
    (next: unknown) => {
      onSelect(next as BenchmarkVersionId);
    },
    [onSelect],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Benchmark version"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-[#1b1a17] px-3 py-1.5 text-xs font-semibold text-[#faf9f5] transition-opacity hover:opacity-85 dark:bg-[#dad8d0] dark:text-[#161614]"
      >
        {value}
        {value === "v2" ? <VersionLegacyTag /> : null}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn("w-44 max-w-[calc(100vw-2rem)]", CHART_THEME_VARS)}
      >
        <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="v2.1">v2.1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="v2">
            v2
            <VersionLegacyTag />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="v1">v1</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ModelLeaderRow({ row }: { row: ModelLeaderRow }) {
  const fillStyle = useMemo<CSSProperties>(
    () => ({ width: `${row.pass}%`, backgroundColor: row.color }),
    [row.pass, row.color],
  );

  return (
    <div className={cn(LEADERBOARD_GRID, "py-2.5")}>
      <span className="flex min-w-0 items-center gap-1.5">
        <ProviderLogo logo={row.logo} />
        <span className="truncate font-mono text-sm font-bold">{row.label}</span>
        {row.effort ? (
          <span className="shrink-0 font-mono text-[11px] text-[#9c9a93] dark:text-[#6c6a61]">
            [{row.effort}]
          </span>
        ) : null}
      </span>
      <div className="h-2.5 w-full overflow-hidden rounded-full" style={BAR_TRACK_STYLE}>
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={fillStyle}
        />
      </div>
      <span className="text-right font-mono text-sm font-bold">{row.pass}%</span>
      <span className="text-right font-mono text-xs">{row.full === null ? "—" : `${row.full}%`}</span>
      <span className="text-right font-mono text-xs">{row.wired}</span>
      <span className="text-right font-mono text-xs">{row.time}</span>
      <span className="text-right font-mono text-xs">{row.cost}</span>
      <span className="text-right font-mono text-xs">{row.outTok}</span>
      <span className="text-right font-mono text-xs">{row.steps}</span>
    </div>
  );
}

// Model picker for the leaderboard table — sits beside the spec picker so the
// table can be narrowed to specific models as well as specific specs.
function ModelPicker({
  models,
  selectedKeys,
  onToggle,
}: {
  models: readonly { key: string; label: string; effort: string }[];
  selectedKeys: readonly string[];
  onToggle: (key: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Filter models"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#d9d8d2] px-3.5 py-2 text-xs font-medium text-[#71706a] transition-colors hover:text-[#1b1a17] dark:border-[rgba(237,235,228,0.14)] dark:text-[#8f8d84] dark:hover:text-[#dad8d0]"
      >
        Models
        <span className="rounded-sm bg-[#C6E853] px-1.5 font-mono text-[10px] font-semibold text-[#0a0a0a]">
          {selectedKeys.length}/{models.length}
        </span>
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 max-w-[calc(100vw-2rem)]">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-[0.14em]">
            Models
          </DropdownMenuLabel>
          {models.map((model) => (
            <ModelPickerItem
              key={model.key}
              modelKey={model.key}
              label={model.label}
              effort={model.effort}
              checked={selectedKeys.includes(model.key)}
              onToggle={onToggle}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ModelPickerItem({
  modelKey,
  label,
  effort,
  checked,
  onToggle,
}: {
  modelKey: string;
  label: string;
  effort: string;
  checked: boolean;
  onToggle: (key: string) => void;
}) {
  const handleChange = useCallback(() => {
    onToggle(modelKey);
  }, [onToggle, modelKey]);

  return (
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={handleChange} closeOnClick={false}>
      <span className="min-w-0 flex-1 text-xs">{label}</span>
      {effort ? (
        <span className="ml-2 shrink-0 font-mono text-[10px] text-[#9c9a93] dark:text-[#6c6a61]">
          {effort}
        </span>
      ) : null}
    </DropdownMenuCheckboxItem>
  );
}

function SpecFilter({
  specs,
  selectedSpecs,
  onToggle,
}: {
  specs: readonly string[];
  selectedSpecs: readonly string[];
  onToggle: (spec: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Filter specs"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#d9d8d2] px-3.5 py-2 text-xs font-medium text-[#71706a] transition-colors hover:text-[#1b1a17] dark:border-[rgba(237,235,228,0.14)] dark:text-[#8f8d84] dark:hover:text-[#dad8d0]"
      >
        Specs
        <span className="rounded-sm bg-[#C6E853] px-1.5 font-mono text-[10px] font-semibold text-[#0a0a0a]">
          {selectedSpecs.length}/{specs.length}
        </span>
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 max-w-[calc(100vw-2rem)]">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-[0.14em]">
            Specs
          </DropdownMenuLabel>
          {specs.map((spec) => (
            <SpecMenuItem
              key={spec}
              spec={spec}
              checked={selectedSpecs.includes(spec)}
              onToggle={onToggle}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SpecMenuItem({
  spec,
  checked,
  onToggle,
}: {
  spec: string;
  checked: boolean;
  onToggle: (spec: string) => void;
}) {
  const handleChange = useCallback(() => {
    onToggle(spec);
  }, [onToggle, spec]);

  return (
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={handleChange} closeOnClick={false}>
      <span className="min-w-0 flex-1 font-mono text-xs">{spec}</span>
    </DropdownMenuCheckboxItem>
  );
}
