/**
 * Shared visual language for the Fixproof board and its scatter chart: one hue
 * per model vendor so a lab reads the same in both, plus the card surfaces and
 * the derived rows both views plot.
 */

import type { FixproofBoard, FixproofModel } from "@/components/benchmark/fixproof-data";
import type { ProviderLogoId } from "@/components/home/provider-marks";

import { cn } from "@/lib/platform/utils";

/** Vendors that carry their own hue. Anything else lands on the neutral slot. */
export type FixproofVendor =
  | "anthropic"
  | "openai"
  | "google"
  | "zai"
  | "moonshot"
  | "deepseek"
  | "qwen"
  | "xai"
  | "meta"
  | "mistral"
  | "other";

// Light values are the darkened twins of the dark ones, so both themes are
// stepped against their own card surface rather than flipped.
const VENDOR_VARS = cn(
  "[--v-anthropic:#c2410c] [--v-openai:#15803d] [--v-google:#1a73e8] [--v-zai:#0d9488] [--v-moonshot:#dc2626]",
  "[--v-deepseek:#6d28d9] [--v-qwen:#0891b2] [--v-xai:#4f46e5] [--v-meta:#4338ca] [--v-mistral:#b45309] [--v-other:#57564f]",
  "dark:[--v-anthropic:#fb923c] dark:[--v-openai:#4ade80] dark:[--v-google:#60a5fa] dark:[--v-zai:#5eead4] dark:[--v-moonshot:#f87171]",
  "dark:[--v-deepseek:#a78bfa] dark:[--v-qwen:#38bdf8] dark:[--v-xai:#a5b4fc] dark:[--v-meta:#818cf8] dark:[--v-mistral:#fbbf24] dark:[--v-other:#a8a69c]",
);

export const FIXPROOF_THEME_VARS = cn(
  VENDOR_VARS,
  "[--fx-track:#ececec] [--fx-rule:#e7e5dd] [--fx-tick:#9c9a93] [--fx-label:#71706a]",
  "[--fx-surface:#faf9f5] [--fx-edge:#d9d8d2] [--fx-ink:#1b1a17]",
  "dark:[--fx-track:rgba(237,235,228,0.08)] dark:[--fx-rule:rgba(237,235,228,0.09)] dark:[--fx-tick:#6c6a61]",
  "dark:[--fx-label:#8f8d84] dark:[--fx-surface:#161614] dark:[--fx-edge:rgba(237,235,228,0.14)] dark:[--fx-ink:#dad8d0]",
);

/** The card both views sit in: light paper, dark ink, scoped colour scheme. */
export const FIXPROOF_CARD = cn(
  "rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] [color-scheme:light]",
  "dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]",
);

const VENDOR_BY_PROVIDER: Record<string, FixproofVendor> = {
  anthropic: "anthropic",
  openai: "openai",
  google: "google",
  zai: "zai",
  "z.ai": "zai",
  moonshot: "moonshot",
  deepseek: "deepseek",
  qwen: "qwen",
  alibaba: "qwen",
  xai: "xai",
  meta: "meta",
  mistral: "mistral",
};

const VENDOR_LOGO: Partial<Record<FixproofVendor, ProviderLogoId>> = {
  anthropic: "anthropic",
  openai: "openai",
  google: "google",
  zai: "zai",
};

/** One plotted entity: a model at one effort, with everything both views need. */
export interface FixproofRow {
  key: string;
  label: string;
  effort: string;
  harness: string;
  vendor: FixproofVendor;
  vendorLabel: string;
  color: string;
  logo?: ProviderLogoId;
  resolvedIndex: number;
  progressIndex: number;
  resolved: number;
  graded: number;
  regressions: number;
  testEditsReverted: number;
  claimedNotDone: number;
  /** Median wall-clock minutes, null when nothing was timed. */
  minutes: number | null;
  runDate: string;
  trials: number;
}

function toRow(model: FixproofModel): FixproofRow {
  const vendor = VENDOR_BY_PROVIDER[model.provider.trim().toLowerCase()] ?? "other";
  return {
    key: model.id,
    label: model.label,
    effort: model.effort,
    harness: model.harness,
    vendor,
    vendorLabel: model.provider,
    color: `var(--v-${vendor})`,
    logo: VENDOR_LOGO[vendor],
    resolvedIndex: model.resolvedIndex,
    progressIndex: model.progressIndex,
    resolved: model.resolved,
    graded: model.graded,
    regressions: model.regressions,
    testEditsReverted: model.testEditsReverted,
    claimedNotDone: model.claimedNotDone,
    minutes: model.medianAgentSeconds > 0 ? model.medianAgentSeconds / 60 : null,
    runDate: model.runDate,
    trials: model.trials,
  };
}

export function buildRows(board: FixproofBoard): FixproofRow[] {
  return board.models.map(toRow);
}

/** Vendors present on the board, in first-seen order, for the chart legend. */
export function legendVendors(rows: readonly FixproofRow[]): FixproofRow[] {
  const seen = new Set<FixproofVendor>();
  const unique: FixproofRow[] = [];
  for (const row of rows) {
    if (seen.has(row.vendor)) continue;
    seen.add(row.vendor);
    unique.push(row);
  }
  return unique;
}

/** Model name and effort, the label a point carries in the scatter. */
export function pointLabel(row: FixproofRow): string {
  return row.effort ? `${row.label} ${row.effort}` : row.label;
}

export function formatMinutes(minutes: number | null): string {
  return minutes === null ? "–" : minutes.toFixed(1);
}

/** How many of the board's tasks have a countable result on at least one model. */
export function gradedTaskCount(board: FixproofBoard): number {
  return board.tasks.filter((task) =>
    board.models.some((model) =>
      model.runs.some(
        (run) =>
          run.task === task.id && run.outcome !== "pending" && run.outcome !== "provider-infra",
      ),
    ),
  ).length;
}
