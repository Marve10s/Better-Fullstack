import type { ProjectConfig } from "@better-fullstack/types";

import { runProductionStartCheck } from "@testing/lib/dev-check";
import { makeBaseConfig } from "@testing/lib/presets";
import {
  dockerFailure,
  getVerifier,
  runWithRegistryPropagationRetry,
  verifyElixir,
  verifyTypeScript,
} from "@testing/lib/verify";
import { describe, expect, it } from "bun:test";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("smoke verifiers", () => {
  it("routes Elixir smoke combos to the Elixir verifier", () => {
    expect(getVerifier("elixir")).toBe(verifyElixir);
  });

  it("retries short npm publication races before treating an install as broken", async () => {
    const sleeps: number[] = [];
    let attempts = 0;

    const result = await runWithRegistryPropagationRetry(
      async () => {
        attempts++;
        return attempts === 1
          ? {
              step: "install",
              success: false,
              durationMs: 5,
              stderr:
                'error: No version matching "7.0.88" found for specifier "ai" (but package exists)',
              classification: "template",
            }
          : { step: "install", success: true, durationMs: 7, stdout: "x".repeat(4000) };
      },
      {
        delaysMs: [20, 40],
        sleep: async (durationMs) => {
          sleeps.push(durationMs);
        },
      },
    );

    expect(result.success).toBe(true);
    expect(result.durationMs).toBe(32);
    expect(result.stdout).toContain("Registry propagation attempts: 2.");
    expect(result.stdout?.length).toBeLessThanOrEqual(4000);
    expect(attempts).toBe(2);
    expect(sleeps).toEqual([20]);
  });

  it("keeps a missing dependency version gating after bounded retries", async () => {
    let attempts = 0;
    const result = await runWithRegistryPropagationRetry(
      async () => {
        attempts++;
        return {
          step: "install",
          success: false,
          durationMs: 1,
          stderr:
            'error: No version matching "99.0.0" found for specifier "ai" (but package exists)',
          classification: "template",
        };
      },
      { delaysMs: [0, 0], sleep: async () => {} },
    );

    expect(result.success).toBe(false);
    expect(result.classification).toBe("template");
    expect(attempts).toBe(3);
  });

  it("gates a Docker build that times out, since a hang is not proof of a network fault", () => {
    const result = dockerFailure({
      step: "docker-build",
      success: false,
      durationMs: 900_000,
      stderr: "#9 [builder 4/5] RUN pnpm --filter server build\nProcess timed out after 900s.",
      timedOut: true,
      classification: "environment",
    });

    expect(result.classification).toBe("template");
  });

  it("treats only an explicit registry or network error as environmental", () => {
    const failure = (stderr: string) =>
      dockerFailure({ step: "docker-build", success: false, durationMs: 1, stderr, exitCode: 1 })
        .classification;

    expect(
      failure(
        'ERROR: failed to solve: node:24-alpine: failed to resolve source metadata for docker.io/library/node:24-alpine: failed to do request: Head "https://registry-1.docker.io/v2/library/node/manifests/24-alpine": dial tcp: lookup registry-1.docker.io: no such host',
      ),
    ).toBe("environment");
    expect(
      failure(
        " ERR_PNPM_META_FETCH_FAIL  GET https://registry.npmjs.org/hono: request to https://registry.npmjs.org/hono failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org",
      ),
    ).toBe("environment");
    expect(
      failure(
        " WARN  GET https://registry.npmjs.org/hono error (ECONNRESET). Will retry in 10 seconds.\n#10 ERROR: process \"/bin/sh -c pnpm --filter server build\" did not complete successfully: exit code: 2\nsrc/index.ts(3,1): error TS2307: Cannot find module './routers'",
      ),
    ).toBe("template");
    expect(
      failure(
        "#5 [internal] load metadata for docker.io/library/node:24-alpine\nERROR: failed to solve",
      ),
    ).toBe("template");
  });

  it("removes the named container when `docker run` fails after creating it", async () => {
    const dir = mkdtempSync(join(tmpdir(), "bfs-fake-docker-"));
    const log = join(dir, "calls.log");
    writeFileSync(
      join(dir, "docker"),
      `#!/bin/sh
echo "$*" >> "${log}"
if [ "$1" = run ]; then
  echo "docker: Error response from daemon: driver failed programming external connectivity" >&2
  exit 125
fi
`,
    );
    chmodSync(join(dir, "docker"), 0o755);
    const path = process.env.PATH;
    process.env.PATH = `${dir}:${path}`;

    try {
      const result = await verifyTypeScript("docker-run-fails", dir, {
        strict: true,
        runtimeChecks: [{ kind: "docker-image", env: {} }],
      });
      const calls = readFileSync(log, "utf-8").trim().split("\n");
      const container = calls.find((call) => call.startsWith("run "))?.match(/--name (\S+)/)?.[1];

      expect(result.overallSuccess).toBe(false);
      expect(result.steps.at(-1)?.classification).toBe("template");
      expect(container).toStartWith("bfs-smoke-docker-run-fails-");
      expect(calls).toContain(`rm --force ${container}`);
      expect(calls).toContain("image rm --force bfs-smoke-docker-run-fails");
    } finally {
      process.env.PATH = path;
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("gates a production server that exits before serving, even on a database error", async () => {
    const dir = mkdtempSync(join(tmpdir(), "bfs-serve-exits-"));
    const web = join(dir, "apps", "web");
    mkdirSync(web, { recursive: true });
    writeFileSync(join(web, "package.json"), JSON.stringify({ scripts: { serve: "bun exit.ts" } }));
    writeFileSync(
      join(web, "exit.ts"),
      'console.error("PrismaClientInitializationError: Can\'t reach database server at localhost:5432");\nprocess.exit(1);\n',
    );
    const config = {
      ...makeBaseConfig("serve-exits", "typescript"),
      frontend: ["tanstack-start"],
      database: "postgres",
    } satisfies ProjectConfig;

    try {
      const result = await runProductionStartCheck(dir, config, ["/"]);

      expect(result.success).toBe(false);
      expect(result.stderr).toContain("exited with code 1");
      expect(result.classification).toBe("template");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
