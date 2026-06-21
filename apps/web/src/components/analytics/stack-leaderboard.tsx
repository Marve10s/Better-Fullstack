import { cn } from "@/lib/utils";

import type { StackAnalyticsData, StackDistribution } from "@/lib/analytics-aggregate";

const CARD_CLASS =
  "overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] [color-scheme:light] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0] dark:[color-scheme:dark]";
const DIVIDER = "border-[#e1e0d8] dark:border-[rgba(237,235,228,0.10)]";
const MUTED = "text-[#71706a] dark:text-[#8f8d84]";
const TRACK = "bg-black/[0.06] dark:bg-white/[0.07]";

const NAME_WIDTH = {
  sm: "w-24 sm:w-28",
  md: "w-28 sm:w-40",
  lg: "w-40 sm:w-56",
} as const;

const countFormatter = new Intl.NumberFormat("en-US");

function LeaderboardRow({
  item,
  max,
  nameClass,
}: {
  item: StackDistribution[number];
  max: number;
  nameClass: string;
}) {
  const barWidth = max > 0 ? `${Math.max((item.value / max) * 100, 2)}%` : "0%";

  return (
    <li className="flex items-center gap-3">
      <span className={cn("shrink-0 truncate font-mono text-[12px] sm:text-[13px]", nameClass)} title={item.name}>
        {item.name}
      </span>
      <div className={cn("relative h-2.5 flex-1 overflow-hidden rounded-[3px]", TRACK)}>
        <div className="h-full rounded-[3px] bg-[#C6E853]" style={{ width: barWidth }} />
      </div>
      <span className="w-11 shrink-0 text-right font-mono text-[12px] font-medium tabular-nums">
        {Math.round(item.pct * 100)}%
      </span>
    </li>
  );
}

function Leaderboard({
  title,
  items,
  size = "sm",
}: {
  title: string;
  items: StackDistribution;
  size?: keyof typeof NAME_WIDTH;
}) {
  const max = items[0]?.value ?? 0;
  const nameClass = NAME_WIDTH[size];

  return (
    <section aria-label={title}>
      <div className={cn("flex items-baseline justify-between border-b pb-2", DIVIDER)}>
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">{title}</h2>
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em]", MUTED)}>share</span>
      </div>
      {items.length === 0 ? (
        <p className={cn("py-4 font-mono text-[12px]", MUTED)}>No data yet</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {items.map((item) => (
            <LeaderboardRow key={item.name} item={item} max={max} nameClass={nameClass} />
          ))}
        </ul>
      )}
    </section>
  );
}

export function StackLeaderboard({ data }: { data: StackAnalyticsData }) {
  const { totalProjects, ecosystems, topStacks, frontend, backend, database, orm } = data;
  const hasData = totalProjects > 0;

  return (
    <div className={CARD_CLASS}>
      <header
        className={cn(
          "flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7",
          DIVIDER,
        )}
      >
        <div>
          <h1 className="font-mono text-xl font-bold tracking-[-0.02em] sm:text-2xl">Stack analytics</h1>
          <p className={cn("mt-1.5 max-w-md text-sm", MUTED)}>
            What developers actually pick when scaffolding with Better Fullstack.
          </p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <div className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
            {countFormatter.format(totalProjects)}
          </div>
          <div className={cn("font-mono text-[10px] uppercase tracking-[0.18em]", MUTED)}>
            projects scaffolded
          </div>
        </div>
      </header>

      {hasData ? (
        <div className="space-y-8 px-5 py-6 sm:px-7">
          <Leaderboard title="Ecosystem" items={ecosystems} size="md" />
          <Leaderboard title="Top stacks" items={topStacks} size="lg" />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            <Leaderboard title="Frontend" items={frontend} />
            <Leaderboard title="Backend" items={backend} />
            <Leaderboard title="Database" items={database} />
            <Leaderboard title="ORM" items={orm} />
          </div>
          <p className={cn("border-t pt-4 font-mono text-[10px] uppercase tracking-[0.16em]", DIVIDER, MUTED)}>
            Aggregated from anonymous, opt-in CLI telemetry
          </p>
        </div>
      ) : (
        <div className="px-5 py-16 text-center sm:px-7">
          <p className={cn("font-mono text-sm", MUTED)}>Live analytics are not available right now.</p>
        </div>
      )}
    </div>
  );
}
