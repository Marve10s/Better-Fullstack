# ScaffBench Effect migration

## Converted shell

- `agents/command.ts` now executes child processes with `@effect/platform/Command`. It preserves the existing `CommandResult` contract: rendered command, `number | null` exit code, timeout and spawn-error flags, full stdout/stderr, 4,000-character tails, and wall-clock duration. Stdin is closed with an empty stream, stdout and stderr are drained concurrently, timeout sends `SIGTERM`, and a still-running process is escalated to `SIGKILL` after three seconds.
- Agent adapters now return Effect programs instead of starting promises. The opencode/Kilo MCP config write uses the platform `FileSystem` service.
- Validation commands now compose the shared command Effect without nested runtimes. Cache hashing, reads, and writes live in `validation/cache.ts`; the cache payload, version input, key fields, ignored directories, file ordering, and symlink behavior are unchanged.
- `runner.ts` is an `Effect.gen` orchestration program. Spec, effort, path, trial, and pending-validation traversal use `Effect.forEach` with `concurrency: 1`, preserving the harness's strictly sequential order.
- Runner filesystem work uses the platform `FileSystem` service. The queue lock is acquired and released with `Effect.acquireRelease` inside a `Scope`, so normal completion, failure, or interruption removes the lock. `QUEUE_POLL_MS` and `STALE_LOCK_MS` behavior remains unchanged.
- `scaffbench-v2.ts` supplies `BunContext.layer` and runs the program with `BunRuntime.runMain` only at the executable edge. Tests that directly exercise an Effect supply the same Bun layer explicitly.
- Scoring, prompts, specs, CLI parsing, and summary data transforms remain ordinary functions. Existing summary JSON/Markdown renderers and their byte formatting were not changed; only metadata command probes pass through the Effect command layer.

## Effect patterns

- `Command.make`, `Command.start`, and scoped process cleanup
- `FileSystem.FileSystem` service with `BunContext.layer`
- `Effect.gen` for readable imperative-style composition
- `Effect.forEach(..., { concurrency: 1 })` for deterministic orchestration
- `Effect.acquireRelease` plus `Effect.scoped` for lock cleanup
- `Effect.forkScoped` for concurrent stdout/stderr draining
- Tagged `AgentSpawnError` and `ValidationTimeout` values at the command boundary
- `BunRuntime.runMain` at the application edge

## Dependencies

Added as root dev dependencies with `bun add -d`:

- `@effect/platform` `0.96.2`
- `@effect/platform-bun` `0.90.0`

The existing root `effect` dependency is `3.21.4`.

## Verification

- `bun test scripts/ --timeout 1200000`: 74 passed, 0 failed.
- `bun run scripts/splice-scaffbench-2-1.ts` followed by a diff of `apps/web/src/components/home/scaffbench-2-1-data.ts`: zero diff.
- `bun run scripts/scaffbench-v2.ts --list-specs`: 13 specs.
- `bunx tsc --noEmit -p scripts/tsconfig.json`: 31 pre-existing errors remain versus 40 at baseline; no new errors. All four former `agents/command.ts` child-process typing errors are gone.
- Required Python smoke revalidation: completed with `DONE python-ingestion-api-gpt-5.6-luna-medium-mcp validation=true cache=miss`.
