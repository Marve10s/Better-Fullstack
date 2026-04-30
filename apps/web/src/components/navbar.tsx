import { Link } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

const BUILDER_COMMAND_SEARCH = { view: "command", file: "" } as const;
const BUILDER_PRESETS_SEARCH = { view: "presets", file: "" } as const;
const DOCS_ACTIVE_OPTIONS = { includeSearch: false } as const;
const DOCS_ACTIVE_PROPS = { className: "active" } as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-base font-bold tracking-tight sm:text-lg"
          >
            <span className="sm:hidden">b<span className="text-muted-foreground">-f</span></span>
            <span className="hidden sm:inline">better<span className="text-muted-foreground">fullstack</span></span>
          </Link>
          <Link
            to="/new"
            search={BUILDER_COMMAND_SEARCH}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            Builder
          </Link>
          <Link
            to="/new"
            search={BUILDER_PRESETS_SEARCH}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            Presets
          </Link>
          <Link
            to="/mcp"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            MCP
          </Link>
          <Link
            to="/docs"
            activeOptions={DOCS_ACTIVE_OPTIONS}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm [&.active]:text-foreground"
            activeProps={DOCS_ACTIVE_PROPS}
          >
            Docs
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
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
            <Link
              to="/new"
              search={BUILDER_COMMAND_SEARCH}
              className="inline-flex items-center gap-1 rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:gap-1.5 sm:px-3 sm:text-sm"
            >
              Try now
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
