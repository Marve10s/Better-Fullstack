import type {
  AggregatedAnalyticsData,
  Distribution,
  HourlyData,
  MonthlyData,
  TimeSeriesData,
  VersionDistribution,
} from "@/components/analytics/types";

type Dist = Record<string, number>;

// The subset of the Convex `getStats` result that drives the analytics dashboard.
// `getStats` returns each distribution as a `Record<string, number>` (a count map);
// the dashboard components expect sorted `{ name, value }` arrays plus a computed
// summary, which is what `buildAggregatedAnalyticsData` produces.
export type RawAnalyticsStats = {
  totalProjects: number;
  lastEventTime?: number;
  frontend: Dist;
  backend: Dist;
  database: Dist;
  orm: Dist;
  api: Dist;
  auth: Dist;
  runtime: Dist;
  packageManager: Dist;
  platform: Dist;
  dbSetup: Dist;
  addons: Dist;
  examples: Dist;
  git: Dist;
  install: Dist;
  webDeploy: Dist;
  serverDeploy: Dist;
  payments: Dist;
  nodeVersion: Dist;
  cliVersion: Dist;
  hourlyDistribution: Dist;
  stackCombinations: Dist;
  dbOrmCombinations: Dist;
};

function toDistribution(record: Dist): Distribution {
  return Object.entries(record)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function toVersionDistribution(record: Dist): VersionDistribution {
  return Object.entries(record)
    .map(([version, count]) => ({ version, count }))
    .sort((a, b) => b.count - a.count);
}

function toHourly(record: Dist): HourlyData {
  return Object.entries(record)
    .map(([hour, count]) => ({ hour, count }))
    .sort((a, b) => a.hour.localeCompare(b.hour));
}

function toMonthly(daily: TimeSeriesData): MonthlyData {
  const byMonth = new Map<string, number>();
  for (const { date, count } of daily) {
    const month = date.slice(0, 7); // YYYY-MM
    byMonth.set(month, (byMonth.get(month) ?? 0) + count);
  }
  return Array.from(byMonth, ([month, count]) => ({ month, count })).sort((a, b) =>
    a.month.localeCompare(b.month),
  );
}

function topName(dist: Distribution): string {
  return dist[0]?.name ?? "-";
}

export const EMPTY_ANALYTICS_DATA: AggregatedAnalyticsData = {
  lastUpdated: null,
  totalProjects: 0,
  avgProjectsPerDay: 0,
  timeSeries: [],
  monthlyTimeSeries: [],
  hourlyDistribution: [],
  platformDistribution: [],
  packageManagerDistribution: [],
  backendDistribution: [],
  databaseDistribution: [],
  ormDistribution: [],
  dbSetupDistribution: [],
  apiDistribution: [],
  frontendDistribution: [],
  authDistribution: [],
  runtimeDistribution: [],
  addonsDistribution: [],
  examplesDistribution: [],
  gitDistribution: [],
  installDistribution: [],
  webDeployDistribution: [],
  serverDeployDistribution: [],
  paymentsDistribution: [],
  nodeVersionDistribution: [],
  cliVersionDistribution: [],
  popularStackCombinations: [],
  databaseORMCombinations: [],
  summary: {
    mostPopularFrontend: "-",
    mostPopularBackend: "-",
    mostPopularDatabase: "-",
    mostPopularORM: "-",
    mostPopularAPI: "-",
    mostPopularAuth: "-",
    mostPopularPackageManager: "-",
    mostPopularRuntime: "-",
  },
};

export function buildAggregatedAnalyticsData(
  stats: RawAnalyticsStats,
  daily: TimeSeriesData,
): AggregatedAnalyticsData {
  const frontendDistribution = toDistribution(stats.frontend);
  const backendDistribution = toDistribution(stats.backend);
  const databaseDistribution = toDistribution(stats.database);
  const ormDistribution = toDistribution(stats.orm);
  const apiDistribution = toDistribution(stats.api);
  const authDistribution = toDistribution(stats.auth);
  const runtimeDistribution = toDistribution(stats.runtime);
  const packageManagerDistribution = toDistribution(stats.packageManager);

  const totalDailyCount = daily.reduce((sum, day) => sum + day.count, 0);
  const avgProjectsPerDay =
    daily.length > 0 ? Math.round((totalDailyCount / daily.length) * 10) / 10 : 0;

  return {
    lastUpdated: stats.lastEventTime ? new Date(stats.lastEventTime).toISOString() : null,
    totalProjects: stats.totalProjects,
    avgProjectsPerDay,
    timeSeries: daily,
    monthlyTimeSeries: toMonthly(daily),
    hourlyDistribution: toHourly(stats.hourlyDistribution),
    platformDistribution: toDistribution(stats.platform),
    packageManagerDistribution,
    backendDistribution,
    databaseDistribution,
    ormDistribution,
    dbSetupDistribution: toDistribution(stats.dbSetup),
    apiDistribution,
    frontendDistribution,
    authDistribution,
    runtimeDistribution,
    addonsDistribution: toDistribution(stats.addons),
    examplesDistribution: toDistribution(stats.examples),
    gitDistribution: toDistribution(stats.git),
    installDistribution: toDistribution(stats.install),
    webDeployDistribution: toDistribution(stats.webDeploy),
    serverDeployDistribution: toDistribution(stats.serverDeploy),
    paymentsDistribution: toDistribution(stats.payments),
    nodeVersionDistribution: toVersionDistribution(stats.nodeVersion),
    cliVersionDistribution: toVersionDistribution(stats.cliVersion),
    popularStackCombinations: toDistribution(stats.stackCombinations),
    databaseORMCombinations: toDistribution(stats.dbOrmCombinations),
    summary: {
      mostPopularFrontend: topName(frontendDistribution),
      mostPopularBackend: topName(backendDistribution),
      mostPopularDatabase: topName(databaseDistribution),
      mostPopularORM: topName(ormDistribution),
      mostPopularAPI: topName(apiDistribution),
      mostPopularAuth: topName(authDistribution),
      mostPopularPackageManager: topName(packageManagerDistribution),
      mostPopularRuntime: topName(runtimeDistribution),
    },
  };
}
