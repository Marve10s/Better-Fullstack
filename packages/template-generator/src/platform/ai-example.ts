import type { ProjectConfig } from "@better-fullstack/types";

type Auth = ProjectConfig["auth"];

const BETTER_AUTH: Auth[] = ["better-auth", "better-auth-organizations"];

// Auth options whose session the generated AI endpoint looks up before calling the model provider,
// by the server that hosts the endpoint. WorkOS and Kinde generate no lookup usable there, and the
// standalone servers generate a session lookup only for Better Auth, plus Passport on Express.
const NEXT_ROUTE_AUTH = new Set<Auth>([
  ...BETTER_AUTH,
  "clerk",
  "nextauth",
  "stack-auth",
  "supabase-auth",
  "auth0",
]);
const TANSTACK_START_ROUTE_AUTH = new Set<Auth>([...BETTER_AUTH, "clerk", "supabase-auth"]);
const CONVEX_AUTH = new Set<Auth>([...BETTER_AUTH, "clerk"]);
const EXPRESS_AUTH = new Set<Auth>([...BETTER_AUTH, "passport"]);
const SERVER_AUTH = new Set<Auth>(BETTER_AUTH);
const NO_AUTH = new Set<Auth>();

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

type AiEndpointConfig = Pick<ProjectConfig, "backend" | "frontend">;

function aiRouteAuthOptions({ backend, frontend }: AiEndpointConfig) {
  if (backend === "self") {
    if (frontend.includes("next")) return NEXT_ROUTE_AUTH;
    return frontend.includes("tanstack-start") ? TANSTACK_START_ROUTE_AUTH : NO_AUTH;
  }
  if (backend === "convex") return CONVEX_AUTH;
  if (backend === "express") return EXPRESS_AUTH;
  return AI_ENDPOINT_SERVERS.has(backend) ? SERVER_AUTH : NO_AUTH;
}

/** Whether the generated AI endpoint rejects signed-out callers for this auth and server. */
export function hasAiRouteAuth(config: AiEndpointConfig & Pick<ProjectConfig, "auth">): boolean {
  return aiRouteAuthOptions(config).has(config.auth);
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
