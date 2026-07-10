import type { VirtualFileTree, VirtualNode } from "@better-fullstack/template-generator";
import type { Dirent } from "node:fs";

import fs from "fs-extra";
import { createHash } from "node:crypto";
import path from "node:path";

/**
 * Scaffold baseline manifest ("bts.lock.json").
 *
 * Recorded once at create time (after formatting, before install) as a map of
 * every on-disk file path -> sha256 of its bytes. `bfs update` later re-renders
 * the project with the current templates and uses this baseline to tell apart
 * three cases per file: the template moved but the file was never touched (safe
 * to patch), the user edited the file (keep as-is), or both changed (conflict).
 * Without a recorded baseline that distinction is impossible.
 */

export const SCAFFOLD_MANIFEST_FILE = "bts.lock.json";
const MANIFEST_VERSION = "1";

/** Directories never worth hashing (dependencies / VCS metadata). */
const EXCLUDED_DIR_NAMES = new Set(["node_modules", ".git"]);

/**
 * Files whose on-disk bytes are NOT a pure-template render — the manifest
 * itself, the config file (regenerated on update), and package-manager /
 * toolchain lockfiles that install mutates. Excluding them keeps the baseline
 * focused on template-comparable content so `bfs update` never mistakes an
 * install artifact for template drift.
 */
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
  /**
   * Pure-template render content (pre post-processing) of structured-merge
   * files — package.json and *.env.example. `bfs update` uses these as the
   * "previous" side of a 3-way merge so template-side dependency/script/env-key
   * changes can be folded into a post-processed or user-edited file without
   * clobbering either. Optional: manifests recorded by older CLIs lack it.
   */
  baselines?: Record<string, string>;
};

/** Files whose render content is stored in the manifest for structured merges. */
export function isStructuredBaselinePath(relPath: string): boolean {
  const name = path.basename(relPath);
  return name === "package.json" || name.endsWith(".env.example");
}

const BINARY_FILE_MARKER = "[Binary file]";

/** Extract structured-merge baseline contents from a generated virtual tree. */
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

/** Walk the project on disk and return a deterministic path -> sha256 map. */
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

/**
 * Record the scaffold baseline manifest for a freshly created project.
 *
 * Best-effort by design: any failure returns null instead of throwing, so a
 * problem here can only disable `bfs update`'s auto-patching — it must never
 * break the create path.
 */
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

export async function readScaffoldManifest(projectDir: string): Promise<ScaffoldManifest | null> {
  try {
    const manifestPath = path.join(projectDir, SCAFFOLD_MANIFEST_FILE);
    if (!(await fs.pathExists(manifestPath))) return null;
    const raw = await fs.readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw) as ScaffoldManifest;
    if (!parsed || typeof parsed !== "object" || typeof parsed.hashes !== "object") {
      return null;
    }
    if (parsed.baselines !== undefined && typeof parsed.baselines !== "object") {
      delete parsed.baselines;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Refresh only files deliberately written by an in-place stack update.
 * `baselines` (path -> render content) advances the structured-merge baselines
 * to the render the project was just reconciled against.
 */
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
