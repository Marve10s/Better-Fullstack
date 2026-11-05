import {
  getVirtualFileContent as content,
  hasVirtualFile as hasFile,
  listVirtualTreeFilePaths,
} from "@test/support/virtual-tree-utils";
import { describe, expect, it, spyOn } from "bun:test";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { buildBtsConfigForPersistence } from "@/config/bts-config";
import { SUPPORTED_STACK_UPDATE_KEYS } from "@/helpers/core/stack-update";
import { create, createVirtual } from "@/index";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { createProjectOperation, planProjectOperation } from "@/operations/project-create";
import { buildProjectConfig, getInstallCommand } from "@/operations/stack-helpers";
import * as configPrompts from "@/prompts/core/config-prompts";
import { createStackPart } from "@/types";

describe("Crystal create contract", () => {
  it("preserves existing files when a later ecosystem selection rejects supplied flags", async () => {
    const root = await mkdtemp(join(process.cwd(), ".bfs-crystal-late-overwrite-"));
    const gather = spyOn(configPrompts, "gatherConfig").mockImplementation(async () => {
      return buildProjectConfig({ ecosystem: "crystal", database: "postgres" });
    });
    try {
      const destination = join(root, "service");
      await mkdir(destination);
      await writeFile(join(destination, "keep.txt"), "preserve me");
      const result = await create(destination, {
        database: "postgres",
        directoryConflict: "overwrite",
        install: false,
        git: false,
        aiDocs: ["none"],
        packageManager: "bun",
        versionChannel: "stable",
      });
      expect(result.success).toBe(false);
      expect(result.error).toContain("database");
      expect(await readFile(join(destination, "keep.txt"), "utf8")).toBe("preserve me");
    } finally {
      gather.mockRestore();
      await rm(root, { recursive: true, force: true });
    }
  });

  it("returns executable setup guidance for a custom Crystal service directory", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-crystal-mcp-path-"));
    try {
      const result = await createProjectOperation.invoke({
        projectName: "custom-service",
        targetDir: root,
        part: ["backend:crystal:kemal@services/audit%20api"],
        aiDocs: ["none"],
      });
      expect(result.failed).toBe(false);
      expect(
        await readFile(join(root, "custom-service/services/audit api/shard.yml"), "utf8"),
      ).toContain("kemal");
      expect(result.output.message).toContain("services/audit api");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("rejects invalid Crystal input before overwriting an existing directory", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-crystal-overwrite-"));
    try {
      const destination = join(root, "service");
      await mkdir(destination);
      await writeFile(join(destination, "keep.txt"), "preserve me");
      const result = await create(destination, {
        ecosystem: "crystal",
        crystalWebFramework: "kemal",
        database: "sqlite",
        directoryConflict: "overwrite",
        install: false,
        git: false,
        aiDocs: ["none"],
        packageManager: "bun",
      });
      expect(result.success).toBe(false);
      expect(await readFile(join(destination, "keep.txt"), "utf8")).toBe("preserve me");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("plans native files through the actual MCP operation and rejects an unowned database", async () => {
    const result = await planProjectOperation.invoke({
      projectName: "crystal-mcp",
      ecosystem: "crystal",
      crystalWebFramework: "kemal",
    });
    expect(result.failed).toBe(false);
    expect(result.output.files).toContain("shard.yml");
    expect(result.output.files).toContain("scripts/http_proof.cr");
    expect(result.output.files).not.toContain("package.json");
    await expect(
      planProjectOperation.invoke({
        projectName: "crystal-mcp",
        part: [
          "frontend:typescript:react-vite",
          "backend:crystal:kemal",
          "database:universal:sqlite",
        ],
      }),
    ).rejects.toThrow("database adapter");
  });

  it("shares MCP defaults and replay without TypeScript defaults", () => {
    const config = buildProjectConfig({ ecosystem: "crystal", projectName: "9.my-service" });
    expect(config.crystalWebFramework).toBe("kemal");
    expect(config.database).toBe("none");
    expect(config.frontend).toEqual(["none"]);
    const command = generateReproducibleCommand(config);
    expect(command).toContain("--crystal-web-framework kemal");
    expect(command).not.toContain("--yes");
  });

  it("persists Crystal ownership and exposes its schema field to updates", () => {
    const backend = createStackPart({
      role: "backend",
      ecosystem: "crystal",
      toolId: "kemal",
      id: "audit",
      targetPath: "services/audit",
    });
    const web = createStackPart({
      role: "frontend",
      ecosystem: "typescript",
      toolId: "react-vite",
      id: "client",
      targetPath: "apps/web",
    });
    const config = { ...buildProjectConfig({ ecosystem: "crystal" }), stackParts: [backend, web] };
    const saved = buildBtsConfigForPersistence(config, {
      version: "2.8.0",
      createdAt: "2026-10-23T00:00:00.000Z",
    });
    expect(saved.crystalWebFramework).toBe("kemal");
    expect(saved.stackParts?.find((part) => part.id === "audit")?.targetPath).toBe(
      "services/audit",
    );
    expect(saved.stackParts?.find((part) => part.id === "client")?.targetPath).toBe("apps/web");
    expect(SUPPORTED_STACK_UPDATE_KEYS).toContain("crystalWebFramework");
    const command = generateReproducibleCommand(config);
    expect(command).toContain("services/audit");
    expect(command).not.toContain("--yes");
  });

  it("renders native commands and a valid shard name for a valid BF name", async () => {
    const result = await createVirtual({ ecosystem: "crystal", projectName: "9.my-service" });
    expect(result.success).toBe(true);
    if (!result.tree) throw new Error(result.error);
    expect(content(result.tree.root, "shard.yml")).toContain("name: app_9_my_service");
    expect(content(result.tree.root, "shard.yml")).toContain("version: 1.15.0");
    expect(content(result.tree.root, "src/server.cr")).toContain("Kemal.run(args: nil)");
    expect(content(result.tree.root, "scripts/http_proof.cr")).toContain(
      "process.signal(Signal::TERM)",
    );
    expect(hasFile(result.tree.root, "package.json")).toBe(false);
  });

  it.each([
    ["lucky", "luckyframework/lucky", "class AppServer < Lucky::BaseAppServer", "413"],
    ["athena", "athena-framework/framework", "ATH.run(", "413"],
    ["marten", "martenframework/marten", "Marten.start", "400"],
  ] as const)(
    "renders the %s HTTP contract with its own server and shared proof",
    async (framework, shard, server, oversizedStatus) => {
      const result = await createVirtual({ ecosystem: "crystal", crystalWebFramework: framework });
      expect(result.success).toBe(true);
      if (!result.tree) throw new Error(result.error);
      const root = result.tree.root;
      expect(content(root, "shard.yml")).toContain(`github: ${shard}`);
      expect(content(root, "shard.yml")).not.toContain("kemal");
      expect(content(root, "src/server.cr")).toContain(server);
      expect(hasFile(root, "src/greeting_request.cr")).toBe(true);
      expect(hasFile(root, "spec/greeting_request_spec.cr")).toBe(true);
      expect(hasFile(root, "src/http_guard.cr")).toBe(framework !== "marten");
      expect(content(root, "scripts/http_proof.cr")).toContain(
        `oversized.status_code == ${oversizedStatus}`,
      );
      const config = buildProjectConfig({ ecosystem: "crystal", crystalWebFramework: framework });
      expect(generateReproducibleCommand(config)).toContain(`--crystal-web-framework ${framework}`);
      expect(getInstallCommand("crystal", "svc", undefined, undefined, undefined, undefined, config)).toContain(
        framework === "athena" ? "crystal spec -Dwithout_libmagic" : "crystal spec &&",
      );
    },
  );

  it.each([
    ["kemal", "crystal-db", "src/greeting_store.cr", "github: crystal-lang/crystal-sqlite3"],
    ["lucky", "avram", "scripts/db_migrate.cr", "github: luckyframework/avram"],
    ["marten", "marten-orm", "manage.cr", "github: crystal-lang/crystal-sqlite3"],
  ] as const)(
    "renders %s with the %s greeting store and replays it",
    async (framework, orm, ownedFile, dependency) => {
      const result = await createVirtual({
        ecosystem: "crystal",
        crystalWebFramework: framework,
        crystalOrm: orm,
      });
      expect(result.success).toBe(true);
      if (!result.tree) throw new Error(result.error);
      const root = result.tree.root;
      expect(content(root, "shard.yml")).toContain(dependency);
      expect(hasFile(root, ownedFile)).toBe(true);
      expect(hasFile(root, "spec/greeting_store_spec.cr")).toBe(true);
      expect(content(root, "scripts/http_proof.cr")).toContain('client.post("/api/greetings"');
      const config = buildProjectConfig({
        ecosystem: "crystal",
        crystalWebFramework: framework,
        crystalOrm: orm,
      });
      expect(generateReproducibleCommand(config)).toContain(`--crystal-orm ${orm}`);
    },
  );

  it("rejects database layers that the selected framework cannot run", async () => {
    for (const [framework, orm, message] of [
      ["kemal", "avram", "Avram requires Crystal Lucky."],
      ["lucky", "marten-orm", "Marten ORM requires Crystal Marten."],
      ["none", "crystal-db", "crystal-db requires Crystal"],
    ] as const) {
      const result = await createVirtual({
        ecosystem: "crystal",
        crystalWebFramework: framework,
        crystalOrm: orm,
      });
      expect(result.success).toBe(false);
      expect(result.error).toContain(message);
    }
    await expect(
      planProjectOperation.invoke({
        projectName: "crystal-orm",
        part: ["backend:crystal:athena", "backend.orm:crystal:avram"],
      }),
    ).rejects.toThrow("Avram requires Crystal Lucky.");
  });

  it.each([
    ["athena", "none", "jwt", "src/token_auth.cr", "github: crystal-community/jwt"],
    ["kemal", "none", "kemal-session", "src/auth_credentials.cr", "github: kemalcr/kemal-session"],
    ["marten", "marten-orm", "marten-auth", "seed.cr", "github: martenframework/marten-auth"],
  ] as const)(
    "renders %s with %s storage and %s sign-in",
    async (framework, orm, auth, ownedFile, dependency) => {
      const result = await createVirtual({
        ecosystem: "crystal",
        crystalWebFramework: framework,
        crystalOrm: orm,
        crystalAuth: auth,
      });
      expect(result.success).toBe(true);
      if (!result.tree) throw new Error(result.error);
      const root = result.tree.root;
      expect(content(root, "shard.yml")).toContain(dependency);
      expect(hasFile(root, ownedFile)).toBe(true);
      expect(content(root, "scripts/http_proof.cr")).toContain('client.get("/api/me", auth_headers)');
      const config = buildProjectConfig({
        ecosystem: "crystal",
        crystalWebFramework: framework,
        crystalOrm: orm,
        crystalAuth: auth,
      });
      expect(generateReproducibleCommand(config)).toContain(`--crystal-auth ${auth}`);
    },
  );

  it("rejects sign-in options the selected stack cannot run", async () => {
    for (const [framework, orm, auth, message] of [
      ["lucky", "none", "kemal-session", "Kemal Session requires Crystal Kemal."],
      ["marten", "crystal-db", "marten-auth", "Marten Auth requires Marten ORM."],
      ["none", "none", "jwt", "JWT requires Crystal"],
    ] as const) {
      const result = await createVirtual({
        ecosystem: "crystal",
        crystalWebFramework: framework,
        crystalOrm: orm,
        crystalAuth: auth,
      });
      expect(result.success).toBe(false);
      expect(result.error).toContain(message);
    }
    await expect(
      planProjectOperation.invoke({
        projectName: "crystal-auth",
        part: ["backend:crystal:marten", "backend.auth:crystal:marten-auth"],
      }),
    ).rejects.toThrow("Marten Auth requires Marten ORM.");
  });

  it.each([
    ["spectator", ["spec/greeting_spec.cr", "spec/greeting_spectator_spec.cr"], "gitlab: arctic-fox/spectator"],
    ["spec-kemal", ["spec/greeting_spec.cr", "spec/server_spec.cr"], "github: kemalcr/spec-kemal"],
    ["none", [], undefined],
  ] as const)("renders %s test tooling", async (testing, specs, dependency) => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: "kemal",
      crystalTesting: testing,
    });
    expect(result.success).toBe(true);
    if (!result.tree) throw new Error(result.error);
    const specFiles = listVirtualTreeFilePaths(result.tree)
      .map((file) => file.replace(/^\//, ""))
      .filter((file) => file.startsWith("spec/"))
      .sort();
    expect(specFiles).toEqual([...specs]);
    if (dependency) expect(content(result.tree.root, "shard.yml")).toContain(dependency);
    const config = buildProjectConfig({ ecosystem: "crystal", crystalWebFramework: "kemal", crystalTesting: testing });
    expect(generateReproducibleCommand(config)).toContain(`--crystal-testing ${testing}`);
  });

  it.each([
    ["kemal", "athena-validator", "github: athena-framework/validator", "@[Assert::NotBlank]"],
    ["lucky", "active-model", "github: spider-gazelle/active-model", "validates :name"],
    ["marten", "marten-schema", "github: martenframework/marten", "< Marten::Schema"],
  ] as const)("renders %s greetings validated by %s", async (framework, validation, dependency, rule) => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: framework,
      crystalValidation: validation,
    });
    expect(result.success).toBe(true);
    if (!result.tree) throw new Error(result.error);
    const root = result.tree.root;
    expect(content(root, "shard.yml")).toContain(dependency);
    expect(content(root, "src/greeting_input.cr")).toContain(rule);
    expect(content(root, "src/greeting.cr")).toContain("GreetingInput.validate!(value.strip)");
    expect(hasFile(root, "spec/greeting_input_spec.cr")).toBe(true);
    const config = buildProjectConfig({ ecosystem: "crystal", crystalWebFramework: framework, crystalValidation: validation });
    expect(generateReproducibleCommand(config)).toContain(`--crystal-validation ${validation}`);
  });

  it.each([
    ["kemal", "memory", "github: crystal-cache/cache", "Cache::MemoryStore(String)"],
    ["lucky", "file", "github: crystal-cache/cache", "Cache::FileStore(String)"],
    ["marten", "redis", "github: crystal-cache/redis_cache_store", "Cache::RedisCacheStore(String)"],
  ] as const)("renders %s with a %s cached route", async (framework, cache, dependency, store) => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: framework,
      crystalCache: cache,
    });
    expect(result.success).toBe(true);
    if (!result.tree) throw new Error(result.error);
    const root = result.tree.root;
    expect(content(root, "shard.yml")).toContain(dependency);
    expect(content(root, "src/cached_clock.cr")).toContain(store);
    expect(hasFile(root, "spec/cached_clock_spec.cr")).toBe(true);
    expect(content(root, "scripts/http_proof.cr")).toContain('client.get("/api/cached-time")');
    const config = buildProjectConfig({ ecosystem: "crystal", crystalWebFramework: framework, crystalCache: cache });
    expect(generateReproducibleCommand(config)).toContain(`--crystal-cache ${cache}`);
  });

  it.each([
    ["kemal", "sidekiq", "github: hugopl/sidekiq.cr", true],
    ["athena", "mosquito", "github: mosquito-cr/mosquito", true],
    ["marten", "tasker", "github: spider-gazelle/tasker", false],
  ] as const)("renders %s with %s background jobs", async (framework, jobs, dependency, worker) => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: framework,
      crystalJobs: jobs,
    });
    expect(result.success).toBe(true);
    if (!result.tree) throw new Error(result.error);
    const root = result.tree.root;
    expect(content(root, "shard.yml")).toContain(dependency);
    expect(content(root, "shard.yml")?.includes("main: src/worker.cr")).toBe(worker);
    expect(hasFile(root, "src/worker.cr")).toBe(worker);
    expect(hasFile(root, "spec/greeting_jobs_spec.cr")).toBe(true);
    expect(content(root, "scripts/http_proof.cr")).toContain('client.post("/api/jobs", headers');
    const config = buildProjectConfig({ ecosystem: "crystal", crystalWebFramework: framework, crystalJobs: jobs });
    expect(generateReproducibleCommand(config)).toContain(`--crystal-jobs ${jobs}`);
  });

  it("rejects Sidekiq.cr beside the Redis cache", async () => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: "kemal",
      crystalCache: "redis",
      crystalJobs: "sidekiq",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("Sidekiq.cr and the Redis cache depend on different shards named redis.");
  });

  it("rejects Marten Schema without Marten", async () => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: "kemal",
      crystalValidation: "marten-schema",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("Marten Schema requires Crystal Marten.");
  });

  it("rejects spec-kemal without Kemal", async () => {
    const result = await createVirtual({
      ecosystem: "crystal",
      crystalWebFramework: "lucky",
      crystalTesting: "spec-kemal",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("spec-kemal requires Crystal Kemal.");
  });

  it("rejects unsupported selections before rendering", async () => {
    const result = await createVirtual({ ecosystem: "crystal", database: "postgres" });
    expect(result.success).toBe(false);
    expect(result.error).toContain("database");
    expect(() => buildProjectConfig({ ecosystem: "crystal", addons: ["gitleaks"] })).toThrow(
      "addons",
    );
  });
});
