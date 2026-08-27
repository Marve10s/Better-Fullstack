import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  GOLDEN_RUNTIME_RECIPES,
  parseStackPartSpecs,
  validateStackParts,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { getCompatibilityExplanationResult } from "@/commands/stack/compatibility";
import {
  getStarterTrackRecommendation,
  getStarterTracksResult,
} from "@/commands/stack/starter-tracks";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";

describe("starter track CLI service", () => {
  it("returns only matching schema-valid tracks", () => {
    const result = getStarterTracksResult({
      filters: { runtime: "python", deploymentTarget: "container", database: "postgres" },
    });

    expect(result.tracks.map((track) => track.id)).toEqual(["rest-api"]);
    expect(validateStackParts(parseStackPartSpecs(result.tracks[0].stackPartSpecs)).issues).toEqual(
      [],
    );
  });

  it("returns a reproducible graph command from the same recommended track", () => {
    const result = getStarterTrackRecommendation({
      brief: "a Rust backend service",
      projectName: "events-api",
    });

    expect(result.track.id).toBe("rust-backend");
    expect(result.track.selection.projectName).toBe("events-api");
    expect(result.reproducibleCommand).toContain(" events-api ");
    for (const part of result.track.stackPartSpecs) {
      expect(result.reproducibleCommand).toContain(`--part ${part}`);
    }
  });

  it("uses the shared structured compatibility explanation for CLI output", () => {
    const track = getStarterTracksResult({ trackId: "java-api" }).tracks[0];
    const result = getCompatibilityExplanationResult(track.selection, "search", "algolia");

    expect(result.compatible).toBe(false);
    expect(result.message).toBe(result.explanation?.message);
    expect(result.explanation?.capability.id).toBe("search:algolia");
    expect(result.explanation?.owner.stackPart?.id).toBe("backend:java:spring-boot");
  });

  it("prints recommendation JSON without human logger framing", async () => {
    const child = Bun.spawn(
      [
        process.execPath,
        resolve(import.meta.dir, "../../src/cli.ts"),
        "recommend",
        "--brief",
        "Python REST API with Postgres",
        "--ecosystem",
        "python",
        "--json",
      ],
      {
        env: { ...process.env, BTS_TELEMETRY: "0" },
        stdout: "pipe",
        stderr: "pipe",
      },
    );
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
      child.exited,
    ]);

    expect(exitCode, stderr).toBe(0);
    expect(stdout).not.toContain("\u001b");
    const result = JSON.parse(stdout) as { modelUsed: boolean; track: { id: string } };
    expect(result.track.id).toBe("rest-api");
    expect(result.modelUsed).toBe(false);
  });

  it("rejects a self-consistent receipt from another producer", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "bfs-track-receipt-"));
    const receiptPath = resolve(root, "receipt.json");
    const createdAt = new Date().toISOString();
    const callerFingerprint = "b".repeat(64);
    await writeFile(
      receiptPath,
      JSON.stringify({
        schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
        evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
        receiptType: "better-fullstack/capability-runtime",
        sourceSha: "a".repeat(40),
        catalogVersion: getLatestCLIVersion(),
        producerFingerprint: callerFingerprint,
        createdAt,
        toolchains: {},
        recipes: GOLDEN_RUNTIME_RECIPES.map((recipe) => ({
          id: recipe.id,
          definitionVersion: recipe.definitionVersion,
          success: true,
          startedAt: createdAt,
          completedAt: createdAt,
          flakyRuns: 0,
          repairMinutes: 0,
          dependencyChanges: 0,
          maintainerPresent: true,
        })),
      }),
    );

    try {
      const child = Bun.spawn(
        [
          process.execPath,
          resolve(import.meta.dir, "../../src/cli.ts"),
          "tracks",
          "--receipt",
          receiptPath,
          "--json",
        ],
        {
          env: {
            ...process.env,
            BTS_CAPABILITY_PRODUCER_FINGERPRINT: "c".repeat(64),
            BTS_TELEMETRY: "0",
          },
          stdout: "pipe",
          stderr: "pipe",
        },
      );
      const [stdout, stderr, exitCode] = await Promise.all([
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
        child.exited,
      ]);

      expect(exitCode, stderr).toBe(0);
      const result = JSON.parse(stdout) as {
        tracks: Array<{ evidence: { freshness: string; level: string } }>;
      };
      expect(
        result.tracks.every(
          (track) =>
            track.evidence.freshness === "producer-mismatch" && track.evidence.level === "listed",
        ),
      ).toBe(true);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
