import { describe, expect, it } from "bun:test";

import { localCanonicalCommand } from "@scripts/benchmarks/record-scaffbench-canonical";

describe("canonical ScaffBench evidence", () => {
  it("runs the freshly built workspace CLI instead of a registry package", () => {
    const command = localCanonicalCommand(
      "/repo/apps/cli/dist/cli.mjs",
      { canonicalFlags: ["--no-install", "--disable-analytics"] },
      "fixture",
    );

    expect(command).toEqual([
      "node",
      "/repo/apps/cli/dist/cli.mjs",
      "fixture",
      "--no-install",
      "--disable-analytics",
    ]);
    expect(command.join(" ")).not.toContain("@latest");
  });

  it("builds the local CLI before recording source-bound evidence", async () => {
    const source = await Bun.file("scripts/benchmarks/record-scaffbench-canonical.ts").text();

    expect(source).toContain("const cliPath = await buildLocalCliBinary()");
    expect(source).toContain('generatorSource: "workspace-local"');
    expect(source).toContain("generatorGitHead: evidence.gitHead");
    expect(source).not.toContain("canonicalCommand(spec");
  });

  it("keeps generated evidence outside the workspace cleanliness signal", async () => {
    for (const evidencePath of [
      "testing/.release-guard/summary.json",
      "testing/.published-package/summary.json",
      "testing/.tmp-scaffbench-2/summary.json",
    ]) {
      const check = Bun.spawn(["git", "check-ignore", "--quiet", evidencePath], {
        stdout: "ignore",
        stderr: "ignore",
      });
      // oxlint-disable-next-line no-await-in-loop -- each assertion should name its path.
      expect(await check.exited, `${evidencePath} must remain ignored`).toBe(0);
    }
  });
});
