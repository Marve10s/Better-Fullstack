import { test, expect } from "@playwright/test";

import { DEFAULT_STACK } from "../../src/lib/stack-defaults";
import { createStackSearchParams } from "../../src/lib/stack-url-state.shared";
import { commandOutput } from "./test-helpers";

test.describe("URL Sharing", () => {
  test("navigating with search params restores stack", async ({ page }) => {
    const params = createStackSearchParams({
      ...DEFAULT_STACK,
      webFrontend: ["next"],
    });

    await page.goto(`/new?${params.toString()}`);
    await expect(commandOutput(page)).toContainText("--frontend next");
  });
});
