import { log, spinner } from "@clack/prompts";
import { $ } from "execa";
import path from "node:path";
import pc from "picocolors";

import type { ProjectConfig, StackPart } from "../types";

import { commandExists } from "./command-exists";
import { getPrimaryGraphPart } from "./graph-summary";

type VerifyTarget = {
  ecosystem: Exclude<StackPart["ecosystem"], "typescript" | "react-native" | "universal">;
  projectDir: string;
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

  return {
    ecosystem: backend.ecosystem,
    projectDir: path.join(config.projectDir, backend.targetPath ?? "apps/server"),
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
  };
}

async function runCommand(cwd: string, command: string, args: string[]) {
  await $({
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  })`${command} ${args}`;
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
      await runCommand(cwd, "uv", ["sync"]);
      await runCommand(cwd, "uv", ["run", "ruff", "check", "."]);
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
