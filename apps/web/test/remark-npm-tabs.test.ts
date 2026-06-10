import { describe, expect, it } from "bun:test";

import { expandNpmCommand } from "../src/lib/docs/remark-npm-tabs";

describe("remark npm package-manager tabs", () => {
  it("drops the npm-only create separator for package-manager variants", () => {
    const commands = expandNpmCommand(
      "npm create better-fullstack@latest my-app -- \\\n  --ecosystem typescript",
    );

    expect(commands.npm).toBe(
      "npm create better-fullstack@latest my-app -- \\\n  --ecosystem typescript",
    );
    expect(commands.pnpm).toBe(
      "pnpm create better-fullstack@latest my-app \\\n  --ecosystem typescript",
    );
    expect(commands.bun).toBe(
      "bun create better-fullstack@latest my-app \\\n  --ecosystem typescript",
    );
    expect(commands.yarn).toBe(
      "yarn create better-fullstack@latest my-app \\\n  --ecosystem typescript",
    );
  });

  it("drops the npm-only create separator for single-line flags", () => {
    const commands = expandNpmCommand(
      "npm create better-fullstack@latest add -- --addons mcp skills",
    );

    expect(commands.pnpm).toBe("pnpm create better-fullstack@latest add --addons mcp skills");
    expect(commands.bun).toBe("bun create better-fullstack@latest add --addons mcp skills");
    expect(commands.yarn).toBe("yarn create better-fullstack@latest add --addons mcp skills");
  });
});
