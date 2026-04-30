import { test, expect } from "@playwright/test";

import { DEFAULT_STACK } from "../../src/lib/stack-defaults";
import { createStackSearchParams } from "../../src/lib/stack-url-state.shared";
import { commandOutput, gotoAppPage } from "./test-helpers";

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
