import { describe, expect, it } from "bun:test";

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
  }

  it("builds workspace packages before linting codebase dependency updates", async () => {
    const workflow = await Bun.file(".github/workflows/codebase-deps.yaml").text();
    const lint = workflow.indexOf("bun run lint");

    expect(workflow.indexOf("bun run --cwd packages/types build")).toBeLessThan(lint);
    expect(workflow.indexOf("bun run --cwd packages/template-generator build")).toBeLessThan(lint);
  });
});
