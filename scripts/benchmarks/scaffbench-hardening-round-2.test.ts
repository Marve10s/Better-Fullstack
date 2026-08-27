import * as BunContext from "@effect/platform-bun/BunContext";
import {
  CORE_SPEC_IDS,
  SCAFFBENCH_2_SPECS,
  agentRunCommandOptions,
  aggregateResults,
  agyModelString,
  assertResumeProtocol,
  assertScheduleSupported,
  buildGenerationSchedule,
  isCompletedHarnessRun,
  recordedRunOptions,
  resolvedCostUsd,
  runScaffbench,
  scoreProject,
  buildRunId,
  classifyOutcome,
  effectiveValidationOptions,
  findCompletedTrial,
  formatCheckCommand,
  hasTransientNetworkSignature,
  parseArgs,
  recordedRunProtocol,
  topUpSpecSelection,
  parseClaudeResult,
  parseCodexResult,
  parseOpencodeResult,
  promptFor,
  runCommand,
  scoreArtifact,
  validatePendingResults,
  validateProject,
  validateProjectCached,
  writeSummary,
  type BenchmarkSpec,
  type RunResult,
  type ScaffbenchOptions,
  type StepResult,
} from "@scaffbench/index";
import { buildRows } from "@scripts/benchmarks/build-scaffbench-3-data";
import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import { existsSync } from "node:fs";
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const aiSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ai-search-workbench")!;
const cargoSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "rust-leptos-axum")!;
const dotnetSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "dotnet-blazor-cqrs")!;
const expoSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "react-native-expo")!;
const goSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "go-realtime-api")!;
const svelteSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ts-svelte-edge-orpc")!;
const minimalSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ts-minimal-restraint")!;

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
      "You may install dependencies, query package registries, run builds or type checks, and start servers to verify your work before finishing. Kill every process you start; nothing may still be running when you finish.";
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
      await executable(path.join(bin, "dotnet"), 'echo "$PWD :: $*" >> "$SCAFFBENCH_TEST_LOG"');
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
      expect(Object.keys(validation.steps).some((key) => key.includes("paraglide"))).toBe(false);
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
      await writeFile(path.join(cargoDir, "Cargo.toml"), '[workspace]\nmembers = ["crates/*"]\n');
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

  it("gates formatting through the project's own format script in check mode", async () => {
    const dir = await tempDirectory("sb-r2-format-");
    const bin = path.join(dir, "bin");
    const previousPath = process.env.PATH;
    try {
      await mkdir(bin);
      await executable(path.join(bin, "vp"), 'case " $* " in *" --check "*) exit 1;; esac');
      await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify({
          name: "format-gate",
          scripts: { build: "true", format: "vp run -r format" },
        }),
      );
      process.env.PATH = `${bin}${path.delimiter}${previousPath ?? ""}`;
      const validation = await effectPromise(validateProject(aiSpec, dir, options(dir)));
      expect(validation.steps.format?.status).not.toBe("skip");
      expect(validation.steps.format?.command).toContain("run format --check");
      expect(validation.steps.format?.exitCode).toBe(1);
    } finally {
      process.env.PATH = previousPath;
      await rm(dir, { recursive: true, force: true });
    }
  }, 60_000);

  it("resolves optional checks against the spec's declared validation profile", () => {
    const asked = { ...options(), qualityGate: false, doctorCheck: true, routeCheck: true };
    expect(effectiveValidationOptions(aiSpec, asked)).toMatchObject({
      qualityGate: true,
      doctorCheck: true,
      routeCheck: true,
    });
    expect(effectiveValidationOptions(goSpec, asked)).toMatchObject({
      qualityGate: false,
      doctorCheck: false,
      routeCheck: false,
    });
  });

  it("skips a prerequisite whose config is absent instead of failing core", async () => {
    const dir = await tempDirectory("sb-r2-prereq-");
    try {
      await writeFile(path.join(dir, "go.mod"), "module example.com/prereq\n");
      const spec: BenchmarkSpec = {
        ...goSpec,
        prerequisiteCommands: [
          { command: ["definitely-not-installed"], whenConfigFound: ["buf.gen.yaml"] },
        ],
      };
      const validation = await effectPromise(
        validateProject(spec, dir, options(dir), { deadlineMs: 30_000 }),
      );
      expect(validation.steps["prerequisite:01:definitely-not-installed"]?.status).toBe("na");
      expect(Object.keys(validation.steps)).toContain("install");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 60_000);

  it("scores markers from emitted files only, never from bts.jsonc", async () => {
    const dir = await tempDirectory("sb-r2-bts-");
    try {
      await writeFile(path.join(dir, "package.json"), JSON.stringify({ name: "edge" }));
      await writeFile(
        path.join(dir, "bts.jsonc"),
        '{\n  "dbSetup": "d1",\n  "d1_databases": "declared"\n}\n',
      );
      const spec: BenchmarkSpec = {
        ...svelteSpec,
        strictMarkers: [{ id: "db:d1", textAny: ["d1_databases", "D1Database"] }],
      };
      expect((await scoreArtifact(spec, dir)).misses).toEqual(["db:d1"]);

      await writeFile(
        path.join(dir, "wrangler.jsonc"),
        '{\n  "d1_databases": [{ "binding": "DB" }]\n}\n',
      );
      expect((await scoreArtifact(spec, dir)).matched).toBe(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("lets an explicit --no-quality-gate beat a spec profile that forces the gate", () => {
    expect(aiSpec.validationProfile.qualityGate).toBe(true);
    expect(effectiveValidationOptions(aiSpec, parseArgs([])).qualityGate).toBe(true);
    expect(effectiveValidationOptions(aiSpec, parseArgs(["--no-quality-gate"])).qualityGate).toBe(
      false,
    );
  });

  it("rejects a check-named format script that actually writes", async () => {
    const dir = await tempDirectory("sb-r2-format-write-");
    try {
      expect(
        formatCheckCommand({ "format:check": "biome format --write ." }, dir, "bun"),
      ).toBeNull();
      expect(
        formatCheckCommand({ "format:check": "biome format --write .", fmt: "vp fmt" }, dir, "bun"),
      ).toEqual({ command: "bun", args: ["run", "fmt", "--check"] });
      expect(formatCheckCommand({ "format:check": "biome ci ." }, dir, "bun")).toEqual({
        command: "bun",
        args: ["run", "format:check"],
      });
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("deletes a stale cache entry when a forced revalidation is uncacheable", async () => {
    const dir = await tempDirectory("sb-r2-cache-drop-");
    try {
      const projectDir = path.join(dir, "project");
      await mkdir(projectDir);
      await writeFile(
        path.join(projectDir, "package.json"),
        JSON.stringify({ name: "cacheable", scripts: { build: "true" } }),
      );
      const runOptions = options(dir);
      const first = await effectPromise(validateProjectCached(aiSpec, projectDir, runOptions));
      const cacheFile = path.join(dir, "validation-cache", `${first.cacheKey}.json`);
      expect(first.cacheHit).toBe(false);
      expect(existsSync(cacheFile)).toBe(true);

      const bin = path.join(dir, "bin");
      await mkdir(bin);
      const flaky = path.join(bin, "flaky-prerequisite");
      await executable(flaky, 'echo "ECONNRESET while reaching registry.npmjs.org" >&2; exit 1');
      const broken: BenchmarkSpec = { ...aiSpec, prerequisiteCommands: [{ command: [flaky] }] };
      const forced = await effectPromise(
        validateProjectCached(broken, projectDir, { ...runOptions, forceRevalidate: true }),
      );
      expect(forced.cacheKey).toBe(first.cacheKey);
      expect(existsSync(cacheFile)).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 120_000);

  it("recomputes marker scores when a revalidation is forced", async () => {
    const dir = await tempDirectory("sb-r2-rescore-");
    try {
      const projectDir = path.join(dir, "project");
      await mkdir(projectDir);
      await writeFile(
        path.join(projectDir, "package.json"),
        JSON.stringify({
          name: "rescore",
          scripts: { build: "true" },
          dependencies: { hono: "1.0.0" },
        }),
      );
      const spec: BenchmarkSpec = {
        ...aiSpec,
        strictMarkers: [{ id: "backend:hono", deps: ["hono"] }],
      };
      const result = run({
        projectDir,
        stackScore: { matched: 0, total: 1, percent: 0, misses: ["backend:hono"] },
        validation: {
          projectExists: true,
          qualityGateRequested: true,
          cacheKey: "stale",
          steps: { build: step() },
        },
      });
      await effectPromise(
        validatePendingResults(
          [result],
          { ...options(dir), validateExisting: true, forceRevalidate: true },
          [spec],
          {},
          () => {},
        ),
      );
      expect(result.stackScore).toMatchObject({ matched: 1, total: 1, percent: 100 });
      expect(result.validation.cacheKey).not.toBe("stale");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 120_000);

  it("H enforces a total validation deadline with explicit failure evidence", async () => {
    const dir = await tempDirectory("sb-r2-deadline-");
    try {
      const slow = path.join(dir, "slow");
      await executable(slow, "sleep 1");
      const spec: BenchmarkSpec = { ...aiSpec, prerequisiteCommands: [{ command: [slow] }] };
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

  it("I locks the repeat count to the out-dir and rejects unaligned artifacts", () => {
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
    expect(findCompletedTrial([legacy], aiSpec, "gpt-5.6-sol", "high", "prompt", 1)?.id).toBe(
      legacy.id,
    );
    expect(() =>
      assertResumeProtocol({
        recorded: { repeats: 1, seed: 99 },
        current: { repeats: 2, seed: 99 },
        results: [legacy],
        schedule,
        model: "gpt-5.6-sol",
      }),
    ).toThrow(/cannot resume as repeats=2/);
    expect(() =>
      assertResumeProtocol({
        recorded: { repeats: 2, seed: 99 },
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
        recorded: { repeats: 2, seed: 7 },
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
    expect(cumulative?.usage.output_tokens).toBe(5);

    const deltas = parseCodexResult(
      [
        `{"type":"turn.completed","usage":{"output_tokens":5,"reasoning_output_tokens":7}}`,
        `{"type":"turn.completed","usage":{"output_tokens":2,"reasoning_output_tokens":3}}`,
      ].join("\n"),
    );
    expect(deltas?.usage.output_tokens).toBe(7);
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
      await writeFile(
        path.join(dir, "pyproject.toml"),
        '[project]\nname="demo"\nversion="0.1.0"\n',
      );
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
    expect(
      Object.fromEntries(SCAFFBENCH_2_SPECS.map((spec) => [spec.id, spec.introducedAt])),
    ).toEqual(expected);
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

const PUBLISH_PROVENANCE = {
  suiteVersion: "3.0",
  harnessVersion: "3.1.0",
  validationCacheVersion: 8,
  promptVersion: "2026-08-21-scaffbench-3.1",
  resourceProfileId: "low-2w-v1",
  agentAdapter: "codex",
  configuredTrials: 1,
  specOrderSeed: 1,
} as const;

function publishableResults(model: string, effort: RunResult["effort"]): RunResult[] {
  return CORE_SPEC_IDS.map((specId) =>
    run({
      id: `${specId}-${model}-${effort}-prompt-r01`,
      specId,
      model,
      effort,
      provenance: { ...PUBLISH_PROVENANCE },
      claude: {
        exitCode: 0,
        timedOut: false,
        durationMs: 60_000,
        outputTokens: 10,
        totalCostUsd: 1,
      },
      validation: {
        projectExists: true,
        qualityGateRequested: true,
        steps: { build: step() },
      },
    }),
  );
}

async function writePublishableRun(
  dir: string,
  model: string,
  efforts: readonly RunResult["effort"][],
  mutate: (summary: Record<string, any>) => void = () => {},
  extend: (results: RunResult[]) => RunResult[] = (results) => results,
) {
  const results = extend(efforts.flatMap((effort) => publishableResults(model, effort)));
  const summary: Record<string, any> = {
    harnessVersion: "3.1.0",
    generatedAt: "2026-08-21T12:00:00.000Z",
    options: {
      model,
      efforts: [...efforts],
      paths: ["prompt"],
      specs: [...CORE_SPEC_IDS],
      repeats: 1,
      qualityGate: true,
    },
    results,
    aggregates: aggregateResults(results),
  };
  mutate(summary);
  await writeFile(path.join(dir, "summary.json"), JSON.stringify(summary));
  return dir;
}

describe("ScaffBench hardening round 3", () => {
  it("P keeps the originating protocol on a validation-only resume", () => {
    const recorded = recordedRunOptions({
      options: {
        model: "gpt-5.6-sol",
        efforts: ["high"],
        paths: ["prompt"],
        specs: ["ai-search-workbench", "go-realtime-api"],
        repeats: 3,
        promptStyle: "natural",
        outDir: "/tmp/recorded",
        forceRevalidate: true,
      },
    });
    expect(recorded).toEqual({
      model: "gpt-5.6-sol",
      efforts: ["high"],
      paths: ["prompt"],
      specs: ["ai-search-workbench", "go-realtime-api"],
      repeats: 3,
      promptStyle: "natural",
    });
    const merged = { ...options("/tmp/out"), ...recorded };
    expect(merged.repeats).toBe(3);
    expect(merged.model).toBe("gpt-5.6-sol");
    expect(merged.forceRevalidate).toBe(false);
    expect(recordedRunOptions(undefined)).toEqual({});
    expect(recordedRunOptions({ options: { model: 7, repeats: "3", paths: ["ftp"] } })).toEqual({});
  });

  it("Q writes summaries atomically and refuses to resume an unreadable one", async () => {
    const dir = await tempDirectory("sb-r3-summary-");
    try {
      await writeSummary(dir, [run()], options(dir), [aiSpec], {});
      const entries = await readdir(dir);
      expect(entries.filter((name) => name.includes(".tmp-"))).toEqual([]);
      expect(
        JSON.parse(await readFile(path.join(dir, "summary.json"), "utf8")).results,
      ).toHaveLength(1);

      await writeFile(path.join(dir, "summary.json"), '{"results": [{"id": "truncat');
      const failure = await effectPromise(
        Effect.either(
          runScaffbench({ ...options(dir), writeMatrixOnly: true }, () => {}) as Effect.Effect<
            void,
            unknown,
            any
          >,
        ),
      );
      expect(failure._tag).toBe("Left");
      expect(String((failure as { left: unknown }).left)).toMatch(/unreadable/);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("R keeps a fast terminal failure as the pass@1 result and retries only infra", () => {
    const fastFailure = run({
      claude: { exitCode: 1, timedOut: false, durationMs: 900 },
      projectDir: null,
      validation: { projectExists: false, qualityGateRequested: true, steps: {} },
    });
    expect(classifyOutcome(fastFailure)).toBe("model-failure");
    expect(isCompletedHarnessRun(fastFailure)).toBe(true);

    const spawnFailure = run({
      claude: { exitCode: 127, timedOut: false, durationMs: 50, spawnError: true },
      validation: { projectExists: false, qualityGateRequested: true, steps: {} },
    });
    expect(isCompletedHarnessRun(spawnFailure)).toBe(false);

    const deferred = run({
      validation: { projectExists: true, qualityGateRequested: true, deferred: true, steps: {} },
    });
    expect(isCompletedHarnessRun(deferred)).toBe(true);
  });

  it("S classifies a mid-scaffold provider outage on the evidence, not the directory", () => {
    const outage = {
      claude: {
        exitCode: 1,
        timedOut: false,
        durationMs: 1000,
        stderrTail: "upstream provider error: HTTP 429 too many requests",
      },
    };
    const beforeScaffold = run({
      ...outage,
      projectDir: null,
      validation: { projectExists: false, qualityGateRequested: true, steps: {} },
    });
    const partialScaffold = run({
      ...outage,
      validation: {
        projectExists: true,
        qualityGateRequested: true,
        steps: { build: step({ exitCode: 1 }) },
      },
    });
    expect(classifyOutcome(beforeScaffold)).toBe("provider-infra");
    expect(classifyOutcome(partialScaffold)).toBe("provider-infra");
    expect(classifyOutcome(run(outage))).toBe("success");
  });

  it("T keeps an adapter's own reported cost and prices only Claude-harness runs", () => {
    const parsed = { usage: { output_tokens: 100 }, total_cost_usd: 0.42 };
    expect(resolvedCostUsd("pi", "pi/anthropic/claude-opus-5", parsed)).toBe(0.42);
    expect(resolvedCostUsd("opencode", "opencode/claude-sonnet-5", parsed)).toBe(0.42);
    expect(resolvedCostUsd("codex", "gpt-5.6-luna", parsed)).toBe(0.42);
    expect(resolvedCostUsd("agy", "gemini-3.5-flash", undefined)).toBeUndefined();
    const claude = resolvedCostUsd("claude", "claude-opus-5", {
      usage: { input_tokens: 1_000_000, output_tokens: 0 },
      total_cost_usd: 0,
    });
    expect(claude).toBe(5);
  });

  it("U refuses schedules an adapter cannot run", () => {
    const mcpSchedule = buildGenerationSchedule(
      [aiSpec],
      { repeats: 1, efforts: ["high"], paths: ["mcp"] },
      1,
    );
    expect(() => assertScheduleSupported(mcpSchedule, "pi", "pi/openai/gpt-5.6")).toThrow(
      /--paths mcp is not supported/,
    );
    expect(() => assertScheduleSupported(mcpSchedule, "agy", "gemini-3.5-flash")).toThrow(
      /--paths mcp is not supported/,
    );
    expect(() => assertScheduleSupported(mcpSchedule, "codex", "gpt-5.6-sol")).not.toThrow();

    const promptSchedule = (effort: RunResult["effort"]) =>
      buildGenerationSchedule([aiSpec], { repeats: 1, efforts: [effort], paths: ["prompt"] }, 1);
    expect(agyModelString("gemini-3.5-flash", "high")).toBe("Gemini 3.5 Flash (High)");
    expect(agyModelString("gemini-3.1-pro", "low")).toBe("Gemini 3.1 Pro (Low)");
    for (const effort of ["default", "xhigh", "max"] as const) {
      expect(() =>
        assertScheduleSupported(promptSchedule(effort), "agy", "gemini-3.5-flash"),
      ).toThrow(/no distinct/);
    }
    expect(() =>
      assertScheduleSupported(promptSchedule("medium"), "agy", "gemini-3.1-pro"),
    ).toThrow(/no distinct medium variant/);
  });

  it("V rejects unknown flag values and unusable budgets", () => {
    expect(() => parseArgs(["--specs", "ai-search-workbench,typo-spec"])).toThrow(/unknown value/);
    expect(() => parseArgs(["--paths", "cli"])).toThrow(/unknown value/);
    expect(() => parseArgs(["--efforts", "ultra"])).toThrow(/unknown value/);
    expect(() => parseArgs(["--max-budget-usd", "twelve"])).toThrow(/non-negative number/);
    expect(() => parseArgs(["--max-budget-usd", "-1"])).toThrow(/non-negative number/);
    expect(() => parseArgs(["--repeats", "1.5"])).toThrow(/positive integer/);
    expect(parseArgs(["--specs", "ai-search-workbench"]).specs).toEqual(["ai-search-workbench"]);
    expect(parseArgs(["--max-budget-usd", "3.5"]).maxBudgetUsd).toBe("3.5");
  });

  it("W publishes one row per effort and refuses an unproven cohort", async () => {
    const dir = await tempDirectory("sb-r3-publish-");
    try {
      await writePublishableRun(dir, "gpt-5.6-sol", ["low", "high"]);
      const { rows, qualityGates, trialsPerSpec } = buildRows([dir]);
      expect(rows.map((row) => row.key).sort()).toEqual(["gpt-5.6-sol|high", "gpt-5.6-sol|low"]);
      expect(rows.every((row) => row.totalCostUsd === CORE_SPEC_IDS.length)).toBe(true);
      expect(rows.every((row) => row.fullPasses === CORE_SPEC_IDS.length)).toBe(true);
      expect(qualityGates).toBe(true);
      expect(trialsPerSpec).toBe(1);

      const refusals: [string, RegExp][] = [
        ["partial", /exact 13-spec core cohort/],
        ["gates-off", /quality gates ON/],
        ["repeats", /pass@1/],
        ["deferred", /still deferred/],
        ["missing-cell", /no trial for/],
      ];
      for (const [kind, message] of refusals) {
        const bad = await tempDirectory(`sb-r3-publish-${kind}-`);
        try {
          await writePublishableRun(bad, "gpt-5.6-sol", ["high"], (summary) => {
            if (kind === "partial") summary.options.specs = summary.options.specs.slice(0, 12);
            if (kind === "gates-off") summary.options.qualityGate = false;
            if (kind === "repeats") summary.options.repeats = 3;
            if (kind === "deferred") summary.results[0].validation.deferred = true;
            if (kind === "missing-cell") summary.results.splice(0, 1);
          });
          expect(() => buildRows([bad])).toThrow(message);
        } finally {
          await rm(bad, { recursive: true, force: true });
        }
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("Y parses --top-up as an extension of a recorded out-dir", () => {
    expect(parseArgs(["--top-up", "3", "--out-dir", "x"])).toMatchObject({ topUp: 3, repeats: 1 });
    expect(() => parseArgs(["--top-up", "1", "--out-dir", "x"])).toThrow(/at least 2/);
    expect(() => parseArgs(["--top-up", "3", "--repeats", "3", "--out-dir", "x"])).toThrow(
      /cannot be combined/,
    );
    expect(() => parseArgs(["--top-up", "3"])).toThrow(/needs --out-dir/);

    const recorded = [aiSpec.id, goSpec.id];
    expect(topUpSpecSelection([...CORE_SPEC_IDS], recorded)).toEqual(recorded);
    expect(topUpSpecSelection([goSpec.id], recorded)).toEqual([goSpec.id]);
    expect(() => topUpSpecSelection([aiSpec.id, cargoSpec.id], recorded)).toThrow(
      /not in this out-dir/,
    );

    const topUps = [{ trials: 3, specs: [aiSpec.id], recordedAt: "2026-08-27T00:00:00.000Z" }];
    expect(
      recordedRunProtocol({ metadata: { runProtocol: { repeats: 1, seed: 9, topUps } } }),
    ).toEqual({ repeats: 1, seed: 9, topUps });
    expect(recordedRunProtocol({ metadata: { runProtocol: { repeats: 1, seed: 9 } } })).toEqual({
      repeats: 1,
      seed: 9,
    });
  });

  it("Z publishes topped-up rows as per-spec rates and demotes partial top-ups", async () => {
    const secondTrial =
      (specIds: readonly string[], failBuild: boolean) => (results: RunResult[]) => [
        ...results,
        ...results
          .filter((result) => specIds.includes(result.specId))
          .map((result) => ({
            ...result,
            id: result.id.replace(/-r01$/, "-r02"),
            trial: 2,
            provenance: { ...PUBLISH_PROVENANCE, configuredTrials: 2 },
            validation: failBuild
              ? { ...result.validation, steps: { build: step({ exitCode: 1 }) } }
              : result.validation,
          })),
      ];
    const uniform = await tempDirectory("sb-r3-topup-uniform-");
    const partial = await tempDirectory("sb-r3-topup-partial-");
    const ragged = await tempDirectory("sb-r3-topup-ragged-");
    try {
      await writePublishableRun(
        uniform,
        "gpt-5.6-sol",
        ["high"],
        () => {},
        secondTrial(CORE_SPEC_IDS, true),
      );
      const [row] = buildRows([uniform]).rows;
      expect(row).toMatchObject({
        topUp: "uniform",
        trials: 2,
        eligibility: "ranked",
        fullPasses: 6.5,
        corePasses: 6.5,
        fullPassPct: 50,
        scoredSpecs: 13,
      });
      expect((row!.results as Record<string, unknown>)[aiSpec.id]).toEqual({
        trials: 2,
        scored: 2,
        core: 1,
        full: 1,
        score: 60,
      });

      await writePublishableRun(
        partial,
        "gpt-5.6-sol",
        ["high"],
        () => {},
        secondTrial([aiSpec.id], false),
      );
      expect(buildRows([partial]).rows[0]).toMatchObject({
        topUp: "partial",
        trials: 2,
        eligibility: "exploratory",
        fullPasses: 13,
      });

      await writePublishableRun(ragged, "gpt-5.6-sol", ["high"], (summary) => {
        summary.results[0].trial = 3;
        summary.results[0].id = summary.results[0].id.replace(/-r01$/, "-r03");
      });
      expect(() => buildRows([ragged])).toThrow(/numbered 1\.\.n/);
    } finally {
      await rm(uniform, { recursive: true, force: true });
      await rm(partial, { recursive: true, force: true });
      await rm(ragged, { recursive: true, force: true });
    }
  });

  it("X exempts an explicit-only marker from the discovery lane", async () => {
    const dir = await tempDirectory("sb-r3-explicit-");
    try {
      await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify({ dependencies: { react: "^19", vite: "^8", tailwindcss: "^4" } }),
      );
      const explicit = await scoreProject(minimalSpec, dir, "explicit");
      const natural = await scoreProject(minimalSpec, dir, "natural");
      expect(explicit.artifact.misses).toContain("tooling:turborepo");
      expect(natural.artifact.misses).not.toContain("tooling:turborepo");
      expect(natural.artifact.total).toBe(explicit.artifact.total - 1);
      expect(natural.artifact.percent).toBe(100);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("Y scores script-tag analytics and the new competing-framework traps", async () => {
    const dir = await tempDirectory("sb-r3-markers-");
    try {
      await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify({ dependencies: { react: "^19", vite: "^8", tailwindcss: "^4" } }),
      );
      await writeFile(
        path.join(dir, "index.html"),
        '<script async src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>',
      );
      expect((await scoreArtifact(minimalSpec, dir)).misses).toContain("forbidden:analytics");

      for (const [specId, file, contents, marker] of [
        [
          "elixir-broadway-absinthe",
          "mix.exs",
          '{:bcrypt_elixir, "~> 3.0"}',
          "forbidden:phx-gen-auth",
        ],
        ["rust-leptos-axum", "Cargo.toml", 'yew = "0.23"', "forbidden:yew"],
        [
          "java-spring-jooq-keycloak",
          "SecurityConfig.java",
          "UserDetailsService userDetailsService()",
          "forbidden:in-app-auth",
        ],
        [
          "dotnet-blazor-cqrs",
          "Program.cs",
          "builder.Services.AddControllersWithViews();",
          "forbidden:mvc",
        ],
      ] as const) {
        const specDir = await tempDirectory("sb-r3-trap-");
        try {
          await writeFile(path.join(specDir, file), contents);
          const spec = SCAFFBENCH_2_SPECS.find((candidate) => candidate.id === specId)!;
          expect((await scoreArtifact(spec, specDir)).misses).toContain(marker);
        } finally {
          await rm(specDir, { recursive: true, force: true });
        }
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
