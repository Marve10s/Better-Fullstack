const firstArg = process.argv[2];
if (firstArg === "mcp" && process.argv.length === 3) {
  import("./mcp.js").then((m) => m.startMcpServer());
} else {
  import("./run.js").then((m) => m.createBtsCli().run());
}
