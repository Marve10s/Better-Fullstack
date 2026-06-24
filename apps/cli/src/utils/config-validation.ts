import consola from "consola";
import pc from "picocolors";

import type { CLIInput, Database, DatabaseSetup, ProjectConfig, Runtime } from "../types";

import { normalizeCapabilitySelection, validateStackParts } from "../types";
import {
  ensureSingleWebAndNative,
  isWebFrontend,
  validateAddonsAgainstFrontends,
  validateApiFrontendCompatibility,
  validateExamplesCompatibility,
  validatePaymentsCompatibility,
  validateSelfBackendCompatibility,
  validateServerDeployRequiresBackend,
  validateUILibraryCSSFrameworkCompatibility,
  validateUILibraryFrontendCompatibility,
  validateWebDeployFrontendTemplates,
  validateWebDeployRequiresWebFrontend,
  validateAIFrontendCompatibility,
  validateWorkersCompatibility,
} from "./compatibility-rules";
import { isSilent } from "./context";
import { constraintError, incompatibilityError, missingRequirementError } from "./error-formatter";
import { exitWithError } from "./errors";
import { validatePeerDependencies } from "./peer-dependency-validator";

function validateDatabaseOrmAuth(cfg: Partial<ProjectConfig>, flags?: Set<string>) {
  const db = cfg.database;
  const orm = cfg.orm;
  const has = (k: string) => (flags ? flags.has(k) : true);
  const hasGraphOrm = cfg.stackParts?.some(
    (part) => part.role === "orm" && part.source !== "provided",
  );
  const ecosystemOrm = getEcosystemOrm(cfg);
  const hasEcosystemOrm = ecosystemOrm !== undefined && ecosystemOrm !== "none";
  const isNonTypeScriptSqliteDefault =
    cfg.ecosystem !== undefined &&
    cfg.ecosystem !== "typescript" &&
    cfg.ecosystem !== "react-native" &&
    db === "sqlite" &&
    !hasEcosystemOrm;

  if (has("orm") && has("database") && orm === "mongoose" && db !== "mongodb") {
    incompatibilityError({
      message: "Mongoose ORM requires MongoDB database.",
      provided: { orm: "mongoose", database: db || "none" },
      suggestions: ["Use --database mongodb", "Choose a different ORM (drizzle, prisma)"],
    });
  }

  if (has("orm") && has("database") && orm === "drizzle" && db === "mongodb") {
    incompatibilityError({
      message: "Drizzle ORM does not support MongoDB.",
      provided: { orm: "drizzle", database: "mongodb" },
      suggestions: [
        "Use --orm mongoose or --orm prisma for MongoDB",
        "Choose a different database (postgres, sqlite, mysql)",
      ],
    });
  }

  if (has("orm") && has("database") && orm === "typeorm" && db === "mongodb") {
    incompatibilityError({
      message: "TypeORM does not support MongoDB in Better Fullstack.",
      provided: { orm: "typeorm", database: "mongodb" },
      suggestions: [
        "Use --orm mongoose or --orm prisma for MongoDB",
        "Choose a different database (postgres, sqlite, mysql)",
      ],
    });
  }

  if (has("orm") && has("database") && orm === "kysely" && db === "mongodb") {
    incompatibilityError({
      message: "Kysely does not support MongoDB.",
      provided: { orm: "kysely", database: "mongodb" },
      suggestions: [
        "Use --orm mongoose or --orm prisma for MongoDB",
        "Choose a different database (postgres, sqlite, mysql)",
      ],
    });
  }

  if (has("orm") && has("database") && orm === "mikroorm" && db === "mongodb") {
    incompatibilityError({
      message: "MikroORM does not support MongoDB in Better Fullstack.",
      provided: { orm: "mikroorm", database: "mongodb" },
      suggestions: [
        "Use --orm mongoose or --orm prisma for MongoDB",
        "Choose a different database (postgres, sqlite, mysql)",
      ],
    });
  }

  if (has("orm") && has("database") && orm === "sequelize" && db === "mongodb") {
    incompatibilityError({
      message: "Sequelize does not support MongoDB.",
      provided: { orm: "sequelize", database: "mongodb" },
      suggestions: [
        "Use --orm mongoose or --orm prisma for MongoDB",
        "Choose a different database (postgres, sqlite, mysql)",
      ],
    });
  }

  if (
    has("database") &&
    has("orm") &&
    db === "mongodb" &&
    orm &&
    orm !== "mongoose" &&
    orm !== "prisma" &&
    orm !== "none"
  ) {
    incompatibilityError({
      message:
        "In Better-Fullstack, MongoDB is currently supported only with Mongoose or Prisma ORM.",
      provided: { database: "mongodb", orm },
      suggestions: ["Use --orm mongoose", "Use --orm prisma"],
    });
  }

  // EdgeDB has its own built-in query builder, no separate ORM needed
  // Redis is a key-value store and doesn't use traditional ORMs
  if (
    has("database") &&
    has("orm") &&
    db &&
    db !== "none" &&
    db !== "edgedb" &&
    db !== "redis" &&
    orm === "none" &&
    !hasGraphOrm &&
    !hasEcosystemOrm &&
    !isNonTypeScriptSqliteDefault
  ) {
    missingRequirementError({
      message: "Database selection requires an ORM.",
      provided: { database: db, orm: "none" },
      suggestions: [
        "Use --orm drizzle (recommended)",
        "Use --orm prisma",
        "Use --orm mongoose (MongoDB only)",
      ],
    });
  }

  // EdgeDB should not have an ORM (it has its own query builder)
  if (has("database") && has("orm") && db === "edgedb" && orm && orm !== "none") {
    incompatibilityError({
      message: "EdgeDB has its own built-in query builder and does not require an ORM.",
      provided: { database: "edgedb", orm },
      suggestions: [
        "Use --orm none with EdgeDB",
        "Choose a different database if you want to use an ORM",
      ],
    });
  }

  // Redis should not have an ORM (it's a key-value store with its own client)
  if (has("database") && has("orm") && db === "redis" && orm && orm !== "none") {
    incompatibilityError({
      message: "Redis is a key-value store and does not require an ORM.",
      provided: { database: "redis", orm },
      suggestions: [
        "Use --orm none with Redis",
        "Choose a different database if you want to use an ORM",
      ],
    });
  }

  if (has("orm") && has("database") && orm && orm !== "none" && db === "none") {
    missingRequirementError({
      message: "ORM selection requires a database.",
      provided: { orm, database: "none" },
      suggestions: [
        "Use --database postgres",
        "Use --database sqlite",
        "Use --database mysql",
        "Set --orm none",
      ],
    });
  }
}

function getEcosystemOrm(cfg: Partial<ProjectConfig>) {
  switch (cfg.ecosystem) {
    case "rust":
      return cfg.rustOrm;
    case "python":
      return cfg.pythonOrm;
    case "go":
      return cfg.goOrm;
    case "java":
      return cfg.javaOrm;
    case "dotnet":
      return cfg.dotnetOrm;
    case "elixir":
      return cfg.elixirOrm;
    default:
      return undefined;
  }
}

function getEcosystemBackend(cfg: Partial<ProjectConfig>) {
  switch (cfg.ecosystem) {
    case "rust":
      return cfg.rustWebFramework && cfg.rustWebFramework !== "none"
        ? cfg.rustWebFramework
        : undefined;
    case "python":
      return cfg.pythonWebFramework && cfg.pythonWebFramework !== "none"
        ? cfg.pythonWebFramework
        : undefined;
    case "go":
      return cfg.goWebFramework && cfg.goWebFramework !== "none" ? cfg.goWebFramework : undefined;
    case "java":
      return cfg.javaWebFramework && cfg.javaWebFramework !== "none"
        ? cfg.javaWebFramework
        : undefined;
    case "dotnet":
      return cfg.dotnetWebFramework && cfg.dotnetWebFramework !== "none"
        ? cfg.dotnetWebFramework
        : undefined;
    case "elixir":
      return cfg.elixirWebFramework && cfg.elixirWebFramework !== "none"
        ? cfg.elixirWebFramework
        : undefined;
    default:
      return undefined;
  }
}

function validateDatabaseSetup(config: Partial<ProjectConfig>, providedFlags: Set<string>) {
  const { dbSetup, database, runtime } = config;

  if (
    providedFlags.has("dbSetup") &&
    providedFlags.has("database") &&
    dbSetup &&
    dbSetup !== "none" &&
    database === "none"
  ) {
    exitWithError(
      "Database setup requires a database. Please choose a database or set '--db-setup none'.",
    );
  }

  const setupValidations: Record<
    DatabaseSetup,
    { database?: Database; runtime?: Runtime; errorMessage: string }
  > = {
    turso: {
      database: "sqlite",
      errorMessage:
        "Turso setup requires SQLite database. Please use '--database sqlite' or choose a different setup.",
    },
    neon: {
      database: "postgres",
      errorMessage:
        "Neon setup requires PostgreSQL database. Please use '--database postgres' or choose a different setup.",
    },
    "prisma-postgres": {
      database: "postgres",
      errorMessage:
        "Prisma PostgreSQL setup requires PostgreSQL database. Please use '--database postgres' or choose a different setup.",
    },
    planetscale: {
      errorMessage:
        "PlanetScale setup requires PostgreSQL or MySQL database. Please use '--database postgres' or '--database mysql' or choose a different setup.",
    },
    "mongodb-atlas": {
      database: "mongodb",
      errorMessage:
        "MongoDB Atlas setup requires MongoDB database. Please use '--database mongodb' or choose a different setup.",
    },
    upstash: {
      database: "redis",
      errorMessage:
        "Upstash setup requires Redis database. Please use '--database redis' or choose a different setup.",
    },
    supabase: {
      database: "postgres",
      errorMessage:
        "Supabase setup requires PostgreSQL database. Please use '--database postgres' or choose a different setup.",
    },
    d1: {
      database: "sqlite",
      runtime: "workers",
      errorMessage: "Cloudflare D1 setup requires SQLite database and Cloudflare Workers runtime.",
    },
    docker: {
      errorMessage:
        "In Better-Fullstack, Docker setup is currently not available with SQLite database or Cloudflare Workers runtime.",
    },
    none: { errorMessage: "" },
  };

  if (dbSetup && dbSetup !== "none") {
    const validation = setupValidations[dbSetup];

    if (dbSetup === "planetscale") {
      if (database !== "postgres" && database !== "mysql") {
        exitWithError(validation.errorMessage);
      }
    } else {
      if (validation.database && database !== validation.database) {
        exitWithError(validation.errorMessage);
      }
    }

    if (validation.runtime && runtime !== validation.runtime) {
      exitWithError(validation.errorMessage);
    }

    if (dbSetup === "docker") {
      if (database === "sqlite") {
        exitWithError(
          "In Better-Fullstack, Docker setup is currently not available with SQLite database. SQLite is file-based and doesn't require Docker. Please use '--database postgres', '--database mysql', '--database mongodb', or choose a different setup.",
        );
      }
      if (runtime === "workers") {
        exitWithError(
          "In Better-Fullstack, Docker setup is currently not available with Cloudflare Workers runtime. Workers runtime uses serverless databases (D1) and doesn't support local Docker containers. Please use '--db-setup d1' for SQLite or choose a different runtime.",
        );
      }
    }
  }
}

export function validateEcosystemAuthCompatibility(
  config: Partial<ProjectConfig>,
  providedFlags?: Set<string>,
) {
  const auth = config.auth;

  if (!auth || auth === "none") {
    return;
  }

  const ormsWithoutBetterAuth = ["typeorm", "sequelize", "mikroorm"];
  if (
    (auth === "better-auth" || auth === "better-auth-organizations") &&
    config.orm &&
    ormsWithoutBetterAuth.includes(config.orm)
  ) {
    config.auth = "none";
    if (providedFlags?.has("auth") && !isSilent()) {
      consola.warn(
        pc.yellow(
          `Unsupported auth selection '${auth}' with ${config.orm}: no Better Auth adapter exists. Falling back to '--auth none'.`,
        ),
      );
    }
    return;
  }

  const normalized = normalizeCapabilitySelection(
    "auth",
    {
      ecosystem: config.ecosystem,
      backend: config.backend,
      frontend: config.frontend,
    },
    auth,
  );

  if (!normalized.normalized || normalized.value === auth) {
    return;
  }

  config.auth = normalized.value;

  if (providedFlags?.has("auth") && normalized.reason && !isSilent()) {
    consola.warn(
      pc.yellow(
        `Unsupported auth selection '${auth}' for the current stack: ${normalized.reason}. Falling back to '--auth ${normalized.value}'.`,
      ),
    );
  }
}

function validateConvexConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const { backend } = config;

  if (backend !== "convex") {
    return;
  }

  const has = (k: string) => providedFlags.has(k);

  if (has("runtime") && config.runtime !== "none") {
    constraintError({
      message: "Convex backend manages its own runtime.",
      provided: { backend: "convex", runtime: config.runtime || "" },
      suggestions: ["Remove --runtime flag", "Set --runtime none"],
    });
  }

  if (has("database") && config.database !== "none") {
    constraintError({
      message: "Convex backend has its own built-in database.",
      provided: { backend: "convex", database: config.database || "" },
      suggestions: ["Remove --database flag", "Set --database none"],
    });
  }

  if (has("orm") && config.orm !== "none") {
    constraintError({
      message: "Convex backend has its own data layer (no ORM needed).",
      provided: { backend: "convex", orm: config.orm || "" },
      suggestions: ["Remove --orm flag", "Set --orm none"],
    });
  }

  if (has("api") && config.api !== "none") {
    constraintError({
      message: "Convex backend has its own built-in API layer.",
      provided: { backend: "convex", api: config.api || "" },
      suggestions: ["Remove --api flag", "Set --api none"],
    });
  }

  if (has("dbSetup") && config.dbSetup !== "none") {
    constraintError({
      message: "Convex backend manages its own database infrastructure.",
      provided: { backend: "convex", "db-setup": config.dbSetup || "" },
      suggestions: ["Remove --db-setup flag", "Set --db-setup none"],
    });
  }

  if (has("serverDeploy") && config.serverDeploy !== "none") {
    constraintError({
      message: "Convex backend has its own deployment platform.",
      provided: { backend: "convex", "server-deploy": config.serverDeploy || "" },
      suggestions: ["Remove --server-deploy flag", "Set --server-deploy none"],
    });
  }
}

function validateBackendNoneConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const { backend } = config;
  const hasGraphBackend = config.stackParts?.some(
    (part) =>
      part.role === "backend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.ecosystem !== "typescript" &&
      part.ecosystem !== "react-native" &&
      part.ecosystem !== "universal",
  );
  const hasEcosystemBackend = getEcosystemBackend(config) !== undefined;

  if (backend !== "none" || hasGraphBackend || hasEcosystemBackend) {
    return;
  }

  const has = (k: string) => providedFlags.has(k);

  if (has("runtime") && config.runtime !== "none") {
    exitWithError(
      "Backend 'none' requires '--runtime none'. Please remove the --runtime flag or set it to 'none'.",
    );
  }

  if (has("database") && config.database !== "none") {
    exitWithError(
      "Backend 'none' requires '--database none'. Please remove the --database flag or set it to 'none'.",
    );
  }

  if (has("orm") && config.orm !== "none") {
    exitWithError(
      "Backend 'none' requires '--orm none'. Please remove the --orm flag or set it to 'none'.",
    );
  }

  if (has("api") && config.api !== "none") {
    exitWithError(
      "Backend 'none' requires '--api none'. Please remove the --api flag or set it to 'none'.",
    );
  }

  if (has("payments") && config.payments !== "none") {
    exitWithError(
      "Backend 'none' requires '--payments none'. Please remove the --payments flag or set it to 'none'.",
    );
  }

  if (has("dbSetup") && config.dbSetup !== "none") {
    exitWithError(
      "Backend 'none' requires '--db-setup none'. Please remove the --db-setup flag or set it to 'none'.",
    );
  }

  if (has("serverDeploy") && config.serverDeploy !== "none") {
    exitWithError(
      "Backend 'none' requires '--server-deploy none'. Please remove the --server-deploy flag or set it to 'none'.",
    );
  }
}

function validateSelfBackendConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const { backend } = config;

  if (backend !== "self") {
    return;
  }

  const has = (k: string) => providedFlags.has(k);

  if (has("runtime") && config.runtime !== "none") {
    exitWithError(
      "Backend 'self' (fullstack) requires '--runtime none'. Please remove the --runtime flag or set it to 'none'.",
    );
  }
}

function validateEncoreConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const { backend } = config;

  if (backend !== "encore") {
    return;
  }

  const has = (k: string) => providedFlags.has(k);

  if (has("runtime") && config.runtime !== "none") {
    exitWithError(
      "Encore.ts backend requires '--runtime none'. Encore has its own runtime via the Encore CLI. Please remove the --runtime flag or set it to 'none'.",
    );
  }

  if (has("api") && config.api !== "none") {
    exitWithError(
      "Encore.ts backend requires '--api none'. Encore has its own type-safe API system. Please remove the --api flag or set it to 'none'.",
    );
  }

  if (has("database") && config.database !== "none") {
    exitWithError(
      "Encore.ts backend requires '--database none'. Encore manages databases through its infrastructure primitives. Please remove the --database flag or set it to 'none'.",
    );
  }

  if (has("orm") && config.orm !== "none") {
    exitWithError(
      "Encore.ts backend requires '--orm none'. Encore has its own database abstractions. Please remove the --orm flag or set it to 'none'.",
    );
  }

  if (has("dbSetup") && config.dbSetup !== "none") {
    exitWithError(
      "Encore.ts backend requires '--db-setup none'. Encore manages infrastructure automatically. Please remove the --db-setup flag or set it to 'none'.",
    );
  }

  if (has("serverDeploy") && config.serverDeploy !== "none") {
    exitWithError(
      "Encore.ts backend requires '--server-deploy none'. Encore has its own deployment platform. Please remove the --server-deploy flag or set it to 'none'.",
    );
  }
}

function validateAdonisJSConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const { backend } = config;

  if (backend !== "adonisjs") {
    return;
  }

  const has = (k: string) => providedFlags.has(k);

  if (has("runtime") && config.runtime !== "node") {
    exitWithError(
      "AdonisJS backend requires '--runtime node'. AdonisJS currently only supports Node.js runtime. Please use '--runtime node' or remove the --runtime flag.",
    );
  }
}

function validateBackendConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
  options: CLIInput,
) {
  const { backend } = config;

  if (
    providedFlags.has("backend") &&
    backend &&
    backend !== "convex" &&
    backend !== "none" &&
    backend !== "self" &&
    backend !== "encore"
  ) {
    if (providedFlags.has("runtime") && options.runtime === "none") {
      exitWithError(
        "'--runtime none' is only supported with '--backend convex', '--backend none', '--backend self', or '--backend encore'. Please choose 'bun', 'node', or remove the --runtime flag.",
      );
    }
  }

  if (backend === "convex" && providedFlags.has("frontend") && options.frontend) {
    const incompatibleFrontends = options.frontend.filter((f) => ["solid", "astro"].includes(f));
    if (incompatibleFrontends.length > 0) {
      exitWithError(
        `The following frontends are not compatible with '--backend convex': ${incompatibleFrontends.join(
          ", ",
        )}. Please choose a different frontend or backend.`,
      );
    }
  }
}

function validateFrontendConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const { frontend } = config;

  if (frontend && frontend.length > 0) {
    if (
      config.ecosystem === "react-native" &&
      frontend.some((item) => !item.startsWith("native-") && item !== "none")
    ) {
      incompatibilityError({
        message: "React Native ecosystem only supports native Expo frontends.",
        provided: { ecosystem: "react-native", frontend: frontend.join(" ") },
        suggestions: [
          "Use --frontend native-bare",
          "Use --frontend native-uniwind",
          "Use --frontend native-unistyles",
        ],
      });
    }

    ensureSingleWebAndNative(frontend);

    if (providedFlags.has("api") && providedFlags.has("frontend") && config.api) {
      validateApiFrontendCompatibility(config.api, frontend, config.astroIntegration);
    }
  }

  const hasWebFrontendFlag = (frontend ?? []).some((f) => isWebFrontend(f));
  validateWebDeployRequiresWebFrontend(config.webDeploy, hasWebFrontendFlag);
  validateWebDeployFrontendTemplates(config.webDeploy, frontend);
}

function validateApiConstraints(config: Partial<ProjectConfig>, _options: CLIInput) {
  if (config.api !== "openapi" && config.api !== "apollo-server") return;

  const apiDisplayName = config.api === "apollo-server" ? "Apollo Server" : "OpenAPI";

  const frontend = config.frontend ?? [];
  if (
    frontend.some((item) => ["native-bare", "native-uniwind", "native-unistyles"].includes(item))
  ) {
    incompatibilityError({
      message: `${apiDisplayName} is currently available for web frontends, not React Native.`,
      provided: { api: config.api, frontend },
      suggestions: ["Use --api trpc", "Use --api orpc", "Use a web frontend"],
    });
  }

  const supportedBackends = ["hono", "express", "fastify", "elysia"];
  if (!config.backend || !supportedBackends.includes(config.backend)) {
    incompatibilityError({
      message: `${apiDisplayName} currently supports Hono, Express, Fastify, and Elysia backends.`,
      provided: { api: config.api, backend: config.backend ?? "none" },
      suggestions: [
        "Use --backend hono",
        "Use --backend express",
        "Use --backend fastify",
        "Use --backend elysia",
      ],
    });
  }
}

function validateJavaConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string> = new Set(),
) {
  if (config.ecosystem !== "java") return;

  const hasSpringBoot = config.javaWebFramework === "spring-boot";
  const hasJavaWebFramework = config.javaWebFramework !== "none";
  const hasNoBuildTool = config.javaBuildTool === "none";
  const hasJavaLibraries = (config.javaLibraries ?? []).some((library) => library !== "none");
  const hasJavaTestingLibraries = (config.javaTestingLibraries ?? []).some(
    (library) => library !== "none",
  );
  const hasSpringOnlyFeatures =
    config.javaOrm !== "none" || config.javaAuth !== "none" || hasJavaLibraries;

  if (hasNoBuildTool && hasJavaWebFramework) {
    incompatibilityError({
      message: "Java web frameworks require Maven or Gradle in the Java scaffold.",
      provided: {
        "java-web-framework": config.javaWebFramework ?? "none",
        "java-build-tool": config.javaBuildTool ?? "none",
      },
      suggestions: [
        "Use --java-build-tool maven or --java-build-tool gradle with Java web frameworks",
        "Use --java-web-framework none for a plain Java source-only scaffold",
      ],
    });
  }

  if ((!hasSpringBoot || hasNoBuildTool) && hasSpringOnlyFeatures) {
    incompatibilityError({
      message: "Spring-only Java features require the Spring Boot scaffold with Maven or Gradle.",
      provided: {
        "java-web-framework": config.javaWebFramework ?? "none",
        "java-build-tool": config.javaBuildTool ?? "none",
        "java-orm": config.javaOrm ?? "none",
        "java-auth": config.javaAuth ?? "none",
        "java-libraries": (config.javaLibraries ?? []).join(" ") || "none",
      },
      suggestions: [
        "Use --java-web-framework spring-boot and a real build tool for Spring features",
        "Clear --java-orm, --java-auth, and --java-libraries when using plain Java or Quarkus",
      ],
    });
  }

  if (hasNoBuildTool && hasJavaTestingLibraries) {
    incompatibilityError({
      message: "Java testing libraries require Maven or Gradle to manage test dependencies.",
      provided: {
        "java-build-tool": config.javaBuildTool ?? "none",
        "java-testing-libraries": (config.javaTestingLibraries ?? []).join(" ") || "none",
      },
      suggestions: [
        "Use --java-build-tool maven or --java-build-tool gradle to enable JUnit/Mockito/Testcontainers",
        "Set --java-testing-libraries none for a source-only plain Java scaffold",
      ],
    });
  }
}

function validateElixirConstraints(config: Partial<ProjectConfig>) {
  if (config.ecosystem !== "elixir") return;

  const hasPhoenix = config.elixirWebFramework !== "none";
  const hasEcto = config.elixirOrm !== "none";
  const hasEctoSql = config.elixirOrm === "ecto-sql";

  if (!hasPhoenix) {
    const phoenixOnlySelections = [
      {
        flag: "elixir-auth",
        value: config.elixirAuth,
        message: "Elixir auth scaffolds require Phoenix.",
      },
      {
        flag: "elixir-api",
        value: config.elixirApi,
        message: "Elixir API scaffolds require Phoenix.",
      },
      {
        flag: "elixir-realtime",
        value: config.elixirRealtime,
        message: "Elixir realtime scaffolds require Phoenix.",
      },
      {
        flag: "elixir-testing",
        value: config.elixirTesting === "wallaby" ? config.elixirTesting : "none",
        message: "Wallaby browser tests require Phoenix.",
      },
    ];

    for (const selection of phoenixOnlySelections) {
      if (!selection.value || selection.value === "none") continue;

      incompatibilityError({
        message: selection.message,
        provided: {
          "elixir-web-framework": config.elixirWebFramework ?? "none",
          [selection.flag]: selection.value,
        },
        suggestions: [
          "Use --elixir-web-framework phoenix",
          "Use --elixir-web-framework phoenix-live-view",
          `Use --${selection.flag} none`,
        ],
      });
    }
  }

  if (hasPhoenix && config.elixirJson === "none") {
    incompatibilityError({
      message: "Phoenix JSON scaffolds require Jason.",
      provided: { "elixir-json": "none" },
      suggestions: ["Use --elixir-json jason"],
    });
  }

  if (config.elixirAuth === "phx-gen-auth" && !hasEctoSql) {
    incompatibilityError({
      message: "phx.gen.auth requires Ecto SQL with PostgreSQL in the generated Phoenix scaffold.",
      provided: {
        "elixir-auth": "phx-gen-auth",
        "elixir-orm": config.elixirOrm ?? "none",
      },
      suggestions: ["Use --elixir-orm ecto-sql", "Use --elixir-auth none"],
    });
  }

  if (config.elixirJobs === "oban" && config.elixirOrm !== "ecto-sql") {
    incompatibilityError({
      message: "Oban requires Ecto SQL with PostgreSQL in the generated Phoenix scaffold.",
      provided: {
        "elixir-jobs": "oban",
        "elixir-orm": config.elixirOrm ?? "none",
      },
      suggestions: ["Use --elixir-orm ecto-sql", "Use --elixir-jobs none"],
    });
  }

  if (
    config.elixirRealtime === "live-view-streams" &&
    config.elixirWebFramework !== "phoenix-live-view"
  ) {
    incompatibilityError({
      message: "LiveView Streams require Phoenix LiveView.",
      provided: {
        "elixir-realtime": "live-view-streams",
        "elixir-web-framework": config.elixirWebFramework ?? "none",
      },
      suggestions: [
        "Use --elixir-web-framework phoenix-live-view",
        "Use --elixir-realtime channels",
      ],
    });
  }

  if (config.elixirApi === "absinthe" && !hasEcto) {
    incompatibilityError({
      message: "Absinthe GraphQL requires Ecto in the current generated Phoenix scaffold.",
      provided: {
        "elixir-api": "absinthe",
        "elixir-orm": config.elixirOrm ?? "none",
      },
      suggestions: ["Use --elixir-orm ecto-sql", "Use --elixir-api rest"],
    });
  }
}

function validateEmailConstraints(config: Partial<ProjectConfig>) {
  if (!config.email || config.email === "none") return;
  if (config.ecosystem !== "typescript" && config.email !== "resend") {
    incompatibilityError({
      message: "Only Resend email is available for non-TypeScript ecosystems.",
      provided: { ecosystem: config.ecosystem ?? "typescript", email: config.email },
      suggestions: ["Use --email resend", "Use --email none"],
    });
  }
  if (config.ecosystem === "java" && config.email === "resend" && config.javaBuildTool === "none") {
    incompatibilityError({
      message: "Resend email for Java requires Maven or Gradle to manage the SDK dependency.",
      provided: { "java-build-tool": "none", email: "resend" },
      suggestions: ["Use --java-build-tool maven", "Use --java-build-tool gradle"],
    });
  }
}

function validateObservabilityConstraints(config: Partial<ProjectConfig>) {
  if (!config.observability || config.observability === "none") return;
  if (config.ecosystem !== "typescript" && config.observability !== "sentry") {
    incompatibilityError({
      message: "Only Sentry observability is available for non-TypeScript ecosystems.",
      provided: {
        ecosystem: config.ecosystem ?? "typescript",
        observability: config.observability,
      },
      suggestions: ["Use --observability sentry", "Use --observability none"],
    });
  }
  if (
    config.ecosystem === "java" &&
    config.observability === "sentry" &&
    config.javaBuildTool === "none"
  ) {
    incompatibilityError({
      message:
        "Sentry observability for Java requires Maven or Gradle to manage the SDK dependency.",
      provided: { "java-build-tool": "none", observability: "sentry" },
      suggestions: ["Use --java-build-tool maven", "Use --java-build-tool gradle"],
    });
  }
}

function validateCachingConstraints(config: Partial<ProjectConfig>) {
  if (!config.caching || config.caching === "none") return;
  if (config.ecosystem !== "typescript" && config.caching !== "upstash-redis") {
    incompatibilityError({
      message: "Only Upstash Redis caching is available for non-TypeScript ecosystems.",
      provided: { ecosystem: config.ecosystem ?? "typescript", caching: config.caching },
      suggestions: ["Use --caching upstash-redis", "Use --caching none"],
    });
  }
  if (
    config.ecosystem === "java" &&
    config.caching === "upstash-redis" &&
    config.javaBuildTool === "none"
  ) {
    incompatibilityError({
      message:
        "Upstash Redis caching for Java requires Maven or Gradle to manage the Redis client dependency.",
      provided: { "java-build-tool": "none", caching: "upstash-redis" },
      suggestions: ["Use --java-build-tool maven", "Use --java-build-tool gradle"],
    });
  }
}

function validateRateLimitConstraints(config: Partial<ProjectConfig>) {
  if (!config.rateLimit || config.rateLimit === "none") return;
  if (config.ecosystem !== "typescript") {
    incompatibilityError({
      message: "Rate limiting helpers are currently available for TypeScript stacks only.",
      provided: { ecosystem: config.ecosystem ?? "typescript", "rate-limit": config.rateLimit },
      suggestions: ["Use --rate-limit none"],
    });
  }
  if (config.backend === "convex") {
    incompatibilityError({
      message: "Rate limiting helpers are not generated with Convex backend.",
      provided: { backend: "convex", "rate-limit": config.rateLimit },
      suggestions: ["Use --rate-limit none"],
    });
  }
  if (config.backend === "none") {
    incompatibilityError({
      message: "Rate limiting requires a backend.",
      provided: { backend: "none", "rate-limit": config.rateLimit },
      suggestions: ["Use --backend hono", "Use --rate-limit none"],
    });
  }
}

function validateSearchConstraints(config: Partial<ProjectConfig>) {
  if (!config.search || config.search === "none") return;
  const ecosystem = config.ecosystem ?? "typescript";
  if (ecosystem !== "typescript" && config.search !== "meilisearch") {
    incompatibilityError({
      message: "Only Meilisearch search is available for non-TypeScript ecosystems.",
      provided: { ecosystem, search: config.search },
      suggestions: ["Use --search meilisearch", "Use --search none"],
    });
  }
  if (
    config.ecosystem === "java" &&
    config.search === "meilisearch" &&
    config.javaBuildTool === "none"
  ) {
    incompatibilityError({
      message: "Meilisearch search for Java requires Maven or Gradle to manage the SDK dependency.",
      provided: { "java-build-tool": "none", search: "meilisearch" },
      suggestions: ["Use --java-build-tool maven", "Use --java-build-tool gradle"],
    });
  }
}

function validateShadcnConstraints(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
) {
  const shadcnFlagMap: Record<string, string> = {
    shadcnBase: "--shadcn-base",
    shadcnStyle: "--shadcn-style",
    shadcnIconLibrary: "--shadcn-icon-library",
    shadcnColorTheme: "--shadcn-color-theme",
    shadcnBaseColor: "--shadcn-base-color",
    shadcnFont: "--shadcn-font",
    shadcnRadius: "--shadcn-radius",
  };

  const providedShadcnFlags = Object.keys(shadcnFlagMap).filter((f) => providedFlags.has(f));

  if (providedShadcnFlags.length > 0 && config.uiLibrary !== "shadcn-ui") {
    incompatibilityError({
      message: "shadcn/ui customization flags require --ui-library shadcn-ui.",
      provided: {
        "ui-library": config.uiLibrary || "none",
        ...Object.fromEntries(
          providedShadcnFlags.map((f) => [
            shadcnFlagMap[f],
            String(config[f as keyof ProjectConfig] ?? ""),
          ]),
        ),
      },
      suggestions: [
        "Add --ui-library shadcn-ui to use shadcn customization flags",
        "Remove the --shadcn-* flags if not using shadcn/ui",
      ],
    });
  }
}

export function validatePythonApiConstraints(config: Partial<ProjectConfig>) {
  if (
    config.ecosystem === "python" &&
    config.pythonApi &&
    config.pythonApi !== "none" &&
    config.pythonWebFramework !== "django"
  ) {
    incompatibilityError({
      message: "Python API frameworks require --python-web-framework django.",
      provided: {
        "python-web-framework": config.pythonWebFramework || "none",
        "python-api": config.pythonApi,
      },
      suggestions: [
        "Use --python-web-framework django with --python-api django-rest-framework or django-ninja",
        "Set --python-api none for FastAPI, Flask, Litestar, or no Python web framework",
      ],
    });
  }
}

export function validateFullConfig(
  config: Partial<ProjectConfig>,
  providedFlags: Set<string>,
  options: CLIInput,
) {
  if (config.stackParts && !options.yolo) {
    const graphValidation = validateStackParts(config.stackParts);
    if (graphValidation.issues.length > 0) {
      exitWithError(graphValidation.issues.map((issue) => issue.message).join("\n"));
    }
  }

  validateEcosystemAuthCompatibility(config, providedFlags);
  validateDatabaseOrmAuth(config, providedFlags);
  validateDatabaseSetup(config, providedFlags);

  validateConvexConstraints(config, providedFlags);
  validateBackendNoneConstraints(config, providedFlags);
  validateSelfBackendConstraints(config, providedFlags);
  validateEncoreConstraints(config, providedFlags);
  validateAdonisJSConstraints(config, providedFlags);
  validateBackendConstraints(config, providedFlags, options);

  validateFrontendConstraints(config, providedFlags);

  validateApiConstraints(config, options);
  validatePythonApiConstraints(config);
  validateEmailConstraints(config);
  validateObservabilityConstraints(config);
  validateCachingConstraints(config);
  validateRateLimitConstraints(config);
  validateSearchConstraints(config);
  validateJavaConstraints(config, providedFlags);
  validateElixirConstraints(config);

  const hasGraphBackend = config.stackParts?.some(
    (part) =>
      part.role === "backend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.ecosystem !== "typescript" &&
      part.ecosystem !== "react-native" &&
      part.ecosystem !== "universal",
  );
  const shouldDeferInteractiveServerDeployValidation =
    providedFlags.has("serverDeploy") &&
    !options.yes &&
    !options.part?.length &&
    options.ecosystem === undefined &&
    options.backend === undefined &&
    config.stackParts === undefined;

  if (!shouldDeferInteractiveServerDeployValidation) {
    validateServerDeployRequiresBackend(
      config.serverDeploy,
      config.backend,
      Boolean(hasGraphBackend),
    );
  }

  validateSelfBackendCompatibility(providedFlags, options, config);
  validateWorkersCompatibility(providedFlags, options, config);

  if (config.runtime === "workers" && config.serverDeploy === "none") {
    exitWithError(
      "Cloudflare Workers runtime requires a server deployment. Please choose 'alchemy' for --server-deploy.",
    );
  }

  if (
    providedFlags.has("serverDeploy") &&
    config.serverDeploy === "cloudflare" &&
    config.runtime !== "workers"
  ) {
    exitWithError(
      `Server deployment '${config.serverDeploy}' requires '--runtime workers'. Please use '--runtime workers' or choose a different server deployment.`,
    );
  }

  // Vercel serverDeploy incompatible with persistent backends
  if (
    config.serverDeploy === "vercel" &&
    ["nestjs", "adonisjs", "encore"].includes(config.backend!)
  ) {
    incompatibilityError({
      message: "Vercel serverless functions cannot host persistent-process backends",
      provided: { backend: config.backend!, serverDeploy: config.serverDeploy },
      suggestions: [
        "Use --server-deploy fly or --server-deploy railway for NestJS/AdonisJS",
        "Switch to a serverless-compatible backend like Hono or Express",
      ],
    });
  }

  if (config.serverDeploy === "netlify") {
    if (config.backend !== "hono") {
      incompatibilityError({
        message: "Netlify Functions server deploy is currently supported only with Hono",
        provided: { backend: config.backend!, serverDeploy: config.serverDeploy },
        suggestions: [
          "Use --backend hono",
          "Use --server-deploy fly, railway, render, or docker for this backend",
        ],
      });
    }

    if (config.runtime !== "node") {
      incompatibilityError({
        message: "Netlify Functions server deploy requires Node.js runtime",
        provided: { runtime: config.runtime!, serverDeploy: config.serverDeploy },
        suggestions: ["Use --runtime node", "Choose a different server deployment target"],
      });
    }
  }

  if (config.addons && config.addons.length > 0) {
    validateAddonsAgainstFrontends(
      config.addons,
      config.frontend,
      config.auth,
      config.backend,
      config.runtime,
      config.ecosystem,
      config.rustFrontend,
      config.javaWebFramework,
      config.database,
    );
    config.addons = [...new Set(config.addons)];
  }

  validateExamplesCompatibility(
    config.examples ?? [],
    config.backend,
    config.frontend ?? [],
    config.runtime,
    config.ai,
  );

  validatePaymentsCompatibility(
    config.payments,
    config.auth,
    config.backend,
    config.frontend ?? [],
  );

  validateAIFrontendCompatibility(config.ai, config.frontend ?? []);

  validateUILibraryFrontendCompatibility(
    config.uiLibrary,
    config.frontend ?? [],
    config.astroIntegration,
  );
  validateUILibraryCSSFrameworkCompatibility(config.uiLibrary, config.cssFramework);
  validateShadcnConstraints(config, providedFlags);

  // Peer dependency conflict detection
  validatePeerDependencies(config);
}

export function validateConfigForProgrammaticUse(config: Partial<ProjectConfig>) {
  try {
    if (config.stackParts) {
      const graphValidation = validateStackParts(config.stackParts);
      if (graphValidation.issues.length > 0) {
        throw new Error(graphValidation.issues.map((issue) => issue.message).join("\n"));
      }
    }

    validateEcosystemAuthCompatibility(config);
    validateDatabaseOrmAuth(config);

    if (config.frontend && config.frontend.length > 0) {
      ensureSingleWebAndNative(config.frontend);
    }

    validateApiFrontendCompatibility(config.api, config.frontend, config.astroIntegration);
    validatePythonApiConstraints(config);
    validateEmailConstraints(config);
    validateObservabilityConstraints(config);
    validateCachingConstraints(config);
    validateRateLimitConstraints(config);
    validateSearchConstraints(config);
    validateJavaConstraints(config);
    validateElixirConstraints(config);

    validatePaymentsCompatibility(config.payments, config.auth, config.backend, config.frontend);

    if (config.addons && config.addons.length > 0) {
      validateAddonsAgainstFrontends(
        config.addons,
        config.frontend,
        config.auth,
        config.backend,
        config.runtime,
        config.ecosystem,
        config.rustFrontend,
        config.javaWebFramework,
        config.database,
      );
    }

    validateExamplesCompatibility(
      config.examples ?? [],
      config.backend,
      config.frontend ?? [],
      config.runtime,
      config.ai,
    );

    validateAIFrontendCompatibility(config.ai, config.frontend ?? []);

    validateUILibraryFrontendCompatibility(
      config.uiLibrary,
      config.frontend ?? [],
      config.astroIntegration,
    );
    validateUILibraryCSSFrameworkCompatibility(config.uiLibrary, config.cssFramework);

    // Peer dependency conflict detection
    validatePeerDependencies(config);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error), { cause: error });
  }
}
