// Icon registry for theme-aware tech icon rendering.
// Maps every tech id from TECH_OPTIONS / ECOSYSTEMS to one of:
//   SiConfig  → rendered from cdn.simpleicons.org with auto-computed colour
//   LocalConfig → rendered from a local /public/icon/* file or external URL

type SiConfig = {
  type: "si";
  slug: string;
  hex: string;
  needsInvert?: "dark" | "light";
  /** Keep brand hex in every theme (skip luminance-based recoloring). */
  fixedColor?: boolean;
};
type LocalConfig = {
  type: "local";
  src: string;
  /** CSS invert strategy for local SVGs that use hardcoded colours.
   *  'dark'  → invert-0 dark:invert  (black icon: show white on dark bg)
   *  'light' → invert dark:invert-0  (white icon: show dark on light bg)
   *  'both'  → no filter             (colourful, always fine)
   *  absent  → no filter             (colourful or currentColor adapts automatically)
   */
  needsInvert?: "dark" | "light" | "both";
};
export type IconConfig = SiConfig | LocalConfig;

/**
 * For a Simple Icons CDN icon, choose the right colour given the current theme.
 * Dark icons (low luminance) become white on dark backgrounds.
 * Near-white icons get darkened slightly on light backgrounds.
 */
function computeColor(brandHex: string, isDark: boolean): string {
  const r = parseInt(brandHex.slice(0, 2), 16) / 255;
  const g = parseInt(brandHex.slice(2, 4), 16) / 255;
  const b = parseInt(brandHex.slice(4, 6), 16) / 255;
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (isDark && L < 0.25) return "FFFFFF"; // dark icon on dark bg → white
  if (!isDark && L > 0.75) return "1a1a1a"; // near-white icon on light bg → near-black
  return brandHex;
}

export function computeSiUrl(
  slug: string,
  hex: string,
  isDark: boolean,
  fixedColor = false,
): string {
  const color = fixedColor ? hex : computeColor(hex, isDark);
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export function getInvertClass(needsInvert?: "dark" | "light" | "both"): string {
  if (needsInvert === "dark") return "invert-0 dark:invert";
  if (needsInvert === "light") return "invert dark:invert-0";
  return "";
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
// Keys are the `id` values from TECH_OPTIONS and ECOSYSTEMS.
// currentColor SVGs loaded via <img> always render as black in external context,
// so they need needsInvert: 'dark' to become white on dark backgrounds.

export const ICON_REGISTRY: Record<string, IconConfig> = {
  // ─── Ecosystems ────────────────────────────────────────────────────────────
  typescript: { type: "si", slug: "typescript", hex: "3178C6" },
  "react-native": { type: "si", slug: "react", hex: "61DAFB", fixedColor: true },
  rust: { type: "si", slug: "rust", hex: "000000", needsInvert: "dark" },
  python: { type: "si", slug: "python", hex: "3776AB" },
  go: { type: "si", slug: "go", hex: "00ADD8" },
  java: { type: "local", src: "/icon/java.svg" },
  elixir: { type: "si", slug: "elixir", hex: "4B275F" },
  dotnet: { type: "si", slug: "dotnet", hex: "512BD4" },
  "aspnet-minimal": { type: "si", slug: "dotnet", hex: "512BD4" },
  "aspnet-mvc": { type: "si", slug: "dotnet", hex: "512BD4" },
  "aspnet-blazor": { type: "si", slug: "blazor", hex: "512BD4" },
  "ef-core": { type: "si", slug: "dotnet", hex: "512BD4" },
  "aspnet-identity": { type: "si", slug: "dotnet", hex: "512BD4" },
  "auth0-aspnet": { type: "si", slug: "auth0", hex: "EB5424" },
  "minimal-api": { type: "si", slug: "openapiinitiative", hex: "6BA539" },
  "graphql-hotchocolate": { type: "si", slug: "graphql", hex: "E10098" },
  "grpc-dotnet": { type: "local", src: "/icon/grpc.svg" },
  "testcontainers-dotnet": {
    type: "local",
    src: "https://raw.githubusercontent.com/testcontainers/testcontainers-dotnet/main/docs/logo.svg",
  },
  "hosted-services": { type: "si", slug: "dotnet", hex: "512BD4" },
  signalr: { type: "si", slug: "dotnet", hex: "512BD4" },
  "opentelemetry-dotnet": { type: "si", slug: "opentelemetry", hex: "000000" },
  "health-checks": { type: "si", slug: "dotnet", hex: "512BD4" },
  "memory-cache": { type: "si", slug: "dotnet", hex: "512BD4" },
  azure: { type: "local", src: "https://azure.microsoft.com/favicon.ico" },
  aws: { type: "local", src: "https://aws.amazon.com/favicon.ico" },
  phoenix: { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  "phoenix-live-view": { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  "ecto-sql": { type: "si", slug: "postgresql", hex: "4169E1" },
  ecto: { type: "si", slug: "elixir", hex: "4B275F" },
  "phx-gen-auth": { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  ueberauth: { type: "si", slug: "openid", hex: "000000" },
  guardian: { type: "si", slug: "jsonwebtokens", hex: "000000" },
  absinthe: { type: "si", slug: "graphql", hex: "E10098" },
  channels: { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  presence: { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  pubsub: { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  "live-view-streams": { type: "si", slug: "phoenixframework", hex: "FD4F00" },
  oban: { type: "si", slug: "postgresql", hex: "4169E1" },
  quantum: { type: "si", slug: "elixir", hex: "4B275F" },
  "ecto-changesets": { type: "si", slug: "elixir", hex: "4B275F" },
  "nimble-options": { type: "si", slug: "elixir", hex: "4B275F" },
  req: { type: "si", slug: "elixir", hex: "4B275F" },
  finch: { type: "si", slug: "elixir", hex: "4B275F" },
  jason: { type: "si", slug: "elixir", hex: "4B275F" },
  swoosh: { type: "si", slug: "elixir", hex: "4B275F" },
  cachex: { type: "si", slug: "elixir", hex: "4B275F" },
  nebulex: { type: "si", slug: "elixir", hex: "4B275F" },
  telemetry: { type: "si", slug: "elixir", hex: "4B275F" },
  prom_ex: { type: "si", slug: "prometheus", hex: "E6522C" },
  ex_unit: { type: "si", slug: "elixir", hex: "4B275F" },
  mox: { type: "si", slug: "elixir", hex: "4B275F" },
  bypass: { type: "si", slug: "elixir", hex: "4B275F" },
  wallaby: { type: "si", slug: "elixir", hex: "4B275F" },
  credo: { type: "si", slug: "elixir", hex: "4B275F" },
  dialyxir: { type: "si", slug: "elixir", hex: "4B275F" },
  sobelow: { type: "si", slug: "elixir", hex: "4B275F" },
  "mix-release": { type: "si", slug: "elixir", hex: "4B275F" },
  gigalixir: { type: "si", slug: "elixir", hex: "4B275F" },

  // ─── API ───────────────────────────────────────────────────────────────────
  trpc: { type: "si", slug: "trpc", hex: "398CCB" },
  orpc: { type: "local", src: "/icon/orpc.svg", needsInvert: "dark" }, // black circle SVG
  "graphql-yoga": { type: "si", slug: "graphql", hex: "E10098" },

  // ─── Web Frontend ──────────────────────────────────────────────────────────
  "tanstack-router": { type: "local", src: "/icon/tanstack.png" },
  "tanstack-start": { type: "local", src: "/icon/tanstack.png" },
  "tanstack-query": { type: "local", src: "/icon/tanstack.png" },
  swr: { type: "si", slug: "vercel", hex: "000000" },
  "react-router": { type: "local", src: "/icon/react-router.svg" },
  next: { type: "si", slug: "nextdotjs", hex: "000000" },
  vinext: { type: "si", slug: "nextdotjs", hex: "000000" },
  nuxt: { type: "local", src: "/icon/nuxt-js.svg" },
  svelte: { type: "si", slug: "svelte", hex: "FF3E00" },
  solid: { type: "local", src: "/icon/solid.svg" },
  "solid-start": { type: "local", src: "/icon/solid.svg" },
  astro: { type: "local", src: "/icon/astro.svg" },
  qwik: { type: "si", slug: "qwik", hex: "AC7EF4" },
  angular: { type: "si", slug: "angular", hex: "DD0031" },
  redwood: { type: "si", slug: "redwoodjs", hex: "BF4722" },
  fresh: { type: "si", slug: "deno", hex: "000000" },

  // ─── Native Frontend (Expo) ────────────────────────────────────────────────
  "native-bare": { type: "si", slug: "expo", hex: "000020" },
  "native-uniwind": { type: "si", slug: "expo", hex: "000020" },
  "native-unistyles": { type: "si", slug: "expo", hex: "000020" },

  // ─── Astro Integration ─────────────────────────────────────────────────────
  react: { type: "si", slug: "react", hex: "61DAFB" },
  vue: { type: "si", slug: "vuedotjs", hex: "4FC08D" },
  // svelte, solid already covered above

  // ─── Runtime ───────────────────────────────────────────────────────────────
  bun: { type: "si", slug: "bun", hex: "FBF0DF" },
  node: { type: "si", slug: "nodedotjs", hex: "5FA04E" },
  workers: { type: "si", slug: "cloudflareworkers", hex: "F38020" },

  // ─── Backend ───────────────────────────────────────────────────────────────
  hono: { type: "local", src: "/icon/hono.svg" },
  elysia: { type: "local", src: "/icon/elysia.svg" },
  express: { type: "si", slug: "express", hex: "000000" },
  fastify: { type: "si", slug: "fastify", hex: "000000" },
  nestjs: { type: "si", slug: "nestjs", hex: "E0234E" },
  encore: { type: "local", src: "https://encore.dev/assets/branding/logo/logo.svg" },
  adonisjs: { type: "si", slug: "adonisjs", hex: "5A45FF" },
  nitro: { type: "local", src: "/icon/nitro.svg" },
  fets: { type: "local", src: "/icon/fets.svg" },
  convex: { type: "local", src: "/icon/convex.svg" },
  "self-next": { type: "si", slug: "nextdotjs", hex: "000000" },
  "self-tanstack-start": { type: "local", src: "/icon/tanstack.png" },
  "self-astro": { type: "local", src: "/icon/astro.svg" },
  "self-nuxt": { type: "local", src: "/icon/nuxt-js.svg" },
  "self-solid-start": { type: "local", src: "/icon/solid.svg" },

  // ─── Database ──────────────────────────────────────────────────────────────
  sqlite: { type: "si", slug: "sqlite", hex: "003B57" },
  postgres: { type: "si", slug: "postgresql", hex: "4169E1" },
  mysql: { type: "si", slug: "mysql", hex: "4479A1" },
  mongodb: { type: "si", slug: "mongodb", hex: "47A248" },
  edgedb: { type: "local", src: "/icon/edgedb.svg" },
  redis: { type: "si", slug: "redis", hex: "DC382D" },

  // ─── ORM ───────────────────────────────────────────────────────────────────
  drizzle: { type: "si", slug: "drizzle", hex: "C5F74F" },
  prisma: { type: "si", slug: "prisma", hex: "2D3748" },
  mongoose: { type: "si", slug: "mongoose", hex: "880000" },
  typeorm: { type: "si", slug: "typeorm", hex: "E83524" },
  kysely: { type: "local", src: "https://kysely.dev/img/logo.svg" },
  mikroorm: {
    type: "local",
    src: "https://raw.githubusercontent.com/mikro-orm/mikro-orm/master/docs/static/img/logo.svg",
  },
  sequelize: { type: "si", slug: "sequelize", hex: "52B0E7" },

  // ─── DB Setup ──────────────────────────────────────────────────────────────
  turso: { type: "si", slug: "turso", hex: "4FF8D2" },
  d1: { type: "si", slug: "cloudflareworkers", hex: "F38020" },
  neon: { type: "local", src: "/icon/neon.svg" },
  "prisma-postgres": { type: "si", slug: "prisma", hex: "2D3748" },
  "mongodb-atlas": { type: "si", slug: "mongodb", hex: "47A248" },
  supabase: { type: "si", slug: "supabase", hex: "3FCF8E" },
  planetscale: { type: "si", slug: "planetscale", hex: "000000" },
  upstash: { type: "si", slug: "upstash", hex: "00E9A3" },
  docker: { type: "si", slug: "docker", hex: "2496ED" },
  "docker-compose": { type: "si", slug: "docker", hex: "2496ED" },

  // ─── Deploy ────────────────────────────────────────────────────────────────
  cloudflare: { type: "si", slug: "cloudflareworkers", hex: "F38020" },
  fly: { type: "si", slug: "flydotio", hex: "8B5CF6" },
  railway: { type: "si", slug: "railway", hex: "0B0D0E" },
  render: { type: "si", slug: "render", hex: "46E3B7" },
  netlify: { type: "si", slug: "netlify", hex: "00C7B7" },
  sst: { type: "local", src: "/icon/sst.svg" },
  vercel: { type: "si", slug: "vercel", hex: "000000" },

  // ─── Auth ──────────────────────────────────────────────────────────────────
  "better-auth": { type: "local", src: "/icon/better-auth.svg" },
  "better-auth-organizations": { type: "local", src: "/icon/better-auth.svg" },
  clerk: { type: "si", slug: "clerk", hex: "6C47FF" },
  nextauth: { type: "local", src: "/icon/nextauth.png" },
  "stack-auth": { type: "local", src: "/icon/stack-auth.svg" },
  "supabase-auth": { type: "si", slug: "supabase", hex: "3FCF8E" },
  auth0: { type: "si", slug: "auth0", hex: "EB5424" },
  workos: {
    type: "local",
    src: "https://cdn.prod.website-files.com/621f54116cab10f6e9215d8b/621f549024eb2947f6f2f7f7_Favicon%20256x256.png",
  },
  kinde: { type: "local", src: "/icon/kinde.svg" },

  // ─── Rate Limiting ────────────────────────────────────────────────────────
  arcjet: { type: "local", src: "https://arcjet.com/favicon.png" },
  "upstash-ratelimit": { type: "si", slug: "upstash", hex: "00E9A3" },

  // ─── Payments ──────────────────────────────────────────────────────────────
  polar: { type: "local", src: "/icon/polar.svg" },
  stripe: { type: "si", slug: "stripe", hex: "635BFF" },
  "lemon-squeezy": { type: "si", slug: "lemonsqueezy", hex: "FFC233" },
  paddle: { type: "si", slug: "paddle", hex: "3D3D3D" },
  dodo: { type: "local", src: "/icon/dodo.svg" },

  // ─── Email ─────────────────────────────────────────────────────────────────
  resend: { type: "si", slug: "resend", hex: "000000" },
  "react-email": { type: "si", slug: "react", hex: "61DAFB" },
  nodemailer: { type: "si", slug: "nodedotjs", hex: "5FA04E" },
  postmark: { type: "local", src: "https://postmarkapp.com/images/logo-stamp-simple.svg" },
  sendgrid: { type: "local", src: "/icon/sendgrid.svg" },
  "aws-ses": { type: "local", src: "/icon/aws-ses.svg" },
  mailgun: { type: "si", slug: "mailgun", hex: "F06B66" },
  plunk: { type: "local", src: "/icon/plunk.svg" },

  // ─── File Upload ───────────────────────────────────────────────────────────
  uploadthing: { type: "local", src: "https://uploadthing.com/favicon.ico" },
  filepond: { type: "local", src: "/icon/filepond.svg" },
  uppy: { type: "local", src: "/icon/uppy.svg" },

  // ─── Observability ─────────────────────────────────────────────────────────
  sentry: { type: "si", slug: "sentry", hex: "362D59" },
  grafana: { type: "si", slug: "grafana", hex: "F46800" },
  opentelemetry: { type: "si", slug: "opentelemetry", hex: "000000" },
  datadog: { type: "si", slug: "datadog", hex: "632CA6" },
  axiom: { type: "local", src: "https://axiom.co/favicon.ico" },
  betterstack: { type: "si", slug: "betterstack", hex: "111827" },

  // ─── Feature Flags ─────────────────────────────────────────────────────────
  posthog: { type: "si", slug: "posthog", hex: "F54E00" },

  // ─── State Management ──────────────────────────────────────────────────────
  "redux-toolkit": { type: "si", slug: "redux", hex: "764ABC" },
  mobx: { type: "si", slug: "mobx", hex: "FF9955" },
  xstate: { type: "si", slug: "xstate", hex: "2C3E50" },

  // ─── Forms ─────────────────────────────────────────────────────────────────
  "react-hook-form": { type: "si", slug: "reacthookform", hex: "EC5990" },
  "tanstack-form": { type: "local", src: "/icon/tanstack.png" },

  // ─── Validation ────────────────────────────────────────────────────────────
  zod: { type: "si", slug: "zod", hex: "3E67B1" },

  // ─── CSS ───────────────────────────────────────────────────────────────────
  tailwind: { type: "si", slug: "tailwindcss", hex: "06B6D4" },
  scss: { type: "si", slug: "sass", hex: "CC6699" },
  less: { type: "si", slug: "less", hex: "1D365D" },
  "postcss-only": { type: "si", slug: "postcss", hex: "DD3A0A" },

  // ─── UI Library ────────────────────────────────────────────────────────────
  "shadcn-ui": { type: "si", slug: "shadcnui", hex: "000000" },
  "shadcn-svelte": { type: "si", slug: "shadcnui", hex: "000000" },
  daisyui: { type: "si", slug: "daisyui", hex: "1AD1A5" },
  "radix-ui": { type: "si", slug: "radixui", hex: "161618" },
  "headless-ui": { type: "si", slug: "headlessui", hex: "66E3FF" },
  "chakra-ui": { type: "si", slug: "chakraui", hex: "319795" },
  nextui: { type: "local", src: "/icon/nextui.svg", needsInvert: "dark" }, // stroke="currentColor"
  mantine: { type: "si", slug: "mantine", hex: "339AF0" },
  mui: { type: "si", slug: "mui", hex: "007FFF" },
  antd: { type: "si", slug: "antdesign", hex: "0170FE" },
  "base-ui": { type: "local", src: "/icon/base-ui.svg", needsInvert: "dark" },
  evlog: { type: "si", slug: "typescript", hex: "3178C6" },

  // ─── shadcn Base Libraries ───────────────────────────────────────────────────
  radix: { type: "si", slug: "radixui", hex: "161618" },
  base: { type: "local", src: "/icon/base-ui.svg", needsInvert: "dark" },

  // ─── shadcn Icon Libraries ─────────────────────────────────────────────────
  lucide: { type: "si", slug: "lucide", hex: "F56565" },
  tabler: { type: "local", src: "/icon/tabler.svg", needsInvert: "dark" },
  hugeicons: { type: "local", src: "/icon/hugeicons.svg" },
  phosphor: { type: "si", slug: "phosphoricons", hex: "C4F042" },
  remixicon: { type: "si", slug: "remix", hex: "000000" },
  "react-icons": { type: "si", slug: "react", hex: "61DAFB" },

  // ─── shadcn Fonts ──────────────────────────────────────────────────────────
  geist: { type: "si", slug: "vercel", hex: "000000" },
  "jetbrains-mono": { type: "si", slug: "jetbrains", hex: "000000" },
  "geist-mono": { type: "si", slug: "vercel", hex: "000000" },

  // ─── Package Manager ───────────────────────────────────────────────────────
  npm: { type: "si", slug: "npm", hex: "CB3837" },
  pnpm: { type: "si", slug: "pnpm", hex: "F69220" },
  // bun handled above

  // ─── Code Quality ──────────────────────────────────────────────────────────
  biome: { type: "si", slug: "biome", hex: "60A5FA" },
  oxlint: { type: "si", slug: "oxc", hex: "FF915C" },
  ultracite: { type: "local", src: "/icon/ultracite.svg", needsInvert: "dark" }, // currentColor

  // ─── Documentation ─────────────────────────────────────────────────────────
  starlight: { type: "local", src: "/icon/starlight.svg" },
  fumadocs: { type: "local", src: "/icon/fumadocs.svg" },

  // ─── App Platforms ─────────────────────────────────────────────────────────
  turborepo: { type: "si", slug: "turborepo", hex: "EF4444" },
  tauri: { type: "si", slug: "tauri", hex: "FFC131" },
  storybook: { type: "si", slug: "storybook", hex: "FF4785" },
  pwa: { type: "si", slug: "pwa", hex: "5A0FC8" },

  // ─── Git ───────────────────────────────────────────────────────────────────
  true: { type: "si", slug: "git", hex: "F05032" }, // git category id="true"

  // ─── AI ────────────────────────────────────────────────────────────────────
  "vercel-ai": { type: "si", slug: "vercel", hex: "000000" },
  mastra: { type: "local", src: "/icon/mastra.svg", needsInvert: "dark" }, // currentColor
  voltagent: { type: "local", src: "/icon/voltagent.svg", needsInvert: "dark" }, // currentColor
  langgraph: { type: "local", src: "/icon/langgraph.svg", needsInvert: "dark" }, // currentColor
  "openai-agents": { type: "local", src: "/icon/openai.svg", needsInvert: "dark" }, // black icon
  "google-adk": { type: "si", slug: "google", hex: "4285F4" },
  modelfusion: { type: "si", slug: "vercel", hex: "000000" },
  langchain: { type: "si", slug: "langchain", hex: "1C3C3C" },
  "ai-cli": { type: "si", slug: "vercel", hex: "000000" },

  // ─── Realtime ──────────────────────────────────────────────────────────────
  "socket-io": { type: "si", slug: "socketdotio", hex: "010101" },
  partykit: { type: "si", slug: "cloudflare", hex: "F38020" },
  ably: { type: "local", src: "/icon/ably.svg" },
  pusher: { type: "si", slug: "pusher", hex: "300D4F" },
  liveblocks: { type: "local", src: "/icon/liveblocks.svg", needsInvert: "dark" }, // currentColor

  // ─── Job Queue ─────────────────────────────────────────────────────────────
  bullmq: { type: "si", slug: "redis", hex: "DC382D" },
  "trigger-dev": { type: "local", src: "/icon/trigger-dev.svg" },
  inngest: { type: "local", src: "/icon/inngest.svg" },
  temporal: { type: "local", src: "/icon/temporal.svg" },

  // ─── Effect ────────────────────────────────────────────────────────────────
  effect: { type: "local", src: "/icon/effect.svg", needsInvert: "dark" }, // currentColor
  "effect-full": { type: "local", src: "/icon/effect.svg", needsInvert: "dark" },

  // ─── Caching ───────────────────────────────────────────────────────────────
  "upstash-redis": { type: "si", slug: "upstash", hex: "00E9A3" },

  // ─── i18n ─────────────────────────────────────────────────────────────────
  i18next: { type: "si", slug: "i18next", hex: "26A69A" },
  "next-intl": { type: "local", src: "/icon/next-intl.svg" },

  // ─── Search ────────────────────────────────────────────────────────────────
  meilisearch: { type: "si", slug: "meilisearch", hex: "FF5CAA" },
  typesense: { type: "local", src: "/icon/typesense.png" },
  elasticsearch: { type: "si", slug: "elasticsearch", hex: "005571" },
  algolia: { type: "si", slug: "algolia", hex: "003DFF" },

  // ─── File Storage ──────────────────────────────────────────────────────────
  s3: { type: "local", src: "/icon/aws-s3.svg" },
  r2: { type: "si", slug: "cloudflare", hex: "F38020" },
  cloudinary: { type: "si", slug: "cloudinary", hex: "3448C5" },

  // ─── Animation ─────────────────────────────────────────────────────────────
  "framer-motion": { type: "si", slug: "framer", hex: "0055FF" },
  gsap: { type: "si", slug: "greensock", hex: "88CE02" },
  "auto-animate": { type: "local", src: "/icon/auto-animate.svg" },
  lottie: { type: "si", slug: "airbnb", hex: "FF5A5F" },

  // ─── Testing ───────────────────────────────────────────────────────────────
  vitest: { type: "si", slug: "vitest", hex: "6E9F18" },
  "vitest-playwright": { type: "si", slug: "vitest", hex: "6E9F18" },
  jest: { type: "si", slug: "jest", hex: "C21325" },
  playwright: { type: "local", src: "/icon/playwright.svg" },
  cypress: { type: "si", slug: "cypress", hex: "69D3A7" },

  // ─── CMS ───────────────────────────────────────────────────────────────────
  payload: { type: "local", src: "/icon/payload.svg", needsInvert: "dark" }, // currentColor
  sanity: { type: "si", slug: "sanity", hex: "F03E2F" },
  strapi: { type: "si", slug: "strapi", hex: "4945FF" },
  tinacms: { type: "local", src: "/icon/tinacms.svg" },
  directus: { type: "si", slug: "directus", hex: "263238" },

  // ─── Rust ──────────────────────────────────────────────────────────────────
  axum: { type: "local", src: "/icon/axum.svg" },
  "actix-web": { type: "local", src: "/icon/actix.svg" },
  leptos: { type: "local", src: "/icon/leptos.svg" },
  dioxus: { type: "local", src: "/icon/dioxus.svg" },
  "sea-orm": { type: "local", src: "/icon/seaorm.svg" },
  tonic: { type: "local", src: "/icon/tonic.svg" },

  // ─── Python ────────────────────────────────────────────────────────────────
  fastapi: { type: "si", slug: "fastapi", hex: "009688" },
  django: { type: "si", slug: "django", hex: "092E20" },
  flask: { type: "si", slug: "flask", hex: "000000" },
  litestar: { type: "local", src: "/icon/litestar.svg" },
  pydantic: { type: "si", slug: "pydantic", hex: "E92063" },
  "openai-sdk": { type: "local", src: "/icon/openai.svg", needsInvert: "dark" },
  "anthropic-sdk": { type: "si", slug: "anthropic", hex: "191919" },
  haystack: { type: "si", slug: "python", hex: "3776AB" },
  authlib: { type: "si", slug: "auth0", hex: "EB5424" },
  jwt: { type: "si", slug: "jsonwebtokens", hex: "000000" },
  "django-rest-framework": { type: "si", slug: "django", hex: "092E20" },
  "django-ninja": { type: "si", slug: "django", hex: "092E20" },
  celery: { type: "si", slug: "celery", hex: "37814A" },
  rq: { type: "si", slug: "redis", hex: "DC382D" },
  dramatiq: { type: "si", slug: "python", hex: "3776AB" },
  huey: { type: "si", slug: "redis", hex: "DC382D" },
  strawberry: { type: "si", slug: "graphql", hex: "E10098" },
  ariadne: { type: "si", slug: "graphql", hex: "E10098" },
  ruff: { type: "si", slug: "ruff", hex: "D7FF64" },
  mypy: { type: "si", slug: "python", hex: "3776AB" },

  // ─── Go ────────────────────────────────────────────────────────────────────
  gin: { type: "si", slug: "gin", hex: "00ADD8" },
  echo: { type: "si", slug: "go", hex: "00ADD8" },
  fiber: { type: "si", slug: "go", hex: "00ADD8" },
  chi: { type: "si", slug: "go", hex: "00ADD8" },
  "grpc-go": { type: "local", src: "/icon/grpc.svg" },
  "urfave-cli": { type: "si", slug: "go", hex: "00ADD8" },
  logrus: { type: "si", slug: "go", hex: "00ADD8" },

  // ─── Java ──────────────────────────────────────────────────────────────────
  "spring-boot": { type: "si", slug: "springboot", hex: "6DB33F" },
  quarkus: { type: "si", slug: "quarkus", hex: "4695EB" },
  maven: { type: "si", slug: "apachemaven", hex: "C71A36" },
  gradle: { type: "si", slug: "gradle", hex: "02303A" },
  "spring-data-jpa": { type: "si", slug: "hibernate", hex: "59666C" },
  "spring-security": { type: "local", src: "/icon/spring-security.svg" },
  "spring-actuator": { type: "si", slug: "spring", hex: "6DB33F" },
  "spring-validation": { type: "si", slug: "spring", hex: "6DB33F" },
  flyway: { type: "si", slug: "flyway", hex: "CC0200" },
  liquibase: { type: "si", slug: "liquibase", hex: "2962FF" },
  "springdoc-openapi": { type: "si", slug: "swagger", hex: "85EA2D" },
  lombok: { type: "local", src: "https://projectlombok.org/favicon.ico" },
  mapstruct: { type: "local", src: "https://mapstruct.org/images/mapstruct.png" },
  caffeine: {
    type: "local",
    src: "https://raw.githubusercontent.com/ben-manes/caffeine/master/wiki/logo.png",
  },
  resilience4j: { type: "si", slug: "spring", hex: "6DB33F" },
  "spring-webflux": { type: "si", slug: "spring", hex: "6DB33F" },
  "spring-batch": { type: "si", slug: "spring", hex: "6DB33F" },
  "spring-kafka": { type: "si", slug: "apachekafka", hex: "231F20" },
  "spring-mail": { type: "si", slug: "spring", hex: "6DB33F" },
  "spring-devtools": { type: "si", slug: "springboot", hex: "6DB33F" },
  "micrometer-prometheus": { type: "si", slug: "prometheus", hex: "E6522C" },
  thymeleaf: { type: "si", slug: "thymeleaf", hex: "005F0F" },
  junit5: { type: "si", slug: "junit5", hex: "25A162" },
  assertj: { type: "local", src: "https://assertj.github.io/doc/images/favicon.png" },
  "rest-assured": { type: "local", src: "https://rest-assured.io/img/logo-transparent.png" },
  wiremock: { type: "local", src: "https://wiremock.org/images/favicon.svg" },
  awaitility: {
    type: "local",
    src: "https://raw.githubusercontent.com/awaitility/awaitility/master/resources/Awaitility_logo_red_small.png",
  },
  archunit: { type: "local", src: "https://www.archunit.org/assets/ArchUnit-Logo.png" },
  jqwik: { type: "local", src: "https://jqwik.net/assets/images/favicon.ico" },
};
