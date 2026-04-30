import { CircleDot, Download, GitPullRequest, Star } from "lucide-react";
import { useEffect, useState } from "react";

type HeroStatsData = {
  github: {
    stars: number;
    openIssues: number;
    closedIssues: number;
    openPRs: number;
    mergedPRs: number;
  };
  npm: {
    downloads: number;
  };
};

const REPO = "Marve10s/Better-Fullstack";
const CACHE_KEY = "navbar-stats-cache-v2";
const CACHE_TTL_MS = 5 * 60 * 1000;

let memoryCache: { data: HeroStatsData; timestamp: number } | null = null;
let inflight: Promise<HeroStatsData> | null = null;

function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  return num.toString();
}

function readCachedStats(): HeroStatsData | null {
  if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: HeroStatsData; timestamp: number };
    if (Date.now() - parsed.timestamp >= CACHE_TTL_MS) return null;
    memoryCache = parsed;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCachedStats(data: HeroStatsData) {
  const value = { data, timestamp: Date.now() };
  memoryCache = value;
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {}
}

async function fetchHeroStats(): Promise<HeroStatsData> {
  const cached = readCachedStats();
  if (cached) return cached;

  if (!inflight) {
    inflight = fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch hero stats (${res.status})`);
        return res.json() as Promise<HeroStatsData>;
      })
      .then((data) => {
        writeCachedStats(data);
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }

  return inflight;
}

export function HeroStats() {
  const [stats, setStats] = useState<HeroStatsData | null>(() => readCachedStats());

  useEffect(() => {
    let cancelled = false;
    void fetchHeroStats()
      .then((data) => {
        if (!cancelled) setStats(data);
        return;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) {
    return (
      <div className="mt-6 flex items-center justify-center gap-5 sm:mt-8 sm:gap-6">
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-14 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm sm:mt-8 sm:gap-x-6">
      <a
        href={`https://github.com/${REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        title={`${stats.github.stars} stars`}
      >
        <Star className="h-3.5 w-3.5" />
        <span className="tabular-nums">{formatCompact(stats.github.stars)}</span>
      </a>

      <a
        href={`https://github.com/${REPO}/issues`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        title={`${stats.github.openIssues} open, ${stats.github.closedIssues} closed issues`}
      >
        <CircleDot className="h-3.5 w-3.5" />
        <span className="tabular-nums">
          {stats.github.openIssues}/{stats.github.closedIssues}
        </span>
      </a>

      <a
        href={`https://github.com/${REPO}/pulls`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        title={`${stats.github.openPRs} open, ${stats.github.mergedPRs} merged PRs`}
      >
        <GitPullRequest className="h-3.5 w-3.5" />
        <span className="tabular-nums">
          {stats.github.openPRs}/{stats.github.mergedPRs}
        </span>
      </a>

      <a
        href="https://www.npmjs.com/package/create-better-fullstack"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        title={`${stats.npm.downloads.toLocaleString()} downloads this month`}
      >
        <Download className="h-3.5 w-3.5" />
        <span className="tabular-nums">{formatCompact(stats.npm.downloads)}/mo</span>
      </a>
    </div>
  );
}
