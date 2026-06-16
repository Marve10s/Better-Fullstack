import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import { runWithContext } from "../src/utils/context";
import { validateConfigForProgrammaticUse } from "../src/utils/config-validation";
import { getVirtualTreeFileContent } from "./virtual-tree-utils";

const readTextFromTree = getVirtualTreeFileContent;

type PackageJsonShape = {
  packageManager?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

function readJsonFromTree(
  tree: NonNullable<Awaited<ReturnType<typeof createVirtual>>["tree"]>,
  targetPath: string,
): PackageJsonShape | undefined {
  const content = getVirtualTreeFileContent(tree, targetPath);
  return content === undefined ? undefined : (JSON.parse(content) as PackageJsonShape);
}

describe("Virtual Generator Regressions", () => {
  const packageManagers = ["npm", "pnpm", "bun", "yarn"] as const;

  for (const packageManager of packageManagers) {
    it(`writes a concrete ${packageManager} packageManager version`, async () => {
      const result = await createVirtual({
        projectName: `pm-${packageManager}`,
        packageManager,
        frontend: ["tanstack-router"],
        backend: "hono",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
      });

      expect(result.success).toBe(true);

      const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;
      expect(rootPackageJson?.packageManager).toMatch(
        new RegExp(`^${packageManager}@\\d+\\.\\d+\\.\\d+(?:-.+)?$`),
      );
    });
  }

  const aiExamples = [
    { ai: "mastra", sdkPackage: "mastra" },
    { ai: "voltagent", sdkPackage: "@voltagent/core" },
    { ai: "openai-agents", sdkPackage: "@openai/agents" },
    { ai: "google-adk", sdkPackage: "@google/adk" },
  ] as const;

  for (const { ai, sdkPackage } of aiExamples) {
    it(`adds transport deps for ${ai} self-hosted AI examples`, async () => {
      const result = await createVirtual({
        projectName: `ai-${ai}`,
        frontend: ["tanstack-start"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        examples: ["ai"],
        ai,
      });

      expect(result.success).toBe(true);

      const webPackageJson = result.tree ? readJsonFromTree(result.tree, "apps/web/package.json") : undefined;

      expect(
        webPackageJson?.dependencies?.[sdkPackage] ??
          webPackageJson?.devDependencies?.[sdkPackage],
      ).toBeDefined();
      expect(webPackageJson?.dependencies?.ai).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/google"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/devtools"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/react"]).toBeDefined();
      expect(webPackageJson?.dependencies?.streamdown).toBeDefined();
    });
  }

  it("adds AI CLI command presets at the generated workspace root", async () => {
    const result = await createVirtual({
      projectName: "ai-cli-root",
      frontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      ai: "ai-cli",
    });

    expect(result.success).toBe(true);

    const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;

    expect(rootPackageJson?.devDependencies?.["ai-cli"]).toBeDefined();
    expect(rootPackageJson?.scripts?.["ai:text"]).toBe("ai text");
    expect(rootPackageJson?.scripts?.["ai:image"]).toBe("ai image");
    expect(rootPackageJson?.scripts?.["ai:video"]).toBe("ai video");
    expect(rootPackageJson?.scripts?.["ai:models"]).toBe("ai models");
    expect(rootPackageJson?.scripts?.["ai:completions"]).toBe("ai completions");
  });

  it("wires the Next provider to the GraphQL Yoga query client", async () => {
    const result = await createVirtual({
      projectName: "next-graphql-yoga",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      api: "graphql-yoga",
      database: "sqlite",
      orm: "sequelize",
      auth: "none",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const providers = readTextFromTree(result.tree!, "apps/web/src/components/providers.tsx");
    const graphqlClient = readTextFromTree(result.tree!, "apps/web/src/utils/graphql.ts");

    expect(providers).toContain('import { queryClient } from "@/utils/graphql"');
    expect(providers).toContain("<QueryClientProvider client={queryClient}>");
    expect(graphqlClient).toContain("export const queryClient");
  });

  it("projects backend-owned Better Auth organizations into generated auth files", async () => {
    const result = await createVirtual({
      projectName: "better-auth-orgs",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      api: "trpc",
      database: "postgres",
      orm: "drizzle",
      auth: "better-auth-organizations",
      payments: "none",
      addons: [],
      examples: [],
    });

    expect(result.success).toBe(true);

    const authServer = readTextFromTree(result.tree!, "packages/auth/src/index.ts");
    const authClient = readTextFromTree(result.tree!, "apps/web/src/lib/auth-client.ts");
    const authSchema = readTextFromTree(result.tree!, "packages/db/src/schema/auth.ts");

    expect(authServer).toContain('from "better-auth/plugins"');
    expect(authServer).toContain("organization()");
    expect(authServer).not.toContain("polar(");
    expect(authClient).toContain("organizationClient()");
    expect(authClient).not.toContain("polarClient");
    expect(authSchema).toContain("activeOrganizationId");
    expect(authSchema).toContain('pgTable("organization"');
    expect(authSchema).toContain("export const member = pgTable(");
    expect(authSchema).toContain("export const invitation = pgTable(");
  });

  const enterpriseObservabilityProviders = [
    {
      observability: "datadog",
      filePath: "apps/server/src/lib/datadog.ts",
      dependency: "dd-trace",
      fileSnippet: 'from "dd-trace"',
      envVars: ["DD_SERVICE", "DD_ENV", "DD_VERSION", "DD_TRACE_AGENT_URL"],
    },
    {
      observability: "axiom",
      filePath: "apps/server/src/lib/axiom.ts",
      dependency: "@axiomhq/js",
      fileSnippet: 'from "@axiomhq/js"',
      envVars: ["AXIOM_TOKEN", "AXIOM_DATASET"],
    },
    {
      observability: "betterstack",
      filePath: "apps/server/src/lib/betterstack.ts",
      dependency: "@logtail/node",
      fileSnippet: 'from "@logtail/node"',
      envVars: ["BETTERSTACK_SOURCE_TOKEN", "BETTERSTACK_INGESTING_HOST"],
    },
  ] as const;

  for (const provider of enterpriseObservabilityProviders) {
    it(`generates ${provider.observability} observability files, deps, and env vars`, async () => {
      const result = await createVirtual({
        projectName: `obs-${provider.observability}`,
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        observability: provider.observability,
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expect(result.success).toBe(true);

      const serverPackageJson = readJsonFromTree(result.tree!, "apps/server/package.json");
      const integrationFile = readTextFromTree(result.tree!, provider.filePath);
      const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
      const serverDotEnv = readTextFromTree(result.tree!, "apps/server/.env");

      expect(serverPackageJson?.dependencies?.[provider.dependency]).toBeDefined();
      expect(integrationFile).toContain(provider.fileSnippet);
      if (provider.observability === "axiom") {
        expect(integrationFile).toContain('from "@obs-axiom/env/server"');
        expect(integrationFile).not.toContain("process.env.AXIOM_TOKEN");
      }
      for (const envVar of provider.envVars) {
        expect(serverEnv).toContain(envVar);
        expect(serverDotEnv).toContain(`${envVar}=`);
      }
    });
  }

  const rateLimitProviders = [
    {
      rateLimit: "arcjet",
      dependencies: ["@arcjet/node"],
      fileSnippet: 'from "@arcjet/node"',
      envVars: ["ARCJET_KEY"],
    },
    {
      rateLimit: "upstash-ratelimit",
      dependencies: ["@upstash/ratelimit", "@upstash/redis"],
      fileSnippet: 'from "@upstash/ratelimit"',
      envVars: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
    },
  ] as const;

  for (const provider of rateLimitProviders) {
    it(`generates ${provider.rateLimit} rate-limit files, deps, and env vars`, async () => {
      const result = await createVirtual({
        projectName: `rate-${provider.rateLimit}`,
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        rateLimit: provider.rateLimit,
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expect(result.success).toBe(true);

      const serverPackageJson = readJsonFromTree(result.tree!, "apps/server/package.json");
      const rateLimitFile = readTextFromTree(result.tree!, "apps/server/src/lib/rate-limit.ts");
      const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
      const serverDotEnv = readTextFromTree(result.tree!, "apps/server/.env");

      for (const dependency of provider.dependencies) {
        expect(serverPackageJson?.dependencies?.[dependency]).toBeDefined();
      }
      expect(rateLimitFile).toContain(provider.fileSnippet);
      for (const envVar of provider.envVars) {
        expect(serverEnv).toContain(envVar);
        expect(serverDotEnv).toContain(`${envVar}=`);
      }
    });
  }

  it("uses the Arcjet Next package for self-hosted Next.js rate limiting", async () => {
    const result = await createVirtual({
      projectName: "rate-arcjet-next",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      rateLimit: "arcjet",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
    const rateLimitFile = readTextFromTree(result.tree!, "apps/web/src/lib/rate-limit.ts");
    const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");

    expect(webPackageJson?.dependencies?.["@arcjet/next"]).toBeDefined();
    expect(webPackageJson?.dependencies?.["@arcjet/node"]).toBeUndefined();
    expect(rateLimitFile).toContain('from "@arcjet/next"');
    expect(webDotEnv).toContain("ARCJET_KEY=");
  });

  const hostedNextAuthProviders = [
    {
      auth: "workos",
      dependency: "@workos-inc/authkit-nextjs",
      routePath: "apps/web/src/app/login/route.ts",
      routeSnippet: "getSignInUrl",
      clientSnippet: "AuthKitProvider",
      webEnvSnippet: "NEXT_PUBLIC_WORKOS_REDIRECT_URI",
      envVars: [
        "WORKOS_API_KEY",
        "WORKOS_CLIENT_ID",
        "WORKOS_COOKIE_PASSWORD",
        "NEXT_PUBLIC_WORKOS_REDIRECT_URI",
      ],
    },
    {
      auth: "kinde",
      dependency: "@kinde-oss/kinde-auth-nextjs",
      routePath: "apps/web/src/app/api/auth/[kindeAuth]/route.ts",
      routeSnippet: "handleAuth()",
      clientSnippet: "KindeProvider",
      webEnvSnippet: undefined,
      envVars: [
        "KINDE_CLIENT_ID",
        "KINDE_CLIENT_SECRET",
        "KINDE_ISSUER_URL",
        "KINDE_SITE_URL",
        "KINDE_POST_LOGIN_REDIRECT_URL",
        "KINDE_POST_LOGOUT_REDIRECT_URL",
      ],
    },
  ] as const;

  for (const provider of hostedNextAuthProviders) {
    it(`generates ${provider.auth} fullstack Next auth files, deps, and env vars`, async () => {
      const result = await createVirtual({
        projectName: `auth-${provider.auth}`,
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: provider.auth,
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expect(result.success).toBe(true);

      const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
      const route = readTextFromTree(result.tree!, provider.routePath);
      const authClient = readTextFromTree(result.tree!, "apps/web/src/lib/auth-client.tsx");
      const providers = readTextFromTree(result.tree!, "apps/web/src/components/providers.tsx");
      const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
      const webEnv = readTextFromTree(result.tree!, "packages/env/src/web.ts");
      const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");

      expect(webPackageJson?.dependencies?.[provider.dependency]).toBeDefined();
      expect(route).toContain(provider.routeSnippet);
      expect(authClient).toContain(provider.clientSnippet);
      expect(providers).toContain("<AuthProvider>");
      if (provider.webEnvSnippet) {
        expect(webEnv).toContain(provider.webEnvSnippet);
      }
      for (const envVar of provider.envVars) {
        expect(serverEnv).toContain(envVar);
        expect(webDotEnv).toContain(`${envVar}=`);
      }
    });
  }

  it("generates Auth0 v4 fullstack Next auth files, deps, and env vars", async () => {
    const result = await createVirtual({
      projectName: "auth-auth0",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "auth0",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
    const auth0Client = readTextFromTree(result.tree!, "apps/web/src/lib/auth0.ts");
    const legacyRoute = readTextFromTree(result.tree!, "apps/web/src/app/api/auth/[auth0]/route.ts");
    const middleware = readTextFromTree(result.tree!, "apps/web/src/middleware.ts");
    const authClient = readTextFromTree(result.tree!, "apps/web/src/lib/auth-client.tsx");
    const providers = readTextFromTree(result.tree!, "apps/web/src/components/providers.tsx");
    const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
    const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");

    expect(webPackageJson?.dependencies?.["@auth0/nextjs-auth0"]).toBeDefined();
    expect(auth0Client).toContain('from "@auth0/nextjs-auth0/server"');
    expect(middleware).toContain("auth0.middleware(request)");
    expect(middleware).toContain('new URL("/auth/login"');
    expect(legacyRoute).toBeUndefined();
    expect(authClient).toContain('from "@auth0/nextjs-auth0"');
    expect(authClient).toContain('window.location.href = "/auth/login"');
    expect(authClient).toContain('window.location.href = "/auth/logout"');
    expect(providers).toContain("<AuthProvider>");

    for (const envVar of [
      "AUTH0_DOMAIN",
      "AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET",
      "AUTH0_SECRET",
      "APP_BASE_URL",
    ]) {
      expect(serverEnv).toContain(envVar);
      expect(webDotEnv).toContain(`${envVar}=`);
    }
  });

  it("scaffolds a default .NET Minimal API project", async () => {
    const result = await createVirtual({
      projectName: "DotnetApi",
      ecosystem: "dotnet",
      database: "postgres",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "ef-core",
      dotnetAuth: "aspnet-identity",
      dotnetApi: "minimal-api",
      dotnetTesting: ["xunit"],
      dotnetJobQueue: "none",
      dotnetRealtime: "signalr",
      dotnetObservability: ["serilog"],
      dotnetCaching: "none",
      dotnetDeploy: "docker",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetApi.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");
    const dockerfile = readTextFromTree(result.tree!, "Dockerfile");
    const testProject = readTextFromTree(result.tree!, "DotnetApi.Tests/DotnetApi.Tests.csproj");

    expect(projectFile).toContain("<TargetFramework>net10.0</TargetFramework>");
    expect(projectFile).toContain('<Compile Remove="**/*.Tests/**/*.cs" />');
    expect(projectFile).toContain('PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL"');
    expect(projectFile).toContain('PackageReference Include="Serilog.AspNetCore"');
    expect(program).toContain("builder.Services.AddDbContext<AppDbContext>");
    expect(program).toContain('app.MapHub<UpdatesHub>("/hubs/updates")');
    expect(dockerfile).toContain("FROM mcr.microsoft.com/dotnet/sdk:10.0");
    expect(testProject).toContain('PackageReference Include="xunit"');
  });

  it("pins Angular to the TypeScript range required by Angular 22", async () => {
    const result = await createVirtual({
      projectName: "AngularTs",
      frontend: ["angular"],
      backend: "fets",
      runtime: "node",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      cssFramework: "postcss-only",
      uiLibrary: "none",
      addons: ["turborepo"],
      examples: [],
    });

    expect(result.success).toBe(true);

    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");

    expect(webPackageJson?.devDependencies?.typescript).toBe(">=6.0.0 <6.1.0");
  });

  it("keeps .NET Minimal API templates valid when EF Core is disabled", async () => {
    const result = await createVirtual({
      projectName: "DotnetNoEf",
      ecosystem: "dotnet",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "none",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetNoEf.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(projectFile).not.toContain("EntityFrameworkCore");
    expect(program).not.toContain("AppDbContext");
    expect(program).not.toContain("EntityFrameworkCore");
    expect(program).toContain('app.MapGet("/api/todos", () =>');
    expect(readTextFromTree(result.tree!, "Dockerfile")).toBeUndefined();
    expect(readTextFromTree(result.tree!, "DotnetNoEf.Tests/DotnetNoEf.Tests.csproj")).toBeUndefined();
  });

  it("omits the Quantum scheduler unless Quantum jobs are selected", async () => {
    const result = await createVirtual({
      projectName: "elixir-no-quantum",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirJobs: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "lib/elixir_no_quantum/scheduler.ex")).toBeUndefined();
  });

  it("scaffolds plain Elixir projects without Phoenix web files", async () => {
    const result = await createVirtual({
      projectName: "plain-elixir",
      ecosystem: "elixir",
      elixirWebFramework: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirJson: "jason",
      elixirTesting: "none",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const application = readTextFromTree(result.tree!, "lib/plain_elixir/application.ex");
    const readme = readTextFromTree(result.tree!, "README.md");

    expect(mixProject).toContain("{:quantum");
    expect(mixProject).toContain("{:req");
    expect(mixProject).not.toContain("{:phoenix");
    expect(mixProject).not.toContain("{:plug_cowboy");
    expect(application).toContain("PlainElixir.Scheduler");
    expect(application).not.toContain("PlainElixirWeb.Endpoint");
    expect(readme).toContain("for the Elixir ecosystem");
    expect(readme).toContain("iex -S mix");
    expect(readme).not.toContain("mix phx.server");
    expect(readTextFromTree(result.tree!, "lib/plain_elixir_web/router.ex")).toBeUndefined();
    expect(readTextFromTree(result.tree!, "test/support/conn_case.ex")).toBeUndefined();
    expect(readTextFromTree(result.tree!, "priv/repo/seeds.exs")).toBeUndefined();
  });

  it("keeps Elixir Dockerfiles usable before mix.lock exists", async () => {
    const result = await createVirtual({
      projectName: "elixir-docker",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirDeploy: "docker",
    });

    expect(result.success).toBe(true);
    const dockerfile = readTextFromTree(result.tree!, "Dockerfile");
    expect(dockerfile).toContain("COPY mix.exs ./");
    expect(dockerfile).not.toContain("mix.lock*");
  });

  it("rolls initial Oban migrations all the way back down", async () => {
    const result = await createVirtual({
      projectName: "elixir-oban",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirJobs: "oban",
    });

    expect(result.success).toBe(true);
    const migration = readTextFromTree(
      result.tree!,
      "priv/repo/migrations/20260101000002_add_oban_jobs.exs",
    );
    expect(migration).toContain("Oban.Migration.up(version: 12)");
    expect(migration).toContain("Oban.Migration.down(version: 1)");
  });

  it("only emits Phoenix sockets when channels or presence are selected", async () => {
    const pubsubResult = await createVirtual({
      projectName: "elixir-pubsub",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirRealtime: "pubsub",
    });
    const channelsResult = await createVirtual({
      projectName: "elixir-channels",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirRealtime: "channels",
    });

    expect(pubsubResult.success).toBe(true);
    expect(channelsResult.success).toBe(true);
    expect(
      readTextFromTree(pubsubResult.tree!, "lib/elixir_pubsub_web/channels/user_socket.ex"),
    ).toBeUndefined();
    expect(
      readTextFromTree(channelsResult.tree!, "lib/elixir_channels_web/channels/user_socket.ex"),
    ).toContain("RoomChannel");
    expect(
      readTextFromTree(channelsResult.tree!, "lib/elixir_channels_web/channels/room_channel.ex"),
    ).toBeDefined();
  });

  it("starts Phoenix Presence when presence realtime is selected", async () => {
    const result = await createVirtual({
      projectName: "elixir-presence",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirRealtime: "presence",
    });

    expect(result.success).toBe(true);
    const application = readTextFromTree(result.tree!, "lib/elixir_presence/application.ex");
    expect(application).toContain("ElixirPresenceWeb.Presence");
    expect(readTextFromTree(result.tree!, "lib/elixir_presence_web/channels/presence.ex")).toBeDefined();
  });

  it("allows CLI validation for generated plain Elixir worker projects", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          projectName: "plain-elixir",
          ecosystem: "elixir",
          elixirWebFramework: "none",
          elixirOrm: "none",
          elixirAuth: "none",
          elixirApi: "none",
          elixirRealtime: "none",
          elixirJobs: "quantum",
          elixirValidation: "none",
          elixirHttp: "req",
          elixirJson: "jason",
          elixirEmail: "none",
          elixirCaching: "cachex",
          elixirObservability: "none",
          elixirTesting: "ex_unit",
          elixirQuality: "credo",
          elixirDeploy: "mix-release",
        }),
      ),
    ).not.toThrow();
  });

  it("continues to reject Phoenix-only Elixir features without Phoenix", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          projectName: "plain-elixir-auth",
          ecosystem: "elixir",
          elixirWebFramework: "none",
          elixirAuth: "phx-gen-auth",
        }),
      ),
    ).toThrow("Elixir auth scaffolds require Phoenix.");
  });

  it("keeps Phoenix LiveView demos self-contained without Ecto", async () => {
    const result = await createVirtual({
      projectName: "elixir-live-no-ecto",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "none",
      elixirApi: "none",
      elixirRealtime: "live-view-streams",
    });

    expect(result.success).toBe(true);

    const liveView = readTextFromTree(
      result.tree!,
      "lib/elixir_live_no_ecto_web/live/item_live/index.ex",
    );
    expect(liveView).toContain("System.unique_integer");
    expect(liveView).not.toContain("Catalog.");
    expect(readTextFromTree(result.tree!, "lib/elixir_live_no_ecto/catalog.ex")).toBeUndefined();
  });

  it("scaffolds phx.gen.auth-style password hashing and session endpoints", async () => {
    const result = await createVirtual({
      projectName: "elixir-auth",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const userSchema = readTextFromTree(result.tree!, "lib/elixir_auth/accounts/user.ex");
    const accounts = readTextFromTree(result.tree!, "lib/elixir_auth/accounts.ex");
    const router = readTextFromTree(result.tree!, "lib/elixir_auth_web/router.ex");
    const sessionController = readTextFromTree(
      result.tree!,
      "lib/elixir_auth_web/controllers/user_session_controller.ex",
    );

    expect(mixProject).toContain("{:bcrypt_elixir");
    expect(userSchema).toContain("field :password, :string, virtual: true");
    expect(userSchema).toContain("Bcrypt.hash_pwd_salt(password)");
    expect(userSchema).toContain("Bcrypt.verify_pass(password, hashed_password)");
    expect(userSchema).not.toContain("cast(attrs, [:email, :hashed_password])");
    expect(readTextFromTree(result.tree!, "priv/repo/migrations/20260101000001_create_users.exs")).toBeDefined();
    expect(accounts).toContain("get_user_by_email_and_password");
    expect(router).toContain('post "/users/register", UserSessionController, :register');
    expect(router).toContain('post "/users/login", UserSessionController, :login');
    expect(sessionController).toContain("def login");
  });

  it("skips auth-only user migration when Elixir auth is disabled", async () => {
    const result = await createVirtual({
      projectName: "elixir-no-auth",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirRealtime: "none",
      elixirJobs: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "priv/repo/migrations/20260101000001_create_users.exs")).toBeUndefined();
  });

  it("normalizes Elixir app and module names that start with digits", async () => {
    const result = await createVirtual({
      projectName: "123-app",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    expect(mixProject).toContain("defmodule App123App.MixProject do");
    expect(mixProject).toContain("app: :app_123_app");
    expect(readTextFromTree(result.tree!, "lib/app_123_app/application.ex")).toContain(
      "defmodule App123App.Application do",
    );
  });
});
