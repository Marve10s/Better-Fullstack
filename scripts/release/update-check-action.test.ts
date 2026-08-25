import {
  evaluateUpdateGate,
  expectedChangedPaths,
  reviewedChangedPaths,
  unexpectedChangedPaths,
  type JsonRecord,
} from "@actions/update-check/gate";
import {
  validateUpdateAction,
  validateUpdateActionSources,
} from "@scripts/release/validate-update-action";
import { describe, expect, test } from "bun:test";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

function evidence(): {
  status: JsonRecord;
  firstPlan: JsonRecord;
  check: JsonRecord;
  secondPlan: JsonRecord;
  worktreeCleanAfterCheck: boolean;
} {
  const plan = {
    ok: true,
    guarantee: "verified-manifest-v2-recoverable",
    reviewToken: "a".repeat(64),
    actionable: ["src/generated.ts"],
    actionableHashes: { "src/generated.ts": "b".repeat(64) },
    conflicts: [],
    manual: [],
    removed: [],
  };
  return {
    status: {
      success: true,
      ok: true,
      updateSupport: { eligible: true, requiresManualReview: false },
      upgrade: { applyAllowed: true },
    },
    firstPlan: structuredClone(plan),
    check: {
      success: true,
      ok: true,
      verification: {
        complete: true,
        expectedTargets: 2,
        executedTargets: 2,
        failedTargets: 0,
      },
    },
    secondPlan: structuredClone(plan),
    worktreeCleanAfterCheck: true,
  };
}

async function run(command: string, args: string[], cwd: string) {
  const child = Bun.spawn([command, ...args], { cwd, stdout: "pipe", stderr: "pipe" });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  if (exitCode !== 0) throw new Error(stderr || stdout);
}

describe("opt-in update action gate", () => {
  test("accepts only deterministic, eligible, conflict-free, fully verified plans", () => {
    const result = evaluateUpdateGate(evidence());
    expect(result).toMatchObject({
      eligible: true,
      hasChanges: true,
      reviewToken: "a".repeat(64),
      actionablePaths: ["src/generated.ts"],
      reasons: [],
      verification: { complete: true, expectedTargets: 2, executedTargets: 2, failedTargets: 0 },
    });
    expect(result.planSha256).toMatch(/^[0-9a-f]{64}$/);
  });

  test("blocks every automatic-review boundary independently", () => {
    const cases: Array<[string, (value: ReturnType<typeof evidence>) => void]> = [
      [
        "manual policy",
        (value) => Object.assign(value.status.updateSupport as JsonRecord, { eligible: false }),
      ],
      [
        "unverified lineage",
        (value) => Object.assign(value.secondPlan, { guarantee: "unverified-origin-recoverable" }),
      ],
      ["conflict", (value) => Object.assign(value.secondPlan, { conflicts: ["src/a.ts"] })],
      ["manual file", (value) => Object.assign(value.secondPlan, { manual: [{ path: ".env" }] })],
      ["template removal", (value) => Object.assign(value.secondPlan, { removed: ["old.ts"] })],
      [
        "nondeterministic plan",
        (value) =>
          Object.assign(value.firstPlan, { actionableHashes: { "src/generated.ts": "c" } }),
      ],
      [
        "incomplete check",
        (value) =>
          Object.assign(value.check.verification as JsonRecord, {
            complete: false,
            executedTargets: 1,
          }),
      ],
      ["dirty check", (value) => void (value.worktreeCleanAfterCheck = false)],
      ["unsafe path", (value) => Object.assign(value.secondPlan, { actionable: ["../escape"] })],
    ];

    for (const [label, mutate] of cases) {
      const value = evidence();
      mutate(value);
      expect(evaluateUpdateGate(value).eligible, label).toBe(false);
    }
  });

  test("stages only reviewed paths and the manifest", () => {
    const expected = expectedChangedPaths("apps/demo", ["src/generated.ts"]);
    expect(expected).toEqual(["apps/demo/bts.lock.json", "apps/demo/src/generated.ts"]);
    expect(
      unexpectedChangedPaths(
        [
          "apps/demo/.bts/recovery/id/metadata.json",
          "apps/demo/bts.lock.json",
          "apps/demo/src/generated.ts",
        ],
        expected,
      ),
    ).toEqual([]);
    expect(unexpectedChangedPaths(["README.md"], expected)).toEqual(["README.md"]);
    expect(
      reviewedChangedPaths(
        [
          "apps/demo/.bts/recovery/id/metadata.json",
          "apps/demo/bts.lock.json",
          "apps/demo/src/generated.ts",
        ],
        expected,
      ),
    ).toEqual(["apps/demo/bts.lock.json", "apps/demo/src/generated.ts"]);
  });

  test("pins action dependencies and never pushes the protected base branch", async () => {
    const root = path.resolve(import.meta.dir, "../..");
    const [metadata, implementation] = await Promise.all([
      Bun.file(path.join(root, ".github/actions/update-check/action.yml")).text(),
      Bun.file(path.join(root, ".github/actions/update-check/update-check.ts")).text(),
    ]);
    expect(metadata).toMatch(/oven-sh\/setup-bun@[0-9a-f]{40}/);
    expect(metadata).toMatch(/actions\/upload-artifact@[0-9a-f]{40}/);
    expect(metadata).toContain("INPUT_OPEN_PULL_REQUEST");
    expect(implementation).toContain("HEAD:refs/heads/${updateBranch}");
    expect(implementation).toContain("updateBranch === baseBranch");
    expect(implementation).toContain("pullRequestBody(finalReceipt, digest)");
    expect(implementation).toContain("worktreeCleanAfterCheck");
    expect(implementation).toContain('["auth", "setup-git"]');
    expect(implementation).toContain('["add", "--", ...reviewedChanges]');
    expect(implementation).not.toMatch(/git[^\n]*push[^\n]*baseBranch/);
    expect(await validateUpdateAction(root)).toEqual([]);
  });

  test("the repository validator rejects a moving dependency and a base-branch push", () => {
    const errors = validateUpdateActionSources({
      metadata: "uses: oven-sh/setup-bun@v2\nuses: actions/upload-artifact@v4",
      implementation: "git push origin ${baseBranch}",
      gate: "",
      documentation: "",
    });
    expect(errors).toContain("Update action must pin setup-bun to an immutable commit.");
    expect(errors).toContain("Update action must never push the base branch.");
  });

  test("runs the current-project path and emits a real receipt from a clean checkout", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "bfs-update-action-"));
    const repository = path.join(root, "repository");
    const bin = path.join(root, "bin");
    await Promise.all([mkdir(repository), mkdir(bin)]);
    try {
      await writeFile(path.join(repository, "bts.jsonc"), "{}\n");
      await run("git", ["init", "-b", "main"], repository);
      await run("git", ["config", "user.name", "Update action test"], repository);
      await run("git", ["config", "user.email", "update-action@example.com"], repository);
      await run("git", ["add", "bts.jsonc"], repository);
      await run("git", ["commit", "-m", "fixture"], repository);

      const fakeBunx = path.join(bin, "bunx");
      await writeFile(
        fakeBunx,
        `#!/usr/bin/env bun
const command = process.argv[4];
const plan = {
  ok: true,
  guarantee: "verified-manifest-v2-recoverable",
  reviewToken: "${"a".repeat(64)}",
  actionable: [],
  actionableHashes: {},
  conflicts: [],
  manual: [],
  removed: []
};
const payload = command === "status"
  ? {
      success: true,
      ok: true,
      updateSupport: {
        policyStatus: "active",
        eligibility: "same-release",
        eligible: true,
        requiresManualReview: false,
        targetVersion: "2.6.1",
        reasonCode: "same-release"
      },
      upgrade: { applyAllowed: true }
    }
  : command === "check"
    ? {
        success: true,
        ok: true,
        verification: {
          complete: true,
          expectedTargets: 1,
          executedTargets: 1,
          failedTargets: 0
        }
      }
    : plan;
console.log(JSON.stringify(payload));
`,
      );
      await chmod(fakeBunx, 0o755);
      const outputPath = path.join(root, "github-output");
      const actionPath = path.resolve(
        import.meta.dir,
        "../../.github/actions/update-check/update-check.ts",
      );
      const child = Bun.spawn([process.execPath, actionPath], {
        cwd: repository,
        env: {
          ...process.env,
          PATH: `${bin}:${process.env.PATH ?? ""}`,
          GITHUB_WORKSPACE: repository,
          GITHUB_OUTPUT: outputPath,
          GITHUB_REPOSITORY: "example/project",
          GITHUB_RUN_ID: "123",
          GITHUB_RUN_ATTEMPT: "1",
          GITHUB_REF_NAME: "main",
          RUNNER_TEMP: root,
          INPUT_PROJECT_DIRECTORY: ".",
          INPUT_CLI_VERSION: "2.6.1",
          INPUT_OPEN_PULL_REQUEST: "false",
          INPUT_FAIL_ON_CHANGES: "true",
        },
        stdout: "pipe",
        stderr: "pipe",
      });
      const [exitCode, stdout, stderr] = await Promise.all([
        child.exited,
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
      ]);
      expect(exitCode, stderr).toBe(0);
      expect(stdout).toContain("templates are current and fully verified");
      expect(await readFile(outputPath, "utf-8")).toContain("decision=current");
      const receipt = JSON.parse(
        await readFile(path.join(root, "better-fullstack-update-check-receipt.v1.json"), "utf-8"),
      ) as JsonRecord;
      expect(receipt).toMatchObject({
        schemaVersion: 1,
        receiptType: "better-fullstack/update-check",
        decision: "current",
        baseCommit: expect.stringMatching(/^[0-9a-f]{40}$/),
        verification: {
          beforeApply: { complete: true, expectedTargets: 1, executedTargets: 1 },
          afterApply: null,
        },
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
