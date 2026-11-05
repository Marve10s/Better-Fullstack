import { describe, expect, it } from "bun:test";

import { planProjectOutputSchema } from "@/operations/output-schemas";
import { planProjectOperation } from "@/operations/project-create";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { isToolingOverlayOnly } from "@/types";

const project = {
  projectName: "extension-overlay-app",
  ecosystem: "typescript",
  frontend: ["react-vite"],
  backend: "none",
  runtime: "none",
  database: "none",
  orm: "none",
  api: "none",
  auth: "none",
  forms: "none",
  testing: "none",
  examples: [],
  workspaceShape: "monorepo",
  aiDocs: [],
};

const extensions = [
  { addon: "wxt", entrypoint: "apps/extension/entrypoints/popup/main.tsx" },
  { addon: "plasmo", entrypoint: "apps/extension/src/popup.tsx" },
] as const;

describe("MCP browser extension tooling overlays", () => {
  it.each(extensions)(
    "plans $addon alongside a code-quality-only overlay",
    async ({ addon, entrypoint }) => {
      const input = {
        ...project,
        addons: [addon],
        part: ["codeQuality:universal:biome"],
      };
      const config = buildProjectConfig(input);
      expect(isToolingOverlayOnly(config.stackParts)).toBe(true);
      expect(config.stackParts?.map((part) => part.toolId)).toEqual(["biome"]);
      expect(config.addons).toContain(addon);

      const { output, failed } = await planProjectOperation.invoke(input);
      expect(failed).toBe(false);
      const plan = planProjectOutputSchema.parse(output);
      expect(plan.success).toBe(true);
      expect(plan.files).toContain("apps/web/package.json");
      expect(plan.files).toContain("apps/extension/package.json");
      expect(plan.files).toContain(entrypoint);
      expect(plan.files).toContain("biome.json");
    },
  );
});
