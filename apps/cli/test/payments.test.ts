import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { createCustomConfig, expectError, expectSuccess, runTRPCTest } from "./test-utils";

describe("Payments Options", () => {
  describe("Stripe with React frontends", () => {
    test("stripe with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-tanstack-router",
          frontend: ["tanstack-router"],
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-react-router",
          frontend: ["react-router"],
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Vinext fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-vinext",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with React + Vite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-react-vite",
          frontend: ["react-vite"],
          payments: "stripe",
        }),
      );
      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const router = await Bun.file(join(result.projectDir!, "apps/web/src/router.tsx")).text();
      const successRoute = await Bun.file(
        join(result.projectDir!, "apps/web/src/routes/success.tsx"),
      ).text();

      expect(router).toContain('path: "success"');
      expect(successRoute).toContain('from "react-router"');
    });
  });

  describe("Stripe with different backends", () => {
    test("stripe with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Stripe with non-React frontends", () => {
    test("stripe with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-nuxt",
          frontend: ["nuxt"],
          backend: "hono",
          api: "none",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-svelte",
          frontend: ["svelte"],
          backend: "hono",
          api: "none",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });

    test("stripe with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "stripe-solid",
          frontend: ["solid"],
          backend: "hono",
          api: "none",
          payments: "stripe",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Polar payments", () => {
    test("polar with TanStack Router and Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "polar-tanstack-router",
          frontend: ["tanstack-router"],
          payments: "polar",
          auth: "better-auth",
        }),
      );
      expectSuccess(result);
    });

    test("polar with React + Vite and Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "polar-react-vite",
          frontend: ["react-vite"],
          payments: "polar",
          auth: "better-auth",
        }),
      );
      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const successRoute = await Bun.file(
        join(result.projectDir!, "apps/web/src/routes/success.tsx"),
      ).text();
      const webPackageJson = JSON.parse(
        await Bun.file(join(result.projectDir!, "apps/web/package.json")).text(),
      ) as {
        dependencies?: Record<string, string>;
      };

      expect(successRoute).toContain('from "react-router"');
      expect(webPackageJson.dependencies?.["@polar-sh/better-auth"]).toBeDefined();
    });
  });

  describe("Lemon Squeezy with React frontends", () => {
    test("lemon-squeezy with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-tanstack-router",
          frontend: ["tanstack-router"],
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-react-router",
          frontend: ["react-router"],
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with React + Vite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-react-vite",
          frontend: ["react-vite"],
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Lemon Squeezy with different backends", () => {
    test("lemon-squeezy with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Lemon Squeezy with non-React frontends", () => {
    test("lemon-squeezy with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-nuxt",
          frontend: ["nuxt"],
          backend: "hono",
          api: "none",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-svelte",
          frontend: ["svelte"],
          backend: "hono",
          api: "none",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });

    test("lemon-squeezy with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "lemonsqueezy-solid",
          frontend: ["solid"],
          backend: "hono",
          api: "none",
          payments: "lemon-squeezy",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Paddle with React frontends", () => {
    test("paddle with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-tanstack-router",
          frontend: ["tanstack-router"],
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-react-router",
          frontend: ["react-router"],
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with React + Vite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-react-vite",
          frontend: ["react-vite"],
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Paddle with different backends", () => {
    test("paddle with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Paddle with non-React frontends", () => {
    test("paddle with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-nuxt",
          frontend: ["nuxt"],
          backend: "hono",
          api: "none",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-svelte",
          frontend: ["svelte"],
          backend: "hono",
          api: "none",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });

    test("paddle with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paddle-solid",
          frontend: ["solid"],
          backend: "hono",
          api: "none",
          payments: "paddle",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Dodo Payments with React frontends", () => {
    test("dodo with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-tanstack-router",
          frontend: ["tanstack-router"],
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-react-router",
          frontend: ["react-router"],
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo should fail with React + Vite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-react-vite-fail",
          frontend: ["react-vite"],
          payments: "dodo",
          expectError: true,
        }),
      );
      expectError(result, "Dodo Payments are not yet supported for React + Vite projects");
    });
  });

  describe("Dodo Payments with different backends", () => {
    test("dodo with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Dodo Payments with non-React frontends", () => {
    test("dodo with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-nuxt",
          frontend: ["nuxt"],
          backend: "hono",
          api: "none",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-svelte",
          frontend: ["svelte"],
          backend: "hono",
          api: "none",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });

    test("dodo with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "dodo-solid",
          frontend: ["solid"],
          backend: "hono",
          api: "none",
          payments: "dodo",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("RevenueCat payments", () => {
    test("revenuecat with native-bare frontend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "revenuecat-native-bare",
          frontend: ["native-bare"],
          backend: "hono",
          api: "none",
          payments: "revenuecat",
        }),
      );
      expectSuccess(result);
    });

    test("revenuecat with native-unistyles frontend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "revenuecat-native-unistyles",
          frontend: ["native-unistyles"],
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          payments: "revenuecat",
        }),
      );
      expectSuccess(result);
    });

    test("revenuecat with native-uniwind and better-auth (convex combined webhook)", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "revenuecat-uniwind-better-auth",
          frontend: ["native-uniwind"],
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "better-auth",
          payments: "revenuecat",
        }),
      );
      expectSuccess(result);
    });

    test("revenuecat with React Native ecosystem and no backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "revenuecat-react-native",
          ecosystem: "react-native",
          frontend: ["native-bare"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          dbSetup: "none",
          api: "none",
          auth: "none",
          payments: "revenuecat",
          cssFramework: "none",
        }),
      );

      expectSuccess(result);

      const env = await readFile(join(result.projectDir!, "apps/native/.env"), "utf-8");
      expect(env).toContain("EXPO_PUBLIC_REVENUECAT_OFFERING_ID");
    });
  });

  describe("Creem provider", () => {
    test("creem with TanStack Router + Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "creem-tanstack-router",
          frontend: ["tanstack-router"],
          backend: "hono",
          auth: "better-auth",
          payments: "creem",
        }),
      );
      expectSuccess(result);

      const pkg = await readFile(join(result.projectDir!, "packages/auth/package.json"), "utf-8");
      expect(pkg).toContain("creem");
      expect(pkg).toContain("@creem_io/better-auth");

      const lib = await readFile(
        join(result.projectDir!, "packages/auth/src/lib/creem.ts"),
        "utf-8",
      );
      expect(lib).toContain('from "creem"');
    });

    test("creem with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "creem-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          payments: "creem",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Autumn provider", () => {
    test("autumn with TanStack Router + Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "autumn-tanstack-router",
          frontend: ["tanstack-router"],
          backend: "hono",
          auth: "better-auth",
          payments: "autumn",
        }),
      );
      expectSuccess(result);

      const pkg = await readFile(join(result.projectDir!, "packages/auth/package.json"), "utf-8");
      expect(pkg).toContain("autumn-js");

      const lib = await readFile(
        join(result.projectDir!, "packages/auth/src/lib/autumn.ts"),
        "utf-8",
      );
      expect(lib).toContain('from "autumn-js"');
      expect(lib).toContain("autumn.billing.attach");
      expect(lib).toContain("autumn.customers.getOrCreate");
      expect(lib).toContain("autumn.track");
      expect(lib).toContain("customerId: params.customerId");
      expect(lib).toContain("planId: params.planId");
      expect(lib).not.toContain("autumn.checkout");
      expect(lib).not.toContain("customer_id");
    });

    test("autumn with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "autumn-svelte",
          frontend: ["svelte"],
          backend: "hono",
          api: "none",
          payments: "autumn",
        }),
      );
      expectSuccess(result);
    });

    test("autumn with SolidStart fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "autumn-solid-start",
          frontend: ["solid-start"],
          backend: "self",
          runtime: "none",
          api: "none",
          payments: "autumn",
        }),
      );
      expectSuccess(result);

      const pkg = await readFile(join(result.projectDir!, "apps/web/package.json"), "utf-8");
      expect(pkg).toContain("autumn-js");

      const route = await readFile(
        join(result.projectDir!, "apps/web/src/routes/success.tsx"),
        "utf-8",
      );
      expect(route).toContain('from "@solidjs/router"');

      const env = await readFile(join(result.projectDir!, "apps/web/.env"), "utf-8");
      expect(env).toContain("VITE_AUTUMN_BACKEND_URL=http://localhost:3001/api/autumn");
    });
  });

  describe("Commet provider", () => {
    test("commet with React Router + Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "commet-react-router",
          frontend: ["react-router"],
          backend: "hono",
          auth: "better-auth",
          payments: "commet",
        }),
      );
      expectSuccess(result);

      const pkg = await readFile(join(result.projectDir!, "packages/auth/package.json"), "utf-8");
      expect(pkg).toContain("@commet/node");

      const lib = await readFile(
        join(result.projectDir!, "packages/auth/src/lib/commet.ts"),
        "utf-8",
      );
      expect(lib).toContain('from "@commet/node"');
    });

    test("commet with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "commet-solid",
          frontend: ["solid"],
          backend: "hono",
          api: "none",
          payments: "commet",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Xendit provider", () => {
    test("generates server-side Payment Sessions and webhook helpers", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "xendit-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          auth: "none",
          payments: "xendit",
        }),
      );
      expectSuccess(result);

      const helper = await readFile(
        join(result.projectDir!, "apps/server/src/lib/xendit.ts"),
        "utf-8",
      );
      const env = await readFile(join(result.projectDir!, "apps/server/.env"), "utf-8");
      const envContract = await readFile(
        join(result.projectDir!, "packages/env/src/server.ts"),
        "utf-8",
      );

      expect(helper).toContain('import { env } from "@xendit-hono/env/server"');
      expect(helper).toContain("fetch(`${apiUrl}/sessions`");
      expect(helper).toContain('session_type: "PAY"');
      expect(helper).toContain("payment_link_url");
      expect(helper).toContain("verifyXenditWebhookToken");
      expect(helper).toContain("handleXenditPaymentSessionWebhook");
      expect(helper).toContain("x-callback-token");
      expect(helper).toContain('type: "INDIVIDUAL"');
      expect(helper).not.toContain('"INDIVIDUAL" | "BUSINESS"');
      expect(env).toContain("XENDIT_SECRET_KEY=");
      expect(env).toContain("XENDIT_WEBHOOK_TOKEN=");
      expect(envContract).toContain("XENDIT_SECRET_KEY: z.string().min(1)");
      expect(envContract).toContain("XENDIT_WEBHOOK_TOKEN: z.string().min(1)");
    });

    test("binds Xendit secrets for Cloudflare Workers", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "xendit-workers",
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "workers",
          database: "none",
          orm: "none",
          dbSetup: "none",
          api: "none",
          auth: "none",
          payments: "xendit",
          serverDeploy: "cloudflare",
        }),
      );
      expectSuccess(result);

      const helper = await readFile(
        join(result.projectDir!, "apps/server/src/lib/xendit.ts"),
        "utf-8",
      );
      const alchemy = await readFile(
        join(result.projectDir!, "packages/infra/alchemy.run.ts"),
        "utf-8",
      );

      expect(helper).toContain('import { env } from "@xendit-workers/env/server"');
      expect(helper).not.toContain("process.env");
      expect(alchemy).toContain("XENDIT_SECRET_KEY: alchemy.secret.env.XENDIT_SECRET_KEY!");
      expect(alchemy).toContain("XENDIT_WEBHOOK_TOKEN: alchemy.secret.env.XENDIT_WEBHOOK_TOKEN!");
      expect(alchemy).toContain(
        'XENDIT_API_URL: alchemy.env.XENDIT_API_URL ?? "https://api.xendit.co"',
      );
    });

    test("rejects Convex because Payment Sessions require server secrets", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "xendit-convex-invalid",
          frontend: ["tanstack-router"],
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          dbSetup: "none",
          api: "none",
          payments: "xendit",
          expectError: true,
        }),
      );

      expectError(result, "Xendit Payment Sessions require a standalone or fullstack backend");
    });
  });

  describe("No payments option", () => {
    test("none payments option", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "no-payments",
          frontend: ["tanstack-router"],
          payments: "none",
        }),
      );
      expectSuccess(result);
    });
  });
});
