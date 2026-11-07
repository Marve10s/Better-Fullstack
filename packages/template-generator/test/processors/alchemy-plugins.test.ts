import { makeConfig } from "@test/_fixtures/config-factory";
import { createSeededVFS } from "@test/_fixtures/vfs-factory";
import { describe, expect, it } from "bun:test";

import { processAlchemyPlugins } from "@/processors/plugins/alchemy-plugins";

const TANSTACK_START_VITE_CONFIG = `import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), tanstackStart(), viteReact()],
  server: {
    port: 3001,
  },
});
`;

describe("processAlchemyPlugins tanstack-start", () => {
  it("wires a cloudflare fallback so vite build works before alchemy dev runs", async () => {
    const vfs = createSeededVFS(["apps/web/vite.config.ts"]);
    vfs.writeFile("apps/web/vite.config.ts", TANSTACK_START_VITE_CONFIG);

    await processAlchemyPlugins(
      vfs,
      makeConfig({ frontend: ["tanstack-start"], webDeploy: "cloudflare" }),
    );

    const content = vfs.readFile("apps/web/vite.config.ts");

    expect(content).toContain("alchemy/cloudflare/tanstack-start");
    expect(content).toContain("@cloudflare/vite-plugin");
    expect(content).toContain("node:fs");
    expect(content).toContain('existsSync(".alchemy/local/wrangler.jsonc") ? alchemy() : cloudflare()');
    expect(content).toContain("cloudflarePlugin");
    expect(content).not.toContain("alchemy(),");
  });
});
