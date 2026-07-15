import { describe, expect, it } from "bun:test";

import {
  analyzeStackCompatibility,
  allowedApisForFrontends,
  evaluateCompatibility,
  getAIFrontendCompatibilityIssue,
  getApiFrontendCompatibilityIssue,
  getCompatibleFormLibraries,
  getDisabledReason,
} from "../src/compatibility";
import { DEFAULT_STACK_SELECTION } from "../src/stack-translation";

describe("compatibility issue helpers", () => {
  it("returns structured API/frontend issues for React-only APIs", () => {
    const issue = getApiFrontendCompatibilityIssue("trpc", ["svelte"]);

    expect(issue).toMatchObject({
      code: "API_REQUIRES_REACT_FRONTEND",
      message: "tRPC API requires React-based frontends.",
      category: "api",
      optionId: "trpc",
      provided: { api: "trpc", frontend: "svelte" },
    });
    expect(issue?.suggestions).toContain("Use --api orpc (works with all frontends)");
  });

  it("returns structured API/frontend issues for Astro non-React integrations", () => {
    const issue = getApiFrontendCompatibilityIssue("ts-rest", ["astro"], "svelte");

    expect(issue).toMatchObject({
      code: "ASTRO_API_REQUIRES_REACT_INTEGRATION",
      message: "ts-rest API requires React integration with Astro.",
      category: "api",
      optionId: "ts-rest",
      provided: { api: "ts-rest", "astro-integration": "svelte" },
    });
  });

  it("allows frontend-agnostic API options", () => {
    expect(getApiFrontendCompatibilityIssue("orpc", ["svelte"])).toBeUndefined();
  });

  it("rejects API options without a standalone Vite web integration", () => {
    const issue = getApiFrontendCompatibilityIssue("orpc", ["vue"]);

    expect(issue).toMatchObject({
      code: "STANDALONE_VITE_API_UNSUPPORTED",
      category: "api",
      optionId: "orpc",
      provided: { api: "orpc", frontend: "vue" },
    });
  });

  it("normalizes unsupported standalone Vite integrations", () => {
    for (const frontend of ["vanilla-vite", "vue"] as const) {
      const stack = {
        ...DEFAULT_STACK_SELECTION,
        backend: "hono" as const,
        webFrontend: [frontend],
        api: "orpc" as const,
        auth: "better-auth" as const,
        forms: "tanstack-form" as const,
        cms: "sanity" as const,
        featureFlags: "growthbook" as const,
      };
      const result = analyzeStackCompatibility(stack);

      expect(result.adjustedStack?.api).toBe("graphql-yoga");
      expect(result.adjustedStack?.auth).toBe("none");
      expect(result.adjustedStack?.forms).toBe("none");
      expect(result.adjustedStack?.cms).toBe("none");
      expect(result.adjustedStack?.featureFlags).toBe("none");
      expect(getDisabledReason(stack, "api", "orpc")).not.toBeNull();
      expect(getDisabledReason(stack, "forms", "tanstack-form")).not.toBeNull();
      expect(getDisabledReason(stack, "cms", "sanity")).not.toBeNull();
      expect(getDisabledReason(stack, "cms", "contentful")).toBeNull();
      expect(getDisabledReason(stack, "featureFlags", "growthbook")).not.toBeNull();
      expect(getCompatibleFormLibraries([frontend])).toEqual(["none"]);
    }
  });

  it("treats Apollo Server as a React-only API option", () => {
    const issue = getApiFrontendCompatibilityIssue("apollo-server", ["svelte"]);

    expect(issue).toMatchObject({
      code: "API_REQUIRES_REACT_FRONTEND",
      message: "Apollo Server API requires React-based frontends.",
      category: "api",
      optionId: "apollo-server",
      provided: { api: "apollo-server", frontend: "svelte" },
    });
    expect(allowedApisForFrontends(["tanstack-router"])).toContain("apollo-server");
    expect(allowedApisForFrontends(["svelte"])).not.toContain("apollo-server");
    expect(allowedApisForFrontends(["astro"])).not.toContain("apollo-server");
    expect(allowedApisForFrontends(["astro"], "none")).not.toContain("apollo-server");
    expect(allowedApisForFrontends(["astro"], "react")).toContain("apollo-server");

    expect(getApiFrontendCompatibilityIssue("apollo-server", ["astro"], "none")).toMatchObject({
      code: "ASTRO_API_REQUIRES_REACT_INTEGRATION",
      message: "Apollo Server API requires React integration with Astro.",
      category: "api",
      optionId: "apollo-server",
      provided: { api: "apollo-server", "astro-integration": "none" },
    });
  });

  it("disables Apollo Server for unsupported backend and frontend selections", () => {
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "self",
          nativeFrontend: [],
          webFrontend: ["tanstack-router"],
        },
        "api",
        "apollo-server",
      ),
    ).toBe("Apollo Server scaffolding currently requires a standalone TypeScript backend");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "hono",
          nativeFrontend: [],
          webFrontend: ["svelte"],
        },
        "api",
        "apollo-server",
      ),
    ).toBe("svelte requires oRPC, not Apollo Server");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "hono",
          nativeFrontend: [],
          webFrontend: ["astro"],
          astroIntegration: "none",
        },
        "api",
        "apollo-server",
      ),
    ).toBe("Apollo Server requires React integration with Astro");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          api: "apollo-server",
          backend: "hono",
          nativeFrontend: [],
          webFrontend: ["astro"],
          astroIntegration: "none",
        },
        "astroIntegration",
        "none",
      ),
    ).toBe("Apollo Server requires React integration with Astro");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "hono",
          nativeFrontend: [],
          webFrontend: ["astro"],
          astroIntegration: "react",
        },
        "api",
        "apollo-server",
      ),
    ).toBeNull();

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "hono",
          nativeFrontend: [],
          webFrontend: ["tanstack-router"],
        },
        "api",
        "apollo-server",
      ),
    ).toBeNull();
  });

  it("adjusts retained Apollo Server API selections for incompatible frontends", () => {
    const svelteResult = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      backend: "hono",
      nativeFrontend: [],
      webFrontend: ["svelte"],
      api: "apollo-server",
    });
    const astroResult = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      backend: "hono",
      nativeFrontend: [],
      webFrontend: ["astro"],
      astroIntegration: "none",
      api: "apollo-server",
    });

    expect(svelteResult.adjustedStack.api).toBe("orpc");
    expect(astroResult.adjustedStack).toMatchObject({
      api: "orpc",
      astroIntegration: "none",
    });
  });

  it("removes incompatible Electron and Capacitor selections after a frontend change", () => {
    const result = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      nativeFrontend: [],
      webFrontend: ["next"],
      appPlatforms: ["electron", "capacitor"],
    });

    expect(result.adjustedStack.appPlatforms).toEqual([]);
    expect(result.changes.map((change) => change.message)).toEqual(
      expect.arrayContaining([
        "Electron removed (requires compatible frontend)",
        "Capacitor removed (requires compatible frontend)",
      ]),
    );
  });

  it("allows daisyUI and platform tooling for Vue and vanilla Vite", () => {
    for (const frontend of ["vue", "vanilla-vite"] as const) {
      expect(
        getDisabledReason(
          {
            ...DEFAULT_STACK_SELECTION,
            webFrontend: [frontend],
            nativeFrontend: [],
          },
          "uiLibrary",
          "daisyui",
        ),
      ).toBeNull();
      for (const platform of ["pwa", "tauri", "docker-compose"] as const) {
        expect(
          getDisabledReason(
            {
              ...DEFAULT_STACK_SELECTION,
              webFrontend: [frontend],
              nativeFrontend: [],
            },
            "appPlatforms",
            platform,
          ),
        ).toBeNull();
      }
    }
  });

  it("returns structured TanStack AI frontend issues", () => {
    const issue = getAIFrontendCompatibilityIssue("tanstack-ai", ["svelte"]);

    expect(issue).toMatchObject({
      code: "TANSTACK_AI_REQUIRES_REACT_OR_SOLID_FRONTEND",
      category: "ai",
      optionId: "tanstack-ai",
      provided: { ai: "tanstack-ai", frontend: ["svelte"] },
    });
    expect(issue?.message).toContain("TanStack AI requires React or Solid frontend");
  });

  it("includes structured API and AI issues in compatibility evaluation", () => {
    const result = evaluateCompatibility({
      ...DEFAULT_STACK_SELECTION,
      webFrontend: ["svelte"],
      nativeFrontend: [],
      api: "trpc",
      aiSdk: "tanstack-ai",
    });

    expect(result.issues.map((issue) => issue.code)).toContain("API_REQUIRES_REACT_FRONTEND");
    expect(result.issues.map((issue) => issue.code)).toContain(
      "TANSTACK_AI_REQUIRES_REACT_OR_SOLID_FRONTEND",
    );
  });

  it("allows plain Elixir projects while blocking Phoenix-specific scaffolds", () => {
    const stack = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "none",
    };

    expect(getDisabledReason(stack, "elixirWebFramework", "none")).toBeNull();
    expect(getDisabledReason(stack, "elixirJobs", "quantum")).toBeNull();
    expect(getDisabledReason(stack, "elixirHttp", "req")).toBeNull();
    expect(getDisabledReason(stack, "elixirAuth", "phx-gen-auth")).toBe(
      "Elixir auth scaffolds require Phoenix",
    );
    expect(getDisabledReason(stack, "elixirApi", "rest")).toBe(
      "Elixir API scaffolds require Phoenix",
    );
    expect(getDisabledReason(stack, "elixirRealtime", "channels")).toBe(
      "Elixir realtime scaffolds require Phoenix",
    );
    expect(getDisabledReason(stack, "elixirObservability", "phoenix-telemetry")).toBe(
      "Phoenix telemetry requires Phoenix",
    );
  });

  it("disables web deploy targets for frontends without deploy templates", () => {
    const unsupportedStack = {
      ...DEFAULT_STACK_SELECTION,
      webFrontend: ["astro"],
      nativeFrontend: [],
      backend: "none",
      api: "none",
    };
    const supportedStack = {
      ...unsupportedStack,
      webFrontend: ["react-vite"],
    };
    const supportedNetlifyStacks = [
      { ...unsupportedStack, webFrontend: ["react-router"] },
      { ...unsupportedStack, webFrontend: ["tanstack-start"] },
      { ...unsupportedStack, webFrontend: ["solid-start"] },
    ];

    expect(getDisabledReason(unsupportedStack, "webDeploy", "render")).toBe(
      "'render' web deployment is not wired for the 'astro' frontend.",
    );
    expect(getDisabledReason(unsupportedStack, "webDeploy", "netlify")).toBe(
      "'netlify' web deployment is not wired for the 'astro' frontend.",
    );
    expect(getDisabledReason(supportedStack, "webDeploy", "render")).toBeNull();
    expect(getDisabledReason(supportedStack, "webDeploy", "netlify")).toBeNull();
    expect(getDisabledReason(unsupportedStack, "webDeploy", "cloudflare")).toBeNull();
    expect(
      getDisabledReason(
        { ...unsupportedStack, webFrontend: ["vanilla-vite"] },
        "webDeploy",
        "cloudflare",
      ),
    ).toBe("'cloudflare' web deployment is not wired for the 'vanilla-vite' frontend.");
    expect(
      getDisabledReason(
        { ...unsupportedStack, webFrontend: ["vue"] },
        "webDeploy",
        "cloudflare",
      ),
    ).toBe("'cloudflare' web deployment is not wired for the 'vue' frontend.");
    for (const stack of supportedNetlifyStacks) {
      expect(getDisabledReason(stack, "webDeploy", "netlify")).toBeNull();
    }
  });

  it("disables Paraglide i18n for frontend templates that are not wired", () => {
    const baseStack = {
      ...DEFAULT_STACK_SELECTION,
      nativeFrontend: [],
      backend: "hono",
    };

    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["tanstack-router"] }, "i18n", "paraglide"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["next"] }, "i18n", "paraglide"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["vue"] }, "i18n", "paraglide"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["vanilla-vite"] }, "i18n", "paraglide"),
    ).toBeNull();
    expect(getDisabledReason({ ...baseStack, webFrontend: ["angular"] }, "i18n", "paraglide")).toBe(
      "Paraglide is not yet wired for the 'angular' frontend",
    );
    expect(getDisabledReason({ ...baseStack, webFrontend: ["qwik"] }, "i18n", "paraglide")).toBe(
      "Paraglide is not yet wired for the 'qwik' frontend",
    );
    expect(getDisabledReason({ ...baseStack, webFrontend: ["fresh"] }, "i18n", "paraglide")).toBe(
      "Paraglide is not yet wired for the 'fresh' frontend",
    );
    expect(getDisabledReason({ ...baseStack, webFrontend: [] }, "i18n", "paraglide")).toBe(
      "i18n requires a web frontend",
    );
  });

  it("disables Intlayer i18n for frontend templates that are not wired", () => {
    const baseStack = {
      ...DEFAULT_STACK_SELECTION,
      nativeFrontend: [],
      backend: "hono",
    };

    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["tanstack-router"] }, "i18n", "intlayer"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["next"] }, "i18n", "intlayer"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, webFrontend: ["react-vite"] }, "i18n", "intlayer"),
    ).toBeNull();
    expect(getDisabledReason({ ...baseStack, webFrontend: ["svelte"] }, "i18n", "intlayer")).toBe(
      "Intlayer is not yet wired for the 'svelte' frontend",
    );
    expect(getDisabledReason({ ...baseStack, webFrontend: ["angular"] }, "i18n", "intlayer")).toBe(
      "Intlayer is not yet wired for the 'angular' frontend",
    );
    expect(getDisabledReason({ ...baseStack, webFrontend: [] }, "i18n", "intlayer")).toBe(
      "i18n requires a web frontend",
    );
  });

  it("disables Netlify server deploy outside the supported Hono Node path", () => {
    const baseStack = {
      ...DEFAULT_STACK_SELECTION,
      webFrontend: ["tanstack-router"],
      nativeFrontend: [],
      backend: "hono",
      runtime: "node",
    };

    expect(getDisabledReason(baseStack, "serverDeploy", "netlify")).toBeNull();
    expect(
      getDisabledReason(
        {
          ...baseStack,
          backend: "express",
        },
        "serverDeploy",
        "netlify",
      ),
    ).toBe("Netlify Functions server deploy is currently supported only with Hono.");
    expect(
      getDisabledReason(
        {
          ...baseStack,
          runtime: "bun",
        },
        "serverDeploy",
        "netlify",
      ),
    ).toBe("Netlify Functions server deploy requires Node.js runtime.");
  });

  it("routes database setup disabled reasons through graph checks", () => {
    const baseStack = {
      ...DEFAULT_STACK_SELECTION,
      backend: "hono",
      runtime: "bun",
    };

    expect(getDisabledReason({ ...baseStack, database: "none" }, "dbSetup", "turso")).toBe(
      "Select a database first",
    );
    expect(getDisabledReason({ ...baseStack, database: "postgres" }, "dbSetup", "turso")).toBe(
      "Turso database setup requires SQLite.",
    );
    expect(getDisabledReason({ ...baseStack, database: "sqlite" }, "dbSetup", "d1")).toBe(
      "D1 database setup requires Workers runtime.",
    );
    expect(getDisabledReason({ ...baseStack, database: "sqlite" }, "dbSetup", "docker")).toBe(
      "SQLite does not need Docker database setup.",
    );
  });

  it("limits Go migrations to relational database targets", () => {
    const baseStack = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "go" as const,
      goMigrations: "golang-migrate" as const,
    };

    expect(
      getDisabledReason({ ...baseStack, database: "sqlite" }, "goMigrations", "golang-migrate"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, database: "postgres" }, "goMigrations", "golang-migrate"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, database: "mysql" }, "goMigrations", "golang-migrate"),
    ).toBeNull();
    expect(
      getDisabledReason({ ...baseStack, database: "mongodb" }, "goMigrations", "golang-migrate"),
    ).toBe("Go migrations require SQLite, PostgreSQL, or MySQL");
    expect(getDisabledReason(baseStack, "database", "mongodb")).toBe(
      "The selected Go migration tool requires SQLite, PostgreSQL, or MySQL",
    );
  });

  it("routes promoted frontend library disabled reasons through graph checks", () => {
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["fresh"],
          uiLibrary: "daisyui",
        },
        "forms",
        "tanstack-form",
      ),
    ).toBe("'tanstack-form' has no Preact adapter for the Fresh frontend.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["fresh"],
        },
        "stateManagement",
        "tanstack-store",
      ),
    ).toBe("'tanstack-store' requires React bindings and is not compatible with Fresh.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["fresh"],
        },
        "animation",
        "lottie",
      ),
    ).toBe("'lottie' uses lottie-react and is not compatible with Fresh.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          uiLibrary: "park-ui",
        },
        "cssFramework",
        "none",
      ),
    ).toBe("'park-ui' is not compatible with the 'none' CSS framework.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["svelte"],
        },
        "uiLibrary",
        "shadcn-ui",
      ),
    ).toBe("'shadcn-ui' is not compatible with the 'svelte' frontend.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["astro"],
          astroIntegration: "svelte",
        },
        "uiLibrary",
        "shadcn-ui",
      ),
    ).toBe("shadcn/ui requires a React-based frontend");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["astro"],
          astroIntegration: "svelte",
          cssFramework: "tailwind",
        },
        "uiLibrary",
        "shadcn-svelte",
      ),
    ).toBeNull();
  });

  it("routes promoted mobile library disabled reasons through graph checks", () => {
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "react-native",
          webFrontend: ["none"],
          nativeFrontend: ["native-bare"],
        },
        "mobileUI",
        "uniwind",
      ),
    ).toBe("Uniwind mobile UI requires the Expo + Uniwind frontend.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "react-native",
          webFrontend: ["none"],
          nativeFrontend: [],
        },
        "mobilePush",
        "expo-notifications",
      ),
    ).toBe("Mobile push requires a native Expo frontend");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "react-native",
          webFrontend: ["none"],
          nativeFrontend: ["native-bare"],
        },
        "mobileDeepLinking",
        "expo-linking",
      ),
    ).toBeNull();
  });

  it("allows RevenueCat payments for React Native stacks without enabling web payment providers", () => {
    const reactNativeStack = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "react-native",
      webFrontend: ["none"],
      nativeFrontend: ["native-bare"],
      backend: "none",
      payments: "revenuecat",
    };

    expect(getDisabledReason(reactNativeStack, "payments", "revenuecat")).toBeNull();
    expect(getDisabledReason(reactNativeStack, "payments", "stripe")).toBe(
      "React Native payments currently support RevenueCat only",
    );

    const result = analyzeStackCompatibility({
      ...reactNativeStack,
      nativeFrontend: ["none"],
    });

    expect(result.adjustedStack.payments).toBe("revenuecat");
    expect(result.adjustedStack.nativeFrontend).toEqual(["native-bare"]);
  });

  it("routes promoted backend library disabled reasons through graph checks", () => {
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          auth: "none",
        },
        "payments",
        "polar",
      ),
    ).toBe("Polar requires Better Auth.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["react-vite"],
        },
        "payments",
        "dodo",
      ),
    ).toBe("Dodo Payments are not yet supported for React + Vite projects.");

    expect(getDisabledReason(DEFAULT_STACK_SELECTION, "cms", "payload")).toBe(
      "Payload CMS v3 requires a Next.js frontend.",
    );
    const keystaticAstro7Reason =
      "Keystatic is currently scaffolded for Next.js only because @keystatic/astro is not Astro 7-compatible yet.";
    expect(getDisabledReason(DEFAULT_STACK_SELECTION, "cms", "keystatic")).toBe(
      keystaticAstro7Reason,
    );
    for (const stack of [
      { ...DEFAULT_STACK_SELECTION, webFrontend: ["nuxt"] },
      {
        ...DEFAULT_STACK_SELECTION,
        webFrontend: ["astro"],
        runtime: "workers",
      },
      { ...DEFAULT_STACK_SELECTION, webFrontend: ["astro"], runtime: "node" },
    ] as const) {
      expect(getDisabledReason(stack, "cms", "keystatic")).toBe(keystaticAstro7Reason);
    }
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["next"],
        },
        "cms",
        "keystatic",
      ),
    ).toBeNull();

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          examples: ["chat-sdk"],
          runtime: "node",
        },
        "ai",
        "langchain",
      ),
    ).toBe("Chat SDK example (Nuxt/Hono profile) requires Vercel AI SDK in v1.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["svelte"],
        },
        "ai",
        "tanstack-ai",
      ),
    ).toBe("TanStack AI requires React or Solid frontend (no Vue/Svelte/Angular adapter yet).");
  });

  it("routes addon and example disabled reasons through graph checks", () => {
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["svelte"],
        },
        "appPlatforms",
        "pwa",
      ),
    ).toBe("PWA requires a compatible web frontend.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          runtime: "workers",
        },
        "appPlatforms",
        "docker-compose",
      ),
    ).toBe("Docker Compose is not compatible with Cloudflare Workers runtime.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "elixir",
          webFrontend: ["none"],
          nativeFrontend: [],
          backend: "none",
          elixirWebFramework: "phoenix",
        },
        "appPlatforms",
        "docker-compose",
      ),
    ).toBe("Docker Compose currently supports TypeScript, Python, Go, Rust, or Java projects.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "dotnet",
          webFrontend: ["none"],
          nativeFrontend: [],
          backend: "none",
          dotnetWebFramework: "aspnet-minimal",
        },
        "appPlatforms",
        "devcontainer",
      ),
    ).toBe("DevContainer currently supports TypeScript, Python, Go, Rust, or Java projects.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "rust",
          webFrontend: ["none"],
          nativeFrontend: [],
          backend: "none",
          rustFrontend: "leptos",
        },
        "appPlatforms",
        "docker-compose",
      ),
    ).toBe("Docker Compose for Rust currently supports server-only projects.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "java",
          webFrontend: ["none"],
          nativeFrontend: [],
          backend: "none",
          javaWebFramework: "none",
        },
        "appPlatforms",
        "docker-compose",
      ),
    ).toBe("Docker Compose for Java currently requires Spring Boot.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "python",
          webFrontend: ["none"],
          nativeFrontend: [],
          backend: "none",
          pythonWebFramework: "fastapi",
          pythonOrm: "sqlalchemy",
          database: "mongodb",
        },
        "appPlatforms",
        "docker-compose",
      ),
    ).toBe(
      "Docker Compose for Python ORM projects currently supports SQLite defaults or Postgres.",
    );

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "go",
          backend: "none",
          goWebFramework: "gin",
        },
        "appPlatforms",
        "backend-utils",
      ),
    ).toBe("Backend Utils requires a compatible TypeScript server stack.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          api: "trpc",
        },
        "appPlatforms",
        "tanstack-query",
      ),
    ).toBe("TanStack Query is already included via the selected API layer.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "self",
          api: "openapi",
        },
        "appPlatforms",
        "openapi-typescript",
      ),
    ).toBe("openapi-typescript requires a standalone backend that exposes an OpenAPI schema.");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          webFrontend: ["astro"],
          astroIntegration: "none",
          api: "none",
        },
        "appPlatforms",
        "tanstack-table",
      ),
    ).toBe(
      "TanStack libraries with Astro require a UI framework integration (React, Vue, Svelte, or Solid)",
    );

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          appPlatforms: ["turborepo"],
        },
        "appPlatforms",
        "nx",
      ),
    ).toBe("Choose either Nx or Turborepo, not both");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "hono",
          runtime: "bun",
        },
        "examples",
        "chat-sdk",
      ),
    ).toBe("Chat SDK example is not compatible with the selected graph stack.");
  });

  it("routes promoted Java ecosystem disabled reasons through graph checks", () => {
    const javaBase = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      javaOrm: "none",
      javaAuth: "none",
      javaLibraries: [],
      javaTestingLibraries: [],
    };

    expect(getDisabledReason(javaBase, "javaLibraries", "flyway")).toBe(
      "Flyway currently requires Spring Data JPA in the Java scaffold",
    );

    expect(
      getDisabledReason(
        {
          ...javaBase,
          javaOrm: "spring-data-jpa",
          javaLibraries: ["flyway"],
        },
        "javaLibraries",
        "liquibase",
      ),
    ).toBe("Liquibase cannot be combined with Flyway in the current Java scaffold");

    expect(
      getDisabledReason(
        {
          ...javaBase,
          javaBuildTool: "none",
        },
        "javaTestingLibraries",
        "junit5",
      ),
    ).toBe("Java testing libraries require Maven or Gradle");

    expect(getDisabledReason(javaBase, "javaBuildTool", "none")).toBe(
      "Java web frameworks require Maven or Gradle",
    );
  });

  it("routes shared non-TypeScript service disabled reasons through graph checks", () => {
    const rustBase = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "rust",
      rustWebFramework: "axum",
    };
    const javaWithoutBuildTool = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "none",
      javaOrm: "none",
      javaAuth: "none",
      javaLibraries: [],
      javaTestingLibraries: [],
    };
    const elixirBase = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
    };

    expect(getDisabledReason(rustBase, "email", "nodemailer")).toBe(
      "Only Resend email is available for non-TypeScript ecosystems",
    );

    expect(getDisabledReason(rustBase, "observability", "grafana")).toBe(
      "Only Sentry observability is available for non-TypeScript ecosystems",
    );

    expect(getDisabledReason(rustBase, "search", "algolia")).toBe(
      "Only Meilisearch search is available for non-TypeScript ecosystems",
    );

    expect(getDisabledReason(javaWithoutBuildTool, "email", "resend")).toBe(
      "Resend email for Java requires Maven or Gradle to manage the SDK dependency",
    );

    expect(getDisabledReason(javaWithoutBuildTool, "observability", "sentry")).toBe(
      "Sentry observability for Java requires Maven or Gradle to manage the SDK dependency",
    );

    expect(getDisabledReason(javaWithoutBuildTool, "caching", "upstash-redis")).toBe(
      "Upstash Redis caching for Java requires Maven or Gradle to manage the Redis client dependency",
    );

    expect(getDisabledReason(javaWithoutBuildTool, "search", "meilisearch")).toBe(
      "Meilisearch search for Java requires Maven or Gradle to manage the SDK dependency",
    );

    expect(getDisabledReason(elixirBase, "email", "swoosh")).toBe(
      "Only Resend email is available for non-TypeScript ecosystems",
    );
    expect(getDisabledReason(elixirBase, "elixirEmail", "swoosh")).toBeNull();
  });

  it("routes TypeScript backend service owner disabled reasons through graph checks", () => {
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "none",
        },
        "email",
        "resend",
      ),
    ).toBe("Email integration requires a backend");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "convex",
        },
        "email",
        "resend",
      ),
    ).toBe("Email integration is not available with Convex backend");

    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "convex",
        },
        "rateLimit",
        "upstash",
      ),
    ).toBe("Rate limiting requires a standalone backend");
  });

  it("routes unsupported Elixir generated-tool disabled reasons through graph checks", () => {
    const elixirBase = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
    };

    expect(getDisabledReason(elixirBase, "elixirOrm", "ecto")).toBeNull();

    expect(getDisabledReason(elixirBase, "elixirAuth", "guardian")).toBeNull();
    expect(getDisabledReason(elixirBase, "elixirAuth", "ueberauth")).toBeNull();

    expect(getDisabledReason(elixirBase, "elixirValidation", "nimble-options")).toBeNull();

    expect(getDisabledReason(elixirBase, "elixirCaching", "nebulex")).toBeNull();

    expect(getDisabledReason(elixirBase, "elixirObservability", "opentelemetry")).toBeNull();
    expect(getDisabledReason(elixirBase, "elixirObservability", "prom_ex")).toBeNull();

    expect(getDisabledReason(elixirBase, "elixirTesting", "mox")).toBeNull();
    expect(getDisabledReason(elixirBase, "elixirTesting", "bypass")).toBeNull();
    expect(getDisabledReason(elixirBase, "elixirTesting", "wallaby")).toBeNull();

    expect(getDisabledReason(elixirBase, "elixirDeploy", "fly")).toBeNull();
    expect(getDisabledReason(elixirBase, "elixirDeploy", "gigalixir")).toBeNull();

    expect(
      getDisabledReason(
        {
          ...elixirBase,
          elixirWebFramework: "none",
        },
        "elixirAuth",
        "ueberauth",
      ),
    ).toBe("Elixir auth scaffolds require Phoenix");

    expect(
      getDisabledReason(
        {
          ...elixirBase,
          elixirWebFramework: "none",
        },
        "elixirTesting",
        "wallaby",
      ),
    ).toBe("Wallaby browser tests require Phoenix");
  });

  it("routes Elixir context disabled reasons through graph checks", () => {
    const plainElixir = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "none",
      elixirOrm: "none",
    };
    const phoenixBase = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "none",
    };

    expect(getDisabledReason(plainElixir, "elixirAuth", "phx-gen-auth")).toBe(
      "Elixir auth scaffolds require Phoenix",
    );
    expect(getDisabledReason(plainElixir, "elixirApi", "rest")).toBe(
      "Elixir API scaffolds require Phoenix",
    );
    expect(getDisabledReason(plainElixir, "elixirRealtime", "channels")).toBe(
      "Elixir realtime scaffolds require Phoenix",
    );
    expect(getDisabledReason(plainElixir, "elixirObservability", "phoenix-telemetry")).toBe(
      "Phoenix telemetry requires Phoenix",
    );
    expect(getDisabledReason(plainElixir, "elixirJobs", "oban")).toBe(
      "Oban requires Ecto SQL with PostgreSQL in the current Phoenix scaffold",
    );
    expect(getDisabledReason(plainElixir, "elixirApi", "open_api_spex")).toBe(
      "Elixir API scaffolds require Phoenix",
    );
    expect(getDisabledReason(plainElixir, "elixirI18n", "gettext")).toBe(
      "Elixir Internationalization requires Phoenix",
    );
    expect(getDisabledReason(plainElixir, "elixirHttpServer", "bandit")).toBe(
      "HTTP server adapters require Phoenix",
    );

    expect(getDisabledReason(phoenixBase, "elixirAuth", "phx-gen-auth")).toBe(
      "phx.gen.auth requires an Ecto SQL repository",
    );
    expect(getDisabledReason(phoenixBase, "elixirApi", "absinthe")).toBe(
      "Absinthe GraphQL requires Ecto in the current Phoenix scaffold",
    );
    expect(getDisabledReason(phoenixBase, "elixirJobs", "oban")).toBe(
      "Oban requires Ecto SQL with PostgreSQL in the current Phoenix scaffold",
    );
    expect(getDisabledReason(phoenixBase, "elixirAuth", "pow")).toBe(
      "Pow requires Phoenix and an Ecto SQL repository",
    );
    expect(getDisabledReason(phoenixBase, "elixirTesting", "ex_machina")).toBe(
      "ExMachina requires an Ecto SQL repository",
    );
    expect(getDisabledReason(phoenixBase, "elixirHttpServer", "none")).toBe(
      "Phoenix requires Bandit or Cowboy",
    );
    expect(getDisabledReason(phoenixBase, "elixirRealtime", "live-view-streams")).toBe(
      "LiveView Streams require Phoenix LiveView",
    );
  });

  it("keeps non-Phoenix Elixir selections when Phoenix is removed", () => {
    const result = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "none",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
      elixirApi: "rest",
      elixirRealtime: "channels",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirObservability: "phoenix-telemetry",
      elixirI18n: "gettext",
      elixirHttpServer: "cowboy",
    });

    expect(result.adjustedStack).toMatchObject({
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirObservability: "none",
      elixirI18n: "none",
      elixirHttpServer: "none",
    });
  });

  it("clears selections whose prerequisites are no longer present", () => {
    const cases = [
      {
        stack: { backend: "hono", realtime: "ws" },
        expected: { realtime: "none" },
      },
      {
        stack: { backend: "convex", payments: "paypal" },
        expected: { payments: "none" },
      },
      {
        stack: { backend: "none", aiSdk: "openai-sdk" },
        expected: { aiSdk: "none" },
      },
      {
        stack: { backend: "convex", aiSdk: "anthropic-sdk" },
        expected: { aiSdk: "none" },
      },
      {
        stack: { api: "openapi", appPlatforms: ["turborepo", "graphql-codegen"] },
        expected: { appPlatforms: ["turborepo"] },
      },
      {
        stack: { webFrontend: ["svelte"], cssFramework: "styled-components", uiLibrary: "none" },
        expected: { cssFramework: "none" },
      },
      {
        stack: { webFrontend: ["vue"], webDeploy: "cloudflare" },
        expected: { webDeploy: "none" },
      },
    ];

    for (const { stack, expected } of cases) {
      const result = analyzeStackCompatibility({
        ...DEFAULT_STACK_SELECTION,
        ...stack,
      });
      expect(result.adjustedStack).toMatchObject(expected);
    }
  });

  it("clears Pow when the Elixir SQL repository is removed", () => {
    const result = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "none",
      elixirAuth: "pow",
    });

    expect(result.adjustedStack?.elixirAuth).toBe("none");
  });

  it("locks Effect backend services and validation without blocking compatible tools", () => {
    const result = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      backend: "effect",
      backendLibraries: "none",
      validation: "zod",
      forms: "tanstack-form",
    });

    expect(result.adjustedStack).toMatchObject({
      backend: "effect",
      backendLibraries: "effect-full",
      validation: "effect-schema",
      forms: "tanstack-form",
    });
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "effect",
          backendLibraries: "effect-full",
          validation: "effect-schema",
        },
        "backendLibraries",
        "effect",
      ),
    ).toBe("Effect backend requires Effect Platform + SQL services");
    expect(
      getDisabledReason(
        {
          ...DEFAULT_STACK_SELECTION,
          backend: "effect",
          backendLibraries: "effect-full",
          validation: "effect-schema",
        },
        "forms",
        "tanstack-form",
      ),
    ).toBeNull();
  });

  it("enforces the generated Rust framework integration boundaries", () => {
    const warpStack = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "rust",
      rustWebFramework: "warp",
      rustApi: "jsonrpsee",
      rustAuth: "none",
    };

    expect(getDisabledReason(warpStack, "rustApi", "tonic")).toBe(
      "Warp and Salvo currently support REST or the standalone jsonrpsee server",
    );
    expect(getDisabledReason(warpStack, "rustApi", "jsonrpsee")).toBeNull();
    expect(getDisabledReason(warpStack, "rustAuth", "tower-sessions")).toBe(
      "The generated tower-sessions middleware is wired specifically for Axum",
    );
    expect(
      getDisabledReason(
        { ...warpStack, rustWebFramework: "axum", rustAuth: "tower-sessions" },
        "rustWebFramework",
        "salvo",
      ),
    ).toBe("tower-sessions requires the generated Axum middleware stack");
  });
});
