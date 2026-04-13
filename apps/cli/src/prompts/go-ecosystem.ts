import type { GoApi, GoAuth, GoCli, GoLogging, GoOrm, GoWebFramework } from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const GO_WEB_FRAMEWORK_PROMPT_OPTIONS: PromptOption<GoWebFramework>[] = [
  {
    value: "gin",
    label: "Gin",
    hint: "High-performance HTTP web framework with martini-like API",
  },
  {
    value: "echo",
    label: "Echo",
    hint: "High performance, minimalist Go web framework",
  },
  {
    value: "fiber",
    label: "Fiber",
    hint: "Express-inspired web framework built on Fasthttp",
  },
  {
    value: "chi",
    label: "Chi",
    hint: "Lightweight, zero-dependency router built on net/http",
  },
  {
    value: "none",
    label: "None",
    hint: "No web framework",
  },
];

const GO_ORM_PROMPT_OPTIONS: PromptOption<GoOrm>[] = [
  {
    value: "gorm",
    label: "GORM",
    hint: "The fantastic ORM library for Golang",
  },
  {
    value: "sqlc",
    label: "sqlc",
    hint: "Generate type-safe Go code from SQL",
  },
  {
    value: "ent",
    label: "Ent",
    hint: "Code-first ORM by Meta with graph traversal API, 15k+ stars",
  },
  {
    value: "none",
    label: "None",
    hint: "No ORM/database layer",
  },
];

const GO_API_PROMPT_OPTIONS: PromptOption<GoApi>[] = [
  {
    value: "grpc-go",
    label: "gRPC-Go",
    hint: "The Go implementation of gRPC",
  },
  {
    value: "none",
    label: "None",
    hint: "No API layer",
  },
];

const GO_CLI_PROMPT_OPTIONS: PromptOption<GoCli>[] = [
  {
    value: "cobra",
    label: "Cobra",
    hint: "Library for creating powerful modern CLI applications",
  },
  {
    value: "bubbletea",
    label: "Bubble Tea",
    hint: "Powerful TUI framework based on The Elm Architecture",
  },
  {
    value: "none",
    label: "None",
    hint: "No CLI tools",
  },
];

const GO_LOGGING_PROMPT_OPTIONS: PromptOption<GoLogging>[] = [
  {
    value: "zap",
    label: "Zap",
    hint: "Blazing fast, structured, leveled logging in Go",
  },
  {
    value: "zerolog",
    label: "Zerolog",
    hint: "Zero-allocation JSON logger, fastest in benchmarks",
  },
  {
    value: "slog",
    label: "slog",
    hint: "Go 1.21+ stdlib structured logging (no external dependency)",
  },
  {
    value: "none",
    label: "None",
    hint: "No logging library",
  },
];

const GO_AUTH_PROMPT_OPTIONS: PromptOption<GoAuth>[] = [
  {
    value: "casbin",
    label: "Casbin",
    hint: "Model-based authorization (ACL, RBAC, ABAC) via config files",
  },
  {
    value: "jwt",
    label: "golang-jwt",
    hint: "JWT token creation and validation with HMAC/RSA/ECDSA signing",
  },
  {
    value: "none",
    label: "None",
    hint: "No authentication library",
  },
];

export function resolveGoWebFrameworkPrompt(goWebFramework?: GoWebFramework) {
  return createStaticSinglePromptResolution(
    GO_WEB_FRAMEWORK_PROMPT_OPTIONS,
    "gin",
    goWebFramework,
  );
}

export async function getGoWebFrameworkChoice(goWebFramework?: GoWebFramework) {
  const resolution = resolveGoWebFrameworkPrompt(goWebFramework);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoWebFramework>({
    message: "Select Go web framework",
    options: resolution.options,
    initialValue: resolution.initialValue as GoWebFramework,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoOrmPrompt(goOrm?: GoOrm) {
  return createStaticSinglePromptResolution(GO_ORM_PROMPT_OPTIONS, "gorm", goOrm);
}

export async function getGoOrmChoice(goOrm?: GoOrm) {
  const resolution = resolveGoOrmPrompt(goOrm);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoOrm>({
    message: "Select Go ORM/database layer",
    options: resolution.options,
    initialValue: resolution.initialValue as GoOrm,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoApiPrompt(goApi?: GoApi) {
  return createStaticSinglePromptResolution(GO_API_PROMPT_OPTIONS, "none", goApi);
}

export async function getGoApiChoice(goApi?: GoApi) {
  const resolution = resolveGoApiPrompt(goApi);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoApi>({
    message: "Select Go API layer",
    options: resolution.options,
    initialValue: resolution.initialValue as GoApi,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoCliPrompt(goCli?: GoCli) {
  return createStaticSinglePromptResolution(GO_CLI_PROMPT_OPTIONS, "none", goCli);
}

export async function getGoCliChoice(goCli?: GoCli) {
  const resolution = resolveGoCliPrompt(goCli);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoCli>({
    message: "Select Go CLI tools",
    options: resolution.options,
    initialValue: resolution.initialValue as GoCli,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoLoggingPrompt(goLogging?: GoLogging) {
  return createStaticSinglePromptResolution(GO_LOGGING_PROMPT_OPTIONS, "zap", goLogging);
}

export async function getGoLoggingChoice(goLogging?: GoLogging) {
  const resolution = resolveGoLoggingPrompt(goLogging);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoLogging>({
    message: "Select Go logging library",
    options: resolution.options,
    initialValue: resolution.initialValue as GoLogging,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoAuthPrompt(goAuth?: GoAuth) {
  return createStaticSinglePromptResolution(GO_AUTH_PROMPT_OPTIONS, "none", goAuth);
}

export async function getGoAuthChoice(goAuth?: GoAuth) {
  const resolution = resolveGoAuthPrompt(goAuth);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoAuth>({
    message: "Select Go authentication library",
    options: resolution.options,
    initialValue: resolution.initialValue as GoAuth,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
