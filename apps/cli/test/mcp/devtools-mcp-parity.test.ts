import {
  Client,
  InMemoryTransport,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { afterAll, describe, expect, it } from "bun:test";
import { toAgentToolName } from "devframe/utils/agent-tool-name";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";

import { startDevtoolsServer } from "@/devtools/serve";
import { createMcpServer } from "@/mcp";
import { allOperations, operationToolId, operationToolName } from "@/operations";

const closers: Array<() => Promise<void>> = [];

afterAll(async () => {
  await Promise.all(closers.splice(0).map((close) => close()));
});

async function connectStdioProjection() {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const server = createMcpServer();
  await server.connect(serverTransport);
  const client = new Client({ name: "parity-stdio", version: "0.0.0" });
  await client.connect(clientTransport);
  closers.push(() => client.close());
  return client;
}

async function connectDevtoolsProjection() {
  const server = await startDevtoolsServer({ projectDir: tmpdir() });
  closers.push(() => server.close());
  // The route rejects Origin-less requests by design; a same-machine client
  // presents its own loopback origin exactly like `devframe connect` does.
  const transport = new StreamableHTTPClientTransport(new URL("/__mcp", server.origin), {
    requestInit: { headers: { Origin: server.origin } },
  });
  const client = new Client({ name: "parity-devtools", version: "0.0.0" });
  await client.connect(transport);
  closers.push(() => client.close());
  return client;
}

describe("devtools MCP projection", () => {
  it("advertises every operation under the stdio tool name with the same schemas", async () => {
    const stdio = await connectStdioProjection();
    const devtools = await connectDevtoolsProjection();
    const stdioTools = new Map((await stdio.listTools()).tools.map((tool) => [tool.name, tool]));
    const devtoolsTools = new Map(
      (await devtools.listTools()).tools.map((tool) => [tool.name, tool]),
    );

    for (const operation of allOperations) {
      const name = operationToolName(operation);
      expect(toAgentToolName(operationToolId(operation))).toBe(name);
      const viaStdio = stdioTools.get(name);
      const viaDevtools = devtoolsTools.get(name);
      expect(viaStdio).toBeDefined();
      expect(viaDevtools).toBeDefined();
      if (!viaStdio || !viaDevtools) continue;
      expect(viaDevtools.description).toBe(viaStdio.description);
      expect(viaDevtools.inputSchema).toEqual(viaStdio.inputSchema);
      expect(viaDevtools.outputSchema).toEqual(viaStdio.outputSchema);
      expect(viaDevtools.annotations?.readOnlyHint).toBe(viaStdio.annotations?.readOnlyHint);
    }
  });

  it("returns the same structured status payload over the devtools route", async () => {
    const devtools = await connectDevtoolsProjection();
    const missingProject = path.join(tmpdir(), "bfs-devtools-missing-project");
    const result = await devtools.callTool({
      name: "bfs_get_project_status",
      arguments: { projectDir: missingProject },
    });
    const text = result.content?.find((entry) => entry.type === "text");
    expect(text?.type).toBe("text");
    if (text?.type !== "text") return;
    const payload = JSON.parse(text.text);
    expect(result.structuredContent).toEqual(payload);
    expect(payload).toMatchObject({ success: false, projectDir: missingProject });
  });

  it("defaults the project directory to the served project for agents", async () => {
    const devtools = await connectDevtoolsProjection();
    const result = await devtools.callTool({ name: "bfs_get_project_status", arguments: {} });
    expect(result.isError).toBeFalsy();
    expect(result.structuredContent).toMatchObject({ projectDir: path.resolve(tmpdir()) });
  });

  it("is discovered by the devframe connect gateway", async () => {
    const server = await startDevtoolsServer({ projectDir: tmpdir() });
    closers.push(() => server.close());

    // `devframe connect` is the MCP gateway agents configure once; it lists
    // every running devframe through the instance registry.
    const require = createRequire(import.meta.url);
    const bin = path.join(
      path.dirname(require.resolve("devframe/package.json")),
      "bin/devframe.mjs",
    );
    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [bin, "connect"],
      stderr: "pipe",
    });
    const gateway = new Client({ name: "parity-gateway", version: "0.0.0" });
    await gateway.connect(transport);
    closers.push(() => gateway.close());

    const tools = (await gateway.listTools()).tools.map((tool) => tool.name);
    expect(tools).toContain("devframe_connect_list-instances");
    const listed = await gateway.callTool({
      name: "devframe_connect_list-instances",
      arguments: {},
    });
    const text = listed.content?.find((entry) => entry.type === "text");
    expect(text?.type).toBe("text");
    if (text?.type !== "text") return;
    expect(text.text).toContain(String(server.port));
    expect(text.text).toContain("bfs_get_project_status");
  });
});
