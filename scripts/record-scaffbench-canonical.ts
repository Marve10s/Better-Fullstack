#!/usr/bin/env bun

import * as BunContext from "@effect/platform-bun/BunContext";
import * as Effect from "effect/Effect";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

import {
  canonicalCommand,
  deriveFailureTags,
  scoreProject,
  selectedSpecs,
  type ScaffbenchOptions,
  type RunResult,
  validateProject,
  writeSummary,
} from "@/index";

const OUTPUT_DIR = "testing/.tmp-scaffbench-2";
const PROJECT_ROOT = path.resolve(OUTPUT_DIR, "canonical-cli");

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
  command: string,
  cwd: string,
): Promise<{
  exitCode: number | null;
  durationMs: number;
}> {
  const startedAt = Date.now();
  const proc = Bun.spawn(["/bin/sh", "-c", command], {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await proc.exited;
  return { exitCode, durationMs: Date.now() - startedAt };
}

async function main(): Promise<void> {
  const specs = selectedSpecs(parseSpecs(process.argv.slice(2)));
  const options = scaffbenchOptions(specs.map((spec) => spec.id));
  const results: RunResult[] = [];

  await mkdir(PROJECT_ROOT, { recursive: true });

  for (const spec of specs) {
    const projectName = `canonical-${spec.id}`;
    const projectDir = path.join(PROJECT_ROOT, projectName);
    await rm(projectDir, { recursive: true, force: true });

    const command = canonicalCommand(spec, projectName);
    console.log(`SCAFFBENCH ${spec.id}: ${command}`);
    const create = await runCommand(command, PROJECT_ROOT);
    const projectExists = create.exitCode === 0;
    const validation = await validateProject(spec, projectExists ? projectDir : null, options).pipe(
      Effect.provide(BunContext.layer),
      Effect.runPromise,
    );
    const scored = projectExists
      ? await scoreProject(spec, projectDir, options.promptStyle)
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
            detail: command,
          },
        ],
      },
      failureTags: [],
    };
    result.failureTags = deriveFailureTags(result);
    results.push(result);
  }

  await writeSummary(path.resolve(OUTPUT_DIR), results, options, specs, {
    cwd: process.cwd(),
    generatedBy: "record-scaffbench-canonical",
    environmentQualified: true,
  });
  await rm(PROJECT_ROOT, { recursive: true, force: true });
}

await main();
