import { Link, useMatchRoute, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, ClipboardCopy, Github } from "lucide-react";
import { motion, LayoutGroup } from "motion/react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  ChromeButton,
  CREATION_MODE_INDICATOR_ID,
  CREATION_MODE_INDICATOR_TRANSITION,
} from "@/components/ui/chrome-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HandDrawnNewCallout } from "@/components/ui/hand-drawn-new-callout";
import { type BuilderMode, useBuilderMode } from "@/lib/builder-mode-bridge";
import { isStackShareSlug } from "@/lib/stack-share-slugs";
import { cn } from "@/lib/utils";

const BUILDER_COMMAND_SEARCH = { view: "command", file: "" } as const;
const BUILDER_PRESETS_SEARCH = { view: "presets", file: "" } as const;
const DOCS_ACTIVE_OPTIONS = { includeSearch: false } as const;
const DOCS_ACTIVE_PROPS = { className: "active" } as const;

const NAV_LINK_CLASS =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground sm:text-[12px]";

function getFirstPathSegment(pathname: string): string {
  return pathname.split("/").find(Boolean) ?? "";
}

// On the builder page the "Try now" CTA (which links to /new) is redundant, so it
// becomes a Copy button. The builder syncs the live stack to the URL via
// replaceState, so we read it at click-time and regenerate the same command.
function HeaderCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Loaded at click time: these pull in the stack-translation +
      // compatibility bundle, which must stay out of the app entry chunk.
      const [{ parseStackSelectionFromUrlRecord: parseStackFromUrlRecord }, { parseStackShareSlug }, { generateStackCommand }] =
        await Promise.all([
          import("@better-fullstack/types/stack-translation"),
          import("@/lib/stack-share-paths"),
          import("@/lib/stack-utils"),
        ]);
      const sp = new URLSearchParams(window.location.search);
      const record: Record<string, string | string[]> = {};
      for (const key of sp.keys()) {
        if (key in record) continue;
        const values = sp.getAll(key);
        record[key] = values.length > 1 ? values : (values[0] ?? "");
      }
      const pathSlug = getFirstPathSegment(window.location.pathname);
      const stack =
        sp.size === 0 && pathSlug ? parseStackShareSlug(pathSlug) : parseStackFromUrlRecord(record);
      if (!stack) return;
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

// The builder's creation-mode switch, rendered in the header on the builder
// page. State lives in the StackBuilder and is bridged here via useBuilderMode.
const TOGGLE_SEGMENT_CLASS =
  "relative cursor-pointer rounded-full px-4 py-1.5 text-center text-xs font-medium transition-[color,background-color,box-shadow] duration-300 ease-in-out sm:px-5 sm:py-2";

function StackModeToggle({
  mode,
  onChange,
}: {
  mode: BuilderMode;
  onChange: (mode: BuilderMode) => void;
}) {
  const options: Array<{ value: BuilderMode; label: string }> = [
    { value: "solo", label: "Solo" },
    { value: "multi", label: "Multi-Ecosystem" },
  ];

  return (
    <LayoutGroup id="creation-mode-toggle">
      <fieldset
        aria-label="Creation method"
        className="relative inline-flex items-center gap-0.5 overflow-visible rounded-full border border-border/60 bg-muted/30 p-0.5"
      >
        {options.map((option) => {
          const active = mode === option.value;

          if (option.value === "multi") {
            return (
              <div key={option.value} className="relative">
                <ChromeButton
                  type="button"
                  data-testid={`stack-mode-${option.value}`}
                  aria-pressed={active}
                  onClick={() => onChange(option.value)}
                  size="toggle"
                  border="none"
                  tone={active ? "toggleActive" : "toggleIdle"}
                  showActiveIndicator={active}
                  chromeOpacity={active ? "active" : "idle"}
                >
                  {option.label}
                </ChromeButton>
                <HandDrawnNewCallout className="absolute top-1/2 left-[calc(100%+0.35rem)] z-20 hidden -translate-y-1/2 min-[640px]:block" />
              </div>
            );
          }

          return (
            <button
              key={option.value}
              type="button"
              data-testid={`stack-mode-${option.value}`}
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                TOGGLE_SEGMENT_CLASS,
                active
                  ? "font-semibold text-[#0c0c0e]"
                  : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId={CREATION_MODE_INDICATOR_ID}
                  className="absolute inset-0 rounded-full bg-[#C6E853] shadow-sm ring-1 ring-[#2A3303]/15"
                  transition={CREATION_MODE_INDICATOR_TRANSITION}
                />
              )}
              <span className="relative z-10 block">{option.label}</span>
            </button>
          );
        })}
      </fieldset>
    </LayoutGroup>
  );
}

// On the builder page the full nav is hidden to make room for the stack
// controls, so docs entry points live in a compact dropdown instead.
function BuilderDocsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open documentation menu"
            className={cn(NAV_LINK_CLASS, "inline-flex cursor-pointer items-center gap-1")}
          />
        }
      >
        Docs
        <ChevronDown className="h-3 w-3" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-36">
        <DropdownMenuItem
          render={<Link to="/docs" />}
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          Docs
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link to="/mcp" />}
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          MCP
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const matchRoute = useMatchRoute();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pathSegments = pathname.split("/").filter(Boolean);
  const shareSlug = pathSegments[0] ?? "";
  const onBuilder =
    Boolean(matchRoute({ to: "/new" })) ||
    pathname === "/stack" ||
    (pathSegments.length === 1 && isStackShareSlug(shareSlug));
  const builderMode = useBuilderMode();
  const showModeToggle = onBuilder && builderMode.active;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="container relative mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
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
          {!onBuilder && (
            <>
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
            </>
          )}
          {onBuilder && (
            <>
              <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
              <div className="hidden sm:block">
                <BuilderDocsMenu />
              </div>
            </>
          )}
        </div>

        {showModeToggle && (
          <div className="absolute left-1/2 z-10 -translate-x-1/2 overflow-visible">
            <StackModeToggle mode={builderMode.mode} onChange={builderMode.setMode} />
          </div>
        )}

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
