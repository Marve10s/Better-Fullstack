import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const OUTPUT_TAIL_LENGTH = 4_000;
const SNAPSHOT_ENTRY_LIMIT = 80;
const SNAPSHOT_DEPTH_LIMIT = 2;
const SNAPSHOT_SKIPPED_DIRS = new Set([
  ".git",
  ".next",
  ".turbo",
  ".venv",
  "dist",
  "node_modules",
  "target",
]);

export type CliScaffoldOptions = {
  cliPath: string;
  cwd: string;
  projectName: string;
  flags: string[];
  timeoutMs?: number;
  env?: NodeJS.ProcessEnv;
  expectedFiles?: string[];
};

export type CliScaffoldResult = {
  ok: boolean;
  exitCode: number;
  signal?: string;
  timedOut: boolean;
  durationMs: number;
  cwd: string;
  cliPath: string;
  command: string[];
  projectDir: string;
  stdout: string;
  stderr: string;
  stdoutTail: string;
  stderrTail: string;
  directorySnapshot: string[];
  missingExpectedFiles?: string[];
};

function tailOutput(output: string): string {
  if (output.length <= OUTPUT_TAIL_LENGTH) {
    return output;
  }

  return output.slice(-OUTPUT_TAIL_LENGTH);
}

async function collectDirectorySnapshot(rootDir: string, cwd: string): Promise<string[]> {
  const entries: string[] = [];

  async function walk(currentDir: string, baseDir: string, depth: number) {
    if (entries.length >= SNAPSHOT_ENTRY_LIMIT) {
      return;
    }

    let dirEntries: Awaited<ReturnType<typeof readdir>>;
    try {
      dirEntries = await readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      entries.push(`<snapshot error: ${message}>`);
      return;
    }

    dirEntries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of dirEntries) {
      if (entries.length >= SNAPSHOT_ENTRY_LIMIT) {
        return;
      }

      const entryPath = join(currentDir, entry.name);
      const relPath = relative(baseDir, entryPath) || entry.name;
      const label = entry.isDirectory() ? `${relPath}/` : relPath;
      entries.push(label);

      if (
        entry.isDirectory()
        && depth < SNAPSHOT_DEPTH_LIMIT
        && !SNAPSHOT_SKIPPED_DIRS.has(entry.name)
      ) {
        await walk(entryPath, baseDir, depth + 1);
      }
    }
  }

  if (!existsSync(rootDir)) {
    entries.push(`<project directory missing: ${rootDir}>`);

    if (existsSync(cwd)) {
      const cwdEntries = await readdir(cwd, { withFileTypes: true }).catch(() => []);
      cwdEntries
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, Math.max(0, SNAPSHOT_ENTRY_LIMIT - entries.length))
        .forEach((entry) => {
          entries.push(`cwd:${entry.name}${entry.isDirectory() ? "/" : ""}`);
        });
    }

    return entries;
  }

  await walk(rootDir, rootDir, 0);
  return entries.length > 0 ? entries : ["<empty directory>"];
}

function getMissingExpectedFiles(projectDir: string, expectedFiles?: string[]): string[] | undefined {
  if (!expectedFiles || expectedFiles.length === 0) {
    return undefined;
  }

  const missing = expectedFiles.filter((file) => !existsSync(join(projectDir, file)));
  return missing.length > 0 ? missing : undefined;
}

export async function scaffoldWithCli(options: CliScaffoldOptions): Promise<CliScaffoldResult> {
  const timeoutMs = options.timeoutMs ?? 120_000;
  const command = ["node", options.cliPath, options.projectName, ...options.flags];
  const projectDir = join(options.cwd, options.projectName);
  const startedAt = Date.now();

  let stdout = "";
  let stderr = "";
  let timedOut = false;

  const child = spawn(command[0], command.slice(1), {
    cwd: options.cwd,
    env: {
      ...process.env,
      NODE_ENV: "development",
      NO_COLOR: "1",
      ...options.env,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout?.on("data", (chunk: Buffer | string) => {
    stdout += chunk.toString();
  });
  child.stderr?.on("data", (chunk: Buffer | string) => {
    stderr += chunk.toString();
  });

  let closeResolver: ((value: { exitCode: number | null; signal: NodeJS.Signals | null }) => void) | undefined;
  let closeRejecter: ((reason?: unknown) => void) | undefined;
  const closePromise = new Promise<{ exitCode: number | null; signal: NodeJS.Signals | null }>((resolve, reject) => {
    closeResolver = resolve;
    closeRejecter = reject;
  });

  child.on("error", (error) => {
    closeRejecter?.(error);
  });
  child.on("close", (exitCode, signal) => {
    closeResolver?.({ exitCode, signal });
  });

  let forceKillTimer: NodeJS.Timeout | undefined;
  const timeoutTimer = setTimeout(() => {
    timedOut = true;
    try {
      child.kill("SIGTERM");
    } catch {}

    forceKillTimer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {}
    }, 5_000);
  }, timeoutMs);

  let exitCode = -1;
  let signal: string | undefined;

  try {
    const closed = await closePromise;
    exitCode = closed.exitCode ?? -1;
    signal = closed.signal ?? undefined;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    stderr = stderr.length > 0 ? `${stderr}\n${message}` : message;
  } finally {
    clearTimeout(timeoutTimer);
    if (forceKillTimer) {
      clearTimeout(forceKillTimer);
    }
  }

  const missingExpectedFiles = getMissingExpectedFiles(projectDir, options.expectedFiles);

  return {
    ok: exitCode === 0 && !timedOut && !missingExpectedFiles,
    exitCode,
    signal,
    timedOut,
    durationMs: Date.now() - startedAt,
    cwd: options.cwd,
    cliPath: options.cliPath,
    command,
    projectDir,
    stdout,
    stderr,
    stdoutTail: tailOutput(stdout),
    stderrTail: tailOutput(stderr),
    directorySnapshot: await collectDirectorySnapshot(projectDir, options.cwd),
    missingExpectedFiles,
  };
}

export function formatCliScaffoldFailure(
  result: CliScaffoldResult,
  options?: { header?: string; expectedFiles?: string[] },
): string {
  const missingExpectedFiles = result.missingExpectedFiles
    ?? getMissingExpectedFiles(result.projectDir, options?.expectedFiles);

  const lines = [
    options?.header ?? "CLI scaffold failed",
    `timedOut: ${result.timedOut}`,
    `exitCode: ${result.exitCode}`,
    `signal: ${result.signal ?? "none"}`,
    `durationMs: ${result.durationMs}`,
    `cwd: ${result.cwd}`,
    `cliPath: ${result.cliPath}`,
    `command: ${result.command.join(" ")}`,
  ];

  if (missingExpectedFiles && missingExpectedFiles.length > 0) {
    lines.push(`missingExpectedFiles: ${missingExpectedFiles.join(", ")}`);
  }

  lines.push("");
  lines.push("stdout tail:");
  lines.push(result.stdoutTail.trim().length > 0 ? result.stdoutTail.trim() : "<empty>");
  lines.push("");
  lines.push("stderr tail:");
  lines.push(result.stderrTail.trim().length > 0 ? result.stderrTail.trim() : "<empty>");
  lines.push("");
  lines.push("directory snapshot:");
  lines.push(
    result.directorySnapshot.length > 0
      ? result.directorySnapshot.map((entry) => `- ${entry}`).join("\n")
      : "<empty>",
  );

  return lines.join("\n");
}
