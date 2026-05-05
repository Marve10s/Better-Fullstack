import { describe, expect, it } from "bun:test";

import { expectSuccess, runTRPCTest } from "./test-utils";

describe("AI SDK Dependencies", () => {
  it("should install vercel-ai SDK when selected", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-vercel",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "vercel-ai",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    // Check server package.json has ai dependency
    if (result.projectDir) {
      const serverPkg = await Bun.file(`${result.projectDir}/apps/server/package.json`).json();
      expect(serverPkg.dependencies["ai"]).toBeDefined();

      // Check frontend package.json has @ai-sdk/react for React frontend
      // Note: frontend folder is named "web" not the framework name
      const frontendPkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).json();
      expect(frontendPkg.dependencies["@ai-sdk/react"]).toBeDefined();
    }
  });

  it("should install mastra SDK when selected", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-mastra",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "mastra",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const serverPkg = await Bun.file(`${result.projectDir}/apps/server/package.json`).json();
      expect(serverPkg.dependencies["mastra"]).toBeDefined();
      expect(serverPkg.dependencies["@mastra/core"]).toBeDefined();
    }
  });

  it("should install langgraph SDK when selected", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-langgraph",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "langgraph",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const serverPkg = await Bun.file(`${result.projectDir}/apps/server/package.json`).json();
      expect(serverPkg.dependencies["@langchain/langgraph"]).toBeDefined();
      expect(serverPkg.dependencies["@langchain/core"]).toBeDefined();
    }
  });

  it("should install langgraph example runtime deps when AI example is enabled", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-langgraph-example",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["ai"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "langgraph",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const serverPkg = await Bun.file(`${result.projectDir}/apps/server/package.json`).json();
      const webPkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).json();

      expect(serverPkg.dependencies["ai"]).toBeDefined();
      expect(serverPkg.dependencies["@ai-sdk/google"]).toBeDefined();
      expect(serverPkg.dependencies["@ai-sdk/devtools"]).toBeDefined();
      expect(serverPkg.dependencies["@langchain/langgraph"]).toBeDefined();

      expect(webPkg.dependencies["ai"]).toBeDefined();
      expect(webPkg.dependencies["streamdown"]).toBeDefined();
    }
  });

  it("should install llamaindex SDK when selected", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-llamaindex",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "llamaindex",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const serverPkg = await Bun.file(`${result.projectDir}/apps/server/package.json`).json();
      expect(serverPkg.dependencies["llamaindex"]).toBeDefined();
    }
  });

  it("should install AI CLI and environment defaults when selected", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-ai-cli",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "ai-cli",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const rootPkg = await Bun.file(`${result.projectDir}/package.json`).json();
      expect(rootPkg.devDependencies["ai-cli"]).toBeDefined();
      expect(rootPkg.scripts["ai:text"]).toBe("ai text");
      expect(rootPkg.scripts["ai:image"]).toBe("ai image");
      expect(rootPkg.scripts["ai:video"]).toBe("ai video");
      expect(rootPkg.scripts["ai:models"]).toBe("ai models");
      expect(rootPkg.scripts["ai:completions"]).toBe("ai completions");

      const envContent = await Bun.file(`${result.projectDir}/.env`).text();
      expect(envContent).toContain("AI_GATEWAY_API_KEY=");
      expect(envContent).toContain("OPENAI_API_KEY=");
      expect(envContent).toContain("AI_CLI_TEXT_MODEL=openai/gpt-5.5");
      expect(envContent).toContain("AI_CLI_IMAGE_MODEL=openai/gpt-image-2");
      expect(envContent).toContain("AI_CLI_VIDEO_MODEL=bytedance/seedance-2.0");
      expect(envContent).toContain("AI_CLI_OUTPUT_DIR=ai-output");

      const readme = await Bun.file(`${result.projectDir}/README.md`).text();
      expect(readme).toContain("## AI CLI");
      expect(readme).toContain("AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key");
      expect(readme).toContain("bun run ai:text --");
    }
  });

  it("should install AI CLI for frontend-only TypeScript stacks", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-ai-cli-frontend",
      ecosystem: "typescript",
      frontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "ai-cli",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "none",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const rootPkg = await Bun.file(`${result.projectDir}/package.json`).json();
      expect(rootPkg.devDependencies["ai-cli"]).toBeDefined();
      expect(rootPkg.scripts["ai:image"]).toBe("ai image");

      const envContent = await Bun.file(`${result.projectDir}/.env`).text();
      expect(envContent).toContain("AI_GATEWAY_API_KEY=");
    }
  });

  it("should not install AI SDK when none selected", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-none",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "none",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    if (result.projectDir) {
      const serverPkgText = await Bun.file(`${result.projectDir}/apps/server/package.json`).text();
      // Should not have any AI SDKs
      expect(serverPkgText).not.toContain('"ai":');
      expect(serverPkgText).not.toContain('"mastra"');
      expect(serverPkgText).not.toContain('"langchain"');
      expect(serverPkgText).not.toContain('"llamaindex"');
      expect(serverPkgText).not.toContain('"ai-cli"');
    }
  });

  it("should install vercel-ai to fullstack frontend when backend is self", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-self",
      ecosystem: "typescript",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "vercel-ai",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    // For self backend, AI SDK should be in the frontend package
    // Next.js with self backend puts files directly in apps/web (or apps/next for Next.js)
    if (result.projectDir) {
      const nextPkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).json();
      expect(nextPkg.dependencies["ai"]).toBeDefined();
      expect(nextPkg.dependencies["@ai-sdk/react"]).toBeDefined();
    }
  });

  it("should install vercel-ai to fullstack frontend (Vinext) when backend is self", async () => {
    const result = await runTRPCTest({
      projectName: "ai-deps-self-vinext",
      ecosystem: "typescript",
      frontend: ["vinext"],
      backend: "self",
      runtime: "none",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      payments: "none",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      ai: "vercel-ai",
      cssFramework: "tailwind",
      uiLibrary: "none",
      effect: "none",
      email: "none",
      stateManagement: "none",
      forms: "react-hook-form",
      testing: "vitest",
      validation: "zod",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      fileUpload: "none",
      packageManager: "bun",
    });
    expectSuccess(result);

    // For self backend, AI SDK should be in the frontend package
    // Vinext with self backend puts files directly in apps/web
    if (result.projectDir) {
      const vinextPkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).json();
      expect(vinextPkg.dependencies["ai"]).toBeDefined();
      expect(vinextPkg.dependencies["@ai-sdk/react"]).toBeDefined();
    }
  });
});
