import type { IconType } from "react-icons";

import {
  TbApi as Api,
  TbBook as Book,
  TbBrandCSharp as CSharp,
  TbBrandGolang as Golang,
  TbBrandPython as Python,
  TbBrandReact as ReactIcon,
  TbBrandRust as Rust,
  TbBrandTypescript as TypeScript,
  TbBuildingStore as Store,
  TbCoffee as Coffee,
  TbDeviceMobile as Mobile,
  TbPackage as Package,
  TbRobot as Robot,
  TbSparkles as Sparkles,
  TbTool as Tool,
} from "react-icons/tb";

import type { FolderNode, PageNode } from "@/lib/docs/source";

import { DocsSidebar } from "@/components/docs/sidebar";
import { type GuidePage, getGuideListPages, getGuidePage } from "@/lib/guides/source";
import { localizeGuidePage } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

/** Base (English) category names from guide frontmatter, in sidebar order. */
const CATEGORY_ORDER = [
  "Packs",
  "TypeScript",
  "React Native",
  "Python",
  "Rust",
  "Go",
  "Java",
  ".NET",
  "AI Tools",
] as const;

const CATEGORY_ICONS: Record<string, IconType> = {
  Packs: Package,
  TypeScript,
  "React Native": ReactIcon,
  Python,
  Rust,
  Go: Golang,
  Java: Coffee,
  ".NET": CSharp,
  "AI Tools": Sparkles,
};

const PACK_ICONS: Record<string, IconType> = {
  "create-saas-app": Store,
  "create-ai-agent-app": Robot,
  "create-rest-api": Api,
  "create-java-api": Coffee,
  "create-rust-backend": Rust,
  "create-mobile-app": Mobile,
  "create-internal-tool": Tool,
};

export type GuideCategory = {
  key: string;
  label: string;
  icon: IconType;
  /** The category's own landing page, when it has one (for example `packs/index`). */
  index?: GuidePage;
  pages: GuidePage[];
};

function categoryRank(key: string) {
  const rank = CATEGORY_ORDER.indexOf(key as (typeof CATEGORY_ORDER)[number]);
  return rank === -1 ? CATEGORY_ORDER.length : rank;
}

/** Localized guides grouped by their base category, in sidebar order. */
export function getGuideCategories(): GuideCategory[] {
  const byKey = new Map<string, GuideCategory>();
  for (const page of getGuideListPages()) {
    const key = page.frontmatter.category ?? "Guides";
    const localized = localizeGuidePage(page);
    let category = byKey.get(key);
    if (!category) {
      category = {
        key,
        label: localized.frontmatter.category ?? key,
        icon: CATEGORY_ICONS[key] ?? Book,
        pages: [],
      };
      byKey.set(key, category);
    }
    // A one-segment slug is a category folder's own index (`packs/index.mdx`).
    if (page.slug.length === 1) {
      category.index = localized;
    } else {
      category.pages.push(localized);
    }
  }
  return Array.from(byKey.values()).sort((a, b) => categoryRank(a.key) - categoryRank(b.key));
}

export function guideIcon(page: GuidePage, category: GuideCategory): IconType {
  return PACK_ICONS[page.slug.at(-1) ?? ""] ?? category.icon;
}

function toPageNode(page: GuidePage, name = page.frontmatter.title ?? page.url): PageNode {
  return { type: "page", name, slug: page.slug, url: page.url, frontmatter: page.frontmatter };
}

function guidesTree(): FolderNode {
  const overview = getGuidePage([]);
  return {
    type: "folder",
    name: m.navGuides(),
    defaultOpen: true,
    children: [
      ...(overview ? [toPageNode(overview, m.docsSectionOverview())] : []),
      ...getGuideCategories().map(
        (category): FolderNode => ({
          type: "folder",
          name: category.label,
          defaultOpen: false,
          index: category.index,
          children: category.pages.map((page) => toPageNode(page)),
        }),
      ),
    ],
  };
}

export function GuidesSidebar() {
  return <DocsSidebar tree={guidesTree()} />;
}
