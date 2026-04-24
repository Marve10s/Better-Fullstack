import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const MANAGERS = ["npm", "pnpm", "bun", "yarn"] as const;
type Manager = (typeof MANAGERS)[number];

const STORAGE_KEY = "bfs.docs.pm";
const SYNC_EVENT = "bfs:docs:pm-changed";

/**
 * Renders a 4-tab package-manager picker around a shell command. Selection
 * is shared across every PMTabs instance on the page (and persists across
 * reloads) via `localStorage` + a custom DOM event. Clicking a tab updates
 * `localStorage`, then dispatches the event so other tabs in the same page
 * (or other pages within the same tab thanks to `storage` events) react.
 */
export function PMTabs({
  npm,
  pnpm,
  bun,
  yarn,
}: {
  npm: string;
  pnpm: string;
  bun: string;
  yarn: string;
}) {
  const commands: Record<Manager, string> = { npm, pnpm, bun, yarn };
  const [active, setActive] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);

  // Initialize from storage and subscribe to changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (MANAGERS as readonly string[]).includes(stored)) {
      setActive(stored as Manager);
    }
    const onSync = (event: Event) => {
      const detail = (event as CustomEvent<Manager>).detail;
      if (detail && MANAGERS.includes(detail)) setActive(detail);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        if (MANAGERS.includes(event.newValue as Manager)) {
          setActive(event.newValue as Manager);
        }
      }
    };
    window.addEventListener(SYNC_EVENT, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const select = (manager: Manager) => {
    setActive(manager);
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, manager);
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: manager }));
  };

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands[active]);
      setCopied(true);
    } catch {
      // best-effort
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-md border border-border bg-[oklch(0.04_0_0)] dark:bg-[oklch(0.06_0_0)]">
      <div
        role="tablist"
        aria-label="Package manager"
        className="flex items-center border-b border-border/40"
      >
        {MANAGERS.map((manager) => {
          const isActive = active === manager;
          return (
            <button
              key={manager}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(manager)}
              className={cn(
                "relative flex-none px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.05em] transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {manager}
              {isActive ? (
                <motion.span
                  layoutId="docs-pm-active-tab"
                  className="absolute inset-x-2 bottom-0 h-px bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
            </button>
          );
        })}
        <div className="ml-auto pr-2">
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? "Copied" : "Copy command"}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[0.82rem] leading-relaxed [&_code]:font-mono">
        <code className="text-foreground/90">{commands[active]}</code>
      </pre>
    </div>
  );
}
