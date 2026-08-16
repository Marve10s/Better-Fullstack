import { log } from "@clack/prompts";
import { $ } from "execa";
import fs from "fs-extra";
import os from "node:os";
import path from "node:path";

import type { ProjectConfig } from "../../types";

import { writeBtsConfig } from "../../utils/bts-config";
import { isSilent } from "../../utils/context";
import { applyDependencyVersionChannel } from "../../utils/dependency-version-channel";
import { CLIError } from "../../utils/errors";
import { formatProject } from "../../utils/file-formatter";
import { lifecycleResult } from "../../utils/lifecycle-contract";
import {
  collectStructuredBaselines,
  getCurrentLifecycleVersions,
  recordScaffoldManifest,
} from "../../utils/scaffold-manifest";
import { setupAddons } from "../addons/addons-setup";
import { setupDatabase } from "../core/db-setup";
import { commitInitialScaffold, initializeGit } from "./git";
import {
  installDependencies,
  runCargoBuild,
  runGradleTests,
  runMavenTests,
  runPythonInstall,
  runGoModTidy,
  runMixCompile,
  type SetupStepResult,
} from "./install-dependencies";
import { displayPostInstallInstructions } from "./post-installation";

export interface CreateProjectOptions {
  manualDb?: boolean;
  allowExistingDirectory?: boolean;
}

export async function createProject(options: ProjectConfig, cliInput: CreateProjectOptions = {}) {
  const projectDir = options.projectDir;
  const isConvex = options.backend === "convex";
  const setupFailures: SetupStepResult[] = [];
  let addonWarnings: string[] = [];

  // Track whether the target directory already had user content before we
  // started writing. If it did (merge mode), we must never delete it on
  // failure; if it was empty/new, we own everything in it and can roll back.
  const dirHadContentBefore =
    (await fs.pathExists(projectDir)) && (await fs.readdir(projectDir)).length > 0;
  if (dirHadContentBefore && cliInput.allowExistingDirectory === false) {
    throw new CLIError(`Refusing to create a project in non-empty directory: ${projectDir}`);
  }

  try {
    await fs.ensureDir(projectDir);

    // Loaded here instead of at module top to keep CLI startup fast — the
    // template-generator bundle embeds all templates (~2.5 MB of source).
    const [{ generateVirtualProject, EMBEDDED_TEMPLATES }, { writeTreeToFilesystem }] =
      await Promise.all([
        import("@better-fullstack/template-generator"),
        import("@better-fullstack/template-generator/fs-writer"),
      ]);

    const result = await generateVirtualProject({
      config: options,
      templates: EMBEDDED_TEMPLATES,
    });

    if (!result.success || !result.tree) {
      throw new Error(result.error || "Failed to generate project templates");
    }

    await writeTreeToFilesystem(result.tree, projectDir);
    await setPackageManagerVersion(projectDir, options.packageManager);
    await ensurePackageManagerProjectFiles(projectDir, options.packageManager);

    if (!isConvex && options.database !== "none") {
      const dbResult = await setupDatabase(options, cliInput);
      if (dbResult && !dbResult.success) setupFailures.push(dbResult);
    }

    if (options.addons.length > 0 && options.addons[0] !== "none") {
      addonWarnings = await setupAddons(options);
    }

    await applyDependencyVersionChannel(projectDir, options.versionChannel);

    await writeBtsConfig(options);

    await formatProject(projectDir);

    // Record the scaffold baseline (bts.lock.json) from the final formatted,
    // pre-install bytes so `bfs update` can later tell template drift apart from
    // user edits. The pure-render content of package.json / *.env.example (before
    // the post-processing above mutated them on disk) is kept alongside the
    // hashes so `bfs update` can structurally merge future template changes.
    // The versioned manifest is part of a complete scaffold transaction. A
    // project without it cannot prove lineage or recover future mutations.
    const manifest = await recordScaffoldManifest(projectDir, {
      baselines: collectStructuredBaselines(result.tree),
    });
    if (!manifest) {
      throw new Error("Failed to record the versioned scaffold manifest");
    }

    if (!isSilent()) log.success("Project template successfully scaffolded!");

    await initializeGit(projectDir, options.git);

    // Skip npm/pnpm/bun install for Rust/Python/Go/Java projects (they use native toolchains)
    if (
      options.install &&
      (options.ecosystem === "typescript" || options.ecosystem === "react-native")
    ) {
      const result = await installDependencies({
        projectDir,
        packageManager: options.packageManager,
      });
      if (!result.success) setupFailures.push(result);
    }

    // Run cargo build for Rust projects
    if (options.install && options.ecosystem === "rust") {
      const result = await runCargoBuild({ projectDir });
      if (!result.success) setupFailures.push(result);
    }

    // Install Python dependencies with the selected Python package manager.
    if (options.install && options.ecosystem === "python") {
      const result = await runPythonInstall({
        projectDir,
        packageManager: options.pythonPackageManager,
      });
      if (!result.success) setupFailures.push(result);
    }

    // Run go mod tidy for Go projects
    if (options.install && options.ecosystem === "go") {
      const result = await runGoModTidy({ projectDir });
      if (!result.success) setupFailures.push(result);
    }

    // Run wrapper-based verification for Java projects
    if (options.install && options.ecosystem === "java" && options.javaBuildTool !== "none") {
      const result =
        options.javaBuildTool === "gradle"
          ? await runGradleTests({ projectDir })
          : await runMavenTests({ projectDir });
      if (!result.success) setupFailures.push(result);
    }

    if (options.install && options.ecosystem === "elixir") {
      const result = await runMixCompile({ projectDir });
      if (!result.success) setupFailures.push(result);
    }

    await commitInitialScaffold(projectDir, options.git);

    if (!isSilent()) {
      await displayPostInstallInstructions({
        ...options,
        depsInstalled: options.install,
      });
    }

    return {
      projectDir,
      setupFailures,
      addonWarnings,
      fileCount: result.tree.fileCount,
      directoryCount: result.tree.directoryCount,
      lifecycle: lifecycleResult({
        operation: "create",
        status: "applied",
        projectDir,
        changes: { added: Object.keys(manifest.hashes).length },
        warnings: [
          ...setupFailures.map((failure) => `${failure.step} did not complete`),
          ...addonWarnings,
        ],
        provenance: {
          source: null,
          target: getCurrentLifecycleVersions(),
          verified: true,
        },
        recovery: { available: false, automaticRollback: true },
        nextActions: [
          "Install dependencies if they were skipped, then run `create-better-fullstack check`.",
        ],
      }),
    };
  } catch (error) {
    await rollbackPartialProject(projectDir, dirHadContentBefore);
    if (error instanceof Error) {
      if (!isSilent()) console.error(error.stack);
      throw new CLIError(`Error during project creation: ${error.message}`);
    }
    if (!isSilent()) console.error(error);
    throw new CLIError(`An unexpected error occurred: ${String(error)}`);
  }
}

/**
 * Remove a half-written project directory after a fatal scaffolding error so the
 * user is not left with a broken, partially generated project. Only removes
 * directories we created ourselves (empty/new before scaffolding) — never one
 * that already had user content (merge mode). Set BTS_KEEP_FAILED_OUTPUT=1 to
 * keep the partial output for debugging template failures.
 */
async function rollbackPartialProject(
  projectDir: string,
  dirHadContentBefore: boolean,
): Promise<void> {
  if (dirHadContentBefore || process.env.BTS_KEEP_FAILED_OUTPUT) {
    if (!isSilent() && dirHadContentBefore) {
      log.warn(
        `Left partially created files in ${projectDir} (directory already existed). Review and clean up manually.`,
      );
    }
    return;
  }

  try {
    await fs.remove(projectDir);
    if (!isSilent()) {
      log.warn(
        `Cleaned up partially created project at ${projectDir}. Set BTS_KEEP_FAILED_OUTPUT=1 to keep it for debugging.`,
      );
    }
  } catch {
    // Best-effort cleanup; surface nothing if removal itself fails.
  }
}

async function setPackageManagerVersion(
  projectDir: string,
  packageManager: ProjectConfig["packageManager"],
): Promise<void> {
  const pkgJsonPath = path.join(projectDir, "package.json");
  if (!(await fs.pathExists(pkgJsonPath))) return;

  try {
    // Avoid local package manager shims in the generated project affecting detection.
    const { stdout } = await $({ cwd: os.tmpdir() })`${packageManager} -v`;
    const version = stdout.trim();
    const pkgJson = await fs.readJson(pkgJsonPath);
    pkgJson.packageManager = `${packageManager}@${version}`;
    await fs.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });
  } catch {
    const pkgJson = await fs.readJson(pkgJsonPath);
    delete pkgJson.packageManager;
    await fs.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });
  }
}

async function ensurePackageManagerProjectFiles(
  projectDir: string,
  packageManager: ProjectConfig["packageManager"],
): Promise<void> {
  if (packageManager !== "yarn") {
    return;
  }

  const yarnLockPath = path.join(projectDir, "yarn.lock");
  if (await fs.pathExists(yarnLockPath)) {
    return;
  }

  await fs.writeFile(yarnLockPath, "");
}
