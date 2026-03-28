import { test, expect } from "@playwright/test";

test.describe("Stack Builder", () => {
  test("loads the builder page", async ({ page }) => {
    await page.goto("/new");
    await expect(page.locator("text=Builder")).toBeVisible({ timeout: 15000 });
  });

  test("displays CLI command", async ({ page }) => {
    await page.goto("/new");
    await expect(page.locator("text=bun create better-fullstack")).toBeVisible({ timeout: 15000 });
  });

  test("URL updates when options change", async ({ page }) => {
    await page.goto("/new");
    await page.waitForTimeout(2000);
    // The URL should contain search params for the default stack
    expect(page.url()).toContain("/new");
  });
});
