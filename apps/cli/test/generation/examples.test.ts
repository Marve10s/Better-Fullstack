import { hasAiExampleEndpoint, hasAiRouteAuth } from "@better-fullstack/template-generator";
import {
  AuthSchema,
  BackendSchema,
  getAuthIncompatibility,
  legacyProjectConfigToStackParts,
  type ProjectConfig,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";
import { join } from "node:path";

import { createVirtual } from "@/index";
import { EXAMPLES, expectError, expectSuccess, runTRPCTest, type TestConfig } from "@test/support/test-utils";
import { getAllFiles } from "@test/support/validation-utils";

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
    const PASSPORT_README = "The Passport session cookie is `SameSite=Lax`";

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
    const convex = {
      backend: "convex",
      runtime: "none",
      database: "none",
      orm: "none",
      api: "none",
      frontend: ["tanstack-router"],
    } as const;

    // A section of the endpoint file: it runs from `start` to `end` (or the end of the file).
    // Every `guards` entry must appear in that order, and every `guarded` entry (provider call,
    // body read, or thread access) must first appear after the last guard.
    type GuardedSection = { start: string; end?: string; guards: string[]; guarded: string[] };

    const isJson = "application\\/json";
    const trustedHelper: GuardedSection = {
      start: "function isTrustedAiRequest(",
      end: "\n}\n",
      guards: ["!origin || origin === env.CORS_ORIGIN", isJson],
      guarded: [],
    };
    const nextGuards = (lookup: string) => [isJson, "{ status: 415 }", lookup, "{ status: 401 }"];
    const nextHandler = (lookup: string, provider = "streamText("): GuardedSection => ({
      start: "export async function POST(",
      guards: nextGuards(lookup),
      guarded: ["await req.json()", provider],
    });
    const tanstackStartHandler = (lookup: string): GuardedSection => ({
      start: "POST: async ({ request }) =>",
      guards: [isJson, "{ status: 415 }", lookup, "{ status: 401 }"],
      guarded: ["await request.json()", "streamText("],
    });
    const convexSections = (lookup: string): GuardedSection[] => [
      {
        start: "async function requireUserId(",
        end: "async function requireThreadOwner(",
        guards: [lookup, 'throw new Error("Not authenticated")'],
        guarded: [],
      },
      {
        start: "async function requireThreadOwner(",
        end: "export const createNewThread",
        guards: [
          "await requireUserId(ctx)",
          "await getThreadMetadata(ctx, components.agent, { threadId })",
          "thread.userId !== userId",
          "throw new Error(",
        ],
        guarded: [],
      },
      {
        start: "export const createNewThread",
        end: "export const listMessages",
        guards: ["await requireUserId(ctx)"],
        guarded: ["createThread(ctx, components.agent, { userId })"],
      },
      {
        start: "export const listMessages",
        end: "export const sendMessage",
        guards: ["await requireThreadOwner(ctx, args.threadId)"],
        guarded: ["listUIMessages(", "syncStreams("],
      },
      {
        start: "export const sendMessage",
        end: "export const generateResponseAsync",
        guards: ["await requireThreadOwner(ctx, threadId)"],
        guarded: ["saveMessage(", "ctx.scheduler.runAfter("],
      },
    ];

    const protectedCases: Array<{
      name: string;
      config: Partial<TestConfig>;
      endpoint: string;
      sections: GuardedSection[];
    }> = [
      {
        name: "Next.js + Better Auth",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "better-auth" },
        endpoint: nextRoute,
        sections: [nextHandler("await auth.api.getSession({ headers: req.headers })")],
      },
      {
        name: "Next.js + Better Auth organizations",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "better-auth-organizations" },
        endpoint: nextRoute,
        sections: [nextHandler("await auth.api.getSession({ headers: req.headers })")],
      },
      {
        name: "Next.js + Better Auth + LangGraph",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "better-auth", ai: "langgraph" },
        endpoint: nextRoute,
        sections: [nextHandler("await auth.api.getSession({ headers: req.headers })", "agent.stream(")],
      },
      {
        name: "Next.js + Clerk",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "clerk" },
        endpoint: nextRoute,
        sections: [nextHandler("const { userId } = await auth();")],
      },
      {
        name: "Next.js + Auth.js",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "nextauth" },
        endpoint: nextRoute,
        sections: [nextHandler("const session = await auth();")],
      },
      {
        name: "Next.js + Stack Auth",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "stack-auth" },
        endpoint: nextRoute,
        sections: [nextHandler("await stackServerApp.getUser()")],
      },
      {
        name: "Next.js + Supabase Auth",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "supabase-auth" },
        endpoint: nextRoute,
        sections: [nextHandler("await supabase.auth.getUser()")],
      },
      {
        name: "Next.js + Auth0",
        config: { ...fullstack, backend: "self", frontend: ["next"], auth: "auth0" },
        endpoint: nextRoute,
        sections: [nextHandler("await auth0.getSession()")],
      },
      {
        name: "TanStack Start + Better Auth",
        config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "better-auth" },
        endpoint: tanstackStartRoute,
        sections: [tanstackStartHandler("await auth.api.getSession({ headers: request.headers })")],
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
        sections: [tanstackStartHandler("await auth.api.getSession({ headers: request.headers })")],
      },
      {
        name: "TanStack Start + Clerk",
        config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "clerk" },
        endpoint: tanstackStartRoute,
        sections: [tanstackStartHandler("const { userId } = await auth();")],
      },
      {
        name: "TanStack Start + Supabase Auth",
        config: { ...fullstack, backend: "self", frontend: ["tanstack-start"], auth: "supabase-auth" },
        endpoint: tanstackStartRoute,
        sections: [tanstackStartHandler("await createClient().auth.getUser()")],
      },
      {
        name: "Hono + Better Auth",
        config: { ...standalone, backend: "hono", auth: "better-auth" },
        endpoint: serverIndex,
        sections: [
          trustedHelper,
          {
            start: 'app.post("/ai"',
            guards: [
              'isTrustedAiRequest(c.req.header("origin"), c.req.header("content-type"))',
              'c.json({ message: "Forbidden" }, 403)',
              "await auth.api.getSession({ headers: c.req.raw.headers })",
              'c.json({ message: "Unauthorized" }, 401)',
            ],
            guarded: ["c.req.json()", "streamText("],
          },
        ],
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
        sections: [
          trustedHelper,
          {
            start: 'app.post("/ai"',
            guards: [
              'isTrustedAiRequest(c.req.header("origin"), c.req.header("content-type"))',
              'c.json({ message: "Forbidden" }, 403)',
              "await auth.api.getSession({ headers: c.req.raw.headers })",
              'c.json({ message: "Unauthorized" }, 401)',
            ],
            guarded: ["c.req.json()", "createGoogleGenerativeAI(", "streamText("],
          },
        ],
      },
      {
        name: "Express + Better Auth",
        config: { ...standalone, backend: "express", runtime: "node", auth: "better-auth" },
        endpoint: serverIndex,
        sections: [
          trustedHelper,
          {
            start: 'app.post("/ai"',
            guards: [
              'isTrustedAiRequest(req.get("origin"), req.get("content-type"))',
              "res.status(403)",
              "await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })",
              "res.status(401)",
            ],
            guarded: ["req.body", "streamText("],
          },
        ],
      },
      {
        name: "Express + Passport",
        config: { ...standalone, backend: "express", runtime: "node", auth: "passport" },
        endpoint: serverIndex,
        sections: [
          trustedHelper,
          {
            start: 'app.post("/ai"',
            guards: [
              'isTrustedAiRequest(req.get("origin"), req.get("content-type"))',
              "res.status(403)",
              "if (!req.isAuthenticated())",
              "res.status(401)",
            ],
            guarded: ["req.body", "streamText("],
          },
        ],
      },
      {
        name: "Fastify + Better Auth",
        config: { ...standalone, backend: "fastify", runtime: "node", auth: "better-auth" },
        endpoint: serverIndex,
        sections: [
          trustedHelper,
          {
            start: '"/ai",',
            guards: [
              "onRequest:",
              'isTrustedAiRequest(request.headers.origin, request.headers["content-type"])',
              "reply.status(403)",
              "headers: nodeHeadersToHeaders(request.headers)",
              "reply.status(401)",
            ],
            guarded: ["request.body", "streamText("],
          },
        ],
      },
      {
        name: "Elysia + Better Auth",
        config: { ...standalone, backend: "elysia", auth: "better-auth" },
        endpoint: serverIndex,
        sections: [
          trustedHelper,
          {
            start: '.post("/ai"',
            guards: [
              'isTrustedAiRequest(headers.get("origin"), headers.get("content-type"))',
              "context.status(403",
              "headers: context.request.headers",
              "context.status(401",
            ],
            guarded: ["context.request.json()", "streamText("],
          },
        ],
      },
      {
        name: "feTS + Better Auth",
        config: { ...standalone, backend: "fets", auth: "better-auth" },
        endpoint: serverIndex,
        sections: [
          trustedHelper,
          {
            start: 'path: "/ai"',
            guards: [
              'isTrustedAiRequest(request.headers.get("origin"), request.headers.get("content-type"))',
              "{ status: 403 }",
              "headers: new Headers(request.headers as HeadersInit)",
              "{ status: 401 }",
            ],
            guarded: ["request.json()", "streamText("],
          },
        ],
      },
      {
        name: "NestJS + Better Auth",
        config: { ...standalone, backend: "nestjs", runtime: "node", auth: "better-auth" },
        endpoint: "apps/server/src/ai/ai.controller.ts",
        sections: [
          trustedHelper,
          {
            start: "async chat(",
            guards: [
              'isTrustedAiRequest(req.get("origin"), req.get("content-type"))',
              "res.status(403)",
              "await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })",
              "res.status(401)",
            ],
            guarded: ["this.aiService.streamChat("],
          },
        ],
      },
      {
        name: "Nitro + Better Auth",
        config: { ...standalone, backend: "nitro", auth: "better-auth" },
        endpoint: "apps/server/routes/ai.post.ts",
        sections: [
          trustedHelper,
          {
            start: "export default defineEventHandler(",
            guards: [
              'isTrustedAiRequest(getRequestHeader(event, "origin"), getRequestHeader(event, "content-type"))',
              "setResponseStatus(event, 403)",
              "await auth.api.getSession({ headers: event.headers })",
              "setResponseStatus(event, 401)",
            ],
            guarded: ["readBody", "streamText("],
          },
        ],
      },
      {
        name: "AdonisJS + Better Auth",
        config: { ...standalone, backend: "adonisjs", runtime: "node", auth: "better-auth" },
        endpoint: "apps/server/start/routes.ts",
        sections: [
          trustedHelper,
          {
            start: 'router.post("/ai"',
            guards: [
              'isTrustedAiRequest(request.header("origin"), request.header("content-type"))',
              "response.status(403)",
              "headers: fromNodeHeaders(request.request.headers)",
              "response.status(401)",
            ],
            guarded: ["request.body()", "streamText("],
          },
        ],
      },
      {
        name: "Convex + Better Auth",
        config: { ...convex, auth: "better-auth" },
        endpoint: "packages/backend/convex/chat.ts",
        sections: convexSections("await authComponent.safeGetAuthUser(ctx)"),
      },
      {
        name: "Convex + Clerk",
        config: { ...convex, auth: "clerk" },
        endpoint: "packages/backend/convex/chat.ts",
        sections: convexSections("await ctx.auth.getUserIdentity()"),
      },
    ];

    function expectGuardedSection(source: string, section: GuardedSection) {
      const startAt = source.indexOf(section.start);
      expect(startAt).toBeGreaterThan(-1);
      const endAt = section.end ? source.indexOf(section.end, startAt + section.start.length) : source.length;
      expect(endAt).toBeGreaterThan(startAt);
      const body = source.slice(startAt, endAt);

      let lastGuardAt = -1;
      for (const guard of section.guards) {
        const at = body.indexOf(guard, lastGuardAt + 1);
        expect({ guard, after: lastGuardAt < at }).toEqual({ guard, after: true });
        lastGuardAt = at;
      }
      for (const marker of section.guarded) {
        const at = body.indexOf(marker);
        expect({ marker, afterGuards: at > lastGuardAt }).toEqual({ marker, afterGuards: true });
      }
    }

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
      it(`guards each handler before the provider call or thread access: ${testCase.name}`, async () => {
        const projectDir = await generateAIProject(
          `ai-auth-${testCase.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          testCase.config,
        );
        const endpoint = await Bun.file(join(projectDir, testCase.endpoint)).text();
        for (const section of testCase.sections) {
          expectGuardedSection(endpoint, section);
        }

        const readme = await Bun.file(join(projectDir, "README.md")).text();
        expect(readme).toContain(PROTECTED_README);
      });
    }

    it("records the thread owner and checks it in every public Convex function", async () => {
      const projectDir = await generateAIProject("ai-auth-convex-owner", { ...convex, auth: "better-auth" });
      const chat = await Bun.file(join(projectDir, "packages/backend/convex/chat.ts")).text();
      const publicFunctions = [...chat.matchAll(/export const (\w+) = (?:query|mutation|action)\(/g)].map(
        (match) => match[1],
      );

      // Each public function has a guarded section in the Convex cases above.
      expect(publicFunctions).toEqual(["createNewThread", "listMessages", "sendMessage"]);
      expect(chat).toContain("createThread(ctx, components.agent, { userId })");
      expect(chat).not.toContain("createThread(ctx, components.agent, {})");
    });

    it("serves credentialed CORS from the configured origin on every standalone backend", async () => {
      const nitroDir = await generateAIProject("ai-auth-nitro-cors", {
        ...standalone,
        backend: "nitro",
        auth: "better-auth",
      });
      const nitroConfig = await Bun.file(join(nitroDir, "apps/server/nitro.config.ts")).text();
      const nitroCors = await Bun.file(join(nitroDir, "apps/server/middleware/cors.ts")).text();
      expect(nitroConfig).not.toContain('"Access-Control-Allow-Origin": "*"');
      expect(nitroCors).toContain("origin: [env.CORS_ORIGIN]");
      expect(nitroCors).toContain("credentials: true");
      // Nitro auto-imports the project's h3, and nitropack 2 hands those helpers h3 1.x events.
      const nitroPackage = await Bun.file(join(nitroDir, "apps/server/package.json")).json();
      expect(nitroPackage.dependencies.h3).toStartWith("^1.");

      for (const backend of ["hono", "express", "fastify", "elysia", "fets", "nestjs", "adonisjs"] as const) {
        const runtime = ["express", "fastify", "nestjs", "adonisjs"].includes(backend) ? "node" : "bun";
        const projectDir = await generateAIProject(`ai-auth-${backend}-cors`, {
          ...standalone,
          backend,
          runtime,
          auth: "better-auth",
        });
        const glob = new Bun.Glob("apps/server/**/*.ts");
        for await (const file of glob.scan({ cwd: projectDir })) {
          const source = await Bun.file(join(projectDir, file)).text();
          expect({ file, wildcard: /Access-Control-Allow-Origin["']?\s*[:,]\s*["']\*["']|origin:\s*["']\*["']/.test(source) }).toEqual({
            file,
            wildcard: false,
          });
        }
      }
    });

    it("keeps the auth-none Nitro wildcard CORS without credentials", async () => {
      const projectDir = await generateAIProject("ai-auth-nitro-none", { ...standalone, backend: "nitro", auth: "none" });
      const nitroConfig = await Bun.file(join(projectDir, "apps/server/nitro.config.ts")).text();
      expect(nitroConfig).toContain('"Access-Control-Allow-Origin": "*"');
      expect(nitroConfig).not.toContain("Access-Control-Allow-Credentials");
      expect(await Bun.file(join(projectDir, "apps/server/middleware/cors.ts")).exists()).toBe(false);
    });

    it("forwards the Better Auth cookie only on native platforms and uses credentials on web", async () => {
      for (const native of ["native-bare", "native-uniwind", "native-unistyles"] as const) {
        const projectDir = await generateAIProject(`ai-auth-${native}`, {
          ...standalone,
          backend: "hono",
          frontend: [native],
          auth: "better-auth",
        });
        const screen = await Bun.file(join(projectDir, "apps/native/app/(drawer)/ai.tsx")).text();
        expectGuardedSection(screen, {
          start: "headers: (): Record<string, string> => {",
          end: "}),",
          guards: ['if (Platform.OS === "web")', "return {};"],
          guarded: ["authClient.getCookie()"],
        });
        expect(screen).toContain('credentials: Platform.OS === "web" ? "include" : undefined');
      }
    });

    it("tells Passport users that the web app and API must be same-site", async () => {
      const projectDir = await generateAIProject("ai-auth-passport-readme", {
        ...standalone,
        backend: "express",
        runtime: "node",
        auth: "passport",
      });
      const readme = await Bun.file(join(projectDir, "README.md")).text();
      const authSection = readme.slice(readme.indexOf("## Passport Authentication Setup"));
      const aiSection = readme.slice(readme.indexOf("## AI Chat Example"));

      expect(authSection).toContain(PASSPORT_README);
      expect(aiSection).toContain(PASSPORT_README);
    });
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
        expect(endpoint).not.toContain("isTrustedAiRequest");
        expect(endpoint).not.toContain("415");
        expect(page).not.toContain(SIGN_IN_MESSAGE);
        expect(page).not.toContain("credentials");
        expect(readme).toContain(UNAUTHENTICATED_README);
      }
    });

    async function generateVirtualAIProject(config: Partial<ProjectConfig>) {
      const result = await createVirtual({ examples: ["ai"], ...config });
      expect(result.error).toBeUndefined();
      return new Map(getAllFiles(result.tree!).map((file) => [file.path.replace(/^\//, ""), file.content]));
    }

    // createVirtual does not normalize auth, so it reaches pairs the CLI resets to none.
    function virtualConfig(backend: ProjectConfig["backend"], frontend: ProjectConfig["frontend"]) {
      if (backend === "self") return { ...fullstack, backend, frontend };
      if (backend === "convex") return { ...convex, frontend };
      const runtime = ["express", "fastify", "nestjs", "adonisjs"].includes(backend) ? "node" : "bun";
      return { ...standalone, backend, frontend, runtime } as const;
    }

    // Where each server arrangement rejects a signed-out caller, and the call that must come after.
    function aiEndpoint(backend: ProjectConfig["backend"], frontend: ProjectConfig["frontend"]) {
      if (backend === "self" && frontend.includes("next")) {
        return { file: nextRoute, start: "export async function POST(", reject: "{ status: 401 }", call: "streamText(" };
      }
      if (backend === "self") {
        return {
          file: tanstackStartRoute,
          start: "POST: async ({ request }) =>",
          reject: "{ status: 401 }",
          call: "streamText(",
        };
      }
      if (backend === "convex") {
        return {
          file: "packages/backend/convex/chat.ts",
          start: "export const sendMessage",
          reject: "await requireThreadOwner(",
          call: "ctx.scheduler.runAfter(",
        };
      }
      const files: Partial<Record<ProjectConfig["backend"], string>> = {
        nestjs: "apps/server/src/ai/ai.controller.ts",
        nitro: "apps/server/routes/ai.post.ts",
        adonisjs: "apps/server/start/routes.ts",
      };
      const starts: Partial<Record<ProjectConfig["backend"], string>> = {
        fastify: "fastify.post('/ai'",
        elysia: '.post("/ai"',
        fets: 'path: "/ai"',
        nestjs: "async chat(",
        nitro: "export default defineEventHandler(",
        adonisjs: 'router.post("/ai"',
      };
      return {
        file: files[backend] ?? serverIndex,
        start: starts[backend] ?? 'app.post("/ai"',
        reject: "401",
        call: backend === "nestjs" ? "this.aiService.streamChat(" : "streamText(",
      };
    }

    it("rejects signed-out callers before the provider call for every pair the helper reports as protected", async () => {
      const arrangements: Array<[ProjectConfig["backend"], ProjectConfig["frontend"]]> = [
        ["self", ["next"]],
        ["self", ["tanstack-start"]],
        ...BackendSchema.options
          .filter((backend) => backend !== "self")
          .map((backend): [ProjectConfig["backend"], ProjectConfig["frontend"]] => [backend, ["tanstack-router"]]),
      ];
      const pairs = arrangements.flatMap(([backend, frontend]) =>
        hasAiExampleEndpoint({ backend, frontend, examples: ["ai"] })
          ? AuthSchema.options
              .filter(
                (auth) =>
                  hasAiRouteAuth({ auth, backend, frontend }) &&
                  getAuthIncompatibility(auth, { ecosystem: "typescript", backend, frontend }) ===
                    null,
              )
              .map((auth) => ({ backend, frontend, auth }))
          : [],
      );
      expect(pairs).toContainEqual({ backend: "hono", frontend: ["tanstack-router"], auth: "better-auth" });

      for (const { backend, frontend, auth } of pairs) {
        const pair = `${backend} + ${frontend[0]} + ${auth}`;
        const files = await generateVirtualAIProject({ ...virtualConfig(backend, frontend), auth });
        const endpoint = aiEndpoint(backend, frontend);
        const source = files.get(endpoint.file) ?? "";
        const body = source.slice(Math.max(source.indexOf(endpoint.start), 0));
        const rejectAt = body.indexOf(endpoint.reject);
        const callAt = body.indexOf(endpoint.call);

        expect({ pair, handler: source.includes(endpoint.start) }).toEqual({ pair, handler: true });
        expect({ pair, rejectsFirst: rejectAt > -1 && rejectAt < callAt }).toEqual({ pair, rejectsFirst: true });
        if (backend === "convex") expect(source).toContain('throw new Error("Not authenticated")');
        expect({ pair, readme: files.get("README.md")?.includes(PROTECTED_README) }).toEqual({ pair, readme: true });
      }
    });

    it("rejects standalone server auth that has no server lookup instead of leaving it open", async () => {
      for (const backend of BackendSchema.options.filter(
        (backend) => backend !== "self" && backend !== "convex",
      )) {
        const frontend: ProjectConfig["frontend"] = ["tanstack-router"];
        if (!hasAiExampleEndpoint({ backend, frontend, examples: ["ai"] })) continue;
        for (const auth of AuthSchema.options.filter((auth) => auth !== "none")) {
          const supported =
            getAuthIncompatibility(auth, { ecosystem: "typescript", backend, frontend }) === null;
          if (!supported) continue;
          expect({ backend, auth, protected: hasAiRouteAuth({ auth, backend, frontend }) }).toEqual({
            backend,
            auth,
            protected: true,
          });
        }
      }

      const config = {
        ...virtualConfig("hono", ["tanstack-router"]),
        auth: "clerk",
        examples: ["ai"],
      } satisfies Partial<ProjectConfig>;
      const graphOnly = { stackParts: legacyProjectConfigToStackParts(config, "selected") };
      for (const input of [config, graphOnly]) {
        expect(await createVirtual(input)).toEqual({
          success: false,
          error: "Clerk needs Convex, fullstack Next.js, or fullstack TanStack Start",
        });
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
