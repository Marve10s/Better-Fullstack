import type { CommandExecutor } from "@effect/platform/CommandExecutor";

import * as Command from "@effect/platform/Command";
import * as Data from "effect/Data";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Either from "effect/Either";
import * as Fiber from "effect/Fiber";
import * as Stream from "effect/Stream";

import type { CommandResult } from "@/types";

export class AgentSpawnError extends Data.TaggedError("AgentSpawnError")<{
  readonly command: string;
  readonly cause: unknown;
}> {}

export class ValidationTimeout extends Data.TaggedError("ValidationTimeout")<{
  readonly command: string;
  readonly timeoutMs: number;
}> {}

export function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
): Effect.Effect<CommandResult, never, CommandExecutor> {
  const displayCommand = [command, ...args].map(quoteArg).join(" ");

  return Effect.gen(function* () {
    const started = yield* Effect.clockWith((clock) => clock.currentTimeMillis);

    const execution = Effect.scoped(
      Effect.gen(function* () {
        // Keep stdin as an empty pipe. Closing it immediately gives commands such
        // as `codex exec` EOF instead of leaving them waiting for interactive input.
        const child = yield* Command.make(command, ...args).pipe(
          Command.workingDirectory(cwd),
          Command.env(process.env),
          Command.stdin(Stream.empty),
          Command.start,
          Effect.mapError((cause) => new AgentSpawnError({ command: displayCommand, cause })),
        );

        const stdoutFiber = yield* child.stdout.pipe(
          Stream.runFold("", appendChunk),
          Effect.forkScoped,
        );
        const stderrFiber = yield* child.stderr.pipe(
          Stream.runFold("", appendChunk),
          Effect.forkScoped,
        );

        const completion = yield* Effect.race(
          Effect.either(child.exitCode).pipe(
            Effect.map((exitCode) => ({ _tag: "Exited" as const, exitCode })),
          ),
          Effect.sleep(Duration.millis(timeoutMs)).pipe(
            Effect.as(new ValidationTimeout({ command: displayCommand, timeoutMs })),
          ),
        );

        let exitCode: number | null;
        let timedOut = false;
        if (completion instanceof ValidationTimeout) {
          timedOut = true;
          // `Process.kill` sends the signal immediately and then waits for exit.
          // Race that wait with the same three-second escalation window used by
          // the previous child_process implementation.
          const terminated = yield* Effect.race(
            child.kill("SIGTERM").pipe(Effect.as(true)),
            Effect.sleep(Duration.seconds(3)).pipe(Effect.as(false)),
          );
          if (!terminated) {
            yield* child.kill("SIGKILL").pipe(Effect.ignore);
          }
          exitCode = null;
        } else {
          // @effect/platform represents signal termination as an exitCode
          // PlatformError. The harness contract represents the same event as
          // `null`, matching Node child_process's close callback.
          exitCode = Either.isRight(completion.exitCode) ? Number(completion.exitCode.right) : null;
        }

        const stdout = yield* Fiber.join(stdoutFiber);
        const stderr = yield* Fiber.join(stderrFiber);
        return { exitCode, timedOut, stdout, stderr };
      }),
    );

    const outcome = yield* execution.pipe(
      Effect.catchAll((error) =>
        Effect.succeed({
          exitCode: 127,
          timedOut: false,
          stdout: "",
          stderr: `${displayCommand}: ${formatSpawnError(
            error instanceof AgentSpawnError ? error.cause : error,
          )}`,
          spawnError: true as const,
        }),
      ),
    );
    const finished = yield* Effect.clockWith((clock) => clock.currentTimeMillis);

    return {
      command: displayCommand,
      exitCode: outcome.exitCode,
      timedOut: outcome.timedOut,
      spawnError: "spawnError" in outcome ? outcome.spawnError : false,
      durationMs: finished - started,
      stdout: outcome.stdout,
      stderr: outcome.stderr,
      stdoutTail: tail(outcome.stdout),
      stderrTail: tail(outcome.stderr),
    };
  });
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

export function quoteArg(arg: string) {
  return /^[a-zA-Z0-9_./:=@-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

export function tail(value: string, max = 4_000) {
  return value.length <= max ? value : value.slice(-max);
}
