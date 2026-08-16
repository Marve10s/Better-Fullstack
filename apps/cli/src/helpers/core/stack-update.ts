import {
  EMBEDDED_TEMPLATES,
  generateVirtualProject,
  type VirtualFile,
  type VirtualFileTree,
  type VirtualNode,
} from "@better-fullstack/template-generator";
import { writeSelectedFiles } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { getDefaultConfig } from "../../constants";
import { CreateCommandOptionsSchema } from "../../create-command-input";
import {
  analyzeStackCompatibility,
  createStackPart,
  formatStackPartSpec,
  getToolingCapability,
  getToolingCategory,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  requiresChatSdkVercelAI,
  stackPartsToLegacyProjectConfigPartial,
  type BetterTStackConfig,
  type ProjectConfig,
} from "../../types";
import {
  buildBtsConfigForPersistence,
  readBtsConfig,
  writeBtsConfig,
} from "../../utils/bts-config";
import { validateConfigForProgrammaticUse } from "../../utils/config-validation";
import {
  applyDependencyVersionChannel,
  planDependencyVersionChannel,
  type DependencyVersionChannelRewrite,
} from "../../utils/dependency-version-channel";
import { formatCode } from "../../utils/file-formatter";
import { getEffectiveStack, getGraphSummary } from "../../utils/graph-summary";
import { getProjectRecoveryCommand } from "../../utils/lifecycle-command";
import { lifecycleResult, type LifecycleResult } from "../../utils/lifecycle-contract";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  markProjectTransactionWrite,
  rollbackProjectTransaction,
  type ProjectTransaction,
} from "../../utils/project-transaction";
import {
  collectStructuredBaselines,
  getCurrentLifecycleVersions,
  hashContent,
  readScaffoldManifest,
  refreshScaffoldManifestFiles,
  SCAFFOLD_MANIFEST_FILE,
} from "../../utils/scaffold-manifest";
import {
  asString,
  asStringArray,
  buildCompatibilityInputFromConfig,
  compatibilityChangesToProjectConfig,
  getCompatibilityBackend,
  hasSelectedTypeScriptBackendPart,
} from "../../utils/stack-compatibility";

type JsonObject = Record<string, unknown>;

type FileSnapshot = Pick<VirtualFile, "content" | "sourcePath">;

function toPosixPath(value: string): string {
  return value.replaceAll("\\", "/");
}

type StackUpdateOperation =
  | {
      kind: "add" | "replace";
      path: string;
      writeMode: "generated";
    }
  | {
      kind: "merge";
      path: string;
      writeMode: "content";
      content: string;
      summary: string[];
    }
  | {
      kind: "remove";
      path: string;
      writeMode: "remove";
    };

export type ArchitectureChange = {
  key: string;
  from: string;
  to: string;
};

export type StackUpdatePlan = {
  success: true;
  projectDir: string;
  requestedChanges: Record<string, unknown>;
  proposedConfig: BetterTStackConfig;
  filesToAdd: string[];
  filesToPatch: string[];
  filesToRemove: string[];
  filesUnchanged: string[];
  dependencyChanges: Record<string, Record<string, string>>;
  scriptChanges: Record<string, string[]>;
  envChanges: Record<string, string[]>;
  manualReviewBlockers: string[];
  architectureChanges: ArchitectureChange[];
  migrationSteps: string[];
  requiresArchitectureAck: boolean;
  operations: StackUpdateOperation[];
  preimages: Record<string, { sha256: string | null; mode: number | null }>;
  versionChannelRewrites: Record<string, string>;
  installCommand: string;
  compatibilityAdjustments: string[];
  graphSummary?: string;
  effectiveStack?: Record<string, string>;
  stackPartSpecs: string[];
  lifecycle: LifecycleResult;
  recoveryId?: string;
};

const PLANNED_VERSION_CHANNEL_REWRITES = Symbol("plannedVersionChannelRewrites");
type InternalStackUpdatePlan = StackUpdatePlan & {
  [PLANNED_VERSION_CHANNEL_REWRITES]?: readonly DependencyVersionChannelRewrite[];
};

export type StackUpdateResult =
  | StackUpdatePlan
  | {
      success: false;
      projectDir?: string;
      error: string;
      lifecycle?: LifecycleResult;
    };

export type StackUpdatePlanOptions = {
  replaceArrayKeys?: ReadonlySet<keyof ProjectConfig>;
  removeObsoleteGeneratedArtifacts?: boolean;
  stackPartsOverride?: readonly StackPart[];
  includeVersionChannelPaths?: boolean;
};

export function getStackUpdatePlanDigest(plan: StackUpdatePlan): string {
  return hashContent(
    JSON.stringify({
      requestedChanges: plan.requestedChanges,
      proposedConfig: plan.proposedConfig,
      operations: plan.operations,
      preimages: plan.preimages,
      versionChannelRewrites: plan.versionChannelRewrites,
      blockers: plan.manualReviewBlockers,
      architectureChanges: plan.architectureChanges,
    }),
  );
}

const ARRAY_UPDATE_KEYS = new Set<keyof ProjectConfig>([
  "frontend",
  "addons",
  "examples",
  "aiDocs",
  "rustLibraries",
  "pythonAi",
  "pythonTesting",
  "pythonCli",
  "pythonData",
  "goTesting",
  "javaLibraries",
  "javaTestingLibraries",
  "dotnetTesting",
  "dotnetObservability",
  "mobileLibraries",
  "dotnetLibraries",
  "elixirLibraries",
]);

const NON_STACK_UPDATE_CREATE_KEYS = new Set([
  "template",
  "fromHistory",
  "config",
  "yes",
  "yolo",
  "verbose",
  "dryRun",
  "verify",
  "git",
  "install",
  "directoryConflict",
  "renderTitle",
  "disableAnalytics",
  "manualDb",
  // Workspace shape is a create-time structural choice; converting an existing
  // project between monorepo and single-app is out of scope for stack updates.
  "workspaceShape",
]);

export const SUPPORTED_STACK_UPDATE_KEYS = Object.keys(CreateCommandOptionsSchema.shape)
  .filter((key) => !NON_STACK_UPDATE_CREATE_KEYS.has(key))
  .sort();

const SUPPORTED_STACK_UPDATE_KEY_SET = new Set(SUPPORTED_STACK_UPDATE_KEYS);
const IGNORED_REQUEST_KEYS = new Set([
  "projectDir",
  "projectName",
  "install",
  "git",
  "acknowledgeArchitectureChange",
]);

// Architecture-defining stack choices. Replacing a non-"none" value for one of
// these (a genuine swap, e.g. sqlite->postgres, drizzle->prisma, bun->workers,
// better-auth->none) requires an explicit acknowledgment because data/schema
// are NOT migrated automatically. Adding a brand-new choice (none->X) stays
// frictionless and is intentionally NOT gated.
const RISKY_ARCHITECTURE_KEYS: Array<keyof ProjectConfig> = [
  "database",
  "orm",
  "auth",
  "api",
  "backend",
  "runtime",
];
export const PACKAGE_JSON_SECTIONS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "scripts",
];
const BINARY_FILE_MARKER = "[Binary file]";

function isEnvFilePath(filePath: string): boolean {
  const name = path.basename(filePath);
  return name === ".env" || name.endsWith(".env.example");
}

function isSkippableGeneratedDoc(filePath: string): boolean {
  return path.basename(filePath).toLowerCase() === "readme.md";
}

function isGeneratedBinaryFile(file: VirtualFile | undefined): file is VirtualFile & {
  sourcePath: string;
} {
  return file?.content === BINARY_FILE_MARKER && typeof file.sourcePath === "string";
}

async function readGeneratedFileBytes(
  tree: VirtualFileTree,
  filePath: string,
  file: VirtualFile | undefined,
): Promise<Buffer | undefined> {
  if (!isGeneratedBinaryFile(file)) return undefined;
  const tempDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-stack-update-binary-"));
  try {
    const writtenFiles = await writeSelectedFiles(
      tree,
      tempDir,
      (candidatePath) => candidatePath === filePath,
    );
    if (!writtenFiles.includes(filePath)) return undefined;
    return await fs.readFile(path.join(tempDir, filePath));
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function buffersEqual(left: Buffer | undefined, right: Buffer | undefined): boolean {
  return Boolean(left && right && left.equals(right));
}

async function inferProjectName(projectDir: string): Promise<string> {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath).catch(() => null);
  if (packageJson && typeof packageJson.name === "string" && packageJson.name.trim()) {
    return packageJson.name.trim();
  }

  return path.basename(projectDir);
}

export function configFromBtsConfig(
  config: BetterTStackConfig,
  projectDir: string,
  projectName: string,
): ProjectConfig {
  return {
    ...getDefaultConfig(),
    ...config,
    projectName,
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;
}

function buildRequestedChanges(input: Record<string, unknown>): {
  changes: Partial<ProjectConfig>;
  stackPartSpecs: string[];
  unsupportedKeys: string[];
} {
  const changes: Record<string, unknown> = {};
  const stackPartSpecs: string[] = [];
  const unsupportedKeys: string[] = [];

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || IGNORED_REQUEST_KEYS.has(key)) continue;
    if (!SUPPORTED_STACK_UPDATE_KEY_SET.has(key)) {
      unsupportedKeys.push(key);
      continue;
    }
    if (key === "part") {
      if (Array.isArray(value)) {
        stackPartSpecs.push(...value.filter((item): item is string => typeof item === "string"));
      }
      continue;
    }
    changes[key] = value;
  }

  return { changes: changes as Partial<ProjectConfig>, stackPartSpecs, unsupportedKeys };
}

function mergeProjectConfig(
  currentConfig: ProjectConfig,
  requestedChanges: Partial<ProjectConfig>,
  options: StackUpdatePlanOptions = {},
): ProjectConfig {
  const next: ProjectConfig = { ...currentConfig };
  for (const [key, value] of Object.entries(requestedChanges) as [
    keyof ProjectConfig,
    ProjectConfig[keyof ProjectConfig],
  ][]) {
    if (value === undefined) continue;
    if (ARRAY_UPDATE_KEYS.has(key) && Array.isArray(value)) {
      const arrayValue = value as unknown[];
      const requested = arrayValue.filter(
        (item): item is string => typeof item === "string" && item !== "none",
      );
      if (options.replaceArrayKeys?.has(key)) {
        (next as Record<string, unknown>)[key] = requested;
      } else if (requested.length === 0 && arrayValue.includes("none")) {
        (next as Record<string, unknown>)[key] = [];
      } else {
        let existing = Array.isArray(next[key])
          ? (next[key] as string[]).filter((item) => item !== "none")
          : [];
        if (
          key === "addons" &&
          requested.some((item) => item === "turborepo" || item === "nx" || item === "vite-plus")
        ) {
          existing = existing.filter(
            (item) => item !== "turborepo" && item !== "nx" && item !== "vite-plus",
          );
        }
        (next as Record<string, unknown>)[key] = [...new Set([...existing, ...requested])];
      }
      continue;
    }
    (next as Record<string, unknown>)[key] = value;
  }
  return next;
}

function mergeStackPartSpecs(
  currentConfig: ProjectConfig,
  specs: string[],
): Partial<ProjectConfig> {
  if (specs.length === 0) return {};
  const currentStackParts = currentConfig.stackParts?.length
    ? currentConfig.stackParts
    : legacyProjectConfigToStackParts(currentConfig);
  const currentSpecs = currentStackParts
    .filter((part) => part.source !== "provided")
    .map((part) => formatStackPartSpec(part, currentStackParts));
  const combinedParts = parseStackPartSpecs([...new Set([...currentSpecs, ...specs])], "selected");
  const requestedKeys = new Set(
    specs.map((spec) => {
      const [rolePath = "", ecosystem = "", toolId = ""] = spec.split(":");
      return `${rolePath.split(".").pop()}:${ecosystem}:${toolId}`;
    }),
  );
  const requestedParts = combinedParts.filter(
    (part) =>
      part.source !== "provided" &&
      requestedKeys.has(`${part.role}:${part.ecosystem}:${part.toolId}`),
  );
  const requestedSingleCategories = new Set(
    requestedParts.flatMap((part) => {
      const capability = getToolingCapability(part.toolId);
      if (
        !capability ||
        capability.role !== part.role ||
        getToolingCategory(capability.category)?.selectionMode !== "single"
      ) {
        return [];
      }
      return [`${part.ownerPartId ?? "root"}:${capability.category}`];
    }),
  );
  const vitePlusOwnedCategories = ["workspaceRunner", "codeQuality", "gitHooks"] as const;
  if (requestedParts.some((part) => part.toolId === "vite-plus" && !part.ownerPartId)) {
    for (const category of vitePlusOwnedCategories) {
      requestedSingleCategories.add(`root:${category}`);
    }
  } else if (
    requestedParts.some((part) => {
      const category = getToolingCapability(part.toolId)?.category;
      return (
        !part.ownerPartId &&
        category !== undefined &&
        (vitePlusOwnedCategories as readonly string[]).includes(category)
      );
    })
  ) {
    requestedSingleCategories.add("root:toolchain");
  }
  const stackParts = combinedParts.filter((part) => {
    if (requestedParts.includes(part)) return true;
    const capability = getToolingCapability(part.toolId);
    if (!capability) return true;
    return !requestedSingleCategories.has(`${part.ownerPartId ?? "root"}:${capability.category}`);
  });
  return {
    ...stackPartsToLegacyProjectConfigPartial(stackParts),
    stackParts,
  };
}

type StackPart = NonNullable<ProjectConfig["stackParts"]>[number];

const GRAPH_CACHE_CONFIG_KEYS = new Set<string>(["stackParts", "graphSummary", "effectiveStack"]);

function stableJson(value: unknown): string {
  return JSON.stringify(value);
}

function getChangedConfigKeys(
  currentConfig: ProjectConfig,
  proposedConfig: ProjectConfig,
): Set<keyof ProjectConfig> {
  const keys = new Set<keyof ProjectConfig>([
    ...(Object.keys(currentConfig) as Array<keyof ProjectConfig>),
    ...(Object.keys(proposedConfig) as Array<keyof ProjectConfig>),
  ]);
  const changed = new Set<keyof ProjectConfig>();
  for (const key of keys) {
    if (GRAPH_CACHE_CONFIG_KEYS.has(key)) continue;
    if (stableJson(currentConfig[key]) !== stableJson(proposedConfig[key])) {
      changed.add(key);
    }
  }
  return changed;
}

function getProjectedConfigKeys(
  part: StackPart,
  parts: readonly StackPart[],
): Set<keyof ProjectConfig> {
  const owner = part.ownerPartId
    ? parts.find((candidate) => candidate.id === part.ownerPartId)
    : undefined;
  const partProjection = stackPartsToLegacyProjectConfigPartial(owner ? [owner, part] : [part]);
  const keys = new Set<keyof ProjectConfig>();
  for (const key of Object.keys(partProjection) as Array<keyof ProjectConfig>) {
    if (GRAPH_CACHE_CONFIG_KEYS.has(key)) continue;
    const value = partProjection[key];
    if (
      value === part.toolId ||
      (Array.isArray(value) && (value as unknown[]).includes(part.toolId))
    ) {
      keys.add(key);
    }
  }
  return keys;
}

function getUpdatedSpecForChangedPart(
  part: StackPart,
  parts: readonly StackPart[],
  proposedConfig: ProjectConfig,
  changedKeys: Set<keyof ProjectConfig>,
): string | undefined {
  const projectedKeys = getProjectedConfigKeys(part, parts);
  for (const key of projectedKeys) {
    if (!changedKeys.has(key)) continue;
    const value = proposedConfig[key];
    if (typeof value !== "string" || value === "none") continue;
    const currentCanonicalId = createStackPart({
      role: part.role,
      ecosystem: part.ecosystem,
      toolId: part.toolId,
    }).id;
    const updatedPart = {
      ...part,
      toolId: value,
      // Canonical primary IDs include the selected tool. Recompute those IDs
      // on replacement, while preserving explicit IDs for named services.
      id:
        !part.ownerPartId && part.id === currentCanonicalId
          ? createStackPart({ role: part.role, ecosystem: part.ecosystem, toolId: value }).id
          : part.id,
    };
    return formatStackPartSpec(updatedPart, parts);
  }
  return undefined;
}

function pruneScopedSpecsWithoutOwners(specs: string[]): string[] {
  const primaryRoles = new Set<string>();
  for (const spec of specs) {
    const rolePath = spec.split(":")[0];
    if (rolePath && !rolePath.includes(".")) {
      primaryRoles.add(rolePath);
    }
  }

  return specs.filter((spec) => {
    const rolePath = spec.split(":")[0];
    const ownerRole = rolePath?.split(".")[0];
    return !rolePath?.includes(".") || (ownerRole !== undefined && primaryRoles.has(ownerRole));
  });
}

function mergeDerivedStackPartsWithExistingGraph(
  currentConfig: ProjectConfig,
  proposedConfig: ProjectConfig,
): StackPart[] {
  const currentStackParts = currentConfig.stackParts?.length
    ? currentConfig.stackParts
    : legacyProjectConfigToStackParts(currentConfig);
  const derivedStackParts = legacyProjectConfigToStackParts(proposedConfig);
  if (currentStackParts.length === 0) return derivedStackParts;

  const changedKeys = getChangedConfigKeys(currentConfig, proposedConfig);
  const preservedParts = currentStackParts.filter((part) => {
    if (part.source === "provided") return false;
    if (part.toolId === "none") return false;
    const projectedKeys = getProjectedConfigKeys(part, currentStackParts);
    if (projectedKeys.size === 0) return true;
    return [...projectedKeys].every((key) => !changedKeys.has(key));
  });
  const updatedSpecs = currentStackParts
    .filter((part) => part.source !== "provided" && part.toolId !== "none")
    .flatMap((part) => {
      const spec = getUpdatedSpecForChangedPart(
        part,
        currentStackParts,
        proposedConfig,
        changedKeys,
      );
      return spec ? [spec] : [];
    });
  const preservedSpecs = new Set(
    preservedParts.map((part) => formatStackPartSpec(part, currentStackParts)),
  );
  const coveredSpecs = pruneScopedSpecsWithoutOwners([
    ...new Set([...preservedSpecs, ...updatedSpecs]),
  ]);
  const coveredParts = parseStackPartSpecs(coveredSpecs, "selected");
  const preservedProjectedKeys = new Set<keyof ProjectConfig>();
  for (const part of coveredParts) {
    for (const key of getProjectedConfigKeys(part, coveredParts)) {
      preservedProjectedKeys.add(key);
    }
  }

  const nextSpecs = [...coveredSpecs];
  for (const part of derivedStackParts) {
    if (part.source === "provided") continue;
    const spec = formatStackPartSpec(part, derivedStackParts);
    if (nextSpecs.includes(spec)) continue;
    const projectedKeys = getProjectedConfigKeys(part, derivedStackParts);
    const alreadyCovered = [...projectedKeys].some((key) => preservedProjectedKeys.has(key));
    if (!alreadyCovered) {
      nextSpecs.push(spec);
    }
  }

  return parseStackPartSpecs(pruneScopedSpecsWithoutOwners([...new Set(nextSpecs)]), "selected");
}

function preserveMatchingStackPartIdentity(
  parts: readonly StackPart[],
  previousParts: readonly StackPart[],
): StackPart[] {
  return parts.map((part) => {
    const previous = previousParts.find(
      (candidate) =>
        candidate.role === part.role &&
        candidate.ecosystem === part.ecosystem &&
        candidate.toolId === part.toolId &&
        candidate.ownerPartId === part.ownerPartId,
    );
    return previous ? { ...part, id: previous.id } : part;
  });
}

function computeArchitectureChanges(
  currentConfig: ProjectConfig,
  proposedConfig: ProjectConfig,
  includeScopedChanges: boolean,
): ArchitectureChange[] {
  const changes: ArchitectureChange[] = [];
  for (const key of RISKY_ARCHITECTURE_KEYS) {
    const from = asString(currentConfig[key]);
    const to = asString(proposedConfig[key]);
    // Gate only genuine REPLACEMENTS of an existing choice; additive none->X flows stay frictionless.
    if (from !== "none" && from !== to) {
      changes.push({ key: key as string, from, to });
    }
  }
  if (includeScopedChanges) {
    const currentParts = currentConfig.stackParts ?? [];
    const proposedParts = proposedConfig.stackParts ?? [];
    for (const part of currentParts) {
      if (
        !part.ownerPartId ||
        !RISKY_ARCHITECTURE_KEYS.includes(part.role as keyof ProjectConfig)
      ) {
        continue;
      }
      const proposedPart = proposedParts.find((candidate) => candidate.id === part.id);
      const to = proposedPart?.toolId ?? "none";
      if (part.toolId === to) continue;
      changes.push({ key: `${part.ownerPartId}.${part.role}`, from: part.toolId, to });
    }
  }
  return changes;
}

async function collectPlanPreimages(
  projectDir: string,
  relativePaths: Iterable<string>,
): Promise<Record<string, { sha256: string | null; mode: number | null }>> {
  const preimages: Record<string, { sha256: string | null; mode: number | null }> = {};
  for (const relativePath of [...new Set(relativePaths)].sort()) {
    const target = path.join(projectDir, relativePath);
    // oxlint-disable-next-line no-await-in-loop -- plan tokens bind each live preimage
    const stats = await fs.lstat(target).catch(() => null);
    if (!stats) {
      preimages[relativePath] = { sha256: null, mode: null };
      continue;
    }
    if (!stats.isFile()) {
      throw new Error(`Transaction target is not a regular file: ${relativePath}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- plan tokens bind each live preimage
    const bytes = await fs.readFile(target);
    preimages[relativePath] = { sha256: hashContent(bytes), mode: stats.mode & 0o7777 };
  }
  return preimages;
}

function buildMigrationSteps(changes: ArchitectureChange[]): string[] {
  const steps: string[] = [];
  for (const { key, from, to } of changes) {
    const label = `${key} (${from} -> ${to})`;
    const riskKey = key.includes(".") ? key.slice(key.lastIndexOf(".") + 1) : key;
    if (to === "none") {
      switch (riskKey) {
        case "database":
          steps.push(
            `${label}: Back up all existing data from the ${from} database before removing its integration.`,
            `${label}: Remove or replace DATABASE_URL references without deleting retained data automatically.`,
            `${label}: Remove ${from}-specific schemas, migrations, and queries only after confirming they are no longer needed.`,
          );
          break;
        case "orm":
          steps.push(
            `${label}: Preserve the ${from} schema and migration history before removing the ORM integration.`,
            `${label}: Replace or remove ${from} queries and generated clients manually.`,
          );
          break;
        case "auth":
          steps.push(
            `${label}: Export any user/account records and invalidate active sessions before removing ${from}.`,
            `${label}: Remove ${from} secrets, callbacks, and protected-route integration manually.`,
          );
          break;
        case "api":
          steps.push(
            `${label}: Remove or replace ${from} routers, handlers, client calls, and generated types manually.`,
          );
          break;
        default:
          steps.push(
            `${label}: Preserve required data and remove ${from}-specific code, configuration, and deployment wiring manually.`,
          );
      }
      continue;
    }
    switch (riskKey) {
      case "database":
        steps.push(
          `${label}: Back up all existing data from the ${from} database before making changes.`,
          `${label}: Provision a ${to} database and update DATABASE_URL in .env and .env.example.`,
          `${label}: Regenerate the schema for ${to} and create + run an initial migration.`,
          `${label}: Export rows from ${from} and import them into ${to} (data is NOT migrated automatically).`,
        );
        break;
      case "orm":
        steps.push(
          `${label}: Re-author the database schema/models using ${to} conventions.`,
          `${label}: Regenerate the ${to} client and create an initial ${to} migration.`,
          `${label}: Port existing ${from} queries and migration history to ${to}, then remove ${from} artifacts.`,
        );
        break;
      case "auth":
        steps.push(
          `${label}: Migrate existing user/account records into the ${to} schema.`,
          `${label}: Invalidate current sessions and update auth secrets/env vars for ${to}.`,
          `${label}: Update sign-in/sign-up flows and protected routes to use ${to}.`,
        );
        break;
      case "api":
        steps.push(
          `${label}: Port server routers/handlers from ${from} to ${to}.`,
          `${label}: Update client call sites and generated types to the ${to} client.`,
        );
        break;
      case "backend":
        steps.push(
          `${label}: Port the server entrypoint, routes, and middleware from ${from} to ${to}.`,
          `${label}: Reconcile runtime and deploy configuration for the ${to} server.`,
        );
        break;
      case "runtime":
        steps.push(
          `${label}: Update the runtime toolchain, scripts, and deploy target for ${to}.`,
          `${label}: Verify runtime-specific APIs and environment bindings behave correctly on ${to}.`,
        );
        break;
      default:
        steps.push(`${label}: Review and migrate affected code manually.`);
    }
  }
  return steps;
}

async function buildMigrationChecklistContent(
  projectDir: string,
  plan: StackUpdatePlan,
): Promise<string | null> {
  if (plan.architectureChanges.length === 0 || plan.migrationSteps.length === 0) return null;
  const migrationPath = path.join(projectDir, "MIGRATION.md");
  const timestamp = new Date().toISOString();
  const swaps = plan.architectureChanges
    .map((change) => `\`${change.key}\`: \`${change.from}\` -> \`${change.to}\``)
    .join(", ");
  const section = [
    `## Architecture change - ${timestamp}`,
    "",
    `Swapped: ${swaps}`,
    "",
    "Data and schema are NOT migrated automatically. Complete these steps manually:",
    "",
    ...plan.migrationSteps.map((step) => `- [ ] ${step}`),
  ].join("\n");

  if (await fs.pathExists(migrationPath)) {
    const existing = (await fs.readFile(migrationPath, "utf-8")).trimEnd();
    return `${existing}\n\n${section}\n`;
  }
  return `# Migration checklist\n\n${section}\n`;
}

function getDefaultDatabaseForDbSetup(
  dbSetup: ProjectConfig["dbSetup"],
): ProjectConfig["database"] | undefined {
  switch (dbSetup) {
    case "turso":
    case "d1":
      return "sqlite";
    case "neon":
    case "prisma-postgres":
    case "planetscale":
    case "supabase":
    case "docker":
      return "postgres";
    case "mongodb-atlas":
      return "mongodb";
    case "upstash":
      return "redis";
    default:
      return undefined;
  }
}

function getDefaultOrmForDatabase(
  database: ProjectConfig["database"],
): ProjectConfig["orm"] | undefined {
  switch (database) {
    case "sqlite":
    case "postgres":
    case "mysql":
      return "drizzle";
    case "mongodb":
      return "prisma";
    default:
      return undefined;
  }
}

function getRequiredCssFrameworkForUiLibrary(
  uiLibrary: ProjectConfig["uiLibrary"],
): ProjectConfig["cssFramework"] | undefined {
  switch (uiLibrary) {
    case "shadcn-ui":
    case "shadcn-svelte":
    case "daisyui":
    case "nextui":
    case "park-ui":
      return "tailwind";
    default:
      return undefined;
  }
}

function isBetterAuth(auth: ProjectConfig["auth"] | undefined): boolean {
  return auth === "better-auth" || auth === "better-auth-organizations";
}

function withNativeFrontendVariant(
  frontend: ProjectConfig["frontend"],
  nativeFrontend: string,
): ProjectConfig["frontend"] {
  const current = Array.isArray(frontend) ? frontend : [];
  const withoutNative = current.filter((item) => !item.startsWith("native-") && item !== "none");
  return [...withoutNative, nativeFrontend] as ProjectConfig["frontend"];
}

function withWebFrontendVariant(
  frontend: ProjectConfig["frontend"],
  webFrontend: string,
): ProjectConfig["frontend"] {
  const current = Array.isArray(frontend) ? frontend : [];
  const native = current.filter((item) => item.startsWith("native-"));
  return [webFrontend, ...native] as ProjectConfig["frontend"];
}

function hasRequestedNonNoneValue<T extends keyof ProjectConfig>(
  requestedChanges: Partial<ProjectConfig>,
  key: T,
): boolean {
  const value = requestedChanges[key];
  if (Array.isArray(value)) return value.some((item) => item !== "none");
  return value !== undefined && value !== "none";
}

function needsStandaloneBackendForRequestedUpdate(
  requestedChanges: Partial<ProjectConfig>,
): boolean {
  return (
    hasRequestedNonNoneValue(requestedChanges, "database") ||
    hasRequestedNonNoneValue(requestedChanges, "orm") ||
    hasRequestedNonNoneValue(requestedChanges, "dbSetup") ||
    hasRequestedNonNoneValue(requestedChanges, "api") ||
    isBetterAuth(requestedChanges.auth) ||
    hasRequestedNonNoneValue(requestedChanges, "payments") ||
    hasRequestedNonNoneValue(requestedChanges, "ecommerce") ||
    hasRequestedNonNoneValue(requestedChanges, "email") ||
    hasRequestedNonNoneValue(requestedChanges, "logging") ||
    hasRequestedNonNoneValue(requestedChanges, "observability") ||
    hasRequestedNonNoneValue(requestedChanges, "integrations") ||
    hasRequestedNonNoneValue(requestedChanges, "caching") ||
    hasRequestedNonNoneValue(requestedChanges, "rateLimit") ||
    hasRequestedNonNoneValue(requestedChanges, "jobQueue") ||
    hasRequestedNonNoneValue(requestedChanges, "realtime") ||
    hasRequestedNonNoneValue(requestedChanges, "search") ||
    hasRequestedNonNoneValue(requestedChanges, "vectorDb") ||
    hasRequestedNonNoneValue(requestedChanges, "fileStorage") ||
    hasRequestedNonNoneValue(requestedChanges, "serverDeploy")
  );
}

function getDefaultWebFrontendForRequestedUpdate(
  requestedChanges: Partial<ProjectConfig>,
): ProjectConfig["frontend"][number] | undefined {
  if (hasRequestedNonNoneValue(requestedChanges, "payments")) return "next";
  if (requestedChanges.i18n === "next-intl") return "next";
  if (requestedChanges.cms === "payload" || requestedChanges.cms === "keystatic") return "next";
  if (requestedChanges.uiLibrary === "shadcn-svelte") return "svelte";
  const requestedAddons = asStringArray(requestedChanges.addons);
  if (requestedAddons.some((addon) => addon === "pwa" || addon === "tauri")) return "react-vite";

  const needsWebFrontend =
    hasRequestedNonNoneValue(requestedChanges, "cssFramework") ||
    hasRequestedNonNoneValue(requestedChanges, "uiLibrary") ||
    hasRequestedNonNoneValue(requestedChanges, "forms") ||
    hasRequestedNonNoneValue(requestedChanges, "stateManagement") ||
    hasRequestedNonNoneValue(requestedChanges, "animation") ||
    hasRequestedNonNoneValue(requestedChanges, "fileUpload") ||
    hasRequestedNonNoneValue(requestedChanges, "i18n") ||
    hasRequestedNonNoneValue(requestedChanges, "cms") ||
    hasRequestedNonNoneValue(requestedChanges, "analytics") ||
    hasRequestedNonNoneValue(requestedChanges, "webDeploy") ||
    requestedChanges.ai === "tanstack-ai";

  return needsWebFrontend ? "react-vite" : undefined;
}

function getDefaultNativeFrontendForRequestedUpdate(
  requestedChanges: Partial<ProjectConfig>,
): ProjectConfig["frontend"][number] | undefined {
  if (requestedChanges.mobileUI === "uniwind" || requestedChanges.mobileUI === "unistyles") {
    return undefined;
  }

  const needsNativeFrontend =
    hasRequestedNonNoneValue(requestedChanges, "mobileNavigation") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileUI") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileStorage") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileTesting") ||
    hasRequestedNonNoneValue(requestedChanges, "mobilePush") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileOTA") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileDeepLinking") ||
    (requestedChanges.mobileLibraries?.some((value) => value !== "none") ?? false);

  return needsNativeFrontend ? "native-bare" : undefined;
}

function applyKnownDependencyExpansions(
  config: ProjectConfig,
  requestedChanges: Partial<ProjectConfig>,
): { config: ProjectConfig; adjustments: string[] } {
  const next = { ...config };
  const adjustments: string[] = [];
  const requestedKeys = new Set(Object.keys(requestedChanges));
  const currentFrontend = asStringArray(next.frontend);
  const hasWebFrontend = currentFrontend.some(
    (item) => !item.startsWith("native-") && item !== "none",
  );

  if (next.ecosystem === "typescript" && !hasWebFrontend && !requestedKeys.has("frontend")) {
    const defaultWebFrontend = getDefaultWebFrontendForRequestedUpdate(requestedChanges);
    if (defaultWebFrontend) {
      next.frontend = withWebFrontendVariant(next.frontend, defaultWebFrontend);
      adjustments.push(
        `frontend: Web frontend set to '${defaultWebFrontend}' (requested feature requires a web app)`,
      );
    }
  }

  if (next.ecosystem === "typescript" && !requestedKeys.has("frontend")) {
    const frontend = asStringArray(next.frontend);
    const hasNativeFrontend = frontend.some((item) => item.startsWith("native-"));
    const defaultNativeFrontend = getDefaultNativeFrontendForRequestedUpdate(requestedChanges);
    if (defaultNativeFrontend && !hasNativeFrontend) {
      next.frontend = withNativeFrontendVariant(next.frontend, defaultNativeFrontend);
      adjustments.push(
        `mobile: Native frontend set to '${defaultNativeFrontend}' (requested feature requires a native app)`,
      );
    }
  }

  if (
    next.ecosystem === "typescript" &&
    next.backend === "none" &&
    needsStandaloneBackendForRequestedUpdate(requestedChanges)
  ) {
    if (!requestedKeys.has("backend")) {
      next.backend = "hono";
      adjustments.push("backend: Backend set to 'hono' (requested feature requires a server)");
    }
    if (next.backend !== "none" && next.runtime === "none" && !requestedKeys.has("runtime")) {
      next.runtime = "bun";
      adjustments.push("backend: Runtime set to 'bun' (Hono server default)");
    }
  }

  if (
    hasRequestedNonNoneValue(requestedChanges, "orm") &&
    next.database === "none" &&
    !requestedKeys.has("database")
  ) {
    next.database = "sqlite";
    adjustments.push("orm: Database set to 'sqlite' (ORM requires a database)");
  }

  if (isBetterAuth(requestedChanges.auth) || requestedChanges.payments === "polar") {
    if (
      requestedChanges.payments === "polar" &&
      !isBetterAuth(next.auth) &&
      !requestedKeys.has("auth")
    ) {
      next.auth = "better-auth";
      adjustments.push("payments: Auth set to 'better-auth' (Polar requires Better Auth)");
    }
    if (next.database === "none" && !requestedKeys.has("database")) {
      next.database = "sqlite";
      const reason =
        requestedChanges.payments === "polar"
          ? "payments: Database set to 'sqlite' (Better Auth requires a SQL database)"
          : "auth: Database set to 'sqlite' (Better Auth requires a SQL database)";
      adjustments.push(reason);
    }
    if (next.orm === "none" && !requestedKeys.has("orm")) {
      next.orm = "drizzle";
      const reason =
        requestedChanges.payments === "polar"
          ? "payments: ORM set to 'drizzle' (Better Auth requires an adapter)"
          : "auth: ORM set to 'drizzle' (Better Auth requires an adapter)";
      adjustments.push(reason);
    }
  }

  if (requestedChanges.uiLibrary && requestedChanges.uiLibrary !== "none") {
    const requiredCssFramework = getRequiredCssFrameworkForUiLibrary(requestedChanges.uiLibrary);
    if (
      requiredCssFramework &&
      next.cssFramework !== requiredCssFramework &&
      !requestedKeys.has("cssFramework")
    ) {
      next.cssFramework = requiredCssFramework;
      adjustments.push(
        `uiLibrary: CSS framework set to '${requiredCssFramework}' (${requestedChanges.uiLibrary} requires Tailwind CSS)`,
      );
    }
  }

  if (requestedChanges.mobileUI === "uniwind" && !requestedKeys.has("frontend")) {
    const frontend = asStringArray(next.frontend);
    if (!frontend.includes("native-uniwind")) {
      next.frontend = withNativeFrontendVariant(next.frontend, "native-uniwind");
      adjustments.push(
        "mobileUI: Native frontend set to 'native-uniwind' (Uniwind mobile UI requires Expo + Uniwind)",
      );
    }
  }

  if (requestedChanges.mobileUI === "unistyles" && !requestedKeys.has("frontend")) {
    const frontend = asStringArray(next.frontend);
    if (!frontend.includes("native-unistyles")) {
      next.frontend = withNativeFrontendVariant(next.frontend, "native-unistyles");
      adjustments.push(
        "mobileUI: Native frontend set to 'native-unistyles' (Unistyles mobile UI requires Expo + Unistyles)",
      );
    }
  }

  if (requestedChanges.dbSetup && requestedChanges.dbSetup !== "none") {
    const defaultDatabase = getDefaultDatabaseForDbSetup(requestedChanges.dbSetup);
    if (defaultDatabase && next.database !== defaultDatabase && !requestedKeys.has("database")) {
      next.database = defaultDatabase;
      adjustments.push(
        `dbSetup: Database set to '${defaultDatabase}' (${requestedChanges.dbSetup} requires ${defaultDatabase})`,
      );
    }

    const defaultOrm = getDefaultOrmForDatabase(next.database);
    if (defaultOrm && next.orm === "none" && !requestedKeys.has("orm")) {
      next.orm = defaultOrm;
      adjustments.push(
        `dbSetup: ORM set to '${defaultOrm}' (${requestedChanges.dbSetup} requires a database adapter)`,
      );
    }
  }

  if (requestedChanges.dbSetup === "d1") {
    if (next.runtime !== "workers" && !requestedKeys.has("runtime")) {
      next.runtime = "workers";
      adjustments.push("dbSetup: Runtime set to 'workers' (D1 requires Workers)");
    }
    if (next.backend !== "hono" && !requestedKeys.has("backend")) {
      next.backend = "hono";
      adjustments.push("dbSetup: Backend set to 'hono' (Workers requires Hono)");
    }
  }

  if (requestedChanges.serverDeploy === "cloudflare") {
    if (next.backend === "hono" && next.runtime !== "workers" && !requestedKeys.has("runtime")) {
      next.runtime = "workers";
      adjustments.push("serverDeploy: Runtime set to 'workers' (Cloudflare requires Workers)");
    }
  }

  if (requestedChanges.serverDeploy === "netlify") {
    if (next.backend === "hono" && next.runtime !== "node" && !requestedKeys.has("runtime")) {
      next.runtime = "node";
      adjustments.push("serverDeploy: Runtime set to 'node' (Netlify Functions requires Node)");
    }
  }

  if (asStringArray(next.examples).includes("chat-sdk")) {
    const webFrontend = asStringArray(next.frontend).filter(
      (item) => !item.startsWith("native-") && item !== "none",
    );
    const compatibilityBackend = getCompatibilityBackend(next, webFrontend);
    if (
      compatibilityBackend === "hono" &&
      next.runtime !== "node" &&
      !requestedKeys.has("runtime")
    ) {
      next.runtime = "node";
      adjustments.push("examples: Runtime set to 'node' (Chat SDK Hono profile requires Node)");
    }
    if (
      requiresChatSdkVercelAI(buildCompatibilityInputFromConfig(next)) &&
      next.ai !== "vercel-ai" &&
      !requestedKeys.has("ai")
    ) {
      next.ai = "vercel-ai";
      adjustments.push("examples: AI SDK set to 'vercel-ai' (Chat SDK profile requires Vercel AI)");
    }
  }

  if (next.backend === "effect") {
    if (next.effect !== "effect-full" && !requestedKeys.has("effect")) {
      next.effect = "effect-full";
      adjustments.push(
        "effect: Effect services set to 'effect-full' (Effect backend requires Effect Platform + SQL)",
      );
    }
    if (next.validation !== "effect-schema" && !requestedKeys.has("validation")) {
      next.validation = "effect-schema";
      adjustments.push(
        "validation: Validation set to 'effect-schema' (Effect backend requires Effect Schema)",
      );
    }
  }

  return { config: next, adjustments };
}

export async function generateTree(config: ProjectConfig): Promise<VirtualFileTree> {
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!result.success || !result.tree) {
    throw new Error(result.error ?? "Failed to generate virtual project");
  }
  return result.tree;
}

export async function formatGeneratedTree(tree: VirtualFileTree): Promise<void> {
  const denoConfigDirs = new Set<string>();

  function collectDenoConfigDirs(nodes: VirtualNode[]) {
    for (const node of nodes) {
      if (node.type === "file") {
        if (node.name === "deno.json") {
          denoConfigDirs.add(path.posix.dirname(node.path));
        }
      } else {
        collectDenoConfigDirs(node.children);
      }
    }
  }

  function isUnderDenoConfig(filePath: string): boolean {
    return [...denoConfigDirs].some(
      (dir) => dir === "." || filePath === dir || filePath.startsWith(`${dir}/`),
    );
  }

  async function formatNodes(nodes: VirtualNode[]) {
    await Promise.all(
      nodes.map(async (node) => {
        if (node.type === "file") {
          if (node.content === BINARY_FILE_MARKER || isUnderDenoConfig(node.path)) return;
          const formatted = await formatCode(node.path, node.content);
          if (formatted) {
            node.content = formatted;
          }
          return;
        }
        await formatNodes(node.children);
      }),
    );
  }

  collectDenoConfigDirs(tree.root.children);
  await formatNodes(tree.root.children);
}

export function treeToFileMap(tree: VirtualFileTree): Map<string, VirtualFile> {
  const files = new Map<string, VirtualFile>();

  function walk(nodes: VirtualNode[]) {
    for (const node of nodes) {
      if (node.type === "file") {
        files.set(node.path, node);
      } else {
        walk(node.children);
      }
    }
  }

  walk(tree.root.children);
  return files;
}

function treeToFileSnapshotMap(tree: VirtualFileTree): Map<string, FileSnapshot> {
  const files = new Map<string, FileSnapshot>();

  function walk(nodes: VirtualNode[]) {
    for (const node of nodes) {
      if (node.type === "file") {
        files.set(node.path, {
          content: node.content,
          sourcePath: node.sourcePath,
        });
      } else {
        walk(node.children);
      }
    }
  }

  walk(tree.root.children);
  return files;
}

function uniqueContents(contents: Array<string | undefined>): string[] {
  return [...new Set(contents.filter((content): content is string => content !== undefined))];
}

function contentMatchesAny(content: string, candidates: readonly string[]): boolean {
  return candidates.some((candidate) => candidate === content);
}

function contentSetsIntersect(left: readonly string[], right: readonly string[]): boolean {
  return left.some((candidate) => right.includes(candidate));
}

function parseJson(content: string | undefined): JsonObject | null {
  if (!content) return null;
  try {
    const parsed = JSON.parse(content);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as JsonObject)
      : null;
  } catch {
    return null;
  }
}

function stringifyJson(data: JsonObject): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

function isPlainObject(value: unknown): value is JsonObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function diffJsonSection(
  current: JsonObject,
  previous: JsonObject,
  proposed: JsonObject,
  section: string,
  allowRemovals: boolean,
): { values: Record<string, string>; removals: string[]; blockers: string[] } {
  const previousSection = isPlainObject(previous[section]) ? previous[section] : {};
  const proposedSection = isPlainObject(proposed[section]) ? proposed[section] : {};
  const currentSection = isPlainObject(current[section]) ? current[section] : {};
  const values: Record<string, string> = {};
  const removals: string[] = [];
  const blockers: string[] = [];

  for (const [name, proposedValue] of Object.entries(proposedSection)) {
    if (previousSection[name] === proposedValue) continue;
    const currentValue = currentSection[name];
    // Any user-side divergence from the baseline blocks the key — including a
    // deletion (baseline had the key, the user removed it): re-adding it would
    // silently undo the user's edit. A key absent from both baseline and
    // current is a plain template addition and merges cleanly.
    if (currentValue !== previousSection[name]) {
      blockers.push(`${section}.${name}`);
      continue;
    }
    values[name] = String(proposedValue);
  }

  if (allowRemovals) {
    for (const [name, previousValue] of Object.entries(previousSection)) {
      if (name in proposedSection) continue;
      if (currentSection[name] !== previousValue) {
        blockers.push(`${section}.${name}`);
        continue;
      }
      removals.push(name);
    }
  }

  return { values, removals, blockers };
}

export function mergePackageJson(
  existingContent: string,
  previousContent: string | undefined,
  proposedContent: string,
  allowRemovals = false,
): {
  content?: string;
  summary: string[];
  blockers: string[];
  dependencyChanges: Record<string, Record<string, string>>;
  scriptChanges: string[];
} {
  const existing = parseJson(existingContent);
  const previous = parseJson(previousContent);
  const proposed = parseJson(proposedContent);
  if (!existing || !previous || !proposed) {
    return {
      summary: [],
      blockers: ["package.json is not valid JSON or has no generated baseline"],
      dependencyChanges: {},
      scriptChanges: [],
    };
  }

  const next = structuredClone(existing) as JsonObject;
  const summary: string[] = [];
  const blockers: string[] = [];
  const dependencyChanges: Record<string, Record<string, string>> = {};
  const scriptChanges: string[] = [];

  for (const section of PACKAGE_JSON_SECTIONS) {
    const diff = diffJsonSection(existing, previous, proposed, section, allowRemovals);
    blockers.push(...diff.blockers);
    if (Object.keys(diff.values).length === 0 && diff.removals.length === 0) continue;

    const target = isPlainObject(next[section]) ? { ...next[section] } : {};
    for (const name of diff.removals) delete target[name];
    for (const [name, value] of Object.entries(diff.values)) {
      target[name] = value;
    }
    next[section] = Object.fromEntries(
      Object.entries(target).sort(([a], [b]) => a.localeCompare(b)),
    );
    const changedNames = [...Object.keys(diff.values), ...diff.removals].sort();
    summary.push(`${section}: ${changedNames.join(", ")}`);
    if (section === "scripts") {
      scriptChanges.push(...changedNames);
    } else {
      dependencyChanges[section] = {
        ...diff.values,
        ...Object.fromEntries(diff.removals.map((name) => [name, "removed"])),
      };
    }
  }

  return {
    content: blockers.length === 0 && summary.length > 0 ? stringifyJson(next) : undefined,
    summary,
    blockers,
    dependencyChanges,
    scriptChanges,
  };
}

function parseEnvKeys(content: string): Set<string> {
  const keys = new Set<string>();
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (key) keys.add(key);
  }
  return keys;
}

export function mergeEnvExample(
  existingContent: string,
  previousContent: string | undefined,
  proposedContent: string,
): { content?: string; keys: string[] } {
  const existingKeys = parseEnvKeys(existingContent);
  const previousKeys = previousContent ? parseEnvKeys(previousContent) : new Set<string>();
  const nextLines: string[] = [];
  const keys: string[] = [];

  for (const line of proposedContent.split("\n")) {
    const trimmed = line.trim();
    const eq = trimmed.indexOf("=");
    if (!trimmed || trimmed.startsWith("#") || eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!key || previousKeys.has(key) || existingKeys.has(key)) continue;
    nextLines.push(line);
    keys.push(key);
  }

  if (nextLines.length === 0) return { keys };
  const separator = existingContent.endsWith("\n") ? "" : "\n";
  return { content: `${existingContent}${separator}${nextLines.join("\n")}\n`, keys };
}

function collectEnvReferences(content: string | undefined): Set<string> {
  const keys = new Set<string>();
  if (!content) return keys;

  const patterns = [
    /\bprocess\.env\.([A-Z][A-Z0-9_]*)/g,
    /\bDeno\.env\.get\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bSystem\.getenv\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bstd::env::var\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bos\.Getenv\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bos\.environ\[\s*["']([A-Z][A-Z0-9_]*)["']\s*\]/g,
    /\bos\.getenv\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /^([A-Z][A-Z0-9_]*)=/gm,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      if (match[1]) keys.add(match[1]);
    }
  }

  return keys;
}

function collectImplicitEnvKeys(config: ProjectConfig): string[] {
  const keys = new Set<string>();

  if (config.email === "resend") {
    keys.add("RESEND_API_KEY");
    keys.add("RESEND_FROM_EMAIL");
  }

  if (config.observability === "sentry") {
    keys.add("SENTRY_DSN");
  }

  return [...keys].sort();
}

function recordEnvReferenceChanges(
  envChanges: Record<string, string[]>,
  filePath: string,
  previousContent: string | undefined,
  proposedContent: string,
) {
  const previous = collectEnvReferences(previousContent);
  const proposed = collectEnvReferences(proposedContent);
  const added = [...proposed].filter((key) => !previous.has(key)).sort();
  if (added.length > 0) {
    envChanges[filePath] = [...new Set([...(envChanges[filePath] ?? []), ...added])].sort();
  }
}

function appendMissingEnvKeys(
  content: string,
  keys: readonly string[],
): { content?: string; keys: string[] } {
  const existingKeys = parseEnvKeys(content);
  const missing = keys.filter((key) => !existingKeys.has(key));
  if (missing.length === 0) return { keys: [] };

  const separator = content.trim().length === 0 ? "" : content.endsWith("\n") ? "\n" : "\n\n";
  return {
    content: `${content}${separator}${missing.map((key) => `${key}=`).join("\n")}\n`,
    keys: missing,
  };
}

async function addMissingEnvExampleOperation(options: {
  projectDir: string;
  proposedGeneratedFiles: Map<string, VirtualFile>;
  operations: StackUpdateOperation[];
  filesToAdd: string[];
  filesToPatch: string[];
  envChanges: Record<string, string[]>;
  proposedConfig: ProjectConfig;
}) {
  const requiredKeys = [
    ...new Set([
      ...Object.entries(options.envChanges)
        .filter(([filePath]) => !isEnvFilePath(filePath))
        .flatMap(([, keys]) => keys),
      ...collectImplicitEnvKeys(options.proposedConfig),
    ]),
  ].sort();
  if (requiredKeys.length === 0) return;

  const candidatePaths = new Set([
    "apps/server/.env.example",
    ".env.example",
    ...[...options.proposedGeneratedFiles.keys()].filter(isEnvFilePath),
  ]);
  let targetPath: string | undefined;
  for (const candidate of candidatePaths) {
    if (
      options.proposedGeneratedFiles.has(candidate) ||
      (await fs.pathExists(path.join(options.projectDir, candidate)))
    ) {
      targetPath = candidate;
      break;
    }
  }
  if (!targetPath) return;

  const existingOperation = options.operations.find(
    (operation): operation is Extract<StackUpdateOperation, { writeMode: "content" }> =>
      operation.path === targetPath && operation.writeMode === "content",
  );
  const targetFilePath = path.join(options.projectDir, targetPath);
  const existingContent =
    existingOperation?.content ??
    ((await fs.pathExists(targetFilePath)) ? await fs.readFile(targetFilePath, "utf-8") : "");
  const merged = appendMissingEnvKeys(existingContent, requiredKeys);
  if (!merged.content) return;

  if (existingOperation) {
    existingOperation.content = merged.content;
    existingOperation.summary = [
      ...existingOperation.summary,
      `env refs: ${merged.keys.join(", ")}`,
    ];
  } else {
    options.operations.push({
      kind: "merge",
      path: targetPath,
      writeMode: "content",
      content: merged.content,
      summary: [`env refs: ${merged.keys.join(", ")}`],
    });
  }

  if (await fs.pathExists(targetFilePath)) {
    options.filesToPatch.push(targetPath);
  } else {
    options.filesToAdd.push(targetPath);
  }
  options.envChanges[targetPath] = [
    ...new Set([...(options.envChanges[targetPath] ?? []), ...merged.keys]),
  ].sort();
}

function getInstallCommand(config: ProjectConfig): string {
  switch (config.ecosystem) {
    case "rust":
      return "cargo build";
    case "python": {
      if (config.pythonPackageManager === "poetry") return "poetry install --extras dev";
      if (config.pythonPackageManager === "none") {
        const python = process.platform === "win32" ? "python" : "python3";
        const pip = process.platform === "win32" ? ".venv\\Scripts\\pip" : ".venv/bin/pip";
        return `${python} -m venv .venv && ${pip} install -e ".[dev]"`;
      }
      return "uv sync --extra dev";
    }
    case "go":
      return "go mod tidy";
    case "java":
      return config.javaBuildTool === "gradle" ? "./gradlew test" : "./mvnw test";
    case "elixir":
      return "mix deps.get && mix compile";
    default:
      return config.packageManager === "npm" ? "npm install" : `${config.packageManager} install`;
  }
}

function getGraphPreview(config: BetterTStackConfig) {
  const stackParts = config.stackParts?.length
    ? config.stackParts
    : legacyProjectConfigToStackParts(config);
  const graphSummary = stackParts.length > 0 ? getGraphSummary({ stackParts }) : undefined;
  const effectiveStack = stackParts.length > 0 ? getEffectiveStack({ stackParts }) : undefined;
  const stackPartSpecs = stackParts
    .filter((part) => part.source !== "provided" && part.toolId !== "none")
    .map((part) => formatStackPartSpec(part, stackParts));

  return {
    ...(graphSummary ? { graphSummary, effectiveStack } : {}),
    stackPartSpecs,
  };
}

export async function planStackUpdate(
  projectDirInput: string,
  input: Record<string, unknown>,
  options: StackUpdatePlanOptions = {},
): Promise<StackUpdateResult> {
  const projectDir = path.resolve(projectDirInput);
  const currentBtsConfig = await readBtsConfig(projectDir);
  if (!currentBtsConfig) {
    return {
      success: false,
      projectDir,
      error: `No bts.jsonc found in ${projectDir}. Is this a Better-Fullstack project?`,
    };
  }
  const manifest = await readScaffoldManifest(projectDir);

  const projectName = await inferProjectName(projectDir);
  const currentConfig = configFromBtsConfig(currentBtsConfig, projectDir, projectName);
  const {
    changes: requestedChanges,
    stackPartSpecs,
    unsupportedKeys,
  } = buildRequestedChanges(input);
  if (unsupportedKeys.length > 0) {
    return {
      success: false,
      projectDir,
      error: `Unsupported stack update field(s): ${unsupportedKeys.sort().join(", ")}`,
    };
  }

  if (
    requestedChanges.integrations === "nango" &&
    currentConfig.ecosystem !== "typescript" &&
    !hasSelectedTypeScriptBackendPart(currentConfig)
  ) {
    return {
      success: false,
      projectDir,
      error: "Invalid stack update: Nango integrations require a TypeScript backend",
    };
  }

  let proposedConfig = mergeProjectConfig(currentConfig, requestedChanges, options);
  const dependencyExpansion = applyKnownDependencyExpansions(proposedConfig, requestedChanges);
  proposedConfig = dependencyExpansion.config;
  const shouldApplyCompatibilityAdjustments =
    proposedConfig.ecosystem === "typescript" || proposedConfig.ecosystem === "react-native";
  const compatibilityResult = shouldApplyCompatibilityAdjustments
    ? analyzeStackCompatibility(buildCompatibilityInputFromConfig(proposedConfig))
    : { adjustedStack: null, changes: [] };
  const compatibilityAdjustments = [
    ...dependencyExpansion.adjustments,
    ...compatibilityResult.changes.map((change) => `${change.category}: ${change.message}`),
  ];
  if (compatibilityResult.adjustedStack) {
    proposedConfig = mergeProjectConfig(
      proposedConfig,
      compatibilityChangesToProjectConfig(compatibilityResult.adjustedStack),
    );
  }
  proposedConfig.stackParts = options.stackPartsOverride
    ? [...options.stackPartsOverride]
    : mergeDerivedStackPartsWithExistingGraph(currentConfig, proposedConfig);
  Object.assign(proposedConfig, mergeStackPartSpecs(proposedConfig, stackPartSpecs));

  if (options.stackPartsOverride) {
    const graphProjectedConfig = configFromBtsConfig(
      buildBtsConfigForPersistence(proposedConfig, {
        version: currentBtsConfig.version,
        createdAt: currentBtsConfig.createdAt,
      }),
      projectDir,
      projectName,
    );
    const finalCompatibilityResult = shouldApplyCompatibilityAdjustments
      ? analyzeStackCompatibility(buildCompatibilityInputFromConfig(graphProjectedConfig))
      : { adjustedStack: null, changes: [] };
    compatibilityAdjustments.push(
      ...finalCompatibilityResult.changes.map((change) => `${change.category}: ${change.message}`),
    );
    if (finalCompatibilityResult.adjustedStack) {
      const adjustedConfig = mergeProjectConfig(
        graphProjectedConfig,
        compatibilityChangesToProjectConfig(finalCompatibilityResult.adjustedStack),
      );
      adjustedConfig.stackParts = preserveMatchingStackPartIdentity(
        mergeDerivedStackPartsWithExistingGraph(proposedConfig, adjustedConfig),
        proposedConfig.stackParts ?? [],
      );
      proposedConfig = adjustedConfig;
    }
  }
  try {
    validateConfigForProgrammaticUse(proposedConfig);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: `Invalid stack update: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  const persistedProposedConfig = buildBtsConfigForPersistence(proposedConfig, {
    version: currentBtsConfig.version,
    createdAt: currentBtsConfig.createdAt,
  });
  const normalizedProposedConfig = configFromBtsConfig(
    persistedProposedConfig,
    projectDir,
    projectName,
  );

  let currentTree: VirtualFileTree;
  let proposedTree: VirtualFileTree;
  try {
    [currentTree, proposedTree] = await Promise.all([
      generateTree(currentConfig),
      generateTree(normalizedProposedConfig),
    ]);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: `Failed to generate stack update plan: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
  const currentRawGeneratedFiles = treeToFileSnapshotMap(currentTree);
  const proposedRawGeneratedFiles = treeToFileSnapshotMap(proposedTree);
  await Promise.all([formatGeneratedTree(currentTree), formatGeneratedTree(proposedTree)]);
  const currentGeneratedFiles = treeToFileMap(currentTree);
  const proposedGeneratedFiles = treeToFileMap(proposedTree);

  const operations: StackUpdateOperation[] = [];
  const filesToAdd: string[] = [];
  const filesToPatch: string[] = [];
  const filesToRemove: string[] = [];
  const filesUnchanged: string[] = [];
  const manualReviewBlockers: string[] = [];
  const dependencyChanges: Record<string, Record<string, string>> = {};
  const scriptChanges: Record<string, string[]> = {};
  const envChanges: Record<string, string[]> = {};

  const proposedFileEntries = await Promise.all(
    [...proposedGeneratedFiles].map(async ([filePath, proposedFile]) => {
      const existingPath = path.join(projectDir, filePath);
      const exists = await fs.pathExists(existingPath);
      const existingBuffer = exists
        ? await fs.readFile(existingPath).catch(() => undefined)
        : undefined;
      return { filePath, proposedFile, exists, existingBuffer };
    }),
  );

  for (const { filePath, proposedFile, exists, existingBuffer } of proposedFileEntries) {
    const previousFile = currentGeneratedFiles.get(filePath);
    const previousRawFile = currentRawGeneratedFiles.get(filePath);
    const proposedRawFile = proposedRawGeneratedFiles.get(filePath);
    const proposedContent = proposedFile.content;
    const previousContent = previousFile?.content;
    const recordedBaseline = manifest?.baselines?.[filePath];
    const currentBaselineContents = uniqueContents([
      recordedBaseline,
      previousRawFile?.content,
      previousContent,
    ]);
    const proposedBaselineContents = uniqueContents([proposedRawFile?.content, proposedContent]);
    const isBinaryFile = isGeneratedBinaryFile(proposedFile) || isGeneratedBinaryFile(previousFile);
    const existingContent =
      exists && existingBuffer && !isBinaryFile ? existingBuffer.toString("utf-8") : undefined;

    if (!exists) {
      filesToAdd.push(filePath);
      operations.push({ kind: "add", path: filePath, writeMode: "generated" });
      if (isEnvFilePath(filePath)) {
        envChanges[filePath] = [...parseEnvKeys(proposedContent)].sort();
      }
      recordEnvReferenceChanges(envChanges, filePath, undefined, proposedContent);
      continue;
    }

    if (isBinaryFile) {
      const [previousBinaryContent, proposedBinaryContent] = await Promise.all([
        readGeneratedFileBytes(currentTree, filePath, previousFile),
        readGeneratedFileBytes(proposedTree, filePath, proposedFile),
      ]);

      if (buffersEqual(existingBuffer, proposedBinaryContent)) {
        filesUnchanged.push(filePath);
        continue;
      }

      if (buffersEqual(existingBuffer, previousBinaryContent)) {
        filesToPatch.push(filePath);
        operations.push({ kind: "replace", path: filePath, writeMode: "generated" });
        continue;
      }

      manualReviewBlockers.push(
        `${filePath}: existing binary file differs from the generated baseline`,
      );
      continue;
    }

    if (
      existingContent === undefined ||
      contentMatchesAny(existingContent, proposedBaselineContents)
    ) {
      filesUnchanged.push(filePath);
      continue;
    }

    if (filePath.endsWith("package.json")) {
      const merged = mergePackageJson(
        existingContent,
        recordedBaseline ?? previousContent,
        proposedContent,
        options.removeObsoleteGeneratedArtifacts,
      );
      for (const blocker of merged.blockers) {
        manualReviewBlockers.push(`${filePath}: ${blocker}`);
      }
      if (merged.content) {
        filesToPatch.push(filePath);
        operations.push({
          kind: "merge",
          path: filePath,
          writeMode: "content",
          content: merged.content,
          summary: merged.summary,
        });
        for (const [section, values] of Object.entries(merged.dependencyChanges)) {
          dependencyChanges[`${filePath}:${section}`] = values;
        }
        if (merged.scriptChanges.length > 0) {
          scriptChanges[filePath] = merged.scriptChanges;
        }
      }
      continue;
    }

    if (isEnvFilePath(filePath)) {
      const merged = mergeEnvExample(existingContent, previousContent, proposedContent);
      if (merged.content) {
        filesToPatch.push(filePath);
        operations.push({
          kind: "merge",
          path: filePath,
          writeMode: "content",
          content: merged.content,
          summary: [`env: ${merged.keys.join(", ")}`],
        });
        envChanges[filePath] = merged.keys;
      }
      continue;
    }

    if (
      existingContent !== undefined &&
      contentMatchesAny(existingContent, currentBaselineContents)
    ) {
      if (contentSetsIntersect(currentBaselineContents, proposedBaselineContents)) {
        filesUnchanged.push(filePath);
        continue;
      }

      filesToPatch.push(filePath);
      operations.push({ kind: "replace", path: filePath, writeMode: "generated" });
      recordEnvReferenceChanges(envChanges, filePath, previousContent, proposedContent);
      continue;
    }

    if (isSkippableGeneratedDoc(filePath)) {
      continue;
    }

    manualReviewBlockers.push(`${filePath}: existing file differs from the generated baseline`);
  }

  if (options.removeObsoleteGeneratedArtifacts) {
    for (const filePath of currentGeneratedFiles.keys()) {
      if (proposedGeneratedFiles.has(filePath)) continue;
      const targetPath = path.join(projectDir, filePath);
      let existingBuffer: Buffer;
      try {
        // oxlint-disable-next-line no-await-in-loop -- each candidate needs its live preimage
        existingBuffer = await fs.readFile(targetPath);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
        manualReviewBlockers.push(
          `${filePath}: obsolete generated file could not be read: ${error instanceof Error ? error.message : String(error)}`,
        );
        continue;
      }
      if (manifest?.provenance.state !== "verified") {
        manualReviewBlockers.push(
          `${filePath}: obsolete generated file has no verified scaffold provenance`,
        );
        continue;
      }
      const baselineHash = manifest.hashes[filePath];
      if (!baselineHash) {
        manualReviewBlockers.push(`${filePath}: obsolete generated file has no recorded baseline`);
        continue;
      }
      if (hashContent(existingBuffer) === baselineHash) {
        filesToRemove.push(filePath);
        operations.push({ kind: "remove", path: filePath, writeMode: "remove" });
      } else {
        manualReviewBlockers.push(
          `${filePath}: obsolete generated file differs from the generated baseline`,
        );
      }
    }
  }

  await addMissingEnvExampleOperation({
    projectDir,
    proposedGeneratedFiles,
    operations,
    filesToAdd,
    filesToPatch,
    envChanges,
    proposedConfig: normalizedProposedConfig,
  });

  const graphPreview = getGraphPreview(persistedProposedConfig);
  const architectureChanges = computeArchitectureChanges(
    currentConfig,
    proposedConfig,
    options.stackPartsOverride !== undefined,
  );
  const migrationSteps = buildMigrationSteps(architectureChanges);
  const uniqueFilesToAdd = [...new Set(filesToAdd)].sort();
  const uniqueFilesToPatch = [...new Set(filesToPatch)].sort();
  const uniqueFilesToRemove = [...new Set(filesToRemove)].sort();
  const projectedPackageJsonContents = new Map<string, string | null>();
  for (const operation of operations) {
    if (!operation.path.endsWith("package.json")) continue;
    const packageJsonPath = path.join(projectDir, operation.path);
    if (operation.writeMode === "remove") {
      projectedPackageJsonContents.set(packageJsonPath, null);
    } else if (operation.writeMode === "content") {
      projectedPackageJsonContents.set(packageJsonPath, operation.content);
    } else {
      const generatedFile = proposedGeneratedFiles.get(operation.path);
      if (generatedFile) projectedPackageJsonContents.set(packageJsonPath, generatedFile.content);
    }
  }
  const plannedVersionChannelRewrites =
    options.includeVersionChannelPaths && proposedConfig.versionChannel !== "stable"
      ? await planDependencyVersionChannel(
          projectDir,
          proposedConfig.versionChannel,
          projectedPackageJsonContents,
        )
      : [];
  const versionChannelRewrites = Object.fromEntries(
    plannedVersionChannelRewrites.map((rewrite) => [
      toPosixPath(path.relative(projectDir, rewrite.packageJsonPath)),
      rewrite.sha256,
    ]),
  );
  let preimages: Record<string, { sha256: string | null; mode: number | null }>;
  try {
    preimages = await collectPlanPreimages(projectDir, [
      ...operations.map((operation) => operation.path),
      "bts.jsonc",
      SCAFFOLD_MANIFEST_FILE,
      ...(architectureChanges.length > 0 ? ["MIGRATION.md"] : []),
      ...Object.keys(versionChannelRewrites),
    ]);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: `Could not bind the stack update plan to safe transaction targets: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
  const plan: InternalStackUpdatePlan = {
    success: true,
    projectDir,
    requestedChanges: requestedChanges as Record<string, unknown>,
    proposedConfig: persistedProposedConfig,
    filesToAdd: uniqueFilesToAdd,
    filesToPatch: uniqueFilesToPatch,
    filesToRemove: uniqueFilesToRemove,
    filesUnchanged: [...new Set(filesUnchanged)].sort(),
    dependencyChanges,
    scriptChanges,
    envChanges,
    manualReviewBlockers,
    architectureChanges,
    migrationSteps,
    requiresArchitectureAck: architectureChanges.length > 0,
    operations,
    preimages,
    versionChannelRewrites,
    installCommand: getInstallCommand(normalizedProposedConfig),
    compatibilityAdjustments,
    lifecycle: lifecycleResult({
      operation: "stack-update",
      status: manualReviewBlockers.length > 0 ? "blocked" : "planned",
      projectDir,
      changes: {
        added: uniqueFilesToAdd.length,
        patched: uniqueFilesToPatch.length,
        removed: uniqueFilesToRemove.length,
        manual: manualReviewBlockers.length,
      },
      warnings: migrationSteps,
      blockers: manualReviewBlockers,
      provenance: {
        source: manifest?.provenance.current ?? null,
        target: getCurrentLifecycleVersions(),
        verified: manifest?.provenance.state === "verified",
      },
      recovery: { available: true, automaticRollback: true },
      nextActions: ["Review the complete plan before apply."],
    }),
    ...graphPreview,
  };
  Object.defineProperty(plan, PLANNED_VERSION_CHANNEL_REWRITES, {
    value: plannedVersionChannelRewrites,
  });
  return plan;
}

export async function applyStackUpdate(
  projectDirInput: string,
  input: Record<string, unknown>,
  options: {
    beforeManifestRefresh?: () => void | Promise<void>;
    operation?: "add" | "remove" | "stack-update";
    replaceArrayKeys?: ReadonlySet<keyof ProjectConfig>;
    removeObsoleteGeneratedArtifacts?: boolean;
    stackPartsOverride?: readonly StackPart[];
    expectedPlanDigest?: string;
    applyVersionChannel?: boolean;
    beforeTransactionSnapshot?: () => void | Promise<void>;
    beforeMutation?: () => void | Promise<void>;
  } = {},
): Promise<StackUpdateResult> {
  const lifecycleOperation = options.operation ?? "stack-update";
  const plan = await planStackUpdate(projectDirInput, input, {
    replaceArrayKeys: options.replaceArrayKeys,
    removeObsoleteGeneratedArtifacts: options.removeObsoleteGeneratedArtifacts,
    stackPartsOverride: options.stackPartsOverride,
    includeVersionChannelPaths: options.applyVersionChannel,
  });
  if (!plan.success) return plan;
  if (options.expectedPlanDigest && getStackUpdatePlanDigest(plan) !== options.expectedPlanDigest) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error: "The reviewed stack update plan is stale. Re-plan before applying.",
    };
  }
  if (plan.manualReviewBlockers.length > 0) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error: `Manual review required before applying stack update: ${plan.manualReviewBlockers.join("; ")}`,
    };
  }

  const acknowledgeArchitectureChange = input.acknowledgeArchitectureChange === true;
  if (plan.requiresArchitectureAck && !acknowledgeArchitectureChange) {
    const swaps = plan.architectureChanges
      .map((change) => `${change.key}: ${change.from} -> ${change.to}`)
      .join("; ");
    const checklist = plan.migrationSteps.map((step) => `  - ${step}`).join("\n");
    return {
      success: false,
      projectDir: plan.projectDir,
      error:
        `This architecture change requires acknowledgment before it can be applied. ` +
        `It replaces existing architecture-defining choices (${swaps}); data and schema are NOT migrated automatically. ` +
        `Re-run with acknowledgeArchitectureChange: true (MCP) or --acknowledge-architecture-change (CLI) after reviewing the migration checklist:\n${checklist}`,
    };
  }

  const projectName = await inferProjectName(plan.projectDir);
  const proposedConfig = configFromBtsConfig(plan.proposedConfig, plan.projectDir, projectName);
  const proposedTree = await generateTree(proposedConfig);
  await formatGeneratedTree(proposedTree);
  const generatedPaths = new Set(
    plan.operations
      .filter((operation) => operation.writeMode === "generated")
      .map((operation) => operation.path),
  );
  const transactionPaths = Object.keys(plan.preimages);
  let transaction: ProjectTransaction;
  try {
    await options.beforeTransactionSnapshot?.();
    transaction = await beginProjectTransaction(
      plan.projectDir,
      lifecycleOperation,
      transactionPaths,
    );
  } catch (error) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error: `Could not create the recovery snapshot: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  try {
    const staleReviewedPreimages = transaction.metadata.files.filter((file) => {
      const reviewed = plan.preimages[file.path];
      if (!reviewed) return true;
      if (file.state === "absent") return reviewed.sha256 !== null || reviewed.mode !== null;
      return file.sha256 !== reviewed.sha256 || (file.mode ?? null) !== reviewed.mode;
    });
    if (staleReviewedPreimages.length > 0) {
      throw new Error(
        `The reviewed stack update preimages changed before the recovery snapshot: ${staleReviewedPreimages
          .map((file) => file.path)
          .join(", ")}. Re-plan before applying.`,
      );
    }
    await options.beforeMutation?.();
    const livePreimages = await collectPlanPreimages(plan.projectDir, transactionPaths);
    const stalePreimages = transaction.metadata.files.filter((file) => {
      const live = livePreimages[file.path];
      if (!live) return true;
      if (file.state === "absent") return live.sha256 !== null || live.mode !== null;
      return file.sha256 !== live.sha256 || (file.mode ?? null) !== live.mode;
    });
    if (stalePreimages.length > 0) {
      throw new Error(
        `The reviewed stack update preimages changed before apply: ${stalePreimages
          .map((file) => file.path)
          .join(", ")}. Re-plan before applying.`,
      );
    }

    if (generatedPaths.size > 0) {
      const generatedFiles = treeToFileMap(proposedTree);
      for (const filePath of generatedPaths) {
        const file = generatedFiles.get(filePath);
        if (!file) throw new Error(`Generated transaction output is missing: ${filePath}`);
        // oxlint-disable-next-line no-await-in-loop -- binary templates are materialized individually
        const binaryBytes = await readGeneratedFileBytes(proposedTree, filePath, file);
        const expectedBytes = binaryBytes ?? Buffer.from(file.content, "utf-8");
        markProjectTransactionWrite(transaction, filePath, hashContent(expectedBytes));
      }
      await writeSelectedFiles(proposedTree, plan.projectDir, (filePath) =>
        generatedPaths.has(filePath),
      );
    }

    for (const operation of plan.operations.filter(
      (candidate) => candidate.writeMode === "content",
    )) {
      markProjectTransactionWrite(
        transaction,
        operation.path,
        hashContent(Buffer.from(operation.content, "utf-8")),
      );
      const targetPath = path.join(plan.projectDir, operation.path);
      // oxlint-disable-next-line no-await-in-loop -- rollback must wait for each bound write
      await fs.ensureDir(path.dirname(targetPath));
      // oxlint-disable-next-line no-await-in-loop -- rollback must wait for each bound write
      await fs.writeFile(targetPath, operation.content, "utf-8");
    }

    for (const operation of plan.operations.filter(
      (candidate) => candidate.writeMode === "remove",
    )) {
      markProjectTransactionWrite(transaction, operation.path, null);
      // oxlint-disable-next-line no-await-in-loop -- rollback must bind each removal in order
      await fs.remove(path.join(plan.projectDir, operation.path));
    }

    const migrationContent = await buildMigrationChecklistContent(plan.projectDir, plan);
    if (migrationContent !== null) {
      markProjectTransactionWrite(
        transaction,
        "MIGRATION.md",
        hashContent(Buffer.from(migrationContent, "utf-8")),
      );
      await fs.writeFile(path.join(plan.projectDir, "MIGRATION.md"), migrationContent, "utf-8");
    }
    await writeBtsConfig(proposedConfig, {
      version: plan.proposedConfig.version,
      createdAt: plan.proposedConfig.createdAt,
    });
    const configBytes = await fs.readFile(path.join(plan.projectDir, "bts.jsonc"));
    markProjectTransactionWrite(transaction, "bts.jsonc", hashContent(configBytes));

    const versionChannelRewrites: string[] = [];
    if (options.applyVersionChannel) {
      await applyDependencyVersionChannel(
        plan.projectDir,
        plan.proposedConfig.versionChannel,
        (packageJsonPath, sha256) => {
          const relativePath = toPosixPath(path.relative(plan.projectDir, packageJsonPath));
          versionChannelRewrites.push(relativePath);
          markProjectTransactionWrite(transaction, relativePath, sha256);
        },
        {
          rewrites: (plan as InternalStackUpdatePlan)[PLANNED_VERSION_CHANNEL_REWRITES] ?? [],
        },
      );
    }

    await options.beforeManifestRefresh?.();

    const structuredBaselines = collectStructuredBaselines(proposedTree);
    for (const relativePath of versionChannelRewrites) {
      // oxlint-disable-next-line no-await-in-loop -- baseline must match each persisted rewrite
      structuredBaselines[relativePath] = await fs.readFile(
        path.join(plan.projectDir, relativePath),
        "utf-8",
      );
    }

    await refreshScaffoldManifestFiles(
      plan.projectDir,
      [...plan.operations.map((operation) => operation.path), ...versionChannelRewrites],
      structuredBaselines,
      {
        type: lifecycleOperation,
        changes: plan.lifecycle.changes,
        recoveryId: transaction.id,
      },
    );
    const manifestPath = path.join(plan.projectDir, SCAFFOLD_MANIFEST_FILE);
    if (await fs.pathExists(manifestPath)) {
      const manifestBytes = await fs.readFile(manifestPath);
      markProjectTransactionWrite(transaction, SCAFFOLD_MANIFEST_FILE, hashContent(manifestBytes));
    }
    await commitProjectTransaction(transaction);
  } catch (error) {
    try {
      await rollbackProjectTransaction(transaction);
    } catch (rollbackError) {
      return {
        success: false,
        projectDir: plan.projectDir,
        error: `${error instanceof Error ? error.message : String(error)}. Automatic rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}. Recovery transaction: ${transaction.id}.`,
        lifecycle: lifecycleResult({
          ...plan.lifecycle,
          status: "failed",
          recovery: {
            available: true,
            transactionId: transaction.id,
            command: getProjectRecoveryCommand(plan.projectDir, transaction.id),
          },
        }),
      };
    }
    return {
      success: false,
      projectDir: plan.projectDir,
      error: `${error instanceof Error ? error.message : String(error)}. Every bound preimage was restored.`,
      lifecycle: lifecycleResult({
        ...plan.lifecycle,
        status: "rolled-back",
        recovery: { available: true, transactionId: transaction.id, automaticRollback: true },
      }),
    };
  }

  return {
    ...plan,
    recoveryId: transaction.id,
    lifecycle: lifecycleResult({
      ...plan.lifecycle,
      operation: lifecycleOperation,
      status: "applied",
      recovery: {
        available: true,
        transactionId: transaction.id,
        command: getProjectRecoveryCommand(plan.projectDir, transaction.id),
        automaticRollback: true,
      },
      nextActions: [
        plan.installCommand,
        "Run `create-better-fullstack check` to verify every generated target.",
      ],
    }),
  };
}
