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

    expect(webEnv.PUBLIC_CONVEX_URL).toBe("https://<YOUR_CONVEX_URL>");
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

  it("writes self-hosted auth env vars for NextAuth, Stack Auth, and Supabase Auth", () => {
    const nextauthVfs = createSeededVFS(["apps/web/package.json"]);
    const stackAuthVfs = createSeededVFS(["apps/web/package.json"]);
    const supabaseVfs = createSeededVFS(["apps/web/package.json"]);

    processEnvVariables(
      nextauthVfs,
      makeConfig({
        frontend: ["next"],
        backend: "self",
        auth: "nextauth",
      }),
    );
    processEnvVariables(
      stackAuthVfs,
      makeConfig({
        frontend: ["next"],
        backend: "self",
        auth: "stack-auth",
      }),
    );
    processEnvVariables(
      supabaseVfs,
      makeConfig({
        frontend: ["next"],
        backend: "self",
        auth: "supabase-auth",
      }),
    );

    const nextauthEnv = getEnvVars(nextauthVfs, "apps/web/.env");
    const stackEnv = getEnvVars(stackAuthVfs, "apps/web/.env");
    const supabaseEnv = getEnvVars(supabaseVfs, "apps/web/.env");

    expect(nextauthEnv.AUTH_SECRET).toMatch(/^[A-Za-z0-9]{32}$/);
    expect(nextauthEnv.AUTH_TRUST_HOST).toBe("true");
    expect(nextauthEnv.AUTH_GITHUB_ID).toBe("");
    expect(nextauthEnv.AUTH_GOOGLE_SECRET).toBe("");

    expect(stackEnv.NEXT_PUBLIC_STACK_PROJECT_ID).toBe("");
    expect(stackEnv.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY).toBe("");
    expect(stackEnv.STACK_SECRET_SERVER_KEY).toBe("");

    expect(supabaseEnv.NEXT_PUBLIC_SUPABASE_URL).toBe("");
    expect(supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("");
    expect(supabaseEnv.SUPABASE_SERVICE_ROLE_KEY).toBe("");
  });

  it("writes Clerk env vars for convex Next.js and self-hosted TanStack Start", () => {
    const convexNext = createSeededVFS(["apps/web/package.json"]);
    const selfTanstackStart = createSeededVFS(["apps/web/package.json"]);

    processEnvVariables(
      convexNext,
      makeConfig({
        frontend: ["next"],
        backend: "convex",
        auth: "clerk",
      }),
    );
    processEnvVariables(
      selfTanstackStart,
      makeConfig({
        frontend: ["tanstack-start"],
        backend: "self",
        auth: "clerk",
      }),
    );

    const convexEnv = getEnvVars(convexNext, "apps/web/.env");
    const selfEnv = getEnvVars(selfTanstackStart, "apps/web/.env");

    expect(convexEnv.NEXT_PUBLIC_CONVEX_URL).toBe("https://<YOUR_CONVEX_URL>");
    expect(convexEnv.NEXT_PUBLIC_CLERK_FRONTEND_API_URL).toBe("");
    expect(convexEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).toBe("");
    expect(convexEnv.CLERK_SECRET_KEY).toBe("");

    expect(selfEnv.VITE_CLERK_PUBLISHABLE_KEY).toBe("");
    expect(selfEnv.CLERK_SECRET_KEY).toBe("");
    expect(selfEnv.VITE_SERVER_URL).toBeUndefined();
  });

  it("writes analytics and feature-flag env vars with framework-specific prefixes", () => {
    const nextPlausible = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);
    const nuxtGrowthbook = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);
    const sveltePosthogUmami = createSeededVFS([
      "apps/web/package.json",
      "apps/server/package.json",
    ]);

    processEnvVariables(
      nextPlausible,
      makeConfig({
        frontend: ["next"],
        backend: "hono",
        analytics: "plausible",
      }),
    );
    processEnvVariables(
      nuxtGrowthbook,
      makeConfig({
        frontend: ["nuxt"],
        backend: "hono",
        featureFlags: "growthbook",
      }),
    );
    processEnvVariables(
      sveltePosthogUmami,
      makeConfig({
        frontend: ["svelte"],
        backend: "hono",
        analytics: "umami",
        featureFlags: "posthog",
      }),
    );

    const nextEnv = getEnvVars(nextPlausible, "apps/web/.env");
    const nuxtEnv = getEnvVars(nuxtGrowthbook, "apps/web/.env");
    const svelteEnv = getEnvVars(sveltePosthogUmami, "apps/web/.env");

    expect(nextEnv.NEXT_PUBLIC_PLAUSIBLE_DOMAIN).toBe("");
    expect(nextEnv.NEXT_PUBLIC_PLAUSIBLE_API_HOST).toBe("https://plausible.io");

    expect(nuxtEnv.NUXT_PUBLIC_GROWTHBOOK_API_HOST).toBe("https://cdn.growthbook.io");
    expect(nuxtEnv.NUXT_PUBLIC_GROWTHBOOK_CLIENT_KEY).toBe("");

    expect(svelteEnv.PUBLIC_UMAMI_WEBSITE_ID).toBe("");
    expect(svelteEnv.PUBLIC_UMAMI_SCRIPT_URL).toBe("https://cloud.umami.is/script.js");
    expect(svelteEnv.PUBLIC_POSTHOG_KEY).toBe("");
    expect(svelteEnv.PUBLIC_POSTHOG_HOST).toBe("https://us.i.posthog.com");
  });

  it("writes server env vars for email, observability, queues, caching, search, and storage providers", () => {
    const sentryTemporal = createSeededVFS(["apps/server/package.json"]);
    const grafanaBullmq = createSeededVFS(["apps/server/package.json"]);
    const otelInngest = createSeededVFS(["apps/server/package.json"]);

    processEnvVariables(
      sentryTemporal,
      makeConfig({
        frontend: ["react-router"],
        backend: "hono",
        email: "aws-ses",
        observability: "sentry",
        jobQueue: "temporal",
        caching: "upstash-redis",
        search: "elasticsearch",
        fileStorage: "r2",
      }),
    );
    processEnvVariables(
      grafanaBullmq,
      makeConfig({
        frontend: ["react-router"],
        backend: "hono",
        email: "nodemailer",
        observability: "grafana",
        jobQueue: "bullmq",
        search: "typesense",
        fileStorage: "s3",
      }),
    );
    processEnvVariables(
      otelInngest,
      makeConfig({
        frontend: ["react-router"],
        backend: "hono",
        email: "mailgun",
        observability: "opentelemetry",
        jobQueue: "inngest",
        search: "algolia",
      }),
    );

    const sentryEnv = getEnvVars(sentryTemporal, "apps/server/.env");
    const grafanaEnv = getEnvVars(grafanaBullmq, "apps/server/.env");
    const otelEnv = getEnvVars(otelInngest, "apps/server/.env");

    expect(sentryEnv.AWS_REGION).toBe("us-east-1");
    expect(sentryEnv.SENTRY_DSN).toBe("");
    expect(sentryEnv.TEMPORAL_ADDRESS).toBe("localhost:7233");
    expect(sentryEnv.UPSTASH_REDIS_REST_URL).toBe("");
    expect(sentryEnv.ELASTICSEARCH_NODE).toBe("http://localhost:9200");
    expect(sentryEnv.R2_BUCKET_NAME).toBe("");

    expect(grafanaEnv.SMTP_HOST).toBe("smtp.ethereal.email");
    expect(grafanaEnv.METRICS_PORT).toBe("9090");
    expect(grafanaEnv.REDIS_HOST).toBe("localhost");
    expect(grafanaEnv.TYPESENSE_PORT).toBe("8108");
    expect(grafanaEnv.AWS_S3_BUCKET_NAME).toBe("");

    expect(otelEnv.MAILGUN_API_KEY).toBe("");
    expect(otelEnv.OTEL_SERVICE_NAME).toBe("");
    expect(otelEnv.INNGEST_EVENT_KEY).toBe("");
    expect(otelEnv.ALGOLIA_APP_ID).toBe("");
  });

  it("writes the Discord Chat SDK example env vars for Nuxt self-backend projects", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processEnvVariables(
      vfs,
      makeConfig({
        backend: "self",
        frontend: ["nuxt"],
        examples: ["chat-sdk"],
      }),
    );

    const env = getEnvVars(vfs, "apps/web/.env");

    expect(env.DISCORD_BOT_TOKEN).toBe("");
    expect(env.DISCORD_PUBLIC_KEY).toBe("");
    expect(env.DISCORD_APPLICATION_ID).toBe("");
    expect(env.ANTHROPIC_API_KEY).toBe("");
    expect(env.NUXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
  });
});
