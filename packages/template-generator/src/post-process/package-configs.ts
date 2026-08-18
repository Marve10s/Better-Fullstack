/**
 * Package.json configuration post-processor
 * Updates package names, scripts, and workspaces after template generation
 */

import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { getGraphBackendConnection, getGraphBackendConnections } from "../utils/graph-backend";
import { getServerPackagePath } from "../utils/project-paths";

type PackageJson = {
  name?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  workspaces?: string[] | { packages?: string[]; catalog?: Record<string, string> };
  overrides?: Record<string, string>;
  resolutions?: Record<string, string>;
  pnpm?: {
    overrides?: Record<string, string>;
    [key: string]: unknown;
  };
  packageManager?: string;
  [key: string]: unknown;
};

type PackageManagerConfig = {
  dev: string;
  build: string;
  checkTypes: string;
  filter: (workspace: string, script: string) => string;
};

type WorkspaceTool = "turbo" | "nx" | "vite-plus" | null;

const VITE_PLUS_BUNDLED_VITEST_VERSION = "4.1.10";

const VIRTUAL_PACKAGE_MANAGER_VERSIONS: Record<ProjectConfig["packageManager"], string> = {
  npm: "10.9.2",
  pnpm: "10.17.1",
  bun: "1.3.5",
  yarn: "4.12.0",
};

const BETTER_AUTH_KYSELY_OVERRIDE = "0.28.17";

const TSDOWN_VITEJS_DEVTOOLS_OVERRIDE = "0.4.1";

/**
 * Update all package.json files with proper names, scripts, and workspaces
 */
export function processPackageConfigs(vfs: VirtualFileSystem, config: ProjectConfig): void {
  updateRootPackageJson(vfs, config);
  applyVitePlusWorkspaceScripts(vfs, config);
  updateConfigPackageJson(vfs, config);
  updateEnvPackageJson(vfs, config);
  updateInfraPackageJson(vfs, config);

  if (config.backend === "convex") {
    updateConvexPackageJson(vfs, config);
  } else if (config.backend !== "none") {
    updateDbPackageJson(vfs, config);
    updateAuthPackageJson(vfs, config);
    updateApiPackageJson(vfs, config);
  }
}

function updateRootPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("package.json");
  if (!pkgJson) return;

  pkgJson.name = config.projectName;
  pkgJson.scripts = pkgJson.scripts || {};

  // Ensure workspaces is an array
  let workspaces: string[] = [];
  let workspaceCatalog: Record<string, string> | undefined;
  if (Array.isArray(pkgJson.workspaces)) {
    workspaces = pkgJson.workspaces;
  } else if (
    pkgJson.workspaces &&
    typeof pkgJson.workspaces === "object" &&
    pkgJson.workspaces.packages
  ) {
    workspaces = pkgJson.workspaces.packages;
    workspaceCatalog = pkgJson.workspaces.catalog;
  }

  const scripts = pkgJson.scripts;
  const { projectName, packageManager, backend, database, orm, dbSetup, serverDeploy, addons } =
    config;

  const backendPackageName = backend === "convex" ? `@${projectName}/backend` : "server";
  const dbPackageName = `@${projectName}/db`;
  const workspaceTool = getWorkspaceTool(addons);

  const needsDbScripts =
    backend !== "convex" && database !== "none" && orm !== "none" && orm !== "mongoose";
  const isD1Alchemy = dbSetup === "d1" && serverDeploy === "cloudflare";

  const pmConfig = getPackageManagerConfig(packageManager, workspaceTool);
  const graphBackend = getGraphBackendConnection(config);
  const graphBackends = getGraphBackendConnections(config);
  const hasWebWorkspace = vfs.fileExists("apps/web/package.json");
  const hasNativeWorkspace = vfs.fileExists("apps/native/package.json");
  const hasDocsWorkspace = vfs.fileExists("apps/docs/package.json");

  if (graphBackend && hasWebWorkspace) {
    scripts.dev = pmConfig.filter("web", "dev");
  } else if (graphBackend && !hasNativeWorkspace) {
    scripts.dev = graphBackend.devCommand;
  } else {
    scripts.dev = pmConfig.dev;
  }
  scripts.build = pmConfig.build;
  scripts["check-types"] = pmConfig.checkTypes;

  if (hasWebWorkspace) {
    scripts["dev:web"] = pmConfig.filter("web", "dev");
  } else {
    delete scripts["dev:web"];
  }

  if (hasNativeWorkspace) {
    scripts["dev:native"] = pmConfig.filter("native", "dev");
  } else {
    delete scripts["dev:native"];
  }

  if (hasDocsWorkspace) {
    scripts["dev:docs"] = pmConfig.filter("docs", "dev");
    scripts["build:docs"] = pmConfig.filter("docs", "build");
    scripts["check:docs"] = pmConfig.filter("docs", "check-types");
  } else {
    delete scripts["dev:docs"];
    delete scripts["build:docs"];
    delete scripts["check:docs"];
  }

  if (graphBackend) {
    scripts["dev:server"] = graphBackend.devCommand;
    if (graphBackend.setupCommand) {
      scripts["setup:server"] = graphBackend.setupCommand;
    }
    if (graphBackend.checkCommand) {
      scripts["check:server"] = graphBackend.checkCommand;
    }
    if (graphBackend.testCommand) {
      scripts["test:server"] = graphBackend.testCommand;
    }
  } else if (backend !== "self" && backend !== "none") {
    scripts["dev:server"] = pmConfig.filter(backendPackageName, "dev");
  }

  for (const service of graphBackends) {
    const scriptId = service.partId.replace(/[^a-zA-Z0-9_-]+/g, "-");
    scripts[`dev:${scriptId}`] = service.devCommand;
    if (service.setupCommand) scripts[`setup:${scriptId}`] = service.setupCommand;
    if (service.checkCommand) scripts[`check:${scriptId}`] = service.checkCommand;
    if (service.testCommand) scripts[`test:${scriptId}`] = service.testCommand;
  }

  if (backend === "convex") {
    scripts["dev:setup"] = pmConfig.filter(backendPackageName, "dev:setup");
  }

  if (needsDbScripts) {
    scripts["db:push"] = pmConfig.filter(dbPackageName, "db:push");

    if (!isD1Alchemy) {
      scripts["db:studio"] = pmConfig.filter(dbPackageName, "db:studio");
    }

    if (orm === "prisma") {
      scripts["db:generate"] = pmConfig.filter(dbPackageName, "db:generate");
      scripts["db:migrate"] = pmConfig.filter(dbPackageName, "db:migrate");
    } else if (orm === "drizzle") {
      scripts["db:generate"] = pmConfig.filter(dbPackageName, "db:generate");
      if (!isD1Alchemy) {
        scripts["db:migrate"] = pmConfig.filter(dbPackageName, "db:migrate");
      }
    }
  }

  if (database === "sqlite" && dbSetup !== "d1") {
    scripts["db:local"] = pmConfig.filter(dbPackageName, "db:local");
  }

  if (config.ai === "ai-cli") {
    scripts["ai:text"] = "ai text";
    scripts["ai:image"] = "ai image";
    scripts["ai:video"] = "ai video";
    scripts["ai:models"] = "ai models";
    scripts["ai:completions"] = "ai completions";
  }

  if (dbSetup === "docker") {
    scripts["db:start"] = pmConfig.filter(dbPackageName, "db:start");
    scripts["db:watch"] = pmConfig.filter(dbPackageName, "db:watch");
    scripts["db:stop"] = pmConfig.filter(dbPackageName, "db:stop");
    scripts["db:down"] = pmConfig.filter(dbPackageName, "db:down");
  }

  applyGeneratedPackageTestScripts(vfs, config);
  const testCommands = getWorkspaceTestCommands(vfs, packageManager);
  if (workspaceTool === "vite-plus") {
    scripts.check = "vp check";
    scripts.lint = "vp lint";
    scripts.format = "vp fmt";
    scripts.test = "vp run -r test";
    scripts.prepare = scripts.prepare
      ? `${scripts.prepare} && vp config --no-agent --hooks-dir .vite-hooks`
      : "vp config --no-agent --hooks-dir .vite-hooks";
  } else if (testCommands.length > 0) {
    scripts.test = testCommands.join(" && ");
  } else {
    delete scripts.test;
  }

  // Virtual generation runs in preview and test contexts where we cannot shell out
  // to discover the user's installed package manager version. Keep the field valid
  // so generated workspaces remain buildable; the CLI create() path rewrites this to
  // the actual local version after scaffolding.
  pkgJson.packageManager = `${packageManager}@${VIRTUAL_PACKAGE_MANAGER_VERSIONS[packageManager]}`;

  applyBetterAuthKyselyOverride(pkgJson, config);
  applyTsdownDevtoolsOverride(vfs, pkgJson, config);
  applyVitePlusOverrides(pkgJson, config);

  if (backend === "convex") {
    if (!workspaces.includes("packages/*")) {
      workspaces.push("packages/*");
    }
    const needsAppsDir =
      config.frontend.length > 0 || addons.includes("starlight") || addons.includes("fumadocs");
    if (needsAppsDir && !workspaces.includes("apps/*")) {
      workspaces.push("apps/*");
    }
  } else {
    if (!workspaces.includes("apps/*")) {
      workspaces.push("apps/*");
    }
    if (!workspaces.includes("packages/*")) {
      workspaces.push("packages/*");
    }
  }

  pkgJson.workspaces = workspaceCatalog
    ? { packages: workspaces, catalog: workspaceCatalog }
    : workspaces;

  vfs.writeJson("package.json", pkgJson);
}

// The vite-plus override aliases the `vite` package to @voidzero-dev/vite-plus-core,
// which ships no `vite` binary; workspace scripts must run vite through `vp`.
function applyVitePlusWorkspaceScripts(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.addons.includes("vite-plus")) return;

  const rewriteSegment = (segment: string) => {
    const trimmed = segment.trim();
    if (trimmed === "vite") return segment.replace("vite", "vp dev");
    if (trimmed.startsWith("vite ")) return segment.replace("vite ", "vp ");
    return segment;
  };

  for (const filePath of vfs.getAllFiles()) {
    if (filePath === "package.json" || !filePath.endsWith("/package.json")) continue;
    const pkgJson = vfs.readJson<PackageJson>(filePath);
    if (!pkgJson?.scripts) continue;

    let changed = false;
    for (const [name, script] of Object.entries(pkgJson.scripts)) {
      // `vp` is not a node entrypoint, so scripts that boot the aliased vite bin
      // under the node inspector have no Vite+ equivalent.
      if (script.includes("node_modules/vite/bin/vite.js")) {
        delete pkgJson.scripts[name];
        changed = true;
        continue;
      }
      const rewritten = script.split("&&").map(rewriteSegment).join("&&");
      if (rewritten !== script) {
        pkgJson.scripts[name] = rewritten;
        changed = true;
      }
    }
    if (changed) vfs.writeJson(filePath, pkgJson);
  }
}

function applyVitePlusOverrides(pkgJson: PackageJson, config: ProjectConfig): void {
  if (!config.addons.includes("vite-plus")) return;
  const overrides = {
    vite: "npm:@voidzero-dev/vite-plus-core@^0.2.9",
    vitest: VITE_PLUS_BUNDLED_VITEST_VERSION,
    "@vitest/ui": VITE_PLUS_BUNDLED_VITEST_VERSION,
    "@vitest/coverage-v8": VITE_PLUS_BUNDLED_VITEST_VERSION,
  };
  switch (config.packageManager) {
    case "pnpm":
      pkgJson.pnpm = pkgJson.pnpm || {};
      pkgJson.pnpm.overrides = { ...pkgJson.pnpm.overrides, ...overrides };
      break;
    case "yarn":
      pkgJson.resolutions = { ...pkgJson.resolutions, ...overrides };
      break;
    case "bun":
    case "npm":
      pkgJson.overrides = { ...pkgJson.overrides, ...overrides };
      break;
    default: {
      const _exhaustive: never = config.packageManager;
      throw new Error(`Unknown package manager: ${_exhaustive}`);
    }
  }
}

function applyGeneratedPackageTestScripts(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const testScript = getGeneratedTypeScriptTestScript(config.testing);
  if (!testScript) return;

  for (const packagePath of [
    "apps/web/package.json",
    "web/package.json",
    "apps/server/package.json",
    "packages/api/package.json",
    "api/package.json",
  ]) {
    const pkgJson = vfs.readJson<PackageJson>(packagePath);
    if (!pkgJson) continue;

    pkgJson.scripts = pkgJson.scripts || {};
    pkgJson.scripts.test = pkgJson.scripts.test || testScript;
    vfs.writeJson(packagePath, pkgJson);
  }
}

function getGeneratedTypeScriptTestScript(testing: ProjectConfig["testing"]): string | undefined {
  switch (testing) {
    case "vitest":
    case "vitest-playwright":
      return "vitest run --passWithNoTests";
    case "jest":
      return "jest --passWithNoTests";
    case "mocha":
      return 'mocha --import=tsx --extension ts "test/**/*.test.ts"';
    default:
      return undefined;
  }
}

function getWorkspaceTestCommands(
  vfs: VirtualFileSystem,
  packageManager: ProjectConfig["packageManager"],
): string[] {
  const commands: string[] = [];

  for (const packagePath of [
    "apps/web/package.json",
    "web/package.json",
    "apps/server/package.json",
    "packages/api/package.json",
    "api/package.json",
    "apps/native/package.json",
  ]) {
    const pkgJson = vfs.readJson<PackageJson>(packagePath);
    if (!pkgJson?.name || !pkgJson.scripts?.test) continue;
    commands.push(getPackageManagerWorkspaceScript(packageManager, pkgJson.name, "test"));
  }

  return commands;
}

function getPackageManagerWorkspaceScript(
  packageManager: ProjectConfig["packageManager"],
  workspaceName: string,
  script: string,
): string {
  switch (packageManager) {
    case "pnpm":
      return `pnpm --filter ${workspaceName} ${script}`;
    case "npm":
      return `npm run ${script} --workspace ${workspaceName}`;
    case "bun":
      return `bun run --filter ${workspaceName} ${script}`;
    case "yarn":
      return `yarn workspace ${workspaceName} ${script}`;
    default: {
      const _exhaustive: never = packageManager;
      throw new Error(`Unknown package manager: ${_exhaustive}`);
    }
  }
}

function applyBetterAuthKyselyOverride(pkgJson: PackageJson, config: ProjectConfig): void {
  if (config.auth !== "better-auth" && config.auth !== "better-auth-organizations") return;

  // Better Auth 1.6.x imports migration exports removed in Kysely 0.29.
  // Pin the transitive peer until Better Auth supports the newer Kysely API.
  switch (config.packageManager) {
    case "pnpm":
      pkgJson.pnpm = pkgJson.pnpm || {};
      pkgJson.pnpm.overrides = {
        ...pkgJson.pnpm.overrides,
        kysely: BETTER_AUTH_KYSELY_OVERRIDE,
      };
      break;
    case "yarn":
      pkgJson.resolutions = {
        ...pkgJson.resolutions,
        kysely: BETTER_AUTH_KYSELY_OVERRIDE,
      };
      break;
    case "bun":
    case "npm":
      pkgJson.overrides = {
        ...pkgJson.overrides,
        kysely: BETTER_AUTH_KYSELY_OVERRIDE,
      };
      break;
    default: {
      const _exhaustive: never = config.packageManager;
      throw new Error(`Unknown package manager: ${_exhaustive}`);
    }
  }
}

function applyTsdownDevtoolsOverride(
  vfs: VirtualFileSystem,
  pkgJson: PackageJson,
  config: ProjectConfig,
): void {
  // npm 10's arborist crashes ("Cannot read properties of null (reading
  // 'edgesOut')") while resolving tsdown's optional peer @vitejs/devtools@*
  // against devtools 0.4.2 (published 2026-07-21). The peer is never actually
  // installed, so pinning it to 0.4.1 has no runtime effect — it only gives
  // arborist a manifest it can resolve. Remove once npm 10 users can install
  // tsdown's peer graph again (upstream fix in tsdown, devtools, or npm).
  // tsdown ships with every server workspace (see workspace-deps), which is
  // injected AFTER this post-processor runs — so gate on the workspace
  // existing rather than on the dep being present.
  if (config.packageManager !== "npm") return;
  if (!vfs.exists(getServerPackagePath(config.frontend, config.backend))) return;

  pkgJson.overrides = {
    ...pkgJson.overrides,
    "@vitejs/devtools": TSDOWN_VITEJS_DEVTOOLS_OVERRIDE,
  };
}

function getPackageManagerConfig(
  packageManager: ProjectConfig["packageManager"],
  workspaceTool: WorkspaceTool,
): PackageManagerConfig {
  if (workspaceTool === "turbo") {
    return {
      dev: "turbo dev",
      build: "turbo build",
      checkTypes: "turbo check-types",
      filter: (workspace, script) => `turbo -F ${workspace} ${script}`,
    };
  }
  if (workspaceTool === "nx") {
    return {
      dev: "nx run-many -t dev",
      build: "nx run-many -t build",
      checkTypes: "nx run-many -t check-types",
      filter: (workspace, script) => `nx run ${workspace} --target=${script}`,
    };
  }
  if (workspaceTool === "vite-plus") {
    return {
      dev: "vp run -r --parallel dev",
      build: "vp run -r build",
      checkTypes: "vp run -r check-types",
      filter: (workspace, script) => `vp run --fail-if-no-match --filter ${workspace} ${script}`,
    };
  }

  switch (packageManager) {
    case "pnpm":
      return {
        dev: "pnpm -r dev",
        build: "pnpm -r build",
        checkTypes: "pnpm -r --if-present check-types",
        filter: (workspace, script) => `pnpm --filter ${workspace} ${script}`,
      };
    case "npm":
      return {
        dev: "npm run dev --workspaces --if-present",
        build: "npm run build --workspaces --if-present",
        checkTypes: "npm run check-types --workspaces --if-present",
        filter: (workspace, script) => `npm run ${script} --workspace ${workspace}`,
      };
    case "bun":
      return {
        dev: "bun run --filter '*' dev",
        build: "bun run --filter '*' build",
        checkTypes: "bun run --if-present --filter '*' check-types",
        filter: (workspace, script) => `bun run --filter ${workspace} ${script}`,
      };
    case "yarn":
      return {
        dev: "yarn workspaces foreach -Ap run dev",
        build: "yarn workspaces foreach -Apt run build",
        checkTypes: "yarn workspaces foreach -Aptv run check-types",
        filter: (workspace, script) => `yarn workspace ${workspace} ${script}`,
      };
    default: {
      const _exhaustive: never = packageManager;
      throw new Error(`Unknown package manager: ${_exhaustive}`);
    }
  }
}

function getWorkspaceTool(addons: ProjectConfig["addons"]): WorkspaceTool {
  if (addons.includes("nx")) return "nx";
  if (addons.includes("turborepo")) return "turbo";
  if (addons.includes("vite-plus")) return "vite-plus";
  return null;
}

export function updateDbPackageJson(
  vfs: VirtualFileSystem,
  config: ProjectConfig,
  dbDir = "packages/db",
): void {
  const dbPkgPath = `${dbDir}/package.json`;
  const pkgJson = vfs.readJson<PackageJson>(dbPkgPath);
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/db`;
  pkgJson.scripts = pkgJson.scripts || {};

  const scripts = pkgJson.scripts;
  const { database, orm, dbSetup, serverDeploy } = config;
  const isD1Alchemy = dbSetup === "d1" && serverDeploy === "cloudflare";

  if (database !== "none") {
    if (database === "sqlite" && dbSetup !== "d1") {
      scripts["db:local"] = "turso dev --db-file local.db";
    }

    if (orm === "prisma") {
      scripts["postinstall"] = "prisma generate";
      scripts["db:push"] = "prisma db push";
      scripts["db:generate"] = "prisma generate";
      scripts["db:migrate"] = "prisma migrate dev";
      if (!isD1Alchemy) {
        scripts["db:studio"] = "prisma studio";
      }
    } else if (orm === "drizzle") {
      scripts["db:push"] = "drizzle-kit push";
      scripts["db:generate"] = "drizzle-kit generate";
      if (!isD1Alchemy) {
        scripts["db:studio"] = "drizzle-kit studio";
        scripts["db:migrate"] = "drizzle-kit migrate";
      }
    }
  }

  if (dbSetup === "docker") {
    scripts["db:start"] = "docker compose up -d";
    scripts["db:watch"] = "docker compose up";
    scripts["db:stop"] = "docker compose stop";
    scripts["db:down"] = "docker compose down";
  }

  vfs.writeJson(dbPkgPath, pkgJson);
}

function updateAuthPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("packages/auth/package.json");
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/auth`;
  vfs.writeJson("packages/auth/package.json", pkgJson);
}

function updateApiPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("packages/api/package.json");
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/api`;
  vfs.writeJson("packages/api/package.json", pkgJson);
}

function updateConfigPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("packages/config/package.json");
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/config`;
  vfs.writeJson("packages/config/package.json", pkgJson);
}

function updateEnvPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("packages/env/package.json");
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/env`;

  // Set exports based on which env files exist
  const hasWebFrontend = config.frontend.some((f) =>
    [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "vinext",
      "nuxt",
      "vanilla-vite",
      "vue",
      "svelte",
      "solid",
      "solid-start",
    ].includes(f),
  );
  const hasNative = config.frontend.some((f) =>
    ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
  );
  const needsServerEnv = config.backend !== "none" && config.backend !== "convex";

  const exports: Record<string, string> = {};

  if (needsServerEnv) {
    exports["./server"] = "./src/server.ts";
  }
  if (hasWebFrontend) {
    exports["./web"] = "./src/web.ts";
  }
  if (hasNative) {
    exports["./native"] = "./src/native.ts";
  }

  pkgJson.exports = exports;

  vfs.writeJson("packages/env/package.json", pkgJson);
}

function updateInfraPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("packages/infra/package.json");
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/infra`;
  vfs.writeJson("packages/infra/package.json", pkgJson);
}

function updateConvexPackageJson(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const pkgJson = vfs.readJson<PackageJson>("packages/backend/package.json");
  if (!pkgJson) return;

  pkgJson.name = `@${config.projectName}/backend`;
  pkgJson.scripts = pkgJson.scripts || {};
  vfs.writeJson("packages/backend/package.json", pkgJson);
}
