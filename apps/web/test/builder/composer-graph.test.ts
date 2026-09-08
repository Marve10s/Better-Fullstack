import {
  patchGraphScopedSelections,
  projectGraphScopedSelections,
} from "@better-fullstack/types/stack-translation";
import { describe, expect, it } from "bun:test";

import { stackStateToStackParts } from "@/components/stack-builder/stack-graph-comparison";
import { selectionAnalyticsProperties } from "@/lib/analytics/campaign-analytics";
import {
  composerUsesJavaScript,
  getComposerParts,
  getComposerEditorSpecs,
  getComposerReviewParts,
  hasComposerApplication,
  reconcileComposerSpecs,
} from "@/lib/builder/composer-graph";
import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";

describe("application composer graph edits", () => {
  it("projects a later editor root and preserves the first root's capabilities", () => {
    const specs = [
      "backend:java:spring-boot:api",
      "api.buildTool:java:maven",
      "backend:java:quarkus:worker",
      "worker.buildTool:java:gradle",
    ];
    const viewSpecs = getComposerEditorSpecs(specs, { backend: "worker" });
    const view = projectGraphScopedSelections({
      ...DEFAULT_STACK,
      stackMode: "multi",
      stackPartSpecs: viewSpecs,
    });
    expect(view.javaBuildTool).toBe("gradle");
    expect(
      getComposerParts(viewSpecs)
        .filter((part) => part.role === "backend")
        .map((part) => part.id),
    ).toEqual(["worker"]);
    const patch = patchGraphScopedSelections(view, { javaBuildTool: "maven" });
    const result = getComposerParts(
      reconcileComposerSpecs(specs, viewSpecs, patch.stackPartSpecs ?? viewSpecs, {
        backend: "worker",
      }),
    );
    expect(result.filter((part) => part.role === "backend").map((part) => part.id)).toEqual([
      "api",
      "worker",
    ]);
    expect(
      result
        .filter((part) => part.role === "buildTool")
        .map((part) => [part.ownerPartId, part.toolId]),
    ).toEqual([
      ["api", "maven"],
      ["worker", "maven"],
    ]);
  });

  it("keeps primary order when replacing a selected framework", () => {
    const specs = ["backend:go:gin:api", "backend:go:echo:worker"];
    const view = getComposerEditorSpecs(specs, { backend: "api" });
    const result = getComposerParts(
      reconcileComposerSpecs(specs, view, ["backend:python:fastapi"], { backend: "api" }),
    );
    expect(result.map((part) => [part.id, part.toolId])).toEqual([
      ["api", "fastapi"],
      ["worker", "echo"],
    ]);
  });

  it("preserves named services and their capabilities when the frontend changes", () => {
    const current = [
      "frontend:typescript:next",
      "backend:go:gin:public-api",
      "public-api.orm:go:gorm",
      "backend:go:echo:worker",
      "worker.orm:go:sqlc",
      "database:universal:postgres",
    ];
    const before = [
      "frontend:typescript:next",
      "backend:go:gin",
      "backend.orm:go:gorm",
      "database:universal:postgres",
    ];
    const result = reconcileComposerSpecs(
      current,
      before,
      before.map((part) =>
        part.replace("frontend:typescript:next", "frontend:dotnet:blazor-webassembly"),
      ),
    );
    const parts = getComposerParts(result);
    expect(parts.find((part) => part.id === "public-api")?.toolId).toBe("gin");
    expect(parts.find((part) => part.id === "worker")?.toolId).toBe("echo");
    expect(parts.find((part) => part.ownerPartId === "worker")?.toolId).toBe("sqlc");
    expect(parts.find((part) => part.role === "frontend")?.ecosystem).toBe("dotnet");
  });

  it("removes the selected application and its capabilities without removing another service", () => {
    const result = reconcileComposerSpecs(
      ["backend:go:gin:api", "api.orm:go:gorm", "backend:python:fastapi:worker"],
      ["backend:go:gin", "backend.orm:go:gorm"],
      [],
    );
    expect(getComposerParts(result).map((part) => part.id)).toEqual(["worker"]);
  });

  it("keeps explicit IDs when replacing an application, but does not retain incompatible capabilities", () => {
    const result = reconcileComposerSpecs(
      ["backend:go:gin:api", "backend.orm:go:gorm"],
      ["backend:go:gin", "backend.orm:go:gorm"],
      ["backend:python:fastapi"],
    );
    expect(getComposerParts(result)).toHaveLength(1);
    expect(getComposerParts(result)[0]).toMatchObject({
      id: "api",
      ecosystem: "python",
      toolId: "fastapi",
    });
  });

  it("adds a second named backend with its own capabilities", () => {
    const before = ["backend:go:gin:api", "api.orm:go:gorm"];
    const after = [
      ...before,
      "backend:python:fastapi:worker",
      "worker.packageManager:python:poetry",
    ];
    const parts = getComposerParts(reconcileComposerSpecs(before, before, after));
    expect(parts.find((part) => part.id === "api")?.toolId).toBe("gin");
    expect(parts.find((part) => part.id === "worker")?.toolId).toBe("fastapi");
    expect(parts.find((part) => part.ownerPartId === "worker")?.toolId).toBe("poetry");
    expect(parts.find((part) => part.ownerPartId === "api")?.toolId).toBe("gorm");
  });

  it("edits the second named service without changing the first service", () => {
    const before = [
      "backend:go:gin:api",
      "api.orm:go:gorm",
      "backend:go:echo:worker",
      "worker.orm:go:sqlc",
    ];
    const after = before.map((spec) => spec.replace("worker.orm:go:sqlc", "worker.orm:go:ent"));
    const parts = getComposerParts(reconcileComposerSpecs(before, before, after));
    expect(parts.find((part) => part.ownerPartId === "api")?.toolId).toBe("gorm");
    expect(parts.find((part) => part.ownerPartId === "worker")?.toolId).toBe("ent");
    const remaining = getComposerParts(reconcileComposerSpecs(after, after, before.slice(0, 2)));
    expect(remaining.map((part) => part.toolId)).toEqual(["gin", "gorm"]);
  });

  it("keeps multiple frontends when adding a named application", () => {
    const before = ["frontend:typescript:next:store"];
    const parts = getComposerParts(
      reconcileComposerSpecs(before, before, [...before, "frontend:typescript:react-vite:admin"]),
    );
    expect(parts.map((part) => part.id)).toEqual(["store", "admin"]);
  });

  it("requires an application and derives JavaScript settings from selected roots", () => {
    expect(hasComposerApplication([])).toBe(false);
    expect(hasComposerApplication(["database:universal:postgres"])).toBe(false);
    expect(composerUsesJavaScript(["frontend:dotnet:blazor-webassembly", "backend:go:gin"])).toBe(
      false,
    );
    expect(composerUsesJavaScript(["mobile:dart:flutter", "backend:go:gin"])).toBe(false);
    expect(composerUsesJavaScript(["mobile:react-native:native-bare", "backend:go:gin"])).toBe(
      true,
    );
  });
});

it("allows partial application selections in graph comparisons without generating a project", () => {
  expect(
    stackStateToStackParts({ ...DEFAULT_STACK, stackMode: "multi", stackPartSpecs: [] }),
  ).toEqual([]);
  expect(
    stackStateToStackParts({
      ...DEFAULT_STACK,
      stackMode: "multi",
      stackPartSpecs: ["database:universal:sqlite"],
    }).map((part) => part.role),
  ).toEqual(["database"]);
});

it("does not require a generatable project to record an incomplete builder selection", () => {
  for (const stackPartSpecs of [[], ["database:universal:sqlite"]]) {
    const properties = selectionAnalyticsProperties(
      { ...DEFAULT_STACK, stackMode: "multi", stackPartSpecs },
      [],
    );
    expect(properties).toMatchObject({ mode: "multi", frontend: "none", backend: "none" });
    expect(properties).not.toHaveProperty("selected_evidence_level");
  }
});

for (const selectedId of ["api", "worker"]) {
  it(`updates the selected ${selectedId} when two named services use the same framework`, () => {
    const current = [
      "backend:go:gin:api",
      "api.orm:go:gorm",
      "backend:go:gin:worker",
      "worker.orm:go:gorm",
    ];
    const previous = ["backend:go:gin", "backend.orm:go:gorm"];
    const parts = getComposerParts(
      reconcileComposerSpecs(current, previous, ["backend:go:gin", "backend.orm:go:sqlc"], {
        backend: selectedId,
      }),
    );
    expect(parts.filter((part) => part.role === "backend").map((part) => part.id)).toEqual([
      "api",
      "worker",
    ]);
    expect(parts.find((part) => part.ownerPartId === selectedId)?.toolId).toBe("sqlc");
    expect(
      parts.find((part) => part.ownerPartId === (selectedId === "api" ? "worker" : "api"))?.toolId,
    ).toBe("gorm");
    const replaced = getComposerParts(
      reconcileComposerSpecs(current, previous, ["backend:python:fastapi"], {
        backend: selectedId,
      }),
    );
    expect(replaced.filter((part) => part.role === "backend")).toHaveLength(2);
    expect(replaced.find((part) => part.id === selectedId)?.toolId).toBe("fastapi");
    const removed = getComposerParts(
      reconcileComposerSpecs(current, previous, [], { backend: selectedId }),
    );
    expect(removed.filter((part) => part.role === "backend")).toHaveLength(1);
    expect(removed.some((part) => part.id === selectedId || part.ownerPartId === selectedId)).toBe(
      false,
    );
  });
}

it("reviews every named application with its generated path and owned capabilities", () => {
  const applications = getComposerReviewParts([
    "frontend:typescript:react-vite",
    "backend:go:gin:api",
    "api.orm:go:gorm",
    "backend:go:gin:worker",
    "worker.orm:go:sqlc",
    "database:universal:postgres",
  ]);
  expect(applications.map(({ id, targetPath }) => [id, targetPath])).toEqual([
    ["frontend:typescript:react-vite", "apps/web"],
    ["api", "services/api"],
    ["worker", "services/worker"],
    ["database:universal:postgres", "packages/db"],
  ]);
  expect(applications[1]?.capabilities.map((part) => part.toolId)).toEqual(["gorm"]);
  expect(applications[2]?.capabilities.map((part) => part.toolId)).toEqual(["sqlc"]);
});
