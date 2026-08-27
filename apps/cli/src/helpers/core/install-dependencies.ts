import { spinner } from "@clack/prompts";
import consola from "consola";
import { $ } from "execa";
import pc from "picocolors";

import type { Addons, PackageManager, PythonPackageManager } from "@/types";

import { commandExists } from "@/platform/command-exists";
import { classifySetupFailure } from "@/telemetry/analytics";

/**
 * Result of a post-scaffold setup step (dependency install, native build, db setup).
 * Steps still log their own errors, but no longer swallow failure silently - callers
 * collect these so the CLI reports an accurate final status instead of always
 * printing "Project created successfully" on top of a broken install.
 */
export interface SetupStepResult {
  /** Human-readable step name, e.g. "Install dependencies". */
  step: string;
  success: boolean;
  /** Present when success is false. */
  errorMessage?: string;
  /** Whitelisted telemetry reason code; never the raw output. */
  failureReason?: string;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * execa's own message is only "Command failed with exit code 1", so the reason
 * has to come from the tool's stderr. The captured text is classified here and
 * discarded - only the resulting code is ever reported.
 */
function toStepFailure(step: string, error: unknown, errorMessage: string): SetupStepResult {
  const stderr = (error as { stderr?: unknown })?.stderr;
  const detail = typeof stderr === "string" ? `${errorMessage}\n${stderr}` : errorMessage;
  return { step, success: false, errorMessage, failureReason: classifySetupFailure(detail) };
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
      stderr: ["inherit", "pipe"],
    })`${packageManager} ${installArgs}`;

    s.stop("Dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Failed to install dependencies"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Installation error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
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
      stderr: ["inherit", "pipe"],
    })`cargo build`;

    s.stop("Cargo build completed");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Cargo build failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Cargo build error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
  }
}

export async function runUvSync({ projectDir }: { projectDir: string }): Promise<SetupStepResult> {
  const s = spinner();
  const step = "uv sync --extra dev (Python dependencies)";

  try {
    s.start("Running uv sync --extra dev...");

    await $({
      cwd: projectDir,
      stderr: ["inherit", "pipe"],
    })`uv sync --extra dev`;

    s.stop("Python dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("uv sync --extra dev failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`uv sync --extra dev error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
  }
}

export async function runPythonInstall({
  projectDir,
  packageManager,
}: {
  projectDir: string;
  packageManager: PythonPackageManager;
}): Promise<SetupStepResult> {
  if (packageManager === "uv") return runUvSync({ projectDir });

  const s = spinner();
  const step = `${packageManager} install (Python dependencies)`;

  try {
    if (packageManager === "poetry") {
      s.start("Running poetry install...");
      await $({ cwd: projectDir, stderr: ["inherit", "pipe"] })`poetry install --extras dev`;
    } else {
      s.start("Creating a virtual environment and installing with pip...");
      const python = (await commandExists("python")) ? "python" : "python3";
      await $({ cwd: projectDir, stderr: ["inherit", "pipe"] })`${python} -m venv .venv`;
      const pip = process.platform === "win32" ? ".venv/Scripts/pip.exe" : ".venv/bin/pip";
      // Include the dev extra: pytest and the selected quality tools live there,
      // and the printed next-step commands advertise them.
      await $({ cwd: projectDir, stderr: ["inherit", "pipe"] })`${pip} install -e .[dev]`;
    }

    s.stop("Python dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Python dependency installation failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Python installation error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
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
      stderr: ["inherit", "pipe"],
    })`go mod tidy`;

    s.stop("Go dependencies installed successfully");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("go mod tidy failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`go mod tidy error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
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
      stderr: ["inherit", "pipe"],
    })`${mvnw} test`;

    s.stop("Maven tests completed");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Maven tests failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Maven test error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
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
      stderr: ["inherit", "pipe"],
    })`${gradlew} test`;

    s.stop("Gradle tests completed");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("Gradle tests failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Gradle test error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
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
      stderr: ["inherit", "pipe"],
    })`mix deps.get`;

    await $({
      cwd: projectDir,
      stderr: ["inherit", "pipe"],
    })`mix compile`;

    s.stop("Elixir dependencies installed and project compiled");
    return { step, success: true };
  } catch (error) {
    s.stop(pc.red("mix compile failed"));
    const errorMessage = toErrorMessage(error);
    consola.error(pc.red(`Mix error: ${errorMessage}`));
    return toStepFailure(step, error, errorMessage);
  }
}
