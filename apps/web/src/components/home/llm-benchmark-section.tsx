import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";

import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Data source: testing/llm-benchmarks/benchmark-reports/20260610-230521
 * 36 runs = 3 models x 3 creation paths x 4 project specs (Codex CLI agent,
 * empty workspace). Each point averages a model+path pair across the 4 specs.
 * "Builds passing" = post-validation (real install + build) pass rate.
 */

type PathId = "mcp" | "cli" | "prompt";

const PATH_ORDER: readonly PathId[] = ["mcp", "cli", "prompt"] as const;

const PATHS: Record<PathId, { short: string; label: string; detail: string }> = {
  mcp: {
    short: "mcp",
    label: "Better-Fullstack MCP",
    detail: "scaffolds through our MCP tools",
  },
  cli: {
    short: "cli",
    label: "Better-Fullstack CLI",
    detail: "agent composes the create command",
  },
  prompt: {
    short: "prompt",
    label: "Prompt only",
    detail: "agent hand-writes every file",
  },
};

interface ChartPalette {
  grid: string;
  axisTick: string;
  axisLabel: string;
  note: string;
  circleStroke: string;
  paths: Record<PathId, string>;
}

const CHART_PALETTE: ChartPalette = {
  grid: "var(--ch-grid)",
  axisTick: "var(--ch-tick)",
  axisLabel: "var(--ch-label)",
  note: "var(--ch-note)",
  circleStroke: "var(--ch-stroke)",
  paths: { mcp: "var(--ch-mcp)", cli: "var(--ch-cli)", prompt: "var(--ch-prompt)" },
};

const CHART_THEME_VARS = cn(
  "[--ch-grid:#ececec] [--ch-tick:#9c9a93] [--ch-label:#71706a] [--ch-note:#9c9a93] [--ch-stroke:#ffffff]",
  "[--ch-mcp:#7ca111] [--ch-cli:#55534b] [--ch-prompt:#e85d11]",
  "dark:[--ch-grid:#edebe414] dark:[--ch-tick:#6c6a61] dark:[--ch-label:#8f8d84] dark:[--ch-note:#8f8d84] dark:[--ch-stroke:#161614]",
  "dark:[--ch-mcp:#b8d75e] dark:[--ch-cli:#c9c7bf] dark:[--ch-prompt:#e0894f]",
);

type MetricKey = "time" | "tokens" | "pass" | "error";

interface ComboPoint {
  id: string;
  model: string;
  path: PathId;
  /** avg scaffold seconds */
  time: number;
  /** avg output tokens, thousands */
  tokens: number;
  /** builds passing, % of 4 specs */
  pass: number;
  /** builds failing, % of 4 specs */
  error: number;
}

const COMBOS: readonly ComboPoint[] = [
  { id: "spark-mcp", model: "spark", path: "mcp", time: 32.4, tokens: 5.8, pass: 75, error: 25 },
  { id: "spark-cli", model: "spark", path: "cli", time: 65.6, tokens: 9.9, pass: 75, error: 25 },
  {
    id: "spark-prompt",
    model: "spark",
    path: "prompt",
    time: 44.8,
    tokens: 31.4,
    pass: 50,
    error: 50,
  },
  { id: "5.4-mcp", model: "gpt-5.4", path: "mcp", time: 92.0, tokens: 5.2, pass: 75, error: 25 },
  { id: "5.4-cli", model: "gpt-5.4", path: "cli", time: 156.0, tokens: 7.1, pass: 75, error: 25 },
  {
    id: "5.4-prompt",
    model: "gpt-5.4",
    path: "prompt",
    time: 203.1,
    tokens: 13.3,
    pass: 75,
    error: 25,
  },
  { id: "5.5-mcp", model: "gpt-5.5", path: "mcp", time: 76.5, tokens: 3.8, pass: 50, error: 50 },
  { id: "5.5-cli", model: "gpt-5.5", path: "cli", time: 74.1, tokens: 4.5, pass: 75, error: 25 },
  {
    id: "5.5-prompt",
    model: "gpt-5.5",
    path: "prompt",
    time: 264.2,
    tokens: 15.7,
    pass: 100,
    error: 0,
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

const TIME_AXIS: AxisSpec = {
  key: "time",
  max: 300,
  ticks: [240, 160, 80, 0],
  unit: "s",
  label: "Avg scaffold time",
};

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
      max: 35,
      ticks: [30, 20, 10, 0],
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
    x: { key: "error", max: 60, ticks: [50, 25, 0], unit: "%", label: "Failed builds" },
    y: TIME_AXIS,
    yInverted: true,
  },
] as const;

interface LabelPlacement {
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
}

// Manual nudges where dot labels would collide.
const LABEL_OVERRIDES: Record<TabId, Record<string, LabelPlacement>> = {
  speed: {
    "5.5-cli": { anchor: "middle", dx: 0, dy: -14 },
    "5.4-mcp": { anchor: "end", dx: -10 },
  },
  tokens: {
    "spark-mcp": { anchor: "middle", dx: 0, dy: -14 },
    "5.4-mcp": { anchor: "middle", dx: 0, dy: 22 },
    "5.4-cli": { anchor: "end", dx: -10 },
  },
  error: {
    "spark-cli": { anchor: "end", dx: -10 },
    "5.5-prompt": { anchor: "end", dx: -10 },
  },
};

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
  fontSize: "clamp(1.85rem, 5vw, 3.4rem)",
  lineHeight: 0.98,
};

export default function LLMBenchmarkSection() {
  return (
    <section id="benchmark" className="relative scroll-mt-16 border-t border-border bg-muted/20">
      <div className="px-4 py-20 sm:px-8 sm:py-24">
        <Header />
        <BenchmarkChartCard />
        <AgentInstallPanel />
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
      <div className="col-span-12 lg:col-span-7">
        <h2
          className="max-w-[20ch] text-balance font-mono font-bold tracking-[-0.04em]"
          style={headingStyle}
        >
          Why use Better-Fullstack with AI?
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Point your agent at our MCP server and it scaffolds production-ready apps that are{" "}
          <span className="font-semibold text-foreground">faster</span> to generate,{" "}
          <span className="font-semibold text-foreground">cheaper</span> in tokens, and more{" "}
          <span className="font-semibold text-foreground">reliable</span> than hand-writing every
          file.
        </p>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <h3 className="text-base font-semibold sm:text-lg">How we measured</h3>
        <p className="mt-2 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
          36 runs across three frontier models, four project specs, and three creation paths — every
          generated project had to survive a real install and build.
        </p>
      </div>
    </div>
  );
}

function BenchmarkChartCard() {
  const [tabId, setTabId] = useState<TabId>("speed");
  const tab = CHART_TABS.find((t) => t.id === tabId) ?? CHART_TABS[0];
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
        "mt-12 overflow-hidden rounded-2xl border border-[#e6e5e0] bg-white text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]",
        CHART_THEME_VARS,
      )}
    >
      <div className="border-b border-[#e6e5e0] px-3 py-4 dark:border-[rgba(237,235,228,0.10)] sm:px-6">
        <div className="mx-auto w-full max-w-[1180px] px-3">
          <div
            className="inline-flex overflow-hidden rounded-md border border-[#d9d8d2] dark:border-[rgba(237,235,228,0.14)]"
            role="tablist"
            aria-label="Benchmark metric"
          >
            {CHART_TABS.map((t) => (
              <ChartTabButton key={t.id} tab={t} active={tabId === t.id} onSelect={setTabId} />
            ))}
          </div>
        </div>
      </div>

      <div ref={ref} className="px-3 pb-2 pt-5 sm:px-6">
        {/* Labeled, focusable section: WAI scrollable-region pattern */}
        <section
          aria-label="Benchmark scatter chart: each point is one model and creation path"
          className="overflow-x-auto"
          tabIndex={0}
        >
          <div className="mx-auto w-full min-w-[560px] max-w-[1180px]">
            <p className="px-3 text-sm font-semibold">{tab.y.label}</p>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="mt-2 h-auto w-full">
            <AxisLayer key={tab.id} tab={tab} palette={palette} />
            {COMBOS.map((combo, index) => (
              <ChartPoint
                key={combo.id}
                combo={combo}
                tab={tab}
                palette={palette}
                index={index}
                inView={inView}
                reduceMotion={reduceMotion === true}
              />
            ))}
            </svg>
          </div>
        </section>
      </div>

      <CardLegend palette={palette} />
    </motion.div>
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
  index,
  inView,
  reduceMotion,
}: {
  combo: ComboPoint;
  tab: TabSpec;
  palette: ChartPalette;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const x = plotX(comboValue(combo, tab.x.key), tab.x);
  const y = plotY(comboValue(combo, tab.y.key), tab.y, tab.yInverted);
  const placement = LABEL_OVERRIDES[tab.id][combo.id];
  const hex = palette.paths[combo.path];

  const animate = useMemo(() => ({ x, y, opacity: inView ? 1 : 0 }), [x, y, inView]);
  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { x: chartMove, y: chartMove, opacity: { duration: 0.45, delay: 0.1 + index * 0.06 } },
    [index, reduceMotion],
  );

  return (
    <motion.g initial={false} animate={animate} transition={transition}>
      <circle r={4.5} fill={hex} stroke={palette.circleStroke} strokeWidth={2} />
      <text
        x={placement?.dx ?? 10}
        y={placement?.dy ?? 4}
        textAnchor={placement?.anchor ?? "start"}
        fontSize={11}
        fontWeight={500}
        fill={hex}
      >
        {combo.model}
      </text>
    </motion.g>
  );
}

function CardLegend({ palette }: { palette: ChartPalette }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2.5 border-t border-[#e6e5e0] bg-[#fafaf8] px-5 py-4 dark:border-[rgba(237,235,228,0.10)] dark:bg-[#100f0e] sm:px-8">
      {PATH_ORDER.map((path) => (
        <span key={path} className="flex items-baseline gap-2 text-xs sm:text-sm">
          <span
            className="size-2.5 self-center rounded-[2px]"
            style={{ backgroundColor: palette.paths[path] }}
          />
          <span className="font-semibold">{PATHS[path].label}</span>
          <span className="text-[#71706a] dark:text-[#8a8a8a]">— {PATHS[path].detail}</span>
        </span>
      ))}
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
          Give your agent the fast path.
        </h3>
        <p className="mt-3 max-w-sm text-pretty text-sm text-muted-foreground">
          One MCP server, every spec-to-scaffold tool the benchmark used. Pick your agent, paste,
          done.
        </p>
        <a
          href="/docs/ai/mcp"
          className="group mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-lime-700 transition-colors hover:text-foreground dark:text-[#C6E853]"
        >
          all supported clients
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
                <span className="text-lime-700 dark:text-[#C6E853]">$ </span>
              ) : null}
              {agent.command}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label={`Copy ${agent.label} setup command`}
              className={cn(
                "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]",
                copied
                  ? "text-lime-700 dark:text-[#C6E853]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {agent.hint}
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
