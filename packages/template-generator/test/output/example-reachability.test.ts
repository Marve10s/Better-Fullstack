import {
  DEFAULT_STACK_SELECTION,
  getCategoryOptionIds,
  getDisabledReason,
  type ProjectConfig,
} from "@better-fullstack/types";
import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import type { VirtualNode } from "@/types";

import { generateVirtualProject } from "@/generator";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";

const SELF_BACKENDS: Partial<Record<string, string>> = {
  next: "self-next",
  vinext: "self-vinext",
  "tanstack-start": "self-tanstack-start",
  nuxt: "self-nuxt",
  svelte: "self-svelte",
  "solid-start": "self-solid-start",
  astro: "self-astro",
};
const ORPC_FRONTENDS = new Set(["svelte", "nuxt", "solid", "solid-start", "tanstack-start-solid"]);

const SELECTION_RECORD_FILES = /(^|\/)(bts\.jsonc|README\.md|AGENTS\.md|CLAUDE\.md|\.env[^/]*)$/;

function projectFiles(node: VirtualNode): [string, string][] {
  if (node.type === "file") {
    return SELECTION_RECORD_FILES.test(node.path) ? [] : [[node.path, node.content]];
  }
  return node.children.flatMap(projectFiles);
}

async function generatedFiles(config: ProjectConfig): Promise<Map<string, string>> {
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!result.tree) throw new Error(result.error);
  return new Map(projectFiles(result.tree.root));
}

const cases = ["ai", "tanstack-showcase"].flatMap((example) =>
  getCategoryOptionIds("webFrontend")
    .filter((frontend) => frontend !== "none")
    .flatMap((frontend) =>
      [["hono", "hono"] as const, ["self", SELF_BACKENDS[frontend]] as const].flatMap(
        ([backend, selectionBackend]) => {
          if (!selectionBackend) return [];
          const api = ORPC_FRONTENDS.has(frontend) ? "orpc" : "trpc";
          const runtime = backend === "self" ? "none" : "bun";
          const reason = getDisabledReason(
            {
              ...DEFAULT_STACK_SELECTION,
              webFrontend: [frontend],
              backend: selectionBackend,
              runtime,
              api,
              aiSdk: "vercel-ai",
            },
            "examples",
            example,
          );
          return reason ? [] : [{ example, frontend, backend, runtime, api }];
        },
      ),
    ),
);

describe("example reachability", () => {
  it.each(cases.map((entry) => [entry.example, entry.frontend, entry.backend, entry] as const))(
    "%s on %s with %s changes the generated project when the rules allow it",
    async (_example, _frontend, _backend, entry) => {
      const base = {
        frontend: [entry.frontend],
        backend: entry.backend,
        runtime: entry.runtime,
        api: entry.api,
        database: "sqlite",
        orm: "drizzle",
        ai: "vercel-ai",
      } as Partial<ProjectConfig>;
      const without = await generatedFiles(makeConfig({ ...base, examples: [] }));
      const withExample = await generatedFiles(
        makeConfig({ ...base, examples: [entry.example] as ProjectConfig["examples"] }),
      );

      expect([...withExample].some(([path, content]) => without.get(path) !== content)).toBe(true);
    },
  );
});
