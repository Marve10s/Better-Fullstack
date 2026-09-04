import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";

import type { FixproofBoard } from "@/components/benchmark/fixproof-data";
import type { FixproofRow } from "@/components/benchmark/fixproof-theme";

import {
  FIXPROOF_CARD,
  FIXPROOF_THEME_VARS,
  buildRows,
  formatMinutes,
  legendVendors,
  pointLabel,
} from "@/components/benchmark/fixproof-theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

type ChartMetric = "resolvedIndex" | "progressIndex";

interface AxisSpec {
  max: number;
  ticks: readonly number[];
  label: string;
}

/** Both indexes run 0 to 100. The headroom keeps a perfect score off the frame. */
const INDEX_AXIS_MAX = 110;
const INDEX_TICKS: readonly number[] = [0, 25, 50, 75, 100];

const VB_W = 1120;
const VB_H = 480;
const M_L = 60;
const M_R = 32;
const M_T = 24;
const M_B = 56;
const PLOT_W = VB_W - M_L - M_R;
const PLOT_H = VB_H - M_T - M_B;

/** Minutes run fast-to-slow right-to-left, so the best runs sit top right. */
function plotX(value: number, axis: AxisSpec): number {
  return M_L + (1 - value / axis.max) * PLOT_W;
}

function plotY(value: number): number {
  return M_T + (1 - value / INDEX_AXIS_MAX) * PLOT_H;
}

const barEase = [0.2, 0.8, 0.2, 1] as const;
const chartMove = { duration: 0.7, ease: barEase } as const;
const fadeUpInitial = { opacity: 0, y: 12 } as const;
const fadeUpVisible = { opacity: 1, y: 0 } as const;
const viewportOnceNear = { once: true, margin: "-10%" } as const;
const fadeUpTransition = { duration: 0.6 } as const;

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

function buildMinutesAxis(points: readonly FixproofRow[]): AxisSpec {
  const dataMax = Math.max(
    0,
    ...points.map((point) => point.minutes).filter((value): value is number => value !== null),
  );
  const step = niceStep(dataMax);
  const max = Math.max(Math.ceil((dataMax * 1.15) / step) * step, step);
  const decimals = step < 1 ? Math.max(0, -Math.floor(Math.log10(step))) : 0;
  const ticks: number[] = [];
  for (let tick = max; tick >= -1e-9; tick -= step) {
    ticks.push(Number(tick.toFixed(decimals)));
  }
  return { max, ticks, label: m.fixproofChartAxisMinutes() };
}

function computeLabelPlacements(
  points: readonly FixproofRow[],
  axis: AxisSpec,
  metric: ChartMetric,
): Record<string, LabelPlacement> {
  const mapped = points.map((point) => ({
    point,
    x: plotX(point.minutes ?? 0, axis),
    y: plotY(point[metric]),
    width: (pointLabel(point).length + 1) * LABEL_CHAR_W,
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

function metricName(metric: ChartMetric): string {
  return metric === "resolvedIndex" ? m.fixproofColResolvedIndex() : m.fixproofColProgressIndex();
}

function AxisLayer({ axis, note }: { axis: AxisSpec; note: string }) {
  return (
    <g>
      {axis.ticks.map((tick) => {
        const tx = plotX(tick, axis);
        return (
          <g key={`x-${tick}`}>
            <line
              x1={tx}
              y1={M_T}
              x2={tx}
              y2={M_T + PLOT_H}
              stroke="var(--fx-track)"
              strokeWidth={1}
            />
            <text
              x={tx}
              y={M_T + PLOT_H + 24}
              textAnchor="middle"
              fontSize={12.5}
              fill="var(--fx-tick)"
              className="font-mono"
            >
              {tick}
            </text>
          </g>
        );
      })}
      {INDEX_TICKS.map((tick) => {
        const y = plotY(tick);
        return (
          <g key={`y-${tick}`}>
            <line
              x1={M_L}
              y1={y}
              x2={M_L + PLOT_W}
              y2={y}
              stroke="var(--fx-track)"
              strokeWidth={1}
            />
            <text
              x={M_L - 12}
              y={y + 4.5}
              textAnchor="end"
              fontSize={12.5}
              fill="var(--fx-tick)"
              className="font-mono"
            >
              {tick}
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
        fill="var(--fx-tick)"
      >
        {note}
      </text>
      <text
        x={M_L + PLOT_W / 2}
        y={VB_H - 10}
        textAnchor="middle"
        fontSize={13}
        fontWeight={500}
        fill="var(--fx-label)"
      >
        {axis.label}
      </text>
    </g>
  );
}

function HoverGuides({ active, hex, x, y }: { active: boolean; hex: string; x: number; y: number }) {
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

function ChartMarker({ hex, active }: { hex: string; active: boolean }) {
  return (
    <>
      <circle r={22} fill="transparent" stroke="transparent" />
      {active ? <circle r={11} fill="none" stroke={hex} strokeWidth={1.5} opacity={0.4} /> : null}
      <circle
        r={active ? 7.5 : 6}
        fill={hex}
        stroke="var(--fx-surface)"
        strokeWidth={active ? 3 : 2.5}
      />
    </>
  );
}

function ModelDot({
  point,
  metric,
  x,
  y,
  placement,
  index,
  inView,
  reduceMotion,
  active,
  onActiveChange,
}: {
  point: FixproofRow;
  metric: ChartMetric;
  x: number;
  y: number;
  placement: LabelPlacement | undefined;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
  active: boolean;
  onActiveChange: (key: string | null) => void;
}) {
  const label = pointLabel(point);
  const minutes = formatMinutes(point.minutes);
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
      aria-label={m.fixproofChartPointAria({
        model: label,
        metric: metricName(metric),
        value: point[metric],
        minutes,
      })}
    >
      <HoverGuides active={active} hex={point.color} x={x} y={y} />
      <ChartMarker hex={point.color} active={active} />
      {placement && !placement.hidden ? (
        <text
          x={placement.dx ?? 13}
          y={placement.dy ?? 4.5}
          textAnchor={placement.anchor ?? "start"}
          fontSize={13}
          fontWeight={active ? 700 : 600}
          fill={point.color}
          stroke="var(--fx-surface)"
          strokeWidth={3.5}
          paintOrder="stroke"
        >
          {label}
        </text>
      ) : active ? (
        <text
          x={nearRightEdge ? -13 : 13}
          y={-14}
          textAnchor={nearRightEdge ? "end" : "start"}
          fontSize={13}
          fontWeight={700}
          fill={point.color}
          stroke="var(--fx-surface)"
          strokeWidth={3.5}
          paintOrder="stroke"
        >
          {label}
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
          stroke="var(--fx-surface)"
          strokeWidth={3.5}
          paintOrder="stroke"
          className="font-mono"
        >
          {point[metric]}
        </text>
        <text
          x={0}
          y={M_T + PLOT_H - y + 24}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={point.color}
          stroke="var(--fx-surface)"
          strokeWidth={3.5}
          paintOrder="stroke"
          className="font-mono"
        >
          {minutes}
        </text>
      </g>
    </motion.g>
  );
}

function VendorLegendItem({ vendor }: { vendor: FixproofRow }) {
  const swatchStyle = useMemo<CSSProperties>(
    () => ({ backgroundColor: vendor.color }),
    [vendor.color],
  );

  return (
    <li className="flex items-center gap-2">
      <span aria-hidden className="size-2.5 shrink-0 rounded-[2px]" style={swatchStyle} />
      {vendor.vendorLabel}
    </li>
  );
}

function VendorLegend({ rows }: { rows: readonly FixproofRow[] }) {
  const vendors = useMemo(() => legendVendors(rows), [rows]);

  return (
    <ul
      aria-label={m.fixproofChartLegendAria()}
      className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-3 text-[12px] text-[var(--fx-label)]"
    >
      {vendors.map((vendor) => (
        <VendorLegendItem key={vendor.vendor} vendor={vendor} />
      ))}
    </ul>
  );
}

export function FixproofChart({ board }: { board: FixproofBoard }) {
  const [metric, setMetric] = useState<ChartMetric>("resolvedIndex");
  const handleMetricChange = useCallback((value: unknown) => {
    if (value === "resolvedIndex" || value === "progressIndex") setMetric(value);
  }, []);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  const rows = useMemo(() => buildRows(board), [board]);
  const points = useMemo(() => rows.filter((row) => row.minutes !== null), [rows]);
  const axis = useMemo(() => buildMinutesAxis(points), [points]);
  const placements = useMemo(
    () => computeLabelPlacements(points, axis, metric),
    [points, axis, metric],
  );

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className={cn("w-full", FIXPROOF_THEME_VARS)}
    >
      <Tabs value={metric} onValueChange={handleMetricChange} className="min-w-0 gap-3">
        <TabsList aria-label={m.fixproofChartMetricAria()} className="self-end">
          <TabsTrigger value="resolvedIndex">{metricName("resolvedIndex")}</TabsTrigger>
          <TabsTrigger value="progressIndex">{metricName("progressIndex")}</TabsTrigger>
        </TabsList>
        <TabsContent value={metric} className="min-w-0">
          <div ref={ref} className={cn(FIXPROOF_CARD, "px-4 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-7")}>
            <section
              aria-label={m.fixproofChartRegionAria()}
              className="overflow-x-auto"
              tabIndex={0}
            >
              <div className="w-full min-w-[980px]">
                <p className="px-3 text-sm font-semibold">{metricName(metric)}</p>
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="mt-3 h-auto max-h-[420px] w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <AxisLayer key={axis.max} axis={axis} note={m.fixproofChartNote()} />
                  {points.map((point, index) => (
                    <ModelDot
                      key={point.key}
                      point={point}
                      metric={metric}
                      x={plotX(point.minutes ?? 0, axis)}
                      y={plotY(point[metric])}
                      placement={placements[point.key]}
                      index={index}
                      inView={inView}
                      reduceMotion={reduceMotion === true}
                      active={hovered === point.key}
                      onActiveChange={setHovered}
                    />
                  ))}
                </svg>
              </div>
            </section>
            <VendorLegend rows={points} />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
