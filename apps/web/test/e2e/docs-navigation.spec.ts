import { expect, test } from "@playwright/test";
import { gotoAppPage } from "@test/e2e/test-helpers";

test("the search palette includes the docs landing page", async ({ page }) => {
  await gotoAppPage(page, "/docs/ai/mcp");
  await page.getByRole("button", { name: "Search docs", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Better Fullstack Docs/ })
    .click();
  await expect(page).toHaveURL(/\/docs\/?$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("failed clipboard writes keep the palette open and report the failure", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Clipboard denied");
        },
      },
    });
  });
  await gotoAppPage(page, "/docs");
  await page.getByRole("button", { name: "Search docs", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Copy install command/ })
    .click();
  await expect(page.getByText("Failed to copy command", { exact: true })).toBeVisible();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("ArrowDown follows the visible full-text search result order", async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
  await gotoAppPage(page, "/docs");
  await page.getByRole("button", { name: "Search docs", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const input = dialog.getByRole("textbox");
  await input.fill("auth");
  const results = dialog.getByRole("button");
  await expect(results).toHaveCount(16);
  await expect(results.nth(0)).toHaveClass(/(?:^|\s)bg-\[var\(--docs-panel\)\](?:\s|$)/);
  await input.press("ArrowDown");
  await expect(results.nth(1)).toHaveClass(/(?:^|\s)bg-\[var\(--docs-panel\)\](?:\s|$)/);
  await input.press("ArrowDown");
  await expect(results.nth(2)).toHaveClass(/(?:^|\s)bg-\[var\(--docs-panel\)\](?:\s|$)/);
});

test("an earlier clipboard write cannot close a reopened palette", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () =>
          new Promise<void>((resolve) => {
            window.addEventListener("finish-clipboard-write", () => resolve(), { once: true });
          }),
      },
    });
  });
  await gotoAppPage(page, "/docs");
  const trigger = page.getByRole("button", { name: "Search docs", exact: true });
  const dialog = page.getByRole("dialog");
  await trigger.click();
  await dialog.getByRole("button", { name: /Copy install command/ }).click();
  await dialog.getByRole("textbox").press("Escape");
  await expect(dialog).toHaveCount(0);
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new Event("finish-clipboard-write")));
  await expect(page.getByText("Command copied", { exact: true })).toBeVisible();
  await expect(dialog).toBeVisible();
});

test("guide navigation and the pack overview remain accessible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoAppPage(page, "/guides");
  await page
    .getByRole("heading", { name: "Better Fullstack Starter Packs" })
    .getByRole("link")
    .click();
  await expect(page).toHaveURL(/\/guides\/packs\/?$/);
  await page.getByRole("button", { name: "Open Guides navigation" }).click();
  const navigation = page.getByRole("navigation", { name: "Guides", exact: true });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Create a SaaS App", exact: true }).click();
  await expect(page).toHaveURL(/\/guides\/packs\/create-saas-app\/?$/);
  await expect(navigation).toBeHidden();
});

test("quickstart copy labels follow the selected locale", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "BFS_LOCALE", value: "de", url: baseURL! }]);
  await gotoAppPage(page, "/docs/ai/mcp");
  // The pending article translation falls back to English while its controls stay localized.
  await expect(page.getByRole("heading", { name: "MCP Server", exact: true })).toBeVisible();
  const quickstart = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Connect in one command", exact: true }),
  });
  await expect(quickstart.getByRole("button", { name: "Kopieren", exact: true })).toBeVisible();
  await expect(quickstart.getByRole("button", { name: "Copy code", exact: true })).toHaveCount(0);
});

test("quickstart tabs display and copy the selected package manager command", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await gotoAppPage(page, "/docs/ai/mcp");
  const quickstart = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Connect in one command", exact: true }),
  });
  const pnpm = quickstart.getByRole("tab", { name: "pnpm", exact: true });
  await pnpm.click();
  await expect(pnpm).toHaveAttribute("aria-selected", "true");
  await expect(quickstart.locator("pre")).toContainText(
    "pnpm dlx create-better-fullstack@latest install",
  );
  await expect(quickstart.locator("pre")).not.toContainText("npx");
  await quickstart.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(quickstart.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(
      "# Set up MCP and skills for detected agents\npnpm dlx create-better-fullstack@latest install\n\n# Or start the stdio server yourself\npnpm dlx create-better-fullstack@latest mcp",
    );
});
