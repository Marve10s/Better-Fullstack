import { Link, useMatchRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ClipboardCopy, Github } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { parseStackFromUrlRecord } from "@/lib/stack-url-state.shared";
import { generateStackCommand } from "@/lib/stack-utils";

const BUILDER_COMMAND_SEARCH = { view: "command", file: "" } as const;
const BUILDER_PRESETS_SEARCH = { view: "presets", file: "" } as const;
const DOCS_ACTIVE_OPTIONS = { includeSearch: false } as const;
const DOCS_ACTIVE_PROPS = { className: "active" } as const;

const NAV_LINK_CLASS =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground sm:text-[12px]";

// On the builder page the "Try now" CTA (which links to /new) is redundant, so it
// becomes a Copy button. The builder syncs the live stack to the URL via
// replaceState, so we read it at click-time and regenerate the same command.
function HeaderCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const record: Record<string, string | string[]> = {};
      for (const key of sp.keys()) {
        if (key in record) continue;
        const values = sp.getAll(key);
        record[key] = values.length > 1 ? values : (values[0] ?? "");
      }
      const stack = parseStackFromUrlRecord(record);
      await navigator.clipboard.writeText(generateStackCommand(stack));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — no-op
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Command copied" : "Copy install command"}
      className="inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#d2ee72] sm:px-4 sm:py-2 sm:text-[12px]"
    >
      {copied ? (
        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      ) : (
        <ClipboardCopy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function Navbar() {
  const matchRoute = useMatchRoute();
  const onBuilder = Boolean(matchRoute({ to: "/new" }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="container mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5 sm:gap-7">
          <Link
            to="/"
            className="flex items-center font-mono text-sm font-bold tracking-[-0.02em] text-foreground sm:text-base"
            aria-label="Better Fullstack home"
          >
            <span className="sm:hidden">
              b<span className="text-muted-foreground">/</span>f
            </span>
            <span className="hidden sm:inline">
              better<span className="text-muted-foreground">/</span>fullstack
            </span>
          </Link>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <div className="hidden items-center gap-5 sm:flex sm:gap-7">
            <Link
              to="/new"
              search={BUILDER_COMMAND_SEARCH}
              className={NAV_LINK_CLASS}
              activeProps={DOCS_ACTIVE_PROPS}
            >
              Builder
            </Link>
            <Link
              to="/new"
              search={BUILDER_PRESETS_SEARCH}
              className={NAV_LINK_CLASS}
              activeProps={DOCS_ACTIVE_PROPS}
            >
              Presets
            </Link>
            <Link to="/mcp" className={NAV_LINK_CLASS} activeProps={DOCS_ACTIVE_PROPS}>
              MCP
            </Link>
            <Link
              to="/docs"
              activeOptions={DOCS_ACTIVE_OPTIONS}
              className={NAV_LINK_CLASS}
              activeProps={DOCS_ACTIVE_PROPS}
            >
              Docs
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/Marve10s/Better-Fullstack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          {onBuilder ? (
            <HeaderCopyButton />
          ) : (
            <Link
              to="/new"
              search={BUILDER_COMMAND_SEARCH}
              className="group inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all hover:gap-2 hover:bg-[#d2ee72] sm:px-4 sm:py-2 sm:text-[12px]"
            >
              Try now
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
