import { makeConfig } from "@test/_fixtures/config-factory";
import { createSeededVFS } from "@test/_fixtures/vfs-factory";
import { describe, expect, it } from "bun:test";

import { loadTemplates } from "@/core/template-reader";
import { dependencyVersionMap } from "@/dependencies/add-deps";
import { processBackendDeps } from "@/processors/dependencies/backend-deps";
import { processBackendTemplates } from "@/template-handlers/core/backend";

const recipe = makeConfig({
  frontend: ["none"],
  backend: "effect",
  api: "none",
  auth: "none",
  database: "none",
  orm: "none",
  testing: "none",
});

async function generate(overrides: Parameters<typeof makeConfig>[0] = {}) {
  const config = makeConfig({ ...recipe, ...overrides });
  const vfs = createSeededVFS();
  await processBackendTemplates(vfs, await loadTemplates("backend/server"), config);
  processBackendDeps(vfs, config);
  return vfs;
}

describe("Effect HttpApi recipe", () => {
  it.each(["bun", "node"] as const)("mounts a typed HttpApi and scoped %s launcher", async (runtime) => {
    const vfs = await generate({ runtime });
    const api = vfs.readFile("apps/server/src/http-api.ts");
    expect(api).toContain('HttpApiGroup.make("health")');
    expect(api).toContain('HttpApiEndpoint.get("check", "/health")');
    expect(api).toContain(".addError(HealthUnavailable, { status: 503 })");
    expect(api).toContain('HttpApiBuilder.group(Api, "health"');
    expect(api).toContain("return yield* health.check");
    expect(vfs.readFile("apps/server/src/health.ts")).toContain("Schema.TaggedError<HealthUnavailable>");
    const app = vfs.readFile("apps/server/src/app.ts");
    expect(app).toContain("HttpApiBuilder.api(Api)");
    expect(app).toContain("Layer.provide(healthLayer)");
    expect(app).toContain("HttpApiBuilder.toWebHandler(");
    expect(app).toContain('app.all("*", (c) => handler(c.req.raw))');
    expect(app).toContain('new Request(new URL("/health", c.req.url).toString(), c.req.raw)');
    const server = vfs.readFile("apps/server/src/server.ts");
    expect(server).toContain("Effect.acquireRelease(");
    expect(server).toContain("({ dispose }) => Effect.promise(dispose)");
    expect(server).toContain("HttpServer.serveEffect(HttpApp.fromWebHandler(fetch))");
    const entry = vfs.readFile("apps/server/src/index.ts");
    const platform = runtime === "bun" ? "Bun" : "Node";
    expect(entry).toContain(`${platform}HttpServer.layer(`);
    expect(entry).toContain(`${platform}Runtime.runMain`);
    expect(entry).not.toContain("runHealth");
    const pkg = vfs.readJson<{ dependencies: Record<string, string> }>("apps/server/package.json");
    expect(pkg?.dependencies.effect).toBe(dependencyVersionMap.effect);
    expect(pkg?.dependencies["@effect/platform"]).toBe(dependencyVersionMap["@effect/platform"]);
    expect(pkg?.dependencies[`@effect/platform-${runtime}`]).toBeDefined();
  });

  it.each(["trpc", "orpc", "openapi", "apollo-server", "graphql-yoga", "garph"] as const)("preserves the %s Hono entry", async (api) => {
    const vfs = await generate({ api });
    const entry = vfs.readFile("apps/server/src/index.ts");
    expect(entry).toContain("const app = new Hono()");
    expect(entry).toContain("return c.json(await runHealth())");
    expect(entry).not.toContain("makeServer");
    expect(vfs.exists("apps/server/src/http-api.ts")).toBe(false);
    expect(vfs.exists("apps/server/src/app.ts")).toBe(false);
    expect(vfs.exists("apps/server/src/server.ts")).toBe(false);
    if (api === "trpc") expect(entry).toContain('"/trpc/*"');
    if (api === "orpc") expect(entry).toContain('prefix: "/rpc"');
    if (api === "openapi") expect(entry).toContain("openApiApp.openapi(healthRoute");
    if (api === "apollo-server") expect(entry).toContain("executeApolloRequest(c.req.raw)");
  });

  it("preserves the existing authenticated entry", async () => {
    const vfs = await generate({ runtime: "node", auth: "better-auth", serverDeploy: "netlify" });
    const entry = vfs.readFile("apps/server/src/index.ts");
    expect(entry).toContain('app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))');
    expect(entry).toContain("credentials: true");
    expect(entry).not.toContain("makeServer");
    expect(vfs.exists("apps/server/src/http-api.ts")).toBe(false);
  });

  it("keeps CORS and disposes serverless requests", async () => {
    const vfs = await generate({ runtime: "node", serverDeploy: "netlify", observability: "signoz" });
    expect(vfs.readFile("apps/server/src/app.ts")).toContain("origin: env.CORS_ORIGIN");
    const entry = vfs.readFile("apps/server/src/index.ts");
    expect(entry).toContain("finally {\n\t\tawait dispose()");
    expect(entry).toContain("fetch: withTracing(fetch)");
    expect(entry).not.toContain("runMain");
  });

  it.each(["docker", "fly", "railway", "render"] as const)("keeps the native server lifecycle for %s", async (serverDeploy) => {
    const vfs = await generate({ serverDeploy });
    expect(vfs.readFile("apps/server/src/index.ts")).toContain("BunRuntime.runMain");
    expect(vfs.readFile("apps/server/src/server.ts")).toContain("Effect.acquireRelease(");
  });

  it.each(["vercel", "sst"] as const)("retains the existing fetch entry for %s", async (serverDeploy) => {
    const vfs = await generate({ serverDeploy, runtime: "bun" });
    expect(vfs.readFile("apps/server/src/index.ts")).toContain("export default app;");
    expect(vfs.readFile("apps/server/src/index.ts")).not.toContain("makeServer");
    expect(vfs.exists("apps/server/src/http-api.ts")).toBe(false);
  });

  it.each([{ runtime: "workers" }, { backend: "hono" }] as const)("does not emit the recipe for %j", async (overrides) => {
    const vfs = await generate(overrides);
    expect(vfs.exists("apps/server/src/http-api.ts")).toBe(false);
    expect(vfs.exists("apps/server/src/health.ts")).toBe(false);
  });
});
