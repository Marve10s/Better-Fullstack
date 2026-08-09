#!/usr/bin/env bun

import * as BunContext from "@effect/platform-bun/BunContext";
import * as Effect from "effect/Effect";
import { existsSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

import {
  deriveFailureTags,
  scoreProject,
  selectedSpecs,
  type BenchmarkSpec,
  type RunResult,
  type ScaffbenchOptions,
  validateProject,
  writeSummary,
} from "@/index";

import { resolveCliBinaryPath } from "../testing/lib/cli-binary";
import { EVIDENCE_SCHEMA_VERSION } from "./verified-combinations/evidence";

const OUTPUT_DIR = "testing/.tmp-scaffbench-2";
const PROJECT_ROOT = path.resolve(OUTPUT_DIR, "canonical-cli");
const REPO_ROOT = path.resolve(import.meta.dir, "..");

function parseSpecs(argv: string[]): string[] {
  const specIndex = argv.findIndex((arg) => arg === "--spec" || arg === "--specs");
  if (specIndex === -1) return ["ai-search-workbench"];
  return argv[specIndex + 1]?.split(",").filter(Boolean) ?? ["ai-search-workbench"];
}

function scaffbenchOptions(specs: string[]): ScaffbenchOptions {
  return {
    model: "canonical-cli",
    efforts: ["default"],
    paths: ["cli"],
    specs,
    repeats: 1,
    outDir: path.resolve(OUTPUT_DIR),
    maxBudgetUsd: "0",
    skipValidation: false,
    generateOnly: false,
    validateExisting: false,
    forceRevalidate: false,
    qualityGate: false,
    doctorCheck: false,
    routeCheck: false,
    promptStyle: "explicit",
    listSpecs: false,
    writeMatrixOnly: false,
  };
}

async function runCommand(
  command: readonly string[],
  cwd: string,
): Promise<{
  exitCode: number | null;
  durationMs: number;
}> {
  const startedAt = Date.now();
  const proc = Bun.spawn([...command], {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await proc.exited;
  return { exitCode, durationMs: Date.now() - startedAt };
}

export function localCanonicalCommand(
  cliPath: string,
  spec: Pick<BenchmarkSpec, "canonicalFlags">,
  projectName: string,
): string[] {
  return ["node", cliPath, projectName, ...spec.canonicalFlags];
}

function displayCommand(command: readonly string[]): string {
  return command.map((argument) => JSON.stringify(argument)).join(" ");
}

async function buildLocalCliBinary(): Promise<string> {
  for (const packageDirectory of ["packages/types", "packages/template-generator", "apps/cli"]) {
    // oxlint-disable-next-line no-await-in-loop -- workspace packages must build in dependency order.
    const result = await runCommand(
      [process.execPath, "run", "build"],
      path.join(REPO_ROOT, packageDirectory),
    );
    if (result.exitCode !== 0) {
      throw new Error(`Failed to build local workspace package ${packageDirectory}`);
    }
  }

  const cliPath = resolveCliBinaryPath({ repoRoot: REPO_ROOT });
  if (!existsSync(cliPath)) throw new Error(`Local CLI binary was not produced at ${cliPath}`);
  return cliPath;
}

async function gitEvidence(): Promise<{ gitHead: string; workspaceClean: boolean }> {
  const headProc = Bun.spawn(["git", "rev-parse", "HEAD"], { stdout: "pipe", stderr: "ignore" });
  const gitHead = (await new Response(headProc.stdout).text()).trim();
  const headOk = (await headProc.exited) === 0;
  const statusProc = Bun.spawn(["git", "status", "--porcelain"], {
    stdout: "pipe",
    stderr: "ignore",
  });
  const status = await new Response(statusProc.stdout).text();
  const statusOk = (await statusProc.exited) === 0;
  return { gitHead: headOk ? gitHead : "", workspaceClean: statusOk && status.trim() === "" };
}

async function main(): Promise<void> {
  const specs = selectedSpecs(parseSpecs(process.argv.slice(2)));
  const options = scaffbenchOptions(specs.map((spec) => spec.id));
  const results: RunResult[] = [];
  const cliPath = await buildLocalCliBinary();

  await mkdir(PROJECT_ROOT, { recursive: true });

  try {
    for (const spec of specs) {
      const projectName = `canonical-${spec.id}`;
      const projectDir = path.join(PROJECT_ROOT, projectName);
      // oxlint-disable-next-line no-await-in-loop -- canonical runs stay isolated and deterministic.
      await rm(projectDir, { recursive: true, force: true });

      const command = localCanonicalCommand(cliPath, spec, projectName);
      const commandText = displayCommand(command);
      console.log(`SCAFFBENCH ${spec.id}: ${commandText}`);
      // oxlint-disable-next-line no-await-in-loop -- avoid overlapping package installs across specs.
      const create = await runCommand(command, PROJECT_ROOT);
      const projectExists = create.exitCode === 0;
      // oxlint-disable-next-line no-await-in-loop -- validate each isolated scaffold before scoring it.
      const validation = await validateProject(
        spec,
        projectExists ? projectDir : null,
        options,
      ).pipe(Effect.provide(BunContext.layer), Effect.runPromise);
      const scored = projectExists
        ? // oxlint-disable-next-line no-await-in-loop -- scoring consumes the just-validated project.
          await scoreProject(spec, projectDir, options.promptStyle)
        : {
            artifact: {
              matched: 0,
              total: spec.strictMarkers.length,
              percent: 0,
              misses: spec.strictMarkers.map((marker) => marker.id),
            },
            faithfulness: undefined,
            acceptance: undefined,
          };

      const result: RunResult = {
        id: `canonical-cli-${spec.id}`,
        specId: spec.id,
        specTitle: spec.title,
        model: options.model,
        effort: "default",
        path: "cli",
        trial: 1,
        promptStyle: options.promptStyle,
        runDir: projectDir,
        projectName,
        projectDir: projectExists ? projectDir : null,
        claude: {
          exitCode: create.exitCode,
          timedOut: false,
          durationMs: create.durationMs,
        },
        validation,
        stackScore: scored.artifact,
        generatorFaithfulness: scored.faithfulness,
        acceptanceScore: scored.acceptance,
        toolCompliance: {
          score: 1,
          total: 1,
          checks: [
            {
              id: "canonical-cli-command",
              status: create.exitCode === 0 ? "pass" : "fail",
              detail: commandText,
            },
          ],
        },
        failureTags: [],
      };
      result.failureTags = deriveFailureTags(result);
      results.push(result);
    }
  } finally {
    await rm(PROJECT_ROOT, { recursive: true, force: true });
  }

  const evidence = await gitEvidence();
  const cliPackage = (await Bun.file(path.join(REPO_ROOT, "apps/cli/package.json")).json()) as {
    version: string;
  };
  await writeSummary(path.resolve(OUTPUT_DIR), results, options, specs, {
    cwd: process.cwd(),
    generatedBy: "record-scaffbench-canonical",
    evidenceSchemaVersion: EVIDENCE_SCHEMA_VERSION,
    gitHead: evidence.gitHead,
    workspaceClean: evidence.workspaceClean,
    environmentQualified: true,
    generatorSource: "workspace-local",
    generatorGitHead: evidence.gitHead,
    bfGeneratorVersion: cliPackage.version,
  });
}

if (import.meta.main) await main();
