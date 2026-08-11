import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { afterEach, describe, expect, it } from "bun:test";
import { resolve } from "node:path";

const clients: Client[] = [];

async function connectClient(mode: "legacy" | "modern") {
  const client = new Client(
    { name: `better-fullstack-${mode}-test`, version: "1.0.0" },
    mode === "modern" ? { versionNegotiation: { mode: { pin: "2026-07-28" } } } : undefined,
  );
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [resolve(import.meta.dir, "../src/cli.ts"), "mcp"],
    stderr: "pipe",
  });

  clients.push(client);
  await client.connect(transport);
  return client;
}

afterEach(async () => {
  await Promise.all(clients.splice(0).map((client) => client.close()));
});

describe("Better Fullstack MCP protocol support", () => {
  it("continues serving legacy MCP clients", async () => {
    const client = await connectClient("legacy");
    const tools = await client.listTools();

    expect(client.getProtocolEra()).toBe("legacy");
    expect(tools.tools.some((tool) => tool.name === "bfs_get_guidance")).toBe(true);
  });

  it("serves MCP 2026-07-28 clients", async () => {
    const client = await connectClient("modern");
    const tools = await client.listTools();
    const resources = await client.listResources();
    const stackOptions = await client.readResource({ uri: "docs://stack-options" });

    expect(client.getProtocolEra()).toBe("modern");
    expect(client.getNegotiatedProtocolVersion()).toBe("2026-07-28");
    expect(tools.ttlMs).toBe(300_000);
    expect(tools.cacheScope).toBe("public");
    expect(tools.tools.some((tool) => tool.name === "bfs_get_guidance")).toBe(true);
    expect(resources.ttlMs).toBe(300_000);
    expect(resources.cacheScope).toBe("public");
    expect(resources.resources.some((resource) => resource.uri === "docs://stack-options")).toBe(
      true,
    );
    expect(stackOptions.ttlMs).toBe(300_000);
    expect(stackOptions.cacheScope).toBe("public");
  });
});
