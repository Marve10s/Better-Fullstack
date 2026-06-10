import type { ReactNode } from "react";

import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutKind = "info" | "tip" | "warn" | "danger";

const config: Record<CalloutKind, { icon: typeof Info; tone: string; rail: string }> = {
  info: {
    icon: Info,
    tone: "text-[var(--docs-accent)]",
    rail: "border-l-[var(--docs-accent)]",
  },
  tip: {
    icon: Lightbulb,
    tone: "text-emerald-600 dark:text-emerald-400",
    rail: "border-l-emerald-500",
  },
  warn: {
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
 * Renders as a thin card with a colored icon. Spec leans neutral so callouts
 * don't fight the content. Only `warn` and `danger` kinds carry color; the
 * rest stay grayscale to honor the brand palette.
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
  const { icon: Icon, tone, rail } = config[kind];
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
