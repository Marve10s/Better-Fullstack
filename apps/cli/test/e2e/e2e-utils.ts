import type { ExecaChildProcess } from "execa";

import { execa } from "execa";
import { join } from "node:path";

import { runTRPCTest, type TestConfig } from "../test-utils";

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
  packageManager?: "bun" | "npm" | "pnpm";
  port?: number;
  timeout?: number;
}

export interface StartDevServerOptions {
  frontend: string;
  backend: string;
  packageManager?: "bun" | "npm" | "pnpm";
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

const VITE_WEB_FRONTENDS = new Set(["react-router", "react-vite", "svelte", "fresh"]);

function getWebDevPort(frontend: string): number {
  return VITE_WEB_FRONTENDS.has(frontend) ? 5173 : 3001;
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
    serverProcess.kill("SIGTERM");
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
      serverProcess.kill("SIGTERM");
      await new Promise((r) => setTimeout(r, 1000));
      if (!serverProcess.killed) {
        serverProcess.kill("SIGKILL");
      }
      await new Promise((r) => setTimeout(r, 100));
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

  const frontendPort = getWebDevPort(frontend);
  const backendPort = 3000;
  const frontendUrl = `http://localhost:${frontendPort}`;
  const isFullstack = backend === "self";
  const backendUrl = isFullstack ? null : `http://localhost:${backendPort}`;

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
    devProcess.kill("SIGTERM");
    console.error(`[E2E] Dev stdout:\n${output}`);
    console.error(`[E2E] Dev stderr:\n${errOutput}`);
    throw new Error(
      `Frontend (${frontend}) failed to start on port ${frontendPort} within ${timeout}ms`,
    );
  }

  if (backendUrl) {
    const backendReady = await waitForServer(backendUrl, 30_000);
    if (!backendReady) {
      console.warn(`[E2E] Backend not ready on ${backendUrl} — may be expected for some configs`);
    }
  }

  return {
    process: devProcess,
    frontendUrl,
    backendUrl,
    kill: async () => {
      devProcess.stdout?.off("data", stdoutHandler);
      devProcess.stderr?.off("data", stderrHandler);
      devProcess.kill("SIGTERM");
      await new Promise((r) => setTimeout(r, 2000));
      if (!devProcess.killed) {
        devProcess.kill("SIGKILL");
      }
      await new Promise((r) => setTimeout(r, 500));
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
    case "svelte":
    case "solid":
    case "solid-start":
      if (html.includes('type="module"')) {
        markers.push("Vite module scripts");
      } else {
        missing.push("Missing Vite module scripts");
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
  const inputParam =
    input !== undefined ? JSON.stringify({ 0: input }) : JSON.stringify({ 0: {} });
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
