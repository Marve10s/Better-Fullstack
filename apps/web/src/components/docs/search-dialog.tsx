import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileText, Hash, Search as SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { DocSearch, SearchHit } from "@/lib/docs/search";
import { createDocSearch } from "@/lib/docs/search";
import { searchSections } from "@/lib/docs/search-data";
import { cn } from "@/lib/utils";

const SHORTCUT_HINT_KEYS = ["meta+k", "ctrl+k"] as const;

/**
 * Cmd/Ctrl+K search dialog. Lazy-loads the Orama instance the first time
 * the dialog opens (avoids paying Orama's startup cost for users that never
 * search). Keyboard:
 *   - ↑/↓: move selection
 *   - Enter: navigate to highlighted hit
 *   - Esc: close
 */
export function DocsSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState<DocSearch | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Lazy-init Orama on first open. The promise is cached so repeat opens
  // don't rebuild the index.
  useEffect(() => {
    if (!open || search) return;
    let cancelled = false;
    const init = async () => {
      const instance = await createDocSearch(searchSections);
      if (!cancelled) setSearch(instance);
    };
    void init();
    return () => {
      cancelled = true;
    };
  }, [open, search]);

  // Run the query whenever input changes.
  useEffect(() => {
    if (!search) return;
    let cancelled = false;
    const run = async () => {
      const results = await search.query(query);
      if (cancelled) return;
      setHits(results);
      setActiveIndex(0);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [query, search]);

  // Reset state on close so reopening starts clean.
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    setQuery("");
    setHits([]);
    setActiveIndex(0);
  }, [open]);

  const onPick = useCallback(
    (hit: SearchHit) => {
      onOpenChange(false);
      navigate({ to: hit.sectionUrl });
    },
    [navigate, onOpenChange],
  );

  const onKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((idx) => Math.min(idx + 1, Math.max(0, hits.length - 1)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((idx) => Math.max(idx - 1, 0));
        return;
      }
      if (event.key === "Enter") {
        const hit = hits[activeIndex];
        if (hit) {
          event.preventDefault();
          onPick(hit);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
      }
    },
    [activeIndex, hits, onPick, onOpenChange],
  );

  // Group hits by page so identical-page results cluster together.
  const grouped = useMemo(() => groupByPage(hits), [hits]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh] sm:pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search docs"
            className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search docs…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                aria-label="Search docs"
                className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden font-mono text-[0.65rem] uppercase tracking-[0.05em] text-muted-foreground sm:inline-flex">
                Esc
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {!search ? (
                <Empty>Loading search…</Empty>
              ) : query.trim() === "" ? (
                <Empty>
                  <span className="font-mono text-xs uppercase tracking-[0.08em]">
                    Type to search
                  </span>
                </Empty>
              ) : hits.length === 0 ? (
                <Empty>
                  No results for{" "}
                  <span className="font-mono text-foreground">"{query}"</span>
                </Empty>
              ) : (
                <ul className="flex flex-col">
                  {grouped.map((group) => (
                    <li key={group.pageId} className="px-2 py-1">
                      <p className="select-none px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                        {group.pageTitle}
                      </p>
                      <ul>
                        {group.items.map((hit) => {
                          const flatIndex = hits.findIndex((h) => h.id === hit.id);
                          const isActive = flatIndex === activeIndex;
                          return (
                            <li key={hit.id}>
                              <button
                                type="button"
                                onMouseEnter={() => setActiveIndex(flatIndex)}
                                onClick={() => onPick(hit)}
                                className={cn(
                                  "group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                                  isActive ? "bg-muted" : "hover:bg-muted/50",
                                )}
                              >
                                {hit.kind === "page" ? (
                                  <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                                ) : (
                                  <Hash className="size-3.5 shrink-0 text-muted-foreground" />
                                )}
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[0.85rem] text-foreground">
                                    {hit.sectionTitle}
                                  </span>
                                  {hit.body ? (
                                    <span className="block truncate text-xs text-muted-foreground">
                                      {hit.body}
                                    </span>
                                  ) : null}
                                </span>
                                <ArrowRight
                                  className={cn(
                                    "size-3.5 shrink-0 text-muted-foreground transition-opacity",
                                    isActive ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
              <span className="flex items-center gap-3">
                <KeyHint label="↑↓" />
                <span>Navigate</span>
                <KeyHint label="↵" />
                <span>Open</span>
              </span>
              <span>{searchSections.length} sections indexed</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-32 items-center justify-center px-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function KeyHint({ label }: { label: string }) {
  return (
    <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted/40 px-1.5 font-mono text-[0.65rem] text-foreground">
      {label}
    </kbd>
  );
}

type Group = {
  pageId: string;
  pageTitle: string;
  items: SearchHit[];
};

function groupByPage(hits: SearchHit[]): Group[] {
  const groups: Group[] = [];
  const byId = new Map<string, Group>();
  for (const hit of hits) {
    let g = byId.get(hit.pageId);
    if (!g) {
      g = { pageId: hit.pageId, pageTitle: hit.pageTitle, items: [] };
      byId.set(hit.pageId, g);
      groups.push(g);
    }
    g.items.push(hit);
  }
  return groups;
}

/**
 * Imperative trigger button. Owns its own open state so consumers (the
 * Navbar, mobile menus, etc.) only need a JSX placement. Listens for
 * Cmd/Ctrl+K globally.
 */
export function DocsSearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search docs"
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
          className,
        )}
      >
        <SearchIcon className="size-3.5" />
        <span className="hidden font-mono sm:inline">Search docs</span>
        <kbd className="hidden items-center gap-0.5 font-mono text-[0.65rem] uppercase tracking-[0.05em] sm:inline-flex">
          <span>{getModifierLabel()}</span>
          <span>K</span>
        </kbd>
      </button>
      <DocsSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function getModifierLabel(): string {
  if (typeof navigator === "undefined") return SHORTCUT_HINT_KEYS[0];
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent)
    ? "⌘"
    : "Ctrl";
}
