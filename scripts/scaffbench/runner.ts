import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Either from "effect/Either";
import * as Option from "effect/Option";
import os from "node:os";
import path from "node:path";

import type {
  BenchmarkSpec,
  CreationPath,
  Effort,
  ProjectValidation,
  RunResult,
  ScaffbenchOptions,
} from "@/types";

import {
  claudeCostUsd,
  parseAgyResult,
  parseClaudeResult,
  parseCodexResult,
  parseOpencodeResult,
  providerForModel,
  runAgy,
  runClaude,
  runCodex,
  runOpencode,
} from "@/agents";
import { selectedSpecs } from "@/cli";
import {
  HARNESS_VERSION,
  QUEUE_POLL_MS,
  STALE_LOCK_MS,
  bfSpec,
  resolveBfVersion,
  resolveSpecPaths,
  setResolvedBfVersion,
} from "@/constants";
import { canonicalCommand, promptFor } from "@/prompts";
import {
  deriveFailureTags,
  emptyAcceptanceScore,
  emptyArtifactScore,
  scoreProject,
  scoreToolCompliance,
  validationPassed,
} from "@/scoring";
import { SCAFFBENCH_2_SPECS } from "@/specs";
import { collectMetadata, effectiveReasoning, writeSummary } from "@/summary";
import { archiveProjectSource, findProjectDir } from "@/validation";
import { validateProjectCached } from "@/validation/cache";

type Log = (message: string) => void;

function fromPromise<A>(evaluate: () => Promise<A>) {
  return Effect.tryPromise({ try: evaluate, catch: (cause) => cause });
}

export function runScaffbench(options: ScaffbenchOptions, log: Log = console.log) {
  const program = runScaffbenchUnlocked(options, log);
  if (options.listSpecs || options.writeMatrixOnly) return program;
  return withScaffbenchQueue(options, log, program);
}

function runScaffbenchUnlocked(options: ScaffbenchOptions, log: Log) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    if (options.generateOnly && options.validateExisting) {
      return yield* Effect.fail(
        new Error("--generate-only and --validate-existing cannot be used together"),
      );
    }

    const specs = selectedSpecs(options.specs);
    if (options.listSpecs) {
      for (const spec of specs.length ? specs : SCAFFBENCH_2_SPECS) {
        log(`${spec.id}\t${spec.lane}\t${spec.family}\t${spec.title}`);
      }
      return;
    }

    yield* fs.makeDirectory(options.outDir, { recursive: true });
    // Pin once so commands, MCP config, doctor, prompts, and metadata agree.
    setResolvedBfVersion(yield* resolveBfVersion());
    yield* writeHarnessFiles(options.outDir, options, specs);

    if (options.writeMatrixOnly) {
      const metadata = yield* collectMetadata(options);
      yield* writeSummaryEffect(options.outDir, [], options, specs, metadata);
      log(`Wrote ScaffBench 2 matrix to ${options.outDir}`);
      return;
    }

    const home = process.env.HOME ?? "";
    const nativeBunx = path.join(home, ".bun", "bin", "bunx");
    const bunx = (yield* fs.exists(nativeBunx)) ? nativeBunx : "bunx";
    const emptyMcpPath = path.join(options.outDir, "empty-mcp.json");
    const bfsMcpPath = path.join(options.outDir, "better-fullstack-mcp.json");
    yield* writeMcpConfigs(emptyMcpPath, bfsMcpPath, bunx);

    const provider = providerForModel(options.model);
    const metadata = yield* collectMetadata(options);
    const results = yield* readExistingResults(options.outDir);
    const workspaceRoot = path.join(
      os.tmpdir(),
      "scaffbench21-work",
      path.basename(options.outDir),
    );
    yield* fs.makeDirectory(workspaceRoot, { recursive: true });

    if (!options.validateExisting) {
      yield* Effect.forEach(
        specs,
        (spec) =>
          Effect.gen(function* () {
            const specPaths = resolveSpecPaths(spec, options.paths);
            const skippedPaths = options.paths.filter((pathMode) => !specPaths.includes(pathMode));
            if (skippedPaths.length > 0) {
              log(
                `PATHS ${spec.id}: runs ${specPaths.join(", ") || "(none)"} — skipping ${skippedPaths.join(", ")} (frontier/prompt-only or pinned spec.paths)`,
              );
            }

            yield* Effect.forEach(
              options.efforts,
              (effort) =>
                Effect.forEach(
                  specPaths,
                  (pathMode) =>
                    Effect.forEach(
                      Array.from({ length: options.repeats }, (_, index) => index + 1),
                      (trial) =>
                        runOneGeneration({
                          spec,
                          effort,
                          pathMode,
                          trial,
                          options,
                          specs,
                          provider,
                          bunx,
                          emptyMcpPath,
                          bfsMcpPath,
                          workspaceRoot,
                          results,
                          metadata,
                          log,
                        }),
                      { concurrency: 1, discard: true },
                    ),
                  { concurrency: 1, discard: true },
                ),
              { concurrency: 1, discard: true },
            );
          }),
        { concurrency: 1, discard: true },
      );
    }

    if (!options.skipValidation && !options.generateOnly) {
      yield* validatePendingResults(results, options, specs, metadata, log);
    } else if (options.generateOnly) {
      log("Generation finished; validation deferred. Re-run the same out-dir to validate.");
    }
  });
}

function runOneGeneration(input: {
  spec: BenchmarkSpec;
  effort: Effort;
  pathMode: CreationPath;
  trial: number;
  options: ScaffbenchOptions;
  specs: readonly BenchmarkSpec[];
  provider: ReturnType<typeof providerForModel>;
  bunx: string;
  emptyMcpPath: string;
  bfsMcpPath: string;
  workspaceRoot: string;
  results: RunResult[];
  metadata: Record<string, unknown>;
  log: Log;
}) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const { effort, log, options, pathMode, provider, results, spec, trial } = input;
    const projectName = buildProjectName(spec, pathMode, effort, trial, options.repeats);
    const id = buildRunId(spec, options.model, effort, pathMode, trial, options.repeats);
    const runDir = path.join(options.outDir, "runs", id);
    const workDir = path.join(input.workspaceRoot, id);
    yield* fs.makeDirectory(runDir, { recursive: true });

    if (results.some((result) => result.id === id)) {
      log(`SKIP ${id} already present`);
      return;
    }

    yield* fs.remove(workDir, { recursive: true, force: true });
    yield* fs.makeDirectory(workDir, { recursive: true });

    const prompt = promptFor(spec, pathMode, workDir, projectName, options.promptStyle);
    yield* fs.writeFileString(path.join(runDir, "prompt.txt"), prompt);
    yield* fs.writeFileString(
      path.join(runDir, "canonical-command.txt"),
      `${canonicalCommand(spec, projectName)}\n`,
    );

    log(`RUN ${id}`);
    const started = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
    const agentResult =
      provider === "codex"
        ? yield* runCodex({
            cwd: workDir,
            prompt,
            model: options.model,
            effort,
            useMcp: pathMode === "mcp",
            bunx: input.bunx,
          })
        : provider === "agy"
          ? yield* runAgy({ cwd: workDir, prompt, model: options.model, effort })
          : provider === "opencode" || provider === "kilo"
            ? yield* runOpencode({
                binary: provider,
                cwd: workDir,
                prompt,
                model: options.model,
                effort,
                useMcp: pathMode === "mcp",
                bunx: input.bunx,
              })
            : yield* runClaude({
                cwd: workDir,
                prompt,
                model: options.model,
                effort,
                maxBudgetUsd: options.maxBudgetUsd,
                mcpConfig: pathMode === "mcp" ? input.bfsMcpPath : input.emptyMcpPath,
              });
    const finished = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
    const durationMs = finished - started;

    yield* fs.writeFileString(path.join(runDir, "claude.stdout.json"), agentResult.stdout);
    yield* fs.writeFileString(path.join(runDir, "claude.stderr.log"), agentResult.stderr);

    const parsed =
      provider === "codex"
        ? parseCodexResult(agentResult.stdout, options.model)
        : provider === "agy"
          ? parseAgyResult(agentResult.stdout)
          : provider === "opencode" || provider === "kilo"
            ? parseOpencodeResult(agentResult.stdout)
            : parseClaudeResult(agentResult.stdout);
    const generatedDir = yield* fromPromise(() => findProjectDir(workDir, projectName));
    const validation = options.skipValidation
      ? { projectExists: generatedDir !== null, steps: {} }
      : deferredValidation(generatedDir !== null);
    const scored = generatedDir
      ? yield* fromPromise(() => scoreProject(spec, generatedDir, options.promptStyle))
      : {
          artifact: emptyArtifactScore(spec),
          faithfulness: undefined,
          acceptance:
            options.promptStyle === "natural" && spec.acceptanceSets
              ? emptyAcceptanceScore(spec)
              : undefined,
        };
    const toolCompliance = yield* fromPromise(() =>
      scoreToolCompliance(pathMode, generatedDir, agentResult),
    );

    let projectDir = generatedDir;
    if (generatedDir) {
      const archivedDir = path.join(runDir, projectName);
      const archive = yield* Effect.either(
        fromPromise(() => archiveProjectSource(generatedDir, archivedDir)),
      );
      if (Either.isRight(archive)) projectDir = archivedDir;
      else {
        const error = archive.left;
        log(
          `WARN archive failed for ${id}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
    if (!generatedDir || projectDir !== generatedDir) {
      yield* fs.remove(workDir, { recursive: true, force: true });
    }

    const result: RunResult = {
      id,
      specId: spec.id,
      specTitle: spec.title,
      model: options.model,
      effort,
      effectiveReasoning: effectiveReasoning(options.model, effort),
      path: pathMode,
      trial,
      promptStyle: options.promptStyle,
      runDir,
      projectName,
      projectDir,
      claude: {
        exitCode: agentResult.exitCode,
        timedOut: agentResult.timedOut,
        durationMs,
        resultDurationMs: parsed?.duration_ms,
        outputTokens: parsed?.usage?.output_tokens,
        totalCostUsd: claudeCostUsd(options.model, parsed?.usage) ?? parsed?.total_cost_usd,
        sessionId: parsed?.session_id,
        terminalReason: parsed?.terminal_reason,
      },
      validation,
      stackScore: scored.artifact,
      generatorFaithfulness: scored.faithfulness,
      acceptanceScore: scored.acceptance,
      toolCompliance,
      failureTags: [],
    };
    result.failureTags = deriveFailureTags(result);
    results.push(result);
    yield* writeSummaryEffect(options.outDir, results, options, input.specs, input.metadata);
    log(
      `DONE ${id} exit=${result.claude.exitCode} validation=${
        result.validation.deferred ? "deferred" : validationPassed(result)
      } stack=${result.stackScore.matched}/${result.stackScore.total}`,
    );
  });
}

function withScaffbenchQueue<A, E, R>(
  options: ScaffbenchOptions,
  log: Log,
  program: Effect.Effect<A, E, R>,
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const lockDir = path.join(path.dirname(options.outDir), ".scaffbench.lock");
    yield* Effect.acquireRelease(acquireLock(lockDir, options.outDir, log), () =>
      fs.remove(lockDir, { recursive: true, force: true }).pipe(Effect.ignore),
    );
    return yield* program;
  }).pipe(Effect.scoped);
}

function acquireLock(lockDir: string, outDir: string, log: Log) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.makeDirectory(path.dirname(lockDir), { recursive: true });
    let announcedWait = false;

    while (true) {
      const acquired = yield* fs.makeDirectory(lockDir).pipe(
        Effect.as(true),
        Effect.catchIf(
          (error) => error._tag === "SystemError" && error.reason === "AlreadyExists",
          () => Effect.succeed(false),
        ),
      );
      if (acquired) {
        yield* fs.writeFileString(
          path.join(lockDir, "owner.json"),
          `${JSON.stringify(
            {
              pid: process.pid,
              outDir,
              startedAt: new Date().toISOString(),
              command: process.argv.join(" "),
            },
            null,
            2,
          )}\n`,
        );
        return;
      }
      if (yield* removeStaleLock(lockDir)) continue;
      if (!announcedWait) {
        log(`QUEUE waiting for active ScaffBench run (${lockDir})`);
        announcedWait = true;
      }
      yield* Effect.sleep(QUEUE_POLL_MS);
    }
  });
}

function removeStaleLock(lockDir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const owner = yield* Effect.either(
      fs
        .readFileString(path.join(lockDir, "owner.json"))
        .pipe(Effect.flatMap((text) => Effect.try(() => JSON.parse(text)))),
    );
    if (Either.isRight(owner)) {
      if (typeof owner.right.pid === "number" && isProcessAlive(owner.right.pid)) return false;
    } else {
      const info = yield* Effect.either(fs.stat(lockDir));
      if (Either.isLeft(info)) return true;
      const modifiedAt = Option.getOrElse(info.right.mtime, () => new Date(0)).getTime();
      if (Date.now() - modifiedAt < STALE_LOCK_MS) return false;
    }
    yield* fs.remove(lockDir, { recursive: true, force: true }).pipe(Effect.ignore);
    return true;
  });
}

function isProcessAlive(pid: number) {
  if (pid === process.pid) return true;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function deferredValidation(projectExists: boolean): ProjectValidation {
  return projectExists
    ? { projectExists: true, deferred: true, steps: {} }
    : { projectExists: false, steps: {} };
}

function needsValidation(result: RunResult, options: ScaffbenchOptions) {
  if (options.skipValidation) return false;
  if (!result.validation.projectExists || !result.projectDir) return false;
  if (result.validation.deferred) return true;
  if (options.validateExisting && options.forceRevalidate) return true;
  return (
    options.validateExisting &&
    !result.validation.cacheKey &&
    Object.keys(result.validation.steps).length === 0
  );
}

function validatePendingResults(
  results: RunResult[],
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
  metadata: Record<string, unknown>,
  log: Log,
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const specsById = new Map(specs.map((spec) => [spec.id, spec]));
    const pending = results
      .filter((result) => needsValidation(result, options))
      .sort(
        (a, b) =>
          validationPriority(specsById.get(a.specId)) - validationPriority(specsById.get(b.specId)),
      );

    if (pending.length === 0) {
      if (options.validateExisting) log("No existing generated runs need validation.");
      return;
    }

    log(`VALIDATE ${pending.length} generated run${pending.length === 1 ? "" : "s"}`);
    yield* Effect.forEach(
      pending,
      (result) =>
        Effect.gen(function* () {
          const spec = specsById.get(result.specId);
          if (!spec) return;
          if (!result.projectDir || !(yield* fs.exists(result.projectDir))) {
            result.validation = { projectExists: false, steps: {} };
            result.failureTags = deriveFailureTags(result);
            yield* writeSummaryEffect(options.outDir, results, options, specs, metadata);
            log(`VALIDATE ${result.id} missing archived project`);
            return;
          }

          log(`VALIDATE ${result.id}`);
          result.validation = yield* validateProjectCached(spec, result.projectDir, options);
          result.failureTags = deriveFailureTags(result);
          yield* writeSummaryEffect(options.outDir, results, options, specs, metadata);
          log(
            `DONE ${result.id} validation=${validationPassed(result)} cache=${
              result.validation.cacheHit ? "hit" : "miss"
            }`,
          );
        }),
      { concurrency: 1, discard: true },
    );
  });
}

function validationPriority(spec?: BenchmarkSpec) {
  if (!spec) return 50;
  const native = new Set(spec.validationProfile.native ?? []);
  if (native.has("cargo") || spec.family === "rust") return 100;
  if (native.has("dotnet") || spec.family === "multi-ecosystem" || spec.family === "dotnet")
    return 80;
  return 10;
}

function writeHarnessFiles(
  outDir: string,
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString(
      path.join(outDir, "spec.json"),
      `${JSON.stringify(
        {
          harnessVersion: HARNESS_VERSION,
          selectedSpecs: specs.map((spec) => spec.id),
          specs: specs.map((spec) => ({
            ...spec,
            canonicalCommand: canonicalCommand(spec, "<project-name>"),
          })),
          options: { ...options, listSpecs: undefined, writeMatrixOnly: undefined },
        },
        null,
        2,
      )}\n`,
    );
  });
}

function writeMcpConfigs(emptyMcpPath: string, bfsMcpPath: string, bunx: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString(emptyMcpPath, `${JSON.stringify({ mcpServers: {} }, null, 2)}\n`);
    yield* fs.writeFileString(
      bfsMcpPath,
      `${JSON.stringify(
        {
          mcpServers: {
            "better-fullstack": {
              command: bunx,
              args: [bfSpec("create-better-fullstack"), "mcp"],
            },
          },
        },
        null,
        2,
      )}\n`,
    );
  });
}

function buildRunId(
  spec: BenchmarkSpec,
  model: string,
  effort: Effort,
  pathMode: CreationPath,
  trial: number,
  repeats: number,
) {
  const base = `${spec.id}-${model}-${effort}-${pathMode}`;
  return repeats === 1 ? base : `${base}-r${String(trial).padStart(2, "0")}`;
}

function buildProjectName(
  spec: BenchmarkSpec,
  pathMode: CreationPath,
  effort: Effort,
  trial: number,
  repeats: number,
) {
  const base = `sb21-${spec.id}-${pathMode}-${effort}`.replace(/[^a-zA-Z0-9_-]/g, "-");
  return repeats === 1 ? base : `${base}-r${String(trial).padStart(2, "0")}`;
}

function readExistingResults(outDir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const summaryPath = path.join(outDir, "summary.json");
    if (!(yield* fs.exists(summaryPath))) return [];
    return yield* fs.readFileString(summaryPath).pipe(
      Effect.map((text) => {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed.results)) return [];
        return parsed.results.filter(isCompletedHarnessRun) as RunResult[];
      }),
      Effect.catchAll(() => Effect.succeed([] as RunResult[])),
    );
  });
}

function isCompletedHarnessRun(result: RunResult) {
  return (
    result.claude.terminalReason !== undefined ||
    result.claude.timedOut ||
    result.validation.projectExists ||
    result.claude.durationMs > 10_000
  );
}

function writeSummaryEffect(
  outDir: string,
  results: readonly RunResult[],
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
  metadata: Record<string, unknown>,
) {
  return fromPromise(() => writeSummary(outDir, results, options, specs, metadata));
}
