import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import PackageIcon from "@/components/home/icons";
import { CodeBlockContent } from "@/components/ui/kibo-ui/code-block";
import { cn } from "@/lib/utils";

const MANAGERS = ["npm", "pnpm", "bun", "yarn"] as const;
type Manager = (typeof MANAGERS)[number];

const ACTIVE_TAB_TRANSITION = { type: "spring", stiffness: 380, damping: 32 } as const;
const PM_CODE_THEMES = { light: "catppuccin-latte", dark: "catppuccin-mocha" } as const;

/**
 * Renders a 4-tab package-manager picker around a shell command. Each
 * instance owns its own selected manager so switching one block does not
 * update every other command on the page.
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
  const commands = useMemo<Record<Manager, string>>(
    () => ({ npm, pnpm, bun, yarn }),
    [npm, pnpm, bun, yarn],
  );
  const instanceId = useId();
  const [active, setActive] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);

  const select = useCallback((manager: Manager) => {
    setActive(manager);
  }, []);

  const handleTabClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const manager = event.currentTarget.value as Manager;
      select(manager);
    },
    [select],
  );

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(commands[active]);
      setCopied(true);
    } catch {
      // best-effort
    }
  }, [active, commands]);

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
              value={manager}
              onClick={handleTabClick}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.05em] transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <PackageIcon pm={manager} className="h-3.5 w-3.5 shrink-0" />
              {manager}
              {isActive ? (
                <motion.span
                  layoutId={`docs-pm-active-tab-${instanceId}`}
                  className="absolute inset-x-2 bottom-0 h-px bg-foreground"
                  transition={ACTIVE_TAB_TRANSITION}
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
      <CodeBlockContent
        language="bash"
        themes={PM_CODE_THEMES}
        className={cn(
          "text-[0.82rem] leading-relaxed",
          "[&_.shiki]:!bg-transparent",
          "[&_pre]:!overflow-x-auto [&_pre]:!bg-transparent",
          "[&_pre]:px-4 [&_pre]:py-4",
          "[&_code]:font-mono",
          "[&_code]:whitespace-pre-wrap",
          "[&_code]:[overflow-wrap:anywhere]",
          "[&_.line]:!px-0",
          "[&_.line]:whitespace-pre-wrap",
          "[&_.line]:[overflow-wrap:anywhere]",
        )}
      >
        {commands[active]}
      </CodeBlockContent>
    </div>
  );
}
