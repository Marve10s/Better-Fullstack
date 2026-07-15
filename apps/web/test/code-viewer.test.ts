import { describe, expect, it } from "bun:test";

import { getLanguage } from "../src/components/stack-builder/code-viewer";

describe("getLanguage", () => {
  it.each([
    ["src/main.rs", "rs", "rust"],
    ["cmd/server/main.go", "go", "go"],
    ["app/main.py", "py", "python"],
    ["src/Main.java", "java", "java"],
    ["src/Application.kt", "kt", "kotlin"],
    ["Api/Program.cs", "cs", "csharp"],
    ["lib/app.ex", "ex", "elixir"],
    ["lib/app_web/live/index.html.heex", "heex", "elixir"],
  ])("maps %s to %s highlighting", (filePath, extension, language) => {
    expect(getLanguage(extension, filePath)).toBe(language);
  });

  it.each([
    ["Dockerfile", "", "dockerfile"],
    ["Dockerfile.vite", "vite", "dockerfile"],
    [".env.local", "local", "dotenv"],
    ["server.csproj", "csproj", "xml"],
    ["build.gradle.kts", "kts", "kotlin"],
    ["nginx.conf", "conf", "nginx"],
    ["go.mod", "mod", "go"],
  ])("recognizes special generated file %s", (filePath, extension, language) => {
    expect(getLanguage(extension, filePath)).toBe(language);
  });
});
