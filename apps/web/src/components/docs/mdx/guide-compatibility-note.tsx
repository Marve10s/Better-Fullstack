import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CompatibilityKind = "supported" | "partial" | "unsupported" | "warning";

const toneByKind: Record<CompatibilityKind, string> = {
  supported: "border-l-emerald-500",
  partial: "border-l-amber-500",
  unsupported: "border-l-red-500",
  warning: "border-l-amber-500",
};

const EMPTY_ITEMS: ReactNode[] = [];

export function GuideCompatibilityNote({
  kind = "supported",
  title,
  items = EMPTY_ITEMS,
  children,
}: {
  kind?: CompatibilityKind;
  title?: ReactNode;
  items?: ReactNode[];
  children?: ReactNode;
}) {
  return (
    <aside
      className={cn(
        "not-prose my-6 rounded-lg border border-[var(--docs-border-subtle)] border-l-[3px] bg-[var(--docs-surface-elevated)]/70 p-4 text-sm shadow-sm",
        toneByKind[kind],
      )}
      role="note"
    >
      {title ? <p className="m-0 font-medium text-foreground">{title}</p> : null}
      {children ? (
        <div className={cn("text-muted-foreground", title ? "mt-1.5" : "")}>
          {children}
        </div>
      ) : null}
      {items.length > 0 ? (
        <ul className="m-0 mt-3 space-y-1.5 p-0">
          {items.map((item) => (
            <li key={String(item)} className="flex gap-2 text-muted-foreground">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
