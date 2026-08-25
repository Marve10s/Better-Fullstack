type WorkflowDocument = Record<string, unknown>;

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function steps(job: Record<string, unknown>): Array<Record<string, unknown>> {
  return Array.isArray(job.steps) ? job.steps.map(record) : [];
}

function stepText(step: Record<string, unknown>): string {
  return JSON.stringify(step);
}

function jobNeeds(job: Record<string, unknown>): string[] {
  if (typeof job.needs === "string") return [job.needs];
  return strings(job.needs);
}

function stepByName(
  job: Record<string, unknown>,
  name: string,
): Record<string, unknown> | undefined {
  return steps(job).find((step) => step.name === name);
}

export function validateReleaseWorkflow(
  workflow: WorkflowDocument,
  requiredCi: WorkflowDocument,
): string[] {
  const errors: string[] = [];
  const trigger = record(workflow.on).workflow_run;
  const workflowRun = record(trigger);
  if (
    !strings(workflowRun.workflows).includes("Lint, Test & Build") ||
    !strings(workflowRun.types).includes("completed")
  ) {
    errors.push("release must be triggered by completion of the required CI workflow");
  }
  const requiredCiBunSteps = Object.values(record(requiredCi.jobs)).flatMap((job) =>
    steps(record(job)).filter((step) => String(step.uses ?? "").startsWith("oven-sh/setup-bun@")),
  );
  if (
    requiredCiBunSteps.length === 0 ||
    requiredCiBunSteps.some((step) => record(step.with)["bun-version"] !== "1.3.12")
  ) {
    errors.push("required CI must pin every authoritative Bun runtime to 1.3.12");
  }

  const jobs = record(workflow.jobs);
  const prepare = record(jobs.prepare);
  const publish = record(jobs.publish);
  const smoke = record(jobs.smoke);
  const finalize = record(jobs.finalize);
  const prepareCondition = String(prepare.if ?? "");
  for (const guard of [
    "workflow_run.event == 'push'",
    "workflow_run.head_branch == 'main'",
    "workflow_run.conclusion == 'success'",
  ]) {
    if (!prepareCondition.includes(guard))
      errors.push(`prepare is missing required-CI guard: ${guard}`);
  }

  const prepareCheckout = steps(prepare).find((step) =>
    String(step.uses ?? "").startsWith("actions/checkout@"),
  );
  const checkoutWith = record(prepareCheckout?.with);
  if (
    checkoutWith.ref !== "${{ github.event.workflow_run.head_sha }}" ||
    checkoutWith["persist-credentials"] !== false
  ) {
    errors.push("prepare must check out the exact successful required-CI SHA without credentials");
  }
  const identityStep = stepByName(prepare, "Resolve exact release identity");
  const prepareStep = stepByName(prepare, "Build and pack every publishable workspace package");
  const proofStep = stepByName(prepare, "Run complete generated-project proof");
  const fixtureStep = stepByName(
    prepare,
    "Capture executable upgrade fixtures from exact package artifacts",
  );
  const qualificationStep = stepByName(prepare, "Qualify the previous executable release fixture");
  const receiptStep = stepByName(
    prepare,
    "Create SHA-bound verification receipt from clean evidence",
  );
  const receiptBundleStep = stepByName(prepare, "Bundle artifact-only receipt verifier");
  if (
    record(identityStep?.env).SOURCE_SHA !== "${{ github.event.workflow_run.head_sha }}" ||
    !stepText(prepareStep ?? {}).includes("release-state.ts prepare") ||
    !stepText(prepareStep ?? {}).includes("--sha")
  ) {
    errors.push("artifact preparation must bind its manifest to the required-CI SHA");
  }
  const prepareSteps = steps(prepare);
  const prepareIndex = prepareSteps.indexOf(prepareStep ?? {});
  const proofIndex = prepareSteps.indexOf(proofStep ?? {});
  const fixtureIndex = prepareSteps.indexOf(fixtureStep ?? {});
  const qualificationIndex = prepareSteps.indexOf(qualificationStep ?? {});
  const receiptIndex = prepareSteps.indexOf(receiptStep ?? {});
  if (
    prepareIndex < 0 ||
    proofIndex <= prepareIndex ||
    fixtureIndex <= proofIndex ||
    qualificationIndex <= fixtureIndex ||
    receiptIndex <= qualificationIndex ||
    !stepText(proofStep ?? {}).includes("generated-project-proof.ts") ||
    !stepText(fixtureStep ?? {}).includes("capture-release-fixture.ts") ||
    !stepText(fixtureStep ?? {}).includes("release-manifest.json") ||
    !stepText(fixtureStep ?? {}).includes("upgrade-fixture.v1.json") ||
    !stepText(qualificationStep ?? {}).includes("qualify-previous-release.ts") ||
    !stepText(qualificationStep ?? {}).includes("cross-version-qualification.v1.json") ||
    !stepText(qualificationStep ?? {}).includes("github.token") ||
    !stepText(receiptStep ?? {}).includes("release-receipt.ts create") ||
    !stepText(receiptStep ?? {}).includes("verification-receipt.v1.json") ||
    !stepText(receiptStep ?? {}).includes("upgrade-fixture.v1.json") ||
    !stepText(receiptStep ?? {}).includes("cross-version-qualification.v1.json") ||
    !stepText(receiptStep ?? {}).includes("workflow_run.id") ||
    !stepText(receiptStep ?? {}).includes("workflow_run.conclusion") ||
    !stepText(receiptBundleStep ?? {}).includes("bun build scripts/release/release-receipt.ts") ||
    !stepText(receiptBundleStep ?? {}).includes("release-receipt.mjs") ||
    JSON.stringify(prepare).includes("bun run test:release")
  ) {
    errors.push("prepare must create the receipt from a fresh complete generated-project proof");
  }
  const uploads = steps(prepare).filter((step) =>
    String(step.uses ?? "").startsWith("actions/upload-artifact@"),
  );
  if (
    uploads.length !== 1 ||
    record(uploads[0]?.with).name !== "${{ steps.release.outputs.artifact_name }}" ||
    !String(record(identityStep?.env).SOURCE_SHA).includes("workflow_run.head_sha")
  ) {
    errors.push("prepare must upload one immutable artifact set named for the required-CI SHA");
  }

  if (!jobNeeds(publish).includes("prepare")) errors.push("publish must depend on prepare");
  const publishSteps = steps(publish);
  const publishDownload = publishSteps.find((step) =>
    String(step.uses ?? "").startsWith("actions/download-artifact@"),
  );
  const preflightIndex = publishSteps.findIndex(
    (step) => step.name === "Verify receipt and preflight every package",
  );
  const publishIndex = publishSteps.findIndex(
    (step) => step.name === "Publish absent packages and verify every registry identity",
  );
  if (
    preflightIndex < 0 ||
    publishIndex < 0 ||
    preflightIndex >= publishIndex ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("release-state.ts") ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("release-manifest.json") ||
    !stepText(publishSteps[preflightIndex] ?? {}).includes("release-receipt.mjs") ||
    !stepText(publishSteps[preflightIndex] ?? {}).includes("verification-receipt.v1.json") ||
    !stepText(publishSteps[preflightIndex] ?? {}).includes("upgrade-fixture.v1.json") ||
    !stepText(publishSteps[preflightIndex] ?? {}).includes("cross-version-qualification.v1.json") ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("release-receipt.mjs") ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("verification-receipt.v1.json") ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("upgrade-fixture.v1.json") ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("cross-version-qualification.v1.json")
  ) {
    errors.push("all package artifacts must pass one preflight before exact-artifact publication");
  }
  if (
    record(publishDownload?.with).name !== "${{ needs.prepare.outputs.artifact_name }}" ||
    /npm pack|bun run build/.test(JSON.stringify(publish))
  ) {
    errors.push("publish must reuse the prepared artifact set without rebuilding package bytes");
  }
  if (
    publishSteps.some((step) => String(step.uses ?? "").startsWith("actions/checkout@")) ||
    publishSteps.filter((step) => stepText(step).includes("secrets.NPM_TOKEN")).length !== 1 ||
    !stepText(publishSteps[publishIndex] ?? {}).includes("secrets.NPM_TOKEN")
  ) {
    errors.push("the npm token must be isolated to the artifact-only publish step");
  }

  if (!jobNeeds(smoke).includes("publish") || !jobNeeds(smoke).includes("prepare")) {
    errors.push("published-package smoke must depend on artifact preparation and publication");
  }
  const smokeStep = stepByName(smoke, "Smoke exact published release");
  if (
    !stepText(smokeStep ?? {}).includes("test:published-package") ||
    record(smokeStep?.env).PUBLISHED_VERSION !== "${{ needs.prepare.outputs.cli_version }}"
  ) {
    errors.push("smoke must install the exact CLI version from the release manifest identity");
  }

  const finalizeNeeds = jobNeeds(finalize);
  if (!["prepare", "publish", "smoke"].every((need) => finalizeNeeds.includes(need))) {
    errors.push("tag and GitHub release creation must depend on successful package smoke");
  }
  const finalizeStep = stepByName(finalize, "Reverify packages, then create tag and release");
  const finalizeDownload = steps(finalize).find((step) =>
    String(step.uses ?? "").startsWith("actions/download-artifact@"),
  );
  if (
    record(finalize.permissions).contents !== "write" ||
    record(finalizeDownload?.with).name !== "${{ needs.prepare.outputs.artifact_name }}" ||
    !stepText(finalizeStep ?? {}).includes("release-state.ts") ||
    !stepText(finalizeStep ?? {}).includes("finalize") ||
    !stepText(finalizeStep ?? {}).includes("release-manifest.json") ||
    !stepText(finalizeStep ?? {}).includes("release-receipt.mjs") ||
    !stepText(finalizeStep ?? {}).includes("verification-receipt.v1.json") ||
    !stepText(finalizeStep ?? {}).includes("upgrade-fixture.v1.json") ||
    !stepText(finalizeStep ?? {}).includes("cross-version-qualification.v1.json") ||
    stepText(finalizeStep ?? {}).split("--asset").length - 1 !== 4
  ) {
    errors.push("finalize must reverify the immutable manifest before using contents write");
  }
  for (const [name, value] of Object.entries(jobs)) {
    if (name === "finalize") continue;
    const job = record(value);
    if (record(job.permissions).contents === "write") {
      errors.push(`${name} must not have contents write permission`);
    }
    if (/git tag|gh release|release-state\.ts"? finalize/.test(JSON.stringify(job))) {
      errors.push(`${name} must not create a tag or GitHub release`);
    }
  }

  const text = JSON.stringify(workflow);
  if (/bun-version":"latest|node-version":"(?:[0-9]+|latest)"|pnpm@latest|npm@latest/.test(text)) {
    errors.push("authoritative release toolchains must use exact versions");
  }
  for (const version of [
    "1.3.12",
    "24.11.1",
    "11.6.2",
    "10.20.0",
    "1.25.1",
    "0.8.14",
    "1.89.0",
    "21.0.8",
    "28.0.2",
    "1.19.0",
    "10.0.100",
  ]) {
    if (!text.includes(version))
      errors.push(`release workflow is missing pinned toolchain ${version}`);
  }
  for (const setup of [
    "actions/setup-go@v5",
    "astral-sh/setup-uv@v5",
    "dtolnay/rust-toolchain@1.89.0",
    "actions/setup-java@v4",
    "erlef/setup-beam@v1",
    "actions/setup-dotnet@v4",
  ]) {
    if (!JSON.stringify(prepare).includes(setup)) {
      errors.push(`release prepare is missing ecosystem toolchain setup ${setup}`);
    }
  }
  return errors;
}

export async function loadReleaseWorkflow(
  path = ".github/workflows/release.yaml",
): Promise<WorkflowDocument> {
  return record(Bun.YAML.parse(await Bun.file(path).text()));
}

export async function loadRequiredCiWorkflow(
  path = ".github/workflows/test.yaml",
): Promise<WorkflowDocument> {
  return record(Bun.YAML.parse(await Bun.file(path).text()));
}

if (import.meta.main) {
  const errors = validateReleaseWorkflow(
    await loadReleaseWorkflow(),
    await loadRequiredCiWorkflow(),
  );
  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }
  console.log("Release workflow contract validation passed.");
}
