/**
 * Single-app (flat) workspace post-processor.
 *
 * Collapses the default monorepo layout (`apps/web` + `packages/config` +
 * `packages/env`) into a single flat app at the repository root. This only
 * applies to a qualifying "thin self" stack (see `qualifiesForSingleApp`):
 * backend `self` with exactly one Next.js or TanStack Start web frontend and no
 * capability that would emit a sibling workspace package. For anything else the
 * generator keeps the monorepo layout untouched.
 *
 * The transform runs AFTER the normal monorepo generation (including catalog
 * setup), so it operates on a complete, valid monorepo tree. If the tree
 * contains any unexpected workspace directory it bails without mutating,
 * leaving a valid monorepo — never a broken flat layout.
 */

import type { ProjectConfig } from "@better-fullstack/types";

import yaml from "yaml";

import type { VirtualFileSystem } from "../core/virtual-fs";

/** Web frameworks whose flat layout is supported (both expose `@/*` -> ./src). */
const SINGLE_APP_WEB_FRONTENDS = new Set(["next", "tanstack-start"]);

/** Only these directories may exist under apps/ and packages/ to be flattenable. */
const ALLOWED_APP_DIRS = new Set(["web"]);
const ALLOWED_PACKAGE_DIRS = new Set(["config", "env"]);

const SOURCE_FILE_PATTERN = /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts)$/;

type PackageJson = {
  name?: string;
  version?: string;
  private?: boolean;
  type?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  exports?: Record<string, unknown>;
  packageManager?: string;
  workspaces?: string[] | { packages?: string[]; catalog?: Record<string, string> };
  overrides?: Record<string, string>;
  resolutions?: Record<string, string>;
  pnpm?: Record<string, unknown>;
  [key: string]: unknown;
};

export interface WorkspaceLayout {
  isFlat: boolean;
  webAppDir: string;
}

/**
 * A single-app (flat) layout is only safe for a "thin self" stack that emits no
 * sibling workspace package (database/orm, better-auth server, trpc/orpc
 * packages/api, payments, email, etc.) and no separate native/server app. Graph
 * (`--part`) configs always stay monorepo.
 */
export function qualifiesForSingleApp(config: ProjectConfig): boolean {
  if (config.workspaceShape !== "single-app") return false;
  if (config.stackParts && config.stackParts.length > 0) return false;
  if (config.ecosystem !== "typescript") return false;
  if (config.backend !== "self") return false;

  const webFrontends = (config.frontend ?? []).filter((f) => f && f !== "none");
  if (webFrontends.length !== 1) return false;
  if (!SINGLE_APP_WEB_FRONTENDS.has(webFrontends[0] as string)) return false;

  const siblingPackageScalars = [
    config.api,
    config.database,
    config.orm,
    config.auth,
    config.payments,
    config.email,
    config.fileUpload,
    config.realtime,
    config.jobQueue,
    config.caching,
    config.rateLimit,
    config.i18n,
    config.search,
    config.vectorDb,
    config.fileStorage,
    config.cms,
    config.ai,
    config.analytics,
    config.featureFlags,
    config.observability,
    config.logging,
    config.webDeploy,
    config.serverDeploy,
  ];
  if (siblingPackageScalars.some((value) => value && value !== "none")) return false;

  const nonNoneExamples = (config.examples ?? []).filter((e) => e && e !== "none");
  if (nonNoneExamples.length > 0) return false;

  return true;
}

export function resolveWorkspaceLayout(config: ProjectConfig): WorkspaceLayout {
  const isFlat = qualifiesForSingleApp(config);
  return { isFlat, webAppDir: isFlat ? "" : "apps/web" };
}

/**
 * Collapse the monorepo tree into a flat single-app repo. Returns true when the
 * tree was flattened, false when it was left untouched (safety bail-out).
 */
export function flattenSingleApp(vfs: VirtualFileSystem, config: ProjectConfig): boolean {
  // Safety net: only flatten a tree that contains exactly the expected thin-self
  // workspaces. Anything else means a capability slipped through the qualifying
  // predicate — leave the complete, valid monorepo rather than emit a broken
  // flat layout.
  if (vfs.directoryExists("apps")) {
    const appDirs = vfs.listDir("apps");
    if (!appDirs.every((dir) => ALLOWED_APP_DIRS.has(dir))) return false;
  }
  if (vfs.directoryExists("packages")) {
    const packageDirs = vfs.listDir("packages");
    if (!packageDirs.every((dir) => ALLOWED_PACKAGE_DIRS.has(dir))) return false;
  }
  if (!vfs.fileExists("apps/web/package.json")) return false;

  const webPkg = vfs.readJson<PackageJson>("apps/web/package.json");
  if (!webPkg) return false;
  const rootPkg = vfs.readJson<PackageJson>("package.json") ?? {};
  const envPkg = vfs.readJson<PackageJson>("packages/env/package.json") ?? undefined;
  const catalog = readCatalog(vfs, rootPkg);

  // Only inline the env modules the app actually imports. This avoids dragging
  // an unused env/server.ts (which references `process`) into a frontend whose
  // tsconfig excludes node types (e.g. TanStack Start uses `vite/client`).
  const importedEnvFiles = collectImportedEnvFiles(vfs, config.projectName);

  const flatPkg = buildFlatPackageJson(
    config,
    rootPkg,
    webPkg,
    importedEnvFiles.size > 0 ? envPkg : undefined,
    catalog,
  );

  // Inline the shared env package into the app's own src/env directory.
  inlineEnv(vfs, importedEnvFiles);

  // Relocate the web app to the repository root.
  moveDirContents(vfs, "apps/web", "");

  // Rewrite `@{proj}/env/*` imports to the local path alias now that env lives in src/env.
  rewriteEnvImports(vfs, config.projectName);

  // Write the merged flat root package.json (overwrites the moved web package.json).
  vfs.writeJson("package.json", flatPkg);

  // Drop the now-empty workspace scaffolding.
  vfs.removeDir("apps");
  vfs.removeDir("packages");
  for (const file of ["turbo.json", "pnpm-workspace.yaml", "nx.json"]) {
    if (vfs.fileExists(file)) vfs.deleteFile(file);
  }

  return true;
}

function readCatalog(vfs: VirtualFileSystem, rootPkg: PackageJson): Record<string, string> {
  const workspaces = rootPkg.workspaces;
  if (workspaces && !Array.isArray(workspaces) && workspaces.catalog) {
    return { ...workspaces.catalog };
  }

  const yamlContent = vfs.readFile("pnpm-workspace.yaml");
  if (yamlContent) {
    try {
      const parsed = yaml.parse(yamlContent) as { catalog?: Record<string, string> } | undefined;
      if (parsed?.catalog) return { ...parsed.catalog };
    } catch {
      // Ignore malformed yaml; fall through to empty catalog.
    }
  }

  return {};
}

function resolveDeps(
  deps: Record<string, string> | undefined,
  catalog: Record<string, string>,
  projectScope: string,
): Record<string, string> {
  const resolved: Record<string, string> = {};
  for (const [name, version] of Object.entries(deps ?? {})) {
    // Drop the inlined workspace packages (@{proj}/env, @{proj}/config, ...).
    if (name.startsWith(projectScope)) continue;
    if (version.startsWith("workspace:")) continue;
    if (version === "catalog:" || version.startsWith("catalog:")) {
      resolved[name] = catalog[name] ?? version;
      continue;
    }
    resolved[name] = version;
  }
  return resolved;
}

function buildFlatPackageJson(
  config: ProjectConfig,
  rootPkg: PackageJson,
  webPkg: PackageJson,
  envPkg: PackageJson | undefined,
  catalog: Record<string, string>,
): PackageJson {
  const projectScope = `@${config.projectName}/`;

  const dependencies = {
    ...resolveDeps(webPkg.dependencies, catalog, projectScope),
    ...resolveDeps(envPkg?.dependencies, catalog, projectScope),
  };
  const devDependencies = resolveDeps(webPkg.devDependencies, catalog, projectScope);

  const flatPkg: PackageJson = {
    name: config.projectName,
    version: webPkg.version ?? "0.1.0",
    private: true,
    type: "module",
    scripts: { ...webPkg.scripts },
  };

  if (Object.keys(dependencies).length > 0) flatPkg.dependencies = dependencies;
  if (Object.keys(devDependencies).length > 0) flatPkg.devDependencies = devDependencies;

  if (rootPkg.packageManager) flatPkg.packageManager = rootPkg.packageManager;
  if (rootPkg.overrides) flatPkg.overrides = rootPkg.overrides;
  if (rootPkg.resolutions) flatPkg.resolutions = rootPkg.resolutions;
  if (rootPkg.pnpm) flatPkg.pnpm = rootPkg.pnpm;

  return flatPkg;
}

/**
 * Scans the web app's source for `@{proj}/env/<sub>` imports and returns the set
 * of env source files that are actually referenced (e.g. `web.ts`, `server.ts`).
 */
function collectImportedEnvFiles(vfs: VirtualFileSystem, projectName: string): Set<string> {
  const importedFiles = new Set<string>();
  const pattern = new RegExp(`@${escapeRegExp(projectName)}/env/([A-Za-z0-9_-]+)`, "g");

  for (const filePath of vfs.getAllFiles()) {
    if (!filePath.startsWith("apps/web/")) continue;
    if (!SOURCE_FILE_PATTERN.test(filePath)) continue;
    const content = vfs.readFile(filePath);
    if (!content) continue;
    for (const match of content.matchAll(pattern)) {
      const subpath = match[1];
      if (subpath && vfs.fileExists(`packages/env/src/${subpath}.ts`)) {
        importedFiles.add(`${subpath}.ts`);
      }
    }
  }

  return importedFiles;
}

function inlineEnv(vfs: VirtualFileSystem, filesToInline: Set<string>): void {
  for (const relativePath of filesToInline) {
    const content = vfs.readFile(`packages/env/src/${relativePath}`);
    if (content !== undefined) {
      vfs.writeFile(`src/env/${relativePath}`, content);
    }
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function moveDirContents(vfs: VirtualFileSystem, fromDir: string, toDir: string): void {
  const prefix = `${fromDir}/`;
  for (const filePath of vfs.getAllFiles()) {
    if (!filePath.startsWith(prefix)) continue;
    const relativePath = filePath.slice(prefix.length);
    const destPath = toDir ? `${toDir}/${relativePath}` : relativePath;
    const content = vfs.readFile(filePath);
    if (content === undefined) continue;
    vfs.writeFile(destPath, content, vfs.getSourcePath(filePath));
  }
}

function rewriteEnvImports(vfs: VirtualFileSystem, projectName: string): void {
  const needle = `@${projectName}/env/`;
  const nextConfigFiles = new Set(["next.config.ts", "next.config.mjs", "next.config.js"]);

  for (const filePath of vfs.getAllFiles()) {
    if (!SOURCE_FILE_PATTERN.test(filePath)) continue;
    const content = vfs.readFile(filePath);
    if (!content || !content.includes(needle)) continue;

    let updated = content.replaceAll(needle, "@/env/");
    // next.config.* is evaluated by Next before the app's path-alias resolution
    // kicks in, so it needs a relative import instead of the `@/` alias.
    if (nextConfigFiles.has(filePath)) {
      updated = updated.replaceAll("@/env/", "./src/env/");
    }
    vfs.writeFile(filePath, updated);
  }
}
