import type { VirtualFileTree } from "@better-fullstack/template-generator";
import type { ProjectConfig } from "@better-fullstack/types";

import {
  getVirtualTreeFileContent,
  listVirtualTreeFilePaths,
} from "@test/support/virtual-tree-utils";
import { describe, expect, test } from "bun:test";
import { posix } from "node:path";

import { createVirtual } from "@/index";

// These checks derive every expected path from the generated build configuration, so a start
// command, Dockerfile, or deploy config that drifts from what the server build emits fails here.

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

type Generated = { tree: VirtualFileTree; files: Set<string>; config: Partial<ProjectConfig> };

async function generate(config: Partial<ProjectConfig>): Promise<Generated> {
  const result = await createVirtual({ projectName: "prod-start", api: "none", ...config });
  expect(result.error).toBeUndefined();
  const tree = result.tree!;
  return { tree, files: new Set(listVirtualTreeFilePaths(tree)), config };
}

function read(generated: Generated, path: string): string {
  const content = getVirtualTreeFileContent(generated.tree, path);
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
    return /linker\s*=\s*"isolated"/.test(
      getVirtualTreeFileContent(generated.tree, "bunfig.toml") ?? "",
    );
  }
  if (packageManager === "pnpm") {
    return !/node-linker\s*=\s*hoisted/.test(
      getVirtualTreeFileContent(generated.tree, ".npmrc") ?? "",
    );
  }
  if (packageManager === "yarn") {
    expect(read(generated, ".yarnrc.yml")).toContain("nodeLinker: node-modules");
  }
  return false;
}

function dockerignoreMatcher(generated: Generated): (path: string) => boolean {
  const patterns = (getVirtualTreeFileContent(generated.tree, ".dockerignore") ?? "")
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

type Stage = { paths: Set<string>; workdir: string; productionInstall: boolean; cmd?: string[] };
type ImageModel = {
  runner: Stage;
  workdir: string;
  missingCopies: string[];
  dependencySources: Stage[];
};

/**
 * Walks the generated server Dockerfile with the repository root as build context. RUN steps are
 * modeled by their effect: installs create node_modules, the server build creates the files the
 * tsdown config emits, and `mkdir -p` creates its directory.
 */
function modelServerImage(generated: Generated): ImageModel {
  const ignored = dockerignoreMatcher(generated);
  const context = [...generated.files].filter((path) => !ignored(path));
  const emitted = emittedServerFiles(generated);
  const isolated = usesIsolatedLinker(generated);
  const stages = new Map<string, Stage>();
  const missingCopies: string[] = [];
  const dependencySources: Stage[] = [];
  let stage: Stage | undefined;

  const lines = read(generated, "apps/server/Dockerfile")
    .replace(/\\\n/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  for (const line of lines) {
    const [instruction, ...rest] = line.split(/\s+/);
    if (instruction === "FROM") {
      const parent = stages.get(rest[0]!);
      stage = {
        paths: new Set(parent?.paths),
        workdir: parent?.workdir ?? "/",
        productionInstall: parent?.productionInstall ?? false,
      };
      stages.set(rest[2] ?? rest[0]!, stage);
      continue;
    }
    if (!stage) throw new Error(`${line} appears before FROM`);
    const current = stage;
    const at = (path: string) => posix.resolve(current.workdir, path);

    if (instruction === "WORKDIR") current.workdir = at(rest[0]!);
    else if (instruction === "CMD") current.cmd = JSON.parse(rest.join(" "));
    else if (instruction === "RUN") {
      const command = rest.join(" ");
      if (
        /\b(bun install|pnpm install|npm ci|npm install|yarn install|yarn workspaces focus)\b/.test(
          command,
        )
      ) {
        current.paths.add(at("node_modules"));
        if (isolated) current.paths.add(at("apps/server/node_modules"));
        current.productionInstall = /--production|--prod\b|--omit=dev/.test(command);
      }
      if (/\bserver\b.*\bbuild\b|\bbuild\b.*\bserver\b/.test(command)) {
        for (const file of emitted) current.paths.add(at(file));
      }
      for (const match of command.matchAll(/mkdir -p (\S+)/g)) current.paths.add(at(match[1]!));
    } else if (instruction === "COPY") {
      const from = rest.find((token) => token.startsWith("--from="))?.slice("--from=".length);
      const [source, dest] = rest.filter((token) => !token.startsWith("--"));
      if (!from) {
        expect(`${source} ${dest}`).toBe(". .");
        for (const file of context) current.paths.add(at(file));
        continue;
      }
      const origin = stages.get(from)!;
      const sourcePaths = [...origin.paths].filter(
        (path) => path === source || path.startsWith(`${source}/`),
      );
      if (sourcePaths.length === 0) missingCopies.push(line);
      if (source!.endsWith("node_modules")) dependencySources.push(origin);
      for (const path of sourcePaths)
        current.paths.add(at(posix.join(dest!, posix.relative(source!, path))));
    }
  }

  return { runner: stage!, workdir: stage!.workdir, missingCopies, dependencySources };
}

/** Asserts the runner can execute `command` from its WORKDIR with production dependencies. */
function expectRunnable(generated: Generated, image: ImageModel, command: readonly string[]) {
  const emitted = emittedServerFiles(generated);
  const target = serverCommandTarget(command);
  expect(emitted).toContain(target);
  expect(image.workdir.endsWith("/apps/server")).toBe(true);
  const appRoot = image.workdir.slice(0, -"/apps/server".length);
  expect(image.runner.paths).toContain(posix.join(appRoot, target));

  // The server's dependencies resolve from the workspace's own node_modules under isolated
  // linkers, which link into the root store, and from the root under hoisting linkers.
  const required = usesIsolatedLinker(generated)
    ? ["apps/server/node_modules", "node_modules"]
    : ["node_modules"];
  for (const dir of required) expect(image.runner.paths).toContain(posix.join(appRoot, dir));
  expect(image.dependencySources.length).toBeGreaterThan(0);
  for (const source of image.dependencySources) expect(source.productionInstall).toBe(true);
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
          expect(image.missingCopies).toEqual([]);
          expect(image.runner.cmd?.[0]).toBe(runtime);
          expectRunnable(generated, image, image.runner.cmd!);
        }
      });
    }
  }

  test("every container deploy target builds the shared image from the repository root", async () => {
    for (const serverDeploy of ["docker", "fly", "railway", "render"] as const) {
      const generated = await generate({ backend: "hono", runtime: "node", serverDeploy });
      const image = modelServerImage(generated);
      expect(image.missingCopies).toEqual([]);
      expectRunnable(generated, image, image.runner.cmd!);

      if (serverDeploy === "docker") {
        const compose = read(generated, "docker-compose.yml");
        expect(compose).toMatch(/server:\n\s+build:\n\s+context: \.\n\s+dockerfile: (\S+)/);
        expect(generated.files).toContain(
          compose.match(/server:\n\s+build:\n\s+context: \.\n\s+dockerfile: (\S+)/)![1],
        );
      }
      if (serverDeploy === "fly") {
        // fly deploy --config apps/server/fly.toml resolves the Dockerfile next to fly.toml.
        const dockerfile = read(generated, "apps/server/fly.toml").match(
          /dockerfile = "([^"]+)"/,
        )![1]!;
        expect(generated.files).toContain(posix.join("apps/server", dockerfile));
      }
      if (serverDeploy === "railway") {
        const railway = read(generated, "apps/server/railway.toml");
        expect(generated.files).toContain(railway.match(/dockerfilePath = "([^"]+)"/)![1]);
        const startCommand = railway.match(/startCommand = "([^"]+)"/)?.[1];
        if (startCommand) expectRunnable(generated, image, startCommand.split(" "));
      }
      if (serverDeploy === "render") {
        const blueprint = read(generated, "render.yaml");
        expect(blueprint).toContain("dockerContext: .");
        expect(generated.files).toContain(
          blueprint.match(/dockerfilePath: \.\/(apps\/server\/\S+)/)![1],
        );
      }
    }
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
          expect(image.missingCopies).toEqual([]);
          expectRunnable(generated, image, image.runner.cmd!);
          const worker = compose.match(/  worker:[\s\S]*?command: (\[[^\]]+\])/)![1]!;
          expectRunnable(generated, image, JSON.parse(worker));
        }
      }
    });
  }
});
