#!/usr/bin/env bun

import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

import { runCrossVersionUpgradeQualification } from "@scripts/release/cross-version-upgrade";
import { UPGRADE_FIXTURE_FILENAME } from "@scripts/release/release-fixture";
import {
  loadAndVerifyManifest,
  type CommandRunner,
} from "@scripts/release/release-state";
import {
  CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
  CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
} from "@scripts/release/upgrade-qualification-contract";

export const UPGRADE_QUALIFICATION_FILENAME =
  "cross-version-qualification.v1.json";
const VERIFICATION_RECEIPT_FILENAME = "verification-receipt.v1.json";

type GitHubReleaseAsset = { name?: string; url?: string };
type GitHubRelease = { assets?: GitHubReleaseAsset[]; tag_name?: string };

const defaultRunner: CommandRunner = async (command) => {
  const subprocess = Bun.spawn(command, { stderr: "pipe", stdout: "pipe" });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(subprocess.stdout).text(),
    new Response(subprocess.stderr).text(),
    subprocess.exited,
  ]);
  return { exitCode, stderr, stdout };
};

async function requireCommand(
  command: string[],
  runner: CommandRunner,
): Promise<string> {
  const result = await runner(command);
  if (result.exitCode !== 0) {
    throw new Error(
      `Command failed (${command.join(" ")}):\n${result.stderr || result.stdout}`,
    );
  }
  return result.stdout;
}

function asset(
  release: GitHubRelease,
  name: string,
): GitHubReleaseAsset | undefined {
  return release.assets?.find((candidate) => candidate.name === name);
}

export async function qualifyPreviousRelease(options: {
  outputPath: string;
  repository: string;
  runner?: CommandRunner;
  targetManifestPath: string;
}): Promise<unknown> {
  const runner = options.runner ?? defaultRunner;
  const targetManifest = await loadAndVerifyManifest(
    resolve(options.targetManifestPath),
  );
  const releaseOutput = await requireCommand(
    ["gh", "api", `repos/${options.repository}/releases/latest`],
    runner,
  );
  const release = JSON.parse(releaseOutput) as GitHubRelease;
  const fixtureAsset = asset(release, UPGRADE_FIXTURE_FILENAME);
  const receiptAsset = asset(release, VERIFICATION_RECEIPT_FILENAME);
  const outputPath = resolve(options.outputPath);
  await mkdir(dirname(outputPath), { recursive: true });
  if (!fixtureAsset && !receiptAsset) {
    const report = {
      createdAt: new Date().toISOString(),
      evidenceType: CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
      overallSuccess: false,
      previousReleaseTag: release.tag_name ?? null,
      reasonCode: "prior-release-has-no-executable-fixture",
      schemaVersion: CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
      status: "awaiting-prior-fixture",
      target: {
        sha: targetManifest.sourceSha,
        version: targetManifest.releaseVersion,
      },
    } as const;
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    return report;
  }
  if (!fixtureAsset?.url || !receiptAsset?.url) {
    throw new Error(
      "Previous release has a partial executable-fixture evidence set",
    );
  }

  const root = await mkdtemp(join(tmpdir(), "bfs-previous-release-"));
  try {
    const fixturePath = join(root, UPGRADE_FIXTURE_FILENAME);
    const receiptPath = join(root, VERIFICATION_RECEIPT_FILENAME);
    const [fixture, receipt] = await Promise.all([
      requireCommand(
        [
          "gh",
          "api",
          "-H",
          "Accept: application/octet-stream",
          fixtureAsset.url,
        ],
        runner,
      ),
      requireCommand(
        [
          "gh",
          "api",
          "-H",
          "Accept: application/octet-stream",
          receiptAsset.url,
        ],
        runner,
      ),
    ]);
    await Promise.all([
      writeFile(fixturePath, fixture),
      writeFile(receiptPath, receipt),
    ]);
    return await runCrossVersionUpgradeQualification({
      outputPath,
      sourceFixturePath: fixturePath,
      sourceReceiptPath: receiptPath,
      targetManifestPath: options.targetManifestPath,
      verifyBuilds: true,
    });
  } finally {
    await rm(root, { force: true, recursive: true });
  }
}

function argument(name: string): string {
  const index = process.argv.indexOf(name);
  const value = index >= 0 ? process.argv[index + 1] : undefined;
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function printCaseSummaries(outputPath: string): Promise<void> {
  try {
    const report = JSON.parse(await readFile(outputPath, "utf8")) as {
      cases?: Array<{
        build?: {
          steps?: Array<{ step: string; stderr?: string; success: boolean }>;
        };
        error?: string;
        id: string;
        result: string;
        userEdit?: { path: string; protectedAs: string } | null;
      }>;
    };
    for (const item of report.cases ?? []) {
      console.error(
        `case ${item.id}: ${item.result}` +
          (item.error ? ` error=${item.error}` : "") +
          (item.userEdit
            ? ` userEdit=${item.userEdit.path}:${item.userEdit.protectedAs}`
            : ""),
      );
      for (const step of item.build?.steps ?? []) {
        if (!step.success)
          console.error(`  step ${step.step} failed: ${step.stderr ?? ""}`);
      }
    }
  } catch {
    console.error("No case report was written before the failure.");
  }
}

if (import.meta.main) {
  const outputPath = argument("--output");
  qualifyPreviousRelease({
    outputPath,
    repository: argument("--repository"),
    targetManifestPath: argument("--target-manifest"),
  }).catch(async (error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    await printCaseSummaries(outputPath);
    process.exit(1);
  });
}
