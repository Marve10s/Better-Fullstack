import type {
  Backend,
  CSSFramework,
  Frontend,
  JobQueue,
  Runtime,
  UILibrary,
  WebDeploy,
} from "@/config/types";

const WEB_FRAMEWORKS: readonly Frontend[] = [
  "tanstack-router",
  "react-router",
  "react-vite",
  "vanilla-vite",
  "vue",
  "tanstack-start",
  "next",
  "vinext",
  "nuxt",
  "svelte",
  "solid",
  "solid-start",
  "tanstack-start-solid",
  "astro",
  "qwik",
  "angular",
  "redwood",
  "fresh",
  "none",
] as const;

const WEB_DEPLOY_COMPATIBLE_FRONTENDS = {
  cloudflare: [
    "tanstack-router",
    "react-router",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "astro",
  ],
  render: [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
  ],
  netlify: [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "solid-start",
  ],
} as const satisfies Partial<Record<WebDeploy, readonly Frontend[]>>;

export const hasPWACompatibleFrontend = (webFrontend: string[]) =>
  webFrontend.some((frontend) =>
    [
      "tanstack-router",
      "react-router",
      "react-vite",
      "vanilla-vite",
      "vue",
      "solid",
      "next",
      "vinext",
      "astro",
    ].includes(frontend),
  );

export const hasTauriCompatibleFrontend = (webFrontend: string[]) =>
  webFrontend.some((frontend) =>
    [
      "tanstack-router",
      "react-router",
      "react-vite",
      "vanilla-vite",
      "vue",
      "nuxt",
      "svelte",
      "solid",
      "next",
      "vinext",
      "astro",
    ].includes(frontend),
  );

export const hasDockerComposeCompatibleFrontend = (webFrontend: string[]) =>
  webFrontend.some((frontend) =>
    [
      "tanstack-router",
      "react-router",
      "react-vite",
      "vanilla-vite",
      "vue",
      "solid",
      "next",
      "vinext",
      "astro",
    ].includes(frontend),
  );

export function getUnsupportedWebDeployFrontend(
  webDeploy: string | undefined,
  frontends: readonly string[] = [],
): string | undefined {
  const supported = WEB_DEPLOY_COMPATIBLE_FRONTENDS[
    webDeploy as keyof typeof WEB_DEPLOY_COMPATIBLE_FRONTENDS
  ];
  if (!supported) return undefined;

  return frontends.find((frontend) => {
    if (frontend === "none" || !WEB_FRAMEWORKS.includes(frontend as Frontend)) return false;
    return !(supported as readonly string[]).includes(frontend);
  });
}

export const UI_LIBRARY_COMPATIBILITY: Record<
  UILibrary,
  {
    frontends: readonly Frontend[];
    cssFrameworks: readonly CSSFramework[];
  }
> = {
  "shadcn-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind"],
  },
  "shadcn-svelte": {
    frontends: ["svelte", "astro"],
    cssFrameworks: ["tailwind"],
  },
  daisyui: {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "vanilla-vite",
      "vue",
      "tanstack-start",
      "next",
      "vinext",
      "nuxt",
      "svelte",
      "solid",
      "solid-start",
      "astro",
      "qwik",
      "angular",
      "redwood",
      "fresh",
    ],
    cssFrameworks: ["tailwind"],
  },
  "radix-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "styled-components", "none"],
  },
  "headless-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "nuxt",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  "park-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "nuxt",
      "solid",
      "solid-start",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only"],
  },
  "chakra-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  nextui: {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind"],
  },
  mantine: {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  mui: {
    frontends: ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "astro"],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  antd: {
    frontends: ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "astro"],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  "base-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  "ark-ui": {
    frontends: [
      "tanstack-router",
      "react-router",
      "tanstack-start",
      "next",
      "vinext",
      "nuxt",
      "svelte",
      "solid",
      "solid-start",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  "react-aria": {
    frontends: [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "astro",
    ],
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "none"],
  },
  none: {
    frontends: WEB_FRAMEWORKS,
    cssFrameworks: ["tailwind", "scss", "less", "postcss-only", "styled-components", "none"],
  },
};

export const BACKEND_UTILS_COMPATIBLE_BACKENDS = [
  "hono",
  "express",
  "fastify",
  "elysia",
  "fets",
  "nestjs",
] as const satisfies readonly Backend[];

export function isBackendUtilsCompatibleBackend(backend: string | undefined): boolean {
  return (
    backend !== undefined && (BACKEND_UTILS_COMPATIBLE_BACKENDS as readonly string[]).includes(backend)
  );
}

const GENERATED_JOB_QUEUE_BACKENDS = new Set(["hono", "express", "fastify", "elysia"]);

const GENERATED_JOB_QUEUE_REQUIREMENTS: Partial<
  Record<JobQueue, { label: string; workerProcess: boolean; postgres: boolean }>
> = {
  "pg-boss": { label: "pg-boss", workerProcess: true, postgres: true },
  hatchet: { label: "Hatchet", workerProcess: true, postgres: false },
  "upstash-qstash": { label: "Upstash QStash", workerProcess: false, postgres: false },
};

export function hasGeneratedJobQueueRequirements(jobQueue: string | undefined): boolean {
  return GENERATED_JOB_QUEUE_REQUIREMENTS[jobQueue as JobQueue] !== undefined;
}

/**
 * Shared reason for job queues whose generated worker or receiver only exists for some stacks.
 * Legacy compatibility, graph validation, CLI validation, and the builder all report this text.
 * With `partial`, an undefined selection is still unanswered and is not judged, so prompts can
 * offer only the choices that keep the job queue valid.
 */
export function getJobQueueIncompatibility(
  jobQueue: string | undefined,
  stack: { backend?: string; runtime?: string; database?: string },
  { partial = false } = {},
): string | null {
  const requirements = GENERATED_JOB_QUEUE_REQUIREMENTS[jobQueue as JobQueue];
  if (!requirements) return null;
  const isUnanswered = (value: string | undefined) => partial && value === undefined;
  if (!isUnanswered(stack.backend) && !GENERATED_JOB_QUEUE_BACKENDS.has(stack.backend ?? "")) {
    return `${requirements.label} is generated for Hono, Express, Fastify, and Elysia backends`;
  }
  if (requirements.workerProcess && stack.runtime === "workers") {
    return `${requirements.label} needs a long-running Node.js or Bun worker process, not Cloudflare Workers`;
  }
  if (requirements.postgres && !isUnanswered(stack.database) && stack.database !== "postgres") {
    return `${requirements.label} requires PostgreSQL`;
  }
  return null;
}

const MONGODB_UNSUPPORTED_ORM_REASONS: Record<string, string> = {
  drizzle: "Drizzle ORM does not support MongoDB",
  typeorm: "TypeORM does not support MongoDB in Better Fullstack",
  kysely: "Kysely does not support MongoDB",
  mikroorm: "MikroORM does not support MongoDB in Better Fullstack",
  sequelize: "Sequelize does not support MongoDB",
};

const ORMLESS_DATABASE_REASONS: Record<string, string> = {
  edgedb: "EdgeDB has its own built-in query builder and does not require an ORM",
  redis: "Redis is a key-value store and does not require an ORM",
};

/**
 * Shared reason for a TypeScript database and ORM pair that cannot generate a working data layer.
 * Legacy compatibility, graph validation, CLI validation, MCP, createVirtual, update planning,
 * prompts, and the builder all report this text. Only a selected database with a selected ORM is
 * judged: `none` or an unanswered side is a missing requirement, not an impossible pair.
 */
export function getDatabaseOrmIncompatibility(
  database: string | undefined,
  orm: string | undefined,
): string | null {
  if (!database || !orm || database === "none" || orm === "none") return null;
  if (orm === "mongoose") {
    return database === "mongodb" ? null : "Mongoose ORM requires MongoDB database";
  }
  if (database === "mongodb") return MONGODB_UNSUPPORTED_ORM_REASONS[orm] ?? null;
  return ORMLESS_DATABASE_REASONS[database] ?? null;
}

const BETTER_AUTH_UNSUPPORTED_TOOLS: Record<string, string> = {
  redis: "Redis",
  edgedb: "EdgeDB",
  typeorm: "TypeORM",
  sequelize: "Sequelize",
  mikroorm: "MikroORM",
};

const BETTER_AUTH_DATABASE_LABELS: Record<string, string> = {
  sqlite: "SQLite",
  postgres: "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
};

/**
 * Shared reason for database and ORM pairs Better Auth has no adapter for. Better Auth cannot use
 * a connection string, so a database without a Drizzle, Prisma, Kysely, or Mongoose adapter has
 * no working configuration. Legacy compatibility, graph validation, CLI validation, MCP,
 * createVirtual, and the builder all report this text. With `partial`, an undefined selection is
 * still unanswered and is not judged, so prompts can offer only the choices that keep it valid.
 */
export function getBetterAuthDatabaseIncompatibility(
  auth: string | undefined,
  stack: { database?: string; orm?: string },
  { partial = false } = {},
): string | null {
  if (auth !== "better-auth" && auth !== "better-auth-organizations") return null;
  const database = stack.database ?? (partial ? undefined : "none");
  const orm = stack.orm ?? (partial ? undefined : "none");
  const unsupported =
    BETTER_AUTH_UNSUPPORTED_TOOLS[database ?? ""] ?? BETTER_AUTH_UNSUPPORTED_TOOLS[orm ?? ""];
  if (unsupported) return `Better Auth has no ${unsupported} adapter`;
  const databaseLabel = BETTER_AUTH_DATABASE_LABELS[database ?? ""];
  if (orm === "none" && databaseLabel) {
    return `Better Auth needs a Drizzle, Prisma, Kysely, or Mongoose adapter for ${databaseLabel}`;
  }
  return null;
}

export function isExampleAIAllowed(backend?: Backend, frontends: Frontend[] = []) {
  const includesSolid = frontends.includes("solid");
  const includesSolidStart =
    frontends.includes("solid-start") || frontends.includes("tanstack-start-solid");
  if (includesSolid || includesSolidStart) return false;

  if (backend === "convex") {
    const includesNuxt = frontends.includes("nuxt");
    const includesSvelte = frontends.includes("svelte");
    if (includesNuxt || includesSvelte) return false;
  }

  return true;
}

function hasExampleChatSdkSelfFrontend(frontends: Frontend[] = []) {
  return frontends.some((frontend) => ["next", "tanstack-start", "nuxt"].includes(frontend));
}

export function isExampleChatSdkAllowed(
  backend?: Backend | string,
  frontends: Frontend[] = [],
  runtime?: Runtime | string,
) {
  if (frontends.includes("react-vite")) return false;
  if (!backend || backend === "none" || backend === "convex") return false;

  if (backend === "self") {
    return hasExampleChatSdkSelfFrontend(frontends);
  }

  if (backend === "self-next" || backend === "self-tanstack-start" || backend === "self-nuxt") {
    return true;
  }

  if (
    backend === "self-astro" ||
    backend === "self-svelte" ||
    backend === "self-solid-start" ||
    backend === "self-tanstack-start-solid"
  ) {
    return false;
  }

  if (backend === "hono") {
    return runtime === "node";
  }

  return false;
}

export function requiresChatSdkVercelAIForExamples(
  backend?: Backend | string,
  runtime?: Runtime | string,
  examples: readonly string[] = [],
): boolean {
  return (
    examples.includes("chat-sdk") &&
    (backend === "self-nuxt" || (backend === "hono" && runtime === "node"))
  );
}

export function hasTanStackAICompatibleFrontend(frontends: readonly string[] = []): boolean {
  return frontends.some((frontend) =>
    [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "redwood",
      "solid",
      "solid-start",
    ].includes(frontend),
  );
}
