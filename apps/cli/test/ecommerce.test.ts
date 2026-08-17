import { dependencyVersionMap } from "@better-fullstack/template-generator";
import { EcommerceSchema } from "@better-fullstack/types";
import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

import { resolveEcommercePrompt } from "../src/prompts/ecommerce";
import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";

describe("e-commerce integrations", () => {
  test("keeps the Medusa option in the canonical schema", () => {
    expect(EcommerceSchema.options).toEqual(["medusa", "none"]);
  });

  test("generates the Medusa SDK helper for a standalone backend", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "medusa-hono",
        frontend: ["tanstack-router"],
        backend: "hono",
        ecommerce: "medusa",
      }),
    );

    expectSuccess(result);
    const helper = await readFile(`${result.projectDir}/apps/server/src/lib/medusa.ts`, "utf8");
    const packageJson = await readFile(`${result.projectDir}/apps/server/package.json`, "utf8");
    const env = await readFile(`${result.projectDir}/apps/server/.env`, "utf8");

    expect(helper).toContain('from "@medusajs/js-sdk"');
    expect(helper).toContain('"default" in Medusa ? Medusa.default : Medusa');
    expect(helper).toContain("new MedusaClient");
    expect(helper).toContain("publishableKey");
    expect(packageJson).toContain(
      `"@medusajs/js-sdk": "${dependencyVersionMap["@medusajs/js-sdk"]}"`,
    );
    expect(env).toContain("MEDUSA_BACKEND_URL=http://localhost:9000");
    expect(env).toContain("MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key");
  });

  test("places the Medusa SDK helper in a self-hosted web app", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "medusa-next",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        ecommerce: "medusa",
      }),
    );

    expectSuccess(result);
    const helper = await readFile(`${result.projectDir}/apps/web/src/lib/medusa.ts`, "utf8");
    const packageJson = await readFile(`${result.projectDir}/apps/web/package.json`, "utf8");

    expect(helper).toContain("new MedusaClient");
    expect(packageJson).toContain('"@medusajs/js-sdk"');
  });

  test("auto-resolves unsupported stacks to none", () => {
    expect(resolveEcommercePrompt({ ecosystem: "python" }).autoValue).toBe("none");
    expect(resolveEcommercePrompt({ ecosystem: "typescript", backend: "none" }).autoValue).toBe(
      "none",
    );
    expect(resolveEcommercePrompt({ ecosystem: "typescript", backend: "convex" }).autoValue).toBe(
      "none",
    );
  });
});
