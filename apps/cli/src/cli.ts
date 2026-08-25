const firstArg = process.argv[2];
if (firstArg === "mcp" && process.argv.length === 3) {
  Promise.all([import("@/mcp.js"), import("@/telemetry/analytics.js")]).then(
    async ([mcp, analytics]) => {
      await analytics.trackCommand("mcp", "started", { source: "cli-flags" });
      return mcp.startMcpServer();
    },
  );
} else {
  void (async () => {
    const [run, analytics] = await Promise.all([
      import("@/run.js"),
      import("@/telemetry/analytics.js"),
    ]);
    let exitCode = 0;

    try {
      await run.createBtsCli().run({
        // Record the code instead of exiting, so the shutdown flush below still
        // runs. trpc-cli turns a returning `exit` into a FailedToExitError.
        process: { exit: ((code: number) => void (exitCode = code)) as (code: number) => never },
        // The default formatter inspects the whole error object; the message is
        // what a CLI user can act on.
        formatError: (error) => (error instanceof Error ? error.message : String(error)),
      });
    } catch (error) {
      exitCode = (error as { exitCode?: number }).exitCode ?? 1;
    } finally {
      await analytics.flushTelemetry();
    }

    process.exitCode = exitCode;
  })();
}
