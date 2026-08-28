import type {
  BenchmarkSpec,
  CreationPath,
  Effort,
  ProjectValidation,
  RepairResult,
  RunProtocol,
  TopUpRecord,
  RunResult,
  ScaffbenchOptions,
  StepResult,
} from "@scaffbench/types";

import * as FileSystem from "@effect/platform/FileSystem";
import {
  agyModelString,
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
} from "@scaffbench/agents";
import {
  calibrationOptions,
  calibrationVerdict,
  formatCalibrationVerdict,
} from "@scaffbench/calibrate";
import { selectedSpecs } from "@scaffbench/cli";
import { measureProjectCode } from "@scaffbench/code-metrics";
import {
  CREATION_PATH_VALUES,
  EFFORT_VALUES,
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
} from "@scaffbench/constants";
import { canonicalCommand, promptFor } from "@scaffbench/prompts";
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
} from "@scaffbench/scoring";
import { SCAFFBENCH_2_SPECS } from "@scaffbench/specs";
import { collectMetadata, effectiveReasoning, writeSummary } from "@scaffbench/summary";
import { archiveProjectSource, findProjectDir } from "@scaffbench/validation";
import { validateProjectCached } from "@scaffbench/validation/cache";
import * as Effect from "effect/Effect";
import * as Either from "effect/Either";
import * as Option from "effect/Option";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

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

    if (options.listSpecs) {
      const listed = selectedSpecs(options.specs);
      for (const spec of listed.length ? listed : SCAFFBENCH_2_SPECS) {
        log(`${spec.id}\t${spec.lane}\t${spec.family}\t${spec.title}`);
      }
      return;
    }

    yield* fs.makeDirectory(options.outDir, { recursive: true });
    const existingSummary = yield* readExistingSummary(options.outDir);
    const recordedProtocol = recordedRunProtocol(existingSummary);
    if (options.topUp !== undefined && (options.validateExisting || options.writeMatrixOnly)) {
      return yield* Effect.fail(
        new Error(
          "--top-up generates new trials and cannot run in validate-only or matrix-only mode",
        ),
      );
    }
    if (options.topUp !== undefined && recordedProtocol === undefined) {
      return yield* Effect.fail(
        new Error(
          `--top-up extends a finished run, but ${options.outDir} has no recorded run protocol`,
        ),
      );
    }
    const runOptions: ScaffbenchOptions =
      options.validateExisting || options.topUp !== undefined
        ? { ...options, ...recordedRunOptions(existingSummary) }
        : options;

    const specs = selectedSpecs(runOptions.specs);
    const specOrderSeed = specShuffleSeed(runOptions);
    const topUpSpecIds =
      options.topUp === undefined
        ? undefined
        : topUpSpecSelection(
            options.specsExplicit ? options.specs : runOptions.specs,
            runOptions.specs,
          );
    const previousTopUps = recordedProtocol?.topUps ?? [];
    const topUps =
      topUpSpecIds && options.topUp !== undefined
        ? [
            ...previousTopUps,
            { trials: options.topUp, specs: topUpSpecIds, recordedAt: new Date().toISOString() },
          ]
        : previousTopUps;
    const runProtocol = {
      repeats: runOptions.repeats,
      seed: specOrderSeed,
      ...(topUps.length > 0 ? { topUps } : {}),
    } satisfies RunProtocol;
    const results = completedResults(existingSummary);
    const recordedResults = recordedRunResults(existingSummary);
    const schedule = topUpSpecIds
      ? buildGenerationSchedule(
          selectedSpecs(topUpSpecIds),
          { ...runOptions, repeats: options.topUp! },
          specOrderSeed,
        )
      : buildGenerationSchedule(specs, runOptions, specOrderSeed);
    if (topUpSpecIds) {
      const pending = schedule.filter(
        (entry) =>
          !findCompletedTrial(
            results,
            entry.spec,
            runOptions.model,
            entry.effort,
            entry.pathMode,
            entry.trial,
          ),
      );
      if (pending.length === 0) {
        return yield* Effect.fail(
          new Error(
            `--top-up ${options.topUp}: every selected spec already has ${options.topUp} completed trials`,
          ),
        );
      }
      log(
        `TOP-UP ${runOptions.model}: ${pending.length} generation(s) to reach ${options.topUp} trials on ${topUpSpecIds.join(", ")}`,
      );
    }
    if (schedule.length === 0 && !runOptions.writeMatrixOnly) {
      return yield* Effect.fail(
        new Error(
          `empty schedule: specs=${runOptions.specs.join(",") || "(none)"} ` +
            `efforts=${runOptions.efforts.join(",")} paths=${runOptions.paths.join(",")}`,
        ),
      );
    }
    if (recordedResults.length > 0 && !options.validateExisting) {
      assertResumeProtocol({
        recorded: recordedRunProtocol(existingSummary),
        current: runProtocol,
        results: recordedResults,
        schedule,
        model: runOptions.model,
      });
    }
    setResolvedBfVersion(yield* resolveBfVersion());
    yield* writeHarnessFiles(runOptions.outDir, runOptions, specs);
    const metadata: Record<string, unknown> = yield* collectMetadata(runOptions);
    metadata.specOrderSeed = specOrderSeed;
    metadata.runProtocol = runProtocol;

    if (options.writeMatrixOnly) {
      yield* writeSummaryEffect(runOptions.outDir, [], runOptions, specs, metadata);
      log(`Wrote ScaffBench 2 matrix to ${runOptions.outDir}`);
      return;
    }

    const home = process.env.HOME ?? "";
    const nativeBunx = path.join(home, ".bun", "bin", "bunx");
    const bunx = (yield* fs.exists(nativeBunx)) ? nativeBunx : "bunx";
    const emptyMcpPath = path.join(runOptions.outDir, "empty-mcp.json");
    const bfsMcpPath = path.join(runOptions.outDir, "better-fullstack-mcp.json");
    yield* writeMcpConfigs(emptyMcpPath, bfsMcpPath, bunx);

    const provider = providerForModel(runOptions.model);
    assertScheduleSupported(schedule, provider, runOptions.model);
    const workspaceRoot = path.join(
      os.tmpdir(),
      "scaffbench21-work",
      path.basename(runOptions.outDir),
    );
    yield* fs.makeDirectory(workspaceRoot, { recursive: true });

    if (!options.validateExisting) {
      for (const spec of specs) {
        const specPaths = resolveSpecPaths(spec, runOptions.paths);
        const skippedPaths = runOptions.paths.filter((pathMode) => !specPaths.includes(pathMode));
        if (skippedPaths.length > 0) {
          log(
            `PATHS ${spec.id}: runs ${specPaths.join(", ") || "(none)"}, skipping ${skippedPaths.join(", ")} (frontier/prompt-only or pinned spec.paths)`,
          );
        }
      }

      yield* Effect.forEach(
        schedule,
        ({ spec, effort, pathMode, trial }) =>
          runOneGeneration({
            spec,
            effort,
            pathMode,
            trial,
            options: runOptions,
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
      yield* validatePendingResults(results, runOptions, specs, metadata, log);
      if (options.repair) {
        yield* repairFailedResults({
          results,
          options: runOptions,
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
    const configuredTrials = Math.max(options.repeats, options.topUp ?? 0);
    const projectName = buildProjectName(spec, pathMode, effort, trial, configuredTrials);
    const id = buildRunId(spec, options.model, effort, pathMode, trial, configuredTrials);
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
          artifact: emptyArtifactScore(spec, options.promptStyle),
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

    const totalCostUsd = resolvedCostUsd(provider, options.model, parsed);
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
        configuredTrials,
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
            totalCostUsd: resolvedCostUsd(repairProvider, result.model, parsed),
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

export function validatePendingResults(
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
          const projectDir = result.projectDir;
          if (!projectDir || !(yield* fs.exists(projectDir))) {
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
          result.validation = yield* validateProjectCached(spec, projectDir, options);
          if (options.forceRevalidate) {
            const scored = yield* fromPromise(() =>
              scoreProject(spec, projectDir, result.promptStyle),
            );
            result.stackScore = scored.artifact;
            result.generatorFaithfulness = scored.faithfulness;
            result.acceptanceScore = scored.acceptance;
          }
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
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`maxBudgetUsd must be a non-negative number, got ${JSON.stringify(value)}`);
  }
  return parsed;
}

export function resolvedCostUsd(
  provider: ReturnType<typeof providerForModel>,
  model: string,
  parsed:
    | {
        usage?: {
          input_tokens?: number;
          output_tokens?: number;
          cache_creation_input_tokens?: number;
          cache_read_input_tokens?: number;
        };
        total_cost_usd?: number;
      }
    | null
    | undefined,
): number | undefined {
  if (provider === "claude") return claudeCostUsd(model, parsed?.usage) ?? parsed?.total_cost_usd;
  return parsed?.total_cost_usd;
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
  if (input.recorded === undefined) return;
  if (input.recorded.repeats !== input.current.repeats) {
    throw new Error(
      `runProtocol conflict: this out-dir was launched with repeats=${input.recorded.repeats} and ` +
        `cannot resume as repeats=${input.current.repeats}; start a fresh out-dir for a different repeat count`,
    );
  }
  if (input.recorded.seed === input.current.seed) return;

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
    if (!(yield* fs.exists(summaryPath))) return undefined;
    const text = yield* fs.readFileString(summaryPath);
    return yield* Effect.try({
      try: () => JSON.parse(text) as unknown,
      catch: (cause) =>
        new Error(
          `${summaryPath} is unreadable (${cause instanceof Error ? cause.message : String(cause)}); ` +
            "repair or remove it before resuming this out-dir",
        ),
    });
  });
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function stringList(value: unknown): string[] | undefined {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? [...(value as string[])]
    : undefined;
}

function recordedRunResults(summary: unknown): RunResult[] {
  const results = asRecord(summary)?.results;
  return Array.isArray(results) ? (results as RunResult[]) : [];
}

function completedResults(summary: unknown): RunResult[] {
  return recordedRunResults(summary).filter(isCompletedHarnessRun);
}

export function recordedRunOptions(summary: unknown): Partial<ScaffbenchOptions> {
  const options = asRecord(asRecord(summary)?.options);
  if (!options) return {};
  const recorded: Partial<ScaffbenchOptions> = {};
  if (typeof options.model === "string") recorded.model = options.model;
  if (Number.isInteger(options.repeats)) recorded.repeats = options.repeats as number;
  if (typeof options.maxBudgetUsd === "string") recorded.maxBudgetUsd = options.maxBudgetUsd;
  if (options.promptStyle === "explicit" || options.promptStyle === "natural") {
    recorded.promptStyle = options.promptStyle;
  }
  const efforts = stringList(options.efforts)?.filter((effort): effort is Effort =>
    EFFORT_VALUES.includes(effort as Effort),
  );
  if (efforts && efforts.length > 0) recorded.efforts = efforts;
  const paths = stringList(options.paths)?.filter((pathMode): pathMode is CreationPath =>
    CREATION_PATH_VALUES.includes(pathMode as CreationPath),
  );
  if (paths && paths.length > 0) recorded.paths = paths;
  const specs = stringList(options.specs);
  if (specs && specs.length > 0) recorded.specs = specs;
  return recorded;
}

export function topUpSpecSelection(requested: readonly string[], recorded: readonly string[]) {
  if (recorded.every((id) => requested.includes(id))) return [...recorded];
  const unknown = requested.filter((id) => !recorded.includes(id));
  if (unknown.length > 0) {
    throw new Error(
      `--top-up: ${unknown.join(", ")} not in this out-dir's recorded specs (${recorded.join(", ")})`,
    );
  }
  return [...requested];
}

function topUpRecords(value: unknown): TopUpRecord[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const records = value.flatMap((item) => {
    const record = asRecord(item);
    const specs = stringList(record?.specs);
    return Number.isInteger(record?.trials) && specs && typeof record?.recordedAt === "string"
      ? [{ trials: record.trials as number, specs, recordedAt: record.recordedAt }]
      : [];
  });
  return records.length > 0 ? records : undefined;
}

export function recordedRunProtocol(summary: unknown): RunProtocol | undefined {
  const record = asRecord(summary);
  const metadata = asRecord(record?.metadata);
  const protocol = asRecord(metadata?.runProtocol);
  if (Number.isInteger(protocol?.repeats) && Number.isInteger(protocol?.seed)) {
    const topUps = topUpRecords(protocol!.topUps);
    return {
      repeats: protocol!.repeats as number,
      seed: protocol!.seed as number,
      ...(topUps ? { topUps } : {}),
    };
  }
  const options = asRecord(record?.options);
  if (Number.isInteger(options?.repeats) && Number.isInteger(metadata?.specOrderSeed)) {
    return { repeats: options!.repeats as number, seed: metadata!.specOrderSeed as number };
  }
  return undefined;
}

function readExistingResults(outDir: string) {
  return readExistingSummary(outDir).pipe(Effect.map(completedResults));
}

export function isCompletedHarnessRun(result: RunResult) {
  const outcome = classifyOutcome(result);
  return outcome !== "provider-infra" && outcome !== "harness-infra";
}

export function assertScheduleSupported(
  schedule: ReturnType<typeof buildGenerationSchedule>,
  provider: ReturnType<typeof providerForModel>,
  model: string,
) {
  if ((provider === "agy" || provider === "pi") && schedule.some((e) => e.pathMode === "mcp")) {
    throw new Error(
      `--paths mcp is not supported by the ${provider} adapter (${model}): it wires no MCP server, ` +
        "so the agent would receive a prompt requiring tools it cannot call",
    );
  }
  if (provider === "agy") {
    for (const effort of new Set(schedule.map((entry) => entry.effort))) {
      agyModelString(model, effort);
    }
  }
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
