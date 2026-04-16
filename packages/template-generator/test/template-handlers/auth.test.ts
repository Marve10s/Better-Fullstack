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
});
