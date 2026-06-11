import { Activity, Bot, CheckCircle2, Clock3, Route, Terminal, TriangleAlert, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

const revealInitial = { opacity: 0, y: 16 } as const;
const revealInView = { opacity: 1, y: 0 } as const;
const revealViewport = { once: true, margin: "-15%" } as const;
const revealTransition = { duration: 0.45 } as const;

const methodStats = [
  {
    id: "mcp",
    label: "Better-Fullstack MCP",
    average: 66.9,
    median: 53.2,
    min: 17.8,
    max: 217.3,
    ok: 8,
    structuralOnly: 0,
    failed: 4,
    color: "#0ea5a4",
    note: "Fastest average path; reliable on light, Python, and most multi-ecosystem runs.",
  },
  {
    id: "cli",
    label: "CLI / Website Reference",
    average: 98.6,
    median: 75.2,
    min: 10.8,
    max: 321.7,
    ok: 9,
    structuralOnly: 0,
    failed: 3,
    color: "#d97706",
    note: "Fast when the graph-part command is obvious; slower when agents hit prompt friction.",
  },
  {
    id: "prompt",
    label: "Prompt Only",
    average: 170.7,
    median: 159.3,
    min: 22.9,
    max: 541.5,
    ok: 6,
    structuralOnly: 3,
    failed: 3,
    color: "#e11d48",
    note: "Most variable path; can repair deeply, but often spends minutes hand-authoring.",
  },
] as const;

const modelStats = [
  {
    id: "spark",
    label: "gpt-5.3-codex-spark",
    average: 47.6,
    median: 44.2,
    min: 10.8,
    max: 147.1,
    ok: 7,
    structuralOnly: 1,
    failed: 4,
    color: "#84cc16",
  },
  {
    id: "5.5",
    label: "gpt-5.5 medium",
    average: 138.3,
    median: 102.6,
    min: 26.1,
    max: 541.5,
    ok: 8,
    structuralOnly: 1,
    failed: 3,
    color: "#2563eb",
  },
  {
    id: "5.4",
    label: "gpt-5.4 medium",
    average: 150.3,
    median: 149.6,
    min: 30.1,
    max: 321.7,
    ok: 8,
    structuralOnly: 1,
    failed: 3,
    color: "#7c3aed",
  },
] as const;

const specStats = [
  {
    id: "light",
    label: "Light TypeScript",
    average: 72.5,
    ok: 8,
    structuralOnly: 0,
    failed: 1,
    color: "#22c55e",
  },
  {
    id: "python",
    label: "Python AI",
    average: 72.5,
    ok: 9,
    structuralOnly: 0,
    failed: 0,
    color: "#3b82f6",
  },
  {
    id: "multi",
    label: "Multi-ecosystem",
    average: 133.9,
    ok: 5,
    structuralOnly: 3,
    failed: 1,
    color: "#f59e0b",
  },
  {
    id: "heavy",
    label: "Heavy TypeScript",
    average: 169.4,
    ok: 1,
    structuralOnly: 0,
    failed: 8,
    color: "#ef4444",
  },
] as const;

const runMatrix = [
  {
    model: "gpt-5.3-codex-spark",
    prompt: [50.9, 67.8, 22.9, 37.6],
    mcp: [17.8, 26.1, 19.1, 66.4],
    cli: [10.8, 51.9, 52.6, 147.1],
  },
  {
    model: "gpt-5.4",
    prompt: [251.0, 235.9, 155.4, 170.1],
    mcp: [44.2, 51.3, 55.0, 217.3],
    cli: [30.1, 321.7, 128.5, 143.8],
  },
  {
    model: "gpt-5.5 medium",
    prompt: [163.2, 541.5, 110.4, 241.9],
    mcp: [58.2, 108.4, 42.6, 96.7],
    cli: [26.1, 119.7, 66.1, 84.3],
  },
] as const;

const matrixColumns = ["Light TS", "Heavy TS", "Python AI", "Multi"] as const;
const methodOrder = ["prompt", "mcp", "cli"] as const;

const fastestRuns = [
  "Spark + CLI + Light TS: 10.8s",
  "Spark + MCP + Light TS: 17.8s",
  "Spark + MCP + Python AI: 19.1s",
] as const;

const failureNotes = [
  {
    title: "Heavy TypeScript exposed generator edges",
    detail: "8 of 9 heavy runs failed deeper post-validation, mostly at web build time.",
  },
  {
    title: "Storybook type dependency was the common build break",
    detail: "Several generated web apps could not resolve @storybook/react-vite during build.",
  },
  {
    title: "Prompt-only can be fast but thin",
    detail: "Some prompt-only multi runs had no root manifest, so they were structural-only checks.",
  },
] as const;

const maxMethodAverage = Math.max(...methodStats.map((item) => item.average));
const maxModelAverage = Math.max(...modelStats.map((item) => item.average));
const maxSpecAverage = Math.max(...specStats.map((item) => item.average));
const maxRun = Math.max(
  ...runMatrix.flatMap((row) => methodOrder.flatMap((method) => row[method])),
);

export default function LLMBenchmarkSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-[#10130f] text-[#edf5e7]">
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(198,232,83,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(198,232,83,0.22)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#c6e853] to-transparent" />

      <div className="relative px-4 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase text-[#c6e853]">agent benchmark lab</p>
            <h2 className="mt-4 max-w-[13ch] text-balance font-mono text-5xl font-black leading-[0.9] text-white sm:text-7xl">
              36 runs. Three creation paths.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-sm leading-6 text-[#b9c8b0] sm:text-base">
              We tested prompt-only generation, Better-Fullstack MCP scaffolding, and CLI/reference
              creation across light, heavy, Python AI, and multi-ecosystem projects.
            </p>

            <div className="mt-8 grid grid-cols-3 border border-[#2f3a2c] bg-black/20">
              <StatCell icon={Bot} label="models" value="3" />
              <StatCell icon={Route} label="templates" value="4" />
              <StatCell icon={CheckCircle2} label="scaffolded" value="36/36" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-3">
              {methodStats.map((method) => (
                <motion.div
                  key={method.id}
                  initial={revealInitial}
                  whileInView={revealInView}
                  viewport={revealViewport}
                  transition={revealTransition}
                  className="border border-[#2f3a2c] bg-[#161b14] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase text-[#8da184]">
                      {method.label}
                    </span>
                    <ColorDot color={method.color} />
                  </div>
                  <div className="mt-6 font-mono text-4xl font-black text-white">
                    {method.average.toFixed(1)}s
                  </div>
                  <div className="mt-2 h-1.5 bg-[#273123]">
                    <ScaledBar color={method.color} max={maxMethodAverage} value={method.average} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase text-[#b9c8b0]">
                    <span>ok {method.ok}</span>
                    <span>thin {method.structuralOnly}</span>
                    <span>fail {method.failed}</span>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-[#8da184]">{method.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-4">
          <div className="col-span-12 border border-[#2f3a2c] bg-[#edf5e7] text-[#121711] lg:col-span-7">
            <div className="flex items-center gap-2 border-b border-[#c8d8bd] px-4 py-3 font-mono text-[11px] uppercase">
              <Activity className="size-4" />
              scaffold time matrix, seconds
            </div>
            {/* Labeled, focusable section: WAI scrollable-region pattern */}
            <section
              aria-label="Scaffold time matrix in seconds"
              className="overflow-x-auto"
              tabIndex={0}
            >
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="font-mono text-[10px] uppercase text-[#5f6b58]">
                  <tr>
                    <th className="border-b border-[#c8d8bd] px-4 py-3">Model / Path</th>
                    {matrixColumns.map((column) => (
                      <th key={column} className="border-b border-[#c8d8bd] px-3 py-3">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {runMatrix.map((row) =>
                    methodOrder.map((method) => (
                      <tr key={`${row.model}-${method}`} className="border-b border-[#dbe6d4]">
                        <td className="px-4 py-3">
                          <div className="font-mono text-xs font-semibold text-[#121711]">
                            {row.model}
                          </div>
                          <div className="mt-1 font-mono text-[10px] uppercase text-[#697462]">
                            {method}
                          </div>
                        </td>
                        {row[method].map((value, index) => (
                          <td key={`${method}-${matrixColumns[index]}`} className="px-3 py-3">
                            <RunCell value={value} />
                          </td>
                        ))}
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </section>
          </div>

          <div className="col-span-12 grid gap-4 lg:col-span-5">
            <BenchmarkPanel
              icon={Zap}
              title="Fastest successful paths"
              items={fastestRuns}
              accent="#c6e853"
            />
            <div className="border border-[#2f3a2c] bg-[#161b14] p-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-[#c6e853]">
                <Terminal className="size-4" />
                model average
              </div>
              <div className="mt-5 space-y-4">
                {modelStats.map((model) => (
                  <BarMetric
                    key={model.id}
                    label={model.label}
                    value={model.average}
                    max={maxModelAverage}
                    color={model.color}
                    meta={`${model.ok} ok / ${model.failed} failed`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 border border-[#2f3a2c] bg-[#161b14] p-4 lg:col-span-5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-[#c6e853]">
              <Clock3 className="size-4" />
              project difficulty
            </div>
            <div className="mt-5 space-y-4">
              {specStats.map((spec) => (
                <BarMetric
                  key={spec.id}
                  label={spec.label}
                  value={spec.average}
                  max={maxSpecAverage}
                  color={spec.color}
                  meta={`${spec.ok} ok / ${spec.structuralOnly} thin / ${spec.failed} failed`}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 border border-[#2f3a2c] bg-[#161b14] p-4 lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-[#fca5a5]">
              <TriangleAlert className="size-4" />
              post-validation findings
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {failureNotes.map((note) => (
                <div key={note.title} className="border border-[#3f302a] bg-[#211815] p-4">
                  <h3 className="text-sm font-semibold text-white">{note.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-[#cbb9ac]">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-[#2f3a2c] pt-4">
              <p className="font-mono text-[11px] uppercase text-[#8da184]">
                Result tree kept at 47 MB after dependency/cache cleanup. Raw transcripts and
                validation logs remain available in the benchmark output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bot;
  label: string;
  value: string;
}) {
  return (
    <div className="border-r border-[#2f3a2c] p-4 last:border-r-0">
      <Icon className="size-4 text-[#c6e853]" />
      <div className="mt-4 font-mono text-3xl font-black text-white">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase text-[#8da184]">{label}</div>
    </div>
  );
}

function RunCell({ value }: { value: number }) {
  const color = value < 60 ? "#16a34a" : value < 140 ? "#d97706" : "#e11d48";

  return (
    <div className="min-w-[7rem]">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-sm font-semibold tabular-nums">{value.toFixed(1)}</span>
        <span className="font-mono text-[10px] uppercase text-[#697462]">sec</span>
      </div>
      <div className="mt-2 h-1.5 bg-[#d6e0cf]">
        <ScaledBar color={color} max={maxRun} minPercent={6} value={value} />
      </div>
    </div>
  );
}

function BarMetric({
  label,
  value,
  max,
  color,
  meta,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  meta: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="font-mono text-xs tabular-nums text-[#c6e853]">{value.toFixed(1)}s</span>
      </div>
      <div className="mt-2 h-2 bg-[#273123]">
        <ScaledBar color={color} max={max} value={value} />
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase text-[#8da184]">{meta}</div>
    </div>
  );
}

function BenchmarkPanel({
  icon: Icon,
  title,
  items,
  accent,
}: {
  icon: typeof Zap;
  title: string;
  items: readonly string[];
  accent: string;
}) {
  const accentStyle = useMemo<CSSProperties>(() => ({ color: accent }), [accent]);

  return (
    <div className="border border-[#2f3a2c] bg-[#161b14] p-4">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase" style={accentStyle}>
        <Icon className="size-4" />
        {title}
      </div>
      <ol className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center border border-[#3d4b37] font-mono text-xs text-white",
                index === 0 && "border-[#c6e853] text-[#c6e853]",
              )}
            >
              {index + 1}
            </span>
            <span className="text-sm text-[#dce7d5]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ColorDot({ color }: { color: string }) {
  const dotStyle = useMemo<CSSProperties>(() => ({ backgroundColor: color }), [color]);

  return <span className="size-2.5 rounded-full" style={dotStyle} />;
}

function ScaledBar({
  color,
  max,
  minPercent = 4,
  value,
}: {
  color: string;
  max: number;
  minPercent?: number;
  value: number;
}) {
  const barStyle = useMemo<CSSProperties>(
    () => ({
      backgroundColor: color,
      width: `${Math.max(minPercent, (value / max) * 100)}%`,
    }),
    [color, max, minPercent, value],
  );

  return <div className="h-full" style={barStyle} />;
}
