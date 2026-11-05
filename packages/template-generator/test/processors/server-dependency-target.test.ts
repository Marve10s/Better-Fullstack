import type { ProjectConfig } from "@better-fullstack/types";

import { makeConfig } from "@test/_fixtures/config-factory";
import { createSeededVFS, getDeps } from "@test/_fixtures/vfs-factory";
import { describe, expect, it } from "bun:test";

import { processEmailDeps } from "@/processors/dependencies/email-deps";
import { processLoggingDeps } from "@/processors/dependencies/logging-deps";
import { processObservabilityDeps } from "@/processors/dependencies/observability-deps";

const cases = [
  {
    name: "self backend prefers web when both manifests exist",
    config: { backend: "self", frontend: ["next"] },
    paths: ["apps/web/package.json", "apps/server/package.json"],
    target: "apps/web/package.json",
  },
  {
    name: "self backend falls back to an existing server manifest",
    config: { backend: "self", frontend: ["next"] },
    paths: ["apps/server/package.json"],
    target: "apps/server/package.json",
  },
  {
    name: "standalone backend prefers server over a fullstack frontend",
    config: { backend: "hono", frontend: ["qwik"] },
    paths: ["apps/web/package.json", "apps/server/package.json"],
    target: "apps/server/package.json",
  },
  {
    name: "fullstack frontend receives dependencies when the server manifest is missing",
    config: { backend: "hono", frontend: ["qwik"] },
    paths: ["apps/web/package.json"],
    target: "apps/web/package.json",
  },
  ...(["fresh", "qwik", "angular"] as const).map((frontend) => ({
    name: `${frontend} receives server dependencies without a standalone backend`,
    config: { backend: "none" as const, frontend: [frontend] },
    paths: ["apps/web/package.json", "apps/server/package.json"],
    target: "apps/web/package.json",
  })),
  {
    name: "Redwood uses its web manifest",
    config: { backend: "none", frontend: ["redwood"] },
    paths: ["web/package.json", "api/package.json", "apps/web/package.json"],
    target: "web/package.json",
  },
  {
    name: "Convex skips dependencies even with a fullstack frontend and both manifests",
    config: { backend: "convex", frontend: ["qwik"] },
    paths: ["apps/web/package.json", "apps/server/package.json"],
    target: null,
  },
  {
    name: "a frontend without a server does not receive server dependencies",
    config: { backend: "none", frontend: ["react-vite"] },
    paths: ["apps/web/package.json", "apps/server/package.json"],
    target: null,
  },
  {
    name: "a missing standalone server does not route dependencies to a client frontend",
    config: { backend: "hono", frontend: ["react-vite"] },
    paths: ["apps/web/package.json"],
    target: null,
  },
  {
    name: "a missing fullstack web manifest does not select an unused server manifest",
    config: { backend: "none", frontend: ["qwik"] },
    paths: ["apps/server/package.json"],
    target: null,
  },
] satisfies {
  name: string;
  config: Pick<ProjectConfig, "backend" | "frontend">;
  paths: string[];
  target: string | null;
}[];

describe("server dependency destinations", () => {
  it.each(cases)("$name", ({ config, paths, target }) => {
    const vfs = createSeededVFS(paths);
    const selection = makeConfig({
      ...config,
      email: "nodemailer",
      logging: "evlog",
      observability: "axiom",
    });

    processEmailDeps(vfs, selection);
    processLoggingDeps(vfs, selection);
    processObservabilityDeps(vfs, selection);

    for (const packagePath of paths) {
      expect(getDeps(vfs, packagePath)).toEqual(
        packagePath === target
          ? {
              deps: ["@axiomhq/js", "evlog", "nodemailer"],
              devDeps: ["@types/nodemailer"],
            }
          : { deps: [], devDeps: [] },
      );
    }
  });
});
