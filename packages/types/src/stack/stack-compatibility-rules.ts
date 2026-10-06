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
 */
export function getJobQueueIncompatibility(
  jobQueue: string | undefined,
  stack: { backend?: string; runtime?: string; database?: string },
): string | null {
  const requirements = GENERATED_JOB_QUEUE_REQUIREMENTS[jobQueue as JobQueue];
  if (!requirements) return null;
  if (!stack.backend || !GENERATED_JOB_QUEUE_BACKENDS.has(stack.backend)) {
    return `${requirements.label} is generated for Hono, Express, Fastify, and Elysia backends`;
  }
  if (requirements.workerProcess && stack.runtime === "workers") {
    return `${requirements.label} needs a long-running Node.js or Bun worker process, not Cloudflare Workers`;
  }
  if (requirements.postgres && stack.database !== "postgres") {
    return `${requirements.label} requires PostgreSQL`;
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
