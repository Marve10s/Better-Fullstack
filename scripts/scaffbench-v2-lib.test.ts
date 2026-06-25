import { describe, expect, it } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  aggregateResults,
  canonicalCommand,
  classifyOutcome,
  deriveFailureTags,
  parseArgs,
  promptFor,
  runCommand,
  scoreArtifact,
  scoreBts,
  scoreProject,
  SCAFFBENCH_2_1_SPECS,
  validationPassed,
  type RunResult,
} from "./scaffbench-v2-lib";

const aiSpec = SCAFFBENCH_2_1_SPECS.find((spec) => spec.id === "ai-search-workbench")!;
const dotnetSpec = SCAFFBENCH_2_1_SPECS.find((spec) => spec.id === "multi-dotnet-ops")!;

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

describe("ScaffBench 2.1 harness config", () => {
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

describe("ScaffBench 2.1 scoring", () => {
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

describe("ScaffBench 2.1 artifact-grounded scoring", () => {
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

describe("ScaffBench 2.1 run outcomes", () => {
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
