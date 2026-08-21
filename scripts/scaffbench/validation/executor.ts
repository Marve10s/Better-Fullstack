import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

import type { CommandResult } from "@/types";

import { quoteArg, tail } from "@/agents/command";
import {
  VALIDATION_ENV_SCRUB_PATTERN,
  VALIDATION_OUTPUT_LIMIT_BYTES,
  VALIDATION_RESOURCE_ENV,
} from "@/constants";

// The ambient bun-types ChildProcess omits its EventEmitter surface; this is the
// narrow shape the executor actually uses.
type SpawnedProcess = {
  pid?: number;
  stdout: { on(event: "data", listener: (chunk: Buffer) => void): void } | null;
  stderr: { on(event: "data", listener: (chunk: Buffer) => void): void } | null;
  on(event: "error", listener: (cause: Error & { code?: string }) => void): void;
  on(event: "close", listener: (code: number | null) => void): void;
};

const TASKPOLICY = "/usr/sbin/taskpolicy";
const useTaskpolicy = process.platform === "darwin" && existsSync(TASKPOLICY);
const RETAINED_OUTPUT_CHARS = 262_144;
const KILL_ESCALATION_MS = 3_000;

export function validationEnv(extra?: Record<string, string>): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || VALIDATION_ENV_SCRUB_PATTERN.test(key)) continue;
    env[key] = value;
  }
  return { ...env, ...VALIDATION_RESOURCE_ENV, ...extra };
}

function killProcessGroup(pid: number, signal: NodeJS.Signals) {
  try {
    process.kill(-pid, signal);
  } catch {}
}

export function runValidationCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
  extraEnv?: Record<string, string>,
): Promise<CommandResult> {
  const displayCommand = [command, ...args].map(quoteArg).join(" ");
  const spawnCommand = useTaskpolicy ? TASKPOLICY : command;
  const spawnArgs = useTaskpolicy ? ["-c", "background", command, ...args] : [...args];
  const started = Date.now();

  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let timedOut = false;
    let outputLimited = false;
    let settled = false;
    let lastActivityAtMs = started;

    const child = spawn(spawnCommand, spawnArgs, {
      cwd,
      env: validationEnv(extraEnv),
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    }) as unknown as SpawnedProcess;

    const terminateTree = () => {
      if (child.pid === undefined) return;
      killProcessGroup(child.pid, "SIGTERM");
      setTimeout(() => {
        if (child.pid !== undefined) killProcessGroup(child.pid, "SIGKILL");
      }, KILL_ESCALATION_MS).unref();
    };

    const timer = setTimeout(() => {
      timedOut = true;
      terminateTree();
    }, timeoutMs);
    timer.unref();

    const append = (stream: "stdout" | "stderr", chunk: Buffer) => {
      lastActivityAtMs = Date.now();
      const text = chunk.toString();
      if (stream === "stdout") {
        stdoutBytes += chunk.length;
        stdout = (stdout + text).slice(-RETAINED_OUTPUT_CHARS);
      } else {
        stderrBytes += chunk.length;
        stderr = (stderr + text).slice(-RETAINED_OUTPUT_CHARS);
      }
      if (
        !outputLimited &&
        (stdoutBytes > VALIDATION_OUTPUT_LIMIT_BYTES || stderrBytes > VALIDATION_OUTPUT_LIMIT_BYTES)
      ) {
        outputLimited = true;
        terminateTree();
      }
    };

    child.stdout?.on("data", (chunk: Buffer) => append("stdout", chunk));
    child.stderr?.on("data", (chunk: Buffer) => append("stderr", chunk));

    const settle = (result: CommandResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };

    child.on("error", (cause) => {
      const code = typeof cause.code === "string" ? cause.code : undefined;
      settle({
        command: displayCommand,
        exitCode: 127,
        timedOut: false,
        spawnError: true,
        spawnErrorCode: code,
        durationMs: Date.now() - started,
        stdout: "",
        stderr: `${displayCommand}: ${cause.message}`,
        stdoutTail: "",
        stderrTail: tail(`${displayCommand}: ${cause.message}`),
        startedAtMs: started,
        lastActivityAtMs,
      });
    });

    child.on("close", (code) => {
      if (child.pid !== undefined) killProcessGroup(child.pid, "SIGKILL");
      if (outputLimited) {
        stderr += `\n[scaffbench] output exceeded ${VALIDATION_OUTPUT_LIMIT_BYTES} bytes; process tree terminated`;
      }
      settle({
        command: displayCommand,
        exitCode: timedOut ? null : outputLimited ? 1 : code,
        timedOut,
        timeoutKind: timedOut ? "hard" : undefined,
        durationMs: Date.now() - started,
        stdout,
        stderr,
        stdoutTail: tail(stdout),
        stderrTail: tail(stderr),
        startedAtMs: started,
        lastActivityAtMs,
      });
    });
  });
}
