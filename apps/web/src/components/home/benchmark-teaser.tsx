import { Link } from "@tanstack/react-router";
import { TbArrowRight as ArrowRight } from "react-icons/tb";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

import { ProviderLogo, type ProviderLogoId } from "@/components/home/provider-marks";
import { SCAFFBENCH3_CELLS, SCAFFBENCH3_MODELS } from "@/components/home/scaffbench-3-board-data";
import type { ScaffbenchVendor } from "@/components/home/scaffbench-types";

// The teaser shows the leading row of the live ScaffBench 3 board: how often the
// model's project merely compiles (Core) against how often it also clears lint,
// format and tests (Full). Numbers come straight from the committed run data, so
// they can't drift from the full leaderboard.
const VENDOR_LOGO: Partial<Record<ScaffbenchVendor, ProviderLogoId>> = {
  anthropic: "anthropic",
  openai: "openai",
  google: "google",
  zai: "zai",
};

function mean(values: readonly number[]): number {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : Number.NaN;
}

type BoardLeader = {
  label: string;
  logo?: ProviderLogoId;
  isFree: boolean;
  core: number;
  full: number;
  costUsd: number | null;
  minutes: number | null;
};

function computeLeader(): BoardLeader | null {
  let best: BoardLeader | null = null;
  for (const model of SCAFFBENCH3_MODELS) {
    const scored = SCAFFBENCH3_CELLS.filter((cell) => cell.modelKey === model.key && cell.scored);
    if (scored.length === 0) continue;
    const trials = scored.reduce((sum, cell) => sum + cell.scoredTrials, 0);
    const costs = scored.map((cell) => cell.costUsd).filter((v): v is number => v !== null);
    const durations = scored
      .map((cell) => cell.durationMs)
      .filter((v): v is number => v !== null && v > 0);
    const leader: BoardLeader = {
      label: model.label,
      logo: VENDOR_LOGO[model.vendor],
      isFree: costs.length > 0 && costs.every((cost) => cost === 0),
      core: Math.round((100 * scored.reduce((sum, c) => sum + c.passCount, 0)) / trials),
      full: Math.round((100 * scored.reduce((sum, c) => sum + c.qualityPassCount, 0)) / trials),
      costUsd: costs.length > 0 ? mean(costs) : null,
      minutes: durations.length > 0 ? mean(durations) / 60000 : null,
    };
    if (!best || leader.full > best.full || (leader.full === best.full && leader.core > best.core)) {
      best = leader;
    }
  }
  return best;
}

const LEADER = computeLeader();

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
            {m.llmBenchmarkDescription()}
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

        {LEADER ? <BoardLeaderCard leader={LEADER} /> : null}
      </div>
    </section>
  );
}

function BoardLeaderCard({ leader }: { leader: BoardLeader }) {
  return (
    <motion.div
      initial={cardReveal}
      whileInView={cardShown}
      viewport={cardViewport}
      transition={cardTransition}
      className="rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] p-5 text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark] sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <ProviderLogo logo={leader.logo} />
          <span className="font-mono text-sm font-bold">{leader.label}</span>
        </span>
        <span className="shrink-0 rounded-full border border-[#e1e0d8] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#71706a] dark:border-[rgba(237,235,228,0.14)] dark:text-[#8f8d84]">
          {leader.isFree ? "free model" : "leading model"}
        </span>
      </div>

      <div className="space-y-3">
        <PassBar label="Builds" pass={leader.core} accent="muted" />
        <PassBar label="Ships clean" pass={leader.full} accent="lime" />
      </div>
      <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[#71706a] dark:text-[#8f8d84]">
        Pass@1 over 13 specs
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#e1e0d8] pt-5 dark:border-[rgba(237,235,228,0.10)]">
        <StatTile
          value={leader.costUsd === null ? "-" : `$${leader.costUsd.toFixed(2)}`}
          unit="avg cost per project"
        />
        <StatTile
          value={leader.minutes === null ? "-" : `${Math.round(leader.minutes)}m`}
          unit="avg time per project"
        />
      </div>
    </motion.div>
  );
}

const BAR_TRACK: CSSProperties = { backgroundColor: "var(--bar-track)" };
const CARD_VARS = "[--bar-track:#ececec] dark:[--bar-track:#edebe414]";

function PassBar({
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
        <span
          className="block h-full rounded-full transition-[width] duration-700 ease-out"
          style={fillStyle}
        />
      </span>
      <span className="text-right font-mono text-sm font-bold tabular-nums">{pass}%</span>
    </div>
  );
}

function StatTile({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="rounded-lg bg-[#f1efe7] px-3 py-2.5 dark:bg-[rgba(237,235,228,0.05)]">
      <p className="font-mono text-xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-[#71706a] dark:text-[#8f8d84]">{unit}</p>
    </div>
  );
}
