import { spinner } from "@clack/prompts";
import consola from "consola";
import { $ } from "execa";
import pc from "picocolors";

import type { Addons, PackageManager } from "../../types";

/**
 * Result of a post-scaffold setup step (dependency install, native build, db setup).
 * Steps still log their own errors, but no longer swallow failure silently — callers
 * collect these so the CLI reports an accurate final status instead of always
 * printing "Project created successfully" on top of a broken install.
 */
export interface SetupStepResult {
  /** Human-readable step name, e.g. "Install dependencies". */
  step: string;
  success: boolean;
  /** Present when success is false. */
  errorMessage?: string;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function getInstallEnvironment(
  packageManager: PackageManager,
): NodeJS.ProcessEnv | undefined {
  if (packageManager === "yarn") {
    return {
      // Fresh generated workspaces need to create yarn.lock on first install.
      // GitHub Actions public-PR runs can force immutable/hardened Yarn behavior,
      // which is correct for existing repos but breaks first-install scaffolds.
      YARN_ENABLE_HARDENED_MODE: "0",
      YARN_ENABLE_IMMUTABLE_INSTALLS: "false",
    };
  }

  return undefined;
}

export function getInstallArgs(packageManager: PackageManager): string[] {
  if (packageManager === "pnpm") {
    // pnpm v10 blocks dependency lifecycle scripts unless builds are approved.
    // Fresh scaffolds have no approval state yet, so allow dependency builds
    // for the first install instead of failing with ERR_PNPM_IGNORED_BUILDS.
    return ["install", "--dangerously-allow-all-builds"];
  }

  return ["install"];
}

export async function installDependencies({
  projectDir,
  packageManager,
}: {
  projectDir: string;
  packageManager: PackageManager;
  addons?: Addons[];
}): Promise<SetupStepResult> {
  const s = spinner();
  const step = "Install dependencies";

  try {
    s.start(`Running ${packageManager} install...`);

    const installArgs = getInstallArgs(packageManager);
    await $({
      cwd: projectDir,
      env: {
        ...process.env,
        ...getInstallEnvironment(packageManager),
      },
      stderr: "inherit",
    })`${packageManager} ${installArgs}`;

    s.stop("Dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Failed to install dependencies"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Installation error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}

export async function runCargoBuild({
  projectDir,
}: {
  projectDir: string;
}): Promise<SetupStepResult> {
  const s = spinner();
  const step = "Cargo build";

  try {
    s.start("Running cargo build...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`cargo build`;

    s.stop("Cargo build completed");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Cargo build failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Cargo build error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}

export async function runUvSync({ projectDir }: { projectDir: string }): Promise<SetupStepResult> {
  const s = spinner();
  const step = "uv sync (Python dependencies)";

  try {
    s.start("Running uv sync...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`uv sync`;

    s.stop("Python dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("uv sync failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`uv sync error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}

export async function runGoModTidy({
  projectDir,
}: {
  projectDir: string;
}): Promise<SetupStepResult> {
  const s = spinner();
  const step = "go mod tidy";

  try {
    s.start("Running go mod tidy...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`go mod tidy`;

    s.stop("Go dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("go mod tidy failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`go mod tidy error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}

export async function runMavenTests({
  projectDir,
}: {
  projectDir: string;
}): Promise<SetupStepResult> {
  const s = spinner();
  const mvnw = process.platform === "win32" ? "mvnw.cmd" : "./mvnw";
  const step = "Maven tests";

  try {
    s.start("Running Maven tests...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`${mvnw} test`;

    s.stop("Maven tests completed");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Maven tests failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Maven test error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}

export async function runGradleTests({
  projectDir,
}: {
  projectDir: string;
}): Promise<SetupStepResult> {
  const s = spinner();
  const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
  const step = "Gradle tests";

  try {
    s.start("Running Gradle tests...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`${gradlew} test`;

    s.stop("Gradle tests completed");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Gradle tests failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Gradle test error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}

export async function runMixCompile({
  projectDir,
}: {
  projectDir: string;
}): Promise<SetupStepResult> {
  const s = spinner();
  const step = "mix deps.get / compile";

  try {
    s.start("Running mix deps.get and mix compile...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`mix deps.get`;

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`mix compile`;

    s.stop("Elixir dependencies installed and project compiled");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("mix compile failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Mix error: ${errorMessage}`));
    return { step, success: false, errorMessage };
  }
}
