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
  TbArrowRight as ArrowRight,
  TbArrowUpRight as ArrowUpRight,
  TbCheck as Check,
  TbChevronDown as ChevronDown,
  TbCopy as Copy,
} from "react-icons/tb";

import { AgentCommandTabs } from "@/components/mcp/agent-command-tabs";
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
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import { OpenAIMark, ProviderLogo, type ProviderLogoId } from "./provider-marks";
import { SCAFFBENCH22_CELLS, SCAFFBENCH22_MODELS, SCAFFBENCH22_SPECS } from "./scaffbench-2-2-data";
import { type ScaffbenchCell, type ScaffbenchModel } from "./scaffbench-2-data";

const fadeUpInitial = { opacity: 0, y: 12 } as const;

const fadeUpVisible = { opacity: 1, y: 0 } as const;

const viewportOnceNear = { once: true, margin: "-10%" } as const;

const fadeUpTransition = { duration: 0.6 } as const;

const headingStyle: CSSProperties = {
  fontSize: "clamp(2.2rem, 6vw, 4rem)",
  lineHeight: 0.98,
};

const blogPostParams = { _splat: "scaffbench-2-2" } as const;

function isFreeModel(model: ScaffbenchModel): boolean {
  return /(?:-free$|:free$|\/free$)/i.test(model.model);
}

const LEADERBOARD_THEME_VARS = cn(
  "[--bar-claude:#c2410c] [--bar-codex:#15803d] [--bar-opencode:#6d28d9] [--bar-kilo:#0891b2] [--bar-agy:#1a73e8] [--bar-pi:#b45309] [--bar-track:#ececec]",
  "dark:[--bar-claude:#fb923c] dark:[--bar-codex:#4ade80] dark:[--bar-opencode:#a78bfa] dark:[--bar-kilo:#22d3ee] dark:[--bar-agy:#8ab4f8] dark:[--bar-pi:#fbbf24] dark:[--bar-track:#edebe414]",
);

const PROVIDER_BAR_COLOR: Record<"claude" | "codex" | "opencode" | "kilo" | "agy" | "pi", string> =
  {
    claude: "var(--bar-claude)",
    codex: "var(--bar-codex)",
    opencode: "var(--bar-opencode)",
    kilo: "var(--bar-kilo)",
    agy: "var(--bar-agy)",
    pi: "var(--bar-pi)",
  };

const BAR_TRACK_STYLE: CSSProperties = { backgroundColor: "var(--bar-track)" };

const LEADERBOARD_GRID =
  "grid grid-cols-[minmax(9rem,13rem)_minmax(0,1fr)_4.25rem_4.5rem_4rem_4.5rem_4rem_3rem_3.5rem] items-center gap-x-3";

const PASS_AXIS_TICKS: readonly number[] = [0, 20, 40, 60, 80, 100] as const;

interface ModelLeaderRow {
  key: string;
  label: string;
  effort: string;
  color: string;
  logo?: ProviderLogoId;
  harness?: string;
  pass: number;
  buildOnly?: boolean;
  wired: string;
  time: string;
  costNum: number;
  cost: string;
  outTok: string;
  steps: string;
  loc: string;
  rank?: number;
}

function annotateRanks(rows: ModelLeaderRow[]): ModelLeaderRow[] {
  for (let i = 0; i < rows.length; i += 1) {
    rows[i].rank = i + 1;
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
  return [...rows].sort((a, b) => b.pass - a.pass || a.costNum - b.costNum);
}

const PROVIDER_LOGO: Partial<
  Record<"claude" | "codex" | "opencode" | "kilo" | "agy" | "pi", ProviderLogoId>
> = {
  claude: "anthropic",
  codex: "openai",
  agy: "google",
  opencode: "opencode",
  kilo: "kilo",
  pi: "pi",
};

const HARNESS_LABEL: Record<"claude" | "codex" | "opencode" | "kilo" | "agy" | "pi", string> = {
  claude: "Claude Code",
  codex: "Codex",
  opencode: "opencode",
  kilo: "Kilo",
  agy: "Antigravity",
  pi: "Pi",
};

function passTally(scored: readonly ScaffbenchCell[]): {
  successes: number;
  trials: number;
  buildOnly: boolean;
} {
  const coreTrials = scored.reduce((sum, cell) => sum + (cell.scoredTrials ?? 1), 0);
  const coreSuccesses = scored.reduce(
    (sum, cell) => sum + (cell.passCount ?? (cell.corePass ? 1 : 0)),
    0,
  );
  const fullMeasured = scored.filter((cell) => cell.fullPass !== null);
  const qualityMeasured = scored.length > 0 && fullMeasured.length === scored.length;
  if (!qualityMeasured) return { successes: coreSuccesses, trials: coreTrials, buildOnly: true };
  return {
    successes: fullMeasured.reduce(
      (sum, cell) => sum + (cell.qualityPassCount ?? (cell.fullPass ? 1 : 0)),
      0,
    ),
    trials: fullMeasured.reduce((sum, cell) => sum + (cell.scoredTrials ?? 1), 0),
    buildOnly: false,
  };
}

function computeScaffbenchModelRows(specs: ReadonlySet<string>): ModelLeaderRow[] {
  const rows = SCAFFBENCH22_MODELS.flatMap((model) => {
    const cells = SCAFFBENCH22_CELLS.filter(
      (cell) => cell.modelKey === model.key && cell.path === "prompt" && specs.has(cell.spec),
    );
    const scored = cells.filter((cell) => cell.scored);
    const tally = passTally(scored);
    const passSuccesses = tally.successes;
    const passTrials = tally.trials;
    const qualityMeasured = !tally.buildOnly;
    const costs = scored.map((cell) => cell.costUsd).filter((v): v is number => v !== null);
    const tokens = scored.map((cell) => cell.outTokens).filter((v): v is number => v !== null);
    const durations = scored
      .map((cell) => cell.durationMs)
      .filter((v): v is number => v !== null && v !== undefined && v > 0);
    const locValues = scored
      .map((cell) => cell.lines)
      .filter((v): v is number => v !== null && v !== undefined && v > 0);
    const steps = scored.map((cell) => cell.steps).filter((value) => value > 0);
    return {
      key: model.key,
      label: model.label,
      effort: model.effort,
      color: PROVIDER_BAR_COLOR[model.provider],
      logo: PROVIDER_LOGO[model.provider],
      harness: HARNESS_LABEL[model.provider],
      pass: formatPercent(passSuccesses, passTrials),
      buildOnly: scored.length > 0 && !qualityMeasured,
      wired: scored.length > 0 ? `${Math.round(mean(scored.map((cell) => cell.wiredPct)))}%` : "—",
      time: durations.length > 0 ? formatDuration(mean(durations)) : "—",
      costNum: costs.length > 0 ? mean(costs) : Number.POSITIVE_INFINITY,
      cost: costs.length > 0 ? `$${mean(costs).toFixed(2)}` : "—",
      outTok: tokens.length > 0 ? `${(mean(tokens) / 1000).toFixed(1)}k` : "—",
      steps: steps.length > 0 ? String(Math.round(mean(steps))) : "—",
      loc: locValues.length > 0 ? `${(mean(locValues) / 1000).toFixed(1)}k` : "—",
    };
  });
  return sortLeaderRows(rows);
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

interface AxisSpec {
  max: number;
  ticks: readonly number[];
  unit: string;
  label: string;
}

const PASS_AXIS: AxisSpec = {
  max: 110,
  ticks: [0, 25, 50, 75, 100],
  unit: "%",
  label: "Full pass rate",
};

const VB_W = 1120;
const VB_H = 470;
const M_L = 56;
const M_R = 30;
const M_T = 20;
const M_B = 52;
const PLOT_W = VB_W - M_L - M_R;
const PLOT_H = VB_H - M_T - M_B;
const X_INSET = 18;

function plotX(value: number, axis: AxisSpec): number {
  return M_L + (1 - value / axis.max) * (PLOT_W - X_INSET);
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
  "[--ch-grid:#ececec] [--ch-tick:#9c9a93] [--ch-label:#71706a] [--ch-note:#9c9a93] [--ch-stroke:#ffffff]",
  "[--ch-m1:#e85d11] [--ch-m2:#4c5fd5] [--ch-m3:#0d9488] [--ch-m4:#c13a6e] [--ch-m5:#9333ea] [--ch-m6:#b45309]",
  "dark:[--ch-grid:#edebe414] dark:[--ch-tick:#6c6a61] dark:[--ch-label:#8f8d84] dark:[--ch-note:#8f8d84] dark:[--ch-stroke:#161614]",
  "dark:[--ch-m1:#e0894f] dark:[--ch-m2:#98a6f2] dark:[--ch-m3:#4fd0c0] dark:[--ch-m4:#e887ad] dark:[--ch-m5:#c08ef5] dark:[--ch-m6:#dba05c]",
);

const V2_MODEL_COLORS: readonly string[] = [
  "var(--ch-m1)",
  "var(--ch-m2)",
  "var(--ch-m3)",
  "var(--ch-m4)",
  "var(--ch-m5)",
  "var(--ch-m6)",
];

interface LabelPlacement {
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
  hidden?: boolean;
}

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

type V2Metric = "tokens" | "cost" | "steps" | "lines";

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
  tokens: number | null;
  cost: number | null;
  steps: number | null;
  lines: number | null;
  scoredCount: number;
}

function aggregatePathMetrics(modelKey: string): PathMetrics {
  const cells = SCAFFBENCH22_CELLS.filter(
    (cell) => cell.modelKey === modelKey && cell.path === "prompt",
  );
  const scored = cells.filter((cell) => cell.scored);
  const tokens = scored
    .map((cell) => cell.outTokens)
    .filter((value): value is number => value !== null);
  const costs = scored
    .map((cell) => cell.costUsd)
    .filter((value): value is number => value !== null);
  const steps = scored.map((cell) => cell.steps).filter((value) => value > 0);
  const lines = scored
    .map((cell) => cell.lines)
    .filter((value): value is number => value !== null && value !== undefined && value > 0);
  const tally = passTally(scored);
  return {
    pass: formatPercent(tally.successes, tally.trials),
    tokens: tokens.length > 0 ? mean(tokens) / 1000 : null,
    cost: costs.length > 0 ? mean(costs) : null,
    steps: steps.length > 0 ? mean(steps) : null,
    lines: lines.length > 0 ? mean(lines) / 1000 : null,
    scoredCount: scored.length,
  };
}

type MetricBearing = {
  tokens: number | null;
  cost: number | null;
  steps: number | null;
  lines: number | null;
};

function v2MetricValue(point: MetricBearing, metric: V2Metric): number | null {
  if (metric === "cost") return point.cost;
  if (metric === "steps") return point.steps;
  if (metric === "lines") return point.lines;
  return point.tokens;
}

function formatV2Metric(point: MetricBearing, metric: V2Metric): string {
  if (metric === "cost") return point.cost === null ? "—" : `$${point.cost.toFixed(2)}`;
  if (metric === "steps") return point.steps === null ? "—" : `${Math.round(point.steps)} steps`;
  if (metric === "lines") return point.lines === null ? "—" : `${point.lines.toFixed(1)}k lines`;
  return point.tokens === null ? "—" : `${point.tokens.toFixed(1)}k tokens`;
}

function formatV2MetricCompact(point: MetricBearing, metric: V2Metric): string {
  if (metric === "cost") return point.cost === null ? "—" : `$${point.cost.toFixed(2)}`;
  if (metric === "steps") return point.steps === null ? "—" : `${Math.round(point.steps)}`;
  if (metric === "lines") return point.lines === null ? "—" : `${point.lines.toFixed(1)}k`;
  return point.tokens === null ? "—" : `${point.tokens.toFixed(1)}k`;
}

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

function computeV2ModelPoints(): V2ModelPoint[] {
  return SCAFFBENCH22_MODELS.map((model, index) => {
    const metrics = aggregatePathMetrics(model.key);
    const free = isFreeModel(model);
    if (metrics.cost === null && free && metrics.scoredCount > 0) {
      metrics.cost = 0;
    }
    return {
      key: model.key,
      label: model.label,
      reasoning: model.effort,
      harness: HARNESS_LABEL[model.provider],
      color: V2_MODEL_COLORS[index % V2_MODEL_COLORS.length],
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
  if (metric === "lines") return point.lines !== null;
  return true;
}

function computeV2LabelPlacements(
  points: readonly V2ModelPoint[],
  axis: AxisSpec,
  metric: V2Metric,
): Record<string, LabelPlacement> {
  const mapped = points.map((point) => ({
    point,
    x: plotX(v2MetricValue(point, metric) ?? 0, axis),
    y: plotY(point.pass, PASS_AXIS),
    width: (`${point.label} · ${point.harness}`.length + 1) * LABEL_CHAR_W,
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

function BenchmarkChartCard() {
  const [metric, setMetric] = useState<V2Metric>("tokens");
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const modelPoints = useMemo(() => computeV2ModelPoints(), []);
  const eligiblePoints = useMemo(
    () => modelPoints.filter((point) => v2PointEligible(point, metric)),
    [modelPoints, metric],
  );
  const [selectedKeys, setSelectedKeys] = useState<readonly string[]>(() =>
    modelPoints.filter((point) => !point.free).map((point) => point.key),
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
        .map((point) => `${point.label} · ${point.harness}`),
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
      className={cn(
        "mt-12 overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]",
        CHART_THEME_VARS,
      )}
    >
      <div className="border-b border-[#e1e0d8] px-3 py-4 dark:border-[rgba(237,235,228,0.10)] sm:px-6">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-4 px-3">
          <p className="text-sm font-semibold">ScaffBench 2.2 · Prompt path</p>
          <div className="flex flex-wrap items-center justify-end gap-2.5">
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
            <V2ModelFilter
              points={eligiblePoints}
              selected={selectedKeys}
              onToggle={toggleModel}
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="px-3 pb-2 pt-5 sm:px-6">
        <section aria-label={m.llmScatterAria()} className="overflow-x-auto" tabIndex={0}>
          <div className="mx-auto w-full min-w-[560px] max-w-[1180px]">
            <p className="px-3 text-sm font-semibold">{PASS_AXIS.label}</p>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="mt-2 h-auto w-full">
              <AxisLayer key={`${metric}-${axis.max}`} x={axis} note={axisNote} palette={palette} />
              {plottedPoints.map((point, index) => (
                <V2Dot
                  key={point.key}
                  point={point}
                  x={plotX(v2MetricValue(point, metric) ?? 0, axis)}
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
              ))}
            </svg>
          </div>
        </section>
        {unmeteredLabels.length > 0 ? (
          <p className="mx-auto w-full max-w-[1180px] px-3 pb-1 pt-1 text-xs text-[#71706a] dark:text-[#8f8d84]">
            {m.llmScatterUnmetered({ models: unmeteredLabels.join(", ") })}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

function AxisLayer({
  x,
  note,
  palette,
}: {
  x: AxisSpec;
  note: string;
  palette: ChartPalette;
}) {
  return (
    <g>
      {x.ticks.map((tick) => {
        const tx = plotX(tick, x);
        return (
          <g key={`x-${tick}`}>
            <line x1={tx} y1={M_T} x2={tx} y2={M_T + PLOT_H} stroke={palette.grid} />
            <text
              x={tx}
              y={M_T + PLOT_H + 22}
              textAnchor="middle"
              fontSize={11}
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
              {PASS_AXIS.unit}
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
        {note}
      </text>
      <text
        x={M_L + PLOT_W / 2}
        y={VB_H - 6}
        textAnchor="middle"
        fontSize={12}
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
        {point.label} · {point.harness}{" "}
        <span className="text-[10px] opacity-70">[{point.reasoning}]</span>
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
      aria-label={`${point.label} · ${point.harness} · ${point.reasoning} · ${point.pass}% pass · ${metricLabel}`}
    >
      <HoverGuides active={active} hex={point.color} x={x} y={y} />
      <ChartMarker hex={point.color} cardBg={cardBg} />
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
          {point.label} · {point.harness}
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
          {point.label} · {point.harness}
        </text>
      ) : null}
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

function ScaffbenchLeaderboardCard() {
  const [selectedSpecs, setSelectedSpecs] = useState<readonly string[]>(SCAFFBENCH22_SPECS);
  const [selectedModelKeys, setSelectedModelKeys] = useState<readonly string[]>(() =>
    SCAFFBENCH22_MODELS.map((model) => model.key),
  );
  const specsSet = useMemo(() => new Set<string>(selectedSpecs), [selectedSpecs]);
  const modelKeysSet = useMemo(() => new Set<string>(selectedModelKeys), [selectedModelKeys]);
  const rows = useMemo(
    () =>
      annotateRanks(
        computeScaffbenchModelRows(specsSet).filter((row) => modelKeysSet.has(row.key)),
      ),
    [specsSet, modelKeysSet],
  );

  const toggleSpec = useCallback((spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec)
        ? prev.filter((selectedSpec) => selectedSpec !== spec)
        : SCAFFBENCH22_SPECS.filter(
            (availableSpec) => availableSpec === spec || prev.includes(availableSpec),
          ),
    );
  }, []);

  const toggleModel = useCallback((key: string) => {
    setSelectedModelKeys((prev) =>
      prev.includes(key)
        ? prev.filter((selectedKey) => selectedKey !== key)
        : SCAFFBENCH22_MODELS.filter((model) => model.key === key || prev.includes(model.key)).map(
            (model) => model.key,
          ),
    );
  }, []);

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className={cn(
        "mt-8 overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]",
        LEADERBOARD_THEME_VARS,
      )}
    >
      <div className="border-b border-[#e1e0d8] px-3 py-4 dark:border-[rgba(237,235,228,0.10)] sm:px-6">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-end gap-3 px-3">
          <div className="flex items-center gap-2">
            <ModelPicker
              models={SCAFFBENCH22_MODELS}
              selectedKeys={selectedModelKeys}
              onToggle={toggleModel}
            />
            <SpecFilter
              specs={SCAFFBENCH22_SPECS}
              selectedSpecs={selectedSpecs}
              onToggle={toggleSpec}
            />
          </div>
        </div>
      </div>

      <div className="px-3 pb-4 pt-5 sm:px-6">
        <section
          aria-label="ScaffBench 2.2 pass-rate leaderboard"
          className="overflow-x-auto"
          tabIndex={0}
        >
          <div className="mx-auto w-full min-w-[920px] max-w-[1180px] px-3">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-semibold">Pass 1 by model</p>
              <p className="text-xs text-[#71706a] dark:text-[#8f8d84]">
                Prompt · Full pass, wired libs & time
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
                Pass
                <MetricHelp label="Full pass@1">
                  The project installs, builds, type-checks, AND clears every applicable quality
                  gate (lint, format, tests) on a clean machine. Agents may install and build to
                  self-verify while generating; grading happens cold afterward.
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
              <span className="flex items-center justify-end gap-1">
                LoC
                <MetricHelp label="Lines of code">
                  Mean lines the model actually wrote per scaffold (lockfiles and binaries
                  excluded). Not part of any score — two green runs can differ 10x in how much code
                  they took, and that difference is worth seeing.
                </MetricHelp>
              </span>
            </div>

            <div>
              {rows.map((row) => (
                <ModelLeaderRow key={row.key} row={row} />
              ))}
            </div>

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

function ModelLeaderRow({ row }: { row: ModelLeaderRow }) {
  const fillStyle = useMemo<CSSProperties>(
    () => ({ width: `${row.pass}%`, backgroundColor: row.color }),
    [row.pass, row.color],
  );

  return (
    <div className={cn(LEADERBOARD_GRID, "py-2.5")}>
      <span className="flex min-w-0 items-center gap-1.5">
        {row.rank !== undefined ? (
          <span className="w-6 shrink-0 text-right font-mono text-[11px] tabular-nums text-[#9c9a93] dark:text-[#6c6a61]">
            {row.rank}
          </span>
        ) : null}
        <ProviderLogo logo={row.logo} />
        <span
          className="truncate font-mono text-sm font-bold"
          title={row.harness ? `${row.label} — ${row.harness}` : row.label}
        >
          {row.label}
        </span>
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
      <span className="text-right font-mono text-sm font-bold">
        {row.pass}%
        {row.buildOnly ? (
          <Tooltip delay={0}>
            <TooltipTrigger
              type="button"
              aria-label="Build-level pass; quality gates pending"
              className="cursor-help align-super text-[9px] font-semibold text-[#9c9a93] dark:text-[#6c6a61]"
            >
              *
            </TooltipTrigger>
            <TooltipContent className="max-w-[16rem] normal-case tracking-normal">
              <p className="font-normal">
                Build-level pass (install/build/typecheck). This row's sweeps predate quality-gated
                runs; the Full number lands with its re-run.
              </p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </span>
      <span className="text-right font-mono text-xs">{row.wired}</span>
      <span className="text-right font-mono text-xs">{row.time}</span>
      <span className="text-right font-mono text-xs">{row.cost}</span>
      <span className="text-right font-mono text-xs">{row.outTok}</span>
      <span className="text-right font-mono text-xs">{row.steps}</span>
      <span className="text-right font-mono text-xs">{row.loc}</span>
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
  const firstFreeModelIndex = models.findIndex(isFreeModel);

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

function AgentInstallPanel() {
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

      <AgentCommandTabs className="col-span-12 lg:col-span-8" />
    </motion.div>
  );
}
