import NumberFlow from "@number-flow/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Data source: testing/llm-benchmarks/benchmark-reports/20260610-230521
 * 36 runs = 3 models x 3 creation paths x 4 project specs (Codex CLI agent,
 * empty workspace). Post-validation = dependency install + full build/compile
 * of the generated project.
 */

type MethodId = "mcp" | "cli" | "prompt";

interface MethodStat {
  id: MethodId;
  label: string;
  detail: string;
  avg: number;
  median: number;
  fastest: number;
  outTokens: number;
  accent: string;
}

const METHOD_STATS: readonly MethodStat[] = [
  {
    id: "mcp",
    label: "Better-Fullstack MCP",
    detail: "agent drives bfs_* tools, the generator writes the code",
    avg: 66.9,
    median: 53.2,
    fastest: 17.8,
    outTokens: 4936,
    accent: "#C6E853",
  },
  {
    id: "cli",
    label: "CLI reference",
    detail: "agent reads the docs, composes one create command",
    avg: 98.6,
    median: 75.2,
    fastest: 10.8,
    outTokens: 7175,
    accent: "#e5e5e5",
  },
  {
    id: "prompt",
    label: "Prompt only",
    detail: "agent hand-writes every file from scratch",
    avg: 170.7,
    median: 159.3,
    fastest: 22.9,
    outTokens: 20132,
    accent: "#737373",
  },
] as const;

const SPEC_COLUMNS = ["Light TS", "Heavy TS", "Python AI", "Multi-eco"] as const;

interface MatrixCellData {
  t: number;
  ok: boolean;
}

interface MatrixRowData {
  model: string;
  cells: readonly MatrixCellData[];
}

// Cell order matches SPEC_COLUMNS. `ok` = post-validation build passed.
const RUN_MATRIX: Record<MethodId, readonly MatrixRowData[]> = {
  mcp: [
    {
      model: "gpt-5.3-codex-spark",
      cells: [
        { t: 17.8, ok: true },
        { t: 26.1, ok: false },
        { t: 19.1, ok: true },
        { t: 66.4, ok: true },
      ],
    },
    {
      model: "gpt-5.4",
      cells: [
        { t: 44.2, ok: true },
        { t: 51.3, ok: false },
        { t: 55.0, ok: true },
        { t: 217.3, ok: true },
      ],
    },
    {
      model: "gpt-5.5-medium",
      cells: [
        { t: 58.2, ok: true },
        { t: 108.4, ok: false },
        { t: 42.6, ok: true },
        { t: 96.7, ok: false },
      ],
    },
  ],
  cli: [
    {
      model: "gpt-5.3-codex-spark",
      cells: [
        { t: 10.8, ok: true },
        { t: 51.9, ok: false },
        { t: 52.6, ok: true },
        { t: 147.1, ok: true },
      ],
    },
    {
      model: "gpt-5.4",
      cells: [
        { t: 30.1, ok: true },
        { t: 321.7, ok: false },
        { t: 128.5, ok: true },
        { t: 143.8, ok: true },
      ],
    },
    {
      model: "gpt-5.5-medium",
      cells: [
        { t: 26.1, ok: true },
        { t: 119.7, ok: false },
        { t: 66.1, ok: true },
        { t: 84.3, ok: true },
      ],
    },
  ],
  prompt: [
    {
      model: "gpt-5.3-codex-spark",
      cells: [
        { t: 50.9, ok: false },
        { t: 67.8, ok: false },
        { t: 22.9, ok: true },
        { t: 37.6, ok: true },
      ],
    },
    {
      model: "gpt-5.4",
      cells: [
        { t: 251.0, ok: true },
        { t: 235.9, ok: false },
        { t: 155.4, ok: true },
        { t: 170.1, ok: true },
      ],
    },
    {
      model: "gpt-5.5-medium",
      cells: [
        { t: 163.2, ok: true },
        { t: 541.5, ok: true },
        { t: 110.4, ok: true },
        { t: 241.9, ok: true },
      ],
    },
  ],
};

const MODEL_STATS = [
  { label: "gpt-5.3-codex-spark", avg: 47.6 },
  { label: "gpt-5.5-medium", avg: 138.3 },
  { label: "gpt-5.4", avg: 150.3 },
] as const;

const FINDINGS = [
  {
    title: "Structure beats improvisation",
    detail:
      "MCP runs averaged 4.9k output tokens; prompt-only burned 20.1k hand-writing files — and still took 2.6× longer.",
  },
  {
    title: "Prompt-only drifts",
    detail:
      "One prompt-only run vendored 100k+ files into the workspace; another skipped the root manifest entirely.",
  },
  {
    title: "Heavy TS broke on every path",
    detail:
      "8 of 9 heavy-spec builds failed post-validation on the same Storybook type dependency — a generator bug, not a path difference.",
  },
] as const;

const BAND_STATS = [
  { value: 36, suffix: "/36", label: "scaffolds completed", fraction: false },
  { value: 17.8, suffix: "s", label: "fastest mcp scaffold", fraction: true },
  { value: 4.1, suffix: "×", label: "fewer output tokens via mcp", fraction: true },
  { value: 9, suffix: "/9", label: "python ai builds green", fraction: false },
] as const;

const MCP_COMMAND = "claude mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp";

const MAX_AVG = Math.max(...METHOD_STATS.map((m) => m.avg));
const MAX_RUN = Math.max(
  ...Object.values(RUN_MATRIX).flatMap((rows) => rows.flatMap((row) => row.cells.map((c) => c.t))),
);
const MAX_MODEL_AVG = Math.max(...MODEL_STATS.map((m) => m.avg));

const numberFlowTiming = { duration: 900, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" } as const;
const oneDecimalFormat = { minimumFractionDigits: 1, maximumFractionDigits: 1 } as const;

const fadeUpInitial = { opacity: 0, y: 12 } as const;
const fadeUpVisible = { opacity: 1, y: 0 } as const;
const viewportOnce = { once: true } as const;
const viewportOnceNear = { once: true, margin: "-10%" } as const;
const fadeUpTransition = { duration: 0.6 } as const;
const barEase = [0.2, 0.8, 0.2, 1] as const;

const headingStyle: CSSProperties = {
  fontSize: "clamp(2.25rem, 7vw, 4.75rem)",
  lineHeight: 0.96,
};
const heroNumberStyle: CSSProperties = { fontSize: "clamp(4.5rem, 13vw, 9.5rem)" };
const heroTimesStyle: CSSProperties = { fontSize: "clamp(2.25rem, 6vw, 4.5rem)" };

export default function LLMBenchmarkSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-[#0a0a0a] text-[#fafafa] [color-scheme:dark]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(198,232,83,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(198,232,83,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C6E853] to-transparent"
      />

      <div className="relative px-4 py-20 sm:px-8 sm:py-28">
        <Header />
        <RacePanel />
        <StatBand />

        <div className="mt-4 grid grid-cols-12 gap-4">
          <RunMatrixPanel />
          <aside className="col-span-12 grid gap-4 lg:col-span-5">
            <ModelPanel />
            <FindingsPanel />
          </aside>
        </div>

        <CtaBar />
      </div>
    </section>
  );
}

function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
      <div className="col-span-12 lg:col-span-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C6E853]">
            ✦ agent benchmark
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a7a7a]">
            codex cli · 3 models · jun 2026
          </p>
        </div>
        <h2
          className="mt-4 max-w-[16ch] text-balance font-mono font-bold tracking-[-0.045em]"
          style={headingStyle}
        >
          Same agent. Same spec.{" "}
          <span className="italic text-[#C6E853]">Three ways to build.</span>
        </h2>
        <p className="mt-6 max-w-lg text-pretty text-sm leading-6 text-[#a3a3a3] sm:text-base">
          36 scaffold runs: three frontier models building four project specs through prompt-only
          generation, our CLI reference, and the Better-Fullstack MCP. Every project then had to
          survive a real dependency install and build.
        </p>
      </div>

      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpVisible}
        viewport={viewportOnce}
        transition={fadeUpTransition}
        className="col-span-12 lg:col-span-5 lg:text-right"
      >
        <div className="flex items-baseline justify-start gap-1 lg:justify-end">
          <span
            className="font-mono font-black leading-none tracking-[-0.05em]"
            style={heroNumberStyle}
          >
            <NumberFlow
              value={inView ? 2.6 : 0}
              format={oneDecimalFormat}
              transformTiming={numberFlowTiming}
            />
          </span>
          <span className="font-mono font-black leading-none text-[#C6E853]" style={heroTimesStyle}>
            ×
          </span>
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#a3a3a3]">
          faster through mcp than prompt-only
        </p>
      </motion.div>
    </div>
  );
}

function RacePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="mt-14 border border-[#1f1f1f] bg-[#0d0d0d]">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#1f1f1f] px-5 py-3 sm:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C6E853]">
          ✦ average scaffold time by creation path
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a7a7a]">
          12 runs per path · lower is better
        </span>
      </div>

      {METHOD_STATS.map((method, index) => (
        <RaceTrack
          key={method.id}
          method={method}
          rank={index + 1}
          inView={inView}
          reduceMotion={reduceMotion === true}
        />
      ))}
    </div>
  );
}

function RaceTrack({
  method,
  rank,
  inView,
  reduceMotion,
}: {
  method: MethodStat;
  rank: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const widthPercent = (method.avg / MAX_AVG) * 100;
  const accentStyle = useMemo<CSSProperties>(() => ({ color: method.accent }), [method.accent]);
  const barColorStyle = useMemo<CSSProperties>(
    () => ({ backgroundColor: method.accent }),
    [method.accent],
  );
  const barInitial = useMemo(() => (reduceMotion ? false : { width: "0%" }), [reduceMotion]);
  const barAnimate = useMemo(
    () => ({ width: inView ? `${widthPercent}%` : "0%" }),
    [inView, widthPercent],
  );
  const barTransition = useMemo(
    () => ({ duration: 1.1, delay: rank * 0.12, ease: barEase }),
    [rank],
  );

  return (
    <div className="border-b border-[#1f1f1f] px-5 py-6 last:border-b-0 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] tabular-nums text-[#7a7a7a]">0{rank}</span>
          <span className="font-mono text-sm font-semibold sm:text-base">{method.label}</span>
          {method.id === "mcp" ? (
            <span className="border border-[#C6E853]/40 bg-[#C6E853]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#C6E853]">
              fastest path
            </span>
          ) : null}
        </div>
        <span className="font-mono text-3xl font-black tabular-nums sm:text-4xl" style={accentStyle}>
          <NumberFlow
            value={inView ? method.avg : 0}
            format={oneDecimalFormat}
            transformTiming={numberFlowTiming}
          />
          <span className="text-lg sm:text-xl">s</span>
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden bg-[#1a1a1a]">
        <motion.div
          className="h-full"
          style={barColorStyle}
          initial={barInitial}
          animate={barAnimate}
          transition={barTransition}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-xs leading-5 text-[#7a7a7a]">{method.detail}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
          median {method.median.toFixed(1)}s · best {method.fastest.toFixed(1)}s ·{" "}
          {(method.outTokens / 1000).toFixed(1)}k output tokens
        </p>
      </div>
    </div>
  );
}

function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div
      ref={ref}
      className="mt-4 grid grid-cols-2 border border-[#1f1f1f] bg-[#0d0d0d] lg:grid-cols-4"
    >
      {BAND_STATS.map((stat, index) => (
        <StatCell key={stat.label} stat={stat} index={index} inView={inView} />
      ))}
    </div>
  );
}

function StatCell({
  stat,
  index,
  inView,
}: {
  stat: (typeof BAND_STATS)[number];
  index: number;
  inView: boolean;
}) {
  const transition = useMemo(() => ({ duration: 0.5, delay: index * 0.08 }), [index]);

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={transition}
      className={cn(
        "border-[#1f1f1f] p-5 sm:p-6",
        index % 2 === 0 && "border-r",
        index < 2 && "border-b lg:border-b-0",
        index < 3 && "lg:border-r",
      )}
    >
      <div className="font-mono text-3xl font-black tabular-nums sm:text-4xl">
        <NumberFlow
          value={inView ? stat.value : 0}
          format={stat.fraction ? oneDecimalFormat : undefined}
          transformTiming={numberFlowTiming}
        />
        <span className="text-[#C6E853]">{stat.suffix}</span>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a7a7a]">
        {stat.label}
      </p>
    </motion.div>
  );
}

function RunMatrixPanel() {
  const [method, setMethod] = useState<MethodId>("mcp");
  const rows = RUN_MATRIX[method];

  return (
    <div className="col-span-12 border border-[#1f1f1f] bg-[#0d0d0d] lg:col-span-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f1f1f] px-5 py-3 sm:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C6E853]">
          ✦ every run, by path
        </span>
        <div className="flex" role="tablist" aria-label="Creation path">
          {METHOD_STATS.map((m) => (
            <TabButton key={m.id} id={m.id} active={method === m.id} onSelect={setMethod} />
          ))}
        </div>
      </div>

      {/* Labeled, focusable section: WAI scrollable-region pattern */}
      <section
        aria-label="Scaffold time for every run in seconds"
        className="overflow-x-auto"
        tabIndex={0}
      >
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7a7a7a]">
            <tr>
              <th className="border-b border-[#1f1f1f] px-5 py-3 font-medium sm:px-8">Model</th>
              {SPEC_COLUMNS.map((column) => (
                <th key={column} className="border-b border-[#1f1f1f] px-3 py-3 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody key={method}>
            {rows.map((row, rowIndex) => (
              <MatrixRow key={row.model} row={row} rowIndex={rowIndex} />
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[#1f1f1f] px-5 py-3 sm:px-8">
        <LegendDot color="#C6E853" label="build verified" />
        <LegendDot color="#f87171" label="post-build failed" />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7a7a7a]">
          verify = install deps + full build of the generated app
        </span>
      </div>
    </div>
  );
}

function TabButton({
  id,
  active,
  onSelect,
}: {
  id: MethodId;
  active: boolean;
  onSelect: (id: MethodId) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={cn(
        "cursor-pointer border border-l-0 border-[#1f1f1f] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors first:border-l",
        active ? "bg-[#C6E853] text-[#0a0a0a]" : "bg-transparent text-[#a3a3a3] hover:text-[#fafafa]",
      )}
    >
      {id}
    </button>
  );
}

function MatrixRow({ row, rowIndex }: { row: MatrixRowData; rowIndex: number }) {
  const transition = useMemo(() => ({ duration: 0.35, delay: rowIndex * 0.07 }), [rowIndex]);

  return (
    <motion.tr
      initial={fadeUpInitial}
      animate={fadeUpVisible}
      transition={transition}
      className="border-b border-[#161616] last:border-b-0"
    >
      <td className="px-5 py-4 font-mono text-xs font-semibold sm:px-8">{row.model}</td>
      {row.cells.map((cell, cellIndex) => (
        <MatrixCell key={SPEC_COLUMNS[cellIndex]} cell={cell} />
      ))}
    </motion.tr>
  );
}

function MatrixCell({ cell }: { cell: MatrixCellData }) {
  const barStyle = useMemo<CSSProperties>(
    () => ({
      width: `${Math.max(5, (cell.t / MAX_RUN) * 100)}%`,
      backgroundColor: cell.ok ? "#C6E853" : "#f87171",
    }),
    [cell.ok, cell.t],
  );

  return (
    <td
      aria-label={`${cell.t.toFixed(1)} seconds, build ${cell.ok ? "verified" : "failed"}`}
      className="px-3 py-4"
    >
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-sm font-semibold tabular-nums">{cell.t.toFixed(1)}</span>
        <span className="font-mono text-[10px] text-[#7a7a7a]">s</span>
      </div>
      <div className="mt-2 h-1 w-full max-w-[6.5rem] bg-[#1a1a1a]">
        <div className="h-full" style={barStyle} />
      </div>
    </td>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  const dotStyle = useMemo<CSSProperties>(() => ({ backgroundColor: color }), [color]);

  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a3a3a3]">
      <span className="size-2 rounded-full" style={dotStyle} />
      {label}
    </span>
  );
}

function ModelPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="border border-[#1f1f1f] bg-[#0d0d0d] p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C6E853]">
        ✦ model average, all paths
      </p>
      <div className="mt-5 space-y-4">
        {MODEL_STATS.map((model, index) => (
          <ModelBar
            key={model.label}
            model={model}
            index={index}
            inView={inView}
            reduceMotion={reduceMotion === true}
          />
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-[#7a7a7a]">
        gpt-5.3-codex-spark was 3× faster than the bigger models on identical specs — small models
        do fine when the generator carries the structure.
      </p>
    </div>
  );
}

function ModelBar({
  model,
  index,
  inView,
  reduceMotion,
}: {
  model: (typeof MODEL_STATS)[number];
  index: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const barInitial = useMemo(() => (reduceMotion ? false : { width: "0%" }), [reduceMotion]);
  const barAnimate = useMemo(
    () => ({ width: inView ? `${(model.avg / MAX_MODEL_AVG) * 100}%` : "0%" }),
    [inView, model.avg],
  );
  const barTransition = useMemo(
    () => ({ duration: 0.9, delay: index * 0.1, ease: barEase }),
    [index],
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-xs font-semibold">{model.label}</span>
        <span className="font-mono text-xs tabular-nums text-[#C6E853]">
          {model.avg.toFixed(1)}s
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden bg-[#1a1a1a]">
        <motion.div
          className="h-full bg-[#e5e5e5]"
          initial={barInitial}
          animate={barAnimate}
          transition={barTransition}
        />
      </div>
    </div>
  );
}

function FindingsPanel() {
  return (
    <div className="border border-[#1f1f1f] bg-[#0d0d0d] p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C6E853]">
        ✦ what the runs showed
      </p>
      <ol className="mt-5 space-y-4">
        {FINDINGS.map((finding, index) => (
          <FindingItem key={finding.title} finding={finding} index={index} />
        ))}
      </ol>
    </div>
  );
}

function FindingItem({
  finding,
  index,
}: {
  finding: (typeof FINDINGS)[number];
  index: number;
}) {
  const transition = useMemo(() => ({ duration: 0.4, delay: index * 0.08 }), [index]);

  return (
    <motion.li
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={transition}
      className="flex gap-3"
    >
      <span className="font-mono text-[10px] tabular-nums leading-6 text-[#7a7a7a]">
        0{index + 1}
      </span>
      <div>
        <h3 className="text-sm font-semibold">{finding.title}</h3>
        <p className="mt-1 text-xs leading-5 text-[#a3a3a3]">{finding.detail}</p>
      </div>
    </motion.li>
  );
}

function CtaBar() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(MCP_COMMAND).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  }, []);

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={fadeUpTransition}
      className="mt-4 grid grid-cols-12 border border-[#1f1f1f] bg-[#0d0d0d]"
    >
      <div className="col-span-12 p-5 sm:p-6 lg:col-span-8 lg:border-r lg:border-[#1f1f1f]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C6E853]">
          ✦ give your agent the fast path
        </p>
        <div className="mt-3 flex items-center justify-between gap-3 border border-[#1f1f1f] bg-[#111111] px-4 py-3">
          <code className="truncate font-mono text-xs sm:text-sm">
            <span className="text-[#C6E853]">$</span> {MCP_COMMAND}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy MCP install command"
            className={cn(
              "flex size-8 shrink-0 cursor-pointer items-center justify-center transition-colors active:translate-y-[1px]",
              copied ? "text-[#C6E853]" : "text-[#a3a3a3] hover:text-[#fafafa]",
            )}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
      </div>
      <div className="col-span-12 flex items-center border-t border-[#1f1f1f] p-5 sm:p-6 lg:col-span-4 lg:border-t-0">
        <a
          href="/docs/ai/mcp"
          className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#fafafa] transition-colors hover:text-[#C6E853]"
        >
          MCP setup for Claude, Cursor, Codex &amp; more
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
