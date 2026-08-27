#!/usr/bin/env bun

import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { scaffoldWithCli } from "@testing/lib/cli-scaffold";
import {
  GENERATED_PROJECT_PROOF_CASES,
  type GeneratedProjectProofCase,
} from "@testing/lib/generated-project-proof-matrix";
import { getPresetCombos } from "@testing/lib/presets";
import { installExactReleaseCli } from "@scripts/release/exact-release-cli";
import {
  createUpgradeFixtureBundle,
  REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
  UPGRADE_FIXTURE_FILENAME,
  type FixtureProjectInput,
} from "@scripts/release/release-fixture";

function argument(name: string): string {
  const index = process.argv.indexOf(name);
  const value = index >= 0 ? process.argv[index + 1] : undefined;
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function flagsForCase(entry: GeneratedProjectProofCase): string[] {
  if (entry.flags) return [...entry.flags, "--disable-analytics"];
  const combo = entry.preset ? getPresetCombos(entry.preset)[0] : undefined;
  if (!combo) throw new Error(`Fixture case ${entry.id} has no command flags`);
  const tokens = combo.command.split(" ");
  const projectIndex = tokens.indexOf(combo.name);
  if (projectIndex < 0) throw new Error(`Fixture preset ${entry.preset} has no project name`);
  return [...tokens.slice(projectIndex + 1), "--disable-analytics"];
}

export async function captureReleaseFixture(options: {
  manifestPath: string;
  outputPath: string;
}): Promise<void> {
  const manifestPath = resolve(options.manifestPath);
  const root = await mkdtemp(join(tmpdir(), "bfs-release-fixture-"));
  const installRoot = join(root, "runner");
  const projectRoot = join(root, "projects");
  try {
    await Promise.all([mkdir(installRoot), mkdir(projectRoot)]);
    const { cliPath, manifest } = await installExactReleaseCli({ installRoot, manifestPath });
    const projects: FixtureProjectInput[] = [];
    for (const entry of GENERATED_PROJECT_PROOF_CASES) {
      const flags = flagsForCase(entry);
      // oxlint-disable-next-line no-await-in-loop -- exact CLI generation is isolated and ordered
      const result = await scaffoldWithCli({
        cliPath,
        cwd: projectRoot,
        env: { BTS_TELEMETRY: "0", CI: "true" },
        expectedFiles: ["bts.jsonc", "bts.lock.json"],
        flags,
        projectName: entry.projectName,
        timeoutMs: 180_000,
      });
      if (!result.ok) {
        throw new Error(
          `Could not capture ${entry.id} from exact package artifacts:\n${result.stderrTail || result.stdoutTail}`,
        );
      }
      projects.push({
        command: [
          `create-better-fullstack@${manifest.releaseVersion}`,
          entry.projectName,
          ...flags,
        ],
        ecosystem: entry.ecosystem,
        id: entry.id,
        projectDir: result.projectDir,
        projectName: entry.projectName,
        stackParts: [...entry.stackParts],
      });
    }
    if (
      JSON.stringify(projects.map((project) => project.id)) !==
      JSON.stringify(REQUIRED_UPGRADE_FIXTURE_CASE_IDS)
    ) {
      throw new Error("Release fixture cases drifted from the canonical eight-ecosystem matrix");
    }
    await createUpgradeFixtureBundle({ manifestPath, outputPath: options.outputPath, projects });
  } finally {
    await rm(root, { force: true, recursive: true });
  }
}

if (import.meta.main) {
  captureReleaseFixture({
    manifestPath: argument("--manifest"),
    outputPath: argument("--output"),
  }).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}

export { UPGRADE_FIXTURE_FILENAME };
