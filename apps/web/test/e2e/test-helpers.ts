import { expect, type Locator, type Page } from "@playwright/test";

export const visibleTestId = (page: Page, testId: string): Locator =>
  page.locator(`[data-testid="${testId}"]:visible`).last();

export const commandOutput = (page: Page): Locator => visibleTestId(page, "command-output");

export async function openBuilder(page: Page) {
  await page.goto("/new");
  await expect(commandOutput(page)).toContainText("bun create better-fullstack");
}

export async function clickVisibleTestId(page: Page, testId: string) {
  const locator = visibleTestId(page, testId);
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();
  await locator.click();
}
