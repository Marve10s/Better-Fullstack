import { test, expect } from "@playwright/test";

test.describe("URL Sharing", () => {
  test("navigating with search params restores stack", async ({ page }) => {
    // Navigate with explicit params (wf = webFrontend)
    await page.goto("/new?wf=next");
    await page.waitForTimeout(2000);
    // The command should reflect the Next.js frontend
    await expect(page.locator("text=--frontend next")).toBeVisible({ timeout: 15000 });
  });
});
