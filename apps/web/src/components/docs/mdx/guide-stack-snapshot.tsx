import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SnapshotItem = {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
};

const EMPTY_SNAPSHOT_ITEMS: SnapshotItem[] = [];

export function GuideStackSnapshot({
  title,
  description,
  items = EMPTY_SNAPSHOT_ITEMS,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  items?: SnapshotItem[];
  children?: ReactNode;
}) {
  return (
    <section className="not-prose my-6 overflow-hidden rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/70 shadow-sm">
      {title || description ? (
        <div className="border-[var(--docs-border-subtle)] border-b px-4 py-3">
          {title ? <h3 className="m-0 text-sm font-medium text-foreground">{title}</h3> : null}
          {description ? <p className="mt-1 text-muted-foreground text-xs">{description}</p> : null}
        </div>
      ) : null}
      {items.length > 0 ? (
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={String(item.label)}
              className={cn(
                "border-[var(--docs-border-subtle)] px-4 py-3",
                index % 2 === 0 ? "sm:border-r" : "",
                index < items.length - 2 ? "sm:border-b" : "",
                index < items.length - 1 ? "border-b sm:[&:nth-last-child(2)]:border-b-0" : "",
              )}
            >
              <dt className="font-mono text-[0.68rem] text-muted-foreground uppercase">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{item.value}</dd>
              {item.detail ? (
                <dd className="mt-1 text-muted-foreground text-xs">{item.detail}</dd>
              ) : null}
            </div>
          ))}
        </dl>
      ) : null}
      {children ? (
        <div className="border-[var(--docs-border-subtle)] border-t px-4 py-3 text-sm">
          {children}
        </div>
      ) : null}
    </section>
  );
}
