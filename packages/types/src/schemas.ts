import { z } from "zod";

export const EcosystemSchema = z
  .enum(["typescript", "react-native", "rust", "python", "go", "java", "elixir", "dotnet"])
  .describe(
    "Language ecosystem (typescript, react-native, rust, python, go, java, elixir, or dotnet)",
  );

export const StackPartEcosystemSchema = z
  .union([EcosystemSchema, z.literal("universal")])
  .describe("Ecosystem adapter for a selected stack part");

export const StackPartRoleSchema = z
  .enum([
    "frontend",
    "backend",
    "mobile",
    "database",
    "api",
    "graphql",
    "orm",
    "auth",
    "runtime",
    "deploy",
    "dbSetup",
    "realtime",
    "navigation",
    "caching",
    "observability",
    "email",
    "search",
    "vectorDb",
    "fileStorage",
    "jobQueue",
    "rateLimit",
    "testing",
    "stateManagement",
    "forms",
    "animation",
    "fileUpload",
    "validation",
    "effect",
    "ui",
    "css",
    "storage",
    "push",
    "ota",
    "deepLinking",
    "ai",
    "payments",
    "logging",
    "featureFlags",
    "analytics",
    "cms",
    "i18n",
    "documentation",
    "codeQuality",
    "appPlatform",
    "dataFetching",
    "workspaceTooling",
    "examples",
    "buildTool",
    "cli",
    "errorHandling",
    "httpClient",
    "libraries",
    "config",
    "templating",
  ])
  .describe("Role a selected tool plays in the stack graph");

export const StackPartSourceSchema = z
  .enum(["selected", "defaulted", "provided", "legacy", "adjusted"])
  .describe("How a stack part entered the stack graph");

export const StackPartSchema = z.object({
  id: z.string().min(1),
  role: StackPartRoleSchema,
  toolId: z.string().min(1),
  ecosystem: StackPartEcosystemSchema,
  ownerPartId: z.string().min(1).optional(),
  source: StackPartSourceSchema,
  providedByPartId: z.string().min(1).optional(),
  targetPath: z.string().min(1).optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
});

export const DatabaseSchema = z
  .enum(["none", "sqlite", "postgres", "mysql", "mongodb", "edgedb", "redis"])
  .describe("Database type");

export const ORMSchema = z
  .enum(["drizzle", "prisma", "mongoose", "typeorm", "kysely", "mikroorm", "sequelize", "none"])
  .describe("ORM type");

export const BackendSchema = z
  .enum([
    "hono",
    "express",
    "fastify",
    "elysia",
    "fets",
    "effect",
    "nestjs",
    "adonisjs",
    "nitro",
    "encore",
    "convex",
    "self",
    "none",
  ])
  .describe("Backend framework");

export const RuntimeSchema = z
  .enum(["bun", "node", "workers", "none"])
  .describe("Runtime environment");

export const FrontendSchema = z
  .enum([
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "vinext",
    "nuxt",
    "native-bare",
    "native-uniwind",
    "native-unistyles",
    "svelte",
    "solid",
    "solid-start",
    "astro",
    "qwik",
    "angular",
    "redwood",
    "fresh",
    "none",
  ])
  .describe("Frontend framework");

export const AstroIntegrationSchema = z
  .enum(["react", "vue", "svelte", "solid", "none"])
  .describe("Astro UI framework integration");

export const AddonsSchema = z
  .enum([
    "pwa",
    "tauri",
    "starlight",
    "biome",
    "lefthook",
    "husky",
    "ruler",
    "mcp",
    "skills",
    "turborepo",
    "nx",
    "fumadocs",
    "ultracite",
    "oxlint",
    "opentui",
    "wxt",
    "msw",
    "storybook",
    "swr",
    "tanstack-query",
    "tanstack-table",
    "tanstack-virtual",
    "tanstack-db",
    "tanstack-pacer",
    "backend-utils",
    "devcontainer",
    "docker-compose",
    "github-actions",
    "none",
  ])
  .describe("Additional addons");

export const ExamplesSchema = z
  .enum(["ai", "chat-sdk", "tanstack-showcase", "none"])
  .describe("Example templates to include");

export const PackageManagerSchema = z
  .enum(["npm", "pnpm", "bun", "yarn"])
  .describe("Package manager");

export const VersionChannelSchema = z
  .enum(["stable", "latest", "beta"])
  .describe("Dependency version channel");

export const WorkspaceShapeSchema = z
  .enum(["monorepo", "single-app"])
  .describe("Workspace layout: monorepo (apps/* + packages/*) or single-app (flat root app)");

export const DatabaseSetupSchema = z
  .enum([
    "turso",
    "neon",
    "prisma-postgres",
    "planetscale",
    "mongodb-atlas",
    "supabase",
    "upstash",
    "d1",
    "docker",
    "none",
  ])
  .describe("Database hosting setup");

export const APISchema = z
  .enum(["trpc", "orpc", "ts-rest", "garph", "graphql-yoga", "apollo-server", "openapi", "none"])
  .describe("API type");

export const AuthSchema = z
  .enum([
    "better-auth",
    "better-auth-organizations",
    "go-better-auth",
    "clerk",
    "nextauth",
    "stack-auth",
    "supabase-auth",
    "auth0",
    "workos",
    "kinde",
    "none",
  ])
  .describe("Authentication provider");

export const PaymentsSchema = z
  .enum([
    "revenuecat",
    "polar",
    "stripe",
    "lemon-squeezy",
    "paddle",
    "dodo",
    "creem",
    "autumn",
    "commet",
    "none",
  ])
  .describe("Payments provider");

export const WebDeploySchema = z
  .enum(["cloudflare", "fly", "railway", "render", "netlify", "docker", "sst", "vercel", "none"])
  .describe("Web deployment");

export const ServerDeploySchema = z
  .enum(["cloudflare", "fly", "railway", "render", "netlify", "docker", "sst", "vercel", "none"])
  .describe("Server deployment");

export const AISchema = z
  .enum([
    "vercel-ai",
    "mastra",
    "voltagent",
    "langgraph",
    "openai-agents",
    "google-adk",
    "modelfusion",
    "langchain",
    "llamaindex",
    "tanstack-ai",
    "ai-cli",
    "none",
  ])
  .describe("AI SDK");

export const EffectSchema = z
  .enum(["effect", "effect-full", "none"])
  .describe(
    "Effect services/layers for TypeScript (effect-full includes effect/Schema, @effect/platform, @effect/sql)",
  );

export const StateManagementSchema = z
  .enum([
    "zustand",
    "jotai",
    "nanostores",
    "redux-toolkit",
    "mobx",
    "xstate",
    "valtio",
    "tanstack-store",
    "legend-state",
    "none",
  ])
  .describe("State management library");

export const FormsSchema = z
  .enum([
    "tanstack-form",
    "react-hook-form",
    "formik",
    "final-form",
    "conform",
    "modular-forms",
    "none",
  ])
  .describe("Form handling library");

export const ValidationSchema = z
  .enum(["zod", "valibot", "arktype", "typebox", "typia", "runtypes", "effect-schema", "none"])
  .describe("Schema validation library (none uses Zod as default for internal usage)");

export const TestingSchema = z
  .enum(["vitest", "playwright", "vitest-playwright", "jest", "cypress", "none"])
  .describe("Testing framework (vitest-playwright includes both unit and e2e testing)");

export const EmailSchema = z
  .enum([
    "react-email",
    "resend",
    "nodemailer",
    "postmark",
    "sendgrid",
    "aws-ses",
    "mailgun",
    "plunk",
    "none",
  ])
  .describe(
    "Email solution (resend includes react-email, nodemailer is classic Node.js email, postmark/sendgrid/aws-ses/mailgun/plunk are transactional email services)",
  );

export const RealtimeSchema = z
  .enum(["socket-io", "partykit", "ably", "pusher", "liveblocks", "yjs", "none"])
  .describe("Real-time/WebSocket solution");

export const JobQueueSchema = z
  .enum(["bullmq", "trigger-dev", "inngest", "temporal", "none"])
  .describe("Job queue/background worker solution");

export const CMSSchema = z
  .enum(["payload", "sanity", "strapi", "tinacms", "directus", "keystatic", "none"])
  .describe("Headless CMS solution");

export const CachingSchema = z
  .enum(["upstash-redis", "redis", "none"])
  .describe("Caching solution (upstash-redis for serverless Redis, redis for self-hosted Redis)");

export const RateLimitSchema = z
  .enum(["arcjet", "upstash-ratelimit", "none"])
  .describe("Rate limiting and abuse protection");

export const I18nSchema = z
  .enum(["paraglide", "i18next", "next-intl", "intlayer", "none"])
  .describe("Internationalization (i18n) library");

export const SearchSchema = z
  .enum(["meilisearch", "typesense", "elasticsearch", "opensearch", "algolia", "bleve", "none"])
  .describe(
    "Search engine solution (meilisearch, typesense, elasticsearch, opensearch, or algolia for fast search experiences; bleve is a Go-native embedded full-text engine)",
  );

export const VectorDbSchema = z
  .enum(["pgvector", "qdrant", "chroma", "pinecone", "none"])
  .describe(
    "Vector database for AI embeddings/semantic search (pgvector on Postgres, or Qdrant, Chroma, or Pinecone)",
  );

export const FileStorageSchema = z
  .enum(["s3", "r2", "cloudinary", "supabase-storage", "none"])
  .describe("File storage solution (AWS S3, Cloudflare R2, Cloudinary, or Supabase Storage)");

export const AnimationSchema = z
  .enum(["framer-motion", "gsap", "react-spring", "auto-animate", "lottie", "none"])
  .describe("Animation library");

export const FileUploadSchema = z
  .enum(["uploadthing", "filepond", "uppy", "none"])
  .describe("File upload solution");

export const LoggingSchema = z
  .enum(["pino", "winston", "evlog", "none"])
  .describe("Server-side logging framework");

export const ObservabilitySchema = z
  .enum(["opentelemetry", "sentry", "grafana", "datadog", "axiom", "betterstack", "none"])
  .describe("Observability and distributed tracing");

export const FeatureFlagsSchema = z
  .enum(["growthbook", "posthog", "launchdarkly", "flagsmith", "unleash", "none"])
  .describe("Feature flags provider for A/B testing and feature management");

export const AnalyticsSchema = z
  .enum(["plausible", "umami", "posthog", "none"])
  .describe("Product analytics provider");

export const MobileNavigationSchema = z
  .enum(["expo-router", "react-navigation", "none"])
  .describe("Mobile navigation system");

export const MobileUISchema = z
  .enum(["tamagui", "gluestack-ui", "uniwind", "unistyles", "none"])
  .describe("Mobile UI and styling system");

export const MobileStorageSchema = z
  .enum(["mmkv", "none"])
  .describe("Mobile device storage library");

export const MobileTestingSchema = z
  .enum(["maestro", "react-native-testing-library", "maestro-react-native-testing-library", "none"])
  .describe("Mobile testing setup");

export const MobilePushSchema = z
  .enum(["expo-notifications", "none"])
  .describe("Mobile push notification setup");

export const MobileOTASchema = z
  .enum(["expo-updates", "none"])
  .describe("Mobile over-the-air update setup");

export const MobileDeepLinkingSchema = z
  .enum(["expo-linking", "none"])
  .describe("Mobile deep linking setup");

// Rust ecosystem schemas
export const RustWebFrameworkSchema = z
  .enum(["axum", "actix-web", "rocket", "poem", "loco", "none"])
  .describe("Rust web framework");

export const RustFrontendSchema = z
  .enum(["leptos", "dioxus", "none"])
  .describe("Rust WASM frontend framework");

export const RustOrmSchema = z
  .enum(["sea-orm", "sqlx", "diesel", "none"])
  .describe("Rust ORM/database layer");

export const RustApiSchema = z
  .enum(["tonic", "async-graphql", "none"])
  .describe("Rust API layer (gRPC/GraphQL)");

export const RustCliSchema = z.enum(["clap", "ratatui", "none"]).describe("Rust CLI tools");

export const RustLibrariesSchema = z
  .enum([
    "serde",
    "uuid",
    "chrono",
    "reqwest",
    "config",
    "dashmap",
    "parking-lot",
    "secrecy",
    "tokio-util",
    "utoipa",
    "validator",
    "jsonwebtoken",
    "argon2",
    "tokio-test",
    "mockall",
    "proptest",
    "insta",
    "none",
  ])
  .describe("Rust core libraries");

export const RustLoggingSchema = z
  .enum(["tracing", "env-logger", "none"])
  .describe("Rust logging/tracing library");

export const RustErrorHandlingSchema = z
  .enum(["anyhow-thiserror", "eyre", "none"])
  .describe("Rust error handling library");

export const RustCachingSchema = z.enum(["moka", "redis", "none"]).describe("Rust caching library");

export const RustAuthSchema = z
  .enum(["oauth2", "torii", "none"])
  .describe("Rust authentication library");

export const RustRealtimeSchema = z
  .enum(["tokio-tungstenite", "none"])
  .describe("Rust realtime/WebSocket library");

export const RustMessageQueueSchema = z
  .enum(["lapin", "none"])
  .describe("Rust message queue library");

export const RustObservabilitySchema = z
  .enum(["opentelemetry", "none"])
  .describe("Rust observability/tracing library");

export const RustTemplatingSchema = z
  .enum(["askama", "tera", "none"])
  .describe("Rust template engine");

// Python ecosystem schemas
export const PythonWebFrameworkSchema = z
  .enum(["fastapi", "django", "flask", "litestar", "starlette", "none"])
  .describe("Python web framework");

export const PythonOrmSchema = z
  .enum(["sqlalchemy", "sqlmodel", "tortoise-orm", "peewee", "none"])
  .describe("Python ORM/database layer");

export const PythonValidationSchema = z
  .enum(["pydantic", "none"])
  .describe("Python validation library");

export const PythonAiSchema = z
  .enum([
    "langchain",
    "llamaindex",
    "openai-sdk",
    "anthropic-sdk",
    "langgraph",
    "crewai",
    "haystack",
    "pydantic-ai",
    "google-adk",
    "smolagents",
    "none",
  ])
  .describe("Python AI/ML framework");

export const PythonAuthSchema = z
  .enum(["authlib", "jwt", "fastapi-users", "none"])
  .describe("Python authentication library");

export const PythonApiSchema = z
  .enum(["django-rest-framework", "django-ninja", "none"])
  .describe("Python API framework");

export const PythonTaskQueueSchema = z
  .enum(["celery", "rq", "dramatiq", "huey", "taskiq", "none"])
  .describe("Python task queue");

export const PythonGraphqlSchema = z
  .enum(["strawberry", "ariadne", "none"])
  .describe("Python GraphQL framework");

export const PythonQualitySchema = z
  .enum(["ruff", "mypy", "pyright", "none"])
  .describe("Python code quality tool");

export const PythonTestingSchema = z
  .enum(["pytest", "hypothesis", "none"])
  .describe("Python testing libraries");

export const PythonCachingSchema = z
  .enum(["redis", "aiocache", "none"])
  .describe("Python caching library");

export const PythonRealtimeSchema = z
  .enum(["python-socketio", "websockets", "none"])
  .describe("Python realtime/WebSocket library");

export const PythonObservabilitySchema = z
  .enum(["opentelemetry", "none"])
  .describe("Python observability/tracing library");

export const PythonCliSchema = z
  .enum(["typer", "click", "rich", "none"])
  .describe("Python CLI tooling libraries");

// Go ecosystem schemas
export const GoWebFrameworkSchema = z
  .enum(["gin", "echo", "fiber", "chi", "stdlib", "none"])
  .describe("Go web framework");

export const GoOrmSchema = z
  .enum(["gorm", "sqlc", "ent", "bun", "none"])
  .describe("Go ORM/database layer");

export const GoApiSchema = z
  .enum(["grpc-go", "gqlgen", "none"])
  .describe("Go API layer (gRPC, GraphQL)");

export const GoCliSchema = z
  .enum(["cobra", "bubbletea", "urfave-cli", "none"])
  .describe("Go CLI tools");

export const GoLoggingSchema = z
  .enum(["zap", "zerolog", "slog", "logrus", "none"])
  .describe("Go logging library");

export const GoAuthSchema = z
  .enum(["casbin", "jwt", "goth", "none"])
  .describe("Go authentication library");

export const GoTestingSchema = z
  .enum(["testify", "gomock", "none"])
  .describe("Go testing libraries");

export const GoRealtimeSchema = z
  .enum(["gorilla-websocket", "centrifuge", "none"])
  .describe("Go realtime/WebSocket library");

export const GoMessageQueueSchema = z
  .enum(["nats", "watermill", "none"])
  .describe("Go message queue/eventing library");

export const GoCachingSchema = z
  .enum(["redis", "ristretto", "none"])
  .describe("Go caching library");

export const GoConfigSchema = z
  .enum(["viper", "koanf", "none"])
  .describe("Go configuration management library");

export const GoObservabilitySchema = z
  .enum(["opentelemetry", "none"])
  .describe("Go observability/tracing library");

// Java ecosystem schemas
export const JavaLanguageSchema = z
  .enum(["java", "kotlin"])
  .describe("JVM language variant for the Java ecosystem (java or kotlin)");

export const JavaWebFrameworkSchema = z
  .enum(["spring-boot", "quarkus", "micronaut", "none"])
  .describe("Java web framework");

export const JavaBuildToolSchema = z.enum(["maven", "gradle", "none"]).describe("Java build tool");

export const JavaOrmSchema = z
  .enum(["spring-data-jpa", "jooq", "mybatis", "none"])
  .describe("Java ORM/database layer");

export const JavaAuthSchema = z
  .enum(["spring-security", "keycloak", "none"])
  .describe("Java authentication library");

export const JavaApiSchema = z
  .enum(["spring-graphql", "openapi-generator", "grpc", "none"])
  .describe("Java API layer");

export const JavaLoggingSchema = z
  .enum(["logback", "log4j2", "none"])
  .describe("Java logging configuration");

export const JavaLibrariesSchema = z
  .enum([
    "spring-actuator",
    "spring-validation",
    "flyway",
    "liquibase",
    "springdoc-openapi",
    "lombok",
    "mapstruct",
    "caffeine",
    "resilience4j",
    "spring-webflux",
    "spring-batch",
    "spring-kafka",
    "spring-mail",
    "spring-devtools",
    "micrometer-prometheus",
    "thymeleaf",
    "spring-amqp",
    "opentelemetry-java",
    "none",
  ])
  .describe("Java application libraries");

export const JavaTestingLibrariesSchema = z
  .enum([
    "junit5",
    "mockito",
    "testcontainers",
    "assertj",
    "rest-assured",
    "wiremock",
    "awaitility",
    "archunit",
    "jqwik",
    "none",
  ])
  .describe("Java testing libraries");

// .NET ecosystem schemas
export const DotnetWebFrameworkSchema = z
  .enum(["aspnet-minimal", "aspnet-mvc", "aspnet-blazor", "none"])
  .describe(".NET web framework");

export const DotnetOrmSchema = z
  .enum(["ef-core", "dapper", "linq2db", "none"])
  .describe(".NET data access library");

export const DotnetAuthSchema = z
  .enum(["aspnet-identity", "duende-identityserver", "auth0-aspnet", "none"])
  .describe(".NET authentication library");

export const DotnetApiSchema = z
  .enum(["minimal-api", "graphql-hotchocolate", "grpc-dotnet", "none"])
  .describe(".NET API style");

export const DotnetTestingSchema = z
  .enum(["xunit", "nunit", "moq", "testcontainers-dotnet", "none"])
  .describe(".NET testing libraries");

export const DotnetJobQueueSchema = z
  .enum(["hangfire", "quartz-net", "hosted-services", "none"])
  .describe(".NET background jobs");

export const DotnetRealtimeSchema = z.enum(["signalr", "none"]).describe(".NET realtime library");

export const DotnetObservabilitySchema = z
  .enum(["opentelemetry-dotnet", "serilog", "nlog", "health-checks", "none"])
  .describe(".NET observability and logging libraries");

export const DotnetValidationSchema = z
  .enum(["fluentvalidation", "data-annotations", "none"])
  .describe(".NET validation library");

export const DotnetCachingSchema = z
  .enum(["redis", "memory-cache", "none"])
  .describe(".NET caching library");

export const DotnetDeploySchema = z
  .enum(["docker", "azure", "aws", "none"])
  .describe(".NET deployment target");

// Elixir ecosystem schemas
export const ElixirWebFrameworkSchema = z
  .enum(["phoenix", "phoenix-live-view", "none"])
  .describe("Elixir web framework");

export const ElixirOrmSchema = z
  .enum(["ecto", "ecto-sql", "none"])
  .describe("Elixir database layer");

export const ElixirAuthSchema = z
  .enum(["phx-gen-auth", "ueberauth", "guardian", "none"])
  .describe("Elixir authentication library");

export const ElixirApiSchema = z
  .enum(["rest", "absinthe", "grpc", "none"])
  .describe("Elixir API layer");

export const ElixirLibrariesSchema = z
  .enum(["broadway", "nx", "none"])
  .describe("Elixir application libraries");

export const ElixirRealtimeSchema = z
  .enum(["channels", "presence", "pubsub", "live-view-streams", "none"])
  .describe("Elixir realtime feature");

export const ElixirJobsSchema = z
  .enum(["oban", "quantum", "none"])
  .describe("Elixir jobs and scheduling");

export const ElixirValidationSchema = z
  .enum(["ecto-changesets", "nimble-options", "none"])
  .describe("Elixir validation and data contracts");

export const ElixirHttpSchema = z.enum(["req", "finch", "none"]).describe("Elixir HTTP client");

export const ElixirJsonSchema = z.enum(["jason", "none"]).describe("Elixir JSON library");

export const ElixirEmailSchema = z.enum(["swoosh", "none"]).describe("Elixir email library");

export const ElixirCachingSchema = z
  .enum(["cachex", "nebulex", "none"])
  .describe("Elixir caching library");

export const ElixirObservabilitySchema = z
  .enum(["telemetry", "opentelemetry", "prom_ex", "none"])
  .describe("Elixir observability library");

export const ElixirTestingSchema = z
  .enum(["ex_unit", "mox", "bypass", "wallaby", "none"])
  .describe("Elixir testing library");

export const ElixirQualitySchema = z
  .enum(["credo", "dialyxir", "sobelow", "none"])
  .describe("Elixir code quality tool");

export const ElixirDeploySchema = z
  .enum(["docker", "fly", "gigalixir", "mix-release", "none"])
  .describe("Elixir deployment target");

export const AiDocsSchema = z
  .enum(["claude-md", "agents-md", "cursorrules", "none"])
  .describe("AI documentation files (CLAUDE.md, AGENTS.md, .cursorrules)");

export const CSSFrameworkSchema = z
  .enum(["tailwind", "scss", "less", "postcss-only", "none"])
  .describe("CSS framework/preprocessor");

export const UILibrarySchema = z
  .enum([
    "shadcn-ui",
    "shadcn-svelte",
    "daisyui",
    "radix-ui",
    "headless-ui",
    "park-ui",
    "chakra-ui",
    "nextui",
    "mantine",
    "mui",
    "antd",
    "base-ui",
    "ark-ui",
    "react-aria",
    "none",
  ])
  .describe("UI component library");

export const ShadcnBaseSchema = z
  .enum(["radix", "base"])
  .describe("shadcn/ui headless UI base library (radix or base-ui)");
export const ShadcnStyleSchema = z
  .enum(["vega", "nova", "maia", "lyra", "mira", "luma", "sera"])
  .describe("shadcn/ui visual style preset");
export const ShadcnIconLibrarySchema = z
  .enum(["lucide", "tabler", "hugeicons", "phosphor", "remixicon", "heroicons", "react-icons"])
  .describe("shadcn/ui icon library");
export const ShadcnColorThemeSchema = z
  .enum([
    "neutral",
    "stone",
    "zinc",
    "gray",
    "amber",
    "blue",
    "cyan",
    "emerald",
    "fuchsia",
    "green",
    "indigo",
    "lime",
    "orange",
    "pink",
    "purple",
    "red",
    "rose",
    "sky",
    "teal",
    "violet",
    "yellow",
  ])
  .describe("shadcn/ui accent color theme");
export const ShadcnBaseColorSchema = z
  .enum(["neutral", "stone", "zinc", "gray"])
  .describe("shadcn/ui base neutral color");
export const ShadcnFontSchema = z
  .enum([
    "inter",
    "geist",
    "noto-sans",
    "nunito-sans",
    "figtree",
    "roboto",
    "raleway",
    "dm-sans",
    "public-sans",
    "outfit",
    "jetbrains-mono",
    "geist-mono",
  ])
  .describe("shadcn/ui font family");
export const ShadcnRadiusSchema = z
  .enum(["default", "none", "small", "medium", "large"])
  .describe("shadcn/ui border radius preset");

export const DirectoryConflictSchema = z
  .enum(["merge", "overwrite", "increment", "error"])
  .describe("How to handle existing directory conflicts");

export const TemplateSchema = z
  .enum(["mern", "pern", "t3", "saas", "uniwind", "none"])
  .describe("Predefined project template");

export const ProjectNameSchema = z
  .string()
  .min(1, "Project name cannot be empty")
  .max(255, "Project name must be less than 255 characters")
  .refine(
    (name) => name === "." || !name.startsWith("."),
    "Project name cannot start with a dot (except for '.')",
  )
  .refine((name) => name === "." || !name.startsWith("-"), "Project name cannot start with a dash")
  .refine((name) => {
    const invalidChars = ["<", ">", ":", '"', "|", "?", "*"];
    return !invalidChars.some((char) => name.includes(char));
  }, "Project name contains invalid characters")
  .refine((name) => name.toLowerCase() !== "node_modules", "Project name is reserved")
  .describe("Project name or path");

export const CreateInputSchema = z.object({
  projectName: z.string().optional(),
  template: TemplateSchema.optional(),
  yes: z.boolean().optional(),
  yolo: z.boolean().optional(),
  verbose: z.boolean().optional(),
  dryRun: z.boolean().optional(),
  verify: z.boolean().optional(),
  ecosystem: EcosystemSchema.optional(),
  database: DatabaseSchema.optional(),
  orm: ORMSchema.optional(),
  auth: AuthSchema.optional(),
  payments: PaymentsSchema.optional(),
  frontend: z.array(FrontendSchema).optional(),
  addons: z.array(AddonsSchema).optional(),
  examples: z.array(ExamplesSchema).optional(),
  git: z.boolean().optional(),
  packageManager: PackageManagerSchema.optional(),
  workspaceShape: WorkspaceShapeSchema.optional(),
  versionChannel: VersionChannelSchema.optional(),
  install: z.boolean().optional(),
  dbSetup: DatabaseSetupSchema.optional(),
  backend: BackendSchema.optional(),
  runtime: RuntimeSchema.optional(),
  api: APISchema.optional(),
  webDeploy: WebDeploySchema.optional(),
  serverDeploy: ServerDeploySchema.optional(),
  directoryConflict: DirectoryConflictSchema.optional(),
  renderTitle: z.boolean().optional(),
  disableAnalytics: z.boolean().optional(),
  manualDb: z.boolean().optional(),
  astroIntegration: AstroIntegrationSchema.optional(),
  ai: AISchema.optional(),
  effect: EffectSchema.optional(),
  stateManagement: StateManagementSchema.optional(),
  forms: FormsSchema.optional(),
  testing: TestingSchema.optional(),
  email: EmailSchema.optional(),
  cssFramework: CSSFrameworkSchema.optional(),
  uiLibrary: UILibrarySchema.optional(),
  shadcnBase: ShadcnBaseSchema.optional(),
  shadcnStyle: ShadcnStyleSchema.optional(),
  shadcnIconLibrary: ShadcnIconLibrarySchema.optional(),
  shadcnColorTheme: ShadcnColorThemeSchema.optional(),
  shadcnBaseColor: ShadcnBaseColorSchema.optional(),
  shadcnFont: ShadcnFontSchema.optional(),
  shadcnRadius: ShadcnRadiusSchema.optional(),
  validation: ValidationSchema.optional(),
  realtime: RealtimeSchema.optional(),
  jobQueue: JobQueueSchema.optional(),
  animation: AnimationSchema.optional(),
  fileUpload: FileUploadSchema.optional(),
  logging: LoggingSchema.optional(),
  observability: ObservabilitySchema.optional(),
  featureFlags: FeatureFlagsSchema.optional(),
  analytics: AnalyticsSchema.optional(),
  cms: CMSSchema.optional(),
  caching: CachingSchema.optional(),
  rateLimit: RateLimitSchema.optional(),
  i18n: I18nSchema.optional(),
  search: SearchSchema.optional(),
  vectorDb: VectorDbSchema.optional(),
  fileStorage: FileStorageSchema.optional(),
  mobileNavigation: MobileNavigationSchema.optional(),
  mobileUI: MobileUISchema.optional(),
  mobileStorage: MobileStorageSchema.optional(),
  mobileTesting: MobileTestingSchema.optional(),
  mobilePush: MobilePushSchema.optional(),
  mobileOTA: MobileOTASchema.optional(),
  mobileDeepLinking: MobileDeepLinkingSchema.optional(),
  // Rust ecosystem options
  rustWebFramework: RustWebFrameworkSchema.optional(),
  rustFrontend: RustFrontendSchema.optional(),
  rustOrm: RustOrmSchema.optional(),
  rustApi: RustApiSchema.optional(),
  rustCli: RustCliSchema.optional(),
  rustLibraries: z.array(RustLibrariesSchema).optional(),
  rustLogging: RustLoggingSchema.optional(),
  rustErrorHandling: RustErrorHandlingSchema.optional(),
  rustCaching: RustCachingSchema.optional(),
  rustAuth: RustAuthSchema.optional(),
  rustRealtime: RustRealtimeSchema.optional(),
  rustMessageQueue: RustMessageQueueSchema.optional(),
  rustObservability: RustObservabilitySchema.optional(),
  rustTemplating: RustTemplatingSchema.optional(),
  // Python ecosystem options
  pythonWebFramework: PythonWebFrameworkSchema.optional(),
  pythonOrm: PythonOrmSchema.optional(),
  pythonValidation: PythonValidationSchema.optional(),
  pythonAi: z.array(PythonAiSchema).optional(),
  pythonAuth: PythonAuthSchema.optional(),
  pythonApi: PythonApiSchema.optional(),
  pythonTaskQueue: PythonTaskQueueSchema.optional(),
  pythonGraphql: PythonGraphqlSchema.optional(),
  pythonQuality: PythonQualitySchema.optional(),
  pythonTesting: z.array(PythonTestingSchema).optional(),
  pythonCaching: PythonCachingSchema.optional(),
  pythonRealtime: PythonRealtimeSchema.optional(),
  pythonObservability: PythonObservabilitySchema.optional(),
  pythonCli: z.array(PythonCliSchema).optional(),
  // Go ecosystem options
  goWebFramework: GoWebFrameworkSchema.optional(),
  goOrm: GoOrmSchema.optional(),
  goApi: GoApiSchema.optional(),
  goCli: GoCliSchema.optional(),
  goLogging: GoLoggingSchema.optional(),
  goAuth: GoAuthSchema.optional(),
  goTesting: z.array(GoTestingSchema).optional(),
  goRealtime: GoRealtimeSchema.optional(),
  goMessageQueue: GoMessageQueueSchema.optional(),
  goCaching: GoCachingSchema.optional(),
  goConfig: GoConfigSchema.optional(),
  goObservability: GoObservabilitySchema.optional(),
  // Java ecosystem options
  javaLanguage: JavaLanguageSchema.optional(),
  javaWebFramework: JavaWebFrameworkSchema.optional(),
  javaBuildTool: JavaBuildToolSchema.optional(),
  javaOrm: JavaOrmSchema.optional(),
  javaAuth: JavaAuthSchema.optional(),
  javaApi: JavaApiSchema.optional(),
  javaLogging: JavaLoggingSchema.optional(),
  javaLibraries: z.array(JavaLibrariesSchema).optional(),
  javaTestingLibraries: z.array(JavaTestingLibrariesSchema).optional(),
  // .NET ecosystem options
  dotnetWebFramework: DotnetWebFrameworkSchema.optional(),
  dotnetOrm: DotnetOrmSchema.optional(),
  dotnetAuth: DotnetAuthSchema.optional(),
  dotnetApi: DotnetApiSchema.optional(),
  dotnetTesting: z.array(DotnetTestingSchema).optional(),
  dotnetJobQueue: DotnetJobQueueSchema.optional(),
  dotnetRealtime: DotnetRealtimeSchema.optional(),
  dotnetObservability: z.array(DotnetObservabilitySchema).optional(),
  dotnetValidation: DotnetValidationSchema.optional(),
  dotnetCaching: DotnetCachingSchema.optional(),
  dotnetDeploy: DotnetDeploySchema.optional(),
  // Elixir ecosystem options
  elixirWebFramework: ElixirWebFrameworkSchema.optional(),
  elixirOrm: ElixirOrmSchema.optional(),
  elixirAuth: ElixirAuthSchema.optional(),
  elixirApi: ElixirApiSchema.optional(),
  elixirRealtime: ElixirRealtimeSchema.optional(),
  elixirJobs: ElixirJobsSchema.optional(),
  elixirValidation: ElixirValidationSchema.optional(),
  elixirHttp: ElixirHttpSchema.optional(),
  elixirJson: ElixirJsonSchema.optional(),
  elixirEmail: ElixirEmailSchema.optional(),
  elixirCaching: ElixirCachingSchema.optional(),
  elixirObservability: ElixirObservabilitySchema.optional(),
  elixirTesting: ElixirTestingSchema.optional(),
  elixirQuality: ElixirQualitySchema.optional(),
  elixirDeploy: ElixirDeploySchema.optional(),
  elixirLibraries: z.array(ElixirLibrariesSchema).optional(),
  // AI documentation files
  aiDocs: z.array(AiDocsSchema).optional(),
  part: z.array(z.string()).optional(),
});

export const AddInputSchema = CreateInputSchema.omit({
  projectName: true,
  template: true,
  yes: true,
  yolo: true,
  verbose: true,
  verify: true,
  git: true,
  directoryConflict: true,
  renderTitle: true,
  disableAnalytics: true,
  manualDb: true,
}).extend({
  projectDir: z.string().optional(),
  acknowledgeArchitectureChange: z.boolean().optional(),
});

export const CLIInputSchema = CreateInputSchema.extend({
  projectDirectory: z.string().optional(),
});

export const ProjectConfigSchema = z.object({
  projectName: z.string(),
  projectDir: z.string(),
  relativePath: z.string(),
  ecosystem: EcosystemSchema,
  database: DatabaseSchema,
  orm: ORMSchema,
  backend: BackendSchema,
  runtime: RuntimeSchema,
  frontend: z.array(FrontendSchema),
  addons: z.array(AddonsSchema),
  examples: z.array(ExamplesSchema),
  auth: AuthSchema,
  payments: PaymentsSchema,
  git: z.boolean(),
  packageManager: PackageManagerSchema,
  workspaceShape: WorkspaceShapeSchema.optional(),
  versionChannel: VersionChannelSchema,
  install: z.boolean(),
  dbSetup: DatabaseSetupSchema,
  api: APISchema,
  webDeploy: WebDeploySchema,
  serverDeploy: ServerDeploySchema,
  astroIntegration: AstroIntegrationSchema.optional(),
  ai: AISchema,
  effect: EffectSchema,
  stateManagement: StateManagementSchema,
  forms: FormsSchema,
  testing: TestingSchema,
  email: EmailSchema,
  cssFramework: CSSFrameworkSchema,
  uiLibrary: UILibrarySchema,
  shadcnBase: ShadcnBaseSchema.optional(),
  shadcnStyle: ShadcnStyleSchema.optional(),
  shadcnIconLibrary: ShadcnIconLibrarySchema.optional(),
  shadcnColorTheme: ShadcnColorThemeSchema.optional(),
  shadcnBaseColor: ShadcnBaseColorSchema.optional(),
  shadcnFont: ShadcnFontSchema.optional(),
  shadcnRadius: ShadcnRadiusSchema.optional(),
  validation: ValidationSchema,
  realtime: RealtimeSchema,
  jobQueue: JobQueueSchema,
  animation: AnimationSchema,
  fileUpload: FileUploadSchema,
  logging: LoggingSchema,
  observability: ObservabilitySchema,
  featureFlags: FeatureFlagsSchema,
  analytics: AnalyticsSchema,
  cms: CMSSchema,
  caching: CachingSchema,
  rateLimit: RateLimitSchema,
  i18n: I18nSchema,
  search: SearchSchema,
  vectorDb: VectorDbSchema,
  fileStorage: FileStorageSchema,
  mobileNavigation: MobileNavigationSchema,
  mobileUI: MobileUISchema,
  mobileStorage: MobileStorageSchema,
  mobileTesting: MobileTestingSchema,
  mobilePush: MobilePushSchema,
  mobileOTA: MobileOTASchema,
  mobileDeepLinking: MobileDeepLinkingSchema,
  // Rust ecosystem options
  rustWebFramework: RustWebFrameworkSchema,
  rustFrontend: RustFrontendSchema,
  rustOrm: RustOrmSchema,
  rustApi: RustApiSchema,
  rustCli: RustCliSchema,
  rustLibraries: z.array(RustLibrariesSchema),
  rustLogging: RustLoggingSchema,
  rustErrorHandling: RustErrorHandlingSchema,
  rustCaching: RustCachingSchema,
  rustAuth: RustAuthSchema,
  rustRealtime: RustRealtimeSchema,
  rustMessageQueue: RustMessageQueueSchema,
  rustObservability: RustObservabilitySchema,
  rustTemplating: RustTemplatingSchema,
  // Python ecosystem options
  pythonWebFramework: PythonWebFrameworkSchema,
  pythonOrm: PythonOrmSchema,
  pythonValidation: PythonValidationSchema,
  pythonAi: z.array(PythonAiSchema),
  pythonAuth: PythonAuthSchema,
  pythonApi: PythonApiSchema,
  pythonTaskQueue: PythonTaskQueueSchema,
  pythonGraphql: PythonGraphqlSchema,
  pythonQuality: PythonQualitySchema,
  pythonTesting: z.array(PythonTestingSchema),
  pythonCaching: PythonCachingSchema,
  pythonRealtime: PythonRealtimeSchema,
  pythonObservability: PythonObservabilitySchema,
  pythonCli: z.array(PythonCliSchema),
  // Go ecosystem options
  goWebFramework: GoWebFrameworkSchema,
  goOrm: GoOrmSchema,
  goApi: GoApiSchema,
  goCli: GoCliSchema,
  goLogging: GoLoggingSchema,
  goAuth: GoAuthSchema,
  goTesting: z.array(GoTestingSchema),
  goRealtime: GoRealtimeSchema,
  goMessageQueue: GoMessageQueueSchema,
  goCaching: GoCachingSchema,
  goConfig: GoConfigSchema,
  goObservability: GoObservabilitySchema,
  // Java ecosystem options
  javaLanguage: JavaLanguageSchema.optional(),
  javaWebFramework: JavaWebFrameworkSchema,
  javaBuildTool: JavaBuildToolSchema,
  javaOrm: JavaOrmSchema,
  javaAuth: JavaAuthSchema,
  javaApi: JavaApiSchema,
  javaLogging: JavaLoggingSchema,
  javaLibraries: z.array(JavaLibrariesSchema),
  javaTestingLibraries: z.array(JavaTestingLibrariesSchema),
  // .NET ecosystem options
  dotnetWebFramework: DotnetWebFrameworkSchema,
  dotnetOrm: DotnetOrmSchema,
  dotnetAuth: DotnetAuthSchema,
  dotnetApi: DotnetApiSchema,
  dotnetTesting: z.array(DotnetTestingSchema),
  dotnetJobQueue: DotnetJobQueueSchema,
  dotnetRealtime: DotnetRealtimeSchema,
  dotnetObservability: z.array(DotnetObservabilitySchema),
  dotnetValidation: DotnetValidationSchema,
  dotnetCaching: DotnetCachingSchema,
  dotnetDeploy: DotnetDeploySchema,
  // Elixir ecosystem options
  elixirWebFramework: ElixirWebFrameworkSchema,
  elixirOrm: ElixirOrmSchema,
  elixirAuth: ElixirAuthSchema,
  elixirApi: ElixirApiSchema,
  elixirRealtime: ElixirRealtimeSchema,
  elixirJobs: ElixirJobsSchema,
  elixirValidation: ElixirValidationSchema,
  elixirHttp: ElixirHttpSchema,
  elixirJson: ElixirJsonSchema,
  elixirEmail: ElixirEmailSchema,
  elixirCaching: ElixirCachingSchema,
  elixirObservability: ElixirObservabilitySchema,
  elixirTesting: ElixirTestingSchema,
  elixirQuality: ElixirQualitySchema,
  elixirDeploy: ElixirDeploySchema,
  elixirLibraries: z.array(ElixirLibrariesSchema),
  // AI documentation files
  aiDocs: z.array(AiDocsSchema),
  stackParts: z
    .array(StackPartSchema)
    .optional()
    .describe("Authoritative stack graph when present; flat fields are a derived projection."),
});

export const BetterTStackConfigSchema = z.object({
  version: z.string().describe("CLI version used to create this project"),
  createdAt: z.string().describe("Timestamp when the project was created"),
  graphSummary: z
    .string()
    .optional()
    .describe("Human-readable summary derived from authoritative stackParts"),
  effectiveStack: z
    .record(z.string(), z.string())
    .optional()
    .describe("Graph-aware effective stack derived from stackParts and keyed by owner role path"),
  ecosystem: EcosystemSchema,
  database: DatabaseSchema,
  orm: ORMSchema,
  backend: BackendSchema,
  runtime: RuntimeSchema,
  frontend: z.array(FrontendSchema),
  addons: z.array(AddonsSchema),
  examples: z.array(ExamplesSchema),
  auth: AuthSchema,
  payments: PaymentsSchema,
  packageManager: PackageManagerSchema,
  workspaceShape: WorkspaceShapeSchema.optional(),
  versionChannel: VersionChannelSchema,
  dbSetup: DatabaseSetupSchema,
  api: APISchema,
  webDeploy: WebDeploySchema,
  serverDeploy: ServerDeploySchema,
  astroIntegration: AstroIntegrationSchema.optional(),
  ai: AISchema,
  effect: EffectSchema,
  stateManagement: StateManagementSchema,
  forms: FormsSchema,
  testing: TestingSchema,
  email: EmailSchema,
  cssFramework: CSSFrameworkSchema,
  uiLibrary: UILibrarySchema,
  shadcnBase: ShadcnBaseSchema.optional(),
  shadcnStyle: ShadcnStyleSchema.optional(),
  shadcnIconLibrary: ShadcnIconLibrarySchema.optional(),
  shadcnColorTheme: ShadcnColorThemeSchema.optional(),
  shadcnBaseColor: ShadcnBaseColorSchema.optional(),
  shadcnFont: ShadcnFontSchema.optional(),
  shadcnRadius: ShadcnRadiusSchema.optional(),
  validation: ValidationSchema,
  realtime: RealtimeSchema,
  jobQueue: JobQueueSchema,
  animation: AnimationSchema,
  fileUpload: FileUploadSchema,
  logging: LoggingSchema,
  observability: ObservabilitySchema,
  featureFlags: FeatureFlagsSchema,
  analytics: AnalyticsSchema,
  cms: CMSSchema,
  caching: CachingSchema,
  rateLimit: RateLimitSchema,
  i18n: I18nSchema,
  search: SearchSchema,
  vectorDb: VectorDbSchema,
  fileStorage: FileStorageSchema,
  mobileNavigation: MobileNavigationSchema,
  mobileUI: MobileUISchema,
  mobileStorage: MobileStorageSchema,
  mobileTesting: MobileTestingSchema,
  mobilePush: MobilePushSchema,
  mobileOTA: MobileOTASchema,
  mobileDeepLinking: MobileDeepLinkingSchema,
  // Rust ecosystem options
  rustWebFramework: RustWebFrameworkSchema,
  rustFrontend: RustFrontendSchema,
  rustOrm: RustOrmSchema,
  rustApi: RustApiSchema,
  rustCli: RustCliSchema,
  rustLibraries: z.array(RustLibrariesSchema),
  rustLogging: RustLoggingSchema,
  rustErrorHandling: RustErrorHandlingSchema,
  rustCaching: RustCachingSchema,
  rustAuth: RustAuthSchema,
  rustRealtime: RustRealtimeSchema,
  rustMessageQueue: RustMessageQueueSchema,
  rustObservability: RustObservabilitySchema,
  rustTemplating: RustTemplatingSchema,
  // Python ecosystem options
  pythonWebFramework: PythonWebFrameworkSchema,
  pythonOrm: PythonOrmSchema,
  pythonValidation: PythonValidationSchema,
  pythonAi: z.array(PythonAiSchema),
  pythonAuth: PythonAuthSchema,
  pythonApi: PythonApiSchema.optional(),
  pythonTaskQueue: PythonTaskQueueSchema,
  pythonGraphql: PythonGraphqlSchema,
  pythonQuality: PythonQualitySchema,
  pythonTesting: z.array(PythonTestingSchema),
  pythonCaching: PythonCachingSchema,
  pythonRealtime: PythonRealtimeSchema,
  pythonObservability: PythonObservabilitySchema,
  pythonCli: z.array(PythonCliSchema),
  // Go ecosystem options
  goWebFramework: GoWebFrameworkSchema,
  goOrm: GoOrmSchema,
  goApi: GoApiSchema,
  goCli: GoCliSchema,
  goLogging: GoLoggingSchema,
  goAuth: GoAuthSchema,
  goTesting: z.array(GoTestingSchema),
  goRealtime: GoRealtimeSchema,
  goMessageQueue: GoMessageQueueSchema,
  goCaching: GoCachingSchema,
  goConfig: GoConfigSchema,
  goObservability: GoObservabilitySchema,
  // Java ecosystem options
  javaLanguage: JavaLanguageSchema.optional(),
  javaWebFramework: JavaWebFrameworkSchema,
  javaBuildTool: JavaBuildToolSchema,
  javaOrm: JavaOrmSchema,
  javaAuth: JavaAuthSchema,
  javaApi: JavaApiSchema,
  javaLogging: JavaLoggingSchema,
  javaLibraries: z.array(JavaLibrariesSchema),
  javaTestingLibraries: z.array(JavaTestingLibrariesSchema),
  // .NET ecosystem options
  dotnetWebFramework: DotnetWebFrameworkSchema,
  dotnetOrm: DotnetOrmSchema,
  dotnetAuth: DotnetAuthSchema,
  dotnetApi: DotnetApiSchema,
  dotnetTesting: z.array(DotnetTestingSchema),
  dotnetJobQueue: DotnetJobQueueSchema,
  dotnetRealtime: DotnetRealtimeSchema,
  dotnetObservability: z.array(DotnetObservabilitySchema),
  dotnetValidation: DotnetValidationSchema,
  dotnetCaching: DotnetCachingSchema,
  dotnetDeploy: DotnetDeploySchema,
  // Elixir ecosystem options
  elixirWebFramework: ElixirWebFrameworkSchema,
  elixirOrm: ElixirOrmSchema,
  elixirAuth: ElixirAuthSchema,
  elixirApi: ElixirApiSchema,
  elixirRealtime: ElixirRealtimeSchema,
  elixirJobs: ElixirJobsSchema,
  elixirValidation: ElixirValidationSchema,
  elixirHttp: ElixirHttpSchema,
  elixirJson: ElixirJsonSchema,
  elixirEmail: ElixirEmailSchema,
  elixirCaching: ElixirCachingSchema,
  elixirObservability: ElixirObservabilitySchema,
  elixirTesting: ElixirTestingSchema,
  elixirQuality: ElixirQualitySchema,
  elixirDeploy: ElixirDeploySchema,
  elixirLibraries: z.array(ElixirLibrariesSchema),
  // AI documentation files
  aiDocs: z.array(AiDocsSchema),
  stackParts: z
    .array(StackPartSchema)
    .optional()
    .describe("Authoritative stack graph when present; top-level fields are a derived cache."),
});

export const BetterFullstackConfigSchema = BetterTStackConfigSchema;

export const BetterTStackConfigFileSchema = z
  .object({
    $schema: z.string().optional().describe("JSON Schema reference for validation"),
  })
  .extend(BetterTStackConfigSchema.shape)
  .meta({
    id: "https://better-fullstack-web.vercel.app/schema.json",
    title: "Better Fullstack Configuration",
    description: "Configuration file for Better Fullstack projects",
  });

export const BetterFullstackConfigFileSchema = BetterTStackConfigFileSchema;

export const InitResultSchema = z.object({
  success: z.boolean(),
  projectConfig: ProjectConfigSchema,
  reproducibleCommand: z.string(),
  timeScaffolded: z.string(),
  elapsedTimeMs: z.number(),
  projectDirectory: z.string(),
  relativePath: z.string(),
  error: z.string().optional(),
  dryRun: z.boolean().optional(),
  fileCount: z.number().optional(),
  directoryCount: z.number().optional(),
  files: z.array(z.string()).optional(),
});

export const DATABASE_VALUES = DatabaseSchema.options;
export const ORM_VALUES = ORMSchema.options;
export const BACKEND_VALUES = BackendSchema.options;
export const RUNTIME_VALUES = RuntimeSchema.options;
export const FRONTEND_VALUES = FrontendSchema.options;
export const ADDONS_VALUES = AddonsSchema.options;
export const EXAMPLES_VALUES = ExamplesSchema.options;
export const PACKAGE_MANAGER_VALUES = PackageManagerSchema.options;
export const WORKSPACE_SHAPE_VALUES = WorkspaceShapeSchema.options;
export const VERSION_CHANNEL_VALUES = VersionChannelSchema.options;
export const DATABASE_SETUP_VALUES = DatabaseSetupSchema.options;
export const API_VALUES = APISchema.options;
export const AUTH_VALUES = AuthSchema.options;
export const PAYMENTS_VALUES = PaymentsSchema.options;
export const WEB_DEPLOY_VALUES = WebDeploySchema.options;
export const SERVER_DEPLOY_VALUES = ServerDeploySchema.options;
export const DIRECTORY_CONFLICT_VALUES = DirectoryConflictSchema.options;
export const TEMPLATE_VALUES = TemplateSchema.options;
export const ASTRO_INTEGRATION_VALUES = AstroIntegrationSchema.options;
export const AI_VALUES = AISchema.options;
export const EFFECT_VALUES = EffectSchema.options;
export const STATE_MANAGEMENT_VALUES = StateManagementSchema.options;
export const FORMS_VALUES = FormsSchema.options;
export const TESTING_VALUES = TestingSchema.options;
export const EMAIL_VALUES = EmailSchema.options;
export const CSS_FRAMEWORK_VALUES = CSSFrameworkSchema.options;
export const UI_LIBRARY_VALUES = UILibrarySchema.options;
export const VALIDATION_VALUES = ValidationSchema.options;
export const REALTIME_VALUES = RealtimeSchema.options;
export const JOB_QUEUE_VALUES = JobQueueSchema.options;
export const ANIMATION_VALUES = AnimationSchema.options;
export const FILE_UPLOAD_VALUES = FileUploadSchema.options;
export const LOGGING_VALUES = LoggingSchema.options;
export const OBSERVABILITY_VALUES = ObservabilitySchema.options;
export const FEATURE_FLAGS_VALUES = FeatureFlagsSchema.options;
export const ANALYTICS_VALUES = AnalyticsSchema.options;
export const MOBILE_NAVIGATION_VALUES = MobileNavigationSchema.options;
export const MOBILE_UI_VALUES = MobileUISchema.options;
export const MOBILE_STORAGE_VALUES = MobileStorageSchema.options;
export const MOBILE_TESTING_VALUES = MobileTestingSchema.options;
export const MOBILE_PUSH_VALUES = MobilePushSchema.options;
export const MOBILE_OTA_VALUES = MobileOTASchema.options;
export const MOBILE_DEEP_LINKING_VALUES = MobileDeepLinkingSchema.options;
export const CMS_VALUES = CMSSchema.options;
export const CACHING_VALUES = CachingSchema.options;
export const RATE_LIMIT_VALUES = RateLimitSchema.options;
export const I18N_VALUES = I18nSchema.options;
export const SEARCH_VALUES = SearchSchema.options;
export const VECTOR_DB_VALUES = VectorDbSchema.options;
export const FILE_STORAGE_VALUES = FileStorageSchema.options;
export const ECOSYSTEM_VALUES = EcosystemSchema.options;
export const RUST_WEB_FRAMEWORK_VALUES = RustWebFrameworkSchema.options;
export const RUST_FRONTEND_VALUES = RustFrontendSchema.options;
export const RUST_ORM_VALUES = RustOrmSchema.options;
export const RUST_API_VALUES = RustApiSchema.options;
export const RUST_CLI_VALUES = RustCliSchema.options;
export const RUST_LIBRARIES_VALUES = RustLibrariesSchema.options;
export const RUST_LOGGING_VALUES = RustLoggingSchema.options;
export const RUST_ERROR_HANDLING_VALUES = RustErrorHandlingSchema.options;
export const RUST_CACHING_VALUES = RustCachingSchema.options;
export const RUST_AUTH_VALUES = RustAuthSchema.options;
export const RUST_REALTIME_VALUES = RustRealtimeSchema.options;
export const RUST_MESSAGE_QUEUE_VALUES = RustMessageQueueSchema.options;
export const RUST_OBSERVABILITY_VALUES = RustObservabilitySchema.options;
export const RUST_TEMPLATING_VALUES = RustTemplatingSchema.options;
export const PYTHON_WEB_FRAMEWORK_VALUES = PythonWebFrameworkSchema.options;
export const PYTHON_ORM_VALUES = PythonOrmSchema.options;
export const PYTHON_VALIDATION_VALUES = PythonValidationSchema.options;
export const PYTHON_AI_VALUES = PythonAiSchema.options;
export const PYTHON_AUTH_VALUES = PythonAuthSchema.options;
export const PYTHON_API_VALUES = PythonApiSchema.options;
export const PYTHON_TASK_QUEUE_VALUES = PythonTaskQueueSchema.options;
export const PYTHON_GRAPHQL_VALUES = PythonGraphqlSchema.options;
export const PYTHON_QUALITY_VALUES = PythonQualitySchema.options;
export const PYTHON_TESTING_VALUES = PythonTestingSchema.options;
export const PYTHON_CACHING_VALUES = PythonCachingSchema.options;
export const PYTHON_REALTIME_VALUES = PythonRealtimeSchema.options;
export const PYTHON_OBSERVABILITY_VALUES = PythonObservabilitySchema.options;
export const PYTHON_CLI_VALUES = PythonCliSchema.options;
export const GO_WEB_FRAMEWORK_VALUES = GoWebFrameworkSchema.options;
export const GO_ORM_VALUES = GoOrmSchema.options;
export const GO_API_VALUES = GoApiSchema.options;
export const GO_CLI_VALUES = GoCliSchema.options;
export const GO_LOGGING_VALUES = GoLoggingSchema.options;
export const GO_AUTH_VALUES = GoAuthSchema.options;
export const GO_TESTING_VALUES = GoTestingSchema.options;
export const GO_REALTIME_VALUES = GoRealtimeSchema.options;
export const GO_MESSAGE_QUEUE_VALUES = GoMessageQueueSchema.options;
export const GO_CACHING_VALUES = GoCachingSchema.options;
export const GO_CONFIG_VALUES = GoConfigSchema.options;
export const GO_OBSERVABILITY_VALUES = GoObservabilitySchema.options;
export const JAVA_LANGUAGE_VALUES = JavaLanguageSchema.options;
export const JAVA_WEB_FRAMEWORK_VALUES = JavaWebFrameworkSchema.options;
export const JAVA_BUILD_TOOL_VALUES = JavaBuildToolSchema.options;
export const JAVA_ORM_VALUES = JavaOrmSchema.options;
export const JAVA_AUTH_VALUES = JavaAuthSchema.options;
export const JAVA_API_VALUES = JavaApiSchema.options;
export const JAVA_LOGGING_VALUES = JavaLoggingSchema.options;
export const JAVA_LIBRARIES_VALUES = JavaLibrariesSchema.options;
export const JAVA_TESTING_LIBRARIES_VALUES = JavaTestingLibrariesSchema.options;
export const DOTNET_WEB_FRAMEWORK_VALUES = DotnetWebFrameworkSchema.options;
export const DOTNET_ORM_VALUES = DotnetOrmSchema.options;
export const DOTNET_AUTH_VALUES = DotnetAuthSchema.options;
export const DOTNET_API_VALUES = DotnetApiSchema.options;
export const DOTNET_TESTING_VALUES = DotnetTestingSchema.options;
export const DOTNET_JOB_QUEUE_VALUES = DotnetJobQueueSchema.options;
export const DOTNET_REALTIME_VALUES = DotnetRealtimeSchema.options;
export const DOTNET_OBSERVABILITY_VALUES = DotnetObservabilitySchema.options;
export const DOTNET_VALIDATION_VALUES = DotnetValidationSchema.options;
export const DOTNET_CACHING_VALUES = DotnetCachingSchema.options;
export const DOTNET_DEPLOY_VALUES = DotnetDeploySchema.options;
export const ELIXIR_WEB_FRAMEWORK_VALUES = ElixirWebFrameworkSchema.options;
export const ELIXIR_ORM_VALUES = ElixirOrmSchema.options;
export const ELIXIR_AUTH_VALUES = ElixirAuthSchema.options;
export const ELIXIR_API_VALUES = ElixirApiSchema.options;
export const ELIXIR_LIBRARIES_VALUES = ElixirLibrariesSchema.options;
export const ELIXIR_REALTIME_VALUES = ElixirRealtimeSchema.options;
export const ELIXIR_JOBS_VALUES = ElixirJobsSchema.options;
export const ELIXIR_VALIDATION_VALUES = ElixirValidationSchema.options;
export const ELIXIR_HTTP_VALUES = ElixirHttpSchema.options;
export const ELIXIR_JSON_VALUES = ElixirJsonSchema.options;
export const ELIXIR_EMAIL_VALUES = ElixirEmailSchema.options;
export const ELIXIR_CACHING_VALUES = ElixirCachingSchema.options;
export const ELIXIR_OBSERVABILITY_VALUES = ElixirObservabilitySchema.options;
export const ELIXIR_TESTING_VALUES = ElixirTestingSchema.options;
export const ELIXIR_QUALITY_VALUES = ElixirQualitySchema.options;
export const ELIXIR_DEPLOY_VALUES = ElixirDeploySchema.options;
export const AI_DOCS_VALUES = AiDocsSchema.options;
export const SHADCN_BASE_VALUES = ShadcnBaseSchema.options;
export const SHADCN_STYLE_VALUES = ShadcnStyleSchema.options;
export const SHADCN_ICON_LIBRARY_VALUES = ShadcnIconLibrarySchema.options;
export const SHADCN_COLOR_THEME_VALUES = ShadcnColorThemeSchema.options;
export const SHADCN_BASE_COLOR_VALUES = ShadcnBaseColorSchema.options;
export const SHADCN_FONT_VALUES = ShadcnFontSchema.options;
export const SHADCN_RADIUS_VALUES = ShadcnRadiusSchema.options;
