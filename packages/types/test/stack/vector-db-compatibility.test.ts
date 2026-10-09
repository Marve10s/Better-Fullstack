import { describe, expect, it } from "bun:test";

import type { CompatibilityInput } from "@/stack/compatibility";

import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import {
  analyzeStackCompatibility,
  getDisabledReason,
  getVectorDbIncompatibility,
} from "@/stack/compatibility";
import { legacyProjectConfigToStackParts, validateStackParts } from "@/stack/stack-graph";
import {
  DEFAULT_STACK_SELECTION,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  normalizeStackSelection,
  parseStackSelectionFromUrlRecord,
} from "@/stack/stack-translation";

const WEAVIATE_REASON =
  "Weaviate's TypeScript client uses gRPC and needs the Node.js or Bun runtime, not Cloudflare Workers";
const LANCEDB_REASON =
  "LanceDB is an embedded native database and needs a standalone Node.js or Bun server";

function compatibilityInput(overrides: Partial<CompatibilityInput>): CompatibilityInput {
  return { ...DEFAULT_STACK_SELECTION, ...overrides };
}

function graphIssues(overrides: Record<string, unknown>) {
  const config = {
    ...createCliDefaultProjectConfigBase("bun"),
    projectName: "vectors",
    backend: "hono",
    runtime: "bun",
    ...overrides,
  } as Parameters<typeof legacyProjectConfigToStackParts>[0];
  return validateStackParts(legacyProjectConfigToStackParts(config)).issues.map(
    (issue) => issue.message,
  );
}

const REJECTED: {
  vectorDb: string;
  builder: Partial<CompatibilityInput>;
  graph: Record<string, unknown>;
  reason: string;
}[] = [
  {
    vectorDb: "weaviate",
    builder: { backend: "hono", runtime: "workers", serverDeploy: "cloudflare" },
    graph: { backend: "hono", runtime: "workers", serverDeploy: "cloudflare" },
    reason: WEAVIATE_REASON,
  },
  {
    vectorDb: "weaviate",
    builder: {
      backend: "self-next",
      runtime: "none",
      webFrontend: ["next"],
      webDeploy: "cloudflare",
    },
    graph: { backend: "self", runtime: "none", frontend: ["next"], webDeploy: "cloudflare" },
    reason: WEAVIATE_REASON,
  },
  {
    vectorDb: "lancedb",
    builder: { backend: "hono", runtime: "workers", serverDeploy: "cloudflare" },
    graph: { backend: "hono", runtime: "workers", serverDeploy: "cloudflare" },
    reason: LANCEDB_REASON,
  },
  {
    vectorDb: "lancedb",
    builder: { backend: "self-next", runtime: "none", webFrontend: ["next"] },
    graph: { backend: "self", runtime: "none", frontend: ["next"] },
    reason: LANCEDB_REASON,
  },
];

describe("vector database compatibility", () => {
  for (const { vectorDb, builder, graph, reason } of REJECTED) {
    it(`rejects ${vectorDb} on ${builder.backend}/${builder.runtime} everywhere with one reason`, () => {
      const input = compatibilityInput({ ...builder, vectorDb });

      expect(getDisabledReason(input, "vectorDb", vectorDb)).toBe(`${reason}.`);

      const analysis = analyzeStackCompatibility(input);
      expect(analysis.adjustedStack?.vectorDb).toBe("none");
      expect(analysis.changes).toContainEqual({
        category: "vectorDb",
        message: `Vector database set to 'None' (${reason})`,
      });

      expect(graphIssues({ ...graph, vectorDb })).toContain(`${reason}.`);
    });
  }

  it("accepts the stacks the generator wires", () => {
    const accepted = [
      { vectorDb: "weaviate", backend: "express", runtime: "node" },
      { vectorDb: "weaviate", backend: "elysia", runtime: "bun" },
      { vectorDb: "lancedb", backend: "hono", runtime: "bun" },
      { vectorDb: "lancedb", backend: "fastify", runtime: "node" },
      { vectorDb: "upstash-vector", backend: "hono", runtime: "workers" },
      { vectorDb: "turbopuffer", backend: "hono", runtime: "workers" },
    ] as const;

    for (const { vectorDb, ...stack } of accepted) {
      const serverDeploy = stack.runtime === "workers" ? "cloudflare" : "none";
      const input = compatibilityInput({ ...stack, serverDeploy, vectorDb });
      expect(getDisabledReason(input, "vectorDb", vectorDb)).toBeNull();
      expect(graphIssues({ ...stack, serverDeploy, vectorDb })).toEqual([]);
    }

    for (const vectorDb of ["weaviate", "upstash-vector", "turbopuffer"] as const) {
      const input = compatibilityInput({
        backend: "self-next",
        runtime: "none",
        webFrontend: ["next"],
        vectorDb,
      });
      expect(getDisabledReason(input, "vectorDb", vectorDb)).toBeNull();
    }
  });

  it("judges only answered selections for partial input", () => {
    const partial = { partial: true };

    expect(getVectorDbIncompatibility("lancedb", {}, partial)).toBeNull();
    expect(getVectorDbIncompatibility("lancedb", { backend: "hono" }, partial)).toBeNull();
    expect(getVectorDbIncompatibility("lancedb", { backend: "self" }, partial)).toBe(
      LANCEDB_REASON,
    );
    expect(getVectorDbIncompatibility("weaviate", { runtime: "workers" }, partial)).toBe(
      WEAVIATE_REASON,
    );
    expect(getVectorDbIncompatibility("upstash-vector", { runtime: "workers" })).toBeNull();
    expect(getVectorDbIncompatibility("lancedb", { backend: "hono" })).toBe(LANCEDB_REASON);
  });

  it("round-trips the new options through builder URLs and the reproducible command", () => {
    for (const vectorDb of ["weaviate", "upstash-vector", "turbopuffer", "lancedb"] as const) {
      const selection = normalizeStackSelection({
        ...DEFAULT_STACK_SELECTION,
        backend: "hono",
        runtime: "bun",
        vectorDb,
      });
      const params = Object.fromEntries(createStackSelectionSearchParams(selection));
      expect(params.vdb).toBe(vectorDb);
      expect(parseStackSelectionFromUrlRecord(params).vectorDb).toBe(vectorDb);
      expect(generateStackSelectionCommand(selection)).toContain(`--vector-db ${vectorDb}`);
    }
  });
});
