import { describe, expect, it } from "bun:test";

import { compareStackGraphs, parseStackPartSpecs } from "../src";

describe("stack graph comparison", () => {
  it("classifies additions, removals, replacements, and owner rewiring", () => {
    const before = parseStackPartSpecs([
      "frontend:typescript:react-vite",
      "frontend.ui:typescript:shadcn-ui",
      "backend:typescript:hono",
      "backend.orm:typescript:drizzle",
      "backend.api:typescript:trpc",
    ]);
    const after = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.ui:typescript:shadcn-ui",
      "backend:typescript:hono",
      "backend.orm:typescript:prisma",
      "backend.auth:typescript:better-auth",
    ]);

    const comparison = compareStackGraphs(before, after);

    expect(comparison.replacements.map((change) => change.before.toolId)).toEqual([
      "drizzle",
      "react-vite",
    ]);
    expect(comparison.replacements.map((change) => change.after.toolId)).toEqual([
      "prisma",
      "next",
    ]);
    expect(comparison.ownerChanges).toHaveLength(1);
    expect(comparison.ownerChanges[0]?.before.toolId).toBe("shadcn-ui");
    expect(comparison.additions.map((part) => part.toolId)).toContain("better-auth");
    expect(comparison.removals.map((part) => part.toolId)).toContain("trpc");
    expect(comparison.hasChanges).toBe(true);
  });

  it("preserves named service identity while reporting an evidence change", () => {
    const before = parseStackPartSpecs(["backend:go:gin:api", "api.orm:go:gorm"]);
    const after = parseStackPartSpecs(["backend:go:echo:api", "api.orm:go:gorm"]);

    const comparison = compareStackGraphs(before, after, {
      evidenceForPart: (part) => ({
        level: part.toolId === "gin" ? "runtime-verified" : "listed",
        maturity: part.toolId === "gin" ? "stable" : "experimental",
      }),
    });

    expect(comparison.replacements).toHaveLength(1);
    expect(comparison.replacements[0]).toMatchObject({
      before: { id: "api", toolId: "gin" },
      after: { id: "api", toolId: "echo" },
    });
    expect(comparison.evidenceChanges).toHaveLength(1);
    expect(comparison.ownerChanges).toHaveLength(0);
  });
});
