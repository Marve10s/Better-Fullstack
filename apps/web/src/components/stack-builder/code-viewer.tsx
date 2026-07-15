
import { memo, useMemo } from "react";

import type { BundledLanguage } from "@/components/ui/kibo-ui/code-block";

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/kibo-ui/code-block";
import * as m from "@/paraglide/messages";

interface CodeViewerProps {
  filePath: string;
  content: string;
  extension: string;
}

// Map generated file names and extensions to Shiki language IDs.
export function getLanguage(extension: string, filePath = ""): BundledLanguage {
  const filename = filePath.split("/").pop()?.toLowerCase() ?? "";

  if (filename === "dockerfile" || filename.startsWith("dockerfile.")) return "dockerfile";
  if (filename === ".env" || filename.startsWith(".env.")) return "dotenv";
  if (filename === "nginx.conf") return "nginx";
  if (filename === "go.mod") return "go";
  if (filename.endsWith(".gradle.kts")) return "kotlin";

  const languageMap: Record<string, BundledLanguage> = {
    ts: "typescript",
    mts: "typescript",
    cts: "typescript",
    tsx: "tsx",
    js: "javascript",
    mjs: "javascript",
    cjs: "javascript",
    jsx: "jsx",
    json: "json",
    jsonc: "jsonc",
    webmanifest: "json",
    app: "json",
    md: "markdown",
    mdoc: "markdown",
    mdx: "mdx",
    css: "css",
    scss: "scss",
    less: "less",
    html: "html",
    astro: "astro",
    vue: "vue",
    svelte: "svelte",
    yaml: "yaml",
    yml: "yaml",
    toml: "toml",
    sql: "sql",
    rs: "rust",
    go: "go",
    templ: "templ",
    py: "python",
    pyi: "python",
    mako: "jinja",
    java: "java",
    kt: "kotlin",
    kts: "kotlin",
    gradle: "groovy",
    cs: "csharp",
    csproj: "xml",
    fsproj: "xml",
    vbproj: "xml",
    props: "xml",
    targets: "xml",
    xml: "xml",
    razor: "razor",
    ex: "elixir",
    exs: "elixir",
    eex: "elixir",
    heex: "elixir",
    prisma: "prisma",
    graphql: "graphql",
    graphqls: "graphql",
    proto: "protobuf",
    esdl: "edge",
    http: "http",
    properties: "properties",
    ini: "ini",
    cfg: "ini",
    conf: "ini",
    csv: "csv",
    sh: "bash",
    bash: "bash",
    zsh: "bash",
    fish: "bash",
    env: "dotenv",
    hbs: "handlebars",
  };
  return languageMap[extension.toLowerCase()] || "text";
}

export const CodeViewer = memo(function CodeViewer({
  filePath,
  content,
  extension,
}: CodeViewerProps) {
  const language = useMemo(() => getLanguage(extension, filePath), [extension, filePath]);
  const filename = useMemo(() => filePath.split("/").pop() || filePath, [filePath]);

  const codeData = useMemo(
    () => [
      {
        language,
        filename,
        code: content,
      },
    ],
    [language, filename, content],
  );

  return (
    <div className="flex h-full flex-col overflow-hidden bg-fd-background">
      <CodeBlock
        key={filePath}
        data={codeData}
        defaultValue={language}
        className="flex flex-col h-full bg-fd-background"
      >
        <CodeBlockHeader>
          <CodeBlockFiles>
            {(item) => (
              <CodeBlockFilename key={item.language} value={item.language}>
                {filePath}
              </CodeBlockFilename>
            )}
          </CodeBlockFiles>
          <CodeBlockCopyButton />
        </CodeBlockHeader>
        <CodeBlockBody className="flex-1 overflow-auto [&_.shiki]:bg-fd-background! dark:[&_.shiki]:bg-fd-background! bg-fd-background">
          {(item) => (
            <CodeBlockItem key={item.language} value={item.language}>
              <CodeBlockContent
                language={item.language as BundledLanguage}
                themes={{
                  light: "catppuccin-latte",
                  dark: "catppuccin-mocha",
                }}
                className="bg-fd-background"
              >
                {item.code}
              </CodeBlockContent>
            </CodeBlockItem>
          )}
        </CodeBlockBody>
      </CodeBlock>
    </div>
  );
});

interface EmptyStateProps {
  message?: string;
}

export function CodeViewerEmpty({
  message = m.builderSelectFileToView(),
}: EmptyStateProps) {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      <p className="text-sm">{message}</p>
    </div>
  );
}
