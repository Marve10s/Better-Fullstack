import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import path from "node:path";

type IngestedEvent = {
  eventType?: string;
  action?: string;
  status?: string;
  errorName?: string;
};

const cliEntry = path.join(import.meta.dir, "..", "src", "cli.ts");
const received: IngestedEvent[] = [];

let server: ReturnType<typeof Bun.serve>;

beforeAll(() => {
  server = Bun.serve({
    port: 0,
    async fetch(req) {
      received.push((await req.json()) as IngestedEvent);
      return new Response("ok");
    },
  });
});

afterAll(() => {
  server.stop(true);
});

describe("failure telemetry on error exits", () => {
  it("delivers the failed command event when a command exits with an error", async () => {
    const proc = Bun.spawn(
      [
        "bun",
        cliEntry,
        "create",
        "telemetry-error-probe",
        "--yes",
        "--dry-run",
        "--database",
        "postgres",
        "--orm",
        "mongoose",
      ],
      {
        env: {
          ...process.env,
          CONVEX_INGEST_URL: `http://127.0.0.1:${server.port}/ingest`,
          BTS_TELEMETRY_DISABLED: "0",
        },
        stdout: "pipe",
        stderr: "pipe",
      },
    );

    expect(await proc.exited).toBe(1);

    const failed = received.find((event) => event.action === "create" && event.status === "failed");
    expect(failed).toBeDefined();
    expect(failed?.errorName).toBe("CLIError");
  }, 120_000);
});
