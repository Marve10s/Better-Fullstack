import { spawn } from "node:child_process";
import type { CommandResult } from "../types";

export async function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
): Promise<CommandResult> {
  const started = Date.now();
  // stdin is closed (EOF), not an open pipe: `codex exec` reads stdin when it is
  // piped ("Reading additional input from stdin…") and would otherwise hang for
  // the full timeout waiting on input that never comes. Harmless for every other
  // spawned command (claude -p, cargo, bun, …) — none need interactive stdin.
  const child = spawn(command, args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let spawnError = false;
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill("SIGTERM");
    setTimeout(() => child.kill("SIGKILL"), 3_000).unref();
  }, timeoutMs);

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  const exitCode = await new Promise<number | null>((resolve) => {
    let settled = false;
    const finish = (code: number | null) => {
      if (settled) return;
      settled = true;
      resolve(code);
    };

    child.on("error", (error) => {
      spawnError = true;
      stderr += `${stderr ? "\n" : ""}${error.name}: ${error.message}`;
      finish(127);
    });
    child.on("close", (code) => finish(code));
  });
  clearTimeout(timer);

  return {
    command: [command, ...args].map(quoteArg).join(" "),
    exitCode,
    timedOut,
    spawnError,
    durationMs: Date.now() - started,
    stdout,
    stderr,
    stdoutTail: tail(stdout),
    stderrTail: tail(stderr),
  };
}

export function quoteArg(arg: string) {
  return /^[a-zA-Z0-9_./:=@-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

export function tail(value: string, max = 4_000) {
  return value.length <= max ? value : value.slice(-max);
}

