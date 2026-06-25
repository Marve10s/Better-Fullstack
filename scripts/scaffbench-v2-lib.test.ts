import { describe, expect, it } from "bun:test";

import {
  aggregateResults,
  canonicalCommand,
  deriveFailureTags,
  parseArgs,
  promptFor,
  runCommand,
  scoreBts,
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

  it("records missing spawned tools as failed commands", async () => {
    const result = await runCommand("scaffbench-missing-binary-for-test", [], process.cwd(), 1_000);

    expect(result.exitCode).toBe(127);
    expect(result.timedOut).toBe(false);
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
