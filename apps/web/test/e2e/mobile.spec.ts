import { test, expect } from "@playwright/test";

import { clickVisibleTestId, commandOutput, visibleTestId } from "./test-helpers";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("Stack Builder - Mobile", () => {
  test("builder page loads on mobile viewport", async ({ page }) => {
    await page.goto("/new");
    await expect(visibleTestId(page, "tab-builder")).toBeVisible();
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/new");
    await expect(visibleTestId(page, "tab-builder")).toBeVisible();

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("CLI command is visible on mobile", async ({ page }) => {
    await page.goto("/new");
    await clickVisibleTestId(page, "mobile-tab-summary");
    await expect(visibleTestId(page, "mobile-tab-summary")).toHaveAttribute("data-state", "active");
    const mobileCommand = commandOutput(page);
    await expect(mobileCommand).toBeVisible();
    await expect(mobileCommand).toContainText("bun create better-fullstack");
  });

  test("landing page loads on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "The full-stack app scaffolder" }),
    ).toBeVisible({ timeout: 15000 });
  });
});
