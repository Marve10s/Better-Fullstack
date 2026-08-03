import {
  analyzeStackCompatibility,
  getDisabledReason,
  IntegrationsSchema,
} from "@better-fullstack/types";
import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

import { resolveIntegrationsPrompt } from "../src/prompts/integrations";
import { buildCompatibilityInputFromConfig } from "../src/utils/stack-compatibility";
import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";

describe("third-party integrations", () => {
  test("keeps the Nango option in the canonical schema", () => {
    expect(IntegrationsSchema.options).toEqual(["nango", "none"]);
  });

  test("generates the Nango SDK helper for a standalone backend", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "nango-hono",
        frontend: ["tanstack-router"],
        backend: "hono",
        integrations: "nango",
      }),
    );

    expectSuccess(result);
    const helper = await readFile(`${result.projectDir}/apps/server/src/lib/nango.ts`, "utf8");
    const packageJson = await readFile(`${result.projectDir}/apps/server/package.json`, "utf8");
    const env = await readFile(`${result.projectDir}/apps/server/.env`, "utf8");

    expect(helper).toContain('import { Nango } from "@nangohq/node"');
    expect(helper).toContain("new Nango");
    expect(packageJson).toContain('"@nangohq/node": "^0.71.3"');
    expect(env).toContain("NANGO_SECRET_KEY=nango_secret_your_key");
    expect(env).toContain("NANGO_HOST=");
  });

  test("places the Nango SDK helper in a self-hosted web app", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "nango-next",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        integrations: "nango",
      }),
    );

    expectSuccess(result);
    const helper = await readFile(`${result.projectDir}/apps/web/src/lib/nango.ts`, "utf8");
    const packageJson = await readFile(`${result.projectDir}/apps/web/package.json`, "utf8");

    expect(helper).toContain("new Nango");
    expect(packageJson).toContain('"@nangohq/node"');
  });

  test("auto-resolves unsupported stacks to none", () => {
    expect(resolveIntegrationsPrompt({ ecosystem: "python" }).autoValue).toBe("none");
    expect(resolveIntegrationsPrompt({ ecosystem: "typescript", backend: "none" }).autoValue).toBe(
      "none",
    );
    expect(
      resolveIntegrationsPrompt({ ecosystem: "typescript", backend: "convex" }).autoValue,
    ).toBe("none");
    expect(
      resolveIntegrationsPrompt({
        ecosystem: "typescript",
        backend: "hono",
        runtime: "workers",
      }).autoValue,
    ).toBe("none");
  });

  test("normalizes Nango away from Workers stacks", () => {
    const config = createCustomConfig({
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "workers",
      integrations: "nango",
    });
    const result = analyzeStackCompatibility(buildCompatibilityInputFromConfig(config));

    expect(result.adjustedStack?.integrations).toBe("none");
    expect(result.changes.some((change) => change.category === "integrations")).toBe(true);
  });

  test("normalizes Nango away from fullstack Cloudflare deployments", () => {
    const config = createCustomConfig({
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      webDeploy: "cloudflare",
      integrations: "nango",
    });
    const input = buildCompatibilityInputFromConfig(config);
    const result = analyzeStackCompatibility(input);

    expect(result.adjustedStack?.integrations).toBe("none");
    expect(result.changes.some((change) => change.category === "integrations")).toBe(true);
    expect(getDisabledReason(input, "integrations", "nango")).toContain("Cloudflare Workers");
    expect(
      getDisabledReason({ ...input, webDeploy: "none" }, "webDeploy", "cloudflare"),
    ).toContain("Cloudflare Workers");
  });
});
