import { describe, expect, it } from "bun:test";

import { sanitizeTelemetryConfig, sanitizeTelemetryOutcome } from "../src/utils/analytics";

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
});
