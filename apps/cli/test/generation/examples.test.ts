import { describe, expect, it } from "bun:test";
import { join } from "node:path";

import { EXAMPLES, expectError, expectSuccess, runTRPCTest, type TestConfig } from "@test/support/test-utils";

const REMOVED_AI_HELPERS = [
  "toUIMessageStream(",
  "createUIMessageStreamResponse(",
  "result.stream",
];

function expectModernAIChatOutput(files: string[]) {
  const output = files.join("\n");

  expect(output).toContain("result.toUIMessageStreamResponse(");
  for (const helper of REMOVED_AI_HELPERS) {
    expect(output).not.toContain(helper);
  }
}

describe("Example Configurations", () => {
  describe("AI Example", () => {
    it("should work with AI example + React frontend", async () => {
      const result = await runTRPCTest({
        projectName: "ai-react",
        examples: ["ai"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with AI example + Next.js", async () => {
      const result = await runTRPCTest({
        projectName: "ai-next",
        examples: ["ai"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        api: "trpc",
        frontend: ["next"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const aiPage = await Bun.file(join(projectDir, "apps/web/src/app/ai/page.tsx")).text();
      const aiRoute = await Bun.file(join(projectDir, "apps/web/src/app/api/ai/route.ts")).text();

      expect(aiPage).toContain("function MessageBubble");
      expect(aiPage).toContain("max-w-[min(42rem,85%)]");
      expect(aiPage).toContain("Loader2");
      expect(aiRoute).toContain("result.toUIMessageStreamResponse(");
      expectModernAIChatOutput([aiPage, aiRoute]);
    });

    it("should work with AI example + Nuxt", async () => {
      const result = await runTRPCTest({
        projectName: "ai-nuxt",
        examples: ["ai"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc", // tRPC not supported with Nuxt
        frontend: ["nuxt"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with AI example + Svelte", async () => {
      const result = await runTRPCTest({
        projectName: "ai-svelte",
        examples: ["ai"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc", // tRPC not supported with Svelte
        frontend: ["svelte"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with AI example + Solid frontend", async () => {
      const result = await runTRPCTest({
        projectName: "ai-solid-fail",
        examples: ["ai"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        frontend: ["solid"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "The 'ai' example is not compatible with the Solid frontend");
    });

    it("should work with AI example + React + Vite and generate an AI route", async () => {
      const result = await runTRPCTest({
        projectName: "ai-react-vite",
        examples: ["ai"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const router = await Bun.file(join(projectDir, "apps/web/src/router.tsx")).text();
      const aiRoute = await Bun.file(join(projectDir, "apps/web/src/routes/ai.tsx")).text();
      const webPackageJson = JSON.parse(
        await Bun.file(join(projectDir, "apps/web/package.json")).text(),
      ) as {
        dependencies?: Record<string, string>;
      };

      expect(router).toContain('path: "ai"');
      expect(aiRoute).toContain("export default AI");
      expect(aiRoute).toContain("function MessageBubble");
      expect(aiRoute).toContain("disabled={isBusy || !input.trim()}");
      expect(webPackageJson.dependencies?.["@ai-sdk/react"]).toBeDefined();

      const server = await Bun.file(join(projectDir, "apps/server/src/index.ts")).text();
      expect(server).toContain("result.toUIMessageStreamResponse(");
      expectModernAIChatOutput([aiRoute, server]);
    });

    it("should type the Elysia AI request body", async () => {
      const result = await runTRPCTest({
        projectName: "ai-elysia",
        examples: ["ai"],
        backend: "elysia",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "none",
        frontend: ["astro"],
        astroIntegration: "vue",
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const server = await Bun.file(join(result.projectDir!, "apps/server/src/index.ts")).text();
      expect(server).toContain("type UIMessage");
      expect(server).toContain("as { messages?: UIMessage[] }");
      expect(server).toContain("body.messages ?? []");
      expectModernAIChatOutput([server]);
    });

    it("should work with AI example + Convex + React frontend", async () => {
      const result = await runTRPCTest({
        projectName: "ai-convex-react",
        examples: ["ai"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "clerk",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with AI example + Convex + Next.js", async () => {
      const result = await runTRPCTest({
        projectName: "ai-convex-next",
        examples: ["ai"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "better-auth",
        api: "none",
        frontend: ["next"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with AI example + Convex + React + Vite", async () => {
      const result = await runTRPCTest({
        projectName: "ai-convex-react-vite",
        examples: ["ai"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "clerk",
        api: "none",
        frontend: ["react-vite"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const aiRoute = await Bun.file(join(result.projectDir!, "apps/web/src/routes/ai.tsx")).text();
      expect(aiRoute).toContain("useUIMessages");
    });

    it("should fail with AI example + Convex + Svelte", async () => {
      const result = await runTRPCTest({
        projectName: "ai-convex-svelte-fail",
        examples: ["ai"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        frontend: ["svelte"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(
        result,
        "The 'ai' example with Convex backend only supports React-based frontends (Next.js, TanStack Router, TanStack Start, React Router, React + Vite). Svelte and Nuxt are not supported with Convex AI.",
      );
    });

    it("should fail with AI example + Convex + Nuxt", async () => {
      const result = await runTRPCTest({
        projectName: "ai-convex-nuxt-fail",
        examples: ["ai"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        frontend: ["nuxt"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(
        result,
        "The 'ai' example with Convex backend only supports React-based frontends (Next.js, TanStack Router, TanStack Start, React Router, React + Vite). Svelte and Nuxt are not supported with Convex AI.",
      );
    });

    it("should fail with Convex + Solid (blocked at backend level)", async () => {
      const result = await runTRPCTest({
        projectName: "convex-solid-fail",
        examples: ["none"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        frontend: ["solid"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(
        result,
        "The following frontends are not compatible with '--backend convex': solid",
      );
    });
  });

  describe("AI Example endpoint auth", () => {
    const SIGN_IN_MESSAGE = "Sign in to use the AI chat.";
    const UNAUTHENTICATED_README =
      "The AI chat endpoint is unauthenticated, so anyone who can reach it spends your model provider quota; protect it before deploying.";
    const PROTECTED_README =
      "The AI chat endpoint requires a signed-in user and rejects signed-out requests before calling the model provider.";

    const nextRoute = "apps/web/src/app/api/ai/route.ts";
    const tanstackStartRoute = "apps/web/src/routes/api/ai/$.ts";
    const serverIndex = "apps/server/src/index.ts";

    const fullstack = { runtime: "none", database: "sqlite", orm: "drizzle", api: "trpc" } as const;
    const standalone = {
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      frontend: ["tanstack-router"],
    } as const;

    // `lookup` is the session lookup, `reject` the signed-out response; both must run before `provider`.
    const protectedCases: Array<{
      name: string;
      config: Partial<TestConfig>;
      endpoint: string;
      lookup: string;
      reject: string;
      provider: string;
    }> = [
      {
        name: "Next.js + Better Auth",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "better-auth" },
        endpoint: nextRoute,
        lookup: "await auth.api.getSession({ headers: req.headers })",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Next.js + Better Auth organizations",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "better-auth-organizations" },
        endpoint: nextRoute,
        lookup: "await auth.api.getSession({ headers: req.headers })",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Next.js + Better Auth + LangGraph",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "better-auth", ai: "langgraph" },
        endpoint: nextRoute,
        lookup: "await auth.api.getSession({ headers: req.headers })",
        reject: "{ status: 401 }",
        provider: "agent.stream(",
      },
      {
        name: "Next.js + Clerk",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "clerk" },
        endpoint: nextRoute,
        lookup: "const { userId } = await auth();",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Next.js + Auth.js",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "nextauth" },
        endpoint: nextRoute,
        lookup: "const session = await auth();",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Next.js + Stack Auth",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "stack-auth" },
        endpoint: nextRoute,
        lookup: "await stackServerApp.getUser()",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Next.js + Supabase Auth",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "supabase-auth" },
        endpoint: nextRoute,
        lookup: "await supabase.auth.getUser()",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Next.js + Auth0",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "auth0" },
        endpoint: nextRoute,
        lookup: "await auth0.getSession()",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "TanStack Start + Better Auth",
        config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "better-auth" },
        endpoint: tanstackStartRoute,
        lookup: "await auth.api.getSession({ headers: request.headers })",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "TanStack Start + Better Auth + ModelFusion",
        config: {
          ...fullstack,
          backend: "self",
          frontend: ["tanstack-start"],
          auth: "better-auth",
          ai: "modelfusion",
        },
        endpoint: tanstackStartRoute,
        lookup: "await auth.api.getSession({ headers: request.headers })",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "TanStack Start + Clerk",
        config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "clerk" },
        endpoint: tanstackStartRoute,
        lookup: "const { userId } = await auth();",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "TanStack Start + Supabase Auth",
        config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "supabase-auth" },
        endpoint: tanstackStartRoute,
        lookup: "await createClient().auth.getUser()",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "Hono + Better Auth",
        config: { ...standalone, backend: "hono", auth: "better-auth" },
        endpoint: serverIndex,
        lookup: "await auth.api.getSession({ headers: c.req.raw.headers })",
        reject: 'c.json({ message: "Unauthorized" }, 401)',
        provider: "streamText(",
      },
      {
        name: "Hono on Workers + Better Auth",
        config: {
          ...standalone,
          backend: "hono",
          runtime: "workers",
          serverDeploy: "cloudflare",
          auth: "better-auth",
        },
        endpoint: serverIndex,
        lookup: "await auth.api.getSession({ headers: c.req.raw.headers })",
        reject: 'c.json({ message: "Unauthorized" }, 401)',
        provider: "createGoogleGenerativeAI(",
      },
      {
        name: "Express + Better Auth",
        config: { ...standalone, backend: "express", runtime: "node", auth: "better-auth" },
        endpoint: serverIndex,
        lookup: "await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })",
        reject: "res.status(401)",
        provider: "streamText(",
      },
      {
        name: "Express + Passport",
        config: { ...standalone, backend: "express", runtime: "node", auth: "passport" },
        endpoint: serverIndex,
        lookup: "if (!req.isAuthenticated())",
        reject: "res.status(401)",
        provider: "streamText(",
      },
      {
        name: "Fastify + Better Auth",
        config: { ...standalone, backend: "fastify", runtime: "node", auth: "better-auth" },
        endpoint: serverIndex,
        lookup: "headers: nodeHeadersToHeaders(request.headers)",
        reject: "reply.status(401)",
        provider: "streamText(",
      },
      {
        name: "Elysia + Better Auth",
        config: { ...standalone, backend: "elysia", auth: "better-auth" },
        endpoint: serverIndex,
        lookup: "headers: context.request.headers",
        reject: "context.status(401",
        provider: "streamText(",
      },
      {
        name: "feTS + Better Auth",
        config: { ...standalone, backend: "fets", auth: "better-auth" },
        endpoint: serverIndex,
        lookup: "headers: new Headers(request.headers as HeadersInit)",
        reject: "{ status: 401 }",
        provider: "streamText(",
      },
      {
        name: "NestJS + Better Auth",
        config: { ...standalone, backend: "nestjs", runtime: "node", auth: "better-auth" },
        endpoint: "apps/server/src/ai/ai.controller.ts",
        lookup: "await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })",
        reject: "res.status(401)",
        provider: "this.aiService.streamChat(",
      },
      {
        name: "Nitro + Better Auth",
        config: { ...standalone, backend: "nitro", auth: "better-auth" },
        endpoint: "apps/server/routes/ai.post.ts",
        lookup: "await auth.api.getSession({ headers: event.headers })",
        reject: "setResponseStatus(event, 401)",
        provider: "streamText(",
      },
      {
        name: "AdonisJS + Better Auth",
        config: { ...standalone, backend: "adonisjs", runtime: "node", auth: "better-auth" },
        endpoint: "apps/server/start/routes.ts",
        lookup: "headers: fromNodeHeaders(request.request.headers)",
        reject: "response.status(401)",
        provider: "streamText(",
      },
      {
        name: "Convex + Better Auth",
        config: {
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          frontend: ["tanstack-router"],
          auth: "better-auth",
        },
        endpoint: "packages/backend/convex/chat.ts",
        lookup: "await authComponent.safeGetAuthUser(ctx)",
        reject: 'throw new Error("Not authenticated")',
        provider: "saveMessage(",
      },
      {
        name: "Convex + Clerk",
        config: {
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          frontend: ["tanstack-router"],
          auth: "clerk",
        },
        endpoint: "packages/backend/convex/chat.ts",
        lookup: "await ctx.auth.getUserIdentity()",
        reject: 'throw new Error("Not authenticated")',
        provider: "saveMessage(",
      },
    ];

    async function generateAIProject(name: string, config: Partial<TestConfig>) {
      const result = await runTRPCTest({
        projectName: name,
        examples: ["ai"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
        ...config,
      } as TestConfig);
      expectSuccess(result);
      return result.projectDir!;
    }

    for (const testCase of protectedCases) {
      it(`rejects signed-out callers before the provider call: ${testCase.name}`, async () => {
        const projectDir = await generateAIProject(
          `ai-auth-${testCase.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          testCase.config,
        );
        const endpoint = await Bun.file(join(projectDir, testCase.endpoint)).text();
        const lookupAt = endpoint.indexOf(testCase.lookup);
        const rejectAt = endpoint.indexOf(testCase.reject, lookupAt);
        const providerAt = endpoint.indexOf(testCase.provider, lookupAt);

        expect(lookupAt).toBeGreaterThan(-1);
        expect(rejectAt).toBeGreaterThan(lookupAt);
        expect(providerAt).toBeGreaterThan(rejectAt);

        const readme = await Bun.file(join(projectDir, "README.md")).text();
        expect(readme).toContain(PROTECTED_README);
      });
    }

    it("handles a 401 on the Next.js page and sends cookies cross-origin from a Vite page", async () => {
      const nextDir = await generateAIProject("ai-auth-next-page", {
        ...fullstack,
        backend: "self",
        frontend: ["next"],
        auth: "better-auth",
      });
      const nextPage = await Bun.file(join(nextDir, "apps/web/src/app/ai/page.tsx")).text();
      expect(nextPage).toContain("response.status === 401");
      expect(nextPage).toContain(SIGN_IN_MESSAGE);
      expect(nextPage).toContain("{error && ");
      expect(nextPage).not.toContain('credentials: "include"');

      const viteDir = await generateAIProject("ai-auth-vite-page", {
        ...standalone,
        backend: "hono",
        auth: "better-auth",
      });
      const vitePage = await Bun.file(join(viteDir, "apps/web/src/routes/ai.tsx")).text();
      expect(vitePage).toContain('credentials: "include"');
      expect(vitePage).toContain(SIGN_IN_MESSAGE);
    });

    it("leaves the endpoint open and warns in the README when no server lookup exists", async () => {
      for (const auth of ["workos", "kinde"] as const) {
        const projectDir = await generateAIProject(`ai-auth-next-${auth}`, {
          ...fullstack,
          backend: "self",
          frontend: ["next"],
          auth,
        });
        const route = await Bun.file(join(projectDir, nextRoute)).text();
        const page = await Bun.file(join(projectDir, "apps/web/src/app/ai/page.tsx")).text();
        const readme = await Bun.file(join(projectDir, "README.md")).text();

        expect(route).not.toContain("401");
        expect(page).not.toContain(SIGN_IN_MESSAGE);
        expect(readme).toContain(UNAUTHENTICATED_README);
      }
    });

    it("keeps auth-none endpoints and pages free of auth code", async () => {
      const cases: Array<{ config: Partial<TestConfig>; endpoint: string; page: string }> = [
        {
          config: { ...fullstack, backend: "self", frontend: ["next"], auth: "none" },
          endpoint: nextRoute,
          page: "apps/web/src/app/ai/page.tsx",
        },
        {
          config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "none" },
          endpoint: tanstackStartRoute,
          page: "apps/web/src/routes/ai.tsx",
        },
        {
          config: { ...standalone, backend: "hono", auth: "none" },
          endpoint: serverIndex,
          page: "apps/web/src/routes/ai.tsx",
        },
      ];

      for (const [index, testCase] of cases.entries()) {
        const projectDir = await generateAIProject(`ai-auth-none-${index}`, testCase.config);
        const endpoint = await Bun.file(join(projectDir, testCase.endpoint)).text();
        const page = await Bun.file(join(projectDir, testCase.page)).text();
        const readme = await Bun.file(join(projectDir, "README.md")).text();

        expect(endpoint).not.toContain("getSession");
        expect(endpoint).not.toContain("401");
        expect(page).not.toContain(SIGN_IN_MESSAGE);
        expect(page).not.toContain("credentials");
        expect(readme).toContain(UNAUTHENTICATED_README);
      }
    });
  });

  describe("Examples with None Option", () => {
    it("should work with examples none", async () => {
      const result = await runTRPCTest({
        projectName: "no-examples",
        examples: ["none"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with none + other examples", async () => {
      const result = await runTRPCTest({
        projectName: "none-with-examples-fail",
        examples: ["none", "ai"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "Cannot combine 'none' with other examples");
    });
  });

  describe("All Example Types", () => {
    for (const example of EXAMPLES) {
      if (example === "none") continue;

      it(`should work with ${example} example in appropriate setup`, async () => {
        const config: TestConfig = {
          projectName: `test-${example}`,
          examples: [example],
          backend: example === "chat-sdk" ? "self" : "hono",
          runtime: example === "chat-sdk" ? "none" : "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          frontend: [example === "chat-sdk" ? "next" : "tanstack-router"],
          addons: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          ...(example === "chat-sdk" ? { ai: "none" as const } : {}),
          install: false,
        };

        const result = await runTRPCTest(config);
        expectSuccess(result);
      });
    }
  });

  describe("Example Edge Cases", () => {
    it("should work with empty examples array", async () => {
      const result = await runTRPCTest({
        projectName: "empty-examples",
        examples: ["none"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Chat SDK Example", () => {
    it("should scaffold Next.js self backend Slack profile", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-next",
        examples: ["chat-sdk"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["next"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const routeFile = await Bun.file(
        join(projectDir, "apps/web/src/app/api/webhooks/[platform]/route.ts"),
      ).text();
      const botFile = await Bun.file(join(projectDir, "apps/web/src/lib/chat-bot.tsx")).text();
      const webPkg = await Bun.file(join(projectDir, "apps/web/package.json")).json();

      expect(routeFile).toContain("chatBot.webhooks");
      expect(botFile).toContain("createSlackAdapter");
      expect(botFile).toContain("SLACK_SIGNING_SECRET");
      expect(botFile).toContain("requiredEnv");
      expect(botFile).toContain("Card({");
      expect(botFile).toContain('Button({ id: "hello", label: "Say Hello", style: "primary" })');
      expect(botFile).toContain("if (!event.thread) return;");
      expect(botFile).not.toContain("<Card");
      expect(webPkg.dependencies.chat).toBeDefined();
      expect(webPkg.dependencies["@chat-adapter/slack"]).toBeDefined();
      expect(webPkg.dependencies["@chat-adapter/state-memory"]).toBeDefined();
    });

    it("should scaffold TanStack Start self backend Slack profile", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-tss",
        examples: ["chat-sdk"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-start"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const routeFile = await Bun.file(join(projectDir, "apps/web/src/routes/api/webhooks/$.ts")).text();
      const botFile = await Bun.file(join(projectDir, "apps/web/src/lib/chat-bot.tsx")).text();
      const webPkg = await Bun.file(join(projectDir, "apps/web/package.json")).json();

      expect(routeFile).toContain("createFileRoute(\"/api/webhooks/$\")");
      expect(routeFile).toContain("chatBot.webhooks");
      expect(botFile).toContain("Card({");
      expect(botFile).toContain("SLACK_SIGNING_SECRET");
      expect(botFile).toContain("requiredEnv");
      expect(botFile).toContain("if (!event.thread) return;");
      expect(botFile).not.toContain("<Card");
      expect(webPkg.dependencies["@chat-adapter/slack"]).toBeDefined();
    });

    it("should scaffold Nuxt self backend Discord profile (requires vercel-ai)", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-nuxt",
        examples: ["chat-sdk"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        frontend: ["nuxt"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "vercel-ai",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const botFile = await Bun.file(join(projectDir, "apps/web/server/lib/chat-bot.tsx")).text();
      const gatewayFile = await Bun.file(
        join(projectDir, "apps/web/server/api/discord/gateway.get.ts"),
      ).text();
      const webEnv = await Bun.file(join(projectDir, "apps/web/.env")).text();
      const webPkg = await Bun.file(join(projectDir, "apps/web/package.json")).json();

      expect(botFile).toContain("createDiscordAdapter");
      expect(botFile).toContain("DISCORD_PUBLIC_KEY");
      expect(botFile).toContain("requiredEnv");
      expect(botFile).toContain("Card({");
      expect(botFile).toContain('Button({ id: "escalate", label: "Escalate to Human", style: "danger" })');
      expect(botFile).toContain("if (!event.thread) return;");
      expect(botFile).not.toContain("<Card");
      expect(gatewayFile).toContain("startGatewayListener");
      expect(webEnv).toContain("DISCORD_BOT_TOKEN");
      expect(webEnv).toContain("ANTHROPIC_API_KEY");
      expect(webPkg.dependencies["@chat-adapter/discord"]).toBeDefined();
      expect(webPkg.dependencies["@ai-sdk/anthropic"]).toBeDefined();
    });

    it("should scaffold Hono Node GitHub review profile (requires vercel-ai)", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-hono-node",
        examples: ["chat-sdk"],
        backend: "hono",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "vercel-ai",
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const serverIndex = await Bun.file(join(projectDir, "apps/server/src/index.ts")).text();
      const botFile = await Bun.file(join(projectDir, "apps/server/src/bot.ts")).text();
      const reviewFile = await Bun.file(join(projectDir, "apps/server/src/review.ts")).text();
      const serverEnv = await Bun.file(join(projectDir, "apps/server/.env")).text();
      const serverPkg = await Bun.file(join(projectDir, "apps/server/package.json")).json();

      expect(serverIndex).toContain("/api/webhooks/github");
      expect(botFile).toContain("createGitHubAdapter");
      expect(reviewFile).toContain("Sandbox.create");
      expect(serverEnv).toContain("GITHUB_WEBHOOK_SECRET");
      expect(serverPkg.dependencies["@chat-adapter/github"]).toBeDefined();
      expect(serverPkg.dependencies["@vercel/sandbox"]).toBeDefined();
      expect(serverPkg.dependencies["bash-tool"]).toBeDefined();
    });

    it("should fail with Hono + Bun runtime", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-hono-bun-fail",
        examples: ["chat-sdk"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "vercel-ai",
        expectError: true,
      });

      expectError(result, "The 'chat-sdk' example with Hono requires '--runtime node'");
    });

    it("should fail with Convex backend", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-convex-fail",
        examples: ["chat-sdk"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "The 'chat-sdk' example is not supported with the Convex backend in v1");
    });

    it("should fail with React + Vite", async () => {
      const result = await runTRPCTest({
        projectName: "chat-sdk-react-vite-fail",
        examples: ["chat-sdk"],
        backend: "hono",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "vercel-ai",
        expectError: true,
      });

      expectError(
        result,
        "The 'chat-sdk' example is not yet supported for React + Vite projects",
      );
    });

    it("should fail with non-vercel-ai on Nuxt/Hono chat-sdk profiles", async () => {
      const nuxtResult = await runTRPCTest({
        projectName: "chat-sdk-nuxt-ai-fail",
        examples: ["chat-sdk"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        frontend: ["nuxt"],
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        ai: "langchain",
        expectError: true,
      });

      expectError(nuxtResult, "The 'chat-sdk' example requires '--ai vercel-ai'");
    });
  });
});
