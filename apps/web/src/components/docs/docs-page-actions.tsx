import { Check, ChevronDown, Copy, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";

const GITHUB_BRANCH = "docs";
const GITHUB_DOCS_BASE = `https://github.com/Marve10s/Better-Fullstack/blob/${GITHUB_BRANCH}/apps/web/content/docs`;
const RAW_DOCS_BASE = `https://raw.githubusercontent.com/Marve10s/Better-Fullstack/${GITHUB_BRANCH}/apps/web/content/docs`;

export type DocsPageActionsProps = {
  path: string;
  markdown: string;
};

function encodePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export function DocsPageActions({ path, markdown }: DocsPageActionsProps) {
  const [copied, setCopied] = useState(false);
  const encodedPath = encodePath(path);
  const githubUrl = `${GITHUB_DOCS_BASE}/${encodedPath}`;
  const rawUrl = `${RAW_DOCS_BASE}/${encodedPath}`;

  const copyMarkdown = () => {
    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      })
      .catch(() => {
        setCopied(false);
      });
  };

  return (
    <div className="relative inline-flex items-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
      <button
        type="button"
        onClick={copyMarkdown}
        className="inline-flex h-8 items-center gap-1.5 px-2.5 font-mono text-[0.7rem]"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy MD"}
      </button>
      <details className="group">
        <summary className="flex h-8 cursor-pointer list-none items-center border-border border-l px-2 [&::-webkit-details-marker]:hidden">
          <span className="sr-only">Open documentation actions</span>
          <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
        </summary>
        <div className="absolute top-9 right-0 z-20 min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg">
          <a
            href={rawUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-sm px-2.5 py-2 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FileText className="size-3.5" />
            Raw MDX
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-sm px-2.5 py-2 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
            Open on GitHub
          </a>
        </div>
      </details>
    </div>
  );
}
