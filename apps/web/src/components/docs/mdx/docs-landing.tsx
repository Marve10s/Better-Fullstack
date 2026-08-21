import type { ReactNode } from "react";

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
  TbLayoutGrid as LayoutGrid,
  TbListDetails as ListDetails,
  TbPlayerPlay as PlayerPlay,
  TbPlug as Plug,
  TbPlus as Plus,
  TbRefresh as Refresh,
  TbRobot as Robot,
  TbServer as Server,
  TbShieldLock as ShieldLock,
  TbSparkles as Sparkles,
  TbStack2 as Stack2,
  TbTerminal2 as Terminal2,
} from "react-icons/tb";

import { cn } from "@/lib/utils";

const CARD_ICONS = {
  adjustments: Adjustments,
  book: Book,
  browser: Browser,
  checklist: Checklist,
  cloud: CloudUpload,
  database: Database,
  download: Download,
  grid: LayoutGrid,
  list: ListDetails,
  play: PlayerPlay,
  plug: Plug,
  plus: Plus,
  refresh: Refresh,
  relation: CirclesRelation,
  robot: Robot,
  server: Server,
  shield: ShieldLock,
  sparkles: Sparkles,
  stack: Stack2,
  terminal: Terminal2,
} as const;

export type DocsCardIcon = keyof typeof CARD_ICONS;

type HeroAction = {
  label: string;
  href: string;
  primary?: boolean;
};

const NO_ACTIONS: HeroAction[] = [];

/**
 * Landing-page hero. It owns the page `<h1>` because `layout: "landing"`
 * turns off the shared docs header that renders one everywhere else.
 */
export function DocsHero({
  title,
  subhead,
  actions = NO_ACTIONS,
  children,
}: {
  title: string;
  subhead?: string;
  actions?: HeroAction[];
  children?: ReactNode;
}) {
  return (
    <section className="not-prose mb-6 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
      <div className="min-w-0">
        <h1 className="font-semibold text-[2.25rem] text-foreground leading-[1.06] tracking-[-0.035em] sm:text-[2.75rem] lg:text-[3.25rem]">
          {title}
        </h1>
        {subhead ? (
          <p className="mt-5 max-w-xl text-base text-muted-foreground! leading-7 md:text-[1.0625rem]">
            {subhead}
          </p>
        ) : null}
        {actions.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {actions.map((action) => (
              <Link
                key={action.href}
                to={action.href}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm no-underline transition-colors",
                  action.primary
                    ? "bg-[#bef264] text-[#0a0a0a] hover:bg-[#d3f88c]"
                    : "border border-[var(--docs-border-subtle)] text-foreground hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-surface-elevated)]",
                )}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col gap-3">{children}</div>
    </section>
  );
}

export function DocsCardGrid({ children }: { children?: ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
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
  icon?: DocsCardIcon;
  children?: ReactNode;
}) {
  const Icon = (icon && CARD_ICONS[icon]) ?? Book;
  return (
    <Link
      to={href}
      className="flex flex-col rounded-md border border-[var(--docs-border-subtle)] bg-fd-background p-4 no-underline transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-surface-elevated)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--docs-border-subtle)] bg-background">
        <Icon className="h-[1.05rem] w-[1.05rem] text-foreground" />
      </span>
      <span className="mt-4 font-semibold text-[0.95rem] text-foreground">{title}</span>
      <div className="mt-1.5 text-sm leading-6 [&_p]:text-muted-foreground!">{children}</div>
    </Link>
  );
}
