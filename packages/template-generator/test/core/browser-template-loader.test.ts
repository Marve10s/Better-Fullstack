import { cliInputToProjectConfigPartial } from "@better-fullstack/types";
import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "@better-fullstack/types";

import { getRequiredTemplateFamilies, loadTemplatesForConfig } from "@/browser-template-loader";
import { generateVirtualProject } from "@/generator";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";
import type { VirtualNode } from "@/types";

function flattenFiles(node: VirtualNode): [string, string][] {
  if (node.type === "file") return [[node.path, node.content]];
  return node.children.flatMap(flattenFiles);
}

async function generatedFiles(config: ProjectConfig, templates: Map<string, string>) {
  const result = await generateVirtualProject({ config, templates });
  expect(result.success, result.error).toBe(true);
  if (!result.tree) throw new Error(result.error);
  return flattenFiles(result.tree.root).sort(([left], [right]) => left.localeCompare(right));
}

function graphConfig(parts: string[]): ProjectConfig {
  return makeConfig({
    ...cliInputToProjectConfigPartial({ part: parts }),
    addons: [],
    examples: [],
    install: false,
  });
}

describe("browser template family loader", () => {
  it("loads a strict subset for a default TypeScript project with eager-equivalent output", async () => {
    const config = makeConfig({ auth: "none" });
    const selectedTemplates = await loadTemplatesForConfig(config);

    expect(selectedTemplates.size).toBeLessThan(EMBEDDED_TEMPLATES.size);
    expect(await generatedFiles(config, selectedTemplates)).toEqual(
      await generatedFiles(config, EMBEDDED_TEMPLATES),
    );
  });

  it("uses every ecosystem in a mixed stack graph and preserves the complete tree", async () => {
    const config = graphConfig([
      "frontend:typescript:react-vite",
      "backend:go:gin:api",
      "backend:python:fastapi:worker",
    ]);
    const requiredFamilies = getRequiredTemplateFamilies(config);
    const selectedTemplates = await loadTemplatesForConfig(config);

    expect(requiredFamilies).toContain("frontend");
    expect(requiredFamilies).toContain("go-base");
    expect(requiredFamilies).toContain("python-base");
    expect(await generatedFiles(config, selectedTemplates)).toEqual(
      await generatedFiles(config, EMBEDDED_TEMPLATES),
    );
  });

  it("keeps graph-global add-on templates for native and mixed ecosystem graphs", async () => {
    for (const parts of [
      ["backend:go:gin"],
      ["frontend:typescript:react-vite", "backend:go:gin"],
    ]) {
      const config = {
        ...graphConfig(parts),
        ecosystem: "go" as const,
        addons: ["docker-compose", "devcontainer"] as ProjectConfig["addons"],
      };
      const requiredFamilies = getRequiredTemplateFamilies(config);
      const selectedTemplates = await loadTemplatesForConfig(config);

      expect(requiredFamilies).toContain("addons");
      expect(await generatedFiles(config, selectedTemplates)).toEqual(
        await generatedFiles(config, EMBEDDED_TEMPLATES),
      );
    }
  });

  it("loads graph-native frontend and backend families without a JavaScript root", async () => {
    const config = graphConfig([
      "frontend:dotnet:blazor-webassembly",
      "backend:rust:axum",
      "backend:go:gin",
    ]);
    const requiredFamilies = getRequiredTemplateFamilies(config);
    const selectedTemplates = await loadTemplatesForConfig(config);

    expect(requiredFamilies).toContain("frontend");
    expect(requiredFamilies).toContain("dotnet-base");
    expect(requiredFamilies).toContain("rust-base");
    expect(requiredFamilies).toContain("go-base");
    expect(await generatedFiles(config, selectedTemplates)).toEqual(
      await generatedFiles(config, EMBEDDED_TEMPLATES),
    );
  });
});
