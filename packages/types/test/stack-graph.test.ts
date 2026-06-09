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
import {
  API_VALUES,
  AUTH_VALUES,
  BACKEND_VALUES,
  DATABASE_VALUES,
  ELIXIR_API_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_ORM_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_ORM_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  ORM_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  RUST_API_VALUES,
  RUST_AUTH_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
} from "../src/schemas";
import type { ProjectConfig } from "../src/types";

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

function expectNoDrift(config: Partial<ProjectConfig>) {
  const parts = legacyProjectConfigToStackParts(config);
  const diagnostics = compareLegacyConfigToStackParts(config, parts);
  expect(diagnostics).toEqual([]);
  return stackPartsToLegacyProjectConfigPartial(parts);
}

function structuralTuple(part: { role: string; ecosystem: string; toolId: string }) {
  return `${part.role}:${part.ecosystem}:${part.toolId}`;
}

// Phase 0 of docs/plans/planned/single-source-of-truth-stack-graph.md: prove
// flat -> graph -> flat is lossless for every structural option value, by
// asserting the runtime drift guard never fires across the enumerated space.
describe("stack graph structural round-trip (phase 0)", () => {
  const NATIVE_FRONTENDS = ["native-bare", "native-uniwind", "native-unistyles"] as const;
  const WEB_FRONTENDS = FRONTEND_VALUES.filter(
    (value) => value !== "none" && !NATIVE_FRONTENDS.includes(value as never),
  );

  const TS_BASE: Partial<ProjectConfig> = {
    ecosystem: "typescript",
    frontend: ["tanstack-router"],
    backend: "hono",
    database: "sqlite",
    orm: "drizzle",
    api: "trpc",
    auth: "better-auth",
  };

  it("round-trips every TypeScript web frontend without drift", () => {
    for (const frontend of WEB_FRONTENDS) {
      const derived = expectNoDrift({ ...TS_BASE, frontend: [frontend] });
      expect(derived.frontend).toEqual([frontend]);
    }
  });

  it("round-trips every TypeScript backend, database, orm, api, and auth value", () => {
    for (const backend of BACKEND_VALUES) {
      expectNoDrift({ ...TS_BASE, backend });
    }
    for (const database of DATABASE_VALUES) {
      expectNoDrift({ ...TS_BASE, database });
    }
    for (const orm of ORM_VALUES) {
      expectNoDrift({ ...TS_BASE, orm });
    }
    for (const api of API_VALUES) {
      expectNoDrift({ ...TS_BASE, api });
    }
    for (const auth of AUTH_VALUES) {
      expectNoDrift({ ...TS_BASE, auth });
    }
  });

  it("round-trips every native mobile frontend without drift", () => {
    for (const frontend of NATIVE_FRONTENDS) {
      const derived = expectNoDrift({
        ecosystem: "react-native",
        frontend: [frontend],
        backend: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "better-auth",
      });
      expect(derived.frontend).toEqual([frontend]);
      expect(derived.ecosystem).toBe("react-native");
    }
  });

  it("round-trips every legacy-ecosystem backend and capability value", () => {
    const cases = [
      {
        ecosystem: "rust",
        backendField: "rustWebFramework",
        backends: RUST_WEB_FRAMEWORK_VALUES,
        capabilities: { rustOrm: RUST_ORM_VALUES, rustApi: RUST_API_VALUES, rustAuth: RUST_AUTH_VALUES },
      },
      {
        ecosystem: "python",
        backendField: "pythonWebFramework",
        backends: PYTHON_WEB_FRAMEWORK_VALUES,
        capabilities: {
          pythonOrm: PYTHON_ORM_VALUES,
          pythonApi: PYTHON_API_VALUES,
          pythonAuth: PYTHON_AUTH_VALUES,
        },
      },
      {
        ecosystem: "go",
        backendField: "goWebFramework",
        backends: GO_WEB_FRAMEWORK_VALUES,
        capabilities: { goOrm: GO_ORM_VALUES, goApi: GO_API_VALUES, goAuth: GO_AUTH_VALUES },
      },
      {
        ecosystem: "java",
        backendField: "javaWebFramework",
        backends: JAVA_WEB_FRAMEWORK_VALUES,
        capabilities: { javaOrm: JAVA_ORM_VALUES, javaAuth: JAVA_AUTH_VALUES },
      },
      {
        ecosystem: "elixir",
        backendField: "elixirWebFramework",
        backends: ELIXIR_WEB_FRAMEWORK_VALUES,
        capabilities: {
          elixirOrm: ELIXIR_ORM_VALUES,
          elixirApi: ELIXIR_API_VALUES,
          elixirAuth: ELIXIR_AUTH_VALUES,
        },
      },
    ] as const;

    for (const { ecosystem, backendField, backends, capabilities } of cases) {
      const anchor = backends.find((value) => value !== "none");
      for (const backend of backends.filter((value) => value !== "none")) {
        const derived = expectNoDrift({ ecosystem, [backendField]: backend });
        expect(derived[backendField]).toBe(backend);
        expect(derived.ecosystem).toBe(ecosystem);
      }
      for (const [field, values] of Object.entries(capabilities)) {
        for (const value of values) {
          const derived = expectNoDrift({
            ecosystem,
            [backendField]: anchor,
            [field]: value,
          });
          expect(derived[field as keyof ProjectConfig] ?? "none").toBe(value);
        }
      }
    }
  });

  it("round-trips the Rust WASM frontend selections", () => {
    for (const rustFrontend of RUST_FRONTEND_VALUES.filter((value) => value !== "none")) {
      const derived = expectNoDrift({
        ecosystem: "rust",
        rustWebFramework: "axum",
        rustFrontend,
      });
      expect(derived.rustFrontend).toBe(rustFrontend);
    }
  });

  it("keeps single-ecosystem structural graphs stable through flat lowering and re-import", () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "database:universal:postgres",
      "backend.orm:typescript:drizzle",
      "backend.api:typescript:trpc",
      "backend.auth:typescript:better-auth",
    ]);
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    const reimported = legacyProjectConfigToStackParts(lowered);

    expect(reimported.map(structuralTuple).sort()).toEqual(parts.map(structuralTuple).sort());
  });

  // Documented gap (phase-0 inventory §1): these categories are registered in
  // STACK_TOOL_DEFINITIONS but legacyProjectConfigToStackParts never imports
  // them. Phase 2 Batch 0 closes this gap and must flip this expectation.
  it("documents the importer gap for registered ecosystem extras", () => {
    const parts = legacyProjectConfigToStackParts({
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirEmail: "swoosh",
      elixirCaching: "cachex",
    });
    expect(parts.some((part) => part.role === "email")).toBe(false);
    expect(parts.some((part) => part.role === "caching")).toBe(false);
  });

  // Documented limitation: a multi-ecosystem graph lowered to the flat config
  // cannot be re-imported losslessly because the importer keys off the single
  // `ecosystem` field. This is the authority flip motivation in the design doc.
  it("documents that multi-ecosystem graphs do not survive flat re-import", () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:go:gin",
      "backend.orm:go:gorm",
    ]);
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    expect(lowered.goWebFramework).toBe("gin");

    const reimported = legacyProjectConfigToStackParts(lowered);
    expect(reimported.some((part) => part.role === "backend")).toBe(false);
  });
});
