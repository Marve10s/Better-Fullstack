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
import { afterEach, describe, expect, it } from "bun:test";
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
    args: [resolve(import.meta.dir, "../../src/cli.ts"), "mcp"],
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
    const guidanceResult = await client.callTool({ name: "bfs_get_guidance", arguments: {} });
    const evidenceResult = await client.callTool({
      name: "bfs_get_capability_evidence",
      arguments: { ecosystem: "rust", category: "rustWebFramework", optionId: "axum" },
    });
    const starterTracksResult = await client.callTool({
      name: "bfs_list_starter_tracks",
      arguments: { runtime: "python", database: "postgres" },
    });
    const recommendationResult = await client.callTool({
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

  it("returns shared compatibility reasons and replacement suggestions", async () => {
    const client = await connectClient("modern");
    const result = await client.callTool({
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

    expect(result.isError).not.toBe(true);
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
      stackParts: parseStackPartSpecs([
        "backend:go:gin",
        "database:universal:sqlite",
      ]),
    } as ProjectConfig;
    await writeBtsConfig(config);

    const context = await getProjectContext(projectDir);

    expect(context.evidence.selected).toContainEqual({
      partId: "database:universal:sqlite",
      evidence: null,
    });
  });

  it("plans and applies graph config drift repair with the exact MCP token", async () => {
    const client = await connectClient("modern");
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

    const planned = await client.callTool({
      name: "bfs_plan_doctor_fix",
      arguments: { projectDir },
    });
    const plan = planned.structuredContent as
      | { reviewToken?: string; changed?: boolean; lifecycle?: { operation?: string } }
      | undefined;
    expect(planned.isError).not.toBe(true);
    expect(plan?.changed).toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(plan?.lifecycle?.operation).toBe("doctor-fix");

    const applied = await client.callTool({
      name: "bfs_apply_doctor_fix",
      arguments: { projectDir, reviewToken: plan?.reviewToken },
    });
    expect(applied.isError).not.toBe(true);
    expect(applied.structuredContent?.recoveryId).toBeString();
    expect((await readBtsConfig(projectDir))?.backend).toBe("hono");
  });

  it("plans and applies Primary Role replacement through MCP", async () => {
    const client = await connectClient("modern");
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

    const planned = await client.callTool({
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
    expect(planned.isError).not.toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(plan?.primaryReplacement?.rewiredDependentParts).toEqual([
      "frontend.css:typescript:tailwind",
    ]);
    expect(plan?.lifecycle?.operation).toBe("replace");

    const applied = await client.callTool({
      name: "bfs_apply_primary_role_replacement",
      arguments: {
        projectDir,
        target: "frontend:typescript:react-vite",
        replacement: "frontend:typescript:next",
        reviewToken: plan?.reviewToken,
        acknowledgeArchitectureChange: true,
      },
    });
    expect(applied.isError).not.toBe(true);
    expect(applied.structuredContent?.recoveryId).toBeString();
    const config = await readBtsConfig(projectDir);
    expect(
      config?.stackParts?.find((part) => part.role === "frontend" && !part.ownerPartId)?.toolId,
    ).toBe("next");
  });

  it("projects part-removal results to the declared MCP schema", async () => {
    const client = await connectClient("modern");
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

    const planned = await client.callTool({
      name: "bfs_plan_part_removal",
      arguments: { projectDir, target: "frontend.css:typescript:tailwind" },
    });
    const plan = planned.structuredContent as { reviewToken?: string } | undefined;
    expect(planned.isError).not.toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(planned.structuredContent).not.toHaveProperty("filesUnchanged");
    expect(planned.structuredContent).not.toHaveProperty("operations");
    expect(planned.structuredContent).not.toHaveProperty("preimages");
    expect(planned.structuredContent).not.toHaveProperty("versionChannelRewrites");

    const applied = await client.callTool({
      name: "bfs_apply_part_removal",
      arguments: {
        projectDir,
        target: "frontend.css:typescript:tailwind",
        reviewToken: plan?.reviewToken,
      },
    });
    expect(applied.isError).not.toBe(true);
    expect(applied.structuredContent).not.toHaveProperty("filesUnchanged");
    expect(applied.structuredContent).not.toHaveProperty("operations");
    expect(applied.structuredContent).not.toHaveProperty("preimages");
    expect(applied.structuredContent).not.toHaveProperty("versionChannelRewrites");
  });

  it("plans and applies in-project generation through the shared lifecycle contract", async () => {
    const client = await connectClient("modern");
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

    const planned = await client.callTool({
      name: "bfs_plan_gen",
      arguments: { projectDir, kind: "resource", name: "post" },
    });
    const plan = planned.structuredContent as
      | { reviewToken?: string; files?: unknown[]; lifecycle?: { contractVersion?: string } }
      | undefined;
    expect(planned.isError).not.toBe(true);
    expect(plan?.reviewToken).toHaveLength(64);
    expect(plan?.files?.length).toBeGreaterThanOrEqual(7);
    expect(plan?.lifecycle?.contractVersion).toBe("2");

    const applied = await client.callTool({
      name: "bfs_apply_gen",
      arguments: {
        projectDir,
        kind: "resource",
        name: "post",
        reviewToken: plan?.reviewToken,
      },
    });
    expect(applied.isError).not.toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "packages/api/src/routers/post.ts"))).toBe(
      true,
    );

    const checked = await client.callTool({
      name: "bfs_check_recipes",
      arguments: { projectDir, name: "post" },
    });
    expect(checked.isError).not.toBe(true);
    expect(checked.structuredContent?.recipes).toEqual([
      expect.objectContaining({ recipeId: "typescript-resource:post", ok: true }),
    ]);

    const history = await client.callTool({
      name: "bfs_get_recipe_history",
      arguments: { projectDir },
    });
    expect(history.isError).not.toBe(true);
    expect(history.structuredContent?.recipes).toEqual([
      expect.objectContaining({
        recipeId: "typescript-resource:post",
        recoveryPoints: [expect.objectContaining({ operation: "gen", status: "applied" })],
      }),
    ]);

    const context = await client.callTool({
      name: "bfs_get_project_context",
      arguments: { projectDir },
    });
    expect(context.isError).not.toBe(true);
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
    const client = await connectClient("modern");
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-registry-"));
    roots.push(projectDir);
    const registryFixtures = path.join(import.meta.dir, "..", "fixtures", "registry");
    await fs.copy(path.join(registryFixtures, "project"), projectDir);
    const source = path.join(registryFixtures, "sample-pack");

    const planned = await client.callTool({
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
    expect(planned.isError).not.toBe(true);
    expect(plan?.reviewToken).toStartWith("v2.");
    expect(plan?.lifecycle?.contractVersion).toBe("2");
    expect(plan?.lifecycle?.sideEffects).toContainEqual(
      expect.objectContaining({ kind: "package-manager", status: "manual" }),
    );

    const applied = await client.callTool({
      name: "bfs_apply_registry_add",
      arguments: { projectDir, source, reviewToken: plan?.reviewToken },
    });
    expect(applied.isError).not.toBe(true);
    expect(await fs.pathExists(path.join(projectDir, "apps/server/src/lib/rate-limit.ts"))).toBe(
      true,
    );
  });
});
