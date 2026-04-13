import { test, expect } from "@playwright/test";

test.describe("Stack Builder", () => {
  test("loads the builder page", async ({ page }) => {
    await page.goto("/new");
    await expect(page.getByTestId("command-output")).toBeVisible();
  });

  test("displays CLI command", async ({ page }) => {
    await page.goto("/new");
    await expect(page.getByTestId("command-output")).toContainText("bun create better-fullstack");
  });

  test("URL updates when options change", async ({ page }) => {
    await page.goto("/new");
    await page.getByTestId("category-toggle-backend").click();
    await page.getByTestId("option-backend-fastify").click();
    await expect(page).toHaveURL(/be=fastify/);
  });
});
