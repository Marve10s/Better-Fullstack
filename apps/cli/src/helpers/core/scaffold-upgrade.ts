import type { VirtualFileTree } from "@better-fullstack/template-generator";

import { writeSelectedFiles } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { readBtsConfig } from "../../utils/bts-config";
import { formatCode } from "../../utils/file-formatter";
import {
  collectStructuredBaselines,
  hashContent,
  isStructuredBaselinePath,
  readScaffoldManifest,
  readScaffoldManifestResult,
  recordScaffoldManifest,
  SCAFFOLD_MANIFEST_FILE,
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
  /** Keep a raw browser-ZIP baseline when disk bytes only differ by formatting. */
  preserveBaseline?: boolean;
  /** Merge result to write on `--apply` (category "merged" only). */
  mergedContent?: string;
};

export type UpgradePlan = {
  success: true;
  projectDir: string;
  projectRealpath: string;
  configHash: string;
  /** Exact raw bytes of bts.lock.json at review time. */
  manifestHash: string | null;
  hasBaseline: boolean;
  manifestVersion?: string;
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
  /** Exact intended bytes for every actionable path, keyed by project-relative path. */
  actionableHashes: Record<string, string>;
  /** On-disk bytes each actionable path must still have, or "absent". */
  actionablePreimages: Record<string, string | "absent">;
};

export type UpgradeResult = UpgradePlan | { success: false; projectDir?: string; error: string };

export type UpgradeApplyResult =
  | (UpgradePlan & { applied: { patched: string[]; added: string[]; merged: string[] } })
  | { success: false; projectDir?: string; error: string };

/** Stable binding for a reviewed plan. Includes merged file contents, not just paths. */
export function getUpgradePlanDigest(plan: UpgradePlan): string {
  return hashContent(
    JSON.stringify({
      projectDir: plan.projectDir,
      projectRealpath: plan.projectRealpath,
      configHash: plan.configHash,
      manifestHash: plan.manifestHash,
      hasBaseline: plan.hasBaseline,
      manifestVersion: plan.manifestVersion,
      baselineCreatedAt: plan.baselineCreatedAt,
      files: plan.files.map((file) => ({
        path: file.path,
        category: file.category,
        reason: file.reason,
        preserveBaseline: file.preserveBaseline,
        mergedContent: file.mergedContent,
      })),
      actionable: plan.actionable,
      actionableHashes: plan.actionableHashes,
      actionablePreimages: plan.actionablePreimages,
    }),
  );
}

async function canonicalProjectDir(projectDirInput: string): Promise<string> {
  const resolved = path.resolve(projectDirInput);
  return fs.realpath(resolved).catch(() => resolved);
}

async function readConfigHash(projectDir: string): Promise<string | null> {
  const bytes = await fs.readFile(path.join(projectDir, "bts.jsonc")).catch(() => null);
  return bytes ? hashContent(bytes) : null;
}

async function readManifestHash(projectDir: string): Promise<string | null> {
  const bytes = await fs.readFile(path.join(projectDir, SCAFFOLD_MANIFEST_FILE)).catch(() => null);
  return bytes ? hashContent(bytes) : null;
}

async function verifyAppliedActionableState(plan: UpgradePlan): Promise<string | null> {
  if ((await readConfigHash(plan.projectDir)) !== plan.configHash) {
    return "bts.jsonc changed during apply";
  }
  for (const filePath of plan.actionable) {
    try {
      // Revalidate observed path state as well as bytes. This detects ordinary
      // concurrent changes; it is not a transaction or active-adversary guard.
      // oxlint-disable-next-line no-await-in-loop
      await validateWritePath(plan.projectRealpath, filePath);
      // oxlint-disable-next-line no-await-in-loop
      const bytes = await fs.readFile(path.join(plan.projectDir, filePath));
      if (hashContent(bytes) !== plan.actionableHashes[filePath]) {
        return `${filePath} changed after it was written`;
      }
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }
  return null;
}

function partialWriteError(reason: string): string {
  return `${reason}. Apply stopped after partial writes; no rollback was performed. Inspect the project and create a new plan.`;
}

function intendedActionableHashes(
  files: UpgradeFileEntry[],
  renderHashes: Map<string, string>,
): Record<string, string> | null {
  const hashes: Record<string, string> = {};
  for (const file of files) {
    if (!new Set<UpgradeCategory>(["drift", "merged", "new-file"]).has(file.category)) continue;
    const intended =
      file.category === "merged" && file.mergedContent !== undefined
        ? hashContent(Buffer.from(file.mergedContent, "utf-8"))
        : renderHashes.get(file.path);
    if (!intended) return null;
    hashes[file.path] = intended;
  }
  return Object.fromEntries(Object.entries(hashes).sort(([a], [b]) => a.localeCompare(b)));
}

function isInsideRoot(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

async function validateWritePath(projectRealpath: string, relativePath: string): Promise<void> {
  if (path.isAbsolute(relativePath) || relativePath.split(/[\\/]/).includes("..")) {
    throw new Error(`Unsafe actionable path escapes the project: ${relativePath}`);
  }
  const target = path.resolve(projectRealpath, relativePath);
  if (!isInsideRoot(projectRealpath, target)) {
    throw new Error(`Unsafe actionable path escapes the project: ${relativePath}`);
  }

  let current = projectRealpath;
  for (const segment of path.relative(projectRealpath, target).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    const stats = await fs.lstat(current).catch(() => null);
    if (!stats) break;
    if (stats.isSymbolicLink()) {
      throw new Error(`Refusing to write through symlinked target or parent: ${relativePath}`);
    }
  }
}

async function readActionablePreimage(
  projectRealpath: string,
  relativePath: string,
): Promise<string | "absent"> {
  // These checks reject symlinks observed at this instant. They reduce
  // accidental path escapes, but are not a transaction or a guarantee against
  // an active local filesystem adversary racing the subsequent write.
  await validateWritePath(projectRealpath, relativePath);
  const target = path.join(projectRealpath, relativePath);
  const stats = await fs.lstat(target).catch(() => null);
  if (!stats) return "absent";
  if (!stats.isFile()) throw new Error(`Actionable target is not a regular file: ${relativePath}`);
  return hashContent(await fs.readFile(target));
}

async function collectActionablePreimages(
  projectRealpath: string,
  actionable: string[],
): Promise<Record<string, string | "absent">> {
  const entries: Array<[string, string | "absent"]> = [];
  for (const relativePath of [...actionable].sort()) {
    // eslint-disable-next-line no-await-in-loop -- each path is checked against one observed tree
    entries.push([relativePath, await readActionablePreimage(projectRealpath, relativePath)]);
  }
  return Object.fromEntries(entries);
}

async function assertActionablePreimage(plan: UpgradePlan, relativePath: string): Promise<void> {
  const expected = plan.actionablePreimages[relativePath];
  if (expected === undefined) {
    throw new Error(`Reviewed plan has no preimage binding for ${relativePath}`);
  }
  const actual = await readActionablePreimage(plan.projectRealpath, relativePath);
  if (actual !== expected) {
    throw new Error(
      `Refusing to overwrite ${relativePath}: its bytes changed after review. Create and review a new plan.`,
    );
  }
}

async function validatePlanWritePaths(plan: UpgradePlan): Promise<void> {
  const actualRealpath = await fs.realpath(plan.projectDir);
  if (actualRealpath !== plan.projectRealpath) {
    throw new Error("Project canonical path changed after planning.");
  }
  for (const relativePath of [...plan.actionable, SCAFFOLD_MANIFEST_FILE]) {
    await validateWritePath(plan.projectRealpath, relativePath);
  }
}

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
  configHash: string,
  manifestHash: string | null,
  actionableHashes: Record<string, string>,
  actionablePreimages: Record<string, string | "absent">,
): UpgradePlan {
  const byCategory = (category: UpgradeCategory) =>
    files.filter((file) => file.category === category).map((file) => file.path);
  const drift = byCategory("drift");
  const merged = byCategory("merged");
  const newFiles = byCategory("new-file");

  return {
    success: true,
    projectDir,
    projectRealpath: projectDir,
    configHash,
    manifestHash,
    hasBaseline: manifest !== null,
    manifestVersion: manifest?.version,
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
    actionableHashes,
    actionablePreimages,
  };
}

/**
 * Classify every current-template file against the on-disk project and the
 * recorded scaffold baseline. Pure read-only planning — writes nothing.
 */
export async function planScaffoldUpgrade(projectDirInput: string): Promise<UpgradeResult> {
  const projectDir = await canonicalProjectDir(projectDirInput);
  const configHashBefore = await readConfigHash(projectDir);
  const manifestHashBefore = await readManifestHash(projectDir);
  if (!configHashBefore) {
    return { success: false, projectDir, error: `No bts.jsonc found in ${projectDir}.` };
  }
  const rendered = await renderCurrentProject(projectDir);
  if ("error" in rendered) {
    return { success: false, projectDir, error: rendered.error };
  }

  const { tree, renderHashes } = rendered;
  const renderFiles = treeToFileMap(tree);
  const manifestResult = await readScaffoldManifestResult(projectDir);
  if (manifestResult.status === "invalid") {
    return {
      success: false,
      projectDir,
      error: `Unsupported malformed ${SCAFFOLD_MANIFEST_FILE}: ${manifestResult.error}`,
    };
  }
  const manifest = manifestResult.status === "valid" ? manifestResult.manifest : null;
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

    const renderedContent = renderFiles.get(filePath)?.content;
    if (renderedContent !== undefined && renderedContent !== BINARY_FILE_MARKER) {
      // Browser ZIPs record the raw generator bytes, while CLI generation runs
      // the formatter before recording its manifest. Treat formatting-only
      // differences as unchanged without replacing the raw baseline: a future
      // substantive template change will still compare against those bytes.
      // oxlint-disable-next-line no-await-in-loop
      const formattedDisk = await formatCode(filePath, diskBytes.toString("utf-8"));
      if (
        formattedDisk !== null &&
        hashContent(Buffer.from(formattedDisk, "utf-8")) === renderHash
      ) {
        files.push({ path: filePath, category: "unchanged", preserveBaseline: true });
        continue;
      }
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
  const configHashAfter = await readConfigHash(projectDir);
  if (configHashAfter !== configHashBefore) {
    return { success: false, projectDir, error: "bts.jsonc changed while planning; retry." };
  }
  if ((await readManifestHash(projectDir)) !== manifestHashBefore) {
    return { success: false, projectDir, error: "bts.lock.json changed while planning; retry." };
  }
  const actionableHashes = intendedActionableHashes(files, renderHashes);
  if (!actionableHashes) {
    return {
      success: false,
      projectDir,
      error: "Could not bind every actionable file to intended template bytes.",
    };
  }

  const actionable = files
    .filter((file) => new Set<UpgradeCategory>(["drift", "merged", "new-file"]).has(file.category))
    .map((file) => file.path)
    .sort();
  let actionablePreimages: Record<string, string | "absent">;
  try {
    actionablePreimages = await collectActionablePreimages(projectDir, actionable);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return summarize(
    projectDir,
    files,
    manifest,
    configHashBefore,
    manifestHashBefore,
    actionableHashes,
    actionablePreimages,
  );
}

/**
 * Apply an explicitly acknowledged, destructive subset of the plan: overwrite template-drift files, write
 * brand-new template files, write structured merges (package.json /
 * *.env.example), then refresh the baseline for every file that was reconciled
 * with the current render. Conflicts, local edits, and lockfiles/secrets are
 * left untouched (and reported by the caller for manual review).
 */
export async function applyScaffoldUpgrade(
  projectDirInput: string,
  options: {
    expectedPlanDigest?: string;
    acknowledgeUnprovenManifestV1?: boolean;
    /** Test-only concurrency hook; production callers must not depend on it. */
    afterActionableWrite?: (input: { path: string; index: number }) => void | Promise<void>;
  } = {},
): Promise<UpgradeApplyResult> {
  if (options.acknowledgeUnprovenManifestV1 !== true) {
    return {
      success: false,
      projectDir: await canonicalProjectDir(projectDirInput),
      error:
        "Refusing destructive manifest-v1 apply without acknowledgeUnprovenManifestV1: true. Manifest v1 has no release provenance and no backup/recovery.",
    };
  }
  const plan = await planScaffoldUpgrade(projectDirInput);
  if (!plan.success) return plan;
  if (!plan.hasBaseline || !plan.manifestHash || plan.manifestVersion !== "1") {
    return {
      success: false,
      projectDir: plan.projectDir,
      error:
        "Refusing destructive apply without a readable manifest v1 baseline. Manual baseline adoption is required first and still does not prove release lineage.",
    };
  }

  if (
    options.expectedPlanDigest !== undefined &&
    getUpgradePlanDigest(plan) !== options.expectedPlanDigest
  ) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error:
        "The project changed after this update plan was reviewed. Create and review a new plan.",
    };
  }

  const { projectDir } = plan;
  try {
    await validatePlanWritePaths(plan);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: error instanceof Error ? error.message : String(error),
    };
  }
  if ((await readConfigHash(projectDir)) !== plan.configHash) {
    return {
      success: false,
      projectDir,
      error: "bts.jsonc changed after planning. Create and review a new plan.",
    };
  }
  if ((await readManifestHash(projectDir)) !== plan.manifestHash) {
    return {
      success: false,
      projectDir,
      error: "bts.lock.json changed after planning. Create and review a new plan.",
    };
  }
  const rendered = await renderCurrentProject(projectDir);
  if ("error" in rendered) {
    return { success: false, projectDir, error: rendered.error };
  }

  const { tree, renderHashes } = rendered;
  const rerenderedActionableHashes = intendedActionableHashes(plan.files, renderHashes);
  if (
    !rerenderedActionableHashes ||
    JSON.stringify(rerenderedActionableHashes) !== JSON.stringify(plan.actionableHashes)
  ) {
    return {
      success: false,
      projectDir,
      error: "Rendered actionable bytes changed after planning. Create and review a new plan.",
    };
  }
  const toWrite = new Set([...plan.drift, ...plan.newFiles]);
  let actionableIndex = 0;
  for (const candidate of [...toWrite].sort()) {
    try {
      await assertActionablePreimage(plan, candidate);
      await writeSelectedFiles(tree, projectDir, (filePath) => filePath === candidate);
      const written = await fs.readFile(path.join(projectDir, candidate));
      if (hashContent(written) !== plan.actionableHashes[candidate]) {
        throw new Error(`Written bytes did not match the reviewed plan: ${candidate}`);
      }
      await options.afterActionableWrite?.({ path: candidate, index: actionableIndex });
      actionableIndex += 1;
    } catch (error) {
      return {
        success: false,
        projectDir,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  const mergedEntries = plan.files.filter(
    (file): file is UpgradeFileEntry & { mergedContent: string } =>
      file.category === "merged" && file.mergedContent !== undefined,
  );
  for (const entry of mergedEntries) {
    try {
      await assertActionablePreimage(plan, entry.path);
      await fs.writeFile(path.join(projectDir, entry.path), entry.mergedContent, "utf-8");
      const written = await fs.readFile(path.join(projectDir, entry.path));
      if (hashContent(written) !== plan.actionableHashes[entry.path]) {
        throw new Error(`Written bytes did not match the reviewed plan: ${entry.path}`);
      }
      await options.afterActionableWrite?.({ path: entry.path, index: actionableIndex });
      actionableIndex += 1;
    } catch (error) {
      return {
        success: false,
        projectDir,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  const stateErrorBeforeRefresh = await verifyAppliedActionableState(plan);
  if (stateErrorBeforeRefresh) {
    return { success: false, projectDir, error: partialWriteError(stateErrorBeforeRefresh) };
  }

  const manifest = await readScaffoldManifest(projectDir);
  if (manifest) {
    if ((await readManifestHash(projectDir)) !== plan.manifestHash) {
      return {
        success: false,
        projectDir,
        error:
          "bts.lock.json changed before baseline refresh. Written files were not rolled back; inspect them and create a new plan.",
      };
    }
    // Every file that now equals the current render becomes the new baseline;
    // user-edited / conflict / manual files keep their original baseline so a
    // later update can still tell they diverged.
    const preserveBaselines = new Set(
      plan.files.filter((file) => file.preserveBaseline).map((file) => file.path),
    );
    for (const filePath of new Set([...plan.unchanged, ...toWrite])) {
      if (preserveBaselines.has(filePath)) continue;
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
    try {
      await validateWritePath(plan.projectRealpath, SCAFFOLD_MANIFEST_FILE);
      await writeScaffoldManifest(projectDir, manifest);
    } catch (error) {
      return {
        success: false,
        projectDir,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  const stateErrorAfterRefresh = await verifyAppliedActionableState(plan);
  if (stateErrorAfterRefresh) {
    return { success: false, projectDir, error: partialWriteError(stateErrorAfterRefresh) };
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
  const projectDir = await canonicalProjectDir(projectDirInput);
  try {
    // This rejects symlinks observed now; like apply path checks, it is not a
    // transaction or protection against an active filesystem race.
    await validateWritePath(projectDir, SCAFFOLD_MANIFEST_FILE);
  } catch {
    return null;
  }
  const rendered = await renderCurrentProject(projectDir);
  const baselines = "error" in rendered ? undefined : collectStructuredBaselines(rendered.tree);
  return recordScaffoldManifest(projectDir, { baselines });
}
