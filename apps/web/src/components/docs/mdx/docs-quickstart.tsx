import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";
import { TbArrowRight as ArrowRight, TbArrowUpRight as ArrowUpRight } from "react-icons/tb";

import { type DocsCardIcon, docsCardIcon } from "@/components/docs/mdx/docs-landing";
import { PMTabs } from "@/components/docs/mdx/pm-tabs";
import { cn } from "@/lib/platform/utils";

const LINE_NUMBERS = cn(
  "[&_code]:[counter-reset:line]",
  "[&_.line]:before:content-[counter(line)]",
  "[&_.line]:before:[counter-increment:line]",
  "[&_.line]:before:mr-5 [&_.line]:before:inline-block [&_.line]:before:w-4",
  "[&_.line]:before:select-none [&_.line]:before:text-right",
  "[&_.line]:before:text-[var(--code-muted)]/60",
);

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/**
 * Two-pane quickstart: a short pitch with one action on the left, a
 * line-numbered snippet with a package-manager picker on the right.
 */
export function DocsQuickstart({
  title,
  description,
  actionLabel,
  actionHref,
  npm,
  pnpm,
  bun,
  yarn,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  npm: string;
  pnpm: string;
  bun: string;
  yarn: string;
}) {
  return (
    <section className="not-prose my-8 grid grid-cols-1 gap-2 rounded-2xl border border-[var(--docs-panel-border)] bg-[var(--docs-panel)] p-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <div className="flex flex-col justify-between gap-6 p-4 lg:p-5">
        <div>
          <h2 className="font-semibold text-[1.0625rem] text-foreground tracking-[-0.01em]">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-[0.875rem] text-muted-foreground! leading-6">{description}</p>
          ) : null}
        </div>
        {actionLabel && actionHref ? (
          <a
            href={actionHref}
            className="inline-flex h-9 w-fit items-center gap-1.5 rounded-lg bg-foreground px-3.5 font-medium text-[0.8125rem] text-background no-underline transition-opacity hover:opacity-85"
          >
            {actionLabel}
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
      </div>

      <PMTabs
        npm={npm}
        pnpm={pnpm}
        bun={bun}
        yarn={yarn}
        className={cn("my-0 min-w-0 rounded-xl shadow-sm", LINE_NUMBERS)}
      />
    </section>
  );
}

/** Wide promo row: artwork tile, a title and one line, and a button on the right. */
export function DocsBanner({
  title,
  href,
  actionLabel,
  tile,
  children,
}: {
  title: string;
  href: string;
  actionLabel: string;
  tile?: string;
  children?: ReactNode;
}) {
  const external = isExternal(href);
  return (
    <aside className="not-prose my-8 flex items-center gap-4 rounded-2xl border border-[var(--docs-panel-border)] p-2 pr-4">
      <div className="docs-grain hidden h-16 w-28 shrink-0 items-center justify-center rounded-xl font-mono font-medium text-[0.6875rem] text-ink/75 [background-attachment:scroll] dark:text-white/85 sm:flex">
        {tile}
      </div>
      <div className="min-w-0 flex-1 py-1 pl-2 sm:pl-0">
        <p className="font-medium text-[0.9375rem] text-foreground!">{title}</p>
        {children ? (
          <div className="mt-0.5 text-[0.8125rem] leading-5 [&_p]:text-muted-foreground!">
            {children}
          </div>
        ) : null}
      </div>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-flex h-8 shrink-0 items-center rounded-lg border border-[var(--docs-panel-border)] bg-[var(--docs-card)] px-3 font-medium text-[0.8125rem] text-foreground no-underline shadow-sm transition-colors hover:border-[var(--docs-border-strong)]"
      >
        {actionLabel}
      </a>
    </aside>
  );
}

export function DocsQuickLinks({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="not-prose my-10">
      <h2 className="mb-4 font-semibold text-[1.0625rem] text-foreground tracking-[-0.01em]">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export function DocsQuickLink({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon?: DocsCardIcon;
}) {
  const Icon = docsCardIcon(icon);
  const className =
    "group flex h-12 items-center gap-3 rounded-xl border border-[var(--docs-panel-border)] bg-[var(--docs-card)] px-4 text-[0.875rem] text-foreground no-underline transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel)]/60";
  const body = (
    <>
      <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {isExternal(href) ? (
        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      ) : null}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {body}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {body}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {body}
    </Link>
  );
}
