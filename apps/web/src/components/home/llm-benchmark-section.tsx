import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Fragment,
  useCallback,
  useMemo,
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

interface AgentTab {
  id: string;
  label: string;
  iconSlug?: string;
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

  const monoColor = !active && resolvedTheme === "dark" ? "e5e5e5" : "171717";
  const src = tab.mono
    ? `https://cdn.simpleicons.org/${tab.iconSlug}/${monoColor}`
    : `https://cdn.simpleicons.org/${tab.iconSlug}`;

  return <img src={src} alt="" width={16} height={16} className="size-3.5 sm:size-4" />;
}

function getAgentHint(agent: AgentTab): string {
  return agent.id === "cursor" ? m.llmPasteCursor() : m.llmRunInTerminal();
}
