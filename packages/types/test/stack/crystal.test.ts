import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "@/config/types";

import {
  getCapabilityInventory,
  GOLDEN_RUNTIME_RECIPES,
} from "@/capabilities/capability-inventory";
import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import {
  CRYSTAL_PROJECT_DEFAULTS,
  getCrystalSelectionIssue,
  getCrystalRequestedIssue,
} from "@/platform/crystal-project";
import {
  createStackPart,
  formatStackPartSpec,
  parseStackPartSpecs,
  legacyProjectConfigToStackParts,
  stackPartsToLegacyProjectConfigPartial,
  stackGraphToLegacyProjectConfigForEcosystem,
  validateStackParts,
  getStackPartOptions,
} from "@/stack/stack-graph";
import {
  cliInputToProjectConfigPartial,
  createCrystalStackSelection,
  parseStackSelectionFromSearch,
  createStackSelectionSearchParams,
  stackSelectionToProjectConfig,
  generateStackSelectionCommand,
} from "@/stack/stack-translation";
import { analyzeStackCompatibility, getDisabledReason } from "@/stack/compatibility";

const config = () => ({
  ...createCliDefaultProjectConfigBase(),
  ...CRYSTAL_PROJECT_DEFAULTS,
  ecosystem: "crystal" as const,
  projectDir: "/virtual",
});

describe("bounded Crystal HTTP recipe", () => {
  it("ignores disabled frontend and owned capability selections", () => {
    for (const spec of ["frontend:typescript:none", "backend.auth:crystal:none"]) {
      const parts = parseStackPartSpecs(["backend:crystal:kemal", spec]);
      expect(getCrystalSelectionIssue({ stackParts: parts })).toBeNull();
    }
  });

  it("rejects unsafe and malformed custom directories with a part-specific error", () => {
    for (const suffix of [
      "services/api;touch /tmp/pwn",
      "services/$(whoami)",
      "services/api%0Aecho",
      "100%",
      "services/../api",
    ]) {
      expect(() => parseStackPartSpecs([`backend:go:gin@${suffix}`])).toThrow(
        "Invalid --part target path",
      );
    }
  });

  it("rejects normalized duplicate and overlapping application destinations", () => {
    for (const paths of [
      ["services/shared", "services/shared"],
      ["services/a", "services//a/"],
      ["services/a", "services/a/worker"],
    ]) {
      const parts = parseStackPartSpecs([
        `backend:go:gin:api@${paths[0]}`,
        `backend:rust:axum:worker@${paths[1]}`,
      ]);
      expect(
        validateStackParts(parts).issues.some((issue) => issue.code === "OVERLAPPING_TARGET_PATH"),
      ).toBe(true);
    }
    expect(parseStackPartSpecs(["backend:go:gin@services//api/"])[0]?.targetPath).toBe(
      "services/api",
    );
  });

  it("does not treat a disabled frontend as an application that can own tooling", () => {
    const parts = parseStackPartSpecs([
      "backend:crystal:kemal",
      "frontend:typescript:none",
      "codeQuality:universal:biome",
    ]);
    expect(getCrystalSelectionIssue({ stackParts: parts })).toContain("overlays");
    expect(getCrystalRequestedIssue({ database: "sqlite" }, parts)).toContain("database");
  });

  it("requires a database-capable backend alongside other bounded native recipes", () => {
    const specs = [
      "backend:crystal:kemal:api",
      "backend:ruby:sinatra:ruby-api",
      "backend:php:slim:php-api",
      "database:universal:sqlite",
    ];
    expect(getCrystalSelectionIssue({ stackParts: parseStackPartSpecs(specs) })).toContain(
      "database adapter",
    );
    expect(
      validateStackParts(
        parseStackPartSpecs([...specs, "backend:go:gin:data-api", "data-api.orm:go:gorm"]),
      ).issues,
    ).toEqual([]);
  });

  it("lifts and lowers Kemal without JavaScript selections", () => {
    const parts = legacyProjectConfigToStackParts(config());
    expect(
      parts
        .filter((part) => part.source !== "provided")
        .map((part) => [part.role, part.ecosystem, part.toolId]),
    ).toEqual([
      ["backend", "crystal", "kemal"],
      ["testing", "crystal", "spec"],
    ]);
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts).crystalWebFramework).toBe("kemal");
    expect(stackPartsToLegacyProjectConfigPartial(parts).crystalTesting).toBe("spec");
  });

  it("preserves custom identities and paths when projecting a mixed graph", () => {
    const web = createStackPart({
      role: "frontend",
      ecosystem: "typescript",
      toolId: "react-vite",
      id: "client",
      targetPath: "apps/web",
    });
    const backend = createStackPart({
      role: "backend",
      ecosystem: "crystal",
      toolId: "kemal",
      id: "reports",
      targetPath: "services/reports",
    });
    const parts = [web, backend];
    const projected = stackGraphToLegacyProjectConfigForEcosystem(
      { ...config(), stackParts: parts },
      "crystal",
    );
    const replayed = parseStackPartSpecs(parts.map((part) => formatStackPartSpec(part, parts)));
    expect(replayed.find((part) => part.id === "reports")?.targetPath).toBe("services/reports");
    expect(replayed.find((part) => part.id === "client")?.targetPath).toBe("apps/web");
    expect(projected.crystalWebFramework).toBe("kemal");
    expect(parts).toEqual([web, backend]);
    expect(getCrystalSelectionIssue({ stackParts: parts })).toBeNull();
    expect(validateStackParts(parts).issues).toEqual([]);
  });

  it("rejects traversal in a part target path", () => {
    expect(() => parseStackPartSpecs(["backend:crystal:kemal:reports@../reports"])).toThrow(
      "traversal",
    );
    expect(() => parseStackPartSpecs(["backend:crystal:kemal:reports@%2Fabsolute"])).toThrow(
      "relative path",
    );
  });

  it("rejects unsupported flat choices and graph owners", () => {
    expect(getCrystalSelectionIssue({ ...config(), database: "postgres" })).toContain("database");
    expect(getCrystalSelectionIssue({ ...config(), addons: ["gitleaks"] })).toContain("overlays");
    const backend = createStackPart({ role: "backend", ecosystem: "crystal", toolId: "kemal" });
    const storage = createStackPart({
      role: "database",
      ecosystem: "universal",
      toolId: "postgres",
      ownerPartId: backend.id,
    });
    expect(getCrystalRequestedIssue({ rateLimit: "upstash-ratelimit" }, [backend])).toContain(
      "rateLimit",
    );
    expect(
      validateStackParts([backend, storage]).issues.some((issue) =>
        issue.message.includes("Crystal Kemal"),
      ),
    ).toBe(true);
  });

  it("rejects a database beside Crystal even when a frontend is present", () => {
    const backend = createStackPart({ role: "backend", ecosystem: "crystal", toolId: "kemal" });
    const frontend = createStackPart({
      role: "frontend",
      ecosystem: "typescript",
      toolId: "react-vite",
    });
    const database = createStackPart({
      role: "database",
      ecosystem: "universal",
      toolId: "sqlite",
    });
    expect(getCrystalSelectionIssue({ stackParts: [backend, frontend, database] })).toContain(
      "database",
    );
    expect(
      getStackPartOptions({ role: "database", ecosystem: "universal", parts: [backend, frontend] }),
    ).not.toContain("sqlite");
    expect(
      getStackPartOptions({ role: "backend", ecosystem: "crystal", parts: [database, frontend] }),
    ).not.toContain("kemal");
    const go = createStackPart({
      role: "backend",
      ecosystem: "go",
      toolId: "gin",
      id: "other",
      targetPath: "services/other",
    });
    expect(getCrystalSelectionIssue({ stackParts: [backend, frontend, database, go] })).toBeNull();
    expect(
      getStackPartOptions({ role: "database", ecosystem: "universal", parts: [backend, go] }),
    ).toContain("sqlite");
  });

  it("uses Crystal defaults for ecosystem-only URLs and retains explicit none", () => {
    const parsed = parseStackSelectionFromSearch({ eco: "crystal" });
    expect(parsed.webFrontend).toEqual(["none"]);
    expect(parsed.database).toBe("none");
    expect(parsed.crystalWebFramework).toBe("kemal");
    const none = createCrystalStackSelection({ crystalWebFramework: "none" });
    const encoded = Object.fromEntries(createStackSelectionSearchParams(none));
    expect(parseStackSelectionFromSearch(encoded).crystalWebFramework).toBe("none");
    const project = stackSelectionToProjectConfig(parsed, {
      projectDir: "/virtual",
      relativePath: "my-app",
      install: false,
    });
    expect(getCrystalSelectionIssue(project)).toBeNull();
    expect(generateStackSelectionCommand(parsed)).toContain("--crystal-web-framework kemal");
    expect(generateStackSelectionCommand(parsed)).not.toContain("--yes");
  });

  it("resets a framework-coupled database layer and round-trips a compatible one", () => {
    const avram = createCrystalStackSelection({ crystalWebFramework: "lucky", crystalOrm: "avram" });
    expect(getDisabledReason(avram, "crystalOrm", "marten-orm")).toBe(
      "Marten ORM requires Crystal Marten.",
    );
    expect(getDisabledReason(avram, "crystalOrm", "crystal-db")).toBeNull();
    const switched = analyzeStackCompatibility({ ...avram, crystalWebFramework: "kemal" });
    expect(switched.adjustedStack?.crystalOrm).toBe("none");
    expect(analyzeStackCompatibility(avram).adjustedStack).toBeNull();
    const encoded = Object.fromEntries(createStackSelectionSearchParams(avram));
    expect(parseStackSelectionFromSearch(encoded).crystalOrm).toBe("avram");
    expect(generateStackSelectionCommand(avram)).toContain("--crystal-orm avram");
    const parts = legacyProjectConfigToStackParts({
      ...config(),
      crystalWebFramework: "lucky",
      crystalOrm: "avram",
    });
    const backend = parts.find((part) => part.role === "backend");
    expect(parts.find((part) => part.role === "orm")).toMatchObject({
      ecosystem: "crystal",
      toolId: "avram",
      ownerPartId: backend?.id,
    });
    expect(stackPartsToLegacyProjectConfigPartial(parts).crystalOrm).toBe("avram");
    expect(validateStackParts(parts).issues).toEqual([]);
  });

  it("resets Marten Auth when its ORM goes away and keeps JWT on any framework", () => {
    const martenAuth = createCrystalStackSelection({
      crystalWebFramework: "marten",
      crystalOrm: "marten-orm",
      crystalAuth: "marten-auth",
    });
    expect(analyzeStackCompatibility(martenAuth).adjustedStack).toBeNull();
    const withoutOrm = analyzeStackCompatibility({ ...martenAuth, crystalOrm: "crystal-db" });
    expect(withoutOrm.adjustedStack?.crystalAuth).toBe("none");
    expect(getDisabledReason({ ...martenAuth, crystalOrm: "none" }, "crystalAuth", "marten-auth")).toBe(
      "Marten Auth requires Marten ORM.",
    );
    expect(getDisabledReason(martenAuth, "crystalAuth", "kemal-session")).toBe(
      "Kemal Session requires Crystal Kemal.",
    );
    expect(getDisabledReason(martenAuth, "crystalAuth", "jwt")).toBeNull();
    const encoded = Object.fromEntries(createStackSelectionSearchParams(martenAuth));
    expect(parseStackSelectionFromSearch(encoded).crystalAuth).toBe("marten-auth");
  });

  it("keeps spec-kemal on Kemal and round-trips the test tooling through the URL", () => {
    const specKemal = createCrystalStackSelection({ crystalTesting: "spec-kemal" });
    expect(analyzeStackCompatibility(specKemal).adjustedStack).toBeNull();
    const lucky = analyzeStackCompatibility({ ...specKemal, crystalWebFramework: "lucky" });
    expect(lucky.adjustedStack?.crystalTesting).toBe("none");
    expect(getDisabledReason({ ...specKemal, crystalWebFramework: "athena" }, "crystalTesting", "spec-kemal")).toBe(
      "spec-kemal requires Crystal Kemal.",
    );
    expect(getDisabledReason({ ...specKemal, crystalWebFramework: "athena" }, "crystalTesting", "spectator")).toBeNull();
    const encoded = Object.fromEntries(createStackSelectionSearchParams(specKemal));
    expect(parseStackSelectionFromSearch(encoded).crystalTesting).toBe("spec-kemal");
  });

  it("keeps Marten Schema on Marten and round-trips validation through the URL", () => {
    const martenSchema = createCrystalStackSelection({
      crystalWebFramework: "marten",
      crystalValidation: "marten-schema",
    });
    expect(analyzeStackCompatibility(martenSchema).adjustedStack).toBeNull();
    const kemal = analyzeStackCompatibility({ ...martenSchema, crystalWebFramework: "kemal" });
    expect(kemal.adjustedStack?.crystalValidation).toBe("none");
    expect(getDisabledReason({ ...martenSchema, crystalWebFramework: "lucky" }, "crystalValidation", "marten-schema")).toBe(
      "Marten Schema requires Crystal Marten.",
    );
    expect(getDisabledReason({ ...martenSchema, crystalWebFramework: "lucky" }, "crystalValidation", "athena-validator")).toBeNull();
    const encoded = Object.fromEntries(createStackSelectionSearchParams(martenSchema));
    expect(parseStackSelectionFromSearch(encoded).crystalValidation).toBe("marten-schema");
  });

  it("requires an HTTP framework for the cached route and round-trips the cache store", () => {
    const redis = createCrystalStackSelection({ crystalWebFramework: "athena", crystalCache: "redis" });
    expect(analyzeStackCompatibility(redis).adjustedStack).toBeNull();
    const withoutFramework = analyzeStackCompatibility({ ...redis, crystalWebFramework: "none" });
    expect(withoutFramework.adjustedStack?.crystalCache).toBe("none");
    expect(getDisabledReason({ ...redis, crystalWebFramework: "none" }, "crystalCache", "memory")).toBe(
      "Memory cache requires Crystal Kemal or Lucky or Athena or Marten.",
    );
    const encoded = Object.fromEntries(createStackSelectionSearchParams(redis));
    expect(parseStackSelectionFromSearch(encoded).crystalCache).toBe("redis");
  });

  it("keeps Sidekiq.cr away from the Redis cache shard and round-trips jobs", () => {
    const sidekiq = createCrystalStackSelection({ crystalJobs: "sidekiq", crystalCache: "memory" });
    expect(analyzeStackCompatibility(sidekiq).adjustedStack).toBeNull();
    const withRedisCache = analyzeStackCompatibility({ ...sidekiq, crystalCache: "redis" });
    expect(withRedisCache.adjustedStack?.crystalCache).toBe("redis");
    expect(withRedisCache.adjustedStack?.crystalJobs).toBe("none");
    expect(getDisabledReason({ ...sidekiq, crystalCache: "redis" }, "crystalJobs", "sidekiq")).toBe(
      "Sidekiq.cr and the Redis cache depend on different shards named redis.",
    );
    expect(getDisabledReason({ ...sidekiq, crystalCache: "redis" }, "crystalJobs", "mosquito")).toBeNull();
    expect(
      getCrystalSelectionIssue({
        stackParts: parseStackPartSpecs([
          "backend:crystal:kemal",
          "backend.caching:crystal:redis",
          "backend.jobQueue:crystal:sidekiq",
        ]),
      }),
    ).toBe("Sidekiq.cr and the Redis cache depend on different shards named redis.");
    const encoded = Object.fromEntries(createStackSelectionSearchParams(sidekiq));
    expect(parseStackSelectionFromSearch(encoded).crystalJobs).toBe("sidekiq");
  });

  it("expands flat Crystal selections onto the graph framework owner", () => {
    const config = cliInputToProjectConfigPartial({
      part: ["frontend:typescript:react-vite", "backend:crystal:kemal"],
      crystalOrm: "crystal-db",
      crystalAuth: "jwt",
    });
    const lowered = stackGraphToLegacyProjectConfigForEcosystem(
      config as ProjectConfig,
      "crystal",
    );
    expect([lowered.crystalOrm, lowered.crystalAuth]).toEqual(["crystal-db", "jwt"]);
    expect(
      cliInputToProjectConfigPartial({ part: ["backend:crystal:kemal"], crystalCache: "memory" })
        .crystalCache,
    ).toBe("memory");
    expect(
      cliInputToProjectConfigPartial({ part: ["backend:crystal:lucky"], crystalOrm: "avram" })
        .crystalOrm,
    ).toBe("avram");
    expect(() =>
      cliInputToProjectConfigPartial({ part: ["backend:crystal:kemal"], crystalOrm: "avram" }),
    ).toThrow("Avram requires Crystal Lucky.");
  });

  it("keeps Crystal experimental without changing the versioned golden recipes", () => {
    expect(GOLDEN_RUNTIME_RECIPES).toHaveLength(8);
    const kemal = getCapabilityInventory().find(
      (record) => record.ecosystem === "crystal" && record.optionId === "kemal",
    );
    expect(kemal?.maturity).toBe("experimental");
    expect(kemal?.freshness).toBe("unverified");
    expect(kemal?.evidenceLevel).toBe("listed");
    expect(kemal?.recipeIds).toEqual([]);
  });
});
