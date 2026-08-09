import { describe, expect, it } from "bun:test";

describe("ScaffBench solvability CI contract", () => {
  it("provisions Beam for the Elixir ecosystem", async () => {
    const workflow = Bun.YAML.parse(await Bun.file(".github/workflows/e2e-test.yaml").text()) as {
      jobs?: Record<string, { steps?: Array<{ uses?: string }> }>;
    };
    const steps = workflow.jobs?.["scaffbench-solvability"]?.steps ?? [];

    expect(steps.some((step) => step.uses === "erlef/setup-beam@v1")).toBe(true);
  });

  it("allows local skips but makes missing CI toolchains fatal", async () => {
    const source = await Bun.file("apps/cli/test/e2e/scaffbench-solvability.test.ts").text();

    expect(source).toContain("missing.length > 0 && !process.env.CI ? it.skip : it");
    expect(source).toContain("CI is missing required toolchain(s)");
    expect(source).toContain(").toEqual([])");
  });
});
