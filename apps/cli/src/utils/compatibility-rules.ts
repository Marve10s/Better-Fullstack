import {
  allowedApisForFrontends as allowedApisForFrontendsShared,
  getAIFrontendCompatibilityIssue,
  getApiFrontendCompatibilityIssue,
  getCompatibleAddons as getCompatibleAddonsShared,
  getCompatibleCSSFrameworks as getCompatibleCSSFrameworksShared,
  getCompatibleUILibraries as getCompatibleUILibrariesShared,
  getUnsupportedWebDeployFrontend,
  hasJavaScriptWorkspaceRoot,
  hasDockerComposeCompatibleFrontend,
  hasWebStyling as hasWebStylingShared,
  isBackendUtilsCompatibleBackend,
  isExampleAIAllowed as isExampleAIAllowedShared,
  isExampleChatSdkAllowed as isExampleChatSdkAllowedShared,
  isFrontendAllowedWithBackend as isFrontendAllowedWithBackendShared,
  isWebFrontend as isWebFrontendShared,
  requiresChatSdkVercelAIForSelection,
  splitFrontends as splitFrontendsShared,
  validateAddonCompatibility as validateAddonCompatibilityShared,
} from "@better-fullstack/types";

import type {
  AI,
  Addons,
  API,
  AstroIntegration,
  Auth,
  Backend,
  CLIInput,
  CSSFramework,
  Database,
  Ecosystem,
  Frontend,
  Payments,
  ProjectConfig,
  Runtime,
  ServerDeploy,
  UILibrary,
  WebDeploy,
} from "../types";

import { incompatibilityError, invalidSelectionError } from "./error-formatter";
import { exitWithError } from "./errors";

export function isWebFrontend(value: Frontend) {
  return isWebFrontendShared(value);
}

export function splitFrontends(values: Frontend[] = []): {
  web: Frontend[];
  native: Frontend[];
} {
  return splitFrontendsShared(values);
}

export function ensureSingleWebAndNative(frontends: Frontend[]) {
  const { web, native } = splitFrontends(frontends);
  if (web.length > 1) {
    invalidSelectionError({
      message: "Only one web framework can be selected per project.",
      provided: { frontend: web },
      suggestions: [
        "Keep one web framework and remove the others",
        "Use separate projects for multiple web frameworks",
      ],
    });
  }
  if (native.length > 1) {
    invalidSelectionError({
      message: "Only one native framework can be selected per project.",
      provided: { frontend: native },
      suggestions: [
        "Keep one native framework and remove the others",
        "Choose: native-bare, native-uniwind, or native-unistyles",
      ],
    });
  }
}

// Frontends with built-in server capabilities for backend="self"
const FULLSTACK_FRONTENDS: readonly Frontend[] = [
  "next",
  "vinext",
  "tanstack-start",
  "astro",
  "nuxt",
  "svelte",
  "solid-start",
] as const;

export function validateSelfBackendCompatibility(
  providedFlags: Set<string>,
  options: CLIInput,
  config: Partial<ProjectConfig>,
) {
  const backend = config.backend || options.backend;
  const frontends = config.frontend || options.frontend || [];

  if (backend === "self") {
    const { web, native } = splitFrontends(frontends);
    const hasSupportedWeb = web.length === 1 && FULLSTACK_FRONTENDS.includes(web[0]);

    if (!hasSupportedWeb) {
      exitWithError(
        "Backend 'self' (fullstack) only supports Next.js, Vinext, TanStack Start, Astro, Nuxt, SvelteKit, or SolidStart frontends. Please use --frontend next, --frontend vinext, --frontend tanstack-start, --frontend astro, --frontend nuxt, --frontend svelte, or --frontend solid-start.",
      );
    }

    if (native.length > 1) {
      exitWithError(
        "Cannot select multiple native frameworks. Choose only one of: native-bare, native-uniwind, native-unistyles",
      );
    }
  }

  const hasFullstackFrontend = frontends.some((f) => FULLSTACK_FRONTENDS.includes(f));
  if (providedFlags.has("backend") && !hasFullstackFrontend && backend === "self") {
    exitWithError(
      "Backend 'self' (fullstack) only supports Next.js, Vinext, TanStack Start, Astro, Nuxt, SvelteKit, or SolidStart frontends. Please use --frontend next, --frontend vinext, --frontend tanstack-start, --frontend astro, --frontend nuxt, --frontend svelte, --frontend solid-start, or choose a different backend.",
    );
  }
}

// Backends that support Cloudflare Workers runtime
const WORKERS_COMPATIBLE_BACKENDS: readonly Backend[] = ["hono", "nitro", "fets"] as const;

export function validateWorkersCompatibility(
  providedFlags: Set<string>,
  options: CLIInput,
  config: Partial<ProjectConfig>,
) {
  if (
    providedFlags.has("runtime") &&
    options.runtime === "workers" &&
    config.backend &&
    !WORKERS_COMPATIBLE_BACKENDS.includes(config.backend)
  ) {
    incompatibilityError({
      message:
        "In Better-Fullstack, Cloudflare Workers runtime is currently supported only with compatible backends (Hono, Nitro, or Fets).",
      provided: { runtime: "workers", backend: config.backend },
      suggestions: [
        "Use --backend hono",
        "Use --backend nitro",
        "Use --backend fets",
        "Choose a different runtime (node, bun)",
      ],
    });
  }

  if (
    providedFlags.has("backend") &&
    config.backend &&
    !WORKERS_COMPATIBLE_BACKENDS.includes(config.backend) &&
    config.runtime === "workers"
  ) {
    incompatibilityError({
      message: `In Better-Fullstack, backend '${config.backend}' is currently not available with Cloudflare Workers runtime.`,
      provided: { backend: config.backend, runtime: "workers" },
      suggestions: [
        "Use --backend hono, --backend nitro, or --backend fets",
        "Choose a different runtime (node, bun)",
      ],
    });
  }

  if (
    providedFlags.has("runtime") &&
    options.runtime === "workers" &&
    config.database === "mongodb"
  ) {
    incompatibilityError({
      message:
        "In Better-Fullstack, Cloudflare Workers runtime is currently not available with MongoDB.",
      provided: { runtime: "workers", database: "mongodb" },
      suggestions: [
        "Use a different database (postgres, sqlite, mysql)",
        "Choose a different runtime (node, bun)",
      ],
    });
  }

  if (
    providedFlags.has("runtime") &&
    options.runtime === "workers" &&
    config.dbSetup === "docker"
  ) {
    incompatibilityError({
      message:
        "In Better-Fullstack, Cloudflare Workers runtime is currently not available with Docker database setup.",
      provided: { runtime: "workers", "db-setup": "docker" },
      suggestions: ["Use --db-setup d1 for SQLite", "Choose a different runtime (node, bun)"],
    });
  }

  if (
    providedFlags.has("database") &&
    config.database === "mongodb" &&
    config.runtime === "workers"
  ) {
    incompatibilityError({
      message:
        "In Better-Fullstack, MongoDB is currently not available with Cloudflare Workers runtime.",
      provided: { database: "mongodb", runtime: "workers" },
      suggestions: [
        "Use a different database (postgres, sqlite, mysql)",
        "Choose a different runtime (node, bun)",
      ],
    });
  }
}

export function validateApiFrontendCompatibility(
  api: API | undefined,
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
) {
  const issue = getApiFrontendCompatibilityIssue(api, frontends, astroIntegration);
  if (!issue) return;

  incompatibilityError({
    message: issue.message,
    provided: issue.provided ?? {},
    suggestions: issue.suggestions ?? [],
  });
}

export function isFrontendAllowedWithBackend(
  frontend: Frontend,
  backend?: ProjectConfig["backend"],
  auth?: string,
) {
  return isFrontendAllowedWithBackendShared(frontend, backend, auth);
}

function validateClerkCompatibility(
  auth: Auth | undefined,
  backend: Backend | undefined,
  frontends: Frontend[] = [],
) {
  if (auth !== "clerk") return;

  if (backend === "convex") {
    const incompatibleFrontends = frontends.filter((f) =>
      ["nuxt", "svelte", "solid", "solid-start"].includes(f),
    );
    if (incompatibleFrontends.length > 0) {
      exitWithError(
        `In Better-Fullstack, Clerk + Convex is not compatible with the following frontends: ${incompatibleFrontends.join(
          ", ",
        )}. Please choose a different frontend or auth provider.`,
      );
    }
    return;
  }

  if (backend === "self") {
    const hasNative = frontends.some((f) =>
      ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
    );
    if (hasNative) {
      exitWithError(
        "In Better-Fullstack, Clerk with the 'self' backend is currently supported only for web-only Next.js or TanStack Start projects (no native companion app). Please remove the native frontend or choose a different auth provider.",
      );
    }

    const hasNextJs = frontends.includes("next");
    const hasTanStackStart = frontends.includes("tanstack-start");

    if (!hasNextJs && !hasTanStackStart) {
      if (frontends.includes("astro")) {
        exitWithError(
          "In Better-Fullstack, Clerk is not yet supported for Astro fullstack projects. Please use '--frontend next' or '--frontend tanstack-start' with '--backend self', or choose a different auth provider.",
        );
      }
      if (frontends.includes("nuxt")) {
        exitWithError(
          "In Better-Fullstack, Clerk is not yet supported for Nuxt fullstack projects. Please use '--frontend next' or '--frontend tanstack-start' with '--backend self', or choose a different auth provider.",
        );
      }
      if (frontends.includes("svelte")) {
        exitWithError(
          "In Better-Fullstack, Clerk is not yet supported for SvelteKit fullstack projects. Please use '--frontend next' or '--frontend tanstack-start' with '--backend self', or choose a different auth provider.",
        );
      }
      if (frontends.includes("solid-start")) {
        exitWithError(
          "In Better-Fullstack, Clerk is not yet supported for SolidStart fullstack projects. Please use '--frontend next' or '--frontend tanstack-start' with '--backend self', or choose a different auth provider.",
        );
      }
      exitWithError(
        "In Better-Fullstack, Clerk with the 'self' backend currently requires the Next.js or TanStack Start frontend. Please use '--frontend next' or '--frontend tanstack-start', or choose a different auth provider.",
      );
    }

    return;
  }

  exitWithError(
    "In Better-Fullstack, Clerk authentication is currently supported with the Convex backend, or with the 'self' backend when using Next.js or TanStack Start. Please choose a supported backend/frontend combination or a different auth provider.",
  );
}

function validateNextAuthCompatibility(
  auth: Auth | undefined,
  backend: Backend | undefined,
  frontends: Frontend[] = [],
) {
  if (auth !== "nextauth") return;

  const hasNextJs = frontends.includes("next");

  if (backend !== "self") {
    exitWithError(
      "In Better-Fullstack, Auth.js (NextAuth) is currently supported only with the 'self' backend (fullstack Next.js). Please use '--backend self' or choose a different auth provider.",
    );
  }

  if (!hasNextJs) {
    exitWithError(
      "In Better-Fullstack, Auth.js (NextAuth) currently requires the Next.js frontend. Please use '--frontend next' or choose a different auth provider.",
    );
  }
}

function validateStackAuthCompatibility(
  auth: Auth | undefined,
  backend: Backend | undefined,
  frontends: Frontend[] = [],
) {
  if (auth !== "stack-auth") return;

  const hasNextJs = frontends.includes("next");

  if (backend !== "self") {
    exitWithError(
      "In Better-Fullstack, Stack Auth is currently supported only with the 'self' backend (fullstack Next.js). Please use '--backend self' or choose a different auth provider.",
    );
  }

  if (!hasNextJs) {
    exitWithError(
      "In Better-Fullstack, Stack Auth currently requires the Next.js frontend. Please use '--frontend next' or choose a different auth provider.",
    );
  }
}

function validateSupabaseAuthCompatibility(
  auth: Auth | undefined,
  backend: Backend | undefined,
  frontends: Frontend[] = [],
) {
  if (auth !== "supabase-auth") return;

  const hasNextJs = frontends.includes("next");
  const hasTanStackStart = frontends.includes("tanstack-start");
  const hasNativeFrontend = frontends.some((f) =>
    ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
  );

  if (backend !== "self") {
    exitWithError(
      "In Better-Fullstack, Supabase Auth is currently supported only with the 'self' backend (fullstack Next.js or TanStack Start). Please use '--backend self' or choose a different auth provider.",
    );
  }

  if (hasNativeFrontend) {
    exitWithError(
      "In Better-Fullstack, Supabase Auth with the 'self' backend is currently supported only for web-only Next.js or TanStack Start projects (no native companion app). Please remove the native frontend or choose a different auth provider.",
    );
  }

  if (!hasNextJs && !hasTanStackStart) {
    exitWithError(
      "In Better-Fullstack, Supabase Auth currently requires the Next.js or TanStack Start frontend. Please use '--frontend next' or '--frontend tanstack-start', or choose a different auth provider.",
    );
  }
}

function validateAuth0Compatibility(
  auth: Auth | undefined,
  backend: Backend | undefined,
  frontends: Frontend[] = [],
) {
  if (auth !== "auth0") return;

  const hasNextJs = frontends.includes("next");

  if (backend !== "self") {
    exitWithError(
      "In Better-Fullstack, Auth0 is currently supported only with the 'self' backend (fullstack Next.js). Please use '--backend self' or choose a different auth provider.",
    );
  }

  if (!hasNextJs) {
    exitWithError(
      "In Better-Fullstack, Auth0 currently requires the Next.js frontend. Please use '--frontend next' or choose a different auth provider.",
    );
  }
}

export function allowedApisForFrontends(
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
) {
  return allowedApisForFrontendsShared(frontends, astroIntegration);
}

export function isExampleAIAllowed(backend?: ProjectConfig["backend"], frontends: Frontend[] = []) {
  return isExampleAIAllowedShared(backend, frontends);
}

export function isExampleChatSdkAllowed(
  backend?: ProjectConfig["backend"],
  frontends: Frontend[] = [],
  runtime?: Runtime,
) {
  return isExampleChatSdkAllowedShared(backend, frontends, runtime);
}

export function requiresChatSdkVercelAI(
  backend?: ProjectConfig["backend"],
  frontends: Frontend[] = [],
  runtime?: Runtime,
) {
  return requiresChatSdkVercelAIForSelection(backend, frontends, runtime);
}

export function validateWebDeployRequiresWebFrontend(
  webDeploy: WebDeploy | undefined,
  hasWebFrontendFlag: boolean,
) {
  if (webDeploy && webDeploy !== "none" && !hasWebFrontendFlag) {
    exitWithError(
      "'--web-deploy' requires a web frontend. Please select a web frontend or set '--web-deploy none'.",
    );
  }
}

export function validateWebDeployFrontendTemplates(
  webDeploy: WebDeploy | undefined,
  frontends: Frontend[] = [],
) {
  const blocked = getUnsupportedWebDeployFrontend(webDeploy, frontends);
  if (blocked) {
    const deployName = webDeploy === "render" ? "Render" : "Netlify";
    exitWithError(
      `${deployName} deployment is not yet wired up for the '${blocked}' frontend. Choose a different web deploy target or frontend.`,
    );
  }
}

export function validateServerDeployRequiresBackend(
  serverDeploy: ServerDeploy | undefined,
  backend: Backend | undefined,
  hasGraphBackend = false,
) {
  if (
    serverDeploy &&
    serverDeploy !== "none" &&
    !hasGraphBackend &&
    (!backend || backend === "none")
  ) {
    exitWithError(
      "'--server-deploy' requires a backend. Please select a backend or set '--server-deploy none'.",
    );
  }
}

export function validateAddonCompatibility(
  addon: Addons,
  frontend: Frontend[],
  _auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  ecosystem?: Ecosystem,
  rustFrontend?: string,
  javaWebFramework?: string,
  database?: Database,
  api?: API,
  pythonWebFramework?: ProjectConfig["pythonWebFramework"],
  goWebFramework?: ProjectConfig["goWebFramework"],
  rustWebFramework?: ProjectConfig["rustWebFramework"],
  rustApi?: ProjectConfig["rustApi"],
  goApi?: ProjectConfig["goApi"],
  javaApi?: ProjectConfig["javaApi"],
  hasJavaScriptStackPart = false,
): { isCompatible: boolean; reason?: string } {
  const baseCompatibility = validateAddonCompatibilityShared(addon, frontend, _auth);
  if (!baseCompatibility.isCompatible) return baseCompatibility;

  if (
    addon === "knip" &&
    ecosystem !== undefined &&
    ecosystem !== "typescript" &&
    ecosystem !== "react-native"
  ) {
    return {
      isCompatible: false,
      reason: "Knip currently supports TypeScript and React Native projects only",
    };
  }

  if (
    addon === "vite-plus" &&
    ecosystem !== undefined &&
    ecosystem !== "typescript" &&
    ecosystem !== "react-native" &&
    !hasJavaScriptStackPart
  ) {
    return {
      isCompatible: false,
      reason:
        "Vite+ requires a JavaScript workspace root; use TypeScript, React Native, or a multi-ecosystem Stack Graph project",
    };
  }

  if (
    (addon === "graphql-codegen" || addon === "apollo-client") &&
    api !== undefined &&
    !["garph", "graphql-yoga", "apollo-server"].includes(api) &&
    !(addon === "graphql-codegen" && frontend.includes("redwood"))
  ) {
    return { isCompatible: false, reason: `${addon} requires a GraphQL API selection` };
  }

  if (addon === "openapi-typescript" && api !== undefined && api !== "openapi") {
    return {
      isCompatible: false,
      reason: "openapi-typescript requires the OpenAPI API selection",
    };
  }

  if (addon === "openapi-typescript" && backend === "self") {
    return {
      isCompatible: false,
      reason: "openapi-typescript requires a standalone backend that exposes an OpenAPI schema",
    };
  }

  // Backend Utils generates framework-specific server helpers.
  if (addon === "backend-utils") {
    if (ecosystem !== undefined && ecosystem !== "typescript") {
      return {
        isCompatible: false,
        reason: "Backend Utils requires a TypeScript server stack",
      };
    }
    if (backend !== undefined && !isBackendUtilsCompatibleBackend(backend)) {
      return {
        isCompatible: false,
        reason: "Backend Utils requires a Hono, Express, Fastify, Elysia, feTS, or NestJS backend",
      };
    }
  }

  // Docker Compose-backed addons target containerized/self-hosted stacks only.
  if (addon === "docker-compose" || addon === "devcontainer" || addon === "kong") {
    const label =
      addon === "devcontainer"
        ? "DevContainer"
        : addon === "kong"
          ? "Kong Gateway"
          : "docker-compose";
    const title =
      addon === "devcontainer"
        ? "DevContainer"
        : addon === "kong"
          ? "Kong Gateway"
          : "Docker Compose";

    if (backend === "convex") {
      return {
        isCompatible: false,
        reason: `${label} is not compatible with Convex backend (managed service)`,
      };
    }
    if (runtime === "workers") {
      return {
        isCompatible: false,
        reason: `${label} is not compatible with Cloudflare Workers runtime`,
      };
    }
    if (addon === "kong" && ecosystem === "typescript" && backend === "none") {
      return {
        isCompatible: false,
        reason: "Kong Gateway requires a TypeScript backend service",
      };
    }
    if (addon === "kong" && ecosystem === "typescript" && backend === "encore") {
      return {
        isCompatible: false,
        reason: "Kong Gateway does not yet support Encore's container workflow",
      };
    }
    if (addon === "kong" && ecosystem === "python" && pythonWebFramework === "none") {
      return {
        isCompatible: false,
        reason: "Kong Gateway requires a Python HTTP server",
      };
    }
    if (addon === "kong" && ecosystem === "go" && goWebFramework === "none") {
      return {
        isCompatible: false,
        reason: "Kong Gateway requires a Go HTTP server",
      };
    }
    if (addon === "kong" && ecosystem === "rust" && rustWebFramework === "none") {
      return {
        isCompatible: false,
        reason: "Kong Gateway requires a Rust HTTP server",
      };
    }
    if (
      addon === "kong" &&
      ecosystem === "rust" &&
      (rustApi === "tonic" || rustApi === "jsonrpsee")
    ) {
      return {
        isCompatible: false,
        reason: "Kong Gateway currently requires an HTTP Rust API",
      };
    }
    if (addon === "kong" && ecosystem === "rust" && rustWebFramework === "loco") {
      return {
        isCompatible: false,
        reason: "Kong Gateway does not yet support Loco's container configuration",
      };
    }
    if (
      addon === "kong" &&
      ecosystem === "go" &&
      goApi !== undefined &&
      ["connect-go", "grpc-gateway", "oapi-codegen", "grpc-go"].includes(goApi)
    ) {
      return {
        isCompatible: false,
        reason: "Kong Gateway currently requires the primary Go HTTP server API",
      };
    }
    if (addon === "kong" && ecosystem === "java" && javaApi === "grpc") {
      return {
        isCompatible: false,
        reason: "Kong Gateway currently requires the primary Java HTTP API",
      };
    }
    if (
      ecosystem !== undefined &&
      !["typescript", "python", "go", "rust", "java"].includes(ecosystem)
    ) {
      return {
        isCompatible: false,
        reason: `${title} currently supports TypeScript, Python, Go, Rust, or Java projects`,
      };
    }
    if (ecosystem === "typescript" && !hasDockerComposeCompatibleFrontend(frontend)) {
      return {
        isCompatible: false,
        reason: `${title} currently supports Next.js, Vinext, TanStack Router, React Router, React Vite, Solid, or Astro`,
      };
    }
    if (
      ecosystem === "typescript" &&
      backend === "self" &&
      !frontend.includes("next") &&
      !frontend.includes("vinext")
    ) {
      return {
        isCompatible: false,
        reason: `${title} self-backend support currently requires Next.js or Vinext`,
      };
    }
    if (ecosystem === "rust" && rustFrontend && rustFrontend !== "none") {
      return {
        isCompatible: false,
        reason: `${title} for Rust currently supports server-only projects`,
      };
    }
    if (ecosystem === "java" && javaWebFramework && javaWebFramework !== "spring-boot") {
      return {
        isCompatible: false,
        reason: `${title} for Java currently requires Spring Boot`,
      };
    }
    if (
      ecosystem === "python" &&
      database &&
      database !== "none" &&
      database !== "sqlite" &&
      database !== "postgres" &&
      database !== "mongodb"
    ) {
      return {
        isCompatible: false,
        reason: `${title} for Python ORM projects currently supports SQLite, Postgres, or MongoDB`,
      };
    }
  }

  return { isCompatible: true };
}

export function getCompatibleAddons(
  allAddons: Addons[],
  frontend: Frontend[],
  existingAddons: Addons[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
  ecosystem?: Ecosystem,
  context?: Partial<ProjectConfig>,
) {
  const compatibleAddons = getCompatibleAddonsShared(allAddons, frontend, existingAddons, auth);

  return compatibleAddons.filter((addon) => {
    const { isCompatible } = validateAddonCompatibility(
      addon,
      frontend,
      auth,
      backend,
      runtime,
      ecosystem,
      context?.rustFrontend,
      context?.javaWebFramework,
      context?.database,
      api,
      context?.pythonWebFramework,
      context?.goWebFramework,
      context?.rustWebFramework,
      context?.rustApi,
      context?.goApi,
      context?.javaApi,
      hasJavaScriptWorkspaceRoot(context?.stackParts),
    );
    return isCompatible;
  });
}

export function validateAddonsAgainstFrontends(
  addons: Addons[] = [],
  frontends: Frontend[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  ecosystem?: Ecosystem,
  rustFrontend?: string,
  javaWebFramework?: string,
  database?: Database,
  api?: API,
  pythonWebFramework?: ProjectConfig["pythonWebFramework"],
  goWebFramework?: ProjectConfig["goWebFramework"],
  rustWebFramework?: ProjectConfig["rustWebFramework"],
  rustApi?: ProjectConfig["rustApi"],
  goApi?: ProjectConfig["goApi"],
  javaApi?: ProjectConfig["javaApi"],
  hasJavaScriptStackPart = false,
) {
  const workspaceRunners = new Set(
    addons.filter((addon) => ["turborepo", "nx", "vite-plus"].includes(addon)),
  );
  if (workspaceRunners.size > 1) {
    exitWithError("Turborepo, Nx, and Vite+ are alternative workspace runners. Choose one addon.");
  }

  for (const addon of addons) {
    if (addon === "none") continue;
    const { isCompatible, reason } = validateAddonCompatibility(
      addon,
      frontends,
      auth,
      backend,
      runtime,
      ecosystem,
      rustFrontend,
      javaWebFramework,
      database,
      api,
      pythonWebFramework,
      goWebFramework,
      rustWebFramework,
      rustApi,
      goApi,
      javaApi,
      hasJavaScriptStackPart,
    );
    if (!isCompatible) {
      exitWithError(`Incompatible addon/frontend combination: ${reason}`);
    }
  }
}

export function validatePaymentsCompatibility(
  payments: Payments | undefined,
  auth: Auth | undefined,
  backend: Backend | undefined,
  frontends: Frontend[] = [],
) {
  if (!payments || payments === "none") return;

  if (
    payments === "paypal" &&
    !frontends.some((frontend) => frontend !== "none" && isWebFrontend(frontend))
  ) {
    exitWithError(
      "PayPal requires a web frontend. Please choose a web frontend or a different payments provider.",
    );
  }

  if (payments === "paypal" && (backend === "none" || backend === "convex")) {
    exitWithError(
      "PayPal checkout requires a standalone or fullstack backend. Please choose a server backend or a different payments provider.",
    );
  }

  if (payments === "xendit" && (backend === "none" || backend === "convex")) {
    exitWithError(
      "Xendit Payment Sessions require a standalone or fullstack backend. Please choose a server backend or a different payments provider.",
    );
  }

  if (payments === "dodo" && frontends.includes("react-vite")) {
    exitWithError("Dodo Payments are not yet supported for React + Vite projects.");
  }

  if (payments === "polar") {
    if (
      !auth ||
      auth === "none" ||
      (auth !== "better-auth" && auth !== "better-auth-organizations")
    ) {
      exitWithError(
        "Polar payments requires Better Auth. Please use '--auth better-auth' or choose a different payments provider.",
      );
    }

    const { web } = splitFrontends(frontends);
    if (web.length === 0 && frontends.length > 0) {
      exitWithError(
        "Polar payments requires a web frontend or no frontend. Please select a web frontend or choose a different payments provider.",
      );
    }
  }

  if (payments === "revenuecat") {
    const { native } = splitFrontends(frontends);
    if (native.length === 0) {
      exitWithError(
        "RevenueCat payments requires a native frontend. Please select a native frontend or choose a different payments provider.",
      );
    }
  }
}

export function validateExamplesCompatibility(
  examples: string[] | undefined,
  backend: ProjectConfig["backend"] | undefined,
  frontend?: Frontend[],
  runtime?: Runtime,
  ai?: AI,
) {
  const examplesArr = examples ?? [];
  if (examplesArr.length === 0 || examplesArr.includes("none")) return;

  if (examplesArr.includes("tanstack-showcase")) {
    const showcaseFrontends: Frontend[] = ["tanstack-router", "tanstack-start"];
    const hasShowcaseFrontend = (frontend ?? []).some((f) => showcaseFrontends.includes(f));
    if (!hasShowcaseFrontend) {
      exitWithError(
        "The 'tanstack-showcase' example requires TanStack Router or TanStack Start frontend.",
      );
    }
  }

  if (examplesArr.includes("ai") && (frontend ?? []).includes("solid")) {
    exitWithError("The 'ai' example is not compatible with the Solid frontend.");
  }

  if (examplesArr.includes("ai") && (frontend ?? []).includes("solid-start")) {
    exitWithError("The 'ai' example is not compatible with the SolidStart frontend.");
  }

  // Convex AI example only supports React-based frontends
  if (examplesArr.includes("ai") && backend === "convex") {
    const frontendArr = frontend ?? [];
    const includesNuxt = frontendArr.includes("nuxt");
    const includesSvelte = frontendArr.includes("svelte");
    if (includesNuxt || includesSvelte) {
      exitWithError(
        "The 'ai' example with Convex backend only supports React-based frontends (Next.js, TanStack Router, TanStack Start, React Router, React + Vite). Svelte and Nuxt are not supported with Convex AI.",
      );
    }
  }

  if (examplesArr.includes("chat-sdk")) {
    const frontendArr = frontend ?? [];

    if (frontendArr.includes("react-vite")) {
      exitWithError("The 'chat-sdk' example is not yet supported for React + Vite projects.");
    }

    if (!isExampleChatSdkAllowed(backend, frontendArr, runtime)) {
      if (backend === "none") {
        exitWithError("The 'chat-sdk' example requires a backend.");
      }

      if (backend === "convex") {
        exitWithError(
          "The 'chat-sdk' example is not supported with the Convex backend in v1. Use self backend (Next.js, TanStack Start, Nuxt) or Hono with Node runtime.",
        );
      }

      if (backend === "self") {
        exitWithError(
          "The 'chat-sdk' example with self backend only supports Next.js, TanStack Start, or Nuxt frontends in v1.",
        );
      }

      if (backend === "hono" && runtime !== "node") {
        exitWithError(
          "The 'chat-sdk' example with Hono requires '--runtime node' in v1 (Bun/Workers not supported yet).",
        );
      }

      exitWithError(
        "The 'chat-sdk' example is only supported with self backend (Next.js, TanStack Start, Nuxt) or Hono with Node runtime in v1.",
      );
    }

    if (requiresChatSdkVercelAI(backend, frontendArr, runtime) && ai && ai !== "vercel-ai") {
      exitWithError(
        "The 'chat-sdk' example requires '--ai vercel-ai' for the selected stack in v1 (Nuxt Discord and Hono GitHub profiles).",
      );
    }
  }
}

/**
 * Validates that TanStack AI is only used with compatible frontends (React or Solid).
 * Server-side @tanstack/ai core works anywhere, but client adapters only exist for React and Solid.
 */
export function validateAIFrontendCompatibility(ai: AI | undefined, frontends: Frontend[] = []) {
  const issue = getAIFrontendCompatibilityIssue(ai, frontends);
  if (!issue) return;

  exitWithError(issue.message);
}

export function validateAIBackendCompatibility(ai: AI | undefined, backend: Backend | undefined) {
  if (
    ai &&
    ["openai-sdk", "anthropic-sdk"].includes(ai) &&
    (backend === "none" || backend === "convex")
  ) {
    exitWithError(
      "Direct AI provider SDKs require a standalone or fullstack backend. Please choose a server backend or another AI integration.",
    );
  }
}

export function validateRealtimeCompatibility(
  realtime: ProjectConfig["realtime"] | undefined,
  backend: Backend | undefined,
) {
  if (realtime === "ws" && backend !== "express") {
    exitWithError("The ws integration is currently wired for the Express backend.");
  }
}

export function validateCSSFrameworkFrontendCompatibility(
  cssFramework: CSSFramework | undefined,
  frontends: Frontend[] = [],
) {
  if (cssFramework !== "styled-components") return;

  const reactFrontends: Frontend[] = [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "vinext",
    "redwood",
  ];
  if (!frontends.some((frontend) => reactFrontends.includes(frontend))) {
    exitWithError("styled-components requires a React frontend.");
  }
}

/**
 * Validates that a UI library is compatible with the selected frontend(s)
 */
export function validateUILibraryFrontendCompatibility(
  uiLibrary: UILibrary | undefined,
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
) {
  if (!uiLibrary || uiLibrary === "none") return;
  const { web } = splitFrontends(frontends);
  if (web.length === 0) return;

  const compatible = getCompatibleUILibrariesShared(frontends, astroIntegration);
  if (!compatible.includes(uiLibrary)) {
    const hasAstroWebFrontend = web.includes("astro");
    const isAstroNonReact = hasAstroWebFrontend && astroIntegration !== "react";
    const supportsAstroReact = getCompatibleUILibrariesShared(["astro"], "react").includes(
      uiLibrary,
    );

    if (isAstroNonReact && supportsAstroReact) {
      incompatibilityError({
        message: `UI library '${uiLibrary}' requires React.`,
        provided: { "ui-library": uiLibrary, "astro-integration": astroIntegration || "none" },
        suggestions: [
          "Use --astro-integration react",
          "Choose a different UI library (daisyui, ark-ui)",
        ],
      });
      return;
    }

    incompatibilityError({
      message: `UI library '${uiLibrary}' is not compatible with the selected frontend.`,
      provided: { "ui-library": uiLibrary, frontend: frontends },
      suggestions: [
        `Supported choices for this stack: ${compatible.join(", ")}`,
        "Choose a different UI library",
      ],
    });
  }
}

/**
 * Validates that a UI library is compatible with the selected CSS framework
 */
export function validateUILibraryCSSFrameworkCompatibility(
  uiLibrary: UILibrary | undefined,
  cssFramework: CSSFramework | undefined,
) {
  if (!uiLibrary || uiLibrary === "none") return;
  if (!cssFramework) return;

  const supported = getCompatibleCSSFrameworksShared(uiLibrary);
  if (!supported.includes(cssFramework)) {
    const supportedList = supported.join(", ");
    exitWithError(
      `UI library '${uiLibrary}' is not compatible with '${cssFramework}' CSS framework. Supported CSS frameworks: ${supportedList}`,
    );
  }
}

/**
 * Gets list of UI libraries compatible with the selected frontend(s)
 */
export function getCompatibleUILibraries(
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
): UILibrary[] {
  return getCompatibleUILibrariesShared(frontends, astroIntegration);
}

/**
 * Gets list of CSS frameworks compatible with the selected UI library
 */
export function getCompatibleCSSFrameworks(
  uiLibrary: UILibrary | undefined,
  frontends: Frontend[] = [],
): CSSFramework[] {
  return getCompatibleCSSFrameworksShared(uiLibrary, frontends);
}

/**
 * Checks if a frontend has web styling (excludes native-only frontends)
 */
export function hasWebStyling(frontends: Frontend[] = []): boolean {
  return hasWebStylingShared(frontends);
}

export function validateRustExpansionCompatibility(config: Partial<ProjectConfig>) {
  if (config.ecosystem !== "rust") return;

  const framework = config.rustWebFramework ?? "none";
  const api = config.rustApi ?? "none";
  const auth = config.rustAuth ?? "none";

  if ((framework === "warp" || framework === "salvo") && !["none", "jsonrpsee"].includes(api)) {
    incompatibilityError({
      message: "Warp and Salvo currently support REST or the standalone jsonrpsee server.",
      provided: { "rust-web-framework": framework, "rust-api": api },
      suggestions: [
        "Use --rust-api jsonrpsee or --rust-api none",
        "Use Axum, Actix Web, Rocket, or Poem for Tonic/async-graphql",
      ],
    });
  }

  if (framework === "loco" && api === "jsonrpsee") {
    incompatibilityError({
      message:
        "Loco owns the server boot sequence and cannot start the generated jsonrpsee server.",
      provided: { "rust-web-framework": framework, "rust-api": api },
      suggestions: ["Use --rust-api none", "Choose Axum, Actix Web, Rocket, Poem, Warp, or Salvo"],
    });
  }

  if (auth === "tower-sessions" && framework !== "axum") {
    incompatibilityError({
      message: "The generated tower-sessions middleware is wired specifically for Axum.",
      provided: { "rust-web-framework": framework, "rust-auth": auth },
      suggestions: ["Use --rust-web-framework axum", "Choose --rust-auth openidconnect or none"],
    });
  }

  const orm = config.rustOrm ?? "none";
  if (auth === "torii" && orm === "rusqlite") {
    // Torii's SQLite storage pins sqlx 0.8.0 (libsqlite3-sys 0.28) while the
    // rusqlite template uses libsqlite3-sys 0.36; cargo allows only one crate
    // in the graph to link the native sqlite3 library, so this pair can never
    // resolve.
    incompatibilityError({
      message:
        "Torii's sqlx-based SQLite storage conflicts with rusqlite: both link the native sqlite3 library and cargo permits only one linker.",
      provided: { "rust-orm": orm, "rust-auth": auth },
      suggestions: [
        "Use --rust-orm sqlx, sea-orm, or diesel with Torii",
        "Choose --rust-auth none",
      ],
    });
  }
}
