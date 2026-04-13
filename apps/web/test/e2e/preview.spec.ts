import { test, expect } from "@playwright/test";

import { clickVisibleTestId, openBuilder, visibleTestId } from "./test-helpers";

test.describe("Preview Panel", () => {
  test("preview tab loads file tree", async ({ page }) => {
    await openBuilder(page);
    await clickVisibleTestId(page, "tab-preview");
    await expect(page.getByTestId("preview-error")).toHaveCount(0);
    await expect(visibleTestId(page, "preview-file-explorer")).toBeVisible({ timeout: 60000 });
    await expect(visibleTestId(page, "preview-folder-count")).toContainText("folders", {
      timeout: 60000,
    });
    await expect(visibleTestId(page, "preview-file-count")).toContainText("files", {
      timeout: 60000,
    });
  });
});
