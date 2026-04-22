import { describe, expect, it } from "bun:test";

import { processEnvVariables } from "../../src/processors/env-vars";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getEnvVars } from "../_fixtures/vfs-factory";

function countMatchingLines(content: string, prefix: string): number {
  return content.split("\n").filter((line) => line.startsWith(prefix)).length;
}

describe("processEnvVariables", () => {
  it("writes prefixed client env vars and separate server vars for Vite-style apps", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processEnvVariables(
      vfs,
      makeConfig({
        frontend: ["react-router"],
        backend: "hono",
        payments: "stripe",
      }),
    );

    const webEnv = getEnvVars(vfs, "apps/web/.env");
    const serverEnv = getEnvVars(vfs, "apps/server/.env");

    expect(webEnv.VITE_SERVER_URL).toBe("http://localhost:3000");
    expect(webEnv.VITE_STRIPE_PUBLISHABLE_KEY).toBe("");
    expect(serverEnv.STRIPE_SECRET_KEY).toBe("");
    expect(serverEnv.CORS_ORIGIN).toBe("http://localhost:5173");
  });

  it("writes self-backend server vars into the web env without a public server url", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processEnvVariables(
      vfs,
      makeConfig({
        frontend: ["next"],
        backend: "self",
        auth: "better-auth",
      }),
    );

    const webEnv = getEnvVars(vfs, "apps/web/.env");

    expect(webEnv.BETTER_AUTH_URL).toBe("http://localhost:3001");
    expect(webEnv.BETTER_AUTH_SECRET).toMatch(/^[A-Za-z0-9]{32}$/);
    expect(webEnv.CORS_ORIGIN).toBe("http://localhost:3001");
    expect(webEnv.NEXT_PUBLIC_SERVER_URL).toBeUndefined();
  });

  it("writes convex web and backend env files with frontend-specific prefixes", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "packages/backend/package.json"]);

    processEnvVariables(
      vfs,
      makeConfig({
        backend: "convex",
        frontend: ["svelte"],
        auth: "better-auth",
        examples: ["ai"],
      }),
    );

    const webEnv = getEnvVars(vfs, "apps/web/.env");
    const backendContent = vfs.readFile("packages/backend/.env.local") ?? "";
    const backendEnv = getEnvVars(vfs, "packages/backend/.env.local");

    expect(webEnv.PUBLIC_CONVEX_URL).toBe("https://your-convex-url.convex.cloud");
    expect(backendEnv.VITE_CONVEX_SITE_URL).toBe("");
    expect(backendContent).toContain("# Set Google AI API key for AI agent");
    expect(backendContent).toContain("# Set Convex environment variables");
    expect(backendEnv.GOOGLE_GENERATIVE_AI_API_KEY).toBe("");
    expect(backendEnv.SITE_URL).toBe("http://localhost:3001");
  });

  it("adds payload env vars only for Next.js and writes infra envs for Cloudflare deploys", () => {
    const nextVfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);
    const reactVfs = createSeededVFS([
      "apps/web/package.json",
      "apps/server/package.json",
      "packages/infra/package.json",
    ]);

    processEnvVariables(
      nextVfs,
      makeConfig({
        frontend: ["next"],
        cms: "payload",
      }),
    );
    processEnvVariables(
      reactVfs,
      makeConfig({
        frontend: ["react-router"],
        cms: "payload",
        webDeploy: "cloudflare",
      }),
    );

    expect(getEnvVars(nextVfs, "apps/web/.env").PAYLOAD_SECRET).toMatch(/^[A-Za-z0-9]{32}$/);
    expect(getEnvVars(reactVfs, "apps/web/.env").PAYLOAD_SECRET).toBeUndefined();
    expect(getEnvVars(reactVfs, "packages/infra/.env").ALCHEMY_PASSWORD).toBe(
      "please-change-this",
    );
  });

  it("writes chat-sdk example vars for supported branches", () => {
    const slackSelf = createSeededVFS(["apps/web/package.json"]);
    const githubHono = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processEnvVariables(
      slackSelf,
      makeConfig({
        backend: "self",
        frontend: ["next"],
        examples: ["chat-sdk"],
      }),
    );
    processEnvVariables(
      githubHono,
      makeConfig({
        backend: "hono",
        runtime: "node",
        frontend: ["react-router"],
        examples: ["chat-sdk"],
      }),
    );

    const slackEnv = getEnvVars(slackSelf, "apps/web/.env");
    const githubEnv = getEnvVars(githubHono, "apps/server/.env");

    expect(slackEnv.SLACK_BOT_TOKEN).toBe("xoxb-your-bot-token");
    expect(slackEnv.BOT_USERNAME).toBe("mybot");
    expect(githubEnv.GITHUB_TOKEN).toBe("ghp_your_personal_access_token");
    expect(githubEnv.BOT_USERNAME).toBe("my-review-bot");
  });

  it("updates existing env files without duplicating keys on repeated runs", () => {
    const vfs = createSeededVFS(["apps/server/package.json"]);
    vfs.writeFile("apps/server/.env", "CORS_ORIGIN=http://old.example\n");

    const config = makeConfig({
      frontend: ["react-router"],
      backend: "hono",
      auth: "better-auth",
    });

    processEnvVariables(vfs, config);
    processEnvVariables(vfs, config);

    const content = vfs.readFile("apps/server/.env") ?? "";
    const env = getEnvVars(vfs, "apps/server/.env");

    expect(env.CORS_ORIGIN).toBe("http://localhost:5173");
    expect(env.BETTER_AUTH_SECRET).toMatch(/^[A-Za-z0-9]{32}$/);
    expect(countMatchingLines(content, "CORS_ORIGIN=")).toBe(1);
    expect(countMatchingLines(content, "BETTER_AUTH_SECRET=")).toBe(1);
  });

  it("writes stable database URLs and Sanity API version formatting", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processEnvVariables(
      vfs,
      makeConfig({
        frontend: ["next"],
        backend: "hono",
        database: "sqlite",
        runtime: "workers",
        webDeploy: "cloudflare",
        cms: "sanity",
      }),
    );

    const serverEnv = getEnvVars(vfs, "apps/server/.env");
    const webEnv = getEnvVars(vfs, "apps/web/.env");

    expect(serverEnv.DATABASE_URL).toBe("http://127.0.0.1:8080");
    expect(webEnv.NEXT_PUBLIC_SANITY_API_VERSION).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
