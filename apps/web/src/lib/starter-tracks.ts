export type StarterTrack = {
  id:
    | "saas-app"
    | "ai-agent-app"
    | "rest-api"
    | "java-api"
    | "rust-backend"
    | "mobile-app"
    | "internal-tool";
  name: string;
  intent: string;
  description: string;
  presetId: string;
  ecosystem: "typescript" | "rust" | "python" | "go" | "java";
  icon: string;
  guideHref: string;
  docsHref: string;
  highlights: string[];
  audience: string;
  outcome: string;
  ctaLabel: string;
};

export const STARTER_TRACKS = [
  {
    id: "saas-app",
    name: "SaaS App",
    intent: "Sell subscriptions",
    description: "Next.js with auth, relational data, payments, email, and a deployment-ready app shape.",
    presetId: "nextjs-saas",
    ecosystem: "typescript",
    icon: "stripe",
    guideHref: "/guides/packs/create-saas-app/",
    docsHref: "/docs/sections/deployment/",
    highlights: ["Next.js", "Better Auth", "Stripe", "Drizzle"],
    audience: "Founders validating paid products",
    outcome: "Billing, auth, email, and data wired into one app",
    ctaLabel: "Start SaaS",
  },
  {
    id: "ai-agent-app",
    name: "AI Agent App",
    intent: "Build with agents",
    description: "A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs.",
    presetId: "ai-cli-agent-workbench",
    ecosystem: "typescript",
    icon: "ai-cli",
    guideHref: "/guides/packs/create-ai-agent-app/",
    docsHref: "/docs/ai/overview/",
    highlights: ["Next.js", "AI CLI", "MCP", "Skills"],
    audience: "Teams building agent-assisted products",
    outcome: "AI docs, MCP, skills, and CLI workflow ready from day one",
    ctaLabel: "Start AI",
  },
  {
    id: "rest-api",
    name: "REST API",
    intent: "Expose a service",
    description: "FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout.",
    presetId: "python-fastapi",
    ecosystem: "python",
    icon: "fastapi",
    guideHref: "/guides/packs/create-rest-api/",
    docsHref: "/docs/sections/deployment/",
    highlights: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic"],
    audience: "Backend teams exposing typed services",
    outcome: "FastAPI service with validation, persistence, and Ruff quality checks",
    ctaLabel: "Start API",
  },
  {
    id: "java-api",
    name: "Java API",
    intent: "Ship Spring services",
    description: "Spring Boot with security, JPA, migrations, and test coverage for backend teams.",
    presetId: "java-secure",
    ecosystem: "java",
    icon: "java",
    guideHref: "/guides/packs/create-java-api/",
    docsHref: "/docs/ecosystems/java/",
    highlights: ["Spring Boot", "Security", "JPA", "Testcontainers"],
    audience: "Java teams shipping secure APIs",
    outcome: "Spring Security, JPA, migrations, and test coverage scaffolded",
    ctaLabel: "Start Java",
  },
  {
    id: "rust-backend",
    name: "Rust Backend",
    intent: "Prefer systems-grade APIs",
    description: "Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks.",
    presetId: "rust-api",
    ecosystem: "rust",
    icon: "rust",
    guideHref: "/guides/packs/create-rust-backend/",
    docsHref: "/docs/ecosystems/rust/",
    highlights: ["Axum", "SeaORM", "PostgreSQL", "Tracing"],
    audience: "Systems-minded backend developers",
    outcome: "Axum service with typed persistence and clean compiler checks",
    ctaLabel: "Start Rust",
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    intent: "Start native",
    description: "Expo with Uniwind for a native-first app shell before backend services are needed.",
    presetId: "uniwind",
    ecosystem: "typescript",
    icon: "native-uniwind",
    guideHref: "/guides/packs/create-mobile-app/",
    docsHref: "/docs/ecosystems/typescript/",
    highlights: ["Expo", "Uniwind", "React Native", "Mobile"],
    audience: "Product teams starting native first",
    outcome: "Expo app shell with Uniwind styling and mobile defaults",
    ctaLabel: "Start mobile",
  },
  {
    id: "internal-tool",
    name: "Internal Tool",
    intent: "Move fast with CRUD",
    description: "TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools.",
    presetId: "tanstack-hono",
    ecosystem: "typescript",
    icon: "hono",
    guideHref: "/guides/packs/create-internal-tool/",
    docsHref: "/docs/sections/deployment/",
    highlights: ["TanStack Router", "Hono", "Drizzle", "tRPC"],
    audience: "Teams building dashboards and admin tools",
    outcome: "Frontend, API, auth, and data layer ready for CRUD workflows",
    ctaLabel: "Start tool",
  },
] as const satisfies readonly StarterTrack[];

export function getStarterTrackBuilderSearch(track: StarterTrack) {
  return {
    preset: track.presetId,
    view: "command" as const,
  };
}

export function getStarterTracksForEcosystem(ecosystem: string) {
  return STARTER_TRACKS.filter((track) => track.ecosystem === ecosystem);
}

export function getStarterTrackById(id: string) {
  return STARTER_TRACKS.find((track) => track.id === id);
}
