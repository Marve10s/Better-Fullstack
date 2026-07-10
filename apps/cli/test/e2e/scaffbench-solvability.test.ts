import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

import {
  parseArgs,
  SCAFFBENCH_2_SPECS,
  validateProject,
  type BenchmarkSpec,
} from "../../../../scripts/scaffbench/index";
import { scaffoldWithCLIBinary } from "./e2e-utils";

/**
 * ScaffBench 2 per-spec solvability gate.
 *
 * For each benchmark spec, scaffold a project from the spec's OWN canonical
 * flags (not a hand-maintained preset that can drift) and assert the expected
 * stack actually installs/builds/type-checks. If a spec is not solvable, a
 * Better-Fullstack generator regression would otherwise be silently charged to
 * the model in the benchmark — this gate catches that. Reuses the harness's
 * `validateProject` so the gate matches the benchmark's own validation exactly.
 */

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-scaffbench-solvability");
const CLI_BINARY_PATH = join(import.meta.dir, "..", "..", "dist", "cli.mjs");
const SCAFFOLD_TIMEOUT_MS = 300_000;
const TEST_TIMEOUT_MS = 1_200_000;

// Toolchains a spec needs (beyond bun/node) to be validated in this environment.
const SPEC_TOOLCHAINS: Record<string, string[]> = {
  "ai-search-workbench": [],
  "rust-leptos-axum": ["cargo"],
  "python-ingestion-api": ["uv"],
  "go-realtime-api": ["go"],
  "multi-dotnet-ops": ["dotnet"],
  // Expansion batch 1.
  "ts-svelte-edge-orpc": [],
  "dotnet-blazor-cqrs": ["dotnet"],
  "multi-ts-go-grpc": ["go"],
  // Expansion batch 2 (new ecosystems).
  "java-spring-jooq-keycloak": ["mvn"],
  "elixir-broadway-absinthe": ["mix"],
  // Expansion batch 3. react-native is bun-validated; the two frontier specs are
  // supportedByBetterFullstack:false and skipped by selectSpecs (no BFS flags).
  "react-native-expo": [],
};

// Steps that must pass for a stack to count as "solvable". Lint/format/test/
// doctor/route are advisory and not part of the solvability contract.
const ADVISORY_STEPS = new Set(["lint", "format", "test", "doctor", "route"]);

const EXPECTED_FILE_BY_FAMILY: Record<string, string> = {
  typescript: "package.json",
  "multi-ecosystem": "package.json",
  rust: "Cargo.toml",
  python: "pyproject.toml",
  go: "go.mod",
  java: "pom.xml",
  elixir: "mix.exs",
  "react-native": "package.json",
  // dotnet solo nests the .csproj under apps/server; no reliable root manifest,
  // so it is omitted here and judged by validateProject's dotnet detection.
};

function selectSpecs(): BenchmarkSpec[] {
  const filter = process.env.SCAFFBENCH_SOLVABILITY_SPECS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return (
    SCAFFBENCH_2_SPECS
      // Frontier specs (supportedByBetterFullstack === false) are beyond BFS's
      // option space and have no scaffoldable canonical flags — they are
      // prompt-only in the benchmark and cannot be exercised by this gate.
      .filter((spec) => spec.supportedByBetterFullstack)
      .filter((spec) => !filter?.length || filter.includes(spec.id))
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

  for (const spec of selectSpecs()) {
    const missing = (SPEC_TOOLCHAINS[spec.id] ?? []).filter((tool) => !Bun.which(tool));
    const register = missing.length > 0 ? it.skip : it;

    if (missing.length > 0) {
      console.warn(
        `[scaffbench-solvability] SKIP ${spec.id}: missing toolchain(s) ${missing.join(", ")}`,
      );
    }

    register(
      `scaffolds and validates the ${spec.id} stack from its own canonical flags`,
      async () => {
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

        // parseArgs([]) yields safe defaults (qualityGate/doctor/route all off),
        // so validateProject runs only install + build + type-check + native.
        const options = parseArgs([]);
        const validation = await validateProject(spec, projectDir, options);

        // Guard against a VACUOUS pass: if the scaffold produced nothing the
        // validator recognizes (e.g. a hung prompt that left an empty dir), no
        // core step runs and `failures` is trivially empty. A solvable spec must
        // run at least one real CORE step (install/build/typecheck/native).
        const coreSteps = Object.entries(validation.steps).filter(
          ([name, step]) => step && !ADVISORY_STEPS.has(name) && step.status !== "na",
        );
        expect(
          coreSteps.length,
          `no core validation step ran for ${spec.id} — the scaffold produced no recognizable project (likely a missing flag left an interactive prompt)`,
        ).toBeGreaterThan(0);

        const failures = Object.entries(validation.steps)
          .filter(([name, step]) => step && !ADVISORY_STEPS.has(name))
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
