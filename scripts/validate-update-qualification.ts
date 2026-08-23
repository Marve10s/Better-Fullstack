type OutcomeEvidence = {
  id: string;
  testFile: string;
  testName: string;
};

export const UPDATE_OUTCOME_EVIDENCE: readonly OutcomeEvidence[] = [
  {
    id: "clean-auto-merge",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "cleanly auto-merges a structured template addition with no local divergence",
  },
  {
    id: "user-only-edit",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "classifies a user edit and leaves it untouched on apply",
  },
  {
    id: "generator-only-edit",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "classifies a substantive future template change as drift from the raw baseline",
  },
  {
    id: "compatible-dual-edit",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName:
      "structurally merges template dependency/script additions into a user-edited package.json",
  },
  {
    id: "conflict",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "flags a conflict when both the template and the local copy changed",
  },
  {
    id: "deleted-file",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "treats a deleted baseline file as a local edit instead of a new template file",
  },
  {
    id: "user-rename",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName:
      "preserves a user-renamed baseline file and keeps the missing original non-actionable",
  },
  {
    id: "template-rename",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "models a template rename as an additive new file and a retained removed path",
  },
  {
    id: "missing-baseline",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName:
      "falls back to manual review for package.json when the manifest has no content baseline",
  },
  {
    id: "interrupted-apply",
    testFile: "apps/cli/test/project-transaction.test.ts",
    testName: "recovers an interrupted pending transaction",
  },
  {
    id: "failed-write",
    testFile: "apps/cli/test/scaffold-upgrade.test.ts",
    testName: "rolls back exact preimages when an actionable write reports a failure",
  },
] as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function validateUpdateQualificationSources(sources: Record<string, string>): string[] {
  const errors: string[] = [];
  const documentation = sources["docs/update-support-policy.md"] ?? "";
  for (const outcome of UPDATE_OUTCOME_EVIDENCE) {
    const documentedRow = new RegExp(`\\|\\s+\\\`${escapeRegExp(outcome.id)}\\\`\\s+\\|`);
    if (!documentedRow.test(documentation)) {
      errors.push(`Update outcome ${outcome.id} has no declared documented result.`);
    }
    const testSource = sources[outcome.testFile] ?? "";
    if (!testSource.includes(`it("${outcome.testName}"`)) {
      errors.push(`Update outcome ${outcome.id} has no focused executable test.`);
    }
  }
  return errors;
}

export async function validateUpdateQualification(root = process.cwd()): Promise<string[]> {
  const paths = [
    "docs/update-support-policy.md",
    ...new Set(UPDATE_OUTCOME_EVIDENCE.map((outcome) => outcome.testFile)),
  ];
  const sources = Object.fromEntries(
    await Promise.all(
      paths.map(async (path) => [path, await Bun.file(`${root}/${path}`).text()] as const),
    ),
  );
  return validateUpdateQualificationSources(sources);
}

if (import.meta.main) {
  const errors = await validateUpdateQualification();
  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }
  console.log(`Validated ${UPDATE_OUTCOME_EVIDENCE.length} declared update outcomes.`);
}
