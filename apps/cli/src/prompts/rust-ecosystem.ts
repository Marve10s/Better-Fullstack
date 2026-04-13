import type {
  RustApi,
  RustAuth,
  RustCli,
  RustErrorHandling,
  RustCaching,
  RustFrontend,
  RustLibraries,
  RustLogging,
  RustOrm,
  RustWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";

const RUST_WEB_FRAMEWORK_PROMPT_OPTIONS: PromptOption<RustWebFramework>[] = [
  {
    value: "axum",
    label: "Axum",
    hint: "Ergonomic and modular web framework from Tokio",
  },
  {
    value: "actix-web",
    label: "Actix Web",
    hint: "Powerful, pragmatic, and extremely fast web framework",
  },
  {
    value: "rocket",
    label: "Rocket",
    hint: "Convention-over-configuration web framework, 25k+ stars",
  },
  {
    value: "none",
    label: "None",
    hint: "No web framework",
  },
];

const RUST_FRONTEND_PROMPT_OPTIONS: PromptOption<RustFrontend>[] = [
  {
    value: "leptos",
    label: "Leptos",
    hint: "Build fast web applications with Rust",
  },
  {
    value: "dioxus",
    label: "Dioxus",
    hint: "Fullstack, cross-platform UI library for Rust",
  },
  {
    value: "none",
    label: "None",
    hint: "No Rust frontend (API only)",
  },
];

const RUST_ORM_PROMPT_OPTIONS: PromptOption<RustOrm>[] = [
  {
    value: "sea-orm",
    label: "SeaORM",
    hint: "Async & dynamic ORM for Rust",
  },
  {
    value: "sqlx",
    label: "SQLx",
    hint: "Async SQL toolkit with compile-time checked queries",
  },
  {
    value: "diesel",
    label: "Diesel",
    hint: "Safe, extensible ORM with compile-time query validation",
  },
  {
    value: "none",
    label: "None",
    hint: "No database layer",
  },
];

const RUST_API_PROMPT_OPTIONS: PromptOption<RustApi>[] = [
  {
    value: "tonic",
    label: "Tonic",
    hint: "gRPC implementation for Rust",
  },
  {
    value: "async-graphql",
    label: "async-graphql",
    hint: "High-performance GraphQL server library",
  },
  {
    value: "none",
    label: "None",
    hint: "REST API only",
  },
];

const RUST_CLI_PROMPT_OPTIONS: PromptOption<RustCli>[] = [
  {
    value: "clap",
    label: "Clap",
    hint: "Command Line Argument Parser for Rust",
  },
  {
    value: "ratatui",
    label: "Ratatui",
    hint: "Build rich terminal user interfaces",
  },
  {
    value: "none",
    label: "None",
    hint: "No CLI tools",
  },
];

const RUST_LIBRARIES_PROMPT_OPTIONS: PromptOption<RustLibraries>[] = [
  {
    value: "serde",
    label: "Serde",
    hint: "Serialization framework for Rust",
  },
  {
    value: "validator",
    label: "Validator",
    hint: "Struct validation derive macros",
  },
  {
    value: "jsonwebtoken",
    label: "jsonwebtoken",
    hint: "JWT encoding/decoding library",
  },
  {
    value: "argon2",
    label: "Argon2",
    hint: "Password hashing library",
  },
  {
    value: "tokio-test",
    label: "Tokio Test",
    hint: "Testing utilities for Tokio",
  },
  {
    value: "mockall",
    label: "Mockall",
    hint: "Powerful mocking library for Rust",
  },
];

const RUST_LOGGING_PROMPT_OPTIONS: PromptOption<RustLogging>[] = [
  {
    value: "tracing",
    label: "Tracing",
    hint: "Structured, composable instrumentation framework from Tokio",
  },
  {
    value: "env-logger",
    label: "env_logger",
    hint: "Simple logger configured via environment variables",
  },
  {
    value: "none",
    label: "None",
    hint: "No logging library",
  },
];

const RUST_ERROR_HANDLING_PROMPT_OPTIONS: PromptOption<RustErrorHandling>[] = [
  {
    value: "anyhow-thiserror",
    label: "anyhow + thiserror",
    hint: "anyhow for application errors, thiserror for custom error types",
  },
  {
    value: "eyre",
    label: "eyre + color-eyre",
    hint: "Customizable error reports with pretty backtraces via color-eyre",
  },
  {
    value: "none",
    label: "None",
    hint: "No error handling library (uses standard library only)",
  },
];

const RUST_CACHING_PROMPT_OPTIONS: PromptOption<RustCaching>[] = [
  {
    value: "moka",
    label: "Moka",
    hint: "High-performance concurrent in-memory cache (Caffeine-inspired)",
  },
  {
    value: "redis",
    label: "Redis",
    hint: "Redis client with async support and connection pooling",
  },
  {
    value: "none",
    label: "None",
    hint: "No caching library",
  },
];

export function resolveRustWebFrameworkPrompt(rustWebFramework?: RustWebFramework) {
  return createStaticSinglePromptResolution(
    RUST_WEB_FRAMEWORK_PROMPT_OPTIONS,
    "axum",
    rustWebFramework,
  );
}

export async function getRustWebFrameworkChoice(rustWebFramework?: RustWebFramework) {
  const resolution = resolveRustWebFrameworkPrompt(rustWebFramework);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustWebFramework>({
    message: "Select Rust web framework",
    options: resolution.options,
    initialValue: resolution.initialValue as RustWebFramework,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustFrontendPrompt(rustFrontend?: RustFrontend) {
  return createStaticSinglePromptResolution(
    RUST_FRONTEND_PROMPT_OPTIONS,
    "none",
    rustFrontend,
  );
}

export async function getRustFrontendChoice(rustFrontend?: RustFrontend) {
  const resolution = resolveRustFrontendPrompt(rustFrontend);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustFrontend>({
    message: "Select Rust frontend framework",
    options: resolution.options,
    initialValue: resolution.initialValue as RustFrontend,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustOrmPrompt(rustOrm?: RustOrm) {
  return createStaticSinglePromptResolution(RUST_ORM_PROMPT_OPTIONS, "none", rustOrm);
}

export async function getRustOrmChoice(rustOrm?: RustOrm) {
  const resolution = resolveRustOrmPrompt(rustOrm);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustOrm>({
    message: "Select Rust ORM/database layer",
    options: resolution.options,
    initialValue: resolution.initialValue as RustOrm,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustApiPrompt(rustApi?: RustApi) {
  return createStaticSinglePromptResolution(RUST_API_PROMPT_OPTIONS, "none", rustApi);
}

export async function getRustApiChoice(rustApi?: RustApi) {
  const resolution = resolveRustApiPrompt(rustApi);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustApi>({
    message: "Select Rust API layer",
    options: resolution.options,
    initialValue: resolution.initialValue as RustApi,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustCliPrompt(rustCli?: RustCli) {
  return createStaticSinglePromptResolution(RUST_CLI_PROMPT_OPTIONS, "none", rustCli);
}

export async function getRustCliChoice(rustCli?: RustCli) {
  const resolution = resolveRustCliPrompt(rustCli);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustCli>({
    message: "Select Rust CLI tools",
    options: resolution.options,
    initialValue: resolution.initialValue as RustCli,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustLibrariesPrompt(rustLibraries?: RustLibraries[]) {
  return createStaticMultiPromptResolution(
    RUST_LIBRARIES_PROMPT_OPTIONS,
    ["serde"],
    rustLibraries,
  );
}

export async function getRustLibrariesChoice(rustLibraries?: RustLibraries[]) {
  const resolution = resolveRustLibrariesPrompt(rustLibraries);
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as RustLibraries[]) ?? [];
  }

  const response = await navigableMultiselect({
    message: "Select Rust libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as RustLibraries[],
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response as RustLibraries[];
}

export function resolveRustLoggingPrompt(rustLogging?: RustLogging) {
  return createStaticSinglePromptResolution(
    RUST_LOGGING_PROMPT_OPTIONS,
    "tracing",
    rustLogging,
  );
}

export async function getRustLoggingChoice(rustLogging?: RustLogging) {
  const resolution = resolveRustLoggingPrompt(rustLogging);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustLogging>({
    message: "Select Rust logging library",
    options: resolution.options,
    initialValue: resolution.initialValue as RustLogging,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustErrorHandlingPrompt(rustErrorHandling?: RustErrorHandling) {
  return createStaticSinglePromptResolution(
    RUST_ERROR_HANDLING_PROMPT_OPTIONS,
    "anyhow-thiserror",
    rustErrorHandling,
  );
}

export async function getRustErrorHandlingChoice(rustErrorHandling?: RustErrorHandling) {
  const resolution = resolveRustErrorHandlingPrompt(rustErrorHandling);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustErrorHandling>({
    message: "Select Rust error handling library",
    options: resolution.options,
    initialValue: resolution.initialValue as RustErrorHandling,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveRustCachingPrompt(rustCaching?: RustCaching) {
  return createStaticSinglePromptResolution(
    RUST_CACHING_PROMPT_OPTIONS,
    "none",
    rustCaching,
  );
}

export async function getRustCachingChoice(rustCaching?: RustCaching) {
  const resolution = resolveRustCachingPrompt(rustCaching);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RustCaching>({
    message: "Select Rust caching library",
    options: resolution.options,
    initialValue: resolution.initialValue as RustCaching,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export async function getRustAuthChoice(rustAuth?: RustAuth) {
  if (rustAuth !== undefined) return rustAuth;

  const options = [
    {
      value: "oauth2" as const,
      label: "OAuth2",
      hint: "OAuth2 client with authorization code, PKCE, and token exchange flows",
    },
    {
      value: "none" as const,
      label: "None",
      hint: "No authentication library",
    },
  ];

  const response = await navigableSelect<RustAuth>({
    message: "Select Rust authentication library",
    options,
    initialValue: "none",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
