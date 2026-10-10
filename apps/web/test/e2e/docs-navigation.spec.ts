import { expect, test } from "@playwright/test";
import { gotoAppPage } from "@test/e2e/test-helpers";
import deContent from "@web-root/content/i18n/de.json" with { type: "json" };
import de from "@web-root/messages/de.json" with { type: "json" };
import ja from "@web-root/messages/ja.json" with { type: "json" };

import type { PublicVerificationReport } from "@/lib/docs/release-verification";

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

test("Japanese search finds words within translated documentation", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: "BFS_LOCALE", value: "ja", url: baseURL! }]);
  await gotoAppPage(page, "/docs/cli/create");
  await page.getByRole("button", { name: ja.docsSearch, exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("textbox").fill("選択肢");
  await expect(dialog.getByRole("button").filter({ hasText: "選択肢" }).first()).toBeVisible();
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
  await expect(page.getByRole("heading", { name: "MCP-Server", exact: true })).toBeVisible();
  const quickstart = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Mit einem Befehl verbinden", exact: true }),
  });
  await expect(quickstart.getByRole("button", { name: "Kopieren", exact: true })).toBeVisible();
  await expect(quickstart.getByRole("button", { name: "Copy code", exact: true })).toHaveCount(0);
});

test("CLI flag descriptions and controls follow the selected locale", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: "BFS_LOCALE", value: "de", url: baseURL! }]);
  await gotoAppPage(page, "/docs/cli/create");
  await expect(
    page.getByRole("columnheader", { name: de.docsCliAcceptedValues, exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Accepted values", exact: true }),
  ).toHaveCount(0);
  const ecosystemRow = page
    .getByRole("row")
    .filter({ has: page.getByText("--ecosystem", { exact: true }) });
  await expect(ecosystemRow).toContainText(de.docsCliSummaryCommonEcosystem);
  await expect(ecosystemRow.getByText("typescript", { exact: true }).first()).toBeVisible();
  await expect(ecosystemRow.getByText("rust", { exact: true })).toBeVisible();
  const frontendRows = page
    .getByRole("row")
    .filter({ has: page.getByText("--frontend", { exact: true }) });
  await expect(
    frontendRows.filter({ hasText: de.docsCliSummaryTypescriptStackFrontend }),
  ).toHaveCount(1);
  await expect(frontendRows.filter({ hasText: de.docsCliSummaryReactNativeFrontend })).toHaveCount(
    1,
  );
  await expect(
    page.getByRole("tablist", { name: de.docsPackageManager, exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: de.docsCopyCode, exact: true }).first(),
  ).toBeVisible();
});

for (const [slug, path] of [
  ["/ai/mcp", "ai/mcp.mdx"],
  ["/cli", "cli/index.mdx"],
] as const) {
  test(`viewing Markdown preserves the selected locale for /docs${slug}`, async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([{ name: "BFS_LOCALE", value: "de", url: baseURL! }]);
    await gotoAppPage(page, `/docs${slug}`);
    await page.locator("summary").filter({ hasText: de.docsActionsMenu }).click();
    const markdownLink = page.getByRole("link", { name: de.docsActionsViewMarkdown, exact: true });
    const url = await markdownLink.getAttribute("href");
    expect(url).toBe(`/docs${slug}.md`);
    const response = await context.request.get(url!, { headers: { Accept: "text/html" } });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-language"]).toBe("de");
    expect(response.headers()["cache-control"]).toContain("no-store");
    const localizedMarkdown = await response.text();
    expect(localizedMarkdown).toContain(deContent.docs[path].body);

    const english = await context.request.get(url!, {
      headers: { Accept: "text/html", Cookie: "BFS_LOCALE=en" },
    });
    expect(english.headers()["content-language"]).toBe("en");
    expect(await english.text()).not.toBe(localizedMarkdown);
  });
}

test("pending guides keep their English body when German is selected", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: "BFS_LOCALE", value: "de", url: baseURL! }]);
  await gotoAppPage(page, "/guides/ai/claude-code-fullstack-mcp");
  await expect(
    page.getByRole("heading", { name: "Connect the generator", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("You can give Claude Code a concrete starting task:", { exact: false }),
  ).toBeVisible();
});

test("verification results and receipt limitations follow the reader's locale", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: "BFS_LOCALE", value: "de", url: baseURL! }]);
  const verification = {
    schemaVersion: 1,
    status: "verified",
    current: true,
    evidenceLevel: "runtime-verified",
    maximumEvidenceLevel: "runtime-verified",
    reason: "All eight release recipes passed clean install, build, and live boundary assertions.",
    receiptUrl: "https://example.test/verification-receipt.v1.json",
    toolchains: [],
    cases: [
      {
        id: "go",
        ecosystems: ["go"],
        requiredStages: ["build", "runtime"],
        result: "pass",
        runtimeLimitation: "Exercises Gin and GORM with local SQLite, not a network database.",
        stackParts: ["backend:go:gin"],
      },
      {
        id: "python",
        ecosystems: [],
        requiredStages: [],
        result: "not-run",
        runtimeLimitation: null,
        stackParts: [],
      },
    ],
  } satisfies PublicVerificationReport;
  await page.route("**/api/verified-combinations", (route) =>
    route.fulfill({ json: { verification } }),
  );
  await gotoAppPage(page, "/docs/verification");
  await expect(page.getByText(de.docsVerificationPassedRecipes, { exact: true })).toBeVisible();
  await expect(page.getByText(de.docsVerificationRuntimeVerified, { exact: true })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: de.docsVerificationPassed, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: de.docsVerificationGoBoundary, exact: true }),
  ).toBeVisible();
  const notRunRow = page.getByRole("row").filter({
    has: page.getByRole("cell", { name: "python", exact: true }),
  });
  await expect(notRunRow.getByRole("cell").nth(1)).toHaveText(de.docsVerificationNotRun);
  await expect(
    notRunRow.getByRole("cell", { name: de.docsVerificationNoAssertion, exact: true }),
  ).toBeVisible();
  await expect(page.getByText(verification.reason, { exact: true })).toHaveCount(0);
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
  const npm = quickstart.getByRole("tab", { name: "npm", exact: true });
  const yarn = quickstart.getByRole("tab", { name: "yarn", exact: true });
  await npm.focus();
  await npm.press("ArrowLeft");
  await expect(yarn).toBeFocused();
  await yarn.press("ArrowRight");
  await expect(npm).toBeFocused();
  await npm.press("End");
  await expect(yarn).toBeFocused();
  await yarn.press("Home");
  await expect(npm).toBeFocused();
  await npm.press("ArrowRight");
  await expect(pnpm).toBeFocused();
  await pnpm.press("ArrowRight");
  const bun = quickstart.getByRole("tab", { name: "bun", exact: true });
  await expect(bun).toBeFocused();
  await bun.press("ArrowLeft");
  await expect(pnpm).toBeFocused();
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
