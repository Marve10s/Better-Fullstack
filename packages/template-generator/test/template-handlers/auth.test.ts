import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processAuthTemplates } from "../../src/template-handlers/auth";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

describe("processAuthTemplates", () => {
  it("routes convex Clerk templates for backend, web, and native", async () => {
    const templates = makeTemplates({
      "auth/clerk/convex/backend/auth.ts.hbs": "backend",
      "auth/clerk/convex/web/react/next/page.tsx.hbs": "web",
      "auth/clerk/convex/native/base/provider.tsx.hbs": "base",
      "auth/clerk/convex/native/bare/app.tsx.hbs": "native",
    });
    const vfs = new VirtualFileSystem();

    await processAuthTemplates(
      vfs,
      templates,
      makeConfig({
        backend: "convex",
        auth: "clerk",
        frontend: ["next", "native-bare"],
      }),
    );

    expect(vfs.fileExists("packages/backend/auth.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/page.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/provider.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/app.tsx")).toBe(true);
  });

  it("maps react-vite Better Auth templates onto the react-router variant", async () => {
    const templates = makeTemplates({
      "auth/better-auth/server/base/server.ts.hbs": "server",
      "auth/better-auth/web/react/base/lib.ts.hbs": "base",
      "auth/better-auth/web/react/react-router/page.tsx.hbs": "router",
    });
    const vfs = new VirtualFileSystem();

    await processAuthTemplates(
      vfs,
      templates,
      makeConfig({
        auth: "better-auth",
        frontend: ["react-vite"],
      }),
    );

    expect(vfs.fileExists("packages/auth/server.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/lib.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/page.tsx")).toBe(true);
  });

  it("routes NextAuth fullstack, web, and db templates for Next.js", async () => {
    const templates = makeTemplates({
      "auth/nextauth/fullstack/next/route.ts.hbs": "fullstack",
      "auth/nextauth/web/react/next/login.tsx.hbs": "web",
      "auth/nextauth/server/db/prisma/postgres/schema.prisma.hbs": "db",
    });
    const vfs = new VirtualFileSystem();

    await processAuthTemplates(
      vfs,
      templates,
      makeConfig({
        auth: "nextauth",
        backend: "self",
        frontend: ["next"],
        orm: "prisma",
        database: "postgres",
      }),
    );

    expect(vfs.fileExists("apps/web/route.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/login.tsx")).toBe(true);
    expect(vfs.fileExists("packages/db/schema.prisma")).toBe(true);
  });

  it("routes Stack Auth, Supabase Auth, and Auth0 special-case Next.js templates", async () => {
    const stackTemplates = makeTemplates({
      "auth/stack-auth/fullstack/next/handler.ts.hbs": "fullstack",
      "auth/stack-auth/web/react/next/page.tsx.hbs": "web",
    });
    const supabaseTemplates = makeTemplates({
      "auth/supabase-auth/fullstack/next/middleware.ts.hbs": "fullstack",
      "auth/supabase-auth/web/react/next/login.tsx.hbs": "web",
    });
    const auth0Templates = makeTemplates({
      "auth/auth0/fullstack/next/api.ts.hbs": "fullstack",
      "auth/auth0/web/react/next/button.tsx.hbs": "web",
    });
    const stackVfs = new VirtualFileSystem();
    const supabaseVfs = new VirtualFileSystem();
    const auth0Vfs = new VirtualFileSystem();

    await processAuthTemplates(
      stackVfs,
      stackTemplates,
      makeConfig({
        auth: "stack-auth",
        backend: "self",
        frontend: ["next"],
      }),
    );
    await processAuthTemplates(
      supabaseVfs,
      supabaseTemplates,
      makeConfig({
        auth: "supabase-auth",
        backend: "self",
        frontend: ["next"],
      }),
    );
    await processAuthTemplates(
      auth0Vfs,
      auth0Templates,
      makeConfig({
        auth: "auth0",
        backend: "self",
        frontend: ["next"],
      }),
    );

    expect(stackVfs.fileExists("apps/web/handler.ts")).toBe(true);
    expect(stackVfs.fileExists("apps/web/page.tsx")).toBe(true);
    expect(supabaseVfs.fileExists("apps/web/middleware.ts")).toBe(true);
    expect(supabaseVfs.fileExists("apps/web/login.tsx")).toBe(true);
    expect(auth0Vfs.fileExists("apps/web/api.ts")).toBe(true);
    expect(auth0Vfs.fileExists("apps/web/button.tsx")).toBe(true);
  });

  it("routes standard Clerk templates for server, React fullstack, db, and native variants", async () => {
    const templates = makeTemplates({
      "auth/clerk/server/base/server.ts.hbs": "server",
      "auth/clerk/server/db/drizzle/sqlite/schema.ts.hbs": "db",
      "auth/clerk/web/react/base/provider.tsx.hbs": "base",
      "auth/clerk/web/react/tanstack-start/page.tsx.hbs": "web",
      "auth/clerk/fullstack/tanstack-start/middleware.ts.hbs": "fullstack",
      "auth/clerk/native/base/session.tsx.hbs": "native-base",
      "auth/clerk/native/unistyles/app.tsx.hbs": "native",
    });
    const vfs = new VirtualFileSystem();

    await processAuthTemplates(
      vfs,
      templates,
      makeConfig({
        auth: "clerk",
        backend: "self",
        frontend: ["tanstack-start", "native-unistyles"],
        orm: "drizzle",
        database: "sqlite",
      }),
    );

    expect(vfs.fileExists("packages/auth/server.ts")).toBe(true);
    expect(vfs.fileExists("packages/db/schema.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/provider.tsx")).toBe(true);
    expect(vfs.fileExists("apps/web/page.tsx")).toBe(true);
    expect(vfs.fileExists("apps/web/middleware.ts")).toBe(true);
    expect(vfs.fileExists("apps/native/session.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/app.tsx")).toBe(true);
  });

  it("routes Better Auth templates for svelte, solid-start, and nuxt variants", async () => {
    const svelteTemplates = makeTemplates({
      "auth/better-auth/server/base/server.ts.hbs": "server",
      "auth/better-auth/server/db/prisma/sqlite/schema.prisma.hbs": "db",
      "auth/better-auth/web/svelte/hooks.server.ts.hbs": "web",
      "auth/better-auth/fullstack/svelte/page.server.ts.hbs": "fullstack",
    });
    const solidStartTemplates = makeTemplates({
      "auth/better-auth/server/base/auth.ts.hbs": "server",
      "auth/better-auth/web/solid-start/route.tsx.hbs": "web",
      "auth/better-auth/fullstack/solid-start/server.ts.hbs": "fullstack",
    });
    const nuxtTemplates = makeTemplates({
      "auth/better-auth/server/base/server.ts.hbs": "server",
      "auth/better-auth/web/nuxt/plugin.ts.hbs": "web",
    });
    const svelteVfs = new VirtualFileSystem();
    const solidStartVfs = new VirtualFileSystem();
    const nuxtVfs = new VirtualFileSystem();

    await processAuthTemplates(
      svelteVfs,
      svelteTemplates,
      makeConfig({
        auth: "better-auth",
        backend: "self",
        frontend: ["svelte"],
        orm: "prisma",
        database: "sqlite",
      }),
    );
    await processAuthTemplates(
      solidStartVfs,
      solidStartTemplates,
      makeConfig({
        auth: "better-auth",
        backend: "self",
        frontend: ["solid-start"],
      }),
    );
    await processAuthTemplates(
      nuxtVfs,
      nuxtTemplates,
      makeConfig({
        auth: "better-auth",
        backend: "hono",
        frontend: ["nuxt"],
      }),
    );

    expect(svelteVfs.fileExists("packages/auth/server.ts")).toBe(true);
    expect(svelteVfs.fileExists("packages/db/schema.prisma")).toBe(true);
    expect(svelteVfs.fileExists("apps/web/hooks.server.ts")).toBe(true);
    expect(svelteVfs.fileExists("apps/web/page.server.ts")).toBe(true);

    expect(solidStartVfs.fileExists("packages/auth/auth.ts")).toBe(true);
    expect(solidStartVfs.fileExists("apps/web/route.tsx")).toBe(true);
    expect(solidStartVfs.fileExists("apps/web/server.ts")).toBe(true);

    expect(nuxtVfs.fileExists("packages/auth/server.ts")).toBe(true);
    expect(nuxtVfs.fileExists("apps/web/plugin.ts")).toBe(true);
  });

  it("routes convex Better Auth templates for Next.js and native uniwind projects", async () => {
    const templates = makeTemplates({
      "auth/better-auth/convex/backend/auth.ts.hbs": "backend",
      "auth/better-auth/convex/web/react/base/provider.tsx.hbs": "base",
      "auth/better-auth/convex/web/react/next/page.tsx.hbs": "web",
      "auth/better-auth/convex/native/base/session.tsx.hbs": "native-base",
      "auth/better-auth/convex/native/uniwind/app.tsx.hbs": "native",
    });
    const vfs = new VirtualFileSystem();

    await processAuthTemplates(
      vfs,
      templates,
      makeConfig({
        auth: "better-auth",
        backend: "convex",
        frontend: ["next", "native-uniwind"],
      }),
    );

    expect(vfs.fileExists("packages/backend/auth.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/provider.tsx")).toBe(true);
    expect(vfs.fileExists("apps/web/page.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/session.tsx")).toBe(true);
    expect(vfs.fileExists("apps/native/app.tsx")).toBe(true);
  });
});
