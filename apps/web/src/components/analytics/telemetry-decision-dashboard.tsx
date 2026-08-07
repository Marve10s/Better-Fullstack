import type { RankedSignal, TelemetryDashboardData } from "@/lib/telemetry-dashboard";

import { cn } from "@/lib/utils";

const numberFormatter = new Intl.NumberFormat("en-US");
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
});

const PANEL = "border border-[#deddd5] bg-[#faf9f5] dark:border-white/10 dark:bg-[#11110f]";
const MUTED = "text-[#706e66] dark:text-[#929087]";
const GRID_LINE = "border-[#deddd5] dark:border-white/10";

function formatCount(value: number): string {
  return value >= 10_000 ? compactFormatter.format(value) : numberFormatter.format(value);
}

function formatRate(value: number | null): string {
  return value === null ? "—" : `${Math.round(value * 100)}%`;
}

function PanelHeading({ index, title, detail }: { index: string; title: string; detail: string }) {
  return (
    <div
      className={cn("flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-end", GRID_LINE)}
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#8da526] dark:text-[#c6e853]">
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.13em]">{title}</h2>
        <p className={cn("mt-1 text-xs leading-relaxed", MUTED)}>{detail}</p>
      </div>
    </div>
  );
}

function SignalCell({
  step,
  label,
  value,
  detail,
  accent = false,
}: {
  step: string;
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="relative min-h-40 px-5 py-5">
      <div className="flex items-center justify-between gap-3">
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em]", MUTED)}>
          {label}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-[#8da526] dark:text-[#c6e853]">
          {step}
        </span>
      </div>
      <div
        className={cn(
          "mt-6 font-mono text-4xl font-semibold tracking-[-0.06em] tabular-nums sm:text-5xl",
          accent && "text-[#789018] dark:text-[#c6e853]",
        )}
      >
        {value}
      </div>
      <p className={cn("mt-4 max-w-52 text-xs leading-relaxed", MUTED)}>{detail}</p>
    </div>
  );
}

function RankedList({
  items,
  empty = "No classified signals yet",
}: {
  items: RankedSignal[];
  empty?: string;
}) {
  if (items.length === 0) {
    return <p className={cn("px-5 py-8 font-mono text-xs", MUTED)}>{empty}</p>;
  }

  const max = items[0]?.value ?? 1;
  return (
    <ol className="divide-y divide-[#deddd5] dark:divide-white/10">
      {items.map((item, index) => (
        <li
          key={item.name}
          className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3"
        >
          <span className={cn("font-mono text-[10px] tabular-nums", MUTED)}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate font-mono text-xs font-medium" title={item.name}>
                {item.name}
              </span>
              <span className={cn("font-mono text-[10px] tabular-nums", MUTED)}>
                {Math.round(item.share * 100)}%
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden bg-black/[0.06] dark:bg-white/[0.07]">
              <div
                className="h-full bg-[#9ebd28] dark:bg-[#c6e853]"
                style={{ width: `${Math.max((item.value / max) * 100, 2)}%` }}
              />
            </div>
          </div>
          <span className="w-12 text-right font-mono text-xs font-semibold tabular-nums">
            {formatCount(item.value)}
          </span>
        </li>
      ))}
    </ol>
  );
}

function ActivityChart({ data }: { data: TelemetryDashboardData["activity"] }) {
  const max = Math.max(...data.map((day) => day.totalEvents), 1);

  return (
    <div className="overflow-x-auto px-5 py-6">
      <figure
        className="flex h-52 min-w-[680px] items-end gap-1.5"
        aria-label="Daily telemetry activity"
      >
        {data.map((day, index) => {
          const height = Math.max((day.totalEvents / max) * 100, day.totalEvents > 0 ? 3 : 0);
          const projectShare = day.totalEvents > 0 ? day.projects / day.totalEvents : 0;
          const failedShare = day.totalEvents > 0 ? day.failed / day.totalEvents : 0;
          const showLabel = index === 0 || index === data.length - 1 || index % 7 === 0;
          return (
            <div key={day.date} className="group flex h-full min-w-4 flex-1 flex-col justify-end">
              <div className="relative flex flex-1 items-end">
                <div
                  className="relative w-full bg-[#d8d7d0] transition-colors group-hover:bg-[#c9c8c0] dark:bg-white/10 dark:group-hover:bg-white/15"
                  style={{ height: `${height}%` }}
                  title={`${day.date}: ${day.totalEvents} events, ${day.projects} projects, ${day.failed} failures`}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 bg-[#9ebd28] dark:bg-[#c6e853]"
                    style={{ height: `${projectShare * 100}%` }}
                  />
                  {failedShare > 0 ? (
                    <div
                      className="absolute inset-x-0 top-0 bg-[#c9453d]"
                      style={{ height: `${failedShare * 100}%` }}
                    />
                  ) : null}
                </div>
              </div>
              <span className={cn("mt-2 h-3 font-mono text-[8px] tabular-nums", MUTED)}>
                {showLabel ? day.date.slice(5) : ""}
              </span>
            </div>
          );
        })}
      </figure>
      <div
        className={cn(
          "mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t pt-3 font-mono text-[9px] uppercase tracking-[0.14em]",
          GRID_LINE,
          MUTED,
        )}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 bg-[#d8d7d0] dark:bg-white/10" />
          events
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 bg-[#9ebd28] dark:bg-[#c6e853]" />
          projects
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 bg-[#c9453d]" />
          failed events
        </span>
      </div>
    </div>
  );
}

function OperationTable({ data }: { data: TelemetryDashboardData["operations"] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <thead>
          <tr
            className={cn(
              "border-b font-mono text-[9px] uppercase tracking-[0.16em]",
              GRID_LINE,
              MUTED,
            )}
          >
            <th className="px-5 py-3 font-medium">Operation</th>
            <th className="px-3 py-3 text-right font-medium">Attempts</th>
            <th className="px-3 py-3 text-right font-medium">Passed</th>
            <th className="px-3 py-3 text-right font-medium">Failed</th>
            <th className="px-3 py-3 text-right font-medium">Cancelled</th>
            <th className="px-5 py-3 text-right font-medium">Reliability</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#deddd5] dark:divide-white/10">
          {data.map((operation) => (
            <tr key={operation.id} className="font-mono text-xs">
              <th className="px-5 py-4 font-semibold">{operation.label}</th>
              <td className="px-3 py-4 text-right tabular-nums">
                {formatCount(operation.attempts)}
              </td>
              <td className="px-3 py-4 text-right tabular-nums">
                {formatCount(operation.succeeded)}
              </td>
              <td
                className={cn(
                  "px-3 py-4 text-right tabular-nums",
                  operation.failed > 0 && "text-[#b7352e] dark:text-[#ff766d]",
                )}
              >
                {formatCount(operation.failed)}
              </td>
              <td className="px-3 py-4 text-right tabular-nums">
                {formatCount(operation.cancelled)}
              </td>
              <td className="px-5 py-4 text-right">
                <span className="inline-flex min-w-14 justify-center bg-[#e7f2bd] px-2 py-1 font-semibold text-[#344000] dark:bg-[#c6e853]/15 dark:text-[#d9ef83]">
                  {formatRate(operation.successRate)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BrowserMetric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="px-5 py-4">
      <span className={cn("font-mono text-[9px] uppercase tracking-[0.16em]", MUTED)}>{label}</span>
      <div className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em] tabular-nums">
        {value}
      </div>
      <p className={cn("mt-1 text-[11px]", MUTED)}>{detail}</p>
    </div>
  );
}

export function TelemetryDecisionDashboard({ data }: { data: TelemetryDashboardData }) {
  const setupClassified = data.setup.complete + data.setup.incomplete;

  return (
    <article className="text-[#1b1a17] dark:text-[#e4e2da]">
      <header className={cn(PANEL, "relative overflow-hidden")}>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] opacity-35 lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_46%,rgba(158,189,40,0.24)_46%_47%,transparent_47%_62%,rgba(158,189,40,0.12)_62%_63%,transparent_63%)]" />
        </div>
        <div className="relative grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-10">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789018] dark:text-[#c6e853]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-current motion-reduce:animate-none" />
              Product signal / live aggregates
            </div>
            <h1
              id="telemetry-title"
              className="mt-5 max-w-3xl font-mono text-4xl font-semibold tracking-[-0.065em] sm:text-6xl lg:text-7xl"
            >
              Decision room
            </h1>
            <p className={cn("mt-5 max-w-2xl text-sm leading-6 sm:text-base", MUTED)}>
              The lifecycle evidence behind what Better Fullstack should fix, deepen, or stop
              building. Every number is aggregate-only and excludes project content.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-[10px] uppercase tracking-[0.14em] lg:text-right">
            <div>
              <dt className={MUTED}>Decision scope</dt>
              <dd className="mt-1 font-semibold text-[#789018] dark:text-[#c6e853]">
                {data.operationScopeLabel}
              </dd>
            </div>
            <div>
              <dt className={MUTED}>Coverage</dt>
              <dd className="mt-1 font-semibold">{formatRate(data.decisionCoverage)}</dd>
            </div>
            <div>
              <dt className={MUTED}>Last signal</dt>
              <dd className="mt-1 normal-case tracking-normal">
                {data.lastEventTime ? dateTimeFormatter.format(data.lastEventTime) : "No data"}
              </dd>
            </div>
            <div>
              <dt className={MUTED}>Rendered</dt>
              <dd className="mt-1 normal-case tracking-normal">
                {dateTimeFormatter.format(data.generatedAt)}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <section className={cn(PANEL, "mt-5")} aria-labelledby="signal-chain-title">
        <div
          className={cn(
            "flex flex-col gap-2 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
            GRID_LINE,
          )}
        >
          <h2
            id="signal-chain-title"
            className="font-mono text-xs font-semibold uppercase tracking-[0.15em]"
          >
            Lifecycle signal chain
          </h2>
          <p className={cn("max-w-xl text-[11px] leading-relaxed sm:text-right", MUTED)}>
            Comparable stages, not a person-level funnel: browser and CLI identifiers are
            intentionally separate.
          </p>
        </div>
        <div className="grid divide-y divide-[#deddd5] dark:divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <SignalCell
            step="01"
            label="Create"
            value={formatCount(
              data.operationScope === "window"
                ? data.totalProjectsInWindow
                : data.totalProjectsAllTime,
            )}
            detail={`Successful project generations · ${data.operationScopeLabel.toLowerCase()}`}
            accent
          />
          <SignalCell
            step="02"
            label="Setup"
            value={formatRate(data.setup.completionRate)}
            detail={`${formatCount(data.setup.complete)} complete / ${formatCount(setupClassified)} classified setup runs`}
          />
          <SignalCell
            step="03"
            label="Browser run"
            value={formatRate(data.browser.runReadyRate)}
            detail={`${formatCount(data.browser.runReady)} ready / ${formatCount(data.browser.runStarted)} run starts`}
          />
          <SignalCell
            step="04"
            label="Return · 7d"
            value={formatRate(data.repeatUse.repeat7dRate)}
            detail={`${formatCount(data.repeatUse.repeat7d)} anonymous IDs active on 2+ distinct days`}
          />
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
        <section className={PANEL} aria-label="Lifecycle operations">
          <PanelHeading
            index="01 / RELIABILITY"
            title="Lifecycle operations"
            detail={`${data.operationScopeLabel} terminal outcomes; cancellations are excluded from the reliability denominator.`}
          />
          <OperationTable data={data.operations} />
        </section>

        <section className={PANEL} aria-label="Repeat use">
          <PanelHeading
            index="02 / HABIT"
            title="Repeat use"
            detail="An anonymous client ID is returning when it is active on more than one distinct UTC date in the window."
          />
          <div className="grid grid-cols-2 divide-x divide-y divide-[#deddd5] dark:divide-white/10">
            <BrowserMetric
              label="7d repeat share"
              value={formatRate(data.repeatUse.repeat7dRate)}
              detail={`${formatCount(data.repeatUse.repeat7d)} / ${formatCount(data.repeatUse.active7d)} active`}
            />
            <BrowserMetric
              label="30d repeat share"
              value={formatRate(data.repeatUse.repeat30dRate)}
              detail={`${formatCount(data.repeatUse.repeat30d)} / ${formatCount(data.repeatUse.active30d)} active`}
            />
            <BrowserMetric
              label="New · 30d"
              value={formatCount(data.repeatUse.new30d)}
              detail="First-seen anonymous IDs"
            />
            <BrowserMetric
              label="Returning · all"
              value={formatCount(data.repeatUse.returningMachines)}
              detail={`${formatCount(data.repeatUse.uniqueMachines)} unique anonymous IDs`}
            />
          </div>
        </section>
      </div>

      <section className={cn(PANEL, "mt-5")} aria-label="Daily activity">
        <PanelHeading
          index="03 / PULSE"
          title="Daily activity"
          detail={`${data.windowDays} UTC days. Lime is successful project generation; red marks failed terminal events.`}
        />
        <ActivityChart data={data.activity} />
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className={PANEL} aria-label="Ecosystem adoption">
          <PanelHeading
            index="04 / DEMAND"
            title="Ecosystem adoption"
            detail={`${data.operationScopeLabel} successful project generations.`}
          />
          <RankedList items={data.adoption} empty="No ecosystem selections in this scope" />
        </section>

        <section className={PANEL} aria-label="Browser edit run and ZIP outcomes">
          <PanelHeading
            index="05 / BROWSER"
            title="Edit, run, and ZIP"
            detail={`${data.operationScopeLabel} builder outcomes. Ready and downloaded are the success gates.`}
          />
          <div className="grid grid-cols-2 divide-x divide-y divide-[#deddd5] dark:divide-white/10 sm:grid-cols-3">
            <BrowserMetric
              label="Run ready"
              value={formatRate(data.browser.runReadyRate)}
              detail={`${formatCount(data.browser.runReady)} of ${formatCount(data.browser.runStarted)} starts`}
            />
            <BrowserMetric
              label="Run failed"
              value={formatCount(data.browser.runFailed)}
              detail="Classified failures"
            />
            <BrowserMetric
              label="Files edited"
              value={formatCount(data.browser.filesEdited)}
              detail="Edit signals"
            />
            <BrowserMetric
              label="ZIP success"
              value={formatRate(data.browser.zipSuccessRate)}
              detail={`${formatCount(data.browser.zipDownloaded)} of ${formatCount(data.browser.zipStarted)} starts`}
            />
            <BrowserMetric
              label="ZIP failed"
              value={formatCount(data.browser.zipFailed)}
              detail="Archive/download failures"
            />
            <BrowserMetric
              label="Commands copied"
              value={formatCount(data.browser.commandsCopied)}
              detail="CLI handoffs"
            />
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className={PANEL} aria-label="Failure reasons">
          <PanelHeading
            index="06A"
            title="Failure reasons"
            detail="Bounded reason vocabulary, grouped by action when available."
          />
          <RankedList items={data.failureReasons} />
        </section>
        <section className={PANEL} aria-label="Failure stages">
          <PanelHeading
            index="06B"
            title="Failure stages"
            detail="Where the workflow stopped, never the raw error message."
          />
          <RankedList items={data.failureStages} />
        </section>
        <section className={PANEL} aria-label="Setup failures">
          <PanelHeading
            index="06C"
            title="Setup failures"
            detail="All time · install and ecosystem verification steps that need hardening."
          />
          <RankedList items={data.setupFailures} />
        </section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
        <section className={PANEL} aria-label="Invocation source">
          <PanelHeading index="07A" title="Invocation source" detail={data.operationScopeLabel} />
          <RankedList items={data.sources} />
        </section>
        <section className={PANEL} aria-label="Client split">
          <PanelHeading index="07B" title="Client split" detail={data.operationScopeLabel} />
          <RankedList items={data.clients} />
        </section>
        <section
          className={cn(PANEL, "px-5 py-5 sm:px-6")}
          aria-label="Telemetry interpretation notes"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789018] dark:text-[#c6e853]">
            Read before deciding
          </span>
          <ul className={cn("mt-4 space-y-3 text-xs leading-relaxed", MUTED)}>
            <li>• Window metrics fall back to all-time when aggregate coverage is below 80%.</li>
            <li>
              • Setup completion excludes MCP generation, skipped installs, and unknown legacy rows.
            </li>
            <li>
              • Repeat share is distinct-day usage, not cohort retention or an identity graph.
            </li>
            <li>
              • Counts reflect telemetry-enabled clients and should guide priorities, not
              market-size claims.
            </li>
          </ul>
          <a
            href="/docs/cli/telemetry"
            className="mt-6 inline-flex border-b border-[#789018] pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#657a10] transition-colors hover:text-[#1b1a17] dark:border-[#c6e853] dark:text-[#c6e853] dark:hover:text-white"
          >
            Inspect the privacy contract →
          </a>
        </section>
      </div>
    </article>
  );
}
