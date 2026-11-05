import { describe, expect, it } from "bun:test";

import { OPTION_CATEGORY_METADATA } from "@/catalog/option-metadata";

const MISCASED_BRANDS =
  /\b(Tanstack|Mysql|Posthog|Github|Openapi|Typescript|Eslint|Adonisjs|Revenuecat|Mobx|Partykit|Gsap|Msw|Swr|Mcp|Npm|Pnpm)\b/;

describe("option labels", () => {
  it("keep each brand's own casing", () => {
    const miscased = Object.entries(OPTION_CATEGORY_METADATA).flatMap(([category, metadata]) =>
      metadata.options
        .filter((option) => MISCASED_BRANDS.test(option.label))
        .map((option) => `${category}.${option.id}: ${option.label}`),
    );

    expect(miscased).toEqual([]);
  });
});
