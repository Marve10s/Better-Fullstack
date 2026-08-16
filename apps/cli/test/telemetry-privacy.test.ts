import { describe, expect, it } from "bun:test";

import {
  sanitizeTelemetryConfig,
  sanitizeTelemetryOutcome,
  statusFromCommandResult,
} from "../src/utils/analytics";

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
        setupFailures: ["install", "raw failure with a path /tmp/x"],
        durationMs: Number.POSITIVE_INFINITY,
        conflictCount: 3.7,
      }),
    ).toMatchObject({
      source: "cli-flags",
      action: "update",
      status: "started",
      mode: "dry-run",
      errorName: undefined,
      setupFailures: ["install"],
      durationMs: undefined,
      conflictCount: 4,
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
