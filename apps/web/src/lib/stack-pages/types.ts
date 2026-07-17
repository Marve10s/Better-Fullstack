import type { StackSelectionState } from "@better-fullstack/types/stack-translation";

export type PublishedStackSeed = {
  slug: string;
  status: "published" | "candidate";
  priority: number;
  primaryKeyword: string;
  keywordAliases: string[];
  selection: Partial<StackSelectionState>;
  guideUrl?: string;
  updated: string;
};

export type GeneratedStackPart = {
  role: string;
  category: string;
  id: string;
  label: string;
  description?: string;
  ownership: string;
};

export type GeneratedStackPage = {
  slug: string;
  status: PublishedStackSeed["status"];
  priority: number;
  primaryKeyword: string;
  keywordAliases: string[];
  ecosystem: string;
  title: string;
  description: string;
  selection: StackSelectionState;
  canonicalParts: GeneratedStackPart[];
  architecture: {
    shape: "single-app" | "split-app" | "backend-service" | "rust-fullstack";
    facts: string[];
  };
  command: string;
  builderUrl: string;
  meaningfulParameters: Array<{ key: string; value: string }>;
  output: {
    fileCount: number;
    directoryCount: number;
    layout: "workspace" | "single-directory";
    topLevelEntries: string[];
    representativeFiles: string[];
  };
  compatibility: {
    graphIssueCount: 0;
    selectedOptionIssueCount: 0;
    typesPackageVersion: string;
    constraints: string[];
    runtimeVerified: false;
  };
  relatedSlugs: string[];
  guideUrl?: string;
  contentHash: string;
  updated: string;
};

export type StackPageSummary = Pick<
  GeneratedStackPage,
  "slug" | "status" | "title" | "description" | "ecosystem" | "updated"
>;
