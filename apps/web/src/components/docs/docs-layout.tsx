import type { ReactNode } from "react";

import { useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import { DocsSidebar } from "@/components/docs/sidebar";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { cn } from "@/lib/utils";

/**
 * Three-column docs shell rendered under `/docs/*`. Layout is:
 *
 *   ┌────────────────────────────────────────────────────────────┐
 *   │  navbar (from __root layout)                               │
 *   ├────────────┬──────────────────────────────────────┬────────┤
 *   │  sidebar   │  content (DocsArticle wraps MDX)     │  TOC   │
 *   │            │                                       │        │
 *   └────────────┴──────────────────────────────────────┴────────┘
 *
 * The sidebar collapses into a slide-in drawer on small screens. The TOC
 * disappears entirely below `xl` so the reading column keeps a generous
 * measure on tablet-sized screens.
 */
export function DocsLayout({ toc, children }: { toc: TocEntry[]; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Auto-dismiss the mobile drawer when the user navigates to a new doc
  // page. This replaces an event-delegation onClick on the sidebar wrapper
  // (which would have triggered jsx-a11y `click-events-have-key-events`
  // warnings since a non-interactive `<div>` can't satisfy keyboard parity).
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open and close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <div className="docs-shell min-h-[calc(100vh-3.5rem)] border-[var(--docs-border-subtle)] border-t">
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 left-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/95 text-muted-foreground shadow-lg backdrop-blur transition-colors hover:text-foreground md:hidden"
        aria-label="Open docs navigation"
      >
        <Menu className="size-4" />
      </button>

      <div className="mx-auto grid w-full max-w-[94rem] grid-cols-1 md:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,52rem)_16rem] xl:justify-center">
        {/* Desktop sidebar */}
        <aside className="hidden border-[var(--docs-border-subtle)] border-r bg-[var(--docs-surface)]/55 md:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <DocsSidebar />
          </div>
        </aside>

        <main className="min-w-0 bg-background/70">{children}</main>

        <aside className="hidden border-[var(--docs-border-subtle)] border-l bg-[var(--docs-surface)]/35 xl:block">
          <TableOfContents toc={toc} />
        </aside>
      </div>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              aria-label="Close docs navigation"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={cn(
                "absolute left-0 top-0 flex h-full w-72 flex-col border-[var(--docs-border-subtle)] border-r bg-[var(--docs-surface-elevated)]",
              )}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="flex items-center justify-between border-[var(--docs-border-subtle)] border-b px-4 py-3">
                <span className="font-mono text-[0.72rem] uppercase text-muted-foreground">
                  Docs
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              {/*
                The drawer auto-closes on route change via the
                `location.pathname` effect above, so this wrapper is
                purely structural and stays free of event handlers.
              */}
              <div className="flex-1 overflow-y-auto">
                <DocsSidebar />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
