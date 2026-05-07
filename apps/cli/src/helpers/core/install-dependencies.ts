import { spinner } from "@clack/prompts";
import consola from "consola";
import { $ } from "execa";
import pc from "picocolors";

import type { Addons, PackageManager } from "../../types";

export function getInstallEnvironment(packageManager: PackageManager): NodeJS.ProcessEnv | undefined {
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
}) {
  const s = spinner();

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
  } catch (error) {
    s.stop(pc.red("Failed to install dependencies"));
    if (error instanceof Error) {
      consola.error(pc.red(`Installation error: ${error.message}`));
    }
  }
}

export async function runCargoBuild({ projectDir }: { projectDir: string }) {
  const s = spinner();

  try {
    s.start("Running cargo build...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`cargo build`;

    s.stop("Cargo build completed");
  } catch (error) {
    s.stop(pc.red("Cargo build failed"));
    if (error instanceof Error) {
      consola.error(pc.red(`Cargo build error: ${error.message}`));
    }
  }
}

export async function runUvSync({ projectDir }: { projectDir: string }) {
  const s = spinner();

  try {
    s.start("Running uv sync...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`uv sync`;

    s.stop("Python dependencies installed successfully");
  } catch (error) {
    s.stop(pc.red("uv sync failed"));
    if (error instanceof Error) {
      consola.error(pc.red(`uv sync error: ${error.message}`));
    }
  }
}

export async function runGoModTidy({ projectDir }: { projectDir: string }) {
  const s = spinner();

  try {
    s.start("Running go mod tidy...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`go mod tidy`;

    s.stop("Go dependencies installed successfully");
  } catch (error) {
    s.stop(pc.red("go mod tidy failed"));
    if (error instanceof Error) {
      consola.error(pc.red(`go mod tidy error: ${error.message}`));
    }
  }
}

export async function runMavenTests({ projectDir }: { projectDir: string }) {
  const s = spinner();
  const mvnw = process.platform === "win32" ? "mvnw.cmd" : "./mvnw";

  try {
    s.start("Running Maven tests...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`${mvnw} test`;

    s.stop("Maven tests completed");
  } catch (error) {
    s.stop(pc.red("Maven tests failed"));
    if (error instanceof Error) {
      consola.error(pc.red(`Maven test error: ${error.message}`));
    }
  }
}

export async function runGradleTests({ projectDir }: { projectDir: string }) {
  const s = spinner();
  const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";

  try {
    s.start("Running Gradle tests...");

    await $({
      cwd: projectDir,
      stderr: "inherit",
    })`${gradlew} test`;

    s.stop("Gradle tests completed");
  } catch (error) {
    s.stop(pc.red("Gradle tests failed"));
    if (error instanceof Error) {
      consola.error(pc.red(`Gradle test error: ${error.message}`));
    }
  }
}
