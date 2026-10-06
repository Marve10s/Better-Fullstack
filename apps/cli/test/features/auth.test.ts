import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Backend, Database, Frontend, ORM } from "@/types";

import {
  AUTH_PROVIDERS,
  createCustomConfig,
  expectError,
  expectSuccess,
  runTRPCTest,
  type TestConfig,
} from "@test/support/test-utils";

// API route prefixes the generated Auth.js proxy lets through without a session.
function readPublicApiRoutes(proxy: string) {
  const list = proxy.match(/const publicApiRoutes = \[([\s\S]*?)\];/)?.[1] ?? "";
  return [...list.matchAll(/"(\/api\/[^"]+)"/g)].map((match) => match[1]);
}

describe("Authentication Configurations", () => {
  describe("Better-Auth Provider", () => {
    it("should work with better-auth + database", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-db",
        auth: "better-auth",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    const databases = ["sqlite", "postgres", "mysql"];
    for (const database of databases) {
      it(`should work with better-auth + ${database}`, async () => {
        const result = await runTRPCTest({
          projectName: `better-auth-${database}`,
          auth: "better-auth",
          backend: "hono",
          runtime: "bun",
          database: database as Database,
          orm: "drizzle",
          api: "trpc",
          frontend: ["tanstack-router"],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    }

    it("should work with better-auth + mongodb + mongoose", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-mongodb",
        auth: "better-auth",
        backend: "hono",
        runtime: "bun",
        database: "mongodb",
        orm: "mongoose",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with better-auth + no database (non-convex)", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-no-db-fail",
        auth: "better-auth",
        backend: "hono",
        runtime: "bun",
        database: "none",
        orm: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with better-auth + convex backend (tanstack-router)", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-convex-success",
        auth: "better-auth",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectSuccess(result);
    });

    it("should work with better-auth + react-vite and generate routed auth templates", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-react-vite",
        auth: "better-auth",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.auth).toBe("better-auth");
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const router = await readFile(join(projectDir, "apps/web/src/router.tsx"), "utf8");
      const login = await readFile(join(projectDir, "apps/web/src/routes/login.tsx"), "utf8");
      const dashboard = await readFile(join(projectDir, "apps/web/src/routes/dashboard.tsx"), "utf8");
      const userMenu = await readFile(
        join(projectDir, "apps/web/src/components/user-menu.tsx"),
        "utf8",
      );
      const webPackageJson = JSON.parse(
        await readFile(join(projectDir, "apps/web/package.json"), "utf8"),
      ) as {
        dependencies?: Record<string, string>;
      };

      expect(router).toContain('path: "login"');
      expect(router).toContain('path: "dashboard"');
      expect(login).toContain("SignInForm");
      expect(dashboard).toContain('from "react-router"');
      expect(userMenu).toContain('from "react-router"');
      expect(webPackageJson.dependencies?.["react-router"]).toBeDefined();
      expect(webPackageJson.dependencies?.["@tanstack/react-form"]).toBeDefined();
    });

    it("should work with better-auth + convex backend (react-vite)", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-convex-react-vite",
        auth: "better-auth",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectSuccess(result);
    });

    it("should scaffold Convex Better Auth with Polar payments", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-convex-polar",
        auth: "better-auth",
        payments: "polar",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      if (!result.projectDir) {
        throw new Error("Expected projectDir to be defined");
      }

      const convexConfigFile = await readFile(
        join(result.projectDir, "packages/backend/convex/convex.config.ts"),
        "utf8",
      );
      const httpFile = await readFile(
        join(result.projectDir, "packages/backend/convex/http.ts"),
        "utf8",
      );
      const polarFile = await readFile(
        join(result.projectDir, "packages/backend/convex/polar.ts"),
        "utf8",
      );
      const dashboardFile = await readFile(
        join(result.projectDir, "apps/web/src/routes/dashboard.tsx"),
        "utf8",
      );
      const backendPackageFile = await readFile(
        join(result.projectDir, "packages/backend/package.json"),
        "utf8",
      );
      const webPackageFile = await readFile(
        join(result.projectDir, "apps/web/package.json"),
        "utf8",
      );
      const convexEnvFile = await readFile(
        join(result.projectDir, "packages/backend/.env.local"),
        "utf8",
      );

      expect(convexConfigFile).toContain('import polar from "@convex-dev/polar/convex.config";');
      expect(convexConfigFile).toContain("app.use(polar);");
      expect(httpFile).toContain('import { polar } from "./polar";');
      expect(httpFile).toContain("polar.registerRoutes(http as any);");
      expect(polarFile).toContain('import { Polar } from "@convex-dev/polar";');
      expect(polarFile).toContain("POLAR_PRODUCT_ID_PRO");
      expect(dashboardFile).toContain('from "@convex-dev/polar/react";');
      expect(dashboardFile).toContain("api.polar.getConfiguredProducts");
      expect(dashboardFile).toContain("api.polar.getCurrentSubscription");
      expect(backendPackageFile).toContain('"@convex-dev/polar"');
      expect(backendPackageFile).toContain('"@polar-sh/sdk"');
      expect(webPackageFile).toContain('"@convex-dev/polar"');
      expect(webPackageFile).toContain('"@polar-sh/checkout"');
      expect(convexEnvFile).toContain("# npx convex env set POLAR_ORGANIZATION_TOKEN");
      expect(convexEnvFile).toContain("# npx convex env set POLAR_PRODUCT_ID_PRO");
      expect(convexEnvFile).toContain("POLAR_SERVER=sandbox");
    });

    const compatibleFrontends = [
      "react-vite",
      "tanstack-router",
      "react-router",
      "tanstack-start",
      "next",
      "nuxt",
      "svelte",
      "solid",
      "native-bare",
      "native-uniwind",
      "native-unistyles",
    ];

    for (const frontend of compatibleFrontends) {
      it(`should work with better-auth + ${frontend}`, async () => {
        const config: TestConfig = {
          projectName: `better-auth-${frontend}`,
          auth: "better-auth",
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          frontend: [frontend as Frontend],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        };

        // Handle API compatibility
        if (["nuxt", "svelte", "solid"].includes(frontend)) {
          config.api = "orpc";
        } else {
          config.api = "trpc";
        }

        const result = await runTRPCTest(config);
        expectSuccess(result);
      });
    }

    it("should scaffold better-auth + vinext without a missing user-menu import", async () => {
      const result = await runTRPCTest({
        projectName: "better-auth-vinext",
        auth: "better-auth",
        backend: "elysia",
        runtime: "bun",
        database: "postgres",
        orm: "kysely",
        api: "graphql-yoga",
        frontend: ["vinext"],
        addons: ["none"],
        examples: ["none"],
        dbSetup: "docker",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      const projectDir = result.projectDir;
      const headerFile = await readFile(
        join(projectDir, "apps/web/src/components/header.tsx"),
        "utf-8",
      );
      expect(headerFile).not.toContain("./user-menu");
    });
  });

  describe("Auth.js (NextAuth) Provider", () => {
    it("should work with nextauth + self backend + next + drizzle", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-self-next-drizzle",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const projectDir = result.projectDir!;
      const read = (path: string) => readFile(join(projectDir, path), "utf-8");
      const authConfig = await read("packages/auth/src/index.ts");
      const proxy = await read("apps/web/src/proxy.ts");
      const apiContext = await read("packages/api/src/context.ts");
      const apiProcedures = await read("packages/api/src/index.ts");
      const signUpForm = await read("apps/web/src/components/sign-up-form.tsx");
      const registerRoute = await read("apps/web/src/app/api/auth/register/route.ts");
      const users = await read("packages/auth/src/users.ts");
      const userSchema = await read("packages/db/src/schema/auth.ts");
      const rootPackageJson = await read("package.json");

      expect(authConfig).toContain('strategy: "jwt"');
      expect(authConfig).toContain("await verifyCredentials(email, password)");
      expect(authConfig).not.toContain("authorized(");

      // Only Auth.js and the per-procedure tRPC endpoint skip the proxy session check.
      expect(readPublicApiRoutes(proxy)).toEqual(["/api/auth", "/api/trpc"]);
      expect(proxy).toContain('NextResponse.json({ message: "Unauthorized" }, { status: 401 })');
      expect(proxy).not.toContain("(?!api");

      // bcrypt reads at most 72 bytes, so both registration and sign-in reject longer passwords.
      expect(users).toContain("export const MAX_PASSWORD_BYTES = 72;");
      expect(users).toContain("new TextEncoder().encode(password).length <= MAX_PASSWORD_BYTES");
      expect(registerRoute).toContain(".refine(isPasswordWithinLimit,");
      expect(users).toMatch(
        /verifyCredentials[\s\S]*if \(!isPasswordWithinLimit\(password\)\)[\s\S]*findUserByEmail/,
      );
      expect(signUpForm).toContain(".refine(fitsBcryptLimit,");
      expect(signUpForm).toContain("new TextEncoder().encode(password).length <= 72");

      // Unknown emails and OAuth-only accounts still pay for one bcrypt comparison.
      expect(users).toMatch(/const DUMMY_PASSWORD_HASH = "\$2b\$12\$[./A-Za-z0-9]{53}";/);
      expect(users).toContain("const PASSWORD_HASH_COST = 12;");
      expect(users).toContain("await compare(password, user?.password ?? DUMMY_PASSWORD_HASH)");

      // A concurrent duplicate fails on the unique email column and maps to the same 409.
      expect(users).toContain('current.code === "23505"');
      expect(users).toMatch(/try \{\s*await db\.insert\(users\)/);
      expect(users).not.toContain("if (await findUserByEmail(email))");
      expect(userSchema).toContain('email: text("email").unique()');

      expect(apiContext).toContain('import { auth } from "@nextauth-self-next-drizzle/auth"');
      expect(apiContext).toContain("const session = await auth();");
      expect(apiContext).not.toContain("session: null,");
      expect(apiProcedures).toContain("export const protectedProcedure");

      const registerPath = signUpForm.match(/fetch\("([^"]+)"/)?.[1];
      expect(registerPath).toBe("/api/auth/register");
      expect(existsSync(join(projectDir, `apps/web/src/app${registerPath}/route.ts`))).toBe(true);
      expect(registerRoute).toContain("export async function POST");
      expect(registerRoute).toContain("const created = await registerUser(parsed.data);");
      expect(registerRoute).toContain("{ status: 409 }");
      expect(users).toContain("const password = await hash(input.password, PASSWORD_HASH_COST);");
      expect(users).toContain("db.insert(users).values({ name: input.name, email, password })");
      expect(userSchema).toContain('password: text("password")');
      expect(rootPackageJson).toContain('"next-auth": "5.0.0-beta.32"');
    });

    it("should work with nextauth + self backend + next + prisma", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-self-next-prisma",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "prisma",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const projectDir = result.projectDir!;
      const users = await readFile(join(projectDir, "packages/auth/src/users.ts"), "utf-8");
      const userModel = await readFile(
        join(projectDir, "packages/db/prisma/schema/auth.prisma"),
        "utf-8",
      );
      expect(users).toMatch(/try \{\s*await prisma\.user\.create/);
      expect(users).toContain('current.code === "P2002"');
      expect(userModel).toMatch(/password\s+String\?/);
      expect(
        await readFile(join(projectDir, "apps/web/src/app/api/auth/register/route.ts"), "utf-8"),
      ).toContain("registerUser");
    });

    it("should wire nextauth sessions into the oRPC context", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-self-next-orpc",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "orpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const projectDir = result.projectDir!;
      const apiContext = await readFile(join(projectDir, "packages/api/src/context.ts"), "utf-8");
      const apiProcedures = await readFile(join(projectDir, "packages/api/src/index.ts"), "utf-8");
      expect(apiContext).toContain('import { auth } from "@nextauth-self-next-orpc/auth"');
      expect(apiContext).toContain("const session = await auth();");
      expect(apiContext).not.toMatch(/return \{\s*\}/);
      expect(apiProcedures).toContain("context.session?.user");

      const proxy = await readFile(join(projectDir, "apps/web/src/proxy.ts"), "utf-8");
      const users = await readFile(join(projectDir, "packages/auth/src/users.ts"), "utf-8");
      expect(readPublicApiRoutes(proxy)).toEqual(["/api/auth", "/api/rpc"]);
      expect(users).toContain('current.message.includes("UNIQUE constraint failed")');
    });

    it("should guard the nextauth AI route and leave chat webhooks public", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-self-next-ai",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["ai", "chat-sdk"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const projectDir = result.projectDir!;
      const proxy = await readFile(join(projectDir, "apps/web/src/proxy.ts"), "utf-8");
      expect(existsSync(join(projectDir, "apps/web/src/app/api/ai/route.ts"))).toBe(true);
      const webhookRoute = "apps/web/src/app/api/webhooks/[platform]/route.ts";
      expect(existsSync(join(projectDir, webhookRoute))).toBe(true);
      expect(readPublicApiRoutes(proxy)).toEqual(["/api/auth", "/api/trpc", "/api/webhooks"]);
    });

    it("should generate an OAuth-only nextauth setup without a database adapter", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-self-next-oauth-only",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const projectDir = result.projectDir!;
      const authConfig = await readFile(join(projectDir, "packages/auth/src/index.ts"), "utf-8");
      const signInForm = await readFile(
        join(projectDir, "apps/web/src/components/sign-in-form.tsx"),
        "utf-8",
      );
      expect(authConfig).not.toContain("Credentials(");
      expect(authConfig).not.toContain("adapter:");
      expect(signInForm).not.toContain('signIn("credentials"');
      expect(existsSync(join(projectDir, "apps/web/src/components/sign-up-form.tsx"))).toBe(false);
      expect(existsSync(join(projectDir, "apps/web/src/app/api/auth/register/route.ts"))).toBe(
        false,
      );
    });

    it("should work with nextauth + self backend + next + sqlite", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-self-next-sqlite",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject nextauth + non-self backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-non-self-fail",
        auth: "nextauth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth.js (NextAuth) needs fullstack Next.js");
    });

    it("should reject nextauth + non-next frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-non-next-fail",
        auth: "nextauth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-start"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth.js (NextAuth) needs the Next.js frontend");
    });

    it("should reject nextauth + tanstack-router frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-tanstack-router-fail",
        auth: "nextauth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth.js (NextAuth) needs fullstack Next.js");
    });

    it("should reject nextauth + react-vite frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-react-vite-fail",
        auth: "nextauth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth.js (NextAuth) needs fullstack Next.js");
    });

    it("should reject nextauth + convex backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "nextauth-convex-fail",
        auth: "nextauth",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth.js (NextAuth) needs fullstack Next.js");
    });
  });

  describe("Stack Auth Provider", () => {
    it("should work with stack-auth + self backend + next", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-self-next",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject stack-auth + self backend + vinext", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-self-vinext",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["vinext"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectError(result, "Stack Auth needs the Next.js frontend");
    });

    it("should work with stack-auth + self backend + next + prisma", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-self-next-prisma",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "prisma",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject stack-auth + self backend + vinext + prisma", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-self-vinext-prisma",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "prisma",
        api: "trpc",
        frontend: ["vinext"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectError(result, "Stack Auth needs the Next.js frontend");
    });

    it("should work with stack-auth + self backend + next + sqlite", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-self-next-sqlite",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject stack-auth + self backend + vinext + sqlite", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-self-vinext-sqlite",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["vinext"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectError(result, "Stack Auth needs the Next.js frontend");
    });

    it("should reject stack-auth + non-self backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-non-self-fail",
        auth: "stack-auth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Stack Auth needs fullstack Next.js");
    });

    it("should reject stack-auth + non-next frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-non-next-fail",
        auth: "stack-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-start"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Stack Auth needs the Next.js frontend");
    });

    it("should reject stack-auth + tanstack-router frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-tanstack-router-fail",
        auth: "stack-auth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Stack Auth needs fullstack Next.js");
    });

    it("should reject stack-auth + react-vite frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-react-vite-fail",
        auth: "stack-auth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Stack Auth needs fullstack Next.js");
    });

    it("should reject stack-auth + convex backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "stack-auth-convex-fail",
        auth: "stack-auth",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Stack Auth needs fullstack Next.js");
    });
  });

  describe("Supabase Auth Provider", () => {
    it("should work with supabase-auth + self backend + next", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-self-next",
        auth: "supabase-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with supabase-auth + self backend + next + prisma", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-self-next-prisma",
        auth: "supabase-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "prisma",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with supabase-auth + self backend + next + sqlite", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-self-next-sqlite",
        auth: "supabase-auth",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject supabase-auth + non-self backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-non-self-fail",
        auth: "supabase-auth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Supabase Auth needs fullstack Next.js or fullstack TanStack Start");
    });

    it("should work with supabase-auth + self backend + tanstack-start", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-self-tanstack-start",
        auth: "supabase-auth",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-start"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.auth).toBe("supabase-auth");

      const serverClient = await readFile(
        join(result.projectDir!, "apps/web/src/lib/supabase/server.ts"),
        "utf-8",
      );
      expect(serverClient).toContain("if (headers)");
    });

    it("should reject supabase-auth + tanstack-router frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-tanstack-router-fail",
        auth: "supabase-auth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Supabase Auth needs fullstack Next.js or fullstack TanStack Start");
    });

    it("should reject supabase-auth + react-vite frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-react-vite-fail",
        auth: "supabase-auth",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Supabase Auth needs fullstack Next.js or fullstack TanStack Start");
    });

    it("should reject supabase-auth + convex backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "supabase-auth-convex-fail",
        auth: "supabase-auth",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Supabase Auth needs fullstack Next.js or fullstack TanStack Start");
    });
  });

  describe("Auth0 Provider", () => {
    it("should work with auth0 + self backend + next", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-self-next",
        auth: "auth0",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with auth0 + self backend + next + prisma", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-self-next-prisma",
        auth: "auth0",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "prisma",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with auth0 + self backend + next + sqlite", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-self-next-sqlite",
        auth: "auth0",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject auth0 + non-self backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-non-self-fail",
        auth: "auth0",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth0 needs fullstack Next.js");
    });

    it("should reject auth0 + non-next frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-non-next-fail",
        auth: "auth0",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-start"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth0 needs the Next.js frontend");
    });

    it("should reject auth0 + tanstack-router frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-tanstack-router-fail",
        auth: "auth0",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth0 needs fullstack Next.js");
    });

    it("should reject auth0 + react-vite frontend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-react-vite-fail",
        auth: "auth0",
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth0 needs fullstack Next.js");
    });

    it("should reject auth0 + convex backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "auth0-convex-fail",
        auth: "auth0",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expectError(result, "Auth0 needs fullstack Next.js");
    });
  });

  describe("Clerk Provider", () => {
    it("should work with clerk + convex", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-convex",
        auth: "clerk",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with clerk + convex + react-vite", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-convex-react-vite",
        auth: "clerk",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["react-vite"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with clerk + self backend + next and generate legit templates", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-self-next",
        auth: "clerk",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        addons: ["turborepo"],
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const middleware = await readFile(join(projectDir, "apps/web/src/middleware.ts"), "utf8");
      const dashboard = await readFile(join(projectDir, "apps/web/src/app/dashboard/page.tsx"), "utf8");
      const userMenu = await readFile(
        join(projectDir, "apps/web/src/components/user-menu.tsx"),
        "utf8",
      );
      const webEnv = await readFile(join(projectDir, "apps/web/.env"), "utf8");
      const webEnvSchema = await readFile(join(projectDir, "packages/env/src/web.ts"), "utf8");
      const webPackageJson = await readFile(join(projectDir, "apps/web/package.json"), "utf8");

      const apiContext = await readFile(join(projectDir, "packages/api/src/context.ts"), "utf8");
      const apiProcedures = await readFile(join(projectDir, "packages/api/src/index.ts"), "utf8");
      const apiPackageJson = await readFile(join(projectDir, "packages/api/package.json"), "utf8");

      expect(apiContext).toContain('import { auth } from "@clerk/nextjs/server"');
      expect(apiContext).toContain("const { userId } = await auth();");
      expect(apiContext).not.toContain("session: null,");
      expect(apiProcedures).toContain("export const protectedProcedure");
      expect(apiPackageJson).toContain("@clerk/nextjs");
      expect(middleware).toContain("clerkMiddleware");
      expect(dashboard).toContain('await auth()');
      expect(dashboard).toContain('redirect("/")');
      expect(userMenu).toContain("@clerk/nextjs");
      expect(webEnv).toContain("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=");
      expect(webEnv).toContain("CLERK_SECRET_KEY=");
      expect(webEnvSchema).toContain("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
      expect(webPackageJson).toContain("@clerk/nextjs");
    });

    it("should work with clerk + self backend + tanstack-start and generate legit templates", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-self-tanstack-start",
        auth: "clerk",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "orpc",
        frontend: ["tanstack-start"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        addons: ["turborepo"],
        install: false,
      });

      expectSuccess(result);
      expect(result.projectDir).toBeDefined();

      const projectDir = result.projectDir!;
      const startFile = await readFile(join(projectDir, "apps/web/src/start.ts"), "utf8");
      const dashboard = await readFile(join(projectDir, "apps/web/src/routes/dashboard.tsx"), "utf8");
      const userMenu = await readFile(
        join(projectDir, "apps/web/src/components/user-menu.tsx"),
        "utf8",
      );
      const webEnv = await readFile(join(projectDir, "apps/web/.env"), "utf8");
      const webEnvSchema = await readFile(join(projectDir, "packages/env/src/web.ts"), "utf8");
      const webPackageJson = await readFile(join(projectDir, "apps/web/package.json"), "utf8");

      const apiContext = await readFile(join(projectDir, "packages/api/src/context.ts"), "utf8");
      const apiProcedures = await readFile(join(projectDir, "packages/api/src/index.ts"), "utf8");

      expect(apiContext).toContain('import { auth } from "@clerk/tanstack-react-start/server"');
      expect(apiContext).toContain("const { userId } = await auth();");
      expect(apiContext).not.toMatch(/return \{\s*\}/);
      expect(apiProcedures).toContain("context.session?.user");
      expect(startFile).toContain("clerkMiddleware()");
      expect(dashboard).toContain("@clerk/tanstack-react-start");
      expect(dashboard).toContain("createServerFn");
      expect(dashboard).toContain('to: "/"');
      expect(userMenu).toContain("@clerk/tanstack-react-start");
      expect(webEnv).toContain("VITE_CLERK_PUBLISHABLE_KEY=");
      expect(webEnv).toContain("CLERK_SECRET_KEY=");
      expect(webEnvSchema).toContain("VITE_CLERK_PUBLISHABLE_KEY");
      expect(webPackageJson).toContain("@clerk/tanstack-react-start");
      expect(webPackageJson).toContain("\"srvx\"");
    });

    it("should reject clerk + unsupported standalone backend with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-hono-fail",
        auth: "clerk",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        addons: ["turborepo"],
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
      });

      expectError(result, "Clerk needs Convex, fullstack Next.js, or fullstack TanStack Start");
    });

    it("should reject clerk + self backend + astro with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-self-astro-fail",
        auth: "clerk",
        backend: "self",
        runtime: "none",
        astroIntegration: "react",
        database: "sqlite",
        orm: "drizzle",
        api: "orpc",
        frontend: ["astro"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        addons: ["turborepo"],
      });

      expectError(result, "Clerk isn't available for fullstack Astro yet");
    });

    it("should reject clerk + self backend + nuxt with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-self-nuxt-fail",
        auth: "clerk",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "orpc",
        frontend: ["nuxt"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        addons: ["turborepo"],
      });

      expectError(result, "Clerk isn't available for fullstack Nuxt yet");
    });

    it("should reject clerk + self backend + next + native companion with the shared reason", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-self-next-native-fail",
        auth: "clerk",
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        api: "trpc",
        frontend: ["next", "native-bare"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        addons: ["turborepo"],
      });

      expectError(
        result,
        "Clerk with a fullstack backend needs a web-only Next.js or TanStack Start project (no mobile app)",
      );
    });

    const compatibleFrontends = [
      "react-vite",
      "tanstack-router",
      "react-router",
      "tanstack-start",
      "next",
      "native-bare",
      "native-uniwind",
      "native-unistyles",
    ];

    for (const frontend of compatibleFrontends) {
      it(`should work with clerk + ${frontend}`, async () => {
        const result = await runTRPCTest({
          projectName: `clerk-${frontend}`,
          auth: "clerk",
          backend: "convex",
          runtime: "none",
          database: "none",
          webDeploy: "none",
          serverDeploy: "none",
          addons: ["turborepo"],
          dbSetup: "none",
          examples: ["none"],
          orm: "none",
          api: "none",
          frontend: [frontend as Frontend],
          install: false,
        });

        expectSuccess(result);
      });
    }

    const authRejectedFrontends = ["nuxt", "svelte"];

    for (const frontend of authRejectedFrontends) {
      it(`should reject clerk + ${frontend} with the shared reason`, async () => {
        const result = await runTRPCTest({
          projectName: `clerk-${frontend}-fail`,
          auth: "clerk",
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          frontend: [frontend as Frontend],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
        });

        expectError(
          result,
          "Clerk with Convex requires React Router, React + Vite, TanStack Router, TanStack Start, Next.js, or React Native",
        );
      });
    }

    it("should fail with clerk + solid", async () => {
      const result = await runTRPCTest({
        projectName: "clerk-solid-fail",
        auth: "clerk",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["solid"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "not compatible with '--backend convex'");
    });
  });

  describe("No Authentication", () => {
    it("should work with auth none", async () => {
      const result = await runTRPCTest({
        projectName: "no-auth",
        auth: "none",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with auth none + no database", async () => {
      // When backend is 'none', examples are automatically cleared
      const result = await runTRPCTest({
        projectName: "no-auth-no-db",
        auth: "none",
        backend: "none",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with auth none + convex", async () => {
      const result = await runTRPCTest({
        projectName: "no-auth-convex",
        auth: "none",
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Authentication with Different Backends", () => {
    const backends = ["hono", "express", "fastify", "elysia", "self"];

    for (const backend of backends) {
      it(`should work with better-auth + ${backend}`, async () => {
        const config: TestConfig = {
          projectName: `better-auth-${backend}`,
          auth: "better-auth",
          backend: backend as Backend,
          database: "sqlite",
          orm: "drizzle",
          api: "trpc",
          frontend: backend === "self" ? ["next"] : ["tanstack-router"],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        };

        // Set appropriate runtime
        if (backend === "elysia") {
          config.runtime = "bun";
        } else if (backend === "self") {
          config.runtime = "none";
        } else {
          config.runtime = "bun";
        }

        const result = await runTRPCTest(config);
        expectSuccess(result);
      });
    }
  });

  describe("Authentication with Different ORMs", () => {
    const ormCombinations = [
      { database: "sqlite", orm: "drizzle" },
      { database: "sqlite", orm: "prisma" },
      { database: "postgres", orm: "drizzle" },
      { database: "postgres", orm: "prisma" },
      { database: "mysql", orm: "drizzle" },
      { database: "mysql", orm: "prisma" },
      { database: "mongodb", orm: "mongoose" },
      { database: "mongodb", orm: "prisma" },
    ];

    for (const { database, orm } of ormCombinations) {
      it(`should work with better-auth + ${database} + ${orm}`, async () => {
        const result = await runTRPCTest({
          projectName: `better-auth-${database}-${orm}`,
          auth: "better-auth",
          backend: "hono",
          runtime: "bun",
          database: database as Database,
          orm: orm as ORM,
          api: "trpc",
          frontend: ["tanstack-router"],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    }
  });

  describe("All Auth Providers", () => {
    for (const auth of AUTH_PROVIDERS.filter((provider) => provider !== "go-better-auth")) {
      it(`should work with ${auth} in appropriate setup`, async () => {
        const config: TestConfig = {
          projectName: `test-${auth}`,
          auth,
          frontend: ["tanstack-router"],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        };

        if (auth === "clerk") {
          config.backend = "convex";
          config.runtime = "none";
          config.database = "none";
          config.orm = "none";
          config.api = "none";
        } else if (auth === "nextauth") {
          config.backend = "self";
          config.runtime = "none";
          config.database = "postgres";
          config.orm = "drizzle";
          config.api = "trpc";
          config.frontend = ["next"];
        } else if (auth === "stack-auth") {
          config.backend = "self";
          config.runtime = "none";
          config.database = "postgres";
          config.orm = "drizzle";
          config.api = "trpc";
          config.frontend = ["next"];
        } else if (auth === "supabase-auth") {
          config.backend = "self";
          config.runtime = "none";
          config.database = "postgres";
          config.orm = "drizzle";
          config.api = "trpc";
          config.frontend = ["next"];
        } else if (auth === "auth0") {
          config.backend = "self";
          config.runtime = "none";
          config.database = "postgres";
          config.orm = "drizzle";
          config.api = "trpc";
          config.frontend = ["next"];
        } else if (auth === "workos" || auth === "kinde") {
          config.backend = "self";
          config.runtime = "none";
          config.database = "postgres";
          config.orm = "drizzle";
          config.api = "trpc";
          config.frontend = ["next"];
        } else if (auth === "passport") {
          config.backend = "express";
          config.runtime = "node";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.api = "trpc";
        } else if (auth === "better-auth") {
          config.backend = "hono";
          config.runtime = "bun";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.api = "trpc";
        } else {
          config.backend = "hono";
          config.runtime = "bun";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.api = "trpc";
        }

        const result = await runTRPCTest(config);
        expectSuccess(result);
      });
    }
  });

  describe("ORM + Auth compatibility", () => {
    it("should scaffold Kysely with Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-better-auth",
          frontend: ["tanstack-router"],
          backend: "hono",
          database: "postgres",
          orm: "kysely",
          auth: "better-auth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Kysely with Clerk", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-clerk",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "kysely",
          auth: "clerk",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Kysely without auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-no-auth",
          frontend: ["tanstack-router"],
          database: "sqlite",
          orm: "kysely",
          auth: "none",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold NextAuth with Prisma and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "nextauth-prisma-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "prisma",
          auth: "nextauth",
        }),
      );
      expectSuccess(result);
      const users = await readFile(join(result.projectDir!, "packages/auth/src/users.ts"), "utf-8");
      expect(users).toContain('current.code === "P2002"');
    });

    it("should scaffold NextAuth with Drizzle and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "nextauth-drizzle-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "drizzle",
          auth: "nextauth",
        }),
      );
      expectSuccess(result);
      const users = await readFile(join(result.projectDir!, "packages/auth/src/users.ts"), "utf-8");
      expect(users).toContain('current.code === "ER_DUP_ENTRY"');
    });

    it("TypeORM + better-auth is rejected with the shared reason", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typeorm-better-auth",
          frontend: ["tanstack-router"],
          database: "postgres",
          orm: "typeorm",
          auth: "better-auth",
          runtime: "node",
        }),
      );
      expectError(result, "Better Auth has no typeorm adapter");
    });

    it("Sequelize + better-auth is rejected with the shared reason", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sequelize-better-auth",
          frontend: ["tanstack-router"],
          database: "postgres",
          orm: "sequelize",
          auth: "better-auth",
          runtime: "node",
        }),
      );
      expectError(result, "Better Auth has no sequelize adapter");
    });

    it("MikroORM + better-auth is rejected with the shared reason", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "mikroorm-better-auth",
          frontend: ["tanstack-router"],
          database: "postgres",
          orm: "mikroorm",
          auth: "better-auth",
        }),
      );
      expectError(result, "Better Auth has no mikroorm adapter");
    });

    it("should scaffold Drizzle with Clerk", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "drizzle-clerk",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "drizzle",
          auth: "clerk",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Drizzle with Stack-Auth and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "drizzle-stack-auth-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "drizzle",
          auth: "stack-auth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Drizzle with Auth0 and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "drizzle-auth0-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "drizzle",
          auth: "auth0",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Prisma with Clerk", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "prisma-clerk",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "prisma",
          auth: "clerk",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold TypeORM with Clerk", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typeorm-clerk",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "typeorm",
          auth: "clerk",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold MikroORM with Clerk", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "mikroorm-clerk",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "mikroorm",
          auth: "clerk",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Sequelize with Clerk", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sequelize-clerk",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "sequelize",
          auth: "clerk",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Prisma with Stack-Auth and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "prisma-stack-auth-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "prisma",
          auth: "stack-auth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Prisma with Auth0 and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "prisma-auth0-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "prisma",
          auth: "auth0",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Prisma with Supabase-Auth and MySQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "prisma-supabase-auth-mysql",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mysql",
          orm: "prisma",
          auth: "supabase-auth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Kysely with NextAuth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-nextauth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "kysely",
          auth: "nextauth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Kysely with Stack-Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-stack-auth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "kysely",
          auth: "stack-auth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Kysely with Supabase-Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-supabase-auth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "kysely",
          auth: "supabase-auth",
        }),
      );
      expectSuccess(result);
    });

    it("should scaffold Kysely with Auth0", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "kysely-auth0",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "kysely",
          auth: "auth0",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Auth Edge Cases", () => {
    it("should handle auth with complex frontend combinations", async () => {
      const result = await runTRPCTest({
        projectName: "auth-web-native-combo",
        auth: "better-auth",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router", "native-bare"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with go-better-auth through the full CLI create path", async () => {
      const result = await runTRPCTest({
        projectName: "go-auth-e2e",
        ecosystem: "go",
        auth: "go-better-auth",
        goWebFramework: "gin",
        goOrm: "none",
        goApi: "none",
        goCli: "none",
        goLogging: "none",
        goAuth: "none",
        goTesting: [],
        goRealtime: "none",
        goMessageQueue: "none",
        goCaching: "none",
        goConfig: "none",
        goObservability: "none",
        backend: "none",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        frontend: ["none"],
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should reject go-better-auth on TypeScript stacks", async () => {
      const result = await runTRPCTest({
        projectName: "go-auth-ts-reject",
        ecosystem: "typescript",
        auth: "go-better-auth",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectError(result, "GoBetterAuth is available only for Go stacks");
    });

    it("should handle auth constraints with workers runtime", async () => {
      const result = await runTRPCTest({
        projectName: "auth-workers",
        auth: "better-auth",
        backend: "hono",
        runtime: "workers",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "cloudflare",
        install: false,
      });

      expectSuccess(result);
    });
  });
});
