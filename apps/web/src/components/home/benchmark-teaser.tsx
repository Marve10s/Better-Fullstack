import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import { ProviderLogo, type ProviderLogoId } from "./provider-marks";
import type { ScaffbenchModel } from "./scaffbench-2-data";
import { SCAFFBENCH21_CELLS, SCAFFBENCH21_MODELS } from "./scaffbench-2-1-data";

// The teaser tells the MCP story: the same agent scaffolding through our MCP
// tools vs. hand-writing every file from the prompt. We surface the model that
// gains the most from the MCP path (its Prompt-only vs. MCP Core pass@1, plus the
// token/step reduction that makes it cheaper and faster). Numbers come straight
// from the committed v2.1 run data, so they can't drift from the full leaderboard.
const PROVIDER_LOGO: Partial<Record<ScaffbenchModel["provider"], ProviderLogoId>> = {
  claude: "anthropic",
  codex: "openai",
  agy: "google",
};

function isFreeProvider(provider: ScaffbenchModel["provider"]): boolean {
  return provider === "opencode" || provider === "kilo";
}

type PathStat = { pass: number; tokens: number; steps: number };

function mean(a: readonly number[]): number {
  return a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN;
}

function aggregate(modelKey: string, path: "prompt" | "mcp"): PathStat | null {
  const cells = SCAFFBENCH21_CELLS.filter(
    (cell) => cell.modelKey === modelKey && cell.path === path && cell.scored,
  );
  if (cells.length === 0) return null;
  const passing = cells.filter((cell) => cell.corePass).length;
  const tokens = cells.map((c) => c.outTokens).filter((v): v is number => v !== null);
  const steps = cells.map((c) => c.steps).filter((v): v is number => v !== null);
  return {
    pass: Math.round((100 * passing) / cells.length),
    tokens: mean(tokens),
    steps: mean(steps),
  };
}

type McpHighlight = {
  label: string;
  isFree: boolean;
  logo?: ProviderLogoId;
  prompt: PathStat;
  mcp: PathStat;
  tokenFactor: number;
  stepFactor: number;
};

// The model whose MCP path most outscores its prompt path — the sharpest proof
// that the tools, not the model, close the gap.
function computeMcpHighlight(): McpHighlight | null {
  let best: McpHighlight | null = null;
  for (const model of SCAFFBENCH21_MODELS) {
    const prompt = aggregate(model.key, "prompt");
    const mcp = aggregate(model.key, "mcp");
    if (!prompt || !mcp) continue;
    const uplift = mcp.pass - prompt.pass;
    if (best && uplift <= best.mcp.pass - best.prompt.pass) continue;
    best = {
      label: model.label,
      isFree: isFreeProvider(model.provider),
      logo: PROVIDER_LOGO[model.provider],
      prompt,
      mcp,
      tokenFactor:
        Number.isFinite(prompt.tokens) && mcp.tokens > 0
          ? Math.round(prompt.tokens / mcp.tokens)
          : 0,
      stepFactor:
        Number.isFinite(prompt.steps) && mcp.steps > 0 ? Math.round(prompt.steps / mcp.steps) : 0,
    };
  }
  return best;
}

const HIGHLIGHT = computeMcpHighlight();

const cardReveal = { opacity: 0, y: 16 } as const;
const cardShown = { opacity: 1, y: 0 } as const;
const cardViewport = { once: true, margin: "-80px" } as const;
const cardTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as const;

export default function BenchmarkTeaser() {
  return (
    <section id="benchmark" className="border-t border-border bg-muted/20">
      <div className="grid items-center gap-12 px-4 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            ScaffBench
          </p>
          <h2 className="mt-4 text-balance font-mono text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            {m.benchmarkTeaserTitle()}
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
            {m.benchmarkTeaserMcpBody()}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/benchmark"
              className="group inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:gap-2.5"
            >
              {m.benchmarkTeaserCta()}
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

        {HIGHLIGHT ? <McpUpliftCard highlight={HIGHLIGHT} /> : null}
      </div>
    </section>
  );
}

function McpUpliftCard({ highlight }: { highlight: McpHighlight }) {
  return (
    <motion.div
      initial={cardReveal}
      whileInView={cardShown}
      viewport={cardViewport}
      transition={cardTransition}
      className="rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] p-5 text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark] sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5">
          <ProviderLogo logo={highlight.logo} />
          <span className="truncate font-mono text-sm font-bold">{highlight.label}</span>
        </span>
        {highlight.isFree ? (
          <span className="shrink-0 rounded-full border border-[#e1e0d8] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#71706a] dark:border-[rgba(237,235,228,0.14)] dark:text-[#8f8d84]">
            free model
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <UpliftBar label="Prompt only" pass={highlight.prompt.pass} accent="muted" />
        <UpliftBar label="With MCP" pass={highlight.mcp.pass} accent="lime" />
      </div>
      <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[#71706a] dark:text-[#8f8d84]">
        Core pass@1
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#e1e0d8] pt-5 dark:border-[rgba(237,235,228,0.10)]">
        <StatTile factor={highlight.tokenFactor} unit="fewer tokens" />
        <StatTile factor={highlight.stepFactor} unit="fewer steps" />
      </div>
    </motion.div>
  );
}

const BAR_TRACK: CSSProperties = { backgroundColor: "var(--bar-track)" };
const CARD_VARS = "[--bar-track:#ececec] dark:[--bar-track:#edebe414]";

function UpliftBar({
  label,
  pass,
  accent,
}: {
  label: string;
  pass: number;
  accent: "muted" | "lime";
}) {
  const fillStyle: CSSProperties = {
    width: `${pass}%`,
    backgroundColor: accent === "lime" ? "#C6E853" : "var(--bar-muted)",
  };
  return (
    <div
      className={cn(
        "grid grid-cols-[6rem_minmax(0,1fr)_2.75rem] items-center gap-3",
        CARD_VARS,
        "[--bar-muted:#c9c7be] dark:[--bar-muted:#4a4842]",
      )}
    >
      <span
        className={cn(
          "font-mono text-xs",
          accent === "lime"
            ? "font-bold text-[#1b1a17] dark:text-[#dad8d0]"
            : "text-[#71706a] dark:text-[#8f8d84]",
        )}
      >
        {label}
      </span>
      <span className="h-2.5 w-full overflow-hidden rounded-full" style={BAR_TRACK}>
        <span className="block h-full rounded-full transition-[width] duration-700 ease-out" style={fillStyle} />
      </span>
      <span className="text-right font-mono text-sm font-bold tabular-nums">{pass}%</span>
    </div>
  );
}

function StatTile({ factor, unit }: { factor: number; unit: string }) {
  return (
    <div className="rounded-lg bg-[#f1efe7] px-3 py-2.5 dark:bg-[rgba(237,235,228,0.05)]">
      <p className="font-mono text-xl font-bold tabular-nums">
        {factor > 1 ? `${factor}×` : "—"}
      </p>
      <p className="mt-0.5 text-xs text-[#71706a] dark:text-[#8f8d84]">{unit}</p>
    </div>
  );
}
