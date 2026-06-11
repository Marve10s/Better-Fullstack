import type {
  DotnetApi,
  DotnetAuth,
  DotnetCaching,
  DotnetValidation,
  DotnetDeploy,
  DotnetJobQueue,
  DotnetObservability,
  DotnetOrm,
  DotnetRealtime,
  DotnetTesting,
  DotnetWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";

function makeChoice<T extends string>(
  message: string,
  options: PromptOption<T>[],
  defaultValue: T,
  value?: T,
) {
  const resolution = createStaticSinglePromptResolution(options, defaultValue, value);
  if (!resolution.shouldPrompt) return Promise.resolve(resolution.autoValue ?? defaultValue);

  return navigableSelect<T>({
    message,
    options: resolution.options,
    initialValue: resolution.initialValue as T,
  }).then((response) => (isCancel(response) ? exitCancelled("Operation cancelled") : response));
}

function makeMultiChoice<T extends string>(
  message: string,
  options: PromptOption<T>[],
  defaultValue: T[],
  value?: T[],
) {
  const resolution = createStaticMultiPromptResolution(options, defaultValue, value);
  if (!resolution.shouldPrompt) return Promise.resolve(resolution.autoValue ?? defaultValue);

  return navigableMultiselect<T>({
    message,
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue,
  }).then((response) => {
    if (isCancel(response)) return exitCancelled("Operation cancelled");
    return response.includes("none" as T) ? [] : response;
  });
}

const WEB_FRAMEWORK_OPTIONS: PromptOption<DotnetWebFramework>[] = [
  {
    value: "aspnet-minimal",
    label: "ASP.NET Core Minimal APIs",
    hint: "Lightweight HTTP APIs with minimal ceremony",
  },
  {
    value: "aspnet-mvc",
    label: "ASP.NET Core MVC",
    hint: "Controller-based enterprise web/API pattern",
  },
  {
    value: "aspnet-blazor",
    label: "ASP.NET Core Blazor",
    hint: "C# interactive UI with Blazor",
  },
  { value: "none", label: "None", hint: "No .NET web framework" },
];

const ORM_OPTIONS: PromptOption<DotnetOrm>[] = [
  { value: "ef-core", label: "Entity Framework Core", hint: "LINQ-first ORM and migrations" },
  { value: "dapper", label: "Dapper", hint: "Fast micro-ORM over raw SQL" },
  { value: "linq2db", label: "linq2db", hint: "Lightweight LINQ provider" },
  { value: "none", label: "None", hint: "No .NET data access library" },
];

const AUTH_OPTIONS: PromptOption<DotnetAuth>[] = [
  {
    value: "aspnet-identity",
    label: "ASP.NET Core Identity",
    hint: "Built-in user management and auth flows",
  },
  {
    value: "duende-identityserver",
    label: "Duende IdentityServer",
    hint: "OpenID Connect and OAuth2 server",
  },
  { value: "auth0-aspnet", label: "Auth0 ASP.NET Core", hint: "Managed Auth0 integration" },
  { value: "none", label: "None", hint: "No .NET auth library" },
];

const API_OPTIONS: PromptOption<DotnetApi>[] = [
  { value: "minimal-api", label: "Minimal APIs", hint: "REST endpoints with OpenAPI support" },
  {
    value: "graphql-hotchocolate",
    label: "Hot Chocolate GraphQL",
    hint: "Code-first GraphQL server for .NET",
  },
  { value: "grpc-dotnet", label: "gRPC for .NET", hint: "High-performance RPC services" },
  { value: "none", label: "None", hint: "No extra API style" },
];

const TESTING_OPTIONS: PromptOption<DotnetTesting>[] = [
  { value: "xunit", label: "xUnit", hint: "Modern .NET test framework" },
  { value: "nunit", label: "NUnit", hint: "Established .NET test framework" },
  { value: "moq", label: "Moq", hint: "Interface-based mocking library" },
  {
    value: "testcontainers-dotnet",
    label: "Testcontainers for .NET",
    hint: "Docker-backed integration tests",
  },
  { value: "none", label: "None", hint: "No .NET testing libraries" },
];

const JOB_QUEUE_OPTIONS: PromptOption<DotnetJobQueue>[] = [
  { value: "hangfire", label: "Hangfire", hint: "Persistent background jobs and dashboard" },
  { value: "quartz-net", label: "Quartz.NET", hint: "Enterprise scheduling" },
  { value: "hosted-services", label: "Hosted Services", hint: "Built-in BackgroundService pattern" },
  { value: "none", label: "None", hint: "No .NET background jobs" },
];

const REALTIME_OPTIONS: PromptOption<DotnetRealtime>[] = [
  { value: "signalr", label: "SignalR", hint: "WebSocket/SSE realtime hub framework" },
  { value: "none", label: "None", hint: "No .NET realtime layer" },
];

const OBSERVABILITY_OPTIONS: PromptOption<DotnetObservability>[] = [
  {
    value: "opentelemetry-dotnet",
    label: "OpenTelemetry .NET",
    hint: "Tracing and metrics instrumentation",
  },
  { value: "serilog", label: "Serilog", hint: "Structured logging with sink ecosystem" },
  { value: "nlog", label: "NLog", hint: "Flexible structured logging targets" },
  { value: "health-checks", label: "Health Checks", hint: "ASP.NET health endpoints" },
  { value: "none", label: "None", hint: "No .NET observability libraries" },
];

const VALIDATION_OPTIONS: PromptOption<DotnetValidation>[] = [
  {
    value: "fluentvalidation",
    label: "FluentValidation",
    hint: "Strongly-typed validator classes with a fluent API",
  },
  {
    value: "data-annotations",
    label: "Data Annotations",
    hint: "Built-in attribute-based validation",
  },
  { value: "none", label: "None", hint: "No validation library" },
];

const CACHING_OPTIONS: PromptOption<DotnetCaching>[] = [
  { value: "redis", label: "StackExchange.Redis", hint: "Redis distributed caching" },
  { value: "memory-cache", label: "IMemoryCache", hint: "Built-in in-process cache" },
  { value: "none", label: "None", hint: "No .NET caching library" },
];

const DEPLOY_OPTIONS: PromptOption<DotnetDeploy>[] = [
  { value: "docker", label: "Docker", hint: "Multi-stage Dockerfile for dotnet publish" },
  { value: "azure", label: "Azure", hint: "Azure App Service or Container Apps notes" },
  { value: "aws", label: "AWS", hint: "AWS Lambda/ECS/Elastic Beanstalk notes" },
  { value: "none", label: "None", hint: "No .NET deploy target" },
];

export const resolveDotnetWebFrameworkPrompt = (value?: DotnetWebFramework) =>
  createStaticSinglePromptResolution(WEB_FRAMEWORK_OPTIONS, "aspnet-minimal", value);
export const resolveDotnetOrmPrompt = (value?: DotnetOrm) =>
  createStaticSinglePromptResolution(ORM_OPTIONS, "ef-core", value);
export const resolveDotnetAuthPrompt = (value?: DotnetAuth) =>
  createStaticSinglePromptResolution(AUTH_OPTIONS, "aspnet-identity", value);
export const resolveDotnetApiPrompt = (value?: DotnetApi) =>
  createStaticSinglePromptResolution(API_OPTIONS, "minimal-api", value);
export const resolveDotnetTestingPrompt = (value?: DotnetTesting[]) =>
  createStaticMultiPromptResolution(TESTING_OPTIONS, ["xunit"], value);
export const resolveDotnetJobQueuePrompt = (value?: DotnetJobQueue) =>
  createStaticSinglePromptResolution(JOB_QUEUE_OPTIONS, "none", value);
export const resolveDotnetRealtimePrompt = (value?: DotnetRealtime) =>
  createStaticSinglePromptResolution(REALTIME_OPTIONS, "signalr", value);
export const resolveDotnetObservabilityPrompt = (value?: DotnetObservability[]) =>
  createStaticMultiPromptResolution(OBSERVABILITY_OPTIONS, ["serilog"], value);
export const resolveDotnetValidationPrompt = (value?: DotnetValidation) =>
  createStaticSinglePromptResolution(VALIDATION_OPTIONS, "none", value);
export const resolveDotnetCachingPrompt = (value?: DotnetCaching) =>
  createStaticSinglePromptResolution(CACHING_OPTIONS, "none", value);
export const resolveDotnetDeployPrompt = (value?: DotnetDeploy) =>
  createStaticSinglePromptResolution(DEPLOY_OPTIONS, "docker", value);

export const getDotnetWebFrameworkChoice = (value?: DotnetWebFramework) =>
  makeChoice("Select .NET web framework", WEB_FRAMEWORK_OPTIONS, "aspnet-minimal", value);
export const getDotnetOrmChoice = (value?: DotnetOrm) =>
  makeChoice("Select .NET data access", ORM_OPTIONS, "ef-core", value);
export const getDotnetAuthChoice = (value?: DotnetAuth) =>
  makeChoice("Select .NET auth", AUTH_OPTIONS, "aspnet-identity", value);
export const getDotnetApiChoice = (value?: DotnetApi) =>
  makeChoice("Select .NET API style", API_OPTIONS, "minimal-api", value);
export const getDotnetTestingChoice = (value?: DotnetTesting[]) =>
  makeMultiChoice("Select .NET testing libraries", TESTING_OPTIONS, ["xunit"], value);
export const getDotnetJobQueueChoice = (value?: DotnetJobQueue) =>
  makeChoice("Select .NET jobs", JOB_QUEUE_OPTIONS, "none", value);
export const getDotnetRealtimeChoice = (value?: DotnetRealtime) =>
  makeChoice("Select .NET realtime", REALTIME_OPTIONS, "signalr", value);
export const getDotnetObservabilityChoice = (value?: DotnetObservability[]) =>
  makeMultiChoice("Select .NET observability", OBSERVABILITY_OPTIONS, ["serilog"], value);
export const getDotnetValidationChoice = (value?: DotnetValidation) =>
  makeChoice("Select .NET validation", VALIDATION_OPTIONS, "none", value);
export const getDotnetCachingChoice = (value?: DotnetCaching) =>
  makeChoice("Select .NET caching", CACHING_OPTIONS, "none", value);
export const getDotnetDeployChoice = (value?: DotnetDeploy) =>
  makeChoice("Select .NET deploy target", DEPLOY_OPTIONS, "docker", value);
