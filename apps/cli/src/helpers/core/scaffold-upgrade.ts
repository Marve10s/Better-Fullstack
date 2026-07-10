import type { VirtualFileTree } from "@better-fullstack/template-generator";

import { writeSelectedFiles } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { readBtsConfig } from "../../utils/bts-config";
import {
  collectStructuredBaselines,
  hashContent,
  isStructuredBaselinePath,
  readScaffoldManifest,
  recordScaffoldManifest,
  type ScaffoldManifest,
  writeScaffoldManifest,
} from "../../utils/scaffold-manifest";
import {
  configFromBtsConfig,
  formatGeneratedTree,
  generateTree,
  mergeEnvExample,
  mergePackageJson,
  PACKAGE_JSON_SECTIONS,
  treeToFileMap,
} from "./stack-update";

const BINARY_FILE_MARKER = "[Binary file]";

/**
 * Files that are never auto-patched: lockfiles are install artifacts and `.env`
 * holds user secrets — both always go to manual review. package.json and
 * *.env.example (see isStructuredBaselinePath) get a structured merge instead.
 */
function isConservativeFile(relPath: string): boolean {
  const name = path.basename(relPath);
  return (
    name === ".env" ||
    name === "bun.lock" ||
    name === "bun.lockb" ||
    name === "package-lock.json" ||
    name === "pnpm-lock.yaml" ||
    name === "yarn.lock"
  );
}

/**
 * Files whose on-disk bytes are mutated by create-time post-processing
 * (package-manager version, dependency version channel, db-setup, addons) or by
 * dependency install, so their scaffold baseline is not a pure-template render.
 * They never take the plain hash-comparison path: they are either merged
 * structurally or routed to manual review.
 */
function isStructuredMergeFile(relPath: string): boolean {
  return isConservativeFile(relPath) || isStructuredBaselinePath(relPath);
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
  | "merged"
  | "new-file"
  | "removed";

export type UpgradeFileEntry = {
  path: string;
  category: UpgradeCategory;
  reason?: string;
  /** Merge result to write on `--apply` (category "merged" only). */
  mergedContent?: string;
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
  merged: string[];
  newFiles: string[];
  removed: string[];
  /** Files `--apply` would write: drift patches, structured merges, new files. */
  actionable: string[];
};

export type UpgradeResult = UpgradePlan | { success: false; projectDir?: string; error: string };

export type UpgradeApplyResult =
  | (UpgradePlan & { applied: { patched: string[]; added: string[]; merged: string[] } })
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

/** Deep equality ignoring object key order (renders may reorder catalog maps etc.). */
function deepEqualUnordered(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((item, index) => deepEqualUnordered(item, b[index]))
    );
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const aRecord = a as Record<string, unknown>;
    const bRecord = b as Record<string, unknown>;
    const aKeys = Object.keys(aRecord);
    return (
      aKeys.length === Object.keys(bRecord).length &&
      aKeys.every((key) => key in bRecord && deepEqualUnordered(aRecord[key], bRecord[key]))
    );
  }
  return false;
}

/**
 * Template-side package.json changes mergePackageJson cannot express: key
 * removals inside the merged sections and any change to other top-level fields
 * (exports, workspaces, type, ...). Files with such changes go to manual review
 * instead of being silently labeled user-edited or partially merged.
 */
function findUnmergeableTemplateChanges(
  previousContent: string,
  proposedContent: string,
): string[] {
  let previous: unknown;
  let proposed: unknown;
  try {
    previous = JSON.parse(previousContent);
    proposed = JSON.parse(proposedContent);
  } catch {
    return []; // mergePackageJson already reports invalid JSON as a blocker
  }
  const isRecord = (value: unknown): value is Record<string, unknown> =>
    Boolean(value && typeof value === "object" && !Array.isArray(value));
  if (!isRecord(previous) || !isRecord(proposed)) return [];

  const changes: string[] = [];
  const mergedSections = new Set<string>(PACKAGE_JSON_SECTIONS);
  for (const section of PACKAGE_JSON_SECTIONS) {
    const previousSection = isRecord(previous[section]) ? previous[section] : {};
    const proposedSection = isRecord(proposed[section]) ? proposed[section] : {};
    for (const key of Object.keys(previousSection)) {
      if (!(key in proposedSection)) changes.push(`${section}.${key} removed`);
    }
  }
  for (const key of new Set([...Object.keys(previous), ...Object.keys(proposed)])) {
    if (mergedSections.has(key)) continue;
    if (!deepEqualUnordered(previous[key], proposed[key])) changes.push(key);
  }
  return changes;
}

/**
 * Structured 3-way merge for package.json / *.env.example, reusing stack-update's
 * merge semantics: template-side changes (proposed vs the recorded render
 * baseline) are folded into the user's file; keys the user (or create-time
 * post-processing) changed are never overwritten — if the template also changed
 * such a key, the whole file becomes a conflict naming the blocked keys.
 */
function classifyStructuredMerge(
  filePath: string,
  existingContent: string,
  proposedContent: string | undefined,
  baselineContent: string | undefined,
): UpgradeFileEntry {
  if (proposedContent === undefined || proposedContent === BINARY_FILE_MARKER) {
    return { path: filePath, category: "manual", reason: "no comparable template render" };
  }

  // Without a recorded render baseline there is no "previous" side to diff
  // against: package.json cannot 3-way merge at all, and an env merge would
  // mistake every proposed key for a template addition and re-append keys the
  // user deliberately removed. Both fall back to manual review.
  if (baselineContent === undefined) {
    return {
      path: filePath,
      category: "manual",
      reason:
        "no structured-merge baseline recorded — merge by hand or re-run `update --record-baseline`",
    };
  }

  if (path.basename(filePath) === "package.json") {
    const merged = mergePackageJson(existingContent, baselineContent, proposedContent);
    if (merged.blockers.length > 0) {
      return {
        path: filePath,
        category: "conflict",
        reason: `template and local copy both changed: ${merged.blockers.join(", ")}`,
      };
    }
    const uncovered = findUnmergeableTemplateChanges(baselineContent, proposedContent);
    if (uncovered.length > 0) {
      return {
        path: filePath,
        category: "manual",
        reason: `template changes the merge cannot apply (${uncovered.join(", ")}) — update by hand`,
      };
    }
    if (merged.content) {
      return {
        path: filePath,
        category: "merged",
        reason: merged.summary.join("; "),
        mergedContent: merged.content,
      };
    }
    return {
      path: filePath,
      category: "user-edited",
      reason: "template dependencies/scripts unchanged — local changes kept",
    };
  }

  // *.env.example: append template-added keys; existing keys are never touched.
  const merged = mergeEnvExample(existingContent, baselineContent, proposedContent);
  if (merged.content) {
    return {
      path: filePath,
      category: "merged",
      reason: `adds ${merged.keys.join(", ")}`,
      mergedContent: merged.content,
    };
  }
  return {
    path: filePath,
    category: "user-edited",
    reason: "no new template env keys — local changes kept",
  };
}

function summarize(
  projectDir: string,
  files: UpgradeFileEntry[],
  manifest: ScaffoldManifest | null,
): UpgradePlan {
  const byCategory = (category: UpgradeCategory) =>
    files.filter((file) => file.category === category).map((file) => file.path);
  const drift = byCategory("drift");
  const merged = byCategory("merged");
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
    merged,
    newFiles,
    removed: byCategory("removed"),
    actionable: [...drift, ...merged, ...newFiles].sort(),
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

  const { tree, renderHashes } = rendered;
  const renderFiles = treeToFileMap(tree);
  const manifest = await readScaffoldManifest(projectDir);
  const baseline = manifest?.hashes ?? {};
  const hasBaseline = manifest !== null;

  const files: UpgradeFileEntry[] = [];
  const renderPaths = [...renderHashes.keys()].sort();

  for (const filePath of renderPaths) {
    const renderHash = renderHashes.get(filePath) as string;
    const fullPath = path.join(projectDir, filePath);

    if (!(await fs.pathExists(fullPath))) {
      if (baseline[filePath] !== undefined) {
        files.push({
          path: filePath,
          category: "user-edited",
          reason: "deleted locally",
        });
        continue;
      }
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

    if (isConservativeFile(filePath)) {
      files.push({
        path: filePath,
        category: "manual",
        reason: "lockfile / secrets file — never auto-patched",
      });
      continue;
    }

    if (isStructuredBaselinePath(filePath)) {
      files.push(
        classifyStructuredMerge(
          filePath,
          diskBytes.toString("utf-8"),
          renderFiles.get(filePath)?.content,
          manifest?.baselines?.[filePath],
        ),
      );
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
 * Apply the safe part of the plan: overwrite template-drift files, write
 * brand-new template files, write structured merges (package.json /
 * *.env.example), then refresh the baseline for every file that was reconciled
 * with the current render. Conflicts, local edits, and lockfiles/secrets are
 * left untouched (and reported by the caller for manual review).
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

  const mergedEntries = plan.files.filter(
    (file): file is UpgradeFileEntry & { mergedContent: string } =>
      file.category === "merged" && file.mergedContent !== undefined,
  );
  for (const entry of mergedEntries) {
    await fs.writeFile(path.join(projectDir, entry.path), entry.mergedContent, "utf-8");
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
    for (const entry of mergedEntries) {
      manifest.hashes[entry.path] = hashContent(Buffer.from(entry.mergedContent, "utf-8"));
    }
    // Structured-merge files reconciled with this render (unchanged, rewritten,
    // or merged) advance their content baseline so the next update diffs the
    // template against this render instead of the create-time one.
    const renderFiles = treeToFileMap(tree);
    const reconciled = [...plan.unchanged, ...toWrite, ...mergedEntries.map((entry) => entry.path)];
    for (const filePath of reconciled) {
      if (!isStructuredBaselinePath(filePath)) continue;
      const content = renderFiles.get(filePath)?.content;
      if (content !== undefined && content !== BINARY_FILE_MARKER) {
        (manifest.baselines ??= {})[filePath] = content;
      }
    }
    await writeScaffoldManifest(projectDir, manifest);
  }

  return {
    ...plan,
    applied: {
      patched: [...plan.drift],
      added: [...plan.newFiles],
      merged: mergedEntries.map((entry) => entry.path),
    },
  };
}

/**
 * Record the scaffold baseline for an existing project (`update
 * --record-baseline`): disk hashes plus, when the project still renders, the
 * structured-merge content baselines for package.json / *.env.example.
 */
export async function recordUpgradeBaseline(
  projectDirInput: string,
): Promise<ScaffoldManifest | null> {
  const projectDir = path.resolve(projectDirInput);
  const rendered = await renderCurrentProject(projectDir);
  const baselines = "error" in rendered ? undefined : collectStructuredBaselines(rendered.tree);
  return recordScaffoldManifest(projectDir, { baselines });
}
