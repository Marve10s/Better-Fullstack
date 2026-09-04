import { defineConfig } from "@playwright/test";

import base from "./playwright.config";

// Use an already running production preview; never start a development server.
export default defineConfig({
  ...base,
  webServer: undefined,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  maxFailures: 1,
  reporter: "list",
  use: { ...base.use, baseURL: "http://localhost:3333", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    ...[
      { name: "tablet", width: 768, height: 1024 },
      { name: "phone", width: 390, height: 844 },
      { name: "compact-phone", width: 320, height: 740 },
    ].map(({ name, width, height }) => ({
      name,
      testMatch: /composer-flow\.spec\.ts/,
      use: { viewport: { width, height }, isMobile: true, hasTouch: true },
    })),
  ],
});
