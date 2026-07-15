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
  GoValidation,
  GoQuality,
  GoMigrations,
  GoTemplating,
  GoProtoTooling,
  GoDI,
  GoRealtime,
  GoTesting,
  GoWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";

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
    value: "go-zero",
    label: "go-zero",
    hint: "API-first microservice framework with resilience and code generation",
  },
  {
    value: "kratos",
    label: "Kratos",
    hint: "Cloud-native HTTP/gRPC framework with middleware and lifecycle management",
  },
  {
    value: "httprouter",
    label: "HttpRouter",
    hint: "Minimal high-performance radix-tree HTTP router",
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
    value: "sqlx",
    label: "sqlx",
    hint: "Lightweight database/sql extensions with named queries and struct scanning",
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
    value: "grpc-gateway",
    label: "grpc-gateway",
    hint: "REST/JSON gateway for protobuf-defined services",
  },
  {
    value: "connect-go",
    label: "Connect-Go",
    hint: "Protobuf RPC over gRPC, gRPC-Web, and HTTP/1.1",
  },
  {
    value: "oapi-codegen",
    label: "oapi-codegen",
    hint: "Generate typed Go clients and servers from OpenAPI contracts",
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
    value: "oauth2",
    label: "golang.org/x/oauth2",
    hint: "Canonical OAuth2 client foundation for authorization-code and service flows",
  },
  {
    value: "none",
    label: "None",
    hint: "No authentication library",
  },
];

export function resolveGoWebFrameworkPrompt(goWebFramework?: GoWebFramework) {
  return createStaticSinglePromptResolution(GO_WEB_FRAMEWORK_PROMPT_OPTIONS, "gin", goWebFramework);
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
    value: "testcontainers",
    label: "Testcontainers for Go",
    hint: "Disposable real databases and services for integration tests",
  },
  {
    value: "ginkgo-gomega",
    label: "Ginkgo + Gomega",
    hint: "BDD test runner and expressive matcher library",
  },
  {
    value: "mockery",
    label: "mockery",
    hint: "Generate typed interface mocks with a reproducible project config",
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
    value: "kafka-go",
    label: "kafka-go",
    hint: "Idiomatic Kafka producer, consumer, and consumer-group client",
  },
  {
    value: "asynq",
    label: "Asynq",
    hint: "Redis-backed background jobs with retries, scheduling, and priorities",
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
    value: "prometheus",
    label: "Prometheus",
    hint: "Standard Prometheus metrics collectors and HTTP exposition",
  },
  {
    value: "none",
    label: "None",
    hint: "No tracing/metrics SDK",
  },
];

const GO_VALIDATION_PROMPT_OPTIONS: PromptOption<GoValidation>[] = [
  {
    value: "validator",
    label: "go-playground/validator",
    hint: "Struct and field validation used by major Go web frameworks",
  },
  { value: "none", label: "None", hint: "No validation helper" },
];

const GO_QUALITY_PROMPT_OPTIONS: PromptOption<GoQuality>[] = [
  {
    value: "golangci-lint",
    label: "golangci-lint",
    hint: "Fast multi-linter with a checked-in CI-ready configuration",
  },
  { value: "none", label: "None", hint: "No additional quality tooling" },
];

const GO_MIGRATIONS_PROMPT_OPTIONS: PromptOption<GoMigrations>[] = [
  {
    value: "golang-migrate",
    label: "golang-migrate",
    hint: "Versioned database migrations across PostgreSQL, MySQL, SQLite, and more",
  },
  { value: "none", label: "None", hint: "No migration tooling" },
];

const GO_TEMPLATING_PROMPT_OPTIONS: PromptOption<GoTemplating>[] = [
  {
    value: "templ",
    label: "templ",
    hint: "Type-safe Go-native HTML components and code generation",
  },
  { value: "none", label: "None", hint: "No server-side templating" },
];

const GO_PROTO_TOOLING_PROMPT_OPTIONS: PromptOption<GoProtoTooling>[] = [
  {
    value: "buf",
    label: "Buf",
    hint: "Protobuf linting, breaking-change checks, dependencies, and generation",
  },
  { value: "none", label: "None", hint: "No protobuf toolchain" },
];

const GO_DI_PROMPT_OPTIONS: PromptOption<GoDI>[] = [
  {
    value: "fx",
    label: "Uber Fx",
    hint: "Lifecycle-aware dependency injection for modular Go services",
  },
  { value: "none", label: "None", hint: "No dependency injection framework" },
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

export function resolveGoValidationPrompt(goValidation?: GoValidation) {
  return createStaticSinglePromptResolution(GO_VALIDATION_PROMPT_OPTIONS, "none", goValidation);
}

export async function getGoValidationChoice(goValidation?: GoValidation) {
  const resolution = resolveGoValidationPrompt(goValidation);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<GoValidation>({
    message: "Select Go validation library",
    options: resolution.options,
    initialValue: resolution.initialValue as GoValidation,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveGoQualityPrompt(goQuality?: GoQuality) {
  return createStaticSinglePromptResolution(GO_QUALITY_PROMPT_OPTIONS, "none", goQuality);
}

export async function getGoQualityChoice(goQuality?: GoQuality) {
  const resolution = resolveGoQualityPrompt(goQuality);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<GoQuality>({
    message: "Select Go code quality tooling",
    options: resolution.options,
    initialValue: resolution.initialValue as GoQuality,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveGoMigrationsPrompt(goMigrations?: GoMigrations) {
  return createStaticSinglePromptResolution(GO_MIGRATIONS_PROMPT_OPTIONS, "none", goMigrations);
}

export async function getGoMigrationsChoice(goMigrations?: GoMigrations) {
  const resolution = resolveGoMigrationsPrompt(goMigrations);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<GoMigrations>({
    message: "Select Go database migration tooling",
    options: resolution.options,
    initialValue: resolution.initialValue as GoMigrations,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveGoTemplatingPrompt(goTemplating?: GoTemplating) {
  return createStaticSinglePromptResolution(GO_TEMPLATING_PROMPT_OPTIONS, "none", goTemplating);
}

export async function getGoTemplatingChoice(goTemplating?: GoTemplating) {
  const resolution = resolveGoTemplatingPrompt(goTemplating);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<GoTemplating>({
    message: "Select Go templating library",
    options: resolution.options,
    initialValue: resolution.initialValue as GoTemplating,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveGoProtoToolingPrompt(goProtoTooling?: GoProtoTooling) {
  return createStaticSinglePromptResolution(
    GO_PROTO_TOOLING_PROMPT_OPTIONS,
    "none",
    goProtoTooling,
  );
}

export async function getGoProtoToolingChoice(goProtoTooling?: GoProtoTooling) {
  const resolution = resolveGoProtoToolingPrompt(goProtoTooling);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<GoProtoTooling>({
    message: "Select Go protobuf tooling",
    options: resolution.options,
    initialValue: resolution.initialValue as GoProtoTooling,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveGoDIPrompt(goDI?: GoDI) {
  return createStaticSinglePromptResolution(GO_DI_PROMPT_OPTIONS, "none", goDI);
}

export async function getGoDIChoice(goDI?: GoDI) {
  const resolution = resolveGoDIPrompt(goDI);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<GoDI>({
    message: "Select Go dependency injection",
    options: resolution.options,
    initialValue: resolution.initialValue as GoDI,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
