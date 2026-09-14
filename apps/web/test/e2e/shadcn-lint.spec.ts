import { expect, test } from "@playwright/test";
import { unzipSync } from "fflate";
import { readFile } from "node:fs/promises";

import { clickVisibleTestId, commandOutput, gotoAppPage, visibleTestId } from "./test-helpers";

for (const mode of ["solo", "multi"] as const) {
  test(`${mode} builder pairs design lint with one base and downloads its configuration`, async ({
    page,
  }) => {
    const parts = [
      "frontend:typescript:react-vite",
      "frontend.css:typescript:tailwind",
      "backend:go:gin",
    ];
    const search =
      mode === "multi"
        ? `mode=multi&part=${encodeURIComponent(parts.join(","))}`
        : "mode=solo&fe-w=react-vite&cq=none";
    await gotoAppPage(page, `/new?${search}`);
    if (mode === "multi") await clickVisibleTestId(page, "multi-step-project");
    await clickVisibleTestId(page, "section-toggle-qualityTesting");

    const supplemental = visibleTestId(page, "option-codeQualityProfile-shadcn-lint");
    await expect(supplemental).toHaveAttribute("title", /ESLint \+ Prettier or Oxlint \+ Oxfmt/);
    await clickVisibleTestId(page, "option-codeQualityProfile-oxlint");
    await expect(supplemental).not.toHaveAttribute("title");
    await supplemental.click();
    await expect(commandOutput(page)).toContainText("codeQuality:universal:shadcn-lint");
    await expect(commandOutput(page)).toContainText("codeQuality:universal:oxlint");

    await clickVisibleTestId(page, "option-codeQualityProfile-eslint-prettier");
    await expect(commandOutput(page)).toContainText("codeQuality:universal:eslint");
    await expect(commandOutput(page)).toContainText("codeQuality:universal:shadcn-lint");
    await expect(commandOutput(page)).not.toContainText("codeQuality:universal:oxlint");
    await page.reload();
    await expect(page.locator("html[data-hydrated]")).toBeAttached({ timeout: 30_000 });
    await expect(commandOutput(page)).toContainText("codeQuality:universal:shadcn-lint");
    if (mode === "multi") {
      await expect(commandOutput(page)).toContainText("backend:go:gin");
      await clickVisibleTestId(page, "multi-step-review");
    }

    const downloadPromise = page.waitForEvent("download");
    await clickVisibleTestId(page, "download-project-zip");
    const download = await downloadPromise;
    const zipPath = await download.path();
    if (!zipPath) throw new Error("Project download did not produce an archive");
    const archive = unzipSync(await readFile(zipPath));
    const lintConfig = Object.entries(archive).find(([path]) =>
      path.endsWith("/eslint.config.mjs"),
    );
    expect(lintConfig).toBeDefined();
    expect(new TextDecoder().decode(lintConfig?.[1])).toContain("shadcn/no-restyle");
    expect(Object.keys(archive).some((path) => path.endsWith("/DESIGN.md"))).toBe(true);
    if (mode === "multi")
      expect(Object.keys(archive).some((path) => path.endsWith("/go.mod"))).toBe(true);
  });
}
