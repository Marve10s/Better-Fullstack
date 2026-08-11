#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import { buildFreshCliBinary } from "./lib/cli-binary";
import {
  formatCliScaffoldFailure,
  scaffoldWithCli,
  type CliScaffoldResult,
} from "./lib/cli-scaffold";
import {
  hasEligibleEvidenceIdentity,
  missingRequiredSteps,
  GENERATED_PROJECT_PROOF_CASES,
  type GeneratedProjectProofCase,
  type GeneratedProjectProofStep,
} from "./lib/generated-project-proof-matrix";
import { getPresetCombos } from "./lib/presets";
import { getVerifier, type StepResult } from "./lib/verify";

const EVIDENCE_SCHEMA_VERSION = 1;
const STEP_TIMEOUT_MS = 600_000;
const TOOLCHAIN_VERSION_ARGS: Record<string, string[]> = {
  go: ["version"],
};

type RecordedStep = GeneratedProjectProofStep & {
  command: string[];
  durationMs: number;
  exitCode?: number;
  timedOut?: boolean;
  stdoutTail?: string;
  stderrTail?: string;
};

type CaseResult = {
  id: string;
  claim: string;
  requiredToolchains: string[];
  requiredSteps: string[];
  missingRequiredSteps: string[];
  success: boolean;
  steps: RecordedStep[];
};

async function gitText(args: string[]): Promise<string> {
  const process = Bun.spawn(["git", ...args], { stdout: "pipe", stderr: "pipe" });
  const output = await new Response(process.stdout).text();
  const error = await new Response(process.stderr).text();
  if ((await process.exited) !== 0) throw new Error(error || `git ${args.join(" ")} failed`);
  return output.trim();
}

function signalProcessGroup(pid: number, signal: NodeJS.Signals): void {
  try {
    process.kill(process.platform === "win32" ? pid : -pid, signal);
  } catch {
    try {
      process.kill(pid, signal);
    } catch {
      return;
    }
  }
}

async function runCommand(
  step: string,
  command: string,
  args: string[],
  cwd: string,
): Promise<RecordedStep> {
  const startedAt = Date.now();
  return await new Promise<RecordedStep>((resolvePromise) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;
    const timers: NodeJS.Timeout[] = [];
    const settle = (exitCode: number | null, failureMessage?: string) => {
      if (settled) return;
      settled = true;
      for (const timer of timers) clearTimeout(timer);
      // oxlint-disable-next-line promise/no-multiple-resolved -- the settled flag guarantees a single resolution across event paths
      resolvePromise({
        step,
        command: [command, ...args],
        success: exitCode === 0 && !timedOut && !failureMessage,
        durationMs: Date.now() - startedAt,
        exitCode: exitCode ?? undefined,
        timedOut,
        stdoutTail: stdout.slice(-4_000),
        stderrTail: (failureMessage ? `${failureMessage}\n${stderr}` : stderr).slice(-4_000),
      });
    };

    const child = spawn(command, args, {
      cwd,
      detached: process.platform !== "win32",
      env: { ...processEnv(), CI: "true", NO_COLOR: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout?.on("data", (data: Buffer) => {
      stdout += data.toString();
    });
    child.stderr?.on("data", (data: Buffer) => {
      stderr += data.toString();
    });
    child.on("error", (error) => settle(null, error.message));
    child.on("close", (code) => settle(code));
    child.on("exit", (code) => {
      timers.push(setTimeout(() => settle(code), 5_000));
    });
    timers.push(
      setTimeout(() => {
        timedOut = true;
        if (child.pid) signalProcessGroup(child.pid, "SIGTERM");
        timers.push(
          setTimeout(() => {
            if (child.pid) signalProcessGroup(child.pid, "SIGKILL");
            timers.push(
              setTimeout(() => settle(null, "Step timed out; process group killed"), 2_000),
            );
          }, 2_000),
        );
      }, STEP_TIMEOUT_MS),
    );
  });
}

function processEnv(): Record<string, string | undefined> {
  return process.env;
}

function scaffoldStep(result: CliScaffoldResult): RecordedStep {
  return {
    step: "scaffold",
    command: result.command,
    success: result.ok,
    durationMs: result.durationMs,
    exitCode: result.exitCode,
    timedOut: result.timedOut,
    stdoutTail: result.stdoutTail,
    stderrTail: result.ok ? result.stderrTail : formatCliScaffoldFailure(result),
  };
}

function verifierStep(step: StepResult): RecordedStep {
  return {
    step: step.step,
    command: [],
    success: step.success,
    skipped: step.skipped,
    durationMs: step.durationMs,
    exitCode: step.exitCode,
    timedOut: step.timedOut,
    stdoutTail: step.stdout,
    stderrTail: step.stderr,
  };
}

async function findFiles(root: string, targetName: string): Promise<string[]> {
  const results: string[] = [];
  async function walk(directory: string): Promise<void> {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if ([".git", "node_modules", "target", ".venv"].includes(entry.name)) continue;
      const path = join(directory, entry.name);
      // Directory traversal is intentionally ordered to keep diagnostics deterministic.
      // oxlint-disable-next-line no-await-in-loop
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile() && entry.name === targetName) results.push(path);
    }
  }
  await walk(root);
  return results.sort();
}

function presetFlags(preset: string): {
  flags: string[];
  config: ReturnType<typeof getPresetCombos>[number]["config"];
} {
  const combo = getPresetCombos(preset)[0];
  if (!combo) throw new Error(`Missing curated preset ${preset}`);
  const tokens = combo.command.split(" ");
  const projectIndex = tokens.indexOf(combo.name);
  if (projectIndex < 0) throw new Error(`Preset command does not contain ${combo.name}`);
  return { flags: tokens.slice(projectIndex + 1), config: combo.config };
}

async function runTypeScriptGo(projectDir: string): Promise<RecordedStep[]> {
  const goModules = await findFiles(projectDir, "go.mod");
  if (goModules.length !== 1) {
    return [
      {
        step: "go-tidy",
        command: ["go", "mod", "tidy"],
        success: false,
        durationMs: 0,
        stderrTail: `Expected exactly one generated go.mod, found ${goModules.length}.`,
      },
    ];
  }
  const goModule = goModules[0];
  if (!goModule) throw new Error("The validated Go module disappeared.");
  const goRoot = dirname(goModule);
  const install = await runCommand("typescript-install", "bun", ["install"], projectDir);
  const steps = [install];
  if (!install.success) return steps;
  const typescriptBuild = await runCommand("typescript-build", "bun", ["run", "build"], projectDir);
  steps.push(typescriptBuild);
  if (!typescriptBuild.success) return steps;
  const goTidy = await runCommand("go-tidy", "go", ["mod", "tidy"], goRoot);
  steps.push(goTidy);
  if (!goTidy.success) return steps;
  steps.push(await runCommand("go-build", "go", ["build", "./..."], goRoot));
  return steps;
}

async function runRust(projectDir: string): Promise<RecordedStep[]> {
  const fetch = await runCommand("fetch", "cargo", ["fetch"], projectDir);
  if (!fetch.success) return [fetch];
  return [fetch, await runCommand("build", "cargo", ["build", "--locked"], projectDir)];
}

async function runMobileBackendBuild(projectDir: string): Promise<RecordedStep> {
  const serverDir = join(projectDir, "apps", "server");
  try {
    const packageJson = JSON.parse(await readFile(join(serverDir, "package.json"), "utf8")) as {
      scripts?: Record<string, string>;
    };
    if (packageJson.scripts?.build) {
      return runCommand("backend-build", "bun", ["run", "build"], serverDir);
    }
    if (packageJson.scripts?.["check-types"]) {
      return runCommand("backend-build", "bun", ["run", "check-types"], serverDir);
    }
    return {
      step: "backend-build",
      command: [],
      success: false,
      durationMs: 0,
      stderrTail: "Generated backend exposes neither build nor check-types.",
    };
  } catch (error) {
    return {
      step: "backend-build",
      command: [],
      success: false,
      durationMs: 0,
      stderrTail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runMobileBackend(projectDir: string): Promise<RecordedStep[]> {
  const nativeDir = join(projectDir, "apps", "native");
  const install = await runCommand("install", "bun", ["install"], projectDir);
  if (!install.success) return [install];
  const typecheck = await runCommand(
    "typecheck",
    "bunx",
    ["tsc", "-p", "apps/native/tsconfig.json", "--noEmit"],
    projectDir,
  );
  if (!typecheck.success) return [install, typecheck];
  const build = await runCommand("build", "bunx", ["expo", "export"], nativeDir);
  if (!build.success) return [install, typecheck, build];
  return [install, typecheck, build, await runMobileBackendBuild(projectDir)];
}

async function runCase(
  entry: GeneratedProjectProofCase,
  cliPath: string,
  outputRoot: string,
): Promise<CaseResult> {
  const preset = entry.preset ? presetFlags(entry.preset) : undefined;
  const flags = entry.flags ?? preset?.flags;
  if (!flags) throw new Error(`No scaffold flags for ${entry.id}`);
  const scaffold = await scaffoldWithCli({
    cliPath,
    cwd: outputRoot,
    projectName: entry.projectName,
    flags,
    timeoutMs: 180_000,
    expectedFiles: ["bts.jsonc", "bts.lock.json"],
  });
  const steps: RecordedStep[] = [scaffoldStep(scaffold)];

  if (scaffold.ok) {
    if (entry.id === "typescript-go") {
      steps.push(...(await runTypeScriptGo(scaffold.projectDir)));
    } else if (entry.id === "rust") {
      steps.push(...(await runRust(scaffold.projectDir)));
    } else if (entry.id === "mobile-backend") {
      steps.push(...(await runMobileBackend(scaffold.projectDir)));
    } else if (preset) {
      const verifier = getVerifier(preset.config.ecosystem);
      const result = await verifier(entry.id, scaffold.projectDir, {
        strict: true,
        config: preset.config,
        outputDir: outputRoot,
      });
      steps.push(...result.steps.map(verifierStep));
    }
  }

  const missing = missingRequiredSteps(entry.requiredSteps, steps);
  return {
    id: entry.id,
    claim: entry.claim,
    requiredToolchains: entry.requiredToolchains,
    requiredSteps: entry.requiredSteps,
    missingRequiredSteps: missing,
    success: missing.length === 0,
    steps,
  };
}

async function main(): Promise<void> {
  const outputArgument = process.argv.indexOf("--output");
  const requestedOutput = outputArgument >= 0 ? process.argv[outputArgument + 1] : undefined;
  const outputRoot = resolve(requestedOutput ?? "testing/.smoke-output/generated-project-proof");
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  const gitHead = await gitText(["rev-parse", "HEAD"]);
  const workspaceClean = (await gitText(["status", "--porcelain"])) === "";
  const requiredToolchains = [
    ...new Set(GENERATED_PROJECT_PROOF_CASES.flatMap((entry) => entry.requiredToolchains)),
  ];
  const toolchains = await Promise.all(
    requiredToolchains.map(async (tool) => {
      const executable = Bun.which(tool);
      const versionArgs = TOOLCHAIN_VERSION_ARGS[tool] ?? ["--version"];
      const version = executable
        ? await runCommand(`toolchain:${tool}`, tool, versionArgs, process.cwd())
        : ({
            step: `toolchain:${tool}`,
            command: [tool, ...versionArgs],
            success: false,
            durationMs: 0,
            stderrTail: `${tool} was not found on PATH`,
          } satisfies RecordedStep);
      return { tool, executable, ...version };
    }),
  );
  const unavailable = new Set(toolchains.filter((tool) => !tool.success).map((tool) => tool.tool));
  const results: CaseResult[] = [];

  if (unavailable.size === 0) {
    let cliPath: string | undefined;
    let cliError: unknown;
    try {
      cliPath = await buildFreshCliBinary();
    } catch (error) {
      cliError = error;
    }
    for (const entry of GENERATED_PROJECT_PROOF_CASES) {
      try {
        if (!cliPath) throw cliError ?? new Error("CLI binary is unavailable");
        // The matrix is sequential by design: concurrent package installs make
        // failures nondeterministic and can exhaust hosted-runner resources.
        // oxlint-disable-next-line no-await-in-loop
        results.push(await runCase(entry, cliPath, outputRoot));
      } catch (error) {
        results.push({
          id: entry.id,
          claim: entry.claim,
          requiredToolchains: entry.requiredToolchains,
          requiredSteps: entry.requiredSteps,
          missingRequiredSteps: entry.requiredSteps,
          success: false,
          steps: [
            {
              step: "harness",
              command: [],
              success: false,
              durationMs: 0,
              stderrTail: error instanceof Error ? error.message : String(error),
            },
          ],
        });
      }
      // oxlint-disable-next-line no-await-in-loop
      await rm(join(outputRoot, entry.projectName), { recursive: true, force: true });
    }
  } else {
    for (const entry of GENERATED_PROJECT_PROOF_CASES) {
      results.push({
        id: entry.id,
        claim: entry.claim,
        requiredToolchains: entry.requiredToolchains,
        requiredSteps: entry.requiredSteps,
        missingRequiredSteps: entry.requiredSteps,
        success: false,
        steps: toolchains
          .filter((tool) => entry.requiredToolchains.includes(tool.tool))
          .map(({ tool: _tool, executable: _executable, ...step }) => step),
      });
    }
  }

  const workspaceCleanAfter = (await gitText(["status", "--porcelain"])) === "";
  const evidenceIdentityEligible = hasEligibleEvidenceIdentity(
    gitHead,
    workspaceClean,
    workspaceCleanAfter,
  );
  const overallSuccess =
    evidenceIdentityEligible &&
    toolchains.every((tool) => tool.success) &&
    results.every((r) => r.success);
  const evidence = {
    schemaVersion: EVIDENCE_SCHEMA_VERSION,
    evidenceType: "better-fullstack/generated-project-install-build",
    generatedAt: new Date().toISOString(),
    gitHead,
    workspaceClean: workspaceClean && workspaceCleanAfter,
    workspaceCleanAtStart: workspaceClean,
    workspaceCleanAfter,
    generatorSource: "workspace-local",
    generatorGitHead: gitHead,
    expectedCases: GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.id),
    requiredToolchains,
    toolchains,
    overallSuccess,
    results,
  };
  await writeFile(
    join(outputRoot, "generated-project-proof.json"),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );
  await writeFile(
    join(outputRoot, "generated-project-proof.md"),
    [
      "## Generated project install/build proof",
      "",
      `Commit: \`${gitHead}\``,
      `Clean workspace: **${workspaceClean && workspaceCleanAfter ? "yes" : "no"}**`,
      "",
      "| Case | Result | Missing required steps |",
      "| --- | --- | --- |",
      ...results.map(
        (result) =>
          `| ${result.id} | ${result.success ? "PASS" : "FAIL"} | ${result.missingRequiredSteps.join(", ") || "—"} |`,
      ),
      "",
    ].join("\n"),
  );

  if (!overallSuccess) {
    console.error(
      JSON.stringify(
        {
          evidenceType: evidence.evidenceType,
          gitHead,
          workspaceClean: evidence.workspaceClean,
          failedToolchains: toolchains
            .filter((tool) => !tool.success)
            .map(({ tool, command, exitCode, stderrTail }) => ({
              tool,
              command,
              exitCode,
              stderrTail,
            })),
          failedCases: results
            .filter((result) => !result.success)
            .map((result) => ({
              id: result.id,
              missingRequiredSteps: result.missingRequiredSteps,
              failedSteps: result.steps
                .filter((step) => !step.success || step.skipped)
                .map(({ step, command, exitCode, skipped, stdoutTail, stderrTail }) => ({
                  step,
                  command,
                  exitCode,
                  skipped,
                  stdoutTail,
                  stderrTail,
                })),
            })),
        },
        null,
        2,
      ),
    );
    process.exitCode = 1;
  }
}

if (import.meta.main) await main();
