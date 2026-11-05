import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import type { VirtualNode } from "@/types";

import { generateVirtualProject } from "@/generator";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";

function findFileContent(node: VirtualNode, path: string): string | undefined {
  if (node.type === "file") return node.path === path ? node.content : undefined;
  for (const child of node.children) {
    const found = findFileContent(child, path);
    if (found !== undefined) return found;
  }
  return undefined;
}

describe("biome addon config", () => {
  it("renders a biome.json that only uses rule names supported by the pinned biome release", async () => {
    const result = await generateVirtualProject({
      config: makeConfig({ addons: ["turborepo", "biome"], uiLibrary: "shadcn-ui" }),
      templates: EMBEDDED_TEMPLATES,
    });

    expect(result.tree).toBeDefined();
    const content = findFileContent(result.tree!.root, "biome.json");
    expect(content).toBeDefined();

    // Biome 2.6 removed nursery/useSortedClasses in favor of
    // nursery/useTailwindSortedClasses (which takes no options).
    expect(content).not.toContain('"useSortedClasses"');

    const parsed = JSON.parse(content!) as {
      linter?: { rules?: { nursery?: Record<string, unknown> } };
    };
    expect(parsed.linter?.rules?.nursery?.useTailwindSortedClasses).toMatchObject({
      level: "warn",
      fix: "safe",
    });
  });
});
