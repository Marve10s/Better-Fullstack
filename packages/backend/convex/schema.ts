import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const distributionValidator = v.record(v.string(), v.number());

export default defineSchema({
  videos: defineTable({
    embedId: v.string(),
    title: v.string(),
  }),

  tweets: defineTable({
    tweetId: v.string(),
    order: v.optional(v.number()),
  }),

  showcase: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    liveUrl: v.string(),
    tags: v.array(v.string()),
  }),

  analyticsEvents: defineTable({
    // Event envelope (all optional: rows from older CLI versions lack them)
    eventType: v.optional(v.string()), // project_created | feature_added | stack_updated | command_used | web_action
    source: v.optional(v.string()), // cli-interactive | cli-flags | mcp | programmatic | web-builder
    client: v.optional(v.string()), // cli | web
    action: v.optional(v.string()), // create | add | update | check | builder-run | ...
    status: v.optional(v.string()), // started | succeeded | failed | cancelled
    mode: v.optional(v.string()), // dry-run | apply | check | interactive | ...
    machineId: v.optional(v.string()), // random anonymous UUID, no PII
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
    // Full stack config, captured generically so new CLI options never
    // require a schema change here.
    stack: v.optional(v.record(v.string(), v.union(v.string(), v.boolean(), v.array(v.string())))),
    // Core
    ecosystem: v.optional(v.string()),
    database: v.optional(v.string()),
    orm: v.optional(v.string()),
    backend: v.optional(v.string()),
    runtime: v.optional(v.string()),
    frontend: v.optional(v.array(v.string())),
    api: v.optional(v.string()),
    auth: v.optional(v.string()),
    // Deployment
    dbSetup: v.optional(v.string()),
    webDeploy: v.optional(v.string()),
    serverDeploy: v.optional(v.string()),
    // Addons & Examples
    addons: v.optional(v.array(v.string())),
    examples: v.optional(v.array(v.string())),
    // Integrations
    payments: v.optional(v.string()),
    email: v.optional(v.string()),
    fileUpload: v.optional(v.string()),
    // Frontend extras
    astroIntegration: v.optional(v.string()),
    cssFramework: v.optional(v.string()),
    uiLibrary: v.optional(v.string()),
    stateManagement: v.optional(v.string()),
    forms: v.optional(v.string()),
    animation: v.optional(v.string()),
    validation: v.optional(v.string()),
    // Backend extras
    realtime: v.optional(v.string()),
    jobQueue: v.optional(v.string()),
    caching: v.optional(v.string()),
    logging: v.optional(v.string()),
    observability: v.optional(v.string()),
    // AI & CMS
    ai: v.optional(v.string()),
    cms: v.optional(v.string()),
    // Testing
    testing: v.optional(v.string()),
    // Effect
    effect: v.optional(v.string()),
    // Rust ecosystem
    rustWebFramework: v.optional(v.string()),
    rustFrontend: v.optional(v.string()),
    rustOrm: v.optional(v.string()),
    rustApi: v.optional(v.string()),
    rustCli: v.optional(v.string()),
    rustLibraries: v.optional(v.array(v.string())),
    // Setup options
    git: v.optional(v.boolean()),
    packageManager: v.optional(v.string()),
    install: v.optional(v.boolean()),
    // Meta
    cli_version: v.optional(v.string()),
    node_version: v.optional(v.string()),
    platform: v.optional(v.string()),
    options: v.optional(v.record(v.string(), v.union(v.string(), v.array(v.string())))),
  })
    .index("by_event_type", ["eventType"])
    .index("by_action_status", ["action", "status"])
    .index("by_source", ["source"])
    .index("by_machine", ["machineId"]),

  analyticsStats: defineTable({
    totalProjects: v.number(),
    lastEventTime: v.number(),
    // Core
    ecosystem: distributionValidator,
    backend: distributionValidator,
    frontend: distributionValidator,
    database: distributionValidator,
    orm: distributionValidator,
    api: distributionValidator,
    auth: distributionValidator,
    runtime: distributionValidator,
    // Deployment
    dbSetup: distributionValidator,
    webDeploy: distributionValidator,
    serverDeploy: distributionValidator,
    // Addons & Examples
    addons: distributionValidator,
    examples: distributionValidator,
    // Integrations
    payments: distributionValidator,
    email: distributionValidator,
    fileUpload: distributionValidator,
    // Frontend extras
    astroIntegration: distributionValidator,
    cssFramework: distributionValidator,
    uiLibrary: distributionValidator,
    stateManagement: distributionValidator,
    forms: distributionValidator,
    animation: distributionValidator,
    validation: distributionValidator,
    // Backend extras
    realtime: distributionValidator,
    jobQueue: distributionValidator,
    caching: distributionValidator,
    logging: distributionValidator,
    observability: distributionValidator,
    // AI & CMS
    ai: distributionValidator,
    cms: distributionValidator,
    // Testing
    testing: distributionValidator,
    // Effect
    effect: distributionValidator,
    // Rust ecosystem
    rustWebFramework: distributionValidator,
    rustFrontend: distributionValidator,
    rustOrm: distributionValidator,
    rustApi: distributionValidator,
    rustCli: distributionValidator,
    rustLibraries: distributionValidator,
    // Setup options
    packageManager: distributionValidator,
    platform: distributionValidator,
    git: distributionValidator,
    install: distributionValidator,
    // Meta
    nodeVersion: distributionValidator,
    cliVersion: distributionValidator,
    // Aggregations
    hourlyDistribution: v.optional(distributionValidator),
    stackCombinations: v.optional(distributionValidator),
    dbOrmCombinations: v.optional(distributionValidator),
    optionStats: v.optional(v.record(v.string(), distributionValidator)),
    // Generic full coverage: one distribution per stack field, built from
    // analyticsEvents.stack. `add.`/`update.` prefixes namespace non-create events.
    dimensions: v.optional(v.record(v.string(), distributionValidator)),
    totalEvents: v.optional(v.number()),
    eventTypes: v.optional(distributionValidator),
    sources: v.optional(distributionValidator),
    outcomes: v.optional(distributionValidator), // success | failure | unknown
    actions: v.optional(distributionValidator),
    statuses: v.optional(distributionValidator),
    modes: v.optional(distributionValidator),
    actionStatuses: v.optional(distributionValidator),
    actionModes: v.optional(distributionValidator),
    actionOutcomes: v.optional(distributionValidator),
    actionDurationBuckets: v.optional(distributionValidator),
    clients: v.optional(distributionValidator),
    runtimes: v.optional(distributionValidator),
    ciUsage: v.optional(distributionValidator),
    ciProviders: v.optional(distributionValidator),
    errorNames: v.optional(distributionValidator),
    failureStages: v.optional(distributionValidator),
    failureReasons: v.optional(distributionValidator),
    actionFailureStages: v.optional(distributionValidator),
    actionFailureReasons: v.optional(distributionValidator),
    setupFailureStats: v.optional(distributionValidator),
    durationBuckets: v.optional(distributionValidator),
    fileCountBuckets: v.optional(distributionValidator),
    changedFileCountBuckets: v.optional(distributionValidator),
    capabilityCountBuckets: v.optional(distributionValidator),
    conflictCountBuckets: v.optional(distributionValidator),
    manualReviewCountBuckets: v.optional(distributionValidator),
    warningCountBuckets: v.optional(distributionValidator),
    issueCountBuckets: v.optional(distributionValidator),
    retryUsage: v.optional(distributionValidator),
    uniqueMachines: v.optional(v.number()),
    returningMachines: v.optional(v.number()),
    returningMachinesVersion: v.optional(v.number()),
    trackedMachineEvents: v.optional(v.number()),
  }),

  analyticsDailyStats: defineTable({
    date: v.string(),
    count: v.number(),
    newMachines: v.optional(v.number()),
    totalEvents: v.optional(v.number()),
    successfulEvents: v.optional(v.number()),
    failedEvents: v.optional(v.number()),
  }).index("by_date", ["date"]),

  analyticsMachines: defineTable({
    machineId: v.string(),
    firstSeen: v.number(),
    lastSeen: v.number(),
    eventCount: v.number(),
    platform: v.optional(v.string()),
    client: v.optional(v.string()),
    lastCliVersion: v.optional(v.string()),
  }).index("by_machine_id", ["machineId"]),

  analyticsMachineDailyActivity: defineTable({
    date: v.string(),
    machineId: v.string(),
    eventCount: v.number(),
    firstSeen: v.number(),
    lastSeen: v.number(),
  })
    .index("by_date", ["date"])
    .index("by_date_machine", ["date", "machineId"])
    .index("by_machine_date", ["machineId", "date"]),
});
