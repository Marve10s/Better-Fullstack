import { evaluateUpdateSupport, parseStackPartSpecs } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import {
  parseImportedBtsConfigText,
  resolveImportedProjectName,
} from "@/lib/builder/existing-project-import";

const TARGET_VERSION = "2.6.1";

function configText(parts: ReturnType<typeof parseStackPartSpecs>, extra = "") {
  return `{
    // Better Fullstack project metadata stays local to this test and the browser importer.
    "version": "2.5.0",
    "createdAt": "2026-08-23T00:00:00.000Z",
    "stackParts": ${JSON.stringify(parts)},
    ${extra}
  }`;
}

describe("existing project config import", () => {
  it("keeps the current builder project name for a canonical bts config filename", () => {
    const result = parseImportedBtsConfigText(
      configText(parseStackPartSpecs(["backend:go:gin", "database:universal:postgres"])),
      {
        targetVersion: TARGET_VERSION,
        projectName: resolveImportedProjectName("bts.jsonc", "existing-app"),
      },
    );

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.stack.projectName).toBe("existing-app");
    expect(resolveImportedProjectName("catalog.jsonc", "existing-app")).toBe("catalog");
  });

  it("parses JSONC comments and trailing commas without filesystem access", () => {
    const result = parseImportedBtsConfigText(
      configText(
        parseStackPartSpecs([
          "frontend:typescript:next",
          "backend:typescript:hono",
          "backend.runtime:typescript:bun",
        ]),
      ),
      { targetVersion: TARGET_VERSION, projectName: "existing-app" },
    );

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.stack.projectName).toBe("existing-app");
    expect(result.stack.stackMode).toBe("multi");
    expect(result.stack.stackPartSpecs).toContain("frontend:typescript:next");
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({ code: "LOCAL_BROWSER_READ", severity: "info" }),
    );
  });

  it("uses stackParts instead of stale compatibility-cache fields", () => {
    const result = parseImportedBtsConfigText(
      configText(
        parseStackPartSpecs([
          "frontend:typescript:react-vite",
          "backend:typescript:hono",
          "backend.runtime:typescript:bun",
        ]),
        '"frontend": ["next"], "backend": "express", "runtime": "node", "graphSummary": "stale",',
      ),
      { targetVersion: TARGET_VERSION },
    );

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.config.frontend).toEqual(["react-vite"]);
    expect(result.config.backend).toBe("hono");
    expect(result.config.runtime).toBe("bun");
    expect(result.config.graphSummary).toBeUndefined();
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({ code: "GRAPH_CACHE_IGNORED", severity: "warning" }),
    );
  });

  it("returns local diagnostics for malformed JSONC", () => {
    const result = parseImportedBtsConfigText('{ "version": "2.5.0",', {
      targetVersion: TARGET_VERSION,
    });

    expect(result.success).toBe(false);
    expect(result.diagnostics[0]?.severity).toBe("error");
    expect(result.diagnostics[0]?.code).toStartWith("JSONC_");
  });

  it("uses the shared update support evaluator for an imported config", () => {
    const result = parseImportedBtsConfigText(
      configText(parseStackPartSpecs(["backend:go:gin", "database:universal:postgres"])),
      { targetVersion: TARGET_VERSION },
    );

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.updateSupport).toEqual(
      evaluateUpdateSupport({
        sourceVersion: "2.5.0",
        targetVersion: TARGET_VERSION,
        manifestVersion: null,
        provenanceVerified: false,
      }),
    );
    expect(result.updateSupport.reasonCode).toBe("manifest-v2-required");
  });

  it("preserves named services in graph-mode builder state", () => {
    const result = parseImportedBtsConfigText(
      configText(
        parseStackPartSpecs([
          "backend:python:fastapi:catalog",
          "catalog.orm:python:sqlalchemy",
          "backend:go:gin:checkout",
          "checkout.orm:go:gorm",
        ]),
      ),
      { targetVersion: TARGET_VERSION },
    );

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.stack.stackPartSpecs).toEqual([
      "backend:python:fastapi:catalog",
      "backend:go:gin:checkout",
      "backend.orm:python:sqlalchemy",
      "backend.orm:go:gorm",
    ]);
  });

  it("rejects graph fields that the builder command cannot round-trip", () => {
    const parts = parseStackPartSpecs(["backend:go:gin:catalog"]).map((part) => ({
      ...part,
      targetPath: "services/catalog-api",
    }));

    const result = parseImportedBtsConfigText(configText(parts), {
      targetVersion: TARGET_VERSION,
    });

    expect(result.success).toBe(false);
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        severity: "error",
        code: "GRAPH_FIELDS_NOT_ROUND_TRIPPABLE",
        message: expect.stringContaining("targetPath"),
      }),
    );
  });
});
