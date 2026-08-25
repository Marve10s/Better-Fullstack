import { describe, expect, it } from "bun:test";

import {
  classifySetupFailure,
  sanitizeTelemetryConfig,
  sanitizeTelemetryOutcome,
  statusFromCommandResult,
} from "@/telemetry/analytics";

describe("telemetry privacy boundary", () => {
  it("keeps product identifiers while dropping user content and paths", () => {
    expect(
      sanitizeTelemetryConfig({
        ecosystem: "typescript",
        backend: "hono",
        addons: ["mcp", "skills"],
        install: false,
        projectName: "secret-client",
        projectDir: "/Users/person/work/secret-client",
        brief: "build my confidential medical product",
        content: "const secret = process.env.API_KEY",
        filename: "private.ts",
        logs: "token-leaked-here",
        apiKey: "sk-private",
        contact: "person@example.com",
        arbitrary: "free form prose with spaces",
        pathLike: "../../private/file",
      }),
    ).toEqual({
      ecosystem: "typescript",
      backend: "hono",
      addons: ["mcp", "skills"],
      install: false,
    });
  });

  it("strips owner names from raw part specs", () => {
    const safe = sanitizeTelemetryConfig({
      part: ["customer-api.testing:typescript:storybook", "frontend:typescript:next"],
    });

    expect(safe.part).toBeUndefined();
    expect(safe.stackPartSelections).toEqual([
      "testing:typescript:storybook",
      "frontend:typescript:next",
    ]);
    expect(JSON.stringify(safe)).not.toContain("customer-api");
  });

  it("drops part specs that are not registered stack selections", () => {
    const safe = sanitizeTelemetryConfig({
      part: [
        "frontend:typescript:internal-secret-tool",
        "not-a-role:typescript:next",
        "frontend:not-an-ecosystem:next",
        "frontend:typescript:next",
      ],
    });

    expect(safe.stackPartSelections).toEqual(["frontend:typescript:next"]);
    expect(JSON.stringify(safe)).not.toContain("internal-secret-tool");
  });

  it("keeps only canonical command dimensions and drops the duplicate MCP tool field", () => {
    expect(
      sanitizeTelemetryConfig({
        backend: "customer-private-backend",
        targetEcosystem: "go",
        generatorKind: "resource",
        registryAction: "list",
        mcpTool: "bfs_get_guidance",
      }),
    ).toEqual({
      targetEcosystem: "go",
      generatorKind: "resource",
      registryAction: "list",
    });

    expect(sanitizeTelemetryOutcome({ action: "bfs_get_guidance" }).action).toBe(
      "bfs_get_guidance",
    );
  });

  it("retains normalized graph dimensions without paths or settings", () => {
    expect(
      sanitizeTelemetryConfig({
        stackParts: [
          {
            id: "backend:go:gin",
            role: "backend",
            toolId: "gin",
            ecosystem: "go",
            source: "selected",
            targetPath: "apps/server",
          },
          {
            id: "frontend:typescript:next",
            role: "frontend",
            toolId: "next",
            ecosystem: "typescript",
            source: "selected",
            settings: { privateValue: "must-not-escape" },
          },
          {
            id: "backend:go:gin.runtime:go:stdlib",
            role: "runtime",
            toolId: "stdlib",
            ecosystem: "go",
            source: "provided",
          },
        ],
      }),
    ).toEqual({
      stackPartSelections: ["backend:go:gin", "frontend:typescript:next"],
      stackPartRoles: ["backend", "frontend"],
      stackPartEcosystems: ["go", "typescript"],
      multiEcosystem: true,
    });
  });

  it("bounds the outcome vocabulary and leaves started/cancelled success unknown", () => {
    expect(
      sanitizeTelemetryOutcome({
        source: "cli-flags",
        action: "update",
        status: "started",
        success: undefined,
        mode: "dry-run",
        errorName: "/private/path Error: user content",
        setupFailures: ["Install dependencies", "raw failure with a path /tmp/x"],
        durationMs: Number.POSITIVE_INFINITY,
        conflictCount: 3.7,
      }),
    ).toMatchObject({
      source: "cli-flags",
      action: "update",
      status: "started",
      mode: "dry-run",
      errorName: undefined,
      setupFailures: ["install-dependencies"],
      durationMs: undefined,
      conflictCount: 4,
    });
  });

  it("drops arbitrary identifier-shaped outcome values", () => {
    expect(
      sanitizeTelemetryOutcome({
        action: "private-customer",
        mode: "secret-mode",
        errorName: "PrivateCustomerError",
        failureStage: "secret-stage",
        failureReason: "secret-reason",
        setupFailures: ["secret-step"],
      }),
    ).toMatchObject({
      action: undefined,
      mode: undefined,
      errorName: undefined,
      failureStage: undefined,
      failureReason: undefined,
      setupFailures: undefined,
    });
  });

  it("normalizes known setup steps without admitting arbitrary prose", () => {
    expect(
      sanitizeTelemetryOutcome({
        setupFailures: [
          "Install dependencies",
          "Database setup",
          "Cargo build",
          "uv sync --extra dev (Python dependencies)",
          "pip install (Python dependencies)",
          "poetry install (Python dependencies)",
          "go mod tidy",
          "Maven tests",
          "Gradle tests",
          "mix deps.get / compile",
          "raw failure with a path /tmp/private",
        ],
      }).setupFailures,
    ).toEqual([
      "install-dependencies",
      "database-setup",
      "cargo-build",
      "python-uv-sync",
      "python-pip-install",
      "python-poetry-install",
      "go-mod-tidy",
      "maven-tests",
      "gradle-tests",
      "elixir-deps-compile",
    ]);
  });

  it("classifies handled command failures separately from cancellation", () => {
    expect(statusFromCommandResult(undefined)).toBe("cancelled");
    expect(statusFromCommandResult({ success: true })).toBe("succeeded");
    expect(statusFromCommandResult({ success: false })).toBe("failed");
  });
});

describe("setup failure classification", () => {
  it("maps real package-manager errors to their reason code", () => {
    const cases: Array<[string, string]> = [
      [
        "Command failed with exit code 1: npm install\nnpm error code ERESOLVE\nnpm error ERESOLVE unable to resolve dependency tree",
        "peer-conflict",
      ],
      ["npm error Cannot read properties of null (reading 'edgesOut')", "arborist-crash"],
      [
        "npm error code E404\nnpm error 404 Not Found - GET https://registry.npmjs.org/nope",
        "registry-not-found",
      ],
      ["Error: ENOSPC: no space left on device, write", "disk-space"],
      [
        "Error: EPERM: operation not permitted, unlink 'C:\\Users\\x\\node_modules\\.bin'",
        "permission",
      ],
      ["Error: ENAMETOOLONG: name too long", "path-too-long"],
      ["request to https://registry.npmjs.org/x failed, reason: ECONNRESET", "network"],
      ["spawn pnpm ENOENT", "missing-tool"],
      ["npm error code EBADENGINE\nnpm error notsup Unsupported engine", "engine-mismatch"],
      ["gyp ERR! build error\nnode-gyp failed", "build-script-failed"],
      ["ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with frozen-lockfile", "lockfile-mismatch"],
    ];

    for (const [message, expected] of cases) {
      expect(classifySetupFailure(message)).toBe(expected);
    }
  });

  it("never lets an unrecognised message through as its own text", () => {
    const secret = "Command failed: /Users/person/secret-client/.npmrc token=sk-private";
    expect(classifySetupFailure(secret)).toBe("unknown");
    expect(classifySetupFailure(undefined)).toBe("unknown");
  });

  it("drops a failure reason that is not in the allowed vocabulary", () => {
    expect(
      sanitizeTelemetryOutcome({
        failureStage: "Install dependencies",
        failureReason: "/Users/person/project blew up",
      }),
    ).toMatchObject({ failureStage: "install-dependencies", failureReason: undefined });

    expect(
      sanitizeTelemetryOutcome({
        failureStage: "Install dependencies",
        failureReason: "peer-conflict",
      }),
    ).toMatchObject({ failureStage: "install-dependencies", failureReason: "peer-conflict" });
  });
});
