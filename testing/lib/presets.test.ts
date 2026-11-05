import { getPresetCombos, listPresetGroupIds } from "@testing/lib/presets";
import { describe, expect, it } from "bun:test";

const PR_CORE_PRESET_NAMES = [
  "preset-tanstack-fullstack",
  "preset-t3",
  "preset-react-hono",
  "preset-astro-sanity",
  "preset-version-channel-latest",
  "preset-rust-axum-seaorm",
  "preset-python-fastapi-sqlalchemy",
  "preset-go-gin-gorm",
  "preset-java-spring-maven",
  "preset-elixir-plain-worker",
  "preset-native-uniwind-trpc",
  "preset-frontend-only-react-vite",
  "preset-hono-node-prisma-docker",
];

const PR_BROAD_PRESET_NAMES = [
  "preset-ruby-sinatra",
  "preset-nextjs-minimal",
  "preset-next-payload",
  "preset-sveltekit",
  "preset-nuxt-fullstack",
  "preset-react-router-hono",
  "preset-tanstack-start-fullstack",
  "preset-ai-search-workbench",
  "preset-rust-actix-sqlx",
  "preset-python-django-langchain",
  "preset-python-elasticsearch",
  "preset-python-library-expansion-primary",
  "preset-go-echo-sqlc",
  "preset-go-stdlib-bun-bleve",
  "preset-go-library-expansion-primary",
  "preset-go-library-expansion-connect",
  "preset-go-library-expansion-openapi",
  "preset-java-spring-gradle-jpa",
  "preset-java-plain-cli",
  "preset-java-spring-log4j2",
  "preset-java-library-expansion-maven",
  "preset-java-library-expansion-gradle",
  "preset-elixir-phoenix-api",
  "preset-dotnet-minimal-efcore",
  "preset-dotnet-library-expansion-primary",
  "preset-react-native-library-expansion-primary",
  "preset-react-vite-hono",
  "preset-solid-start-express",
  "preset-angular-fets",
  "preset-vinext-minimal",
  "preset-vinext-basic",
  "preset-vite-plus-toolchain",
];

describe("preset groups", () => {
  it("lists the supported preset group ids", () => {
    expect(listPresetGroupIds()).toEqual(["pr-core", "pr-broad", "all"]);
  });

  it("resolves pr-core deterministically", () => {
    expect(getPresetCombos("pr-core").map((combo) => combo.name)).toEqual(PR_CORE_PRESET_NAMES);
  });

  it("resolves pr-broad deterministically", () => {
    expect(getPresetCombos("pr-broad").map((combo) => combo.name)).toEqual(PR_BROAD_PRESET_NAMES);
  });

  it("resolves all as the ordered union of pr-core and pr-broad", () => {
    expect(getPresetCombos("all").map((combo) => combo.name)).toEqual([
      ...PR_CORE_PRESET_NAMES,
      ...PR_BROAD_PRESET_NAMES,
    ]);
  });

  it("partitions a preset group into disjoint shards covering the whole group", () => {
    const shardNames = [0, 1, 2].map((index) =>
      getPresetCombos("pr-broad", { index, total: 3 }).map((combo) => combo.name),
    );

    expect(shardNames.flat().sort()).toEqual([...PR_BROAD_PRESET_NAMES].sort());
    expect(new Set(shardNames.flat()).size).toBe(PR_BROAD_PRESET_NAMES.length);
    for (const names of shardNames) {
      expect(Math.abs(names.length - PR_BROAD_PRESET_NAMES.length / 3)).toBeLessThan(1);
    }
  });

  it("renders complete CLI commands for all presets", () => {
    for (const combo of getPresetCombos("all")) {
      expect(combo.command).not.toContain(" undefined");
    }
  });

  it("keeps the Elixir core smoke preset on the compiling cache backend", () => {
    const combo = getPresetCombos("pr-core").find(
      (candidate) => candidate.name === "preset-elixir-plain-worker",
    );

    expect(combo?.command).toContain("--elixir-caching nebulex");
  });

  it("creates the native tRPC preset with its server and verifies it as React Native", () => {
    const combo = getPresetCombos("pr-core").find(
      (candidate) => candidate.name === "preset-native-uniwind-trpc",
    );

    expect(combo?.ecosystem).toBe("react-native");
    for (const flag of [
      "--ecosystem typescript",
      "--frontend native-uniwind",
      "--backend hono",
      "--runtime bun",
      "--database sqlite",
      "--orm drizzle",
      "--auth better-auth",
      "--api trpc",
    ]) {
      expect(combo?.command).toContain(flag);
    }
  });
});
