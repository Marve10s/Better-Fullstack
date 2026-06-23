import { describe, expect, it } from "bun:test";

import {
  analyzeStackCompatibility,
  allowedApisForFrontends,
  evaluateCompatibility,
  getAIFrontendCompatibilityIssue,
  getApiFrontendCompatibilityIssue,
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
      "Render deployment is not yet wired up for the 'astro' frontend",
    );
    expect(getDisabledReason(unsupportedStack, "webDeploy", "netlify")).toBe(
      "Netlify deployment is not yet wired up for the 'astro' frontend",
    );
    expect(getDisabledReason(supportedStack, "webDeploy", "render")).toBeNull();
    expect(getDisabledReason(supportedStack, "webDeploy", "netlify")).toBeNull();
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
    expect(getDisabledReason({ ...baseStack, webFrontend: ["next"] }, "i18n", "paraglide")).toBeNull();
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
    ).toBe("Netlify Functions server deploy is currently supported only with Hono");
    expect(
      getDisabledReason(
        {
          ...baseStack,
          runtime: "bun",
        },
        "serverDeploy",
        "netlify",
      ),
    ).toBe("Netlify Functions server deploy requires Node.js runtime");
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
      { ...DEFAULT_STACK_SELECTION, webFrontend: ["astro"], runtime: "workers" },
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

  it("routes unsupported Elixir generated-tool disabled reasons through graph checks", () => {
    const elixirBase = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
    };

    expect(getDisabledReason(elixirBase, "elixirOrm", "ecto")).toBe(
      "Use Ecto SQL for generated Repo, migrations, schemas, and PostgreSQL wiring",
    );

    expect(getDisabledReason(elixirBase, "elixirAuth", "guardian")).toBe(
      "Guardian JWT wiring is not generated yet; use phx.gen.auth or no auth",
    );

    expect(getDisabledReason(elixirBase, "elixirValidation", "nimble-options")).toBe(
      "NimbleOptions is not generated yet; use Ecto Changesets or no extra validation",
    );

    expect(getDisabledReason(elixirBase, "elixirCaching", "nebulex")).toBe(
      "Nebulex cache modules are not generated yet; use Cachex or no cache",
    );

    expect(getDisabledReason(elixirBase, "elixirObservability", "opentelemetry")).toBe(
      "OpenTelemetry setup is not generated yet; use Phoenix telemetry or no extra observability",
    );

    expect(getDisabledReason(elixirBase, "elixirTesting", "mox")).toBe(
      "Mox-specific test boundaries are not generated yet; use ExUnit",
    );

    expect(getDisabledReason(elixirBase, "elixirDeploy", "fly")).toBe(
      "Fly.io config is not generated yet; use Docker or mix releases",
    );

    expect(
      getDisabledReason(
        {
          ...elixirBase,
          elixirWebFramework: "none",
        },
        "elixirAuth",
        "ueberauth",
      ),
    ).toBe("Ueberauth is not generated yet; use phx.gen.auth or no auth");
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

    expect(getDisabledReason(phoenixBase, "elixirAuth", "phx-gen-auth")).toBe(
      "phx.gen.auth requires Ecto",
    );
    expect(getDisabledReason(phoenixBase, "elixirApi", "absinthe")).toBe(
      "Absinthe GraphQL requires Ecto in the current Phoenix scaffold",
    );
    expect(getDisabledReason(phoenixBase, "elixirJobs", "oban")).toBe(
      "Oban requires Ecto SQL with PostgreSQL in the current Phoenix scaffold",
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
    });

    expect(result.adjustedStack).toMatchObject({
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirObservability: "none",
    });
  });
});
