import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { ProjectConfig } from "@better-fullstack/types";

import type { DevServerHandle } from "./dev-check";
import { HTML_ERROR_PATTERNS } from "./dev-check";
import type { StepResult } from "./verify";

const ROUTE_CHECK_TIMEOUT_MS = 30_000;

const FRAMEWORK_ROUTES: Record<string, string[]> = {
  next: ["/"],
  "tanstack-start": ["/"],
  "tanstack-router": ["/"],
  "react-router": ["/"],
  "react-vite": ["/"],
  svelte: ["/"],
  nuxt: ["/"],
  astro: ["/"],
  "solid-start": ["/"],
  solid: ["/"],
  angular: ["/"],
  qwik: ["/"],
  redwood: ["/"],
  fresh: ["/"],
};

function getRoutesForConfig(config: ProjectConfig): string[] {
  const frontend = Array.isArray(config.frontend)
    ? config.frontend.find((f: string) => f !== "none") ?? "none"
    : config.frontend;

  return FRAMEWORK_ROUTES[frontend] ?? ["/"];
}

/**
 * Use Playwright to visit routes on a running dev server and check for errors.
 * Requires `playwright` to be installed.
 */
export async function runRouteCheck(
  handle: DevServerHandle,
  outputDir?: string,
): Promise<StepResult> {
  const start = Date.now();
  const routes = getRoutesForConfig(handle.config);
  const errors: string[] = [];

  // biome-ignore lint: Playwright is an optional peer dep, dynamically imported
  let chromium: any;
  try {
    const pw = await import("playwright");
    chromium = pw.chromium;
  } catch {
    return {
      step: "route-check",
      success: true,
      durationMs: Date.now() - start,
      skipped: true,
      stdout: "Playwright not installed — skipping route check",
    };
  }

  let browser: any = null;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors: string[] = [];
    page.on("console", (msg: any) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    for (const route of routes) {
      const url = `${handle.serverUrl}${route}`;
      consoleErrors.length = 0;

      try {
        const response = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: ROUTE_CHECK_TIMEOUT_MS,
        });

        const status = response?.status() ?? 0;
        if (status >= 400) {
          errors.push(`${route}: HTTP ${status}`);
        }

        const content = await page.content();

        for (const pattern of HTML_ERROR_PATTERNS) {
          if (pattern.test(content)) {
            errors.push(`${route}: HTML error pattern "${pattern.source}"`);
          }
        }

        if (consoleErrors.length > 0) {
          const unique = [...new Set(consoleErrors)];
          for (const err of unique.slice(0, 5)) {
            errors.push(`${route}: console.error: ${err.slice(0, 200)}`);
          }
        }

        // Screenshot on failure
        if (errors.length > 0 && outputDir) {
          const screenshotDir = join(outputDir, "screenshots");
          await mkdir(screenshotDir, { recursive: true });
          const filename = `${handle.config.projectName}-${route.replace(/\//g, "_") || "root"}.png`;
          await page.screenshot({ path: join(screenshotDir, filename), fullPage: true });
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        errors.push(`${route}: Navigation failed: ${msg.slice(0, 300)}`);
      }
    }

    await context.close();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return {
      step: "route-check",
      success: false,
      durationMs: Date.now() - start,
      stderr: `Playwright error: ${msg}`,
      classification: "unknown",
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  if (errors.length > 0) {
    return {
      step: "route-check",
      success: false,
      durationMs: Date.now() - start,
      stderr: errors.join("\n"),
      classification: "template",
    };
  }

  return {
    step: "route-check",
    success: true,
    durationMs: Date.now() - start,
    stdout: `All ${routes.length} route(s) passed Playwright check`,
  };
}
