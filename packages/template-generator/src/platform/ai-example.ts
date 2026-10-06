import type { ProjectConfig } from "@better-fullstack/types";

// Auth options whose generated server code can look up the current user, so the AI example
// endpoint rejects signed-out callers. WorkOS and Kinde generate no lookup usable there.
const AI_ROUTE_AUTH = new Set<ProjectConfig["auth"]>([
  "better-auth",
  "better-auth-organizations",
  "clerk",
  "nextauth",
  "stack-auth",
  "supabase-auth",
  "auth0",
  "passport",
]);

const AI_ENDPOINT_SERVERS = new Set<ProjectConfig["backend"]>([
  "hono",
  "express",
  "fastify",
  "elysia",
  "fets",
  "nestjs",
  "nitro",
  "adonisjs",
  "convex",
]);

export function hasAiRouteAuth(auth: ProjectConfig["auth"]): boolean {
  return AI_ROUTE_AUTH.has(auth);
}

export function hasAiExampleEndpoint(
  config: Pick<ProjectConfig, "backend" | "frontend" | "examples">,
): boolean {
  if (!config.examples.includes("ai")) return false;
  if (config.backend === "self") {
    return config.frontend.includes("next") || config.frontend.includes("tanstack-start");
  }
  return AI_ENDPOINT_SERVERS.has(config.backend);
}
