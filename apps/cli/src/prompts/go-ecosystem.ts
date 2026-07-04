import type {
  GoApi,
  GoAuth,
  GoCaching,
  GoCli,
  GoConfig,
  GoLogging,
  GoMessageQueue,
  GoObservability,
  GoOrm,
  GoRealtime,
  GoTesting,
  GoWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";

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
    value: "stdlib",
    label: "net/http",
    hint: "Go 1.22+ standard-library routing (ServeMux), zero dependencies",
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
    value: "bun",
    label: "Bun",
    hint: "SQL-first Go ORM by uptrace with a lightweight query builder",
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
    value: "gqlgen",
    label: "gqlgen",
    hint: "Schema-first GraphQL server with code generation",
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
    value: "urfave-cli",
    label: "urfave/cli",
    hint: "Declarative CLI framework with commands, flags, and shell completion",
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
    value: "logrus",
    label: "Logrus",
    hint: "Classic structured logger with hooks and formatter ecosystem",
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
    value: "goth",
    label: "Goth",
    hint: "OAuth social login for 30+ providers (Google, GitHub, ...)",
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

const GO_TESTING_PROMPT_OPTIONS: PromptOption<GoTesting>[] = [
  {
    value: "testify",
    label: "Testify",
    hint: "Assertions, suites, and mocks — the Go testing standard",
  },
  {
    value: "gomock",
    label: "GoMock",
    hint: "Interface mock generation via mockgen",
  },
  {
    value: "none",
    label: "None",
    hint: "Standard library testing only",
  },
];

const GO_REALTIME_PROMPT_OPTIONS: PromptOption<GoRealtime>[] = [
  {
    value: "gorilla-websocket",
    label: "Gorilla WebSocket",
    hint: "Industry-standard WebSocket implementation for Go",
  },
  {
    value: "centrifuge",
    label: "Centrifuge",
    hint: "Scalable real-time messaging with channels and presence",
  },
  {
    value: "none",
    label: "None",
    hint: "No realtime layer",
  },
];

const GO_MESSAGE_QUEUE_PROMPT_OPTIONS: PromptOption<GoMessageQueue>[] = [
  {
    value: "nats",
    label: "NATS",
    hint: "Lightweight, high-performance messaging with JetStream persistence",
  },
  {
    value: "watermill",
    label: "Watermill",
    hint: "Event-driven framework over Kafka, RabbitMQ, Pub/Sub, and more",
  },
  {
    value: "none",
    label: "None",
    hint: "No message queue",
  },
];

const GO_CACHING_PROMPT_OPTIONS: PromptOption<GoCaching>[] = [
  {
    value: "redis",
    label: "go-redis",
    hint: "Standard Redis client with go-redis/cache helpers",
  },
  {
    value: "ristretto",
    label: "Ristretto",
    hint: "High-performance in-process cache with TinyLFU admission",
  },
  {
    value: "none",
    label: "None",
    hint: "No caching library",
  },
];

const GO_CONFIG_PROMPT_OPTIONS: PromptOption<GoConfig>[] = [
  {
    value: "viper",
    label: "Viper",
    hint: "De facto Go config standard: files, env, flags, live reload",
  },
  {
    value: "koanf",
    label: "Koanf",
    hint: "Lightweight config with clean provider/parser abstractions",
  },
  {
    value: "none",
    label: "None",
    hint: "Environment variables only",
  },
];

const GO_OBSERVABILITY_PROMPT_OPTIONS: PromptOption<GoObservability>[] = [
  {
    value: "opentelemetry",
    label: "OpenTelemetry",
    hint: "Official OTel SDK: traces and metrics with OTLP export",
  },
  {
    value: "none",
    label: "None",
    hint: "No tracing/metrics SDK",
  },
];

export function resolveGoTestingPrompt(goTesting?: GoTesting[]) {
  return createStaticMultiPromptResolution(GO_TESTING_PROMPT_OPTIONS, [], goTesting);
}

export async function getGoTestingChoice(goTesting?: GoTesting[]) {
  const resolution = resolveGoTestingPrompt(goTesting);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? [];
  }

  const response = await navigableMultiselect<GoTesting>({
    message: "Select Go testing libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response.includes("none") ? [] : response;
}

export function resolveGoRealtimePrompt(goRealtime?: GoRealtime) {
  return createStaticSinglePromptResolution(GO_REALTIME_PROMPT_OPTIONS, "none", goRealtime);
}

export async function getGoRealtimeChoice(goRealtime?: GoRealtime) {
  const resolution = resolveGoRealtimePrompt(goRealtime);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoRealtime>({
    message: "Select Go realtime library",
    options: resolution.options,
    initialValue: resolution.initialValue as GoRealtime,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoMessageQueuePrompt(goMessageQueue?: GoMessageQueue) {
  return createStaticSinglePromptResolution(
    GO_MESSAGE_QUEUE_PROMPT_OPTIONS,
    "none",
    goMessageQueue,
  );
}

export async function getGoMessageQueueChoice(goMessageQueue?: GoMessageQueue) {
  const resolution = resolveGoMessageQueuePrompt(goMessageQueue);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoMessageQueue>({
    message: "Select Go message queue",
    options: resolution.options,
    initialValue: resolution.initialValue as GoMessageQueue,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoCachingPrompt(goCaching?: GoCaching) {
  return createStaticSinglePromptResolution(GO_CACHING_PROMPT_OPTIONS, "none", goCaching);
}

export async function getGoCachingChoice(goCaching?: GoCaching) {
  const resolution = resolveGoCachingPrompt(goCaching);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoCaching>({
    message: "Select Go caching library",
    options: resolution.options,
    initialValue: resolution.initialValue as GoCaching,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoConfigPrompt(goConfig?: GoConfig) {
  return createStaticSinglePromptResolution(GO_CONFIG_PROMPT_OPTIONS, "none", goConfig);
}

export async function getGoConfigChoice(goConfig?: GoConfig) {
  const resolution = resolveGoConfigPrompt(goConfig);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoConfig>({
    message: "Select Go config management",
    options: resolution.options,
    initialValue: resolution.initialValue as GoConfig,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveGoObservabilityPrompt(goObservability?: GoObservability) {
  return createStaticSinglePromptResolution(
    GO_OBSERVABILITY_PROMPT_OPTIONS,
    "none",
    goObservability,
  );
}

export async function getGoObservabilityChoice(goObservability?: GoObservability) {
  const resolution = resolveGoObservabilityPrompt(goObservability);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<GoObservability>({
    message: "Select Go observability",
    options: resolution.options,
    initialValue: resolution.initialValue as GoObservability,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
