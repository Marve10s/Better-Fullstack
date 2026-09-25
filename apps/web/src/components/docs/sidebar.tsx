import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

import {
  type FolderNode,
  getLocalizedPageTree,
  type PageNode,
  type PageTreeNode,
} from "@/lib/docs/source";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const ACTIVE_BG_TRANSITION = { type: "spring", stiffness: 380, damping: 32 } as const;

/**
 * Top-level docs sidebar. Separators from `meta.json` render as section
 * labels; folders are `<details>` elements so collapsed state survives a
 * reload via `defaultOpen`.
 *
 * The active page's tinted background is a `motion.span` with `layoutId`, so
 * it slides between pages on client-side navigation.
 */
export function DocsSidebar({ tree, className }: { tree?: FolderNode; className?: string }) {
  const location = useLocation();
  const currentUrl = location.pathname.replace(/\/$/, "") || "/docs";
  const pageTree = tree ?? getLocalizedPageTree();

  return (
    <nav
      aria-label={m.navDocs()}
      className={cn("flex w-full flex-col gap-0.5 px-1 pt-2 pb-6 text-sm", className)}
    >
      {pageTree.children.map((node, index) => (
        <SidebarNode key={getNodeKey(node, index)} node={node} currentUrl={currentUrl} depth={0} />
      ))}
    </nav>
  );
}

function getNodeKey(node: PageTreeNode, index: number): string {
  if (node.type === "page") return `page:${node.url}`;
  if (node.type === "folder") return `folder:${node.name}:${index}`;
  return `sep:${node.name}:${index}`;
}

function SidebarNode({
  node,
  currentUrl,
  depth,
}: {
  node: PageTreeNode;
  currentUrl: string;
  depth: number;
}) {
  if (node.type === "separator")
    return (
      <p className="mt-5 mb-1 select-none px-2.5 font-semibold text-[0.75rem] text-foreground first:mt-1">
        {node.name}
      </p>
    );
  if (node.type === "folder")
    return <SidebarFolder folder={node} currentUrl={currentUrl} depth={depth} />;
  return <SidebarPageLink page={node} currentUrl={currentUrl} depth={depth} />;
}

function SidebarFolder({
  folder,
  currentUrl,
  depth,
}: {
  folder: FolderNode;
  currentUrl: string;
  depth: number;
}) {
  const [open, setOpen] = useState(folder.defaultOpen);
  const handleToggle = useCallback((event: React.SyntheticEvent<HTMLDetailsElement>) => {
    setOpen(event.currentTarget.open);
  }, []);
  const childContains = (children: PageTreeNode[]): boolean =>
    children.some((c) => {
      if (c.type === "page") return c.url === currentUrl;
      if (c.type === "folder") return c.index?.url === currentUrl || childContains(c.children);
      return false;
    });
  // Auto-expand when a descendant is active so deep links land with the
  // section already open even if `defaultOpen` was false.
  const expanded = open || folder.index?.url === currentUrl || childContains(folder.children);
  const indexPage = useMemo<PageNode | null>(() => {
    if (!folder.index) return null;
    return {
      type: "page",
      name: folder.index.frontmatter.title ?? "Overview",
      slug: folder.index.slug,
      url: folder.index.url,
      frontmatter: folder.index.frontmatter,
    };
  }, [folder.index]);
  const nestedOnlyFolder =
    !folder.index && folder.children.length === 1 && folder.children[0]?.type === "folder"
      ? folder.children[0]
      : null;
  const visibleIndexPage = useMemo<PageNode | null>(() => {
    if (!nestedOnlyFolder?.index) return indexPage;
    return {
      type: "page",
      name: nestedOnlyFolder.index.frontmatter.title ?? nestedOnlyFolder.name,
      slug: nestedOnlyFolder.index.slug,
      url: nestedOnlyFolder.index.url,
      frontmatter: nestedOnlyFolder.index.frontmatter,
    };
  }, [indexPage, nestedOnlyFolder]);
  const visibleChildren = nestedOnlyFolder ? nestedOnlyFolder.children : folder.children;

  return (
    <details open={expanded} onToggle={handleToggle} className="group select-none">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2.5 py-1.5 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-[var(--docs-card)]/70 hover:text-foreground [&::-webkit-details-marker]:hidden">
        <span>{folder.name}</span>
        <ChevronIcon
          className={cn(
            "size-3 transition-transform duration-200",
            expanded ? "rotate-90" : "rotate-0",
          )}
        />
      </summary>
      <ul className="mt-0.5 mb-1 ml-3 flex flex-col gap-0.5 border-[var(--docs-panel-border)] border-l pl-1.5">
        {visibleIndexPage ? (
          <li>
            <SidebarPageLink page={visibleIndexPage} currentUrl={currentUrl} depth={depth + 1} />
          </li>
        ) : null}
        {visibleChildren.map((child, index) => (
          <li key={getNodeKey(child, index)}>
            <SidebarNode node={child} currentUrl={currentUrl} depth={depth + 1} />
          </li>
        ))}
      </ul>
    </details>
  );
}

function SidebarPageLink({
  page,
  currentUrl,
  depth,
}: {
  page: PageNode;
  currentUrl: string;
  depth: number;
}) {
  const isActive = page.url === currentUrl;
  const style = useMemo(
    () => ({ "--sidebar-pad": `${0.625 + Math.max(0, depth - 1) * 0.5}rem` }) as React.CSSProperties,
    [depth],
  );
  return (
    <Link
      to={page.url}
      className={cn(
        "relative flex items-center rounded-md py-1.5 text-[0.8125rem] leading-snug transition-colors",
        "pl-[var(--sidebar-pad)] pr-3",
        isActive
          ? "font-medium text-[var(--docs-nav-active-fg)]"
          : "text-muted-foreground hover:bg-[var(--docs-card)]/70 hover:text-foreground",
      )}
      style={style}
    >
      {isActive ? (
        <motion.span
          layoutId="docs-sidebar-active-bg"
          aria-hidden="true"
          className="absolute inset-0 rounded-md bg-[var(--docs-nav-active)]"
          transition={ACTIVE_BG_TRANSITION}
        />
      ) : null}
      <span className="relative truncate">{page.name}</span>
    </Link>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}
