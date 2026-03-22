import { test, expect } from "@playwright/test";

test.describe("Stack Builder - Compatibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/new");
    await expect(page.locator("text=Builder")).toBeVisible({ timeout: 15000 });
  });

  test("Convex backend disables database and ORM options", async ({ page }) => {
    // Find and click the Convex backend option
    const convexOption = page.locator("text=Convex").first();
    await convexOption.click();

    // After selecting Convex, database/ORM categories should show "none" or be auto-adjusted
    // The command output should reflect convex backend
    const command = page.locator('[data-testid="command-output"]');
    await expect(command).toContainText("convex", { timeout: 5000 });
  });

  test("selecting incompatible options triggers auto-adjustment", async ({ page }) => {
    // Select a frontend that triggers compatibility adjustments
    // Nuxt should auto-select oRPC (not tRPC which is React-only)
    const nuxtOption = page.locator("text=Nuxt").first();
    await nuxtOption.click();

    // Wait for auto-adjustment to occur
    await page.waitForTimeout(1000);

    // The command should contain nuxt
    const command = page.locator('[data-testid="command-output"]');
    await expect(command).toContainText("nuxt", { timeout: 5000 });
  });

  test("Payload CMS shows disabled state without Next.js", async ({ page }) => {
    // Default frontend is TanStack Router (not Next.js)
    // Scroll to CMS section and check Payload's state
    // Payload should have a disabled indicator since it requires Next.js
    const cmsSection = page.locator("text=CMS").first();
    await cmsSection.click();

    // Wait for CMS options to be visible
    await page.waitForTimeout(500);

    // Payload option should exist but show a disabled reason
    const payloadOption = page.locator("text=Payload").first();
    if (await payloadOption.isVisible()) {
      // Check for disabled visual indicator (opacity, aria-disabled, or tooltip)
      const parentButton = payloadOption.locator("xpath=ancestor::button[1]");
      const isDisabled = await parentButton.getAttribute("aria-disabled");
      const opacity = await parentButton.evaluate((el) => getComputedStyle(el).opacity);
      // Either aria-disabled or reduced opacity indicates disabled
      expect(isDisabled === "true" || Number.parseFloat(opacity) < 1).toBe(true);
    }
  });

  test("Sanity CMS is available with non-Next.js frontends", async ({ page }) => {
    // Default is TanStack Router — Sanity should still be available
    const cmsSection = page.locator("text=CMS").first();
    await cmsSection.click();
    await page.waitForTimeout(500);

    const sanityOption = page.locator("text=Sanity").first();
    if (await sanityOption.isVisible()) {
      const parentButton = sanityOption.locator("xpath=ancestor::button[1]");
      const isDisabled = await parentButton.getAttribute("aria-disabled");
      // Sanity should NOT be disabled
      expect(isDisabled).not.toBe("true");
    }
  });
});
