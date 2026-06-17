/**
 * Nx config generator for workspace-level task orchestration.
 */

import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

interface NxTargetDefaults {
  dependsOn?: string[];
  inputs?: string[];
  outputs?: string[];
  cache?: boolean;
}

interface NxConfig {
  $schema: string;
  namedInputs: Record<string, string[]>;
  targetDefaults: Record<string, NxTargetDefaults>;
}

export function processNxConfig(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.addons.includes("nx")) return;

  const nxConfig = generateNxConfig(config);
  vfs.writeFile("nx.json", JSON.stringify(nxConfig, null, "\t"));
}

function generateNxConfig(config: ProjectConfig): NxConfig {
  const { backend, database, orm, dbSetup, serverDeploy, webDeploy, frontend } = config;
  const isConvex = backend === "convex";
  const hasDatabase = database !== "none" && orm !== "none";
  const isDocker = dbSetup === "docker";
  const isSqliteLocal = database === "sqlite" && dbSetup !== "d1";
  const hasCloudflare = serverDeploy === "cloudflare" || webDeploy === "cloudflare";

  return {
    $schema: "./node_modules/nx/schemas/nx-schema.json",
    namedInputs: {
      default: ["{projectRoot}/**/*", "sharedGlobals"],
      production: ["default", "!{projectRoot}/**/*.spec.ts", "!{projectRoot}/**/*.test.ts"],
      sharedGlobals: ["{workspaceRoot}/.env*"],
    },
    targetDefaults: {
      ...getBaseTargetDefaults(frontend),
      ...(isConvex ? getConvexTargetDefaults() : {}),
      ...(!isConvex && hasDatabase ? getDatabaseTargetDefaults() : {}),
      ...(isDocker ? getDockerTargetDefaults() : {}),
      ...(isSqliteLocal ? getSqliteLocalTargetDefaults() : {}),
      ...(hasCloudflare ? getDeployTargetDefaults() : {}),
    },
  };
}

function getBaseTargetDefaults(frontend: string[]): Record<string, NxTargetDefaults> {
  const outputs = ["{projectRoot}/dist"];

  if (frontend.includes("next")) outputs.push("{projectRoot}/.next");
  if (frontend.includes("nuxt")) outputs.push("{projectRoot}/.nuxt", "{projectRoot}/.output");
  if (frontend.includes("svelte")) outputs.push("{projectRoot}/.svelte-kit", "{projectRoot}/build");

  return {
    build: {
      dependsOn: ["^build"],
      inputs: ["production", "^production"],
      outputs,
    },
    lint: {
      dependsOn: ["^lint"],
    },
    "check-types": {
      dependsOn: ["^check-types"],
    },
    dev: {
      cache: false,
    },
  };
}

function getConvexTargetDefaults(): Record<string, NxTargetDefaults> {
  return {
    "dev:setup": {
      cache: false,
    },
  };
}

function getDatabaseTargetDefaults(): Record<string, NxTargetDefaults> {
  return {
    "db:push": { cache: false },
    "db:studio": { cache: false },
    "db:migrate": { cache: false },
    "db:generate": { cache: false },
  };
}

function getDockerTargetDefaults(): Record<string, NxTargetDefaults> {
  return {
    "db:start": { cache: false },
    "db:stop": { cache: false },
    "db:watch": { cache: false },
    "db:down": { cache: false },
  };
}

function getSqliteLocalTargetDefaults(): Record<string, NxTargetDefaults> {
  return {
    "db:local": { cache: false },
  };
}

function getDeployTargetDefaults(): Record<string, NxTargetDefaults> {
  return {
    deploy: { cache: false },
    destroy: { cache: false },
  };
}
