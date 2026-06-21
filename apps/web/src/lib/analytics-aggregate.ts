export type StackDistributionItem = {
  name: string;
  value: number;
  pct: number;
};
export type StackDistribution = StackDistributionItem[];

export type StackAnalyticsData = {
  totalProjects: number;
  topStacks: StackDistribution;
  frontend: StackDistribution;
  backend: StackDistribution;
  database: StackDistribution;
  orm: StackDistribution;
};

type Dist = Record<string, number>;

export type RawAnalyticsStats = {
  totalProjects: number;
  frontend: Dist;
  backend: Dist;
  database: Dist;
  orm: Dist;
  stackCombinations?: Dist;
};

export const EMPTY_STACK_ANALYTICS: StackAnalyticsData = {
  totalProjects: 0,
  topStacks: [],
  frontend: [],
  backend: [],
  database: [],
  orm: [],
};

function toRankedDistribution(record: Dist | undefined, limit: number): StackDistribution {
  if (!record) return [];
  const entries = Object.entries(record).filter(([name, value]) => name !== "" && value > 0);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (total === 0) return [];

  return entries
    .map(([name, value]) => ({ name, value, pct: value / total }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function buildStackAnalytics(stats: RawAnalyticsStats): StackAnalyticsData {
  return {
    totalProjects: stats.totalProjects,
    topStacks: toRankedDistribution(stats.stackCombinations, 8),
    frontend: toRankedDistribution(stats.frontend, 6),
    backend: toRankedDistribution(stats.backend, 6),
    database: toRankedDistribution(stats.database, 6),
    orm: toRankedDistribution(stats.orm, 6),
  };
}
