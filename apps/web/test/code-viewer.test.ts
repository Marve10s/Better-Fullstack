import { describe, expect, it } from "bun:test";

import { getLanguage } from "../src/components/stack-builder/code-viewer";

describe("getLanguage", () => {
  it("maps Elixir and Phoenix template files to Elixir highlighting", () => {
    expect(getLanguage("ex")).toBe("elixir");
    expect(getLanguage("exs")).toBe("elixir");
    expect(getLanguage("eex")).toBe("elixir");
    expect(getLanguage("heex")).toBe("elixir");
  });
});
