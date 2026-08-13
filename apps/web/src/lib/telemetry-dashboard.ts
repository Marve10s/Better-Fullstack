export type TelemetryDistribution = Record<string, number>;

export type RawTelemetryStats = {
  totalProjects: number;
  lastEventTime: number;
  ecosystem: TelemetryDistribution;
  dimensions?: Record<string, TelemetryDistribution>;
};

export type RawProductInsights = {
  totalEvents: number;
  decisionEvents: number;
  actions: TelemetryDistribution;
  actionStatuses: TelemetryDistribution;
  actionOutcomes: TelemetryDistribution;
  clients: TelemetryDistribution;
  sources: TelemetryDistribution;
  errorNames: TelemetryDistribution;
  failureStages: TelemetryDistribution;
  failureReasons: TelemetryDistribution;
  actionFailureStages: TelemetryDistribution;
  actionFailureReasons: TelemetryDistribution;
  setupFailureStats: TelemetryDistribution;
  setupOutcomes: TelemetryDistribution;
  installSelections: TelemetryDistribution;
};

export type RawDailyTelemetry = {
  date: string;
  count: number;
  newMachines?: number;
  totalEvents?: number;
  successfulEvents?: number;
  failedEvents?: number;
  decisionEvents?: number;
  actions?: TelemetryDistribution;
  actionStatuses?: TelemetryDistribution;
  actionOutcomes?: TelemetryDistribution;
  clients?: TelemetryDistribution;
  sources?: TelemetryDistribution;
  ecosystems?: TelemetryDistribution;
  setupOutcomes?: TelemetryDistribution;
  installSelections?: TelemetryDistribution;
  failureStages?: TelemetryDistribution;
  failureReasons?: TelemetryDistribution;
  actionFailureStages?: TelemetryDistribution;
  actionFailureReasons?: TelemetryDistribution;
};

export type RawEngagement = {
  uniqueMachines: number;
  returningMachines: number;
  trackedEvents: number;
  newMachinesLast30d: number;
  activeMachinesLast7d: number;
  activeMachinesLast30d: number;
  returningMachinesLast7d: number;
  returningMachinesLast30d: number;
};

export type RankedSignal = {
  name: string;
  value: number;
  share: number;
};

export type OperationReliability = {
  id: string;
  label: string;
  attempts: number;
  succeeded: number;
  failed: number;
  cancelled: number;
  successRate: number | null;
};

export type TelemetryDashboardData = {
  generatedAt: number;
  lastEventTime: number | null;
  windowDays: number;
  operationScope: "window" | "all-time";
  operationScopeLabel: string;
  decisionCoverage: number;
  totalEventsInWindow: number;
  totalProjectsInWindow: number;
  totalProjectsAllTime: number;
  setup: {
    complete: number;
    incomplete: number;
    notRequested: number;
    generationOnly: number;
    unknown: number;
    completionRate: number | null;
  };
  installs: {
    requested: number;
    skipped: number;
    generationOnly: number;
    unknown: number;
    requestRate: number | null;
  };
  browser: {
    runStarted: number;
    runReady: number;
    runFailed: number;
    runReadyRate: number | null;
    zipStarted: number;
    zipDownloaded: number;
    zipFailed: number;
    zipSuccessRate: number | null;
    filesEdited: number;
    commandsCopied: number;
  };
  repeatUse: {
    uniqueMachines: number;
    returningMachines: number;
    active7d: number;
    repeat7d: number;
    repeat7dRate: number | null;
    active30d: number;
    repeat30d: number;
    repeat30dRate: number | null;
    new30d: number;
  };
  operations: OperationReliability[];
  adoption: RankedSignal[];
  sources: RankedSignal[];
  clients: RankedSignal[];
  failureReasons: RankedSignal[];
  failureStages: RankedSignal[];
  setupFailures: RankedSignal[];
  activity: Array<{
    date: string;
    projects: number;
    totalEvents: number;
    succeeded: number;
    failed: number;
  }>;
};

type DecisionDistributions = Pick<
  RawProductInsights,
  | "actions"
  | "actionStatuses"
  | "actionOutcomes"
  | "clients"
  | "sources"
  | "failureStages"
  | "failureReasons"
  | "actionFailureStages"
  | "actionFailureReasons"
  | "setupOutcomes"
  | "installSelections"
>;

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

const OPERATION_GROUPS = [
  { id: "create", label: "Create", actions: ["create"] },
  { id: "add", label: "Add", actions: ["add"] },
  {
    id: "remove",
    label: "Remove",
    actions: ["remove", "bfs_plan_part_removal", "bfs_apply_part_removal"],
  },
  { id: "status", label: "Status", actions: ["status", "bfs_get_project_status"] },
  { id: "update", label: "Update", actions: ["update"] },
  { id: "check", label: "Check", actions: ["check", "doctor"] },
  { id: "gen", label: "Generate", actions: ["gen"] },
] as const;

function ratio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return Math.min(Math.max(numerator / denominator, 0), 1);
}

function sumDistribution(target: TelemetryDistribution, source?: TelemetryDistribution): void {
  for (const [key, value] of Object.entries(source ?? {})) {
    target[key] = (target[key] ?? 0) + value;
  }
}

function emptyDecisionDistributions(): DecisionDistributions {
  return {
    actions: {},
    actionStatuses: {},
    actionOutcomes: {},
    clients: {},
    sources: {},
    failureStages: {},
    failureReasons: {},
    actionFailureStages: {},
    actionFailureReasons: {},
    setupOutcomes: {},
    installSelections: {},
  };
}

function aggregateWindow(daily: readonly RawDailyTelemetry[]): DecisionDistributions {
  const aggregate = emptyDecisionDistributions();
  for (const day of daily) {
    sumDistribution(aggregate.actions, day.actions);
    sumDistribution(aggregate.actionStatuses, day.actionStatuses);
    sumDistribution(aggregate.actionOutcomes, day.actionOutcomes);
    sumDistribution(aggregate.clients, day.clients);
    sumDistribution(aggregate.sources, day.sources);
    sumDistribution(aggregate.failureStages, day.failureStages);
    sumDistribution(aggregate.failureReasons, day.failureReasons);
    sumDistribution(aggregate.actionFailureStages, day.actionFailureStages);
    sumDistribution(aggregate.actionFailureReasons, day.actionFailureReasons);
    sumDistribution(aggregate.setupOutcomes, day.setupOutcomes);
    sumDistribution(aggregate.installSelections, day.installSelections);
  }
  return aggregate;
}

function displayIdentifier(value: string): string {
  return value
    .replaceAll("_", "-")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ranked(
  distribution: TelemetryDistribution,
  limit = 6,
  labels: Record<string, string> = {},
): RankedSignal[] {
  const entries = Object.entries(distribution).filter(([, value]) => value > 0);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (total === 0) return [];
  return entries
    .map(([name, value]) => ({
      name: labels[name] ?? displayIdentifier(name),
      value,
      share: value / total,
    }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name))
    .slice(0, limit);
}

function rankedActionClassifications(distribution: TelemetryDistribution): RankedSignal[] {
  const labels = Object.fromEntries(
    Object.keys(distribution).map((key) => {
      const separator = key.indexOf(":");
      if (separator === -1) return [key, displayIdentifier(key)];
      const action = displayIdentifier(key.slice(0, separator));
      const classification = displayIdentifier(key.slice(separator + 1));
      return [key, `${action} / ${classification}`];
    }),
  );
  return ranked(distribution, 7, labels);
}

function includeUnattributedClassifications(
  actionDistribution: TelemetryDistribution,
  genericDistribution: TelemetryDistribution,
): TelemetryDistribution {
  const combined = { ...actionDistribution };
  const attributedByClassification: TelemetryDistribution = {};
  for (const [key, value] of Object.entries(actionDistribution)) {
    const separator = key.indexOf(":");
    if (separator === -1) continue;
    const classification = key.slice(separator + 1);
    attributedByClassification[classification] =
      (attributedByClassification[classification] ?? 0) + value;
  }
  for (const [classification, total] of Object.entries(genericDistribution)) {
    const unattributed = total - (attributedByClassification[classification] ?? 0);
    if (unattributed > 0) combined[`unattributed:${classification}`] = unattributed;
  }
  return combined;
}

function valueForActions(
  distribution: TelemetryDistribution,
  actions: readonly string[],
  suffix: string,
): number {
  return actions.reduce((sum, action) => sum + (distribution[`${action}:${suffix}`] ?? 0), 0);
}

function buildOperations(distributions: DecisionDistributions): OperationReliability[] {
  return OPERATION_GROUPS.map(({ id, label, actions }) => {
    const started = valueForActions(distributions.actionStatuses, actions, "started");
    const succeeded = valueForActions(distributions.actionStatuses, actions, "succeeded");
    const failed = valueForActions(distributions.actionStatuses, actions, "failed");
    const cancelled = valueForActions(distributions.actionStatuses, actions, "cancelled");
    const terminal = succeeded + failed + cancelled;
    return {
      id,
      label,
      attempts: Math.max(started, terminal),
      succeeded,
      failed,
      cancelled,
      successRate: ratio(succeeded, succeeded + failed),
    };
  });
}

function dateKey(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function buildActivity(
  daily: readonly RawDailyTelemetry[],
  days: number,
  now: number,
): TelemetryDashboardData["activity"] {
  const byDate = new Map(daily.map((day) => [day.date, day]));
  const activity: TelemetryDashboardData["activity"] = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = dateKey(now - offset * 24 * 60 * 60 * 1000);
    const day = byDate.get(date);
    activity.push({
      date,
      projects: day?.count ?? 0,
      totalEvents: day?.totalEvents ?? day?.count ?? 0,
      succeeded: day?.successfulEvents ?? 0,
      failed: day?.failedEvents ?? 0,
    });
  }
  return activity;
}

export function buildTelemetryDashboard(
  raw: {
    stats: RawTelemetryStats;
    insights: RawProductInsights;
    daily: RawDailyTelemetry[];
    engagement: RawEngagement;
  },
  options: { windowDays?: number; now?: number; minimumWindowCoverage?: number } = {},
): TelemetryDashboardData {
  const windowDays = Math.max(1, Math.round(options.windowDays ?? 30));
  const generatedAt = options.now ?? Date.now();
  const minimumWindowCoverage = options.minimumWindowCoverage ?? 0.8;
  const totalEventsInWindow = raw.daily.reduce(
    (sum, day) => sum + (day.totalEvents ?? day.count),
    0,
  );
  const decisionEventsInWindow = raw.daily.reduce((sum, day) => sum + (day.decisionEvents ?? 0), 0);
  const windowCoverage = ratio(decisionEventsInWindow, totalEventsInWindow) ?? 0;
  const useWindow = totalEventsInWindow > 0 && windowCoverage >= minimumWindowCoverage;
  const windowDistributions = aggregateWindow(raw.daily);
  const distributions: DecisionDistributions = useWindow
    ? windowDistributions
    : {
        actions: raw.insights.actions,
        actionStatuses: raw.insights.actionStatuses,
        actionOutcomes: raw.insights.actionOutcomes,
        clients: raw.insights.clients,
        sources: raw.insights.sources,
        failureStages: raw.insights.failureStages,
        failureReasons: raw.insights.failureReasons,
        actionFailureStages: raw.insights.actionFailureStages,
        actionFailureReasons: raw.insights.actionFailureReasons,
        setupOutcomes: raw.insights.setupOutcomes,
        installSelections: raw.insights.installSelections,
      };
  const allTimeCoverage = ratio(raw.insights.decisionEvents, raw.insights.totalEvents) ?? 0;
  const setup = distributions.setupOutcomes;
  const installs = distributions.installSelections;
  const actions = distributions.actions;
  const runStarted = actions["builder-run-started"] ?? 0;
  const runReady = actions["builder-run-ready"] ?? 0;
  const runFailed = actions["builder-run-failed"] ?? 0;
  const zipStarted = actions["builder-zip-started"] ?? 0;
  const zipDownloaded = actions["builder-zip-downloaded"] ?? 0;
  const zipFailed = actions["builder-zip-failed"] ?? 0;
  const ecosystemWindow = raw.daily.reduce<TelemetryDistribution>((aggregate, day) => {
    sumDistribution(aggregate, day.ecosystems);
    return aggregate;
  }, {});
  const failureReasonDistribution = includeUnattributedClassifications(
    distributions.actionFailureReasons,
    distributions.failureReasons,
  );
  const failureStageDistribution = includeUnattributedClassifications(
    distributions.actionFailureStages,
    distributions.failureStages,
  );

  return {
    generatedAt,
    lastEventTime: raw.stats.lastEventTime > 0 ? raw.stats.lastEventTime : null,
    windowDays,
    operationScope: useWindow ? "window" : "all-time",
    operationScopeLabel: useWindow ? `Last ${windowDays} days` : "All time",
    decisionCoverage: useWindow ? windowCoverage : allTimeCoverage,
    totalEventsInWindow,
    totalProjectsInWindow: raw.daily.reduce((sum, day) => sum + day.count, 0),
    totalProjectsAllTime: raw.stats.totalProjects,
    setup: {
      complete: setup.complete ?? 0,
      incomplete: setup.incomplete ?? 0,
      notRequested: setup["not-requested"] ?? 0,
      generationOnly: setup["generation-only"] ?? 0,
      unknown: setup.unknown ?? 0,
      completionRate: ratio(setup.complete ?? 0, (setup.complete ?? 0) + (setup.incomplete ?? 0)),
    },
    installs: {
      requested: installs.requested ?? 0,
      skipped: installs.skipped ?? 0,
      generationOnly: installs["generation-only"] ?? 0,
      unknown: installs.unknown ?? 0,
      requestRate: ratio(
        installs.requested ?? 0,
        (installs.requested ?? 0) + (installs.skipped ?? 0),
      ),
    },
    browser: {
      runStarted,
      runReady,
      runFailed,
      runReadyRate: ratio(runReady, runStarted),
      zipStarted,
      zipDownloaded,
      zipFailed,
      zipSuccessRate: ratio(zipDownloaded, zipStarted),
      filesEdited: actions["builder-file-edited"] ?? 0,
      commandsCopied: actions["builder-command-copied"] ?? 0,
    },
    repeatUse: {
      uniqueMachines: raw.engagement.uniqueMachines,
      returningMachines: raw.engagement.returningMachines,
      active7d: raw.engagement.activeMachinesLast7d,
      repeat7d: raw.engagement.returningMachinesLast7d,
      repeat7dRate: ratio(
        raw.engagement.returningMachinesLast7d,
        raw.engagement.activeMachinesLast7d,
      ),
      active30d: raw.engagement.activeMachinesLast30d,
      repeat30d: raw.engagement.returningMachinesLast30d,
      repeat30dRate: ratio(
        raw.engagement.returningMachinesLast30d,
        raw.engagement.activeMachinesLast30d,
      ),
      new30d: raw.engagement.newMachinesLast30d,
    },
    operations: buildOperations(distributions),
    adoption: ranked(useWindow ? ecosystemWindow : raw.stats.ecosystem, 8, ECOSYSTEM_LABELS),
    sources: ranked(distributions.sources, 6),
    clients: ranked(distributions.clients, 4),
    failureReasons: rankedActionClassifications(failureReasonDistribution),
    failureStages: rankedActionClassifications(failureStageDistribution),
    setupFailures: ranked(raw.insights.setupFailureStats, 7),
    activity: buildActivity(raw.daily, windowDays, generatedAt),
  };
}
