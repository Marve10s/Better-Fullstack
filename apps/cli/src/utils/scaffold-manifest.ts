import type { VirtualFileTree, VirtualNode } from "@better-fullstack/template-generator";
import type { Dirent } from "node:fs";

import fs from "fs-extra";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";

import type {
  LifecycleChangeSummary,
  LifecycleOperation,
  LifecycleVersions,
} from "./lifecycle-contract";

import { getLatestCLIVersion } from "./get-latest-cli-version";

export const SCAFFOLD_MANIFEST_FILE = "bts.lock.json";
export const SCAFFOLD_MANIFEST_VERSION = "2";
export const PROJECT_SCHEMA_VERSION = "1";

const EXCLUDED_DIR_NAMES = new Set(["node_modules", ".git", ".bts"]);

const EXCLUDED_FILE_NAMES = new Set([
  SCAFFOLD_MANIFEST_FILE,
  "bts.jsonc",
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "Cargo.lock",
  "uv.lock",
  "poetry.lock",
  "go.sum",
  "mix.lock",
]);

const MANIFEST_OPERATIONS = new Set<ScaffoldManifestOperation["operation"]>([
  "create",
  "add",
  "remove",
  "stack-update",
  "template-update",
  "recover",
  "baseline-adoption",
  "manifest-migration",
]);

export type ScaffoldManifestOperation = {
  id: string;
  operation: LifecycleOperation | "baseline-adoption" | "manifest-migration";
  completedAt: string;
  source: LifecycleVersions | null;
  target: LifecycleVersions | null;
  changes: LifecycleChangeSummary;
  recoveryId?: string;
};

export type ScaffoldManifest = {
  version: typeof SCAFFOLD_MANIFEST_VERSION;
  createdAt: string;
  updatedAt: string;
  provenance: {
    state: "verified" | "migrated-v1" | "adopted-unverified";
    createdWith: LifecycleVersions | null;
    current: LifecycleVersions | null;
  };
  history: ScaffoldManifestOperation[];
  hashes: Record<string, string>;
  baselines?: Record<string, string>;
};

type ScaffoldManifestV1 = {
  version: "1";
  createdAt: string;
  hashes: Record<string, string>;
  baselines?: Record<string, string>;
};

export type ScaffoldManifestReadResult =
  | { status: "missing" }
  | { status: "valid"; manifest: ScaffoldManifest; migratedFromVersion?: "1" }
  | { status: "invalid"; error: string };

export function getCurrentLifecycleVersions(): LifecycleVersions {
  const releaseVersion = getLatestCLIVersion();
  return {
    cli: releaseVersion,
    generator: releaseVersion,
    templateSet: releaseVersion,
    schema: PROJECT_SCHEMA_VERSION,
  };
}

function emptyChanges(): LifecycleChangeSummary {
  return { added: 0, patched: 0, merged: 0, removed: 0, manual: 0 };
}

export function isStructuredBaselinePath(relPath: string): boolean {
  const name = path.basename(relPath);
  return name === "package.json" || name.endsWith(".env.example");
}

const BINARY_FILE_MARKER = "[Binary file]";

export function collectStructuredBaselines(tree: VirtualFileTree): Record<string, string> {
  const baselines: Record<string, string> = {};

  function walk(nodes: VirtualNode[]) {
    for (const node of nodes) {
      if (node.type === "file") {
        if (isStructuredBaselinePath(node.path) && node.content !== BINARY_FILE_MARKER) {
          baselines[node.path] = node.content;
        }
      } else {
        walk(node.children);
      }
    }
  }

  walk(tree.root.children);
  return baselines;
}

export function hashContent(content: Buffer | string): string {
  return createHash("sha256").update(content).digest("hex");
}

function toPosixRelative(rootDir: string, fullPath: string): string {
  return path.relative(rootDir, fullPath).split(path.sep).join("/");
}

async function walkFiles(rootDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(dir: string): Promise<void> {
    let entries: Dirent[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (EXCLUDED_DIR_NAMES.has(entry.name)) continue;
        await walk(fullPath);
      } else if (entry.isFile()) {
        if (EXCLUDED_FILE_NAMES.has(entry.name)) continue;
        results.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return results;
}

export async function computeScaffoldHashes(projectDir: string): Promise<Record<string, string>> {
  const files = await walkFiles(projectDir);
  const entries = await Promise.all(
    files.map(async (fullPath) => {
      const bytes = await fs.readFile(fullPath);
      return [toPosixRelative(projectDir, fullPath), hashContent(bytes)] as const;
    }),
  );
  return Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b)));
}

export async function writeScaffoldManifest(
  projectDir: string,
  manifest: ScaffoldManifest,
): Promise<void> {
  const manifestPath = path.join(projectDir, SCAFFOLD_MANIFEST_FILE);
  await fs.writeFile(manifestPath, serializeScaffoldManifest(manifest), "utf-8");
}

export function serializeScaffoldManifest(manifest: ScaffoldManifest): string {
  const sortEntries = (record: Record<string, string>) =>
    Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
  const sorted: ScaffoldManifest = {
    version: SCAFFOLD_MANIFEST_VERSION,
    createdAt: manifest.createdAt,
    updatedAt: manifest.updatedAt,
    provenance: manifest.provenance,
    history: manifest.history,
    hashes: sortEntries(manifest.hashes),
    ...(manifest.baselines && Object.keys(manifest.baselines).length > 0
      ? { baselines: sortEntries(manifest.baselines) }
      : {}),
  };
  return `${JSON.stringify(sorted, null, 2)}\n`;
}

export async function createAdoptedScaffoldManifest(
  projectDir: string,
  input: {
    hashes: Record<string, string>;
    baselines?: Record<string, string>;
    createdAt?: string;
  },
): Promise<ScaffoldManifest> {
  const createdAt = input.createdAt ?? new Date().toISOString();
  const manifest: ScaffoldManifest = {
    version: SCAFFOLD_MANIFEST_VERSION,
    createdAt,
    updatedAt: createdAt,
    provenance: {
      state: "adopted-unverified",
      createdWith: null,
      current: null,
    },
    history: [
      {
        id: hashContent(`baseline-adoption:${createdAt}:${projectDir}`).slice(0, 24),
        operation: "baseline-adoption",
        completedAt: createdAt,
        source: null,
        target: null,
        changes: { ...emptyChanges(), added: Object.keys(input.hashes).length },
      },
    ],
    hashes: input.hashes,
    baselines: input.baselines,
  };
  const manifestPath = path.join(projectDir, SCAFFOLD_MANIFEST_FILE);
  const temporaryPath = path.join(projectDir, `.bts-lock-adoption-${randomUUID()}.tmp`);
  try {
    await fs.writeFile(temporaryPath, serializeScaffoldManifest(manifest), {
      encoding: "utf-8",
      flag: "wx",
      mode: 0o644,
    });
    await fs.link(temporaryPath, manifestPath);
  } finally {
    await fs.rm(temporaryPath, { force: true });
  }
  return manifest;
}

export async function recordScaffoldManifest(
  projectDir: string,
  metadata: {
    createdAt?: string;
    baselines?: Record<string, string>;
    provenanceState?: ScaffoldManifest["provenance"]["state"];
    operation?: ScaffoldManifestOperation["operation"];
    changes?: LifecycleChangeSummary;
  } = {},
): Promise<ScaffoldManifest | null> {
  try {
    const createdAt = metadata.createdAt ?? new Date().toISOString();
    const versions = getCurrentLifecycleVersions();
    const provenanceState = metadata.provenanceState ?? "verified";
    const hashes = await computeScaffoldHashes(projectDir);
    const manifest: ScaffoldManifest = {
      version: SCAFFOLD_MANIFEST_VERSION,
      createdAt,
      updatedAt: createdAt,
      provenance: {
        state: provenanceState,
        createdWith: provenanceState === "verified" ? versions : null,
        current: provenanceState === "verified" ? versions : null,
      },
      history: [
        {
          id: hashContent(`${metadata.operation ?? "create"}:${createdAt}:${projectDir}`).slice(
            0,
            24,
          ),
          operation: metadata.operation ?? "create",
          completedAt: createdAt,
          source: null,
          target: provenanceState === "verified" ? versions : null,
          changes: metadata.changes ?? { ...emptyChanges(), added: Object.keys(hashes).length },
        },
      ],
      hashes,
      baselines: metadata.baselines,
    };
    await writeScaffoldManifest(projectDir, manifest);
    return manifest;
  } catch {
    return null;
  }
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isPortableProjectRelativePath(filePath: string): boolean {
  return (
    filePath.length > 0 &&
    !path.posix.isAbsolute(filePath) &&
    !path.win32.isAbsolute(filePath) &&
    !filePath.split(/[\\/]/).includes("..")
  );
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

function isLifecycleVersions(value: unknown): value is LifecycleVersions {
  return (
    isPlainRecord(value) &&
    typeof value.cli === "string" &&
    typeof value.generator === "string" &&
    typeof value.templateSet === "string" &&
    typeof value.schema === "string"
  );
}

function isLifecycleChanges(value: unknown): value is LifecycleChangeSummary {
  return (
    isPlainRecord(value) &&
    ["added", "patched", "merged", "removed", "manual"].every(
      (key) => typeof value[key] === "number" && Number.isInteger(value[key]) && value[key] >= 0,
    )
  );
}

function migrateManifestV1(manifest: ScaffoldManifestV1): ScaffoldManifest {
  const migrationId = hashContent(
    JSON.stringify({
      version: manifest.version,
      createdAt: manifest.createdAt,
      hashes: Object.entries(manifest.hashes).sort(([a], [b]) => a.localeCompare(b)),
      baselines: Object.entries(manifest.baselines ?? {}).sort(([a], [b]) => a.localeCompare(b)),
    }),
  ).slice(0, 24);
  return {
    version: SCAFFOLD_MANIFEST_VERSION,
    createdAt: manifest.createdAt,
    updatedAt: manifest.createdAt,
    provenance: { state: "migrated-v1", createdWith: null, current: null },
    history: [
      {
        id: migrationId,
        operation: "manifest-migration",
        completedAt: manifest.createdAt,
        source: null,
        target: null,
        changes: emptyChanges(),
      },
    ],
    hashes: manifest.hashes,
    baselines: manifest.baselines,
  };
}

function validateManifest(parsed: unknown): ScaffoldManifestReadResult {
  if (!isPlainRecord(parsed)) return { status: "invalid", error: "manifest must be a JSON object" };
  if (typeof parsed.version !== "string" || parsed.version.trim() === "") {
    return { status: "invalid", error: "version must be a non-empty string" };
  }
  if (
    typeof parsed.createdAt !== "string" ||
    parsed.createdAt.trim() === "" ||
    Number.isNaN(Date.parse(parsed.createdAt))
  ) {
    return { status: "invalid", error: "createdAt must be a valid timestamp string" };
  }
  if (!isPlainRecord(parsed.hashes)) {
    return { status: "invalid", error: "hashes must be a non-null plain record" };
  }
  for (const [filePath, digest] of Object.entries(parsed.hashes)) {
    if (!isPortableProjectRelativePath(filePath)) {
      return { status: "invalid", error: `hashes contains an unsafe project path: ${filePath}` };
    }
    if (typeof digest !== "string" || !/^[0-9a-f]{64}$/.test(digest)) {
      return { status: "invalid", error: `hashes[${JSON.stringify(filePath)}] must be SHA-256` };
    }
  }
  if (parsed.baselines !== undefined) {
    if (!isPlainRecord(parsed.baselines)) {
      return { status: "invalid", error: "baselines must be a non-null plain record" };
    }
    for (const [filePath, content] of Object.entries(parsed.baselines)) {
      if (!isPortableProjectRelativePath(filePath)) {
        return {
          status: "invalid",
          error: `baselines contains an unsafe project path: ${filePath}`,
        };
      }
      if (typeof content !== "string") {
        return {
          status: "invalid",
          error: `baselines[${JSON.stringify(filePath)}] must be a string`,
        };
      }
    }
  }
  if (parsed.version === "1") {
    return {
      status: "valid",
      manifest: migrateManifestV1(parsed as ScaffoldManifestV1),
      migratedFromVersion: "1",
    };
  }
  if (parsed.version !== SCAFFOLD_MANIFEST_VERSION) {
    return { status: "invalid", error: `unsupported manifest version: ${parsed.version}` };
  }
  if (!isTimestamp(parsed.updatedAt)) {
    return { status: "invalid", error: "updatedAt must be a valid timestamp string" };
  }
  if (!isPlainRecord(parsed.provenance)) {
    return { status: "invalid", error: "provenance must be a non-null plain record" };
  }
  if (
    parsed.provenance.state !== "verified" &&
    parsed.provenance.state !== "migrated-v1" &&
    parsed.provenance.state !== "adopted-unverified"
  ) {
    return { status: "invalid", error: "provenance.state is unsupported" };
  }
  if (
    parsed.provenance.createdWith !== null &&
    !isLifecycleVersions(parsed.provenance.createdWith)
  ) {
    return { status: "invalid", error: "provenance.createdWith is invalid" };
  }
  if (parsed.provenance.current !== null && !isLifecycleVersions(parsed.provenance.current)) {
    return { status: "invalid", error: "provenance.current is invalid" };
  }
  if (!Array.isArray(parsed.history)) {
    return { status: "invalid", error: "history must be an array" };
  }
  for (const [index, operation] of parsed.history.entries()) {
    if (
      !isPlainRecord(operation) ||
      typeof operation.id !== "string" ||
      !/^[0-9a-f]{24}$/.test(operation.id) ||
      typeof operation.operation !== "string" ||
      !MANIFEST_OPERATIONS.has(operation.operation as ScaffoldManifestOperation["operation"]) ||
      !isTimestamp(operation.completedAt) ||
      (operation.source !== null && !isLifecycleVersions(operation.source)) ||
      (operation.target !== null && !isLifecycleVersions(operation.target)) ||
      !isLifecycleChanges(operation.changes) ||
      (operation.recoveryId !== undefined &&
        (typeof operation.recoveryId !== "string" ||
          !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            operation.recoveryId,
          )))
    ) {
      return { status: "invalid", error: `history[${index}] is invalid` };
    }
  }
  return { status: "valid", manifest: parsed as ScaffoldManifest };
}

export async function readScaffoldManifestResult(
  projectDir: string,
): Promise<ScaffoldManifestReadResult> {
  try {
    const manifestPath = path.join(projectDir, SCAFFOLD_MANIFEST_FILE);
    if (!(await fs.pathExists(manifestPath))) return { status: "missing" };
    const raw = await fs.readFile(manifestPath, "utf-8");
    return validateManifest(JSON.parse(raw) as unknown);
  } catch (error) {
    return {
      status: "invalid",
      error: `manifest is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export async function readScaffoldManifest(projectDir: string): Promise<ScaffoldManifest | null> {
  const result = await readScaffoldManifestResult(projectDir);
  return result.status === "valid" ? result.manifest : null;
}

export async function refreshScaffoldManifestFiles(
  projectDir: string,
  relativePaths: Iterable<string>,
  baselines?: Record<string, string>,
  operation?: {
    type: ScaffoldManifestOperation["operation"];
    changes: LifecycleChangeSummary;
    recoveryId?: string;
  },
  beforeWrite?: (content: string) => void | Promise<void>,
): Promise<void> {
  const manifest = await readScaffoldManifest(projectDir);
  if (!manifest) return;

  for (const relativePath of new Set(relativePaths)) {
    const fullPath = path.join(projectDir, relativePath);
    const manifestPath = relativePath.split(path.sep).join("/");
    if (!(await fs.pathExists(fullPath))) {
      delete manifest.hashes[manifestPath];
      if (manifest.baselines) delete manifest.baselines[manifestPath];
      continue;
    }
    const stats = await fs.stat(fullPath).catch(() => null);
    if (!stats?.isFile()) continue;
    manifest.hashes[manifestPath] = hashContent(await fs.readFile(fullPath));
  }

  if (baselines && Object.keys(baselines).length > 0) {
    manifest.baselines = { ...manifest.baselines, ...baselines };
  }

  if (operation) {
    const completedAt = new Date().toISOString();
    const source = manifest.provenance.current;
    const target = getCurrentLifecycleVersions();
    manifest.updatedAt = completedAt;
    manifest.provenance.current = target;
    manifest.history.push({
      id: hashContent(`${operation.type}:${completedAt}:${projectDir}`).slice(0, 24),
      operation: operation.type,
      completedAt,
      source,
      target,
      changes: operation.changes,
      ...(operation.recoveryId ? { recoveryId: operation.recoveryId } : {}),
    });
  }

  const content = serializeScaffoldManifest(manifest);
  await beforeWrite?.(content);
  await fs.writeFile(path.join(projectDir, SCAFFOLD_MANIFEST_FILE), content, "utf-8");
}
