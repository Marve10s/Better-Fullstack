import type { ComponentType } from "react";

import { BenchBarChart } from "./bench-bar-chart";
import { BrowserTelemetryControls } from "./browser-telemetry-controls";
import { Callout } from "./callout";
import { CliFlagTable } from "./cli-flags-table";
import { CodeBlock } from "./code-block";
import { DocsCard, DocsCardGrid, DocsHero } from "./docs-landing";
import { GuideCompatibilityNote } from "./guide-compatibility-note";
import { GuideStackSnapshot } from "./guide-stack-snapshot";
import { McpClientTabs } from "./mcp-client-tabs";
import { CategoryCount, OptionCount } from "./option-stats";
import { PMTabs } from "./pm-tabs";
import { StarterPackCta, StarterPackHub } from "./starter-pack-cta";
import { DocsTable } from "./table";
import { VerificationStatus } from "./verification-status";

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
