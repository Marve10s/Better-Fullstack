import { expect, test } from "@playwright/test";

test.describe("Builder parity", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/new");
    await expect(page.getByTestId("command-output")).toBeVisible();
  });

  test("selecting a TypeScript single-select option updates command and URL", async ({ page }) => {
    await page.getByTestId("category-toggle-backend").click();
    await page.getByTestId("option-backend-fastify").click();

    await expect(page.getByTestId("command-output")).toContainText("--backend fastify");
    await expect(page).toHaveURL(/be=fastify/);
  });

  test("selecting and removing multi-select addons updates the command", async ({ page }) => {
    await page.getByTestId("sidebar-category-toggle-codeQuality").click();
    await page.getByTestId("sidebar-option-codeQuality-biome").click();
    await expect(page.getByTestId("command-output")).toContainText("--addons biome turborepo");
    await expect(page).toHaveURL(/cq=biome/);

    await page.getByTestId("sidebar-option-codeQuality-biome").click();
    await expect(page.getByTestId("command-output")).toContainText("--yes");
  });

  test("python ecosystem exposes multi-select pythonAi and updates the command", async ({
    page,
  }) => {
    await page.getByTestId("ecosystem-python").click();
    await page.getByTestId("category-toggle-pythonAi").click();
    await page.getByTestId("option-pythonAi-langchain").click();
    await page.getByTestId("option-pythonAi-openai-sdk").click();

    await expect(page.getByTestId("command-output")).toContainText(
      "--python-ai langchain openai-sdk",
    );
  });

  test("rust ecosystem exposes multi-select rustLibraries and updates the command", async ({
    page,
  }) => {
    await page.getByTestId("ecosystem-rust").click();
    await page.getByTestId("sidebar-category-toggle-rustLibraries").click();
    await page.getByTestId("sidebar-option-rustLibraries-validator").click();
    await page.getByTestId("sidebar-option-rustLibraries-mockall").click();

    const command = page.getByTestId("command-output");
    await expect(command).toContainText("--rust-libraries");
    await expect(command).toContainText("validator");
    await expect(command).toContainText("mockall");
  });

  test("astro integration only appears when Astro is selected", async ({ page }) => {
    await expect(page.getByTestId("category-astroIntegration")).toHaveCount(0);

    await page.getByTestId("category-toggle-webFrontend").click();
    await page.getByTestId("option-webFrontend-astro").click();

    await expect(page.getByTestId("category-astroIntegration")).toBeVisible();
    await page.getByTestId("option-astroIntegration-react").click();
    await expect(page.getByTestId("command-output")).toContainText("--astro-integration react");
  });

  test("go auth options stay ecosystem-filtered", async ({ page }) => {
    await page.getByTestId("ecosystem-go").click();
    await expect(page.getByTestId("sidebar-category-toggle-goAuth")).toBeVisible();
    await page.getByTestId("sidebar-category-toggle-auth").click();

    await expect(page.getByTestId("sidebar-option-auth-go-better-auth")).toBeVisible();
    await expect(page.getByTestId("sidebar-option-auth-nextauth")).toHaveCount(0);
  });

  test("disabled options do not mutate the command output", async ({ page }) => {
    await page.getByTestId("sidebar-category-toggle-cms").click();
    const command = page.getByTestId("command-output");
    const initialCommand = await command.textContent();

    const payloadOption = page.getByTestId("sidebar-option-cms-payload");
    await expect(payloadOption).toContainText("Unavailable");
    await expect(payloadOption).toBeDisabled();
    await payloadOption.click({ force: true });

    await expect(command).toHaveText(initialCommand ?? "");
  });
});
