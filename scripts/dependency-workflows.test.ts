import { describe, expect, it } from "bun:test";

import { composeMarkdownReport } from "../.github/scripts/compose-markdown-report";

const workflows = [".github/workflows/codebase-deps.yaml", ".github/workflows/deps-check.yaml"];

describe("automated dependency PR verification", () => {
  for (const path of workflows) {
    it(`${path} runs lint and tests before creating a PR`, async () => {
      const workflow = await Bun.file(path).text();
      const createPullRequest = workflow.indexOf("name: Create Pull Request");
      const lint = workflow.indexOf("bun run lint");
      const test = workflow.indexOf("bun run test");

      expect(createPullRequest).toBeGreaterThan(-1);
      expect(lint).toBeGreaterThan(-1);
      expect(test).toBeGreaterThan(-1);
      expect(lint).toBeLessThan(createPullRequest);
      expect(test).toBeLessThan(createPullRequest);
    });

    it(`${path} reports lint and test failures separately`, async () => {
      const workflow = await Bun.file(path).text();

      expect(workflow).toContain('echo "lint_exit_code=$LINT_EXIT_CODE" >> "$GITHUB_OUTPUT"');
      expect(workflow).toContain('echo "test_exit_code=$TEST_EXIT_CODE" >> "$GITHUB_OUTPUT"');
      expect(workflow).toContain('"${{ steps.full-tests.outputs.lint_exit_code }}"');
      expect(workflow).toContain('"${{ steps.full-tests.outputs.test_exit_code }}"');
      expect(workflow).toContain("## Lint verification");
      expect(workflow).toContain("## Test verification");
    });

    it(`${path} bounds the generated pull request report`, async () => {
      const workflow = await Bun.file(path).text();

      expect(workflow).toContain("compose-markdown-report.ts");
      expect(workflow).toContain("50000");
    });
  }

  it("captures workspace build failures before linting codebase dependency updates", async () => {
    const workflow = await Bun.file(".github/workflows/codebase-deps.yaml").text();
    const lint = workflow.indexOf("bun run lint");

    expect(workflow.indexOf("bun run --cwd packages/types build")).toBeLessThan(lint);
    expect(workflow.indexOf("bun run --cwd packages/template-generator build")).toBeLessThan(lint);
    expect(workflow).toContain('echo "build_exit_code=$BUILD_EXIT_CODE" >> "$GITHUB_OUTPUT"');
    expect(workflow).toContain('"${{ steps.full-tests.outputs.build_exit_code }}"');
    expect(workflow).toContain("## Build verification");
  });

  it("uses one shared size budget for the dependency and verification reports", async () => {
    const workflow = await Bun.file(".github/workflows/deps-check.yaml").text();

    expect(workflow).toContain("REPORT_INPUTS=(packages/deps-report.md)");
    expect(workflow).not.toContain("${{ steps.test-report.outputs.report }}");
  });

  it("appends the dependency summary without shell-interpolating Markdown", async () => {
    const workflow = await Bun.file(".github/workflows/deps-check.yaml").text();

    expect(workflow).toContain('cat "$RUNNER_TEMP/final-report.md" >> "$GITHUB_STEP_SUMMARY"');
    expect(workflow).not.toContain('echo "${{ steps.final-report.outputs.report }}"');
  });

  it("preserves reports below the configured size budget", () => {
    expect(composeMarkdownReport(["first", "second"], 100)).toBe("first\n\nsecond");
  });

  it("truncates reports without splitting UTF-8 characters", () => {
    const report = composeMarkdownReport(["🙂".repeat(100)], 150);

    expect(new TextEncoder().encode(report).length).toBeLessThanOrEqual(150);
    expect(report).toContain("Report truncated");
    expect(report).not.toContain("�");
  });

  it("closes a fenced log excerpt when truncation lands inside it", () => {
    const source = `Before\n\n\`\`\`text\n${"failure output\n".repeat(100)}\`\`\`\n\nAfter`;
    const report = composeMarkdownReport([source], 180);

    expect(report.match(/^\`\`\`/gm)).toHaveLength(2);
    expect(new TextEncoder().encode(report).length).toBeLessThanOrEqual(180);
    expect(report).toContain("Report truncated");
  });
});
