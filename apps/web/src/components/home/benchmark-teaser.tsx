import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import { ProviderLogo, type ProviderLogoId } from "./provider-marks";
import type { ScaffbenchModel } from "./scaffbench-2-data";
import { SCAFFBENCH21_CELLS, SCAFFBENCH21_MODELS } from "./scaffbench-2-1-data";

// The teaser previews the leaderboard's headline view: the Prompt-only path,
// Core pass@1. This mirrors ScaffbenchLeaderboardCard's default (v2.1 · prompt ·
// core) so the podium here matches the top of the full page. Kept as a small,
// self-contained reduction so the homepage doesn't pull in the full chart module.
const TEASER_PATH = "prompt";

type PodiumModel = {
  key: string;
  label: string;
  effort: string;
  pass: number;
  costNum: number;
  tier: "paid" | "free";
  logo?: ProviderLogoId;
  color: string;
};

const PROVIDER_LOGO: Partial<Record<ScaffbenchModel["provider"], ProviderLogoId>> = {
  claude: "anthropic",
  codex: "openai",
  agy: "google",
};

// Same per-provider hues as the leaderboard bars (theme-aware via BAR_VARS).
const PROVIDER_COLOR: Record<ScaffbenchModel["provider"], string> = {
  claude: "var(--bar-claude)",
  codex: "var(--bar-codex)",
  opencode: "var(--bar-opencode)",
  kilo: "var(--bar-kilo)",
  agy: "var(--bar-agy)",
};

const BAR_VARS = cn(
  "[--bar-claude:#c2410c] [--bar-codex:#15803d] [--bar-opencode:#6d28d9] [--bar-kilo:#0891b2] [--bar-agy:#1a73e8] [--bar-track:#ececec]",
  "dark:[--bar-claude:#fb923c] dark:[--bar-codex:#4ade80] dark:[--bar-opencode:#a78bfa] dark:[--bar-kilo:#22d3ee] dark:[--bar-agy:#8ab4f8] dark:[--bar-track:#edebe414]",
);

function isFreeProvider(provider: ScaffbenchModel["provider"]): boolean {
  return provider === "opencode" || provider === "kilo";
}

// Top three models by Core pass@1 on the prompt path. Ranking rule matches the
// leaderboard: paid tier first, then best pass, cheaper as the tiebreak.
function computePodium(): PodiumModel[] {
  const rows = SCAFFBENCH21_MODELS.flatMap((model) => {
    const cells = SCAFFBENCH21_CELLS.filter(
      (cell) => cell.modelKey === model.key && cell.path === TEASER_PATH,
    );
    if (cells.length === 0) return [];
    const scored = cells.filter((cell) => cell.scored);
    if (scored.length === 0) return [];
    const passing = scored.filter((cell) => cell.corePass).length;
    const costs = scored.map((cell) => cell.costUsd).filter((v): v is number => v !== null);
    return {
      key: model.key,
      label: model.label,
      effort: model.effort,
      pass: Math.round((100 * passing) / scored.length),
      costNum: costs.length > 0 ? costs.reduce((s, c) => s + c, 0) / costs.length : Infinity,
      tier: isFreeProvider(model.provider) ? ("free" as const) : ("paid" as const),
      logo: PROVIDER_LOGO[model.provider],
      color: PROVIDER_COLOR[model.provider],
    };
  });
  const rank = { paid: 0, free: 1 } as const;
  rows.sort(
    (a, b) => rank[a.tier] - rank[b.tier] || b.pass - a.pass || a.costNum - b.costNum,
  );
  return rows.slice(0, 3);
}

const PODIUM = computePodium();

const cardReveal = { opacity: 0, y: 16 } as const;
const cardShown = { opacity: 1, y: 0 } as const;
const cardViewport = { once: true, margin: "-80px" } as const;
const cardTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as const;

export default function BenchmarkTeaser() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="grid items-center gap-12 px-4 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            ScaffBench
          </p>
          <h2
            className="mt-4 text-balance font-mono text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
          >
            {m.benchmarkTeaserTitle()}
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
            {m.llmBenchmarkDescription()}
          </p>
          <Link
            to="/benchmark"
            className="group mt-8 inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:gap-2.5"
          >
            {m.benchmarkTeaserCta()}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <motion.div
          initial={cardReveal}
          whileInView={cardShown}
          viewport={cardViewport}
          transition={cardTransition}
          className={cn(
            "rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] p-5 text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark] sm:p-6",
            BAR_VARS,
          )}
        >
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold">{m.benchmarkTeaserTopModels()}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#71706a] dark:text-[#8f8d84]">
              Core pass@1 · Prompt
            </p>
          </div>
          <ol className="space-y-3">
            {PODIUM.map((model, index) => (
              <PodiumRow key={model.key} model={model} rank={index + 1} />
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

const RANK_LABEL = ["1st", "2nd", "3rd"];
const TRACK_STYLE: CSSProperties = { backgroundColor: "var(--bar-track)" };

function PodiumRow({ model, rank }: { model: PodiumModel; rank: number }) {
  const fillStyle: CSSProperties = { width: `${model.pass}%`, backgroundColor: model.color };

  return (
    <li className="grid grid-cols-[1.5rem_minmax(7rem,10rem)_minmax(0,1fr)_2.75rem] items-center gap-3">
      <span
        className="font-mono text-xs font-semibold text-[#9c9a93] dark:text-[#6c6a61]"
        aria-label={RANK_LABEL[rank - 1] ?? `${rank}`}
      >
        {rank}
      </span>
      <span className="flex min-w-0 items-center gap-1.5">
        <ProviderLogo logo={model.logo} />
        <span className="truncate font-mono text-sm font-bold">{model.label}</span>
        {model.effort ? (
          <span className="shrink-0 font-mono text-[11px] text-[#9c9a93] dark:text-[#6c6a61]">
            [{model.effort}]
          </span>
        ) : null}
      </span>
      <span className="h-2 w-full overflow-hidden rounded-full" style={TRACK_STYLE}>
        <span className="block h-full rounded-full" style={fillStyle} />
      </span>
      <span className="text-right font-mono text-sm font-semibold tabular-nums">{model.pass}%</span>
    </li>
  );
}
