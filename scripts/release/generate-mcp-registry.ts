import cliPackage from "../../apps/cli/package.json";

const server = {
  $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  name: cliPackage.mcpName,
  title: "Better Fullstack",
  description: "Validate stack choices, preview generated files, and scaffold fullstack projects locally.",
  repository: {
    url: "https://github.com/Marve10s/Better-Fullstack",
    source: "github",
    subfolder: "apps/cli",
  },
  websiteUrl: "https://better-fullstack.dev/docs/ai/overview",
  version: cliPackage.version,
  packages: [
    {
      registryType: "npm",
      identifier: cliPackage.name,
      version: cliPackage.version,
      transport: { type: "stdio" },
      packageArguments: [{ type: "positional", value: "mcp" }],
    },
  ],
};

process.stdout.write(`${JSON.stringify(server, null, 2)}\n`);
