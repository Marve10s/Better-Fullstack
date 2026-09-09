import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { z } from "zod";

const cliRoot = process.env.BFS_CLI_PACKAGE_ROOT
  ? resolve(process.env.BFS_CLI_PACKAGE_ROOT)
  : resolve(import.meta.dir, "../..");
const cliEntry = join(cliRoot, "dist/cli.mjs");
const env = { ...process.env, BTS_TELEMETRY_DISABLED: "1" };
let tempRoot: string;
let loaderPath: string;
let preloadPath: string;

beforeAll(async () => {
  tempRoot = await mkdtemp(join(tmpdir(), "bfs-startup-"));
  loaderPath = join(tempRoot, "startup-loader.mjs");
  preloadPath = join(tempRoot, "startup-preload.mjs");
  // Record ESM resolution attempts while allowing them to complete. Optional imports can
  // catch resolution errors, so a thrown error alone does not prove they were never tried.
  await writeFile(
    loaderPath,
    `export async function resolve(specifier, context, nextResolve) {
      const blocked = ["@better-fullstack/template-generator", "effect", "oxfmt", "ts-morph"];
      if (blocked.some((name) => specifier === name || specifier.startsWith(name + "/"))) {
        process.stderr.write("HEAVY_STARTUP_RESOLUTION:" + specifier + "\\n");
      }
      return nextResolve(specifier, context);
    }`,
  );
  // createRequire() bypasses ESM resolve hooks. Patch the CommonJS loader as well so the
  // same assertion covers trpc-cli's optional Effect fallback in a packed Node install.
  await writeFile(
    preloadPath,
    `import Module from "node:module";
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  const blocked = ["@better-fullstack/template-generator", "effect", "oxfmt", "ts-morph"];
  if (blocked.some((name) => request === name || request.startsWith(name + "/"))) {
    process.stderr.write("HEAVY_STARTUP_RESOLUTION:" + request + "\\n");
  }
  return originalLoad.call(this, request, parent, isMain);
};`,
  );
});

afterAll(async () => {
  if (tempRoot) await rm(tempRoot, { recursive: true, force: true });
});

function nodeArgs(entry: string, args: string[]) {
  return [
    "--no-warnings",
    "--import",
    preloadPath,
    "--experimental-loader",
    loaderPath,
    entry,
    ...args,
  ];
}

describe("CLI startup without generation dependencies (requires build:core)", () => {
  for (const args of [["--help"], ["create", "--help"], ["gen", "--help"], ["mcp", "--help"]]) {
    it(`serves ${args.join(" ")}`, () => {
      const result = spawnSync("node", nodeArgs(cliEntry, args), {
        env,
        encoding: "utf8",
        timeout: 20_000,
      });
      expect(result.error).toBeUndefined();
      expect(result.stderr).not.toContain("HEAVY_STARTUP_RESOLUTION:");
      expect(result.status).toBe(0);
      expect(result.stdout).toContain("Usage:");
    });
  }

  it("prints the package version", async () => {
    const packageJson = z
      .object({ version: z.string() })
      .parse(JSON.parse(await readFile(join(cliRoot, "package.json"), "utf8")));
    const result = spawnSync("node", nodeArgs(cliEntry, ["--version"]), {
      env,
      encoding: "utf8",
      timeout: 20_000,
    });
    expect(result.error).toBeUndefined();
    expect(result.stderr).not.toContain("HEAVY_STARTUP_RESOLUTION:");
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(packageJson.version);
  });
});

for (const entry of ["cli.mjs", "mcp-entry.mjs"]) {
  it(`serves MCP discovery and guidance from ${entry} without generation dependencies`, async () => {
    const client = new Client({ name: "startup-regression", version: "1.0.0" });
    const transport = new StdioClientTransport({
      command: "node",
      args: nodeArgs(join(cliRoot, "dist", entry), entry === "cli.mjs" ? ["mcp"] : []),
      env,
      stderr: "pipe",
    });
    let stderr = "";
    transport.stderr?.on("data", (chunk) => {
      stderr += String(chunk);
    });
    try {
      await client.connect(transport);
      const catalog = await client.listTools();
      expect(catalog.tools.some((tool) => tool.name === "bfs_create_project")).toBe(true);
      const resources = await client.listResources();
      expect(resources.resources.length).toBeGreaterThan(0);
      const guidance = await client.callTool({ name: "bfs_get_guidance", arguments: {} });
      expect(guidance.isError).not.toBe(true);
      expect(guidance.structuredContent).toBeDefined();
    } finally {
      await client.close();
    }
    expect(stderr).not.toContain("HEAVY_STARTUP_RESOLUTION:");
  }, 20_000);
}
