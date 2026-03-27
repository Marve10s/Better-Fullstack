import type { ProjectConfig } from "@better-fullstack/types";
import { getLocalWebDevPort } from "@better-fullstack/types";

import type { StepResult } from "./verify";

const DEV_STARTUP_TIMEOUT_MS = 60_000;
const TOTAL_DEV_CHECK_TIMEOUT_MS = 90_000;
const HTTP_REQUEST_TIMEOUT_MS = 10_000;
const POLL_INTERVAL_MS = 2_000;
const MAX_FETCH_RETRIES = 3;
const KILL_GRACE_MS = 3_000;

const URL_REGEX = /https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d+)/g;

// ── Exported Types ──────────────────────────────────────────────────────

export type DevServerHandle = {
  proc: ReturnType<typeof Bun.spawn>;
  serverUrl: string;
  config: ProjectConfig;
  stdoutBuf: () => string;
  stderrBuf: () => string;
  startTime: number;
};

// ── Helpers ─────────────────────────────────────────────────────────────

function extractUrlFromOutput(text: string, expectedPort?: number): string | null {
  const matches = [...text.matchAll(URL_REGEX)];
  if (matches.length === 0) return null;

  const normalize = (url: string) =>
    url.replace("0.0.0.0", "localhost").replace("127.0.0.1", "localhost");

  if (expectedPort) {
    const preferred = matches.find((m) => m[1] === String(expectedPort));
    if (preferred) return normalize(preferred[0]);
    return null;
  }

  return normalize(matches[0]![0]);
}

function getExpectedPort(config: ProjectConfig): number {
  return getLocalWebDevPort(config.frontend);
}

function getExpectedDevUrl(config: ProjectConfig): string {
  return `http://localhost:${getExpectedPort(config)}`;
}

const EXTERNAL_DB_TYPES = new Set([
  "postgres", "mysql", "mongodb", "edgedb", "redis",
  "planetscale", "neon", "turso", "xata", "supabase",
]);

export function isDbDependentProject(config: ProjectConfig): boolean {
  return EXTERNAL_DB_TYPES.has(config.database);
}

const DB_ERROR_PATTERNS = [
  /ECONNREFUSED.*(?:5432|3306|27017|6379)/,
  /password authentication failed/i,
  /Connection refused/i,
  /SequelizeConnectionRefusedError/i,
  /PrismaClientInitializationError/i,
  /Can't reach database server/i,
  /connect ECONNREFUSED/i,
  /MongoServerSelectionError/i,
  /FATAL:\s+database/i,
  /getaddrinfo.*ENOTFOUND/i,
];

export const HTML_ERROR_PATTERNS = [
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

export function validateHtmlResponse(
  body: string,
  status: number,
  config?: ProjectConfig,
): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (status >= 400) {
    errors.push(`HTTP status ${status}`);
  }

  if (!body || body.trim().length === 0) {
    errors.push("Empty response body");
    return { ok: false, errors };
  }

  const lowerBody = body.toLowerCase();
  if (!lowerBody.includes("<html") && !lowerBody.includes("<!doctype")) {
    errors.push("Response is not HTML");
  }

  for (const pattern of HTML_ERROR_PATTERNS) {
    if (pattern.test(body)) {
      errors.push(`Matches error pattern: ${pattern.source}`);
    }
  }

  // Empty body detection
  if (/<body[^>]*>\s*<\/body>/i.test(body)) {
    errors.push("Empty body element — framework may have failed to render");
  }

  // Framework-specific markers (advisory)
  if (config) {
    const frontend = config.frontend?.[0];
    if (frontend === "next" && !body.includes("_next")) {
      errors.push("Missing Next.js asset markers");
    }
    if (frontend === "nuxt" && !body.includes("_nuxt")) {
      errors.push("Missing Nuxt asset markers");
    }
    if (["tanstack-router", "react-router", "svelte", "react-vite"].includes(frontend || "") && !body.includes('type="module"')) {
      errors.push("Missing Vite module scripts");
    }
  }

  return { ok: errors.length === 0, errors };
}

function classifyDevCheckError(
  stderr: string,
  stdout: string,
  config: ProjectConfig,
): StepResult["classification"] {
  const combined = `${stderr}\n${stdout}`;

  if (isDbDependentProject(config)) {
    for (const pattern of DB_ERROR_PATTERNS) {
      if (pattern.test(combined)) return "environment";
    }
  }

  if (/(?:Type|Reference|Syntax)Error:/.test(combined)) return "template";
  if (/Cannot find module/i.test(combined)) return "template";
  if (/Module not found/i.test(combined)) return "template";
  if (/Could not resolve/i.test(combined)) return "template";

  return "unknown";
}

async function getDescendantPids(pid: number): Promise<number[]> {
  try {
    const proc = Bun.spawn(["pgrep", "-P", String(pid)], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const output = await new Response(proc.stdout).text();
    await proc.exited;

    const childPids = output
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(Number)
      .filter((n) => !Number.isNaN(n));

    const allDescendants: number[] = [];
    for (const childPid of childPids) {
      const grandchildren = await getDescendantPids(childPid);
      allDescendants.push(...grandchildren);
    }
    allDescendants.push(...childPids);

    return allDescendants;
  } catch {
    return [];
  }
}

async function killProcessTree(pid: number): Promise<void> {
  const descendants = await getDescendantPids(pid);
  const allPids = [...descendants, pid];

  for (const p of allPids) {
    try {
      process.kill(p, "SIGTERM");
    } catch {}
  }

  await new Promise((r) => setTimeout(r, KILL_GRACE_MS));

  for (const p of allPids) {
    try {
      process.kill(p, "SIGKILL");
    } catch {}
  }
}

// ── Server Lifecycle ────────────────────────────────────────────────────

/**
 * Start a dev server and wait for it to be reachable.
 * Returns a handle that can be passed to stopDevServer().
 * Throws with a StepResult-shaped error if the server fails to start.
 */
export async function startDevServer(
  projectDir: string,
  config: ProjectConfig,
): Promise<DevServerHandle> {
  const start = Date.now();

  const proc = Bun.spawn(["bun", "run", "dev"], {
    cwd: projectDir,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      NO_COLOR: "1",
      BROWSER: "none",
      FORCE_COLOR: "0",
    },
  });

  let _stdoutBuf = "";
  let _stderrBuf = "";
  const decoder = new TextDecoder();

  const readStream = (
    stream: ReadableStream<Uint8Array>,
    target: "stdout" | "stderr",
  ) => {
    const reader = stream.getReader();
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (target === "stdout") _stdoutBuf += chunk;
          else _stderrBuf += chunk;
        }
      } catch {}
    })();
  };

  readStream(proc.stdout as ReadableStream<Uint8Array>, "stdout");
  readStream(proc.stderr as ReadableStream<Uint8Array>, "stderr");

  let serverUrl: string | null = null;
  const urlDeadline = Date.now() + DEV_STARTUP_TIMEOUT_MS;

  while (Date.now() < urlDeadline && !serverUrl) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    if (proc.exitCode !== null) {
      throw Object.assign(
        new Error(`Dev server exited with code ${proc.exitCode}`),
        { stdoutBuf: _stdoutBuf, stderrBuf: _stderrBuf },
      );
    }

    const port = getExpectedPort(config);
    serverUrl =
      extractUrlFromOutput(_stdoutBuf, port) || extractUrlFromOutput(_stderrBuf, port);
  }

  if (!serverUrl) {
    const fallbackUrl = getExpectedDevUrl(config);
    try {
      const resp = await fetch(fallbackUrl, {
        signal: AbortSignal.timeout(HTTP_REQUEST_TIMEOUT_MS),
      });
      await resp.text();
      serverUrl = fallbackUrl;
    } catch {}
  }

  if (!serverUrl) {
    await killProcessTree(proc.pid);
    throw Object.assign(
      new Error(`Could not detect dev server URL within ${DEV_STARTUP_TIMEOUT_MS / 1000}s`),
      { stdoutBuf: _stdoutBuf, stderrBuf: _stderrBuf },
    );
  }

  // Let the server stabilize
  await new Promise((r) => setTimeout(r, 2000));

  return {
    proc,
    serverUrl,
    config,
    stdoutBuf: () => _stdoutBuf,
    stderrBuf: () => _stderrBuf,
    startTime: start,
  };
}

/**
 * Kill the dev server process tree gracefully.
 */
export async function stopDevServer(handle: DevServerHandle): Promise<void> {
  if (handle.proc?.pid) {
    await killProcessTree(handle.proc.pid);
  }
}

// ── Original runDevCheck (backward-compatible wrapper) ──────────────────

export async function runDevCheck(
  projectDir: string,
  config: ProjectConfig,
): Promise<StepResult> {
  const start = Date.now();
  const isDbDependent = isDbDependentProject(config);

  let handle: DevServerHandle | null = null;

  try {
    handle = await startDevServer(projectDir, config);

    let lastError = "";
    for (let attempt = 0; attempt < MAX_FETCH_RETRIES; attempt++) {
      if (Date.now() - start > TOTAL_DEV_CHECK_TIMEOUT_MS) {
        return {
          step: "dev-check",
          success: false,
          durationMs: Date.now() - start,
          stderr: `Total dev-check timeout exceeded (${TOTAL_DEV_CHECK_TIMEOUT_MS / 1000}s)\nLast error: ${lastError}`,
          classification: classifyDevCheckError(handle.stderrBuf(), handle.stdoutBuf(), config),
          advisory: isDbDependent,
        };
      }

      try {
        const resp = await fetch(handle.serverUrl, {
          signal: AbortSignal.timeout(HTTP_REQUEST_TIMEOUT_MS),
        });
        const body = await resp.text();
        const validation = validateHtmlResponse(body, resp.status, config);

        if (validation.ok) {
          return {
            step: "dev-check",
            success: true,
            durationMs: Date.now() - start,
            stdout: `${handle.serverUrl} → ${resp.status} (${body.length} bytes)`,
            advisory: isDbDependent,
          };
        }

        lastError = validation.errors.join("; ");

        if (resp.status < 500) {
          return {
            step: "dev-check",
            success: false,
            durationMs: Date.now() - start,
            stdout: `${handle.serverUrl} → ${resp.status} (${body.length} bytes)`,
            stderr: `Page loaded but has errors:\n${validation.errors.join("\n")}\n\nBody (first 2000 chars):\n${body.slice(0, 2000)}`,
            classification: classifyDevCheckError(
              handle.stderrBuf() + "\n" + body,
              handle.stdoutBuf(),
              config,
            ),
            advisory: isDbDependent,
          };
        }
      } catch (error) {
        lastError =
          error instanceof Error ? error.message : String(error);
      }

      if (attempt < MAX_FETCH_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }
    }

    return {
      step: "dev-check",
      success: false,
      durationMs: Date.now() - start,
      stdout: handle.stdoutBuf().slice(-2000),
      stderr: `Failed to get valid response from ${handle.serverUrl} after ${MAX_FETCH_RETRIES} attempts\nLast error: ${lastError}\nServer stderr:\n${handle.stderrBuf().slice(-1000)}`,
      classification: classifyDevCheckError(handle.stderrBuf(), handle.stdoutBuf(), config),
      advisory: isDbDependent,
    };
  } catch (error) {
    const err = error as Error & { stdoutBuf?: string; stderrBuf?: string };
    return {
      step: "dev-check",
      success: false,
      durationMs: Date.now() - start,
      stdout: err.stdoutBuf?.slice(-2000),
      stderr: `${err.message}\n${err.stderrBuf?.slice(-2000) ?? ""}`,
      classification: classifyDevCheckError(err.stderrBuf ?? "", err.stdoutBuf ?? "", config),
      advisory: isDbDependent,
    };
  } finally {
    if (handle) {
      await stopDevServer(handle);
    }
  }
}
