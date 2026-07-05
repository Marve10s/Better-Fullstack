import type { VirtualFileTree } from "@better-fullstack/template-generator";

import { writeSelectedFiles } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { readBtsConfig } from "../../utils/bts-config";
import {
  hashContent,
  readScaffoldManifest,
  type ScaffoldManifest,
  writeScaffoldManifest,
} from "../../utils/scaffold-manifest";
import {
  configFromBtsConfig,
  formatGeneratedTree,
  generateTree,
  treeToFileMap,
} from "./stack-update";

const BINARY_FILE_MARKER = "[Binary file]";

/**
 * Files whose on-disk bytes are mutated by create-time post-processing
 * (package-manager version, dependency version channel, db-setup, addons) or by
 * dependency install, so their scaffold baseline is not a pure-template render.
 * Never auto-patched — always routed to manual review. A structured merge
 * (reusing stack-update's mergePackageJson / mergeEnvExample) is a deferred
 * follow-up; the MVP is conservative to avoid clobbering post-processed deps.
 */
function isStructuredMergeFile(relPath: string): boolean {
  const name = path.basename(relPath);
  return (
    name === "package.json" ||
    name === ".env" ||
    name.endsWith(".env.example") ||
    name === "bun.lock" ||
    name === "bun.lockb" ||
    name === "package-lock.json" ||
    name === "pnpm-lock.yaml" ||
    name === "yarn.lock"
  );
}

/**
 * Generated docs (README) are re-derived from project mode / stack summary at
 * render time, so their bytes legitimately differ between the create-time
 * render and a later re-render even when untouched. Mirror stack-update's
 * isSkippableGeneratedDoc: never auto-patch them, and never flag them as drift.
 */
function isSkippableDoc(relPath: string): boolean {
  return path.basename(relPath).toLowerCase() === "readme.md";
}

export type UpgradeCategory =
  | "unchanged"
  | "drift"
  | "user-edited"
  | "conflict"
  | "manual"
  | "new-file"
  | "removed";

export type UpgradeFileEntry = {
  path: string;
  category: UpgradeCategory;
  reason?: string;
};

export type UpgradePlan = {
  success: true;
  projectDir: string;
  hasBaseline: boolean;
  baselineCreatedAt?: string;
  files: UpgradeFileEntry[];
  unchanged: string[];
  drift: string[];
  userEdited: string[];
  conflicts: string[];
  manual: UpgradeFileEntry[];
  newFiles: string[];
  removed: string[];
  /** Files `--apply` would write: drift patches + brand-new template files. */
  actionable: string[];
};

export type UpgradeResult = UpgradePlan | { success: false; projectDir?: string; error: string };

export type UpgradeApplyResult =
  | (UpgradePlan & { applied: { patched: string[]; added: string[] } })
  | { success: false; projectDir?: string; error: string };

async function inferProjectName(projectDir: string): Promise<string> {
  const packageJson = await fs.readJson(path.join(projectDir, "package.json")).catch(() => null);
  if (packageJson && typeof packageJson.name === "string" && packageJson.name.trim()) {
    return packageJson.name.trim();
  }
  return path.basename(projectDir);
}

/**
 * Render the project with the current bundled templates and return a
 * deterministic path -> sha256 map of the formatted output. Text files hash
 * their formatted content directly; binary files are materialized to a temp
 * dir (mirroring how create writes them) and hashed from bytes.
 */
async function computeRenderHashes(tree: VirtualFileTree): Promise<Map<string, string>> {
  const fileMap = treeToFileMap(tree);
  const hashes = new Map<string, string>();
  const binaryPaths: string[] = [];

  for (const [filePath, file] of fileMap) {
    if (file.content === BINARY_FILE_MARKER) {
      binaryPaths.push(filePath);
    } else {
      hashes.set(filePath, hashContent(Buffer.from(file.content, "utf-8")));
    }
  }

  if (binaryPaths.length > 0) {
    const binarySet = new Set(binaryPaths);
    const tempDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-update-binary-"));
    try {
      const written = await writeSelectedFiles(tree, tempDir, (candidate) =>
        binarySet.has(candidate),
      );
      for (const filePath of written) {
        const bytes = await fs.readFile(path.join(tempDir, filePath));
        hashes.set(filePath, hashContent(bytes));
      }
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  }

  return hashes;
}

async function renderCurrentProject(
  projectDir: string,
): Promise<{ tree: VirtualFileTree; renderHashes: Map<string, string> } | { error: string }> {
  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    return { error: `No bts.jsonc found in ${projectDir}. Is this a Better Fullstack project?` };
  }
  const projectName = await inferProjectName(projectDir);
  const currentConfig = configFromBtsConfig(btsConfig, projectDir, projectName);
  try {
    const tree = await generateTree(currentConfig);
    await formatGeneratedTree(tree);
    const renderHashes = await computeRenderHashes(tree);
    return { tree, renderHashes };
  } catch (error) {
    return {
      error: `Failed to render current templates: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

function summarize(
  projectDir: string,
  files: UpgradeFileEntry[],
  manifest: ScaffoldManifest | null,
): UpgradePlan {
  const byCategory = (category: UpgradeCategory) =>
    files.filter((file) => file.category === category).map((file) => file.path);
  const drift = byCategory("drift");
  const newFiles = byCategory("new-file");

  return {
    success: true,
    projectDir,
    hasBaseline: manifest !== null,
    baselineCreatedAt: manifest?.createdAt,
    files,
    unchanged: byCategory("unchanged"),
    drift,
    userEdited: byCategory("user-edited"),
    conflicts: byCategory("conflict"),
    manual: files.filter((file) => file.category === "manual"),
    newFiles,
    removed: byCategory("removed"),
    actionable: [...drift, ...newFiles].sort(),
  };
}

/**
 * Classify every current-template file against the on-disk project and the
 * recorded scaffold baseline. Pure read-only planning — writes nothing.
 */
export async function planScaffoldUpgrade(projectDirInput: string): Promise<UpgradeResult> {
  const projectDir = path.resolve(projectDirInput);
  const rendered = await renderCurrentProject(projectDir);
  if ("error" in rendered) {
    return { success: false, projectDir, error: rendered.error };
  }

  const { renderHashes } = rendered;
  const manifest = await readScaffoldManifest(projectDir);
  const baseline = manifest?.hashes ?? {};
  const hasBaseline = manifest !== null;

  const files: UpgradeFileEntry[] = [];
  const renderPaths = [...renderHashes.keys()].sort();

  for (const filePath of renderPaths) {
    const renderHash = renderHashes.get(filePath) as string;
    const fullPath = path.join(projectDir, filePath);

    if (!(await fs.pathExists(fullPath))) {
      files.push({ path: filePath, category: "new-file" });
      continue;
    }

    const diskBytes = await fs.readFile(fullPath).catch(() => undefined);
    if (!diskBytes) {
      files.push({ path: filePath, category: "manual", reason: "unreadable on disk" });
      continue;
    }

    const diskHash = hashContent(diskBytes);
    if (diskHash === renderHash) {
      files.push({ path: filePath, category: "unchanged" });
      continue;
    }

    if (isSkippableDoc(filePath)) {
      // Regenerated per project mode — not real template drift, never patched.
      continue;
    }

    if (isStructuredMergeFile(filePath)) {
      files.push({
        path: filePath,
        category: "manual",
        reason: "post-processed file — merge dependencies/env by hand",
      });
      continue;
    }

    const baselineHash = baseline[filePath];
    if (baselineHash === undefined) {
      files.push({
        path: filePath,
        category: "manual",
        reason: hasBaseline
          ? "no baseline recorded for this file"
          : "no scaffold baseline — run `update --record-baseline` first",
      });
      continue;
    }

    if (diskHash === baselineHash) {
      // Disk untouched since scaffold, but the template moved -> safe to patch.
      files.push({ path: filePath, category: "drift" });
      continue;
    }

    if (renderHash === baselineHash) {
      // Template unchanged, but the user edited the file -> keep as-is.
      files.push({ path: filePath, category: "user-edited" });
      continue;
    }

    // Both the template and the local copy diverged from the baseline.
    files.push({
      path: filePath,
      category: "conflict",
      reason: "both the template and your local copy changed",
    });
  }

  const renderPathSet = new Set(renderPaths);
  const removed: string[] = [];
  for (const baselinePath of Object.keys(baseline)) {
    if (renderPathSet.has(baselinePath) || isStructuredMergeFile(baselinePath)) continue;
    if (await fs.pathExists(path.join(projectDir, baselinePath))) {
      removed.push(baselinePath);
    }
  }
  for (const removedPath of removed.sort()) {
    files.push({
      path: removedPath,
      category: "removed",
      reason: "no longer produced by the current templates (not auto-deleted)",
    });
  }

  return summarize(projectDir, files, manifest);
}

/**
 * Apply the safe part of the plan: overwrite template-drift files and write
 * brand-new template files, then refresh the baseline for every file that now
 * matches the current render. Conflicts, local edits, and post-processed files
 * are left untouched (and reported by the caller for manual review).
 */
export async function applyScaffoldUpgrade(projectDirInput: string): Promise<UpgradeApplyResult> {
  const plan = await planScaffoldUpgrade(projectDirInput);
  if (!plan.success) return plan;

  const { projectDir } = plan;
  const rendered = await renderCurrentProject(projectDir);
  if ("error" in rendered) {
    return { success: false, projectDir, error: rendered.error };
  }

  const { tree, renderHashes } = rendered;
  const toWrite = new Set([...plan.drift, ...plan.newFiles]);
  if (toWrite.size > 0) {
    await writeSelectedFiles(tree, projectDir, (candidate) => toWrite.has(candidate));
  }

  const manifest = await readScaffoldManifest(projectDir);
  if (manifest) {
    // Every file that now equals the current render becomes the new baseline;
    // user-edited / conflict / manual files keep their original baseline so a
    // later update can still tell they diverged.
    for (const filePath of new Set([...plan.unchanged, ...toWrite])) {
      const renderHash = renderHashes.get(filePath);
      if (renderHash) manifest.hashes[filePath] = renderHash;
    }
    await writeScaffoldManifest(projectDir, manifest);
  }

  return { ...plan, applied: { patched: [...plan.drift], added: [...plan.newFiles] } };
}
