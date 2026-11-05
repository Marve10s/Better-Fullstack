import { describe, expect, it } from "bun:test";

import {
  getBrowserExtensionRecipeIssue,
  getSelectedBrowserExtensions,
} from "@/capabilities/browser-extensions";
import { getToolingCapability } from "@/capabilities/tooling-capabilities";
import { getDisabledReason, stackQualifiesForSingleApp } from "@/stack/compatibility";
import {
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
} from "@/stack/stack-graph";
import {
  createStackSelectionSearchParams,
  DEFAULT_STACK_SELECTION,
  generateStackSelectionCommand,
  parseStackSelectionFromSearch,
} from "@/stack/stack-translation";

const spec = "appPlatform:typescript:plasmo";
const graph = ["frontend:typescript:react-vite:site", "backend:go:gin:api", spec];

function extensionIssues(specs: string[]) {
  return validateStackParts(parseStackPartSpecs(specs)).issues.filter(
    (issue) => issue.toolId === "plasmo" || issue.toolId === "wxt",
  );
}

describe("browser extension app platforms", () => {
  it("lifts Plasmo as an ownerless capability and lowers it without changing identity", () => {
    const parts = legacyProjectConfigToStackParts({
      ecosystem: "typescript",
      frontend: ["react-vite"],
      addons: ["plasmo"],
    });
    const extension = parts.find((part) => part.toolId === "plasmo");
    expect(extension?.id).toBe(parseStackPartSpecs([spec])[0]?.id);
    expect(extension?.role).toBe("appPlatform");
    expect(extension?.ownerPartId).toBeUndefined();
    expect(getToolingCapability("plasmo")?.ownerRole).toBeUndefined();
    expect(stackPartsToLegacyProjectConfigPartial(parts).addons).toContain("plasmo");
    expect(extensionIssues(graph)).toEqual([]);
  });

  it.each(["wxt", "plasmo"] as const)(
    "retains %s with an unrelated tooling overlay",
    (extension) => {
      const stackParts = parseStackPartSpecs(["codeQuality:universal:biome"]);
      const selection = { stackParts, addons: [extension] };
      const original = structuredClone(selection);
      expect(getSelectedBrowserExtensions(selection)).toEqual([extension]);
      expect(getBrowserExtensionRecipeIssue(selection)).toBeNull();
      expect(selection).toEqual(original);
    },
  );

  it.each(["wxt", "plasmo"] as const)(
    "uses explicit %s parts despite empty or stale flat caches",
    (extension) => {
      for (const specs of [
        [`appPlatform:typescript:${extension}`],
        [
          "frontend:typescript:react-vite:site",
          "backend:go:gin:api",
          `appPlatform:typescript:${extension}`,
        ],
      ]) {
        const stackParts = parseStackPartSpecs(specs);
        for (const addons of [[], ["wxt"], ["plasmo"], ["plasmo", "wxt"]]) {
          expect(getSelectedBrowserExtensions({ stackParts, addons })).toEqual([extension]);
          expect(getBrowserExtensionRecipeIssue({ stackParts, addons })).toBeNull();
        }
      }
      const stackParts = parseStackPartSpecs(["frontend:typescript:react-vite"]);
      expect(getSelectedBrowserExtensions({ stackParts, addons: [extension] })).toEqual([]);
    },
  );

  it("rejects directory collisions globally across owner scopes", () => {
    expect(getBrowserExtensionRecipeIssue({ addons: ["wxt", "plasmo"] })).toContain(
      "apps/extension",
    );
    for (const wxt of ["appPlatform:typescript:wxt", "site.appPlatform:typescript:wxt"]) {
      expect(
        extensionIssues([...graph, wxt]).some((issue) => issue.message.includes("both generate")),
      ).toBe(true);
    }
  });

  it.each(["go", "rust"] as const)(
    "keeps %s extension rejection when tooling overlays are present",
    (ecosystem) => {
      const stackParts = parseStackPartSpecs(["codeQuality:universal:biome"]);
      for (const extension of ["wxt", "plasmo"]) {
        const flat = { ecosystem, addons: [extension] };
        const issue = getBrowserExtensionRecipeIssue(flat);
        expect(issue).toContain("JavaScript");
        expect(getBrowserExtensionRecipeIssue({ ...flat, stackParts })).toBe(issue);
      }
    },
  );

  it("rejects owned, rerouted, and native-only extension graphs", () => {
    expect(
      extensionIssues([
        "frontend:typescript:react-vite:site",
        "site.appPlatform:typescript:plasmo",
      ]).some((issue) => issue.message.includes("ownerless")),
    ).toBe(true);
    expect(
      extensionIssues(["backend:go:gin", spec]).some((issue) =>
        issue.message.includes("JavaScript"),
      ),
    ).toBe(true);
    const parts = parseStackPartSpecs(graph).map((part) =>
      part.toolId === "plasmo" ? { ...part, targetPath: "apps/other" } : part,
    );
    expect(getBrowserExtensionRecipeIssue({ stackParts: parts })).toContain("apps/extension");
    expect(getBrowserExtensionRecipeIssue({ ecosystem: "go", addons: ["plasmo"] })).toContain(
      "JavaScript",
    );
  });

  it("requires a monorepo consistently in builder and project input", () => {
    const selection = {
      ...DEFAULT_STACK_SELECTION,
      backend: "self-next",
      webFrontend: ["next"],
      nativeFrontend: ["none"],
      appPlatforms: ["plasmo"],
      workspaceShape: "single-app",
    };
    expect(stackQualifiesForSingleApp(selection)).toBe(false);
    expect(getDisabledReason(selection, "appPlatforms", "plasmo")).toContain("monorepo");
    expect(
      getBrowserExtensionRecipeIssue({ addons: ["plasmo"], workspaceShape: "single-app" }),
    ).toContain("monorepo");
    expect(
      getDisabledReason(
        { ...selection, workspaceShape: "monorepo", appPlatforms: ["wxt"] },
        "appPlatforms",
        "plasmo",
      ),
    ).toContain("Choose one");
  });

  it("round-trips the ownerless platform through URL and reproducible command", () => {
    const selection = { ...DEFAULT_STACK_SELECTION, appPlatforms: ["plasmo"] };
    const search = createStackSelectionSearchParams(selection);
    const restored = parseStackSelectionFromSearch(Object.fromEntries(search));
    expect(restored.appPlatforms).toContain("plasmo");
    expect(generateStackSelectionCommand(restored)).toContain(`--part ${spec}`);
  });
});
