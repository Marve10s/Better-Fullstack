import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Either from "effect/Either";
import * as Option from "effect/Option";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

import type {
  BenchmarkSpec,
  CreationPath,
  Effort,
  ProjectValidation,
  RepairResult,
  RunProtocol,
  RunResult,
  ScaffbenchOptions,
  StepResult,
} from "@/types";

import {
  claudeCostUsd,
  parseAgyResult,
  parseClaudeResult,
  parseCodexResult,
  parseOpencodeResult,
  parsePiResult,
  providerForModel,
  runAgy,
  runClaude,
  runCodex,
  runOpencode,
  runPi,
  tail,
} from "@/agents";
import { calibrationOptions, calibrationVerdict, formatCalibrationVerdict } from "@/calibrate";
import { selectedSpecs } from "@/cli";
import { measureProjectCode } from "@/code-metrics";
import {
  HARNESS_VERSION,
  PROMPT_VERSION,
  SCAFFBENCH_SUITE_VERSION,
  VALIDATION_CACHE_VERSION,
  VALIDATION_RESOURCE_PROFILE_ID,
  QUEUE_POLL_MS,
  STALE_LOCK_MS,
  bfSpec,
  resolveBfVersion,
  resolveSpecPaths,
  setResolvedBfVersion,
  generationTimeoutMs,
} from "@/constants";
import { canonicalCommand, promptFor } from "@/prompts";
import {
  deriveFailureTags,
  emptyAcceptanceScore,
  emptyArtifactScore,
  scoreProject,
  scoreToolCompliance,
  validationPassed,
  classifyOutcome,
  outcomeEvidenceFor,
  rollupOutcome,
  stepBaseName,
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
  const program =
    options.command === "calibrate"
      ? runCalibrationUnlocked(options, log)
      : runScaffbenchUnlocked(options, log);
  if (options.listSpecs || options.writeMatrixOnly) return program;
  return withScaffbenchQueue(options, log, program);
}

function runCalibrationUnlocked(options: ScaffbenchOptions, log: Log) {
  return Effect.gen(function* () {
    const specs = selectedSpecs(options.specs);
    if (specs.length !== 1) {
      return yield* Effect.fail(new Error("scaffbench calibrate requires exactly one --spec <id>"));
    }
    const spec = specs[0]!;
    const calibration = calibrationOptions(options);
    log(`CALIBRATE ${spec.id}: weak=${calibration.weak.model}`);
    yield* runScaffbenchUnlocked(calibration.weak, log);
    log(`CALIBRATE ${spec.id}: strong=${calibration.strong.model}`);
    yield* runScaffbenchUnlocked(calibration.strong, log);
    const weakResults = yield* readExistingResults(calibration.weak.outDir);
    const strongResults = yield* readExistingResults(calibration.strong.outDir);
    const weak = weakResults.find((result) => result.specId === spec.id);
    const strong = strongResults.find((result) => result.specId === spec.id);
    const weakOutcome = weak ? classifyOutcome(weak) : undefined;
    const strongOutcome = strong ? classifyOutcome(strong) : undefined;
    log(
      formatCalibrationVerdict(
        spec.id,
        calibrationVerdict(weakOutcome, strongOutcome),
        weakOutcome,
        strongOutcome,
      ),
    );
  });
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
    const specOrderSeed = specShuffleSeed(options);
    const runProtocol = { repeats: options.repeats, seed: specOrderSeed } satisfies RunProtocol;
    const existingSummary = yield* readExistingSummary(options.outDir);
    const results = completedResults(existingSummary);
    const recordedResults = Array.isArray(existingSummary?.results)
      ? (existingSummary.results as RunResult[])
      : [];
    if (recordedResults.length > 0 && !options.validateExisting) {
      assertResumeProtocol({
        recorded: recordedRunProtocol(existingSummary),
        current: runProtocol,
        results: recordedResults,
        schedule: buildGenerationSchedule(specs, options, specOrderSeed),
        model: options.model,
      });
    }
    setResolvedBfVersion(yield* resolveBfVersion());
    yield* writeHarnessFiles(options.outDir, options, specs);
    const metadata: Record<string, unknown> = yield* collectMetadata(options);
    metadata.specOrderSeed = specOrderSeed;
    metadata.runProtocol = runProtocol;

    if (options.writeMatrixOnly) {
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
    const workspaceRoot = path.join(
      os.tmpdir(),
      "scaffbench21-work",
      path.basename(options.outDir),
    );
    yield* fs.makeDirectory(workspaceRoot, { recursive: true });

    if (!options.validateExisting) {
      for (const spec of specs) {
        const specPaths = resolveSpecPaths(spec, options.paths);
        const skippedPaths = options.paths.filter((pathMode) => !specPaths.includes(pathMode));
        if (skippedPaths.length > 0) {
          log(
            `PATHS ${spec.id}: runs ${specPaths.join(", ") || "(none)"} — skipping ${skippedPaths.join(", ")} (frontier/prompt-only or pinned spec.paths)`,
          );
        }
      }

      yield* Effect.forEach(
        buildGenerationSchedule(specs, options, specOrderSeed),
        ({ spec, effort, pathMode, trial }) =>
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
            specOrderSeed,
            log,
          }),
        { concurrency: 1, discard: true },
      );
    }

    if (!options.skipValidation && !options.generateOnly) {
      yield* validatePendingResults(results, options, specs, metadata, log);
      if (options.repair) {
        yield* repairFailedResults({
          results,
          options,
          specs,
          metadata,
          provider,
          bunx,
          emptyMcpPath,
          log,
        });
      }
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
  specOrderSeed: number;
  log: Log;
}) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const { effort, log, options, pathMode, provider, results, spec, trial } = input;
    const projectName = buildProjectName(spec, pathMode, effort, trial, options.repeats);
    const id = buildRunId(spec, options.model, effort, pathMode, trial, options.repeats);
    const runDir = path.join(options.outDir, "runs", id);
    const workDir = path.join(input.workspaceRoot, id);

    const existing = findCompletedTrial(results, spec, options.model, effort, pathMode, trial);
    if (existing) {
      log(`SKIP ${existing.id} already present`);
      return;
    }

    yield* fs.makeDirectory(runDir, { recursive: true });

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
    const timeoutMs = generationTimeoutMs(spec);
    const agentResult =
      provider === "codex"
        ? yield* runCodex({
            cwd: workDir,
            prompt,
            model: options.model,
            effort,
            useMcp: pathMode === "mcp",
            bunx: input.bunx,
            timeoutMs,
          })
        : provider === "agy"
          ? yield* runAgy({ cwd: workDir, prompt, model: options.model, effort, timeoutMs })
          : provider === "pi"
            ? yield* runPi({ cwd: workDir, prompt, model: options.model, effort, timeoutMs })
            : provider === "opencode" || provider === "kilo"
              ? yield* runOpencode({
                  binary: provider,
                  cwd: workDir,
                  prompt,
                  model: options.model,
                  effort,
                  useMcp: pathMode === "mcp",
                  bunx: input.bunx,
                  timeoutMs,
                })
              : yield* runClaude({
                  cwd: workDir,
                  prompt,
                  model: options.model,
                  effort,
                  maxBudgetUsd: options.maxBudgetUsd,
                  mcpConfig: pathMode === "mcp" ? input.bfsMcpPath : input.emptyMcpPath,
                  timeoutMs,
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
          : provider === "pi"
            ? parsePiResult(agentResult.stdout)
            : provider === "opencode" || provider === "kilo"
              ? parseOpencodeResult(agentResult.stdout)
              : parseClaudeResult(agentResult.stdout);
    const generatedDir = yield* fromPromise(() => findProjectDir(workDir, projectName));
    const validation = options.skipValidation
      ? {
          projectExists: generatedDir !== null,
          qualityGateRequested: qualityGateRequested(options),
          skipped: true,
          steps: {},
        }
      : deferredValidation(generatedDir !== null, options);
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
    const codeMetrics = generatedDir
      ? yield* fromPromise(() => measureProjectCode(generatedDir))
      : undefined;
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

    const totalCostUsd = claudeCostUsd(options.model, parsed?.usage) ?? parsed?.total_cost_usd;
    const maxBudgetUsd = normalizedBudget(options.maxBudgetUsd);
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
      codeMetrics,
      claude: {
        exitCode: agentResult.exitCode,
        timedOut: agentResult.timedOut,
        durationMs,
        resultDurationMs: parsed?.duration_ms,
        outputTokens: parsed?.usage?.output_tokens,
        totalCostUsd,
        sessionId: parsed?.session_id,
        terminalReason: parsed?.terminal_reason,
        spawnError: agentResult.spawnError,
        spawnErrorCode: agentResult.spawnErrorCode,
        timeoutKind: agentResult.timeoutKind,
        timeoutProgress: agentResult.timeoutProgress,
        stderrTail: agentResult.stderrTail,
      },
      budgetPolicy: {
        budgetEnforced: provider === "claude",
        maxBudgetUsd,
      },
      provenance: {
        suiteVersion: SCAFFBENCH_SUITE_VERSION,
        harnessVersion: HARNESS_VERSION,
        validationCacheVersion: VALIDATION_CACHE_VERSION,
        promptVersion: PROMPT_VERSION,
        resourceProfileId: VALIDATION_RESOURCE_PROFILE_ID,
        agentAdapter: provider,
        configuredTrials: options.repeats,
        specOrderSeed: input.specOrderSeed,
      },
      validation,
      stackScore: scored.artifact,
      generatorFaithfulness: scored.faithfulness,
      acceptanceScore: scored.acceptance,
      toolCompliance,
      failureTags: [],
    };
    result.outcome = classifyOutcome(result);
    result.outcomeEvidence = outcomeEvidenceFor(result);
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

export function selectRepairFailure(result: RunResult): [string, StepResult] | undefined {
  return Object.entries(result.validation.steps).find((entry): entry is [string, StepResult] => {
    const [name, step] = entry;
    if (
      !step ||
      ["lint", "format", "test", "doctor", "route", "tidy"].includes(stepBaseName(name))
    ) {
      return false;
    }
    return (
      step.status === "skip" || step.exitCode !== 0 || step.timedOut || step.spawnError === true
    );
  });
}

export function repairPromptFor(
  stepName: string,
  step: NonNullable<ProjectValidation["steps"][string]>,
) {
  const diagnostics = (step.stderrTail || step.stdoutTail || "No diagnostic output was captured.")
    .split("\n")
    .slice(-50)
    .join("\n");
  return `Repair the existing project in the current directory. Do not recreate it. Kill every process you start before finishing.
The ScaffBench validation step \`${stepName}\` failed. Make the smallest changes needed for that step and the project build to pass, then run a focused check.

Failing-step stderr tail:
${diagnostics}`;
}

function repairFailedResults(input: {
  results: RunResult[];
  options: ScaffbenchOptions;
  specs: readonly BenchmarkSpec[];
  metadata: Record<string, unknown>;
  provider: ReturnType<typeof providerForModel>;
  bunx: string;
  emptyMcpPath: string;
  log: Log;
}) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const specsById = new Map(input.specs.map((spec) => [spec.id, spec]));
    const failed = input.results.filter(
      (result) =>
        !result.repair &&
        result.projectDir &&
        rollupOutcome(classifyOutcome(result)) === "model-failure" &&
        selectRepairFailure(result),
    );
    if (failed.length === 0) return;
    input.log(`REPAIR ${failed.length} failed cell${failed.length === 1 ? "" : "s"}`);

    yield* Effect.forEach(
      failed,
      (result) =>
        Effect.gen(function* () {
          const spec = specsById.get(result.specId);
          const failure = selectRepairFailure(result);
          if (!spec || !failure || !result.projectDir) return;
          const [stepName, step] = failure;
          const repairProvider = providerForModel(result.model);
          const prompt = repairPromptFor(stepName, step);
          const timeoutMs = generationTimeoutMs(spec);
          yield* fs.writeFileString(path.join(result.runDir, "repair-prompt.txt"), prompt);
          input.log(`REPAIR ${result.id} step=${stepName}`);

          const started = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
          const agentResult =
            repairProvider === "codex"
              ? yield* runCodex({
                  cwd: result.projectDir,
                  prompt,
                  model: result.model,
                  effort: result.effort,
                  useMcp: false,
                  bunx: input.bunx,
                  timeoutMs,
                })
              : repairProvider === "agy"
                ? yield* runAgy({
                    cwd: result.projectDir,
                    prompt,
                    model: result.model,
                    effort: result.effort,
                    timeoutMs,
                  })
                : repairProvider === "pi"
                  ? yield* runPi({
                      cwd: result.projectDir,
                      prompt,
                      model: result.model,
                      effort: result.effort,
                      timeoutMs,
                    })
                  : repairProvider === "opencode" || repairProvider === "kilo"
                    ? yield* runOpencode({
                        binary: repairProvider,
                        cwd: result.projectDir,
                        prompt,
                        model: result.model,
                        effort: result.effort,
                        useMcp: false,
                        bunx: input.bunx,
                        timeoutMs,
                      })
                    : yield* runClaude({
                        cwd: result.projectDir,
                        prompt,
                        model: result.model,
                        effort: result.effort,
                        maxBudgetUsd: input.options.maxBudgetUsd,
                        mcpConfig: input.emptyMcpPath,
                        timeoutMs,
                      });
          const finished = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
          yield* fs.writeFileString(
            path.join(result.runDir, "repair.stdout.json"),
            agentResult.stdout,
          );
          yield* fs.writeFileString(
            path.join(result.runDir, "repair.stderr.log"),
            agentResult.stderr,
          );

          const parsed =
            repairProvider === "codex"
              ? parseCodexResult(agentResult.stdout, result.model)
              : repairProvider === "agy"
                ? parseAgyResult(agentResult.stdout)
                : repairProvider === "pi"
                  ? parsePiResult(agentResult.stdout)
                  : repairProvider === "opencode" || repairProvider === "kilo"
                    ? parseOpencodeResult(agentResult.stdout)
                    : parseClaudeResult(agentResult.stdout);
          const accounting = {
            exitCode: agentResult.exitCode,
            timedOut: agentResult.timedOut,
            durationMs: finished - started,
            resultDurationMs: parsed?.duration_ms,
            outputTokens: parsed?.usage?.output_tokens,
            totalCostUsd: claudeCostUsd(result.model, parsed?.usage) ?? parsed?.total_cost_usd,
            sessionId: parsed?.session_id,
            terminalReason: parsed?.terminal_reason,
            spawnError: agentResult.spawnError,
            spawnErrorCode: agentResult.spawnErrorCode,
            timeoutKind: agentResult.timeoutKind,
            timeoutProgress: agentResult.timeoutProgress,
            stderrTail: agentResult.stderrTail,
          };
          const validation = yield* validateProjectCached(spec, result.projectDir, input.options);
          const scored = yield* fromPromise(() =>
            scoreProject(spec, result.projectDir!, result.promptStyle),
          );
          const repairedRun: RunResult = {
            ...result,
            claude: accounting,
            validation,
            stackScore: scored.artifact,
            generatorFaithfulness: scored.faithfulness,
            acceptanceScore: scored.acceptance,
            outcome: undefined,
            repair: undefined,
            failureTags: [],
          };
          repairedRun.outcome = classifyOutcome(repairedRun);
          repairedRun.outcomeEvidence = outcomeEvidenceFor(repairedRun);
          repairedRun.failureTags = deriveFailureTags(repairedRun);
          result.repair = {
            attemptedAt: new Date().toISOString(),
            failingStep: stepName,
            prompt,
            claude: accounting,
            validation,
            stackScore: scored.artifact,
            outcome: repairedRun.outcome,
            outcomeEvidence: repairedRun.outcomeEvidence,
            failureTags: repairedRun.failureTags,
          } satisfies RepairResult;
          yield* writeSummaryEffect(
            input.options.outDir,
            input.results,
            input.options,
            input.specs,
            input.metadata,
          );
          input.log(`DONE REPAIR ${result.id} outcome=${result.repair.outcome}`);
        }),
      { concurrency: 1, discard: true },
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

function deferredValidation(projectExists: boolean, options: ScaffbenchOptions): ProjectValidation {
  return projectExists
    ? {
        projectExists: true,
        qualityGateRequested: qualityGateRequested(options),
        deferred: true,
        steps: {},
      }
    : {
        projectExists: false,
        qualityGateRequested: qualityGateRequested(options),
        steps: {},
      };
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
            result.validation = {
              projectExists: false,
              qualityGateRequested: qualityGateRequested(options),
              steps: {},
            };
            result.outcome = classifyOutcome(result);
            result.outcomeEvidence = outcomeEvidenceFor(result);
            result.failureTags = deriveFailureTags(result);
            yield* writeSummaryEffect(options.outDir, results, options, specs, metadata);
            log(`VALIDATE ${result.id} missing archived project`);
            return;
          }

          log(`VALIDATE ${result.id}`);
          result.validation = yield* validateProjectCached(spec, result.projectDir, options);
          if (result.provenance) {
            result.provenance.harnessVersion = HARNESS_VERSION;
            result.provenance.validationCacheVersion = VALIDATION_CACHE_VERSION;
            result.provenance.resourceProfileId = VALIDATION_RESOURCE_PROFILE_ID;
          }
          result.outcome = classifyOutcome(result);
          result.outcomeEvidence = outcomeEvidenceFor(result);
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

export function buildGenerationSchedule(
  specs: readonly BenchmarkSpec[],
  options: Pick<ScaffbenchOptions, "repeats" | "efforts" | "paths">,
  seed: number,
) {
  const schedule: Array<{
    spec: BenchmarkSpec;
    effort: Effort;
    pathMode: CreationPath;
    trial: number;
  }> = [];
  let lastScheduledSpecId: string | undefined;
  for (let trial = 1; trial <= options.repeats; trial += 1) {
    const ordered = seededShuffle(specs, seed + trial - 1);
    const firstRunnable = ordered.findIndex((spec) => resolveSpecPaths(spec, options.paths).length);
    if (firstRunnable >= 0 && ordered[firstRunnable]?.id === lastScheduledSpecId) {
      const swap = ordered.findIndex(
        (spec, index) =>
          index > firstRunnable &&
          spec.id !== lastScheduledSpecId &&
          resolveSpecPaths(spec, options.paths).length > 0,
      );
      if (swap >= 0) {
        [ordered[firstRunnable], ordered[swap]] = [ordered[swap]!, ordered[firstRunnable]!];
      }
    }
    for (const spec of ordered) {
      for (const effort of options.efforts) {
        for (const pathMode of resolveSpecPaths(spec, options.paths)) {
          schedule.push({ spec, effort, pathMode, trial });
          lastScheduledSpecId = spec.id;
        }
      }
    }
  }
  return schedule;
}

export function seededShuffle<T>(values: readonly T[], seed: number): T[] {
  const output = [...values];
  const random = mulberry32(seed >>> 0);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex]!, output[index]!];
  }
  return output;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

export function specShuffleSeed(options: Pick<ScaffbenchOptions, "outDir" | "model" | "specs">) {
  const digest = createHash("sha256")
    .update(JSON.stringify([options.outDir, options.model, [...options.specs].sort()]))
    .digest();
  return digest.readUInt32BE(0);
}

function normalizedBudget(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function qualityGateRequested(options: ScaffbenchOptions) {
  return options.qualityGate;
}

export function buildRunId(
  spec: BenchmarkSpec,
  model: string,
  effort: Effort,
  pathMode: CreationPath,
  trial: number,
  _repeats: number,
) {
  const base = `${spec.id}-${model}-${effort}-${pathMode}`;
  return `${base}-r${String(trial).padStart(2, "0")}`;
}

function legacyRunId(spec: BenchmarkSpec, model: string, effort: Effort, pathMode: CreationPath) {
  return `${spec.id}-${model}-${effort}-${pathMode}`;
}

export function findCompletedTrial(
  results: readonly RunResult[],
  spec: BenchmarkSpec,
  model: string,
  effort: Effort,
  pathMode: CreationPath,
  trial: number,
) {
  const currentId = buildRunId(spec, model, effort, pathMode, trial, 1);
  const oldId = legacyRunId(spec, model, effort, pathMode);
  return results.find((result) => result.id === currentId || (trial === 1 && result.id === oldId));
}

export function assertResumeProtocol(input: {
  recorded?: RunProtocol;
  current: RunProtocol;
  results: readonly RunResult[];
  schedule: ReturnType<typeof buildGenerationSchedule>;
  model: string;
}) {
  const protocolChanged =
    input.recorded !== undefined &&
    (input.recorded.repeats !== input.current.repeats ||
      input.recorded.seed !== input.current.seed);
  if (!protocolChanged) return;

  const aligned = input.results.every((result) => {
    const scheduled = input.schedule.find(
      (entry) =>
        entry.spec.id === result.specId &&
        entry.effort === result.effort &&
        entry.pathMode === result.path &&
        entry.trial === (result.trial ?? 1),
    );
    if (!scheduled || result.model !== input.model) return false;
    const expected = buildRunId(
      scheduled.spec,
      input.model,
      scheduled.effort,
      scheduled.pathMode,
      scheduled.trial,
      input.current.repeats,
    );
    return (
      result.id === expected ||
      (scheduled.trial === 1 &&
        result.id ===
          legacyRunId(scheduled.spec, input.model, scheduled.effort, scheduled.pathMode))
    );
  });
  if (!aligned) {
    throw new Error(
      `runProtocol conflict: recorded repeats=${String(input.recorded?.repeats)} seed=${String(
        input.recorded?.seed,
      )}; current repeats=${input.current.repeats} seed=${input.current.seed}; existing artifacts do not align`,
    );
  }
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

function readExistingSummary(outDir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const summaryPath = path.join(outDir, "summary.json");
    if (!(yield* fs.exists(summaryPath))) return null;
    return yield* fs.readFileString(summaryPath).pipe(
      Effect.map((text) => JSON.parse(text)),
      Effect.catchAll(() => Effect.succeed(null)),
    );
  });
}

function completedResults(summary: any): RunResult[] {
  return Array.isArray(summary?.results)
    ? (summary.results.filter(isCompletedHarnessRun) as RunResult[])
    : [];
}

function recordedRunProtocol(summary: any): RunProtocol | undefined {
  const protocol = summary?.metadata?.runProtocol;
  if (Number.isInteger(protocol?.repeats) && Number.isInteger(protocol?.seed)) {
    return { repeats: protocol.repeats, seed: protocol.seed };
  }
  if (
    Number.isInteger(summary?.options?.repeats) &&
    Number.isInteger(summary?.metadata?.specOrderSeed)
  ) {
    return { repeats: summary.options.repeats, seed: summary.metadata.specOrderSeed };
  }
  return undefined;
}

function readExistingResults(outDir: string) {
  return readExistingSummary(outDir).pipe(Effect.map(completedResults));
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
