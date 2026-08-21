import { spawn } from "node:child_process";

type SpawnedProcess = {
  pid?: number;
  stdout: { on(event: "data", listener: (chunk: Buffer) => void): void } | null;
  stderr: { on(event: "data", listener: (chunk: Buffer) => void): void } | null;
  on(event: "error", listener: (cause: Error & { code?: string }) => void): void;
  on(event: "close", listener: (code: number | null) => void): void;
};

export const KILL_ESCALATION_MS = 3_000;

export function killProcessGroup(pid: number, signal: NodeJS.Signals) {
  try {
    process.kill(-pid, signal);
  } catch {}
}

export type ProcessTree = {
  pid?: number;
  terminate(): void;
  kill(): void;
};

export function spawnProcessTree(
  command: string,
  args: readonly string[],
  options: { cwd: string; env: NodeJS.ProcessEnv },
  handlers: {
    onStdout?: (chunk: Buffer) => void;
    onStderr?: (chunk: Buffer) => void;
    onError: (cause: Error & { code?: string }) => void;
    onClose: (code: number | null) => void;
  },
): ProcessTree {
  const child = spawn(command, [...args], {
    cwd: options.cwd,
    env: options.env,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  }) as unknown as SpawnedProcess;

  if (handlers.onStdout) child.stdout?.on("data", handlers.onStdout);
  if (handlers.onStderr) child.stderr?.on("data", handlers.onStderr);
  child.on("error", handlers.onError);
  child.on("close", handlers.onClose);

  return {
    get pid() {
      return child.pid;
    },
    terminate() {
      if (child.pid === undefined) return;
      killProcessGroup(child.pid, "SIGTERM");
      setTimeout(() => {
        if (child.pid !== undefined) killProcessGroup(child.pid, "SIGKILL");
      }, KILL_ESCALATION_MS).unref();
    },
    kill() {
      if (child.pid !== undefined) killProcessGroup(child.pid, "SIGKILL");
    },
  };
}
