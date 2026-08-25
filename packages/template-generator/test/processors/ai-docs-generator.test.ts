import { parseStackPartSpecs } from "@better-fullstack/types";
import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "@/core/virtual-fs";
import { processAiDocs } from "@/processors/config/ai-docs-generator";

describe("processAiDocs", () => {
  it("records Stack Part ownership, evidence, installed-version authority, and safe lifecycle commands", () => {
    const vfs = new VirtualFileSystem();
    const config = makeConfig({
      aiDocs: ["agents-md", "claude-md"],
      stackParts: parseStackPartSpecs([
        "frontend:typescript:tanstack-router",
        "backend:typescript:hono",
        "backend.api:typescript:trpc",
        "database:universal:sqlite",
        "database.orm:typescript:drizzle",
      ]),
    });

    processAiDocs(vfs, config);

    for (const file of ["AGENTS.md", "CLAUDE.md"]) {
      const content = vfs.readFile(file) ?? "";
      expect(content).toContain("## Better Fullstack project context");
      expect(content).toContain("backend.api:typescript:trpc");
      expect(content).toContain("It belongs to `backend:typescript:hono`");
      expect(content).toContain("package manifests and lockfiles");
      expect(content).toContain("create-better-fullstack context --json");
      expect(content).toContain("create-better-fullstack recipes check --json");
      expect(content).toContain("<better-fullstack:recipes sha256=e3b0c442");
    }
  });
});
