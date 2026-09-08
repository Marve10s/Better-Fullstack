import { generateVirtualProject, EMBEDDED_TEMPLATES } from "@better-fullstack/template-generator";
import { describe, expect, it } from "bun:test";

import { stackStateToProjectConfig } from "@/lib/builder/preview-config";

describe("stackStateToProjectConfig", () => {
  it("generates native preview files without restoring filtered JavaScript addons", async () => {
    const config = stackStateToProjectConfig({
      stackMode: "multi",
      stackPartSpecs: ["backend:go:gin:api", "backend:python:fastapi:worker"],
    });
    expect(config.addons).toEqual([]);
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
    expect(result.success, result.error).toBe(true);
    expect(result.tree).toBeDefined();
  });

  it("generates the mixed frontend paths displayed by the composer", async () => {
    const config = stackStateToProjectConfig({
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:dotnet:blazor-webassembly:admin",
        "frontend:typescript:react-vite:site",
        "backend:go:gin:api",
        "backend:python:fastapi:worker",
      ],
    });
    expect(config.stackParts?.find((part) => part.id === "site")?.targetPath).toBe("apps/web");
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
    expect(result.success, result.error).toBe(true);
    if (!result.tree) throw new Error(result.error);
    const paths = JSON.stringify(result.tree.root);
    expect(paths).toContain('"path":"apps/web/package.json"');
    expect(paths).toContain('"path":"apps/admin/Program.cs"');
  });

  it("maps stack state into a canonical project config", () => {
    const config = stackStateToProjectConfig({
      projectName: "  preview-app  ",
      backend: "self-svelte",
      webFrontend: ["svelte", "none"],
      nativeFrontend: ["none"],
      versionChannel: "beta",
      aiSdk: "langchain",
      codeQuality: ["biome", "none"],
      documentation: ["none"],
      appPlatforms: ["none"],
      examples: ["none"],
      aiDocs: ["cursorrules", "none"],
      git: "false",
      search: "elasticsearch",
      webMcp: "enabled",
      rustLibraries: ["serde"],
      pythonAi: ["langchain"],
    });

    expect(config.projectName).toBe("preview-app");
    expect(config.backend).toBe("self");
    expect(config.frontend).toEqual(["svelte"]);
    expect(config.runtime).toBe("none");
    expect(config.serverDeploy).toBe("none");
    expect(config.ai).toBe("langchain");
    expect(config.git).toBe(false);
    expect(config.versionChannel).toBe("beta");
    expect(config.addons).toEqual(["biome"]);
    expect(config.aiDocs).toEqual(["cursorrules"]);
    expect(config.search).toBe("elasticsearch");
    expect(config.webMcp).toBe("enabled");
    expect(config.rustLibraries).toEqual(["serde"]);
    expect(config.pythonAi).toEqual(["langchain"]);
  });

  it("falls back to defaults and strips 'none' selections", () => {
    const config = stackStateToProjectConfig({
      projectName: "",
      webFrontend: ["none"],
      nativeFrontend: ["none"],
      codeQuality: ["none"],
      documentation: ["none"],
      appPlatforms: ["none"],
      examples: ["none"],
      aiDocs: ["none"],
    });

    expect(config.projectName).toBe("my-app");
    expect(config.frontend).toEqual(["tanstack-router"]);
    expect(config.addons).toEqual([]);
    expect(config.examples).toEqual([]);
    expect(config.aiDocs).toEqual([]);
    expect(config.ai).toBe("none");
    expect(config.versionChannel).toBe("stable");
    expect(config.install).toBe(false);
  });

  it("maps graph-mode stack parts into preview project config", () => {
    const config = stackStateToProjectConfig({
      projectName: "graph-preview",
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:go:gin",
        "backend.orm:go:gorm",
        "database:universal:postgres",
      ],
    });

    expect(
      config.stackParts?.map((part) => `${part.role}:${part.ecosystem}:${part.toolId}`),
    ).toEqual(
      expect.arrayContaining([
        "frontend:typescript:next",
        "backend:go:gin",
        "orm:go:gorm",
        "database:universal:postgres",
      ]),
    );
    expect(config.frontend).toEqual(["next"]);
    expect(config.goWebFramework).toBe("gin");
    expect(config.goOrm).toBe("gorm");
    expect(config.database).toBe("postgres");
  });
});
