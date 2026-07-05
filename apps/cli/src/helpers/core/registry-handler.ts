import type { z } from "zod";

import { processTemplateString, VirtualFileSystem } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type {
  CapabilityPackManifest,
  InstalledPack,
  ProjectConfig,
  RegistryLock,
} from "../../types";

import {
  CapabilityPackManifestSchema,
  REGISTRY_LOCK_VERSION,
  RegistryLockSchema,
} from "../../types";
import { readBtsConfig } from "../../utils/bts-config";
import { CLIError } from "../../utils/errors";
import { recordPackInBtsConfig } from "../../utils/registry-bts";

const LOCK_DIR = ".better-fullstack";
const LOCK_FILE = "registry.json";
const MANIFEST_FILE = "registry.json";
/** Preference order for the .env.example a pack's env vars are appended to. */
const ENV_EXAMPLE_CANDIDATES = ["apps/server/.env.example", ".env.example"] as const;

export interface RegistryAddOptions {
  projectDir: string;
  source: string;
  dryRun?: boolean;
}

export interface RegistryDependencyChange {
  dir: string;
  name: string;
  version: string;
  dev: boolean;
}

export interface RegistryAddResult {
  pack: { name: string; version: string };
  source: string;
  filesWritten: string[];
  filesSkipped: string[];
  dependencies: RegistryDependencyChange[];
  envKeys: string[];
  envFile?: string;
  dryRun: boolean;
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

async function writeRegistryLock(projectDir: string, lock: RegistryLock): Promise<void> {
  const file = lockPath(projectDir);
  await fs.ensureDir(path.dirname(file));
  await fs.writeFile(file, `${JSON.stringify(lock, null, 2)}\n`, "utf-8");
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
function assertPathInsideProject(projectDir: string, targetAbs: string, label: string): void {
  const rel = path.relative(projectDir, targetAbs);
  if (rel === "" || rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new CLIError(
      `Capability pack ${label} escapes the project directory and was rejected: ${targetAbs}`,
    );
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
      assertPathInsideProject(projectDir, pkgAbsPath, `dependency target "${dir}"`);
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

/**
 * Installs a capability pack into an existing Better Fullstack project.
 *
 * Reuses the same building blocks as the `add` handler: readBtsConfig to assert
 * a real project, the template-generator VFS + writeTreeToFilesystem to stage
 * and write files, and processTemplateString to render templated files.
 */
export async function addPack(options: RegistryAddOptions): Promise<RegistryAddResult> {
  const projectDir = path.resolve(options.projectDir);
  const dryRun = options.dryRun ?? false;

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    throw new CLIError(
      `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`,
    );
  }

  const { manifestPath, resolvedSource } = await resolvePackSource(options.source);
  const manifest = await loadPackManifest(manifestPath);
  const templateContext = btsConfig as unknown as ProjectConfig;

  // Stage files: decide write-vs-skip up front (respecting the overwrite flag),
  // render templated content, and only stage files that should be written.
  const vfs = new VirtualFileSystem();
  const filesWritten: string[] = [];
  const filesSkipped: string[] = [];

  for (const file of manifest.files) {
    const normalized = file.path.replaceAll("\\", "/").replace(/^\.\//, "");
    const targetAbs = path.join(projectDir, normalized);
    assertPathInsideProject(projectDir, targetAbs, `file path "${file.path}"`);
    if (!file.overwrite && (await fs.pathExists(targetAbs))) {
      filesSkipped.push(normalized);
      continue;
    }
    const content = file.template
      ? processTemplateString(file.content, templateContext)
      : file.content;
    vfs.writeFile(normalized, content);
    filesWritten.push(normalized);
  }

  // Plan dependency merges and env additions.
  const { changes: dependencies, writes: packageJsonWrites } = await planDependencyChanges(
    projectDir,
    manifest,
  );

  let envFile: string | undefined;
  let envKeys: string[] = [];
  let envContent: string | undefined;
  if (manifest.env.length > 0) {
    envFile = await resolveEnvExamplePath(projectDir);
    const envAbs = path.join(projectDir, envFile);
    const existing = (await fs.pathExists(envAbs)) ? await fs.readFile(envAbs, "utf-8") : "";
    const merged = appendEnvVars(existing, manifest.env);
    envKeys = merged.keys;
    if (merged.keys.length > 0) {
      envContent = merged.content;
    } else {
      envFile = undefined;
    }
  }

  if (dryRun) {
    return {
      pack: { name: manifest.name, version: manifest.version },
      source: resolvedSource,
      filesWritten,
      filesSkipped,
      dependencies,
      envKeys,
      envFile,
      dryRun: true,
    };
  }

  // Write staged pack files.
  if (filesWritten.length > 0) {
    const tree = {
      root: vfs.toTree(manifest.name),
      fileCount: vfs.getFileCount(),
      directoryCount: vfs.getDirectoryCount(),
      config: templateContext,
    };
    await writeTreeToFilesystem(tree, projectDir);
  }

  // Merge dependencies into their package.json files.
  for (const [pkgAbsPath, pkgJson] of packageJsonWrites) {
    await fs.writeJson(pkgAbsPath, pkgJson, { spaces: 2 });
  }

  // Append env vars.
  if (envFile && envContent !== undefined) {
    await fs.writeFile(path.join(projectDir, envFile), envContent, "utf-8");
  }

  // Record the install in the lockfile (dedupe by name for re-install/upgrade).
  const lock = await readRegistryLock(projectDir);
  const installed: InstalledPack = {
    name: manifest.name,
    version: manifest.version,
    source: resolvedSource,
    files: filesWritten,
    installedAt: new Date().toISOString(),
  };
  lock.version = REGISTRY_LOCK_VERSION;
  lock.packs = [...lock.packs.filter((pack) => pack.name !== manifest.name), installed];
  await writeRegistryLock(projectDir, lock);

  // Additively record the pack (and its declared addon metadata) in bts.jsonc.
  await recordPackInBtsConfig(projectDir, manifest);

  return {
    pack: { name: manifest.name, version: manifest.version },
    source: resolvedSource,
    filesWritten,
    filesSkipped,
    dependencies,
    envKeys,
    envFile,
    dryRun: false,
  };
}
