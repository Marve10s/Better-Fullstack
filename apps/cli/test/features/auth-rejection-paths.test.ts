import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  AUTH_VALUES,
  analyzeStackCompatibility,
  createCliDefaultProjectConfigBase,
  formatStackPartSpec,
  getAuthIncompatibility,
  legacyProjectConfigToStackParts,
  type ProjectConfig,
} from "@better-fullstack/types";
import { createCustomConfig, runTRPCTest } from "@test/support/test-utils";
import { afterAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { writeBtsConfig } from "@/config/bts-config";
import { validateConfigForProgrammaticUse } from "@/config/config-validation";
import { buildCompatibilityInputFromConfig } from "@/config/stack-compatibility";
import { planStackUpdate } from "@/helpers/core/stack-update";
import { createVirtual } from "@/index";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";
import { checkCompatibilityOperation } from "@/operations/catalog";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { runWithContextAsync } from "@/presentation/context";
import { getBackendFrameworkChoice, resolveBackendPrompt } from "@/prompts/architecture/backend";
import {
  getFrontendSelectionIssue,
  NATIVE_FRONTEND_PROMPT_OPTIONS,
  resolveFrontendPrompt,
  WEB_FRONTEND_PROMPT_OPTIONS,
} from "@/prompts/architecture/frontend";
import { resolveDatabasePrompt } from "@/prompts/data/database";
import { resolveORMPrompt } from "@/prompts/data/orm";
import { getComposerAppFrontends } from "@/prompts/ecosystems/multi-ecosystem-composer";
import { resolveAuthPrompt } from "@/prompts/services/auth";
import { processAndValidateFlags } from "@/validation";

const CLI_ENTRY = resolve(import.meta.dir, "../../src/cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE =
  process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const TEMP_ROOTS: string[] = [];

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((root) => rm(root, { recursive: true, force: true })));
});

async function makeTempRoot() {
  const root = await mkdtemp(join(tmpdir(), "bfs-auth-paths-"));
  TEMP_ROOTS.push(root);
  return root;
}

type Stack = Pick<ProjectConfig, "auth" | "backend" | "frontend" | "runtime" | "database" | "orm">;

const SQLITE = { database: "sqlite", orm: "drizzle" } as const;
const FULLSTACK = { backend: "self", runtime: "none", ...SQLITE } as const;
const CONVEX = { backend: "convex", runtime: "none", database: "none", orm: "none" } as const;
const SETTINGS = { api: "none", uiLibrary: "none", forms: "none" } as const;

// One rejected pair per rule group, with the shared reason every path must report.
const REJECTED: { stack: Stack; reason: string }[] = [
  {
    stack: {
      auth: "clerk",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      ...SQLITE,
    },
    reason: "Clerk needs Convex, fullstack Next.js, or fullstack TanStack Start",
  },
  {
    stack: { auth: "clerk", frontend: ["nuxt"], ...FULLSTACK },
    reason: "Clerk isn't available for fullstack Nuxt yet",
  },
  {
    stack: {
      auth: "nextauth",
      frontend: ["tanstack-router"],
      backend: "express",
      runtime: "node",
      ...SQLITE,
    },
    reason: "Auth.js (NextAuth) needs fullstack Next.js",
  },
  {
    stack: { auth: "workos", frontend: ["react-vite"], ...CONVEX },
    reason: "WorkOS AuthKit needs fullstack Next.js",
  },
  {
    stack: { auth: "auth0", frontend: ["tanstack-start"], ...FULLSTACK },
    reason: "Auth0 needs the Next.js frontend",
  },
  {
    stack: { auth: "supabase-auth", frontend: ["svelte"], ...FULLSTACK },
    reason: "Supabase Auth isn't available for fullstack SvelteKit yet",
  },
  {
    stack: { auth: "passport", frontend: ["next"], ...FULLSTACK },
    reason: "Passport.js is currently scaffolded for the Express backend",
  },
  {
    stack: { auth: "better-auth-organizations", frontend: ["react-vite"], ...CONVEX },
    reason: "Better Auth organizations is currently generated for non-Convex Better Auth stacks",
  },
  {
    stack: { auth: "clerk", frontend: ["tanstack-start-solid"], ...FULLSTACK },
    reason: "TanStack Start (Solid) supports Better Auth only for now",
  },
  {
    stack: {
      auth: "better-auth",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "postgres",
      orm: "typeorm",
    },
    reason: "Better Auth has no TypeORM adapter",
  },
  {
    stack: { auth: "better-auth", frontend: ["vue"], backend: "hono", runtime: "bun", ...SQLITE },
    reason:
      "Auth client integrations are not yet wired for standalone Vue or Vanilla Vite frontends",
  },
  {
    stack: { auth: "clerk", frontend: ["svelte"], ...CONVEX },
    reason:
      "Clerk with Convex requires React Router, React + Vite, TanStack Router, TanStack Start, Next.js, or React Native",
  },
  // A native companion does not mask a web frontend Convex auth has no client for.
  {
    stack: { auth: "better-auth", frontend: ["svelte", "native-bare"], ...CONVEX },
    reason:
      "Better-Auth with Convex requires React + Vite, TanStack Router, TanStack Start, Next.js, or React Native",
  },
  // Better Auth needs a generated route that invokes its handler.
  {
    stack: {
      auth: "better-auth",
      frontend: ["tanstack-router"],
      backend: "encore",
      runtime: "none",
      database: "none",
      orm: "none",
    },
    reason: "Better Auth isn't available for the Encore backend yet",
  },
  {
    stack: { auth: "better-auth", frontend: ["nuxt"], ...FULLSTACK },
    reason: "Better Auth isn't available for fullstack Nuxt yet",
  },
  {
    stack: { auth: "better-auth-organizations", frontend: ["astro"], ...FULLSTACK },
    reason: "Better Auth isn't available for fullstack Astro yet",
  },
  // Next.js-only providers generate no native auth client or screens.
  {
    stack: { auth: "kinde", frontend: ["next", "native-bare"], ...FULLSTACK },
    reason: "Kinde needs a web-only Next.js project (no mobile app)",
  },
];

const ACCEPTED: Stack[] = [
  {
    auth: "better-auth",
    frontend: ["tanstack-router"],
    backend: "hono",
    runtime: "bun",
    ...SQLITE,
  },
  { auth: "clerk", frontend: ["next"], ...FULLSTACK },
  {
    auth: "passport",
    frontend: ["tanstack-router"],
    backend: "express",
    runtime: "node",
    ...SQLITE,
  },
  { auth: "clerk", frontend: ["react-router"], ...CONVEX },
];

function fullConfig(stack: Partial<Stack>): ProjectConfig {
  return {
    ...createCliDefaultProjectConfigBase("bun"),
    projectName: "auth-app",
    projectDir: "/virtual",
    relativePath: "./virtual",
    addons: [],
    git: false,
    install: false,
    ...SETTINGS,
    ...stack,
  } as ProjectConfig;
}

function graphOf(stack: Partial<Stack>) {
  return legacyProjectConfigToStackParts(fullConfig(stack), "selected");
}

function partsOf(stack: Partial<Stack>) {
  const parts = graphOf(stack);
  return parts.map((part) => formatStackPartSpec(part, parts));
}

function label(stack: Stack) {
  return `${stack.auth} on ${stack.backend}/${stack.frontend.join("+")}/${stack.orm}`;
}

async function runCreate(stack: Stack) {
  const args = generateReproducibleCommand(fullConfig(stack))
    .split(" ")
    .slice(4)
    .map((arg) => (arg === "--git" ? "--no-git" : arg === "--install" ? "--no-install" : arg));
  return runCli(["create", "auth-app", ...args, "--dry-run"], await makeTempRoot());
}

async function runCli(args: string[], cwd: string) {
  const child = Bun.spawn([BUN_EXECUTABLE, CLI_ENTRY, ...args, "--disable-analytics"], {
    cwd,
    env: { ...Bun.env, BFS_SKIP_BUILDER_PROMPT: "1", CI: "true" },
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, output: `${stdout}${stderr}` };
}

async function scaffoldDefaultProject() {
  const projectDir = join(await makeTempRoot(), "app");
  const config = { ...fullConfig({}), projectName: "app", projectDir, relativePath: "." };
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!result.success || !result.tree) throw new Error(result.error ?? "Failed to generate");
  await writeTreeToFilesystem(result.tree, projectDir);
  await writeBtsConfig(config);
  await recordScaffoldManifest(projectDir);
  return projectDir;
}

async function expectAcceptedEverywhere(stack: Stack) {
  const flat = await createVirtual({ ...SETTINGS, ...stack });
  expect({ pair: label(stack), error: flat.error }).toEqual({
    pair: label(stack),
    error: undefined,
  });
  const graph = await createVirtual({ stackParts: graphOf(stack) });
  expect({ pair: label(stack), error: graph.error }).toEqual({
    pair: label(stack),
    error: undefined,
  });
  expect(buildProjectConfig({ ...SETTINGS, ...stack }).auth).toBe(stack.auth);
  await runWithContextAsync({ silent: true }, async () => {
    const flags = cliFlags(stack);
    expect(processAndValidateFlags(flags, new Set(Object.keys(flags)), "auth-app").auth).toBe(
      stack.auth,
    );
  });
}

function cliFlags(stack: Partial<Stack>) {
  return { ecosystem: "typescript", ...SETTINGS, ...stack } as Parameters<
    typeof processAndValidateFlags
  >[0];
}

describe("unsupported auth is rejected on every path with the shared reason", () => {
  for (const { stack, reason } of REJECTED) {
    test(label(stack), async () => {
      const shared = getAuthIncompatibility(
        stack.auth,
        buildCompatibilityInputFromConfig(fullConfig(stack)),
      );
      expect(shared).toBe(reason);

      // CLI flags (prompt-free and partial-flag validation).
      await runWithContextAsync({ silent: true }, async () => {
        const flags = cliFlags(stack);
        expect(() =>
          processAndValidateFlags(flags, new Set(Object.keys(flags)), "auth-app"),
        ).toThrow(reason);
      });

      // createVirtual: flat input, graph-only input, and the core validator.
      expect(await createVirtual({ ...SETTINGS, ...stack })).toEqual({
        success: false,
        error: reason,
      });
      expect(await createVirtual({ stackParts: graphOf(stack) })).toEqual({
        success: false,
        error: reason,
      });
      expect(() => validateConfigForProgrammaticUse(fullConfig(stack))).toThrow(reason);

      // MCP plan/create input (flat and parts) and the compatibility check.
      expect(() => buildProjectConfig({ ...SETTINGS, ...stack })).toThrow(reason);
      expect(() =>
        buildProjectConfig({
          part: partsOf(stack),
        }),
      ).toThrow(reason);
      const { output } = await checkCompatibilityOperation.invoke({
        ecosystem: "typescript",
        ...SETTINGS,
        ...stack,
      });
      expect(output.issues).toContainEqual(expect.objectContaining({ message: reason }));
    });
  }

  test("the public create API and prompt-free CLI reject instead of falling back", async () => {
    const [{ stack, reason }] = REJECTED;
    const result = await runTRPCTest(
      createCustomConfig({ projectName: "auth-clerk-hono", ...SETTINGS, ...stack }),
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain(reason);

    for (const rejected of [REJECTED[0]!, REJECTED[6]!, REJECTED[9]!]) {
      const { exitCode, output } = await runCreate(rejected.stack);
      expect(exitCode).not.toBe(0);
      expect(output).toContain(rejected.reason);
      expect(output).not.toContain("Falling back");
    }
  });

  test("update planning rejects requested auth instead of dropping it", async () => {
    const projectDir = await scaffoldDefaultProject();

    const requested = [
      { request: { auth: "clerk" }, reason: REJECTED[0]!.reason },
      { request: { auth: "passport" }, reason: REJECTED[6]!.reason },
      {
        request: { orm: "typeorm", database: "postgres", auth: "better-auth" },
        reason: "Better Auth has no TypeORM adapter",
      },
    ] as const;
    for (const { request, reason } of requested) {
      const plan = await planStackUpdate(projectDir, request);
      expect(plan).toMatchObject({ success: false, error: `Invalid stack update: ${reason}` });
    }

    // Changing a dependent choice still resets auth with the reason, as the builder does.
    const dependent = await planStackUpdate(projectDir, { orm: "typeorm", database: "postgres" });
    expect(dependent.success).toBe(true);
    if (!dependent.success) return;
    expect(dependent.proposedConfig.auth).toBe("none");
    expect(dependent.compatibilityAdjustments).toContain(
      "auth: Auth set to 'None' (Better Auth has no TypeORM adapter)",
    );
  });

  test("accepted pairs still generate on every path", async () => {
    for (const stack of ACCEPTED) await expectAcceptedEverywhere(stack);
  });

  test("Better Auth Organizations generates on fullstack TanStack Start (Solid)", async () => {
    await expectAcceptedEverywhere({
      auth: "better-auth-organizations",
      frontend: ["tanstack-start-solid"],
      ...FULLSTACK,
    });
  });

  test("Passport, scaffolded on the server only, generates with a Vue frontend", async () => {
    await expectAcceptedEverywhere({
      auth: "passport",
      frontend: ["vue"],
      backend: "express",
      runtime: "node",
      ...SQLITE,
    });
  });

  test("auth replayed from a saved config is rejected instead of reset", async () => {
    const [{ stack, reason }] = REJECTED;
    const root = await makeTempRoot();
    await writeBtsConfig({ ...fullConfig(stack), projectDir: root });
    const { exitCode, output } = await runCli(
      ["create", "replayed", "--config", join(root, "bts.jsonc"), "--dry-run", "--no-install"],
      root,
    );
    expect(exitCode).not.toBe(0);
    expect(output).toContain(reason);
    expect(output).not.toContain("Auth set to 'None'");
  });

  test("a stale flat auth next to a valid graph is accepted and the graph decides", async () => {
    const graph = graphOf(ACCEPTED[0]!);
    const result = await createVirtual({ auth: "clerk", stackParts: graph });
    expect(result.error).toBeUndefined();
    expect(result.success).toBe(true);

    expect(() =>
      validateConfigForProgrammaticUse({ ...fullConfig({ auth: "clerk" }), stackParts: graph }),
    ).not.toThrow();
    expect(
      buildProjectConfig({
        auth: "clerk",
        part: partsOf(ACCEPTED[0]!),
      }).stackParts?.find((part) => part.role === "auth")?.toolId,
    ).toBe("better-auth");
  });
});

describe("prompts and partial flags", () => {
  test("partial flags defer the auth rule until the stack is chosen", async () => {
    await runWithContextAsync({ silent: true }, async () => {
      const validate = (flags: Partial<Stack>) =>
        processAndValidateFlags(flags as never, new Set(Object.keys(flags)), "auth-app");

      expect(validate({ auth: "clerk" }).auth).toBe("clerk");
      expect(validate({ auth: "nextauth", frontend: ["next"] }).auth).toBe("nextauth");
      expect(validate({ auth: "go-better-auth" }).auth).toBe("go-better-auth");
      expect(() => validate({ auth: "clerk", backend: "hono" })).toThrow(REJECTED[0]!.reason);
      expect(() => validate({ auth: "nextauth", frontend: ["nuxt"] })).toThrow(
        "Auth.js (NextAuth) needs fullstack Next.js",
      );
    });
  });

  test("earlier prompts offer only choices that keep the requested auth supported", () => {
    const frontends = resolveFrontendPrompt({ auth: "clerk" }).options.map(
      (option) => option.value,
    );
    expect(frontends).toEqual(expect.arrayContaining(["next", "tanstack-start", "react-router"]));
    expect(frontends).not.toContain("nuxt");
    expect(frontends).not.toContain("vue");

    const values = (resolution: { options: { value: string }[] }) =>
      resolution.options.map((option) => option.value);
    expect(values(resolveBackendPrompt({ frontends: ["next"], auth: "clerk" }))).toEqual([
      "self",
      "convex",
    ]);
    expect(
      values(resolveBackendPrompt({ frontends: ["tanstack-router"], auth: "passport" })),
    ).toEqual(["express"]);
    expect(
      values(resolveDatabasePrompt({ backend: "hono", runtime: "bun", auth: "better-auth" })),
    ).not.toContain("redis");
    expect(
      values(
        resolveORMPrompt({
          hasDatabase: true,
          database: "postgres",
          backend: "hono",
          auth: "better-auth",
        }),
      ),
    ).toEqual(["drizzle", "prisma", "kysely"]);
  });

  test("the auth prompt lists only the providers the chosen stack allows", () => {
    const values = (context: Parameters<typeof resolveAuthPrompt>[0]) =>
      resolveAuthPrompt(context).options.map((option) => option.value);

    expect(values({ backend: "hono", frontend: ["tanstack-router"] })).toEqual([
      "better-auth",
      "better-auth-organizations",
      "none",
    ]);
    expect(values({ backend: "express", frontend: ["tanstack-router"] })).toContain("passport");
    expect(
      values({
        backend: "hono",
        frontend: ["tanstack-router"],
        database: "postgres",
        orm: "typeorm",
      }),
    ).toEqual(["none"]);
    expect(values({ backend: "self", frontend: ["next"] })).toEqual(
      expect.arrayContaining(["clerk", "nextauth", "stack-auth", "supabase-auth", "auth0"]),
    );
  });
});

describe("prompt sequences never strand a requested auth", () => {
  const values = (resolution: { options: { value: string }[] }) =>
    resolution.options.map((option) => option.value);

  test("--auth nextauth then a native-only app is refused before the backend prompt", async () => {
    const reason = "Auth.js (NextAuth) needs fullstack Next.js";
    // TypeScript, then the frontend prompt: native apps stay on offer as companions.
    expect(values(resolveFrontendPrompt({ auth: "nextauth" }))).toContain("native-bare");
    // A native-only answer would leave the backend prompt with nothing to offer...
    expect(values(resolveBackendPrompt({ frontends: ["native-bare"], auth: "nextauth" }))).toEqual(
      [],
    );
    // ...so the frontend prompt refuses it with the reason and asks again.
    expect(getFrontendSelectionIssue(["native-bare"], { auth: "nextauth" })).toBe(reason);
    expect(getFrontendSelectionIssue(["next"], { auth: "nextauth" })).toBeNull();
    // The backend prompt never renders an empty selector.
    await runWithContextAsync({ silent: true }, async () => {
      await expect(
        getBackendFrameworkChoice(undefined, ["native-bare"], undefined, "nextauth"),
      ).rejects.toThrow(reason);
    });
  });

  test("every frontend answer the prompt accepts leaves a backend for the requested auth", () => {
    const web = WEB_FRONTEND_PROMPT_OPTIONS.map((option) => option.value);
    const native = NATIVE_FRONTEND_PROMPT_OPTIONS.map((option) => option.value);
    const answers = [
      [],
      ...web.map((frontend) => [frontend]),
      ...native.map((frontend) => [frontend]),
      ...web.flatMap((frontend) => native.map((app) => [frontend, app])),
    ];
    for (const auth of AUTH_VALUES) {
      const offered = new Set(values(resolveFrontendPrompt({ auth })));
      for (const answer of answers) {
        if (!answer.every((frontend) => offered.has(frontend))) continue;
        if (getFrontendSelectionIssue(answer, { auth })) continue;
        const backends = values(resolveBackendPrompt({ frontends: answer, auth }));
        expect({ auth, answer, hasBackend: backends.length > 0 }).toEqual({
          auth,
          answer,
          hasBackend: true,
        });
      }
    }
  });

  test("the composer judges backend and auth choices by its web and mobile apps", () => {
    // --auth clerk, no web frontend, and a React Native app: Convex wires Clerk for Expo.
    const mobileOnly = getComposerAppFrontends("none", "native-bare");
    expect(mobileOnly).toEqual(["native-bare"]);
    expect(values(resolveBackendPrompt({ frontends: mobileOnly, auth: "clerk" }))).toEqual([
      "convex",
    ]);
    expect(values(resolveAuthPrompt({ backend: "convex", frontend: mobileOnly }))).toContain(
      "clerk",
    );

    // --auth clerk with Next.js and a React Native app: fullstack Clerk is web-only, so self is
    // not offered and then rejected after the remaining prompts.
    const webAndMobile = getComposerAppFrontends("next", "native-bare");
    expect(values(resolveBackendPrompt({ frontends: webAndMobile, auth: "clerk" }))).toEqual([
      "convex",
    ]);
    expect(values(resolveAuthPrompt({ backend: "self", frontend: webAndMobile }))).not.toContain(
      "clerk",
    );
  });
});

describe("auth parity between createVirtual and the CLI", () => {
  const STANDALONE = [
    { backend: "hono", runtime: "bun", ...SQLITE },
    { backend: "express", runtime: "node", ...SQLITE },
    { backend: "fastify", runtime: "node", ...SQLITE },
    { backend: "elysia", runtime: "bun", ...SQLITE },
    { backend: "fets", runtime: "node", ...SQLITE },
    { backend: "nestjs", runtime: "node", ...SQLITE },
    { backend: "adonisjs", runtime: "node", ...SQLITE },
    { backend: "nitro", runtime: "node", ...SQLITE },
    { backend: "encore", runtime: "none", database: "none", orm: "none" },
  ] as const;
  const FULLSTACK_FRONTENDS = [
    "next",
    "tanstack-start",
    "nuxt",
    "svelte",
    "solid-start",
    "astro",
    "tanstack-start-solid",
  ] as const;
  const CONVEX_FRONTENDS = [
    "react-vite",
    "react-router",
    "tanstack-router",
    "next",
    "svelte",
  ] as const;
  const BETTER_AUTH_DATA = [
    { database: "postgres", orm: "prisma" },
    { database: "postgres", orm: "typeorm" },
    { database: "postgres", orm: "sequelize" },
    { database: "postgres", orm: "mikroorm" },
    { database: "redis", orm: "none" },
  ] as const;

  // Native companions, and the app lists the multi-ecosystem composer passes.
  const NATIVE_COMPANIONS = [
    { ...FULLSTACK, frontend: ["next", "native-bare"] },
    { ...FULLSTACK, frontend: ["tanstack-start", "native-uniwind"] },
    { ...FULLSTACK, frontend: ["svelte", "native-bare"] },
    { ...FULLSTACK, frontend: ["vinext"] },
    {
      backend: "hono",
      runtime: "bun",
      frontend: ["tanstack-router", "native-unistyles"],
      ...SQLITE,
    },
    {
      backend: "hono",
      runtime: "bun",
      frontend: getComposerAppFrontends("none", "native-bare"),
      ...SQLITE,
    },
    { ...CONVEX, frontend: getComposerAppFrontends("none", "native-bare") },
    { ...CONVEX, frontend: getComposerAppFrontends("react-vite", "native-uniwind") },
    { ...CONVEX, frontend: getComposerAppFrontends("svelte", "native-bare") },
    { ...CONVEX, frontend: getComposerAppFrontends("next", "native-bare") },
    { backend: "encore", runtime: "none", frontend: ["next"], database: "none", orm: "none" },
  ];

  const arrangements: Omit<Stack, "auth">[] = [
    ...NATIVE_COMPANIONS,
    ...STANDALONE.map((backend) => ({ ...backend, frontend: ["tanstack-router"] })),
    { backend: "hono", runtime: "bun", frontend: ["vue"], ...SQLITE },
    { backend: "hono", runtime: "bun", frontend: ["vanilla-vite"], ...SQLITE },
    ...FULLSTACK_FRONTENDS.map((frontend) => ({ ...FULLSTACK, frontend: [frontend] })),
    ...CONVEX_FRONTENDS.map((frontend) => ({ ...CONVEX, frontend: [frontend] })),
    ...BETTER_AUTH_DATA.map((data) => ({
      backend: "hono",
      runtime: "bun",
      frontend: ["tanstack-router"],
      ...data,
    })),
  ] as Omit<Stack, "auth">[];

  test("every pair createVirtual accepts is one the CLI accepts, with identical reasons", async () => {
    let accepted = 0;
    for (const arrangement of arrangements) {
      for (const auth of AUTH_VALUES.filter((value) => value !== "none")) {
        const stack = { ...arrangement, auth } as Stack;
        const result = await createVirtual({ ...SETTINGS, ...stack });

        let cliError: string | undefined;
        await runWithContextAsync({ silent: true }, async () => {
          const flags = cliFlags(stack);
          try {
            processAndValidateFlags(flags, new Set(Object.keys(flags)), "auth-app");
          } catch (error) {
            cliError = error instanceof Error ? error.message : String(error);
          }
        });
        const reason = getAuthIncompatibility(
          auth,
          buildCompatibilityInputFromConfig(fullConfig(stack)),
        );
        const builderAuth = analyzeStackCompatibility(
          buildCompatibilityInputFromConfig(fullConfig(stack)),
        ).adjustedStack?.auth;

        if (result.success) {
          accepted += 1;
          expect({ pair: label(stack), cliError, reason }).toEqual({
            pair: label(stack),
            cliError: undefined,
            reason: null,
          });
          expect(builderAuth ?? auth).toBe(auth);
        } else {
          expect({ pair: label(stack), error: result.error }).toEqual({
            pair: label(stack),
            error: reason,
          });
          expect({ pair: label(stack), cliError }).toEqual({
            pair: label(stack),
            cliError: reason,
          });
        }
      }
    }
    expect(accepted).toBeGreaterThan(20);
  }, 300_000);
});
