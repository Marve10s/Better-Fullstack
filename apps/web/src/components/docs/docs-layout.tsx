import type { ReactNode } from "react";

import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TbMenu2 as Menu, TbX as X } from "react-icons/tb";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import { DocsPanelHeader } from "@/components/docs/docs-panel-header";
import { DocsSidebar } from "@/components/docs/sidebar";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

/** "On this page" rail, sticky below the navbar while the page scrolls. */
export function DocsToc({ entries }: { entries: TocEntry[] }) {
  return <TableOfContents toc={entries} className="top-[4.75rem] max-h-[calc(100dvh-6rem)]" />;
}

/** Reading column inside the content card; landing pages get a wider measure. */
export function articleClassName(landing: boolean) {
  return cn(
    "mx-auto w-full px-5 py-10 sm:px-10",
    landing ? "max-w-[72rem] lg:px-14 lg:py-14" : "max-w-[50rem] lg:py-12",
  );
}

/**
 * Docs shell rendered under `/docs/*` and `/guides/*`. The pages sit in a padded panel over a
 * grainy purple backdrop:
 *
 *   ┌ grain ─────────────────────────────────────────────────────┐
 *   │ ┌ panel ─────────────────────────────────────────────────┐ │
 *   │ │  wordmark · version                          search    │ │
 *   │ │  tabs                                                  │ │
 *   │ │ ┌──────────┐ ┌ card ─────────────────────────┬───────┐ │ │
 *   │ │ │ sidebar  │ │ article                       │  TOC  │ │ │
 *   │ │ └──────────┘ └───────────────────────────────┴───────┘ │ │
 *   │ └────────────────────────────────────────────────────────┘ │
 *   └────────────────────────────────────────────────────────────┘
 *
 * The sidebar collapses into a slide-in drawer on small screens. The TOC
 * lives inside the content card and disappears below `xl` so the reading
 * column keeps a generous measure on tablet-sized screens.
 */
export function DocsLayout({
  toc,
  variant = "default",
  sidebar = <DocsSidebar />,
  navLabel = m.navDocs(),
  children,
}: {
  /** Right rail inside the content card; usually `<DocsToc>` behind a Suspense boundary. */
  toc?: ReactNode;
  variant?: "default" | "landing";
  /** Navigation rendered in the left rail and the mobile drawer. */
  sidebar?: ReactNode;
  /** Label for the mobile button that opens the sidebar drawer. */
  navLabel?: string;
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
    // The frame starts behind the sticky navbar (h-14 plus a 1px border) so the
    // frosted bar has grain under it and the panel slides beneath it on scroll.
    <div className="docs-grain -mt-[57px] min-h-dvh p-2 pt-[calc(57px+0.5rem)] sm:p-4 sm:pt-[calc(57px+1rem)] lg:p-8 lg:pt-[calc(57px+2rem)]">
      <div className="docs-panel mx-auto w-full max-w-[100rem] rounded-2xl sm:rounded-[1.25rem]">
        <DocsPanelHeader />

        {/*
          On small screens the nav opens from a bar at the top of the panel
          rather than a floating circle, which used to sit on top of the
          article text and could not be dismissed.
        */}
        <div className="px-2 pb-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={m.docsOpenNavigation()}
            className="flex h-10 w-full items-center gap-2 rounded-lg px-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-[var(--docs-card)] hover:text-foreground"
          >
            <Menu className="size-4" />
            {navLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 px-2 pb-2 sm:px-3 sm:pb-3 md:grid-cols-[15.5rem_minmax(0,1fr)]">
          {/* Desktop sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-[4.75rem] max-h-[calc(100dvh-6rem)] overflow-y-auto">
              {sidebar}
            </div>
          </aside>

          <main
            className={cn(
              "docs-card min-w-0 rounded-xl sm:rounded-2xl",
              variant === "default" && "xl:grid xl:grid-cols-[minmax(0,1fr)_15rem]",
            )}
          >
            <div className="min-w-0">{children}</div>
            {/* The rail stretches to the card's height so the TOC can stick inside it. */}
            {variant === "default" ? <aside className="hidden xl:block">{toc}</aside> : null}
          </main>
        </div>
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
                "absolute left-0 top-0 flex h-full w-72 flex-col border-[var(--docs-panel-border)] border-r bg-[var(--docs-panel)]",
              )}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="flex items-center justify-between border-[var(--docs-border-subtle)] border-b px-4 py-3">
                <span className="font-mono text-[0.72rem] uppercase text-muted-foreground">
                  {navLabel}
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
                {sidebar}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
