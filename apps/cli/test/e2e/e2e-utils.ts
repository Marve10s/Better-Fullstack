import type { ExecaChildProcess } from "execa";

import { getLocalWebDevPort } from "@better-fullstack/types";
import { execa } from "execa";
import { readFile } from "node:fs/promises";
import { Socket } from "node:net";
import { basename, dirname, join } from "node:path";

import { scaffoldWithCli, type CliScaffoldResult } from "../../../../testing/lib/cli-scaffold";
import { runTRPCTest, type TestConfig } from "../test-utils";

type E2EPackageManager = "bun" | "npm" | "pnpm" | "yarn";

export interface ServerProcess {
  process: ExecaChildProcess;
  port: number;
  baseUrl: string;
  kill: () => Promise<void>;
}

export interface DevServerProcess {
  process: ExecaChildProcess;
  frontendUrl: string;
  backendUrl: string | null;
  kill: () => Promise<void>;
}

export interface E2EProjectResult {
  projectDir: string;
  success: boolean;
  error?: string;
}

export interface StartServerOptions {
  packageManager?: E2EPackageManager;
  port?: number;
  timeout?: number;
}

export interface StartDevServerOptions {
  frontend: string;
  backend: string;
  packageManager?: E2EPackageManager;
  timeout?: number;
}

export interface PageCheckResult {
  ok: boolean;
  status: number;
  html: string;
  errors: string[];
}

export interface AssetCheckResult {
  ok: boolean;
  checked: number;
  failed: Array<{ url: string; status: number; error?: string }>;
}

export interface FrameworkCheckResult {
  ok: boolean;
  markers: string[];
  missing: string[];
}

const HTML_ERROR_PATTERNS = [
  /Internal Server Error/i,
  /Application error/i,
  /Unhandled Runtime Error/i,
  /Cannot find module/i,
  /Module not found/i,
  /(?:Type|Reference|Syntax)Error:/,
  /ENOENT/,
  /Error when evaluating SSR module/i,
  /\[vite\] Internal Server Error/i,
  /ServerError/i,
  /Hydration failed/i,
  /hydration mismatch/i,
  /There was an error while hydrating/i,
];

const PROCESS_TERMINATION_GRACE_MS = 2_000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isMissingProcess(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ESRCH";
}

function signalProcessTree(child: ExecaChildProcess, signal: NodeJS.Signals): boolean {
  if (process.platform !== "win32" && child.pid) {
    try {
      process.kill(-child.pid, signal);
      return true;
    } catch (error) {
      if (isMissingProcess(error)) return false;
      throw error;
    }
  }

  return child.kill(signal);
}

function isProcessTreeAlive(child: ExecaChildProcess): boolean {
  if (process.platform !== "win32" && child.pid) {
    try {
      process.kill(-child.pid, 0);
      return true;
    } catch (error) {
      if (isMissingProcess(error)) return false;
      throw error;
    }
  }

  return child.exitCode === null;
}

async function waitForProcessTreeExit(child: ExecaChildProcess, deadline: number): Promise<void> {
  if (!isProcessTreeAlive(child) || Date.now() >= deadline) return;
  await delay(50);
  await waitForProcessTreeExit(child, deadline);
}

export async function terminateProcessTree(child: ExecaChildProcess): Promise<void> {
  signalProcessTree(child, "SIGTERM");
  await waitForProcessTreeExit(child, Date.now() + PROCESS_TERMINATION_GRACE_MS);

  if (isProcessTreeAlive(child)) {
    signalProcessTree(child, "SIGKILL");
  }

  await Promise.race([
    child.then(
      () => undefined,
      () => undefined,
    ),
    delay(1_000),
  ]);
}

function isPortOpen(port: number, host = "127.0.0.1"): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new Socket();
    let settled = false;
    const finish = (open: boolean) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(open);
    };

    socket.setTimeout(500);
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.once("timeout", () => finish(false));
    socket.connect(port, host);
  });
}

async function assertPortAvailable(port: number, label: string): Promise<void> {
  if (await isPortOpen(port)) {
    throw new Error(`${label} port ${port} is already in use before the E2E process starts`);
  }
}

async function openPorts(ports: readonly number[]): Promise<number[]> {
  const uniquePorts = [...new Set(ports)];
  const states = await Promise.all(uniquePorts.map((port) => isPortOpen(port)));
  return uniquePorts.filter((_, index) => states[index]);
}

async function waitForPortsReleased(ports: readonly number[], deadline: number): Promise<number[]> {
  const stillOpen = await openPorts(ports);
  if (stillOpen.length === 0 || Date.now() >= deadline) return stillOpen;
  await delay(50);
  return waitForPortsReleased(ports, deadline);
}

async function assertPortsReleased(ports: readonly number[]): Promise<void> {
  const stillOpen = await waitForPortsReleased(ports, Date.now() + PROCESS_TERMINATION_GRACE_MS);
  if (stillOpen.length > 0) {
    throw new Error("E2E process cleanup did not release port(s): " + stillOpen.join(", "));
  }
}

function managedProcessOptions() {
  return {
    detached: process.platform !== "win32",
    forceKillAfterDelay: PROCESS_TERMINATION_GRACE_MS,
  } as const;
}

export async function setupE2EProject(
  projectName: string,
  config: Partial<TestConfig>,
  smokeDir?: string,
): Promise<E2EProjectResult> {
  const result = await runTRPCTest({
    projectName,
    install: true,
    git: false,
    smokeDir,
    ...config,
  });

  return {
    projectDir: result.projectDir ?? "",
    success: result.success,
    error: result.error,
  };
}

export async function startServer(
  projectDir: string,
  options: StartServerOptions = {},
): Promise<ServerProcess> {
  const { packageManager = "bun", port = 3000, timeout = 60000 } = options;

  const serverDir = join(projectDir, "apps", "server");
  const baseUrl = `http://localhost:${port}`;
  await assertPortAvailable(port, "Backend");

  let command: string;
  let args: string[];

  switch (packageManager) {
    case "npm":
      command = "npm";
      args = ["run", "dev"];
      break;
    case "pnpm":
      command = "pnpm";
      args = ["dev"];
      break;
    case "yarn":
      command = "yarn";
      args = ["dev"];
      break;
    case "bun":
    default:
      command = "bun";
      args = ["run", "dev"];
      break;
  }

  let serverOutput = "";
  let serverError = "";

  const serverProcess = execa(command, args, {
    cwd: serverDir,
    stdio: "pipe",
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: "development",
    },
    reject: false,
    ...managedProcessOptions(),
  });

  const stdoutHandler = (data: Buffer) => {
    serverOutput += data.toString();
  };
  const stderrHandler = (data: Buffer) => {
    serverError += data.toString();
  };

  serverProcess.stdout?.on("data", stdoutHandler);
  serverProcess.stderr?.on("data", stderrHandler);

  const isReady = await waitForServer(baseUrl, timeout);

  if (!isReady) {
    serverProcess.stdout?.off("data", stdoutHandler);
    serverProcess.stderr?.off("data", stderrHandler);
    await terminateProcessTree(serverProcess);
    console.error(`[E2E] Server stdout:\n${serverOutput}`);
    console.error(`[E2E] Server stderr:\n${serverError}`);
    throw new Error(`Server failed to start within ${timeout}ms. Check server logs above.`);
  }

  return {
    process: serverProcess,
    port,
    baseUrl,
    kill: async () => {
      serverProcess.stdout?.off("data", stdoutHandler);
      serverProcess.stderr?.off("data", stderrHandler);
      await terminateProcessTree(serverProcess);
      await assertPortsReleased([port]);
    },
  };
}

/**
 * Start the full dev environment via turbo from the project root.
 * For "self" backends: turbo starts the fullstack framework. Wait for frontend port.
 * For standalone backends: turbo starts both frontend + backend. Wait for both ports.
 */
export async function startDevServer(
  projectDir: string,
  options: StartDevServerOptions,
): Promise<DevServerProcess> {
  const { frontend, backend, packageManager = "bun", timeout = 120_000 } = options;

  const frontendPort = getLocalWebDevPort([frontend]);
  const backendPort = 3000;
  const frontendUrl = `http://localhost:${frontendPort}`;
  const isFullstack = backend === "self";
  const backendUrl = isFullstack ? null : `http://localhost:${backendPort}`;
  await assertPortAvailable(frontendPort, "Frontend");
  if (backendUrl && backendPort !== frontendPort) {
    await assertPortAvailable(backendPort, "Backend");
  }

  let command: string;
  let args: string[];

  switch (packageManager) {
    case "npm":
      command = "npm";
      args = ["run", "dev"];
      break;
    case "pnpm":
      command = "pnpm";
      args = ["dev"];
      break;
    case "yarn":
      command = "yarn";
      args = ["dev"];
      break;
    default:
      command = "bun";
      args = ["run", "dev"];
      break;
  }

  let output = "";
  let errOutput = "";

  const devProcess = execa(command, args, {
    cwd: projectDir,
    stdio: "pipe",
    env: {
      ...process.env,
      NODE_ENV: "development",
      PORT: String(backendPort),
    },
    reject: false,
    ...managedProcessOptions(),
  });

  const stdoutHandler = (data: Buffer) => {
    output += data.toString();
  };
  const stderrHandler = (data: Buffer) => {
    errOutput += data.toString();
  };

  devProcess.stdout?.on("data", stdoutHandler);
  devProcess.stderr?.on("data", stderrHandler);

  const frontendReady = await waitForServer(frontendUrl, timeout);

  if (!frontendReady) {
    devProcess.stdout?.off("data", stdoutHandler);
    devProcess.stderr?.off("data", stderrHandler);
    await terminateProcessTree(devProcess);
    console.error(`[E2E] Dev stdout:\n${output}`);
    console.error(`[E2E] Dev stderr:\n${errOutput}`);
    throw new Error(
      `Frontend (${frontend}) failed to start on port ${frontendPort} within ${timeout}ms`,
    );
  }

  if (backendUrl) {
    const backendReady = await waitForServer(backendUrl, 30_000);
    if (!backendReady) {
      devProcess.stdout?.off("data", stdoutHandler);
      devProcess.stderr?.off("data", stderrHandler);
      await terminateProcessTree(devProcess);
      console.error(`[E2E] Dev stdout:\n${output}`);
      console.error(`[E2E] Dev stderr:\n${errOutput}`);
      throw new Error(`Backend (${backend}) failed to start on ${backendUrl}`);
    }
  }

  return {
    process: devProcess,
    frontendUrl,
    backendUrl,
    kill: async () => {
      devProcess.stdout?.off("data", stdoutHandler);
      devProcess.stderr?.off("data", stderrHandler);
      await terminateProcessTree(devProcess);
      await assertPortsReleased(backendUrl ? [frontendPort, backendPort] : [frontendPort]);
    },
  };
}

export async function waitForServer(url: string, timeout = 60000): Promise<boolean> {
  const start = Date.now();
  const pollInterval = 1000;

  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok || response.status < 500) {
        return true;
      }
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, pollInterval));
  }

  return false;
}

export async function checkHealth(baseUrl: string): Promise<boolean> {
  try {
    const response = await fetch(baseUrl, {
      signal: AbortSignal.timeout(10000),
    });
    const text = await response.text();
    return response.ok && text === "OK";
  } catch {
    return false;
  }
}

export async function checkFrontendPage(
  url: string,
  options?: { timeout?: number },
): Promise<PageCheckResult> {
  const timeout = options?.timeout ?? 15_000;
  const errors: string[] = [];

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    const html = await response.text();

    if (response.status >= 400) {
      errors.push(`HTTP ${response.status}`);
    }

    if (!html || html.trim().length === 0) {
      errors.push("Empty response body");
      return { ok: false, status: response.status, html: "", errors };
    }

    const lower = html.toLowerCase();
    if (!lower.includes("<html") && !lower.includes("<!doctype")) {
      errors.push("Response is not HTML");
    }

    for (const pattern of HTML_ERROR_PATTERNS) {
      if (pattern.test(html)) {
        errors.push(`Error pattern: ${pattern.source}`);
      }
    }

    return { ok: errors.length === 0, status: response.status, html, errors };
  } catch (err) {
    errors.push(`Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
    return { ok: false, status: 0, html: "", errors };
  }
}

export async function checkStaticAssets(
  baseUrl: string,
  html: string,
  options?: { timeout?: number },
): Promise<AssetCheckResult> {
  const timeout = options?.timeout ?? 10_000;
  const failed: AssetCheckResult["failed"] = [];

  const assetPatterns = [
    /href="([^"]+\.css[^"]*)"/g,
    /src="([^"]+\.(?:js|mjs|tsx?)[^"]*)"/g,
    /href="([^"]+\.(?:js|mjs)[^"]*)"/g,
  ];

  const urls = new Set<string>();
  for (const pattern of assetPatterns) {
    for (const match of html.matchAll(pattern)) {
      const href = match[1];
      if (href && !href.startsWith("data:") && !href.startsWith("mailto:")) {
        try {
          const resolved = new URL(href, baseUrl).toString();
          urls.add(resolved);
        } catch {
          // Invalid URL, skip
        }
      }
    }
  }

  for (const assetUrl of urls) {
    try {
      const res = await fetch(assetUrl, { signal: AbortSignal.timeout(timeout) });
      if (!res.ok) {
        failed.push({ url: assetUrl, status: res.status });
      }
    } catch (err) {
      failed.push({
        url: assetUrl,
        status: 0,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return { ok: failed.length === 0, checked: urls.size, failed };
}

export function validateFrameworkPage(html: string, frontend: string): FrameworkCheckResult {
  const markers: string[] = [];
  const missing: string[] = [];

  if (/<body[^>]*>\s*<\/body>/i.test(html)) {
    missing.push("Empty body — framework may have failed to render");
  }

  switch (frontend) {
    case "next":
      if (html.includes("_next") || html.includes("__next")) {
        markers.push("_next assets");
      } else {
        missing.push("Missing Next.js asset markers (_next)");
      }
      break;
    case "nuxt":
      if (html.includes("_nuxt") || html.includes("__nuxt")) {
        markers.push("_nuxt assets");
      } else {
        missing.push("Missing Nuxt asset markers (_nuxt)");
      }
      break;
    case "tanstack-router":
    case "react-router":
    case "react-vite":
    case "solid":
    case "solid-start":
      if (html.includes('type="module"')) {
        markers.push("Vite module scripts");
      } else {
        missing.push("Missing Vite module scripts");
      }
      break;
    case "svelte":
      if (html.includes('type="module"') || html.includes("data-sveltekit")) {
        markers.push("SvelteKit hydration markers");
      } else {
        missing.push("Missing SvelteKit hydration markers");
      }
      break;
    case "tanstack-start":
      if (html.includes("__root") || html.includes('type="module"') || html.includes("<script")) {
        markers.push("TanStack Start scripts");
      } else {
        missing.push("Missing TanStack Start markers");
      }
      break;
    case "astro":
      markers.push("Astro (no specific marker required)");
      break;
  }

  return {
    ok: missing.length === 0,
    markers,
    missing,
  };
}

export async function callTRPC(
  baseUrl: string,
  procedure: string,
  input?: unknown,
): Promise<{ status: number; body: unknown }> {
  const url = new URL(`/trpc/${procedure}`, baseUrl);
  const inputParam = input !== undefined ? JSON.stringify({ 0: input }) : JSON.stringify({ 0: {} });
  url.searchParams.set("batch", "1");
  url.searchParams.set("input", inputParam);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    return {
      status: 500,
      body: { error: error instanceof Error ? error.message : "Unknown error" },
    };
  }
}

export async function callORPC(
  baseUrl: string,
  procedure: string,
  input?: unknown,
): Promise<{ status: number; body: unknown }> {
  const url = new URL(`/rpc/${procedure}`, baseUrl);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: input !== undefined ? JSON.stringify(input) : undefined,
      signal: AbortSignal.timeout(10000),
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    return {
      status: 500,
      body: { error: error instanceof Error ? error.message : "Unknown error" },
    };
  }
}

export interface TypecheckResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * Run typecheck on a generated project to verify zero TypeScript errors.
 * Prefer the root workspace script because generated roots use package-manager
 * specific if-present semantics for members that do not define type checking.
 */
async function packageTypecheckScript(dir: string): Promise<"check-types" | "typecheck" | null> {
  try {
    const packageJson = JSON.parse(await readFile(join(dir, "package.json"), "utf8")) as {
      scripts?: Record<string, unknown>;
    };
    if (typeof packageJson.scripts?.["check-types"] === "string") return "check-types";
    if (typeof packageJson.scripts?.typecheck === "string") return "typecheck";
  } catch {
    return null;
  }
  return null;
}

export async function findTypecheckTargets(
  projectDir: string,
): Promise<Array<{ dir: string; script: "check-types" | "typecheck" }>> {
  const rootScript = await packageTypecheckScript(projectDir);
  if (rootScript) return [{ dir: projectDir, script: rootScript }];

  const directories = [join(projectDir, "apps", "web"), join(projectDir, "apps", "server")];
  const scripts = await Promise.all(directories.map((dir) => packageTypecheckScript(dir)));
  return directories.flatMap((dir, index) => {
    const script = scripts[index];
    return script ? [{ dir, script }] : [];
  });
}

export async function typecheckProject(
  projectDir: string,
  options?: { timeout?: number; requireTarget?: boolean },
): Promise<TypecheckResult> {
  const timeout = options?.timeout ?? 120_000;
  const targets = await findTypecheckTargets(projectDir);
  const results = await Promise.all(
    targets.map(async ({ dir, script }): Promise<TypecheckResult> => {
      const result = await execa("bun", ["run", script], {
        cwd: dir,
        timeout,
        reject: false,
        env: { ...process.env, NODE_ENV: "development" },
      });
      return {
        ok: result.exitCode === 0,
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode ?? 1,
      };
    }),
  );

  if (results.length === 0) {
    return options?.requireTarget
      ? { ok: false, stdout: "", stderr: "No typecheck script found", exitCode: 1 }
      : { ok: true, stdout: "No typecheck script found", stderr: "", exitCode: 0 };
  }

  const failed = results.filter((result) => !result.ok);
  return {
    ok: failed.length === 0,
    stdout: results.map((result) => result.stdout).join("\n"),
    stderr: results.map((result) => result.stderr).join("\n"),
    exitCode: failed.length > 0 ? (failed[0]?.exitCode ?? 1) : 0,
  };
}

/**
 * Scaffold a project using the actual CLI binary (node dist/cli.mjs).
 * Sets cwd to the parent directory and passes just the project name,
 * since the CLI requires a relative path within the current directory.
 */
export async function scaffoldWithCLIBinary(
  projectDir: string,
  flags: string[],
  options?: {
    timeout?: number;
    cliPath?: string;
    env?: NodeJS.ProcessEnv;
    expectedFiles?: string[];
  },
): Promise<CliScaffoldResult> {
  const timeout = options?.timeout ?? 120_000;
  const cliPath = options?.cliPath ?? join(import.meta.dir, "..", "..", "dist", "cli.mjs");
  const parentDir = dirname(projectDir);
  const projectName = basename(projectDir) || "test-project";

  return scaffoldWithCli({
    cliPath,
    cwd: parentDir,
    projectName,
    flags,
    timeoutMs: timeout,
    env: options?.env,
    expectedFiles: options?.expectedFiles,
  });
}
