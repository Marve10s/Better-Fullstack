import { describe, expect, it } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  aggregateResults,
  agentLabelForModel,
  canonicalCommand,
  classifyOutcome,
  deriveFailureTags,
  extractToolUses,
  findProjectDir,
  parseArgs,
  parseClaudeResult,
  parseCodexResult,
  parseOpencodeResult,
  promptFor,
  providerForModel,
  runCommand,
  scoreArtifact,
  scoreBts,
  scoreProject,
  scoreToolCompliance,
  SCAFFBENCH_2_SPECS,
  typecheckGate,
  validationPassed,
  type RunResult,
  type StepResult,
} from "./scaffbench-v2-lib";

const aiSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ai-search-workbench")!;
const dotnetSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "multi-dotnet-ops")!;

function stackPart(
  id: string,
  role: string,
  ecosystem: string,
  toolId: string,
  ownerPartId?: string,
) {
  return { id, role, ecosystem, toolId, ownerPartId, source: "selected" };
}

function makeRun(overrides: Partial<RunResult> = {}): RunResult {
  const base: RunResult = {
    id: "ai-search-workbench-claude-opus-4-8-high-mcp-r01",
    specId: "ai-search-workbench",
    specTitle: aiSpec.title,
    model: "claude-opus-4-8",
    effort: "high",
    effectiveReasoning: "high",
    path: "mcp",
    trial: 1,
    promptStyle: "explicit",
    runDir: "/tmp/run",
    projectName: "sb21-ai-search-workbench-mcp-high-r01",
    projectDir: "/tmp/run/project",
    claude: {
      exitCode: 0,
      timedOut: false,
      durationMs: 60_000,
      outputTokens: 4000,
      totalCostUsd: 1.25,
    },
    validation: {
      projectExists: true,
      steps: {
        install: {
          command: "bun install",
          exitCode: 0,
          timedOut: false,
          durationMs: 1,
          stdoutTail: "",
          stderrTail: "",
        },
      },
    },
    stackScore: { matched: 24, total: 24, percent: 100, misses: [] },
    toolCompliance: {
      score: 2,
      total: 2,
      checks: [
        { id: "used-mcp", status: "pass", detail: "ok" },
        { id: "no-cli-create", status: "pass", detail: "ok" },
      ],
    },
    failureTags: [],
  };

  return { ...base, ...overrides };
}

describe("ScaffBench 2 harness config", () => {
  it("defaults to the core multi-spec suite with one repeat", () => {
    const options = parseArgs([]);

    expect(options.specs).toEqual([
      "ai-search-workbench",
      "rust-leptos-axum",
      "python-ingestion-api",
      "go-realtime-api",
      "multi-dotnet-ops",
    ]);
    expect(options.repeats).toBe(1);
    expect(options.promptStyle).toBe("explicit");
  });

  it("emits valid non-interactive Better Fullstack command constraints", () => {
    const command = canonicalCommand(dotnetSpec, "ops-portal");

    expect(command).toContain("bun create better-fullstack@latest ops-portal");
    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part backend:dotnet:aspnet-minimal");
    expect(command).toContain("--no-install");
    expect(command).toContain("--no-git");
    expect(command).toContain("--disable-analytics");
  });

  it("keeps creation paths isolated in prompts", () => {
    const cliPrompt = promptFor(aiSpec, "cli", "/tmp/run", "workbench", "explicit");
    const promptOnly = promptFor(aiSpec, "prompt", "/tmp/run", "workbench", "natural");
    const mcpPrompt = promptFor(aiSpec, "mcp", "/tmp/run", "workbench", "explicit");

    expect(cliPrompt).toContain("--dry-run");
    expect(cliPrompt).toContain("bun create better-fullstack@latest");
    expect(promptOnly).toContain("Do not use the Better-Fullstack MCP server");
    expect(promptOnly).toContain(aiSpec.naturalPrompt);
    expect(mcpPrompt).toContain("bfs_get_guidance");
    expect(mcpPrompt).toContain("bfs_create_project");
  });

  it("does not leak the canonical command (answer key) into agent-facing prompts", () => {
    const cliPrompt = promptFor(aiSpec, "cli", "/tmp/run", "workbench", "explicit");

    // The agent must map requirements to flags itself; the full flag list is
    // kept only in canonical-command.txt / spec.json for grading.
    expect(cliPrompt).not.toContain(canonicalCommand(aiSpec, "workbench"));
    expect(cliPrompt).not.toContain("--vector-db");
    expect(cliPrompt).not.toContain("--shadcn-base");
  });

  it("records missing spawned tools as failed commands", async () => {
    const result = await runCommand("scaffbench-missing-binary-for-test", [], process.cwd(), 1_000);

    expect(result.exitCode).toBe(127);
    expect(result.timedOut).toBe(false);
    expect(result.spawnError).toBe(true);
    expect(result.stderr).toContain("scaffbench-missing-binary-for-test");
  });
});

describe("ScaffBench 2 scoring", () => {
  it("scores the existing AI search workbench config exactly", () => {
    const score = scoreBts(
      aiSpec,
      JSON.stringify({
        ...Object.fromEntries(Object.entries(aiSpec.expectedConfig ?? {})),
        addons: aiSpec.expectedAddons,
      }),
    );

    expect(score).toMatchObject({ matched: 24, total: 24, percent: 100 });
    expect(score.misses).toEqual([]);
  });

  it("scores graph stack parts without relying on flat ecosystem fields", () => {
    const backendId = "backend:dotnet:aspnet-minimal";
    const score = scoreBts(
      dotnetSpec,
      JSON.stringify({
        addons: ["turborepo", "biome", "github-actions"],
        stackParts: [
          stackPart("frontend:typescript:next", "frontend", "typescript", "next"),
          stackPart(
            "frontend:typescript:next.css:typescript:tailwind",
            "css",
            "typescript",
            "tailwind",
            "frontend:typescript:next",
          ),
          stackPart(
            "frontend:typescript:next.ui:typescript:shadcn-ui",
            "ui",
            "typescript",
            "shadcn-ui",
            "frontend:typescript:next",
          ),
          stackPart(backendId, "backend", "dotnet", "aspnet-minimal"),
          stackPart(`${backendId}.orm:dotnet:ef-core`, "orm", "dotnet", "ef-core", backendId),
          stackPart(
            `${backendId}.auth:dotnet:aspnet-identity`,
            "auth",
            "dotnet",
            "aspnet-identity",
            backendId,
          ),
          stackPart(
            `${backendId}.api:dotnet:minimal-api`,
            "api",
            "dotnet",
            "minimal-api",
            backendId,
          ),
          stackPart(`${backendId}.testing:dotnet:xunit`, "testing", "dotnet", "xunit", backendId),
          stackPart(
            `${backendId}.testing:dotnet:testcontainers-dotnet`,
            "testing",
            "dotnet",
            "testcontainers-dotnet",
            backendId,
          ),
          stackPart(
            `${backendId}.observability:dotnet:serilog`,
            "observability",
            "dotnet",
            "serilog",
            backendId,
          ),
          stackPart(
            `${backendId}.realtime:dotnet:signalr`,
            "realtime",
            "dotnet",
            "signalr",
            backendId,
          ),
          stackPart(
            `${backendId}.validation:dotnet:fluentvalidation`,
            "validation",
            "dotnet",
            "fluentvalidation",
            backendId,
          ),
          stackPart(
            `${backendId}.jobQueue:dotnet:hangfire`,
            "jobQueue",
            "dotnet",
            "hangfire",
            backendId,
          ),
          stackPart(
            `${backendId}.caching:dotnet:memory-cache`,
            "caching",
            "dotnet",
            "memory-cache",
            backendId,
          ),
          stackPart(`${backendId}.deploy:dotnet:docker`, "deploy", "dotnet", "docker", backendId),
          stackPart("database:universal:postgres", "database", "universal", "postgres"),
        ],
      }),
    );

    expect(score).toMatchObject({ matched: 19, total: 19, percent: 100 });
    expect(score.misses).toEqual([]);
  });

  it("tags validation and stack failures for summaries", () => {
    const failed = makeRun({
      validation: {
        projectExists: true,
        steps: {
          install: {
            command: "bun install",
            exitCode: 0,
            timedOut: false,
            durationMs: 1,
            stdoutTail: "",
            stderrTail: "",
          },
          build: {
            command: "bun run build",
            exitCode: 1,
            timedOut: false,
            durationMs: 1,
            stdoutTail: "",
            stderrTail: "build failed",
          },
        },
      },
      stackScore: { matched: 22, total: 24, percent: 92, misses: ["vectorDb:qdrant"] },
    });

    const tags = deriveFailureTags(failed);

    expect(validationPassed(failed)).toBe(false);
    expect(tags).toContain("build-failed");
    expect(tags).toContain("validation-failed");
    expect(tags).toContain("stack-mismatch");
  });

  it("does not pass a run with zero executed validation steps (no manifest fired)", () => {
    // Agent left a directory but no package.json/Cargo.toml/etc., so no validator
    // ran. `[].every(...)` is vacuously true — guard against that inflating Pass@1.
    const empty = makeRun({ validation: { projectExists: true, steps: {} } });
    expect(validationPassed(empty)).toBe(false);
    expect(classifyOutcome(empty)).toBe("model-failure");
  });

  const okStep = (command: string): StepResult => ({
    command,
    exitCode: 0,
    timedOut: false,
    durationMs: 1,
    stdoutTail: "",
    stderrTail: "",
  });

  it("treats a 'skip' gate step as a failure, not a vacuous pass (Finding 1)", () => {
    // Core is green but the linter could not run (no tool configured) -> 'skip'
    // (exitCode null). Pre-fix this carried exitCode 0 and passed silently.
    const run = makeRun({
      validation: {
        projectExists: true,
        steps: {
          install: okStep("bun install"),
          build: okStep("bun run build"),
          lint: {
            command: "lint (no linter configured)",
            exitCode: null,
            timedOut: false,
            status: "skip",
            durationMs: 0,
            stdoutTail: "skipped (tool not configured)",
            stderrTail: "",
          },
        },
      },
    });
    expect(validationPassed(run)).toBe(false);
  });

  it("excludes an 'na' step (genuinely testless scaffold) from the pass decision", () => {
    const run = makeRun({
      validation: {
        projectExists: true,
        steps: {
          install: okStep("bun install"),
          build: okStep("bun run build"),
          format: okStep("biome format --check ."),
          test: {
            command: "test (no test script)",
            exitCode: null,
            timedOut: false,
            status: "na",
            durationMs: 0,
            stdoutTail: "n/a",
            stderrTail: "",
          },
        },
      },
    });
    // The 'na' test is excluded; every real step is green -> pass.
    expect(validationPassed(run)).toBe(true);
  });

  it("aggregates repeats with pass counts and failure tag counts", () => {
    const failed = makeRun({
      id: "ai-search-workbench-claude-opus-4-8-high-mcp-r02",
      trial: 2,
      validation: {
        projectExists: true,
        steps: {
          install: {
            command: "bun install",
            exitCode: 1,
            timedOut: false,
            durationMs: 1,
            stdoutTail: "",
            stderrTail: "install failed",
          },
        },
      },
      failureTags: ["install-failed", "validation-failed"],
    });

    const aggregates = aggregateResults([makeRun(), failed]).leaderboard;

    expect(aggregates).toHaveLength(1);
    expect(aggregates[0]).toMatchObject({
      runs: 2,
      passCount: 1,
      passRate: 50,
      failureTags: { "install-failed": 1, "validation-failed": 1 },
    });
  });
});

describe("ScaffBench 2 artifact-grounded scoring", () => {
  it("scores libraries wired in the generated artifact, not just declared", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sb21-artifact-"));
    try {
      await writeFile(
        join(dir, "package.json"),
        JSON.stringify({ dependencies: { hono: "^4", "@qdrant/js-client-rest": "^1" } }),
      );
      const spec = {
        ...aiSpec,
        strictMarkers: [
          { id: "backend:hono", deps: ["hono"] },
          { id: "vectorDb:qdrant", deps: ["@qdrant/js-client-rest"] },
          { id: "search:opensearch", deps: ["@opensearch-project/opensearch"] },
          { id: "forbidden:stripe", forbiddenDeps: ["stripe"] },
        ],
      };

      const score = await scoreArtifact(spec, dir);

      // hono + qdrant wired, stripe correctly absent => 3; opensearch missing.
      expect(score).toMatchObject({ matched: 3, total: 4 });
      expect(score.misses).toEqual(["search:opensearch"]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("separates artifact from faithfulness and flags a claimed-but-unwired stack", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sb21-unwired-"));
    try {
      // bts.jsonc records the full requested stack => 100% faithful...
      await writeFile(
        join(dir, "bts.jsonc"),
        JSON.stringify({
          ...Object.fromEntries(Object.entries(aiSpec.expectedConfig ?? {})),
          addons: aiSpec.expectedAddons,
        }),
      );
      // ...but the emitted tree wires almost nothing => low artifact score.
      await writeFile(join(dir, "package.json"), JSON.stringify({ dependencies: { hono: "^4" } }));

      const { artifact, faithfulness } = await scoreProject(aiSpec, dir);
      expect(faithfulness?.percent).toBe(100);
      expect(artifact.percent).toBeLessThan(100);

      const run = makeRun({ stackScore: artifact, generatorFaithfulness: faithfulness });
      expect(deriveFailureTags(run)).toContain("stack-unwired");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("ScaffBench 2 run outcomes", () => {
  function stepResult(
    command: string,
    exitCode: number,
    opts: { timedOut?: boolean; spawnError?: boolean } = {},
  ) {
    return {
      command,
      exitCode,
      timedOut: opts.timedOut ?? false,
      spawnError: opts.spawnError ?? false,
      durationMs: 1,
      stdoutTail: "",
      stderrTail: "",
    };
  }

  it("classifies a clean validation pass as success", () => {
    expect(classifyOutcome(makeRun())).toBe("success");
  });

  it("classifies an un-spawnable validator binary as infra-inconclusive, not a build break", () => {
    const run = makeRun({
      validation: {
        projectExists: true,
        steps: { cargoCheck: stepResult("cargo check", 127, { spawnError: true }) },
      },
    });

    expect(classifyOutcome(run)).toBe("infra-inconclusive");
    const tags = deriveFailureTags(run);
    expect(tags).toContain("toolchain-missing");
    expect(tags).not.toContain("build-failed");
  });

  it("treats a child process exiting 127 (broken generated script) as a model-failure", () => {
    const run = makeRun({
      validation: {
        projectExists: true,
        steps: {
          install: stepResult("bun install", 0),
          // bun ran fine; the generated `build` script referenced a missing bin.
          build: stepResult("bun run build", 127),
        },
      },
    });

    expect(classifyOutcome(run)).toBe("model-failure");
    const tags = deriveFailureTags(run);
    expect(tags).toContain("build-failed");
    expect(tags).not.toContain("toolchain-missing");
  });

  it("classifies an exhausted token budget as infra-inconclusive", () => {
    const run = makeRun({
      claude: { exitCode: 1, timedOut: false, durationMs: 60_000, terminalReason: "max_budget_exhausted" },
      validation: { projectExists: false, steps: {} },
    });

    expect(classifyOutcome(run)).toBe("infra-inconclusive");
    expect(deriveFailureTags(run)).toContain("budget-exhausted");
  });

  it("keeps a real build failure as a model-failure, not inconclusive", () => {
    const run = makeRun({
      validation: {
        projectExists: true,
        steps: { install: stepResult("bun install", 0), build: stepResult("bun run build", 1) },
      },
    });

    expect(classifyOutcome(run)).toBe("model-failure");
  });

  it("excludes infra-inconclusive runs from the pass-rate denominator", () => {
    const ok = makeRun();
    const inconclusive = makeRun({
      id: "ai-search-workbench-claude-opus-4-8-high-mcp-r02",
      trial: 2,
      validation: {
        projectExists: true,
        steps: { install: stepResult("uv sync", 127, { spawnError: true }) },
      },
    });

    const aggregates = aggregateResults([ok, inconclusive]).leaderboard;

    expect(aggregates).toHaveLength(1);
    expect(aggregates[0]).toMatchObject({
      runs: 2,
      scoredRuns: 1,
      inconclusiveCount: 1,
      passCount: 1,
      passRate: 100,
    });
  });
});

describe("ScaffBench 2 statistical reporting", () => {
  const passing = () => ({
    projectExists: true,
    steps: {
      install: { command: "bun install", exitCode: 0, timedOut: false, durationMs: 1, stdoutTail: "", stderrTail: "" },
    },
  });
  const failing = () => ({
    projectExists: true,
    steps: {
      build: { command: "bun run build", exitCode: 1, timedOut: false, durationMs: 1, stdoutTail: "", stderrTail: "" },
    },
  });

  it("macro-averages per spec and reports pass@k / pass^k instead of one pooled binomial", () => {
    const runs = [
      makeRun({ id: "a1", specId: "spec-a", trial: 1, validation: passing() }),
      makeRun({ id: "a2", specId: "spec-a", trial: 2, validation: passing() }),
      makeRun({ id: "b1", specId: "spec-b", trial: 1, validation: passing() }),
      makeRun({ id: "b2", specId: "spec-b", trial: 2, validation: failing() }),
    ];

    const [cell] = aggregateResults(runs).leaderboard;

    expect(cell).toMatchObject({
      scoredRuns: 4,
      passCount: 3,
      passRate: 75, // pooled
      macroPassRate: 75, // mean of per-spec rates (100 + 50) / 2
      specCount: 2,
      passAnySpecs: 2, // both specs pass at least once (pass@k)
      passAllSpecs: 1, // only spec-a passes every repeat (pass^k)
      ciReportable: false, // 4 < MIN_CI_RUNS
    });
  });

  it("only reports the Wilson CI once a cell reaches the minimum sample size", () => {
    const runs = Array.from({ length: 8 }, (_, i) =>
      makeRun({ id: `r${i}`, specId: `spec-${i % 2}`, trial: i, validation: passing() }),
    );

    const [cell] = aggregateResults(runs).leaderboard;

    expect(cell).toMatchObject({ scoredRuns: 8, ciReportable: true });
  });

  it("does not count a partially-inconclusive spec as pass^k", () => {
    const stepFail127 = {
      command: "uv sync",
      exitCode: 127,
      timedOut: false,
      spawnError: true,
      durationMs: 1,
      stdoutTail: "",
      stderrTail: "",
    };
    const runs = [
      makeRun({ id: "x1", specId: "spec-x", trial: 1, validation: passing() }),
      makeRun({
        id: "x2",
        specId: "spec-x",
        trial: 2,
        validation: { projectExists: true, steps: { install: stepFail127 } },
      }),
    ];

    const [cell] = aggregateResults(runs).leaderboard;

    // 1 passing scored repeat + 1 infra-inconclusive: measured once, not "every repeat".
    expect(cell).toMatchObject({
      scoredRuns: 1,
      inconclusiveCount: 1,
      passAnySpecs: 1, // solved at least once
      passAllSpecs: 0, // NOT solved on every repeat (one was unmeasured)
      macroPassRate: 100, // the one measured repeat passed
    });
  });

  it("reports sub-dollar average cost without integer rounding", () => {
    const cheap = (id: string) =>
      makeRun({
        id,
        claude: { exitCode: 0, timedOut: false, durationMs: 1000, totalCostUsd: 0.4 },
        validation: passing(),
      });

    const [cell] = aggregateResults([cheap("c1"), cheap("c2")]).leaderboard;

    expect(cell?.avgCostUsd).toBeCloseTo(0.4, 5);
  });
});

describe("ScaffBench 2 resolution robustness", () => {
  it("disambiguates the project directory by manifest when a stray dir exists", async () => {
    const runDir = await mkdtemp(join(tmpdir(), "sb21-find-"));
    try {
      await mkdir(join(runDir, "scratch-notes"), { recursive: true });
      await mkdir(join(runDir, "the-project"), { recursive: true });
      await writeFile(join(runDir, "the-project", "package.json"), "{}");

      expect(await findProjectDir(runDir, "missing-name")).toBe(join(runDir, "the-project"));
    } finally {
      await rm(runDir, { recursive: true, force: true });
    }
  });

  it("returns the exact project dir when present", async () => {
    const runDir = await mkdtemp(join(tmpdir(), "sb21-find-"));
    try {
      await mkdir(join(runDir, "proj"), { recursive: true });
      expect(await findProjectDir(runDir, "proj")).toBe(join(runDir, "proj"));
    } finally {
      await rm(runDir, { recursive: true, force: true });
    }
  });

  it("extracts the Claude result JSON despite surrounding noise", () => {
    expect(parseClaudeResult('warning: banner\n{"total_cost_usd":1.5}\n')).toMatchObject({
      total_cost_usd: 1.5,
    });
    expect(parseClaudeResult('{"a":1}')).toMatchObject({ a: 1 });
    expect(parseClaudeResult("no json here")).toBeNull();
  });
});

describe("ScaffBench 2 composite index", () => {
  const failingBuild = () => ({
    projectExists: true,
    steps: {
      build: { command: "bun run build", exitCode: 1, timedOut: false, durationMs: 1, stdoutTail: "", stderrTail: "" },
    },
  });
  const stack80 = { matched: 8, total: 10, percent: 80, misses: [] };
  const tool50 = { score: 1, total: 2, checks: [] };

  it("computes the weighted index and median/p95 latency", () => {
    const runs = [
      makeRun({
        id: "i1",
        specId: "spec-a",
        trial: 1,
        claude: { exitCode: 0, timedOut: false, durationMs: 1000 },
        stackScore: stack80,
        toolCompliance: tool50,
      }),
      makeRun({
        id: "i2",
        specId: "spec-a",
        trial: 2,
        claude: { exitCode: 0, timedOut: false, durationMs: 3000 },
        validation: failingBuild(),
        stackScore: stack80,
        toolCompliance: tool50,
      }),
    ];

    const [cell] = aggregateResults(runs).leaderboard;

    expect(cell).toMatchObject({
      macroPassRate: 50,
      stackPercent: 80,
      commandDisciplinePercent: 50,
      index: 58, // round(0.6*50 + 0.25*80 + 0.15*50) = round(57.5)
      medianDurationMs: 1000,
      p95DurationMs: 3000,
    });
  });

  it("sorts the leaderboard by index descending", () => {
    const high = makeRun({ id: "h", path: "mcp" });
    const low = makeRun({
      id: "l",
      path: "prompt",
      validation: failingBuild(),
      stackScore: { matched: 2, total: 10, percent: 20, misses: [] },
      toolCompliance: { score: 0, total: 2, checks: [] },
    });

    const board = aggregateResults([high, low]).leaderboard;

    expect(board[0]?.path).toBe("mcp");
    expect(board[0]?.index ?? 0).toBeGreaterThan(board[1]?.index ?? 0);
  });
});

describe("ScaffBench 2 discovery lane", () => {
  const rustSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "rust-leptos-axum")!;

  it("drops the library names in the natural lane for specs with acceptance sets", () => {
    const naturalAi = promptFor(aiSpec, "prompt", "/tmp/run", "wb", "natural");
    const explicitAi = promptFor(aiSpec, "prompt", "/tmp/run", "wb", "explicit");
    const naturalRust = promptFor(rustSpec, "prompt", "/tmp/run", "wb", "natural");

    // ai-search has acceptance sets → discovery lane omits the scoring rule + names
    expect(naturalAi).not.toContain("Important scoring rule");
    expect(naturalAi).not.toContain("Qdrant");
    // explicit lane still names the required libraries
    expect(explicitAi).toContain("Important scoring rule");
    // rust has no acceptance sets yet → it is NOT a discovery spec, notes stay
    expect(naturalRust).toContain("Important scoring rule");
  });

  it("falls back to tsc --noEmit so typecheck cannot be dodged", () => {
    expect(typecheckGate({ "check-types": "tsc" }, true)).toBe("check-types");
    expect(typecheckGate({ typecheck: "tsc" }, true)).toBe("typecheck");
    // no script but a tsconfig exists → must still type-check
    expect(typecheckGate({}, true)).toBe("tsc");
    // genuinely nothing to type-check
    expect(typecheckGate({}, false)).toBeNull();
  });

  it("credits an accepted alternative library (pgvector for semantic search)", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sb21-accept-"));
    try {
      await writeFile(
        join(dir, "package.json"),
        JSON.stringify({
          dependencies: {
            next: "*",
            hono: "*",
            "drizzle-orm": "*",
            "better-auth": "*",
            ai: "*",
            pgvector: "*", // alternative to the canonical qdrant
            meilisearch: "*", // alternative to the canonical opensearch
            bullmq: "*", // alternative to the canonical inngest
            pino: "*",
            vitest: "*",
            i18next: "*",
          },
        }),
      );
      await mkdir(join(dir, ".github", "workflows"), { recursive: true });
      await writeFile(join(dir, ".github", "workflows", "ci.yml"), "name: ci");

      const { acceptance } = await scoreProject(aiSpec, dir, "natural");
      expect(acceptance).toMatchObject({ matched: 12, total: 12 });

      // explicit lane returns no acceptance score (strict markers only)
      const explicit = await scoreProject(aiSpec, dir, "explicit");
      expect(explicit.acceptance).toBeUndefined();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("ScaffBench 2 restraint spec", () => {
  const minimalSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "ts-minimal-restraint")!;

  it("exists as an opt-in extended spec (not in the default core suite)", () => {
    expect(minimalSpec.lane).toBe("extended");
    expect(parseArgs([]).specs).not.toContain("ts-minimal-restraint");
  });

  it("penalizes an over-engineered project but passes a lean one", async () => {
    const overDir = await mkdtemp(join(tmpdir(), "sb21-over-"));
    const leanDir = await mkdtemp(join(tmpdir(), "sb21-lean-"));
    try {
      // over-engineered: adds a backend + auth the spec forbids
      await writeFile(
        join(overDir, "package.json"),
        JSON.stringify({
          dependencies: { react: "*", vite: "*", tailwindcss: "*", hono: "*", "better-auth": "*" },
        }),
      );
      const over = await scoreArtifact(minimalSpec, overDir);
      expect(over.misses).toContain("forbidden:backend");
      expect(over.misses).toContain("forbidden:auth");
      expect(over.misses).not.toContain("frontend:react-vite");

      // lean: only allowed libraries → all markers (incl. absent forbidden) match
      await writeFile(
        join(leanDir, "package.json"),
        JSON.stringify({ dependencies: { react: "*", vite: "*", tailwindcss: "*" } }),
      );
      const lean = await scoreArtifact(minimalSpec, leanDir);
      expect(lean.matched).toBe(lean.total);
    } finally {
      await rm(overDir, { recursive: true, force: true });
      await rm(leanDir, { recursive: true, force: true });
    }
  });
});

describe("ScaffBench 2 acceptance matching precision (Codex #258)", () => {
  it("does not credit acceptance from substrings (ai⊂tailwindcss, vite⊂vitest)", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sb21-substr-"));
    try {
      // tailwindcss contains "ai"; vitest contains "vite" — neither should
      // satisfy the ai / web-framework capabilities under precise matching.
      await writeFile(
        join(dir, "package.json"),
        JSON.stringify({ dependencies: { tailwindcss: "*", vitest: "*" } }),
      );
      const { acceptance } = await scoreProject(aiSpec, dir, "natural");
      expect(acceptance?.misses).toContain("ai");
      expect(acceptance?.misses).toContain("web-framework");
      // vitest DOES satisfy the testing capability (exact dep)
      expect(acceptance?.misses).not.toContain("testing");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("counts a no-project discovery run as 0 acceptance in the average", () => {
    const wired = makeRun({
      id: "acc-a",
      acceptanceScore: { matched: 12, total: 12, percent: 100, misses: [] },
    });
    const noProject = makeRun({
      id: "acc-b",
      acceptanceScore: { matched: 0, total: 12, percent: 0, misses: ["project not found"] },
    });

    const [cell] = aggregateResults([wired, noProject]).leaderboard;

    expect(cell?.acceptancePercent).toBe(50); // (100 + 0) / 2, not 100
  });
});

describe("ScaffBench 2 command discipline from trajectory (P2)", () => {
  const streamJson = (...events: object[]) =>
    `${events.map((event) => JSON.stringify(event)).join("\n")}\n`;
  const claudeOutput = (stdout: string): any => ({
    command: "claude",
    exitCode: 0,
    timedOut: false,
    spawnError: false,
    durationMs: 1,
    stdout,
    stderr: "",
    stdoutTail: "",
    stderrTail: "",
  });
  const bashUse = (command: string) => ({
    type: "assistant",
    message: { content: [{ type: "tool_use", name: "Bash", input: { command } }] },
  });
  const mcpUse = (name: string) => ({
    type: "assistant",
    message: { content: [{ type: "tool_use", name, input: {} }] },
  });
  const resultEvent = {
    type: "result",
    subtype: "success",
    total_cost_usd: 1.2,
    usage: { output_tokens: 3000 },
    session_id: "abc",
  };

  it("parses the result line and tool_use events from a stream-json transcript", () => {
    const out = streamJson(bashUse("bun create better-fullstack@2.1.1 app --dry-run"), resultEvent);
    expect(parseClaudeResult(out)).toMatchObject({ total_cost_usd: 1.2, session_id: "abc" });
    const uses = extractToolUses(out);
    expect(uses).toHaveLength(1);
    expect(uses[0]).toMatchObject({ name: "Bash" });
    expect(uses[0]?.command).toContain("--dry-run");
  });

  it("scores the CLI path on actual bun-create + dry-run tool calls", async () => {
    const out = streamJson(
      bashUse("bun create better-fullstack@2.1.1 app --dry-run"),
      bashUse("bun create better-fullstack@2.1.1 app --no-install"),
      resultEvent,
    );
    expect(await scoreToolCompliance("cli", null, claudeOutput(out))).toMatchObject({
      score: 3,
      total: 3,
    });
  });

  it("fails dry-run-first when the real scaffold precedes the dry-run", async () => {
    // Scaffolds for real, THEN dry-runs — presence is satisfied but the order is
    // wrong, so the discipline check must fail (it previously passed on presence).
    const out = streamJson(
      bashUse("bun create better-fullstack@2.1.1 app --no-install"),
      bashUse("bun create better-fullstack@2.1.1 app --dry-run"),
      resultEvent,
    );
    const tc = await scoreToolCompliance("cli", null, claudeOutput(out));
    expect(tc.checks.find((check) => check.id === "dry-run-first")?.status).toBe("fail");
  });

  it("ignores --help probes when checking dry-run-first ordering", async () => {
    const out = streamJson(
      bashUse("bun create better-fullstack@2.1.1 --help"),
      bashUse("bun create better-fullstack@2.1.1 app --dry-run"),
      bashUse("bun create better-fullstack@2.1.1 app --no-install"),
      resultEvent,
    );
    const tc = await scoreToolCompliance("cli", null, claudeOutput(out));
    expect(tc.checks.find((check) => check.id === "dry-run-first")?.status).toBe("pass");
  });

  it("fails a prompt-only run that shells out to the BF CLI", async () => {
    const out = streamJson(bashUse("bun create better-fullstack@2.1.1 app"), resultEvent);
    const tc = await scoreToolCompliance("prompt", null, claudeOutput(out));
    expect(tc.checks.find((check) => check.id === "no-bf-tool")?.status).toBe("fail");
  });

  it("passes the MCP path when bfs_create_project is actually called", async () => {
    const out = streamJson(mcpUse("mcp__better-fullstack__bfs_create_project"), resultEvent);
    expect(await scoreToolCompliance("mcp", null, claudeOutput(out))).toMatchObject({
      score: 2,
      total: 2,
    });
  });
});

describe("ScaffBench 2 acceptance scoped-prefix (Codex #261)", () => {
  it("matches a scoped-prefix pattern like @auth/ against @auth/core", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sb21-authjs-"));
    try {
      await writeFile(
        join(dir, "package.json"),
        JSON.stringify({ dependencies: { "@auth/core": "*", "@auth/drizzle-adapter": "*" } }),
      );
      const { acceptance } = await scoreProject(aiSpec, dir, "natural");
      // Auth.js via @auth/core must satisfy the auth capability (not be a miss).
      expect(acceptance?.misses).not.toContain("auth");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("codex (GPT) agent adapter", () => {
  it("routes models to the right provider", () => {
    expect(providerForModel("gpt-5.5")).toBe("codex");
    expect(providerForModel("o3")).toBe("codex");
    expect(providerForModel("codex-mini")).toBe("codex");
    expect(providerForModel("claude-opus-4-7")).toBe("claude");
    expect(providerForModel("opus")).toBe("claude");
  });

  it("parses codex JSONL usage + session, leaving cost undefined", () => {
    const jsonl = [
      `{"type":"thread.started","thread_id":"t-123"}`,
      `{"type":"item.completed","item":{"type":"agent_message","text":"done"}}`,
      `{"type":"turn.completed","usage":{"input_tokens":1000,"cached_input_tokens":800,"output_tokens":120,"reasoning_output_tokens":30}}`,
    ].join("\n");
    const parsed = parseCodexResult(jsonl);
    expect(parsed?.session_id).toBe("t-123");
    // output tokens = answer + reasoning, so thinking cost is visible.
    expect(parsed?.usage?.output_tokens).toBe(150);
    expect(parsed?.total_cost_usd).toBeUndefined();
    expect(parseCodexResult("not json")).toBeNull();
  });

  it("extractToolUses understands codex mcp_tool_call + command_execution", () => {
    const jsonl = [
      `{"type":"item.completed","item":{"type":"mcp_tool_call","server":"bfs","tool":"bfs_create_project","arguments":{}}}`,
      `{"type":"item.completed","item":{"type":"command_execution","command":"/bin/zsh -lc 'bun create better-fullstack app --dry-run'","exit_code":0}}`,
    ].join("\n");
    const uses = extractToolUses(jsonl);
    expect(uses.some((u) => /bfs_create_project/i.test(u.name))).toBe(true);
    const bash = uses.filter((u) => /(^|_)bash$/i.test(u.name)).map((u) => u.command ?? "");
    expect(bash.some((c) => /create\s+better-fullstack/.test(c))).toBe(true);
    expect(bash.some((c) => c.includes("--dry-run"))).toBe(true);
  });
});

describe("opencode / Kilo Code agent adapter", () => {
  it("routes opencode/* and kilo/* models to their providers", () => {
    expect(providerForModel("opencode/north-mini-code-free")).toBe("opencode");
    expect(providerForModel("kilo/poolside/laguna-m.1:free")).toBe("kilo");
    // Bare provider/model strings that aren't opencode/kilo fall through normally.
    expect(providerForModel("gpt-5.5")).toBe("codex");
    expect(providerForModel("claude-opus-4-8")).toBe("claude");
  });

  it("labels the driving agent from the model (no more hardcoded 'Claude Code')", () => {
    expect(agentLabelForModel("claude-opus-4-8")).toBe("Claude Code");
    expect(agentLabelForModel("gpt-5.5")).toBe("Codex");
    expect(agentLabelForModel("opencode/north-mini-code-free")).toBe("opencode");
    expect(agentLabelForModel("kilo/nvidia/nemotron-3-super-120b-a12b:free")).toBe("Kilo Code");
  });

  it("parses opencode JSONL session, summed tokens, and cost", () => {
    const jsonl = [
      `{"sessionID":"ses_0faabff1","type":"session.updated"}`,
      `{"part":{"type":"text","text":"thinking"}}`,
      `{"part":{"type":"step-finish","tokens":{"output":40,"reasoning":10},"cost":0}}`,
      `{"part":{"type":"step-finish","tokens":{"output":3,"reasoning":0},"cost":0}}`,
    ].join("\n");
    const parsed = parseOpencodeResult(jsonl);
    expect(parsed?.session_id).toBe("ses_0faabff1");
    // output = answer + reasoning, summed across step-finish events: (40+10)+(3+0).
    expect(parsed?.usage?.output_tokens).toBe(53);
    expect(parsed?.total_cost_usd).toBe(0);
    expect(parseOpencodeResult("not json")).toBeNull();
  });

  it("extractToolUses understands opencode tool parts (mcp + bash)", () => {
    const jsonl = [
      `{"part":{"type":"tool","tool":"better-fullstack_bfs_create_project","state":{"status":"completed"}}}`,
      `{"part":{"type":"tool","tool":"bash","state":{"input":{"command":"bun create better-fullstack app --dry-run"}}}}`,
    ].join("\n");
    const uses = extractToolUses(jsonl);
    expect(uses.some((u) => /bfs_create_project/i.test(u.name))).toBe(true);
    const bash = uses.filter((u) => /(^|_)bash$/i.test(u.name)).map((u) => u.command ?? "");
    expect(bash.some((c) => /create\s+better-fullstack/.test(c))).toBe(true);
    expect(bash.some((c) => c.includes("--dry-run"))).toBe(true);
  });
});
