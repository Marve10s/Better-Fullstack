import { test, expect } from "@playwright/test";

import { clickVisibleTestId, commandOutput, openBuilder } from "./test-helpers";

test.describe("Stack Builder", () => {
  test("loads the builder page", async ({ page }) => {
    await openBuilder(page);
  });

  test("displays CLI command", async ({ page }) => {
    await openBuilder(page);
    await expect(commandOutput(page)).toContainText("bun create better-fullstack");
  });

  test("URL updates when options change", async ({ page }) => {
    await openBuilder(page);
    await clickVisibleTestId(page, "option-backend-fastify");
    await expect(page).toHaveURL(/be=fastify/);
  });
});
