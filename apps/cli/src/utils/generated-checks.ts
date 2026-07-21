import { log, spinner } from "@clack/prompts";
import { $ } from "execa";
import path from "node:path";
import pc from "picocolors";

import type { ProjectConfig, StackPart } from "../types";

import { stackGraphToLegacyProjectConfigForEcosystem } from "../types";
import { commandExists } from "./command-exists";
import { getPrimaryGraphPart } from "./graph-summary";

type VerifyTarget = {
  ecosystem: Exclude<StackPart["ecosystem"], "typescript" | "react-native" | "universal">;
  projectDir: string;
  pythonPackageManager?: ProjectConfig["pythonPackageManager"];
  pythonQuality?: ProjectConfig["pythonQuality"];
};

function getGraphTarget(config: ProjectConfig): VerifyTarget | null {
  const backend = getPrimaryGraphPart(config, "backend");
  if (
    !backend ||
    backend.ecosystem === "typescript" ||
    backend.ecosystem === "react-native" ||
    backend.ecosystem === "universal"
  ) {
    return null;
  }

  // Graph parts can scope the package manager / quality tool to the backend
  // (backend.packageManager:python:poetry); the top-level config still holds
  // the defaults, so project the stack parts the same way the generator does.
  const projected =
    backend.ecosystem === "python"
      ? stackGraphToLegacyProjectConfigForEcosystem(config, "python")
      : config;

  return {
    ecosystem: backend.ecosystem,
    projectDir: path.join(config.projectDir, backend.targetPath ?? "apps/server"),
    pythonPackageManager: projected.pythonPackageManager,
    pythonQuality: projected.pythonQuality,
  };
}

function getSingleEcosystemTarget(config: ProjectConfig): VerifyTarget | null {
  if (
    config.ecosystem === "typescript" ||
    config.ecosystem === "react-native" ||
    config.ecosystem === "java"
  ) {
    return null;
  }

  return {
    ecosystem: config.ecosystem,
    projectDir: config.projectDir,
    pythonPackageManager: config.pythonPackageManager,
    pythonQuality: config.pythonQuality,
  };
}

async function runCommand(cwd: string, command: string, args: string[]) {
  await $({
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  })`${command} ${args}`;
}

async function runPythonQualityCheck(
  cwd: string,
  runner: "poetry" | "uv",
  quality: ProjectConfig["pythonQuality"] | undefined,
) {
  if (quality === "ruff") {
    await runCommand(cwd, runner, ["run", "ruff", "check", "."]);
  } else if (quality === "mypy") {
    // Bare mypy uses the scaffold's [tool.mypy] files list.
    await runCommand(cwd, runner, ["run", "mypy"]);
  } else if (quality === "pyright") {
    await runCommand(cwd, runner, ["run", "pyright"]);
  }
}

async function verifyTarget(target: VerifyTarget) {
  const s = spinner();
  const cwd = target.projectDir;

  switch (target.ecosystem) {
    case "go":
      s.start("Verifying generated Go server...");
      await runCommand(cwd, "go", ["mod", "tidy"]);
      await runCommand(cwd, "go", ["test", "./..."]);
      s.stop("Generated Go server checks passed");
      return;
    case "rust":
      s.start("Verifying generated Rust server...");
      await runCommand(cwd, "cargo", ["check"]);
      s.stop("Generated Rust server checks passed");
      return;
    case "python":
      s.start("Verifying generated Python server...");
      if (target.pythonPackageManager === "poetry") {
        await runCommand(cwd, "poetry", ["install", "--extras", "dev"]);
        await runPythonQualityCheck(cwd, "poetry", target.pythonQuality);
      } else if (target.pythonPackageManager === "none") {
        await runCommand(cwd, "python", ["-m", "compileall", "src"]);
      } else {
        await runCommand(cwd, "uv", ["sync", "--extra", "dev"]);
        await runPythonQualityCheck(cwd, "uv", target.pythonQuality);
      }
      s.stop("Generated Python server checks passed");
      return;
    case "elixir":
      if (!(await commandExists("mix"))) {
        log.warn(pc.yellow("Skipping Elixir verification because mix is not on PATH"));
        return;
      }
      s.start("Verifying generated Elixir server...");
      await runCommand(cwd, "mix", ["deps.get"]);
      await runCommand(cwd, "mix", ["compile"]);
      s.stop("Generated Elixir server checks passed");
      return;
    default:
      log.warn(pc.yellow(`No generated checks are configured for ${target.ecosystem}`));
  }
}

export async function runGeneratedChecks(config: ProjectConfig) {
  const target = getGraphTarget(config) ?? getSingleEcosystemTarget(config);
  if (!target) {
    log.warn(pc.yellow("No generated checks are configured for this stack"));
    return;
  }

  await verifyTarget(target);
}
