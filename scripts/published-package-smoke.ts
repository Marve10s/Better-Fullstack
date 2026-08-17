#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";

import { EVIDENCE_SCHEMA_VERSION } from "./verified-combinations/evidence";

type PackageManager = "bun" | "npm" | "pnpm";
type SmokeStatus = "pass" | "fail";

type PublishedPackageSmokeResult = {
  manager: PackageManager;
  status: SmokeStatus;
  command: string[];
  projectName: string;
  projectDir: string;
  durationMs: number;
  exitCode: number | null;
  expectedPaths: string[];
  missingPaths: string[];
  stdoutTail: string;
  stderrTail: string;
  failureMessage?: string;
};

type PublishedPackageSmokeSummary = {
  schemaVersion: typeof EVIDENCE_SCHEMA_VERSION;
  generatedAt: string;
  packageName: string;
  specifier: string;
  packageSpec: string;
  registry: string;
  rootDir: string;
  keptOutput: boolean;
  overallSuccess: boolean;
  managers: PackageManager[];
  results: PublishedPackageSmokeResult[];
};

const args = process.argv.slice(2);
const DEFAULT_OUTPUT_PATH = "testing/.published-package/summary.json";
const EXPECTED_PATHS = [
  "bts.jsonc",
  "package.json",
  "apps/web/package.json",
  "apps/server/package.json",
];

function readArg(name: string, fallback?: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function hasFlag(name: string): boolean {
  return args.includes(name);
}

function readListArg(name: string, fallback: PackageManager[]): PackageManager[] {
  const raw = readArg(name);
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean) as PackageManager[];
}

async function defaultSpecifier(): Promise<string> {
  if (process.env.BFS_PACKAGE_SPECIFIER) return process.env.BFS_PACKAGE_SPECIFIER;
  const cliPackagePath = join(import.meta.dir, "..", "apps", "cli", "package.json");
  const version = ((await Bun.file(cliPackagePath).json()) as { version?: string }).version;
  if (!version) {
    throw new Error(`Could not read the workspace CLI version from ${cliPackagePath}`);
  }
  return version;
}

const packageName = readArg("--package", "create-better-fullstack") ?? "create-better-fullstack";
const specifier = readArg("--specifier") ?? (await defaultSpecifier());
const managers = readListArg("--managers", ["bun", "npm", "pnpm"]);
const registry =
  readArg("--registry", "https://registry.npmjs.org") ?? "https://registry.npmjs.org";
const outputPath = readArg("--output", DEFAULT_OUTPUT_PATH) ?? DEFAULT_OUTPUT_PATH;
const skipWait = hasFlag("--skip-wait");
const keepOutput = hasFlag("--keep-output") || process.env.KEEP_PUBLISHED_SMOKE_OUTPUT === "1";
const packageSpec = packageSpecFor(packageName, specifier);

export function packageSpecFor(name: string, requestedSpecifier: string): string {
  if (requestedSpecifier.startsWith("file://")) {
    return requestedSpecifier;
  }
  if (requestedSpecifier.startsWith("file:")) {
    const filePath = requestedSpecifier.slice("file:".length);
    if (!filePath) return requestedSpecifier;
    return `file:${isAbsolute(filePath) ? filePath : resolve(filePath)}`;
  }
  if (isLocalSpecifier(requestedSpecifier)) {
    return isAbsolute(requestedSpecifier) ? requestedSpecifier : resolve(requestedSpecifier);
  }

  return `${name}@${requestedSpecifier}`;
}

function isLocalSpecifier(value: string): boolean {
  return (
    value.startsWith("file:") ||
    value.startsWith("/") ||
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.endsWith(".tgz")
  );
}

function tail(value: string, maxLength = 8000): string {
  return value.length > maxLength ? value.slice(-maxLength) : value;
}

async function runCommand(
  command: string[],
  options: { cwd?: string; env?: Record<string, string> } = {},
) {
  const proc = Bun.spawn(command, {
    cwd: options.cwd,
    env: {
      ...process.env,
      ...options.env,
      BTS_TELEMETRY: "0",
      NO_COLOR: "1",
    },
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);

  return { stdout, stderr, exitCode };
}

async function waitForPackage() {
  if (skipWait || isLocalSpecifier(specifier)) {
    return;
  }

  const attempts = Number(readArg("--wait-attempts", "12"));
  const delayMs = Number(readArg("--wait-ms", "10000"));

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    // oxlint-disable-next-line no-await-in-loop -- npm visibility polling must be sequential.
    const result = await runCommand([
      "npm",
      "view",
      packageSpec,
      "version",
      "--registry",
      registry,
    ]);
    if (result.exitCode === 0 && result.stdout.trim()) {
      console.log(`Found ${packageSpec} on npm as ${result.stdout.trim()}`);
      return;
    }

    if (attempt === attempts) {
      throw new Error(
        `Timed out waiting for ${packageSpec} on npm.\n${result.stderr || result.stdout}`,
      );
    }

    console.log(`Waiting for ${packageSpec} to be visible on npm (${attempt}/${attempts})...`);
    // oxlint-disable-next-line no-await-in-loop -- delay between polling attempts.
    await Bun.sleep(delayMs);
  }
}

function commandFor(manager: PackageManager, projectName: string): string[] {
  const createArgs = [
    projectName,
    "--ecosystem",
    "typescript",
    "--frontend",
    "react-vite",
    "--ui-library",
    "none",
    "--css-framework",
    "tailwind",
    "--backend",
    "hono",
    "--runtime",
    "bun",
    "--api",
    "trpc",
    "--database",
    "sqlite",
    "--orm",
    "drizzle",
    "--auth",
    "none",
    "--payments",
    "none",
    "--email",
    "none",
    "--file-upload",
    "none",
    "--effect",
    "none",
    "--state-management",
    "none",
    "--validation",
    "zod",
    "--forms",
    "react-hook-form",
    "--testing",
    "vitest",
    "--ai",
    "none",
    "--realtime",
    "none",
    "--job-queue",
    "none",
    "--animation",
    "none",
    "--logging",
    "none",
    "--observability",
    "none",
    "--feature-flags",
    "none",
    "--integrations",
    "none",
    "--ecommerce",
    "none",
    "--analytics",
    "none",
    "--cms",
    "none",
    "--caching",
    "none",
    "--rate-limit",
    "none",
    "--i18n",
    "none",
    "--search",
    "none",
    "--vector-db",
    "none",
    "--file-storage",
    "none",
    "--addons",
    "none",
    "--examples",
    "none",
    "--ai-docs",
    "none",
    "--db-setup",
    "none",
    "--web-deploy",
    "none",
    "--server-deploy",
    "none",
    "--package-manager",
    manager,
    "--no-install",
    "--no-git",
    "--disable-analytics",
  ];

  if (manager === "bun") return ["bunx", packageSpec, "create", ...createArgs];
  if (manager === "npm") return ["npx", "--yes", packageSpec, "create", ...createArgs];
  return ["pnpm", "dlx", packageSpec, "create", ...createArgs];
}

async function smoke(
  manager: PackageManager,
  rootDir: string,
): Promise<PublishedPackageSmokeResult> {
  const projectName = `published-smoke-${manager}`;
  const command = commandFor(manager, projectName);
  const startedAt = Date.now();
  console.log(`\nRunning ${manager} smoke: ${command.join(" ")}`);
  const result = await runCommand(command, { cwd: rootDir });
  const projectDir = join(rootDir, projectName);
  const missingPaths = EXPECTED_PATHS.filter((path) => !existsSync(join(projectDir, path)));
  const status = result.exitCode === 0 && missingPaths.length === 0 ? "pass" : "fail";
  const failureMessage =
    status === "pass"
      ? undefined
      : result.exitCode !== 0
        ? `${manager} smoke failed with exit ${result.exitCode}`
        : `${manager} smoke did not generate expected files: ${missingPaths.join(", ")}`;

  if (status === "pass") {
    console.log(`${manager} smoke passed`);
  } else {
    console.error(failureMessage);
  }

  return {
    manager,
    status,
    command,
    projectName,
    projectDir,
    durationMs: Date.now() - startedAt,
    exitCode: result.exitCode,
    expectedPaths: EXPECTED_PATHS,
    missingPaths,
    stdoutTail: tail(result.stdout),
    stderrTail: tail(result.stderr),
    failureMessage,
  };
}

function validateManagers(values: PackageManager[]): void {
  for (const manager of values) {
    if (!["bun", "npm", "pnpm"].includes(manager)) {
      throw new Error(`Unsupported package manager: ${manager}`);
    }
  }
}

async function writeSummary(summary: PublishedPackageSmokeSummary): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outputPath}`);
}

async function main(): Promise<void> {
  validateManagers(managers);
  await waitForPackage();

  const rootDir = await mkdtemp(join(tmpdir(), "bfs-published-smoke-"));
  const results: PublishedPackageSmokeResult[] = [];

  try {
    for (const manager of managers) {
      // oxlint-disable-next-line no-await-in-loop -- keep package-manager output isolated and ordered.
      results.push(await smoke(manager, rootDir));
    }
  } finally {
    const summary: PublishedPackageSmokeSummary = {
      schemaVersion: EVIDENCE_SCHEMA_VERSION,
      generatedAt: new Date().toISOString(),
      packageName,
      specifier,
      packageSpec,
      registry,
      rootDir,
      keptOutput: keepOutput,
      overallSuccess:
        results.every((result) => result.status === "pass") && results.length === managers.length,
      managers,
      results,
    };
    await writeSummary(summary);

    if (!keepOutput) {
      await rm(rootDir, { recursive: true, force: true });
    } else {
      console.log(`Keeping smoke output at ${rootDir}`);
    }

    if (!summary.overallSuccess) {
      process.exitCode = 1;
    } else {
      console.log(`Published package smoke passed for ${packageSpec}`);
    }
  }
}

if (import.meta.main) {
  await main();
}
