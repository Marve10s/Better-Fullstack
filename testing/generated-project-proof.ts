#!/usr/bin/env bun

import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
} from "@better-fullstack/types";
import { buildFreshCliBinary } from "@testing/lib/cli-binary";
import {
  formatCliScaffoldFailure,
  scaffoldWithCli,
  type CliScaffoldResult,
} from "@testing/lib/cli-scaffold";
import {
  hasEligibleEvidenceIdentity,
  missingRequiredSteps,
  GENERATED_PROJECT_PROOF_CASES,
  type GeneratedProjectProofCase,
  type GeneratedProjectProofStep,
} from "@testing/lib/generated-project-proof-matrix";
import { getPresetCombos } from "@testing/lib/presets";
import { getVerifier, type StepResult } from "@testing/lib/verify";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";

const EVIDENCE_SCHEMA_VERSION = 2;
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
  completedAt: string;
  ecosystems: string[];
  id: string;
  ecosystem: GeneratedProjectProofCase["ecosystem"];
  claim: string;
  requiredToolchains: string[];
  requiredSteps: string[];
  stackParts: string[];
  startedAt: string;
  missingRequiredSteps: string[];
  success: boolean;
  steps: RecordedStep[];
  definitionVersion: number;
  maintainer: string;
  runtimeLimitation: string;
  maintenanceCost: {
    flakyRuns: number;
    repairMinutes: number;
    dependencyChanges: number;
    maintainerPresent: boolean;
  };
};

function caseEcosystems(entry: GeneratedProjectProofCase): string[] {
  return [
    ...new Set([
      entry.ecosystem,
      ...entry.stackParts.map((part) => part.split(":")[1]).filter(Boolean),
    ]),
  ].sort() as string[];
}

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
  env?: NodeJS.ProcessEnv,
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
      env: { ...processEnv(), ...env, CI: "true", NO_COLOR: "1" },
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

function runtimeFailure(
  entry: GeneratedProjectProofCase,
  startedAt: number,
  stderrTail: string,
  command = [...entry.runtime.command],
): RecordedStep {
  return {
    step: "runtime",
    command,
    success: false,
    durationMs: Date.now() - startedAt,
    stderrTail: stderrTail.slice(-4_000),
  };
}

async function runRuntimeAssertion(
  entry: GeneratedProjectProofCase,
  projectDir: string,
): Promise<RecordedStep[]> {
  const runtime = entry.runtime;
  const cwd = resolve(projectDir, runtime.processCwd);
  const relativeCwd = relative(projectDir, cwd);
  if (relativeCwd.startsWith("..") || isAbsolute(relativeCwd)) {
    return [runtimeFailure(entry, Date.now(), `Runtime working directory escapes project: ${cwd}`)];
  }
  const setupSteps: RecordedStep[] = [];
  for (const [index, command] of (runtime.setupCommands ?? []).entries()) {
    const [executable, ...args] = command;
    if (!executable) {
      return [
        ...setupSteps,
        runtimeFailure(entry, Date.now(), `Runtime setup command ${index + 1} is empty`),
      ];
    }
    // oxlint-disable-next-line no-await-in-loop -- setup commands are ordered state transitions
    const result = await runCommand(
      `runtime-setup:${index + 1}`,
      executable,
      args,
      cwd,
      runtime.env,
    );
    setupSteps.push(result);
    if (!result.success) {
      return [
        ...setupSteps,
        runtimeFailure(
          entry,
          Date.now(),
          `Runtime setup command ${index + 1} failed: ${result.stderrTail ?? "unknown error"}`,
        ),
      ];
    }
  }

  const [executable, ...args] = runtime.command;
  const startedAt = Date.now();
  if (!executable) {
    return [...setupSteps, runtimeFailure(entry, startedAt, "Runtime command is empty")];
  }
  let stdout = "";
  let stderr = "";
  const child = spawn(executable, args, {
    cwd,
    detached: process.platform !== "win32",
    env: {
      ...processEnv(),
      ...runtime.env,
      CI: "true",
      NO_COLOR: "1",
      BROWSER: "none",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout?.on("data", (data: Buffer) => {
    stdout += data.toString();
  });
  child.stderr?.on("data", (data: Buffer) => {
    stderr += data.toString();
  });
  child.on("error", (error) => {
    stderr += `\n${error.message}`;
  });

  let responseStatus: number | undefined;
  let responseBody = "";
  let lastError = "";
  try {
    while (Date.now() - startedAt < runtime.timeoutMs) {
      if (child.exitCode !== null) {
        return [
          ...setupSteps,
          runtimeFailure(
            entry,
            startedAt,
            `Runtime process exited with code ${child.exitCode}.\n${stderr}\n${stdout}`,
          ),
        ];
      }
      try {
        const response = await fetch(runtime.request.url, {
          method: runtime.request.method,
          body: runtime.request.body,
          headers: runtime.request.headers,
          signal: AbortSignal.timeout(3_000),
        });
        responseStatus = response.status;
        responseBody = await response.text();
        const missingBody = runtime.bodyIncludes.filter((value) => !responseBody.includes(value));
        if (response.status === runtime.expectedStatus && missingBody.length === 0) {
          const followupOutput: string[] = [];
          const followupCommandSteps: RecordedStep[] = [];
          for (const followup of runtime.followupAssertions ?? []) {
            // oxlint-disable-next-line no-await-in-loop -- behavior assertions are an ordered flow
            const followupResponse = await fetch(followup.request.url, {
              method: followup.request.method,
              body: followup.request.body,
              headers: followup.request.headers,
              signal: AbortSignal.timeout(10_000),
            });
            // oxlint-disable-next-line no-await-in-loop -- the response belongs to this assertion
            const followupBody = await followupResponse.text();
            const missingFollowupBody = followup.bodyIncludes.filter(
              (value) => !followupBody.includes(value),
            );
            followupOutput.push(
              `${followup.name}: ${followup.request.method} ${followup.request.url} -> ${followupResponse.status}\n${followupBody}`,
            );
            if (
              followupResponse.status !== followup.expectedStatus ||
              missingFollowupBody.length > 0
            ) {
              return [
                ...setupSteps,
                runtimeFailure(
                  entry,
                  startedAt,
                  [
                    `${followup.name} failed.`,
                    `Expected HTTP ${followup.expectedStatus}, received ${followupResponse.status}.`,
                    missingFollowupBody.length
                      ? `Response missed: ${missingFollowupBody.join(", ")}`
                      : "",
                    followupBody,
                    stderr,
                    stdout,
                  ].join("\n"),
                ),
              ];
            }
          }
          for (const followup of runtime.followupCommands ?? []) {
            const [followupExecutable, ...followupArgs] = followup.command;
            const followupCwd = resolve(projectDir, followup.processCwd ?? runtime.processCwd);
            const relativeFollowupCwd = relative(projectDir, followupCwd);
            if (
              !followupExecutable ||
              relativeFollowupCwd.startsWith("..") ||
              isAbsolute(relativeFollowupCwd)
            ) {
              return [
                ...setupSteps,
                ...followupCommandSteps,
                runtimeFailure(
                  entry,
                  startedAt,
                  `${followup.name} has an empty command or a working directory outside the project.`,
                ),
              ];
            }
            // oxlint-disable-next-line no-await-in-loop -- behavior commands are an ordered flow
            const commandResult = await runCommand(
              `runtime-command:${followup.name}`,
              followupExecutable,
              followupArgs,
              followupCwd,
              { ...runtime.env, ...followup.env },
            );
            followupCommandSteps.push(commandResult);
            const commandOutput = `${commandResult.stdoutTail ?? ""}\n${commandResult.stderrTail ?? ""}`;
            const missingOutput = followup.outputIncludes.filter(
              (value) => !commandOutput.includes(value),
            );
            if (!commandResult.success || missingOutput.length > 0) {
              return [
                ...setupSteps,
                ...followupCommandSteps,
                runtimeFailure(
                  entry,
                  startedAt,
                  [
                    `${followup.name} failed.`,
                    missingOutput.length
                      ? `Command output missed: ${missingOutput.join(", ")}`
                      : "",
                    commandOutput,
                    stderr,
                    stdout,
                  ].join("\n"),
                ),
              ];
            }
          }
          return [
            ...setupSteps,
            ...followupCommandSteps,
            {
              step: "runtime",
              command: [executable, ...args],
              success: true,
              durationMs: Date.now() - startedAt,
              stdoutTail: [
                `${runtime.request.method} ${runtime.request.url} -> ${response.status}`,
                responseBody,
                ...followupOutput,
                stdout,
              ]
                .join("\n")
                .slice(-4_000),
              stderrTail: stderr.slice(-4_000),
            },
          ];
        }
        lastError =
          response.status !== runtime.expectedStatus
            ? `Expected HTTP ${runtime.expectedStatus}, received ${response.status}`
            : `Response missed: ${missingBody.join(", ")}`;
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
      }
      // oxlint-disable-next-line no-await-in-loop -- readiness must be observed serially
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
    }
    return [
      ...setupSteps,
      runtimeFailure(
        entry,
        startedAt,
        [
          `Runtime assertion timed out after ${runtime.timeoutMs}ms.`,
          lastError,
          responseStatus === undefined ? "" : `Last HTTP status: ${responseStatus}`,
          responseBody,
          stderr,
          stdout,
        ].join("\n"),
      ),
    ];
  } finally {
    if (child.pid) {
      signalProcessGroup(child.pid, "SIGTERM");
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
      signalProcessGroup(child.pid, "SIGKILL");
    }
  }
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
  const startedAt = new Date().toISOString();
  const preset = entry.preset ? presetFlags(entry.preset) : undefined;
  if (preset && preset.config.ecosystem !== entry.ecosystem) {
    throw new Error(
      `Proof case ${entry.id} declares ${entry.ecosystem} but preset ${entry.preset} is ${preset.config.ecosystem}`,
    );
  }
  const flags = entry.flags ?? preset?.flags;
  if (!flags) throw new Error(`No scaffold flags for ${entry.id}`);
  const scaffold = await scaffoldWithCli({
    cliPath,
    cwd: outputRoot,
    projectName: entry.projectName,
    flags: [...flags],
    timeoutMs: 180_000,
    expectedFiles: ["bts.jsonc", "bts.lock.json"],
  });
  const steps: RecordedStep[] = [scaffoldStep(scaffold)];

  if (scaffold.ok) {
    if (entry.id === "rust") {
      steps.push(...(await runRust(scaffold.projectDir)));
    } else if (entry.id === "react-native") {
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

  const buildSteps = entry.requiredSteps.filter((step) => step !== "runtime");
  if (missingRequiredSteps(buildSteps, steps).length === 0) {
    steps.push(...(await runRuntimeAssertion(entry, scaffold.projectDir)));
  }

  const missing = missingRequiredSteps(entry.requiredSteps, steps);
  return {
    completedAt: new Date().toISOString(),
    ecosystems: caseEcosystems(entry),
    id: entry.id,
    ecosystem: entry.ecosystem,
    claim: entry.claim,
    requiredToolchains: entry.requiredToolchains,
    requiredSteps: entry.requiredSteps,
    stackParts: entry.stackParts,
    startedAt,
    missingRequiredSteps: missing,
    success: missing.length === 0,
    steps,
    definitionVersion: entry.definitionVersion,
    maintainer: entry.maintainer,
    runtimeLimitation: entry.runtime.limitation,
    maintenanceCost: {
      flakyRuns: 0,
      repairMinutes: 0,
      dependencyChanges: 0,
      maintainerPresent: entry.maintainer.length > 0,
    },
  };
}

async function capabilityProducerFingerprint(): Promise<{
  files: string[];
  sha256: string;
}> {
  const paths = await gitText([
    "ls-files",
    "bun.lock",
    "packages/types/src",
    "packages/template-generator/src",
    "packages/template-generator/templates",
    "testing/generated-project-proof.ts",
    "testing/lib/generated-project-proof-matrix.ts",
    "testing/lib/presets.ts",
  ]);
  const files = paths.split("\n").filter(Boolean).sort();
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(`${file}\0`);
    // oxlint-disable-next-line no-await-in-loop -- file order is part of the digest contract
    hash.update(await readFile(file));
    hash.update("\0");
  }
  return { files, sha256: hash.digest("hex") };
}

async function main(): Promise<void> {
  const outputArgument = process.argv.indexOf("--output");
  const requestedOutput = outputArgument >= 0 ? process.argv[outputArgument + 1] : undefined;
  const outputRoot = resolve(requestedOutput ?? "testing/.smoke-output/generated-project-proof");
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  const gitHead = await gitText(["rev-parse", "HEAD"]);
  const workspaceClean = (await gitText(["status", "--porcelain"])) === "";
  const producer = await capabilityProducerFingerprint();
  const catalogVersion = (
    JSON.parse(await readFile("packages/types/package.json", "utf8")) as { version: string }
  ).version;
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
  let cliPath: string | undefined;
  let cliError: unknown;
  try {
    cliPath = await buildFreshCliBinary();
  } catch (error) {
    cliError = error;
  }
  for (const entry of GENERATED_PROJECT_PROOF_CASES) {
    const startedAt = new Date().toISOString();
    const missingToolchains = entry.requiredToolchains.filter((tool) => unavailable.has(tool));
    if (missingToolchains.length > 0) {
      results.push({
        completedAt: new Date().toISOString(),
        ecosystems: caseEcosystems(entry),
        id: entry.id,
        ecosystem: entry.ecosystem,
        claim: entry.claim,
        requiredToolchains: entry.requiredToolchains,
        requiredSteps: entry.requiredSteps,
        stackParts: entry.stackParts,
        startedAt,
        missingRequiredSteps: [
          ...missingToolchains.map((tool) => `toolchain:${tool}`),
          ...entry.requiredSteps,
        ],
        success: false,
        steps: toolchains
          .filter((tool) => missingToolchains.includes(tool.tool))
          .map(({ tool: _tool, executable: _executable, ...step }) => step),
        definitionVersion: entry.definitionVersion,
        maintainer: entry.maintainer,
        runtimeLimitation: entry.runtime.limitation,
        maintenanceCost: {
          flakyRuns: 0,
          repairMinutes: 0,
          dependencyChanges: 0,
          maintainerPresent: entry.maintainer.length > 0,
        },
      });
    } else {
      try {
        if (!cliPath) throw cliError ?? new Error("CLI binary is unavailable");
        // The matrix is sequential by design: concurrent package installs make
        // failures nondeterministic and can exhaust hosted-runner resources.
        // oxlint-disable-next-line no-await-in-loop
        results.push(await runCase(entry, cliPath, outputRoot));
      } catch (error) {
        results.push({
          completedAt: new Date().toISOString(),
          ecosystems: caseEcosystems(entry),
          id: entry.id,
          ecosystem: entry.ecosystem,
          claim: entry.claim,
          requiredToolchains: entry.requiredToolchains,
          requiredSteps: entry.requiredSteps,
          stackParts: entry.stackParts,
          startedAt,
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
          definitionVersion: entry.definitionVersion,
          maintainer: entry.maintainer,
          runtimeLimitation: entry.runtime.limitation,
          maintenanceCost: {
            flakyRuns: 0,
            repairMinutes: 0,
            dependencyChanges: 0,
            maintainerPresent: entry.maintainer.length > 0,
          },
        });
      }
    }
    // oxlint-disable-next-line no-await-in-loop
    await rm(join(outputRoot, entry.projectName), { recursive: true, force: true });
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
    evidenceType: "better-fullstack/generated-project-runtime",
    generatedAt: new Date().toISOString(),
    gitHead,
    workspaceClean: workspaceClean && workspaceCleanAfter,
    workspaceCleanAtStart: workspaceClean,
    workspaceCleanAfter,
    generatorSource: "workspace-local",
    generatorGitHead: gitHead,
    catalogVersion,
    producerFingerprint: producer.sha256,
    producerInputs: producer.files,
    expectedCases: GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.id),
    requiredToolchains,
    toolchains,
    overallSuccess,
    results,
  };
  const capabilityReceipt = {
    schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
    evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
    receiptType: "better-fullstack/capability-runtime",
    sourceSha: gitHead,
    catalogVersion,
    producerFingerprint: producer.sha256,
    createdAt: evidence.generatedAt,
    toolchains: Object.fromEntries(
      toolchains.map((toolchain) => [
        toolchain.tool,
        (toolchain.stdoutTail || toolchain.stderrTail || "").trim().split("\n")[0] ?? "",
      ]),
    ),
    recipes: results.map((result) => ({
      id: result.id,
      definitionVersion: result.definitionVersion,
      success: result.success,
      startedAt: result.startedAt,
      completedAt: result.completedAt,
      ...result.maintenanceCost,
    })),
  };
  await writeFile(
    join(outputRoot, "generated-project-proof.json"),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );
  await writeFile(
    join(outputRoot, "capability-runtime-receipt.json"),
    `${JSON.stringify(capabilityReceipt, null, 2)}\n`,
  );
  await writeFile(
    join(outputRoot, "generated-project-proof.md"),
    [
      "## Generated project runtime proof",
      "",
      `Commit: \`${gitHead}\``,
      `Clean workspace: **${workspaceClean && workspaceCleanAfter ? "yes" : "no"}**`,
      "",
      "| Ecosystem | Runtime assertion | Stack Parts | Result | Missing required stages |",
      "| --- | --- | --- | --- | --- |",
      ...results.map(
        (result) =>
          `| ${result.ecosystem} | ${GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === result.id)?.runtime.name ?? "Unknown"} | ${result.stackParts.join("<br>")} | ${result.success ? "PASS" : "FAIL"} | ${result.missingRequiredSteps.join(", ") || "None"} |`,
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
              ecosystem: result.ecosystem,
              stackParts: result.stackParts,
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
