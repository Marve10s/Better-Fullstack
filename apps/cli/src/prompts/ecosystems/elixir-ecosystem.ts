import type {
  ElixirApi,
  ElixirAuth,
  ElixirCaching,
  ElixirDeploy,
  ElixirLibraries,
  ElixirEmail,
  ElixirHttp,
  ElixirJobs,
  ElixirJson,
  ElixirObservability,
  ElixirOrm,
  ElixirQuality,
  ElixirI18n,
  ElixirHttpServer,
  ElixirApplicationFramework,
  ElixirDocumentation,
  ElixirClustering,
  ElixirRealtime,
  ElixirTesting,
  ElixirValidation,
  ElixirWebFramework,
} from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableMultiselect, navigableSelect } from "@/prompts/core/navigable";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "@/prompts/core/prompt-contract";

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

const WEB_FRAMEWORK_OPTIONS: PromptOption<ElixirWebFramework>[] = [
  { value: "phoenix", label: "Phoenix", hint: "Conventional Phoenix web application" },
  { value: "phoenix-live-view", label: "Phoenix LiveView", hint: "Server-rendered realtime UI" },
  { value: "none", label: "None", hint: "No Elixir web framework" },
];

const ORM_OPTIONS: PromptOption<ElixirOrm>[] = [
  { value: "ecto-sql", label: "Ecto SQL", hint: "Ecto plus SQL adapters and migrations" },
  { value: "ecto", label: "Ecto", hint: "Ecto schemas and changesets without SQL repo wiring" },
  { value: "myxql", label: "MyXQL", hint: "Ecto SQL with MySQL and MariaDB" },
  { value: "ecto_sqlite3", label: "ecto_sqlite3", hint: "Embedded SQLite through Ecto SQL" },
  { value: "none", label: "None", hint: "No database layer" },
];

const AUTH_OPTIONS: PromptOption<ElixirAuth>[] = [
  { value: "phx-gen-auth", label: "phx.gen.auth", hint: "Phoenix account/session scaffold" },
  { value: "ueberauth", label: "Ueberauth", hint: "OAuth strategy foundation" },
  { value: "guardian", label: "Guardian", hint: "JWT authentication foundation" },
  { value: "pow", label: "Pow", hint: "Database-backed Phoenix authentication" },
  { value: "none", label: "None", hint: "No auth layer" },
];

const API_OPTIONS: PromptOption<ElixirApi>[] = [
  { value: "rest", label: "Phoenix REST", hint: "Controllers and JSON endpoints" },
  { value: "absinthe", label: "Absinthe GraphQL", hint: "GraphQL schema and resolvers" },
  { value: "grpc", label: "gRPC", hint: "grpc-elixir endpoint (run protoc codegen for stubs)" },
  {
    value: "open_api_spex",
    label: "OpenApiSpex",
    hint: "OpenAPI schemas, validation, and Swagger UI",
  },
  { value: "none", label: "None", hint: "No API layer" },
];

const LIBRARY_OPTIONS: PromptOption<ElixirLibraries>[] = [
  { value: "broadway", label: "Broadway", hint: "Data ingestion pipelines (Kafka, SQS, RabbitMQ)" },
  { value: "nx", label: "Nx", hint: "Numerical Elixir: tensors and ML on the BEAM" },
  { value: "ex_aws", label: "ExAws", hint: "AWS clients including S3, SQS, and SNS" },
  { value: "floki", label: "Floki", hint: "HTML parsing and transformation" },
  { value: "rustler", label: "Rustler", hint: "Safe Rust native extensions for the BEAM" },
  { value: "none", label: "None", hint: "No extra libraries" },
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
  { value: "tesla", label: "Tesla", hint: "Middleware-based HTTP client" },
  { value: "none", label: "None", hint: "No HTTP client" },
];

const JSON_OPTIONS: PromptOption<ElixirJson>[] = [
  { value: "jason", label: "Jason", hint: "Phoenix default JSON library" },
  { value: "none", label: "None", hint: "No JSON library" },
];

const EMAIL_OPTIONS: PromptOption<ElixirEmail>[] = [
  { value: "swoosh", label: "Swoosh", hint: "Phoenix email library" },
  { value: "bamboo", label: "Bamboo", hint: "Adapter-based transactional email" },
  { value: "none", label: "None", hint: "No email library" },
];

const CACHING_OPTIONS: PromptOption<ElixirCaching>[] = [
  { value: "cachex", label: "Cachex", hint: "In-memory cache" },
  { value: "nebulex", label: "Nebulex", hint: "Cache abstraction" },
  { value: "redix", label: "Redix", hint: "Resilient Redis client" },
  { value: "none", label: "None", hint: "No cache layer" },
];

const OBSERVABILITY_OPTIONS: PromptOption<ElixirObservability>[] = [
  { value: "telemetry", label: "Telemetry", hint: "Phoenix telemetry metrics" },
  { value: "opentelemetry", label: "OpenTelemetry", hint: "Distributed tracing foundation" },
  { value: "prom_ex", label: "PromEx", hint: "Prometheus metrics for Phoenix" },
  { value: "sentry", label: "Sentry", hint: "Exception and performance monitoring" },
  { value: "none", label: "None", hint: "No observability add-on" },
];

const TESTING_OPTIONS: PromptOption<ElixirTesting>[] = [
  { value: "ex_unit", label: "ExUnit", hint: "Standard Elixir tests" },
  { value: "mox", label: "Mox", hint: "Concurrent-safe mocks" },
  { value: "bypass", label: "Bypass", hint: "External HTTP service fakes" },
  { value: "wallaby", label: "Wallaby", hint: "Browser acceptance testing" },
  { value: "stream_data", label: "StreamData", hint: "Property-based testing with shrinking" },
  { value: "ex_machina", label: "ExMachina", hint: "Factories for Ecto-backed tests" },
  { value: "none", label: "None", hint: "No extra test library" },
];

const QUALITY_OPTIONS: PromptOption<ElixirQuality>[] = [
  { value: "credo", label: "Credo", hint: "Static code analysis" },
  { value: "dialyxir", label: "Dialyxir", hint: "Dialyzer integration" },
  { value: "sobelow", label: "Sobelow", hint: "Phoenix security analysis" },
  { value: "excoveralls", label: "ExCoveralls", hint: "Coverage reports and CI integration" },
  { value: "mix_audit", label: "MixAudit", hint: "Audit Hex dependencies for vulnerabilities" },
  { value: "none", label: "None", hint: "No code quality tool" },
];

const I18N_OPTIONS: PromptOption<ElixirI18n>[] = [
  { value: "gettext", label: "Gettext", hint: "Canonical Phoenix localization" },
  { value: "none", label: "None", hint: "No localization layer" },
];

const HTTP_SERVER_OPTIONS: PromptOption<ElixirHttpServer>[] = [
  { value: "bandit", label: "Bandit", hint: "Modern pure-Elixir HTTP/WebSocket server" },
  { value: "cowboy", label: "Cowboy", hint: "Established Erlang HTTP server" },
  { value: "none", label: "None", hint: "No HTTP server dependency" },
];

const APPLICATION_FRAMEWORK_OPTIONS: PromptOption<ElixirApplicationFramework>[] = [
  { value: "ash", label: "Ash Framework", hint: "Resource-oriented application framework" },
  { value: "none", label: "None", hint: "No application framework" },
];

const DOCUMENTATION_OPTIONS: PromptOption<ElixirDocumentation>[] = [
  { value: "ex_doc", label: "ExDoc", hint: "Generate HTML and EPUB API documentation" },
  { value: "none", label: "None", hint: "No documentation generator" },
];

const CLUSTERING_OPTIONS: PromptOption<ElixirClustering>[] = [
  { value: "libcluster", label: "libcluster", hint: "Automatic BEAM cluster formation" },
  { value: "none", label: "None", hint: "No cluster topology" },
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
export const resolveElixirI18nPrompt = (value?: ElixirI18n) =>
  createStaticSinglePromptResolution(I18N_OPTIONS, "none", value);
export const resolveElixirHttpServerPrompt = (value?: ElixirHttpServer) =>
  createStaticSinglePromptResolution(HTTP_SERVER_OPTIONS, "cowboy", value);
export const resolveElixirApplicationFrameworkPrompt = (value?: ElixirApplicationFramework) =>
  createStaticSinglePromptResolution(APPLICATION_FRAMEWORK_OPTIONS, "none", value);
export const resolveElixirDocumentationPrompt = (value?: ElixirDocumentation) =>
  createStaticSinglePromptResolution(DOCUMENTATION_OPTIONS, "none", value);
export const resolveElixirClusteringPrompt = (value?: ElixirClustering) =>
  createStaticSinglePromptResolution(CLUSTERING_OPTIONS, "none", value);
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
export const getElixirI18nChoice = (value?: ElixirI18n) =>
  makeChoice("Select Elixir localization", I18N_OPTIONS, "none", value);
export const getElixirHttpServerChoice = (value?: ElixirHttpServer) =>
  makeChoice("Select Elixir HTTP server", HTTP_SERVER_OPTIONS, "cowboy", value);
export const getElixirApplicationFrameworkChoice = (value?: ElixirApplicationFramework) =>
  makeChoice("Select Elixir application framework", APPLICATION_FRAMEWORK_OPTIONS, "none", value);
export const getElixirDocumentationChoice = (value?: ElixirDocumentation) =>
  makeChoice("Select Elixir documentation", DOCUMENTATION_OPTIONS, "none", value);
export const getElixirClusteringChoice = (value?: ElixirClustering) =>
  makeChoice("Select Elixir clustering", CLUSTERING_OPTIONS, "none", value);
export const getElixirDeployChoice = (value?: ElixirDeploy) =>
  makeChoice("Select Elixir deploy target", DEPLOY_OPTIONS, "none", value);

export const getElixirLibrariesChoice = (value?: ElixirLibraries[]) =>
  makeMultiChoice("Select Elixir libraries", LIBRARY_OPTIONS, [], value);
