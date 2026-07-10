import { expect, test } from "@playwright/test";

import {
  clickVisibleTestId,
  commandOutput,
  gotoAppPage,
  openBuilder,
  visibleTestId,
} from "./test-helpers";

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

  test("selecting an AI option updates command and URL", async ({ page }) => {
    await clickVisibleTestId(page, "category-toggle-ai");
    await clickVisibleTestId(page, "option-ai-vercel-ai");

    await expect(commandOutput(page)).toContainText("--ai vercel-ai");
    await expect(commandOutput(page)).not.toContainText("--ai none");
    await expect(page).toHaveURL(/aisdk=vercel-ai/);
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

  test("Kotlin is a first-class solo ecosystem choice backed by the Java generator", async ({
    page,
  }) => {
    await clickVisibleTestId(page, "ecosystem-kotlin");

    await expect(commandOutput(page)).toContainText("--ecosystem java");
    await expect(commandOutput(page)).toContainText("--java-language kotlin");
    await expect(page).toHaveURL(/eco=java/);
    await expect(page).toHaveURL(/jlang=kotlin/);
  });

  test("multi-ecosystem mode emits scoped --part flags", async ({ page }) => {
    await clickVisibleTestId(page, "stack-mode-multi");
    await clickVisibleTestId(page, "multi-frontend-tool-next");
    await clickVisibleTestId(page, "multi-step-next");
    await clickVisibleTestId(page, "multi-backend-language-go");
    await clickVisibleTestId(page, "multi-backend-tool-gin");
    await clickVisibleTestId(page, "multi-backend-orm-gorm");
    await clickVisibleTestId(page, "multi-step-next");
    await clickVisibleTestId(page, "multi-database-tool-postgres");

    const command = commandOutput(page);
    await expect(command).toContainText("--part frontend:typescript:next");
    await expect(command).toContainText("--part backend:go:gin");
    await expect(command).toContainText("--part backend.orm:go:gorm");
    await expect(command).toContainText("--part database:universal:postgres");
    await expect(command).not.toContainText("--backend hono");
    await expect(page).toHaveURL(/mode=multi/);
    await expect(page).toHaveURL(/part=/);
  });

  test("multi-ecosystem mode exposes Kotlin as a separate backend language", async ({ page }) => {
    await clickVisibleTestId(page, "stack-mode-multi");
    await clickVisibleTestId(page, "multi-step-next");
    await clickVisibleTestId(page, "multi-backend-language-kotlin");

    const command = commandOutput(page);
    await expect(command).toContainText("--part backend:java:spring-boot");
    await expect(command).toContainText("--part backend.language:java:kotlin");
    await expect(page.getByTestId("multi-backend-orm-jooq")).toHaveCount(0);
    await expect(page.getByTestId("multi-backend-orm-mybatis")).toHaveCount(0);
    await expect(page.getByTestId("multi-backend-api-grpc")).toHaveCount(0);
    await expect(page.getByTestId("multi-backend-api-openapi-generator")).toHaveCount(0);
  });

  test("repairs stale Java-only capabilities in shared Kotlin multi-stack URLs", async ({
    page,
  }) => {
    const partSpecs = [
      "frontend:typescript:next",
      "backend:java:spring-boot",
      "backend.language:java:kotlin",
      "backend.orm:java:jooq",
      "backend.api:java:grpc",
    ].join(",");
    await gotoAppPage(page, `/new?mode=multi&part=${encodeURIComponent(partSpecs)}`);

    const command = commandOutput(page);
    await expect(command).toContainText("--part backend.language:java:kotlin");
    await expect(command).not.toContainText("--part backend.orm:java:jooq");
    await expect(command).not.toContainText("--part backend.api:java:grpc");
  });

  test("disabled options do not mutate the command output", async ({ page }) => {
    await clickVisibleTestId(page, "category-toggle-cms");
    const command = commandOutput(page);
    const initialCommand = await command.textContent();

    const payloadOption = visibleTestId(page, "option-cms-payload");
    await expect(payloadOption).toContainText("Unavailable");
    await payloadOption.click({ force: true });

    await expect(command).toHaveText(initialCommand ?? "");
  });
});
