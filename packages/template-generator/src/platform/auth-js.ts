import type { ProjectConfig } from "@better-fullstack/types";

const AUTH_JS_CREDENTIAL_ORMS = new Set<ProjectConfig["orm"]>(["drizzle", "prisma"]);
const AUTH_JS_CREDENTIAL_DATABASES = new Set<ProjectConfig["database"]>([
  "sqlite",
  "postgres",
  "mysql",
]);

// Email and password sign-in needs a users table with a password hash, which the
// Auth.js schema templates provide only for these ORM and database pairs.
export function hasAuthJsCredentials(config: Pick<ProjectConfig, "orm" | "database">): boolean {
  return (
    AUTH_JS_CREDENTIAL_ORMS.has(config.orm) && AUTH_JS_CREDENTIAL_DATABASES.has(config.database)
  );
}
