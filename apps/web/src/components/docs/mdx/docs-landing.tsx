import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import { Link } from "@tanstack/react-router";
import {
  TbAdjustments as Adjustments,
  TbBook as Book,
  TbBrowser as Browser,
  TbChecklist as Checklist,
  TbCirclesRelation as CirclesRelation,
  TbCloudUpload as CloudUpload,
  TbDatabase as Database,
  TbDownload as Download,
  TbFileText as FileText,
  TbLayoutGrid as LayoutGrid,
  TbListDetails as ListDetails,
  TbPlayerPlay as PlayerPlay,
  TbPlug as Plug,
  TbPlus as Plus,
  TbPuzzle as Puzzle,
  TbRefresh as Refresh,
  TbRobot as Robot,
  TbRocket as Rocket,
  TbRoute as Route,
  TbServer as Server,
  TbShieldLock as ShieldLock,
  TbSparkles as Sparkles,
  TbStack2 as Stack2,
  TbTag as Tag,
  TbTerminal2 as Terminal2,
  TbTool as Tool,
} from "react-icons/tb";

import { changelogReleases } from "@/lib/content/changelog";
import { getLocalizedChangelogRelease } from "@/lib/i18n/changelog-copy";
import { cn } from "@/lib/platform/utils";

const CARD_ICONS = {
  adjustments: Adjustments,
  book: Book,
  browser: Browser,
  checklist: Checklist,
  cloud: CloudUpload,
  database: Database,
  download: Download,
  file: FileText,
  grid: LayoutGrid,
  list: ListDetails,
  play: PlayerPlay,
  plug: Plug,
  plus: Plus,
  puzzle: Puzzle,
  refresh: Refresh,
  relation: CirclesRelation,
  robot: Robot,
  rocket: Rocket,
  route: Route,
  server: Server,
  shield: ShieldLock,
  sparkles: Sparkles,
  stack: Stack2,
  terminal: Terminal2,
  tool: Tool,
} as const;

export type DocsCardIcon = keyof typeof CARD_ICONS;

/** MDX passes icon names; React callers can pass any icon component. */
export function docsCardIcon(icon: DocsCardIcon | IconType | undefined): IconType {
  if (typeof icon === "function") return icon;
  return (icon && CARD_ICONS[icon]) ?? Book;
}

/**
 * Landing-page intro. It owns the page `<h1>` because `layout: "landing"`
 * turns off the shared docs header that renders one everywhere else.
 */
export function DocsWelcome({
  eyebrow,
  title,
  subhead,
  children,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="not-prose mb-10">
      {eyebrow ? (
        <p className="mb-3 font-medium text-[0.8125rem] text-muted-foreground!">{eyebrow}</p>
      ) : null}
      <h1 className="font-medium text-[2.25rem] text-foreground leading-[1.08] tracking-[-0.035em] md:text-[2.75rem]">
        {title}
      </h1>
      {subhead ? (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground! leading-7 md:text-[1.0625rem]">
          {subhead}
        </p>
      ) : null}
      {children ? <div className="mt-6 max-w-xl [&>div]:my-0">{children}</div> : null}
    </section>
  );
}

export function DocsCardGrid({ children }: { children?: ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

export function DocsCard({
  title,
  href,
  icon,
  children,
}: {
  title: string;
  href: string;
  icon?: DocsCardIcon | IconType;
  children?: ReactNode;
}) {
  const Icon = docsCardIcon(icon);
  return (
    <Link
      to={href}
      className="group flex flex-col rounded-xl border border-[var(--docs-panel-border)] bg-[var(--docs-card)] p-4 no-underline shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] hover:border-[var(--docs-border-strong)] hover:shadow-md"
    >
      <Icon className="size-[1.125rem] text-[var(--docs-link-brand)]" aria-hidden />
      <span className="mt-5 font-semibold text-[0.9375rem] text-foreground">{title}</span>
      <span className="mt-1 line-clamp-3 text-[0.8125rem] text-muted-foreground leading-5">
        {children}
      </span>
    </Link>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 font-semibold text-[1.0625rem] text-foreground tracking-[-0.01em]">
      {children}
    </h2>
  );
}

/** A titled two-column list of icon rows, used for the landing's link groups. */
export function DocsLinkList({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="not-prose mt-12">
      <SectionTitle>{title}</SectionTitle>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">{children}</ul>
    </section>
  );
}

function LinkRow({
  icon: Icon,
  title,
  badge,
  latest,
  children,
}: {
  icon: IconType;
  title: string;
  badge?: string;
  latest?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      <Icon
        className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        aria-hidden
      />
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2">
          <span className="truncate font-medium text-[0.875rem] text-foreground">{title}</span>
          {badge ? (
            <span
              className={cn(
                "shrink-0 rounded-full px-1.5 py-px font-mono text-[0.625rem]",
                latest
                  ? "bg-[var(--docs-nav-active)] text-[var(--docs-nav-active-fg)]"
                  : "bg-[var(--docs-panel)] text-muted-foreground",
              )}
            >
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 line-clamp-2 text-[0.8125rem] text-muted-foreground leading-5">
          {children}
        </span>
      </span>
    </>
  );
}

const LINK_ROW_CLASS =
  "group -mx-2 flex gap-3 rounded-lg px-2 py-2.5 no-underline transition-colors hover:bg-[var(--docs-panel)]/70";

export function DocsLinkItem({
  title,
  href,
  icon,
  children,
}: {
  title: string;
  href: string;
  icon?: DocsCardIcon | IconType;
  children?: ReactNode;
}) {
  return (
    <li>
      <Link to={href} className={LINK_ROW_CLASS}>
        <LinkRow icon={docsCardIcon(icon)} title={title}>
          {children}
        </LinkRow>
      </Link>
    </li>
  );
}

/** The latest releases from the changelog, in the same row style as `DocsLinkList`. */
export function DocsRecentReleases({ title, count = 4 }: { title: string; count?: number }) {
  const releases = changelogReleases
    .filter((release) => release.title && release.summary)
    .slice(0, count)
    .map(getLocalizedChangelogRelease);
  return (
    <section className="not-prose mt-12">
      <SectionTitle>{title}</SectionTitle>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
        {releases.map((release, index) => (
          <li key={release.version}>
            <a href={release.href} target="_blank" rel="noreferrer" className={LINK_ROW_CLASS}>
              <LinkRow
                icon={index === 0 ? Sparkles : Tag}
                title={release.title ?? release.version}
                badge={release.version}
                latest={index === 0}
              >
                {release.summary}
              </LinkRow>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
