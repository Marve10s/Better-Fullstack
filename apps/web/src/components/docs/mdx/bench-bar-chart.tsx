import type { CSSProperties } from "react";

/**
 * Horizontal bar chart for benchmark posts (ScaffBench et al.). Rendered inside
 * MDX prose, so it opts out with `not-prose` and carries its own card chrome +
 * warm-stone / lime theming to match the homepage leaderboard. SSR-safe (pure
 * markup, no browser APIs). One highlighted bar per chart reads as "the result".
 */
export type BenchBar = {
  /** row label, e.g. "Opus 4.8 · low" */
  label: string;
  /** numeric value driving the bar width (same unit across the chart) */
  value: number;
  /** override the right-hand readout (e.g. "3 / 11 · 27%"); defaults to value+unit */
  display?: string;
  /** lime highlight for the row you want to draw the eye to */
  highlight?: boolean;
};

export function BenchBarChart({
  title,
  caption,
  unit = "",
  max,
  bars,
}: {
  title?: string;
  caption?: string;
  unit?: string;
  /** axis max; defaults to the largest value (min 1) */
  max?: number;
  bars: BenchBar[];
}) {
  const axisMax = Math.max(max ?? 0, ...bars.map((b) => b.value), 1);

  return (
    <figure className="not-prose my-7 overflow-hidden rounded-xl border border-[#e1e0d8] bg-[#faf9f5] px-4 py-4 text-[#1b1a17] sm:px-6 dark:border-[rgba(237,235,228,0.12)] dark:bg-[#161614] dark:text-[#dad8d0]">
      {title ? (
        <figcaption className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#71706a] dark:text-[#8f8d84]">
          {title}
        </figcaption>
      ) : null}
      <div className="flex flex-col gap-2.5">
        {bars.map((bar) => {
          const width = `${Math.max(2, (bar.value / axisMax) * 100)}%`;
          const fillStyle: CSSProperties = { width };
          return (
            <div
              key={bar.label}
              className="grid grid-cols-[minmax(7rem,11rem)_minmax(0,1fr)_auto] items-center gap-3"
            >
              <span className="truncate font-mono text-xs font-medium sm:text-sm">{bar.label}</span>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#ececec] dark:bg-[rgba(237,235,228,0.10)]">
                <div
                  className={
                    bar.highlight
                      ? "h-full rounded-full bg-[#C6E853]"
                      : "h-full rounded-full bg-[#a8a59b] dark:bg-[#6c6a61]"
                  }
                  style={fillStyle}
                />
              </div>
              <span className="text-right font-mono text-xs font-semibold tabular-nums sm:text-sm">
                {bar.display ?? `${bar.value}${unit}`}
              </span>
            </div>
          );
        })}
      </div>
      {caption ? (
        <p className="mt-3 font-mono text-[11px] text-[#9c9a93] dark:text-[#6c6a61]">{caption}</p>
      ) : null}
    </figure>
  );
}
