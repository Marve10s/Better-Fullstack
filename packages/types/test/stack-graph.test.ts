import { describe, expect, it } from "bun:test";

import {
  compareLegacyConfigToStackParts,
  getStackPartOptions,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  stackGraphToLegacyProjectConfigForEcosystem,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
} from "../src/stack-graph";
import { createCliDefaultProjectConfigBase } from "../src/defaults";

describe("stack graph", () => {
  it("parses repeated part bindings and lowers them to legacy compatibility fields", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "mobile:react-native:native-bare",
      "backend:go:gin",
      "backend.orm:go:gorm",
      "database:universal:postgres",
    ]);

    expect(stackParts.map((part) => part.role)).toEqual([
      "frontend",
      "mobile",
      "backend",
      "database",
      "orm",
    ]);

    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);
    expect(lowered.ecosystem).toBe("typescript");
    expect(lowered.frontend).toEqual(["next", "native-bare"]);
    expect(lowered.backend).toBe("none");
    expect(lowered.goWebFramework).toBe("gin");
    expect(lowered.goOrm).toBe("gorm");
    expect(lowered.database).toBe("postgres");
  });

  it("lowers scoped graph capability parts through their legacy categories", () => {
    const stackParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.email:elixir:swoosh",
      "backend.caching:elixir:cachex",
      "backend.observability:elixir:telemetry",
    ]);
    const result = validateStackParts(stackParts);
    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);

    expect(result.issues).toEqual([]);
    expect(lowered.elixirWebFramework).toBe("phoenix");
    expect(lowered.elixirEmail).toBe("swoosh");
    expect(lowered.elixirCaching).toBe("cachex");
    expect(lowered.elixirObservability).toBe("telemetry");
  });

  it("projects graph-selected ecosystem capabilities through legacy categories", () => {
    const stackParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.orm:elixir:ecto-sql",
      "backend.api:elixir:absinthe",
      "backend.email:elixir:swoosh",
      "backend.caching:elixir:cachex",
    ]);

    const projected = stackGraphToLegacyProjectConfigForEcosystem(
      {
        ...createCliDefaultProjectConfigBase(),
        projectDir: "/virtual",
        stackParts,
      },
      "elixir",
    );

    expect(projected.backend).toBe("none");
    expect(projected.orm).toBe("none");
    expect(projected.elixirWebFramework).toBe("phoenix");
    expect(projected.elixirOrm).toBe("ecto-sql");
    expect(projected.elixirApi).toBe("absinthe");
    expect(projected.elixirEmail).toBe("swoosh");
    expect(projected.elixirCaching).toBe("cachex");
  });

  it("filters options by role and ecosystem so backend tools do not leak into frontend discovery", () => {
    expect(getStackPartOptions({ role: "frontend", ecosystem: "typescript" })).toContain("next");
    expect(getStackPartOptions({ role: "frontend", ecosystem: "typescript" })).not.toContain(
      "hono",
    );
    expect(getStackPartOptions({ role: "backend", ecosystem: "typescript" })).toContain("hono");
  });

  it("filters capability options by owning framework context", () => {
    const fastApiOptions = getStackPartOptions({
      role: "api",
      ecosystem: "python",
      ownerRole: "backend",
      ownerEcosystem: "python",
      ownerToolId: "fastapi",
    });
    const djangoOptions = getStackPartOptions({
      role: "api",
      ecosystem: "python",
      ownerRole: "backend",
      ownerEcosystem: "python",
      ownerToolId: "django",
    });

    expect(fastApiOptions).not.toContain("django-rest-framework");
    expect(fastApiOptions).not.toContain("django-ninja");
    expect(djangoOptions).toContain("django-rest-framework");
    expect(djangoOptions).toContain("django-ninja");
  });

  it("filters Elixir capability options by owner and generated support", () => {
    const phoenixOptions = getStackPartOptions({
      role: "api",
      ecosystem: "elixir",
      ownerRole: "backend",
      ownerEcosystem: "elixir",
      ownerToolId: "phoenix",
      siblingToolIdsByRole: { orm: "ecto-sql" },
    });
    const liveViewOptions = getStackPartOptions({
      role: "api",
      ecosystem: "elixir",
      ownerRole: "backend",
      ownerEcosystem: "elixir",
      ownerToolId: "phoenix-live-view",
      siblingToolIdsByRole: { orm: "ecto-sql" },
    });

    expect(phoenixOptions).not.toContain("live-view-streams");
    expect(liveViewOptions).toContain("live-view-streams");
    expect(getStackPartOptions({ role: "orm", ecosystem: "elixir" })).not.toContain("ecto");
  });

  it("rejects invalid role bindings", () => {
    const stackParts = parseStackPartSpecs(["frontend:typescript:hono"]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("UNSUPPORTED_ROLE_BINDING");
  });

  it("rejects capability parts without a primary owner", () => {
    const stackParts = parseStackPartSpecs(["backend.orm:go:gorm"]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("MISSING_OWNER_PART");
  });

  it("rejects duplicate selections in the same role scope", () => {
    const stackParts = parseStackPartSpecs([
      "backend:go:gin",
      "backend.orm:go:gorm",
      "backend.orm:go:sqlc",
    ]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("DUPLICATE_ROLE_SCOPE");
  });

  it("rejects scoped capabilities from a different ecosystem than their owner", () => {
    const stackParts = parseStackPartSpecs(["backend:go:gin", "backend.orm:typescript:drizzle"]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("INCOMPATIBLE_OWNER_ECOSYSTEM");
  });

  it("rejects framework-specific capability selections for the wrong owner tool", () => {
    const pythonParts = parseStackPartSpecs([
      "backend:python:fastapi",
      "backend.api:python:django-rest-framework",
    ]);
    const javaParts = parseStackPartSpecs([
      "backend:java:quarkus",
      "backend.auth:java:spring-security",
    ]);

    expect(validateStackParts(pythonParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(javaParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
  });

  it("rejects cross-part graph selections that are not compatible", () => {
    const trpcParts = parseStackPartSpecs([
      "frontend:typescript:svelte",
      "backend:typescript:hono",
      "backend.api:typescript:trpc",
    ]);
    const betterAuthParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.orm:typescript:typeorm",
      "backend.auth:typescript:better-auth",
      "database:universal:postgres",
    ]);

    expect(validateStackParts(trpcParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(validateStackParts(betterAuthParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
  });

  it("rejects Elixir graph selections that the current scaffold cannot generate", () => {
    const liveViewParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.api:elixir:live-view-streams",
    ]);
    const obanParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.orm:elixir:ecto",
      "backend.jobQueue:elixir:oban",
    ]);

    expect(validateStackParts(liveViewParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(obanParts).issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["INCOMPATIBLE_GRAPH_SELECTION", "UNSUPPORTED_GRAPH_TOOL"]),
    );
  });

  it("materializes provided capabilities and rejects conflicts unless overrideable", () => {
    const stackParts = parseStackPartSpecs([
      "backend:typescript:convex",
      "backend.database:universal:postgres",
    ]);
    const result = validateStackParts(stackParts);

    expect(stackParts.some((part) => part.source === "provided" && part.role === "database")).toBe(
      true,
    );
    expect(result.issues.map((issue) => issue.code)).toContain("PROVIDED_CAPABILITY_CONFLICT");
  });

  it("rejects multiple legacy primary web frontends during graph translation", () => {
    expect(() =>
      legacyProjectConfigToStackParts({
        frontend: ["next", "react-vite"],
      }),
    ).toThrow("Multiple primary web frontends");
  });

  it("reports graph-wins mismatches against legacy fields", () => {
    const stackParts = parseStackPartSpecs(["frontend:typescript:next"]);
    const diagnostics = compareLegacyConfigToStackParts(
      { ecosystem: "typescript", frontend: ["react-vite"] },
      stackParts,
    );

    expect(diagnostics).toEqual([
      expect.objectContaining({ code: "LEGACY_CONFIG_MISMATCH", path: "frontend" }),
    ]);
  });
});
