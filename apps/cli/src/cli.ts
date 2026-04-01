const firstArg = process.argv[2];
if (firstArg === "mcp") {
  import("./mcp.js").then((m) => m.startMcpServer());
} else {
  import("./index.js").then((m) => m.createBtsCli().run());
}
