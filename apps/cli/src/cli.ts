const firstArg = process.argv[2];
if (firstArg === "mcp" && process.argv.length === 3) {
  import("./mcp.js").then((m) => m.startMcpServer());
} else {
  import("./index.js").then((m) => m.createBtsCli().run());
}
