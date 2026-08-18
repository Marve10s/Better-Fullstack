import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path, { resolve } from "node:path";

import { buildBtsConfigForPersistence, writeBtsConfig } from "../src/utils/bts-config";
import { recordScaffoldManifest } from "../src/utils/scaffold-manifest";

const clients: Client[] = [];
const roots: string[] = [];

async function scaffoldProject(projectDir: string, overrides: Partial<ProjectConfig>) {
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: path.basename(projectDir),
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
    ...overrides,
  } as ProjectConfig;
  const persisted = buildBtsConfigForPersistence(config);
  const normalized = { ...config, ...persisted, projectDir, relativePath: "." } as ProjectConfig;
  const generated = await generateVirtualProject({
    config: normalized,
    templates: EMBEDDED_TEMPLATES,
  });
  if (!generated.success || !generated.tree) {
    throw new Error(generated.error ?? "Failed to generate fixture project");
  }
  await writeTreeToFilesystem(generated.tree, projectDir);
  await writeBtsConfig(normalized, {
    version: persisted.version,
    createdAt: persisted.createdAt,
  });
  await recordScaffoldManifest(projectDir);
}

async function connectClient(mode: "legacy" | "modern") {
  const client = new Client(
    { name: `better-fullstack-${mode}-test`, version: "1.0.0" },
    mode === "modern" ? { versionNegotiation: { mode: { pin: "2026-07-28" } } } : undefined,
  );
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [resolve(import.meta.dir, "../src/cli.ts"), "mcp"],
    stderr: "pipe",
  });

  clients.push(client);
  await client.connect(transport);
  return client;
}

afterEach(async () => {
  await Promise.all(clients.splice(0).map((client) => client.close()));
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

describe("Better Fullstack MCP protocol support", () => {
  it("continues serving legacy MCP clients", async () => {
    const client = await connectClient("legacy");
    const tools = await client.listTools();

    expect(client.getProtocolEra()).toBe("legacy");
    expect(tools.tools.some((tool) => tool.name === "bfs_get_guidance")).toBe(true);
  });

  it("serves MCP 2026-07-28 clients", async () => {
    const client = await connectClient("modern");
    const tools = await client.listTools();
    const resources = await client.listResources();
    const stackOptions = await client.readResource({ uri: "docs://stack-options" });

    expect(client.getProtocolEra()).toBe("modern");
    expect(client.getNegotiatedProtocolVersion()).toBe("2026-07-28");
    expect(tools.ttlMs).toBe(300_000);
    expect(tools.cacheScope).toBe("public");
    expect(tools.tools.some((tool) => tool.name === "bfs_get_guidance")).toBe(true);
    expect(resources.ttlMs).toBe(300_000);
    expect(resources.cacheScope).toBe("public");
    expect(resources.resources.some((resource) => resource.uri === "docs://stack-options")).toBe(
      true,
    );
    expect(stackOptions.ttlMs).toBe(300_000);
    expect(stackOptions.cacheScope).toBe("public");
  });

  it("keeps project creation output off the JSON-RPC stream", async () => {
    const client = await connectClient("modern");
    const targetDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-create-"));
    roots.push(targetDir);

    const result = await client.callTool({
      name: "bfs_create_project",
      arguments: {
        projectName: "silent-create",
        targetDir,
        ecosystem: "typescript",
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        packageManager: "bun",
      },
    });

    expect(result.isError).not.toBe(true);
    expect(await fs.pathExists(path.join(targetDir, "silent-create", "bts.jsonc"))).toBe(true);
  });

  it("plans additions with the mutation options the apply path uses", async () => {
    const client = await connectClient("modern");
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-plan-addition-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, { addons: ["turborepo"] });

    const result = await client.callTool({
      name: "bfs_plan_addition",
      arguments: { projectDir, part: ["workspaceRunner:universal:nx"] },
    });

    expect(result.isError).not.toBe(true);
    expect(result.structuredContent?.filesToRemove).toContain("turbo.json");
  });
});
