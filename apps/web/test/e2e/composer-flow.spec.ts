import { parseStackPartSpecs } from "@better-fullstack/types";
import { expect, test, type Page } from "@playwright/test";
import { unzipSync } from "fflate";
import { readFile } from "node:fs/promises";

import { clickVisibleTestId, gotoAppPage } from "./test-helpers";

// The compact command bar hides text without stopping command generation.
const commandOutput = (page: Page) => page.getByTestId("command-output");

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== "passed") return;
  const widths = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
});

test("new projects start with applications and expose every mobile ecosystem", async ({
  page,
}, testInfo) => {
  await gotoAppPage(page, "/new");
  await expect(commandOutput(page)).toContainText("bun create better-fullstack", {
    timeout: 15_000,
  });
  await expect(page.getByRole("heading", { name: "What are you building?" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("composer-applications.png"), fullPage: true });
  await clickVisibleTestId(page, "multi-application-mobile");
  await expect(page.getByTestId("multi-application-mobile")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await clickVisibleTestId(page, "multi-step-next");
  await clickVisibleTestId(page, "multi-step-mobile");
  for (const language of ["react-native", "kotlin", "swift", "dart"]) {
    await expect(page.getByTestId(`multi-mobile-language-${language}`)).toBeVisible();
  }
  await clickVisibleTestId(page, "multi-mobile-language-dart");
  await expect(commandOutput(page)).toContainText("--part mobile:dart:flutter");
  await clickVisibleTestId(page, "multi-step-review");
  await expect(page.getByTestId("multi-project-review")).toContainText("flutter pub get");
  await expect(page.getByTestId("multi-project-review")).toContainText("apps/native");
});

test("native applications omit JavaScript setup, round-trip their URL, and preview native output", async ({
  page,
}) => {
  await gotoAppPage(page, "/new");
  await expect(commandOutput(page)).toContainText("bun create better-fullstack", {
    timeout: 15_000,
  });
  await clickVisibleTestId(page, "multi-step-configure");
  await clickVisibleTestId(page, "multi-frontend-language-dotnet");
  await clickVisibleTestId(page, "multi-step-backend");
  await clickVisibleTestId(page, "multi-backend-language-go");
  await clickVisibleTestId(page, "multi-step-project");
  await expect(page.getByTestId("category-packageManager")).toHaveCount(0);
  await expect(page.getByTestId("category-toolchainProfile")).toHaveCount(0);
  await expect(commandOutput(page)).not.toContainText("--package-manager");
  await expect(commandOutput(page)).not.toContainText("turborepo");
  await expect(commandOutput(page)).toContainText("--part backend:go:");
  await page.reload();
  await expect(commandOutput(page)).toContainText("--part backend:go:", { timeout: 15_000 });
  await clickVisibleTestId(page, "multi-step-review");
  await expect(page.getByTestId("multi-project-review")).toContainText("dotnet restore");
  await expect(page.getByTestId("multi-project-review")).toContainText("go mod tidy");
  await expect(page.getByTestId("multi-project-review")).toContainText("bash scripts/dev.sh");
  const downloadPromise = page.waitForEvent("download");
  await clickVisibleTestId(page, "download-project-zip");
  const download = await downloadPromise;
  const zipPath = await download.path();
  expect(zipPath).not.toBeNull();
  if (!zipPath) throw new Error("Project download did not produce an archive");
  const archive = unzipSync(await readFile(zipPath));
  expect(Object.keys(archive).some((path) => path.endsWith("scripts/setup.sh"))).toBe(true);
  expect(Object.keys(archive).some((path) => path.endsWith("package.json"))).toBe(false);
  await page.getByRole("dialog").getByRole("button", { name: "Close", exact: true }).click();
  await clickVisibleTestId(page, "tab-preview");
  await expect(page.getByText("setup.sh", { exact: true })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("package.json", { exact: true })).toHaveCount(0);
});

test("an empty application selection cannot generate a default project", async ({ page }) => {
  await gotoAppPage(page, "/new");
  await expect(commandOutput(page)).toContainText("bun create better-fullstack", {
    timeout: 15_000,
  });
  await clickVisibleTestId(page, "multi-application-frontend");
  await clickVisibleTestId(page, "multi-application-backend");
  await expect(page.getByTestId("multi-step-next")).toBeDisabled();
  await expect(page.getByTestId("download-project-zip")).toBeDisabled();
  await expect(commandOutput(page)).toHaveText("");
  await clickVisibleTestId(page, "multi-application-mobile");
  await expect(page.getByTestId("multi-step-next")).toBeEnabled();
  await expect(commandOutput(page)).toContainText("--part mobile:");
});

test("editing a shared project preserves its named services and owned capabilities", async ({
  page,
}) => {
  const specs = [
    "frontend:typescript:next",
    "backend:go:gin:api",
    "api.orm:go:gorm",
    "backend:python:fastapi:worker",
    "worker.packageManager:python:poetry",
  ];
  await gotoAppPage(page, `/new?mode=multi&part=${encodeURIComponent(specs.join(","))}`);
  await expect(commandOutput(page)).toContainText("backend:python:fastapi:worker", {
    timeout: 15_000,
  });
  await clickVisibleTestId(page, "multi-step-configure");
  await clickVisibleTestId(page, "multi-frontend-language-dotnet");
  await expect(commandOutput(page)).toContainText("frontend:dotnet:blazor-webassembly");
  const command = await commandOutput(page).textContent();
  const parts = parseStackPartSpecs(
    [...(command ?? "").matchAll(/--part (\S+)/g)].map((match) => match[1] ?? ""),
    "selected",
  );
  expect(parts.find((part) => part.role === "orm" && part.toolId === "gorm")?.ownerPartId).toBe(
    "api",
  );
  expect(
    parts.find((part) => part.role === "packageManager" && part.toolId === "poetry")?.ownerPartId,
  ).toBe("worker");
  await clickVisibleTestId(page, "multi-step-review");
  await expect(page.getByTestId("multi-project-review")).toContainText("services/api");
  await expect(page.getByTestId("multi-project-review")).toContainText("services/worker");
  await expect(page.getByTestId("multi-project-review")).toContainText("poetry install");
});

test("the application flow remains usable on a narrow screen", async ({ page }, testInfo) => {
  await gotoAppPage(page, "/new");
  // The compact mobile command bar hides its text, but generation still signals hydration.
  const generatedCommand = page.getByTestId("command-output");
  await expect(generatedCommand).toContainText("bun create better-fullstack", {
    timeout: 15_000,
  });
  await expect(page.getByTestId("multi-application-mobile")).toBeVisible();
  await clickVisibleTestId(page, "multi-application-mobile");
  await expect(page.getByTestId("multi-application-mobile")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await clickVisibleTestId(page, "multi-step-next");
  await clickVisibleTestId(page, "multi-step-mobile");
  await expect(page.getByTestId("multi-mobile-language-swift")).toContainText("Swift");
  await clickVisibleTestId(page, "multi-mobile-language-swift");
  await expect(generatedCommand).toContainText("mobile:swift:swiftui");
  for (const role of ["frontend", "mobile", "backend", "database"]) {
    const fits = await page.getByTestId(`multi-step-${role}`).evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const list = element.parentElement?.getBoundingClientRect();
      return Boolean(list && bounds.left >= list.left && bounds.right <= list.right);
    });
    expect(fits).toBe(true);
  }
  const widths = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.viewport);
  await expect(page.getByText(/compatibility adjustments made/)).toHaveCount(0, { timeout: 6000 });
  await page.screenshot({ path: testInfo.outputPath("composer-mobile.png"), fullPage: true });
});
