import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  TbBrandGithub as Github,
  TbBrowser as Browser,
  TbFileText as FileText,
  TbHash as Hash,
  TbSearch as SearchIcon,
  TbTerminal2 as Terminal,
} from "react-icons/tb";
import { toast } from "sonner";

import type { DocSearch, SearchHit } from "@/lib/docs/search";
import type { PageNode, PageTreeNode } from "@/lib/docs/source";

import { createDocSearch } from "@/lib/docs/search";
import { loadSearchSections } from "@/lib/docs/search-data";
import { getLocalizedPageTree } from "@/lib/docs/source";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

const SHORTCUT_HINT_KEYS = ["meta+k", "ctrl+k"] as const;

type PaletteItem = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: IconType;
  run: () => void;
};

const INSTALL_COMMAND = "npm create better-fullstack@latest";
const GITHUB_URL = "https://github.com/Marve10s/Better-Fullstack";

type PageEntry = { page: PageNode; section?: string };

function flattenPages(nodes: PageTreeNode[], section?: string): PageEntry[] {
  return nodes.flatMap((node): PageEntry[] => {
    if (node.type === "separator") return [];
    if (node.type === "page") return [{ page: node, section }];
    const index: PageEntry[] = node.index
      ? [
          {
            page: {
              type: "page",
              name: node.index.frontmatter.title ?? node.name,
              slug: node.index.slug,
              url: node.index.url,
              frontmatter: node.index.frontmatter,
            },
            section: node.name,
          },
        ]
      : [];
    return [...index, ...flattenPages(node.children, node.name)];
  });
}

/**
 * Cmd/Ctrl+K command palette. With an empty query it lists actions and every
 * docs page; typing switches to full-text results. Lazy-loads the Orama
 * instance the first time the dialog opens (avoids paying Orama's startup
 * cost for users that never search). Keyboard:
 *   - ↑/↓: move selection
 *   - Enter: run the highlighted item
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
  const listRef = useRef<HTMLDivElement | null>(null);
  const locale = getLocale();

  useEffect(() => {
    setSearch(null);
    setHits([]);
    setActiveIndex(0);
  }, [locale]);

  // Lazy-init Orama on first open. The promise is cached so repeat opens
  // don't rebuild the index.
  useEffect(() => {
    if (!open || search) return;
    let cancelled = false;
    const init = async () => {
      const sections = await loadSearchSections();
      const instance = await createDocSearch(sections);
      if (!cancelled) setSearch(instance);
    };
    void init();
    return () => {
      cancelled = true;
    };
  }, [locale, open, search]);

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

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const items = useMemo<PaletteItem[]>(() => {
    const go = (to: string) => () => {
      close();
      navigate({ to });
    };
    if (query.trim() !== "") {
      return hits.map((hit) => ({
        id: hit.id,
        group: hit.pageTitle,
        label: hit.sectionTitle,
        hint: hit.body,
        icon: hit.kind === "page" ? FileText : Hash,
        run: go(hit.sectionUrl),
      }));
    }
    const actions: PaletteItem[] = [
      {
        id: "action:copy-install",
        group: m.docsSearchActions(),
        label: m.navCopyInstallCommand(),
        hint: INSTALL_COMMAND,
        icon: Terminal,
        run: () => {
          close();
          navigator.clipboard
            .writeText(INSTALL_COMMAND)
            .then(() => toast.success(m.navCommandCopied()))
            .catch(() => undefined);
        },
      },
      {
        id: "action:builder",
        group: m.docsSearchActions(),
        label: m.docsSearchOpenBuilder(),
        icon: Browser,
        run: go("/new"),
      },
      {
        id: "action:github",
        group: m.docsSearchActions(),
        label: m.navGithubRepository(),
        icon: Github,
        run: () => {
          close();
          window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
        },
      },
    ];
    const pages = flattenPages(getLocalizedPageTree().children).map(({ page, section }) => ({
      id: `page:${page.url}`,
      group: m.docsSearchJumpTo(),
      label: page.name,
      hint: section,
      icon: FileText,
      run: go(page.url),
    }));
    return [...actions, ...pages];
  }, [close, hits, navigate, query]);

  // Keep the highlighted row in view while moving with the keyboard.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((idx) => Math.min(idx + 1, Math.max(0, items.length - 1)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((idx) => Math.max(idx - 1, 0));
        return;
      }
      if (event.key === "Enter") {
        const item = items[activeIndex];
        if (item) {
          event.preventDefault();
          item.run();
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    },
    [activeIndex, items, close],
  );

  const grouped = useMemo(() => groupItems(items), [items]);
  const searching = query.trim() !== "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <button
            type="button"
            aria-label={m.docsCloseSearch()}
            className="absolute inset-0 bg-black/30 dark:bg-black/55"
            onClick={close}
          />
          <motion.dialog
            open
            aria-modal="true"
            aria-label={m.docsSearch()}
            className="relative z-10 m-0 flex w-full max-w-[36rem] flex-col overflow-hidden rounded-2xl border border-[var(--docs-panel-border)] bg-[var(--docs-card)] p-0 text-foreground shadow-[0_24px_70px_-20px_rgb(0_0_0/0.45)]"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="flex h-14 items-center gap-3 border-[var(--docs-panel-border)] border-b px-4">
              <SearchIcon className="size-[1.125rem] shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder={m.docsCommandPlaceholder()}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                aria-label={m.docsSearch()}
                className="flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div ref={listRef} className="max-h-[min(60vh,24rem)] overflow-y-auto p-1.5">
              {searching && !search ? (
                <Empty>{m.docsSearchLoading()}</Empty>
              ) : searching && hits.length === 0 ? (
                <Empty>
                  {m.docsNoResultsPrefix()} <span className="text-foreground">"{query}"</span>
                </Empty>
              ) : (
                grouped.map((group) => (
                  <div key={group.label} className="pb-1">
                    <p className="select-none px-2.5 pt-2 pb-1 font-medium text-[0.75rem] text-muted-foreground">
                      {group.label}
                    </p>
                    {group.items.map(({ item, index }) => {
                      const Icon = item.icon;
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-index={index}
                          onMouseMove={() => setActiveIndex(index)}
                          onClick={item.run}
                          className={cn(
                            "flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[0.8125rem] transition-colors",
                            isActive ? "bg-[var(--docs-panel)]" : "hover:bg-[var(--docs-panel)]/60",
                          )}
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" />
                          <span className="shrink-0 text-foreground">{item.label}</span>
                          {item.hint ? (
                            <span className="min-w-0 truncate text-muted-foreground">
                              {item.hint}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex h-10 items-center justify-between border-[var(--docs-panel-border)] border-t px-3.5 text-[0.75rem] text-muted-foreground">
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <KeyHint label="↑" />
                  <KeyHint label="↓" />
                  {m.docsSearchNavigate()}
                </span>
                <span className="flex items-center gap-1.5">
                  <KeyHint label="esc" />
                  {m.uiClose()}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <KeyHint label="↵" />
                {m.docsSearchOpen()}
              </span>
            </div>
          </motion.dialog>
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
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-[var(--docs-panel-border)] bg-[var(--docs-panel)] px-1 font-mono text-[0.65rem] text-foreground">
      {label}
    </kbd>
  );
}

type Group = {
  label: string;
  items: Array<{ item: PaletteItem; index: number }>;
};

function groupItems(items: PaletteItem[]): Group[] {
  const groups: Group[] = [];
  const byLabel = new Map<string, Group>();
  items.forEach((item, index) => {
    let group = byLabel.get(item.group);
    if (!group) {
      group = { label: item.group, items: [] };
      byLabel.set(item.group, group);
      groups.push(group);
    }
    group.items.push({ item, index });
  });
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
        aria-label={m.docsSearch()}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
          className,
        )}
      >
        <SearchIcon className="size-3.5 shrink-0" />
        <span className="hidden flex-1 text-left sm:inline">{m.docsSearch()}</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border px-1 font-mono text-[0.65rem] uppercase sm:inline-flex">
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
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl";
}
