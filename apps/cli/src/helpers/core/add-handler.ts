import {
  EMBEDDED_TEMPLATES,
  processAddonTemplates,
  processAddonsDeps,
  VirtualFileSystem,
} from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { intro, log, outro } from "@clack/prompts";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { AddInput, Addons, BetterTStackConfig, ProjectConfig } from "../../types";

import { getDefaultConfig } from "../../constants";
import { getAddonsToAdd } from "../../prompts/addons";
import { maybeShowTelemetryNotice, type TelemetrySource, trackEvent } from "../../utils/analytics";
import { readBtsConfig, updateBtsConfig } from "../../utils/bts-config";
import { isSilent, runWithContextAsync } from "../../utils/context";
import { applyDependencyVersionChannel } from "../../utils/dependency-version-channel";
import { CLIError, UserCancelledError } from "../../utils/errors";
import { renderTitle } from "../../utils/render-title";
import {
  isGitleaksSetupComplete,
  isLinterLefthookSetupComplete,
  setupAddons,
} from "../addons/addons-setup";
import { installDependencies } from "./install-dependencies";
import { applyStackUpdate, planStackUpdate, type StackUpdatePlan } from "./stack-update";

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
}

const ADD_CONTROL_KEYS = new Set(["projectDir", "install", "dryRun"]);

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
  const requestedAddons = (input.addons ?? []).filter((addon): addon is Addons => addon !== "none");
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

async function runStackUpdateAdd(
  input: AddInput,
  projectDir: string,
  projectName: string,
  currentConfig: BetterTStackConfig,
  request: Record<string, unknown>,
): Promise<AddResult> {
  const dryRun = input.dryRun ?? false;
  const requestedAddons = (input.addons ?? []).filter(
    (addon): addon is Addons => addon !== "none",
  );
  const existingAddons = new Set(currentConfig.addons ?? []);
  const addonsToRepair = await getAddonsToSetup(input, currentConfig, projectDir);
  const isExistingAddonRepair =
    !dryRun &&
    Object.keys(request).every((key) => key === "addons") &&
    requestedAddons.length > 0 &&
    requestedAddons.every((addon) => existingAddons.has(addon)) &&
    addonsToRepair.length > 0;

  if (isExistingAddonRepair) {
    const setupConfig = buildCurrentAddonSetupConfig(projectDir, projectName, currentConfig);
    const setupWarnings = await setupAddons(setupConfig, addonsToRepair);
    await applyDependencyVersionChannel(projectDir, setupConfig.versionChannel);
    if (!isSilent()) {
      log.success(pc.green(`Repaired addon setup: ${addonsToRepair.join(", ")}`));
      outro(pc.magenta("Project updated successfully!"));
    }
    return {
      success: true,
      addedAddons: [],
      projectDir,
      setupWarnings: setupWarnings.length > 0 ? setupWarnings : undefined,
    };
  }

  const result = dryRun
    ? await planStackUpdate(projectDir, request)
    : await applyStackUpdate(projectDir, request);

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
    };
  }

  const addonsToSetup = await getAddonsToSetup(input, currentConfig, projectDir);
  const setupConfig = buildAddonSetupConfig(projectDir, projectName, currentConfig, result);
  const setupWarnings =
    addonsToSetup.length > 0 ? await setupAddons(setupConfig, addonsToSetup) : [];
  await applyDependencyVersionChannel(projectDir, result.proposedConfig.versionChannel);

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
    } else if (!isSilent()) {
      log.warn(
        pc.yellow(
          `Automatic --install is only supported for JavaScript package-manager installs. Run '${result.installCommand}' instead.`,
        ),
      );
    }
  }

  if (!isSilent()) {
    if (addonsToSetup.length > 0) {
      log.success(pc.green(`Successfully added: ${addonsToSetup.join(", ")}`));
    } else if ((input.addons ?? []).some((addon) => addon !== "none")) {
      log.info(pc.dim("No new addons selected."));
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
    outro(pc.magenta("Project updated successfully!"));
  }

  return {
    success: true,
    addedAddons: addonsToSetup,
    projectDir,
    setupWarnings: setupWarnings.length > 0 ? setupWarnings : undefined,
  };
}

// Keys that describe an addon/deploy-only `add` — anything else in the
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
  const eventType = Object.keys(request).some((key) => !ADD_FEATURE_KEYS.has(key))
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
        // Only the error class name is sent — messages can contain paths.
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

  const existingAddons = btsConfig.addons || [];
  let addonsToAdd: Addons[] = [];

  if (input.addons && input.addons.length > 0) {
    addonsToAdd = input.addons.filter(
      (addon): addon is Addons => addon !== "none" && !existingAddons.includes(addon),
    );
  } else {
    const selectedAddons = await getAddonsToAdd(
      btsConfig.frontend || [],
      existingAddons,
      btsConfig.auth,
      btsConfig.backend,
      btsConfig.runtime,
      btsConfig.api ?? "none",
    );
    addonsToAdd = selectedAddons.filter((addon) => addon !== "none");
  }

  if (addonsToAdd.length === 0) {
    if (!isSilent()) {
      log.info(pc.dim("No new addons selected."));
      outro(pc.magenta("Nothing to add."));
    }
    return {
      success: true,
      addedAddons: [],
      projectDir,
    };
  }

  if (!isSilent()) {
    log.info(pc.cyan(`Adding addons: ${addonsToAdd.join(", ")}`));
  }

  const baseConfig = getDefaultConfig();
  const updatedAddons = [...new Set([...existingAddons, ...addonsToAdd])];
  const config: ProjectConfig = {
    ...baseConfig,
    ...btsConfig,
    projectName,
    projectDir,
    relativePath: ".",
    packageManager: input.packageManager || btsConfig.packageManager || baseConfig.packageManager,
    addons: addonsToAdd,
    frontend: btsConfig.frontend || baseConfig.frontend,
    examples: btsConfig.examples || [],
    rustLibraries: btsConfig.rustLibraries || [],
    pythonAi: btsConfig.pythonAi || [],
    aiDocs: btsConfig.aiDocs || [],
  };
  const setupConfig: ProjectConfig = { ...config, addons: updatedAddons };

  const vfs = new VirtualFileSystem();
  const packageJsonPaths = await collectPackageJsonPaths(projectDir);

  for (const pkgPath of packageJsonPaths) {
    const fullPath = path.join(projectDir, pkgPath);
    const content = await fs.readFile(fullPath, "utf-8");
    vfs.writeFile(pkgPath, content);
  }

  await processAddonTemplates(vfs, EMBEDDED_TEMPLATES, config);
  processAddonsDeps(vfs, config);

  const tree = {
    root: vfs.toTree(projectName),
    fileCount: vfs.getFileCount(),
    directoryCount: vfs.getDirectoryCount(),
    config,
  };

  await writeTreeToFilesystem(tree, projectDir);

  const setupWarnings = await setupAddons(setupConfig, addonsToAdd);
  await applyDependencyVersionChannel(projectDir, config.versionChannel);

  const configUpdates: Partial<Pick<ProjectConfig, "webDeploy" | "serverDeploy">> & {
    addons: Addons[];
  } = {
    addons: updatedAddons,
  };

  if (input.webDeploy !== undefined) {
    configUpdates.webDeploy = input.webDeploy;
  }
  if (input.serverDeploy !== undefined) {
    configUpdates.serverDeploy = input.serverDeploy;
  }

  await updateBtsConfig(projectDir, configUpdates);

  let addonInstallFailed = false;
  if (input.install) {
    const installResult = await installDependencies({
      projectDir,
      packageManager: config.packageManager,
    });
    addonInstallFailed = !installResult.success;
  }

  if (!isSilent()) {
    log.success(pc.green(`Successfully added: ${addonsToAdd.join(", ")}`));
    for (const warning of setupWarnings) {
      log.warn(pc.yellow(warning));
    }
    const installCmd =
      config.packageManager === "npm" ? "npm install" : `${config.packageManager} install`;
    if (!input.install) {
      log.info(pc.yellow(`Run '${installCmd}' to install new dependencies.`));
    } else if (addonInstallFailed) {
      log.warn(
        pc.yellow(
          `Dependency installation failed. Run '${installCmd}' after resolving the error above.`,
        ),
      );
    }
    outro(pc.magenta("Addons added successfully!"));
  }

  return {
    success: true,
    addedAddons: addonsToAdd,
    projectDir,
    setupWarnings: setupWarnings.length > 0 ? setupWarnings : undefined,
  };
}

async function collectPackageJsonPaths(projectDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".turbo") {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === "package.json") {
        results.push(path.relative(projectDir, fullPath).replaceAll(path.sep, "/"));
      }
    }
  }

  await walk(projectDir);

  if (
    !results.includes("package.json") &&
    (await fs.pathExists(path.join(projectDir, "package.json")))
  ) {
    results.push("package.json");
  }

  return results;
}
