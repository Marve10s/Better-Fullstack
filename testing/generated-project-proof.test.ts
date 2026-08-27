import {
  hasEligibleEvidenceIdentity,
  missingRequiredSteps,
  GENERATED_PROJECT_PROOF_CASES,
} from "@testing/lib/generated-project-proof-matrix";
import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";

describe("generated project runtime proof matrix", () => {
  it("pins the exact required lifecycle cases and toolchains", () => {
    expect(GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.id)).toEqual([
      "typescript",
      "react-native",
      "rust",
      "python",
      "go",
      "java",
      "elixir",
      "dotnet",
    ]);
    expect(
      new Set(GENERATED_PROJECT_PROOF_CASES.flatMap((entry) => entry.requiredToolchains)),
    ).toEqual(
      new Set(["node", "bun", "bunx", "go", "python", "uv", "cargo", "java", "mix", "dotnet"]),
    );
    expect(new Set(GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.ecosystem))).toEqual(
      new Set(["typescript", "react-native", "rust", "python", "go", "java", "elixir", "dotnet"]),
    );
    expect(
      GENERATED_PROJECT_PROOF_CASES.every((entry) => entry.requiredSteps.includes("scaffold")),
    ).toBe(true);
    expect(
      GENERATED_PROJECT_PROOF_CASES.every(
        (entry) =>
          entry.requiredSteps.includes("runtime") &&
          entry.runtime.command.length > 0 &&
          entry.runtime.bodyIncludes.length > 0 &&
          entry.runtime.limitation.length > 0 &&
          entry.maintainer.length > 0,
      ),
    ).toBe(true);
    expect(GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "go")?.requiredSteps).toEqual(
      expect.arrayContaining(["mod-tidy", "build"]),
    );
    expect(
      GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "react-native")?.flags,
    ).toEqual(
      expect.arrayContaining(["mobile:react-native:native-bare", "backend:typescript:hono"]),
    );
    expect(
      GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "typescript")?.runtime.command,
    ).toEqual(["bun", "run", "--cwd", "apps/server", "dev"]);
    expect(
      GENERATED_PROJECT_PROOF_CASES.every(
        (entry) =>
          entry.stackParts.length > 0 &&
          entry.stackParts.every((part) => part.split(":").length === 3),
      ),
    ).toBe(true);
  });

  it("fails closed when a required step is absent, skipped, or failed", () => {
    expect(
      missingRequiredSteps(
        ["scaffold", "install", "build"],
        [
          { step: "scaffold", success: true },
          { step: "install", success: true, skipped: true },
          { step: "lint", success: true },
        ],
      ),
    ).toEqual(["install", "build"]);
    expect(
      missingRequiredSteps(
        ["scaffold", "build"],
        [
          { step: "scaffold", success: true },
          { step: "build", success: false },
        ],
      ),
    ).toEqual(["build"]);
  });

  it("only admits evidence bound to a full SHA and a clean run", () => {
    expect(hasEligibleEvidenceIdentity("a".repeat(40), true, true)).toBe(true);
    expect(hasEligibleEvidenceIdentity("abc123", true, true)).toBe(false);
    expect(hasEligibleEvidenceIdentity("a".repeat(40), false, true)).toBe(false);
    expect(hasEligibleEvidenceIdentity("a".repeat(40), true, false)).toBe(false);
  });

  it("wires the evidence lane to the always-fresh CLI builder", async () => {
    const source = await readFile(new URL("./generated-project-proof.ts", import.meta.url), "utf8");
    expect(source).toContain("await buildFreshCliBinary()");
    expect(source).not.toContain("ensureBuiltCliBinary");
  });

  it("builds workspace exports before clean-checkout lifecycle tests", async () => {
    const workflow = await readFile(
      new URL("../.github/workflows/generated-project-proof.yaml", import.meta.url),
      "utf8",
    );
    const typesBuild = workflow.indexOf("bun run --cwd packages/types build");
    const projectLifecycleBuild = workflow.indexOf(
      "bun run --cwd packages/project-lifecycle build",
    );
    const generatorBuild = workflow.indexOf("bun run --cwd packages/template-generator build");
    const cliBuild = workflow.indexOf("bun run --cwd apps/cli build");
    const lifecycleTests = workflow.indexOf("bun test testing/generated-project-proof.test.ts");

    expect(typesBuild).toBeGreaterThan(-1);
    expect(projectLifecycleBuild).toBeGreaterThan(typesBuild);
    expect(generatorBuild).toBeGreaterThan(projectLifecycleBuild);
    expect(cliBuild).toBeGreaterThan(generatorBuild);
    expect(lifecycleTests).toBeGreaterThan(cliBuild);
  });

  it("runs when CLI or lifecycle package inputs change", async () => {
    const workflow = await readFile(
      new URL("../.github/workflows/generated-project-proof.yaml", import.meta.url),
      "utf8",
    );

    expect(workflow.match(/- "apps\/cli\/package\.json"/g)).toHaveLength(2);
    expect(workflow.match(/- "packages\/project-lifecycle\/\*\*"/g)).toHaveLength(2);
  });
});
