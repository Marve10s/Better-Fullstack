export type StarterTrack = {
  id: string;
  name: string;
  intent: string;
  description: string;
  presetId: string;
  ecosystem: "typescript" | "rust" | "python" | "go" | "java";
  icon: string;
  guideHref: string;
  docsHref: string;
  highlights: string[];
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
    guideHref: "/guides/typescript/nextjs-drizzle-better-auth/",
    docsHref: "/docs/deployment/vercel/",
    highlights: ["Next.js", "Better Auth", "Stripe", "Drizzle"],
  },
  {
    id: "ai-agent-app",
    name: "AI Agent App",
    intent: "Build with agents",
    description: "A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs.",
    presetId: "ai-cli-agent-workbench",
    ecosystem: "typescript",
    icon: "ai-cli",
    guideHref: "/guides/ai/nextjs-ai-cli-agent-workbench/",
    docsHref: "/docs/ai/overview/",
    highlights: ["Next.js", "AI CLI", "MCP", "Skills"],
  },
  {
    id: "rest-api",
    name: "REST API",
    intent: "Expose a service",
    description: "FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout.",
    presetId: "python-fastapi",
    ecosystem: "python",
    icon: "fastapi",
    guideHref: "/guides/python/fastapi-postgres-sqlalchemy/",
    docsHref: "/docs/deployment/docker/",
    highlights: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic"],
  },
  {
    id: "java-api",
    name: "Java API",
    intent: "Ship Spring services",
    description: "Spring Boot with security, JPA, migrations, and test coverage for backend teams.",
    presetId: "java-secure",
    ecosystem: "java",
    icon: "java",
    guideHref: "/guides/java/spring-security-api/",
    docsHref: "/docs/ecosystems/java/",
    highlights: ["Spring Boot", "Security", "JPA", "Testcontainers"],
  },
  {
    id: "rust-backend",
    name: "Rust Backend",
    intent: "Prefer systems-grade APIs",
    description: "Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks.",
    presetId: "rust-api",
    ecosystem: "rust",
    icon: "rust",
    guideHref: "/guides/rust/axum-postgres-seaorm/",
    docsHref: "/docs/ecosystems/rust/",
    highlights: ["Axum", "SeaORM", "PostgreSQL", "Tracing"],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    intent: "Start native",
    description: "Expo with Uniwind for a native-first app shell before backend services are needed.",
    presetId: "uniwind",
    ecosystem: "typescript",
    icon: "native-uniwind",
    guideHref: "/guides/typescript/expo-uniwind-native/",
    docsHref: "/docs/ecosystems/typescript/",
    highlights: ["Expo", "Uniwind", "React Native", "Mobile"],
  },
  {
    id: "internal-tool",
    name: "Internal Tool",
    intent: "Move fast with CRUD",
    description: "TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools.",
    presetId: "tanstack-hono",
    ecosystem: "typescript",
    icon: "hono",
    guideHref: "/guides/typescript/hono-trpc-drizzle/",
    docsHref: "/docs/deployment/docker/",
    highlights: ["TanStack Router", "Hono", "Drizzle", "tRPC"],
  },
] as const satisfies readonly StarterTrack[];

export function getStarterTrackBuilderSearch(track: StarterTrack) {
  return {
    preset: track.presetId,
    view: "command" as const,
    file: "",
  };
}

export function getStarterTracksForEcosystem(ecosystem: string) {
  return STARTER_TRACKS.filter((track) => track.ecosystem === ecosystem);
}
