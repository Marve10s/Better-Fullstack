import { describe, expect, it } from "bun:test";

import { getPresetCombos, listPresetGroupIds } from "./presets";

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
  "preset-frontend-only-react-vite",
];

const PR_BROAD_PRESET_NAMES = [
  "preset-nextjs-minimal",
  "preset-next-payload",
  "preset-sveltekit",
  "preset-nuxt-fullstack",
  "preset-react-router-hono",
  "preset-tanstack-start-fullstack",
  "preset-rust-actix-sqlx",
  "preset-python-django-langchain",
  "preset-go-echo-sqlc",
  "preset-java-spring-gradle-jpa",
  "preset-java-plain-cli",
  "preset-react-vite-hono",
  "preset-solid-start-express",
  "preset-angular-fets",
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
});
