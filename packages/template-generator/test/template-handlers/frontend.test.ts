import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processFrontendTemplates } from "../../src/template-handlers/frontend";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

describe("processFrontendTemplates", () => {
  it("routes React web base and framework-specific templates", async () => {
    const templates = makeTemplates({
      "frontend/react/web-base/src/index.css.hbs": "base",
      "frontend/react/next/src/app/page.tsx.hbs": "framework",
    });
    const vfs = new VirtualFileSystem();

    await processFrontendTemplates(
      vfs,
      templates,
      makeConfig({
        frontend: ["next"],
      }),
    );

    expect(vfs.fileExists("apps/web/src/index.css")).toBe(true);
    expect(vfs.fileExists("apps/web/src/app/page.tsx")).toBe(true);
  });

  it("routes React web base and framework-specific templates for vinext", async () => {
    const templates = makeTemplates({
      "frontend/react/web-base/src/index.css.hbs": "base",
      "frontend/react/vinext/src/app/page.tsx.hbs": "framework",
    });
    const vfs = new VirtualFileSystem();

    await processFrontendTemplates(
      vfs,
      templates,
      makeConfig({
        frontend: ["vinext"],
      }),
    );

    expect(vfs.fileExists("apps/web/src/index.css")).toBe(true);
    expect(vfs.fileExists("apps/web/src/app/page.tsx")).toBe(true);
  });

  it("routes Astro templates while excluding unrelated integrations", async () => {
    const templates = makeTemplates({
      "frontend/astro/src/layouts/Layout.astro.hbs": "layout",
      "frontend/astro/integrations/react/src/lib/utils.ts.hbs": "react",
      "frontend/astro/integrations/vue/src/lib/utils.ts.hbs": "vue",
    });
    const vfs = new VirtualFileSystem();

    await processFrontendTemplates(
      vfs,
      templates,
      makeConfig({
        frontend: ["astro"],
        astroIntegration: "react",
      }),
    );

    expect(vfs.fileExists("apps/web/src/layouts/Layout.astro")).toBe(true);
    expect(vfs.fileExists("apps/web/src/lib/utils.ts")).toBe(true);
    expect(vfs.readFile("apps/web/src/lib/utils.ts")).toBe("react");
  });

  it("routes Redwood templates to the repository root", async () => {
    const templates = makeTemplates({
      "frontend/redwood/web/src/App.tsx.hbs": "web",
      "frontend/redwood/api/src/functions/graphql.ts.hbs": "api",
    });
    const vfs = new VirtualFileSystem();

    await processFrontendTemplates(
      vfs,
      templates,
      makeConfig({
        frontend: ["redwood"],
        backend: "none",
      }),
    );

    expect(vfs.fileExists("web/src/App.tsx")).toBe(true);
    expect(vfs.fileExists("api/src/functions/graphql.ts")).toBe(true);
  });

  it("routes native base, variant, and API client templates when backend is not convex", async () => {
    const templates = makeTemplates({
      "frontend/native/base/app.json.hbs": "base",
      "frontend/native/uniwind/app/index.tsx.hbs": "variant",
      "api/orpc/native/client.ts.hbs": "api-client",
    });
    const vfs = new VirtualFileSystem();

    await processFrontendTemplates(
      vfs,
      templates,
      makeConfig({
        frontend: ["native-uniwind"],
        api: "orpc",
        backend: "hono",
      }),
    );

    expect(vfs.fileExists("apps/native/app.json")).toBe(true);
    expect(vfs.fileExists("apps/native/app/index.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/client.ts")).toBe(true);
  });

  it("skips native API client templates when backend is convex", async () => {
    const templates = makeTemplates({
      "frontend/native/base/app.json.hbs": "base",
      "frontend/native/bare/app/index.tsx.hbs": "variant",
      "api/trpc/native/client.ts.hbs": "api-client",
    });
    const vfs = new VirtualFileSystem();

    await processFrontendTemplates(
      vfs,
      templates,
      makeConfig({
        frontend: ["native-bare"],
        api: "trpc",
        backend: "convex",
      }),
    );

    expect(vfs.fileExists("apps/native/app.json")).toBe(true);
    expect(vfs.fileExists("apps/native/app/index.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/client.ts")).toBe(false);
  });
});
