import type { CSSProperties, ReactNode } from "react";

import {
  TbBan as Ban,
  TbCheck as Check,
  TbClock as Clock,
  TbPointFilled as Dot,
  TbX as X,
} from "react-icons/tb";

import type { FixproofRun } from "@/components/benchmark/fixproof-data";

import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

/**
 * What a reader sees in a cell. Derived from the recorded outcome plus how much
 * progress the run made, so a failure that moved some requirements reads as
 * partial rather than as a flat miss.
 */
export type FixproofCellState =
  | "solved"
  | "partial"
  | "failed"
  | "timeout"
  | "excluded"
  | "pending";

export function cellState(run: FixproofRun): FixproofCellState {
  if (run.outcome === "solved") return "solved";
  if (run.outcome === "pending") return "pending";
  if (run.outcome === "provider-infra") return "excluded";
  if (run.outcome === "deadline-exhausted") return "timeout";
  return run.progress !== null && run.progress > 0 ? "partial" : "failed";
}

/**
 * Status hues, stepped per theme against the card surfaces (#faf9f5 light,
 * #161614 dark). Colour never carries a cell alone: every state also has its own
 * glyph, and partial cells print the percentage.
 */
export const FIXPROOF_THEME_VARS = cn(
  "[--fx-solved:#008300] [--fx-partial:#c98500] [--fx-failed:#e34948]",
  "[--fx-muted:#9c9a93] [--fx-rule:#e7e5dd] [--fx-track:#ececec]",
  "dark:[--fx-solved:#008300] dark:[--fx-partial:#b08c00] dark:[--fx-failed:#de5a6e]",
  "dark:[--fx-muted:#6c6a61] dark:[--fx-rule:rgba(237,235,228,0.09)] dark:[--fx-track:rgba(237,235,228,0.08)]",
);

function tint(variable: string, fill: number, edge: number): CSSProperties {
  return {
    backgroundColor: `color-mix(in srgb, ${variable} ${fill}%, transparent)`,
    borderColor: `color-mix(in srgb, ${variable} ${edge}%, transparent)`,
    color: variable,
  };
}

const SOLVED_STYLE = tint("var(--fx-solved)", 16, 55);
const PARTIAL_STYLE = tint("var(--fx-partial)", 16, 55);
const FAILED_STYLE = tint("var(--fx-failed)", 14, 50);
const TIMEOUT_STYLE: CSSProperties = { ...tint("var(--fx-failed)", 8, 45), borderStyle: "dashed" };
const EXCLUDED_STYLE: CSSProperties = {
  ...tint("var(--fx-muted)", 10, 40),
  backgroundImage:
    "repeating-linear-gradient(135deg, color-mix(in srgb, var(--fx-muted) 26%, transparent) 0 1px, transparent 1px 5px)",
};
const PENDING_STYLE: CSSProperties = {
  backgroundColor: "transparent",
  borderColor: "color-mix(in srgb, var(--fx-muted) 35%, transparent)",
  borderStyle: "dashed",
  color: "var(--fx-muted)",
};

export const CELL_STYLE: Record<FixproofCellState, CSSProperties> = {
  solved: SOLVED_STYLE,
  partial: PARTIAL_STYLE,
  failed: FAILED_STYLE,
  timeout: TIMEOUT_STYLE,
  excluded: EXCLUDED_STYLE,
  pending: PENDING_STYLE,
};

export function stateLabel(state: FixproofCellState): string {
  switch (state) {
    case "solved":
      return m.fixproofOutcomeSolved();
    case "partial":
      return m.fixproofOutcomePartial();
    case "failed":
      return m.fixproofOutcomeFailed();
    case "timeout":
      return m.fixproofOutcomeTimeout();
    case "excluded":
      return m.fixproofOutcomeExcluded();
    case "pending":
      return m.fixproofOutcomePending();
  }
}

export function stateNote(state: FixproofCellState): string {
  switch (state) {
    case "solved":
      return m.fixproofOutcomeSolvedNote();
    case "partial":
      return m.fixproofOutcomePartialNote();
    case "failed":
      return m.fixproofOutcomeFailedNote();
    case "timeout":
      return m.fixproofOutcomeTimeoutNote();
    case "excluded":
      return m.fixproofOutcomeExcludedNote();
    case "pending":
      return m.fixproofOutcomePendingNote();
  }
}

/**
 * The glyph that carries the state without colour. Partial prints its own
 * percentage instead, so it has no icon.
 */
export function StateGlyph({ state, className }: { state: FixproofCellState; className?: string }) {
  const size = cn("size-4", className);
  switch (state) {
    case "solved":
      return <Check aria-hidden className={cn(size, "stroke-[2.5]")} />;
    case "failed":
      return <X aria-hidden className={cn(size, "stroke-[2.5]")} />;
    case "timeout":
      return <Clock aria-hidden className={size} />;
    case "excluded":
      return <Ban aria-hidden className={size} />;
    case "pending":
      return <Dot aria-hidden className={cn(size, "opacity-70")} />;
    case "partial":
      return null;
  }
}

/**
 * Cell body: the percentage for partial runs, the state glyph otherwise. A
 * partial mark with no value is the legend sample, so it shows a bare percent
 * sign rather than an invented number.
 */
export function CellMark({
  state,
  progress,
}: {
  state: FixproofCellState;
  progress: number | null;
}) {
  if (state === "partial") {
    return (
      <span className="font-mono text-[11px] font-semibold tabular-nums text-foreground">
        {progress === null ? "%" : `${Math.round(progress * 100)}%`}
      </span>
    );
  }
  return <StateGlyph state={state} />;
}

export function formatPercent(value: number | null): string {
  return value === null ? "–" : `${Math.round(value * 100)}%`;
}

export function formatMinutes(seconds: number | null): string {
  return seconds === null ? "–" : (seconds / 60).toFixed(1);
}
