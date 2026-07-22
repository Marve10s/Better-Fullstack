import * as BunContext from "@effect/platform-bun/BunContext";
import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import { chmod, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  CALIBRATION_WEAK_MODEL,
  CLAUDE_TIMEOUT_MS,
  GEN_TIMEOUT_MS,
  HARNESS_VERSION,
  MIN_RANKED_TRIALS,
  PROMPT_VERSION,
  SCAFFBENCH_2_SPECS,
  SCAFFBENCH_SUITE_VERSION,
  VALIDATION_CACHE_VERSION,
  aggregateResults,
  buildGenerationSchedule,
  cacheableValidation,
  calibrationOptions,
  calibrationVerdict,
  classifyOutcome,
  cohortPassRates,
  commandStep,
  configuredPythonTypechecker,
  dotnetValidationTargets,
  expoExportCommand,
  findPythonEntryModule,
  generationTimeoutMs,
  hasTransientNetworkSignature,
  hashProjectSource,
  indexWeightsForPath,
  parseArgs,
  parseClaudeResult,
  parseCodexResult,
  parseOpencodeResult,
  progressEventTime,
  providerForModel,
  publicationEligibility,
  qualityPassed,
  repairPromptFor,
  rollupOutcome,
  runCommand,
  seededShuffle,
  selectRepairFailure,
  specShuffleSeed,
  validateCargoProject,
  validateGoProject,
  validateProject,
  validationCacheKey,
  writeSummary,
  type BenchmarkSpec,
  type RunProvenance,
  type RunResult,
  type ScaffbenchOptions,
  type StepResult,
} from "@/index";

import {
  buildPublishedCells,
  discriminationRows,
  resultTrialKey,
  type PublishedCell,
} from "./build-scaffbench-2-1-data";
import { fullPass, scaffbenchIndex } from "./build-scaffbench-data";

const aiSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ai-search-workbench")!;
const goSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "go-realtime-api")!;

const options = (outDir = "/tmp/scaffbench-hardening"): ScaffbenchOptions => ({
  command: "run",
  model: "gpt-5.6-sol",
  efforts: ["high"],
  paths: ["prompt"],
  specs: [aiSpec.id],
  repeats: 1,
  outDir,
  maxBudgetUsd: "12",
  skipValidation: false,
  generateOnly: false,
  validateExisting: false,
  forceRevalidate: false,
  qualityGate: false,
  doctorCheck: false,
  routeCheck: false,
  promptStyle: "explicit",
  listSpecs: false,
  writeMatrixOnly: false,
  repair: false,
});

const step = (overrides: Partial<StepResult> = {}): StepResult => ({
  command: "bun run build",
  exitCode: 0,
  timedOut: false,
  durationMs: 1,
  stdoutTail: "",
  stderrTail: "",
  ...overrides,
});

function run(overrides: Partial<RunResult> = {}): RunResult {
  return {
    id: "r1",
    specId: aiSpec.id,
    specTitle: aiSpec.title,
    model: "gpt-5.6-sol",
    effort: "high",
    effectiveReasoning: "high",
    path: "prompt",
    trial: 1,
    promptStyle: "explicit",
    runDir: "/tmp/run",
    projectName: "project",
    projectDir: "/tmp/run/project",
    claude: { exitCode: 0, timedOut: false, durationMs: 10, outputTokens: 10 },
    validation: {
      projectExists: true,
      qualityGateRequested: false,
      steps: { build: step() },
    },
    stackScore: { matched: 1, total: 1, percent: 100, misses: [] },
    toolCompliance: { score: 2, total: 2, checks: [] },
    failureTags: [],
    ...overrides,
  };
}

const effectPromise = <A>(effect: Effect.Effect<A, any, any>): Promise<A> =>
  Effect.runPromise(effect.pipe(Effect.provide(BunContext.layer)) as Effect.Effect<A, any, never>);

async function tempDirectory(prefix: string) {
  return mkdtemp(path.join(tmpdir(), prefix));
}

async function executable(filePath: string, body: string) {
  await writeFile(filePath, `#!/bin/sh\nset -eu\n${body}\n`);
  await chmod(filePath, 0o755);
}

async function withFakePath<A>(directory: string, action: () => Promise<A>) {
  const previous = process.env.PATH;
  process.env.PATH = `${directory}${path.delimiter}${previous ?? ""}`;
  try {
    return await action();
  } finally {
    process.env.PATH = previous;
  }
}

const provenance = (overrides: Partial<RunProvenance> = {}): RunProvenance => ({
  suiteVersion: SCAFFBENCH_SUITE_VERSION,
  harnessVersion: HARNESS_VERSION,
  validationCacheVersion: VALIDATION_CACHE_VERSION,
  promptVersion: PROMPT_VERSION,
  agentAdapter: "codex",
  configuredTrials: MIN_RANKED_TRIALS,
  specOrderSeed: 123,
  ...overrides,
});

describe("ScaffBench hardening 1: evidence-backed classification", () => {
  it("1a derives opencode terminal reasons and recognizes the zero-usage/no-tool signature", () => {
    const parsed = parseOpencodeResult(
      [
        `{"sessionID":"s1"}`,
        `{"part":{"type":"step-finish","reason":"unknown","tokens":{"output":0,"reasoning":0},"cost":0}}`,
      ].join("\n"),
    );
    expect(parsed?.terminal_reason).toBe("opencode-unknown-zero-usage-no-tools");
    expect(
      classifyOutcome(
        run({
          projectDir: null,
          claude: {
            exitCode: 1,
            timedOut: false,
            durationMs: 1,
            outputTokens: 0,
            terminalReason: parsed.terminal_reason,
          },
          validation: { projectExists: false, qualityGateRequested: false, steps: {} },
        }),
      ),
    ).toBe("provider-infra");
  });

  it("1b persists fine outcomes while preserving the three-way rollup", async () => {
    expect(rollupOutcome("provider-infra")).toBe("infra-inconclusive");
    expect(rollupOutcome("budget-exhausted")).toBe("model-failure");
    const dir = await tempDirectory("sb-outcome-");
    try {
      const providerFailure = run({
        projectDir: null,
        claude: {
          exitCode: 1,
          timedOut: false,
          durationMs: 1,
          terminalReason: "provider endpoint unavailable",
        },
        validation: { projectExists: false, qualityGateRequested: false, steps: {} },
      });
      await writeSummary(dir, [providerFailure], options(dir), [aiSpec], {});
      const summary = JSON.parse(await readFile(path.join(dir, "summary.json"), "utf8"));
      expect(summary.results[0].outcome).toBe("provider-infra");
      expect(summary.aggregates.leaderboard[0].inconclusiveCount).toBe(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("1c retries a transient install once, marks recurrence, and keeps registry 404 model-owned", async () => {
    const dir = await tempDirectory("sb-retry-");
    try {
      const once = path.join(dir, "once");
      const state = path.join(dir, "state");
      await executable(once, `if [ ! -f "$1" ]; then : > "$1"; echo EAI_AGAIN >&2; exit 1; fi`);
      const recovered = await effectPromise(
        commandStep(once, [state], dir, { retryTransientNetwork: true }),
      );
      expect(recovered.exitCode).toBe(0);
      expect(recovered.retryCount).toBe(1);

      const always = path.join(dir, "always");
      await executable(always, `echo 'registry.npmjs.org HTTP 503' >&2; exit 1`);
      const recurring = await effectPromise(
        commandStep(always, [], dir, { retryTransientNetwork: true }),
      );
      expect(recurring.retryCount).toBe(1);
      expect(recurring.transientNetwork).toBe(true);
      expect(
        hasTransientNetworkSignature(step({ exitCode: 1, stderrTail: "registry npm HTTP 404" })),
      ).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("1d never caches transient failures and always caches green validation", () => {
    expect(
      cacheableValidation({
        projectExists: true,
        qualityGateRequested: false,
        steps: {
          install: step({
            command: "bun install",
            exitCode: 1,
            retryCount: 1,
            transientNetwork: true,
            stderrTail: "EAI_AGAIN",
          }),
        },
      }),
    ).toBe(false);
    expect(
      cacheableValidation({
        projectExists: true,
        qualityGateRequested: false,
        steps: { install: step({ command: "bun install" }) },
      }),
    ).toBe(true);
  });

  it("1e scores core timeouts as model failures while advisory timeouts preserve a core pass", () => {
    const coreTimeout = run({
      validation: {
        projectExists: true,
        qualityGateRequested: false,
        steps: { build: step({ exitCode: null, timedOut: true }) },
      },
    });
    expect(classifyOutcome(coreTimeout)).toBe("model-failure");
    const advisoryTimeout = run({
      validation: {
        projectExists: true,
        qualityGateRequested: true,
        steps: {
          build: step(),
          test: step({ command: "bun test", exitCode: null, timedOut: true }),
        },
      },
    });
    expect(classifyOutcome(advisoryTimeout)).toBe("success");
    expect(qualityPassed(advisoryTimeout)).toBe(false);
  });

  it("1f separates project exit 127 from a spawn-level missing toolchain and records its code", async () => {
    const missing = await effectPromise(
      runCommand("scaffbench-definitely-missing", [], process.cwd(), 500),
    );
    expect(missing.spawnError).toBe(true);
    expect(missing.spawnErrorCode).toBeTruthy();
    const project127 = run({
      validation: {
        projectExists: true,
        qualityGateRequested: false,
        steps: { build: step({ exitCode: 127, spawnError: false }) },
      },
    });
    expect(classifyOutcome(project127)).toBe("model-failure");
  });
});

describe("ScaffBench hardening 2: timeout and accounting", () => {
  it("2a salvages usage from partial Claude, Codex, and opencode streams", () => {
    const claude = parseClaudeResult(
      `{"type":"assistant","message":{"usage":{"output_tokens":17}},"session_id":"c1"}`,
    );
    expect(claude?.usage.output_tokens).toBe(17);
    const codex = parseCodexResult(
      [
        `{"type":"thread.started","thread_id":"t"}`,
        `{"type":"turn.completed","usage":{"output_tokens":2,"reasoning_output_tokens":3}}`,
        `{"type":"turn.completed","usage":{"output_tokens":5,"reasoning_output_tokens":7}}`,
      ].join("\n"),
    );
    expect(codex?.usage.output_tokens).toBe(12);
    const opencode = parseOpencodeResult(
      `{"part":{"type":"step-finish","reason":"tool-calls","tokens":{"output":4,"reasoning":6},"cost":1}}`,
    );
    expect(opencode?.usage.output_tokens).toBe(10);
  });

  it("2b tags hard timeouts as progressing when a recent tool event was observed", async () => {
    expect(
      progressEventTime(
        `{"type":"item.completed","item":{"type":"command_execution","command":"x"}}`,
        123,
      ),
    ).toBe(123);
    const result = await effectPromise(
      runCommand(
        "/bin/sh",
        [
          "-c",
          `printf '%s\\n' '{"type":"item.completed","item":{"type":"command_execution","command":"x"}}'; sleep 1`,
        ],
        process.cwd(),
        80,
        { idleTimeoutMs: 500 },
      ),
    );
    expect(result.timeoutKind).toBe("hard");
    expect(result.timeoutProgress).toBe("timeout-progressing");
  });

  it("2c kills stdout-idle generations separately and tags them stuck", async () => {
    const result = await effectPromise(
      runCommand("/bin/sh", ["-c", "sleep 1"], process.cwd(), 500, { idleTimeoutMs: 40 }),
    );
    expect(result.timedOut).toBe(true);
    expect(result.timeoutKind).toBe("idle");
    expect(result.timeoutProgress).toBe("timeout-stuck");
  });

  it("2d applies per-spec timeout scaling and retains the legacy alias", () => {
    expect(generationTimeoutMs({ timeoutMultiplier: 1.5 })).toBe(GEN_TIMEOUT_MS * 1.5);
    expect(generationTimeoutMs({})).toBe(GEN_TIMEOUT_MS);
    expect(CLAUDE_TIMEOUT_MS).toBe(GEN_TIMEOUT_MS);
  });

  it("2e records enforcement policy and detects post-hoc non-Claude budget exhaustion", () => {
    const overBudget = run({
      budgetPolicy: { budgetEnforced: false, maxBudgetUsd: 2 },
      claude: { exitCode: 0, timedOut: false, durationMs: 1, totalCostUsd: 2.51 },
    });
    expect(classifyOutcome(overBudget)).toBe("budget-exhausted");
    expect(overBudget.budgetPolicy).toEqual({ budgetEnforced: false, maxBudgetUsd: 2 });
  });
});

describe("ScaffBench hardening 3: scoring", () => {
  it("3a uses prompt and assisted path-specific weights everywhere", () => {
    expect(indexWeightsForPath("prompt")).toEqual({
      validation: 0.75,
      wiredLibs: 0.25,
      discipline: 0,
    });
    expect(scaffbenchIndex("prompt", 50, 80, 0)).toBe(57.5);
    expect(scaffbenchIndex("mcp", 50, 80, 50)).toBe(57.5);
  });

  it("3b gates a zero-validation prompt cell at exactly 25% of wired mean", () => {
    const failed = run({
      validation: {
        projectExists: true,
        qualityGateRequested: false,
        steps: { build: step({ exitCode: 1 }) },
      },
      stackScore: { matched: 1, total: 1, percent: 100, misses: [] },
      toolCompliance: { score: 2, total: 2, checks: [] },
    });
    expect(aggregateResults([failed]).leaderboard[0]?.index).toBe(25);
  });

  it("3c computes wired and discipline components over the same scored trials", () => {
    const measured = run({
      id: "measured",
      stackScore: { matched: 0, total: 1, percent: 0, misses: ["x"] },
      toolCompliance: { score: 0, total: 2, checks: [] },
    });
    const infra = run({
      id: "infra",
      trial: 2,
      stackScore: { matched: 1, total: 1, percent: 100, misses: [] },
      validation: {
        projectExists: true,
        qualityGateRequested: false,
        steps: { build: step({ exitCode: 127, spawnError: true, spawnErrorCode: "ENOENT" }) },
      },
    });
    const aggregate = aggregateResults([measured, infra]).leaderboard[0]!;
    expect(aggregate.scoredRuns).toBe(1);
    expect(aggregate.stackPercent).toBe(0);
    expect(aggregate.commandDisciplinePercent).toBe(0);
  });

  it("3d represents an unrequested quality gate as na/null, never pass", () => {
    const unrequested = run();
    expect(qualityPassed(unrequested)).toBe("na");
    expect(fullPass(unrequested)).toBeNull();
  });
});

describe("ScaffBench hardening 4: trial integrity", () => {
  it("4a keys every trial and publishes aggregate repeat statistics", () => {
    const results = [run({ id: "a", trial: 1 }), run({ id: "b", trial: 2 })];
    results[1]!.validation = {
      projectExists: true,
      qualityGateRequested: false,
      steps: { build: step({ exitCode: 1 }) },
    };
    expect(new Set(results.map(resultTrialKey)).size).toBe(2);
    const summary = {
      options: options(),
      results,
      aggregates: {
        bySpecCell: [
          {
            model: "gpt-5.6-sol",
            effort: "high",
            path: "prompt",
            specId: aiSpec.id,
            scoredRuns: 2,
            passCount: 1,
            qualityScoredRuns: 0,
            qualityPassCount: 0,
            stackPercent: 50,
            commandDisciplinePercent: 100,
            avgOutputTokens: 10,
            medianDurationMs: 10,
          },
        ],
      },
    };
    const cell = buildPublishedCells(summary, "/missing")[0]!;
    expect(cell).toMatchObject({
      trials: 2,
      scoredTrials: 2,
      passCount: 1,
      passRate: 50,
      passAny: true,
      passAll: false,
      corePass: false,
    });
  });

  it("4b interleaves repeat rounds and uses a deterministic seeded shuffle", () => {
    const specs = [aiSpec, goSpec];
    const schedule = buildGenerationSchedule(
      specs,
      { repeats: 2, efforts: ["high"], paths: ["prompt"] },
      99,
    );
    expect(schedule.slice(0, 2).every((entry) => entry.trial === 1)).toBe(true);
    expect(schedule.slice(2).every((entry) => entry.trial === 2)).toBe(true);
    expect(seededShuffle(specs, 99).map((spec) => spec.id)).toEqual(
      seededShuffle(specs, 99).map((spec) => spec.id),
    );
    expect(specShuffleSeed(options())).toBe(specShuffleSeed(options()));
  });

  it("4c marks only version-consistent rows with at least three trials as ranked", () => {
    const ranked = Array.from({ length: 3 }, (_, index) =>
      run({ id: `r${index}`, trial: index + 1, provenance: provenance() }),
    );
    expect(publicationEligibility(ranked)).toBe("ranked");
    expect(
      publicationEligibility([
        ...ranked.slice(0, 2),
        run({ id: "mixed", trial: 3, provenance: provenance({ promptVersion: "old" }) }),
      ]),
    ).toBe("exploratory");
  });
});

describe("ScaffBench hardening 5: validator v4", () => {
  it("5a prefers a solution and otherwise exposes every csproj target", async () => {
    const dir = await tempDirectory("sb-dotnet-");
    try {
      await mkdir(path.join(dir, "a"));
      await mkdir(path.join(dir, "b"));
      await writeFile(path.join(dir, "a", "A.csproj"), "<Project />");
      await writeFile(path.join(dir, "b", "B.csproj"), "<Project />");
      expect(await dotnetValidationTargets(dir)).toMatchObject({ kind: "projects" });
      expect((await dotnetValidationTargets(dir)).targets).toHaveLength(2);
      await writeFile(path.join(dir, "All.slnx"), "<Solution />");
      expect(await dotnetValidationTargets(dir)).toEqual({
        kind: "solution",
        targets: [path.join(dir, "All.slnx")],
        uncoveredProjects: [path.join(dir, "a", "A.csproj"), path.join(dir, "b", "B.csproj")],
      });
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("5b runs configured Python typecheckers or finds a src-layout import target", async () => {
    const dir = await tempDirectory("sb-python-");
    try {
      await writeFile(
        path.join(dir, "pyproject.toml"),
        "[tool.pyright]\ntypeCheckingMode='strict'\n",
      );
      expect(await configuredPythonTypechecker(dir)).toBe("pyright");
      await writeFile(path.join(dir, "pyproject.toml"), "[project]\nname='demo'\n");
      await mkdir(path.join(dir, "src", "demo"), { recursive: true });
      await writeFile(path.join(dir, "src", "demo", "__init__.py"), "import missing_dependency\n");
      expect(await findPythonEntryModule(dir)).toBe("demo");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("5c invokes cargo check with workspace and all-target coverage", async () => {
    const dir = await tempDirectory("sb-cargo-");
    const bin = path.join(dir, "bin");
    const log = path.join(dir, "commands.log");
    try {
      await mkdir(bin);
      await writeFile(path.join(dir, "Cargo.toml"), "[workspace]\nmembers=[]\n");
      await executable(path.join(bin, "cargo"), `echo "$*" >> "$SCAFFBENCH_TEST_LOG"`);
      process.env.SCAFFBENCH_TEST_LOG = log;
      await withFakePath(bin, () => effectPromise(validateCargoProject(dir, options(dir))));
      expect(await readFile(log, "utf8")).toContain("check --workspace --all-targets");
    } finally {
      delete process.env.SCAFFBENCH_TEST_LOG;
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("5d uses go mod download + build and performs tidy only on an advisory copy", async () => {
    const dir = await tempDirectory("sb-go-");
    const bin = path.join(dir, "bin");
    const log = path.join(dir, "commands.log");
    const goMod = "module example.com/demo\n\ngo 1.24\n";
    try {
      await mkdir(bin);
      await writeFile(path.join(dir, "go.mod"), goMod);
      await executable(path.join(bin, "go"), `echo "$PWD :: $*" >> "$SCAFFBENCH_TEST_LOG"`);
      process.env.SCAFFBENCH_TEST_LOG = log;
      const result = await withFakePath(bin, () =>
        effectPromise(validateGoProject(dir, options(dir))),
      );
      const commands = await readFile(log, "utf8");
      expect(commands).toContain("mod download");
      expect(commands).toContain("build ./...");
      expect(commands).toContain("mod tidy");
      expect(result.tidy?.command).toContain("advisory diff");
      expect(await readFile(path.join(dir, "go.mod"), "utf8")).toBe(goMod);
    } finally {
      delete process.env.SCAFFBENCH_TEST_LOG;
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("5e plans a non-interactive Expo export and preserves exit-126 diagnostics", async () => {
    expect(
      expoExportCommand({ dependencies: { expo: "^55", "react-native-web": "^0.21" } }),
    ).toMatchObject({ command: "npx", args: ["expo", "export", "--platform", "web"] });
    expect(expoExportCommand({ dependencies: { expo: "^55" } })?.args).toEqual(["expo", "export"]);
    const denied = await effectPromise(
      runCommand(
        "/bin/sh",
        ["-c", "echo 'expo command denied' >&2; exit 126"],
        process.cwd(),
        500,
      ),
    );
    expect(denied.exitCode).toBe(126);
    expect(denied.stderrTail).toContain("expo command denied");
  });

  it("5f executes spec-declared prerequisites in order before manifest validation", async () => {
    const dir = await tempDirectory("sb-prereq-");
    const log = path.join(dir, "order.log");
    try {
      const one = path.join(dir, "one");
      const two = path.join(dir, "two");
      await executable(one, `echo one >> "$1"`);
      await executable(two, `echo two >> "$1"`);
      const spec: BenchmarkSpec = {
        ...aiSpec,
        id: "prerequisite-test",
        prerequisiteCommands: [
          [one, log],
          [two, log],
        ],
      };
      const validation = await effectPromise(validateProject(spec, dir, options(dir)));
      expect(await readFile(log, "utf8")).toBe("one\ntwo\n");
      expect(Object.keys(validation.steps).slice(0, 2)).toEqual([
        `prerequisite:01:${one}`,
        `prerequisite:02:${two}`,
      ]);
      const frontier = SCAFFBENCH_2_SPECS.find(
        (candidate) => candidate.id === "frontier-polyglot-proto",
      )!;
      expect(frontier.prerequisiteCommands?.[0]).toEqual(["buf", "generate"]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("5g validates more than three independent roots without a silent cap", async () => {
    const dir = await tempDirectory("sb-roots-");
    const bin = path.join(dir, "bin");
    try {
      await mkdir(bin);
      await executable(path.join(bin, "go"), ":");
      for (let index = 0; index < 4; index += 1) {
        const root = path.join(dir, `module-${index}`);
        await mkdir(root);
        await writeFile(path.join(root, "go.mod"), `module example.com/m${index}\n`);
      }
      const validation = await withFakePath(bin, () =>
        effectPromise(validateProject(goSpec, dir, options(dir))),
      );
      expect(Object.keys(validation.steps).filter((key) => key.endsWith(":build"))).toHaveLength(4);
      expect(Object.keys(validation.steps).some((key) => key.includes("unvalidated"))).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("5h includes environment/toolchains, file modes, and symlink targets in cache identity", async () => {
    const dir = await tempDirectory("sb-hash-");
    try {
      const file = path.join(dir, "script.sh");
      await writeFile(file, "echo ok\n");
      const first = await Effect.runPromise(hashProjectSource(dir));
      await chmod(file, 0o755);
      const second = await Effect.runPromise(hashProjectSource(dir));
      expect(second).not.toBe(first);
      await symlink("script.sh", path.join(dir, "link"));
      const third = await Effect.runPromise(hashProjectSource(dir));
      expect(third).not.toBe(second);
      const base = validationCacheKey(
        aiSpec,
        options(dir),
        third,
        { go: "go1" },
        { platform: "x", arch: "a" },
      );
      expect(
        validationCacheKey(
          aiSpec,
          options(dir),
          third,
          { go: "go2" },
          { platform: "x", arch: "a" },
        ),
      ).not.toBe(base);
      expect(
        validationCacheKey(
          aiSpec,
          options(dir),
          third,
          { go: "go1" },
          { platform: "y", arch: "a" },
        ),
      ).not.toBe(base);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("ScaffBench hardening 6: opt-in batch-4 features", () => {
  it("6a keeps repair off by default and builds a bounded same-cell repair prompt", () => {
    expect(parseArgs([]).repair).toBe(false);
    expect(parseArgs(["--repair"]).repair).toBe(true);
    const failing = run({
      validation: {
        projectExists: true,
        qualityGateRequested: false,
        steps: {
          build: step({
            exitCode: 1,
            stderrTail: Array.from({ length: 80 }, (_, index) => `line-${index}`).join("\n"),
          }),
        },
      },
    });
    const failure = selectRepairFailure(failing)!;
    const prompt = repairPromptFor(failure[0], failure[1]);
    const diagnosticLines = prompt.split("Failing-step stderr tail:\n")[1]!.split("\n");
    expect(diagnosticLines).toHaveLength(50);
    expect(prompt).toContain("line-79");
    expect(prompt).not.toContain("line-0\n");
  });

  it("6b parses calibrate and applies the weak-fails/strong-passes keep rule", () => {
    const parsed = parseArgs(["calibrate", "--spec", aiSpec.id]);
    expect(parsed.command).toBe("calibrate");
    expect(parsed.specs).toEqual([aiSpec.id]);
    expect(calibrationOptions(parsed).weak.model).toBe(CALIBRATION_WEAK_MODEL);
    expect(calibrationVerdict("model-failure", "success")).toBe("keep");
    expect(calibrationVerdict("success", "success")).toBe("cut");
    expect(calibrationVerdict("provider-infra", "success")).toBe("inconclusive");
  });

  it("6c backfills ISO introduction dates and reports cohort pass rates", () => {
    expect(SCAFFBENCH_2_SPECS.every((spec) => /^\d{4}-\d{2}-\d{2}$/.test(spec.introducedAt))).toBe(
      true,
    );
    const cohorts = cohortPassRates(
      [
        run(),
        run({
          id: "failed",
          specId: goSpec.id,
          validation: {
            projectExists: true,
            qualityGateRequested: false,
            steps: { build: step({ exitCode: 1 }) },
          },
        }),
      ],
      [aiSpec, goSpec],
    );
    expect(cohorts[0]).toMatchObject({ specs: 2, scoredRuns: 2, passCount: 1, passRate: 50 });
  });

  it("6d reports per-spec model spread and flags ceiling/floor specs", () => {
    const cell = (spec: string, modelKey: string, passRate: number): PublishedCell => ({
      modelKey,
      path: "prompt",
      spec,
      scored: true,
      corePass: passRate === 100,
      fullPass: null,
      trials: 1,
      scoredTrials: 1,
      passCount: passRate > 0 ? 1 : 0,
      passRate,
      passAny: passRate > 0,
      passAll: passRate === 100,
      qualityPassCount: null,
      qualityPassRate: null,
      wiredPct: 0,
      cmdPct: 0,
      costUsd: null,
      outTokens: null,
      steps: 0,
      durationMs: null,
      lines: null,
    });
    const rows = discriminationRows([
      cell("ceiling", "a", 100),
      cell("ceiling", "b", 100),
      cell("floor", "a", 0),
      cell("floor", "b", 0),
      cell("spread", "a", 100),
      cell("spread", "b", 0),
    ]);
    expect(rows.find((row) => row.spec === "ceiling")?.flag).toBe("ceiling");
    expect(rows.find((row) => row.spec === "floor")?.flag).toBe("floor");
    expect(rows.find((row) => row.spec === "spread")?.spread).toBe(100);
  });
});

it("routes kilocode/ ids to the kilo binary with the prefix stripped at invocation", () => {
  expect(providerForModel("kilocode/openai/gpt-5.6-luna")).toBe("kilo");
  expect(providerForModel("kilo/openai/gpt-5.6-luna")).toBe("kilo");
  expect(providerForModel("openai/gpt-5.6-luna")).toBe("opencode");
});
