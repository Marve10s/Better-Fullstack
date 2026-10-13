import { checkStaticAssets } from "@test/e2e/e2e-utils";
import { describe, expect, it } from "bun:test";

describe("generated frontend asset checks", () => {
  it("allows cold CSS compilation to finish before the asset deadline", async () => {
    const server = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      idleTimeout: 30,
      async fetch() {
        await Bun.sleep(11_000);
        return new Response("body { color: black; }", {
          headers: { "Content-Type": "text/css" },
        });
      },
    });

    try {
      const result = await checkStaticAssets(server.url.toString(), '<link href="/styles.css">');
      expect(result).toEqual({ ok: true, checked: 1, failed: [] });
    } finally {
      await server.stop(true);
    }
  }, 15_000);

  it("still fails when a generated stylesheet is missing", async () => {
    const server = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      fetch() {
        return new Response(null, { status: 404 });
      },
    });

    try {
      const result = await checkStaticAssets(server.url.toString(), '<link href="/missing.css">');
      expect(result).toEqual({
        ok: false,
        checked: 1,
        failed: [{ url: new URL("/missing.css", server.url).toString(), status: 404 }],
      });
    } finally {
      await server.stop(true);
    }
  });

  it("reports every stalled asset within one overall deadline", async () => {
    const server = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      fetch() {
        return new Promise<Response>(() => {});
      },
    });
    const html = Array.from({ length: 8 }, (_, index) => `<link href="/${index}.css">`).join("");

    try {
      const started = performance.now();
      const result = await checkStaticAssets(server.url.toString(), html, { timeout: 200 });
      const elapsed = performance.now() - started;
      expect(result.ok).toBe(false);
      expect(result.checked).toBe(8);
      expect(result.failed).toHaveLength(8);
      expect(elapsed).toBeLessThan(1_000);
    } finally {
      await server.stop(true);
    }
  });
});
