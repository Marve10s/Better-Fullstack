import type { IconType } from "react-icons";

import { Link, useLocation } from "@tanstack/react-router";
import {
  TbBook2 as Book,
  TbFileText as FileText,
  TbMap2 as Map,
  TbSparkles as Sparkles,
  TbTerminal2 as Terminal,
} from "react-icons/tb";

import { DocsSearchTrigger } from "@/components/docs/search-dialog";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const CLI_PARAMS = { _splat: "cli" } as const;
const AI_PARAMS = { _splat: "ai/overview" } as const;

type DocsTab = "docs" | "cli" | "ai" | "guides";

function activeTab(pathname: string): DocsTab | null {
  if (pathname.startsWith("/guides")) return "guides";
  if (!pathname.startsWith("/docs")) return null;
  if (pathname.startsWith("/docs/cli")) return "cli";
  if (pathname.startsWith("/docs/ai")) return "ai";
  return "docs";
}

const TAB_CLASS =
  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[0.8125rem] transition-colors";
const TAB_IDLE =
  "border-transparent text-muted-foreground hover:bg-[var(--docs-card)]/60 hover:text-foreground";
const TAB_ACTIVE = "border-[var(--docs-panel-border)] bg-[var(--docs-card)] text-foreground shadow-sm";

function TabLabel({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <>
      <Icon className="size-3.5" aria-hidden />
      {label}
    </>
  );
}

/**
 * Top of the docs panel: the docs wordmark with the CLI version, the search
 * trigger, and a row of section tabs.
 */
export function DocsPanelHeader() {
  const { pathname } = useLocation();
  const tab = activeTab(pathname);
  const tabClass = (id: DocsTab) => cn(TAB_CLASS, tab === id ? TAB_ACTIVE : TAB_IDLE);

  return (
    <header className="flex flex-col gap-3 px-3 pt-3 pb-3 sm:px-4 sm:pt-4">
      <div className="flex items-center justify-between gap-3">
        <Link to="/docs" className="flex items-center gap-2.5 pl-1">
          <span className="font-semibold text-[1.05rem] text-foreground tracking-[-0.02em]">
            Better Fullstack <span className="font-normal text-muted-foreground">docs</span>
          </span>
          <span className="rounded-md border border-[var(--docs-panel-border)] bg-[var(--docs-card)] px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
            v{__BFS_CLI_VERSION__}
          </span>
        </Link>
        <DocsSearchTrigger className="h-8 w-9 justify-center rounded-lg border-[var(--docs-panel-border)] bg-[var(--docs-card)] px-0 shadow-sm sm:w-64 sm:justify-between sm:px-3" />
      </div>
      <nav aria-label={m.navDocs()} className="-mx-1 flex items-center gap-1 overflow-x-auto px-1">
        <Link to="/docs" className={tabClass("docs")}>
          <TabLabel icon={Book} label={m.navDocs()} />
        </Link>
        <Link to="/docs/$" params={CLI_PARAMS} className={tabClass("cli")}>
          <TabLabel icon={Terminal} label={m.docsSectionCli()} />
        </Link>
        <Link to="/docs/$" params={AI_PARAMS} className={tabClass("ai")}>
          <TabLabel icon={Sparkles} label={m.docsSectionAi()} />
        </Link>
        <Link to="/guides" className={tabClass("guides")}>
          <TabLabel icon={Map} label={m.navGuides()} />
        </Link>
        <a href="/llms.txt" className={cn(TAB_CLASS, TAB_IDLE)}>
          <TabLabel icon={FileText} label="llms.txt" />
        </a>
      </nav>
    </header>
  );
}
