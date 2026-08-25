import { dependencyVersionMap } from "@better-fullstack/template-generator";
import {
  analyzeStackCompatibility,
  getDisabledReason,
  IntegrationsSchema,
  parseStackPartSpecs,
} from "@better-fullstack/types";
import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

import { createVirtual } from "@/index";
import { resolveIntegrationsPrompt } from "@/prompts/services/integrations";
import { buildCompatibilityInputFromConfig } from "@/config/stack-compatibility";
import { createCustomConfig, expectSuccess, runTRPCTest } from "@test/support/test-utils";
import { readVirtualFileContent } from "@test/support/virtual-tree-utils";

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
    expect(packageJson).toContain(`"@nangohq/node": "${dependencyVersionMap["@nangohq/node"]}"`);
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
    expect(getDisabledReason({ ...input, webDeploy: "none" }, "webDeploy", "cloudflare")).toContain(
      "Cloudflare Workers",
    );
  });

  test("rejects unsupported Nango requests through createVirtual", async () => {
    const cases = [
      {
        options: { ecosystem: "python" as const, integrations: "nango" as const },
        error: "only available for the TypeScript ecosystem",
      },
      {
        options: { backend: "none" as const, integrations: "nango" as const },
        error: "No backend selected",
      },
      {
        options: { backend: "convex" as const, integrations: "nango" as const },
        error: "not available with Convex backend",
      },
      {
        options: {
          backend: "hono" as const,
          runtime: "workers" as const,
          integrations: "nango" as const,
        },
        error: "not available on Cloudflare Workers",
      },
      {
        options: {
          frontend: ["next" as const],
          backend: "self" as const,
          runtime: "none" as const,
          webDeploy: "cloudflare" as const,
          integrations: "nango" as const,
        },
        error: "not available on Cloudflare Workers",
      },
    ];

    const results = await Promise.all(cases.map(({ options }) => createVirtual(options)));

    for (const [index, { error }] of cases.entries()) {
      const result = results[index];
      expect(result).toBeDefined();
      if (!result) continue;
      expect(result.success).toBe(false);
      expect(result.error).toContain(error);
    }
  });

  test("rejects unsupported Nango requests through the public create API", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "nango-cloudflare-invalid",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        webDeploy: "cloudflare",
        integrations: "nango",
      }),
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("not available on Cloudflare Workers");
  });

  test("accepts createVirtual Nango owned by a graph TypeScript backend", async () => {
    const result = await createVirtual({
      projectName: "nango-native-graph",
      ecosystem: "react-native",
      frontend: ["native-bare"],
      backend: "none",
      runtime: "none",
      api: "none",
      integrations: "nango",
      stackParts: parseStackPartSpecs([
        "mobile:react-native:native-bare",
        "backend:typescript:hono",
        "backend.runtime:typescript:bun",
        "backend.integrations:typescript:nango",
      ]),
    });

    expect(result.success).toBe(true);
    expect(result.tree).toBeDefined();
    expect(readVirtualFileContent(result.tree!.root, "apps/server/src/lib/nango.ts")).toContain(
      'import { Nango } from "@nangohq/node"',
    );
  });
});
