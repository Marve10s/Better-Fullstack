import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import type { VirtualNode } from "@/types";

import { generateVirtualProject } from "@/generator";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";

function files(node: VirtualNode): Record<string, string> {
  if (node.type === "file") return { [node.path]: node.content };
  return Object.assign({}, ...node.children.map(files));
}

describe("job queues on full-stack frameworks", () => {
  it.each(["next", "tanstack-start", "nuxt", "svelte", "solid-start", "astro"] as const)(
    "puts pg-boss code, dependency, and worker scripts in the %s app",
    async (frontend) => {
      const result = await generateVirtualProject({
        config: makeConfig({
          frontend: [frontend],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "drizzle",
          jobQueue: "pg-boss",
          packageManager: "pnpm",
        }),
        templates: EMBEDDED_TEMPLATES,
      });
      if (!result.tree) throw new Error(result.error);
      const output = files(result.tree.root);
      const webPackage = JSON.parse(output["apps/web/package.json"] ?? "{}");

      expect(Object.keys(output)).toEqual(
        expect.arrayContaining([
          "apps/web/src/jobs/queue.ts",
          "apps/web/src/jobs/worker.ts",
          "apps/web/src/jobs/enqueue.ts",
        ]),
      );
      expect(webPackage.dependencies["pg-boss"]).toBeDefined();
      expect(webPackage.dependencies.tsx).toBeDefined();
      expect(webPackage.scripts["jobs:worker"]).toBe("tsx src/jobs/worker.ts");
      expect(webPackage.engines.node).toBe(">=22.12.0");
      expect(output["README.md"]).toContain("cd apps/web && pnpm run jobs:worker");
      expect(output["README.md"]).not.toContain("apps/server");
    },
  );

  it.each([
    ["next", "trpc", "apps/web/src/app/api/jobs/welcome-email/route.ts"],
    ["vinext", "trpc", "apps/web/src/app/api/jobs/welcome-email/route.ts"],
    ["tanstack-start", "trpc", "apps/web/src/routes/api/jobs/welcome-email.ts"],
    ["tanstack-start-solid", "orpc", "apps/web/src/routes/api/jobs/welcome-email.ts"],
    ["nuxt", "orpc", "apps/web/server/api/jobs/welcome-email.post.ts"],
    ["svelte", "orpc", "apps/web/src/routes/api/jobs/welcome-email/+server.ts"],
    ["solid-start", "orpc", "apps/web/src/routes/api/jobs/welcome-email.ts"],
    ["astro", "trpc", "apps/web/src/pages/api/jobs/welcome-email.ts"],
  ] as const)("adds the QStash webhook route to the %s app", async (frontend, api, routePath) => {
    const result = await generateVirtualProject({
      config: makeConfig({
        frontend: [frontend],
        backend: "self",
        runtime: "none",
        api,
        database: "postgres",
        orm: "drizzle",
        jobQueue: "upstash-qstash",
      }),
      templates: EMBEDDED_TEMPLATES,
    });
    if (!result.tree) throw new Error(result.error);
    const output = files(result.tree.root);

    expect(output[routePath]).toContain("handleWelcomeEmailJob");
    expect(output["apps/web/src/jobs/qstash.ts"]).toBeDefined();
  });
});
