import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  createCliDefaultProjectConfigBase,
  DEFAULT_STACK_SELECTION,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { afterAll, afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path, { resolve } from "node:path";

import { getCompatibilityExplanationResult } from "@/commands/stack/compatibility";
import {
  getStarterTrackRecommendation,
  getStarterTracksResult,
} from "@/commands/stack/starter-tracks";
import { buildBtsConfigForPersistence, readBtsConfig, writeBtsConfig } from "@/config/bts-config";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";
import { getProjectContext } from "@/project/project-context";

const clients: Client[] = [];
const roots: string[] = [];
const advertisedTools = new Set<string>();
const exercisedTools = new Set<string>();
const protocolErrors: Error[] = [];

async function callTool(client: Client, params: Parameters<Client["callTool"]>[0]) {
  exercisedTools.add(params.name);
  const result = await client.callTool(params);
  if (!result.isError && result.structuredContent !== undefined) {
    const text = result.content?.find((entry) => entry.type === "text");
    expect(text?.type).toBe("text");
    if (text?.type === "text") expect(JSON.parse(text.text)).toEqual(result.structuredContent);
  }
  return result;
}

afterAll(() => {
  expect([...exercisedTools].filter((name) => advertisedTools.has(name)).sort()).toEqual(
    [...advertisedTools].sort(),
  );
});

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
    command: process.env.BFS_MCP_TEST_BUILT === "1" ? "node" : process.execPath,
    args: [
      resolve(
        import.meta.dir,
        process.env.BFS_MCP_TEST_BUILT === "1" ? "../../dist/cli.mjs" : "../../src/cli.ts",
      ),
      "mcp",
    ],
    env: { ...process.env, BTS_TELEMETRY_DISABLED: "1" },
    stderr: "pipe",
  });

  clients.push(client);
  // oxlint-disable-next-line unicorn/prefer-add-event-listener -- MCP Client is not an EventTarget.
  client.onerror = (error) => protocolErrors.push(error);
  await client.connect(transport);
  const catalog = await client.listTools();
  for (const tool of catalog.tools) advertisedTools.add(tool.name);
  return client;
}

afterEach(async () => {
  await Promise.all(clients.splice(0).map((client) => client.close()));
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
  expect(protocolErrors.splice(0)).toEqual([]);
});

describe.each(["legacy", "modern"] as const)("Better Fullstack MCP %s protocol support", (mode) => {
  it("continues serving legacy MCP clients", async () => {
    const client = await connectClient("legacy");
    const tools = await client.listTools();

    expect(client.getProtocolEra()).toBe("legacy");
    expect(tools.tools.some((tool) => tool.name === "bfs_get_guidance")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_plan_gen")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_apply_gen")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_check_recipes")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_get_recipe_history")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_get_project_context")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_plan_registry_add")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_apply_registry_add")).toBe(true);
  });

  it("serves MCP 2026-07-28 clients", async () => {
    const client = await connectClient("modern");
    const tools = await client.listTools();
    const resources = await client.listResources();
    const stackOptions = await client.readResource({ uri: "docs://stack-options" });
    const evidenceLevels = await client.readResource({ uri: "docs://capability-evidence-levels" });
    const guidanceResult = await callTool(client, { name: "bfs_get_guidance", arguments: {} });
    const evidenceResult = await callTool(client, {
      name: "bfs_get_capability_evidence",
      arguments: { ecosystem: "rust", category: "rustWebFramework", optionId: "axum" },
    });
    const starterTracksResult = await callTool(client, {
      name: "bfs_list_starter_tracks",
      arguments: { runtime: "python", database: "postgres" },
    });
    const recommendationResult = await callTool(client, {
      name: "bfs_recommend_stack",
      arguments: { brief: "a secure Java API", projectName: "orders-api" },
    });

    expect(client.getProtocolEra()).toBe("modern");
    expect(client.getNegotiatedProtocolVersion()).toBe("2026-07-28");
    expect(tools.ttlMs).toBe(300_000);
    expect(tools.cacheScope).toBe("public");
    expect(tools.tools.some((tool) => tool.name === "bfs_get_guidance")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_get_capability_evidence")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "bfs_list_starter_tracks")).toBe(true);
    expect(resources.ttlMs).toBe(300_000);
    expect(resources.cacheScope).toBe("public");
    expect(resources.resources.some((resource) => resource.uri === "docs://stack-options")).toBe(
      true,
    );
    expect(
      resources.resources.some((resource) => resource.uri === "docs://capability-evidence-levels"),
    ).toBe(true);
    expect(guidanceResult.structuredContent?.lifecycleContract).toEqual({
      currentVersion: "2",
      supportedVersions: ["2"],
      unknownVersionBehavior:
        "Do not apply. Treat the structured mutation result as unsupported and require a compatible client.",
    });
    expect(stackOptions.ttlMs).toBe(300_000);
    expect(stackOptions.cacheScope).toBe("public");
    const evidenceContents = evidenceLevels.contents[0];
    expect(evidenceContents && "text" in evidenceContents).toBe(true);
    const evidenceReport = JSON.parse(
      evidenceContents && "text" in evidenceContents ? evidenceContents.text : "{}",
    ) as { levels?: Array<{ id?: string }> };
    expect(evidenceReport.levels?.map((level) => level.id)).toEqual(CAPABILITY_EVIDENCE_LEVEL_IDS);
    expect(evidenceResult.structuredContent?.summary).toMatchObject({ totalOptions: 1 });
    expect(evidenceResult.structuredContent?.inventory).toEqual([
      expect.objectContaining({
        id: "rust:rustWebFramework:axum",
        evidenceLevel: "listed",
        freshness: "unverified",
      }),
    ]);
    expect(starterTracksResult.structuredContent).toEqual(
      getStarterTracksResult({ filters: { runtime: "python", database: "postgres" } }),
    );
    expect(recommendationResult.structuredContent).toEqual(
      getStarterTrackRecommendation({
        brief: "a secure Java API",
        projectName: "orders-api",
      }),
    );
  });

  it("keeps project creation output off the JSON-RPC stream", async () => {
    const client = await connectClient(mode);
    const targetDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-create-"));
    roots.push(targetDir);

    const result = await callTool(client, {
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

    expect(result.isError, JSON.stringify(result.content)).not.toBe(true);
    expect(await fs.pathExists(path.join(targetDir, "silent-create", "bts.jsonc"))).toBe(true);
  });

  it.each(["solid", "solid-start"])("plans and creates a %s project", async (frontend) => {
    const client = await connectClient(mode);
    const targetDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-solid-"));
    roots.push(targetDir);
    const input = {
      projectName: "solid-app",
      frontend: [frontend],
      backend: "none",
      runtime: "none",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
      payments: "none",
      packageManager: "bun",
      cssFramework: "none",
      uiLibrary: "none",
      forms: "none",
      validation: "none",
      testing: "none",
      animation: "none",
      effect: "none",
      examples: [],
      aiDocs: [],
      part: [],
      versionChannel: "stable",
    };
    const planned = await callTool(client, { name: "bfs_plan_project", arguments: input });
    expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
    const created = await callTool(client, {
      name: "bfs_create_project",
      arguments: { ...input, targetDir },
    });
    expect(created.isError, JSON.stringify(created.content)).not.toBe(true);
    expect(created.structuredContent?.stackPartSpecs).toEqual(
      planned.structuredContent?.stackPartSpecs,
    );
    const projectDir = path.join(targetDir, "solid-app");
    expect((await readBtsConfig(projectDir))?.frontend).toEqual([frontend]);
    const manifest = await fs.readJson(path.join(projectDir, "apps/web/package.json"));
    expect(manifest.dependencies["solid-js"]).toBeString();
  });

  it("reads every advertised resource and discovers schema options and presets", async () => {
    const client = await connectClient(mode);
    const resources = await client.listResources();
    expect(resources.resources.length).toBeGreaterThan(0);
    for (const resource of resources.resources) {
      const result = await client.readResource({ uri: resource.uri });
      expect(result.contents[0]?.uri).toBe(resource.uri);
      const content = result.contents[0];
      expect(content && "text" in content && content.text.length > 0).toBe(true);
      if (resource.mimeType === "application/json" && content && "text" in content) {
        expect(JSON.parse(content.text)).toBeObject();
      }
    }
    const schema = await callTool(client, { name: "bfs_get_schema", arguments: {} });
    expect(schema.isError, JSON.stringify(schema.content)).not.toBe(true);
    expect(schema.structuredContent?.categories).toBeObject();
    const presets = await callTool(client, { name: "bfs_list_presets", arguments: {} });
    expect(presets.isError, JSON.stringify(presets.content)).not.toBe(true);
    expect(presets.content?.[0]).toMatchObject({ type: "text" });
    await expect(client.readResource({ uri: "docs://missing" })).rejects.toThrow();
  });

  it.each(["typescript", "react-native", "rust", "go", "python", "java", "dotnet", "elixir"])(
    "plans and creates %s with matching graph metadata and no install side effects",
    async (ecosystem) => {
      const client = await connectClient(mode);
      const targetDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-ecosystem-"));
      roots.push(targetDir);
      const input = { projectName: "app", ecosystem, packageManager: "bun" };
      const planned = await callTool(client, { name: "bfs_plan_project", arguments: input });
      expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
      expect(await fs.readdir(targetDir)).toEqual([]);
      const created = await callTool(client, {
        name: "bfs_create_project",
        arguments: { ...input, targetDir },
      });
      expect(created.isError, JSON.stringify(created.content)).not.toBe(true);
      expect(created.structuredContent?.success).toBe(true);
      expect(created.structuredContent?.stackPartSpecs).toEqual(
        planned.structuredContent?.stackPartSpecs,
      );
      const projectDir = path.join(targetDir, "app");
      expect(await fs.pathExists(path.join(projectDir, "bts.jsonc"))).toBe(true);
      expect(await fs.pathExists(path.join(projectDir, "bts.lock.json"))).toBe(true);
      expect(await fs.pathExists(path.join(projectDir, "node_modules"))).toBe(false);
      expect(await fs.pathExists(path.join(projectDir, ".git"))).toBe(false);
    },
  );

  it("rejects invalid creates and preserves existing files after a duplicate create", async () => {
    const client = await connectClient(mode);
    const targetDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-create-errors-"));
    roots.push(targetDir);
    for (const args of [
      {},
      { projectName: "../escape" },
      { projectName: "app", ecosystem: "invalid" },
      { projectName: "app", frontend: "react-vite" },
      { projectName: "app", targetDir: `${targetDir}/../escape` },
    ]) {
      const rejected = await callTool(client, {
        name: "bfs_create_project",
        arguments: { targetDir, ...args },
      });
      expect(rejected.isError, JSON.stringify(rejected.content)).toBe(true);
    }
    expect(await fs.readdir(targetDir)).toEqual([]);
    const input = { projectName: "app", targetDir };
    expect(
      (await callTool(client, { name: "bfs_create_project", arguments: input })).isError,
    ).not.toBe(true);
    const sentinel = path.join(targetDir, "app", "user-content.txt");
    await fs.writeFile(sentinel, "keep my work");
    const before = await fs.readFile(path.join(targetDir, "app", "bts.jsonc"), "utf8");
    const duplicate = await callTool(client, { name: "bfs_create_project", arguments: input });
    expect(duplicate.isError, JSON.stringify(duplicate.content)).toBe(true);
    expect(await fs.readFile(sentinel, "utf8")).toBe("keep my work");
    expect(await fs.readFile(path.join(targetDir, "app", "bts.jsonc"), "utf8")).toBe(before);
    await expect(client.callTool({ name: "bfs_missing_tool", arguments: {} })).rejects.toThrow();
    expect((await callTool(client, { name: "bfs_get_guidance", arguments: {} })).isError).not.toBe(
      true,
    );
  });

  it("adds tooling and applies stack changes through discovered output schemas", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-stack-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, { addons: ["turborepo"] });
    const part = ["workspaceRunner:universal:nx"];
    const addition = await callTool(client, {
      name: "bfs_plan_addition",
      arguments: { projectDir, part },
    });
    expect(addition.isError, JSON.stringify(addition.content)).not.toBe(true);
    expect(addition.structuredContent?.filesToRemove).toContain("turbo.json");
    expect(addition.structuredContent?.installCommand).toBeString();
    const added = await callTool(client, {
      name: "bfs_add_feature",
      arguments: { projectDir, part },
    });
    expect(added.isError, JSON.stringify(added.content)).not.toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "nx.json"))).toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "turbo.json"))).toBe(false);
    const args = { projectDir, aiDocs: ["cursorrules"] };
    const plan = await callTool(client, { name: "bfs_plan_stack_update", arguments: args });
    expect(plan.isError, JSON.stringify(plan.content)).not.toBe(true);
    expect(plan.structuredContent).not.toHaveProperty("preimages");
    const applied = await callTool(client, { name: "bfs_apply_stack_update", arguments: args });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    expect((await readBtsConfig(projectDir))?.aiDocs).toEqual([
      "claude-md",
      "agents-md",
      "cursorrules",
    ]);
    expect(await fs.pathExists(path.join(projectDir, ".cursorrules"))).toBe(true);
  });

  it("adopts, updates, verifies and recovers an existing project with reviewed tokens", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-update-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, {});
    await fs.remove(path.join(projectDir, "bts.lock.json"));
    const before = await fs.readFile(path.join(projectDir, "package.json"), "utf8");
    const adoption = await callTool(client, {
      name: "bfs_plan_project_adoption",
      arguments: { projectDir },
    });
    expect(adoption.isError, JSON.stringify(adoption.content)).not.toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "bts.lock.json"))).toBe(false);
    const adopted = await callTool(client, {
      name: "bfs_confirm_project_adoption",
      arguments: { projectDir, confirmationToken: adoption.structuredContent?.confirmationToken },
    });
    expect(adopted.isError, JSON.stringify(adopted.content)).not.toBe(true);
    const status = await callTool(client, {
      name: "bfs_get_project_status",
      arguments: { projectDir },
    });
    expect(status.isError, JSON.stringify(status.content)).not.toBe(true);
    expect(status.structuredContent?.prerequisites).toMatchObject({ manifest: { present: true } });
    const plan = await callTool(client, {
      name: "bfs_plan_project_update",
      arguments: { projectDir },
    });
    expect(plan.isError, JSON.stringify(plan.content)).not.toBe(true);
    expect(plan.structuredContent?.reviewToken).toBeString();
    const refused = await callTool(client, {
      name: "bfs_apply_project_update",
      arguments: { projectDir, reviewToken: "0".repeat(64), acknowledgeUnprovenManifestV1: true },
    });
    expect(refused.isError, JSON.stringify(refused.content)).toBe(true);
    const applied = await callTool(client, {
      name: "bfs_apply_project_update",
      arguments: {
        projectDir,
        reviewToken: plan.structuredContent?.reviewToken,
        acknowledgeUnprovenManifestV1: true,
      },
    });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    const transactionId = applied.structuredContent?.recoveryId;
    expect(transactionId).toBeString();
    const points = await callTool(client, {
      name: "bfs_list_project_recovery_points",
      arguments: { projectDir },
    });
    expect(points.isError, JSON.stringify(points.content)).not.toBe(true);
    expect(points.structuredContent?.points).toContainEqual(
      expect.objectContaining({ id: transactionId }),
    );
    for (const name of ["bfs_get_project_recovery_point", "bfs_verify_project_recovery_point"]) {
      const point = await callTool(client, { name, arguments: { projectDir, transactionId } });
      expect(point.isError, JSON.stringify(point.content)).not.toBe(true);
      expect(point.structuredContent?.verification).toMatchObject({
        valid: true,
        recoverable: true,
      });
    }
    const recovered = await callTool(client, {
      name: "bfs_recover_project_transaction",
      arguments: { projectDir, transactionId },
    });
    expect(recovered.isError, JSON.stringify(recovered.content)).not.toBe(true);
    expect(await fs.readFile(path.join(projectDir, "package.json"), "utf8")).toBe(before);
    const prune = await callTool(client, {
      name: "bfs_prune_project_recovery_points",
      arguments: { projectDir, keep: 0, olderThanDays: 0 },
    });
    expect(prune.isError, JSON.stringify(prune.content)).not.toBe(true);
    const pruned = await callTool(client, {
      name: "bfs_prune_project_recovery_points",
      arguments: {
        projectDir,
        keep: 0,
        olderThanDays: 0,
        apply: true,
        reviewToken: prune.structuredContent?.prune?.reviewToken,
      },
    });
    expect(pruned.isError, JSON.stringify(pruned.content)).not.toBe(true);
    expect(pruned.structuredContent?.prune?.pruned).toContain(transactionId);
    // A missing project must fail before attempting generated toolchain commands.
    const checked = await callTool(client, {
      name: "bfs_check_project",
      arguments: { projectDir: path.join(root, "missing") },
    });
    expect(checked.isError, JSON.stringify(checked.content)).toBe(true);
    expect(checked.structuredContent?.ok).toBe(false);
  });

  it("returns shared compatibility reasons and replacement suggestions", async () => {
    const client = await connectClient(mode);
    const result = await callTool(client, {
      name: "bfs_check_compatibility",
      arguments: {
        ecosystem: "go",
        goWebFramework: "gin",
        search: "algolia",
      },
    });
    const structured = result.structuredContent as
      | {
          issues?: Array<{
            category?: string;
            message?: string;
            suggestions?: string[];
            explanation?: unknown;
          }>;
        }
      | undefined;
    const issue = structured?.issues?.find((candidate) => candidate.category === "search");

    expect(result.isError, JSON.stringify(result.content)).not.toBe(true);
    expect(issue?.message).toBe(
      "Search must use Meilisearch or an ecosystem-native option for non-TypeScript backends",
    );
    expect(issue?.suggestions).toEqual(["Use 'meilisearch'", "Use 'bleve'"]);
    expect(issue?.explanation).toEqual(
      getCompatibilityExplanationResult(
        {
          ...DEFAULT_STACK_SELECTION,
          ecosystem: "go",
          goWebFramework: "gin",
          search: "algolia",
        },
        "search",
        "algolia",
      ).explanation,
    );
  });

  it("plans additions with the mutation options the apply path uses", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-plan-addition-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, { addons: ["turborepo"] });

    const result = await callTool(client, {
      name: "bfs_plan_addition",
      arguments: { projectDir, part: ["workspaceRunner:universal:nx"] },
    });

    expect(result.isError, JSON.stringify(result.content)).not.toBe(true);
    expect(result.structuredContent?.filesToRemove).toContain("turbo.json");
  });

  it("does not borrow capability evidence from another ecosystem", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-context-evidence-"));
    roots.push(projectDir);
    const config = {
      ...createCliDefaultProjectConfigBase(),
      projectName: "context-evidence",
      projectDir,
      relativePath: ".",
      ecosystem: "go",
      goWebFramework: "gin",
      git: false,
      install: false,
      stackParts: parseStackPartSpecs(["backend:go:gin", "database:universal:sqlite"]),
    } as ProjectConfig;
    await writeBtsConfig(config);

    const context = await getProjectContext(projectDir);

    expect(context.evidence.selected).toContainEqual({
      partId: "database:universal:sqlite",
      evidence: null,
    });
  });

  it("plans and applies graph config drift repair with the exact MCP token", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-doctor-fix-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      stackParts: parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "backend:typescript:hono",
        "backend.runtime:typescript:bun",
      ]),
    });
    const configPath = path.join(projectDir, "bts.jsonc");
    const drifted = (await fs.readFile(configPath, "utf-8")).replace(
      '"backend": "hono"',
      '"backend": "express"',
    );
    await fs.writeFile(configPath, drifted, "utf-8");

    const planned = await callTool(client, {
      name: "bfs_plan_doctor_fix",
      arguments: { projectDir },
    });
    const plan = planned.structuredContent as
      | { reviewToken?: string; changed?: boolean; lifecycle?: { operation?: string } }
      | undefined;
    expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
    expect(plan?.changed).toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(plan?.lifecycle?.operation).toBe("doctor-fix");

    const applied = await callTool(client, {
      name: "bfs_apply_doctor_fix",
      arguments: { projectDir, reviewToken: plan?.reviewToken },
    });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    expect(applied.structuredContent?.recoveryId).toBeString();
    expect((await readBtsConfig(projectDir))?.backend).toBe("hono");
  });

  it("plans and applies Primary Role replacement through MCP", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-primary-replace-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      stackParts: parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "frontend.css:typescript:tailwind",
        "backend:typescript:hono",
        "backend.runtime:typescript:bun",
      ]),
    });

    const planned = await callTool(client, {
      name: "bfs_plan_primary_role_replacement",
      arguments: {
        projectDir,
        target: "frontend:typescript:react-vite",
        replacement: "frontend:typescript:next",
      },
    });
    const plan = planned.structuredContent as
      | {
          reviewToken?: string;
          primaryReplacement?: { rewiredDependentParts?: string[] };
          lifecycle?: { operation?: string };
        }
      | undefined;
    expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(plan?.primaryReplacement?.rewiredDependentParts).toEqual([
      "frontend.css:typescript:tailwind",
    ]);
    expect(plan?.lifecycle?.operation).toBe("replace");

    const applied = await callTool(client, {
      name: "bfs_apply_primary_role_replacement",
      arguments: {
        projectDir,
        target: "frontend:typescript:react-vite",
        replacement: "frontend:typescript:next",
        reviewToken: plan?.reviewToken,
        acknowledgeArchitectureChange: true,
      },
    });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    expect(applied.structuredContent?.recoveryId).toBeString();
    const config = await readBtsConfig(projectDir);
    expect(
      config?.stackParts?.find((part) => part.role === "frontend" && !part.ownerPartId)?.toolId,
    ).toBe("next");
  });

  it("projects part-removal results to the declared MCP schema", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-part-removal-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      stackParts: parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "frontend.css:typescript:tailwind",
        "backend:typescript:hono",
        "backend.runtime:typescript:bun",
      ]),
    });

    const planned = await callTool(client, {
      name: "bfs_plan_part_removal",
      arguments: { projectDir, target: "frontend.css:typescript:tailwind" },
    });
    const plan = planned.structuredContent as { reviewToken?: string } | undefined;
    expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(planned.structuredContent).not.toHaveProperty("filesUnchanged");
    expect(planned.structuredContent).not.toHaveProperty("operations");
    expect(planned.structuredContent).not.toHaveProperty("preimages");
    expect(planned.structuredContent).not.toHaveProperty("versionChannelRewrites");

    const applied = await callTool(client, {
      name: "bfs_apply_part_removal",
      arguments: {
        projectDir,
        target: "frontend.css:typescript:tailwind",
        reviewToken: plan?.reviewToken,
      },
    });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    expect(applied.structuredContent).not.toHaveProperty("filesUnchanged");
    expect(applied.structuredContent).not.toHaveProperty("operations");
    expect(applied.structuredContent).not.toHaveProperty("preimages");
    expect(applied.structuredContent).not.toHaveProperty("versionChannelRewrites");
  });

  it("plans and applies in-project generation through the shared lifecycle contract", async () => {
    const client = await connectClient(mode);
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-gen-"));
    roots.push(root);
    const projectDir = path.join(root, "app");
    await scaffoldProject(projectDir, {
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
    });

    const planned = await callTool(client, {
      name: "bfs_plan_gen",
      arguments: { projectDir, kind: "resource", name: "post" },
    });
    const plan = planned.structuredContent as
      | { reviewToken?: string; files?: unknown[]; lifecycle?: { contractVersion?: string } }
      | undefined;
    expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(plan?.files?.length).toBeGreaterThanOrEqual(7);
    expect(plan?.lifecycle?.contractVersion).toBe("2");

    const applied = await callTool(client, {
      name: "bfs_apply_gen",
      arguments: {
        projectDir,
        kind: "resource",
        name: "post",
        reviewToken: plan?.reviewToken,
      },
    });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "packages/api/src/routers/post.ts"))).toBe(
      true,
    );

    const checked = await callTool(client, {
      name: "bfs_check_recipes",
      arguments: { projectDir, name: "post" },
    });
    expect(checked.isError, JSON.stringify(checked.content)).not.toBe(true);
    expect(checked.structuredContent?.recipes).toEqual([
      expect.objectContaining({ recipeId: "typescript-resource:post", ok: true }),
    ]);

    const history = await callTool(client, {
      name: "bfs_get_recipe_history",
      arguments: { projectDir },
    });
    expect(history.isError, JSON.stringify(history.content)).not.toBe(true);
    expect(history.structuredContent?.recipes).toEqual([
      expect.objectContaining({
        recipeId: "typescript-resource:post",
        recoveryPoints: [expect.objectContaining({ operation: "gen", status: "applied" })],
      }),
    ]);

    const context = await callTool(client, {
      name: "bfs_get_project_context",
      arguments: { projectDir },
    });
    expect(context.isError, JSON.stringify(context.content)).not.toBe(true);
    expect(context.structuredContent).toEqual(await getProjectContext(projectDir));
    const contextCommands = context.structuredContent?.commands ?? [];
    const safeNextActions = context.structuredContent?.safeNextActions ?? [];
    for (const entry of [...contextCommands, ...safeNextActions]) {
      expect(entry.command).toContain(projectDir);
    }
    expect(contextCommands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "project-check",
          command: `create-better-fullstack check ${projectDir} --json`,
        }),
      ]),
    );
    for (const entry of [...contextCommands, ...safeNextActions]) {
      expect(entry.command).not.toContain("--run-checks");
    }

    const fixtureDir = path.join(import.meta.dir, "..", "fixtures", "registry", "project");
    const fixtureContext = await getProjectContext(fixtureDir);
    const fixtureProjectPath = `./${path.relative(process.cwd(), fixtureDir).split(path.sep).join("/")}`;
    for (const entry of [...fixtureContext.commands, ...fixtureContext.safeNextActions]) {
      expect(entry.command).toContain(fixtureProjectPath);
    }
    expect(fixtureContext.commands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "status",
          command: `create-better-fullstack status ${fixtureProjectPath} --json`,
        }),
      ]),
    );
  });

  it("plans and applies a local registry pack without running a package manager", async () => {
    const client = await connectClient(mode);
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-registry-"));
    roots.push(projectDir);
    const registryFixtures = path.join(import.meta.dir, "..", "fixtures", "registry");
    await fs.copy(path.join(registryFixtures, "project"), projectDir);
    const source = path.join(registryFixtures, "sample-pack");

    const planned = await callTool(client, {
      name: "bfs_plan_registry_add",
      arguments: { projectDir, source },
    });
    const plan = planned.structuredContent as
      | {
          reviewToken?: string;
          lifecycle?: {
            contractVersion?: string;
            sideEffects?: Array<{ kind?: string; status?: string }>;
          };
        }
      | undefined;
    expect(planned.isError, JSON.stringify(planned.content)).not.toBe(true);
    expect(plan?.reviewToken).toStartWith("v2.");
    expect(plan?.lifecycle?.contractVersion).toBe("2");
    expect(plan?.lifecycle?.sideEffects).toContainEqual(
      expect.objectContaining({ kind: "package-manager", status: "manual" }),
    );

    const applied = await callTool(client, {
      name: "bfs_apply_registry_add",
      arguments: { projectDir, source, reviewToken: plan?.reviewToken },
    });
    expect(applied.isError, JSON.stringify(applied.content)).not.toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "apps/server/src/lib/rate-limit.ts"))).toBe(
      true,
    );
  });
});
