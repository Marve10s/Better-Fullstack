import { v } from "convex/values";

import { internalMutation, internalQuery, query } from "./_generated/server";
import {
  applyFailureClassifications,
  classifyProjectSetupOutcome,
  countReturningMachinesFromActivity,
  type Distribution,
} from "./analytics-core";

type Dist = Distribution;
type StackValue = string | boolean | string[];
type StackRecord = Record<string, StackValue>;
const DAY_MS = 24 * 60 * 60 * 1000;
const RETURNING_MACHINES_VERSION = 2;

// Legacy per-field aggregates kept for the existing getStats consumers.
// New stack options do NOT need to be added here: they are covered
// generically by `dimensions` (built from the event's `stack` record).
const SINGLE_FIELDS = [
  "ecosystem",
  "backend",
  "database",
  "orm",
  "api",
  "auth",
  "runtime",
  "dbSetup",
  "webDeploy",
  "serverDeploy",
  "payments",
  "email",
  "fileUpload",
  "astroIntegration",
  "cssFramework",
  "uiLibrary",
  "stateManagement",
  "forms",
  "animation",
  "validation",
  "realtime",
  "jobQueue",
  "caching",
  "logging",
  "observability",
  "ai",
  "cms",
  "testing",
  "effect",
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "packageManager",
  "platform",
] as const;
const MULTI_FIELDS = ["frontend", "addons", "examples", "rustLibraries"] as const;
const BOOL_FIELDS = ["git", "install"] as const;

type AnalyticsEvent = {
  creationTime: number;
  eventType?: string;
  source?: string;
  client?: string;
  action?: string;
  status?: string;
  mode?: string;
  machineId?: string;
  success?: boolean;
  errorName?: string;
  failureStage?: string;
  failureReason?: string;
  setupFailures?: string[];
  durationMs?: number;
  fileCount?: number;
  changedFileCount?: number;
  capabilityCount?: number;
  conflictCount?: number;
  manualReviewCount?: number;
  warningCount?: number;
  issueCount?: number;
  retry?: boolean;
  ci?: boolean;
  ciProvider?: string;
  executionRuntime?: string;
  stack?: StackRecord;
  options?: Record<string, string | string[]>;
  cli_version?: string;
  node_version?: string;
  git?: boolean;
  install?: boolean;
  frontend?: string[];
  addons?: string[];
  examples?: string[];
  rustLibraries?: string[];
} & { [K in (typeof SINGLE_FIELDS)[number]]?: string };

function inc(dist: Dist, key: string | undefined, by = 1): void {
  if (!key) return;
  dist[key] = (dist[key] ?? 0) + by;
}

function incAll(dist: Dist, keys: string[] | undefined): void {
  for (const key of keys ?? []) inc(dist, key);
}

function incBool(dist: Dist, val: boolean | undefined): void {
  if (val !== undefined) inc(dist, val ? "Yes" : "No");
}

function getMajorVersion(version: string | undefined): string | undefined {
  if (!version) return undefined;
  const clean = version.startsWith("v") ? version.slice(1) : version;
  return `v${clean.split(".")[0]}`;
}

function durationBucket(ms: number): string {
  if (ms < 5_000) return "<5s";
  if (ms < 15_000) return "5-15s";
  if (ms < 30_000) return "15-30s";
  if (ms < 60_000) return "30-60s";
  if (ms < 180_000) return "1-3m";
  return ">3m";
}

function countBucket(count: number): string {
  if (count === 0) return "0";
  if (count === 1) return "1";
  if (count <= 5) return "2-5";
  if (count <= 10) return "6-10";
  if (count <= 25) return "11-25";
  if (count <= 100) return "26-100";
  return ">100";
}

function countReturning(activeDays: Map<string, number>): number {
  return [...activeDays.values()].filter((days) => days > 1).length;
}

function isCreation(ev: { eventType?: string }): boolean {
  return ev.eventType === undefined || ev.eventType === "project_created";
}

/**
 * Whether the event counts as a real scaffolded project. Failed create
 * attempts only feed the envelope aggregates (outcomes, errorNames, …).
 * Historical rows predate `success` and stay counted.
 */
function isCountedProject(ev: { eventType?: string; success?: boolean }): boolean {
  return isCreation(ev) && ev.success !== false;
}

function utcDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * The full stack record for an event. New events carry it explicitly;
 * for rows from older CLI versions it is synthesized from the legacy
 * columns and the per-ecosystem `options` record so `dimensions` covers
 * history too.
 */
function eventStack(ev: AnalyticsEvent): StackRecord {
  if (ev.stack) return ev.stack;
  const s: StackRecord = {};
  for (const k of SINGLE_FIELDS) if (ev[k]) s[k] = ev[k] as string;
  for (const k of MULTI_FIELDS) if (ev[k]?.length) s[k] = ev[k] as string[];
  for (const k of BOOL_FIELDS) if (ev[k] !== undefined) s[k] = ev[k] as boolean;
  if (ev.options) Object.assign(s, ev.options);
  return s;
}

const LEGACY_KEYS: Set<string> = new Set([...SINGLE_FIELDS, ...MULTI_FIELDS, ...BOOL_FIELDS]);

/**
 * The per-ecosystem extras that feed the legacy `optionStats` aggregate.
 * Old events carry them in `options`; new events only send the generic
 * `stack`, so the non-legacy string fields are derived from it.
 */
function legacyOptions(ev: AnalyticsEvent): Record<string, string | string[]> {
  if (ev.options) return ev.options;
  const extras: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(ev.stack ?? {})) {
    if (LEGACY_KEYS.has(key) || typeof value === "boolean") continue;
    extras[key] = value;
  }
  return extras;
}

type StatsShape = {
  totalProjects: number;
  lastEventTime: number;
  nodeVersion: Dist;
  cliVersion: Dist;
  hourlyDistribution: Dist;
  stackCombinations: Dist;
  dbOrmCombinations: Dist;
  optionStats: Record<string, Dist>;
  dimensions: Record<string, Dist>;
  totalEvents: number;
  eventTypes: Dist;
  sources: Dist;
  outcomes: Dist;
  actions: Dist;
  statuses: Dist;
  modes: Dist;
  actionStatuses: Dist;
  actionModes: Dist;
  actionOutcomes: Dist;
  actionDurationBuckets: Dist;
  clients: Dist;
  runtimes: Dist;
  ciUsage: Dist;
  ciProviders: Dist;
  errorNames: Dist;
  failureStages: Dist;
  failureReasons: Dist;
  actionFailureStages: Dist;
  actionFailureReasons: Dist;
  setupFailureStats: Dist;
  setupOutcomes: Dist;
  installSelections: Dist;
  decisionEvents: number;
  durationBuckets: Dist;
  fileCountBuckets: Dist;
  changedFileCountBuckets: Dist;
  capabilityCountBuckets: Dist;
  conflictCountBuckets: Dist;
  manualReviewCountBuckets: Dist;
  warningCountBuckets: Dist;
  issueCountBuckets: Dist;
  retryUsage: Dist;
  uniqueMachines: number;
  returningMachines: number;
  returningMachinesVersion: number;
  trackedMachineEvents: number;
} & { [K in (typeof SINGLE_FIELDS)[number]]: Dist } & {
  [K in (typeof MULTI_FIELDS)[number]]: Dist;
} & { [K in (typeof BOOL_FIELDS)[number]]: Dist };

function emptyStats(): StatsShape {
  const stats = {
    totalProjects: 0,
    lastEventTime: 0,
    nodeVersion: {},
    cliVersion: {},
    hourlyDistribution: {},
    stackCombinations: {},
    dbOrmCombinations: {},
    optionStats: {},
    dimensions: {},
    totalEvents: 0,
    eventTypes: {},
    sources: {},
    outcomes: {},
    actions: {},
    statuses: {},
    modes: {},
    actionStatuses: {},
    actionModes: {},
    actionOutcomes: {},
    actionDurationBuckets: {},
    clients: {},
    runtimes: {},
    ciUsage: {},
    ciProviders: {},
    errorNames: {},
    failureStages: {},
    failureReasons: {},
    actionFailureStages: {},
    actionFailureReasons: {},
    setupFailureStats: {},
    setupOutcomes: {},
    installSelections: {},
    decisionEvents: 0,
    durationBuckets: {},
    fileCountBuckets: {},
    changedFileCountBuckets: {},
    capabilityCountBuckets: {},
    conflictCountBuckets: {},
    manualReviewCountBuckets: {},
    warningCountBuckets: {},
    issueCountBuckets: {},
    retryUsage: {},
    uniqueMachines: 0,
    returningMachines: 0,
    returningMachinesVersion: RETURNING_MACHINES_VERSION,
    trackedMachineEvents: 0,
  } as StatsShape;
  for (const k of [...SINGLE_FIELDS, ...MULTI_FIELDS, ...BOOL_FIELDS]) stats[k] = {};
  return stats;
}

type ProjectDecisionAggregates = {
  setupOutcomes: Dist;
  installSelections: Dist;
};

function applyProjectDecisionAggregates(
  stats: ProjectDecisionAggregates,
  ev: AnalyticsEvent,
  stack = eventStack(ev),
): void {
  const setupOutcome = classifyProjectSetupOutcome({
    ...ev,
    install: typeof stack.install === "boolean" ? stack.install : undefined,
  });
  inc(stats.setupOutcomes, setupOutcome);
  if (!setupOutcome) return;

  const installSelection =
    ev.source === "mcp"
      ? "generation-only"
      : typeof stack.install === "boolean"
        ? stack.install
          ? "requested"
          : "skipped"
        : "unknown";
  inc(stats.installSelections, installSelection);
}

type DailyStatsShape = {
  date: string;
  count: number;
  newMachines: number;
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  decisionEvents: number;
  actions: Dist;
  actionStatuses: Dist;
  actionOutcomes: Dist;
  clients: Dist;
  sources: Dist;
  ecosystems: Dist;
  setupOutcomes: Dist;
  installSelections: Dist;
  failureStages: Dist;
  failureReasons: Dist;
  actionFailureStages: Dist;
  actionFailureReasons: Dist;
};

function emptyDailyStats(date: string): DailyStatsShape {
  return {
    date,
    count: 0,
    newMachines: 0,
    totalEvents: 0,
    successfulEvents: 0,
    failedEvents: 0,
    decisionEvents: 0,
    actions: {},
    actionStatuses: {},
    actionOutcomes: {},
    clients: {},
    sources: {},
    ecosystems: {},
    setupOutcomes: {},
    installSelections: {},
    failureStages: {},
    failureReasons: {},
    actionFailureStages: {},
    actionFailureReasons: {},
  };
}

function applyDailyEvent(daily: DailyStatsShape, ev: AnalyticsEvent): void {
  daily.totalEvents += 1;
  daily.decisionEvents += 1;
  if (ev.success === true) daily.successfulEvents += 1;
  else if (ev.success === false) daily.failedEvents += 1;

  inc(daily.actions, ev.action);
  if (ev.action && ev.status) inc(daily.actionStatuses, `${ev.action}:${ev.status}`);
  if (ev.action && ev.success !== undefined) {
    inc(daily.actionOutcomes, `${ev.action}:${ev.success ? "success" : "failure"}`);
  }
  inc(daily.clients, ev.client);
  inc(daily.sources, ev.source ?? "unknown");
  applyFailureClassifications(daily, ev);

  if (!isCountedProject(ev)) return;
  daily.count += 1;
  const stack = eventStack(ev);
  inc(daily.ecosystems, typeof stack.ecosystem === "string" ? stack.ecosystem : undefined);
  applyProjectDecisionAggregates(daily, ev, stack);
}

/** Apply one event to the running aggregates (mutates `stats`). */
function applyEvent(stats: StatsShape, ev: AnalyticsEvent): void {
  const now = ev.creationTime;
  if (now > stats.lastEventTime) stats.lastEventTime = now;

  // Envelope aggregates: every event type.
  stats.totalEvents += 1;
  stats.decisionEvents += 1;
  inc(stats.eventTypes, ev.eventType ?? "project_created");
  inc(stats.sources, ev.source ?? "unknown");
  inc(stats.outcomes, ev.success === undefined ? "unknown" : ev.success ? "success" : "failure");
  inc(stats.actions, ev.action);
  inc(stats.statuses, ev.status);
  inc(stats.modes, ev.mode);
  if (ev.action && ev.status) inc(stats.actionStatuses, `${ev.action}:${ev.status}`);
  if (ev.action && ev.mode) inc(stats.actionModes, `${ev.action}:${ev.mode}`);
  if (ev.action && ev.success !== undefined) {
    inc(stats.actionOutcomes, `${ev.action}:${ev.success ? "success" : "failure"}`);
  }
  inc(stats.clients, ev.client);
  inc(stats.runtimes, ev.executionRuntime);
  incBool(stats.ciUsage, ev.ci);
  inc(stats.ciProviders, ev.ciProvider);
  inc(stats.errorNames, ev.errorName);
  applyFailureClassifications(stats, ev);
  incAll(stats.setupFailureStats, ev.setupFailures);
  if (ev.durationMs !== undefined) {
    const bucket = durationBucket(ev.durationMs);
    inc(stats.durationBuckets, bucket);
    if (ev.action) inc(stats.actionDurationBuckets, `${ev.action}:${bucket}`);
  }
  if (ev.fileCount !== undefined) inc(stats.fileCountBuckets, countBucket(ev.fileCount));
  if (ev.changedFileCount !== undefined) {
    inc(stats.changedFileCountBuckets, countBucket(ev.changedFileCount));
  }
  if (ev.capabilityCount !== undefined) {
    inc(stats.capabilityCountBuckets, countBucket(ev.capabilityCount));
  }
  if (ev.conflictCount !== undefined) {
    inc(stats.conflictCountBuckets, countBucket(ev.conflictCount));
  }
  if (ev.manualReviewCount !== undefined) {
    inc(stats.manualReviewCountBuckets, countBucket(ev.manualReviewCount));
  }
  if (ev.warningCount !== undefined) {
    inc(stats.warningCountBuckets, countBucket(ev.warningCount));
  }
  if (ev.issueCount !== undefined) inc(stats.issueCountBuckets, countBucket(ev.issueCount));
  incBool(stats.retryUsage, ev.retry);

  const stack = eventStack(ev);
  applyProjectDecisionAggregates(stats, ev, stack);

  // Failed attempts stop here: no project or requested stack aggregates.
  if (ev.success === false) return;

  // A CLI command emits a start plus one terminal event. Aggregate selected
  // dimensions only from the terminal success so command options are not
  // counted twice and cancelled attempts do not look like completed usage.
  if (ev.eventType === "command_used" && ev.status !== "succeeded") return;

  // Generic full-coverage dimensions. Creation events use bare category
  // names; add/update events are namespaced so they never skew stack stats.
  const prefix = isCreation(ev)
    ? ""
    : ev.eventType === "feature_added"
      ? "add."
      : ev.eventType === "stack_updated"
        ? "update."
        : `${ev.eventType}.`;
  for (const [key, value] of Object.entries(stack)) {
    const dist = (stats.dimensions[prefix + key] ??= {});
    if (typeof value === "boolean") incBool(dist, value);
    else if (Array.isArray(value)) incAll(dist, value);
    else inc(dist, value);
  }

  if (!isCreation(ev)) return;

  // Legacy aggregates: successful creations only (matches historical semantics).
  stats.totalProjects += 1;
  for (const k of SINGLE_FIELDS) inc(stats[k], ev[k]);
  for (const k of MULTI_FIELDS) incAll(stats[k], ev[k]);
  for (const k of BOOL_FIELDS) incBool(stats[k], ev[k]);
  inc(stats.nodeVersion, getMajorVersion(ev.node_version));
  inc(stats.cliVersion, ev.cli_version);
  inc(stats.hourlyDistribution, String(new Date(now).getUTCHours()).padStart(2, "0"));
  inc(stats.stackCombinations, `${ev.backend || "none"} + ${ev.frontend?.[0] || "none"}`);
  inc(stats.dbOrmCombinations, `${ev.database || "none"} + ${ev.orm || "none"}`);
  for (const [category, value] of Object.entries(legacyOptions(ev))) {
    const dist = (stats.optionStats[category] ??= {});
    incAll(dist, Array.isArray(value) ? value : [value]);
  }
}

const stackValidator = v.record(v.string(), v.union(v.string(), v.boolean(), v.array(v.string())));

const eventArgs = {
  // Envelope
  eventType: v.optional(v.string()),
  source: v.optional(v.string()),
  client: v.optional(v.string()),
  action: v.optional(v.string()),
  status: v.optional(v.string()),
  mode: v.optional(v.string()),
  machineId: v.optional(v.string()),
  success: v.optional(v.boolean()),
  errorName: v.optional(v.string()),
  failureStage: v.optional(v.string()),
  failureReason: v.optional(v.string()),
  setupFailures: v.optional(v.array(v.string())),
  durationMs: v.optional(v.number()),
  fileCount: v.optional(v.number()),
  changedFileCount: v.optional(v.number()),
  capabilityCount: v.optional(v.number()),
  conflictCount: v.optional(v.number()),
  manualReviewCount: v.optional(v.number()),
  warningCount: v.optional(v.number()),
  issueCount: v.optional(v.number()),
  retry: v.optional(v.boolean()),
  ci: v.optional(v.boolean()),
  ciProvider: v.optional(v.string()),
  executionRuntime: v.optional(v.string()),
  // Full generic stack config
  stack: v.optional(stackValidator),
  // Legacy named fields (still sent by older CLI versions)
  ecosystem: v.optional(v.string()),
  database: v.optional(v.string()),
  orm: v.optional(v.string()),
  backend: v.optional(v.string()),
  runtime: v.optional(v.string()),
  frontend: v.optional(v.array(v.string())),
  api: v.optional(v.string()),
  auth: v.optional(v.string()),
  dbSetup: v.optional(v.string()),
  webDeploy: v.optional(v.string()),
  serverDeploy: v.optional(v.string()),
  addons: v.optional(v.array(v.string())),
  examples: v.optional(v.array(v.string())),
  payments: v.optional(v.string()),
  email: v.optional(v.string()),
  fileUpload: v.optional(v.string()),
  astroIntegration: v.optional(v.string()),
  cssFramework: v.optional(v.string()),
  uiLibrary: v.optional(v.string()),
  stateManagement: v.optional(v.string()),
  forms: v.optional(v.string()),
  animation: v.optional(v.string()),
  validation: v.optional(v.string()),
  realtime: v.optional(v.string()),
  jobQueue: v.optional(v.string()),
  caching: v.optional(v.string()),
  logging: v.optional(v.string()),
  observability: v.optional(v.string()),
  ai: v.optional(v.string()),
  cms: v.optional(v.string()),
  testing: v.optional(v.string()),
  effect: v.optional(v.string()),
  rustWebFramework: v.optional(v.string()),
  rustFrontend: v.optional(v.string()),
  rustOrm: v.optional(v.string()),
  rustApi: v.optional(v.string()),
  rustCli: v.optional(v.string()),
  rustLibraries: v.optional(v.array(v.string())),
  git: v.optional(v.boolean()),
  packageManager: v.optional(v.string()),
  install: v.optional(v.boolean()),
  cli_version: v.optional(v.string()),
  node_version: v.optional(v.string()),
  platform: v.optional(v.string()),
  options: v.optional(v.record(v.string(), v.union(v.string(), v.array(v.string())))),
};

export const ingestEvent = internalMutation({
  args: eventArgs,
  returns: v.null(),
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("analyticsEvents", args);
    const event = await ctx.db.get(id);
    if (!event) {
      throw new Error("Inserted analytics event could not be reloaded");
    }
    const now = event._creationTime;
    const today = utcDate(now);

    const existing = await ctx.db.query("analyticsStats").first();
    let stats: StatsShape;
    if (existing) {
      const { _id, _creationTime, ...plain } = existing;
      stats = { ...emptyStats(), ...plain } as StatsShape;
      if (existing.returningMachinesVersion !== RETURNING_MACHINES_VERSION) {
        const activity = await ctx.db.query("analyticsMachineDailyActivity").collect();
        stats.returningMachines = countReturningMachinesFromActivity(activity);
        stats.returningMachinesVersion = RETURNING_MACHINES_VERSION;
      }
    } else {
      stats = emptyStats();
    }
    applyEvent(stats, { ...args, creationTime: now });

    // Machine tracking (anonymous random ID → uniques, new vs returning).
    let newMachine = false;
    if (args.machineId) {
      const machineId = args.machineId;
      stats.trackedMachineEvents += 1;
      const machine = await ctx.db
        .query("analyticsMachines")
        .withIndex("by_machine_id", (q) => q.eq("machineId", machineId))
        .first();
      if (machine) {
        await ctx.db.patch("analyticsMachines", machine._id, {
          lastSeen: now,
          eventCount: machine.eventCount + 1,
          platform: args.platform ?? machine.platform,
          client: args.client ?? machine.client,
          lastCliVersion: args.cli_version ?? machine.lastCliVersion,
        });
      } else {
        newMachine = true;
        stats.uniqueMachines += 1;
        await ctx.db.insert("analyticsMachines", {
          machineId,
          firstSeen: now,
          lastSeen: now,
          eventCount: 1,
          platform: args.platform,
          client: args.client,
          lastCliVersion: args.cli_version,
        });
      }
      const activity = await ctx.db
        .query("analyticsMachineDailyActivity")
        .withIndex("by_date_machine", (q) => q.eq("date", today).eq("machineId", machineId))
        .first();
      if (activity) {
        await ctx.db.patch("analyticsMachineDailyActivity", activity._id, {
          eventCount: activity.eventCount + 1,
          lastSeen: now,
        });
      } else {
        if (machine) {
          const priorActiveDays = await ctx.db
            .query("analyticsMachineDailyActivity")
            .withIndex("by_machine_date", (q) => q.eq("machineId", machineId))
            .take(2);
          if (priorActiveDays.length === 1) stats.returningMachines += 1;
        }
        await ctx.db.insert("analyticsMachineDailyActivity", {
          date: today,
          machineId,
          eventCount: 1,
          firstSeen: now,
          lastSeen: now,
        });
      }
    }

    if (existing) {
      await ctx.db.patch("analyticsStats", existing._id, stats);
    } else {
      await ctx.db.insert("analyticsStats", stats);
    }

    const daily = await ctx.db
      .query("analyticsDailyStats")
      .withIndex("by_date", (q) => q.eq("date", today))
      .first();
    let dailyStats = emptyDailyStats(today);
    if (daily) {
      const { _id, _creationTime, ...plain } = daily;
      dailyStats = {
        ...dailyStats,
        ...plain,
        newMachines: daily.newMachines ?? 0,
        totalEvents: daily.totalEvents ?? daily.count,
        successfulEvents: daily.successfulEvents ?? 0,
        failedEvents: daily.failedEvents ?? 0,
        decisionEvents: daily.decisionEvents ?? 0,
      };
    }
    applyDailyEvent(dailyStats, { ...args, creationTime: now });
    if (newMachine) dailyStats.newMachines += 1;

    if (daily) await ctx.db.patch("analyticsDailyStats", daily._id, dailyStats);
    else await ctx.db.insert("analyticsDailyStats", dailyStats);

    return null;
  },
});

const distributionValidator = v.record(v.string(), v.number());

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("analyticsStats").first();
    if (!stats) return null;
    const { _id, _creationTime, ...plain } = stats;
    const returningMachines =
      stats.returningMachinesVersion === RETURNING_MACHINES_VERSION
        ? (stats.returningMachines ?? 0)
        : countReturningMachinesFromActivity(
            await ctx.db.query("analyticsMachineDailyActivity").collect(),
          );
    return {
      ...emptyStats(),
      ...plain,
      returningMachines,
      returningMachinesVersion: RETURNING_MACHINES_VERSION,
      hourlyDistribution: stats.hourlyDistribution ?? {},
      stackCombinations: stats.stackCombinations ?? {},
      dbOrmCombinations: stats.dbOrmCombinations ?? {},
      optionStats: stats.optionStats ?? {},
      dimensions: stats.dimensions ?? {},
    };
  },
});

export const getDailyStats = query({
  args: {
    days: v.optional(v.number()),
  },
  returns: v.array(
    v.object({
      date: v.string(),
      count: v.number(),
      newMachines: v.optional(v.number()),
      totalEvents: v.optional(v.number()),
      successfulEvents: v.optional(v.number()),
      failedEvents: v.optional(v.number()),
      decisionEvents: v.optional(v.number()),
      actions: v.optional(distributionValidator),
      actionStatuses: v.optional(distributionValidator),
      actionOutcomes: v.optional(distributionValidator),
      clients: v.optional(distributionValidator),
      sources: v.optional(distributionValidator),
      ecosystems: v.optional(distributionValidator),
      setupOutcomes: v.optional(distributionValidator),
      installSelections: v.optional(distributionValidator),
      failureStages: v.optional(distributionValidator),
      failureReasons: v.optional(distributionValidator),
      actionFailureStages: v.optional(distributionValidator),
      actionFailureReasons: v.optional(distributionValidator),
    }),
  ),
  handler: async (ctx, args) => {
    const days = args.days ?? 30;
    const now = Date.now();
    const today = utcDate(now);
    const cutoffDate = utcDate(now - (days - 1) * DAY_MS);

    const allDaily = await ctx.db
      .query("analyticsDailyStats")
      .withIndex("by_date", (q) => q.gte("date", cutoffDate))
      .order("asc")
      .collect();

    return allDaily
      .filter((d) => d.date >= cutoffDate && d.date <= today)
      .map((d) => ({
        date: d.date,
        count: d.count,
        newMachines: d.newMachines,
        totalEvents: d.totalEvents,
        successfulEvents: d.successfulEvents,
        failedEvents: d.failedEvents,
        decisionEvents: d.decisionEvents,
        actions: d.actions,
        actionStatuses: d.actionStatuses,
        actionOutcomes: d.actionOutcomes,
        clients: d.clients,
        sources: d.sources,
        ecosystems: d.ecosystems,
        setupOutcomes: d.setupOutcomes,
        installSelections: d.installSelections,
        failureStages: d.failureStages,
        failureReasons: d.failureReasons,
        actionFailureStages: d.actionFailureStages,
        actionFailureReasons: d.actionFailureReasons,
      }));
  },
});

export const getEngagement = query({
  args: {},
  returns: v.object({
    uniqueMachines: v.number(),
    returningMachines: v.number(),
    trackedEvents: v.number(),
    newMachinesLast30d: v.number(),
    activeMachinesLast7d: v.number(),
    activeMachinesLast30d: v.number(),
    returningMachinesLast7d: v.number(),
    returningMachinesLast30d: v.number(),
  }),
  handler: async (ctx) => {
    const stats = await ctx.db.query("analyticsStats").first();
    const now = Date.now();
    const today = utcDate(now);
    const cutoffDate30d = utcDate(now - 29 * DAY_MS);
    const cutoffDate7d = utcDate(now - 6 * DAY_MS);
    const daily = await ctx.db
      .query("analyticsDailyStats")
      .withIndex("by_date", (q) => q.gte("date", cutoffDate30d))
      .collect();
    const activity = await ctx.db
      .query("analyticsMachineDailyActivity")
      .withIndex("by_date", (q) => q.gte("date", cutoffDate30d))
      .collect();
    const activityThroughToday = activity.filter((event) => event.date <= today);
    const activeMachinesLast30d = new Set(activityThroughToday.map((event) => event.machineId));
    const activeMachinesLast7d = new Set(
      activityThroughToday
        .filter((event) => event.date >= cutoffDate7d)
        .map((event) => event.machineId),
    );
    const activeDaysLast30d = new Map<string, number>();
    const activeDaysLast7d = new Map<string, number>();
    for (const event of activityThroughToday) {
      activeDaysLast30d.set(event.machineId, (activeDaysLast30d.get(event.machineId) ?? 0) + 1);
      if (event.date >= cutoffDate7d) {
        activeDaysLast7d.set(event.machineId, (activeDaysLast7d.get(event.machineId) ?? 0) + 1);
      }
    }
    const returningMachines = !stats
      ? 0
      : stats.returningMachinesVersion === RETURNING_MACHINES_VERSION
        ? (stats.returningMachines ?? 0)
        : countReturningMachinesFromActivity(
            await ctx.db.query("analyticsMachineDailyActivity").collect(),
          );
    return {
      uniqueMachines: stats?.uniqueMachines ?? 0,
      returningMachines,
      trackedEvents: stats?.trackedMachineEvents ?? 0,
      newMachinesLast30d: daily
        .filter((event) => event.date <= today)
        .reduce((sum, event) => sum + (event.newMachines ?? 0), 0),
      activeMachinesLast7d: activeMachinesLast7d.size,
      activeMachinesLast30d: activeMachinesLast30d.size,
      returningMachinesLast7d: countReturning(activeDaysLast7d),
      returningMachinesLast30d: countReturning(activeDaysLast30d),
    };
  },
});

/**
 * Product-level telemetry for roadmap decisions. The result contains only
 * aggregate counters; anonymous machine identifiers and individual events are
 * never exposed by this query.
 */
export const getProductInsights = query({
  args: {},
  returns: v.object({
    totalEvents: v.number(),
    decisionEvents: v.number(),
    actions: distributionValidator,
    statuses: distributionValidator,
    modes: distributionValidator,
    actionStatuses: distributionValidator,
    actionModes: distributionValidator,
    actionOutcomes: distributionValidator,
    actionDurationBuckets: distributionValidator,
    clients: distributionValidator,
    sources: distributionValidator,
    outcomes: distributionValidator,
    runtimes: distributionValidator,
    ciUsage: distributionValidator,
    ciProviders: distributionValidator,
    durationBuckets: distributionValidator,
    fileCountBuckets: distributionValidator,
    changedFileCountBuckets: distributionValidator,
    capabilityCountBuckets: distributionValidator,
    conflictCountBuckets: distributionValidator,
    manualReviewCountBuckets: distributionValidator,
    warningCountBuckets: distributionValidator,
    issueCountBuckets: distributionValidator,
    retryUsage: distributionValidator,
    errorNames: distributionValidator,
    failureStages: distributionValidator,
    failureReasons: distributionValidator,
    actionFailureStages: distributionValidator,
    actionFailureReasons: distributionValidator,
    setupFailureStats: distributionValidator,
    setupOutcomes: distributionValidator,
    installSelections: distributionValidator,
    dimensions: v.record(v.string(), distributionValidator),
  }),
  handler: async (ctx) => {
    const stats = await ctx.db.query("analyticsStats").first();
    return {
      totalEvents: stats?.totalEvents ?? 0,
      decisionEvents: stats?.decisionEvents ?? 0,
      actions: stats?.actions ?? {},
      statuses: stats?.statuses ?? {},
      modes: stats?.modes ?? {},
      actionStatuses: stats?.actionStatuses ?? {},
      actionModes: stats?.actionModes ?? {},
      actionOutcomes: stats?.actionOutcomes ?? {},
      actionDurationBuckets: stats?.actionDurationBuckets ?? {},
      clients: stats?.clients ?? {},
      sources: stats?.sources ?? {},
      outcomes: stats?.outcomes ?? {},
      runtimes: stats?.runtimes ?? {},
      ciUsage: stats?.ciUsage ?? {},
      ciProviders: stats?.ciProviders ?? {},
      durationBuckets: stats?.durationBuckets ?? {},
      fileCountBuckets: stats?.fileCountBuckets ?? {},
      changedFileCountBuckets: stats?.changedFileCountBuckets ?? {},
      capabilityCountBuckets: stats?.capabilityCountBuckets ?? {},
      conflictCountBuckets: stats?.conflictCountBuckets ?? {},
      manualReviewCountBuckets: stats?.manualReviewCountBuckets ?? {},
      warningCountBuckets: stats?.warningCountBuckets ?? {},
      issueCountBuckets: stats?.issueCountBuckets ?? {},
      retryUsage: stats?.retryUsage ?? {},
      errorNames: stats?.errorNames ?? {},
      failureStages: stats?.failureStages ?? {},
      failureReasons: stats?.failureReasons ?? {},
      actionFailureStages: stats?.actionFailureStages ?? {},
      actionFailureReasons: stats?.actionFailureReasons ?? {},
      setupFailureStats: stats?.setupFailureStats ?? {},
      setupOutcomes: stats?.setupOutcomes ?? {},
      installSelections: stats?.installSelections ?? {},
      dimensions: stats?.dimensions ?? {},
    };
  },
});

export const getRecentEvents = internalQuery({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - 30 * 60 * 1000;
    const events = await ctx.db
      .query("analyticsEvents")
      .order("desc")
      .filter((q) => q.gte(q.field("_creationTime"), cutoff))
      .collect();
    return events.map(({ machineId: _machineId, ...event }) => event);
  },
});

export const backfillStats = internalMutation({
  args: {},
  returns: v.object({
    totalProcessed: v.number(),
    dailyDates: v.number(),
    uniqueMachines: v.number(),
  }),
  handler: async (ctx) => {
    const existing = await ctx.db.query("analyticsStats").first();
    if (existing) {
      await ctx.db.delete("analyticsStats", existing._id);
    }
    for (const d of await ctx.db.query("analyticsDailyStats").collect()) {
      await ctx.db.delete("analyticsDailyStats", d._id);
    }
    for (const m of await ctx.db.query("analyticsMachines").collect()) {
      await ctx.db.delete("analyticsMachines", m._id);
    }
    for (const a of await ctx.db.query("analyticsMachineDailyActivity").collect()) {
      await ctx.db.delete("analyticsMachineDailyActivity", a._id);
    }

    const events = await ctx.db.query("analyticsEvents").collect();
    events.sort((a, b) => a._creationTime - b._creationTime);

    const stats = emptyStats();
    const dailyCounts = new Map<string, DailyStatsShape>();
    const machines = new Map<
      string,
      {
        firstSeen: number;
        lastSeen: number;
        eventCount: number;
        platform?: string;
        client?: string;
        lastCliVersion?: string;
      }
    >();
    const machineActivity = new Map<
      string,
      { date: string; machineId: string; eventCount: number; firstSeen: number; lastSeen: number }
    >();

    for (const ev of events) {
      const now = ev._creationTime;
      applyEvent(stats, { ...ev, creationTime: now } as AnalyticsEvent);

      const date = utcDate(now);
      const daily = dailyCounts.get(date) ?? emptyDailyStats(date);
      applyDailyEvent(daily, { ...ev, creationTime: now } as AnalyticsEvent);

      if (ev.machineId) {
        const activityKey = `${date}:${ev.machineId}`;
        const activity = machineActivity.get(activityKey);
        if (activity) {
          activity.eventCount += 1;
          activity.lastSeen = now;
        } else {
          machineActivity.set(activityKey, {
            date,
            machineId: ev.machineId,
            eventCount: 1,
            firstSeen: now,
            lastSeen: now,
          });
        }

        const machine = machines.get(ev.machineId);
        if (machine) {
          machine.lastSeen = now;
          machine.eventCount += 1;
          machine.platform = ev.platform ?? machine.platform;
          machine.client = ev.client ?? machine.client;
          machine.lastCliVersion = ev.cli_version ?? machine.lastCliVersion;
        } else {
          daily.newMachines += 1;
          machines.set(ev.machineId, {
            firstSeen: now,
            lastSeen: now,
            eventCount: 1,
            platform: ev.platform,
            client: ev.client,
            lastCliVersion: ev.cli_version,
          });
        }
      }
      dailyCounts.set(date, daily);
    }

    stats.uniqueMachines = machines.size;
    const activeDaysByMachine = new Map<string, number>();
    for (const activity of machineActivity.values()) {
      activeDaysByMachine.set(
        activity.machineId,
        (activeDaysByMachine.get(activity.machineId) ?? 0) + 1,
      );
    }
    stats.returningMachines = [...activeDaysByMachine.values()].filter(
      (activeDays) => activeDays > 1,
    ).length;
    stats.trackedMachineEvents = [...machines.values()].reduce((sum, m) => sum + m.eventCount, 0);
    if (stats.totalEvents > 0) {
      await ctx.db.insert("analyticsStats", stats);
    }
    for (const daily of dailyCounts.values()) {
      await ctx.db.insert("analyticsDailyStats", daily);
    }
    for (const [machineId, machine] of machines) {
      await ctx.db.insert("analyticsMachines", { machineId, ...machine });
    }
    for (const activity of machineActivity.values()) {
      await ctx.db.insert("analyticsMachineDailyActivity", activity);
    }

    return {
      totalProcessed: stats.totalEvents,
      dailyDates: dailyCounts.size,
      uniqueMachines: machines.size,
    };
  },
});
