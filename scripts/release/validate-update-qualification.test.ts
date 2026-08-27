import { describe, expect, test } from "bun:test";

import {
  UPDATE_OUTCOME_EVIDENCE,
  validateUpdateQualification,
  validateUpdateQualificationSources,
} from "@scripts/release/validate-update-qualification";

describe("update qualification outcome coverage", () => {
  test("the repository binds every declared result to a focused test", async () => {
    expect(await validateUpdateQualification()).toEqual([]);
  });

  test("fails when documentation or executable evidence disappears", () => {
    const sources: Record<string, string> = {
      "docs/update-support-policy.md": UPDATE_OUTCOME_EVIDENCE.map(
        (outcome) => `| \`${outcome.id}\` | result |`,
      ).join("\n"),
    };
    for (const outcome of UPDATE_OUTCOME_EVIDENCE) {
      sources[outcome.testFile] =
        `${sources[outcome.testFile] ?? ""}\nit("${outcome.testName}", () => {});`;
    }
    expect(validateUpdateQualificationSources(sources)).toEqual([]);
    sources["docs/update-support-policy.md"] = sources["docs/update-support-policy.md"]!.replace(
      "| `conflict` |",
      "| removed | ",
    );
    sources[UPDATE_OUTCOME_EVIDENCE[0]!.testFile] = sources[
      UPDATE_OUTCOME_EVIDENCE[0]!.testFile
    ]!.replace(UPDATE_OUTCOME_EVIDENCE[0]!.testName, "removed test");
    expect(validateUpdateQualificationSources(sources)).toEqual(
      expect.arrayContaining([
        "Update outcome conflict has no declared documented result.",
        "Update outcome clean-auto-merge has no focused executable test.",
      ]),
    );
  });
});
