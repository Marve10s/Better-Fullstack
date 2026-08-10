import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";

import {
  hasEligibleEvidenceIdentity,
  missingRequiredSteps,
  GENERATED_PROJECT_PROOF_CASES,
} from "./lib/generated-project-proof-matrix";

describe("generated project install/build proof matrix", () => {
  it("pins the exact required lifecycle cases and toolchains", () => {
    expect(GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.id)).toEqual([
      "typescript-go",
      "python",
      "rust",
      "dotnet",
      "mobile-backend",
    ]);
    expect(
      new Set(GENERATED_PROJECT_PROOF_CASES.flatMap((entry) => entry.requiredToolchains)),
    ).toEqual(new Set(["node", "bun", "bunx", "go", "uv", "cargo", "dotnet"]));
    expect(
      GENERATED_PROJECT_PROOF_CASES.every((entry) => entry.requiredSteps.includes("scaffold")),
    ).toBe(true);
    expect(
      GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "typescript-go")?.flags,
    ).toEqual(expect.arrayContaining(["frontend:typescript:react-vite", "backend:go:gin"]));
    expect(
      GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "typescript-go")?.requiredSteps,
    ).toEqual(expect.arrayContaining(["go-tidy", "go-build"]));
    expect(
      GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "typescript-go")?.requiredSteps,
    ).not.toContain("go-download");
    expect(
      GENERATED_PROJECT_PROOF_CASES.find((entry) => entry.id === "mobile-backend")?.flags,
    ).toEqual(
      expect.arrayContaining(["mobile:react-native:native-bare", "backend:typescript:hono"]),
    );
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
    const generatorBuild = workflow.indexOf("bun run --cwd packages/template-generator build");
    const lifecycleTests = workflow.indexOf("bun test testing/generated-project-proof.test.ts");

    expect(typesBuild).toBeGreaterThan(-1);
    expect(generatorBuild).toBeGreaterThan(typesBuild);
    expect(lifecycleTests).toBeGreaterThan(generatorBuild);
  });
});
