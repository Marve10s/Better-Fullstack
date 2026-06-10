import type { ProjectConfig, StackPart, StackPartRole } from "../types";

import { formatStackPartSpec } from "../types";

type EffectiveStack = Record<string, string>;

const FRONTEND_LABELS: Record<string, string> = {
  next: "Next.js web app",
  astro: "Astro web app",
  "react-vite": "React + Vite app",
  "react-router": "React Router app",
  "tanstack-router": "TanStack Router app",
  "tanstack-start": "TanStack Start app",
  nuxt: "Nuxt app",
  svelte: "SvelteKit app",
  solid: "Solid app",
  "solid-start": "SolidStart app",
  qwik: "Qwik app",
  angular: "Angular app",
  redwood: "RedwoodJS app",
  fresh: "Fresh app",
};

const BACKEND_LABELS: Record<string, string> = {
  "rust:axum": "Rust Axum API",
  "rust:actix-web": "Rust Actix Web API",
  "rust:rocket": "Rust Rocket API",
  "rust:warp": "Rust Warp API",
  "rust:poem": "Rust Poem API",
  "rust:salvo": "Rust Salvo API",
  "python:fastapi": "Python FastAPI API",
  "python:django": "Python Django API",
  "python:flask": "Python Flask API",
  "python:litestar": "Python Litestar API",
  "go:gin": "Go Gin API",
  "go:echo": "Go Echo API",
  "go:fiber": "Go Fiber API",
  "go:chi": "Go Chi API",
  "java:spring-boot": "Java Spring Boot API",
  "java:quarkus": "Java Quarkus API",
  "elixir:phoenix": "Elixir Phoenix API",
  "elixir:phoenix-live-view": "Elixir Phoenix LiveView API",
};

const TOOL_LABELS: Record<string, string> = {
  postgres: "Postgres",
  sqlite: "SQLite",
  mysql: "MySQL",
  mongodb: "MongoDB",
  redis: "Redis",
  edgedb: "EdgeDB",
  gorm: "GORM",
  sqlc: "sqlc",
  ent: "Ent",
  "ecto-sql": "Ecto SQL",
  ecto: "Ecto",
  sqlx: "SQLx",
  "sea-orm": "SeaORM",
  sqlalchemy: "SQLAlchemy",
  sqlmodel: "SQLModel",
  "django-orm": "Django ORM",
  "spring-data-jpa": "Spring Data JPA",
};

function getSelectedGraphParts(config: Pick<ProjectConfig, "stackParts">): StackPart[] {
  return (config.stackParts ?? []).filter((part) => part.source !== "provided");
}

export function getGraphPart(
  config: Pick<ProjectConfig, "stackParts">,
  role: StackPartRole,
  ecosystem?: string,
) {
  return getSelectedGraphParts(config).find(
    (part) => part.role === role && (!ecosystem || part.ecosystem === ecosystem),
  );
}

export function hasGraphPart(
  config: Pick<ProjectConfig, "stackParts">,
  role: StackPartRole,
  ecosystem?: string,
) {
  return Boolean(getGraphPart(config, role, ecosystem));
}

export function getPrimaryGraphPart(
  config: Pick<ProjectConfig, "stackParts">,
  role: "frontend" | "backend" | "mobile" | "database",
  ecosystem?: string,
) {
  return getSelectedGraphParts(config).find(
    (part) =>
      part.role === role &&
      !part.ownerPartId &&
      (!ecosystem || part.ecosystem === ecosystem),
  );
}

export function getGraphBackendUrl(config: Pick<ProjectConfig, "stackParts">): string | null {
  const backendPart = getPrimaryGraphPart(config, "backend");

  switch (backendPart?.ecosystem) {
    case "elixir":
      return "http://localhost:4000";
    case "rust":
      return "http://localhost:3000";
    case "python":
      return "http://localhost:8000";
    case "go":
    case "java":
      return "http://localhost:8080";
    default:
      return null;
  }
}

export function getEffectiveStack(config: Pick<ProjectConfig, "stackParts">): EffectiveStack {
  const effectiveStack: EffectiveStack = {};
  const parts = getSelectedGraphParts(config);

  for (const part of parts) {
    const key = part.ownerPartId ? `backend.${part.role}` : part.role;
    effectiveStack[key] = `${part.ecosystem}:${part.toolId}`;
  }

  return effectiveStack;
}

function labelFor(part: StackPart | undefined) {
  if (!part) return null;
  if (part.role === "frontend" && part.ecosystem === "typescript") {
    return FRONTEND_LABELS[part.toolId] ?? `${part.toolId} web app`;
  }
  if (part.role === "backend") {
    return BACKEND_LABELS[`${part.ecosystem}:${part.toolId}`] ?? `${part.ecosystem} ${part.toolId} API`;
  }
  return TOOL_LABELS[part.toolId] ?? part.toolId;
}

export function getGraphSummary(config: Pick<ProjectConfig, "stackParts">): string | null {
  const selectedParts = getSelectedGraphParts(config);
  if (selectedParts.length === 0) return null;

  const frontend = getPrimaryGraphPart(config, "frontend");
  const backend = getPrimaryGraphPart(config, "backend");
  const database = getPrimaryGraphPart(config, "database");
  const orm = selectedParts.find((part) => part.role === "orm");

  const segments = [labelFor(frontend), labelFor(backend)].filter(Boolean) as string[];
  const databaseLabel =
    backend?.ecosystem === "java" && orm?.toolId === "spring-data-jpa"
      ? "H2 dev database"
      : labelFor(database);
  const dataLabel = [labelFor(orm), databaseLabel].filter(Boolean).join("/");
  if (dataLabel) segments.push(dataLabel);

  return segments.length > 0
    ? segments.join(" + ")
    : selectedParts.map((part) => formatStackPartSpec(part, selectedParts)).join(" + ");
}

export function getGraphBackendDeployInstructions(config: ProjectConfig): string {
  const backend = getPrimaryGraphPart(config, "backend");
  if (!backend || config.serverDeploy === "none") return "";

  const targetPath = backend.targetPath ?? "apps/server";
  const backendLabel = labelFor(backend) ?? `${backend.ecosystem}:${backend.toolId}`;

  switch (config.serverDeploy) {
    case "railway":
      return [
        "Server deployment with Railway:",
        `* Backend: ${backendLabel}`,
        `* Config: ${targetPath}/railway.toml`,
        `* Deploy: cd ${targetPath} && railway up`,
      ].join("\n");
    case "docker":
      return [
        "Server deployment with Docker:",
        `* Backend: ${backendLabel}`,
        `* Build: cd ${targetPath} && docker build -t better-fullstack-server .`,
      ].join("\n");
    case "fly":
      return [
        "Server deployment with Fly:",
        `* Backend: ${backendLabel}`,
        `* Deploy: cd ${targetPath} && fly launch`,
      ].join("\n");
    case "vercel":
      return [
        "Server deployment with Vercel:",
        `* Backend: ${backendLabel}`,
        `* Deploy from: ${targetPath}`,
      ].join("\n");
    case "cloudflare":
    case "sst":
      return [
        `Server deployment with ${config.serverDeploy}:`,
        `* Backend: ${backendLabel}`,
        `* Review generated files in ${targetPath}`,
      ].join("\n");
    default:
      return "";
  }
}
