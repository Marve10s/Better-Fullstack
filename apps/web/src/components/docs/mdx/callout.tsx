import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutKind = "info" | "tip" | "warn" | "danger";

const config: Record<CalloutKind, { icon: typeof Info; tone: string }> = {
  info: { icon: Info, tone: "text-foreground" },
  tip: { icon: Lightbulb, tone: "text-foreground" },
  warn: { icon: AlertTriangle, tone: "text-amber-500 dark:text-amber-400" },
  danger: { icon: AlertCircle, tone: "text-red-500 dark:text-red-400" },
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
  const { icon: Icon, tone } = config[kind];
  return (
    <aside
      className={cn(
        "my-5 flex gap-3 rounded-md border border-border bg-muted/30 p-4 text-sm",
      )}
      role="note"
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", tone)} />
      <div className="min-w-0 flex-1 space-y-1.5">
        {title ? <p className="m-0 font-medium text-foreground">{title}</p> : null}
        <div className="prose-callout text-muted-foreground [&_p]:m-0 [&_p+p]:mt-2">
          {children}
        </div>
      </div>
    </aside>
  );
}
