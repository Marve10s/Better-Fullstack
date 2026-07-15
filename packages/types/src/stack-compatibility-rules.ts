import type { Backend, CSSFramework, Frontend, Runtime, UILibrary, WebDeploy } from "./types";

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

export function isExampleAIAllowed(backend?: Backend, frontends: Frontend[] = []) {
  const includesSolid = frontends.includes("solid");
  const includesSolidStart = frontends.includes("solid-start");
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

  if (backend === "self-astro" || backend === "self-svelte" || backend === "self-solid-start") {
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
