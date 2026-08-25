import type { LifecyclePlan, LifecycleResult } from "@better-fullstack/project-lifecycle/contracts";
import type { z } from "zod";

import { lifecyclePlan, lifecycleResult } from "@better-fullstack/project-lifecycle/contracts";
import {
  createReviewToken,
  getReviewTokenContext,
} from "@better-fullstack/project-lifecycle/review-token";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  rollbackProjectTransaction,
  writeProjectTransactionFile,
} from "@better-fullstack/project-lifecycle/transaction";
import { processTemplateString } from "@better-fullstack/template-generator";
import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { CapabilityPackManifest, InstalledPack, ProjectConfig, RegistryLock } from "@/types";

import { readBtsConfig } from "@/config/bts-config";
import { planPackBtsConfig } from "@/config/registry-bts";
import { getProjectRecoveryCommand } from "@/lifecycle/lifecycle-command";
import { getCurrentLifecycleVersions, hashContent } from "@/lifecycle/scaffold-manifest";
import { CLIError } from "@/presentation/errors";
import { CapabilityPackManifestSchema, REGISTRY_LOCK_VERSION, RegistryLockSchema } from "@/types";

const LOCK_DIR = ".better-fullstack";
const LOCK_FILE = "registry.json";
const MANIFEST_FILE = "registry.json";
/** Preference order for the .env.example a pack's env vars are appended to. */
const ENV_EXAMPLE_CANDIDATES = ["apps/server/.env.example", ".env.example"] as const;

export interface RegistryAddOptions {
  projectDir: string;
  source: string;
  dryRun?: boolean;
  reviewToken?: string;
}

export interface RegistryDependencyChange {
  dir: string;
  name: string;
  version: string;
  dev: boolean;
}

export interface RegistryAddResult {
  success: boolean;
  mode: "plan" | "applied" | "blocked" | "rolled-back" | "failed";
  pack: { name: string; version: string };
  source: string;
  filesWritten: string[];
  filesSkipped: string[];
  dependencies: RegistryDependencyChange[];
  envKeys: string[];
  envFile?: string;
  dryRun: boolean;
  files: RegistryPlannedFile[];
  reviewToken?: string;
  operationPlan?: LifecyclePlan;
  lifecycle: LifecycleResult;
  recoveryId?: string;
  error?: string;
}

export interface RegistryPlannedFile {
  path: string;
  action: "create" | "update";
  content: string;
  preimageSha256: string | null;
  postimageSha256: string;
}

export interface RegistryApplyOptions {
  beforeTransactionSnapshot?: () => void | Promise<void>;
  beforeMutation?: () => void | Promise<void>;
  afterWrite?: (file: RegistryPlannedFile, index: number) => void | Promise<void>;
  writeFile?: (target: string, content: string) => void | Promise<void>;
}

interface ResolvedPackSource {
  manifestPath: string;
  packDir: string;
  /** Normalized source string persisted in the lockfile. */
  resolvedSource: string;
}

/** Formats a ZodError's issues into a single readable message. */
function formatManifestIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const location = issue.path.length > 0 ? issue.path.join(".") : "(root)";
      return `  - ${location}: ${issue.message}`;
    })
    .join("\n");
}

/**
 * Resolves a pack source (local path or file:// URL) to its registry.json.
 * The `https` scheme is reserved but intentionally unsupported in the MVP so
 * pack installs stay offline and deterministic.
 */
export async function resolvePackSource(source: string): Promise<ResolvedPackSource> {
  if (/^https?:\/\//i.test(source)) {
    throw new CLIError(
      `Remote pack sources are not yet supported (got '${source}'). Use a local path or a file:// URL.`,
    );
  }

  let candidate: string;
  if (source.startsWith("file://")) {
    candidate = fileURLToPath(source);
  } else {
    candidate = path.resolve(source);
  }

  if (!(await fs.pathExists(candidate))) {
    throw new CLIError(`Pack source not found: ${source}`);
  }

  const stats = await fs.stat(candidate);
  const manifestPath = stats.isDirectory() ? path.join(candidate, MANIFEST_FILE) : candidate;

  if (!(await fs.pathExists(manifestPath))) {
    throw new CLIError(
      `No ${MANIFEST_FILE} found at ${manifestPath}. A capability pack must ship a ${MANIFEST_FILE} manifest.`,
    );
  }

  return {
    manifestPath,
    packDir: path.dirname(manifestPath),
    resolvedSource: manifestPath,
  };
}

/** Reads and validates a pack manifest, raising a clear CLIError on any failure. */
export async function loadPackManifest(manifestPath: string): Promise<CapabilityPackManifest> {
  let raw: string;
  try {
    raw = await fs.readFile(manifestPath, "utf-8");
  } catch (error) {
    throw new CLIError(
      `Failed to read pack manifest ${manifestPath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new CLIError(
      `Pack manifest ${manifestPath} is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  const parsed = CapabilityPackManifestSchema.safeParse(json);
  if (!parsed.success) {
    throw new CLIError(
      `Invalid capability pack manifest (${manifestPath}):\n${formatManifestIssues(parsed.error)}`,
    );
  }

  return parsed.data;
}

function lockPath(projectDir: string): string {
  return path.join(projectDir, LOCK_DIR, LOCK_FILE);
}

/** Reads the per-project registry lockfile, tolerating a missing/empty file. */
export async function readRegistryLock(projectDir: string): Promise<RegistryLock> {
  const file = lockPath(projectDir);
  if (!(await fs.pathExists(file))) {
    return { version: REGISTRY_LOCK_VERSION, packs: [] };
  }
  try {
    const raw = await fs.readFile(file, "utf-8");
    const parsed = RegistryLockSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      return { version: REGISTRY_LOCK_VERSION, packs: [] };
    }
    return parsed.data;
  } catch {
    return { version: REGISTRY_LOCK_VERSION, packs: [] };
  }
}

/** Lists packs recorded as installed in the per-project lockfile. */
export async function listInstalledPacks(projectDir: string): Promise<InstalledPack[]> {
  const lock = await readRegistryLock(projectDir);
  return lock.packs;
}

function parseEnvKeys(content: string): Set<string> {
  const keys = new Set<string>();
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/);
    if (match?.[1]) keys.add(match[1]);
  }
  return keys;
}

/** Appends any missing env vars (with optional comment/value) to existing content. */
function appendEnvVars(
  content: string,
  vars: CapabilityPackManifest["env"],
): { content: string; keys: string[] } {
  const existing = parseEnvKeys(content);
  const missing = vars.filter((entry) => !existing.has(entry.key));
  if (missing.length === 0) return { content, keys: [] };

  const separator = content.trim().length === 0 ? "" : content.endsWith("\n") ? "\n" : "\n\n";
  const block = missing
    .map((entry) => {
      const comment = entry.description ? `# ${entry.description}\n` : "";
      return `${comment}${entry.key}=${entry.value ?? ""}`;
    })
    .join("\n");

  return {
    content: `${content}${separator}${block}\n`,
    keys: missing.map((entry) => entry.key),
  };
}

async function resolveEnvExamplePath(projectDir: string): Promise<string> {
  for (const candidate of ENV_EXAMPLE_CANDIDATES) {
    if (await fs.pathExists(path.join(projectDir, candidate))) {
      return candidate;
    }
  }
  return ".env.example";
}

/**
 * Rejects a capability pack whose resolved target path escapes the project
 * directory (path traversal via `..` segments or an absolute path in the
 * manifest). Applied to both file writes and dependency-map target dirs so a
 * pack can never write outside / mutate sibling projects.
 */
function isPathInside(rootDir: string, candidate: string): boolean {
  const rel = path.relative(rootDir, candidate);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

async function assertPathInsideProject(
  projectDir: string,
  targetAbs: string,
  label: string,
): Promise<void> {
  const rel = path.relative(projectDir, targetAbs);
  if (rel === "" || rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new CLIError(
      `Capability pack ${label} escapes the project directory and was rejected: ${targetAbs}`,
    );
  }

  const realProjectDir = await fs.realpath(projectDir);
  let current = projectDir;
  for (const segment of rel.split(path.sep)) {
    current = path.join(current, segment);
    const stats = await fs.lstat(current).catch(() => null);
    if (!stats) break;

    let realCurrent: string;
    try {
      realCurrent = await fs.realpath(current);
    } catch {
      throw new CLIError(
        `Capability pack ${label} resolves through an invalid symlink and was rejected: ${current}`,
      );
    }
    if (!isPathInside(realProjectDir, realCurrent)) {
      throw new CLIError(
        `Capability pack ${label} escapes the project directory through a symlink and was rejected: ${targetAbs}`,
      );
    }
  }
}

/**
 * Merges a pack's dependencies/devDependencies into the target package.json
 * files. Pack dependency versions are arbitrary name->version pairs, so they
 * are merged directly (they cannot flow through addPackageDependency, which is
 * restricted to the AvailableDependencies enum).
 */
async function planDependencyChanges(
  projectDir: string,
  manifest: CapabilityPackManifest,
): Promise<{ changes: RegistryDependencyChange[]; writes: Map<string, Record<string, unknown>> }> {
  const changes: RegistryDependencyChange[] = [];
  const writes = new Map<string, Record<string, unknown>>();

  const groups: Array<{ map: CapabilityPackManifest["dependencies"]; dev: boolean }> = [
    { map: manifest.dependencies, dev: false },
    { map: manifest.devDependencies, dev: true },
  ];

  for (const { map, dev } of groups) {
    if (!map) continue;
    for (const [dir, deps] of Object.entries(map)) {
      if (Object.keys(deps).length === 0) continue;
      const pkgRelPath = path.join(dir === "." ? "" : dir, "package.json");
      const pkgAbsPath = path.join(projectDir, pkgRelPath);
      await assertPathInsideProject(projectDir, pkgAbsPath, `dependency target "${dir}"`);
      if (!(await fs.pathExists(pkgAbsPath))) {
        throw new CLIError(
          `Pack targets ${pkgRelPath} which does not exist in this project. Cannot merge dependencies.`,
        );
      }

      const pkgJson =
        writes.get(pkgAbsPath) ?? ((await fs.readJson(pkgAbsPath)) as Record<string, unknown>);
      const field = dev ? "devDependencies" : "dependencies";
      const bucket: Record<string, string> = {
        ...(pkgJson[field] as Record<string, string> | undefined),
      };
      for (const [name, version] of Object.entries(deps)) {
        bucket[name] = version;
        changes.push({ dir, name, version, dev });
      }
      pkgJson[field] = bucket;
      writes.set(pkgAbsPath, pkgJson);
    }
  }

  return { changes, writes };
}

async function plannedFile(
  projectDir: string,
  filePath: string,
  content: string,
): Promise<RegistryPlannedFile> {
  const target = path.join(projectDir, filePath);
  const existing = (await fs.pathExists(target)) ? await fs.readFile(target) : null;
  return {
    path: filePath.replaceAll("\\", "/"),
    action: existing === null ? "create" : "update",
    content,
    preimageSha256: existing === null ? null : hashContent(existing),
    postimageSha256: hashContent(Buffer.from(content, "utf-8")),
  };
}

function registryReviewToken(
  projectDir: string,
  source: string,
  pack: { name: string; version: string },
  files: readonly RegistryPlannedFile[],
  plannedAt: string,
): string {
  return createReviewToken(
    "registry-add",
    {
      projectDir,
      source,
      pack,
      files: files.map(({ path: filePath, action, preimageSha256, postimageSha256 }) => ({
        path: filePath,
        action,
        preimageSha256,
        postimageSha256,
      })),
    },
    plannedAt,
  );
}

export async function planPackInstall(
  options: RegistryAddOptions,
  plannedAt = new Date().toISOString(),
): Promise<RegistryAddResult> {
  const requestedProjectDir = path.resolve(options.projectDir);
  const projectDir = await fs.realpath(requestedProjectDir).catch(() => requestedProjectDir);
  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    throw new CLIError(
      `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`,
    );
  }

  const { manifestPath, resolvedSource } = await resolvePackSource(options.source);
  const manifest = await loadPackManifest(manifestPath);
  const templateContext = btsConfig as unknown as ProjectConfig;
  const lock = await readRegistryLock(projectDir);
  const previousInstall = lock.packs.find((pack) => pack.name === manifest.name);
  const filesWritten: string[] = [];
  const filesSkipped: string[] = [];
  const writes = new Map<string, string>();

  for (const file of manifest.files) {
    const normalized = file.path.replaceAll("\\", "/").replace(/^\.\//, "");
    const targetAbs = path.join(projectDir, normalized);
    await assertPathInsideProject(projectDir, targetAbs, `file path "${file.path}"`);
    if (!file.overwrite && (await fs.pathExists(targetAbs))) {
      filesSkipped.push(normalized);
      continue;
    }
    writes.set(
      normalized,
      file.template ? processTemplateString(file.content, templateContext) : file.content,
    );
    filesWritten.push(normalized);
  }
  if (previousInstall && previousInstall.version !== manifest.version && filesSkipped.length > 0) {
    throw new CLIError(
      `Cannot update ${manifest.name} from ${previousInstall.version} to ${manifest.version} because existing pack files would be skipped: ${filesSkipped.join(", ")}. Reconcile those files with an overwrite-enabled pack first.`,
    );
  }

  const { changes: dependencies, writes: packageJsonWrites } = await planDependencyChanges(
    projectDir,
    manifest,
  );
  for (const [packagePath, packageJson] of packageJsonWrites) {
    const relativePath = path.relative(projectDir, packagePath).replaceAll("\\", "/");
    writes.set(relativePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  let envFile: string | undefined;
  let envKeys: string[] = [];
  if (manifest.env.length > 0) {
    const candidate = await resolveEnvExamplePath(projectDir);
    const envAbs = path.join(projectDir, candidate);
    await assertPathInsideProject(projectDir, envAbs, `environment target "${candidate}"`);
    const existing = (await fs.pathExists(envAbs)) ? await fs.readFile(envAbs, "utf-8") : "";
    const merged = appendEnvVars(existing, manifest.env);
    envKeys = merged.keys;
    if (merged.keys.length > 0) {
      envFile = candidate;
      writes.set(candidate, merged.content);
    }
  }

  const lockRelativePath = `${LOCK_DIR}/${LOCK_FILE}`;
  await assertPathInsideProject(
    projectDir,
    path.join(projectDir, lockRelativePath),
    "registry lock target",
  );
  const installed: InstalledPack = {
    name: manifest.name,
    version: manifest.version,
    source: resolvedSource,
    files: [...new Set([...(previousInstall?.files ?? []), ...filesWritten])].sort(),
    installedAt: filesWritten.length > 0 ? plannedAt : (previousInstall?.installedAt ?? plannedAt),
  };
  lock.version = REGISTRY_LOCK_VERSION;
  lock.packs = [...lock.packs.filter((pack) => pack.name !== manifest.name), installed];
  writes.set(lockRelativePath, `${JSON.stringify(lock, null, 2)}\n`);

  await assertPathInsideProject(projectDir, path.join(projectDir, "bts.jsonc"), "config target");
  const btsContent = await planPackBtsConfig(projectDir, manifest);
  if (btsContent !== null) writes.set("bts.jsonc", btsContent);

  const files = await Promise.all(
    [...writes.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([filePath, content]) => plannedFile(projectDir, filePath, content)),
  );
  const reviewToken = registryReviewToken(
    projectDir,
    resolvedSource,
    { name: manifest.name, version: manifest.version },
    files,
    plannedAt,
  );
  const versions = getCurrentLifecycleVersions();
  const packageManagerAction = `Run the project's ${btsConfig.packageManager} install command after apply.`;
  const operationPlan = lifecyclePlan({
    operation: "registry-add",
    status: "planned",
    projectDir,
    changes: {
      added: files.filter((file) => file.action === "create").length,
      patched: files.filter((file) => file.action === "update").length,
    },
    provenance: { source: versions, target: versions, verified: true },
    recovery: { available: true, automaticRollback: true },
    affected: {
      stackParts: [],
      files: files.map((file) => ({ path: file.path, action: file.action })),
      dependencies: dependencies.map((dependency) => ({
        name: dependency.name,
        action: "add",
        version: dependency.version,
        target: dependency.dir,
        dev: dependency.dev,
      })),
    },
    checks: [
      { id: "local-source", status: "pass", message: resolvedSource },
      { id: "manifest-schema", status: "pass" },
      { id: "write-paths", status: "pass" },
    ],
    sideEffects: [
      {
        kind: "filesystem",
        status: "planned",
        description: "Apply every pack file and metadata merge in one recovery transaction.",
      },
      ...(dependencies.length > 0
        ? [
            {
              kind: "package-manager" as const,
              status: "manual" as const,
              description:
                "Dependency manifests change, but registry apply does not run a package manager.",
              compensatingAction: packageManagerAction,
            },
          ]
        : []),
    ],
    review: { required: true, token: reviewToken },
    preconditions: files.map((file) => ({
      id: `preimage:${file.path}`,
      status: "pass",
      message: file.preimageSha256 ?? "absent",
    })),
    nextActions: dependencies.length > 0 ? [packageManagerAction] : [],
  });

  return {
    success: true,
    mode: "plan",
    pack: { name: manifest.name, version: manifest.version },
    source: resolvedSource,
    filesWritten,
    filesSkipped,
    dependencies,
    envKeys,
    envFile,
    dryRun: true,
    files,
    reviewToken,
    operationPlan,
    lifecycle: lifecycleResult({ ...operationPlan, status: "planned" }),
  };
}

async function registryPreimage(
  projectDir: string,
  file: RegistryPlannedFile,
): Promise<string | null> {
  const target = path.join(projectDir, file.path);
  if (!(await fs.pathExists(target))) return null;
  return hashContent(await fs.readFile(target));
}

export async function applyPackInstall(
  options: RegistryAddOptions,
  reviewToken: string | undefined,
  hooks: RegistryApplyOptions = {},
): Promise<RegistryAddResult> {
  const plannedAt = getReviewTokenContext(reviewToken);
  const reviewed = await planPackInstall(options, plannedAt ?? new Date(0).toISOString());
  if (!plannedAt || !reviewToken || reviewed.reviewToken !== reviewToken) {
    return {
      ...reviewed,
      success: false,
      mode: "blocked",
      error: "The registry review token is missing or stale. Create and review a new plan.",
      lifecycle: lifecycleResult({
        ...reviewed.lifecycle,
        status: "blocked",
        blockers: ["The registry review token is missing or stale."],
        checks: [{ id: "review-token", status: "fail" }],
      }),
    };
  }

  let transaction;
  try {
    await hooks.beforeTransactionSnapshot?.();
    transaction = await beginProjectTransaction(
      reviewed.lifecycle.projectDir,
      "registry-add",
      reviewed.files.map((file) => file.path),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ...reviewed,
      success: false,
      mode: "failed",
      error: `Could not create the recovery snapshot: ${message}`,
      lifecycle: lifecycleResult({
        ...reviewed.lifecycle,
        status: "failed",
        blockers: [message],
        sideEffects: [{ kind: "filesystem", status: "not-run", description: message }],
      }),
    };
  }

  try {
    await hooks.beforeMutation?.();
    for (const file of reviewed.files) {
      if ((await registryPreimage(reviewed.lifecycle.projectDir, file)) !== file.preimageSha256) {
        throw new Error(`Reviewed preimage changed before apply: ${file.path}`);
      }
    }
    for (const [index, file] of reviewed.files.entries()) {
      await writeProjectTransactionFile(transaction, file.path, file.content, {
        expectedSha256: file.postimageSha256,
        ...(hooks.writeFile
          ? { writeFile: (target) => hooks.writeFile?.(target, file.content) }
          : {}),
      });
      await hooks.afterWrite?.(file, index);
    }
    await commitProjectTransaction(transaction);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await rollbackProjectTransaction(transaction);
    } catch (rollbackError) {
      const rollbackMessage =
        rollbackError instanceof Error ? rollbackError.message : String(rollbackError);
      return {
        ...reviewed,
        success: false,
        mode: "failed",
        recoveryId: transaction.id,
        error: `${message}. Automatic rollback failed: ${rollbackMessage}.`,
        lifecycle: lifecycleResult({
          ...reviewed.lifecycle,
          status: "failed",
          recovery: {
            available: true,
            transactionId: transaction.id,
            command: getProjectRecoveryCommand(
              reviewed.lifecycle.projectDir,
              transaction.id,
              process.platform,
              undefined,
            ),
          },
          sideEffects: [
            {
              kind: "filesystem",
              status: "failed",
              description: message,
              compensatingAction: "Run the reported recovery command.",
            },
          ],
        }),
      };
    }
    return {
      ...reviewed,
      success: false,
      mode: "rolled-back",
      recoveryId: transaction.id,
      error: `${message}. Every registry preimage was restored.`,
      lifecycle: lifecycleResult({
        ...reviewed.lifecycle,
        status: "rolled-back",
        recovery: { available: true, transactionId: transaction.id, automaticRollback: true },
        history: { recorded: true, recoveryId: transaction.id },
        sideEffects: [
          {
            kind: "filesystem",
            status: "restored",
            description: "Every registry preimage was restored.",
          },
        ],
      }),
    };
  }

  return {
    ...reviewed,
    mode: "applied",
    dryRun: false,
    recoveryId: transaction.id,
    lifecycle: lifecycleResult({
      ...reviewed.lifecycle,
      status: "applied",
      recovery: {
        available: true,
        transactionId: transaction.id,
        command: getProjectRecoveryCommand(
          reviewed.lifecycle.projectDir,
          transaction.id,
          process.platform,
          undefined,
        ),
        automaticRollback: true,
      },
      history: { recorded: true, recoveryId: transaction.id },
      sideEffects: reviewed.lifecycle.sideEffects.map((sideEffect) =>
        sideEffect.kind === "filesystem" ? { ...sideEffect, status: "applied" } : sideEffect,
      ),
    }),
  };
}

export async function addPack(options: RegistryAddOptions): Promise<RegistryAddResult> {
  if (options.reviewToken) return applyPackInstall(options, options.reviewToken);
  return planPackInstall(options);
}
