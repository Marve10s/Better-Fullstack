export const LAUNCH_RADAR_RELEASE_ID = "development-library-expansion-2026-07b";
export const LAUNCH_RADAR_SEEN_EVENT = "better-fullstack:launch-radar-seen";
export const LAUNCH_RADAR_OPEN_EVENT = "better-fullstack:launch-radar-open";

const LAUNCH_RADAR_STORAGE_KEY = `better-fullstack.launch-radar.${LAUNCH_RADAR_RELEASE_ID}`;
const VISITOR_STORAGE_KEY = "better-fullstack.has-visited";
const FIRST_VISIT_SESSION_KEY = "better-fullstack.launch-radar.first-visit-session";

export const NEW_OPTION_IDS_BY_CATEGORY = {
  webFrontend: ["vanilla-vite", "vue"],
  payments: ["paypal"],
  analytics: ["ga4"],
  cssFramework: ["styled-components"],
  codeQuality: ["eslint", "prettier"],
  appShells: ["electron", "tauri", "capacitor", "pwa", "wxt", "opentui"],
  appPlatforms: ["axios", "firebase", "graphql-codegen", "openapi-typescript", "apollo-client"],
  mobileLibraries: [
    "expo-sqlite",
    "expo-camera",
    "expo-image-picker",
    "expo-location",
    "expo-sensors",
    "expo-file-system",
    "expo-image",
    "expo-audio",
    "expo-video",
    "expo-contacts",
    "expo-calendar",
    "expo-local-authentication",
    "expo-sharing",
    "expo-clipboard",
    "expo-task-manager",
    "expo-background-task",
    "expo-maps",
    "expo-brightness",
    "expo-battery",
    "expo-screen-capture",
  ],
  ai: ["openai-sdk", "anthropic-sdk"],
  realtime: ["ws"],
  testing: ["mocha"],
  cms: ["contentful"],
  rustWebFramework: ["warp", "salvo"],
  rustFrontend: ["yew"],
  rustOrm: ["mongodb", "rusqlite", "tokio-postgres"],
  rustApi: ["jsonrpsee"],
  rustLibraries: ["rand", "regex", "rayon", "itertools", "rstest", "cargo-nextest", "cargo-audit"],
  rustAuth: ["openidconnect", "tower-sessions"],
  rustMessageQueue: ["rdkafka", "async-nats"],
  rustObservability: ["metrics"],
  rustTemplating: ["minijinja"],
  goWebFramework: ["go-zero", "kratos", "httprouter"],
  goOrm: ["sqlx"],
  goApi: ["grpc-gateway", "connect-go", "oapi-codegen"],
  goAuth: ["oauth2"],
  goTesting: ["testcontainers", "ginkgo-gomega", "mockery"],
  goMessageQueue: ["kafka-go", "asynq"],
  goObservability: ["prometheus"],
  goValidation: ["validator"],
  goQuality: ["golangci-lint"],
  goMigrations: ["golang-migrate"],
  goTemplating: ["templ"],
  goProtoTooling: ["buf"],
  goDI: ["fx"],
  elixirOrm: ["myxql", "ecto_sqlite3"],
  elixirAuth: ["pow"],
  elixirApi: ["open_api_spex"],
  elixirHttp: ["tesla"],
  elixirEmail: ["bamboo"],
  elixirCaching: ["redix"],
  elixirObservability: ["sentry"],
  elixirTesting: ["stream_data", "ex_machina"],
  elixirQuality: ["excoveralls", "mix_audit"],
  elixirI18n: ["gettext"],
  elixirHttpServer: ["bandit", "cowboy"],
  elixirApplicationFramework: ["ash"],
  elixirDocumentation: ["ex_doc"],
  elixirClustering: ["libcluster"],
  elixirLibraries: ["ex_aws", "floki", "rustler"],
  pythonWebFramework: ["aiohttp", "streamlit"],
  pythonOrm: ["pymongo"],
  pythonAi: ["pytorch", "transformers", "scikit-learn", "tensorflow", "mcp"],
  pythonAuth: ["pyjwt"],
  pythonTesting: ["pytest-cov"],
  pythonObservability: ["prometheus-client"],
  pythonCloudSdk: ["boto3"],
  pythonHttpClient: ["requests"],
  pythonData: ["numpy", "pandas", "scipy"],
  pythonMedia: ["pillow"],
  pythonServer: ["gunicorn"],
  pythonPackageManager: ["poetry"],
  pythonMessageQueue: ["confluent-kafka"],
  javaLibraries: [
    "spring-data-redis",
    "spring-data-mongodb",
    "spring-data-elasticsearch",
    "spring-data-neo4j",
    "spring-data-cassandra",
    "spring-data-couchbase",
    "spring-data-jdbc",
    "spring-data-rest",
    "spring-quartz",
    "spring-pulsar",
    "spring-integration",
    "spring-websocket",
    "spring-rsocket",
    "spring-hateoas",
    "spring-session-redis",
    "spring-session-jdbc",
    "spring-ldap",
    "spring-oauth2-client",
    "spring-saml2",
    "spring-restclient",
  ],
  dotnetLibraries: [
    "automapper",
    "mediatr",
    "fastendpoints",
    "api-versioning",
    "scalar",
    "polly",
    "masstransit",
    "rebus",
    "coravel",
    "magic-onion",
    "prometheus-net",
    "seq",
    "application-insights",
    "sentry",
    "mongodb-driver",
    "nhibernate",
    "mapster",
    "scrutor",
    "refit",
    "fluent-email",
  ],
} as const satisfies Record<string, readonly string[]>;

type NewOptionCategory = keyof typeof NEW_OPTION_IDS_BY_CATEGORY;

const NEW_OPTION_LOOKUP = new Map<string, ReadonlySet<string>>(
  Object.entries(NEW_OPTION_IDS_BY_CATEGORY).map(([category, ids]) => [category, new Set(ids)]),
);

export type LaunchRadarGroup = {
  id: "typescript" | "rust" | "python" | "go" | "java" | "elixir" | "dotnet";
  name: string;
  count: number;
  accent: string;
  description: string;
  categories: readonly NewOptionCategory[];
  featuredOptionIds: readonly string[];
};

function countCategories(categories: readonly NewOptionCategory[]): number {
  return categories.reduce(
    (total, category) => total + NEW_OPTION_IDS_BY_CATEGORY[category].length,
    0,
  );
}

const TYPESCRIPT_CATEGORIES = [
  "webFrontend",
  "payments",
  "analytics",
  "cssFramework",
  "codeQuality",
  "appShells",
  "appPlatforms",
  "mobileLibraries",
  "ai",
  "realtime",
  "testing",
  "cms",
] as const;
const RUST_CATEGORIES = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustLibraries",
  "rustAuth",
  "rustMessageQueue",
  "rustObservability",
  "rustTemplating",
] as const;
const PYTHON_CATEGORIES = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonAi",
  "pythonAuth",
  "pythonTesting",
  "pythonObservability",
  "pythonCloudSdk",
  "pythonHttpClient",
  "pythonData",
  "pythonMedia",
  "pythonServer",
  "pythonPackageManager",
  "pythonMessageQueue",
] as const;
const GO_CATEGORIES = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goAuth",
  "goTesting",
  "goMessageQueue",
  "goObservability",
  "goValidation",
  "goQuality",
  "goMigrations",
  "goTemplating",
  "goProtoTooling",
  "goDI",
] as const;
const JAVA_CATEGORIES = ["javaLibraries"] as const;
const ELIXIR_CATEGORIES = [
  "elixirOrm",
  "elixirAuth",
  "elixirApi",
  "elixirHttp",
  "elixirEmail",
  "elixirCaching",
  "elixirObservability",
  "elixirTesting",
  "elixirQuality",
  "elixirI18n",
  "elixirHttpServer",
  "elixirApplicationFramework",
  "elixirDocumentation",
  "elixirClustering",
  "elixirLibraries",
] as const;
const DOTNET_CATEGORIES = ["dotnetLibraries"] as const;

export const LAUNCH_RADAR_GROUPS: readonly LaunchRadarGroup[] = [
  {
    id: "typescript",
    name: "TypeScript",
    count: countCategories(TYPESCRIPT_CATEGORIES),
    accent: "#18D5FF",
    description:
      "New frontends, desktop and mobile shells, Expo modules, SDKs, GraphQL tooling, payments, testing, and code quality.",
    categories: TYPESCRIPT_CATEGORIES,
    featuredOptionIds: ["vue", "electron", "expo-camera", "apollo-client", "openai-sdk", "paypal"],
  },
  {
    id: "rust",
    name: "Rust",
    count: countCategories(RUST_CATEGORIES),
    accent: "#FF5C8A",
    description:
      "Yew joins Warp and Salvo alongside new data, auth, messaging, observability, and test tooling.",
    categories: RUST_CATEGORIES,
    featuredOptionIds: ["yew", "warp", "salvo", "mongodb", "jsonrpsee", "cargo-nextest"],
  },
  {
    id: "python",
    name: "Python",
    count: countCategories(PYTHON_CATEGORIES),
    accent: "#FFD43B",
    description:
      "New async and data apps, plus ML, cloud, metrics, Kafka, packaging, and production serving.",
    categories: PYTHON_CATEGORIES,
    featuredOptionIds: ["streamlit", "pytorch", "transformers", "numpy", "pymongo", "mcp"],
  },
  {
    id: "go",
    name: "Go",
    count: countCategories(GO_CATEGORIES),
    accent: "#00ADD8",
    description:
      "More frameworks and APIs, plus production-ready testing, queues, validation, migrations, and DI.",
    categories: GO_CATEGORIES,
    featuredOptionIds: [
      "go-zero",
      "kratos",
      "connect-go",
      "testcontainers",
      "kafka-go",
      "golangci-lint",
    ],
  },
  {
    id: "java",
    name: "Java",
    count: countCategories(JAVA_CATEGORIES),
    accent: "#F97316",
    description:
      "A deeper Spring toolbox spanning data stores, messaging, realtime, sessions, security, and resilient HTTP.",
    categories: JAVA_CATEGORIES,
    featuredOptionIds: [
      "spring-data-mongodb",
      "spring-quartz",
      "spring-pulsar",
      "spring-websocket",
      "spring-oauth2-client",
      "spring-restclient",
    ],
  },
  {
    id: "elixir",
    name: "Elixir",
    count: countCategories(ELIXIR_CATEGORIES),
    accent: "#C6E853",
    description:
      "A broader Phoenix toolbox spanning data, auth, OpenAPI, caching, quality, clustering, and native extensions.",
    categories: ELIXIR_CATEGORIES,
    featuredOptionIds: ["ash", "bandit", "open_api_spex", "sentry", "libcluster", "rustler"],
  },
  {
    id: "dotnet",
    name: ".NET",
    count: countCategories(DOTNET_CATEGORIES),
    accent: "#8B5CF6",
    description:
      "Twenty production-ready additions spanning endpoints, messaging, observability, data access, mapping, and email.",
    categories: DOTNET_CATEGORIES,
    featuredOptionIds: [
      "fastendpoints",
      "polly",
      "masstransit",
      "magic-onion",
      "application-insights",
      "mongodb-driver",
    ],
  },
];

export const LAUNCH_RADAR_TOTAL = LAUNCH_RADAR_GROUPS.reduce(
  (total, group) => total + group.count,
  0,
);

const FEATURED_OPTION_LABELS: Readonly<Record<string, string>> = {
  vue: "Vue",
  electron: "Electron",
  "expo-camera": "Expo Camera",
  "apollo-client": "Apollo Client",
  "openai-sdk": "OpenAI SDK",
  paypal: "PayPal",
  yew: "Yew",
  warp: "Warp",
  salvo: "Salvo",
  mongodb: "MongoDB",
  jsonrpsee: "jsonrpsee",
  "cargo-nextest": "cargo-nextest",
  streamlit: "Streamlit",
  pytorch: "PyTorch",
  transformers: "Transformers",
  numpy: "NumPy",
  pymongo: "PyMongo",
  mcp: "MCP Python SDK",
  "go-zero": "go-zero",
  kratos: "Kratos",
  "connect-go": "Connect",
  testcontainers: "Testcontainers",
  "kafka-go": "kafka-go",
  "golangci-lint": "golangci-lint",
  "spring-data-mongodb": "Spring Data MongoDB",
  "spring-quartz": "Quartz Scheduler",
  "spring-pulsar": "Spring for Apache Pulsar",
  "spring-websocket": "Spring WebSocket",
  "spring-oauth2-client": "Spring OAuth2 Client",
  "spring-restclient": "Spring REST Client",
  ash: "Ash",
  bandit: "Bandit",
  open_api_spex: "OpenApiSpex",
  sentry: "Sentry",
  libcluster: "libcluster",
  rustler: "Rustler",
  fastendpoints: "FastEndpoints",
  polly: "Polly",
  masstransit: "MassTransit",
  "magic-onion": "MagicOnion",
  "application-insights": "Application Insights",
  "mongodb-driver": "MongoDB Driver",
};

export function getLaunchRadarOptionLabel(optionId: string): string {
  return FEATURED_OPTION_LABELS[optionId] ?? optionId;
}

export function isLaunchRadarNewOption(category: string, optionId: string): boolean {
  return NEW_OPTION_LOOKUP.get(category)?.has(optionId) ?? false;
}

export function hasSeenLaunchRadar(storage: Pick<Storage, "getItem"> | null): boolean {
  try {
    return storage?.getItem(LAUNCH_RADAR_STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

export function registerLaunchRadarVisit(
  persistentStorage: Pick<Storage, "getItem" | "setItem"> | null,
  sessionStorage: Pick<Storage, "getItem" | "setItem"> | null,
): boolean {
  try {
    const isFirstVisitSession =
      sessionStorage?.getItem(FIRST_VISIT_SESSION_KEY) === "true";
    const hasVisited = persistentStorage?.getItem(VISITOR_STORAGE_KEY) === "true";

    if (!hasVisited) {
      persistentStorage?.setItem(VISITOR_STORAGE_KEY, "true");
      sessionStorage?.setItem(FIRST_VISIT_SESSION_KEY, "true");
      return false;
    }

    return !isFirstVisitSession;
  } catch {
    return false;
  }
}

export function markLaunchRadarSeen(storage?: Pick<Storage, "setItem"> | null): void {
  const target = storage ?? (typeof window === "undefined" ? null : window.localStorage);
  try {
    target?.setItem(LAUNCH_RADAR_STORAGE_KEY, "seen");
  } catch {
    // Storage can be unavailable in private mode; the current interaction still succeeds.
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event(LAUNCH_RADAR_SEEN_EVENT));
}

export function requestLaunchRadarOpen(): void {
  markLaunchRadarSeen();
  if (typeof window !== "undefined") window.dispatchEvent(new Event(LAUNCH_RADAR_OPEN_EVENT));
}
