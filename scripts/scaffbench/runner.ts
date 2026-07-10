import { existsSync } from "node:fs";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { archiveProjectSource, findProjectDir, validateProjectCached } from "./validation";
import { emptyAcceptanceScore, emptyArtifactScore, scoreProject, scoreToolCompliance } from "./scoring";
import { deriveFailureTags, validationPassed } from "./scoring";
import { collectMetadata, effectiveReasoning, writeSummary } from "./summary";
import { claudeCostUsd, parseAgyResult, parseClaudeResult, parseCodexResult, parseOpencodeResult, providerForModel, runAgy, runClaude, runCodex, runOpencode } from "./agents";
import { HARNESS_VERSION, QUEUE_POLL_MS, STALE_LOCK_MS, bfSpec, resolveBfVersion, resolveSpecPaths, setResolvedBfVersion } from "./constants";
import { canonicalCommand, promptFor } from "./prompts";
import { selectedSpecs } from "./cli";
import { SCAFFBENCH_2_SPECS } from "./specs";
import type { BenchmarkSpec, CreationPath, Effort, ProjectValidation, RunResult, ScaffbenchOptions } from "./types";

export async function runScaffbench(options: ScaffbenchOptions, log = console.log) {
  if (options.listSpecs || options.writeMatrixOnly) {
    return runScaffbenchUnlocked(options, log);
  }
  return withScaffbenchQueue(options, log, () => runScaffbenchUnlocked(options, log));
}

async function runScaffbenchUnlocked(options: ScaffbenchOptions, log = console.log) {
  if (options.generateOnly && options.validateExisting) {
    throw new Error("--generate-only and --validate-existing cannot be used together");
  }
  const specs = selectedSpecs(options.specs);
  if (options.listSpecs) {
    for (const spec of specs.length ? specs : SCAFFBENCH_2_SPECS) {
      log(`${spec.id}\t${spec.lane}\t${spec.family}\t${spec.title}`);
    }
    return;
  }

  await mkdir(options.outDir, { recursive: true });
  // Pin the generator version up front so the canonical command, MCP config,
  // doctor lane, CLI prompt, and recorded metadata all reference the same build.
  setResolvedBfVersion(await resolveBfVersion());
  await writeHarnessFiles(options.outDir, options, specs);

  if (options.writeMatrixOnly) {
    await writeSummary(options.outDir, [], options, specs, await collectMetadata(options));
    log(`Wrote ScaffBench 2 matrix to ${options.outDir}`);
    return;
  }

  const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
    ? `${process.env.HOME}/.bun/bin/bunx`
    : "bunx";
  const emptyMcpPath = path.join(options.outDir, "empty-mcp.json");
  const bfsMcpPath = path.join(options.outDir, "better-fullstack-mcp.json");
  await writeMcpConfigs(emptyMcpPath, bfsMcpPath, bunx);

  // The agent that drives this model: GPT/o-series → Codex CLI, else Claude Code.
  const provider = providerForModel(options.model);

  const metadata = await collectMetadata(options);
  const results = await readExistingResults(options.outDir);

  // Agents run in an isolated workspace tree, disjoint from the grading tree
  // (canonical-command.txt / spec.json / summary.json / sibling runs), so a
  // CLI or MCP run cannot read the answer key out of its own working directory.
  const workspaceRoot = path.join(os.tmpdir(), "scaffbench21-work", path.basename(options.outDir));
  await mkdir(workspaceRoot, { recursive: true });

  if (!options.validateExisting) {
    for (const spec of specs) {
      const specPaths = resolveSpecPaths(spec, options.paths);
      const skippedPaths = options.paths.filter((p) => !specPaths.includes(p));
      if (skippedPaths.length > 0) {
        log(
          `PATHS ${spec.id}: runs ${specPaths.join(", ") || "(none)"} — skipping ${skippedPaths.join(", ")} (frontier/prompt-only or pinned spec.paths)`,
        );
      }
      for (const effort of options.efforts) {
        for (const pathMode of specPaths) {
          for (let trial = 1; trial <= options.repeats; trial += 1) {
            const projectName = buildProjectName(spec, pathMode, effort, trial, options.repeats);
            const id = buildRunId(spec, options.model, effort, pathMode, trial, options.repeats);
            const runDir = path.join(options.outDir, "runs", id);
            const workDir = path.join(workspaceRoot, id);
            await mkdir(runDir, { recursive: true });

            if (results.some((result) => result.id === id)) {
              log(`SKIP ${id} already present`);
              continue;
            }

            await rm(workDir, { recursive: true, force: true }).catch(() => {});
            await mkdir(workDir, { recursive: true });

            const prompt = promptFor(spec, pathMode, workDir, projectName, options.promptStyle);
            await writeFile(path.join(runDir, "prompt.txt"), prompt);
            await writeFile(
              path.join(runDir, "canonical-command.txt"),
              `${canonicalCommand(spec, projectName)}\n`,
            );

            log(`RUN ${id}`);
            const started = Date.now();
            const claude =
              provider === "codex"
                ? await runCodex({
                    cwd: workDir,
                    prompt,
                    model: options.model,
                    effort,
                    useMcp: pathMode === "mcp",
                    bunx,
                  })
                : provider === "agy"
                  ? await runAgy({ cwd: workDir, prompt, model: options.model, effort })
                  : provider === "opencode" || provider === "kilo"
                  ? await runOpencode({
                      binary: provider,
                      cwd: workDir,
                      prompt,
                      model: options.model,
                      effort,
                      useMcp: pathMode === "mcp",
                      bunx,
                    })
                  : await runClaude({
                      cwd: workDir,
                      prompt,
                      model: options.model,
                      effort,
                      maxBudgetUsd: options.maxBudgetUsd,
                      mcpConfig: pathMode === "mcp" ? bfsMcpPath : emptyMcpPath,
                    });
            const durationMs = Date.now() - started;

            await writeFile(path.join(runDir, "claude.stdout.json"), claude.stdout);
            await writeFile(path.join(runDir, "claude.stderr.log"), claude.stderr);

            const parsed =
              provider === "codex"
                ? parseCodexResult(claude.stdout, options.model)
                : provider === "agy"
                  ? parseAgyResult(claude.stdout)
                  : provider === "opencode" || provider === "kilo"
                    ? parseOpencodeResult(claude.stdout)
                    : parseClaudeResult(claude.stdout);
            const generatedDir = await findProjectDir(workDir, projectName);
            const validation = options.skipValidation
              ? { projectExists: generatedDir !== null, steps: {} }
              : deferredValidation(generatedDir !== null);
            const scored = generatedDir
              ? await scoreProject(spec, generatedDir, options.promptStyle)
              : {
                  artifact: emptyArtifactScore(spec),
                  faithfulness: undefined,
                  // A no-project discovery run satisfies zero capabilities — score it
                  // 0 rather than leaving it undefined, or maybeAverage would drop it
                  // and overstate the cell's Acceptance.
                  acceptance:
                    options.promptStyle === "natural" && spec.acceptanceSets
                      ? emptyAcceptanceScore(spec)
                      : undefined,
                };
            const toolCompliance = await scoreToolCompliance(pathMode, generatedDir, claude);

            // Archive the generated source under the grading tree, then drop the
            // isolated workspace, so run artifacts stay durable without leaving
            // the answer key reachable from the agent's working directory.
            let projectDir = generatedDir;
            if (generatedDir) {
              const archivedDir = path.join(runDir, projectName);
              try {
                await archiveProjectSource(generatedDir, archivedDir);
                projectDir = archivedDir;
              } catch (error) {
                log(
                  `WARN archive failed for ${id}: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                );
              }
            }
            if (!generatedDir || projectDir !== generatedDir) {
              await rm(workDir, { recursive: true, force: true }).catch(() => {});
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
                exitCode: claude.exitCode,
                timedOut: claude.timedOut,
                durationMs,
                resultDurationMs: parsed?.duration_ms,
                outputTokens: parsed?.usage?.output_tokens,
                // Price Claude from token usage (the CLI reports $0 on a
                // subscription / Max plan, which would make Claude look free);
                // non-Claude providers fall back to their own reported cost.
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
            await writeSummary(options.outDir, results, options, specs, metadata);

            log(
              `DONE ${id} exit=${result.claude.exitCode} validation=${
                result.validation.deferred ? "deferred" : validationPassed(result)
              } stack=${result.stackScore.matched}/${result.stackScore.total}`,
            );
          }
        }
      }
    }
  }

  if (!options.skipValidation && !options.generateOnly) {
    await validatePendingResults(results, options, specs, metadata, log);
  } else if (options.generateOnly) {
    log("Generation finished; validation deferred. Re-run the same out-dir to validate.");
  }
}

async function withScaffbenchQueue<T>(
  options: ScaffbenchOptions,
  log: (message: string) => void,
  fn: () => Promise<T>,
) {
  const lockRoot = path.dirname(options.outDir);
  const lockDir = path.join(lockRoot, ".scaffbench.lock");
  await mkdir(lockRoot, { recursive: true });

  let announcedWait = false;
  while (true) {
    try {
      await mkdir(lockDir);
      await writeFile(
        path.join(lockDir, "owner.json"),
        `${JSON.stringify(
          {
            pid: process.pid,
            outDir: options.outDir,
            startedAt: new Date().toISOString(),
            command: process.argv.join(" "),
          },
          null,
          2,
        )}\n`,
      );
      break;
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
      if (code !== "EEXIST") throw error;
      if (await removeStaleLock(lockDir)) continue;
      if (!announcedWait) {
        log(`QUEUE waiting for active ScaffBench run (${lockDir})`);
        announcedWait = true;
      }
      await sleep(QUEUE_POLL_MS);
    }
  }

  try {
    return await fn();
  } finally {
    await rm(lockDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function removeStaleLock(lockDir: string) {
  const ownerPath = path.join(lockDir, "owner.json");
  try {
    const owner = JSON.parse(await readFile(ownerPath, "utf8"));
    if (typeof owner.pid === "number" && isProcessAlive(owner.pid)) return false;
  } catch {
    try {
      const info = await stat(lockDir);
      if (Date.now() - info.mtimeMs < STALE_LOCK_MS) return false;
    } catch {
      return true;
    }
  }
  await rm(lockDir, { recursive: true, force: true }).catch(() => {});
  return true;
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  // --force-revalidate: re-run validation even for runs that already carry a
  // verdict (used after a validator-logic change; the bumped
  // VALIDATION_CACHE_VERSION guarantees a cache miss).
  if (options.validateExisting && options.forceRevalidate) return true;
  return (
    options.validateExisting &&
    !result.validation.cacheKey &&
    Object.keys(result.validation.steps).length === 0
  );
}

async function validatePendingResults(
  results: RunResult[],
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
  metadata: Record<string, unknown>,
  log: (message: string) => void,
) {
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
  for (const result of pending) {
    const spec = specsById.get(result.specId);
    if (!spec) continue;
    if (!result.projectDir || !existsSync(result.projectDir)) {
      result.validation = { projectExists: false, steps: {} };
      result.failureTags = deriveFailureTags(result);
      await writeSummary(options.outDir, results, options, specs, metadata);
      log(`VALIDATE ${result.id} missing archived project`);
      continue;
    }

    log(`VALIDATE ${result.id}`);
    result.validation = await validateProjectCached(spec, result.projectDir, options);
    result.failureTags = deriveFailureTags(result);
    await writeSummary(options.outDir, results, options, specs, metadata);
    log(
      `DONE ${result.id} validation=${validationPassed(result)} cache=${
        result.validation.cacheHit ? "hit" : "miss"
      }`,
    );
  }
}

function validationPriority(spec?: BenchmarkSpec) {
  if (!spec) return 50;
  const native = new Set(spec.validationProfile.native ?? []);
  if (native.has("cargo") || spec.family === "rust") return 100;
  if (native.has("dotnet") || spec.family === "multi-ecosystem" || spec.family === "dotnet")
    return 80;
  return 10;
}

async function writeHarnessFiles(
  outDir: string,
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
) {
  await writeFile(
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
}

async function writeMcpConfigs(emptyMcpPath: string, bfsMcpPath: string, bunx: string) {
  await writeFile(emptyMcpPath, `${JSON.stringify({ mcpServers: {} }, null, 2)}\n`);
  await writeFile(
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

async function readExistingResults(outDir: string): Promise<RunResult[]> {
  const summaryPath = path.join(outDir, "summary.json");
  if (!existsSync(summaryPath)) return [];
  try {
    const parsed = JSON.parse(await readFile(summaryPath, "utf8"));
    if (!Array.isArray(parsed.results)) return [];
    return parsed.results.filter(isCompletedHarnessRun);
  } catch {
    return [];
  }
}

function isCompletedHarnessRun(result: RunResult) {
  return (
    result.claude.terminalReason !== undefined ||
    result.claude.timedOut ||
    result.validation.projectExists ||
    result.claude.durationMs > 10_000
  );
}
