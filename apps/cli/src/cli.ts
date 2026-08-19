const firstArg = process.argv[2];
if (firstArg === "mcp" && process.argv.length === 3) {
  Promise.all([import("./mcp.js"), import("./utils/analytics.js")]).then(
    async ([mcp, analytics]) => {
      await analytics.trackCommand("mcp", "started", { source: "cli-flags" });
      return mcp.startMcpServer();
    },
  );
} else {
  Promise.all([
    import("./run.js"),
    import("./utils/analytics.js"),
    import("./utils/errors.js"),
  ]).then(async ([run, analytics, errors]) => {
    // The message for a reported error was already printed where it was raised.
    const ALREADY_REPORTED = "bts:already-reported";
    let exitCode = 0;

    try {
      await run.createBtsCli().run({
        // Record the code instead of exiting, so the shutdown flush below still
        // runs. trpc-cli turns a returning `exit` into a FailedToExitError.
        process: { exit: ((code: number) => void (exitCode = code)) as (code: number) => never },
        formatError: (error) =>
          errors.isReportedError(error)
            ? ALREADY_REPORTED
            : error instanceof Error
              ? error.message
              : String(error),
        logger: {
          error: (message) => {
            if (message !== ALREADY_REPORTED) console.error(message);
          },
        },
      });
    } catch (error) {
      exitCode = (error as { exitCode?: number }).exitCode ?? 1;
    } finally {
      await analytics.flushTelemetry();
    }

    process.exit(exitCode);
  });
}
