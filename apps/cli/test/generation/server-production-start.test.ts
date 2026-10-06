import type { ProjectConfig } from "@better-fullstack/types";

import { expectSuccess, runTRPCTest, type TestConfig } from "@test/support/test-utils";
import { listVirtualTreeFiles } from "@test/support/virtual-tree-utils";
import { describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, posix } from "node:path";

import { createVirtual } from "@/index";

// These checks walk the generated server Dockerfile against the generated project. Every RUN
// step is interpreted from what the generated files declare: installs follow the workspace
// manifests and lifecycle scripts, and a build runs the server's own build script. A step the
// model cannot interpret fails the test instead of being assumed to work.

const TSDOWN_BACKENDS = [
  "hono",
  "express",
  "fastify",
  "elysia",
  "fets",
  "effect",
  "nestjs",
] as const;
const RUNTIMES = ["bun", "node"] as const;
const PACKAGE_MANAGERS = ["bun", "pnpm", "npm", "yarn"] as const;
const DATABASES = ["sqlite", "postgres", "mysql", "mongodb"] as const;
// AdonisJS with workspace packages that import each other and the generated Prisma client.
const ADONIS_PRISMA_AUTH: Partial<ProjectConfig> = {
  backend: "adonisjs",
  runtime: "node",
  api: "trpc",
  database: "postgres",
  orm: "prisma",
  auth: "better-auth",
  serverDeploy: "docker",
};
const LIFECYCLE_SCRIPTS = [
  "preinstall",
  "install",
  "postinstall",
  "preprepare",
  "prepare",
  "postprepare",
];
// Executables whose package has a different name.
const BIN_PACKAGES: Record<string, string> = { nitro: "nitropack", vp: "vite-plus" };

type Generated = { files: Map<string, string>; config: Partial<ProjectConfig> };
type PackageJson = {
  name?: string;
  workspaces?: string[] | { packages?: string[] };
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  exports?: Record<string, string | { default?: string }>;
  imports?: Record<string, string>;
};

async function generate(config: Partial<ProjectConfig>): Promise<Generated> {
  const result = await createVirtual({ projectName: "prod-start", api: "none", ...config });
  expect(result.error).toBeUndefined();
  const files = new Map(
    listVirtualTreeFiles(result.tree!).map((file) => [file.path, file.content]),
  );
  return { files, config };
}

/** Creates the project on disk so addon setup that runs after generation (Git hooks) applies. */
async function generateOnDisk(config: TestConfig): Promise<Generated> {
  const result = await runTRPCTest({ ...config, install: false });
  expectSuccess(result);
  const projectDir = result.projectDir!;
  try {
    const files = new Map<string, string>();
    const walk = (dir: string) => {
      for (const entry of readdirSync(join(projectDir, dir), { withFileTypes: true })) {
        const path = dir ? `${dir}/${entry.name}` : entry.name;
        if (entry.isDirectory()) walk(path);
        else files.set(path, readFileSync(join(projectDir, path), "utf8"));
      }
    };
    walk("");
    return { files, config };
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
}

function read(generated: Generated, path: string): string {
  const content = generated.files.get(path);
  if (content === undefined) throw new Error(`Expected generated file at ${path}`);
  return content;
}

/** Repository-relative files the generated tsdown config emits for its entries. */
function emittedServerFiles(generated: Generated): Set<string> {
  const config = read(generated, "apps/server/tsdown.config.ts");
  expect(config).toMatch(/format:\s*["']esm["']/);
  // tsdown otherwise picks .js or .mjs from its platform default and the package type.
  expect(config).toMatch(/fixedExtension:\s*true/);
  const outDir = config.match(/outDir:\s*["']([^"']+)["']/)?.[1];
  if (!outDir) throw new Error("tsdown config has no outDir");

  const single = config.match(/entry:\s*["']([^"']+)["']/)?.[1];
  const names = single
    ? [posix.basename(single, posix.extname(single))]
    : [...config.match(/entry:\s*{([^}]*)}/)![1]!.matchAll(/["']?([\w/.-]+)["']?\s*:/g)].map(
        (match) => match[1]!,
      );
  return new Set(names.map((name) => posix.join("apps/server", outDir, `${name}.mjs`)));
}

/** Resolves `bun run <file>` or `node <file>` run from apps/server to a repository path. */
function serverCommandTarget(command: readonly string[] | string): string {
  const tokens = typeof command === "string" ? command.trim().split(/\s+/) : [...command];
  const file = tokens[0] === "bun" && tokens[1] === "run" ? tokens[2] : tokens[1];
  expect(["bun", "node"]).toContain(tokens[0]);
  return posix.join("apps/server", file!);
}

function usesIsolatedLinker(generated: Generated): boolean {
  const { packageManager } = generated.config;
  if (packageManager === "bun") {
    return /linker\s*=\s*"isolated"/.test(generated.files.get("bunfig.toml") ?? "");
  }
  if (packageManager === "pnpm") {
    return !/node-linker\s*=\s*hoisted/.test(generated.files.get(".npmrc") ?? "");
  }
  if (packageManager === "yarn") {
    expect(read(generated, ".yarnrc.yml")).toContain("nodeLinker: node-modules");
  }
  return false;
}

function dockerignoreMatcher(generated: Generated): (path: string) => boolean {
  const patterns = (generated.files.get(".dockerignore") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("!"))
    .map((pattern) => {
      const source = pattern
        .split("**/")
        .map((part) => part.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*"))
        .join("(?:.*/)?");
      return new RegExp(`^${source}(?:/.*)?$`);
    });
  return (path) => patterns.some((pattern) => pattern.test(path));
}

type Install = { production: boolean; ignoreScripts: boolean; packages: Set<string> };
type Stage = {
  /** Absolute path to file content; directories and build artifacts map to "". */
  files: Map<string, string>;
  workdir: string;
  env: Map<string, string>;
  args: Map<string, string>;
  installs: Install[];
  cmd?: string[];
};
type ImageModel = { runner: Stage; workdir: string; dependencySources: Stage[] };

const json = (stage: Stage, path: string): PackageJson | undefined => {
  const content = stage.files.get(path);
  return content ? (JSON.parse(content) as PackageJson) : undefined;
};
const under = (path: string, dir: string) => path === dir || path.startsWith(`${dir}/`);

/** Workspace directories by package name, from the root manifest's workspace globs. */
function workspaces(stage: Stage, root: string): Map<string, string> {
  const manifest = json(stage, `${root}/package.json`)!;
  const pnpmPackages =
    (stage.files.get(`${root}/pnpm-workspace.yaml`) ?? "").match(
      /^packages:\n((?:\s+-.*\n?)*)/m,
    )?.[1] ?? "";
  const pnpmGlobs = [...pnpmPackages.matchAll(/-\s*["']?([^"'\n]+)/g)].map((match) => match[1]!);
  const globs = Array.isArray(manifest.workspaces)
    ? manifest.workspaces
    : (manifest.workspaces?.packages ?? pnpmGlobs);
  const byName = new Map<string, string>();
  for (const glob of globs) {
    expect(glob.endsWith("/*")).toBe(true);
    const parent = posix.join(root, glob.slice(0, -2));
    for (const path of stage.files.keys()) {
      if (posix.dirname(posix.dirname(path)) === parent && path.endsWith("/package.json")) {
        byName.set(json(stage, path)!.name!, posix.dirname(path));
      }
    }
  }
  return byName;
}

function dependencyNames(manifest: PackageJson, production: boolean): string[] {
  return Object.keys({
    ...manifest.dependencies,
    ...(production ? {} : manifest.devDependencies),
  });
}

class ImageBuild {
  constructor(
    private readonly generated: Generated,
    private readonly stage: Stage,
  ) {}

  private at(path: string) {
    return posix.resolve(this.stage.workdir, path);
  }

  run(command: string) {
    const conditional = command.match(/^if \[ -f (\S+) \]; then (.+?); else (.+?); fi$/);
    if (conditional) {
      this.run(this.stage.files.has(this.at(conditional[1]!)) ? conditional[2]! : conditional[3]!);
      return;
    }
    if (/^(node|bun) -e '/.test(command)) {
      this.runInlineScript(command.slice(command.indexOf("'") + 1, command.lastIndexOf("'")));
      return;
    }
    for (const part of command.split(" && ")) this.runSimple(part.trim());
  }

  private runSimple(command: string) {
    // Base image tooling: the package manager itself.
    if (command.startsWith("corepack ") || command === "npm install -g bun") return;
    const mkdir = command.match(/^mkdir -p (\S+)$/);
    if (mkdir) {
      this.stage.files.set(this.at(mkdir[1]!), "");
      return;
    }
    const install = command.match(
      /^(?:npm ci|npm install|pnpm install|yarn install|yarn workspaces focus|bun install)\b/,
    );
    if (install) {
      const filter = command.match(
        /--workspace=(\S+)|--filter "?([^\s".]+)(?:\.\.\.)?"?|workspaces focus (\S+)/,
      );
      this.install({
        production: /--omit=dev|--prod\b|--production\b/.test(command),
        ignoreScripts: /--ignore-scripts\b/.test(command),
        filter: filter && (filter[1] ?? filter[2] ?? filter[3]),
      });
      return;
    }
    const script =
      command.match(/^pnpm --filter (\S+) (\S+)$/) ??
      command.match(/^yarn workspace (\S+) (\S+)$/) ??
      command.match(/^bun run --filter (\S+) (\S+)$/);
    const npmScript = command.match(/^npm run (\S+) --workspace=(\S+)$/);
    if (script || npmScript) {
      const [workspace, name] = script
        ? [script[1]!, script[2]!]
        : [npmScript![2]!, npmScript![1]!];
      this.runWorkspaceScript(workspace, name);
      return;
    }
    throw new Error(`The image model cannot interpret RUN ${command}`);
  }

  /** Runs inline package.json rewrites against the stage's manifests. */
  private runInlineScript(code: string) {
    const dir = mkdtempSync(join(tmpdir(), "server-image-step-"));
    try {
      const manifests = [...this.stage.files.keys()].filter(
        (path) => under(path, this.stage.workdir) && path.endsWith("/package.json"),
      );
      for (const path of manifests) {
        const target = join(dir, posix.relative(this.stage.workdir, path));
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, this.stage.files.get(path)!);
      }
      const result = spawnSync(process.execPath, ["-e", code], { cwd: dir, encoding: "utf8" });
      if (result.status !== 0) throw new Error(`Inline RUN script failed: ${result.stderr}`);
      for (const path of manifests) {
        this.stage.files.set(
          path,
          readFileSync(join(dir, posix.relative(this.stage.workdir, path)), "utf8"),
        );
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  private install(options: { production: boolean; ignoreScripts: boolean; filter: string | null }) {
    const root = this.stage.workdir;
    const byName = workspaces(this.stage, root);
    const scope = new Set<string>();
    const visit = (name: string) => {
      const dir = byName.get(name);
      if (!dir || scope.has(dir)) return;
      scope.add(dir);
      for (const dep of dependencyNames(
        json(this.stage, `${dir}/package.json`)!,
        options.production,
      ))
        visit(dep);
    };
    if (options.filter) {
      expect(byName.has(options.filter)).toBe(true);
      visit(options.filter);
    } else {
      for (const name of byName.keys()) visit(name);
    }

    const projects = [root, ...scope];
    const packages = new Set<string>();
    for (const dir of projects) {
      for (const dep of dependencyNames(
        json(this.stage, `${dir}/package.json`)!,
        options.production,
      )) {
        if (!byName.has(dep)) packages.add(dep);
      }
    }
    const install = { ...options, packages };
    this.stage.installs.push(install);
    this.stage.files.set(`${root}/node_modules`, "");
    if (usesIsolatedLinker(this.generated)) {
      for (const dir of scope) this.stage.files.set(`${dir}/node_modules`, "");
    }

    // Workspace lifecycle scripts run during the install with only the installed packages.
    if (options.ignoreScripts) return;
    for (const dir of projects) {
      const scripts = json(this.stage, `${dir}/package.json`)!.scripts ?? {};
      for (const name of LIFECYCLE_SCRIPTS) {
        if (scripts[name]) this.runScriptCommand(dir, scripts[name], install, `${name} script`);
      }
    }
  }

  private runWorkspaceScript(workspace: string, name: string) {
    const dir = workspaces(this.stage, this.stage.workdir).get(workspace);
    if (!dir) throw new Error(`No workspace named ${workspace}`);
    const command = json(this.stage, `${dir}/package.json`)!.scripts?.[name];
    if (!command) throw new Error(`${workspace} has no ${name} script`);
    const install = this.stage.installs.at(-1);
    if (!install) throw new Error(`${workspace} ${name} runs before any install`);
    for (const part of command.split("&&")) {
      if (!this.runScriptCommand(dir, part.trim(), install, `${name} script`)) {
        throw new Error(`The image model does not know what "${part.trim()}" builds`);
      }
    }
  }

  /** Applies a script's effect; returns whether the command produced a modeled build output. */
  private runScriptCommand(dir: string, command: string, install: Install, label: string): boolean {
    const [tool, ...args] = command.split(/\s+/);
    if (tool !== "node" && tool !== "bun") {
      const provider = BIN_PACKAGES[tool!] ?? tool!;
      if (!install.packages.has(provider)) {
        throw new Error(
          `${posix.relative(this.stage.workdir, dir) || "root"} ${label} "${command}" needs ${provider}, which this install does not include`,
        );
      }
    }
    if (tool === "tsdown") {
      for (const file of emittedServerFiles(this.generated))
        this.stage.files.set(this.at(file), "");
      return true;
    }
    if (tool === "prisma" && args[0] === "generate") {
      this.prismaGenerate(dir);
      return true;
    }
    if (tool === "node" && args.join(" ") === "ace build") {
      this.adonisBuild(dir);
      return true;
    }
    if (tool === "nitro" && args[0] === "build") {
      this.stage.files.set(`${dir}/.output/server/index.mjs`, "");
      return true;
    }
    return false;
  }

  private prismaGenerate(dir: string) {
    const config = this.stage.files.get(`${dir}/prisma.config.ts`) ?? "";
    const schemas = [...this.stage.files].filter(
      ([path]) => under(path, `${dir}/prisma`) && path.endsWith(".prisma"),
    );
    if (/env\(\s*["']DATABASE_URL["']\s*\)/.test(config + schemas.map(([, c]) => c).join("\n"))) {
      const dotenv = config.match(/path:\s*["']([^"']+)["']/)?.[1];
      const fromFile = dotenv && this.stage.files.get(posix.resolve(dir, dotenv));
      if (
        !this.stage.env.has("DATABASE_URL") &&
        !this.stage.args.has("DATABASE_URL") &&
        !fromFile?.includes("DATABASE_URL=")
      ) {
        throw new Error(
          `prisma generate in ${dir} reads DATABASE_URL, which this stage does not set`,
        );
      }
    }
    for (const [path, content] of schemas) {
      const output = content.match(/output\s*=\s*"([^"]+)"/)?.[1];
      if (output) this.stage.files.set(posix.resolve(posix.dirname(path), output, "client.ts"), "");
    }
  }

  /** `node ace build` compiles every TypeScript file with tsc into build/, keeping imports. */
  private adonisBuild(dir: string) {
    // Iterate a copy: the loop adds the compiled files to the same map.
    for (const [path, content] of Array.from(this.stage.files)) {
      if (!under(path, dir) || under(path, `${dir}/node_modules`) || under(path, `${dir}/build`))
        continue;
      const relative = posix.relative(dir, path);
      if (path.endsWith(".ts"))
        this.stage.files.set(`${dir}/build/${relative.slice(0, -3)}.js`, content);
      if (relative === "package.json") this.stage.files.set(`${dir}/build/package.json`, content);
    }
  }
}

/** Walks the generated server Dockerfile with the repository root as build context. */
function modelServerImage(
  generated: Generated,
  dockerfile = read(generated, "apps/server/Dockerfile"),
): ImageModel {
  const ignored = dockerignoreMatcher(generated);
  const context = [...generated.files].filter(([path]) => !ignored(path));
  const stages = new Map<string, Stage>();
  const dependencySources: Stage[] = [];
  let stage: Stage | undefined;

  const lines = dockerfile
    .replace(/\\\n/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  for (const line of lines) {
    const [instruction, ...rest] = line.split(/\s+/);
    const argument = line.slice(instruction!.length).trim();
    if (instruction === "FROM") {
      const parent = stages.get(rest[0]!);
      stage = {
        files: new Map(parent?.files),
        workdir: parent?.workdir ?? "/",
        env: new Map(parent?.env),
        args: new Map(),
        installs: [...(parent?.installs ?? [])],
      };
      stages.set(rest[2] ?? rest[0]!, stage);
      continue;
    }
    if (!stage) throw new Error(`${line} appears before FROM`);
    const current = stage;
    const at = (path: string) => posix.resolve(current.workdir, path);

    if (instruction === "WORKDIR") current.workdir = at(rest[0]!);
    else if (instruction === "CMD") current.cmd = JSON.parse(argument);
    else if (instruction === "ENV" || instruction === "ARG") {
      const [, name, value] = argument.match(/^(\w+)(?:=(.*))?$/)!;
      if (value !== undefined)
        (instruction === "ENV" ? current.env : current.args).set(name!, value);
    } else if (instruction === "RUN") new ImageBuild(generated, current).run(argument);
    else if (instruction === "COPY") {
      const from = rest.find((token) => token.startsWith("--from="))?.slice("--from=".length);
      const [source, dest] = rest.filter((token) => !token.startsWith("--"));
      if (!from) {
        expect(`${source} ${dest}`).toBe(". .");
        for (const [path, content] of context) current.files.set(at(path), content);
        continue;
      }
      const origin = stages.get(from)!;
      const sourcePaths = [...origin.files].filter(([path]) => under(path, source!));
      if (sourcePaths.length === 0) throw new Error(`${line}: nothing at ${source} in ${from}`);
      if (source!.endsWith("node_modules")) dependencySources.push(origin);
      for (const [path, content] of sourcePaths)
        current.files.set(at(posix.join(dest!, posix.relative(source!, path))), content);
    } else if (instruction !== "EXPOSE") {
      throw new Error(`The image model cannot interpret ${line}`);
    }
  }

  return { runner: stage!, workdir: stage!.workdir, dependencySources };
}

/** Asserts that the stages supplying node_modules installed production dependencies only. */
function expectProductionDependencies(generated: Generated, image: ImageModel, appRoot: string) {
  // The server's dependencies resolve from the workspace's own node_modules under isolated
  // linkers, which link into the root store, and from the root under hoisting linkers.
  const required = usesIsolatedLinker(generated)
    ? ["apps/server/node_modules", "node_modules"]
    : ["node_modules"];
  for (const dir of required) expect(image.runner.files.has(posix.join(appRoot, dir))).toBe(true);
  expect(image.dependencySources.length).toBeGreaterThan(0);
  for (const source of image.dependencySources) {
    const install = source.installs.at(-1)!;
    expect(install.production).toBe(true);
    // Dependencies' install scripts build native modules such as SQLite drivers.
    expect(install.ignoreScripts).toBe(false);
  }
}

/** Asserts the runner can execute `command` from its WORKDIR with production dependencies. */
function expectRunnable(generated: Generated, image: ImageModel, command: readonly string[]) {
  const emitted = emittedServerFiles(generated);
  const target = serverCommandTarget(command);
  expect(emitted).toContain(target);
  expect(image.workdir.endsWith("/apps/server")).toBe(true);
  const appRoot = image.workdir.slice(0, -"/apps/server".length);
  expect(image.runner.files.has(posix.join(appRoot, target))).toBe(true);
  expectProductionDependencies(generated, image, appRoot);
}

/** The file a package `exports` entry maps `subpath` to, including `./*` patterns. */
function exportTarget(manifest: PackageJson, subpath: string): string | undefined {
  for (const [key, value] of Object.entries(manifest.exports ?? {})) {
    const target = typeof value === "string" ? value : value.default;
    if (key === subpath) return target;
    if (key.endsWith("*") && subpath.startsWith(key.slice(0, -1)) && target) {
      return target.replaceAll("*", subpath.slice(key.length - 1));
    }
  }
  return undefined;
}

/**
 * Follows the imports of a tsc-compiled server through the runner's filesystem, into the workspace
 * packages it imports. Those stay TypeScript, so the CMD must load a TypeScript loader that the
 * production install provides; the loader also maps `.js` specifiers to their `.ts` sources.
 */
function expectCompiledImportsResolve(generated: Generated, image: ImageModel, outDir: string) {
  const appRoot = "/app";
  const runner = image.runner;
  const build = posix.join(appRoot, "apps/server", outDir);
  const manifest = json(runner, `${build}/package.json`)!;
  const workspacePackages = new Map<string, string>();
  for (const [path] of runner.files) {
    if (/^\/app\/(apps|packages)\/[^/]+\/package\.json$/.test(path)) {
      workspacePackages.set(json(runner, path)!.name!, posix.dirname(path));
    }
  }
  const serverDeps = dependencyNames(json(runner, `${appRoot}/apps/server/package.json`)!, true);
  const workspaceNames = new Set(
    [...generated.files.keys()]
      .filter((path) => /^packages\/[^/]+\/package\.json$/.test(path))
      .map((path) => (JSON.parse(read(generated, path)) as PackageJson).name!),
  );
  const loaders = image.runner.cmd!.flatMap((token, index, cmd) =>
    cmd[index - 1] === "--import" ? [token] : [],
  );
  const resolveFile = (path: string) => {
    if (runner.files.has(path)) return path;
    const typescript = path.replace(/\.js$/, ".ts");
    if (typescript !== path && runner.files.has(typescript)) {
      expect(loaders, `${path} exists only as TypeScript`).not.toEqual([]);
      return typescript;
    }
    return undefined;
  };

  const visited = new Set<string>();
  const queue = [...runner.files.keys()].filter(
    (path) => under(path, build) && path.endsWith(".js"),
  );
  while (queue.length > 0) {
    const path = queue.pop()!;
    if (visited.has(path)) continue;
    visited.add(path);
    const content = runner.files.get(path) ?? "";
    // Value imports, side-effect imports, and dynamic imports; `import type` is erased.
    for (const match of content.matchAll(
      /\bimport(?:(?!\s+type\b)[^"';]*?\bfrom\s*|\s*\(?\s*)["']([^"']+)["']/g,
    )) {
      const specifier = match[1]!;
      if (specifier.startsWith("node:")) continue;
      if (specifier.startsWith(".")) {
        // Relative imports inside the compiled output are covered by the outer walk.
        if (under(path, build)) continue;
        const file = resolveFile(posix.resolve(posix.dirname(path), specifier));
        expect(file, `${path} imports ${specifier}, which is not in the image`).toBeDefined();
        queue.push(file!);
        continue;
      }
      if (specifier.startsWith("#")) {
        if (!under(path, build)) continue;
        const key = Object.keys(manifest.imports ?? {}).find((pattern) =>
          specifier.startsWith(pattern.replaceAll("*", "")),
        );
        expect(
          key,
          `${path} imports ${specifier} without a package.json imports entry`,
        ).toBeDefined();
        continue;
      }
      const name = specifier
        .split("/")
        .slice(0, specifier.startsWith("@") ? 2 : 1)
        .join("/");
      if (workspaceNames.has(name)) {
        const dir = workspacePackages.get(name);
        expect(dir, `${path} imports ${specifier}, but ${name} is not in the image`).toBeDefined();
        const target = exportTarget(
          json(runner, `${dir}/package.json`)!,
          `.${specifier.slice(name.length)}`,
        );
        expect(target, `${name} does not export ${specifier}`).toBeDefined();
        const file = posix.join(dir!, target!);
        expect(runner.files.has(file), `${file} is not in the image`).toBe(true);
        if (file.endsWith(".ts"))
          expect(loaders, `${file} needs a TypeScript loader`).not.toEqual([]);
        queue.push(file);
      } else if (under(path, build)) {
        expect(serverDeps, `${path} imports ${name}`).toContain(name);
      }
    }
  }
  for (const loader of loaders) expect(serverDeps).toContain(loader);
  expectProductionDependencies(generated, image, appRoot);
}

/** Whether the generated server source registers a GET handler for `path`. */
function serverServes(generated: Generated, path: string): boolean {
  const literal = `["'\`]${path.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}["'\`]`;
  const routePatterns = [
    new RegExp(`\\.(?:get|all|openapi)\\(\\s*${literal}`),
    new RegExp(`\\bpath:\\s*${literal}`),
  ];
  for (const [file, content] of generated.files) {
    if (!file.startsWith("apps/server/") || !/\.(ts|mts)$/.test(file)) continue;
    if (routePatterns.some((pattern) => pattern.test(content))) return true;
    // Nitro file routes and NestJS controllers.
    const nitroRoute = path === "/" ? "index" : path.slice(1);
    if (new RegExp(`^apps/server/routes/${nitroRoute}(?:\\.get)?\\.ts$`).test(file)) return true;
    if (path === "/" && /@Controller\(\s*\)[\s\S]*@Get\(\s*\)/.test(content)) return true;
    if (new RegExp(`@Get\\(\\s*${literal}`).test(content)) return true;
  }
  return false;
}

function healthCheckPaths(generated: Generated): Record<string, string | undefined> {
  return {
    fly: generated.files.get("apps/server/fly.toml")?.match(/path = "([^"]+)"/)?.[1],
    railway: generated.files
      .get("apps/server/railway.toml")
      ?.match(/healthcheckPath = "([^"]+)"/)?.[1],
    render: generated.files.get("render.yaml")?.match(/healthCheckPath: (\S+)/)?.[1],
  };
}

describe("generated server production start", () => {
  for (const backend of TSDOWN_BACKENDS) {
    for (const runtime of RUNTIMES) {
      test(`${backend} on ${runtime}: start script and image CMD run an emitted file`, async () => {
        for (const packageManager of PACKAGE_MANAGERS) {
          const generated = await generate({
            backend,
            runtime,
            packageManager,
            serverDeploy: "docker",
          });
          const pkg = JSON.parse(read(generated, "apps/server/package.json"));
          expect(emittedServerFiles(generated)).toContain(serverCommandTarget(pkg.scripts.start));

          const image = modelServerImage(generated);
          expect(image.runner.cmd?.[0]).toBe(runtime);
          expectRunnable(generated, image, image.runner.cmd!);
        }
      });
    }
  }

  test("AdonisJS images carry the workspace packages its compiled output imports", async () => {
    const stacks: Partial<ProjectConfig>[] = [
      {},
      { api: "trpc", database: "postgres", orm: "prisma" },
      ADONIS_PRISMA_AUTH,
      { api: "orpc", database: "sqlite", orm: "drizzle" },
    ];
    for (const stack of stacks) {
      for (const packageManager of PACKAGE_MANAGERS) {
        const generated = await generate({
          backend: "adonisjs",
          runtime: "node",
          packageManager,
          serverDeploy: "docker",
          ...stack,
        });
        const image = modelServerImage(generated);
        expect(image.runner.cmd!.at(-1)).toBe("bin/server.js");
        expect(image.workdir).toBe("/app/apps/server/build");
        expect(image.runner.files.has("/app/apps/server/build/bin/server.js")).toBe(true);
        expectCompiledImportsResolve(generated, image, "build");
      }
    }
  });

  test("Nitro images run the self-contained output the Nitro build writes", async () => {
    for (const runtime of RUNTIMES) {
      for (const packageManager of PACKAGE_MANAGERS) {
        const generated = await generate({
          backend: "nitro",
          runtime,
          packageManager,
          serverDeploy: "docker",
        });
        const image = modelServerImage(generated);
        const target = posix.join(image.workdir, image.runner.cmd!.at(-1)!);
        expect(target).toBe("/app/apps/server/.output/server/index.mjs");
        expect(image.runner.files.has(target)).toBe(true);
      }
    }
  });

  for (const database of DATABASES) {
    test(`Prisma with ${database}: the image generates its client without the local .env`, async () => {
      for (const packageManager of PACKAGE_MANAGERS) {
        const generated = await generate({
          backend: "hono",
          runtime: "node",
          packageManager,
          database,
          orm: "prisma",
          serverDeploy: "docker",
        });
        // The local .env is excluded from the build context.
        expect(dockerignoreMatcher(generated)("apps/server/.env")).toBe(true);
        const image = modelServerImage(generated);
        expectRunnable(generated, image, image.runner.cmd!);
        // The placeholder stays in the builder stage.
        expect(image.runner.env.has("DATABASE_URL")).toBe(false);
      }
    });
  }

  test("native SQLite drivers are built by the production install", async () => {
    const drivers = { kysely: "better-sqlite3", typeorm: "better-sqlite3", sequelize: "sqlite3" };
    for (const [orm, driver] of Object.entries(drivers) as [keyof typeof drivers, string][]) {
      for (const packageManager of PACKAGE_MANAGERS) {
        const generated = await generate({
          backend: "hono",
          runtime: "node",
          packageManager,
          database: "sqlite",
          orm,
          serverDeploy: "docker",
        });
        const image = modelServerImage(generated);
        expectRunnable(generated, image, image.runner.cmd!);
        for (const source of image.dependencySources) {
          expect(source.installs.at(-1)!.packages).toContain(driver);
        }
      }
    }
  });

  test("vite-plus projects build an image without dev tools in the production install", async () => {
    for (const packageManager of PACKAGE_MANAGERS) {
      const generated = await generate({
        backend: "hono",
        runtime: "node",
        packageManager,
        addons: ["vite-plus"],
        serverDeploy: "docker",
      });
      const root = JSON.parse(read(generated, "package.json")) as PackageJson;
      expect(root.scripts?.prepare).toStartWith("vp ");
      const image = modelServerImage(generated);
      expectRunnable(generated, image, image.runner.cmd!);
    }
  });

  for (const gitHooks of ["husky", "lefthook"] as const) {
    test(`${gitHooks} projects build an image without dev tools in the production install`, async () => {
      for (const packageManager of PACKAGE_MANAGERS) {
        const generated = await generateOnDisk({
          projectName: `image-${gitHooks}-${packageManager}`,
          frontend: ["none"],
          backend: "hono",
          runtime: "node",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          addons: [gitHooks],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "docker",
          packageManager,
        });
        const root = JSON.parse(read(generated, "package.json")) as PackageJson;
        if (gitHooks === "husky") expect(root.scripts?.prepare).toBe("husky");
        const image = modelServerImage(generated);
        expectRunnable(generated, image, image.runner.cmd!);
      }
    });
  }

  test("the model rejects a build step that does not run the server build", async () => {
    const generated = await generate({
      backend: "hono",
      runtime: "node",
      packageManager: "pnpm",
      serverDeploy: "docker",
    });
    const dockerfile = read(generated, "apps/server/Dockerfile");
    expect(() =>
      modelServerImage(
        generated,
        dockerfile.replace("RUN pnpm --filter server build", "RUN echo server build"),
      ),
    ).toThrow("cannot interpret RUN echo server build");
    const broken = generated.files
      .get("apps/server/package.json")!
      .replace('"build": "tsdown"', '"build": "echo tsdown"');
    expect(() =>
      modelServerImage({
        ...generated,
        files: new Map(generated.files).set("apps/server/package.json", broken),
      }),
    ).toThrow(/"echo tsdown"/);
  });

  test("the model rejects images that drop a lifecycle-script or AdonisJS step", async () => {
    const prisma = await generate({
      backend: "hono",
      runtime: "node",
      packageManager: "pnpm",
      database: "postgres",
      orm: "prisma",
      serverDeploy: "docker",
    });
    const withScripts = read(prisma, "apps/server/Dockerfile").replace(
      /^RUN node -e '[^']*'\n/m,
      "",
    );
    expect(() => modelServerImage(prisma, withScripts)).toThrow(
      /postinstall script "prisma generate" needs prisma/,
    );

    const adonis = await generate({ ...ADONIS_PRISMA_AUTH, packageManager: "pnpm" });
    const dockerfile = read(adonis, "apps/server/Dockerfile");
    const resolve = (mutated: string) => () =>
      expectCompiledImportsResolve(adonis, modelServerImage(adonis, mutated), "build");
    expect(resolve(dockerfile)).not.toThrow();
    expect(resolve(dockerfile.replace("COPY --from=deps /app/packages ./packages\n", ""))).toThrow(
      /is not in the image/,
    );
    expect(
      resolve(dockerfile.replace(/^COPY --from=builder \/app\/packages\/db\/prisma\/.*\n/m, "")),
    ).toThrow(/generated\/client\.js, which is not in the image/);
    expect(resolve(dockerfile.replace('"--import", "tsx", ', ""))).toThrow(/TypeScript/);
  });

  test("every container deploy target builds the shared image from the repository root", async () => {
    for (const serverDeploy of ["docker", "fly", "railway", "render"] as const) {
      const generated = await generate({ backend: "hono", runtime: "node", serverDeploy });
      const image = modelServerImage(generated);
      expectRunnable(generated, image, image.runner.cmd!);

      if (serverDeploy === "docker") {
        const compose = read(generated, "docker-compose.yml");
        expect(compose).toMatch(/server:\n\s+build:\n\s+context: \.\n\s+dockerfile: (\S+)/);
        expect(
          generated.files.has(
            compose.match(/server:\n\s+build:\n\s+context: \.\n\s+dockerfile: (\S+)/)![1]!,
          ),
        ).toBe(true);
      }
      if (serverDeploy === "fly") {
        // fly deploy --config apps/server/fly.toml resolves the Dockerfile next to fly.toml.
        const dockerfile = read(generated, "apps/server/fly.toml").match(
          /dockerfile = "([^"]+)"/,
        )![1]!;
        expect(generated.files.has(posix.join("apps/server", dockerfile))).toBe(true);
      }
      if (serverDeploy === "railway") {
        const railway = read(generated, "apps/server/railway.toml");
        expect(generated.files.has(railway.match(/dockerfilePath = "([^"]+)"/)![1]!)).toBe(true);
        const startCommand = railway.match(/startCommand = "([^"]+)"/)?.[1];
        if (startCommand) expectRunnable(generated, image, startCommand.split(" "));
      }
      if (serverDeploy === "render") {
        const blueprint = read(generated, "render.yaml");
        expect(blueprint).toContain("dockerContext: .");
        expect(
          generated.files.has(blueprint.match(/dockerfilePath: \.\/(apps\/server\/\S+)/)![1]!),
        ).toBe(true);
      }
    }
  });

  // Encore allows no server deploy target.
  for (const backend of [...TSDOWN_BACKENDS, "adonisjs", "nitro"] as const) {
    test(`${backend}: every deploy health check probes a route the server serves`, async () => {
      const apis = [
        "none",
        "trpc",
        "orpc",
        "ts-rest",
        "garph",
        "graphql-yoga",
        "apollo-server",
        "openapi",
      ] as const;
      for (const api of apis) {
        const paths = new Set<string>();
        for (const serverDeploy of ["fly", "railway", "render"] as const) {
          const generated = await generate({ backend, runtime: "node", api, serverDeploy });
          const path = healthCheckPaths(generated)[serverDeploy];
          expect(path, `${backend}/${api}/${serverDeploy} has no health check`).toBeDefined();
          expect(serverServes(generated, path!), `${backend}/${api} does not serve ${path}`).toBe(
            true,
          );
          paths.add(path!);
        }
        expect(paths.size, `${backend}/${api} targets probe different paths`).toBe(1);
      }
    });
  }

  test("Encore with Compose runs the image encore build docker produces", async () => {
    // Encore allows no server deploy target, so Compose is the only container path.
    const generated = await generate({
      backend: "encore",
      runtime: "none",
      frontend: ["tanstack-router"],
      addons: ["docker-compose"],
    });
    expect(generated.files.has("apps/server/Dockerfile")).toBe(false);
    const compose = read(generated, "docker-compose.yml");
    expect(compose).not.toContain("apps/server/Dockerfile");
    expect(compose).toMatch(/  server:\n(?:\s+#.*\n)?\s+image: prod-start-server\n/);
    expect(read(generated, "README.md")).toContain("encore build docker prod-start-server");
  });

  test("Netlify functions import the file the server build emits", async () => {
    const generated = await generate({ backend: "hono", runtime: "node", serverDeploy: "netlify" });
    const functionPath = "apps/server/netlify/functions/api.mts";
    const specifier = read(generated, functionPath).match(/import app from "([^"]+)"/)![1]!;
    expect(emittedServerFiles(generated)).toContain(
      posix.join(posix.dirname(functionPath), specifier),
    );
  });

  for (const jobQueue of ["pg-boss", "hatchet"] as const) {
    test(`${jobQueue} worker runs an emitted file from the Compose image`, async () => {
      for (const runtime of RUNTIMES) {
        for (const packageManager of PACKAGE_MANAGERS) {
          const generated = await generate({
            backend: "hono",
            runtime,
            packageManager,
            database: "postgres",
            orm: "drizzle",
            jobQueue,
            addons: ["docker-compose"],
          });
          const pkg = JSON.parse(read(generated, "apps/server/package.json"));
          expect(emittedServerFiles(generated)).toContain(
            serverCommandTarget(pkg.scripts["jobs:worker:start"]),
          );

          const compose = read(generated, "docker-compose.yml");
          for (const service of ["server", "worker"]) {
            expect(compose).toMatch(
              new RegExp(
                `  ${service}:\\n    build:\\n      context: \\.\\n      dockerfile: apps/server/Dockerfile`,
              ),
            );
          }
          const image = modelServerImage(generated);
          expectRunnable(generated, image, image.runner.cmd!);
          const worker = compose.match(/  worker:[\s\S]*?command: (\[[^\]]+\])/)![1]!;
          expectRunnable(generated, image, JSON.parse(worker));
        }
      }
    });
  }
});
