import type {
  ElixirApi,
  ElixirAuth,
  ElixirCaching,
  ElixirDeploy,
  ElixirEmail,
  ElixirHttp,
  ElixirJobs,
  ElixirJson,
  ElixirObservability,
  ElixirOrm,
  ElixirQuality,
  ElixirRealtime,
  ElixirTesting,
  ElixirValidation,
  ElixirWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import { createStaticSinglePromptResolution, type PromptOption } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

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

const WEB_FRAMEWORK_OPTIONS: PromptOption<ElixirWebFramework>[] = [
  { value: "phoenix", label: "Phoenix", hint: "Conventional Phoenix web application" },
  { value: "phoenix-live-view", label: "Phoenix LiveView", hint: "Server-rendered realtime UI" },
  { value: "none", label: "None", hint: "No Elixir web framework" },
];

const ORM_OPTIONS: PromptOption<ElixirOrm>[] = [
  { value: "ecto-sql", label: "Ecto SQL", hint: "Ecto plus SQL adapters and migrations" },
  { value: "ecto", label: "Ecto", hint: "Ecto schemas and changesets without SQL repo wiring" },
  { value: "none", label: "None", hint: "No database layer" },
];

const AUTH_OPTIONS: PromptOption<ElixirAuth>[] = [
  { value: "phx-gen-auth", label: "phx.gen.auth", hint: "Phoenix account/session scaffold" },
  { value: "ueberauth", label: "Ueberauth", hint: "OAuth strategy foundation" },
  { value: "guardian", label: "Guardian", hint: "JWT authentication foundation" },
  { value: "none", label: "None", hint: "No auth layer" },
];

const API_OPTIONS: PromptOption<ElixirApi>[] = [
  { value: "rest", label: "Phoenix REST", hint: "Controllers and JSON endpoints" },
  { value: "absinthe", label: "Absinthe GraphQL", hint: "GraphQL schema and resolvers" },
  { value: "none", label: "None", hint: "No API layer" },
];

const REALTIME_OPTIONS: PromptOption<ElixirRealtime>[] = [
  { value: "channels", label: "Phoenix Channels", hint: "WebSocket channel endpoint" },
  { value: "presence", label: "Phoenix Presence", hint: "Presence tracking over PubSub" },
  { value: "pubsub", label: "Phoenix PubSub", hint: "PubSub foundation only" },
  { value: "live-view-streams", label: "LiveView Streams", hint: "Realtime LiveView stream demo" },
  { value: "none", label: "None", hint: "No realtime feature" },
];

const JOB_OPTIONS: PromptOption<ElixirJobs>[] = [
  { value: "oban", label: "Oban", hint: "PostgreSQL-backed jobs and workers" },
  { value: "quantum", label: "Quantum", hint: "Cron-like scheduler" },
  { value: "none", label: "None", hint: "No jobs layer" },
];

const VALIDATION_OPTIONS: PromptOption<ElixirValidation>[] = [
  { value: "ecto-changesets", label: "Ecto Changesets", hint: "Data validation with Ecto" },
  { value: "nimble-options", label: "NimbleOptions", hint: "Declarative option validation" },
  { value: "none", label: "None", hint: "No extra validation helper" },
];

const HTTP_OPTIONS: PromptOption<ElixirHttp>[] = [
  { value: "req", label: "Req", hint: "High-level HTTP client" },
  { value: "finch", label: "Finch", hint: "Pooled HTTP client" },
  { value: "none", label: "None", hint: "No HTTP client" },
];

const JSON_OPTIONS: PromptOption<ElixirJson>[] = [
  { value: "jason", label: "Jason", hint: "Phoenix default JSON library" },
  { value: "none", label: "None", hint: "No JSON library" },
];

const EMAIL_OPTIONS: PromptOption<ElixirEmail>[] = [
  { value: "swoosh", label: "Swoosh", hint: "Phoenix email library" },
  { value: "none", label: "None", hint: "No email library" },
];

const CACHING_OPTIONS: PromptOption<ElixirCaching>[] = [
  { value: "cachex", label: "Cachex", hint: "In-memory cache" },
  { value: "nebulex", label: "Nebulex", hint: "Cache abstraction" },
  { value: "none", label: "None", hint: "No cache layer" },
];

const OBSERVABILITY_OPTIONS: PromptOption<ElixirObservability>[] = [
  { value: "telemetry", label: "Telemetry", hint: "Phoenix telemetry metrics" },
  { value: "opentelemetry", label: "OpenTelemetry", hint: "Distributed tracing foundation" },
  { value: "prom_ex", label: "PromEx", hint: "Prometheus metrics for Phoenix" },
  { value: "none", label: "None", hint: "No observability add-on" },
];

const TESTING_OPTIONS: PromptOption<ElixirTesting>[] = [
  { value: "ex_unit", label: "ExUnit", hint: "Standard Elixir tests" },
  { value: "mox", label: "Mox", hint: "Concurrent-safe mocks" },
  { value: "bypass", label: "Bypass", hint: "External HTTP service fakes" },
  { value: "wallaby", label: "Wallaby", hint: "Browser acceptance testing" },
  { value: "none", label: "None", hint: "No extra test library" },
];

const QUALITY_OPTIONS: PromptOption<ElixirQuality>[] = [
  { value: "credo", label: "Credo", hint: "Static code analysis" },
  { value: "dialyxir", label: "Dialyxir", hint: "Dialyzer integration" },
  { value: "sobelow", label: "Sobelow", hint: "Phoenix security analysis" },
  { value: "none", label: "None", hint: "No code quality tool" },
];

const DEPLOY_OPTIONS: PromptOption<ElixirDeploy>[] = [
  { value: "docker", label: "Docker", hint: "Dockerfile for Phoenix releases" },
  { value: "fly", label: "Fly.io", hint: "Fly.io release config" },
  { value: "gigalixir", label: "Gigalixir", hint: "Gigalixir Procfile and notes" },
  { value: "mix-release", label: "Mix Release", hint: "Release-ready runtime config" },
  { value: "none", label: "None", hint: "No deploy files" },
];

export const resolveElixirWebFrameworkPrompt = (value?: ElixirWebFramework) =>
  createStaticSinglePromptResolution(WEB_FRAMEWORK_OPTIONS, "phoenix", value);
export const resolveElixirOrmPrompt = (value?: ElixirOrm) =>
  createStaticSinglePromptResolution(ORM_OPTIONS, "ecto-sql", value);
export const resolveElixirAuthPrompt = (value?: ElixirAuth) =>
  createStaticSinglePromptResolution(AUTH_OPTIONS, "none", value);
export const resolveElixirApiPrompt = (value?: ElixirApi) =>
  createStaticSinglePromptResolution(API_OPTIONS, "rest", value);
export const resolveElixirRealtimePrompt = (value?: ElixirRealtime) =>
  createStaticSinglePromptResolution(REALTIME_OPTIONS, "channels", value);
export const resolveElixirJobsPrompt = (value?: ElixirJobs) =>
  createStaticSinglePromptResolution(JOB_OPTIONS, "none", value);
export const resolveElixirValidationPrompt = (value?: ElixirValidation) =>
  createStaticSinglePromptResolution(VALIDATION_OPTIONS, "ecto-changesets", value);
export const resolveElixirHttpPrompt = (value?: ElixirHttp) =>
  createStaticSinglePromptResolution(HTTP_OPTIONS, "req", value);
export const resolveElixirJsonPrompt = (value?: ElixirJson) =>
  createStaticSinglePromptResolution(JSON_OPTIONS, "jason", value);
export const resolveElixirEmailPrompt = (value?: ElixirEmail) =>
  createStaticSinglePromptResolution(EMAIL_OPTIONS, "none", value);
export const resolveElixirCachingPrompt = (value?: ElixirCaching) =>
  createStaticSinglePromptResolution(CACHING_OPTIONS, "none", value);
export const resolveElixirObservabilityPrompt = (value?: ElixirObservability) =>
  createStaticSinglePromptResolution(OBSERVABILITY_OPTIONS, "telemetry", value);
export const resolveElixirTestingPrompt = (value?: ElixirTesting) =>
  createStaticSinglePromptResolution(TESTING_OPTIONS, "ex_unit", value);
export const resolveElixirQualityPrompt = (value?: ElixirQuality) =>
  createStaticSinglePromptResolution(QUALITY_OPTIONS, "credo", value);
export const resolveElixirDeployPrompt = (value?: ElixirDeploy) =>
  createStaticSinglePromptResolution(DEPLOY_OPTIONS, "none", value);
export const getElixirWebFrameworkChoice = (value?: ElixirWebFramework) =>
  makeChoice("Select Elixir web framework", WEB_FRAMEWORK_OPTIONS, "phoenix", value);
export const getElixirOrmChoice = (value?: ElixirOrm) =>
  makeChoice("Select Elixir database layer", ORM_OPTIONS, "ecto-sql", value);
export const getElixirAuthChoice = (value?: ElixirAuth) =>
  makeChoice("Select Elixir auth", AUTH_OPTIONS, "none", value);
export const getElixirApiChoice = (value?: ElixirApi) =>
  makeChoice("Select Elixir API layer", API_OPTIONS, "rest", value);
export const getElixirRealtimeChoice = (value?: ElixirRealtime) =>
  makeChoice("Select Elixir realtime feature", REALTIME_OPTIONS, "channels", value);
export const getElixirJobsChoice = (value?: ElixirJobs) =>
  makeChoice("Select Elixir jobs layer", JOB_OPTIONS, "none", value);
export const getElixirValidationChoice = (value?: ElixirValidation) =>
  makeChoice("Select Elixir validation", VALIDATION_OPTIONS, "ecto-changesets", value);
export const getElixirHttpChoice = (value?: ElixirHttp) =>
  makeChoice("Select Elixir HTTP client", HTTP_OPTIONS, "req", value);
export const getElixirJsonChoice = (value?: ElixirJson) =>
  makeChoice("Select Elixir JSON library", JSON_OPTIONS, "jason", value);
export const getElixirEmailChoice = (value?: ElixirEmail) =>
  makeChoice("Select Elixir email library", EMAIL_OPTIONS, "none", value);
export const getElixirCachingChoice = (value?: ElixirCaching) =>
  makeChoice("Select Elixir caching", CACHING_OPTIONS, "none", value);
export const getElixirObservabilityChoice = (value?: ElixirObservability) =>
  makeChoice("Select Elixir observability", OBSERVABILITY_OPTIONS, "telemetry", value);
export const getElixirTestingChoice = (value?: ElixirTesting) =>
  makeChoice("Select Elixir testing", TESTING_OPTIONS, "ex_unit", value);
export const getElixirQualityChoice = (value?: ElixirQuality) =>
  makeChoice("Select Elixir code quality", QUALITY_OPTIONS, "credo", value);
export const getElixirDeployChoice = (value?: ElixirDeploy) =>
  makeChoice("Select Elixir deploy target", DEPLOY_OPTIONS, "none", value);
