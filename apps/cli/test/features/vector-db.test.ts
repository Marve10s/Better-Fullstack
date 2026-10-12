import { dependencyVersionMap } from "@better-fullstack/template-generator";
import {
  createCliDefaultProjectConfigBase,
  getDisabledReason,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { createCustomConfig } from "@test/support/test-utils";
import { getVirtualFileContent, readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { afterAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { readBtsConfig, writeBtsConfig } from "@/config/bts-config";
import { buildCompatibilityInputFromConfig } from "@/config/stack-compatibility";
import { createVirtual } from "@/index";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { runWithContextAsync } from "@/presentation/context";
import { resolveBackendPrompt } from "@/prompts/architecture/backend";
import { resolveRuntimePrompt } from "@/prompts/architecture/runtime";
import { resolveVectorDbPrompt } from "@/prompts/data/vector-db";
import { processAndValidateFlags } from "@/validation";

const CLI_ENTRY = resolve(import.meta.dir, "../../src/cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE =
  process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const TEMP_ROOTS: string[] = [];

const WEAVIATE_REASON =
  "Weaviate's TypeScript client uses gRPC and needs the Node.js or Bun runtime, not Cloudflare Workers";
const LANCEDB_REASON =
  "LanceDB is an embedded native database and needs a standalone Node.js or Bun server";

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((root) => rm(root, { recursive: true, force: true })));
});

async function makeTempRoot() {
  const root = await mkdtemp(join(tmpdir(), "bfs-vector-db-"));
  TEMP_ROOTS.push(root);
  return root;
}

async function runCli(args: string[]) {
  const child = Bun.spawn(
    [BUN_EXECUTABLE, CLI_ENTRY, ...args, "--dry-run", "--disable-analytics"],
    {
      cwd: await makeTempRoot(),
      env: { ...Bun.env, BFS_SKIP_BUILDER_PROMPT: "1", CI: "true" },
      stdin: "ignore",
      stdout: "pipe",
      stderr: "pipe",
    },
  );
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, output: `${stdout}${stderr}` };
}

function promptValues(context: Parameters<typeof resolveVectorDbPrompt>[0]) {
  return resolveVectorDbPrompt(context).options.map((option) => option.value);
}

type PackageJson = { dependencies: Record<string, string> };

const GENERATED = [
  {
    vectorDb: "weaviate",
    runtime: "node",
    dependency: "weaviate-client",
    client: ["weaviate.connectToWeaviateCloud(", "weaviate.connectToLocal("],
    upsert: ".data.insertMany(",
    query: ".query.nearVector(vector",
    env: ["WEAVIATE_URL=http://localhost:8080", "WEAVIATE_API_KEY="],
    readme: "## Vector database (Weaviate)",
  },
  {
    vectorDb: "upstash-vector",
    runtime: "bun",
    dependency: "@upstash/vector",
    client: ["new Index({", "process.env.UPSTASH_VECTOR_REST_TOKEN"],
    upsert: "vectorClient.upsert(records",
    query: "vectorClient.query({ vector, topK, includeMetadata: true }",
    env: ["UPSTASH_VECTOR_REST_URL=", "UPSTASH_VECTOR_REST_TOKEN="],
    readme: "## Vector database (Upstash Vector)",
  },
  {
    vectorDb: "turbopuffer",
    runtime: "bun",
    dependency: "@turbopuffer/turbopuffer",
    client: ["new Turbopuffer({", "process.env.TURBOPUFFER_API_KEY"],
    upsert: "upsert_rows: records.map(",
    query: 'rank_by: ["vector", "ANN", vector]',
    env: ["TURBOPUFFER_API_KEY=", "TURBOPUFFER_REGION=gcp-us-central1"],
    readme: "## Vector database (turbopuffer)",
  },
  {
    vectorDb: "lancedb",
    runtime: "bun",
    dependency: "@lancedb/lancedb",
    client: ["lancedb.connect(LANCEDB_URI)"],
    upsert: '.mergeInsert("id").whenMatchedUpdateAll().whenNotMatchedInsertAll()',
    query: "table.vectorSearch(vector)",
    env: ["LANCEDB_URI=./.lancedb"],
    readme: "## Vector database (LanceDB)",
  },
] as const;

const REJECTED = [
  {
    options: {
      backend: "hono",
      runtime: "workers",
      serverDeploy: "cloudflare",
      vectorDb: "weaviate",
    },
    parts: [
      "backend:typescript:hono",
      "backend.runtime:typescript:workers",
      "backend.vectorDb:typescript:weaviate",
    ],
    error: WEAVIATE_REASON,
  },
  {
    options: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      webDeploy: "cloudflare",
      vectorDb: "weaviate",
    },
    parts: undefined,
    error: WEAVIATE_REASON,
  },
  {
    options: {
      backend: "hono",
      runtime: "workers",
      serverDeploy: "cloudflare",
      vectorDb: "lancedb",
    },
    parts: [
      "backend:typescript:hono",
      "backend.runtime:typescript:workers",
      "backend.vectorDb:typescript:lancedb",
    ],
    error: LANCEDB_REASON,
  },
  {
    options: { frontend: ["next"], backend: "self", runtime: "none", vectorDb: "lancedb" },
    parts: undefined,
    error: LANCEDB_REASON,
  },
] as const;

describe("vector databases", () => {
  for (const { vectorDb, runtime, dependency, client, upsert, query, env, readme } of GENERATED) {
    test(`${vectorDb} generates a client, example upsert and query, env, and setup notes`, async () => {
      const result = await createVirtual({
        projectName: `vector-${vectorDb}`,
        backend: "hono",
        runtime,
        vectorDb,
      });
      expect(result.error).toBeUndefined();
      const root = result.tree!.root;

      const source = readVirtualFileContent(root, "apps/server/src/lib/vector.ts");
      const pkg: PackageJson = JSON.parse(readVirtualFileContent(root, "apps/server/package.json"));
      const serverEnv = readVirtualFileContent(root, "apps/server/.env");

      for (const snippet of client) expect(source).toContain(snippet);
      expect(source).toContain("export async function upsertVectors(");
      expect(source).toContain(upsert);
      expect(source).toContain("export async function queryVectors(");
      expect(source).toContain(query);
      expect(pkg.dependencies[dependency]).toBe(dependencyVersionMap[dependency]);
      for (const line of env) expect(serverEnv).toContain(line);
      expect(readVirtualFileContent(root, "README.md")).toContain(readme);
    });
  }

  test("LanceDB keeps its local table files out of git", async () => {
    const result = await createVirtual({
      backend: "express",
      runtime: "node",
      vectorDb: "lancedb",
    });
    expect(result.error).toBeUndefined();
    expect(readVirtualFileContent(result.tree!.root, ".gitignore").split("\n")).toContain(
      ".lancedb",
    );
  });

  test("a fullstack backend gets the client in the web app", async () => {
    const result = await createVirtual({
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      vectorDb: "upstash-vector",
    });
    expect(result.error).toBeUndefined();
    const root = result.tree!.root;
    const pkg: PackageJson = JSON.parse(readVirtualFileContent(root, "apps/web/package.json"));

    expect(readVirtualFileContent(root, "apps/web/src/lib/vector.ts")).toContain(
      'import { Index } from "@upstash/vector";',
    );
    expect(pkg.dependencies["@upstash/vector"]).toBe(dependencyVersionMap["@upstash/vector"]);
    expect(readVirtualFileContent(root, "apps/web/.env")).toContain("UPSTASH_VECTOR_REST_URL=");
    expect(getVirtualFileContent(root, "apps/server/src/lib/vector.ts")).toBeUndefined();
  });

  const workers = [
    {
      vectorDb: "upstash-vector",
      bindings: [
        "UPSTASH_VECTOR_REST_URL: alchemy.env.UPSTASH_VECTOR_REST_URL!",
        "UPSTASH_VECTOR_REST_TOKEN: alchemy.secret.env.UPSTASH_VECTOR_REST_TOKEN!",
      ],
    },
    {
      vectorDb: "turbopuffer",
      bindings: [
        "TURBOPUFFER_API_KEY: alchemy.secret.env.TURBOPUFFER_API_KEY!",
        'TURBOPUFFER_REGION: alchemy.env.TURBOPUFFER_REGION ?? "gcp-us-central1"',
      ],
    },
  ] as const;

  for (const { vectorDb, bindings } of workers) {
    test(`${vectorDb} on Workers binds its credentials to the server Worker`, async () => {
      const result = await createVirtual({
        projectName: `vector-${vectorDb}-workers`,
        backend: "hono",
        runtime: "workers",
        serverDeploy: "cloudflare",
        vectorDb,
      });
      expect(result.error).toBeUndefined();
      const alchemy = readVirtualFileContent(result.tree!.root, "packages/infra/alchemy.run.ts");

      expect(alchemy).toContain("const serviceBindings = {");
      expect(alchemy).toContain("...serviceBindings,");
      for (const binding of bindings) expect(alchemy).toContain(binding);
    });
  }

  test("createVirtual, the builder, and MCP input reject unsupported stacks with one reason", async () => {
    const results = await Promise.all(REJECTED.map(({ options }) => createVirtual(options)));

    for (const [index, { options, error }] of REJECTED.entries()) {
      expect(results[index]?.success).toBe(false);
      expect(results[index]?.error).toContain(error);
      expect(
        getDisabledReason(
          buildCompatibilityInputFromConfig(createCustomConfig(options)),
          "vectorDb",
          options.vectorDb,
        ),
      ).toBe(`${error}.`);
      expect(() => buildProjectConfig(options)).toThrow(error);
    }
  });

  test("graph-only input is validated against the vector database the generator uses", async () => {
    for (const { parts, error } of REJECTED) {
      if (!parts) continue;
      const specs = ["frontend:typescript:tanstack-router", ...parts];
      const result = await createVirtual({ stackParts: parseStackPartSpecs(specs, "selected") });
      expect(result.success).toBe(false);
      expect(result.error).toContain(error);
      expect(() => buildProjectConfig({ part: specs })).toThrow(error);
    }
  });

  test("MCP input keeps supported selections", () => {
    expect(
      buildProjectConfig({
        backend: "hono",
        runtime: "workers",
        serverDeploy: "cloudflare",
        vectorDb: "turbopuffer",
      }).vectorDb,
    ).toBe("turbopuffer");
    expect(
      buildProjectConfig({ backend: "hono", runtime: "bun", vectorDb: "lancedb" }).vectorDb,
    ).toBe("lancedb");
  });

  test("explicit CLI flags reject an unsupported vector database", async () => {
    const { exitCode, output } = await runCli([
      "create",
      "vectors",
      "--backend",
      "hono",
      "--runtime",
      "workers",
      "--server-deploy",
      "cloudflare",
      "--vector-db",
      "lancedb",
      "--no-install",
      "--no-git",
    ]);

    expect(exitCode).not.toBe(0);
    expect(output).toContain(LANCEDB_REASON);
  });

  test("partial flags and interactive prompts only offer what the stack can generate", async () => {
    await runWithContextAsync({ silent: true }, async () => {
      expect(() =>
        processAndValidateFlags({ vectorDb: "lancedb" }, new Set(["vectorDb"]), "vectors"),
      ).not.toThrow();
      expect(() =>
        processAndValidateFlags(
          { vectorDb: "weaviate", runtime: "workers" },
          new Set(["vectorDb", "runtime"]),
          "vectors",
        ),
      ).toThrow(WEAVIATE_REASON);
    });

    expect(promptValues({ backend: "hono", runtime: "bun" })).toEqual(
      expect.arrayContaining(["weaviate", "upstash-vector", "turbopuffer", "lancedb"]),
    );
    const workersValues = promptValues({ backend: "hono", runtime: "workers" });
    expect(workersValues).toEqual(expect.arrayContaining(["upstash-vector", "turbopuffer"]));
    expect(workersValues).not.toContain("weaviate");
    expect(workersValues).not.toContain("lancedb");
    const selfValues = promptValues({ backend: "self", runtime: "none", webDeploy: "cloudflare" });
    expect(selfValues).toContain("upstash-vector");
    expect(selfValues).not.toContain("weaviate");
    expect(selfValues).not.toContain("lancedb");

    expect(
      resolveRuntimePrompt({ backend: "hono", vectorDb: "lancedb" }).options.map(
        (option) => option.value,
      ),
    ).toEqual(["bun", "node"]);
    expect(
      resolveBackendPrompt({ frontends: ["next"], vectorDb: "lancedb" }).options.map(
        (option) => option.value,
      ),
    ).not.toContain("self");
  });

  test("the reproducible command and saved config keep each new vector database", async () => {
    for (const { vectorDb, runtime } of GENERATED) {
      const projectDir = join(await makeTempRoot(), "app");
      const config = {
        ...createCliDefaultProjectConfigBase("bun"),
        projectName: "app",
        projectDir,
        relativePath: ".",
        addons: [],
        git: false,
        install: false,
        backend: "hono",
        runtime,
        vectorDb,
      } as ProjectConfig;

      expect(generateReproducibleCommand(config)).toContain(`--vector-db ${vectorDb}`);
      await mkdir(projectDir, { recursive: true });
      await writeBtsConfig(config);
      expect((await readBtsConfig(projectDir))?.vectorDb).toBe(vectorDb);
    }

    const args = generateReproducibleCommand({
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "app",
      projectDir: "/virtual",
      relativePath: "./virtual",
      addons: [],
      git: false,
      install: false,
      backend: "hono",
      runtime: "node",
      vectorDb: "weaviate",
    } as ProjectConfig)
      .split(" ")
      .slice(4)
      .map((arg) => (arg === "--git" ? "--no-git" : arg === "--install" ? "--no-install" : arg));
    const { exitCode, output } = await runCli(["create", "vectors", ...args]);
    expect(output).not.toContain("Adjusted incompatible options");
    expect(exitCode).toBe(0);
  });
});
