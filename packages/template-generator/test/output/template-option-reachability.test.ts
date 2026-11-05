import { OPTION_CATEGORY_METADATA, type ProjectConfig } from "@better-fullstack/types";
import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import type { VirtualNode } from "@/types";

import { generateVirtualProject } from "@/generator";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";

const SERVER_STACKS: Partial<ProjectConfig>[] = [
  { frontend: ["tanstack-router"], backend: "hono", database: "postgres", orm: "drizzle" },
  { frontend: ["tanstack-router"], backend: "express", database: "postgres", orm: "drizzle" },
  { frontend: ["next"], backend: "self", runtime: "none", database: "postgres", orm: "drizzle" },
  { frontend: ["native-bare"], backend: "hono", database: "postgres", orm: "drizzle" },
];

function filePaths(node: VirtualNode): string[] {
  return node.type === "file" ? [node.path] : node.children.flatMap(filePaths);
}

async function generatedPaths(config: ProjectConfig): Promise<Set<string> | undefined> {
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  return result.tree ? new Set(filePaths(result.tree.root)) : undefined;
}

function toConfigKey(templateFamily: string): string {
  return templateFamily.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function singleSelectOptionTemplateDirectories(): [string, string][] {
  const directories = new Set<string>();
  for (const templatePath of EMBEDDED_TEMPLATES.keys()) {
    const [family, option] = templatePath.split("/");
    if (!family || !option) continue;
    const metadata =
      OPTION_CATEGORY_METADATA[toConfigKey(family) as keyof typeof OPTION_CATEGORY_METADATA];
    if (metadata?.selectionMode !== "single") continue;
    if (!metadata.options.some((entry) => entry.id === option)) continue;
    directories.add(`${family}/${option}`);
  }
  return [...directories].sort().map((directory) => directory.split("/") as [string, string]);
}

describe("template option reachability", () => {
  it.each(singleSelectOptionTemplateDirectories())(
    "renders templates/%s/%s for at least one supported stack",
    async (family, option) => {
      const key = toConfigKey(family);
      let rendersNewFiles = false;
      for (const stack of SERVER_STACKS) {
        const withoutOption = await generatedPaths(makeConfig({ ...stack, [key]: "none" }));
        const withOption = await generatedPaths(makeConfig({ ...stack, [key]: option }));
        if (
          withoutOption &&
          withOption &&
          [...withOption].some((path) => !withoutOption.has(path))
        ) {
          rendersNewFiles = true;
          break;
        }
      }
      expect(rendersNewFiles).toBe(true);
    },
  );
});
