import type { ReactNode } from "react";

import {
  TbAlertCircle as AlertCircle,
  TbAlertTriangle as AlertTriangle,
  TbInfoCircle as Info,
  TbBulb as Lightbulb,
} from "react-icons/tb";

import { cn } from "@/lib/platform/utils";

export const CALLOUT_KINDS = ["info", "tip", "warning", "danger"] as const;

export type CalloutKind = (typeof CALLOUT_KINDS)[number];

const config: Record<CalloutKind, { icon: typeof Info; tone: string; rail: string }> = {
  // `info` is the default kind and the most common one on reference pages, so
  // it stays a quiet bordered note. The rail is reserved for kinds that are
  // meant to interrupt reading.
  info: {
    icon: Info,
    tone: "text-muted-foreground",
    rail: "border-l-[var(--docs-border-subtle)]",
  },
  tip: {
    icon: Lightbulb,
    tone: "text-emerald-600 dark:text-emerald-400",
    rail: "border-l-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    tone: "text-amber-500 dark:text-amber-400",
    rail: "border-l-amber-500",
  },
  danger: {
    icon: AlertCircle,
    tone: "text-red-500 dark:text-red-400",
    rail: "border-l-red-500",
  },
};

/**
 * Side-bar callout used inside MDX:
 *   <Callout kind="tip">Some advice here.</Callout>
 *
 * `kind` arrives untyped from MDX, so an unknown value degrades to `info`
 * rather than throwing and taking the whole docs page down.
 */
export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children?: ReactNode;
}) {
  const { icon: Icon, tone, rail } = config[kind] ?? config.info;
  return (
    <aside
      className={cn(
        "my-6 flex gap-3 rounded-lg border border-[var(--docs-border-subtle)] border-l-[3px] bg-[var(--docs-surface-elevated)]/70 p-4 text-sm shadow-sm",
        rail,
      )}
      role="note"
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", tone)} />
      <div className="min-w-0 flex-1 space-y-1.5">
        {title ? <p className="m-0 font-medium text-foreground">{title}</p> : null}
        <div className="prose-callout text-muted-foreground [&_p]:m-0 [&_p+p]:mt-2">{children}</div>
      </div>
    </aside>
  );
}
