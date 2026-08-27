import type { LifecycleResult } from "@better-fullstack/project-lifecycle/contracts";

import { lifecycleResult } from "@better-fullstack/project-lifecycle/contracts";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  rollbackProjectTransaction,
  type ProjectTransaction,
  writeProjectTransactionFile,
} from "@better-fullstack/project-lifecycle/transaction";
import { intro, log, outro } from "@clack/prompts";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";
import pc from "picocolors";

import type { AddInput, Addons, BetterTStackConfig, ProjectConfig } from "@/types";

import { readBtsConfig } from "@/config/bts-config";
import { getDefaultConfig } from "@/constants";
import {
  ADDONS_REQUIRING_IMPERATIVE_SETUP,
  isGitleaksSetupComplete,
  isLinterLefthookSetupComplete,
  repairExistingAddonSetup,
} from "@/helpers/addons/addons-setup";
import { installDependencies } from "@/helpers/core/install-dependencies";
import {
  applyStackUpdate,
  planStackUpdate,
  type StackUpdatePlan,
} from "@/helpers/core/stack-update";
import { getProjectRecoveryCommand } from "@/lifecycle/lifecycle-command";
import {
  getCurrentLifecycleVersions,
  hashContent,
  readScaffoldManifestResult,
  refreshScaffoldManifestFiles,
  SCAFFOLD_MANIFEST_FILE,
} from "@/lifecycle/scaffold-manifest";
import { isSilent, runWithContextAsync } from "@/presentation/context";
import { CLIError, UserCancelledError } from "@/presentation/errors";
import { renderTitle } from "@/presentation/render-title";
import { getCapabilityPartSpecsToAdd } from "@/prompts/developer/addons";
import { maybeShowTelemetryNotice, type TelemetrySource, trackEvent } from "@/telemetry/analytics";
import { getToolingCapability } from "@/types";

export interface AddHandlerOptions {
  silent?: boolean;
  telemetrySource?: TelemetrySource;
}

export interface AddResult {
  success: boolean;
  addedAddons: Addons[];
  projectDir: string;
  error?: string;
  setupWarnings?: string[];
  lifecycle?: LifecycleResult;
  recoveryId?: string;
  plan?: StackUpdatePlan | ExistingAddonRepairPlan;
}

export type ExistingAddonRepairPlan = {
  kind: "addon-repair";
  projectDir: string;
  addons: Addons[];
  files: Array<{
    path: string;
    action: "create" | "update";
    beforeSha256: string | null;
    afterSha256?: string;
    beforeMode: number | null;
    afterMode?: number;
  }>;
  lifecycle: LifecycleResult;
};

const ADD_CONTROL_KEYS = new Set(["projectDir", "install", "dryRun", "json"]);
const WORKSPACE_RUNNERS = new Set<Addons>(["turborepo", "nx", "vite-plus"]);

function getRequestedCapabilityIds(input: AddInput): Addons[] {
  const legacy = (input.addons ?? []).filter((toolId): toolId is Addons => toolId !== "none");
  const graph = (input.part ?? []).flatMap((spec) => {
    const toolId = spec.split(":")[2];
    return toolId && getToolingCapability(toolId) ? [toolId as Addons] : [];
  });
  return [...new Set([...legacy, ...graph])];
}
function buildStackUpdateRequest(input: AddInput): Record<string, unknown> {
  const request: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (ADD_CONTROL_KEYS.has(key)) continue;
    if (value === undefined || value === false) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    request[key] = value;
  }
  return request;
}

async function getAddonsToSetup(
  input: AddInput,
  currentConfig: BetterTStackConfig,
  projectDir: string,
): Promise<Addons[]> {
  const requestedAddons = getRequestedCapabilityIds(input);
  const existingAddons = new Set(currentConfig.addons ?? []);
  const addonsToSetup = requestedAddons.filter((addon) => !existingAddons.has(addon));

  if (
    requestedAddons.includes("gitleaks") &&
    existingAddons.has("gitleaks") &&
    !(await isGitleaksSetupComplete(projectDir, currentConfig.addons ?? []))
  ) {
    addonsToSetup.push("gitleaks");
  }

  if (existingAddons.has("lefthook")) {
    for (const linter of ["biome", "oxlint"] as const) {
      if (
        requestedAddons.includes(linter) &&
        existingAddons.has(linter) &&
        !(await isLinterLefthookSetupComplete(
          projectDir,
          linter,
          currentConfig.packageManager ?? "bun",
        )) &&
        !addonsToSetup.includes(linter)
      ) {
        addonsToSetup.push(linter);
      }
    }
  }

  return addonsToSetup;
}

function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function countDependencyChanges(plan: StackUpdatePlan): number {
  return Object.values(plan.dependencyChanges).reduce(
    (count, deps) => count + Object.keys(deps).length,
    0,
  );
}

function countEnvChanges(plan: StackUpdatePlan): number {
  return Object.values(plan.envChanges).reduce((count, keys) => count + keys.length, 0);
}

function logStackUpdateSummary(plan: StackUpdatePlan, dryRun: boolean) {
  if (isSilent()) return;

  log.info(pc.cyan(dryRun ? "Stack update plan:" : "Stack update result:"));

  const requestedFields = Object.keys(plan.requestedChanges);
  if (requestedFields.length > 0) {
    log.info(pc.dim(`Requested: ${requestedFields.sort().join(", ")}`));
  }
  if (plan.graphSummary) {
    log.info(pc.dim(`Stack: ${plan.graphSummary}`));
  }

  const fileChangeCount = plan.filesToAdd.length + plan.filesToPatch.length;
  if (fileChangeCount === 0 && plan.manualReviewBlockers.length === 0) {
    log.info(pc.dim("No stack changes to apply."));
  } else {
    log.info(
      pc.dim(
        `Files: ${formatCount(plan.filesToAdd.length, "file add")}, ${formatCount(
          plan.filesToPatch.length,
          "file update",
        )}, ${formatCount(plan.filesUnchanged.length, "unchanged file")}`,
      ),
    );
  }

  const dependencyCount = countDependencyChanges(plan);
  if (dependencyCount > 0) {
    log.info(pc.dim(`Dependencies: ${formatCount(dependencyCount, "change")}`));
  }
  const versionChannelRewriteCount = Object.keys(plan.versionChannelRewrites).length;
  if (versionChannelRewriteCount > 0) {
    log.info(
      pc.dim(
        `Version channel: ${formatCount(versionChannelRewriteCount, "package manifest rewrite")}`,
      ),
    );
  }

  const envCount = countEnvChanges(plan);
  if (envCount > 0) {
    log.info(pc.dim(`Env vars: ${formatCount(envCount, "addition")}`));
  }

  for (const adjustment of plan.compatibilityAdjustments) {
    log.info(pc.dim(`Adjusted: ${adjustment}`));
  }

  if (plan.architectureChanges.length > 0) {
    const swaps = plan.architectureChanges
      .map((change) => `${change.key}: ${change.from} -> ${change.to}`)
      .join(", ");
    log.warn(pc.yellow(`Architecture change: ${swaps}`));
    log.info(pc.dim("Data and schema are NOT migrated automatically. Migration checklist:"));
    for (const step of plan.migrationSteps) {
      log.info(pc.dim(`  - ${step}`));
    }
    if (dryRun && plan.requiresArchitectureAck) {
      log.warn(
        pc.yellow(
          "Re-run with --acknowledge-architecture-change to apply this architecture change.",
        ),
      );
    }
  }

  for (const blocker of plan.manualReviewBlockers) {
    log.warn(pc.yellow(`Manual review: ${blocker}`));
  }
}

type PackageManagerOutcome = {
  status: "applied" | "failed" | "manual" | "not-run";
  description: string;
  compensatingAction: string;
};

function recordPostCommitOutcome(
  lifecycle: LifecycleResult,
  outcome: PackageManagerOutcome | undefined,
  note: string | undefined,
): LifecycleResult {
  const nextActions = note ? [...lifecycle.nextActions, note] : lifecycle.nextActions;
  if (!outcome) return { ...lifecycle, nextActions };
  return {
    ...lifecycle,
    nextActions,
    sideEffects: [
      ...lifecycle.sideEffects.filter((sideEffect) => sideEffect.kind !== "package-manager"),
      { kind: "package-manager", ...outcome },
    ],
  };
}

function buildAddonSetupConfig(
  projectDir: string,
  projectName: string,
  currentConfig: BetterTStackConfig,
  plan: StackUpdatePlan,
): ProjectConfig {
  const baseConfig = getDefaultConfig();
  return {
    ...baseConfig,
    ...currentConfig,
    ...plan.proposedConfig,
    projectName,
    projectDir,
    relativePath: ".",
    packageManager:
      plan.proposedConfig.packageManager ||
      currentConfig.packageManager ||
      baseConfig.packageManager,
    addons: plan.proposedConfig.addons,
    frontend: plan.proposedConfig.frontend || currentConfig.frontend || baseConfig.frontend,
    examples: plan.proposedConfig.examples || currentConfig.examples || [],
    rustLibraries: plan.proposedConfig.rustLibraries || currentConfig.rustLibraries || [],
    pythonAi: plan.proposedConfig.pythonAi || currentConfig.pythonAi || [],
    aiDocs: plan.proposedConfig.aiDocs || currentConfig.aiDocs || [],
  } as ProjectConfig;
}

function buildCurrentAddonSetupConfig(
  projectDir: string,
  projectName: string,
  currentConfig: BetterTStackConfig,
): ProjectConfig {
  const baseConfig = getDefaultConfig();
  return {
    ...baseConfig,
    ...currentConfig,
    projectName,
    projectDir,
    relativePath: ".",
    packageManager: currentConfig.packageManager || baseConfig.packageManager,
    addons: currentConfig.addons ?? [],
    frontend: currentConfig.frontend || baseConfig.frontend,
    examples: currentConfig.examples || [],
    rustLibraries: currentConfig.rustLibraries || [],
    pythonAi: currentConfig.pythonAi || [],
    aiDocs: currentConfig.aiDocs || [],
  } as ProjectConfig;
}

type RepairFileSnapshot = {
  content: Buffer;
  mode: number;
  sha256: string;
};

type RepairFileChange = {
  path: string;
  before?: RepairFileSnapshot;
  after?: RepairFileSnapshot;
};

type PlannedExistingAddonRepair = {
  publicPlan: ExistingAddonRepairPlan;
  changes: RepairFileChange[];
  repairPaths: string[];
  preimages: Map<string, RepairFileSnapshot>;
  setupConfig: ProjectConfig;
  expectedConfig: BetterTStackConfig;
  refreshManifest: boolean;
};

function getExistingAddonRepairPaths(
  currentConfig: BetterTStackConfig,
  addonsToRepair: Addons[],
): string[] {
  const selected = new Set(currentConfig.addons ?? []);
  const paths = new Set<string>();
  if (addonsToRepair.includes("gitleaks")) {
    if (selected.has("husky")) paths.add(".husky/pre-commit");
    if (selected.has("lefthook")) paths.add("lefthook.yml");
  }
  if (
    selected.has("lefthook") &&
    addonsToRepair.some((addon) => addon === "biome" || addon === "oxlint")
  ) {
    paths.add("lefthook.yml");
  }
  return [...paths].sort();
}

async function snapshotRepairFiles(
  rootDir: string,
  relativePaths: Iterable<string>,
): Promise<Map<string, RepairFileSnapshot>> {
  const snapshots = new Map<string, RepairFileSnapshot>();
  for (const relativePath of [...new Set(relativePaths)].sort()) {
    const filePath = path.join(rootDir, relativePath);
    // oxlint-disable-next-line no-await-in-loop -- every candidate is bound to one file state
    const stats = await fs.lstat(filePath).catch(() => null);
    if (!stats) continue;
    if (!stats.isFile() || stats.isSymbolicLink()) {
      throw new Error(`Addon repair target is not a regular file: ${relativePath}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- candidate bytes are hashed before planning
    const content = await fs.readFile(filePath);
    snapshots.set(relativePath, {
      content,
      mode: stats.mode & 0o7777,
      sha256: hashContent(content),
    });
  }
  return snapshots;
}

async function copyRepairFiles(
  targetDir: string,
  relativePaths: Iterable<string>,
  snapshots: Map<string, RepairFileSnapshot>,
): Promise<void> {
  await fs.ensureDir(targetDir);
  for (const relativePath of relativePaths) {
    const snapshot = snapshots.get(relativePath);
    if (!snapshot) continue;
    const target = path.join(targetDir, relativePath);
    // oxlint-disable-next-line no-await-in-loop -- each repair input is copied with its exact mode
    await fs.ensureDir(path.dirname(target));
    // oxlint-disable-next-line no-await-in-loop -- the sandbox never aliases project files
    await fs.writeFile(target, snapshot.content, { mode: snapshot.mode });
    // oxlint-disable-next-line no-await-in-loop -- an existing umask must not change the plan
    await fs.chmod(target, snapshot.mode);
  }
}

function getRepairFileChanges(
  before: Map<string, RepairFileSnapshot>,
  after: Map<string, RepairFileSnapshot>,
): RepairFileChange[] {
  return [...new Set([...before.keys(), ...after.keys()])].sort().flatMap((relativePath) => {
    const previous = before.get(relativePath);
    const next = after.get(relativePath);
    if (previous?.sha256 === next?.sha256 && previous?.mode === next?.mode) return [];
    return [{ path: relativePath, before: previous, after: next }];
  });
}

async function assertRepairConfigState(
  projectDir: string,
  expectedConfig: BetterTStackConfig,
): Promise<void> {
  const liveConfig = await readBtsConfig(projectDir);
  if (!liveConfig || JSON.stringify(liveConfig) !== JSON.stringify(expectedConfig)) {
    throw new Error("Addon repair config changed while planning: bts.jsonc");
  }
}

function assertRepairTransactionPreimages(
  transaction: ProjectTransaction,
  before: Map<string, RepairFileSnapshot>,
): void {
  for (const file of transaction.metadata.files) {
    const expected = before.get(file.path);
    const matches = expected
      ? file.state === "file" && file.sha256 === expected.sha256 && file.mode === expected.mode
      : file.state === "absent";
    if (!matches) throw new Error(`Addon repair target changed while planning: ${file.path}`);
  }
}

function assertRepairSnapshotsMatch(
  expected: Map<string, RepairFileSnapshot>,
  current: Map<string, RepairFileSnapshot>,
  relativePaths: Iterable<string>,
): void {
  for (const relativePath of relativePaths) {
    const expectedFile = expected.get(relativePath);
    const currentFile = current.get(relativePath);
    if (expectedFile?.sha256 !== currentFile?.sha256 || expectedFile?.mode !== currentFile?.mode) {
      throw new Error(`Addon repair input changed while planning: ${relativePath}`);
    }
  }
}

async function assertAddonRepairComplete(
  stagedProjectDir: string,
  setupConfig: ProjectConfig,
  addonsToRepair: Addons[],
): Promise<void> {
  if (
    addonsToRepair.includes("gitleaks") &&
    !(await isGitleaksSetupComplete(stagedProjectDir, setupConfig.addons))
  ) {
    throw new Error("Gitleaks hook repair did not produce a complete setup.");
  }
  for (const linter of ["biome", "oxlint"] as const) {
    if (
      addonsToRepair.includes(linter) &&
      !(await isLinterLefthookSetupComplete(stagedProjectDir, linter, setupConfig.packageManager))
    ) {
      throw new Error(`${linter} Lefthook repair did not produce a complete setup.`);
    }
  }
}

function getRepairStackPartSpecs(addonsToRepair: Addons[]): string[] {
  return addonsToRepair.map((addon) => {
    const capability = getToolingCapability(addon);
    return capability ? `${capability.role}:${capability.ecosystem}:${addon}` : addon;
  });
}

async function planExistingAddonRepair(
  projectDir: string,
  projectName: string,
  currentConfig: BetterTStackConfig,
  addonsToRepair: Addons[],
): Promise<PlannedExistingAddonRepair> {
  const repairPaths = getExistingAddonRepairPaths(currentConfig, addonsToRepair);
  if (repairPaths.length === 0) {
    throw new Error("No supported existing-addon repair targets were found.");
  }
  const transactionPaths = ["bts.jsonc", SCAFFOLD_MANIFEST_FILE, ...repairPaths];
  const preimages = await snapshotRepairFiles(projectDir, transactionPaths);
  await assertRepairConfigState(projectDir, currentConfig);
  const manifestResult = await readScaffoldManifestResult(projectDir);
  if (manifestResult.status === "invalid") {
    throw new Error(
      `Cannot repair tooling with an invalid scaffold manifest: ${manifestResult.error}`,
    );
  }
  const tempRoot = await fs.mkdtemp(path.join(tmpdir(), "bfs-addon-repair-"));
  const stagedProjectDir = path.join(tempRoot, projectName);

  try {
    await copyRepairFiles(stagedProjectDir, repairPaths, preimages);
    const before = await snapshotRepairFiles(stagedProjectDir, repairPaths);
    const setupConfig = buildCurrentAddonSetupConfig(stagedProjectDir, projectName, currentConfig);
    await repairExistingAddonSetup(setupConfig, addonsToRepair);
    await assertAddonRepairComplete(stagedProjectDir, setupConfig, addonsToRepair);
    const after = await snapshotRepairFiles(stagedProjectDir, repairPaths);
    const changes = getRepairFileChanges(before, after);
    const currentInputs = await snapshotRepairFiles(projectDir, transactionPaths);
    assertRepairSnapshotsMatch(preimages, currentInputs, transactionPaths);
    await assertRepairConfigState(projectDir, currentConfig);
    const added = changes.filter((change) => change.before === undefined).length;
    const patched = changes.length - added;
    const refreshManifest = manifestResult.status === "valid" && changes.length > 0;
    const affectedFiles: ExistingAddonRepairPlan["files"] = changes.map((change) => ({
      path: change.path,
      action: change.before ? "update" : "create",
      beforeSha256: change.before?.sha256 ?? null,
      afterSha256: change.after?.sha256,
      beforeMode: change.before?.mode ?? null,
      afterMode: change.after?.mode,
    }));
    if (refreshManifest) {
      const manifestPreimage = preimages.get(SCAFFOLD_MANIFEST_FILE);
      affectedFiles.push({
        path: SCAFFOLD_MANIFEST_FILE,
        action: "update",
        beforeSha256: manifestPreimage?.sha256 ?? null,
        beforeMode: manifestPreimage?.mode ?? null,
      });
    }
    const lifecycle = lifecycleResult({
      operation: "add",
      status: "planned",
      projectDir,
      changes: { added, patched },
      provenance: {
        source:
          manifestResult.status === "valid" ? manifestResult.manifest.provenance.current : null,
        target: getCurrentLifecycleVersions(),
        verified:
          manifestResult.status === "valid" &&
          manifestResult.manifest.provenance.state === "verified",
      },
      recovery: { available: changes.length > 0, automaticRollback: true },
      affected: {
        stackParts: getRepairStackPartSpecs(addonsToRepair),
        files: affectedFiles.map((file) => ({ path: file.path, action: file.action })),
      },
      checks: addonsToRepair.map((addon) => ({
        id: `repair:${addon}`,
        status: "pass",
        message: "The staged repair completed its setup check.",
      })),
      sideEffects: [
        {
          kind: "filesystem",
          status: changes.length > 0 ? "planned" : "not-run",
          description:
            changes.length > 0
              ? "Apply the reviewed tooling repair and manifest refresh in one recovery transaction."
              : "The requested tooling setup is already complete.",
        },
      ],
    });
    return {
      changes,
      repairPaths,
      preimages,
      setupConfig,
      expectedConfig: currentConfig,
      refreshManifest,
      publicPlan: {
        kind: "addon-repair",
        projectDir,
        addons: addonsToRepair,
        files: affectedFiles,
        lifecycle,
      },
    };
  } finally {
    await fs.remove(tempRoot).catch(() => undefined);
  }
}

async function applyExistingAddonRepair(plan: PlannedExistingAddonRepair): Promise<AddResult> {
  const { projectDir } = plan.publicPlan;
  if (plan.changes.length === 0) {
    return {
      success: true,
      addedAddons: [],
      projectDir,
      lifecycle: lifecycleResult({
        ...plan.publicPlan.lifecycle,
        status: "applied",
        recovery: { available: false },
      }),
    };
  }

  const transactionPaths = ["bts.jsonc", SCAFFOLD_MANIFEST_FILE, ...plan.repairPaths];
  let transaction: ProjectTransaction | undefined;
  let committed = false;
  try {
    const activeTransaction = await beginProjectTransaction(projectDir, "add", transactionPaths);
    transaction = activeTransaction;
    assertRepairTransactionPreimages(activeTransaction, plan.preimages);
    await assertRepairConfigState(projectDir, plan.expectedConfig);

    for (const change of plan.changes) {
      if (!change.after) throw new Error(`Addon repair output is missing: ${change.path}`);
      // oxlint-disable-next-line no-await-in-loop -- every reviewed output is journaled separately
      await writeProjectTransactionFile(activeTransaction, change.path, change.after.content, {
        expectedSha256: change.after.sha256,
        mode: change.after.mode,
      });
    }
    await assertAddonRepairComplete(projectDir, plan.setupConfig, plan.publicPlan.addons);

    const changes = plan.publicPlan.lifecycle.changes;
    if (plan.refreshManifest) {
      let manifestWritten = false;
      await refreshScaffoldManifestFiles(
        projectDir,
        plan.changes.map((change) => change.path),
        undefined,
        { type: "add", changes, recoveryId: activeTransaction.id },
        {
          writeFile: async (content) => {
            await writeProjectTransactionFile(activeTransaction, SCAFFOLD_MANIFEST_FILE, content);
            manifestWritten = true;
          },
        },
      );
      if (!manifestWritten) {
        throw new Error("Scaffold manifest changed before the addon repair could refresh it.");
      }
    }
    await commitProjectTransaction(activeTransaction);
    committed = true;

    const recoveryCommand = getProjectRecoveryCommand(
      projectDir,
      activeTransaction.id,
      process.platform,
      plan.setupConfig.packageManager,
    );
    return {
      success: true,
      addedAddons: [],
      projectDir,
      recoveryId: activeTransaction.id,
      lifecycle: lifecycleResult({
        ...plan.publicPlan.lifecycle,
        status: "applied",
        recovery: {
          available: true,
          transactionId: activeTransaction.id,
          command: recoveryCommand,
          automaticRollback: true,
        },
        sideEffects: [
          {
            kind: "filesystem",
            status: "applied",
            description: "Repaired existing tooling files inside one recovery transaction.",
            compensatingAction: recoveryCommand,
          },
        ],
        history: { recorded: true, recoveryId: activeTransaction.id },
        nextActions: ["Run `create-better-fullstack check` to verify every generated target."],
      }),
    };
  } catch (error) {
    if (transaction && !committed) {
      try {
        await rollbackProjectTransaction(transaction);
      } catch (rollbackError) {
        throw new CLIError(
          `${error instanceof Error ? error.message : String(error)}. Automatic rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}. Recovery transaction: ${transaction.id}.`,
        );
      }
    }
    throw error;
  }
}

async function runStackUpdateAdd(
  input: AddInput,
  projectDir: string,
  projectName: string,
  currentConfig: BetterTStackConfig,
  request: Record<string, unknown>,
): Promise<AddResult> {
  const dryRun = input.dryRun ?? false;
  const requestedAddons = getRequestedCapabilityIds(input);
  const existingAddons = new Set(currentConfig.addons ?? []);
  const requestedRunner = requestedAddons.find((addon) => WORKSPACE_RUNNERS.has(addon));
  const replacesWorkspaceRunner =
    requestedRunner !== undefined &&
    [...existingAddons].some((addon) => WORKSPACE_RUNNERS.has(addon) && addon !== requestedRunner);
  const unsupportedRuntimeAddons = requestedAddons.filter(
    (addon) => ADDONS_REQUIRING_IMPERATIVE_SETUP.has(addon) && !existingAddons.has(addon),
  );
  if (unsupportedRuntimeAddons.length > 0) {
    throw new CLIError(
      `Cannot transactionally add tooling that requires imperative setup: ${unsupportedRuntimeAddons.join(", ")}. Select it when creating a project so every generated file is included in the scaffold baseline.`,
    );
  }
  const addonsToRepair = await getAddonsToSetup(input, currentConfig, projectDir);
  const existingAddonsToRepair = addonsToRepair.filter((addon) => existingAddons.has(addon));
  const repairAddonSet = new Set(existingAddonsToRepair);
  const repairPartSpecs = new Set(getRepairStackPartSpecs(existingAddonsToRepair));
  const isRepairOnlyRequest =
    Object.keys(request).every((key) => key === "addons" || key === "part") &&
    requestedAddons.length > 0 &&
    requestedAddons.every((addon) => repairAddonSet.has(addon)) &&
    (input.addons ?? []).every((addon) => addon === "none" || repairAddonSet.has(addon)) &&
    (input.part ?? []).every((spec) => repairPartSpecs.has(spec));

  if (existingAddonsToRepair.length > 0 && !isRepairOnlyRequest) {
    throw new CLIError(
      `Cannot combine repair of existing tooling (${existingAddonsToRepair.join(", ")}) with other add requests. Run the tooling repair and stack update separately so no requested change can be skipped.`,
    );
  }

  const isExistingAddonRepair = existingAddonsToRepair.length > 0 && isRepairOnlyRequest;

  if (isExistingAddonRepair) {
    const repairPlan = await planExistingAddonRepair(
      projectDir,
      projectName,
      currentConfig,
      existingAddonsToRepair,
    );
    if (dryRun) {
      if (!isSilent()) {
        log.info(pc.cyan("Tooling repair plan:"));
        for (const file of repairPlan.publicPlan.files) {
          log.info(pc.dim(`  ${file.action}: ${file.path}`));
        }
        outro(pc.magenta("Dry run complete. No files were written."));
      }
      return {
        success: true,
        addedAddons: [],
        projectDir,
        plan: repairPlan.publicPlan,
        lifecycle: repairPlan.publicPlan.lifecycle,
      };
    }

    const result = await applyExistingAddonRepair(repairPlan);
    if (!isSilent()) {
      log.success(pc.green(`Repaired tooling setup: ${existingAddonsToRepair.join(", ")}`));
      if (result.lifecycle?.recovery.command) {
        log.info(pc.dim(`Recovery: ${result.lifecycle.recovery.command}`));
      }
      outro(pc.magenta("Project updated successfully!"));
    }
    return result;
  }

  const result = dryRun
    ? await planStackUpdate(projectDir, request, {
        includeVersionChannelPaths: true,
        removeObsoleteGeneratedArtifacts: replacesWorkspaceRunner,
      })
    : await applyStackUpdate(projectDir, request, {
        operation: "add",
        applyVersionChannel: true,
        removeObsoleteGeneratedArtifacts: replacesWorkspaceRunner,
      });

  if (!result.success) {
    throw new CLIError(result.error);
  }

  logStackUpdateSummary(result, dryRun);

  if (dryRun) {
    if (!isSilent()) {
      outro(pc.magenta("Dry run complete. No files were written."));
    }
    return {
      success: true,
      addedAddons: [],
      projectDir,
      plan: result,
    };
  }

  let recoveryNote: string | undefined;
  let packageManagerOutcome: PackageManagerOutcome | undefined;
  try {
    const addonsToSetup = await getAddonsToSetup(input, currentConfig, projectDir);
    const setupConfig = buildAddonSetupConfig(projectDir, projectName, currentConfig, result);
    const setupWarnings: string[] = [];
    let installFailed = false;
    if (input.install) {
      if (
        result.proposedConfig.ecosystem === "typescript" ||
        result.proposedConfig.ecosystem === "react-native"
      ) {
        const installResult = await installDependencies({
          projectDir,
          packageManager: setupConfig.packageManager,
        });
        installFailed = !installResult.success;
        recoveryNote = `Recovery restores generated files only. The lockfile this install wrote is not rolled back, so re-run '${result.installCommand}' after recovering.`;
        packageManagerOutcome = {
          status: installResult.success ? "applied" : "failed",
          description: installResult.success
            ? "Dependency installation completed after the filesystem transaction committed."
            : "Dependency installation failed after the filesystem transaction committed.",
          compensatingAction: `Run '${result.installCommand}' after recovery or after fixing the install failure.`,
        };
      } else {
        if (!isSilent()) {
          log.warn(
            pc.yellow(
              `Automatic --install is only supported for JavaScript package-manager installs. Run '${result.installCommand}' instead.`,
            ),
          );
        }
        packageManagerOutcome = {
          status: "not-run",
          description: "Automatic dependency installation is not supported for this ecosystem.",
          compensatingAction: `Run '${result.installCommand}'.`,
        };
      }
    } else if (
      result.lifecycle.sideEffects.some((sideEffect) => sideEffect.kind === "package-manager")
    ) {
      packageManagerOutcome = {
        status: "manual",
        description: "Dependency manifests changed, but no package manager was run.",
        compensatingAction: `Run '${result.installCommand}'.`,
      };
    }

    if (!isSilent()) {
      if (addonsToSetup.length > 0) {
        log.success(pc.green(`Successfully added: ${addonsToSetup.join(", ")}`));
      } else if (requestedAddons.length > 0) {
        log.info(pc.dim("No new tooling capabilities selected."));
      }
      log.success(pc.green("Stack update applied."));
      for (const warning of setupWarnings) {
        log.warn(pc.yellow(warning));
      }
      if (!input.install) {
        log.info(pc.yellow(`Run '${result.installCommand}' to install new dependencies.`));
      } else if (installFailed) {
        log.warn(
          pc.yellow(
            `Dependency installation failed. Run '${result.installCommand}' after resolving the error above.`,
          ),
        );
      }
      if (result.lifecycle.recovery.command) {
        log.info(pc.dim(`Recovery: ${result.lifecycle.recovery.command}`));
        if (recoveryNote) {
          log.warn(pc.yellow(recoveryNote));
        }
      }
      outro(pc.magenta("Project updated successfully!"));
    }

    return {
      success: true,
      addedAddons: addonsToSetup,
      projectDir,
      setupWarnings: setupWarnings.length > 0 ? setupWarnings : undefined,
      lifecycle: recordPostCommitOutcome(result.lifecycle, packageManagerOutcome, recoveryNote),
      recoveryId: result.recoveryId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!isSilent()) {
      if (result.lifecycle.recovery.command) {
        log.error(
          pc.red(`Post-update setup failed. Recovery: ${result.lifecycle.recovery.command}`),
        );
        if (recoveryNote) {
          log.warn(pc.yellow(recoveryNote));
        }
      }
      throw new CLIError(message);
    }
    return {
      success: false,
      addedAddons: [],
      projectDir,
      error: message,
      lifecycle: recordPostCommitOutcome(result.lifecycle, packageManagerOutcome, recoveryNote),
      recoveryId: result.recoveryId,
    };
  }
}

// Keys that describe an addon/deploy-only `add` - anything else in the
// request means the project's stack itself is being updated.
const ADD_FEATURE_KEYS = new Set(["addons", "webDeploy", "serverDeploy", "packageManager"]);

async function trackAddEvent(
  input: AddInput,
  options: AddHandlerOptions,
  outcome: { success: boolean; errorName?: string; durationMs: number; addedAddons?: Addons[] },
): Promise<void> {
  if (input.dryRun) return;
  const request = buildStackUpdateRequest(input);
  const stackPayload = { ...(request as Partial<ProjectConfig>) };
  if (outcome.addedAddons !== undefined) {
    if (outcome.addedAddons.length > 0) {
      stackPayload.addons = outcome.addedAddons;
    } else {
      delete stackPayload.addons;
    }
  }
  const toolingPartAddition =
    (input.part?.length ?? 0) > 0 &&
    input.part?.every((spec) => {
      const toolId = spec.split(":")[2];
      return toolId !== undefined && getToolingCapability(toolId) !== undefined;
    });
  const eventType = Object.keys(request).some(
    (key) => !ADD_FEATURE_KEYS.has(key) && (key !== "part" || !toolingPartAddition),
  )
    ? ("stack_updated" as const)
    : ("feature_added" as const);
  const source =
    options.telemetrySource ??
    (options.silent
      ? "programmatic"
      : Object.keys(request).length > 0
        ? "cli-flags"
        : "cli-interactive");
  await trackEvent(eventType, stackPayload, {
    source,
    success: outcome.success,
    errorName: outcome.errorName,
    durationMs: outcome.durationMs,
  });
}

export async function addHandler(
  input: AddInput,
  options: AddHandlerOptions = {},
): Promise<AddResult | undefined> {
  const { silent = false } = options;
  const startTime = Date.now();

  return runWithContextAsync({ silent }, async () => {
    try {
      const result = await addHandlerInternal(input);
      await maybeShowTelemetryNotice();
      await trackAddEvent(input, options, {
        success: result.success,
        durationMs: Date.now() - startTime,
        addedAddons: result.addedAddons,
      });
      return result;
    } catch (error) {
      if (!(error instanceof UserCancelledError)) {
        // Only the error class name is sent - messages can contain paths.
        await maybeShowTelemetryNotice();
        await trackAddEvent(input, options, {
          success: false,
          errorName: error instanceof Error ? error.name : "UnknownError",
          durationMs: Date.now() - startTime,
        });
      }
      if (error instanceof UserCancelledError) {
        if (isSilent()) {
          return {
            success: false,
            addedAddons: [],
            projectDir: "",
            error: error.message,
          };
        }
        return;
      }

      if (error instanceof CLIError) {
        if (isSilent()) {
          return {
            success: false,
            addedAddons: [],
            projectDir: "",
            error: error.message,
          };
        }
        throw error;
      }

      if (isSilent()) {
        return {
          success: false,
          addedAddons: [],
          projectDir: "",
          error: error instanceof Error ? error.message : String(error),
        };
      }
      throw error;
    }
  });
}

async function addHandlerInternal(input: AddInput): Promise<AddResult> {
  const projectDir = path.resolve(input.projectDir || process.cwd());

  if (!isSilent()) {
    renderTitle();
    intro(pc.magenta("Update your Better Fullstack project"));
  }

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    throw new CLIError(
      `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`,
    );
  }

  const projectName = path.basename(projectDir);
  if (!isSilent()) {
    log.info(pc.dim(`Detected project: ${projectName}`));
  }

  const stackUpdateRequest = buildStackUpdateRequest(input);
  if (Object.keys(stackUpdateRequest).length > 0 || input.dryRun) {
    return runStackUpdateAdd(input, projectDir, projectName, btsConfig, stackUpdateRequest);
  }

  const capabilityPartSpecs = await getCapabilityPartSpecsToAdd(btsConfig);
  if (capabilityPartSpecs.length === 0) {
    if (!isSilent()) {
      log.info(pc.dim("No new tooling capabilities selected."));
      outro(pc.magenta("Nothing to add."));
    }
    return {
      success: true,
      addedAddons: [],
      projectDir,
    };
  }

  if (!isSilent()) {
    log.info(pc.cyan(`Adding tooling: ${capabilityPartSpecs.join(", ")}`));
  }

  const interactiveInput: AddInput = { ...input, part: capabilityPartSpecs };
  return runStackUpdateAdd(interactiveInput, projectDir, projectName, btsConfig, {
    part: capabilityPartSpecs,
  });
}
