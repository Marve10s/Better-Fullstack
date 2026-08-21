import * as BunContext from "@effect/platform-bun/BunContext";
import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  SCAFFBENCH_2_SPECS,
  agentRunCommandOptions,
  aggregateResults,
  assertResumeProtocol,
  buildGenerationSchedule,
  buildRunId,
  classifyOutcome,
  findCompletedTrial,
  hasTransientNetworkSignature,
  parseClaudeResult,
  parseCodexResult,
  parseOpencodeResult,
  promptFor,
  runCommand,
  validateProject,
  writeSummary,
  type BenchmarkSpec,
  type RunResult,
  type ScaffbenchOptions,
  type StepResult,
} from "@/index";

import { buildPublishedCells } from "./build-scaffbench-2-1-data";
import { normalizeExistingCell } from "./splice-scaffbench-2-1";

const aiSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ai-search-workbench")!;
const cargoSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "rust-leptos-axum")!;
const dotnetSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "dotnet-blazor-cqrs")!;
const expoSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "react-native-expo")!;
const goSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "go-realtime-api")!;

const options = (outDir = "/tmp/scaffbench-hardening-round-2"): ScaffbenchOptions => ({
  command: "run",
  model: "gpt-5.6-sol",
  efforts: ["high"],
  paths: ["prompt"],
  specs: [aiSpec.id],
  repeats: 1,
  outDir,
  maxBudgetUsd: "2",
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

describe("ScaffBench hardening round 2", () => {
  it("A counts a scored stepless failure and rejects aggregate mismatches", () => {
    const results = [
      run({
        id: "failed-no-project",
        trial: 1,
        outcome: "model-failure",
        projectDir: null,
        validation: { projectExists: false, qualityGateRequested: false, steps: {} },
      }),
      run({ id: "pass-2", trial: 2, outcome: "success" }),
      run({ id: "pass-3", trial: 3, outcome: "success" }),
    ];
    const aggregate = {
      model: "gpt-5.6-sol",
      effort: "high",
      path: "prompt",
      specId: aiSpec.id,
      runs: 3,
      scoredRuns: 3,
      passCount: 2,
      qualityScoredRuns: 0,
      qualityPassCount: 0,
      stackPercent: 100,
      commandDisciplinePercent: 100,
      avgOutputTokens: 10,
      medianDurationMs: 10,
    };
    const summary = {
      options: options(),
      results,
      aggregates: { bySpecCell: [aggregate] },
    };

    expect(buildPublishedCells(summary, "/missing")[0]).toMatchObject({
      trials: 3,
      scoredTrials: 3,
      passCount: 2,
      passRate: 67,
      passAny: true,
      passAll: false,
    });
    expect(() =>
      buildPublishedCells(
        {
          ...summary,
          aggregates: { bySpecCell: [{ ...aggregate, passCount: 3 }] },
        },
        "/mismatch",
      ),
    ).toThrow(/passCount/i);
  });

  it("B preserves null quality through splice normalization", () => {
    const normalized = normalizeExistingCell({
      modelKey: "m|high",
      path: "prompt",
      spec: "s",
      scored: true,
      corePass: true,
      fullPass: null,
      wiredPct: 100,
      cmdPct: 100,
      costUsd: null,
      outTokens: null,
      steps: 1,
    } as never);
    expect(normalized.qualityPassCount).toBeNull();
    expect(normalized.qualityPassRate).toBeNull();
  });

  it("C snapshots a non-contradictory install policy for every path mode", () => {
    const snapshot: Record<string, string[]> = {};
    for (const pathMode of ["prompt", "mcp"] as const) {
      const prompts = SCAFFBENCH_2_SPECS.map((spec) =>
        promptFor(spec, pathMode, "/tmp/scaffbench-prompt-snapshot", "project", "explicit"),
      );
      for (const prompt of prompts) {
        expect(prompt).not.toMatch(
          /\b(?:do not|don't|must not|never|without)\s+(?:install|installing)\b/i,
        );
      }
      snapshot[pathMode] = [
        ...new Set(
          prompts.flatMap((prompt) => prompt.split("\n").filter((line) => /install/i.test(line))),
        ),
      ];
    }
    const allowed =
      "You may install dependencies, query package registries, run builds or type checks, and start servers to verify your work before finishing — the project is graded by whether it installs and builds on a clean machine. Kill every process you start; nothing may still be running when you finish.";
    expect(snapshot).toEqual({
      prompt: [allowed],
      mcp: [allowed],
    });
  });

  it("D treats stderr as activity and suspends idle kill during an in-flight tool", async () => {
    expect(agentRunCommandOptions("agy", 45)).toEqual({});
    for (const adapter of ["claude", "codex", "opencode", "kilo"] as const) {
      expect(agentRunCommandOptions(adapter, 45)).toEqual({ idleTimeoutMs: 45 });
    }
    const stderrActive = await effectPromise(
      runCommand(
        "/bin/sh",
        ["-c", "i=0; while [ $i -lt 5 ]; do echo tick >&2; sleep 0.025; i=$((i+1)); done"],
        process.cwd(),
        500,
        { idleTimeoutMs: 45 },
      ),
    );
    expect(stderrActive.timedOut).toBe(false);

    const inFlight = await effectPromise(
      runCommand(
        "/bin/sh",
        [
          "-c",
          `printf '%s\\n' '{"type":"item.started","item":{"id":"tool-1","type":"command_execution"}}'; sleep 0.12; printf '%s\\n' '{"type":"item.completed","item":{"id":"tool-1","type":"command_execution"}}'`,
        ],
        process.cwd(),
        500,
        { idleTimeoutMs: 45 },
      ),
    );
    expect(inFlight.timedOut).toBe(false);

    const buffered = await effectPromise(
      runCommand("/bin/sh", ["-c", "sleep 0.08; echo buffered"], process.cwd(), 500),
    );
    expect(buffered.timedOut).toBe(false);
    expect(buffered.stdout).toContain("buffered");
  });

  it("E rejects adversarial transient/provider false positives and requires retry evidence", () => {
    expect(
      hasTransientNetworkSignature(
        step({ stderrTail: "https://registry.npmjs.org package summary: 531 packages installed" }),
      ),
    ).toBe(false);
    expect(
      hasTransientNetworkSignature(
        step({ stderrTail: "resolved tool version 0.429.1 from registry.npmjs.org" }),
      ),
    ).toBe(false);
    expect(
      hasTransientNetworkSignature(
        step({
          stderrTail:
            "registry.npmjs.org HTTP 404: missing version\nregistry.npmjs.org fetch error status 503",
        }),
      ),
    ).toBe(true);
    expect(
      hasTransientNetworkSignature(
        step({ stderrTail: "registry.npmjs.org fetch error HTTP 429 too many requests" }),
      ),
    ).toBe(true);

    const lifecycleNoise = run({
      validation: {
        projectExists: true,
        qualityGateRequested: false,
        steps: {
          install: step({
            exitCode: 1,
            stderrTail:
              "npm fetch error status 429 from registry.npmjs.org\nEAI_AGAIN registry.npmjs.org",
          }),
        },
      },
    });
    expect(classifyOutcome(lifecycleNoise)).toBe("model-failure");
    expect(
      classifyOutcome(
        run({
          validation: {
            projectExists: true,
            qualityGateRequested: false,
            steps: {
              install: step({
                exitCode: 1,
                retryCount: 1,
                transientNetwork: true,
                stderrTail: "registry.npmjs.org fetch error HTTP 503",
              }),
            },
          },
        }),
      ),
    ).toBe("validation-infra");

    for (const terminalReason of [
      "capacity planning prose for a future release",
      "trace identifier 14293 recorded",
    ]) {
      expect(
        classifyOutcome(
          run({
            projectDir: null,
            claude: { exitCode: 1, timedOut: false, durationMs: 1, terminalReason },
            validation: { projectExists: false, qualityGateRequested: false, steps: {} },
          }),
        ),
      ).toBe("model-failure");
    }
  });

  it("F keeps an opencode zero-usage refusal with assistant text model-owned", () => {
    const parsed = parseOpencodeResult(
      [
        `{"sessionID":"s1"}`,
        `{"part":{"type":"text","text":"I cannot comply with that request."}}`,
        `{"part":{"type":"step-finish","reason":"unknown","tokens":{"output":0,"reasoning":0},"cost":0}}`,
      ].join("\n"),
    );
    expect(parsed?.terminal_reason).not.toBe("opencode-unknown-zero-usage-no-tools");
    expect(
      classifyOutcome(
        run({
          projectDir: null,
          claude: {
            exitCode: 1,
            timedOut: false,
            durationMs: 1,
            outputTokens: 0,
            terminalReason: parsed?.terminal_reason,
          },
          validation: { projectExists: false, qualityGateRequested: false, steps: {} },
        }),
      ),
    ).toBe("model-failure");
  });

  it("G builds a preferred .NET solution plus an uncovered orphan project", async () => {
    const dir = await tempDirectory("sb-r2-dotnet-");
    const bin = path.join(dir, "bin");
    const log = path.join(dir, "dotnet.log");
    try {
      await mkdir(bin);
      await mkdir(path.join(dir, "src"));
      await mkdir(path.join(dir, "orphan"));
      await writeFile(path.join(dir, "src", "Included.csproj"), "<Project />");
      await writeFile(path.join(dir, "orphan", "Orphan.csproj"), "<Project />");
      await writeFile(
        path.join(dir, "All.sln"),
        'Project("{A}") = "Included", "src\\\\Included.csproj", "{B}"\nEndProject\n',
      );
      await executable(
        path.join(bin, "dotnet"),
        'echo "$PWD :: $*" >> "$SCAFFBENCH_TEST_LOG"',
      );
      process.env.SCAFFBENCH_TEST_LOG = log;
      const validation = await withFakePath(bin, () =>
        effectPromise(validateProject(dotnetSpec, dir, options(dir))),
      );
      const commands = await readFile(log, "utf8");
      expect(commands).toContain("All.sln");
      expect(commands).toContain("Orphan.csproj");
      expect(Object.keys(validation.steps).some((key) => /orphan.*dotnetBuild/i.test(key))).toBe(
        true,
      );
    } finally {
      delete process.env.SCAFFBENCH_TEST_LOG;
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("G2 ignores module-format marker package.json files as bun roots", async () => {
    const dir = await tempDirectory("sb-r2-marker-root-");
    try {
      const markerDir = path.join(dir, "apps", "web", "src", "paraglide", "messages");
      await mkdir(markerDir, { recursive: true });
      await mkdir(path.join(dir, "apps", "web"), { recursive: true });
      await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify({ private: true, workspaces: ["apps/*"], scripts: { build: "true" } }),
      );
      await writeFile(
        path.join(dir, "apps", "web", "package.json"),
        JSON.stringify({ name: "web", version: "1.0.0", scripts: { build: "true" } }),
      );
      await writeFile(
        path.join(markerDir, "package.json"),
        JSON.stringify({ type: "module", sideEffects: false }),
      );
      const validation = await effectPromise(
        validateProject(aiSpec, dir, { ...options(dir), qualityGate: true }),
      );
      expect(
        Object.keys(validation.steps).some((key) => key.includes("paraglide")),
      ).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("G validates broken nested bun and Cargo roots outside parent membership", async () => {
    const bunDir = await tempDirectory("sb-r2-bun-members-");
    const cargoDir = await tempDirectory("sb-r2-cargo-members-");
    const bin = path.join(cargoDir, "bin");
    try {
      await mkdir(path.join(bunDir, "packages", "member"), { recursive: true });
      await mkdir(path.join(bunDir, "tools", "broken"), { recursive: true });
      await writeFile(
        path.join(bunDir, "package.json"),
        JSON.stringify({ private: true, workspaces: ["packages/*"], scripts: { build: "true" } }),
      );
      await writeFile(
        path.join(bunDir, "packages", "member", "package.json"),
        JSON.stringify({ name: "member", version: "1.0.0" }),
      );
      await writeFile(
        path.join(bunDir, "tools", "broken", "package.json"),
        JSON.stringify({ name: "broken", version: "1.0.0", scripts: { build: "exit 9" } }),
      );
      const bunValidation = await effectPromise(validateProject(aiSpec, bunDir, options(bunDir)));
      expect(
        Object.entries(bunValidation.steps).some(
          ([key, value]) => key.startsWith("tools/broken:") && value?.exitCode !== 0,
        ),
      ).toBe(true);

      await mkdir(bin);
      await mkdir(path.join(cargoDir, "crates", "member"), { recursive: true });
      await mkdir(path.join(cargoDir, "tools", "broken"), { recursive: true });
      await writeFile(
        path.join(cargoDir, "Cargo.toml"),
        '[workspace]\nmembers = ["crates/*"]\n',
      );
      await writeFile(
        path.join(cargoDir, "crates", "member", "Cargo.toml"),
        '[package]\nname="member"\nversion="0.1.0"\n',
      );
      await writeFile(
        path.join(cargoDir, "tools", "broken", "Cargo.toml"),
        '[package]\nname="broken"\nversion="0.1.0"\n',
      );
      await executable(
        path.join(bin, "cargo"),
        'case "$PWD" in */tools/broken) exit 9 ;; *) exit 0 ;; esac',
      );
      const cargoValidation = await withFakePath(bin, () =>
        effectPromise(validateProject(cargoSpec, cargoDir, options(cargoDir))),
      );
      expect(
        Object.entries(cargoValidation.steps).some(
          ([key, value]) => key.startsWith("tools/broken:") && value?.exitCode === 9,
        ),
      ).toBe(true);
    } finally {
      await rm(bunDir, { recursive: true, force: true });
      await rm(cargoDir, { recursive: true, force: true });
    }
  });

  it("H caps validation roots and emits a failing step for overflow", async () => {
    const dir = await tempDirectory("sb-r2-root-cap-");
    const bin = path.join(dir, "bin");
    try {
      await mkdir(bin);
      await executable(path.join(bin, "go"), ":");
      for (let index = 0; index < 13; index += 1) {
        const root = path.join(dir, `module-${index}`);
        await mkdir(root);
        await writeFile(path.join(root, "go.mod"), `module example.com/m${index}\n`);
      }
      const validation = await withFakePath(bin, () =>
        effectPromise(validateProject(goSpec, dir, options(dir))),
      );
      expect(Object.keys(validation.steps).filter((key) => key.endsWith(":build"))).toHaveLength(
        12,
      );
      const overflow = Object.entries(validation.steps).find(([key]) =>
        key.startsWith("unvalidated:"),
      );
      expect(overflow?.[1]?.exitCode).toBe(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("H enforces a total validation deadline with explicit failure evidence", async () => {
    const dir = await tempDirectory("sb-r2-deadline-");
    try {
      const slow = path.join(dir, "slow");
      await executable(slow, "sleep 1");
      const spec: BenchmarkSpec = { ...aiSpec, prerequisiteCommands: [[slow]] };
      const started = Date.now();
      const validation = (await effectPromise(
        (validateProject as any)(spec, dir, options(dir), { deadlineMs: 45 }),
      )) as RunResult["validation"];
      expect(Date.now() - started).toBeLessThan(500);
      expect(validation.steps["unvalidated:deadline"]?.exitCode).toBe(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("I always suffixes run IDs and prevents same-spec cross-round adjacency", () => {
    expect(buildRunId(aiSpec, "gpt-5.6-sol", "high", "prompt", 1, 1)).toEndWith("-r01");
    const specs = [aiSpec, goSpec];
    for (let seed = 0; seed < 20; seed += 1) {
      const schedule = buildGenerationSchedule(
        specs,
        { repeats: 3, efforts: ["high"], paths: ["prompt"] },
        seed,
      );
      for (let index = 1; index < schedule.length; index += 1) {
        const previous = schedule[index - 1]!;
        const current = schedule[index]!;
        if (previous.trial !== current.trial) expect(current.spec.id).not.toBe(previous.spec.id);
      }
    }
  });

  it("I resumes a legacy trial 1 when repeat count grows and rejects unaligned artifacts", () => {
    const schedule = buildGenerationSchedule(
      [aiSpec],
      { repeats: 2, efforts: ["high"], paths: ["prompt"] },
      99,
    );
    const legacy = run({
      id: `${aiSpec.id}-gpt-5.6-sol-high-prompt`,
      trial: 1,
      outcome: "success",
    });
    expect(
      findCompletedTrial([legacy], aiSpec, "gpt-5.6-sol", "high", "prompt", 1)?.id,
    ).toBe(legacy.id);
    expect(() =>
      assertResumeProtocol({
        recorded: { repeats: 1, seed: 99 },
        current: { repeats: 2, seed: 99 },
        results: [legacy],
        schedule,
        model: "gpt-5.6-sol",
      }),
    ).not.toThrow();

    const unaligned = run({
      id: `${aiSpec.id}-gpt-5.6-sol-high-prompt-r03`,
      trial: 3,
      outcome: "success",
    });
    expect(() =>
      assertResumeProtocol({
        recorded: { repeats: 3, seed: 99 },
        current: { repeats: 2, seed: 99 },
        results: [legacy, unaligned],
        schedule,
        model: "gpt-5.6-sol",
      }),
    ).toThrow(/runProtocol conflict/);
  });

  it("J tolerates estimated cost through 1.25x and persists estimated evidence above it", async () => {
    const dir = await tempDirectory("sb-r2-budget-");
    try {
      const boundary = run({
        id: "boundary",
        budgetPolicy: { budgetEnforced: false, maxBudgetUsd: 2 },
        claude: { exitCode: 0, timedOut: false, durationMs: 1, totalCostUsd: 2.5 },
      });
      const exceeded = run({
        id: "exceeded",
        trial: 2,
        budgetPolicy: { budgetEnforced: false, maxBudgetUsd: 2 },
        claude: { exitCode: 0, timedOut: false, durationMs: 1, totalCostUsd: 2.5001 },
      });
      expect(classifyOutcome(boundary)).toBe("success");
      expect(classifyOutcome(exceeded)).toBe("budget-exhausted");
      await writeSummary(dir, [boundary, exceeded], options(dir), [aiSpec], {});
      const summary = JSON.parse(await readFile(path.join(dir, "summary.json"), "utf8"));
      expect(summary.results[0].outcomeEvidence?.budgetEstimated).not.toBe(true);
      expect(summary.results[1].outcomeEvidence?.budgetEstimated).toBe(true);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("K sums partial Claude messages and detects cumulative versus delta Codex usage", () => {
    const claude = parseClaudeResult(
      [
        `{"type":"assistant","message":{"usage":{"output_tokens":4}},"session_id":"c1"}`,
        `{"type":"assistant","message":{"usage":{"output_tokens":6}},"session_id":"c1"}`,
      ].join("\n"),
    );
    expect(claude?.usage.output_tokens).toBe(10);

    const cumulative = parseCodexResult(
      [
        `{"type":"turn.completed","usage":{"output_tokens":2,"reasoning_output_tokens":3}}`,
        `{"type":"turn.completed","usage":{"output_tokens":5,"reasoning_output_tokens":7}}`,
      ].join("\n"),
    );
    expect(cumulative?.usage.output_tokens).toBe(12);

    const deltas = parseCodexResult(
      [
        `{"type":"turn.completed","usage":{"output_tokens":5,"reasoning_output_tokens":7}}`,
        `{"type":"turn.completed","usage":{"output_tokens":2,"reasoning_output_tokens":3}}`,
      ].join("\n"),
    );
    expect(deltas?.usage.output_tokens).toBe(17);
  });

  it("L persists skip-validation as skipped and excludes it from denominators", async () => {
    const dir = await tempDirectory("sb-r2-skipped-");
    try {
      const skipped = run({
        validation: {
          projectExists: true,
          qualityGateRequested: false,
          skipped: true,
          steps: {},
        } as RunResult["validation"],
      });
      expect(classifyOutcome(skipped)).toBe("skipped");
      expect(aggregateResults([skipped]).leaderboard[0]).toMatchObject({
        scoredRuns: 0,
        passCount: 0,
      });
      await writeSummary(dir, [skipped], options(dir), [aiSpec], {});
      const summary = JSON.parse(await readFile(path.join(dir, "summary.json"), "utf8"));
      expect(summary.results[0].outcome).toBe("skipped");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("M imports the project package by file path so an installed-name collision cannot pass", async () => {
    const dir = await tempDirectory("sb-r2-python-import-");
    const bin = path.join(dir, "bin");
    try {
      await mkdir(bin);
      await mkdir(path.join(dir, "src", "pip"), { recursive: true });
      await writeFile(path.join(dir, "pyproject.toml"), '[project]\nname="demo"\nversion="0.1.0"\n');
      await writeFile(
        path.join(dir, "src", "pip", "__init__.py"),
        "import scaffbench_dependency_that_does_not_exist\n",
      );
      await executable(
        path.join(bin, "uv"),
        'if [ "$1" = "sync" ]; then exit 0; fi\nif [ "$1" = "run" ]; then shift; if [ "$1" = "python" ]; then shift; exec python3 "$@"; fi; exec "$@"; fi\nexit 2',
      );
      const validation = await withFakePath(bin, () =>
        effectPromise(validateProject(aiSpec, dir, options(dir))),
      );
      expect(validation.steps.typecheck?.exitCode).not.toBe(0);
      expect(
        `${validation.steps.typecheck?.stdoutTail}\n${validation.steps.typecheck?.stderrTail}`,
      ).toContain("scaffbench_dependency_that_does_not_exist");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("N uses content-introduction dates from git history instead of the file-split date", () => {
    // The 3.0 spec refresh (2026-08-21) rewrote every spec, so every cohort date moved.
    const expected = {
      "ai-search-workbench": "2026-08-21",
      "rust-leptos-axum": "2026-08-21",
      "python-ingestion-api": "2026-08-21",
      "go-realtime-api": "2026-08-21",
      "multi-dotnet-ops": "2026-08-21",
      "ts-minimal-restraint": "2026-08-21",
      "ts-svelte-edge-orpc": "2026-08-21",
      "dotnet-blazor-cqrs": "2026-08-21",
      "multi-ts-go-grpc": "2026-08-21",
      "java-spring-jooq-keycloak": "2026-08-21",
      "elixir-broadway-absinthe": "2026-08-21",
      "react-native-expo": "2026-08-21",
      "frontier-polyglot-proto": "2026-08-21",
      "frontier-effect-eventsourcing": "2026-08-21",
    };
    expect(Object.fromEntries(SCAFFBENCH_2_SPECS.map((spec) => [spec.id, spec.introducedAt]))).toEqual(
      expected,
    );
  });

  it("O executes Expo install before export in the actual validation plan", async () => {
    const dir = await tempDirectory("sb-r2-expo-order-");
    const bin = path.join(dir, "bin");
    try {
      await mkdir(bin);
      await mkdir(path.join(dir, "fake-expo"));
      await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify({ private: true, dependencies: { expo: "file:./fake-expo" } }),
      );
      await writeFile(
        path.join(dir, "fake-expo", "package.json"),
        JSON.stringify({ name: "expo", version: "1.0.0" }),
      );
      await executable(path.join(bin, "npx"), ":");
      const validation = await withFakePath(bin, () =>
        effectPromise(validateProject(expoSpec, dir, options(dir))),
      );
      const keys = Object.keys(validation.steps);
      expect(keys.indexOf("install")).toBeGreaterThanOrEqual(0);
      expect(keys.indexOf("build")).toBeGreaterThan(keys.indexOf("install"));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
