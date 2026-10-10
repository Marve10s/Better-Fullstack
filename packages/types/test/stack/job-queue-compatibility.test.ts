import { describe, expect, it } from "bun:test";

import type { CompatibilityInput } from "@/stack/compatibility";

import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import {
  analyzeStackCompatibility,
  getDisabledReason,
  getJobQueueIncompatibility,
} from "@/stack/compatibility";
import {
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  validateStackParts,
} from "@/stack/stack-graph";
import {
  DEFAULT_STACK_SELECTION,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  normalizeStackSelection,
  parseStackSelectionFromUrlRecord,
} from "@/stack/stack-translation";

function compatibilityInput(overrides: Partial<CompatibilityInput>): CompatibilityInput {
  return { ...DEFAULT_STACK_SELECTION, ...overrides };
}

function graphIssues(overrides: Record<string, string>) {
  const config = {
    ...createCliDefaultProjectConfigBase("bun"),
    projectName: "jobs",
    backend: "hono",
    runtime: "bun",
    database: "postgres",
    orm: "drizzle",
    ...overrides,
  } as Parameters<typeof legacyProjectConfigToStackParts>[0];
  return validateStackParts(legacyProjectConfigToStackParts(config)).issues.map(
    (issue) => issue.message,
  );
}

const REJECTED = [
  {
    jobQueue: "pg-boss",
    stack: { backend: "hono", runtime: "bun", database: "sqlite" },
    reason: "pg-boss requires PostgreSQL",
  },
  {
    jobQueue: "pg-boss",
    stack: { backend: "hono", runtime: "workers", database: "postgres" },
    reason: "pg-boss needs a long-running Node.js or Bun worker process, not Cloudflare Workers",
  },
  {
    jobQueue: "hatchet",
    stack: { backend: "hono", runtime: "workers", database: "sqlite" },
    reason: "Hatchet needs a long-running Node.js or Bun worker process, not Cloudflare Workers",
  },
  {
    jobQueue: "hatchet",
    stack: { backend: "nestjs", runtime: "node", database: "sqlite" },
    reason: "Hatchet is generated for Hono, Express, Fastify, and Elysia backends",
  },
  {
    jobQueue: "upstash-qstash",
    stack: { backend: "nestjs", runtime: "node", database: "sqlite" },
    reason: "Upstash QStash is generated for Hono, Express, Fastify, and Elysia backends",
  },
] as const;

describe("generated job queue compatibility", () => {
  for (const { jobQueue, stack, reason } of REJECTED) {
    it(`rejects ${jobQueue} on ${stack.backend}/${stack.runtime}/${stack.database} everywhere with one reason`, () => {
      const input = compatibilityInput({ ...stack, jobQueue });

      expect(getDisabledReason(input, "jobQueue", jobQueue)).toBe(reason);

      const analysis = analyzeStackCompatibility(input);
      expect(analysis.adjustedStack?.jobQueue).toBe("none");
      expect(analysis.changes).toContainEqual({
        category: "jobQueue",
        message: `Job queue set to 'None' (${reason})`,
      });

      expect(graphIssues({ ...stack, jobQueue })).toContain(`${reason}.`);
    });
  }

  it("accepts the stacks the generator wires", () => {
    const accepted = [
      { jobQueue: "pg-boss", backend: "express", runtime: "node", database: "postgres" },
      { jobQueue: "hatchet", backend: "fastify", runtime: "node", database: "sqlite" },
      { jobQueue: "upstash-qstash", backend: "hono", runtime: "workers", database: "sqlite" },
      { jobQueue: "upstash-qstash", backend: "elysia", runtime: "bun", database: "none" },
    ] as const;

    for (const { jobQueue, ...stack } of accepted) {
      const input = compatibilityInput({ ...stack, jobQueue });
      expect(getDisabledReason(input, "jobQueue", jobQueue)).toBeNull();
      expect(
        graphIssues({ ...stack, jobQueue }).filter((message) => message.includes("job")),
      ).toEqual([]);
    }
  });

  it("judges pg-boss by the standalone database generation uses over a backend-owned one", () => {
    const graphMessages = (standalone: string, owned: string) =>
      validateStackParts(
        parseStackPartSpecs([
          "backend:typescript:hono",
          "backend.runtime:typescript:bun",
          "backend.orm:typescript:prisma",
          `database:universal:${standalone}`,
          `backend.database:universal:${owned}`,
          "backend.jobQueue:typescript:pg-boss",
        ]),
      ).issues.map((issue) => issue.message);

    expect(graphMessages("mongodb", "postgres")).toContain("pg-boss requires PostgreSQL.");
    expect(graphMessages("postgres", "mongodb")).toEqual([]);
  });

  it("judges only answered selections for partial input", () => {
    const partial = { partial: true };

    expect(getJobQueueIncompatibility("pg-boss", {}, partial)).toBeNull();
    expect(
      getJobQueueIncompatibility("pg-boss", { backend: "hono", runtime: "bun" }, partial),
    ).toBe(null);
    expect(getJobQueueIncompatibility("pg-boss", { database: "sqlite" }, partial)).toBe(
      "pg-boss requires PostgreSQL",
    );
    expect(getJobQueueIncompatibility("hatchet", { runtime: "workers" }, partial)).toBe(
      "Hatchet needs a long-running Node.js or Bun worker process, not Cloudflare Workers",
    );
    expect(getJobQueueIncompatibility("upstash-qstash", { backend: "nestjs" }, partial)).toBe(
      "Upstash QStash is generated for Hono, Express, Fastify, and Elysia backends",
    );
    // A complete stack still treats a missing backend or database as unsupported.
    expect(getJobQueueIncompatibility("pg-boss", { backend: "hono" })).toBe(
      "pg-boss requires PostgreSQL",
    );
  });

  it("round-trips the new options through builder URLs and the reproducible command", () => {
    for (const jobQueue of ["pg-boss", "upstash-qstash", "hatchet"] as const) {
      const selection = normalizeStackSelection({
        ...DEFAULT_STACK_SELECTION,
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        jobQueue,
      });
      const params = Object.fromEntries(createStackSelectionSearchParams(selection));
      expect(params.jq).toBe(jobQueue);
      expect(parseStackSelectionFromUrlRecord(params).jobQueue).toBe(jobQueue);
      expect(generateStackSelectionCommand(selection)).toContain(`--job-queue ${jobQueue}`);
    }
  });
});
