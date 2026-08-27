import type { CommandResult } from "@scaffbench/types";

import { GEN_IDLE_TIMEOUT_MS, TIMEOUT_PROGRESS_WINDOW_MS } from "@scaffbench/constants";
import { spawnProcessTree } from "@scaffbench/process-tree";
import * as Effect from "effect/Effect";

export type RunCommandOptions = {
  idleTimeoutMs?: number;
  env?: Record<string, string>;
};

export type IdleCapableAdapter = "claude" | "codex" | "opencode" | "kilo" | "agy" | "pi";

export function agentRunCommandOptions(
  adapter: IdleCapableAdapter,
  idleTimeoutMs = GEN_IDLE_TIMEOUT_MS,
): RunCommandOptions {
  return adapter === "agy" ? {} : { idleTimeoutMs };
}

export function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
  options: RunCommandOptions = {},
): Effect.Effect<CommandResult> {
  const displayCommand = [command, ...args].map(quoteArg).join(" ");

  return Effect.promise(
    () =>
      new Promise<CommandResult>((resolve) => {
        const started = Date.now();
        let stdout = "";
        let stderr = "";
        let lastActivityAtMs = started;
        let lastStdoutActivityAtMs = started;
        let lastStderrActivityAtMs = started;
        let lastProgressActivityAtMs: number | undefined;
        let stdoutLineRemainder = "";
        let stderrLineRemainder = "";
        let timedOut = false;
        let timeoutKind: "hard" | "idle" | undefined;
        let settled = false;
        const inFlightToolIds = new Set<string>();

        const appendOutput = (stream: "stdout" | "stderr", chunk: Buffer) => {
          const receivedAt = Date.now();
          lastActivityAtMs = receivedAt;
          const text = chunk.toString();
          if (stream === "stdout") {
            lastStdoutActivityAtMs = receivedAt;
            stdout += text;
          } else {
            lastStderrActivityAtMs = receivedAt;
            stderr += text;
          }
          const remainder = stream === "stdout" ? stdoutLineRemainder : stderrLineRemainder;
          const lines = `${remainder}${text}`.split("\n");
          if (stream === "stdout") stdoutLineRemainder = lines.pop() ?? "";
          else stderrLineRemainder = lines.pop() ?? "";
          for (const line of lines) {
            const activity = streamEventActivity(line, receivedAt);
            if (activity.progressAtMs !== undefined) {
              lastProgressActivityAtMs = activity.progressAtMs;
            }
            for (const id of activity.startedToolIds) inFlightToolIds.add(id);
            for (const id of activity.completedToolIds) inFlightToolIds.delete(id);
          }
        };

        const settle = (result: CommandResult) => {
          if (settled) return;
          settled = true;
          clearTimeout(hardTimer);
          if (idleTimer !== undefined) clearInterval(idleTimer);
          resolve(result);
        };

        const tree = spawnProcessTree(
          command,
          args,
          { cwd, env: { ...process.env, ...options.env } },
          {
            onStdout: (chunk) => appendOutput("stdout", chunk),
            onStderr: (chunk) => appendOutput("stderr", chunk),
            onError: (cause) => {
              const message = `${displayCommand}: ${formatSpawnError(cause)}`;
              settle({
                command: displayCommand,
                exitCode: 127,
                timedOut: false,
                spawnError: true,
                spawnErrorCode: spawnErrorCode(cause),
                durationMs: Date.now() - started,
                stdout: "",
                stderr: message,
                stdoutTail: "",
                stderrTail: tail(message),
                startedAtMs: started,
                lastActivityAtMs,
              });
            },
            onClose: (code) => {
              tree.kill();
              const finished = Date.now();
              settle({
                command: displayCommand,
                exitCode: timedOut ? null : code,
                timedOut,
                timeoutKind,
                spawnError: false,
                durationMs: finished - started,
                stdout,
                stderr,
                stdoutTail: tail(stdout),
                stderrTail: tail(stderr),
                timeoutProgress: timedOut
                  ? timeoutKind === "idle" ||
                    lastProgressActivityAtMs === undefined ||
                    (inFlightToolIds.size === 0 &&
                      finished - lastProgressActivityAtMs > TIMEOUT_PROGRESS_WINDOW_MS)
                    ? "timeout-stuck"
                    : "timeout-progressing"
                  : undefined,
                startedAtMs: started,
                lastActivityAtMs,
                lastStdoutActivityAtMs,
                lastStderrActivityAtMs,
                lastProgressActivityAtMs,
              });
            },
          },
        );

        const hardTimer = setTimeout(() => {
          timedOut = true;
          timeoutKind = "hard";
          tree.terminate();
        }, timeoutMs);
        hardTimer.unref();

        const idleTimeoutMs = options.idleTimeoutMs;
        const idleTimer =
          idleTimeoutMs === undefined
            ? undefined
            : setInterval(
                () => {
                  if (inFlightToolIds.size > 0) return;
                  if (Date.now() - lastActivityAtMs < idleTimeoutMs) return;
                  timedOut = true;
                  timeoutKind = "idle";
                  tree.terminate();
                },
                Math.max(10, Math.min(1_000, Math.floor(idleTimeoutMs / 4))),
              );
        idleTimer?.unref();
      }),
  );
}

export function progressEventTime(line: string, receivedAtMs: number): number | undefined {
  return streamEventActivity(line, receivedAtMs).progressAtMs;
}

function streamEventActivity(line: string, receivedAtMs: number) {
  const empty = {
    progressAtMs: undefined as number | undefined,
    startedToolIds: [] as string[],
    completedToolIds: [] as string[],
  };
  const trimmed = line.trim();
  if (!trimmed.startsWith("{")) return empty;
  let event: any;
  try {
    event = JSON.parse(trimmed);
  } catch {
    return empty;
  }
  const content = Array.isArray(event?.message?.content) ? event.message.content : [];
  const claudeStarts = content
    .filter((block: any) => block?.type === "tool_use")
    .map((block: any) => String(block.id ?? "claude:anonymous"));
  const claudeCompletions = content
    .filter((block: any) => block?.type === "tool_result")
    .map((block: any) => String(block.tool_use_id ?? "claude:anonymous"));
  const itemType = event?.item?.type ?? "";
  const codexTool = /command|file|mcp_tool|tool/.test(itemType);
  const itemId = String(event?.item?.id ?? event?.item_id ?? "codex:anonymous");
  const codexStarts = event?.type === "item.started" && codexTool ? [itemId] : [];
  const codexCompletions =
    /^(?:item\.(?:completed|failed)|tool\.(?:completed|failed))$/.test(event?.type ?? "") &&
    codexTool
      ? [itemId]
      : [];
  const part = event?.part;
  const opencodeTool = part?.type === "tool";
  const opencodeStatus = String(part?.state?.status ?? part?.status ?? "").toLowerCase();
  const opencodeId = String(part?.callID ?? part?.id ?? part?.toolCallId ?? "opencode:anonymous");
  const opencodeStarts =
    opencodeTool && /^(?:pending|running|started|in_progress)$/.test(opencodeStatus)
      ? [opencodeId]
      : [];
  const opencodeCompletions =
    opencodeTool && /^(?:completed|failed|error|cancelled)$/.test(opencodeStatus)
      ? [opencodeId]
      : [];
  const piId = String(event?.toolCallId ?? "pi:anonymous");
  const piStarts = event?.type === "tool_execution_start" ? [piId] : [];
  const piCompletions = event?.type === "tool_execution_end" ? [piId] : [];
  const codexProgress =
    /^(item\.(started|completed)|tool\.)/.test(event?.type ?? "") &&
    /command|file|mcp_tool|tool/.test(event?.item?.type ?? event?.type ?? "");
  const progress =
    claudeStarts.length > 0 ||
    claudeCompletions.length > 0 ||
    codexCompletions.length > 0 ||
    codexProgress ||
    ["tool", "file", "patch"].includes(part?.type) ||
    /^tool_execution_(?:start|update|end)$/.test(event?.type ?? "");
  if (!progress) return empty;

  const raw = event.timestamp ?? event.time ?? event.created_at ?? event.createdAt;
  let progressAtMs = receivedAtMs;
  if (typeof raw === "number") progressAtMs = raw < 10_000_000_000 ? raw * 1_000 : raw;
  if (typeof raw === "string") {
    const parsed = Date.parse(raw);
    if (Number.isFinite(parsed)) progressAtMs = parsed;
  }
  return {
    progressAtMs,
    startedToolIds: [...claudeStarts, ...codexStarts, ...opencodeStarts, ...piStarts],
    completedToolIds: [
      ...claudeCompletions,
      ...codexCompletions,
      ...opencodeCompletions,
      ...piCompletions,
    ],
  };
}

function formatSpawnError(error: unknown) {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (error && typeof error === "object" && "message" in error) {
    const name = "name" in error && typeof error.name === "string" ? error.name : "Error";
    return `${name}: ${String(error.message)}`;
  }
  return String(error);
}

export function spawnErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;
  for (const key of ["code", "reason"]) {
    const value = (error as Record<string, unknown>)[key];
    if (typeof value === "string" && value) return value;
  }
  const cause = (error as Record<string, unknown>).cause;
  return cause === error ? undefined : spawnErrorCode(cause);
}

export function quoteArg(arg: string) {
  return /^[a-zA-Z0-9_./:=@-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

export function tail(value: string, max = 4_000) {
  return value.length <= max ? value : value.slice(-max);
}
