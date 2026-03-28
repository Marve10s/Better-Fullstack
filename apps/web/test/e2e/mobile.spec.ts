import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("Stack Builder - Mobile", () => {
  test("builder page loads on mobile viewport", async ({ page }) => {
    await page.goto("/new");
    await expect(page.locator("text=Builder")).toBeVisible({ timeout: 15000 });
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/new");
    await page.waitForTimeout(2000);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("CLI command is visible on mobile", async ({ page }) => {
    await page.goto("/new");
    await expect(
      page.locator("text=bun create better-fullstack"),
    ).toBeVisible({ timeout: 15000 });
  });

  test("landing page loads on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Better Fullstack")).toBeVisible({ timeout: 15000 });
  });
});
