// Keep startup outside the shared MCP chunk used by the CLI and library exports.
const { startMcpServer } = await import("@/mcp.js");

await startMcpServer();

export {};
