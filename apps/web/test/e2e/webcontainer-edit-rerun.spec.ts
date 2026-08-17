import {
  createStackSelectionSearchParams,
  DEFAULT_STACK_SELECTION,
} from "@better-fullstack/types/stack-translation";
import { expect, test } from "@playwright/test";

import { gotoAppPage } from "./test-helpers";

test.describe("real WebContainer lifecycle", { tag: "@webcontainer-proof" }, () => {
  // Two full attempts, browser setup, and artifact upload must fit inside the
  // workflow's 15-minute cap so a failure still produces useful diagnostics.
  test.describe.configure({ mode: "serial", retries: 1, timeout: 330_000 });

  test("boots a generated app, observes a source edit, and serves it after rerun", async ({
    page,
  }) => {
    page.on("console", (message) => {
      console.info(`[webcontainer-proof][browser:${message.type()}] ${message.text()}`);
    });
    page.on("pageerror", (error) => {
      console.error(`[webcontainer-proof][pageerror] ${error.stack ?? error.message}`);
    });

    const params = createStackSelectionSearchParams({
      ...DEFAULT_STACK_SELECTION,
      projectName: "browser-proof",
      webFrontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      database: "none",
      orm: "none",
      auth: "none",
      api: "none",
      forms: "none",
      validation: "none",
      testing: "none",
      cssFramework: "none",
      uiLibrary: "none",
      codeQuality: [],
      documentation: [],
      appPlatforms: [],
      examples: [],
      aiDocs: [],
      workspaceShape: "monorepo",
      install: "false",
      git: "false",
    });
    params.set("view", "run");

    await gotoAppPage(page, `/new?${params.toString()}`);
    console.info(
      "[webcontainer-proof] browser support",
      await page.evaluate(() => ({
        crossOriginIsolated: window.crossOriginIsolated,
        sharedArrayBuffer: typeof window.SharedArrayBuffer,
      })),
    );
    const runButton = page.getByTestId("run-project-button");
    const status = page.getByTestId("run-status");
    const runtimeConsole = page.locator('pre[aria-live="polite"]');
    const expectReady = async (stage: string, timeout: number) => {
      try {
        await expect(status).toHaveAttribute("data-status", "ready", { timeout });
      } catch (error) {
        console.error(
          `[webcontainer-proof] ${stage} failed`,
          JSON.stringify(
            {
              status: await status.getAttribute("data-status"),
              consoleTail: (await runtimeConsole.textContent())?.slice(-4_000),
              url: page.url(),
            },
            null,
            2,
          ),
        );
        throw error;
      }
    };
    await expect(runButton).toBeVisible({ timeout: 60_000 });

    await page.getByTestId("project-folder-apps/web").getByRole("button").click();
    await page.getByTestId("project-folder-apps/web/src").getByRole("button").click();
    await page.getByTestId("project-folder-apps/web/src/routes").getByRole("button").click();
    const sourceFile = page.getByTestId("project-file-apps/web/src/routes/home.tsx");
    await expect(sourceFile).toBeVisible({ timeout: 60_000 });

    console.info("[webcontainer-proof] starting initial run");
    await runButton.click();
    await expectReady("initial run", 240_000);

    const frame = page.frameLocator('[data-testid="run-preview-frame"]');
    await expect(frame.locator("body")).toBeVisible({ timeout: 30_000 });
    await expect(frame.locator("body")).not.toContainText("Wave 2 edit observed");

    // A successful first run intentionally opens the product's share prompt.
    // Close it through the visible UI before interacting with the editor so
    // the proof exercises the same flow a user sees instead of bypassing the
    // modal overlay with a forced click.
    console.info("[webcontainer-proof] dismissing first-run share prompt");
    const shareDialog = page.locator('[data-slot="dotted-dialog-content"]');
    await expect(shareDialog).toBeVisible({ timeout: 10_000 });
    await shareDialog.locator('[data-slot="dotted-dialog-close"]').click();
    await expect(shareDialog).toBeHidden({ timeout: 10_000 });

    await sourceFile.click();
    const editor = page.getByTestId("run-code-editor");
    await expect(editor).toBeVisible();
    const source = await editor.inputValue();
    expect(source).toContain("API Status");
    await editor.fill(source.replace("API Status", "Wave 2 edit observed"));

    console.info("[webcontainer-proof] starting edited rerun");
    await runButton.click();
    await expect(status).not.toHaveAttribute("data-status", "ready", { timeout: 10_000 });
    await expectReady("edited rerun", 120_000);
    await expect(frame.locator("body")).toContainText("Wave 2 edit observed", {
      timeout: 30_000,
    });
    console.info("[webcontainer-proof] edit observed in served iframe");
  });
});
