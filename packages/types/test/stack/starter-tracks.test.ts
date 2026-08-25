import { describe, expect, it } from "bun:test";

import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  createCliDefaultProjectConfigBase,
  createStarterTrackFilterSearchParams,
  getProjectConfigEvidence,
  getCapabilityInventory,
  getStarterTrackCatalog,
  GOLDEN_RUNTIME_RECIPES,
  parseStackPartSpecs,
  parseStarterTrackFilters,
  recommendStarterTrack,
  STARTER_TRACK_IDS,
  type ProjectConfig,
  validateStackParts,
} from "@/";

describe("starter tracks", () => {
  it("materializes every track as one valid canonical Stack Graph", () => {
    const catalog = getStarterTrackCatalog();

    expect(catalog.tracks.map((track) => track.id)).toEqual([...STARTER_TRACK_IDS]);
    for (const track of catalog.tracks) {
      const parts = parseStackPartSpecs(track.stackPartSpecs, "selected");
      expect(track.selection.stackMode, track.id).toBe("multi");
      expect(track.selection.stackPartSpecs, track.id).toEqual(track.stackPartSpecs);
      expect(track.compatibility, track.id).toEqual({ valid: true, issues: [] });
      expect(validateStackParts(parts).issues, track.id).toEqual([]);
      expect(
        track.evidence.records.every(
          (record) => !record.limitation.startsWith("No capability inventory record"),
        ),
        track.id,
      ).toBe(true);
    }
  });

  it("does not inherit hidden TypeScript roles into non-TypeScript tracks", () => {
    const tracks = getStarterTrackCatalog().tracks;
    for (const id of ["rest-api", "java-api", "rust-backend"] as const) {
      const track = tracks.find((entry) => entry.id === id);
      expect(track).toBeDefined();
      expect(track?.stackPartSpecs.some((spec) => spec.startsWith("frontend:typescript:"))).toBe(
        false,
      );
      expect(track?.stackPartSpecs).toContain("database:universal:postgres");
    }
  });

  it("round-trips every filter through bounded URL state", () => {
    const filters = {
      evidence: "build-verified" as const,
      runtime: "python" as const,
      deploymentTarget: "container" as const,
      packageManager: "uv" as const,
      database: "postgres" as const,
      auth: "none" as const,
      workspaceShape: "single-app" as const,
    };
    const params = createStarterTrackFilterSearchParams(filters);

    expect(parseStarterTrackFilters(Object.fromEntries(params))).toEqual(filters);
    expect(params.toString()).not.toContain("undefined");
  });

  it("filters only already-valid graphs and honors the evidence hierarchy", () => {
    const runtimeInventory = getCapabilityInventory().map((record) => ({
      ...record,
      evidenceLevel: "runtime-verified" as const,
      freshness: "current" as const,
    }));
    const result = getStarterTrackCatalog({
      inventory: runtimeInventory,
      filters: {
        evidence: "build-verified",
        runtime: "python",
        database: "postgres",
        workspaceShape: "single-app",
      },
    });

    expect(result.tracks.map((track) => track.id)).toEqual(["rest-api"]);
    expect(result.tracks[0]?.compatibility.valid).toBe(true);
  });

  it("recommends deterministic, evidence-bearing valid tracks", () => {
    const cases = [
      ["sell subscriptions with Stripe", "saas-app"],
      ["an MCP AI agent assistant", "ai-agent-app"],
      ["a Python FastAPI REST service", "rest-api"],
      ["a secure Spring Boot API", "java-api"],
      ["an Axum Rust backend", "rust-backend"],
      ["a React Native app for iOS", "mobile-app"],
      ["an admin CRUD dashboard", "internal-tool"],
    ] as const;

    for (const [brief, id] of cases) {
      const first = recommendStarterTrack(brief);
      const second = recommendStarterTrack(brief);
      expect(first.track.id, brief).toBe(id);
      expect(second, brief).toEqual(first);
      expect(first.modelUsed).toBe(false);
      expect(first.track.compatibility.valid).toBe(true);
      expect(first.track.evidence.level).toBeDefined();
    }
  });

  it("does not match short keywords inside ordinary words", () => {
    const result = recommendStarterTrack("email newsletter");

    expect(result.track.id).toBe("saas-app");
    expect(result.matchedTerms).not.toContain("ai");
    expect(result.score).toBe(0);
  });

  it("matches ecosystem names only as whole tokens", () => {
    const result = recommendStarterTrack("a JavaScript service");

    expect(result.track.id).toBe("rest-api");
    expect(result.matchedTerms).not.toContain("java");
  });

  it("derives project evidence from authoritative Stack Parts", () => {
    const config = {
      ...createCliDefaultProjectConfigBase(),
      projectName: "multi-service",
      projectDir: "/multi-service",
      relativePath: "multi-service",
      stackParts: parseStackPartSpecs(["backend:go:gin:api", "backend:rust:axum:worker"]),
    } as ProjectConfig;

    const evidence = getProjectConfigEvidence(config);

    expect(evidence.partCount).toBe(2);
    expect(evidence.records.map((record) => record.partSpec)).toEqual([
      "backend:go:gin:api",
      "backend:rust:axum:worker",
    ]);
  });

  it("rejects receipts that do not match the expected producer", () => {
    const receipt = {
      schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
      evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
      receiptType: "better-fullstack/capability-runtime" as const,
      sourceSha: "a".repeat(40),
      catalogVersion: "2.6.1",
      producerFingerprint: "b".repeat(64),
      createdAt: new Date().toISOString(),
      toolchains: {},
      recipes: GOLDEN_RUNTIME_RECIPES.map((recipe) => ({
        id: recipe.id,
        definitionVersion: recipe.definitionVersion,
        success: true,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        flakyRuns: 0,
        repairMinutes: 0,
        dependencyChanges: 0,
        maintainerPresent: true,
      })),
    };

    const catalog = getStarterTrackCatalog({
      receipt,
      catalogVersion: "2.6.1",
      producerFingerprint: "c".repeat(64),
    });

    expect(catalog.tracks.every((track) => track.evidence.freshness === "producer-mismatch")).toBe(
      true,
    );
  });
});
