export type StackDistributionItem = {
  name: string;
  value: number;
  pct: number;
};
export type StackDistribution = StackDistributionItem[];

export type StackAnalyticsData = {
  totalProjects: number;
  ecosystems: StackDistribution;
  topStacks: StackDistribution;
  frontend: StackDistribution;
  backend: StackDistribution;
  database: StackDistribution;
  orm: StackDistribution;
};

type Dist = Record<string, number>;

export type RawAnalyticsStats = {
  totalProjects: number;
  ecosystem: Dist;
  frontend: Dist;
  backend: Dist;
  database: Dist;
  orm: Dist;
  stackCombinations?: Dist;
};

const ECOSYSTEM_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  "react-native": "React Native",
  rust: "Rust",
  python: "Python",
  go: "Go",
  java: "Java",
  dotnet: ".NET",
  elixir: "Elixir",
};

export const EMPTY_STACK_ANALYTICS: StackAnalyticsData = {
  totalProjects: 0,
  ecosystems: [],
  topStacks: [],
  frontend: [],
  backend: [],
  database: [],
  orm: [],
};

type RankOptions = {
  excludeNone?: boolean;
  excludeKeys?: string[];
  labels?: Record<string, string>;
};

function toRankedDistribution(
  record: Dist | undefined,
  limit: number,
  options: RankOptions = {},
): StackDistribution {
  if (!record) return [];
  const excluded = new Set(options.excludeKeys ?? []);
  let entries = Object.entries(record).filter(
    ([name, value]) => name !== "" && value > 0 && !excluded.has(name),
  );
  if (options.excludeNone) entries = entries.filter(([name]) => name !== "none");

  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (total === 0) return [];

  return entries
    .map(([name, value]) => ({ name: options.labels?.[name] ?? name, value, pct: value / total }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function buildStackAnalytics(stats: RawAnalyticsStats): StackAnalyticsData {
  return {
    totalProjects: stats.totalProjects,
    ecosystems: toRankedDistribution(stats.ecosystem, 8, { labels: ECOSYSTEM_LABELS }),
    topStacks: toRankedDistribution(stats.stackCombinations, 8, { excludeKeys: ["none + none"] }),
    frontend: toRankedDistribution(stats.frontend, 6, { excludeNone: true }),
    backend: toRankedDistribution(stats.backend, 6, { excludeNone: true }),
    database: toRankedDistribution(stats.database, 6, { excludeNone: true }),
    orm: toRankedDistribution(stats.orm, 6, { excludeNone: true }),
  };
}
