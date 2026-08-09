import { readdir } from "node:fs/promises";
import { join } from "node:path";

export type WorkflowDocument = Record<string, unknown>;

const PRIVILEGED_EVENTS = new Set(["pull_request_target", "workflow_run"]);
const UNTRUSTED_CHECKOUT_REF = /pull_request\.(?:head|merge)|workflow_run\.head|head_(?:sha|ref)/i;

function record(value: unknown): Record<string, any> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, any>)
    : {};
}

function events(workflow: WorkflowDocument): string[] {
  const trigger = workflow.on;
  if (typeof trigger === "string") return [trigger];
  if (Array.isArray(trigger))
    return trigger.filter((value): value is string => typeof value === "string");
  return Object.keys(record(trigger));
}

function hasWritePermission(value: unknown): boolean {
  if (value === "write-all") return true;
  return Object.values(record(value)).some((permission) => permission === "write");
}

function effectivePermissions(workflow: WorkflowDocument, job: Record<string, any>): unknown {
  return Object.hasOwn(job, "permissions") ? job.permissions : workflow.permissions;
}

function steps(job: Record<string, any>): Record<string, any>[] {
  return Array.isArray(job.steps) ? job.steps.map(record) : [];
}

function count(text: string, needle: string): number {
  return text.split(needle).length - 1;
}

export function validateWorkflowDocuments(documents: Record<string, WorkflowDocument>): string[] {
  const errors: string[] = [];

  for (const [file, workflow] of Object.entries(documents)) {
    const privilegedTrigger = events(workflow).some((event) => PRIVILEGED_EVENTS.has(event));
    if (!privilegedTrigger) continue;

    for (const [jobName, rawJob] of Object.entries(record(workflow.jobs))) {
      const job = record(rawJob);
      const jobText = JSON.stringify(job);
      const privilegedJob =
        jobText.includes("secrets.") || hasWritePermission(effectivePermissions(workflow, job));

      for (const step of steps(job)) {
        if (!String(step.uses ?? "").startsWith("actions/checkout@")) continue;
        const ref = String(record(step.with).ref ?? "");
        if (privilegedJob && UNTRUSTED_CHECKOUT_REF.test(ref)) {
          errors.push(
            `${file}:${jobName} checks out an untrusted PR ref in a secret/write-capable job`,
          );
        }
      }

      if (privilegedJob && jobText.includes("actions/cache@")) {
        errors.push(
          `${file}:${jobName} restores a cache in a privileged-trigger secret/write-capable job`,
        );
      }
    }
  }

  const build = documents["pr-preview-build.yaml"];
  const publish = documents["pr-preview.yaml"];
  if (!build) errors.push("pr-preview-build.yaml is missing");
  if (!publish) errors.push("pr-preview.yaml is missing");
  if (!build || !publish) return errors;

  const buildText = JSON.stringify(build);
  const buildEvents = events(build);
  if (
    !buildEvents.includes("pull_request") ||
    buildEvents.some((event) => PRIVILEGED_EVENTS.has(event))
  ) {
    errors.push("pr-preview-build.yaml must run only in the unprivileged pull_request context");
  }
  const buildPermissions = record(build.permissions);
  const buildHasJobWrite = Object.values(record(build.jobs)).some((job) =>
    hasWritePermission(effectivePermissions(build, record(job))),
  );
  if (
    buildText.includes("secrets.") ||
    buildHasJobWrite ||
    Object.keys(buildPermissions).length !== 1 ||
    buildPermissions.contents !== "read"
  ) {
    errors.push("pr-preview-build.yaml must be secret-free with only contents: read");
  }
  const buildCheckouts = Object.values(record(build.jobs)).flatMap((job) =>
    steps(record(job)).filter((step) => String(step.uses ?? "").startsWith("actions/checkout@")),
  );
  const buildUploads = Object.values(record(build.jobs)).flatMap((job) =>
    steps(record(job)).filter((step) =>
      String(step.uses ?? "").startsWith("actions/upload-artifact@"),
    ),
  );
  if (
    buildUploads.length !== 1 ||
    record(buildUploads[0]?.with).name !== "preview-packages-${{ github.run_id }}"
  ) {
    errors.push("preview build artifact name must be bound to its exact workflow run ID");
  }
  if (
    buildCheckouts.length !== 1 ||
    record(buildCheckouts[0]?.with)["persist-credentials"] !== false
  ) {
    errors.push("pr-preview-build.yaml must disable checkout credential persistence");
  }
  if (!buildText.includes("sha${COMMIT_SHA}") || buildText.includes("COMMIT_SHA:0:")) {
    errors.push("preview versions must include the full pull request head SHA");
  }

  const publishText = JSON.stringify(publish);
  if (
    !events(publish).includes("workflow_run") ||
    events(publish).includes("pull_request_target")
  ) {
    errors.push("pr-preview.yaml must be a trusted workflow_run publisher");
  }
  if (publishText.includes('"id-token":"write"')) {
    errors.push("pr-preview.yaml must not request an OIDC token");
  }
  if (publish.permissions === "write-all") {
    errors.push("pr-preview.yaml must not use write-all permissions");
  }
  for (const marker of [
    "head_repository?.full_name !== repository",
    "candidate.head.sha === run.head_sha",
    'label.name === \\"preview\\"',
    "trustedAssociations",
  ]) {
    if (!publishText.includes(marker))
      errors.push(`pr-preview.yaml is missing authorization guard: ${marker}`);
  }
  if (!publishText.includes("sha${run.head_sha}") || publishText.includes("run.head_sha.slice")) {
    errors.push("preview versions must include the full workflow_run head SHA");
  }

  const publishJob = record(record(publish.jobs)["publish-preview"]);
  const publishJobText = JSON.stringify(publishJob);
  if (publishJob.permissions === "write-all") {
    errors.push("publish-preview must not use write-all permissions");
  }
  if (record(publishJob.environment).name !== "npm-preview") {
    errors.push("publish-preview must use the npm-preview environment");
  }
  if (steps(publishJob).some((step) => String(step.uses ?? "").startsWith("actions/checkout@"))) {
    errors.push("publish-preview must never check out repository code");
  }
  if (
    count(publishText, "secrets.NPM_PREVIEW_TOKEN") !== 1 ||
    !publishJobText.includes("secrets.NPM_PREVIEW_TOKEN") ||
    publishText.includes("secrets.NPM_TOKEN")
  ) {
    errors.push("NPM_PREVIEW_TOKEN must appear exactly once and only in publish-preview");
  }
  const publishSteps = steps(publishJob);
  const revalidationIndex = publishSteps.findIndex(
    (step) => step.name === "Revalidate approved PR head after environment gate",
  );
  const downloadIndex = publishSteps.findIndex((step) =>
    String(step.uses ?? "").startsWith("actions/download-artifact@"),
  );
  const secretIndex = publishSteps.findIndex((step) =>
    JSON.stringify(step).includes("secrets.NPM_PREVIEW_TOKEN"),
  );
  if (
    revalidationIndex < 0 ||
    downloadIndex < 0 ||
    revalidationIndex >= downloadIndex ||
    secretIndex < 0 ||
    revalidationIndex >= secretIndex ||
    record(publishJob.permissions)["pull-requests"] !== "read" ||
    !JSON.stringify(publishSteps[revalidationIndex]).includes("pull.head.sha === authorizedSha") ||
    !JSON.stringify(publishSteps[revalidationIndex]).includes("label.name") ||
    !JSON.stringify(publishSteps[revalidationIndex]).includes("preview") ||
    !JSON.stringify(publishSteps[revalidationIndex]).includes(
      "trustedAssociations.has(pull.author_association)",
    )
  ) {
    errors.push(
      "publish-preview must revalidate the current PR head and label after environment approval",
    );
  }
  const downloadWith = record(publishSteps[downloadIndex]?.with);
  if (
    downloadWith.name !== "preview-packages-${{ github.event.workflow_run.id }}" ||
    downloadWith["run-id"] !== "${{ github.event.workflow_run.id }}"
  ) {
    errors.push(
      "preview artifacts must be bound by name and run-id to the triggering workflow_run",
    );
  }

  const identityStep = publishSteps.find(
    (step) => step.name === "Validate identities without executing lifecycle scripts",
  );
  const identityRun = String(identityStep?.run ?? "");
  const identities = [
    'validate_package "$ARTIFACT_DIR/types.tgz" "@better-fullstack/types"',
    'validate_package "$ARTIFACT_DIR/template-generator.tgz" "@better-fullstack/template-generator"',
    'validate_package "$ARTIFACT_DIR/cli.tgz" "create-better-fullstack"',
    'validate_package "$ARTIFACT_DIR/create-bfs.tgz" "create-bfs"',
  ];
  if (
    !identityRun.includes('actual_name" == "$expected_name') ||
    !identityRun.includes('actual_version" == "$EXPECTED_VERSION') ||
    !identityRun.includes('actual_files=$(find "$ARTIFACT_DIR" -mindepth 1 -maxdepth 1 -printf') ||
    identityRun.includes("-type f") ||
    !identityRun.includes('! -L "$ARTIFACT_DIR/$file"') ||
    identities.some((identity) => !identityRun.includes(identity))
  ) {
    errors.push("all four preview artifacts must match their exact package identity and version");
  }

  const npmSecretStep = steps(publishJob).find((step) =>
    JSON.stringify(step).includes("secrets.NPM_PREVIEW_TOKEN"),
  );
  if (
    !npmSecretStep ||
    !String(npmSecretStep.run ?? "").includes("npm publish") ||
    !String(npmSecretStep.run).includes("--ignore-scripts")
  ) {
    errors.push("the NPM_PREVIEW_TOKEN step may only publish inert tarballs with --ignore-scripts");
  }
  const publishRun = String(npmSecretStep?.run ?? "");
  const integrityIndex = publishRun.indexOf("registry_integrity");
  const shasumIndex = publishRun.indexOf("registry_shasum");
  const retagIndex = publishRun.indexOf("npm dist-tag add");
  if (
    integrityIndex < 0 ||
    shasumIndex < 0 ||
    retagIndex < 0 ||
    integrityIndex >= retagIndex ||
    shasumIndex >= retagIndex ||
    !publishRun.includes('"$registry_integrity" == "$local_integrity"') ||
    !publishRun.includes('"$registry_shasum" == "$local_shasum"')
  ) {
    errors.push(
      "existing preview versions must match downloaded integrity and shasum before retagging",
    );
  }

  const commentJob = record(record(publish.jobs).comment);
  if (
    !hasWritePermission(commentJob.permissions) ||
    JSON.stringify(commentJob).includes("secrets.")
  ) {
    errors.push("PR write access must remain isolated in the secret-free comment job");
  }

  const smokeJob = record(record(publish.jobs)["smoke-preview"]);
  const smokeStep = steps(smokeJob).find((step) => step.name === "Smoke published packages");
  if (
    !smokeStep ||
    String(smokeStep.run ?? "") !==
      'bun run test:published-package --specifier "$PREVIEW_VERSION"' ||
    record(smokeStep.env).PREVIEW_VERSION !== "${{ needs.authorize.outputs.version }}" ||
    JSON.stringify(smokeStep).includes("PREVIEW_TAG")
  ) {
    errors.push("preview smoke must install the exact authorized version, not a mutable dist-tag");
  }

  return errors;
}

export async function loadWorkflowDocuments(
  directory = ".github/workflows",
): Promise<Record<string, WorkflowDocument>> {
  const documents: Record<string, WorkflowDocument> = {};
  for (const file of await readdir(directory)) {
    if (!/\.ya?ml$/.test(file)) continue;
    // Workflow files are intentionally small and read deterministically.
    // oxlint-disable-next-line no-await-in-loop
    documents[file] = record(Bun.YAML.parse(await Bun.file(join(directory, file)).text()));
  }
  return documents;
}

if (import.meta.main) {
  const errors = validateWorkflowDocuments(await loadWorkflowDocuments());
  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }
  console.log("Preview workflow security validation passed.");
}
