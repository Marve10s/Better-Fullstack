import {
  AI_VALUES,
  ANIMATION_VALUES,
  API_VALUES,
  ASTRO_INTEGRATION_VALUES,
  AUTH_VALUES,
  type Auth,
  BACKEND_VALUES,
  CACHING_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_SETUP_VALUES,
  DATABASE_VALUES,
  EMAIL_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_CLI_VALUES,
  GO_LOGGING_VALUES,
  GO_ORM_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PAYMENTS_VALUES,
  PYTHON_AI_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  REALTIME_VALUES,
  RUNTIME_VALUES,
  RUST_API_VALUES,
  RUST_CLI_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  STATE_MANAGEMENT_VALUES,
  TESTING_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  type API,
  type AstroIntegration,
  type Backend,
  type Frontend,
  getSupportedCapabilityOptions,
  type Runtime,
} from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { allowedApisForFrontends, isFrontendAllowedWithBackend } from "../utils/compatibility-rules";
import type { PromptOption, PromptResolution } from "./prompt-contract";

type SingleOrMultiValue = string | string[];

type PromptContractEntry<TValue extends SingleOrMultiValue, TContext = Record<string, never>> = {
  schemaValues: readonly string[];
  resolve: (context?: TContext) => PromptResolution<string>;
  coverageContexts: TContext[];
};

function option(value: string, label = value): PromptOption<string> {
  return { value, label };
}

function options(values: readonly string[]): PromptOption<string>[] {
  return values.map((value) => option(value));
}

function resolveStaticSinglePrompt(
  values: readonly string[],
  initialValue: string,
  selectedValue?: string,
): PromptResolution<string> {
  return selectedValue !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: options(values),
        autoValue: selectedValue,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: options(values),
        initialValue,
      };
}

type FrontendPromptContext = {
  frontendOptions?: Frontend[];
  backend?: Backend;
  auth?: string;
};

export function resolveFrontendPrompt(
  context: FrontendPromptContext = {},
): PromptResolution<string> {
  const availableOptions = FRONTEND_VALUES.filter(
    (value) => value !== "none" && isFrontendAllowedWithBackend(value, context.backend, context.auth),
  );

  return context.frontendOptions !== undefined
    ? {
        shouldPrompt: false,
        mode: "multiple",
        options: options(availableOptions),
        autoValue: context.frontendOptions,
      }
    : {
        shouldPrompt: true,
        mode: "multiple",
        options: options(availableOptions),
        initialValue: DEFAULT_CONFIG.frontend,
      };
}

type BackendPromptContext = {
  backendFramework?: Backend;
  frontends?: Frontend[];
};

export function resolveBackendPrompt(
  context: BackendPromptContext = {},
): PromptResolution<string> {
  const fullstackFrontends = new Set(["next", "tanstack-start", "astro", "nuxt", "svelte", "solid-start"]);
  const hasIncompatibleFrontend = context.frontends?.some(
    (frontend) => frontend === "solid" || frontend === "solid-start",
  );
  const hasFullstackFrontend = context.frontends?.some((frontend) => fullstackFrontends.has(frontend));
  const backendOptions = [
    ...(hasFullstackFrontend ? ["self"] : []),
    "hono",
    "express",
    "fastify",
    "elysia",
    "fets",
    "nestjs",
    "adonisjs",
    "nitro",
    "encore",
    ...(!hasIncompatibleFrontend ? ["convex"] : []),
    "none",
  ];

  return context.backendFramework !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: options(backendOptions),
        autoValue: context.backendFramework,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: options(backendOptions),
        initialValue: hasFullstackFrontend ? "self" : DEFAULT_CONFIG.backend,
      };
}

type RuntimePromptContext = {
  runtime?: Runtime;
  backend?: Backend;
};

export function resolveRuntimePrompt(
  context: RuntimePromptContext = {},
): PromptResolution<string> {
  if (context.backend === "convex" || context.backend === "none" || context.backend === "self") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const runtimeOptions = [
    "bun",
    "node",
    ...(context.backend === "hono" ? ["workers"] : []),
  ];

  return context.runtime !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: options(runtimeOptions),
        autoValue: context.runtime,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: options(runtimeOptions),
        initialValue: DEFAULT_CONFIG.runtime,
      };
}

type ApiPromptContext = {
  api?: API;
  frontend?: Frontend[];
  backend?: Backend;
  astroIntegration?: AstroIntegration;
};

export function resolveApiPrompt(context: ApiPromptContext = {}): PromptResolution<string> {
  if (context.backend === "convex" || context.backend === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const allowedOptions = allowedApisForFrontends(context.frontend ?? [], context.astroIntegration);

  if (context.api !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: options(allowedOptions),
      autoValue: allowedOptions.includes(context.api) ? context.api : allowedOptions[0] ?? "none",
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options: options(allowedOptions),
    initialValue: allowedOptions[0] ?? "none",
  };
}

type AuthPromptContext = {
  auth?: Auth;
  backend?: Backend;
  frontend?: string[];
  ecosystem?: "typescript" | "go";
};

export function resolveAuthPrompt(context: AuthPromptContext = {}): PromptResolution<string> {
  const authOptionOrder = [
    "better-auth",
    "go-better-auth",
    "clerk",
    "nextauth",
    "stack-auth",
    "supabase-auth",
    "auth0",
    "none",
  ] as const satisfies readonly Auth[];
  const supportedOptions = getSupportedCapabilityOptions("auth", {
    ecosystem: context.ecosystem ?? "typescript",
    backend: context.backend,
    frontend: context.frontend,
  });
  const orderedOptions = authOptionOrder.filter((value) =>
    supportedOptions.some((option) => option.id === value),
  );

  if (context.auth !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: options(orderedOptions),
      autoValue: context.auth,
    };
  }

  if (orderedOptions.length === 1 && orderedOptions[0] === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: options(orderedOptions),
      autoValue: "none",
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options: supportedOptions
      .filter((supportedOption) => orderedOptions.includes(supportedOption.id as Auth))
      .map((supportedOption) => ({
        value: supportedOption.id,
        label: supportedOption.label,
        hint: supportedOption.promptHint,
      })),
    initialValue: orderedOptions.includes(DEFAULT_CONFIG.auth)
      ? DEFAULT_CONFIG.auth
      : (orderedOptions.find((value) => value !== "none") ?? "none"),
  };
}

type ResolverRegistry = {
  [key: string]: PromptContractEntry<any, any>;
};

export const PROMPT_RESOLVER_REGISTRY: ResolverRegistry = {
  frontend: {
    schemaValues: FRONTEND_VALUES,
    resolve: resolveFrontendPrompt,
    coverageContexts: [{ backend: "hono" }, { frontendOptions: ["none"] }],
  },
  backend: {
    schemaValues: BACKEND_VALUES,
    resolve: resolveBackendPrompt,
    coverageContexts: [{ frontends: ["next"] }],
  },
  ai: {
    schemaValues: AI_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(AI_VALUES, DEFAULT_CONFIG.ai, value),
    coverageContexts: [{}],
  },
  animation: {
    schemaValues: ANIMATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(ANIMATION_VALUES, DEFAULT_CONFIG.animation, value),
    coverageContexts: [{}],
  },
  api: {
    schemaValues: API_VALUES,
    resolve: resolveApiPrompt,
    coverageContexts: [
      { frontend: ["next"], backend: "hono" },
      { backend: "convex" },
    ],
  },
  auth: {
    schemaValues: AUTH_VALUES,
    resolve: resolveAuthPrompt,
    coverageContexts: [
      { ecosystem: "typescript", backend: "self", frontend: ["next"] },
      { ecosystem: "go", backend: "none", frontend: [] },
    ],
  },
  caching: {
    schemaValues: CACHING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(CACHING_VALUES, DEFAULT_CONFIG.caching, value),
    coverageContexts: [{}],
  },
  cms: {
    schemaValues: CMS_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(CMS_VALUES, DEFAULT_CONFIG.cms, value),
    coverageContexts: [{}],
  },
  cssFramework: {
    schemaValues: CSS_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(CSS_FRAMEWORK_VALUES, DEFAULT_CONFIG.cssFramework, value),
    coverageContexts: [{}],
  },
  database: {
    schemaValues: DATABASE_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(DATABASE_VALUES, DEFAULT_CONFIG.database, value),
    coverageContexts: [{}],
  },
  dbSetup: {
    schemaValues: DATABASE_SETUP_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(DATABASE_SETUP_VALUES, DEFAULT_CONFIG.dbSetup, value),
    coverageContexts: [{}],
  },
  email: {
    schemaValues: EMAIL_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(EMAIL_VALUES, DEFAULT_CONFIG.email, value),
    coverageContexts: [{}],
  },
  fileUpload: {
    schemaValues: FILE_UPLOAD_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(FILE_UPLOAD_VALUES, DEFAULT_CONFIG.fileUpload, value),
    coverageContexts: [{}],
  },
  forms: {
    schemaValues: FORMS_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(FORMS_VALUES, DEFAULT_CONFIG.forms, value),
    coverageContexts: [{}],
  },
  jobQueue: {
    schemaValues: JOB_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(JOB_QUEUE_VALUES, DEFAULT_CONFIG.jobQueue, value),
    coverageContexts: [{}],
  },
  logging: {
    schemaValues: LOGGING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(LOGGING_VALUES, DEFAULT_CONFIG.logging, value),
    coverageContexts: [{}],
  },
  observability: {
    schemaValues: OBSERVABILITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(OBSERVABILITY_VALUES, DEFAULT_CONFIG.observability, value),
    coverageContexts: [{}],
  },
  orm: {
    schemaValues: ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(ORM_VALUES, DEFAULT_CONFIG.orm, value),
    coverageContexts: [{}],
  },
  payments: {
    schemaValues: PAYMENTS_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(PAYMENTS_VALUES, DEFAULT_CONFIG.payments, value),
    coverageContexts: [{}],
  },
  realtime: {
    schemaValues: REALTIME_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(REALTIME_VALUES, DEFAULT_CONFIG.realtime, value),
    coverageContexts: [{}],
  },
  runtime: {
    schemaValues: RUNTIME_VALUES,
    resolve: resolveRuntimePrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "self" }],
  },
  stateManagement: {
    schemaValues: STATE_MANAGEMENT_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(
        STATE_MANAGEMENT_VALUES,
        DEFAULT_CONFIG.stateManagement,
        value,
      ),
    coverageContexts: [{}],
  },
  testing: {
    schemaValues: TESTING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(TESTING_VALUES, DEFAULT_CONFIG.testing, value),
    coverageContexts: [{}],
  },
  uiLibrary: {
    schemaValues: UI_LIBRARY_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(UI_LIBRARY_VALUES, DEFAULT_CONFIG.uiLibrary, value),
    coverageContexts: [{}],
  },
  validation: {
    schemaValues: VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(VALIDATION_VALUES, DEFAULT_CONFIG.validation, value),
    coverageContexts: [{}],
  },
  astroIntegration: {
    schemaValues: ASTRO_INTEGRATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(
        ASTRO_INTEGRATION_VALUES,
        DEFAULT_CONFIG.astroIntegration ?? "none",
        value,
      ),
    coverageContexts: [{}],
  },
  rustWebFramework: {
    schemaValues: RUST_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_WEB_FRAMEWORK_VALUES, "axum", value),
    coverageContexts: [{}],
  },
  rustFrontend: {
    schemaValues: RUST_FRONTEND_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_FRONTEND_VALUES, "none", value),
    coverageContexts: [{}],
  },
  rustOrm: {
    schemaValues: RUST_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_ORM_VALUES, "none", value),
    coverageContexts: [{}],
  },
  rustApi: {
    schemaValues: RUST_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_API_VALUES, "none", value),
    coverageContexts: [{}],
  },
  rustCli: {
    schemaValues: RUST_CLI_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_CLI_VALUES, "none", value),
    coverageContexts: [{}],
  },
  rustLogging: {
    schemaValues: RUST_LOGGING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_LOGGING_VALUES, "tracing", value),
    coverageContexts: [{}],
  },
  rustErrorHandling: {
    schemaValues: RUST_ERROR_HANDLING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(RUST_ERROR_HANDLING_VALUES, "anyhow-thiserror", value),
    coverageContexts: [{}],
  },
  rustLibraries: {
    schemaValues: RUST_LIBRARIES_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) =>
      value !== undefined
        ? {
            shouldPrompt: false,
            mode: "multiple",
            options: options(RUST_LIBRARIES_VALUES.filter((entry) => entry !== "none")),
            autoValue: value,
          }
        : {
            shouldPrompt: true,
            mode: "multiple",
            options: options(RUST_LIBRARIES_VALUES.filter((entry) => entry !== "none")),
            initialValue: ["serde"],
          },
    coverageContexts: [{}, { value: ["none"] }],
  },
  pythonWebFramework: {
    schemaValues: PYTHON_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(PYTHON_WEB_FRAMEWORK_VALUES, "fastapi", value),
    coverageContexts: [{}],
  },
  pythonOrm: {
    schemaValues: PYTHON_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(PYTHON_ORM_VALUES, "sqlalchemy", value),
    coverageContexts: [{}],
  },
  pythonValidation: {
    schemaValues: PYTHON_VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(PYTHON_VALIDATION_VALUES, "pydantic", value),
    coverageContexts: [{}],
  },
  pythonAi: {
    schemaValues: PYTHON_AI_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) =>
      value !== undefined
        ? {
            shouldPrompt: false,
            mode: "multiple",
            options: options(PYTHON_AI_VALUES),
            autoValue: value,
          }
        : {
            shouldPrompt: true,
            mode: "multiple",
            options: options(PYTHON_AI_VALUES),
            initialValue: [],
          },
    coverageContexts: [{}, { value: ["none"] }],
  },
  pythonTaskQueue: {
    schemaValues: PYTHON_TASK_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(PYTHON_TASK_QUEUE_VALUES, "none", value),
    coverageContexts: [{}],
  },
  pythonQuality: {
    schemaValues: PYTHON_QUALITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(PYTHON_QUALITY_VALUES, "ruff", value),
    coverageContexts: [{}],
  },
  goWebFramework: {
    schemaValues: GO_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(GO_WEB_FRAMEWORK_VALUES, "gin", value),
    coverageContexts: [{}],
  },
  goOrm: {
    schemaValues: GO_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(GO_ORM_VALUES, "gorm", value),
    coverageContexts: [{}],
  },
  goApi: {
    schemaValues: GO_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(GO_API_VALUES, "none", value),
    coverageContexts: [{}],
  },
  goCli: {
    schemaValues: GO_CLI_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(GO_CLI_VALUES, "none", value),
    coverageContexts: [{}],
  },
  goLogging: {
    schemaValues: GO_LOGGING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveStaticSinglePrompt(GO_LOGGING_VALUES, "zap", value),
    coverageContexts: [{}],
  },
};
