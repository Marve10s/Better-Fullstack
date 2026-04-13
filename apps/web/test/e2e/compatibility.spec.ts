import { test, expect } from "@playwright/test";

test.describe("Stack Builder - Compatibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/new");
    await expect(page.getByTestId("command-output")).toBeVisible();
  });

  test("Convex backend disables database and ORM options", async ({ page }) => {
    await page.getByTestId("category-toggle-backend").click();
    await page.getByTestId("option-backend-convex").click();

    await expect(page.getByTestId("command-output")).toContainText("--backend convex");
  });

  test("selecting incompatible options triggers auto-adjustment", async ({ page }) => {
    await page.getByTestId("category-toggle-webFrontend").click();
    await page.getByTestId("option-webFrontend-nuxt").click();

    await expect(page.getByTestId("command-output")).toContainText("--frontend nuxt");
    await expect(page.getByTestId("command-output")).toContainText("--api orpc");
  });

  test("Payload CMS shows disabled state without Next.js", async ({ page }) => {
    await page.getByTestId("category-toggle-cms").click();
    await expect(page.getByTestId("option-cms-payload")).toContainText("Unavailable");
  });

  test("Sanity CMS is available with non-Next.js frontends", async ({ page }) => {
    await page.getByTestId("category-toggle-cms").click();
    await expect(page.getByTestId("option-cms-sanity")).toBeVisible();
    await expect(page.getByTestId("option-cms-sanity")).not.toContainText("Unavailable");
  });
});
