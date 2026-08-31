#!/usr/bin/env bun

import type { Ecosystem, ProjectConfig } from "@better-fullstack/types";

import { installExactReleaseCli } from "@scripts/release/exact-release-cli";
import {
  loadAndVerifyUpgradeFixtureBundle,
  materializeUpgradeFixtureBundle,
  REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
  type UpgradeFixtureBundle,
  type UpgradeFixtureCase,
} from "@scripts/release/release-fixture";
import {
  CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
  CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
} from "@scripts/release/upgrade-qualification-contract";
import { getVerifier } from "@testing/lib/verify";
import { readBtsConfig } from "create-better-fullstack/testing";
import { createHash } from "node:crypto";
import {
  appendFile,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  readlink,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve, sep } from "node:path";

export {
  CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
  CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
};

type UpdatePlanJson = {
  actionable?: string[];
  conflicts?: string[];
  error?: string;
  files?: Array<{ path?: string }>;
  lifecycle?: {
    provenance?: {
      source?: { cli?: string } | null;
      target?: { cli?: string } | null;
      verified?: boolean;
    };
  };
  manual?: Array<{ path?: string }>;
  ok?: boolean;
  recoveryId?: string;
  reviewToken?: string;
  success?: boolean;
  summary?: Record<string, number>;
  userEdited?: string[];
};

type CrossVersionCaseResult = {
  actionable: number;
  build: {
    passed: boolean;
    steps: Array<{
      step: string;
      stderr?: string;
      success: boolean;
      skipped: boolean;
    }>;
    verified: boolean;
  };
  categories: Record<string, number>;
  ecosystem: string;
  error?: string;
  id: string;
  recoveredExactly: boolean;
  result: "pass" | "fail";
  userEdit: {
    path: string;
    protectedAs: "conflict" | "dropped-from-plan" | "manual" | "user-edited";
  } | null;
};

export type CrossVersionUpgradeReport = {
  cases: CrossVersionCaseResult[];
  completedAt: string;
  evidenceType: typeof CROSS_VERSION_UPGRADE_EVIDENCE_TYPE;
  fixtureReceiptSha256: string;
  fixtureSha256: string;
  overallSuccess: boolean;
  recoveredCaseCount: number;
  requiredCaseIds: string[];
  schemaVersion: typeof CROSS_VERSION_UPGRADE_SCHEMA_VERSION;
  status: "passed";
  source: { sha: string; version: string };
  startedAt: string;
  target: { manifestSha256: string; sha: string; version: string };
};

type Snapshot = Record<
  string,
  { mode: number; sha256: string; symlink?: string }
>;

const USER_EDIT_MARKERS = new Map([
  [".css", "\n/* Better Fullstack cross-version user edit */\n"],
  [".cs", "\n// Better Fullstack cross-version user edit\n"],
  [".ex", "\n# Better Fullstack cross-version user edit\n"],
  [".exs", "\n# Better Fullstack cross-version user edit\n"],
  [".go", "\n// Better Fullstack cross-version user edit\n"],
  [".java", "\n// Better Fullstack cross-version user edit\n"],
  [".js", "\n// Better Fullstack cross-version user edit\n"],
  [".jsx", "\n// Better Fullstack cross-version user edit\n"],
  [".kt", "\n// Better Fullstack cross-version user edit\n"],
  [".md", "\n<!-- Better Fullstack cross-version user edit -->\n"],
  [".mdx", "\n<!-- Better Fullstack cross-version user edit -->\n"],
  [".py", "\n# Better Fullstack cross-version user edit\n"],
  [".rs", "\n// Better Fullstack cross-version user edit\n"],
  [".ts", "\n// Better Fullstack cross-version user edit\n"],
  [".tsx", "\n// Better Fullstack cross-version user edit\n"],
]);

function hash(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function semverParts(version: string): number[] {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) throw new Error(`Invalid release version ${version}`);
  return match.slice(1).map(Number);
}

function isEarlierVersion(source: string, target: string): boolean {
  const sourceParts = semverParts(source);
  const targetParts = semverParts(target);
  for (let index = 0; index < 3; index += 1) {
    if (sourceParts[index] !== targetParts[index]) {
      return (sourceParts[index] ?? 0) < (targetParts[index] ?? 0);
    }
  }
  return false;
}

function parseJson(stdout: string, label: string): UpdatePlanJson {
  try {
    return JSON.parse(stdout) as UpdatePlanJson;
  } catch {
    throw new Error(`${label} did not return one JSON document`);
  }
}

async function runCliJson(
  cliPath: string,
  args: string[],
  successField: "ok" | "success",
): Promise<UpdatePlanJson> {
  const subprocess = Bun.spawn(["node", cliPath, ...args], {
    env: {
      ...process.env,
      BTS_TELEMETRY: "0",
      BTS_TELEMETRY_DISABLED: "1",
      CI: "true",
      NO_COLOR: "1",
    },
    stderr: "pipe",
    stdout: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(subprocess.stdout).text(),
    new Response(subprocess.stderr).text(),
    subprocess.exited,
  ]);
  if (exitCode !== 0) {
    const parsed = stdout.trim()
      ? parseJson(stdout, "Failed CLI operation")
      : undefined;
    throw new Error(
      String(parsed?.error ?? (stderr.trim() || `CLI exited ${exitCode}`)),
    );
  }
  const parsed = parseJson(stdout, "CLI operation");
  if (parsed[successField] !== true) {
    throw new Error(
      String(parsed.error ?? (stderr.trim() || "CLI operation failed")),
    );
  }
  return parsed;
}

async function snapshot(root: string): Promise<Snapshot> {
  const entries: Snapshot = {};
  async function visit(directory: string): Promise<void> {
    for (const entry of (
      await readdir(directory, { withFileTypes: true })
    ).sort((left, right) => left.name.localeCompare(right.name))) {
      const absolute = join(directory, entry.name);
      const relativePath = relative(root, absolute).split(sep).join("/");
      if (
        relativePath === ".bts/recovery" ||
        relativePath.startsWith(".bts/recovery/")
      )
        continue;
      // oxlint-disable-next-line no-await-in-loop -- snapshot order binds one observed state
      const stats = await lstat(absolute);
      if (stats.isDirectory()) {
        // oxlint-disable-next-line no-await-in-loop
        await visit(absolute);
      } else if (stats.isSymbolicLink()) {
        // oxlint-disable-next-line no-await-in-loop
        const target = await readlink(absolute);
        entries[relativePath] = {
          mode: stats.mode & 0o7777,
          sha256: hash(Buffer.from(target)),
          symlink: target,
        };
      } else if (stats.isFile()) {
        // oxlint-disable-next-line no-await-in-loop
        entries[relativePath] = {
          mode: stats.mode & 0o7777,
          sha256: hash(await readFile(absolute)),
        };
      }
    }
  }
  await visit(root);
  return entries;
}

export async function injectManagedUserEdit(
  projectDir: string,
  managedPaths: readonly string[],
): Promise<{ bytes: Buffer; path: string } | null> {
  const projectRoot = resolve(projectDir);
  for (const relativePath of [...new Set(managedPaths)].sort()) {
    const marker = USER_EDIT_MARKERS.get(extname(relativePath));
    if (!marker) continue;
    const absolutePath = resolve(projectRoot, relativePath);
    if (!absolutePath.startsWith(`${projectRoot}${sep}`)) continue;
    let bytes: Buffer;
    try {
      // oxlint-disable-next-line no-await-in-loop -- candidates are checked in stable preference order
      const stats = await lstat(absolutePath);
      if (!stats.isFile()) continue;
      // oxlint-disable-next-line no-await-in-loop
      bytes = await readFile(absolutePath);
      new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      continue;
    }
    // oxlint-disable-next-line no-await-in-loop
    await appendFile(absolutePath, marker);
    // oxlint-disable-next-line no-await-in-loop
    return { bytes: await readFile(absolutePath), path: relativePath };
  }
  return null;
}

function managedPlanPaths(plan: UpdatePlanJson): string[] {
  return (plan.files ?? []).flatMap((file) =>
    typeof file.path === "string" ? [file.path] : [],
  );
}

export function protectedCategory(
  plan: UpdatePlanJson,
  path: string,
): "conflict" | "dropped-from-plan" | "manual" | "user-edited" {
  if (plan.userEdited?.includes(path)) return "user-edited";
  if (plan.conflicts?.includes(path)) return "conflict";
  if (plan.manual?.some((entry) => entry.path === path)) return "manual";
  const actionablePaths = (plan.actionable ?? []).flatMap((entry) =>
    typeof entry === "string"
      ? [entry]
      : typeof entry?.path === "string"
        ? [entry.path]
        : [],
  );
  if (
    !managedPlanPaths(plan).includes(path) &&
    !actionablePaths.includes(path)
  ) {
    // The re-plan no longer tracks the edited file and apply cannot write it,
    // so the edit is protected by omission. Seen with the 2.6.2 react-native
    // fixture README.md, which the current template set no longer produces.
    return "dropped-from-plan";
  }
  throw new Error(`Injected user edit was not protected from apply: ${path}`);
}

function assertPlanIdentity(
  plan: UpdatePlanJson,
  sourceVersion: string,
  targetVersion: string,
): void {
  const provenance = plan.lifecycle?.provenance;
  if (
    provenance?.verified !== true ||
    provenance.source?.cli !== sourceVersion ||
    provenance.target?.cli !== targetVersion ||
    !plan.reviewToken ||
    !Array.isArray(plan.actionable)
  ) {
    throw new Error(
      "Upgrade plan lacks verified source, target, token, or actionable identity",
    );
  }
}

function boundedError(error: unknown, roots: string[]): string {
  let message = error instanceof Error ? error.message : String(error);
  for (const root of roots) message = message.replaceAll(root, "<fixture>");
  return message.slice(0, 1_000);
}

function projectConfig(
  projectDir: string,
  projectName: string,
  config: NonNullable<Awaited<ReturnType<typeof readBtsConfig>>>,
): ProjectConfig {
  return {
    ...config,
    git: false,
    install: false,
    projectDir,
    projectName,
    relativePath: ".",
  } as ProjectConfig;
}

async function verifyBuild(
  fixture: UpgradeFixtureCase,
  projectDir: string,
  cliPath: string,
) {
  const config = await readBtsConfig(projectDir);
  if (!config) throw new Error("Updated fixture has no readable bts.jsonc");
  const verifier = getVerifier(fixture.ecosystem as Ecosystem);
  const result = await verifier(`cross-version-${fixture.id}`, projectDir, {
    config: projectConfig(projectDir, fixture.projectName, config),
    doctorCheck: true,
    doctorCliPath: cliPath,
    strict: true,
  });
  return {
    passed: result.overallSuccess,
    steps: result.steps.map((step) => ({
      skipped: step.skipped === true,
      step: step.step,
      stderr:
        typeof step.stderr === "string" ? step.stderr.slice(0, 400) : undefined,
      success: step.success,
    })),
    verified: true,
  };
}

function validateSourceReceipt(
  value: unknown,
  bundle: UpgradeFixtureBundle,
  fixtureSha256: string,
): void {
  const receipt = record(value);
  const requiredCi = record(receipt.requiredCi);
  const release = record(receipt.release);
  const upgradeFixture = record(receipt.upgradeFixture);
  if (
    receipt.receiptType !== "better-fullstack/release-verification" ||
    requiredCi.conclusion !== "success" ||
    requiredCi.headSha !== bundle.release.sourceSha ||
    release.version !== bundle.release.version ||
    upgradeFixture.fixtureType !==
      "better-fullstack/executable-upgrade-fixture" ||
    upgradeFixture.releaseVersion !== bundle.release.version ||
    upgradeFixture.sourceSha !== bundle.release.sourceSha ||
    upgradeFixture.sha256 !== fixtureSha256 ||
    JSON.stringify(upgradeFixture.caseIds) !==
      JSON.stringify(REQUIRED_UPGRADE_FIXTURE_CASE_IDS)
  ) {
    throw new Error(
      "Source fixture is not bound to its successful release receipt",
    );
  }
}

export async function runCrossVersionUpgradeQualification(options: {
  outputPath: string;
  sourceFixturePath: string;
  sourceReceiptPath: string;
  targetManifestPath: string;
  verifyBuilds?: boolean;
}): Promise<CrossVersionUpgradeReport> {
  const startedAt = new Date().toISOString();
  const [fixtureBytes, receiptBytes, targetManifestBytes] = await Promise.all([
    readFile(resolve(options.sourceFixturePath)),
    readFile(resolve(options.sourceReceiptPath)),
    readFile(resolve(options.targetManifestPath)),
  ]);
  const fixture = await loadAndVerifyUpgradeFixtureBundle(
    options.sourceFixturePath,
  );
  const fixtureSha256 = hash(fixtureBytes);
  validateSourceReceipt(
    JSON.parse(receiptBytes.toString()),
    fixture,
    fixtureSha256,
  );
  const root = await mkdtemp(join(tmpdir(), "bfs-cross-version-"));
  const installRoot = join(root, "target-cli");
  const projectRoot = join(root, "projects");
  const results: CrossVersionCaseResult[] = [];
  try {
    await Promise.all([mkdir(installRoot), mkdir(projectRoot)]);
    const { cliPath, manifest: targetManifest } = await installExactReleaseCli({
      installRoot,
      manifestPath: options.targetManifestPath,
    });
    if (
      !isEarlierVersion(fixture.release.version, targetManifest.releaseVersion)
    ) {
      throw new Error(
        `Source ${fixture.release.version} is not older than target ${targetManifest.releaseVersion}`,
      );
    }
    const projectDirectories = await materializeUpgradeFixtureBundle(
      fixture,
      projectRoot,
    );
    for (const [index, fixtureCase] of fixture.cases.entries()) {
      const projectDir = projectDirectories[index];
      if (!projectDir)
        throw new Error(`Materialized fixture ${fixtureCase.id} is missing`);
      try {
        // The first plan identifies files actually managed by this source-to-target update.
        // oxlint-disable-next-line no-await-in-loop -- each fixture receives an isolated lifecycle
        const initialPlan = await runCliJson(
          cliPath,
          ["update", projectDir, "--json"],
          "ok",
        );
        assertPlanIdentity(
          initialPlan,
          fixture.release.version,
          targetManifest.releaseVersion,
        );
        // oxlint-disable-next-line no-await-in-loop
        const userEdit = await injectManagedUserEdit(
          projectDir,
          managedPlanPaths(initialPlan),
        );
        // oxlint-disable-next-line no-await-in-loop
        const before = await snapshot(projectDir);
        // Re-plan only when the injected edit can change file categorization.
        // oxlint-disable-next-line no-await-in-loop
        let plan = initialPlan;
        if (userEdit) {
          // oxlint-disable-next-line no-await-in-loop
          plan = await runCliJson(
            cliPath,
            ["update", projectDir, "--json"],
            "ok",
          );
          assertPlanIdentity(
            plan,
            fixture.release.version,
            targetManifest.releaseVersion,
          );
        }
        const protectedAs = userEdit
          ? protectedCategory(plan, userEdit.path)
          : null;
        const actionable = plan.actionable ?? [];
        let recoveredExactly = false;
        if (actionable.length > 0) {
          // oxlint-disable-next-line no-await-in-loop
          const applied = await runCliJson(
            cliPath,
            [
              "update",
              projectDir,
              "--apply",
              "--review-token",
              plan.reviewToken ?? "",
              "--json",
            ],
            "ok",
          );
          if (!applied.recoveryId)
            throw new Error("Applied update returned no recovery point");
          if (userEdit) {
            // oxlint-disable-next-line no-await-in-loop
            const current = await readFile(join(projectDir, userEdit.path));
            if (!current.equals(userEdit.bytes)) {
              throw new Error(
                `Apply overwrote the injected user edit: ${userEdit.path}`,
              );
            }
          }
          // oxlint-disable-next-line no-await-in-loop
          await runCliJson(
            cliPath,
            [
              "recovery",
              "apply",
              applied.recoveryId,
              "--project-dir",
              projectDir,
              "--json",
            ],
            "success",
          );
          // oxlint-disable-next-line no-await-in-loop
          recoveredExactly =
            JSON.stringify(await snapshot(projectDir)) ===
            JSON.stringify(before);
          if (!recoveredExactly)
            throw new Error("Recovery did not restore exact pre-apply bytes");

          // Reapply from the restored source state so the target build tests upgraded bytes.
          // oxlint-disable-next-line no-await-in-loop
          const secondPlan = await runCliJson(
            cliPath,
            ["update", projectDir, "--json"],
            "ok",
          );
          assertPlanIdentity(
            secondPlan,
            fixture.release.version,
            targetManifest.releaseVersion,
          );
          // oxlint-disable-next-line no-await-in-loop
          await runCliJson(
            cliPath,
            [
              "update",
              projectDir,
              "--apply",
              "--review-token",
              secondPlan.reviewToken ?? "",
              "--json",
            ],
            "ok",
          );
        }
        // oxlint-disable-next-line no-await-in-loop -- toolchain verification is intentionally ordered
        const build =
          options.verifyBuilds === false
            ? { passed: true, steps: [], verified: false }
            : await verifyBuild(fixtureCase, projectDir, cliPath);
        if (!build.passed)
          throw new Error(
            "Updated project did not pass its ecosystem verifier",
          );
        results.push({
          actionable: actionable.length,
          build,
          categories: plan.summary ?? {},
          ecosystem: fixtureCase.ecosystem,
          id: fixtureCase.id,
          recoveredExactly,
          result: "pass",
          userEdit: userEdit
            ? { path: userEdit.path, protectedAs: protectedAs ?? "manual" }
            : null,
        });
      } catch (error) {
        results.push({
          actionable: 0,
          build: {
            passed: false,
            steps: [],
            verified: options.verifyBuilds !== false,
          },
          categories: {},
          ecosystem: fixtureCase.ecosystem,
          error: boundedError(error, [
            root,
            dirname(resolve(options.sourceFixturePath)),
          ]),
          id: fixtureCase.id,
          recoveredExactly: false,
          result: "fail",
          userEdit: null,
        });
      }
    }
    const recoveredCaseCount = results.filter(
      (result) => result.recoveredExactly,
    ).length;
    const overallSuccess =
      results.length === REQUIRED_UPGRADE_FIXTURE_CASE_IDS.length &&
      results.every((result) => result.result === "pass") &&
      recoveredCaseCount > 0;
    const report: CrossVersionUpgradeReport = {
      cases: results,
      completedAt: new Date().toISOString(),
      evidenceType: CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
      fixtureReceiptSha256: hash(receiptBytes),
      fixtureSha256,
      overallSuccess,
      recoveredCaseCount,
      requiredCaseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
      schemaVersion: CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
      status: "passed",
      source: {
        sha: fixture.release.sourceSha,
        version: fixture.release.version,
      },
      startedAt,
      target: {
        manifestSha256: hash(targetManifestBytes),
        sha: targetManifest.sourceSha,
        version: targetManifest.releaseVersion,
      },
    };
    await mkdir(dirname(resolve(options.outputPath)), { recursive: true });
    await writeFile(
      resolve(options.outputPath),
      `${JSON.stringify(report, null, 2)}\n`,
    );
    if (!overallSuccess) {
      throw new Error(
        "Cross-version qualification did not pass every case with recovery evidence",
      );
    }
    return report;
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

if (import.meta.main) {
  runCrossVersionUpgradeQualification({
    outputPath: argument("--output"),
    sourceFixturePath: argument("--source-fixture"),
    sourceReceiptPath: argument("--source-receipt"),
    targetManifestPath: argument("--target-manifest"),
    verifyBuilds: !process.argv.includes("--skip-builds"),
  }).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
