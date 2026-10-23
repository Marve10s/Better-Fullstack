import { describe, expect, it } from "bun:test";

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
  createCrystalStackSelection,
  parseStackSelectionFromSearch,
  createStackSelectionSearchParams,
  stackSelectionToProjectConfig,
  generateStackSelectionCommand,
} from "@/stack/stack-translation";

const config = () => ({
  ...createCliDefaultProjectConfigBase(),
  ...CRYSTAL_PROJECT_DEFAULTS,
  ecosystem: "crystal" as const,
  projectDir: "/virtual",
});

describe("bounded Crystal HTTP recipe", () => {
  it("does not treat a disabled frontend as an application that can own tooling", () => {
    const parts = parseStackPartSpecs([
      "backend:crystal:kemal",
      "frontend:typescript:none",
      "codeQuality:universal:biome",
    ]);
    expect(getCrystalSelectionIssue({ stackParts: parts })).toContain("overlays");
    expect(getCrystalRequestedIssue({ database: "sqlite" }, parts)).toContain("database");
  });

  it("lifts and lowers Kemal without JavaScript selections", () => {
    const parts = legacyProjectConfigToStackParts(config());
    expect(
      parts
        .filter((part) => part.source !== "provided")
        .map((part) => [part.role, part.ecosystem, part.toolId]),
    ).toEqual([["backend", "crystal", "kemal"]]);
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts).crystalWebFramework).toBe("kemal");
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
