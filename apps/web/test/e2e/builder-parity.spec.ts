import { expect, test } from "@playwright/test";

import { clickVisibleTestId, commandOutput, openBuilder, visibleTestId } from "./test-helpers";

test.describe("Builder parity", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await openBuilder(page);
  });

  test("selecting a TypeScript single-select option updates command and URL", async ({ page }) => {
    await clickVisibleTestId(page, "option-backend-fastify");

    await expect(commandOutput(page)).toContainText("--backend fastify");
    await expect(page).toHaveURL(/be=fastify/);
  });

  test("selecting and removing multi-select addons updates the command", async ({ page }) => {
    await clickVisibleTestId(page, "option-codeQuality-biome");
    await expect(commandOutput(page)).toContainText("--addons biome turborepo");
    await expect(page).toHaveURL(/cq=biome/);

    await clickVisibleTestId(page, "option-codeQuality-biome");
    await expect(commandOutput(page)).toContainText("--yes");
  });

  test("python ecosystem exposes multi-select pythonAi and updates the command", async ({
    page,
  }) => {
    await clickVisibleTestId(page, "ecosystem-python");
    await expect(visibleTestId(page, "category-pythonAi")).toBeVisible();
    await clickVisibleTestId(page, "option-pythonAi-langchain");
    await clickVisibleTestId(page, "option-pythonAi-openai-sdk");

    await expect(commandOutput(page)).toContainText("--python-ai langchain openai-sdk");
  });

  test("rust ecosystem exposes multi-select rustLibraries and updates the command", async ({
    page,
  }) => {
    await clickVisibleTestId(page, "ecosystem-rust");
    await expect(visibleTestId(page, "category-rustLibraries")).toBeVisible();
    await clickVisibleTestId(page, "option-rustLibraries-validator");
    await clickVisibleTestId(page, "option-rustLibraries-mockall");

    const command = commandOutput(page);
    await expect(command).toContainText("--rust-libraries");
    await expect(command).toContainText("validator");
    await expect(command).toContainText("mockall");
  });

  test("astro integration only appears when Astro is selected", async ({ page }) => {
    await expect(page.getByTestId("category-astroIntegration")).toHaveCount(0);

    await clickVisibleTestId(page, "option-webFrontend-astro");

    await expect(page.getByTestId("category-astroIntegration")).toBeVisible();
    await clickVisibleTestId(page, "option-astroIntegration-react");
    await expect(commandOutput(page)).toContainText("--astro-integration react");
  });

  test("go auth renders as one section while staying ecosystem-filtered", async ({ page }) => {
    await clickVisibleTestId(page, "ecosystem-go");

    await expect(visibleTestId(page, "category-goAuth")).toBeVisible();
    await expect(page.getByTestId("category-auth")).toHaveCount(0);
    await expect(visibleTestId(page, "option-goAuth-casbin")).toBeVisible();
    await expect(visibleTestId(page, "option-auth-go-better-auth")).toBeVisible();
    await expect(page.locator('[data-testid="option-auth-nextauth"]:visible')).toHaveCount(0);

    await clickVisibleTestId(page, "option-goAuth-casbin");
    await clickVisibleTestId(page, "option-auth-go-better-auth");

    await expect(commandOutput(page)).toContainText("--go-auth casbin");
    await expect(commandOutput(page)).toContainText("--auth go-better-auth");
  });

  test("disabled options do not mutate the command output", async ({ page }) => {
    await clickVisibleTestId(page, "sidebar-category-toggle-cms");
    const command = commandOutput(page);
    const initialCommand = await command.textContent();

    const payloadOption = visibleTestId(page, "sidebar-option-cms-payload");
    await expect(payloadOption).toContainText("Unavailable");
    await expect(payloadOption).toBeDisabled();
    await payloadOption.click({ force: true });

    await expect(command).toHaveText(initialCommand ?? "");
  });
});
