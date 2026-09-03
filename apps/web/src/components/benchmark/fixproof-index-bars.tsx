import { useMemo, type CSSProperties } from "react";

import type { FixproofBoard, FixproofModel } from "@/components/benchmark/fixproof-data";

import { FIXPROOF_THEME_VARS } from "@/components/benchmark/fixproof-outcome";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const AXIS_TICKS: readonly number[] = [0, 25, 50, 75, 100];

const BAR_GRID = "grid grid-cols-[minmax(7rem,9rem)_minmax(0,1fr)_3rem] items-center gap-x-3";

const TRACK_STYLE: CSSProperties = { backgroundColor: "var(--fx-track)" };

function IndexBar({ label, value, color }: { label: string; value: number; color: string }) {
  const fillStyle = useMemo<CSSProperties>(
    () => ({ width: `${Math.max(value, 1)}%`, backgroundColor: color }),
    [value, color],
  );

  return (
    <div className={cn(BAR_GRID, "py-2")}>
      <span className="truncate font-medium text-[13px]">{label}</span>
      <span className="h-2.5 w-full overflow-hidden rounded-full" style={TRACK_STYLE}>
        <span className="block h-full rounded-full" style={fillStyle} />
      </span>
      <span className="text-right font-mono text-[15px] font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function ModelIndexes({ model }: { model: FixproofModel }) {
  return (
    <div className="border-t border-[var(--fx-rule)] pt-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[15px] font-medium">{model.label}</span>
        <span className="font-mono text-[12px] text-[#9c9a93] dark:text-[#6c6a61]">
          [{model.effort}]
        </span>
        <span className="text-[12px] text-muted-foreground">{model.harness}</span>
      </div>

      <div className="mt-3">
        <IndexBar
          label={m.fixproofColResolvedIndex()}
          value={model.resolvedIndex}
          color="var(--fx-solved)"
        />
        <IndexBar
          label={m.fixproofColProgressIndex()}
          value={model.progressIndex}
          color="var(--fx-partial)"
        />
      </div>

      <div className={cn(BAR_GRID, "mt-1")}>
        <span aria-hidden />
        <span
          aria-hidden
          className="flex justify-between font-mono text-[10px] text-[#9c9a93] dark:text-[#6c6a61]"
        >
          {AXIS_TICKS.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </span>
        <span aria-hidden />
      </div>
    </div>
  );
}

export function FixproofIndexBars({ board }: { board: FixproofBoard }) {
  return (
    <div
      className={cn(
        FIXPROOF_THEME_VARS,
        "rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] p-4 text-[#1b1a17] sm:p-6 dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0]",
      )}
    >
      <div className="flex flex-col gap-5">
        {board.models.map((model) => (
          <ModelIndexes key={model.id} model={model} />
        ))}
      </div>
      <p className="mt-5 text-[12px] leading-relaxed text-muted-foreground">
        {m.fixproofIndexCaption()}
      </p>
    </div>
  );
}
