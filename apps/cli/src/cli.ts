const firstArg = process.argv[2];
if (firstArg === "mcp" && process.argv.length === 3) {
  Promise.all([import("./mcp.js"), import("./utils/analytics.js")]).then(
    async ([mcp, analytics]) => {
      await analytics.trackCommand("mcp", "started", { source: "cli-flags" });
      return mcp.startMcpServer();
    },
  );
} else {
  Promise.all([import("./run.js"), import("./utils/analytics.js")]).then(
    async ([run, analytics]) => {
      try {
        return await run.createBtsCli().run();
      } finally {
        await analytics.flushTelemetry();
      }
    },
  );
}
