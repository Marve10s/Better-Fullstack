import { lazy, Suspense, type ComponentType, type ReactNode } from "react";

import { BrowserTelemetryControls } from "@/components/docs/mdx/browser-telemetry-controls";
import { Callout } from "@/components/docs/mdx/callout";
import { CodeBlock } from "@/components/docs/mdx/code-block";
import {
  DocsCard,
  DocsCardGrid,
  DocsLinkItem,
  DocsLinkList,
  DocsRecentReleases,
  DocsWelcome,
} from "@/components/docs/mdx/docs-landing";
import {
  DocsBanner,
  DocsQuickLink,
  DocsQuickLinks,
  DocsQuickstart,
} from "@/components/docs/mdx/docs-quickstart";
import { GuideCompatibilityNote } from "@/components/docs/mdx/guide-compatibility-note";
import { GuideStackSnapshot } from "@/components/docs/mdx/guide-stack-snapshot";
import { McpClientTabs } from "@/components/docs/mdx/mcp-client-tabs";
import { CategoryCount, OptionCount } from "@/components/docs/mdx/option-stats";
import { PMTabs } from "@/components/docs/mdx/pm-tabs";
import { DocsTable } from "@/components/docs/mdx/table";
import { VerificationStatus } from "@/components/docs/mdx/verification-status";

function lazyMdx<P extends object>(load: () => Promise<ComponentType<P>>, fallback: ReactNode) {
  const Lazy = lazy(async () => ({ default: await load() }));
  return function LazyMdxComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Lazy {...props} />
      </Suspense>
    );
  };
}

const CliFlagTable = lazyMdx(
  () => import("@/components/docs/mdx/cli-flags-table").then((mod) => mod.CliFlagTable),
  <div className="not-prose my-6 min-h-80 rounded-lg border border-[var(--docs-border-subtle)]" />,
);
const StarterPackCta = lazyMdx(
  () => import("@/components/docs/mdx/starter-pack-cta").then((mod) => mod.StarterPackCta),
  <div className="not-prose my-8 min-h-72 rounded-md border border-border" />,
);
const StarterPackHub = lazyMdx(
  () => import("@/components/docs/mdx/starter-pack-cta").then((mod) => mod.StarterPackHub),
  <div className="not-prose my-8 min-h-[54rem] sm:min-h-[27rem]" />,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, ComponentType<any>> = {
  pre: CodeBlock,
  table: DocsTable,

  BrowserTelemetryControls,
  Callout,
  CategoryCount,
  CliFlagTable,
  DocsBanner,
  DocsCard,
  DocsCardGrid,
  DocsLinkItem,
  DocsLinkList,
  DocsQuickLink,
  DocsQuickLinks,
  DocsQuickstart,
  DocsRecentReleases,
  DocsWelcome,
  GuideCompatibilityNote,
  GuideStackSnapshot,
  McpClientTabs,
  OptionCount,
  PMTabs,
  StarterPackCta,
  StarterPackHub,
  VerificationStatus,
};
