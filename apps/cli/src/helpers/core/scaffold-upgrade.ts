import type { VirtualFileTree } from "@better-fullstack/template-generator";

import {
  lifecycleResult,
  type LifecycleDependencyChange,
  type LifecycleResult,
} from "@better-fullstack/project-lifecycle/contracts";
import { createReviewToken } from "@better-fullstack/project-lifecycle/review-token";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  rollbackProjectTransaction,
  writeProjectTransactionFile,
} from "@better-fullstack/project-lifecycle/transaction";
import { writeSelectedFiles } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { readBtsConfig } from "@/config/bts-config";
import {
  configFromBtsConfig,
  formatGeneratedTree,
  generateTree,
  mergeEnvExample,
  mergePackageJson,
  PACKAGE_JSON_SECTIONS,
  treeToFileMap,
} from "@/helpers/core/stack-update";
import { getProjectRecoveryCommand } from "@/lifecycle/lifecycle-command";
import {
  getCurrentLifecycleVersions,
  hashContent,
  isStructuredBaselinePath,
  readScaffoldManifest,
  readScaffoldManifestResult,
  serializeScaffoldManifest,
  SCAFFOLD_MANIFEST_FILE,
  type ScaffoldManifest,
} from "@/lifecycle/scaffold-manifest";
import { formatCode } from "@/platform/file-formatter";

const BINARY_FILE_MARKER = "[Binary file]";
const EXECUTABLE_FILE_NAMES = new Set(["mvnw", "gradlew"]);

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

function isStructuredMergeFile(relPath: string): boolean {
  return isConservativeFile(relPath) || isStructuredBaselinePath(relPath);
}

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
  preserveBaseline?: boolean;
  mergedContent?: string;
  dependencyChanges?: LifecycleDependencyChange[];
};

function lifecycleDependencyChanges(
  filePath: string,
  changes: Record<string, Record<string, string>>,
): LifecycleDependencyChange[] {
  return Object.entries(changes).flatMap(([section, dependencies]) =>
    Object.entries(dependencies).map(([name, version]) => ({
      name,
      action: version === "removed" ? ("remove" as const) : ("update" as const),
      ...(version === "removed" ? {} : { version }),
      target: `${filePath}:${section}`,
      dev: section === "devDependencies",
    })),
  );
}

export type UpgradePlan = {
  success: true;
  projectDir: string;
  projectRealpath: string;
  configHash: string;
  manifestHash: string | null;
  hasBaseline: boolean;
  manifestState: "missing" | "valid" | "invalid";
  manifestError?: string;
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
  actionable: string[];
  actionableHashes: Record<string, string>;
  actionablePreimages: Record<string, string | "absent">;
  lifecycle: LifecycleResult;
};

export type UpgradeResult = UpgradePlan | { success: false; projectDir?: string; error: string };

export type UpgradeApplyResult =
  | (UpgradePlan & {
      applied: { patched: string[]; added: string[]; merged: string[] };
      recoveryId: string;
      lifecycle: LifecycleResult;
    })
  | { success: false; projectDir?: string; error: string; lifecycle?: LifecycleResult };

export function getUpgradePlanDigest(plan: UpgradePlan): string {
  return createReviewToken("template-update", {
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
      dependencyChanges: file.dependencyChanges,
    })),
    actionable: plan.actionable,
    actionableHashes: plan.actionableHashes,
    actionablePreimages: plan.actionablePreimages,
    lifecycle: plan.lifecycle,
  });
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
  return `${reason}. Apply stopped and the transaction restored every bound preimage.`;
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

async function readRenderedFileBytes(tree: VirtualFileTree, filePath: string): Promise<Buffer> {
  const file = treeToFileMap(tree).get(filePath);
  if (!file) throw new Error(`Rendered transaction output is missing: ${filePath}`);
  if (file.content !== BINARY_FILE_MARKER) return Buffer.from(file.content, "utf-8");

  const tempDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-update-binary-write-"));
  try {
    const written = await writeSelectedFiles(tree, tempDir, (candidate) => candidate === filePath);
    if (!written.includes(filePath)) {
      throw new Error(`Rendered binary transaction output is missing: ${filePath}`);
    }
    return await fs.readFile(path.join(tempDir, filePath));
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

export async function renderCurrentProject(
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
    return [];
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

function classifyStructuredMerge(
  filePath: string,
  existingContent: string,
  proposedContent: string | undefined,
  baselineContent: string | undefined,
): UpgradeFileEntry {
  if (proposedContent === undefined || proposedContent === BINARY_FILE_MARKER) {
    return { path: filePath, category: "manual", reason: "no comparable template render" };
  }

  if (baselineContent === undefined) {
    return {
      path: filePath,
      category: "manual",
      reason:
        "no structured-merge baseline recorded; merge by hand or complete the token-bound `adopt` flow",
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
        dependencyChanges: lifecycleDependencyChanges(filePath, merged.dependencyChanges),
      };
    }
    return {
      path: filePath,
      category: "user-edited",
      reason: "template dependencies/scripts unchanged — local changes kept",
    };
  }

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
  manifestState: "missing" | "valid" | "invalid",
  manifestError: string | undefined,
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
  const conflicts = byCategory("conflict");
  const manual = files.filter((file) => file.category === "manual");
  const removed = byCategory("removed");
  const provenanceVerified = manifest?.provenance.state === "verified";
  const blockers = [
    ...conflicts.map((filePath) => `${filePath}: template and local copy both changed`),
    ...manual.map((entry) => `${entry.path}: ${entry.reason ?? "manual review required"}`),
  ];
  const affectedFiles = [
    ...newFiles.map((filePath) => ({ path: filePath, action: "create" as const })),
    ...drift.map((filePath) => ({ path: filePath, action: "update" as const })),
    ...merged.map((filePath) => ({ path: filePath, action: "merge" as const })),
    { path: SCAFFOLD_MANIFEST_FILE, action: "update" as const },
  ];
  const affectedDependencies = files.flatMap((file) => file.dependencyChanges ?? []);

  return {
    success: true,
    projectDir,
    projectRealpath: projectDir,
    configHash,
    manifestHash,
    hasBaseline: manifest !== null,
    manifestState,
    manifestError,
    manifestVersion: manifest?.version,
    baselineCreatedAt: manifest?.createdAt,
    files,
    unchanged: byCategory("unchanged"),
    drift,
    userEdited: byCategory("user-edited"),
    conflicts,
    manual,
    merged,
    newFiles,
    removed,
    actionable: [...drift, ...merged, ...newFiles].sort(),
    actionableHashes,
    actionablePreimages,
    lifecycle: lifecycleResult({
      operation: "template-update",
      status: "planned",
      projectDir,
      changes: {
        added: newFiles.length,
        patched: drift.length,
        merged: merged.length,
        removed: removed.length,
        manual: conflicts.length + manual.length,
      },
      blockers,
      provenance: {
        source: manifest?.provenance.current ?? null,
        target: getCurrentLifecycleVersions(),
        verified: provenanceVerified,
      },
      recovery: { available: true, automaticRollback: true },
      affected: {
        stackParts: [],
        files: affectedFiles,
        dependencies: affectedDependencies,
      },
      manualReviewReasons: blockers,
      checks: Object.keys(actionablePreimages).map((filePath) => ({
        id: `preimage:${filePath}`,
        status: "pass",
      })),
      sideEffects: [
        {
          kind: "filesystem",
          status: "planned",
          description: "Apply current-template drift in one recovery transaction.",
        },
      ],
      nextActions: ["Review the complete plan before apply."],
    }),
  };
}

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
      if (path.basename(filePath) === ".env") {
        files.push({
          path: filePath,
          category: "manual",
          reason: "secrets file is absent — create it manually; never generated during update",
        });
        continue;
      }
      const renderedContent = renderFiles.get(filePath)?.content;
      files.push({
        path: filePath,
        category: "new-file",
        ...(renderedContent !== undefined && renderedContent !== BINARY_FILE_MARKER
          ? { mergedContent: renderedContent }
          : {}),
      });
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
          : "no scaffold baseline; run the read-only `adopt` plan and confirm its exact token first",
      });
      continue;
    }

    if (diskHash === baselineHash) {
      files.push({
        path: filePath,
        category: "drift",
        ...(renderedContent !== undefined && renderedContent !== BINARY_FILE_MARKER
          ? { mergedContent: renderedContent }
          : {}),
      });
      continue;
    }

    if (renderHash === baselineHash) {
      files.push({ path: filePath, category: "user-edited" });
      continue;
    }

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
    manifestResult.status,
    manifestResult.status === "invalid" ? manifestResult.error : undefined,
    configHashBefore,
    manifestHashBefore,
    actionableHashes,
    actionablePreimages,
  );
}

export async function applyScaffoldUpgrade(
  projectDirInput: string,
  options: {
    expectedPlanDigest?: string;
    acknowledgeUnprovenManifestV1?: boolean;
    afterActionableWrite?: (input: { path: string; index: number }) => void | Promise<void>;
  } = {},
): Promise<UpgradeApplyResult> {
  const plan = await planScaffoldUpgrade(projectDirInput);
  if (!plan.success) return plan;
  if (plan.manifestState === "invalid") {
    return {
      success: false,
      projectDir: plan.projectDir,
      error: `Refusing to apply with a malformed ${SCAFFOLD_MANIFEST_FILE}: ${plan.manifestError ?? "unknown validation failure"}. Fix the manifest or re-record the baseline first.`,
    };
  }
  if (!plan.hasBaseline || !plan.manifestHash || plan.manifestVersion !== "2") {
    return {
      success: false,
      projectDir: plan.projectDir,
      error:
        "Refusing apply without a readable manifest v2 baseline. Migrate or adopt a baseline first.",
    };
  }
  if (!plan.lifecycle.provenance.verified && options.acknowledgeUnprovenManifestV1 !== true) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error:
        "This manifest was migrated or adopted without verified generator lineage. Set acknowledgeUnprovenManifestV1: true after reviewing the transactional recovery plan.",
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
  const projectPackageManager = (await readBtsConfig(projectDir))?.packageManager;
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
  const mergedEntries = plan.files.filter(
    (file): file is UpgradeFileEntry & { mergedContent: string } =>
      file.category === "merged" && file.mergedContent !== undefined,
  );
  let transaction;
  try {
    transaction = await beginProjectTransaction(projectDir, "template-update", [
      ...plan.actionable,
      SCAFFOLD_MANIFEST_FILE,
    ]);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: `Could not create the recovery snapshot: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
  let actionableIndex = 0;
  const failWrites = async (error: unknown): Promise<UpgradeApplyResult> => {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await rollbackProjectTransaction(transaction);
    } catch (rollbackError) {
      return {
        success: false,
        projectDir,
        error: `${message}. Automatic rollback also failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}. Recovery transaction: ${transaction.id}.`,
        lifecycle: lifecycleResult({
          ...plan.lifecycle,
          status: "failed",
          recovery: {
            available: true,
            transactionId: transaction.id,
            command: getProjectRecoveryCommand(
              projectDir,
              transaction.id,
              process.platform,
              projectPackageManager,
            ),
          },
          history: { recorded: true, recoveryId: transaction.id },
          sideEffects: plan.lifecycle.sideEffects.map((sideEffect) => ({
            ...sideEffect,
            status: "failed" as const,
          })),
        }),
      };
    }
    return {
      success: false,
      projectDir,
      error: partialWriteError(message),
      lifecycle: lifecycleResult({
        ...plan.lifecycle,
        status: "rolled-back",
        recovery: { available: true, transactionId: transaction.id, automaticRollback: true },
        history: { recorded: true, recoveryId: transaction.id },
        sideEffects: plan.lifecycle.sideEffects.map((sideEffect) => ({
          ...sideEffect,
          status: "restored" as const,
        })),
      }),
    };
  };
  for (const candidate of [...toWrite].sort()) {
    try {
      await assertActionablePreimage(plan, candidate);
      const content = await readRenderedFileBytes(tree, candidate);
      await writeProjectTransactionFile(transaction, candidate, content, {
        expectedSha256: plan.actionableHashes[candidate],
        ...(EXECUTABLE_FILE_NAMES.has(path.basename(candidate)) ? { mode: 0o755 } : {}),
      });
      const written = await fs.readFile(path.join(projectDir, candidate));
      if (hashContent(written) !== plan.actionableHashes[candidate]) {
        throw new Error(`Written bytes did not match the reviewed plan: ${candidate}`);
      }
      await options.afterActionableWrite?.({ path: candidate, index: actionableIndex });
      actionableIndex += 1;
    } catch (error) {
      return await failWrites(error);
    }
  }

  for (const entry of mergedEntries) {
    try {
      await assertActionablePreimage(plan, entry.path);
      await writeProjectTransactionFile(transaction, entry.path, entry.mergedContent, {
        expectedSha256: plan.actionableHashes[entry.path],
      });
      const written = await fs.readFile(path.join(projectDir, entry.path));
      if (hashContent(written) !== plan.actionableHashes[entry.path]) {
        throw new Error(`Written bytes did not match the reviewed plan: ${entry.path}`);
      }
      await options.afterActionableWrite?.({ path: entry.path, index: actionableIndex });
      actionableIndex += 1;
    } catch (error) {
      return await failWrites(error);
    }
  }

  const stateErrorBeforeRefresh = await verifyAppliedActionableState(plan);
  if (stateErrorBeforeRefresh) {
    return await failWrites(stateErrorBeforeRefresh);
  }

  const manifest = await readScaffoldManifest(projectDir);
  if (manifest) {
    if ((await readManifestHash(projectDir)) !== plan.manifestHash) {
      return await failWrites("bts.lock.json changed before baseline refresh");
    }
    const preserveBaselines = new Set(
      plan.files.filter((file) => file.preserveBaseline).map((file) => file.path),
    );
    for (const filePath of new Set([...plan.unchanged, ...toWrite])) {
      if (preserveBaselines.has(filePath)) continue;
      const renderHash = renderHashes.get(filePath);
      if (renderHash) manifest.hashes[filePath] = renderHash;
    }
    for (const filePath of plan.newFiles) {
      // oxlint-disable-next-line no-await-in-loop -- each newly generated file records its exact mode
      const stats = await fs.stat(path.join(projectDir, filePath));
      (manifest.modes ??= {})[filePath] = stats.mode & 0o7777;
    }
    for (const entry of mergedEntries) {
      manifest.hashes[entry.path] = hashContent(Buffer.from(entry.mergedContent, "utf-8"));
    }
    const renderFiles = treeToFileMap(tree);
    const reconciled = [...plan.unchanged, ...toWrite, ...mergedEntries.map((entry) => entry.path)];
    for (const filePath of reconciled) {
      if (!isStructuredBaselinePath(filePath)) continue;
      const content = renderFiles.get(filePath)?.content;
      if (content !== undefined && content !== BINARY_FILE_MARKER) {
        (manifest.baselines ??= {})[filePath] = content;
      }
    }
    const completedAt = new Date().toISOString();
    const targetVersions = getCurrentLifecycleVersions();
    manifest.updatedAt = completedAt;
    manifest.history.push({
      id: hashContent(`template-update:${completedAt}:${projectDir}`).slice(0, 24),
      operation: "template-update",
      completedAt,
      source: manifest.provenance.current,
      target: targetVersions,
      changes: plan.lifecycle.changes,
      recoveryId: transaction.id,
    });
    manifest.provenance.current = targetVersions;
    try {
      await validateWritePath(plan.projectRealpath, SCAFFOLD_MANIFEST_FILE);
      const manifestContent = serializeScaffoldManifest(manifest);
      await writeProjectTransactionFile(transaction, SCAFFOLD_MANIFEST_FILE, manifestContent);
    } catch (error) {
      return await failWrites(error);
    }
  }

  const stateErrorAfterRefresh = await verifyAppliedActionableState(plan);
  if (stateErrorAfterRefresh) {
    return await failWrites(stateErrorAfterRefresh);
  }
  try {
    await commitProjectTransaction(transaction);
  } catch (error) {
    return await failWrites(error);
  }

  return {
    ...plan,
    recoveryId: transaction.id,
    lifecycle: lifecycleResult({
      ...plan.lifecycle,
      status: "applied",
      recovery: {
        available: true,
        transactionId: transaction.id,
        command: getProjectRecoveryCommand(
          projectDir,
          transaction.id,
          process.platform,
          projectPackageManager,
        ),
        automaticRollback: true,
      },
      history: { recorded: true, recoveryId: transaction.id },
      sideEffects: plan.lifecycle.sideEffects.map((sideEffect) => ({
        ...sideEffect,
        status: "applied" as const,
      })),
      nextActions: ["Run `create-better-fullstack check` to verify every generated target."],
    }),
    applied: {
      patched: [...plan.drift],
      added: [...plan.newFiles],
      merged: mergedEntries.map((entry) => entry.path),
    },
  };
}
