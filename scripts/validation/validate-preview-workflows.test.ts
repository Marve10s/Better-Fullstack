import { describe, expect, test } from "bun:test";

import {
  loadWorkflowDocuments,
  validateWorkflowDocuments,
  type WorkflowDocument,
} from "@scripts/validation/validate-preview-workflows";

function cloneDocument(
  documents: Record<string, WorkflowDocument>,
  name: string,
): WorkflowDocument {
  const document = documents[name];
  if (!document) throw new Error(`Missing workflow document: ${name}`);
  return structuredClone(document);
}

describe("preview workflow security", () => {
  test("the repository workflows satisfy the security contract", async () => {
    expect(validateWorkflowDocuments(await loadWorkflowDocuments())).toEqual([]);
  });

  test("rejects the former pull_request_target checkout plus secret boundary", () => {
    const unsafe = Bun.YAML.parse(`
name: unsafe
on:
  pull_request_target:
permissions:
  pull-requests: write
  id-token: write
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - run: bun publish
        env:
          NPM_CONFIG_TOKEN: \${{ secrets.NPM_TOKEN }}
`) as WorkflowDocument;
    const documents = {
      "unsafe.yaml": unsafe,
      "pr-preview-build.yaml": {} as WorkflowDocument,
      "pr-preview.yaml": {} as WorkflowDocument,
    };

    expect(validateWorkflowDocuments(documents)).toContain(
      "unsafe.yaml:publish checks out an untrusted PR ref in a secret/write-capable job",
    );
  });

  test("rejects secrets added to the untrusted build", async () => {
    const documents = await loadWorkflowDocuments();
    const build = cloneDocument(documents, "pr-preview-build.yaml");
    const job = (build.jobs as Record<string, any>)["build-preview"];
    job.steps.push({ run: "printenv", env: { TOKEN: "${{ secrets.NPM_TOKEN }}" } });

    expect(validateWorkflowDocuments({ ...documents, "pr-preview-build.yaml": build })).toContain(
      "pr-preview-build.yaml must be secret-free with only contents: read",
    );
  });

  test("rejects checkout in the npm credential job", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    job.steps.unshift({ uses: "actions/checkout@v4" });

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "publish-preview must never check out repository code",
    );
  });

  test("rejects removal of the post-approval PR revalidation", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    job.steps = job.steps.filter(
      (step: Record<string, unknown>) =>
        step.name !== "Revalidate approved PR head after environment gate",
    );

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "publish-preview must revalidate the current PR head and label after environment approval",
    );
  });

  test("rejects write-all permissions in the untrusted build", async () => {
    const documents = await loadWorkflowDocuments();
    const build = cloneDocument(documents, "pr-preview-build.yaml");
    build.permissions = "write-all";

    expect(validateWorkflowDocuments({ ...documents, "pr-preview-build.yaml": build })).toContain(
      "pr-preview-build.yaml must be secret-free with only contents: read",
    );
  });

  test("rejects removal of any package identity validation", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    const identityStep = job.steps.find(
      (step: Record<string, unknown>) =>
        step.name === "Validate identities without executing lifecycle scripts",
    );
    identityStep.run = identityStep.run.replace(
      'validate_package "$ARTIFACT_DIR/types.tgz" "@better-fullstack/types"',
      "",
    );

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "all five preview artifacts must match their exact package identity and version",
    );
  });

  test("rejects an artifact download bound to a different run", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    const downloadStep = job.steps.find((step: Record<string, unknown>) =>
      String(step.uses ?? "").startsWith("actions/download-artifact@"),
    );
    downloadStep.with["run-id"] = "${{ github.run_id }}";

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "preview artifacts must be bound by name and run-id to the triggering workflow_run",
    );
  });

  test("rejects removal of trusted association from post-approval revalidation", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    const revalidation = job.steps.find(
      (step: Record<string, unknown>) =>
        step.name === "Revalidate approved PR head after environment gate",
    );
    revalidation.with.script = revalidation.with.script.replace(
      /\n\s*trustedAssociations\.has\(pull\.author_association\)/,
      "",
    );

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "publish-preview must revalidate the current PR head and label after environment approval",
    );
  });

  test("rejects artifact validation that ignores extra entry types", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    const identityStep = job.steps.find(
      (step: Record<string, unknown>) =>
        step.name === "Validate identities without executing lifecycle scripts",
    );
    identityStep.run = identityStep.run.replace(
      "-maxdepth 1 -printf",
      "-maxdepth 1 -type f -printf",
    );

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "all five preview artifacts must match their exact package identity and version",
    );
  });

  test("rejects repository-token fallback in the preview publisher", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    const secretStep = job.steps.find((step: Record<string, unknown>) =>
      JSON.stringify(step).includes("secrets.NPM_PREVIEW_TOKEN"),
    );
    secretStep.env.NODE_AUTH_TOKEN = "${{ secrets.NPM_TOKEN }}";

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "NPM_PREVIEW_TOKEN must appear exactly once and only in publish-preview",
    );
  });

  test("rejects retagging without both registry checksum comparisons", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["publish-preview"];
    const secretStep = job.steps.find((step: Record<string, unknown>) =>
      JSON.stringify(step).includes("secrets.NPM_PREVIEW_TOKEN"),
    );
    secretStep.run = secretStep.run.replace(
      '[[ "$registry_integrity" == "$local_integrity" && "$registry_shasum" == "$local_shasum" ]]',
      "",
    );

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "existing preview versions must match downloaded integrity and shasum before retagging",
    );
  });

  test("rejects a shortened preview version SHA", async () => {
    const documents = await loadWorkflowDocuments();
    const build = cloneDocument(documents, "pr-preview-build.yaml");
    const job = (build.jobs as Record<string, any>)["build-preview"];
    const versionStep = job.steps.find(
      (step: Record<string, unknown>) =>
        step.name === "Generate version from the trusted base revision",
    );
    versionStep.run = versionStep.run.replace("sha${COMMIT_SHA}", "${COMMIT_SHA:0:7}");

    expect(validateWorkflowDocuments({ ...documents, "pr-preview-build.yaml": build })).toContain(
      "preview versions must include the full pull request head SHA",
    );
  });

  test("rejects preview smoke that runs the default-branch harness", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["smoke-preview"];
    const checkout = job.steps.find((step: Record<string, unknown>) =>
      String(step.uses ?? "").startsWith("actions/checkout@"),
    );
    checkout.with.ref = "${{ github.event.repository.default_branch }}";

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "preview smoke must check out the authorized PR head in a secret-free read-only job",
    );
  });

  test("rejects preview smoke with a second checkout overriding the PR head", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["smoke-preview"];
    job.steps.push({
      uses: "actions/checkout@v4",
      with: { ref: "${{ github.event.repository.default_branch }}", "persist-credentials": false },
    });

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "preview smoke must check out the authorized PR head in a secret-free read-only job",
    );
  });

  test("rejects preview smoke that gains secrets alongside the PR-head checkout", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["smoke-preview"];
    job.steps.push({ run: "printenv", env: { TOKEN: "${{ secrets.NPM_TOKEN }}" } });

    const errors = validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish });
    expect(errors).toContain(
      "preview smoke must check out the authorized PR head in a secret-free read-only job",
    );
    expect(errors).toContain(
      "pr-preview.yaml:smoke-preview checks out an untrusted PR ref in a secret/write-capable job",
    );
  });

  test("rejects smoke validation through the mutable PR dist-tag", async () => {
    const documents = await loadWorkflowDocuments();
    const publish = cloneDocument(documents, "pr-preview.yaml");
    const job = (publish.jobs as Record<string, any>)["smoke-preview"];
    const smokeStep = job.steps.find(
      (step: Record<string, unknown>) => step.name === "Smoke published packages",
    );
    smokeStep.run = 'bun run test:published-package --specifier "$PREVIEW_TAG"';
    delete smokeStep.env.PREVIEW_VERSION;
    smokeStep.env.PREVIEW_TAG = "${{ needs.authorize.outputs.tag }}";

    expect(validateWorkflowDocuments({ ...documents, "pr-preview.yaml": publish })).toContain(
      "preview smoke must install the exact authorized version, not a mutable dist-tag",
    );
  });
});
