import { createFileRoute } from "@tanstack/react-router";

import type { FixproofBoard } from "@/components/benchmark/fixproof-data";

import { FixproofBoardTable } from "@/components/benchmark/fixproof-board";
import { FixproofChart } from "@/components/benchmark/fixproof-chart";
import { FIXPROOF_BOARD } from "@/components/benchmark/fixproof-data";
import { gradedTaskCount } from "@/components/benchmark/fixproof-theme";
import Footer from "@/components/home/footer";
import { buildPageHead } from "@/lib/seo/seo";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/benchmark")({
  head: () =>
    buildPageHead({
      title: m.fixproofSeoTitle(),
      description: m.benchmarkDescription(),
      path: "/benchmark",
    }),
  component: BenchmarkPage,
});

const SECTION_SHELL = "mx-auto min-w-0 max-w-[1220px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const SECTION_HEADING = "font-mono text-xl font-bold tracking-[-0.02em] sm:text-2xl";

const MICRO_LABEL =
  "font-medium uppercase tracking-[0.14em] text-[10px] text-[#71706a] dark:text-[#8f8d84]";

/** Nine cells, one resolved. The mark is the task set in miniature. */
function FixproofMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" opacity="0.2">
        <rect x="3" y="3" width="12" height="12" rx="2" />
        <rect x="18" y="3" width="12" height="12" rx="2" />
        <rect x="33" y="3" width="12" height="12" rx="2" />
        <rect x="3" y="18" width="12" height="12" rx="2" />
        <rect x="33" y="18" width="12" height="12" rx="2" />
        <rect x="3" y="33" width="12" height="12" rx="2" />
        <rect x="18" y="33" width="12" height="12" rx="2" />
        <rect x="33" y="33" width="12" height="12" rx="2" />
      </g>
      <rect x="18" y="18" width="12" height="12" rx="2" fill="#C6E853" />
    </svg>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={MICRO_LABEL}>{label}</span>
      <span className="font-mono text-[13px] tabular-nums">{value}</span>
    </div>
  );
}

function Masthead({ board }: { board: FixproofBoard }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <FixproofMark className="size-8 shrink-0 text-foreground sm:size-10" />
        <h1 className="font-mono text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          {m.benchmarkTitle()}
        </h1>
      </div>
      <p className="mt-5 text-pretty text-lg leading-snug sm:text-xl">{m.fixproofClaim()}</p>
      <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
        {m.fixproofProvenanceSummary()}
      </p>
      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        <StatusItem label={m.fixproofStatusRunLabel()} value={String(board.dryRun)} />
        <StatusItem label={m.fixproofStatusDateLabel()} value={board.generatedAt} />
        <StatusItem
          label={m.fixproofStatusGradedLabel()}
          value={m.fixproofGradedOfTotal({
            graded: gradedTaskCount(board),
            total: board.tasks.length,
          })}
        />
        <StatusItem
          label={m.fixproofStatusTrialsLabel()}
          value={String(board.protocol.trialsPerTask)}
        />
      </div>
    </div>
  );
}

function BenchmarkPage() {
  const board = FIXPROOF_BOARD;

  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border">
        <section className="border-b border-border">
          <div className={SECTION_SHELL}>
            <Masthead board={board} />
          </div>
        </section>

        <section aria-labelledby="fixproof-board" className="border-b border-border">
          <div className={SECTION_SHELL}>
            <h2 id="fixproof-board" className={SECTION_HEADING}>
              {m.fixproofBoardHeading()}
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
              {m.fixproofBoardCaption()}
            </p>
            <div className="mt-6">
              <FixproofBoardTable board={board} />
            </div>
          </div>
        </section>

        <section aria-labelledby="fixproof-chart" className="border-b border-border">
          <div className={SECTION_SHELL}>
            <h2 id="fixproof-chart" className={SECTION_HEADING}>
              {m.fixproofChartHeading()}
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
              {m.fixproofChartCaption()}
            </p>
            <div className="mt-6">
              <FixproofChart board={board} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
