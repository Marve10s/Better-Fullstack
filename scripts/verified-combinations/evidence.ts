export const EVIDENCE_SCHEMA_VERSION = 1 as const;
export const SOURCE_EVIDENCE_MAX_AGE_MS = 36 * 60 * 60 * 1_000;

export type EvidenceReason =
  | "missing"
  | "unrecognized-version"
  | "invalid-git-head"
  | "git-head-mismatch"
  | "workspace-dirty"
  | "current-workspace-dirty"
  | "invalid-timestamp"
  | "future-timestamp"
  | "stale-timestamp"
  | "unsuccessful"
  | "incomplete-rows"
  | "environment-unqualified"
  | "no-executed-steps"
  | "deferred-validation"
  | "skipped-validation"
  | "failed-validation"
  | "generator-unbound"
  | "wrong-package-version"
  | "wrong-package-identity"
  | "wrong-registry"
  | "non-exact-semver"
  | "incomplete-package-managers";

export type EvidenceVerdict = {
  current: boolean;
  pass: number;
  total: number;
  reasons: EvidenceReason[];
};

const OUTCOME_REASONS: ReadonlySet<EvidenceReason> = new Set([
  "unsuccessful",
  "failed-validation",
  "no-executed-steps",
  "deferred-validation",
  "skipped-validation",
]);

export type SourceEvidenceContext = {
  currentGitHead?: string;
  currentWorkspaceClean: boolean;
  currentPackageVersion?: string;
  now: Date;
  maxAgeMs?: number;
};

export type SmokeEvidenceEnvelope<Result = unknown> = {
  schemaVersion: typeof EVIDENCE_SCHEMA_VERSION;
  evidenceType: "better-fullstack/smoke";
  generatedAt: string;
  gitHead: string;
  workspaceClean: boolean;
  preset?: string;
  expectedRows: string[];
  overallSuccess: boolean;
  results: Result[];
};

type SourceMetadata = {
  schemaVersion?: unknown;
  generatedAt?: unknown;
  gitHead?: unknown;
  workspaceClean?: unknown;
  overallSuccess?: unknown;
};

const FULL_GIT_SHA = /^[0-9a-f]{40}$/i;
const EXACT_SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
export const REQUIRED_MANAGERS = ["bun", "npm", "pnpm"] as const;
const PUBLISHED_PACKAGE_NAME = "create-better-fullstack";
const PUBLISHED_PACKAGE_REGISTRY = "https://registry.npmjs.org";

function isExactUniqueList(actual: unknown, expected: readonly string[]): actual is string[] {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    new Set(actual).size === actual.length &&
    expected.every((value) => actual.includes(value))
  );
}

function sourceReasons(
  metadata: SourceMetadata | null,
  context: SourceEvidenceContext,
): EvidenceReason[] {
  if (!metadata) return ["missing"];
  const reasons: EvidenceReason[] = [];
  if (metadata.schemaVersion !== EVIDENCE_SCHEMA_VERSION) reasons.push("unrecognized-version");
  if (typeof metadata.gitHead !== "string" || !FULL_GIT_SHA.test(metadata.gitHead)) {
    reasons.push("invalid-git-head");
  } else if (metadata.gitHead !== context.currentGitHead) {
    reasons.push("git-head-mismatch");
  }
  if (metadata.workspaceClean !== true) reasons.push("workspace-dirty");
  if (!context.currentWorkspaceClean) reasons.push("current-workspace-dirty");
  const generatedAt =
    typeof metadata.generatedAt === "string" ? Date.parse(metadata.generatedAt) : NaN;
  if (!Number.isFinite(generatedAt)) {
    reasons.push("invalid-timestamp");
  } else {
    const age = context.now.getTime() - generatedAt;
    if (age < 0) reasons.push("future-timestamp");
    if (age > (context.maxAgeMs ?? SOURCE_EVIDENCE_MAX_AGE_MS)) reasons.push("stale-timestamp");
  }
  if (metadata.overallSuccess !== true) reasons.push("unsuccessful");
  return reasons;
}

function verdict(total: number, eligiblePass: number, reasons: EvidenceReason[]): EvidenceVerdict {
  const invalid = reasons.some((reason) => !OUTCOME_REASONS.has(reason));
  return {
    current: !invalid,
    pass: invalid ? 0 : eligiblePass,
    total,
    reasons,
  };
}

export function evaluateSmokeEvidence(
  input: unknown,
  expectedRows: readonly string[],
  context: SourceEvidenceContext,
): EvidenceVerdict {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return verdict(
      expectedRows.length,
      0,
      input === null || input === undefined ? ["missing"] : ["unrecognized-version"],
    );
  }
  const envelope = input as Partial<
    SmokeEvidenceEnvelope<{
      comboName?: string;
      overallSuccess?: boolean;
      steps?: Array<{ success?: boolean; skipped?: boolean; advisory?: boolean }>;
    }>
  >;
  const reasons = sourceReasons(
    {
      schemaVersion: envelope.schemaVersion,
      generatedAt: envelope.generatedAt,
      gitHead: envelope.gitHead,
      workspaceClean: envelope.workspaceClean,
      overallSuccess: envelope.overallSuccess,
    },
    context,
  );
  if (envelope.evidenceType !== "better-fullstack/smoke") reasons.push("unrecognized-version");
  const results = Array.isArray(envelope.results) ? envelope.results : [];
  const resultByName = new Map(results.map((result) => [result.comboName, result]));
  if (
    !isExactUniqueList(envelope.expectedRows, expectedRows) ||
    results.length !== expectedRows.length ||
    resultByName.size !== results.length ||
    expectedRows.some((name) => !resultByName.has(name))
  ) {
    reasons.push("incomplete-rows");
  }
  let pass = 0;
  for (const name of expectedRows) {
    const result = resultByName.get(name);
    const steps = Array.isArray(result?.steps) ? result.steps : [];
    const gatingSteps = steps.filter((step) => !step.skipped && !step.advisory);
    if (gatingSteps.length === 0) reasons.push("no-executed-steps");
    if (gatingSteps.some((step) => step.success !== true)) reasons.push("failed-validation");
    if (
      result?.overallSuccess === true &&
      gatingSteps.length > 0 &&
      gatingSteps.every((step) => step.success === true) &&
      steps.every((step) => step.success === true || step.skipped === true)
    ) {
      pass += 1;
    }
  }
  return verdict(expectedRows.length, pass, [...new Set(reasons)]);
}

export function evaluateReleaseGuardEvidence(
  input: unknown,
  expectedCommands: readonly string[],
  context: SourceEvidenceContext,
): EvidenceVerdict {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return verdict(
      expectedCommands.length,
      0,
      input === null || input === undefined ? ["missing"] : ["unrecognized-version"],
    );
  }
  const summary = input as Record<string, any>;
  const reasons = sourceReasons(summary, context);
  const steps = Array.isArray(summary.steps) ? summary.steps : [];
  const byCommand = new Map(steps.map((step: any) => [step.command, step]));
  if (
    expectedCommands.some((command) => !byCommand.has(command)) ||
    steps.length !== expectedCommands.length
  ) {
    reasons.push("incomplete-rows");
  }
  const pass = expectedCommands.filter(
    (command) => byCommand.get(command)?.status === "pass",
  ).length;
  return verdict(expectedCommands.length, pass, [...new Set(reasons)]);
}

export function evaluateScaffbenchEvidence(
  input: unknown,
  expectedSpecIds: readonly string[],
  context: SourceEvidenceContext,
): EvidenceVerdict {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return verdict(
      expectedSpecIds.length,
      0,
      input === null || input === undefined ? ["missing"] : ["unrecognized-version"],
    );
  }
  const summary = input as Record<string, any>;
  const metadata = summary.metadata ?? {};
  const results = Array.isArray(summary.results) ? summary.results : [];
  const reasons = sourceReasons(
    {
      schemaVersion: metadata.evidenceSchemaVersion,
      generatedAt: summary.generatedAt,
      gitHead: metadata.gitHead,
      workspaceClean: metadata.workspaceClean,
      overallSuccess: results.length > 0,
    },
    context,
  );
  if (metadata.environmentQualified !== true) reasons.push("environment-unqualified");
  if (
    metadata.generatorSource !== "workspace-local" ||
    metadata.generatorGitHead !== metadata.gitHead
  ) {
    reasons.push("generator-unbound");
  }
  if (
    typeof context.currentPackageVersion !== "string" ||
    metadata.bfGeneratorVersion !== context.currentPackageVersion
  ) {
    reasons.push("wrong-package-version");
  }
  const resultSpecIds = new Set(results.map((result: any) => result.specId));
  if (
    expectedSpecIds.some((id) => !resultSpecIds.has(id)) ||
    results.length !== expectedSpecIds.length
  ) {
    reasons.push("incomplete-rows");
  }
  let passed = 0;
  for (const result of results) {
    const validation = result?.validation;
    const steps =
      validation && typeof validation.steps === "object"
        ? (Object.values(validation.steps).filter(Boolean) as Array<Record<string, any>>)
        : [
            validation?.install,
            validation?.build,
            validation?.checkTypes,
            validation?.lint,
            validation?.format,
            validation?.test,
            validation?.doctor,
            validation?.route,
          ].filter(Boolean);
    const executed = steps.filter((step) => step.status === "ran");
    if (validation?.deferred) reasons.push("deferred-validation");
    if (executed.length === 0) reasons.push("no-executed-steps");
    if (steps.some((step) => step.status === "skip" || step.status === "na"))
      reasons.push("skipped-validation");
    if (
      result?.failureTags?.length > 0 ||
      validation?.projectExists === false ||
      steps.some((step) => step.status !== "ran" || step.exitCode !== 0 || step.timedOut === true)
    )
      reasons.push("failed-validation");
    if (
      !validation?.deferred &&
      validation?.projectExists !== false &&
      executed.length > 0 &&
      steps.every((step) => step.status === "ran" && step.exitCode === 0 && !step.timedOut) &&
      !(result?.failureTags?.length > 0)
    )
      passed += 1;
  }
  return verdict(expectedSpecIds.length, passed, [...new Set(reasons)]);
}

export function evaluatePublishedPackageEvidence(
  input: unknown,
  context: { now: Date; expectedVersion: string; maxAgeMs?: number },
): EvidenceVerdict {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return verdict(
      REQUIRED_MANAGERS.length,
      0,
      input === null || input === undefined ? ["missing"] : ["unrecognized-version"],
    );
  }
  const summary = input as Record<string, any>;
  const reasons: EvidenceReason[] = [];
  if (summary.schemaVersion !== EVIDENCE_SCHEMA_VERSION) reasons.push("unrecognized-version");
  if (
    summary.packageName !== PUBLISHED_PACKAGE_NAME ||
    summary.packageSpec !== `${PUBLISHED_PACKAGE_NAME}@${context.expectedVersion}`
  ) {
    reasons.push("wrong-package-identity");
  }
  if (summary.registry !== PUBLISHED_PACKAGE_REGISTRY) reasons.push("wrong-registry");
  if (typeof summary.specifier !== "string" || !EXACT_SEMVER.test(summary.specifier)) {
    reasons.push("non-exact-semver");
  } else if (summary.specifier !== context.expectedVersion) {
    reasons.push("wrong-package-version");
  }
  const generatedAt =
    typeof summary.generatedAt === "string" ? Date.parse(summary.generatedAt) : NaN;
  if (!Number.isFinite(generatedAt)) {
    reasons.push("invalid-timestamp");
  } else {
    const age = context.now.getTime() - generatedAt;
    if (age < 0) reasons.push("future-timestamp");
    if (age > (context.maxAgeMs ?? SOURCE_EVIDENCE_MAX_AGE_MS)) reasons.push("stale-timestamp");
  }
  const results = Array.isArray(summary.results) ? summary.results : [];
  const managers = new Set(results.map((result: any) => result.manager));
  const declaredManagers = new Set(Array.isArray(summary.managers) ? summary.managers : []);
  if (
    results.length !== REQUIRED_MANAGERS.length ||
    managers.size !== REQUIRED_MANAGERS.length ||
    declaredManagers.size !== REQUIRED_MANAGERS.length ||
    REQUIRED_MANAGERS.some((manager) => !managers.has(manager) || !declaredManagers.has(manager))
  )
    reasons.push("incomplete-package-managers");
  if (summary.overallSuccess !== true || results.some((result: any) => result.status !== "pass")) {
    reasons.push("unsuccessful");
  }
  const pass = REQUIRED_MANAGERS.filter(
    (manager) => results.find((result: any) => result.manager === manager)?.status === "pass",
  ).length;
  return verdict(REQUIRED_MANAGERS.length, pass, [...new Set(reasons)]);
}
