import { test, expect } from "@playwright/test";

import { clickVisibleTestId, commandOutput, openBuilder } from "./test-helpers";

test.describe("Stack Builder - Compatibility", () => {
  test.beforeEach(async ({ page }) => {
    await openBuilder(page);
  });

  test("Convex backend disables database and ORM options", async ({ page }) => {
    await clickVisibleTestId(page, "option-backend-convex");

    await expect(commandOutput(page)).toContainText("--backend convex");
  });

  test("selecting incompatible options triggers auto-adjustment", async ({ page }) => {
    await clickVisibleTestId(page, "option-webFrontend-nuxt");

    await expect(commandOutput(page)).toContainText("--frontend nuxt");
    await expect(commandOutput(page)).toContainText("--api orpc");
  });

  test("Payload CMS shows disabled state without Next.js", async ({ page }) => {
    await clickVisibleTestId(page, "category-toggle-cms");
    await expect(page.getByTestId("option-cms-payload")).toContainText("Unavailable");
  });

  test("Sanity CMS is available with non-Next.js frontends", async ({ page }) => {
    await clickVisibleTestId(page, "category-toggle-cms");
    await expect(page.getByTestId("option-cms-sanity")).toBeVisible();
    await expect(page.getByTestId("option-cms-sanity")).not.toContainText("Unavailable");
  });
});
