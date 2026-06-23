import {
  ADDONS_VALUES,
  AI_DOCS_VALUES,
  AI_VALUES,
  ANALYTICS_VALUES,
  ANIMATION_VALUES,
  API_VALUES,
  ASTRO_INTEGRATION_VALUES,
  AUTH_VALUES,
  BACKEND_VALUES,
  CACHING_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_SETUP_VALUES,
  DATABASE_VALUES,
  DOTNET_API_VALUES,
  DOTNET_AUTH_VALUES,
  DOTNET_CACHING_VALUES,
  DOTNET_DEPLOY_VALUES,
  DOTNET_JOB_QUEUE_VALUES,
  DOTNET_OBSERVABILITY_VALUES,
  DOTNET_ORM_VALUES,
  DOTNET_REALTIME_VALUES,
  DOTNET_TESTING_VALUES,
  DOTNET_VALIDATION_VALUES,
  DOTNET_WEB_FRAMEWORK_VALUES,
  EFFECT_VALUES,
  ELIXIR_API_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_CACHING_VALUES,
  ELIXIR_DEPLOY_VALUES,
  ELIXIR_EMAIL_VALUES,
  ELIXIR_HTTP_VALUES,
  ELIXIR_JOBS_VALUES,
  ELIXIR_JSON_VALUES,
  ELIXIR_LIBRARIES_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_QUALITY_VALUES,
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  EMAIL_VALUES,
  EXAMPLES_VALUES,
  FEATURE_FLAGS_VALUES,
  FILE_STORAGE_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_CACHING_VALUES,
  GO_CLI_VALUES,
  GO_CONFIG_VALUES,
  GO_LOGGING_VALUES,
  GO_MESSAGE_QUEUE_VALUES,
  GO_OBSERVABILITY_VALUES,
  GO_ORM_VALUES,
  GO_REALTIME_VALUES,
  GO_TESTING_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  I18N_VALUES,
  JAVA_API_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_BUILD_TOOL_VALUES,
  JAVA_LIBRARIES_VALUES,
  JAVA_LOGGING_VALUES,
  JAVA_ORM_VALUES,
  JAVA_TESTING_LIBRARIES_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  MOBILE_DEEP_LINKING_VALUES,
  MOBILE_NAVIGATION_VALUES,
  MOBILE_OTA_VALUES,
  MOBILE_PUSH_VALUES,
  MOBILE_STORAGE_VALUES,
  MOBILE_TESTING_VALUES,
  MOBILE_UI_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PAYMENTS_VALUES,
  PYTHON_AI_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_CACHING_VALUES,
  PYTHON_CLI_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_OBSERVABILITY_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_REALTIME_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_TESTING_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  RATE_LIMIT_VALUES,
  REALTIME_VALUES,
  RUNTIME_VALUES,
  RUST_API_VALUES,
  RUST_AUTH_VALUES,
  RUST_CACHING_VALUES,
  RUST_CLI_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_MESSAGE_QUEUE_VALUES,
  RUST_OBSERVABILITY_VALUES,
  RUST_ORM_VALUES,
  RUST_REALTIME_VALUES,
  RUST_TEMPLATING_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  SEARCH_VALUES,
  VECTOR_DB_VALUES,
  SERVER_DEPLOY_VALUES,
  STATE_MANAGEMENT_VALUES,
  TESTING_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  WEB_DEPLOY_VALUES,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Tier-2 coverage guard (generalises check-types-coverage.test.ts).
 *
 * For every category enum in the schema, every non-"none" value must be
 * "generatable" — i.e. something in the template tree or the generator source
 * actually produces output for it. A value is generatable when:
 *   (a) a template directory is named after the value (e.g. api/trpc, auth/clerk), OR
 *   (b) the value appears as a quoted Handlebars/string literal in a `.hbs`
 *       (typically `{{#if (eq x "value")}}`), OR
 *   (c) the value appears as a quoted string literal in a processor/handler `.ts`
 *       (e.g. `config.dotnetOrm === "ef-core"`).
 *
 * This catches the ".NET selectable-but-not-generated" class: a schema enum
 * exposes a value to users but no template/handler ever branches on it, so the
 * scaffold silently ignores the choice.
 *
 * Genuine gaps live in ALLOWLIST with a documented reason. Prefer implementing
 * the value over allowlisting it.
 */

const GENERATOR_ROOT = path.resolve(import.meta.dir, "../../../packages/template-generator");
const TEMPLATES_DIR = path.join(GENERATOR_ROOT, "templates");
const SRC_DIR = path.join(GENERATOR_ROOT, "src");

const BINARY_EXT = /\.(png|jpe?g|gif|ico|webp|woff2?|ttf|otf|eot|wasm|avif|mp4|pdf)$/i;

function collect(dir: string, opts: { dirs?: Set<string>; files: string[] }): void {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      opts.dirs?.add(entry);
      collect(full, opts);
    } else {
      opts.files.push(full);
    }
  }
}

const dirNames = new Set<string>();
const files: string[] = [];
collect(TEMPLATES_DIR, { dirs: dirNames, files });
collect(SRC_DIR, { files });

function buildCorpus(fileList: string[]): string {
  let text = "";
  for (const file of fileList) {
    if (BINARY_EXT.test(file)) continue;
    try {
      text += `\n${readFileSync(file, "utf8")}`;
    } catch {
      // ignore unreadable/binary files
    }
  }
  return text;
}

const corpus = buildCorpus(files);

// .NET is a stub ecosystem whose values are gated only inside templates/dotnet-base
// and the dotnet handler. Matching dotnet values against the GLOBAL corpus
// false-positives (e.g. "aspnet-mvc"/"aspnet-blazor" appear only as keys in the
// graph-backend display-name map; "aws" appears in the SST deploy template), which
// would mask genuinely selectable-but-not-generated .NET options. So dotnet
// categories are scoped to dotnet-relevant files only.
const dotnetCorpus = buildCorpus(files.filter((file) => file.includes("dotnet")));

function isGeneratable(value: string, category: string): boolean {
  if (category.startsWith("dotnet")) {
    return dotnetCorpus.includes(`"${value}"`) || dotnetCorpus.includes(`'${value}'`);
  }
  return dirNames.has(value) || corpus.includes(`"${value}"`) || corpus.includes(`'${value}'`);
}

const CATEGORY_VALUES: Record<string, readonly string[]> = {
  database: DATABASE_VALUES,
  orm: ORM_VALUES,
  backend: BACKEND_VALUES,
  runtime: RUNTIME_VALUES,
  api: API_VALUES,
  auth: AUTH_VALUES,
  payments: PAYMENTS_VALUES,
  dbSetup: DATABASE_SETUP_VALUES,
  frontend: FRONTEND_VALUES,
  addons: ADDONS_VALUES,
  examples: EXAMPLES_VALUES,
  ai: AI_VALUES,
  effect: EFFECT_VALUES,
  stateManagement: STATE_MANAGEMENT_VALUES,
  forms: FORMS_VALUES,
  testing: TESTING_VALUES,
  email: EMAIL_VALUES,
  cssFramework: CSS_FRAMEWORK_VALUES,
  uiLibrary: UI_LIBRARY_VALUES,
  validation: VALIDATION_VALUES,
  realtime: REALTIME_VALUES,
  jobQueue: JOB_QUEUE_VALUES,
  animation: ANIMATION_VALUES,
  fileUpload: FILE_UPLOAD_VALUES,
  logging: LOGGING_VALUES,
  observability: OBSERVABILITY_VALUES,
  featureFlags: FEATURE_FLAGS_VALUES,
  analytics: ANALYTICS_VALUES,
  cms: CMS_VALUES,
  caching: CACHING_VALUES,
  rateLimit: RATE_LIMIT_VALUES,
  i18n: I18N_VALUES,
  search: SEARCH_VALUES,
  vectorDb: VECTOR_DB_VALUES,
  fileStorage: FILE_STORAGE_VALUES,
  webDeploy: WEB_DEPLOY_VALUES,
  serverDeploy: SERVER_DEPLOY_VALUES,
  astroIntegration: ASTRO_INTEGRATION_VALUES,
  aiDocs: AI_DOCS_VALUES,
  mobileNavigation: MOBILE_NAVIGATION_VALUES,
  mobileUI: MOBILE_UI_VALUES,
  mobileStorage: MOBILE_STORAGE_VALUES,
  mobileTesting: MOBILE_TESTING_VALUES,
  mobilePush: MOBILE_PUSH_VALUES,
  mobileOTA: MOBILE_OTA_VALUES,
  mobileDeepLinking: MOBILE_DEEP_LINKING_VALUES,
  rustWebFramework: RUST_WEB_FRAMEWORK_VALUES,
  rustFrontend: RUST_FRONTEND_VALUES,
  rustOrm: RUST_ORM_VALUES,
  rustApi: RUST_API_VALUES,
  rustCli: RUST_CLI_VALUES,
  rustLibraries: RUST_LIBRARIES_VALUES,
  rustLogging: RUST_LOGGING_VALUES,
  rustErrorHandling: RUST_ERROR_HANDLING_VALUES,
  rustCaching: RUST_CACHING_VALUES,
  rustAuth: RUST_AUTH_VALUES,
  rustRealtime: RUST_REALTIME_VALUES,
  rustMessageQueue: RUST_MESSAGE_QUEUE_VALUES,
  rustObservability: RUST_OBSERVABILITY_VALUES,
  rustTemplating: RUST_TEMPLATING_VALUES,
  pythonWebFramework: PYTHON_WEB_FRAMEWORK_VALUES,
  pythonOrm: PYTHON_ORM_VALUES,
  pythonValidation: PYTHON_VALIDATION_VALUES,
  pythonAi: PYTHON_AI_VALUES,
  pythonAuth: PYTHON_AUTH_VALUES,
  pythonApi: PYTHON_API_VALUES,
  pythonTaskQueue: PYTHON_TASK_QUEUE_VALUES,
  pythonGraphql: PYTHON_GRAPHQL_VALUES,
  pythonQuality: PYTHON_QUALITY_VALUES,
  pythonTesting: PYTHON_TESTING_VALUES,
  pythonCaching: PYTHON_CACHING_VALUES,
  pythonRealtime: PYTHON_REALTIME_VALUES,
  pythonObservability: PYTHON_OBSERVABILITY_VALUES,
  pythonCli: PYTHON_CLI_VALUES,
  goWebFramework: GO_WEB_FRAMEWORK_VALUES,
  goOrm: GO_ORM_VALUES,
  goApi: GO_API_VALUES,
  goCli: GO_CLI_VALUES,
  goLogging: GO_LOGGING_VALUES,
  goAuth: GO_AUTH_VALUES,
  goTesting: GO_TESTING_VALUES,
  goRealtime: GO_REALTIME_VALUES,
  goMessageQueue: GO_MESSAGE_QUEUE_VALUES,
  goCaching: GO_CACHING_VALUES,
  goConfig: GO_CONFIG_VALUES,
  goObservability: GO_OBSERVABILITY_VALUES,
  javaWebFramework: JAVA_WEB_FRAMEWORK_VALUES,
  javaBuildTool: JAVA_BUILD_TOOL_VALUES,
  javaOrm: JAVA_ORM_VALUES,
  javaAuth: JAVA_AUTH_VALUES,
  javaApi: JAVA_API_VALUES,
  javaLogging: JAVA_LOGGING_VALUES,
  javaLibraries: JAVA_LIBRARIES_VALUES,
  javaTestingLibraries: JAVA_TESTING_LIBRARIES_VALUES,
  dotnetWebFramework: DOTNET_WEB_FRAMEWORK_VALUES,
  dotnetOrm: DOTNET_ORM_VALUES,
  dotnetAuth: DOTNET_AUTH_VALUES,
  dotnetApi: DOTNET_API_VALUES,
  dotnetTesting: DOTNET_TESTING_VALUES,
  dotnetJobQueue: DOTNET_JOB_QUEUE_VALUES,
  dotnetRealtime: DOTNET_REALTIME_VALUES,
  dotnetObservability: DOTNET_OBSERVABILITY_VALUES,
  dotnetValidation: DOTNET_VALIDATION_VALUES,
  dotnetCaching: DOTNET_CACHING_VALUES,
  dotnetDeploy: DOTNET_DEPLOY_VALUES,
  elixirWebFramework: ELIXIR_WEB_FRAMEWORK_VALUES,
  elixirOrm: ELIXIR_ORM_VALUES,
  elixirAuth: ELIXIR_AUTH_VALUES,
  elixirApi: ELIXIR_API_VALUES,
  elixirLibraries: ELIXIR_LIBRARIES_VALUES,
  elixirRealtime: ELIXIR_REALTIME_VALUES,
  elixirJobs: ELIXIR_JOBS_VALUES,
  elixirValidation: ELIXIR_VALIDATION_VALUES,
  elixirHttp: ELIXIR_HTTP_VALUES,
  elixirJson: ELIXIR_JSON_VALUES,
  elixirEmail: ELIXIR_EMAIL_VALUES,
  elixirCaching: ELIXIR_CACHING_VALUES,
  elixirObservability: ELIXIR_OBSERVABILITY_VALUES,
  elixirTesting: ELIXIR_TESTING_VALUES,
  elixirQuality: ELIXIR_QUALITY_VALUES,
  elixirDeploy: ELIXIR_DEPLOY_VALUES,
};

/**
 * Schema values that are selectable but intentionally (or knowingly) not gated
 * on their own literal in the generator. Keyed `category:value`; every entry
 * needs a documented reason. Two flavours:
 *   - "Unimplemented": no template/handler produces anything for the value.
 *   - "Baseline": the feature ships unconditionally (or via a derived flag),
 *     so it is never matched against its own enum literal.
 */
const ALLOWLIST = new Map<string, string>([
  // Addons selectable in the schema but with no generator output.
  ["addons:skills", "Unimplemented: no template dir or processor/handler reference."],
  [
    "addons:fumadocs",
    "Unimplemented: only in catalogs.ts version list; no template/handler output.",
  ],
  ["addons:ultracite", "Unimplemented: no template dir or processor/handler reference."],
  ["addons:opentui", "Unimplemented: no template dir or processor/handler reference."],
  ["addons:wxt", "Unimplemented: no template dir or processor/handler reference."],
  // Baseline/default values that ship unconditionally.
  [
    "forms:react-hook-form",
    "Baseline: default React forms lib bundled in templates; not gated on literal.",
  ],
  [
    "javaTestingLibraries:junit5",
    "Baseline: JUnit5 always-on via starter-test; never gated on the literal.",
  ],
  // .NET: dotnet-base only implements a subset of each enum.
  [
    "dotnetWebFramework:aspnet-minimal",
    "Baseline: dotnet-base emits the minimal-API scaffold unconditionally; never gated on the literal.",
  ],
  [
    "dotnetWebFramework:aspnet-mvc",
    "Unimplemented: dotnet-base never branches on dotnetWebFramework; MVC yields the same minimal-API scaffold.",
  ],
  [
    "dotnetWebFramework:aspnet-blazor",
    "Unimplemented: dotnet-base never branches on dotnetWebFramework; Blazor yields the same minimal-API scaffold (no Blazor components).",
  ],
  ["dotnetDeploy:aws", "Unimplemented: no AWS target; dotnet-base only handles docker."],
  ["dotnetOrm:dapper", "Unimplemented: dotnet-base only implements ef-core; no dapper branch."],
  ["dotnetOrm:linq2db", "Unimplemented: dotnet-base only implements ef-core; no linq2db branch."],
  [
    "dotnetAuth:duende-identityserver",
    "Unimplemented: dotnet-base only implements aspnet-identity.",
  ],
  ["dotnetAuth:auth0-aspnet", "Unimplemented: dotnet-base only implements aspnet-identity."],
  ["dotnetDeploy:azure", "Unimplemented: no Azure target; dotnet-base only handles docker."],
  // Elixir: Phoenix baselines / derived-flag-gated, not literal-gated.
  ["elixirOrm:ecto", "Baseline: Ecto ships via hasEcto derived flag; not gated on 'ecto' literal."],
  [
    "elixirRealtime:pubsub",
    "Baseline: Phoenix.PubSub configured unconditionally; not literal-gated.",
  ],
  ["elixirRealtime:live-view-streams", "Unimplemented: no template/handler reference."],
  [
    "elixirValidation:ecto-changesets",
    "Baseline: Ecto changesets default validation; not literal-gated.",
  ],
  ["elixirObservability:telemetry", "Baseline: telemetry deps ship in mix.exs; not literal-gated."],
  ["elixirTesting:ex_unit", "Baseline: ExUnit always-on test framework; not literal-gated."],
]);

describe("schema/template generatability coverage", () => {
  it("discovers the generator template tree and source corpus", () => {
    expect(files.length).toBeGreaterThan(500);
    expect(dirNames.size).toBeGreaterThan(100);
    expect(Object.keys(CATEGORY_VALUES).length).toBeGreaterThan(100);
  });

  it("every non-none schema value is generatable or explicitly allowlisted", () => {
    const offenders: string[] = [];
    for (const [category, values] of Object.entries(CATEGORY_VALUES)) {
      for (const value of values) {
        if (value === "none") continue;
        const key = `${category}:${value}`;
        if (ALLOWLIST.has(key)) continue;
        if (!isGeneratable(value, category)) offenders.push(key);
      }
    }
    // A non-empty list means a schema enum value can be selected by users but
    // has no template dir, Handlebars conditional, or processor/handler that
    // generates anything for it. Implement it, or allowlist it with a reason.
    expect(offenders).toEqual([]);
  });

  it("keeps the allowlist honest (entries are valid and still ungenerated)", () => {
    const stale: string[] = [];
    for (const [key, reason] of ALLOWLIST) {
      if (!reason || reason.trim().length === 0) {
        stale.push(`${key} (missing reason)`);
        continue;
      }
      const [category, ...rest] = key.split(":");
      const value = rest.join(":");
      const values = CATEGORY_VALUES[category];
      if (!values) {
        stale.push(`${key} (unknown category)`);
        continue;
      }
      if (!values.includes(value)) {
        stale.push(`${key} (value not in ${category} enum)`);
        continue;
      }
      if (isGeneratable(value, category)) {
        stale.push(`${key} (now generatable — remove from allowlist)`);
      }
    }
    expect(stale).toEqual([]);
  });
});
