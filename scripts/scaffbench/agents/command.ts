import type { CommandExecutor } from "@effect/platform/CommandExecutor";

import * as Command from "@effect/platform/Command";
import * as Data from "effect/Data";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Either from "effect/Either";
import * as Fiber from "effect/Fiber";
import * as Stream from "effect/Stream";

import type { CommandResult } from "@/types";

import { TIMEOUT_PROGRESS_WINDOW_MS } from "@/constants";

export class AgentSpawnError extends Data.TaggedError("AgentSpawnError")<{
  readonly command: string;
  readonly cause: unknown;
}> {}

export class ValidationTimeout extends Data.TaggedError("ValidationTimeout")<{
  readonly command: string;
  readonly timeoutMs: number;
  readonly timeoutKind: "hard" | "idle";
}> {}

export type RunCommandOptions = {
  /** Generation-only idle ceiling; validation callers normally leave this unset. */
  idleTimeoutMs?: number;
  env?: Record<string, string>;
};

export function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
  options: RunCommandOptions = {},
): Effect.Effect<CommandResult, never, CommandExecutor> {
  const displayCommand = [command, ...args].map(quoteArg).join(" ");

  return Effect.gen(function* () {
    const started = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
    let lastStdoutActivityAtMs = started;
    let lastProgressActivityAtMs: number | undefined;
    let stdoutLineRemainder = "";

    const appendStdout = (output: string, chunk: Uint8Array) => {
      const receivedAt = Date.now();
      lastStdoutActivityAtMs = receivedAt;
      const text = Buffer.from(chunk).toString();
      const lines = `${stdoutLineRemainder}${text}`.split("\n");
      stdoutLineRemainder = lines.pop() ?? "";
      for (const line of lines) {
        const eventTime = progressEventTime(line, receivedAt);
        if (eventTime !== undefined) lastProgressActivityAtMs = eventTime;
      }
      return output + text;
    };

    const execution = Effect.scoped(
      Effect.gen(function* () {
        // Keep stdin as an empty pipe. Closing it immediately gives commands such
        // as `codex exec` EOF instead of leaving them waiting for interactive input.
        const child = yield* Command.make(command, ...args).pipe(
          Command.workingDirectory(cwd),
          Command.env({ ...process.env, ...options.env }),
          Command.stdin(Stream.empty),
          Command.start,
          Effect.mapError((cause) => new AgentSpawnError({ command: displayCommand, cause })),
        );

        const stdoutFiber = yield* child.stdout.pipe(
          Stream.runFold("", appendStdout),
          Effect.forkScoped,
        );
        const stderrFiber = yield* child.stderr.pipe(
          Stream.runFold("", appendChunk),
          Effect.forkScoped,
        );

        const hardTimeout = Effect.sleep(Duration.millis(timeoutMs)).pipe(
          Effect.as(
            new ValidationTimeout({
              command: displayCommand,
              timeoutMs,
              timeoutKind: "hard",
            }),
          ),
        );
        const timeout = options.idleTimeoutMs
          ? Effect.race(
              hardTimeout,
              waitForIdleTimeout(
                displayCommand,
                options.idleTimeoutMs,
                () => lastStdoutActivityAtMs,
              ),
            )
          : hardTimeout;
        const completion = yield* Effect.race(
          Effect.either(child.exitCode).pipe(
            Effect.map((exitCode) => ({ _tag: "Exited" as const, exitCode })),
          ),
          timeout,
        );

        let exitCode: number | null;
        let timedOut = false;
        let timeoutKind: "hard" | "idle" | undefined;
        if (completion instanceof ValidationTimeout) {
          timedOut = true;
          timeoutKind = completion.timeoutKind;
          // `Process.kill` sends the signal immediately and then waits for exit.
          // Race that wait with a three-second escalation window.
          const terminated = yield* Effect.race(
            child.kill("SIGTERM").pipe(Effect.as(true)),
            Effect.sleep(Duration.seconds(3)).pipe(Effect.as(false)),
          );
          if (!terminated) yield* child.kill("SIGKILL").pipe(Effect.ignore);
          exitCode = null;
        } else {
          // @effect/platform represents signal termination as an exitCode
          // PlatformError. The harness contract represents it as `null`.
          exitCode = Either.isRight(completion.exitCode) ? Number(completion.exitCode.right) : null;
        }

        const stdout = yield* Fiber.join(stdoutFiber);
        const stderr = yield* Fiber.join(stderrFiber);
        return { exitCode, timedOut, timeoutKind, stdout, stderr };
      }),
    );

    const outcome = yield* execution.pipe(
      Effect.catchAll((error) => {
        const cause = error instanceof AgentSpawnError ? error.cause : error;
        return Effect.succeed({
          exitCode: 127,
          timedOut: false,
          stdout: "",
          stderr: `${displayCommand}: ${formatSpawnError(cause)}`,
          spawnError: true as const,
          spawnErrorCode: spawnErrorCode(cause),
        });
      }),
    );
    const finished = yield* Effect.clockWith((clock) => clock.currentTimeMillis);

    return {
      command: displayCommand,
      exitCode: outcome.exitCode,
      timedOut: outcome.timedOut,
      spawnError: "spawnError" in outcome ? outcome.spawnError : false,
      spawnErrorCode: "spawnErrorCode" in outcome ? outcome.spawnErrorCode : undefined,
      durationMs: finished - started,
      stdout: outcome.stdout,
      stderr: outcome.stderr,
      stdoutTail: tail(outcome.stdout),
      stderrTail: tail(outcome.stderr),
      timeoutKind: "timeoutKind" in outcome ? outcome.timeoutKind : undefined,
      timeoutProgress: outcome.timedOut
        ? ("timeoutKind" in outcome && outcome.timeoutKind === "idle") ||
          lastProgressActivityAtMs === undefined ||
          finished - lastProgressActivityAtMs > TIMEOUT_PROGRESS_WINDOW_MS
          ? "timeout-stuck"
          : "timeout-progressing"
        : undefined,
      startedAtMs: started,
      lastStdoutActivityAtMs,
      lastProgressActivityAtMs,
    };
  });
}

function waitForIdleTimeout(command: string, idleTimeoutMs: number, lastActivity: () => number) {
  return Effect.gen(function* () {
    const pollMs = Math.max(10, Math.min(1_000, Math.floor(idleTimeoutMs / 4)));
    while (true) {
      yield* Effect.sleep(Duration.millis(pollMs));
      const now = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
      if (now - lastActivity() >= idleTimeoutMs) {
        return new ValidationTimeout({
          command,
          timeoutMs: idleTimeoutMs,
          timeoutKind: "idle",
        });
      }
    }
  });
}

/** Recognize tool/file trajectory events and prefer their embedded timestamps. */
export function progressEventTime(line: string, receivedAtMs: number): number | undefined {
  const trimmed = line.trim();
  if (!trimmed.startsWith("{")) return undefined;
  let event: any;
  try {
    event = JSON.parse(trimmed);
  } catch {
    return undefined;
  }
  const claudeTool = Array.isArray(event?.message?.content)
    ? event.message.content.some((block: any) => block?.type === "tool_use")
    : false;
  const codexTool =
    /^(item\.(started|completed)|tool\.)/.test(event?.type ?? "") &&
    /command|file|mcp_tool|tool/.test(event?.item?.type ?? event?.type ?? "");
  const opencodeTool = ["tool", "file", "patch"].includes(event?.part?.type);
  if (!claudeTool && !codexTool && !opencodeTool) return undefined;

  const raw = event.timestamp ?? event.time ?? event.created_at ?? event.createdAt;
  if (typeof raw === "number") return raw < 10_000_000_000 ? raw * 1_000 : raw;
  if (typeof raw === "string") {
    const parsed = Date.parse(raw);
    if (Number.isFinite(parsed)) return parsed;
  }
  return receivedAtMs;
}

function appendChunk(output: string, chunk: Uint8Array) {
  return output + Buffer.from(chunk).toString();
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
