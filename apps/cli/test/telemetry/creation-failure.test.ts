import { afterEach, describe, expect, it } from "bun:test";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createProjectHandler } from "@/helpers/core/command-handlers";
import { createProjectOperation } from "@/operations/project-create";
import { flushTelemetry, sanitizeTelemetryOutcome } from "@/telemetry/analytics";
import { ProjectCreationError, projectCreationFailure } from "@/telemetry/creation-failure";

const originalFetch = globalThis.fetch;
const originalEndpoint = process.env.BFS_TELEMETRY_INGEST_URL;
const originalDisabled = process.env.BTS_TELEMETRY_DISABLED;
const roots: string[] = [];

afterEach(async () => {
  await flushTelemetry();
  globalThis.fetch = originalFetch;
  if (originalEndpoint === undefined) delete process.env.BFS_TELEMETRY_INGEST_URL;
  else process.env.BFS_TELEMETRY_INGEST_URL = originalEndpoint;
  if (originalDisabled === undefined) delete process.env.BTS_TELEMETRY_DISABLED;
  else process.env.BTS_TELEMETRY_DISABLED = originalDisabled;
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

function capturePayloads() {
  const payloads: unknown[] = [];
  process.env.BFS_TELEMETRY_INGEST_URL = "https://telemetry.invalid/api/analytics/ingest";
  process.env.BTS_TELEMETRY_DISABLED = "0";
  globalThis.fetch = (async (_input: string | URL | Request, init?: RequestInit) => {
    if (typeof init?.body !== "string") throw new Error("Expected JSON telemetry body");
    payloads.push(JSON.parse(init.body));
    return new Response(null, { status: 204 });
  }) as typeof fetch;
  return payloads;
}

describe("creation failure diagnostics", () => {
  it("retains the original error type and maps only structured system codes", () => {
    const cause = Object.assign(new TypeError("secret-token /Users/private/client"), {
      code: "EACCES",
    });
    const error = new ProjectCreationError("wrapped private error", "file_write", cause);
    expect(sanitizeTelemetryOutcome(projectCreationFailure(error, "generation"))).toMatchObject({
      failureStage: "file_write",
      failureReason: "permission",
      errorName: "TypeError",
    });
    const safe = projectCreationFailure(new Error("EACCES secret-token"), "configuration");
    expect(safe.failureReason).toBe("unknown");
    expect(JSON.stringify(safe)).not.toContain("secret-token");
    expect(projectCreationFailure(new TypeError("private"), "configuration").failureReason).toBe(
      "type-error",
    );
  });

  it("reports a real MCP directory refusal with stack selections and preserves existing files", async () => {
    const payloads = capturePayloads();
    const root = await mkdtemp(join(tmpdir(), "bfs-failure-"));
    roots.push(root);
    const projectDir = join(root, "private-client");
    await mkdir(projectDir);
    const file = join(projectDir, "private.txt");
    await writeFile(file, "secret-token");
    await expect(
      createProjectOperation.invoke({
        projectName: "private-client",
        targetDir: root,
        ecosystem: "typescript",
        backend: "hono",
      }),
    ).rejects.toThrow("non-empty directory");
    await flushTelemetry();
    expect(payloads).toHaveLength(1);
    expect(payloads[0]).toMatchObject({
      eventType: "project_created",
      source: "mcp",
      success: false,
      ecosystem: "typescript",
      backend: "hono",
      failureStage: "directory_preparation",
      failureReason: "target-not-empty",
    });
    const wire = JSON.stringify(payloads);
    for (const forbidden of [
      root,
      "private-client",
      "private.txt",
      "secret-token",
      "non-empty directory",
    ])
      expect(wire).not.toContain(forbidden);
    expect(await readFile(file, "utf8")).toBe("secret-token");
  });

  it("reports verification errors after real generation with the resolved stack", async () => {
    const payloads = capturePayloads();
    const root = await mkdtemp(join(tmpdir(), "bfs-verification-failure-"));
    roots.push(root);
    const result = await createProjectHandler(
      {
        projectName: join(root, "private-client"),
        yes: true,
        install: false,
        git: false,
        verify: true,
        directoryConflict: "error",
      },
      {
        silent: true,
        generatedCheckRunner: async () => {
          throw new TypeError("private verification failure");
        },
      },
    );
    expect(result?.success).toBe(false);
    await flushTelemetry();
    expect(payloads).toHaveLength(1);
    expect(payloads[0]).toMatchObject({
      eventType: "project_created",
      success: false,
      ecosystem: "typescript",
      failureStage: "verification",
      failureReason: "type-error",
      errorName: "TypeError",
    });
    expect(JSON.stringify(payloads)).not.toContain("private");
  });

  it("retains safe input selections when CLI configuration resolution fails and honors opt-out", async () => {
    const payloads = capturePayloads();
    const input = {
      projectName: "private-client",
      ecosystem: "typescript" as const,
      backend: "hono" as const,
      config: "/private/config.json",
      fromHistory: 1,
    };
    const result = await createProjectHandler(input, { silent: true });
    expect(result?.success).toBe(false);
    await flushTelemetry();
    expect(payloads).toHaveLength(1);
    expect(payloads[0]).toMatchObject({
      eventType: "project_created",
      source: "programmatic",
      success: false,
      failureStage: "configuration",
      failureReason: "unknown",
      ecosystem: "typescript",
      backend: "hono",
    });
    expect(JSON.stringify(payloads)).not.toContain("private");
    await createProjectHandler({ ...input, disableAnalytics: true }, { silent: true });
    await flushTelemetry();
    expect(payloads).toHaveLength(1);
  });
});
