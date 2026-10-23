import { describe, expect, it } from "bun:test";
import { getLanguage } from "@/components/stack-builder/code-viewer";
import { stackStateToProjectConfig } from "@/lib/builder/preview-config";
import { parseStackShareSlug, getStackSharePath } from "@/lib/stack/stack-share-paths";
import { generateStackCommand } from "@/lib/stack/stack-utils";

describe("Crystal builder integration", () => {
  it("resolves the canonical slug to the bounded native recipe", () => {
    const selection = parseStackShareSlug("crystal");
    if (!selection) throw new Error("Crystal slug missing");
    expect(getStackSharePath(selection)).toBe("/crystal");
    const config = stackStateToProjectConfig(selection);
    expect(config.crystalWebFramework).toBe("kemal");
    expect(config.database).toBe("none");
    expect(config.frontend).toEqual([]);
    expect(generateStackCommand(selection)).toContain("--crystal-web-framework kemal");
    expect(getLanguage("cr", "src/server.cr")).toBe("crystal");
  });
});
