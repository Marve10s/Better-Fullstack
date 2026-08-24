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
  }
});
