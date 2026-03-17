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

function isDbDependentProject(config: ProjectConfig): boolean {
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

function validateHtmlResponse(
  body: string,
  status: number,
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

export async function runDevCheck(
  projectDir: string,
  config: ProjectConfig,
): Promise<StepResult> {
  const start = Date.now();
  const isDbDependent = isDbDependentProject(config);
  let proc: ReturnType<typeof Bun.spawn> | null = null;

  try {
    proc = Bun.spawn(["bun", "run", "dev"], {
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

    const pid = proc.pid;

    let stdoutBuf = "";
    let stderrBuf = "";
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
            if (target === "stdout") stdoutBuf += chunk;
            else stderrBuf += chunk;
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
        return {
          step: "dev-check",
          success: false,
          durationMs: Date.now() - start,
          stdout: stdoutBuf.slice(-2000),
          stderr: `Dev server exited with code ${proc.exitCode}\n${stderrBuf.slice(-2000)}`,
          classification: classifyDevCheckError(stderrBuf, stdoutBuf, config),
          advisory: isDbDependent,
        };
      }

      const port = getExpectedPort(config);
      serverUrl =
        extractUrlFromOutput(stdoutBuf, port) || extractUrlFromOutput(stderrBuf, port);
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
      return {
        step: "dev-check",
        success: false,
        durationMs: Date.now() - start,
        stdout: stdoutBuf.slice(-2000),
        stderr: `Could not detect dev server URL within ${DEV_STARTUP_TIMEOUT_MS / 1000}s\n${stderrBuf.slice(-2000)}`,
        classification: classifyDevCheckError(stderrBuf, stdoutBuf, config),
        advisory: isDbDependent,
      };
    }

    await new Promise((r) => setTimeout(r, 2000));

    let lastError = "";
    for (let attempt = 0; attempt < MAX_FETCH_RETRIES; attempt++) {
      if (Date.now() - start > TOTAL_DEV_CHECK_TIMEOUT_MS) {
        return {
          step: "dev-check",
          success: false,
          durationMs: Date.now() - start,
          stderr: `Total dev-check timeout exceeded (${TOTAL_DEV_CHECK_TIMEOUT_MS / 1000}s)\nLast error: ${lastError}`,
          classification: classifyDevCheckError(stderrBuf, stdoutBuf, config),
          advisory: isDbDependent,
        };
      }

      try {
        const resp = await fetch(serverUrl, {
          signal: AbortSignal.timeout(HTTP_REQUEST_TIMEOUT_MS),
        });
        const body = await resp.text();
        const validation = validateHtmlResponse(body, resp.status);

        if (validation.ok) {
          return {
            step: "dev-check",
            success: true,
            durationMs: Date.now() - start,
            stdout: `${serverUrl} → ${resp.status} (${body.length} bytes)`,
            advisory: isDbDependent,
          };
        }

        lastError = validation.errors.join("; ");

        if (resp.status < 500) {
          return {
            step: "dev-check",
            success: false,
            durationMs: Date.now() - start,
            stdout: `${serverUrl} → ${resp.status} (${body.length} bytes)`,
            stderr: `Page loaded but has errors:\n${validation.errors.join("\n")}\n\nBody (first 2000 chars):\n${body.slice(0, 2000)}`,
            classification: classifyDevCheckError(
              stderrBuf + "\n" + body,
              stdoutBuf,
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
      stdout: stdoutBuf.slice(-2000),
      stderr: `Failed to get valid response from ${serverUrl} after ${MAX_FETCH_RETRIES} attempts\nLast error: ${lastError}\nServer stderr:\n${stderrBuf.slice(-1000)}`,
      classification: classifyDevCheckError(stderrBuf, stdoutBuf, config),
      advisory: isDbDependent,
    };
  } catch (error) {
    return {
      step: "dev-check",
      success: false,
      durationMs: Date.now() - start,
      stderr: error instanceof Error ? error.message : String(error),
      classification: "unknown",
      advisory: isDbDependentProject(config),
    };
  } finally {
    if (proc?.pid) {
      await killProcessTree(proc.pid);
    }
  }
}
