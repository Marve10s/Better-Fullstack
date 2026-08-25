import type { ReactNode } from "react";

import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TbMenu2 as Menu, TbX as X } from "react-icons/tb";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import { DocsSidebar } from "@/components/docs/sidebar";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

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
 * measure on tablet-sized screens. Both rails are fixed at 17rem and the
 * reading column takes what is left, so the article's own `max-w` centers it
 * the same way at every width above `md`.
 */
export function DocsLayout({
  toc,
  variant = "default",
  children,
}: {
  toc: TocEntry[];
  variant?: "default" | "landing";
  children: ReactNode;
}) {
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
      {/*
        On small screens the nav opens from a sticky bar under the navbar
        rather than a floating circle, which used to sit on top of the article
        text and could not be dismissed.
      */}
      <div className="sticky top-14 z-20 border-[var(--docs-border-subtle)] border-b bg-background/95 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={m.docsOpenNavigation()}
          className="flex h-11 items-center gap-2 px-5 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Menu className="size-4" />
          {m.navDocs()}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto grid w-full max-w-[100rem] grid-cols-1 md:grid-cols-[17rem_minmax(0,1fr)]",
          variant === "default" && "xl:grid-cols-[17rem_minmax(0,1fr)_17rem]",
        )}
      >
        {/* Desktop sidebar */}
        <aside className="hidden border-[var(--docs-border-subtle)] border-r md:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <DocsSidebar />
          </div>
        </aside>

        <main className="min-w-0">{children}</main>

        {variant === "default" ? (
          <aside className="hidden xl:block">
            <TableOfContents toc={toc} />
          </aside>
        ) : null}
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
              aria-label={m.docsCloseNavigation()}
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
                  {m.navDocs()}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={m.uiClose()}
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
