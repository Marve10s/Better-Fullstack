import { Link } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  TbArrowUpRight as ArrowUpRight,
  TbCheck as Check,
  TbChevronDown as ChevronDown,
  TbCopy as Copy,
} from "react-icons/tb";

import type {
  ScaffbenchCell,
  ScaffbenchHarness,
  ScaffbenchModel,
  ScaffbenchVendor,
} from "@/components/home/scaffbench-types";

import { OpenAIMark, ProviderLogo, type ProviderLogoId } from "@/components/home/provider-marks";
import { SCAFFBENCH3_CELLS, SCAFFBENCH3_MODELS } from "@/components/home/scaffbench-3-board-data";
import { isFreeModel } from "@/components/home/scaffbench-types";
import { AgentCommandTabs } from "@/components/mcp/agent-command-tabs";
import { SCAFFBENCH3_SPECS } from "@/components/scaffbench/scaffbench-3-data";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/lib/content/theme";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const fadeUpInitial = { opacity: 0, y: 12 } as const;

const fadeUpVisible = { opacity: 1, y: 0 } as const;

const viewportOnceNear = { once: true, margin: "-10%" } as const;

const fadeUpTransition = { duration: 0.6 } as const;

const headingStyle: CSSProperties = {
  fontSize: "clamp(2.2rem, 6vw, 4rem)",
  lineHeight: 0.98,
};

/** A run is unmetered when the provider billed nothing for any scored spec. */
// One color per model vendor, so a lab reads the same in the scatter and the
// leaderboard. Light values are the darkened twins of the dark ones.
const VENDOR_THEME_VARS = cn(
  "[--v-anthropic:#c2410c] [--v-openai:#15803d] [--v-google:#1a73e8] [--v-zai:#0d9488] [--v-moonshot:#dc2626]",
  "[--v-deepseek:#6d28d9] [--v-qwen:#0891b2] [--v-xai:#4f46e5] [--v-meta:#4338ca] [--v-mistral:#b45309]",
  "dark:[--v-anthropic:#fb923c] dark:[--v-openai:#4ade80] dark:[--v-google:#60a5fa] dark:[--v-zai:#5eead4] dark:[--v-moonshot:#f87171]",
  "dark:[--v-deepseek:#a78bfa] dark:[--v-qwen:#38bdf8] dark:[--v-xai:#a5b4fc] dark:[--v-meta:#818cf8] dark:[--v-mistral:#fbbf24]",
);

const LEADERBOARD_THEME_VARS = cn(
  VENDOR_THEME_VARS,
  "[--bar-track:#ececec] [--row-rule:#e7e5dd]",
  "dark:[--bar-track:#edebe40f] dark:[--row-rule:rgba(237,235,228,0.07)]",
);

const VENDOR_COLOR: Record<ScaffbenchVendor, string> = {
  anthropic: "var(--v-anthropic)",
  openai: "var(--v-openai)",
  google: "var(--v-google)",
  zai: "var(--v-zai)",
  moonshot: "var(--v-moonshot)",
  deepseek: "var(--v-deepseek)",
  qwen: "var(--v-qwen)",
  xai: "var(--v-xai)",
  meta: "var(--v-meta)",
  mistral: "var(--v-mistral)",
};

const VENDOR_LOGO: Partial<Record<ScaffbenchVendor, ProviderLogoId>> = {
  anthropic: "anthropic",
  openai: "openai",
  google: "google",
  zai: "zai",
};

const BAR_TRACK_STYLE: CSSProperties = { backgroundColor: "var(--bar-track)" };

// Model name and effort get a fixed, generous column so neither is ever clipped.
const LEADERBOARD_GRID =
  "grid grid-cols-[minmax(15rem,19rem)_minmax(8rem,1fr)_5rem_3.5rem_4.5rem_4rem_3.5rem] items-center gap-x-3";

const PASS_AXIS_TICKS: readonly number[] = [0, 20, 40, 60, 80, 100] as const;

interface ModelLeaderRow {
  key: string;
  label: string;
  effort: string;
  core: number;
  color: string;
  logo?: ProviderLogoId;
  harness: string;
  eligibility: ScaffbenchModel["eligibility"];
  /** ScaffBench Index, 0-100: difficulty-weighted mean of the per-spec graded scores. */
  score: number;
  time: string;
  costNum: number;
  cost: string;
  outTok: string;
  loc: string;
  rank?: number;
}

function annotateRanks(rows: ModelLeaderRow[]): ModelLeaderRow[] {
  let rank = 0;
  for (const row of rows) {
    row.rank = row.eligibility === "ranked" ? (rank += 1) : undefined;
  }
  return rows;
}

function formatPercent(passing: number, total: number): number {
  return total === 0 ? 0 : Math.round((100 * passing) / total);
}

function formatDuration(ms: number): string {
  const seconds = ms / 1000;
  return seconds < 120 ? `${Math.round(seconds)}s` : `${(seconds / 60).toFixed(1)}m`;
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function sortLeaderRows(rows: ModelLeaderRow[]): ModelLeaderRow[] {
  const rankedFirst = (row: ModelLeaderRow) => (row.eligibility === "ranked" ? 0 : 1);
  return [...rows].sort(
    (a, b) => rankedFirst(a) - rankedFirst(b) || b.score - a.score || a.costNum - b.costNum,
  );
}

const HARNESS_LABEL: Record<ScaffbenchHarness, string> = {
  claude: "Claude Code",
  codex: "Codex",
  opencode: "opencode",
  kilo: "Kilo",
  agy: "Antigravity",
  pi: "Pi",
};

const BOARD_MODELS: readonly ScaffbenchModel[] = [...SCAFFBENCH3_MODELS].sort(
  (a, b) => b.sortIndex - a.sortIndex,
);

const BOARD_SPECS: readonly string[] = SCAFFBENCH3_SPECS.map((spec) => spec.id);

function cellsFor(modelKey: string): readonly ScaffbenchCell[] {
  return SCAFFBENCH3_CELLS.filter((cell) => cell.modelKey === modelKey);
}

function coreTally(scored: readonly ScaffbenchCell[]): { successes: number; trials: number } {
  return {
    successes: scored.reduce((sum, cell) => sum + cell.passCount, 0),
    trials: scored.reduce((sum, cell) => sum + cell.scoredTrials, 0),
  };
}

const SPEC_DIFFICULTY = new Map(SCAFFBENCH3_SPECS.map((spec) => [spec.id, spec.difficulty]));

function scaffbenchIndex(scored: readonly ScaffbenchCell[]): number {
  let sum = 0;
  let weight = 0;
  for (const cell of scored) {
    if (cell.score === null) continue;
    const w = SPEC_DIFFICULTY.get(cell.spec) ?? 1;
    sum += w * cell.score;
    weight += w;
  }
  return weight === 0 ? 0 : Math.round(sum / weight);
}

function computeScaffbenchModelRows(specs: ReadonlySet<string>): ModelLeaderRow[] {
  const rows = BOARD_MODELS.map((model) => {
    const scored = cellsFor(model.key).filter((cell) => cell.scored && specs.has(cell.spec));
    const costs = scored.map((cell) => cell.costUsd).filter((v): v is number => v !== null);
    const tokens = scored.map((cell) => cell.outTokens).filter((v): v is number => v !== null);
    const durations = scored
      .map((cell) => cell.durationMs)
      .filter((v): v is number => v !== null && v > 0);
    const locValues = scored
      .map((cell) => cell.lines)
      .filter((v): v is number => v !== null && v > 0);
    return {
      key: model.key,
      label: model.label,
      effort: model.effort,
      color: VENDOR_COLOR[model.vendor],
      logo: VENDOR_LOGO[model.vendor],
      harness: HARNESS_LABEL[model.harness],
      eligibility: model.eligibility,
      score: scaffbenchIndex(scored),
      core: formatPercent(coreTally(scored).successes, coreTally(scored).trials),
      time: durations.length > 0 ? formatDuration(mean(durations)) : "–",
      costNum: costs.length > 0 ? mean(costs) : Number.POSITIVE_INFINITY,
      cost: costs.length === 0 || mean(costs) === 0 ? "–" : `$${mean(costs).toFixed(2)}`,
      outTok: tokens.length > 0 ? `${(mean(tokens) / 1000).toFixed(0)}k` : "–",
      loc: locValues.length > 0 ? `${(mean(locValues) / 1000).toFixed(1)}k` : "–",
    };
  });
  return sortLeaderRows(rows);
}

interface LLMBenchmarkSectionProps {
  layout?: "two-column" | "stacked";
  className?: string;
}

export default function LLMBenchmarkSection({
  layout = "two-column",
  className,
}: LLMBenchmarkSectionProps = {}) {
  if (layout === "stacked") {
    return (
      <section
        id="benchmark"
        className={cn("relative scroll-mt-16 border-t border-border bg-muted/20", className)}
      >
        <div className="px-4 py-20 sm:px-8 sm:py-24">
          <StackedMasthead />
          <BenchmarkChartCard className="mt-12" />
          <ScaffbenchLeaderboardCard className="mt-8" />
          <AgentInstallPanel className="mt-14" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="benchmark"
      className={cn("relative scroll-mt-16 border-t border-border bg-muted/20", className)}
    >
      <div className="border-b border-border">
        <div className="mx-auto min-w-0 max-w-[1220px] p-4 sm:p-6 lg:p-8">
          <BenchmarkMasthead />
          <BenchmarkChartCard className="mt-8" />
        </div>
      </div>
      <div className="border-b border-border">
        <div className="mx-auto min-w-0 max-w-[1220px] p-4 sm:p-6 lg:p-8">
          <ScaffbenchLeaderboardCard />
        </div>
      </div>
      <div className="px-4 py-12 sm:px-8 sm:py-16">
        <AgentInstallPanel />
      </div>
    </section>
  );
}

interface AxisSpec {
  max: number;
  ticks: readonly number[];
  unit: string;
  label: string;
}

const PASS_AXIS: AxisSpec = {
  max: 110,
  ticks: [0, 25, 50, 75, 100],
  unit: "",
  label: "ScaffBench Index",
};

const VB_W = 1120;
const VB_H = 480;
const M_L = 60;
const M_R = 32;
const M_T = 24;
const M_B = 56;
const PLOT_W = VB_W - M_L - M_R;
const PLOT_H = VB_H - M_T - M_B;

function plotX(value: number, axis: AxisSpec): number {
  return M_L + (1 - value / axis.max) * PLOT_W;
}

function plotY(value: number, axis: AxisSpec): number {
  return M_T + (1 - value / axis.max) * PLOT_H;
}

const barEase = [0.2, 0.8, 0.2, 1] as const;
const chartMove = { duration: 0.7, ease: barEase } as const;

interface ChartPalette {
  grid: string;
  axisTick: string;
  axisLabel: string;
  note: string;
  circleStroke: string;
}

const CHART_PALETTE: ChartPalette = {
  grid: "var(--ch-grid)",
  axisTick: "var(--ch-tick)",
  axisLabel: "var(--ch-label)",
  note: "var(--ch-note)",
  circleStroke: "var(--ch-stroke)",
};

const CHART_THEME_VARS = cn(
  VENDOR_THEME_VARS,
  "[--ch-grid:#ececec] [--ch-tick:#9c9a93] [--ch-label:#71706a] [--ch-note:#9c9a93] [--ch-stroke:#ffffff]",
  "dark:[--ch-grid:#edebe414] dark:[--ch-tick:#6c6a61] dark:[--ch-label:#8f8d84] dark:[--ch-note:#8f8d84] dark:[--ch-stroke:#161614]",
);

interface LabelPlacement {
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
  hidden?: boolean;
}

const PLACEMENT_CANDIDATES: readonly LabelPlacement[] = [
  { anchor: "start", dx: 13, dy: 4.5 },
  { anchor: "end", dx: -13, dy: 4.5 },
  { anchor: "middle", dx: 0, dy: 24 },
  { anchor: "middle", dx: 0, dy: -16 },
  { anchor: "end", dx: -13, dy: 20 },
  { anchor: "end", dx: -13, dy: -12 },
  { anchor: "middle", dx: 0, dy: 38 },
  { anchor: "middle", dx: 0, dy: -30 },
  { anchor: "start", dx: 13, dy: 20 },
  { anchor: "start", dx: 13, dy: -12 },
  { anchor: "end", dx: -13, dy: 34 },
  { anchor: "end", dx: -13, dy: 48 },
  { anchor: "middle", dx: 0, dy: 52 },
  { anchor: "middle", dx: 0, dy: -44 },
];

interface LabelBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const LABEL_CHAR_W = 7.5;
const LABEL_ASCENT = 11;
const LABEL_DESCENT = 4;
const DOT_PAD = 12;

function labelBox(x: number, y: number, width: number, p: LabelPlacement): LabelBox {
  const anchorX = x + (p.dx ?? 13);
  const x1 =
    p.anchor === "end" ? anchorX - width : p.anchor === "middle" ? anchorX - width / 2 : anchorX;
  const baseline = y + (p.dy ?? 4.5);
  return { x1, y1: baseline - LABEL_ASCENT, x2: x1 + width, y2: baseline + LABEL_DESCENT };
}

function boxesOverlap(a: LabelBox, b: LabelBox): boolean {
  return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
}

type V2Metric = "tokens" | "cost" | "time" | "lines";

interface V2ChartTabSpec {
  id: V2Metric;
  label: string;
  note: string;
  unit: string;
  axisLabel: string;
}

const V2_CHART_TABS: readonly V2ChartTabSpec[] = [
  {
    id: "tokens",
    label: "Tokens",
    note: "efficient + reliable ↗",
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
    id: "time",
    label: "Time",
    note: "fast + reliable ↗",
    unit: "m",
    axisLabel: "Avg minutes per scaffold",
  },
  {
    id: "lines",
    label: "Code",
    note: "lean + reliable ↗",
    unit: "k",
    axisLabel: "Avg lines of code per scaffold",
  },
] as const;

interface PathMetrics {
  pass: number;
  corePct: number;
  tokens: number | null;
  cost: number | null;
  time: number | null;
  lines: number | null;
  scoredCount: number;
}

function aggregatePathMetrics(sourceCells: readonly ScaffbenchCell[]): PathMetrics {
  const scored = sourceCells.filter((cell) => cell.scored);
  const tokens = scored
    .map((cell) => cell.outTokens)
    .filter((value): value is number => value !== null);
  const costs = scored
    .map((cell) => cell.costUsd)
    .filter((value): value is number => value !== null);
  const durations = scored
    .map((cell) => cell.durationMs)
    .filter((value): value is number => value !== null && value > 0);
  const lines = scored
    .map((cell) => cell.lines)
    .filter((value): value is number => value !== null && value > 0);
  const core = coreTally(scored);
  return {
    pass: scaffbenchIndex(scored),
    corePct: formatPercent(core.successes, core.trials),
    tokens: tokens.length > 0 ? mean(tokens) / 1000 : null,
    cost: costs.length > 0 ? mean(costs) : null,
    time: durations.length > 0 ? mean(durations) / 60_000 : null,
    lines: lines.length > 0 ? mean(lines) / 1000 : null,
    scoredCount: scored.length,
  };
}

type MetricBearing = {
  tokens: number | null;
  cost: number | null;
  time: number | null;
  lines: number | null;
};

function v2MetricValue(point: MetricBearing, metric: V2Metric): number | null {
  if (metric === "cost") return point.cost;
  if (metric === "time") return point.time;
  if (metric === "lines") return point.lines;
  return point.tokens;
}

function formatV2Metric(point: MetricBearing, metric: V2Metric): string {
  if (metric === "cost") return point.cost === null ? "–" : `$${point.cost.toFixed(2)}`;
  if (metric === "time") return point.time === null ? "–" : `${point.time.toFixed(1)} min`;
  if (metric === "lines") return point.lines === null ? "–" : `${point.lines.toFixed(1)}k lines`;
  return point.tokens === null ? "–" : `${point.tokens.toFixed(1)}k tokens`;
}

function formatV2MetricCompact(point: MetricBearing, metric: V2Metric): string {
  if (metric === "cost") return point.cost === null ? "–" : `$${point.cost.toFixed(2)}`;
  if (metric === "time") return point.time === null ? "–" : `${point.time.toFixed(1)}m`;
  if (metric === "lines") return point.lines === null ? "–" : `${point.lines.toFixed(1)}k`;
  return point.tokens === null ? "–" : `${point.tokens.toFixed(1)}k`;
}

function niceStep(maxValue: number): number {
  if (maxValue <= 0) return 1;
  const target = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(target));
  const normalized = target / magnitude;
  let niceNormalized = 1;
  if (normalized > 5) {
    niceNormalized = 10;
  } else if (normalized > 2.5) {
    niceNormalized = 5;
  } else if (normalized > 1.2) {
    niceNormalized = 2;
  }
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
  const max = Math.max(Math.ceil((dataMax * 1.15) / step) * step, step);
  const ticks: number[] = [];
  const decimals = step < 1 ? Math.max(0, -Math.floor(Math.log10(step))) : 0;
  for (let tick = max; tick >= -1e-9; tick -= step) {
    ticks.push(Number(tick.toFixed(decimals)));
  }
  return { max, ticks, unit: tab.unit, label: tab.axisLabel };
}

interface V2ModelPoint extends PathMetrics {
  key: string;
  label: string;
  reasoning: string;
  harness: string;
  color: string;
  free: boolean;
}

function v2PointLabel(model: ScaffbenchModel): string {
  const effort = model.effort.charAt(0).toUpperCase() + model.effort.slice(1);
  return `${model.label} ${effort}`;
}

function computeV2ModelPoints(): V2ModelPoint[] {
  return BOARD_MODELS.map((model) => {
    const metrics = aggregatePathMetrics(cellsFor(model.key));
    const free = isFreeModel(model);
    return {
      key: model.key,
      label: v2PointLabel(model),
      reasoning: model.effort,
      harness: HARNESS_LABEL[model.harness],
      color: VENDOR_COLOR[model.vendor],
      free,
      ...metrics,
    };
  });
}

function v2PointEligible(point: V2ModelPoint, metric: V2Metric): boolean {
  if (point.scoredCount === 0) return false;
  if (metric === "cost") {
    if (point.free) return false;
    return point.cost !== null;
  }
  if (metric === "time") return point.time !== null;
  if (metric === "lines") return point.lines !== null;
  return true;
}

function computeV2LabelPlacements(
  points: readonly V2ModelPoint[],
  axis: AxisSpec,
  metric: V2Metric,
): Record<string, LabelPlacement> {
  const inRange = points.filter((point) => {
    const val = v2MetricValue(point, metric);
    return val !== null && val <= axis.max;
  });
  const mapped = inRange.map((point) => ({
    point,
    x: plotX(v2MetricValue(point, metric) ?? 0, axis),
    y: plotY(point.pass, PASS_AXIS),
    width: (point.label.length + 1) * LABEL_CHAR_W,
  }));
  const obstacles: LabelBox[] = mapped.map((p) => ({
    x1: p.x - DOT_PAD,
    y1: p.y - DOT_PAD,
    x2: p.x + DOT_PAD,
    y2: p.y + DOT_PAD,
  }));
  obstacles.push({
    x1: M_L + PLOT_W - 8 - 18 * 6.4,
    y1: M_T + 6,
    x2: M_L + PLOT_W - 8,
    y2: M_T + 22,
  });

  const placements: Record<string, LabelPlacement> = {};
  const ordered = [...mapped].sort((a, b) => b.x - a.x || a.y - b.y);
  for (const p of ordered) {
    let placed: LabelPlacement = { hidden: true };
    for (const candidate of PLACEMENT_CANDIDATES) {
      const box = labelBox(p.x, p.y, p.width, candidate);
      if (box.x1 < M_L || box.x2 > VB_W - 2 || box.y1 < 12 || box.y2 > M_T + PLOT_H + 16) continue;
      if (obstacles.some((o) => boxesOverlap(box, o))) continue;
      placed = candidate;
      obstacles.push(box);
      break;
    }
    placements[p.point.key] = placed;
  }
  return placements;
}

function BenchmarkChartCard({ className }: { className?: string } = {}) {
  const [metric, setMetric] = useState<V2Metric>("tokens");
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const modelPoints = useMemo(() => computeV2ModelPoints(), []);
  const eligiblePoints = useMemo(
    () => modelPoints.filter((point) => v2PointEligible(point, metric)),
    [modelPoints, metric],
  );
  const [selectedKeys, setSelectedKeys] = useState<readonly string[]>(() =>
    modelPoints.map((point) => point.key),
  );
  const toggleModel = useCallback((key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key)
        ? prev.length > 1
          ? prev.filter((k) => k !== key)
          : prev
        : [...prev, key],
    );
  }, []);
  const visiblePoints = useMemo(
    () => eligiblePoints.filter((point) => selectedKeys.includes(point.key)),
    [eligiblePoints, selectedKeys],
  );
  const plottedPoints = useMemo(
    () => visiblePoints.filter((point) => v2MetricValue(point, metric) !== null),
    [visiblePoints, metric],
  );
  const unmeteredLabels = useMemo(
    () =>
      visiblePoints
        .filter((point) => v2MetricValue(point, metric) === null)
        .map((point) => point.label),
    [visiblePoints, metric],
  );
  const axis = useMemo(() => buildV2Axis(metric, plottedPoints), [metric, plottedPoints]);
  const labelPlacements = useMemo(
    () => computeV2LabelPlacements(plottedPoints, axis, metric),
    [plottedPoints, axis, metric],
  );
  const axisNote = (V2_CHART_TABS.find((t) => t.id === metric) ?? V2_CHART_TABS[0]).note;
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
      className={cn("w-full", CHART_THEME_VARS, className)}
    >
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2.5">
        <div
          className="inline-flex overflow-hidden rounded-md border border-[#d9d8d2] dark:border-[rgba(237,235,228,0.14)]"
          role="tablist"
          aria-label={m.llmBenchmarkMetric()}
        >
          {V2_CHART_TABS.map((t) => (
            <MetricTabButton
              key={t.id}
              id={t.id}
              label={t.label}
              active={metric === t.id}
              onSelect={setMetric}
            />
          ))}
        </div>
        <V2ModelFilter points={eligiblePoints} selected={selectedKeys} onToggle={toggleModel} />
      </div>

      <div
        ref={ref}
        className="overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] px-4 pb-6 pt-6 text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark] sm:px-8 sm:pb-8 sm:pt-7"
      >
        <section aria-label={m.llmScatterAria()} className="overflow-x-auto" tabIndex={0}>
          <div className="w-full">
            <p className="px-3 text-sm font-semibold">ScaffBench Index</p>
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="mt-3 h-auto max-h-[420px] w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <AxisLayer key={`${metric}-${axis.max}`} x={axis} note={axisNote} palette={palette} />
              {plottedPoints.map((point, index) => {
                const val = v2MetricValue(point, metric);
                return (
                  <V2Dot
                    key={point.key}
                    point={point}
                    x={plotX(val ?? 0, axis)}
                    y={plotY(point.pass, PASS_AXIS)}
                    cardBg={palette.circleStroke}
                    metricLabel={formatV2Metric(point, metric)}
                    xAxisValue={formatV2MetricCompact(point, metric)}
                    placement={labelPlacements[point.key]}
                    index={index}
                    inView={inView}
                    reduceMotion={reduceMotion === true}
                    active={hoveredModel === point.key}
                    onActiveChange={setHoveredModel}
                  />
                );
              })}
            </svg>
          </div>
        </section>
        {unmeteredLabels.length > 0 ? (
          <p className="w-full px-3 pb-1 pt-1 text-xs text-[#71706a] dark:text-[#8f8d84]">
            {m.llmScatterUnmetered({ models: unmeteredLabels.join(", ") })}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

function AxisLayer({ x, note, palette }: { x: AxisSpec; note: string; palette: ChartPalette }) {
  return (
    <g>
      {x.ticks.map((tick) => {
        const tx = plotX(tick, x);
        return (
          <g key={`x-${tick}`}>
            <line
              x1={tx}
              y1={M_T}
              x2={tx}
              y2={M_T + PLOT_H}
              stroke={palette.grid}
              strokeWidth={1}
            />
            <text
              x={tx}
              y={M_T + PLOT_H + 24}
              textAnchor="middle"
              fontSize={12.5}
              fill={palette.axisTick}
              className="font-mono"
            >
              {tick}
              {x.unit}
            </text>
          </g>
        );
      })}
      {PASS_AXIS.ticks.map((tick) => {
        const y = plotY(tick, PASS_AXIS);
        return (
          <g key={`y-${tick}`}>
            <line x1={M_L} y1={y} x2={M_L + PLOT_W} y2={y} stroke={palette.grid} strokeWidth={1} />
            <text
              x={M_L - 12}
              y={y + 4.5}
              textAnchor="end"
              fontSize={12.5}
              fill={palette.axisTick}
              className="font-mono"
            >
              {tick}
              {PASS_AXIS.unit}
            </text>
          </g>
        );
      })}
      <text
        x={M_L + PLOT_W - 8}
        y={M_T + 18}
        textAnchor="end"
        fontSize={12.5}
        fontStyle="italic"
        fill={palette.note}
      >
        {note}
      </text>
      <text
        x={M_L + PLOT_W / 2}
        y={VB_H - 10}
        textAnchor="middle"
        fontSize={13}
        fontWeight={500}
        fill={palette.axisLabel}
      >
        {x.label}
      </text>
    </g>
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
        strokeWidth={1.75}
        strokeDasharray="6 6"
      />
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={M_T + PLOT_H - y}
        stroke={hex}
        strokeWidth={1.75}
        strokeDasharray="6 6"
      />
    </g>
  );
}

function ChartMarker({ hex, cardBg, active }: { hex: string; cardBg: string; active?: boolean }) {
  return (
    <>
      <circle r={22} fill="transparent" stroke="transparent" />
      {active ? <circle r={11} fill="none" stroke={hex} strokeWidth={1.5} opacity={0.4} /> : null}
      <circle r={active ? 7.5 : 6} fill={hex} stroke={cardBg} strokeWidth={active ? 3 : 2.5} />
    </>
  );
}

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
        {point.label} <span className="text-[10px] opacity-70">[{point.reasoning}]</span>
      </span>
    </DropdownMenuCheckboxItem>
  );
}

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
        : {
            x: chartMove,
            y: chartMove,
            opacity: { duration: 0.35, delay: 0.1 + index * 0.08 },
          },
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
      aria-label={`${point.label} · ${point.reasoning} · index ${point.pass} · ${metricLabel}`}
    >
      <HoverGuides active={active} hex={point.color} x={x} y={y} />
      <ChartMarker hex={point.color} cardBg={cardBg} active={active} />
      {placement && !placement.hidden ? (
        <text
          x={placement.dx ?? 13}
          y={placement.dy ?? 4.5}
          textAnchor={placement.anchor ?? "start"}
          fontSize={13}
          fontWeight={active ? 700 : 600}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3.5}
          paintOrder="stroke"
        >
          {point.label}
        </text>
      ) : active ? (
        <text
          x={nearRightEdge ? -13 : 13}
          y={-14}
          textAnchor={nearRightEdge ? "end" : "start"}
          fontSize={13}
          fontWeight={700}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3.5}
          paintOrder="stroke"
        >
          {point.label}
        </text>
      ) : null}
      <g className="pointer-events-none transition-opacity duration-150" opacity={active ? 1 : 0}>
        <text
          x={M_L - x - 12}
          y={4.5}
          textAnchor="end"
          fontSize={13}
          fontWeight={700}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3.5}
          paintOrder="stroke"
          className="font-mono"
        >
          {point.pass}
        </text>
        <text
          x={0}
          y={M_T + PLOT_H - y + 24}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={point.color}
          stroke={cardBg}
          strokeWidth={3.5}
          paintOrder="stroke"
          className="font-mono"
        >
          {xAxisValue}
        </text>
      </g>
    </motion.g>
  );
}

function BenchmarkMasthead() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <ScaffBenchMark className="size-7 shrink-0 text-foreground sm:size-8" />
          <h2 className="font-mono text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
            ScaffBench 3
          </h2>
        </div>
        <p className="mt-3 max-w-xl text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {m.llmBenchmarkDescription()}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href="/run"
          className="group flex items-center gap-2 rounded-md border border-border bg-card/60 px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-brand hover:bg-muted/40 dark:hover:text-brand"
        >
          <span>{m.llmRunItYourself()}</span>
          <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <Link
          to="/mcp"
          className="group flex items-center gap-2 rounded-md border border-border bg-card/60 px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-brand hover:bg-muted/40 dark:hover:text-brand"
        >
          <span>{m.llmTryMcp()}</span>
          <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function StackedMasthead() {
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

const Masthead = StackedMasthead;

function ScaffBenchMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M6 4h36v8H14v8h28v24H6v-8h28v-8H6V4Z" />
      <rect x="6" y="20" width="8" height="8" fill="#C6E853" />
    </svg>
  );
}

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

const ALL_SPEC_ROWS: readonly ModelLeaderRow[] = computeScaffbenchModelRows(new Set(BOARD_SPECS));

function ScaffbenchLeaderboardCard({ className }: { className?: string } = {}) {
  const [selectedModelKeys, setSelectedModelKeys] = useState<readonly string[]>(() =>
    BOARD_MODELS.map((model) => model.key),
  );
  const modelKeysSet = useMemo(() => new Set<string>(selectedModelKeys), [selectedModelKeys]);
  const rows = useMemo(
    () => annotateRanks(ALL_SPEC_ROWS.filter((row) => modelKeysSet.has(row.key))),
    [modelKeysSet],
  );

  const toggleModel = useCallback((key: string) => {
    setSelectedModelKeys((prev) =>
      prev.includes(key)
        ? prev.filter((selectedKey) => selectedKey !== key)
        : BOARD_MODELS.filter((model) => model.key === key || prev.includes(model.key)).map(
            (model) => model.key,
          ),
    );
  }, []);

  return (
    <div className={cn(LEADERBOARD_THEME_VARS, className)}>
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        <ModelPicker
          models={BOARD_MODELS}
          selectedKeys={selectedModelKeys}
          onToggle={toggleModel}
        />
      </div>

      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpVisible}
        viewport={viewportOnceNear}
        transition={fadeUpTransition}
        className="overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] px-3 py-6 text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark] sm:px-6 sm:py-8"
      >
        <section
          aria-label="ScaffBench 3 index leaderboard"
          className="overflow-x-auto"
          tabIndex={0}
        >
          <div className="w-full min-w-[1000px] px-1">
            <div
              className={cn(
                LEADERBOARD_GRID,
                "border-b border-[var(--row-rule)] pb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#71706a] dark:text-[#8f8d84]",
              )}
            >
              <span>Model</span>
              <span aria-hidden />
              <span className="flex items-center justify-end gap-1">
                Index
                <MetricHelp label="ScaffBench Index">
                  Every spec earns a graded score: 0.6 when the project installs, builds,
                  type-checks and compiles on a clean machine, 0.2 for the share of lint and format
                  gates that pass, and 0.2 for the share of the spec's required libraries it
                  actually wired in: dependencies, imports and files, not names mentioned in
                  passing. The index is the mean over 13 specs, weighted by spec difficulty (1 easy,
                  2 hard, 3 frontier). Tests, cost, time and lines of code are shown but never
                  scored. The small +N and the faded extension on a bar show how far the plain build
                  rate sits above the index.
                </MetricHelp>
              </span>
              <span className="text-right">Time</span>
              <span className="text-right">Avg cost</span>
              <span className="text-right">Out tok</span>
              <span className="flex items-center justify-end gap-1">
                LoC
                <MetricHelp label="Lines of code">
                  Mean lines the model actually wrote per scaffold (lockfiles and binaries
                  excluded). Not part of any score, two green runs can differ 10x in how much code
                  they took, and that difference is worth seeing.
                </MetricHelp>
              </span>
            </div>

            <div className="divide-y divide-[var(--row-rule)]">
              {rows.map((row) => (
                <ModelLeaderRow key={row.key} row={row} />
              ))}
            </div>

            <div className={cn(LEADERBOARD_GRID, "mt-2")}>
              <span aria-hidden />
              <div className="flex justify-between font-mono text-[10px] text-[#9c9a93] dark:text-[#6c6a61]">
                {PASS_AXIS_TICKS.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function ModelLeaderRow({ row }: { row: ModelLeaderRow }) {
  const fillStyle = useMemo<CSSProperties>(
    () => ({ width: `${row.score}%`, backgroundColor: row.color }),
    [row.score, row.color],
  );
  const coreStyle = useMemo<CSSProperties>(
    () => ({ width: `${row.core}%`, backgroundColor: row.color }),
    [row.core, row.color],
  );
  const coreBandStyle = useMemo<CSSProperties>(
    () => ({ left: `${row.score}%`, width: `${Math.max(row.core - row.score, 0)}%` }),
    [row.core, row.score],
  );

  return (
    <div className={cn(LEADERBOARD_GRID, "py-3.5")}>
      <span className="flex items-center gap-2 whitespace-nowrap">
        {row.rank !== undefined ? (
          <span className="w-5 shrink-0 text-right font-mono text-[11px] tabular-nums text-[#9c9a93] dark:text-[#6c6a61]">
            {row.rank}
          </span>
        ) : (
          <span
            title="Exploratory row: its run provenance does not qualify it for a rank"
            className="w-5 shrink-0 text-right font-mono text-[11px] text-[#9c9a93] dark:text-[#6c6a61]"
          >
            –
          </span>
        )}
        <ProviderLogo logo={row.logo} />
        <Tooltip delay={0}>
          <TooltipTrigger
            type="button"
            className="cursor-default font-mono text-[15px] font-medium"
          >
            {row.label}
          </TooltipTrigger>
          <TooltipContent className="normal-case tracking-normal">
            <p className="font-normal">Run through {row.harness}</p>
          </TooltipContent>
        </Tooltip>
        {row.effort ? (
          <span className="font-mono text-[13px] text-[#9c9a93] dark:text-[#6c6a61]">
            [{row.effort}]
          </span>
        ) : null}
      </span>

      <div className="relative h-4">
        <div className="absolute inset-y-[3px] left-0 right-0 rounded-sm" style={BAR_TRACK_STYLE} />
        <div className="absolute inset-y-[3px] left-0 rounded-sm opacity-30" style={coreStyle} />
        <div className="absolute inset-y-[3px] left-0 rounded-sm" style={fillStyle} />
        {row.core > row.score ? (
          <Tooltip delay={0}>
            <TooltipTrigger
              type="button"
              aria-label={`Built ${row.core}%`}
              className="absolute inset-y-0 cursor-help"
              style={coreBandStyle}
            />
            <TooltipContent className="max-w-[17rem] normal-case tracking-normal">
              <p className="font-semibold">Built {row.core}%</p>
              <p className="mt-1 font-normal">
                Share of specs whose project installs, builds, type-checks and compiles on a clean
                machine. The solid bar is the index: those builds credited for green lint and format
                gates and for the share of the required stack they wired, weighted by spec
                difficulty.
              </p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>

      <span className="flex items-baseline justify-end gap-1">
        <span className="font-mono text-[17px] font-bold tabular-nums">{row.score}</span>
        {row.core > row.score ? (
          <span className="font-mono text-[11px] tabular-nums text-[#9c9a93] dark:text-[#6c6a61]">
            +{row.core - row.score}
          </span>
        ) : null}
      </span>
      <span className="text-right font-mono text-[13px] tabular-nums">{row.time}</span>
      <span className="text-right font-mono text-[13px] tabular-nums">{row.cost}</span>
      <span className="text-right font-mono text-[13px] tabular-nums">{row.outTok}</span>
      <span className="text-right font-mono text-[13px] tabular-nums">{row.loc}</span>
    </div>
  );
}

function ModelPicker({
  models,
  selectedKeys,
  onToggle,
}: {
  models: readonly ScaffbenchModel[];
  selectedKeys: readonly string[];
  onToggle: (key: string) => void;
}) {
  const firstFreeModelIndex = models.findIndex((model) => isFreeModel(model));

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
          {models.map((model, index) => (
            <Fragment key={model.key}>
              {index === firstFreeModelIndex ? <DropdownMenuSeparator /> : null}
              <ModelPickerItem
                modelKey={model.key}
                label={model.label}
                effort={model.effort}
                checked={selectedKeys.includes(model.key)}
                onToggle={onToggle}
              />
            </Fragment>
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

function AgentInstallPanel({ className }: { className?: string } = {}) {
  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className={cn("grid grid-cols-12 items-end gap-x-6 gap-y-6", className)}
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

      <AgentCommandTabs className="col-span-12 lg:col-span-8" />
    </motion.div>
  );
}
