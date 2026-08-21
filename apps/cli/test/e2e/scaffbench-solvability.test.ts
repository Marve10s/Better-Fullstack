import * as BunContext from "@effect/platform-bun/BunContext";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

import {
  isAdvisoryStep,
  parseArgs,
  SCAFFBENCH_2_SPECS,
  validateProject,
  type BenchmarkSpec,
} from "../../../../scripts/scaffbench/index";
import { scaffoldWithCLIBinary } from "./e2e-utils";

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-scaffbench-solvability");
const CLI_BINARY_PATH = join(import.meta.dir, "..", "..", "dist", "cli.mjs");
const SCAFFOLD_TIMEOUT_MS = 300_000;
const TEST_TIMEOUT_MS = 1_200_000;

const SPEC_TOOLCHAINS: Record<string, string[]> = {
  "ai-search-workbench": [],
  "rust-leptos-axum": ["cargo"],
  "python-ingestion-api": ["uv"],
  "go-realtime-api": ["go"],
  "multi-dotnet-ops": ["dotnet"],
  "ts-svelte-edge-orpc": [],
  "dotnet-blazor-cqrs": ["dotnet"],
  "multi-ts-go-grpc": ["go"],
  "java-spring-jooq-keycloak": ["mvn"],
  "elixir-broadway-absinthe": ["mix"],
  "react-native-expo": [],
};

const EXPECTED_FILE_BY_FAMILY: Record<string, string> = {
  typescript: "package.json",
  "multi-ecosystem": "package.json",
  rust: "Cargo.toml",
  python: "pyproject.toml",
  go: "go.mod",
  java: "pom.xml",
  elixir: "mix.exs",
  "react-native": "package.json",
};

function selectSpecs(): BenchmarkSpec[] {
  const filter = process.env.SCAFFBENCH_SOLVABILITY_SPECS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return SCAFFBENCH_2_SPECS.filter((spec) => spec.supportedByBetterFullstack).filter(
    (spec) => !filter?.length || filter.includes(spec.id),
  );
}

function runValidation(spec: BenchmarkSpec, projectDir: string) {
  return Effect.runPromise(
    validateProject(spec, projectDir, parseArgs([])).pipe(Effect.provide(BunContext.layer)),
  );
}

describe("ScaffBench 2 spec solvability", () => {
  beforeAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
    await mkdir(SMOKE_DIR, { recursive: true });
  });

  afterAll(async () => {
    if (!process.env.CI) {
      await rm(SMOKE_DIR, { recursive: true, force: true });
    }
  });

  it("executes the ScaffBench validation Effect at the test boundary", async () => {
    const emptyProjectDir = join(SMOKE_DIR, "effect-execution-contract");
    await mkdir(emptyProjectDir, { recursive: true });

    const validation = await runValidation(SCAFFBENCH_2_SPECS[0]!, emptyProjectDir);

    expect(Effect.isEffect(validation)).toBe(false);
    expect(validation.steps["unvalidated:project"]?.status).toBe("ran");
    expect(validation.steps["unvalidated:project"]?.exitCode).toBe(1);
  });

  for (const spec of selectSpecs()) {
    const missing = (SPEC_TOOLCHAINS[spec.id] ?? []).filter((tool) => !Bun.which(tool));
    const register = missing.length > 0 && !process.env.CI ? it.skip : it;

    if (missing.length > 0 && !process.env.CI) {
      console.warn(
        `[scaffbench-solvability] SKIP ${spec.id}: missing toolchain(s) ${missing.join(", ")}`,
      );
    }

    register(
      `scaffolds and validates the ${spec.id} stack from its own canonical flags`,
      async () => {
        expect(
          missing,
          `CI is missing required toolchain(s) for ${spec.id}: ${missing.join(", ")}`,
        ).toEqual([]);
        const projectDir = join(SMOKE_DIR, spec.id);
        const expectedFile = EXPECTED_FILE_BY_FAMILY[spec.family];

        const scaffold = await scaffoldWithCLIBinary(projectDir, [...spec.canonicalFlags], {
          cliPath: CLI_BINARY_PATH,
          timeout: SCAFFOLD_TIMEOUT_MS,
          expectedFiles: expectedFile ? [expectedFile] : [],
        });
        expect(scaffold.ok, `scaffold failed for ${spec.id}: ${scaffold.stderrTail ?? ""}`).toBe(
          true,
        );

        const validation = await runValidation(spec, projectDir);

        const coreSteps = Object.entries(validation.steps).filter(
          ([name, step]) => step && !isAdvisoryStep(name) && step.status !== "na",
        );
        expect(
          coreSteps.length,
          `no core validation step ran for ${spec.id}, the scaffold produced no recognizable project (likely a missing flag left an interactive prompt)`,
        ).toBeGreaterThan(0);

        const failures = Object.entries(validation.steps)
          .filter(([name, step]) => step && !isAdvisoryStep(name) && step.status !== "na")
          .filter(([, step]) => step!.exitCode !== 0 || step!.timedOut)
          .map(([name, step]) => ({
            name,
            command: step!.command,
            exitCode: step!.exitCode,
            timedOut: step!.timedOut,
            spawnError: step!.spawnError ?? false,
            stderrTail: step!.stderrTail?.slice(-1000),
          }));

        expect(
          failures,
          `solvability validation failed for ${spec.id}:\n${JSON.stringify(failures, null, 2)}`,
        ).toEqual([]);
      },
      TEST_TIMEOUT_MS,
    );
  }
});
