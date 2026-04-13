import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";

import { commandOutput } from "./test-helpers";

async function expectNoSeriousViolations(page: Page, scope = "body") {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .include(scope)
    .analyze();

  const seriousViolations = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  const message = seriousViolations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node) => `${node.target.join(", ")}: ${node.failureSummary ?? "No summary"}`)
        .join("\n");
      return `${violation.id} (${violation.impact})\n${nodes}`;
    })
    .join("\n\n");

  expect(seriousViolations, message).toEqual([]);
}

test.describe("Accessibility", () => {
  test("landing page has no serious accessibility violations", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "The full-stack app scaffolder" }),
    ).toBeVisible({ timeout: 15000 });
    await expectNoSeriousViolations(page);
  });

  test("builder page has no serious accessibility violations", async ({ page }) => {
    await page.goto("/new");
    await expect(commandOutput(page)).toContainText("bun create better-fullstack");
    await expectNoSeriousViolations(page);
  });
});
