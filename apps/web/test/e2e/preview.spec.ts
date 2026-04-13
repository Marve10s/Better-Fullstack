import { test, expect } from "@playwright/test";

import { clickVisibleTestId, visibleTestId } from "./test-helpers";

test.describe("Preview Panel", () => {
  test("preview tab loads file tree", async ({ page }) => {
    await page.goto("/new");
    await clickVisibleTestId(page, "tab-preview");
    await expect(visibleTestId(page, "preview-folder-count")).toBeVisible({ timeout: 30000 });
    await expect(visibleTestId(page, "preview-file-count")).toBeVisible({ timeout: 30000 });
    await expect(visibleTestId(page, "preview-file-explorer")).toBeVisible({ timeout: 30000 });
  });
});
