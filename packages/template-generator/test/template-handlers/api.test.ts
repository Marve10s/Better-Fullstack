import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processApiTemplates } from "../../src/template-handlers/api";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

describe("processApiTemplates", () => {
  it("returns early when api is none or backend is convex", async () => {
    const templates = makeTemplates({
      "api/trpc/server/index.ts.hbs": "server",
      "api/trpc/web/react/base/client.ts.hbs": "client",
    });

    const noneVfs = new VirtualFileSystem();
    await processApiTemplates(noneVfs, templates, makeConfig({ api: "none" }));
    expect(noneVfs.getFileCount()).toBe(0);

    const convexVfs = new VirtualFileSystem();
    await processApiTemplates(
      convexVfs,
      templates,
      makeConfig({
        api: "trpc",
        backend: "convex",
      }),
    );
    expect(convexVfs.getFileCount()).toBe(0);
  });

  it("routes React API templates and self-backend fullstack templates", async () => {
    const templates = makeTemplates({
      "api/trpc/server/router.ts.hbs": "server",
      "api/trpc/web/react/base/client.ts.hbs": "base",
      "api/trpc/fullstack/tanstack-start/route.ts.hbs": "fullstack",
    });
    const vfs = new VirtualFileSystem();

    await processApiTemplates(
      vfs,
      templates,
      makeConfig({
        api: "trpc",
        backend: "self",
        frontend: ["tanstack-start"],
      }),
    );

    expect(vfs.fileExists("packages/api/router.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/client.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/route.ts")).toBe(true);
  });

  it("routes Astro API templates according to the integration mode", async () => {
    const reactTemplates = makeTemplates({
      "api/orpc/server/router.ts.hbs": "server",
      "api/orpc/web/react/base/client.ts.hbs": "react-base",
      "api/orpc/fullstack/astro/route.ts.hbs": "fullstack",
    });
    const reactVfs = new VirtualFileSystem();

    await processApiTemplates(
      reactVfs,
      reactTemplates,
      makeConfig({
        api: "orpc",
        backend: "self",
        frontend: ["astro"],
        astroIntegration: "react",
      }),
    );

    expect(reactVfs.fileExists("packages/api/router.ts")).toBe(true);
    expect(reactVfs.fileExists("apps/web/client.ts")).toBe(true);
    expect(reactVfs.fileExists("apps/web/route.ts")).toBe(true);

    const astroTemplates = makeTemplates({
      "api/graphql-yoga/server/schema.ts.hbs": "server",
      "api/graphql-yoga/web/astro/client.ts.hbs": "astro",
      "api/graphql-yoga/fullstack/astro/route.ts.hbs": "fullstack",
    });
    const astroVfs = new VirtualFileSystem();

    await processApiTemplates(
      astroVfs,
      astroTemplates,
      makeConfig({
        api: "graphql-yoga",
        backend: "self",
        frontend: ["astro"],
        astroIntegration: "solid",
      }),
    );

    expect(astroVfs.fileExists("packages/api/schema.ts")).toBe(true);
    expect(astroVfs.fileExists("apps/web/client.ts")).toBe(true);
    expect(astroVfs.fileExists("apps/web/route.ts")).toBe(true);
  });

  it("routes non-React oRPC templates for Nuxt, Svelte, Solid, and Solid Start", async () => {
    const nuxtTemplates = makeTemplates({
      "api/orpc/server/router.ts.hbs": "server",
      "api/orpc/web/nuxt/client.ts.hbs": "nuxt",
      "api/orpc/fullstack/nuxt/server.ts.hbs": "fullstack",
    });
    const nuxtVfs = new VirtualFileSystem();

    await processApiTemplates(
      nuxtVfs,
      nuxtTemplates,
      makeConfig({
        api: "orpc",
        backend: "self",
        frontend: ["nuxt"],
      }),
    );

    expect(nuxtVfs.fileExists("apps/web/client.ts")).toBe(true);
    expect(nuxtVfs.fileExists("apps/web/server.ts")).toBe(true);

    const svelteTemplates = makeTemplates({
      "api/orpc/server/router.ts.hbs": "server",
      "api/orpc/web/svelte/client.ts.hbs": "svelte",
      "api/orpc/fullstack/svelte/page.server.ts.hbs": "fullstack",
    });
    const svelteVfs = new VirtualFileSystem();

    await processApiTemplates(
      svelteVfs,
      svelteTemplates,
      makeConfig({
        api: "orpc",
        backend: "self",
        frontend: ["svelte"],
      }),
    );

    expect(svelteVfs.fileExists("apps/web/client.ts")).toBe(true);
    expect(svelteVfs.fileExists("apps/web/page.server.ts")).toBe(true);

    const solidTemplates = makeTemplates({
      "api/orpc/server/router.ts.hbs": "server",
      "api/orpc/web/solid/client.ts.hbs": "solid",
    });
    const solidVfs = new VirtualFileSystem();

    await processApiTemplates(
      solidVfs,
      solidTemplates,
      makeConfig({
        api: "orpc",
        frontend: ["solid"],
      }),
    );

    expect(solidVfs.fileExists("apps/web/client.ts")).toBe(true);

    const solidStartTemplates = makeTemplates({
      "api/orpc/server/router.ts.hbs": "server",
      "api/orpc/web/solid-start/client.ts.hbs": "solid-start",
      "api/orpc/fullstack/solid-start/route.ts.hbs": "fullstack",
    });
    const solidStartVfs = new VirtualFileSystem();

    await processApiTemplates(
      solidStartVfs,
      solidStartTemplates,
      makeConfig({
        api: "orpc",
        backend: "self",
        frontend: ["solid-start"],
      }),
    );

    expect(solidStartVfs.fileExists("apps/web/client.ts")).toBe(true);
    expect(solidStartVfs.fileExists("apps/web/route.ts")).toBe(true);
  });
});
