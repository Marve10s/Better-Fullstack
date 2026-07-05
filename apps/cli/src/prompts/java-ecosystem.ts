import type {
  JavaAuth,
  JavaApi,
  JavaLogging,
  JavaBuildTool,
  JavaLibraries,
  JavaOrm,
  JavaTestingLibraries,
  JavaWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";

const JAVA_WEB_FRAMEWORK_PROMPT_OPTIONS: PromptOption<JavaWebFramework>[] = [
  {
    value: "spring-boot",
    label: "Spring Boot",
    hint: "Production-grade Java framework with embedded server and auto-configuration",
  },
  {
    value: "quarkus",
    label: "Quarkus",
    hint: "Cloud-native Java framework optimized for fast startup and lower memory use",
  },
  {
    value: "micronaut",
    label: "Micronaut",
    hint: "Modern JVM framework with compile-time DI/AOP and fast startup, low memory",
  },
  {
    value: "none",
    label: "None",
    hint: "No Java web framework",
  },
];

const JAVA_BUILD_TOOL_PROMPT_OPTIONS: PromptOption<JavaBuildTool>[] = [
  {
    value: "maven",
    label: "Maven",
    hint: "Convention-based build tool with Maven Wrapper support",
  },
  {
    value: "gradle",
    label: "Gradle",
    hint: "Flexible build tool with Gradle Wrapper support",
  },
  {
    value: "none",
    label: "None",
    hint: "No Java build tool",
  },
];

const JAVA_ORM_PROMPT_OPTIONS: PromptOption<JavaOrm>[] = [
  {
    value: "spring-data-jpa",
    label: "Spring Data JPA",
    hint: "Repository abstraction built on JPA/Hibernate",
  },
  {
    value: "jooq",
    label: "jOOQ",
    hint: "Type-safe SQL query builder (DSLContext with plain SQL)",
  },
  {
    value: "mybatis",
    label: "MyBatis",
    hint: "SQL mapping via annotated mapper interfaces",
  },
  {
    value: "none",
    label: "None",
    hint: "No Java ORM/database layer",
  },
];

const JAVA_AUTH_PROMPT_OPTIONS: PromptOption<JavaAuth>[] = [
  {
    value: "spring-security",
    label: "Spring Security",
    hint: "Authentication and authorization for Spring applications",
  },
  {
    value: "keycloak",
    label: "Keycloak",
    hint: "OAuth2 resource server validating Keycloak-issued JWTs",
  },
  {
    value: "none",
    label: "None",
    hint: "No Java authentication library",
  },
];

const JAVA_TESTING_LIBRARY_PROMPT_OPTIONS: PromptOption<JavaTestingLibraries>[] = [
  {
    value: "junit5",
    label: "JUnit 5",
    hint: "Modern Java unit testing platform",
  },
  {
    value: "mockito",
    label: "Mockito",
    hint: "Mocking framework for isolated unit tests",
  },
  {
    value: "testcontainers",
    label: "Testcontainers",
    hint: "Disposable Docker-based integration tests",
  },
  {
    value: "assertj",
    label: "AssertJ",
    hint: "Fluent assertions for Java tests",
  },
  {
    value: "rest-assured",
    label: "REST Assured",
    hint: "DSL for HTTP API and REST endpoint tests",
  },
  {
    value: "wiremock",
    label: "WireMock",
    hint: "HTTP service stubs for integration tests",
  },
  {
    value: "awaitility",
    label: "Awaitility",
    hint: "Wait helpers for asynchronous Java tests",
  },
  {
    value: "archunit",
    label: "ArchUnit",
    hint: "Architecture rules for Java package boundaries",
  },
  {
    value: "jqwik",
    label: "jqwik",
    hint: "Property-based testing on the JUnit Platform",
  },
  {
    value: "none",
    label: "None",
    hint: "No extra testing libraries",
  },
];

const JAVA_LIBRARY_PROMPT_OPTIONS: PromptOption<JavaLibraries>[] = [
  {
    value: "spring-actuator",
    label: "Spring Actuator",
    hint: "Production health, metrics, and diagnostics endpoints",
  },
  {
    value: "spring-validation",
    label: "Spring Validation",
    hint: "Bean validation for request and entity constraints",
  },
  {
    value: "flyway",
    label: "Flyway",
    hint: "Versioned SQL database migrations for JPA-backed apps",
  },
  {
    value: "liquibase",
    label: "Liquibase",
    hint: "Database change management for JPA-backed apps",
  },
  {
    value: "springdoc-openapi",
    label: "Springdoc OpenAPI",
    hint: "OpenAPI and Swagger UI documentation for Spring MVC APIs",
  },
  {
    value: "lombok",
    label: "Lombok",
    hint: "Annotation processor for reducing Java boilerplate",
  },
  {
    value: "mapstruct",
    label: "MapStruct",
    hint: "Compile-time generated mappers for DTO and entity conversions",
  },
  {
    value: "caffeine",
    label: "Caffeine",
    hint: "High-performance in-memory caching through Spring Cache",
  },
  {
    value: "resilience4j",
    label: "Resilience4j",
    hint: "Fault tolerance patterns for retries, circuit breakers, and rate limiting",
  },
  {
    value: "spring-webflux",
    label: "Spring WebFlux",
    hint: "Reactive HTTP stack for Spring applications",
  },
  {
    value: "spring-batch",
    label: "Spring Batch",
    hint: "Batch processing framework for ETL and scheduled jobs",
  },
  {
    value: "spring-kafka",
    label: "Spring for Apache Kafka",
    hint: "Kafka producer, consumer, and listener integration",
  },
  {
    value: "spring-mail",
    label: "Spring Mail",
    hint: "Email support through Jakarta Mail and Spring abstractions",
  },
  {
    value: "spring-devtools",
    label: "Spring Boot DevTools",
    hint: "Developer-time restart and local productivity support",
  },
  {
    value: "micrometer-prometheus",
    label: "Micrometer Prometheus",
    hint: "Prometheus metrics registry for Micrometer and Actuator",
  },
  {
    value: "thymeleaf",
    label: "Thymeleaf",
    hint: "Server-rendered HTML templates for Spring MVC apps",
  },
  {
    value: "spring-amqp",
    label: "Spring AMQP",
    hint: "RabbitMQ messaging with RabbitTemplate and listeners",
  },
  {
    value: "opentelemetry-java",
    label: "OpenTelemetry",
    hint: "OpenTelemetry SDK with OTLP export",
  },
  {
    value: "none",
    label: "None",
    hint: "No extra Java libraries",
  },
];

export function resolveJavaWebFrameworkPrompt(javaWebFramework?: JavaWebFramework) {
  return createStaticSinglePromptResolution(
    JAVA_WEB_FRAMEWORK_PROMPT_OPTIONS,
    "spring-boot",
    javaWebFramework,
  );
}

export async function getJavaWebFrameworkChoice(javaWebFramework?: JavaWebFramework) {
  const resolution = resolveJavaWebFrameworkPrompt(javaWebFramework);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JavaWebFramework>({
    message: "Select Java web framework",
    options: resolution.options,
    initialValue: resolution.initialValue as JavaWebFramework,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveJavaBuildToolPrompt(javaBuildTool?: JavaBuildTool) {
  return createStaticSinglePromptResolution(JAVA_BUILD_TOOL_PROMPT_OPTIONS, "maven", javaBuildTool);
}

export async function getJavaBuildToolChoice(javaBuildTool?: JavaBuildTool) {
  const resolution = resolveJavaBuildToolPrompt(javaBuildTool);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JavaBuildTool>({
    message: "Select Java build tool",
    options: resolution.options,
    initialValue: resolution.initialValue as JavaBuildTool,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveJavaOrmPrompt(javaOrm?: JavaOrm) {
  return createStaticSinglePromptResolution(JAVA_ORM_PROMPT_OPTIONS, "none", javaOrm);
}

export async function getJavaOrmChoice(javaOrm?: JavaOrm) {
  const resolution = resolveJavaOrmPrompt(javaOrm);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JavaOrm>({
    message: "Select Java ORM/database layer",
    options: resolution.options,
    initialValue: resolution.initialValue as JavaOrm,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveJavaAuthPrompt(javaAuth?: JavaAuth) {
  return createStaticSinglePromptResolution(JAVA_AUTH_PROMPT_OPTIONS, "none", javaAuth);
}

export async function getJavaAuthChoice(javaAuth?: JavaAuth) {
  const resolution = resolveJavaAuthPrompt(javaAuth);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JavaAuth>({
    message: "Select Java authentication library",
    options: resolution.options,
    initialValue: resolution.initialValue as JavaAuth,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveJavaLibrariesPrompt(javaLibraries?: JavaLibraries[]) {
  return createStaticMultiPromptResolution(JAVA_LIBRARY_PROMPT_OPTIONS, [], javaLibraries);
}

export async function getJavaLibrariesChoice(javaLibraries?: JavaLibraries[]) {
  const resolution = resolveJavaLibrariesPrompt(javaLibraries);
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as JavaLibraries[]) ?? [];
  }

  const response = await navigableMultiselect({
    message: "Select Java application libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as JavaLibraries[],
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  if (response.includes("none")) return [];

  return response as JavaLibraries[];
}

export function resolveJavaTestingLibrariesPrompt(javaTestingLibraries?: JavaTestingLibraries[]) {
  return createStaticMultiPromptResolution(
    JAVA_TESTING_LIBRARY_PROMPT_OPTIONS,
    ["junit5"],
    javaTestingLibraries,
  );
}

export async function getJavaTestingLibrariesChoice(javaTestingLibraries?: JavaTestingLibraries[]) {
  const resolution = resolveJavaTestingLibrariesPrompt(javaTestingLibraries);
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as JavaTestingLibraries[]) ?? [];
  }

  const response = await navigableMultiselect({
    message: "Select Java testing libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as JavaTestingLibraries[],
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  if (response.includes("none")) return [];

  return response as JavaTestingLibraries[];
}

const JAVA_API_PROMPT_OPTIONS: PromptOption<JavaApi>[] = [
  {
    value: "spring-graphql",
    label: "Spring for GraphQL",
    hint: "GraphQL schema + annotated controllers on Spring Boot",
  },
  {
    value: "openapi-generator",
    label: "OpenAPI Generator",
    hint: "Generate Spring API interfaces + models from an OpenAPI spec at build time",
  },
  {
    value: "grpc",
    label: "gRPC",
    hint: "grpc-java service (protoc codegen) started alongside Spring Boot",
  },
  {
    value: "none",
    label: "None",
    hint: "REST controllers only",
  },
];

const JAVA_LOGGING_PROMPT_OPTIONS: PromptOption<JavaLogging>[] = [
  {
    value: "logback",
    label: "Logback",
    hint: "Spring Boot default logger with explicit logback-spring.xml",
  },
  {
    value: "log4j2",
    label: "Log4j2",
    hint: "High-performance Apache logging with async loggers (Spring Boot, Micronaut, plain Java)",
  },
  {
    value: "none",
    label: "None",
    hint: "Spring Boot logging defaults",
  },
];

export function resolveJavaApiPrompt(javaApi?: JavaApi) {
  return createStaticSinglePromptResolution(JAVA_API_PROMPT_OPTIONS, "none", javaApi);
}

export async function getJavaApiChoice(javaApi?: JavaApi) {
  const resolution = resolveJavaApiPrompt(javaApi);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JavaApi>({
    message: "Select Java API layer",
    options: resolution.options,
    initialValue: resolution.initialValue as JavaApi,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolveJavaLoggingPrompt(javaLogging?: JavaLogging) {
  return createStaticSinglePromptResolution(JAVA_LOGGING_PROMPT_OPTIONS, "none", javaLogging);
}

export async function getJavaLoggingChoice(javaLogging?: JavaLogging) {
  const resolution = resolveJavaLoggingPrompt(javaLogging);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JavaLogging>({
    message: "Select Java logging configuration",
    options: resolution.options,
    initialValue: resolution.initialValue as JavaLogging,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
