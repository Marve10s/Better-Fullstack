#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

type PackageManager = "bun" | "npm" | "pnpm";

const args = process.argv.slice(2);

function readArg(name: string, fallback?: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function readListArg(name: string, fallback: PackageManager[]): PackageManager[] {
  const raw = readArg(name);
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean) as PackageManager[];
}

const packageName = readArg("--package", "create-better-fullstack") ?? "create-better-fullstack";
const specifier = readArg("--specifier", process.env.BFS_PACKAGE_SPECIFIER ?? "latest") ?? "latest";
const managers = readListArg("--managers", ["bun", "npm", "pnpm"]);
const registry = readArg("--registry", "https://registry.npmjs.org") ?? "https://registry.npmjs.org";

const packageSpec = `${packageName}@${specifier}`;

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

async function smoke(manager: PackageManager, rootDir: string) {
  const projectName = `published-smoke-${manager}`;
  const command = commandFor(manager, projectName);
  console.log(`\nRunning ${manager} smoke: ${command.join(" ")}`);
  const result = await runCommand(command, { cwd: rootDir });

  if (result.exitCode !== 0) {
    throw new Error(
      `${manager} smoke failed with exit ${result.exitCode}\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`,
    );
  }

  const projectDir = join(rootDir, projectName);
  const requiredPaths = ["bts.jsonc", "package.json", "apps/web/package.json", "apps/server/package.json"];
  const missing = requiredPaths.filter((path) => !existsSync(join(projectDir, path)));
  if (missing.length > 0) {
    throw new Error(
      `${manager} smoke did not generate expected files: ${missing.join(", ")}\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`,
    );
  }

  console.log(`${manager} smoke passed`);
}

await waitForPackage();

const rootDir = await mkdtemp(join(tmpdir(), "bfs-published-smoke-"));
try {
  for (const manager of managers) {
    if (!["bun", "npm", "pnpm"].includes(manager)) {
      throw new Error(`Unsupported package manager: ${manager}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- keep package-manager output isolated and ordered.
    await smoke(manager, rootDir);
  }
} finally {
  if (process.env.KEEP_PUBLISHED_SMOKE_OUTPUT !== "1") {
    await rm(rootDir, { recursive: true, force: true });
  } else {
    console.log(`Keeping smoke output at ${rootDir}`);
  }
}

console.log(`Published package smoke passed for ${packageSpec}`);
