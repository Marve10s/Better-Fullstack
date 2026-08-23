import { describe, expect, it } from "bun:test";

import {
  createStarterTrackFilterSearchParams,
  getCapabilityInventory,
  getStarterTrackCatalog,
  parseStackPartSpecs,
  parseStarterTrackFilters,
  recommendStarterTrack,
  STARTER_TRACK_IDS,
  validateStackParts,
} from "../src";

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
});
