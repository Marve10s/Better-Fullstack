import { createStackSelectionSearchParams as createStackSearchParams } from "@better-fullstack/types/stack-translation";
import { test, expect } from "@playwright/test";
import { commandOutput, gotoAppPage } from "@test/e2e/test-helpers";

import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";

test.describe("URL Sharing", () => {
  test("navigating with search params restores stack", async ({ page }) => {
    const params = createStackSearchParams({
      ...DEFAULT_STACK,
      webFrontend: ["next"],
    });

    await gotoAppPage(page, `/new?${params.toString()}`);
    await expect(commandOutput(page)).toContainText("--frontend next");
  });
});
