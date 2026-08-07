const firstArg = process.argv[2];
if (firstArg === "mcp" && process.argv.length === 3) {
  Promise.all([import("./mcp.js"), import("./utils/analytics.js")]).then(
    async ([mcp, analytics]) => {
      await analytics.trackCommand("mcp", "started", { source: "cli-flags" });
      return mcp.startMcpServer();
    },
  );
} else {
  import("./run.js").then((m) => m.createBtsCli().run());
}
