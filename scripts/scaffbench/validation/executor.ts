import { existsSync } from "node:fs";

import type { CommandResult } from "@/types";

import { quoteArg, tail } from "@/agents/command";
import {
  VALIDATION_ENV_SCRUB_PATTERN,
  VALIDATION_OUTPUT_LIMIT_BYTES,
  VALIDATION_RESOURCE_ENV,
} from "@/constants";
import { spawnProcessTree } from "@/process-tree";

const TASKPOLICY = "/usr/sbin/taskpolicy";
const useTaskpolicy = process.platform === "darwin" && existsSync(TASKPOLICY);
const RETAINED_OUTPUT_CHARS = 262_144;

export function validationEnv(extra?: Record<string, string>): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || VALIDATION_ENV_SCRUB_PATTERN.test(key)) continue;
    env[key] = value;
  }
  return { ...env, ...VALIDATION_RESOURCE_ENV, ...extra };
}

export function runValidationCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
  extraEnv?: Record<string, string>,
  signal?: AbortSignal,
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

    const settle = (result: CommandResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
      resolve(result);
    };

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
        tree.terminate();
      }
    };

    const tree = spawnProcessTree(
      spawnCommand,
      spawnArgs,
      { cwd, env: validationEnv(extraEnv) },
      {
        onStdout: (chunk) => append("stdout", chunk),
        onStderr: (chunk) => append("stderr", chunk),
        onError: (cause) => {
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
        },
        onClose: (code) => {
          tree.kill();
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
        },
      },
    );

    const onAbort = () => {
      tree.terminate();
    };

    const timer = setTimeout(() => {
      timedOut = true;
      tree.terminate();
    }, timeoutMs);
    timer.unref();

    if (signal) {
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}
