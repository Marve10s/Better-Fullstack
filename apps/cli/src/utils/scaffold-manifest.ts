import type { VirtualFileTree, VirtualNode } from "@better-fullstack/template-generator";
import type { Dirent } from "node:fs";

import fs from "fs-extra";
import { createHash } from "node:crypto";
import path from "node:path";

export const SCAFFOLD_MANIFEST_FILE = "bts.lock.json";
const MANIFEST_VERSION = "1";

const EXCLUDED_DIR_NAMES = new Set(["node_modules", ".git"]);

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

export type ScaffoldManifest = {
  version: string;
  createdAt: string;
  hashes: Record<string, string>;
  baselines?: Record<string, string>;
};

export type ScaffoldManifestReadResult =
  | { status: "missing" }
  | { status: "valid"; manifest: ScaffoldManifest }
  | { status: "invalid"; error: string };

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
  const sortEntries = (record: Record<string, string>) =>
    Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
  const sorted: ScaffoldManifest = {
    version: manifest.version,
    createdAt: manifest.createdAt,
    hashes: sortEntries(manifest.hashes),
    ...(manifest.baselines && Object.keys(manifest.baselines).length > 0
      ? { baselines: sortEntries(manifest.baselines) }
      : {}),
  };
  const manifestPath = path.join(projectDir, SCAFFOLD_MANIFEST_FILE);
  await fs.writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`, "utf-8");
}

export async function recordScaffoldManifest(
  projectDir: string,
  metadata: { createdAt?: string; baselines?: Record<string, string> } = {},
): Promise<ScaffoldManifest | null> {
  try {
    const manifest: ScaffoldManifest = {
      version: MANIFEST_VERSION,
      createdAt: metadata.createdAt ?? new Date().toISOString(),
      hashes: await computeScaffoldHashes(projectDir),
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
): Promise<void> {
  const manifest = await readScaffoldManifest(projectDir);
  if (!manifest) return;

  for (const relativePath of new Set(relativePaths)) {
    const fullPath = path.join(projectDir, relativePath);
    if (!(await fs.pathExists(fullPath))) continue;
    const stats = await fs.stat(fullPath).catch(() => null);
    if (!stats?.isFile()) continue;
    manifest.hashes[relativePath.split(path.sep).join("/")] = hashContent(
      await fs.readFile(fullPath),
    );
  }

  if (baselines && Object.keys(baselines).length > 0) {
    manifest.baselines = { ...manifest.baselines, ...baselines };
  }

  await writeScaffoldManifest(projectDir, manifest);
}
