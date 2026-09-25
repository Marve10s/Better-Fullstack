import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  TbArrowRight as ArrowRight,
  TbArrowUpRight as ArrowUpRight,
  TbCheck as Check,
  TbChevronDown as ChevronDown,
  TbCopy as Copy,
} from "react-icons/tb";

import { type DocsCardIcon, docsCardIcon } from "@/components/docs/mdx/docs-landing";
import PackageIcon from "@/components/home/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CodeBlockContent } from "@/components/ui/kibo-ui/code-block";
import { cn } from "@/lib/platform/utils";

const MANAGERS = ["npm", "pnpm", "bun", "yarn"] as const;
type Manager = (typeof MANAGERS)[number];

const CODE_THEMES = { light: "github-light-default", dark: "github-dark-default" } as const;

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
  const snippets = useMemo<Record<Manager, string>>(
    () => ({ npm, pnpm, bun, yarn }),
    [npm, pnpm, bun, yarn],
  );
  const [manager, setManager] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = () => {
    navigator.clipboard
      .writeText(snippets[manager])
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

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

      <div className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-bg)] shadow-sm">
        <CodeBlockContent
          language="bash"
          themes={CODE_THEMES}
          className={cn(
            "text-[0.78rem] leading-6",
            "[&_.shiki]:!bg-transparent [&_pre]:!bg-transparent",
            "[&_pre]:overflow-x-auto [&_pre]:py-4 [&_pre]:pr-4 [&_pre]:pl-4",
            "[&_code]:font-mono",
            LINE_NUMBERS,
          )}
        >
          {snippets[manager]}
        </CodeBlockContent>
        <div className="flex items-center justify-end gap-1.5 px-2 pb-2">
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex size-7 items-center justify-center rounded-md border border-[var(--code-border)] bg-[var(--code-chrome-bg)] text-[var(--code-muted)] transition-colors hover:text-[var(--code-fg)]"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[var(--code-border)] bg-[var(--code-chrome-bg)] px-2 text-[0.75rem] text-[var(--code-fg)] transition-colors hover:border-[var(--code-muted)]">
              <PackageIcon pm={manager} className="size-3.5" />
              {manager}
              <ChevronDown className="size-3 text-[var(--code-muted)]" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {MANAGERS.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setManager(option)}>
                  <PackageIcon pm={option} className="size-3.5" />
                  {option}
                  {option === manager ? <Check className="ml-auto size-3.5" /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
