import { describe, expect, test } from "bun:test";

import {
  loadReleaseWorkflow,
  loadRequiredCiWorkflow,
  validateReleaseWorkflow,
} from "./validate-release-workflow";

type WorkflowDocument = Record<string, unknown>;

function clone(workflow: WorkflowDocument): WorkflowDocument {
  return structuredClone(workflow);
}

function jobs(workflow: WorkflowDocument): Record<string, Record<string, unknown>> {
  return workflow.jobs as Record<string, Record<string, unknown>>;
}

async function fixtures() {
  return {
    release: await loadReleaseWorkflow(),
    requiredCi: await loadRequiredCiWorkflow(),
  };
}

describe("release workflow contract", () => {
  test("the repository workflow satisfies the release contract", async () => {
    const { release, requiredCi } = await fixtures();
    expect(validateReleaseWorkflow(release, requiredCi)).toEqual([]);
  });

  test("rejects publication after CI for a different SHA or failed CI", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const prepare = jobs(workflow).prepare;
    prepare.if = String(prepare.if).replace("workflow_run.conclusion == 'success'", "true");
    const checkout = (prepare.steps as Array<Record<string, unknown>>).find((step) => step.uses);
    (checkout!.with as Record<string, unknown>).ref = "${{ github.sha }}";

    expect(validateReleaseWorkflow(workflow, requiredCi)).toEqual(
      expect.arrayContaining([
        "prepare is missing required-CI guard: workflow_run.conclusion == 'success'",
        "prepare must check out the exact successful required-CI SHA without credentials",
      ]),
    );
  });

  test("fault before or during smoke cannot reach a success tag or GitHub release", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    jobs(workflow).finalize.needs = ["prepare", "publish"];

    expect(validateReleaseWorkflow(workflow, requiredCi)).toContain(
      "tag and GitHub release creation must depend on successful package smoke",
    );
  });

  test("rejects tag creation inside the irreversible npm boundary", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const publish = jobs(workflow).publish;
    (publish.steps as Array<Record<string, unknown>>).push({ run: "git tag v1.2.3" });

    expect(validateReleaseWorkflow(workflow, requiredCi)).toContain(
      "publish must not create a tag or GitHub release",
    );
  });

  test("rejects package publication before the complete preflight", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const publish = jobs(workflow).publish;
    publish.steps = (publish.steps as Array<Record<string, unknown>>).filter(
      (step) => step.name !== "Verify receipt and preflight every package",
    );

    expect(validateReleaseWorkflow(workflow, requiredCi)).toContain(
      "all package artifacts must pass one preflight before exact-artifact publication",
    );
  });

  test("rejects resume paths that rebuild package bytes", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const publish = jobs(workflow).publish;
    (publish.steps as Array<Record<string, unknown>>).splice(1, 0, {
      run: "bun run build && npm pack",
    });

    expect(validateReleaseWorkflow(workflow, requiredCi)).toContain(
      "publish must reuse the prepared artifact set without rebuilding package bytes",
    );
  });

  test("rejects floating authoritative toolchains", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const prepare = jobs(workflow).prepare;
    const bun = (prepare.steps as Array<Record<string, unknown>>).find(
      (step) => step.name === "Setup pinned Bun",
    );
    (bun!.with as Record<string, unknown>)["bun-version"] = "latest";

    expect(validateReleaseWorkflow(workflow, requiredCi)).toContain(
      "authoritative release toolchains must use exact versions",
    );
  });

  test("rejects a floating required-CI Bun runtime", async () => {
    const { release, requiredCi } = await fixtures();
    const floatingCi = clone(requiredCi);
    const releaseGuard = jobs(floatingCi)["release-guard"];
    const bun = (releaseGuard.steps as Array<Record<string, unknown>>).find((step) =>
      String(step.uses ?? "").startsWith("oven-sh/setup-bun@"),
    );
    (bun!.with as Record<string, unknown>)["bun-version"] = "latest";

    expect(validateReleaseWorkflow(release, floatingCi)).toContain(
      "required CI must pin every authoritative Bun runtime to 1.3.12",
    );
  });

  test("rejects missing generated-project proof or receipt creation", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const prepare = jobs(workflow).prepare;
    prepare.steps = (prepare.steps as Array<Record<string, unknown>>).filter(
      (step) => step.name !== "Run complete generated-project proof",
    );

    expect(validateReleaseWorkflow(workflow, requiredCi)).toContain(
      "prepare must create the receipt from a fresh complete generated-project proof",
    );
  });

  test("rejects publish or finalize paths that do not verify and attach the receipt", async () => {
    const { release, requiredCi } = await fixtures();
    const workflow = clone(release);
    const publish = jobs(workflow).publish;
    const publishStep = (publish.steps as Array<Record<string, unknown>>).find(
      (step) => step.name === "Publish absent packages and verify every registry identity",
    );
    publishStep!.run = String(publishStep!.run).replace(
      /bun .*release-receipt\.ts[\s\S]*?--sha "\$SOURCE_SHA"\n/,
      "",
    );
    const finalize = jobs(workflow).finalize;
    const finalizeStep = (finalize.steps as Array<Record<string, unknown>>).find(
      (step) => step.name === "Reverify packages, then create tag and release",
    );
    finalizeStep!.run = String(finalizeStep!.run).replace(
      /\s*--asset "\$\{\{ runner\.temp \}\}\/npm-release\/verification-receipt\.v1\.json"/,
      "",
    );

    const errors = validateReleaseWorkflow(workflow, requiredCi);
    expect(errors).toContain(
      "all package artifacts must pass one preflight before exact-artifact publication",
    );
    expect(errors).toContain(
      "finalize must reverify the immutable manifest before using contents write",
    );
  });
});
