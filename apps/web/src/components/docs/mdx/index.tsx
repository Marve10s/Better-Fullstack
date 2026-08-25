import type { ComponentType } from "react";

import { BenchBarChart } from "@/components/docs/mdx/bench-bar-chart";
import { BrowserTelemetryControls } from "@/components/docs/mdx/browser-telemetry-controls";
import { Callout } from "@/components/docs/mdx/callout";
import { CliFlagTable } from "@/components/docs/mdx/cli-flags-table";
import { CodeBlock } from "@/components/docs/mdx/code-block";
import { DocsCard, DocsCardGrid, DocsHero } from "@/components/docs/mdx/docs-landing";
import { GuideCompatibilityNote } from "@/components/docs/mdx/guide-compatibility-note";
import { GuideStackSnapshot } from "@/components/docs/mdx/guide-stack-snapshot";
import { McpClientTabs } from "@/components/docs/mdx/mcp-client-tabs";
import { CategoryCount, OptionCount } from "@/components/docs/mdx/option-stats";
import { PMTabs } from "@/components/docs/mdx/pm-tabs";
import { StarterPackCta, StarterPackHub } from "@/components/docs/mdx/starter-pack-cta";
import { DocsTable } from "@/components/docs/mdx/table";
import { VerificationStatus } from "@/components/docs/mdx/verification-status";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, ComponentType<any>> = {
  pre: CodeBlock,
  table: DocsTable,

  BenchBarChart,
  BrowserTelemetryControls,
  Callout,
  CategoryCount,
  CliFlagTable,
  DocsCard,
  DocsCardGrid,
  DocsHero,
  GuideCompatibilityNote,
  GuideStackSnapshot,
  McpClientTabs,
  OptionCount,
  PMTabs,
  StarterPackCta,
  StarterPackHub,
  VerificationStatus,
};
