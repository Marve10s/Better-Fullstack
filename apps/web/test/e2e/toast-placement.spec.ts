import { test, expect } from "@playwright/test";
import { execFile } from "node:child_process";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { promisify } from "node:util";

import { gotoAppPage } from "./test-helpers";

const run = promisify(execFile);
let directory = "";
let bundle = "";
test.beforeAll(async () => {
  directory = await mkdtemp(resolve(tmpdir(), "bfs-toast-placement-"));
  const output = resolve(directory, "fixture.js");
  await run(
    "bun",
    [
      "build",
      resolve(import.meta.dirname, "fixtures/toast-placement.tsx"),
      "--target=browser",
      "--define",
      "import.meta.env.SSR=false",
      "--outfile",
      output,
    ],
    { cwd: resolve(import.meta.dirname, "../..") },
  );
  bundle = await readFile(output, "utf8");
});
test.afterAll(async () => {
  if (directory) await rm(directory, { recursive: true, force: true });
});

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;
for (const viewport of [
  { width: 1280, height: 900 },
  { width: 390, height: 844 },
]) {
  test.describe(`${viewport.width}px viewport`, () => {
    test.use({ viewport });
    for (const position of positions) {
      test(`close all stays next to ${position} notifications`, async ({ page }, testInfo) => {
        page.on("pageerror", (error) => {
          throw error;
        });
        await gotoAppPage(page, "/new");
        const styles = await page.locator("style").allTextContents();
        const links = await page
          .locator('link[rel="stylesheet"]')
          .evaluateAll((elements) => elements.map((element) => element.outerHTML).join(""));
        await page.route("**/__toast-placement*", async (route) => {
          if (route.request().url().endsWith(".js")) {
            await route.fulfill({ contentType: "text/javascript", body: bundle });
          } else {
            await route.fulfill({
              contentType: "text/html",
              body: `<html><head><style>${styles.join("\n")}</style>${links}</head><body><div id="root"></div><script type="module" src="/__toast-placement.js"></script></body></html>`,
            });
          }
        });
        await page.goto("/__toast-placement");
        await page.getByRole("button", { name: position, exact: true }).click();
        await page.getByRole("button", { name: "Create notifications" }).click();
        const close = page.getByRole("button", { name: "Close all", exact: true });
        await expect(close).toBeVisible();
        await expect(page.locator("[data-sonner-toast]")).toHaveCount(3);
        await expect
          .poll(async () =>
            page.evaluate((position) => {
              const button = document.querySelector(".cn-toast-close-all")?.getBoundingClientRect();
              const boxes = [...document.querySelectorAll("[data-sonner-toast]")].map((node) =>
                node.getBoundingClientRect(),
              );
              if (!button || boxes.length !== 3) return false;
              const [vertical, horizontal] = position.split("-");
              const gap =
                vertical === "top"
                  ? button.top - Math.max(...boxes.map((box) => box.bottom))
                  : Math.min(...boxes.map((box) => box.top)) - button.bottom;
              const alignment =
                horizontal === "left"
                  ? button.left - boxes[0].left
                  : horizontal === "right"
                    ? button.right - boxes[0].right
                    : (button.left + button.right - boxes[0].left - boxes[0].right) / 2;
              return Math.abs(gap - 10) < 2 && Math.abs(alignment) < 2;
            }, position),
          )
          .toBe(true);
        await page.screenshot({ path: testInfo.outputPath(`${position}.png`) });
        await close.click();
        await expect(page.locator("[data-sonner-toast]")).toHaveCount(0);
        await expect(close).toHaveCount(0);
      });
    }
  });
}
