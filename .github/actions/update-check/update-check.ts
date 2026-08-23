import { appendFile, mkdtemp, realpath, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  asRecord,
  evaluateUpdateGate,
  expectedChangedPaths,
  sha256,
  unexpectedChangedPaths,
  type JsonRecord,
  type UpdateGateEvaluation,
} from "./gate";

type CommandResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

type ReceiptDecision =
  | "blocked"
  | "current"
  | "changes-detected"
  | "pull-request-ready"
  | "pull-request-created";

const receiptPath = path.join(
  process.env.RUNNER_TEMP || tmpdir(),
  "better-fullstack-update-check-receipt.v1.json",
);
let receiptWritten = false;

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function booleanInput(name: string, defaultValue: boolean): boolean {
  const value = process.env[name]?.trim().toLowerCase();
  if (!value) return defaultValue;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`${name} must be true or false.`);
}

async function runCommand(
  command: string,
  args: string[],
  options: { cwd: string; env?: Record<string, string | undefined> },
): Promise<CommandResult> {
  const child = Bun.spawn([command, ...args], {
    cwd: options.cwd,
    env: { ...process.env, ...options.env },
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, stdout, stderr };
}

async function runSuccessful(
  command: string,
  args: string[],
  cwd: string,
  env?: Record<string, string | undefined>,
): Promise<string> {
  const result = await runCommand(command, args, { cwd, env });
  if (result.exitCode !== 0) {
    throw new Error(
      `${command} ${args[0] ?? ""} failed with exit ${result.exitCode}: ${result.stderr.trim() || result.stdout.trim()}`,
    );
  }
  return result.stdout.trim();
}

async function runCliJson(
  workspace: string,
  cliVersion: string,
  args: string[],
): Promise<{ payload: JsonRecord; exitCode: number }> {
  const result = await runCommand(
    "bunx",
    ["--bun", `create-better-fullstack@${cliVersion}`, ...args],
    {
      cwd: workspace,
      env: {
        BTS_TELEMETRY_DISABLED: "1",
        CI: "true",
      },
    },
  );
  let parsed: unknown;
  try {
    parsed = JSON.parse(result.stdout.trim());
  } catch {
    throw new Error(
      `Better Fullstack returned non-JSON output for ${args[0] ?? "command"}: ${result.stdout.trim() || result.stderr.trim()}`,
    );
  }
  return { payload: asRecord(parsed), exitCode: result.exitCode };
}

async function changedPaths(workspace: string): Promise<string[]> {
  const [tracked, untracked] = await Promise.all([
    runSuccessful("git", ["diff", "--name-only", "-z", "HEAD"], workspace),
    runSuccessful("git", ["ls-files", "--others", "--exclude-standard", "-z"], workspace),
  ]);
  return [...new Set(`${tracked}\0${untracked}`.split("\0").filter(Boolean))].sort();
}

function completeVerification(check: JsonRecord): boolean {
  const verification = asRecord(check.verification);
  return (
    check.success === true &&
    check.ok === true &&
    verification.complete === true &&
    typeof verification.expectedTargets === "number" &&
    verification.expectedTargets > 0 &&
    verification.executedTargets === verification.expectedTargets &&
    verification.failedTargets === 0
  );
}

function arrayLength(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

function receiptFor(input: {
  decision: ReceiptDecision;
  workspace: string;
  projectDirectory: string;
  cliVersion: string;
  baseCommit: string;
  status?: JsonRecord;
  gate?: UpdateGateEvaluation;
  beforeCheck?: JsonRecord;
  afterCheck?: JsonRecord;
  applied?: JsonRecord;
  branch?: string;
  baseBranch?: string;
  pullRequestUrl?: string;
  error?: string;
}) {
  const support = asRecord(input.status?.updateSupport);
  const verification = (check: JsonRecord | undefined) => {
    const value = asRecord(check?.verification);
    return {
      complete: value.complete === true,
      expectedTargets: typeof value.expectedTargets === "number" ? value.expectedTargets : 0,
      executedTargets: typeof value.executedTargets === "number" ? value.executedTargets : 0,
      failedTargets: typeof value.failedTargets === "number" ? value.failedTargets : 0,
    };
  };
  return {
    schemaVersion: 1,
    receiptType: "better-fullstack/update-check",
    createdAt: new Date().toISOString(),
    decision: input.decision,
    repository: process.env.GITHUB_REPOSITORY || null,
    workflowRun: {
      id: process.env.GITHUB_RUN_ID || null,
      attempt: process.env.GITHUB_RUN_ATTEMPT || null,
      url:
        process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
          ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
          : null,
    },
    baseCommit: input.baseCommit,
    projectDirectory: input.projectDirectory,
    cli: {
      package: "create-better-fullstack",
      version: input.cliVersion,
    },
    support: {
      policyStatus: support.policyStatus ?? null,
      eligibility: support.eligibility ?? null,
      supportedFrom: support.supportedFrom ?? null,
      supportedTo: support.supportedTo ?? null,
      sourceVersion: support.sourceVersion ?? null,
      targetVersion: support.targetVersion ?? input.cliVersion,
      eligible: support.eligible === true,
      requiresManualReview: support.requiresManualReview !== false,
      reasonCode: support.reasonCode ?? null,
    },
    gate: input.gate
      ? {
          eligible: input.gate.eligible,
          reasons: input.gate.reasons,
          planSha256: input.gate.planSha256,
          reviewToken: input.gate.reviewToken,
          actionablePaths: input.gate.actionablePaths,
        }
      : null,
    verification: {
      beforeApply: verification(input.beforeCheck),
      afterApply: input.afterCheck ? verification(input.afterCheck) : null,
    },
    apply: input.applied
      ? {
          recoveryId:
            typeof input.applied.recoveryId === "string" ? input.applied.recoveryId : null,
          patched: arrayLength(asRecord(input.applied.applied).patched),
          merged: arrayLength(asRecord(input.applied.applied).merged),
          added: arrayLength(asRecord(input.applied.applied).added),
        }
      : null,
    pullRequest:
      input.branch && input.baseBranch
        ? {
            branch: input.branch,
            baseBranch: input.baseBranch,
            url: input.pullRequestUrl ?? null,
          }
        : null,
    error: input.error ?? null,
  };
}

async function writeReceipt(receipt: unknown): Promise<string> {
  const bytes = `${JSON.stringify(receipt, null, 2)}\n`;
  await writeFile(receiptPath, bytes, "utf-8");
  receiptWritten = true;
  return sha256(bytes);
}

async function emitOutputs(input: {
  decision: ReceiptDecision;
  hasChanges: boolean;
  receiptSha256: string;
  pullRequestUrl?: string;
}) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) return;
  const values = [
    `decision=${input.decision}`,
    `has-changes=${input.hasChanges}`,
    `receipt-path=${receiptPath}`,
    `receipt-sha256=${input.receiptSha256}`,
    `pull-request-url=${input.pullRequestUrl ?? ""}`,
  ];
  await appendFile(outputPath, `${values.join("\n")}\n`, "utf-8");
}

function htmlEscape(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function pullRequestBody(receipt: unknown, receiptSha: string): string {
  return [
    "## Better Fullstack update",
    "",
    "This pull request was created only after the update plan remained identical across a full generated-target check.",
    "",
    `Verification receipt SHA-256: \`${receiptSha}\``,
    "",
    "<details><summary>Verification receipt</summary>",
    "",
    `<pre>${htmlEscape(JSON.stringify(receipt, null, 2))}</pre>`,
    "",
    "</details>",
    "",
  ].join("\n");
}

function safeBranch(value: string): boolean {
  return (
    /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value) &&
    !value.includes("..") &&
    !value.includes("@{") &&
    !value.endsWith("/") &&
    !value.startsWith("refs/")
  );
}

async function runUpdateCheck(): Promise<void> {
  const workspace = await realpath(requiredEnvironment("GITHUB_WORKSPACE"));
  const requestedProject = process.env.INPUT_PROJECT_DIRECTORY?.trim() || ".";
  const projectDir = await realpath(path.resolve(workspace, requestedProject));
  const projectDirectory = path.relative(workspace, projectDir).replaceAll(path.sep, "/") || ".";
  if (projectDirectory === ".." || projectDirectory.startsWith("../")) {
    throw new Error("project-directory must stay inside GITHUB_WORKSPACE.");
  }
  const cliVersion = requiredEnvironment("INPUT_CLI_VERSION");
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(cliVersion)) {
    throw new Error("cli-version must be an exact semantic version, not a moving tag.");
  }
  const openPullRequest = booleanInput("INPUT_OPEN_PULL_REQUEST", false);
  const failOnChanges = booleanInput("INPUT_FAIL_ON_CHANGES", true);
  const baseCommit = await runSuccessful("git", ["rev-parse", "HEAD"], workspace);
  const initialChanges = await changedPaths(workspace);
  if (initialChanges.length > 0) {
    throw new Error(`The checkout must be clean before update check: ${initialChanges.join(", ")}`);
  }

  const status = await runCliJson(workspace, cliVersion, ["status", projectDir, "--json"]);
  const firstPlan = await runCliJson(workspace, cliVersion, ["update", projectDir, "--json"]);
  const beforeCheck = await runCliJson(workspace, cliVersion, [
    "check",
    projectDir,
    "--json",
    "--run-checks",
  ]);
  const changesAfterCheck = await changedPaths(workspace);
  const secondPlan = await runCliJson(workspace, cliVersion, ["update", projectDir, "--json"]);
  const gate = evaluateUpdateGate({
    status: status.payload,
    firstPlan: firstPlan.payload,
    check: beforeCheck.payload,
    secondPlan: secondPlan.payload,
    worktreeCleanAfterCheck: changesAfterCheck.length === 0,
  });
  if (status.exitCode !== 0) gate.reasons.push("The status command exited non-zero.");
  if (firstPlan.exitCode !== 0 || secondPlan.exitCode !== 0) {
    gate.reasons.push("An update plan command exited non-zero.");
  }
  if (beforeCheck.exitCode !== 0) gate.reasons.push("The project check exited non-zero.");
  gate.eligible = gate.reasons.length === 0;

  if (!gate.eligible) {
    const receipt = receiptFor({
      decision: "blocked",
      workspace,
      projectDirectory,
      cliVersion,
      baseCommit,
      status: status.payload,
      gate,
      beforeCheck: beforeCheck.payload,
      error: gate.reasons.join(" "),
    });
    const digest = await writeReceipt(receipt);
    await emitOutputs({
      decision: "blocked",
      hasChanges: gate.hasChanges,
      receiptSha256: digest,
    });
    throw new Error(`Automatic update blocked: ${gate.reasons.join(" ")}`);
  }

  if (!gate.hasChanges) {
    const receipt = receiptFor({
      decision: "current",
      workspace,
      projectDirectory,
      cliVersion,
      baseCommit,
      status: status.payload,
      gate,
      beforeCheck: beforeCheck.payload,
    });
    const digest = await writeReceipt(receipt);
    await emitOutputs({ decision: "current", hasChanges: false, receiptSha256: digest });
    console.log("Better Fullstack templates are current and fully verified.");
    return;
  }

  if (!openPullRequest) {
    const receipt = receiptFor({
      decision: "changes-detected",
      workspace,
      projectDirectory,
      cliVersion,
      baseCommit,
      status: status.payload,
      gate,
      beforeCheck: beforeCheck.payload,
    });
    const digest = await writeReceipt(receipt);
    await emitOutputs({
      decision: "changes-detected",
      hasChanges: true,
      receiptSha256: digest,
    });
    if (failOnChanges) throw new Error("Verified Better Fullstack template changes are available.");
    console.log("Verified Better Fullstack template changes are available.");
    return;
  }

  const githubToken = requiredEnvironment("INPUT_GITHUB_TOKEN");
  const repository = requiredEnvironment("GITHUB_REPOSITORY");
  const baseBranch =
    process.env.INPUT_BASE_BRANCH?.trim() ||
    process.env.GITHUB_BASE_REF?.trim() ||
    process.env.GITHUB_REF_NAME?.trim() ||
    "";
  if (!safeBranch(baseBranch)) throw new Error("A safe base-branch is required for PR mode.");
  const runId = requiredEnvironment("GITHUB_RUN_ID");
  const runAttempt = process.env.GITHUB_RUN_ATTEMPT?.trim() || "1";
  if (!/^\d+$/.test(runId) || !/^\d+$/.test(runAttempt)) {
    throw new Error("GitHub run identity must be numeric.");
  }
  const updateBranch = `better-fullstack/update-${runId}-${runAttempt}`;
  if (!safeBranch(updateBranch) || updateBranch === baseBranch) {
    throw new Error("The generated update branch is not safe or is the protected base branch.");
  }
  if (!gate.reviewToken) throw new Error("The verified gate lost its review token.");

  const applied = await runCliJson(workspace, cliVersion, [
    "update",
    projectDir,
    "--apply",
    "--review-token",
    gate.reviewToken,
    "--json",
  ]);
  if (applied.exitCode !== 0 || applied.payload.ok !== true) {
    throw new Error("The token-bound update apply failed.");
  }
  const afterCheck = await runCliJson(workspace, cliVersion, [
    "check",
    projectDir,
    "--json",
    "--run-checks",
  ]);
  const postPlan = await runCliJson(workspace, cliVersion, ["update", projectDir, "--json"]);
  if (
    afterCheck.exitCode !== 0 ||
    !completeVerification(afterCheck.payload) ||
    postPlan.exitCode !== 0 ||
    postPlan.payload.ok !== true ||
    arrayLength(postPlan.payload.actionable) > 0 ||
    arrayLength(postPlan.payload.conflicts) > 0 ||
    arrayLength(postPlan.payload.manual) > 0 ||
    arrayLength(postPlan.payload.removed) > 0
  ) {
    throw new Error("Post-apply verification or reconciliation failed.");
  }

  const actualChanges = await changedPaths(workspace);
  const expectedChanges = expectedChangedPaths(projectDirectory, gate.actionablePaths);
  const unexpected = unexpectedChangedPaths(actualChanges, expectedChanges);
  if (actualChanges.length === 0) throw new Error("Update apply produced no Git changes.");
  if (unexpected.length > 0) {
    throw new Error(
      `Update or verification changed paths outside the reviewed plan: ${unexpected.join(", ")}`,
    );
  }

  await runSuccessful("git", ["switch", "-c", updateBranch], workspace);
  await runSuccessful("git", ["config", "user.name", "better-fullstack[bot]"], workspace);
  await runSuccessful(
    "git",
    ["config", "user.email", "better-fullstack[bot]@users.noreply.github.com"],
    workspace,
  );
  await runSuccessful("git", ["add", "--", ...actualChanges], workspace);
  await runSuccessful(
    "git",
    ["commit", "-m", "chore: update Better Fullstack templates"],
    workspace,
  );
  await runSuccessful("git", ["push", "origin", `HEAD:refs/heads/${updateBranch}`], workspace, {
    GH_TOKEN: githubToken,
  });

  const readyReceipt = receiptFor({
    decision: "pull-request-ready",
    workspace,
    projectDirectory,
    cliVersion,
    baseCommit,
    status: status.payload,
    gate,
    beforeCheck: beforeCheck.payload,
    afterCheck: afterCheck.payload,
    applied: applied.payload,
    branch: updateBranch,
    baseBranch,
  });
  let digest = await writeReceipt(readyReceipt);
  const bodyDir = await mkdtemp(path.join(process.env.RUNNER_TEMP || tmpdir(), "bfs-update-pr-"));
  const bodyPath = path.join(bodyDir, "body.md");
  await writeFile(bodyPath, pullRequestBody(readyReceipt, digest), "utf-8");
  const pullRequestUrl = await runSuccessful(
    "gh",
    [
      "pr",
      "create",
      "--repo",
      repository,
      "--base",
      baseBranch,
      "--head",
      updateBranch,
      "--title",
      "chore: update Better Fullstack templates",
      "--body-file",
      bodyPath,
    ],
    workspace,
    { GH_TOKEN: githubToken },
  );
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+$/.test(pullRequestUrl)) {
    throw new Error(`gh returned an unexpected pull request URL: ${pullRequestUrl}`);
  }

  const finalReceipt = receiptFor({
    decision: "pull-request-created",
    workspace,
    projectDirectory,
    cliVersion,
    baseCommit,
    status: status.payload,
    gate,
    beforeCheck: beforeCheck.payload,
    afterCheck: afterCheck.payload,
    applied: applied.payload,
    branch: updateBranch,
    baseBranch,
    pullRequestUrl,
  });
  digest = await writeReceipt(finalReceipt);
  await writeFile(bodyPath, pullRequestBody(finalReceipt, digest), "utf-8");
  await runSuccessful("gh", ["pr", "edit", pullRequestUrl, "--body-file", bodyPath], workspace, {
    GH_TOKEN: githubToken,
  });
  await emitOutputs({
    decision: "pull-request-created",
    hasChanges: true,
    receiptSha256: digest,
    pullRequestUrl,
  });
  console.log(`Opened ${pullRequestUrl} from ${updateBranch}.`);
}

if (import.meta.main) {
  runUpdateCheck().catch(async (error) => {
    const message = error instanceof Error ? error.message : String(error);
    if (!receiptWritten) {
      const fallback = {
        schemaVersion: 1,
        receiptType: "better-fullstack/update-check",
        createdAt: new Date().toISOString(),
        decision: "blocked",
        repository: process.env.GITHUB_REPOSITORY || null,
        baseCommit: process.env.GITHUB_SHA || null,
        error: message,
      };
      const digest = await writeReceipt(fallback);
      await emitOutputs({ decision: "blocked", hasChanges: false, receiptSha256: digest });
    }
    console.error(message);
    process.exit(1);
  });
}
