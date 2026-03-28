import { test, expect } from "@playwright/test";

test.describe("Preview Panel", () => {
  test("preview tab loads file tree", async ({ page }) => {
    await page.goto("/new");
    // Click preview tab
    const previewTab = page.locator("text=Preview");
    await previewTab.click();
    // Wait for template-generator to load (~354KB) and generate
    await expect(page.locator("text=folders")).toBeVisible({ timeout: 30000 });
    await expect(page.locator("text=files")).toBeVisible({ timeout: 30000 });
  });
});
