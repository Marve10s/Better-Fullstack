import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { resolveAIPrompt } from "../src/prompts/ai";
import { resolveCMSPrompt } from "../src/prompts/cms";
import { resolveCSSFrameworkPrompt } from "../src/prompts/css-framework";
import { resolvePaymentsPrompt } from "../src/prompts/payments";
import { resolveRealtimePrompt } from "../src/prompts/realtime";
import { validateConfigForProgrammaticUse } from "../src/utils/config-validation";
import { runWithContext } from "../src/utils/context";
import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";

async function readGenerated(projectDir: string | undefined, path: string): Promise<string> {
  expect(projectDir).toBeDefined();
  return readFile(join(projectDir!, path), "utf8");
}

async function expectGeneratedFile(
  projectDir: string | undefined,
  path: string,
  expectedText: string,
): Promise<void> {
  expect(await readGenerated(projectDir, path)).toContain(expectedText);
}

describe("TypeScript library expansion", () => {
  test("scaffolds the broad React, Express, and GraphQL integration set", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-react",
        frontend: ["react-vite"],
        backend: "express",
        runtime: "node",
        api: "apollo-server",
        database: "sqlite",
        orm: "drizzle",
        auth: "passport",
        payments: "paypal",
        addons: [
          "eslint",
          "prettier",
          "axios",
          "firebase",
          "graphql-codegen",
          "apollo-client",
          "electron",
          "tauri",
          "github-actions",
        ],
        cssFramework: "styled-components",
        uiLibrary: "none",
        testing: "mocha",
        realtime: "ws",
        cms: "contentful",
        analytics: "ga4",
        ai: "openai-sdk",
      }),
    );

    expectSuccess(result);

    const rootPackage = await readGenerated(result.projectDir, "package.json");
    const webPackage = await readGenerated(result.projectDir, "apps/web/package.json");
    const serverPackage = await readGenerated(result.projectDir, "apps/server/package.json");
    const authPackage = await readGenerated(result.projectDir, "packages/auth/package.json");

    for (const dependency of ["eslint", "prettier"]) expect(rootPackage).toContain(dependency);
    for (const dependency of [
      "axios",
      "firebase",
      "@graphql-codegen/cli",
      "@apollo/client",
      "electron",
      "styled-components",
      "contentful",
      "@paypal/paypal-js",
      "mocha",
    ]) {
      expect(webPackage).toContain(dependency);
    }
    expect(webPackage).toContain("mocha --import=tsx");
    expect(webPackage).toContain("concurrently -k");
    expect(webPackage).toContain("ELECTRON_RENDERER_URL=http://localhost:5173");
    expect(webPackage).toContain('"electron:build": "bun run build && electron-builder"');
    expect(webPackage).toContain('"tauri:build": "tauri build"');
    expect(webPackage).not.toContain('"desktop:build"');
    for (const dependency of ["openai", "ws", "@paypal/paypal-server-sdk", "mocha"]) {
      expect(serverPackage).toContain(dependency);
    }
    for (const dependency of ["passport", "passport-github2"]) {
      expect(authPackage).toContain(dependency);
    }
    expect(authPackage).toContain('"check-types": "tsc --noEmit"');

    await expectGeneratedFile(result.projectDir, "eslint.config.mjs", "typescript-eslint");
    await expectGeneratedFile(result.projectDir, ".prettierrc.json", "trailingComma");
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/http-client.ts", "axios.create");
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/http-client.ts",
      "env.VITE_SERVER_URL",
    );
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/firebase.ts", "initializeApp");
    await expectGeneratedFile(result.projectDir, "apps/web/codegen.ts", 'preset: "client"');
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/apollo-client.ts",
      "ApolloClient",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/apollo-client.ts",
      "env.VITE_SERVER_URL",
    );
    await expectGeneratedFile(result.projectDir, "apps/web/electron/main.mjs", "BrowserWindow");
    await expectGeneratedFile(result.projectDir, "apps/web/vite.config.ts", 'base: "./"');
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/styled.tsx", "styled.section");
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/google-analytics.ts", "gtag");
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/contentful.ts", "createClient");
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/paypal-client.ts", "loadScript");
    await expectGeneratedFile(result.projectDir, "apps/server/src/lib/openai.ts", "new OpenAI");
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/openai.ts",
      "env.OPENAI_API_KEY",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/websocket.ts",
      "WebSocketServer",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/websocket.ts",
      "env.VITE_SERVER_URL",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/paypal-server.ts",
      "new Client",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/paypal-server.ts",
      "env.PAYPAL_CLIENT_ID",
    );
    await expectGeneratedFile(result.projectDir, "packages/auth/src/index.ts", "GitHubStrategy");
    await expectGeneratedFile(
      result.projectDir,
      "packages/auth/tsconfig.json",
      "tsconfig.base.json",
    );
    const serverEntry = await readGenerated(result.projectDir, "apps/server/src/index.ts");
    expect(serverEntry.indexOf("cors({")).toBeLessThan(serverEntry.indexOf("session({"));
    expect(serverEntry).toContain("credentials: true");
    await expectGeneratedFile(result.projectDir, ".github/workflows/ci.yml", "- name: Test");
    expect(await readGenerated(result.projectDir, "apps/web/src/router.tsx")).not.toContain(
      'from "./routes/login"',
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/test/smoke.test.ts",
      'describe("web scaffold"',
    );
  });

  test("scaffolds a vanilla Vite app with OpenAPI generation and Capacitor", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-vanilla",
        frontend: ["vanilla-vite"],
        backend: "hono",
        runtime: "node",
        api: "openapi",
        database: "none",
        orm: "none",
        addons: ["openapi-typescript", "capacitor", "axios"],
        animation: "gsap",
        cssFramework: "none",
        uiLibrary: "none",
      }),
    );

    expectSuccess(result);
    const webPackage = await readGenerated(result.projectDir, "apps/web/package.json");
    expect(webPackage).toContain("openapi-typescript");
    expect(webPackage).toContain("@capacitor/core");
    expect(webPackage).toContain("codegen:openapi");
    expect(webPackage).toContain("mobile:sync");
    expect(webPackage).toContain('"gsap"');
    expect(webPackage).toContain('"mobile:ios": "cap add ios || true && cap open ios"');
    expect(await readGenerated(result.projectDir, "apps/web/src/lib/.gitkeep")).toBe("");
    await expectGeneratedFile(result.projectDir, "apps/web/src/main.ts", "querySelector");
    const envPackage = await readGenerated(result.projectDir, "packages/env/package.json");
    expect(envPackage).toContain('"./web": "./src/web.ts"');
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/http-client.ts",
      "env.VITE_SERVER_URL",
    );
    await expectGeneratedFile(result.projectDir, "apps/web/capacitor.config.ts", "CapacitorConfig");
  });

  test("scaffolds Vue with the Anthropic TypeScript SDK", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-vue",
        frontend: ["vue"],
        backend: "express",
        runtime: "node",
        api: "openapi",
        database: "none",
        orm: "none",
        ai: "anthropic-sdk",
        analytics: "posthog",
        cssFramework: "none",
        uiLibrary: "none",
      }),
    );

    expectSuccess(result);
    await expectGeneratedFile(result.projectDir, "apps/web/src/App.vue", "Better Fullstack");
    await expectGeneratedFile(result.projectDir, "apps/web/src/main.ts", 'from "vue"');
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/anthropic.ts",
      "new Anthropic",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/anthropic.ts",
      "env.ANTHROPIC_API_KEY",
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/posthog.ts",
      "import.meta.env.VITE_POSTHOG_KEY",
    );
    expect(await readGenerated(result.projectDir, "apps/server/package.json")).toContain(
      "@anthropic-ai/sdk",
    );
  });

  test("uses Vite-prefixed Umami variables for standalone Vue", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-vue-umami",
        frontend: ["vue"],
        backend: "hono",
        runtime: "bun",
        api: "openapi",
        database: "none",
        orm: "none",
        analytics: "umami",
        cssFramework: "none",
        uiLibrary: "none",
      }),
    );

    expectSuccess(result);
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/umami.ts",
      "import.meta.env.VITE_UMAMI_WEBSITE_ID",
    );
  });

  test("binds direct AI and PayPal credentials for Cloudflare Workers", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-workers-services",
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "workers",
        serverDeploy: "cloudflare",
        api: "openapi",
        database: "none",
        orm: "none",
        auth: "none",
        ai: "openai-sdk",
        payments: "paypal",
      }),
    );

    expectSuccess(result);
    const infra = await readGenerated(result.projectDir, "packages/infra/alchemy.run.ts");
    for (const binding of [
      "OPENAI_API_KEY",
      "OPENAI_MODEL",
      "PAYPAL_CLIENT_ID",
      "PAYPAL_CLIENT_SECRET",
      "PAYPAL_ENVIRONMENT",
    ]) {
      expect(infra).toContain(binding);
    }
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/openai.ts",
      'from "@typescript-library-expansion-workers-services/env/server"',
    );
    await expectGeneratedFile(
      result.projectDir,
      "apps/server/src/lib/paypal-server.ts",
      "env.PAYPAL_CLIENT_SECRET",
    );
  });

  test("keeps self-hosted GraphQL and PayPal helpers on distinct, same-origin paths", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-self",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        api: "graphql-yoga",
        database: "sqlite",
        orm: "drizzle",
        payments: "paypal",
        addons: ["graphql-codegen", "apollo-client"],
      }),
    );

    expectSuccess(result);
    const webPackage = await readGenerated(result.projectDir, "apps/web/package.json");
    expect(webPackage).toContain("@paypal/paypal-js");
    expect(webPackage).toContain("@paypal/paypal-server-sdk");
    await expectGeneratedFile(result.projectDir, "apps/web/codegen.ts", "api/graphql");
    await expectGeneratedFile(
      result.projectDir,
      "apps/web/src/lib/apollo-client.ts",
      "/api/graphql",
    );
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/paypal-client.ts", "loadScript");
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/paypal-server.ts", "new Client");
  });

  test("uses the Astro dev port for self-hosted GraphQL Codegen", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-self-astro-codegen",
        frontend: ["astro"],
        astroIntegration: "react",
        backend: "self",
        runtime: "none",
        api: "graphql-yoga",
        database: "sqlite",
        orm: "drizzle",
        addons: ["graphql-codegen"],
      }),
    );

    expectSuccess(result);
    await expectGeneratedFile(result.projectDir, "apps/web/codegen.ts", "localhost:4321/api/graphql");
  });

  test("keeps prompt filtering and hard validation aligned for constrained libraries", () => {
    expect(
      resolveAIPrompt({ backend: "convex" }).options.map((option) => option.value),
    ).not.toContain("openai-sdk");
    expect(
      resolvePaymentsPrompt({ backend: "convex", frontends: ["react-vite"] }).options.map(
        (option) => option.value,
      ),
    ).not.toContain("paypal");
    expect(
      resolveRealtimePrompt({ backend: "hono" }).options.map((option) => option.value),
    ).not.toContain("ws");
    expect(
      resolveCSSFrameworkPrompt({ uiLibrary: "none", frontends: ["vue"] }).options.map(
        (option) => option.value,
      ),
    ).not.toContain("styled-components");
    expect(
      resolveCMSPrompt({
        cms: "contentful",
        backend: "none",
        frontends: ["vue"],
      }).autoValue,
    ).toBe("contentful");
    expect(
      resolveCMSPrompt({ backend: "none", frontends: ["vue"] }).options.map(
        (option) => option.value,
      ),
    ).toEqual(["contentful", "none"]);
    expect(
      resolveCMSPrompt({ backend: "hono", frontends: ["vue"] }).options.map(
        (option) => option.value,
      ),
    ).toEqual(["contentful", "none"]);
    expect(resolveCMSPrompt({ cms: "sanity", backend: "hono", frontends: ["vue"] }).autoValue).toBe(
      "none",
    );

    const invalidConfigs = [
      { frontend: ["vue"], backend: "express", cssFramework: "styled-components" },
      { frontend: ["react-vite"], backend: "hono", realtime: "ws" },
      { frontend: ["react-vite"], backend: "convex", ai: "openai-sdk" },
      { frontend: ["react-vite"], backend: "convex", payments: "paypal" },
      { frontend: ["none"], backend: "express", payments: "paypal" },
      {
        frontend: ["react-vite"],
        backend: "express",
        api: "openapi",
        addons: ["apollo-client"],
      },
      {
        frontend: ["next"],
        backend: "self",
        api: "openapi",
        addons: ["openapi-typescript"],
      },
      { frontend: ["vue"], backend: "express", api: "orpc" },
    ] as const;

    for (const config of invalidConfigs) {
      expect(() =>
        runWithContext({ silent: true }, () => validateConfigForProgrammaticUse(config)),
      ).toThrow();
    }
  });

  test("adds Contentful to a backendless web stack", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-contentful",
        frontend: ["vue"],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        cms: "contentful",
      }),
    );

    expectSuccess(result);
    expect(await readGenerated(result.projectDir, "apps/web/package.json")).toContain("contentful");
    await expectGeneratedFile(result.projectDir, "apps/web/src/lib/contentful.ts", "createClient");
  });

  test("generates GraphQL Codegen config for Redwood", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-redwood-codegen",
        frontend: ["redwood"],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        addons: ["graphql-codegen"],
      }),
    );

    expectSuccess(result);
    expect(await readGenerated(result.projectDir, "web/package.json")).toContain(
      "graphql-codegen --config codegen.ts",
    );
    await expectGeneratedFile(result.projectDir, "web/codegen.ts", "localhost:8911/graphql");
  });

  test("generates Contentful and GA4 helpers for backendless Redwood", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "typescript-library-expansion-redwood-services",
        frontend: ["redwood"],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        cms: "contentful",
        analytics: "ga4",
      }),
    );

    expectSuccess(result);
    expect(await readGenerated(result.projectDir, "web/package.json")).toContain("contentful");
    await expectGeneratedFile(result.projectDir, "web/src/lib/contentful.ts", "createClient");
    await expectGeneratedFile(result.projectDir, "web/src/lib/google-analytics.ts", "gtag");
  });
});
