type UpdateActionSources = {
  metadata: string;
  implementation: string;
  gate: string;
  documentation: string;
};

export function validateUpdateActionSources(sources: UpdateActionSources): string[] {
  const errors: string[] = [];
  const requireMatch = (source: string, pattern: RegExp, error: string) => {
    if (!pattern.test(source)) errors.push(error);
  };
  requireMatch(
    sources.metadata,
    /oven-sh\/setup-bun@[0-9a-f]{40}/,
    "Update action must pin setup-bun to an immutable commit.",
  );
  requireMatch(
    sources.metadata,
    /actions\/upload-artifact@[0-9a-f]{40}/,
    "Update action must pin receipt upload to an immutable commit.",
  );
  requireMatch(
    sources.metadata,
    /bun-version:\s*"1\.3\.12"/,
    "Update action must pin its Bun runtime.",
  );
  for (const input of [
    "INPUT_CLI_VERSION",
    "INPUT_OPEN_PULL_REQUEST",
    "INPUT_FAIL_ON_CHANGES",
    "INPUT_GITHUB_TOKEN",
  ]) {
    if (!sources.metadata.includes(input)) errors.push(`Update action does not bind ${input}.`);
  }
  const runtime = `${sources.gate}\n${sources.implementation}`;
  for (const invariant of [
    "worktreeCleanAfterCheck",
    "verified-manifest-v2-recoverable",
    "updateBranch === baseBranch",
    "HEAD:refs/heads/${updateBranch}",
    "pullRequestBody(finalReceipt, digest)",
    "cli-version must be an exact semantic version",
  ]) {
    if (!runtime.includes(invariant)) {
      errors.push(`Update action lost required invariant: ${invariant}.`);
    }
  }
  if (/git[^\n]*push[^\n]*baseBranch/.test(runtime)) {
    errors.push("Update action must never push the base branch.");
  }
  for (const claim of [
    ".github/actions/update-check",
    "verified manifest-v2 lineage",
    "better-fullstack/update-<run-id>-<attempt>",
    "better-fullstack-update-check-receipt.v1.json",
  ]) {
    if (!sources.documentation.includes(claim)) {
      errors.push(`Update action documentation is missing: ${claim}.`);
    }
  }
  return errors;
}

export async function validateUpdateAction(root = process.cwd()): Promise<string[]> {
  const [metadata, implementation, gate, documentation] = await Promise.all([
    Bun.file(`${root}/.github/actions/update-check/action.yml`).text(),
    Bun.file(`${root}/.github/actions/update-check/update-check.ts`).text(),
    Bun.file(`${root}/.github/actions/update-check/gate.ts`).text(),
    Bun.file(`${root}/apps/web/content/docs/cli/update.mdx`).text(),
  ]);
  return validateUpdateActionSources({ metadata, implementation, gate, documentation });
}

if (import.meta.main) {
  const errors = await validateUpdateAction();
  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }
  console.log("Validated the opt-in update action contract.");
}
