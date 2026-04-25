import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

import { DocsSearchTrigger } from "@/components/docs/search-dialog";
import {
  type FolderNode,
  type PageNode,
  pageTree,
  type PageTreeNode,
} from "@/lib/docs/source";
import { cn } from "@/lib/utils";

/**
 * Top-level docs sidebar. Renders the page tree as a list of sections (each
 * a `<details>` element so collapsed state is preserved through reloads via
 * `defaultOpen`) interleaved with mono-uppercase separators.
 *
 * Active link styling uses a `motion.div` with `layoutId` so the indicator
 * rail animates between pages on client-side navigation. The rail is
 * intentionally subtle — a 1px column to the left of the link, painted with
 * the foreground color, drawn via React's layout animation (no JS scroll
 * math needed).
 */
export function DocsSidebar({ className }: { className?: string }) {
  const location = useLocation();
  const currentUrl = location.pathname.replace(/\/$/, "") || "/docs";

  return (
    <nav
      aria-label="Documentation"
      className={cn(
        "flex w-full flex-col gap-7 px-4 py-8 font-mono text-sm",
        className,
      )}
    >
      <DocsSearchTrigger className="w-full justify-between rounded-lg px-3 py-2 text-[0.78rem]" />
      {pageTree.children.map((node, index) => (
        <SidebarNode
          key={getNodeKey(node, index)}
          node={node}
          currentUrl={currentUrl}
          depth={0}
        />
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
  if (node.type === "separator") return null;
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
  const childContains = (children: PageTreeNode[]): boolean =>
    children.some((c) => {
      if (c.type === "page") return c.url === currentUrl;
      if (c.type === "folder")
        return c.index?.url === currentUrl || childContains(c.children);
      return false;
    });
  // Auto-expand when a descendant is active so deep links land with the
  // section already open even if `defaultOpen` was false.
  const expanded = open || childContains(folder.children);

  return (
    <details
      open={expanded}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="group select-none"
    >
      <summary className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground">
        <span>{folder.name}</span>
        <ChevronIcon
          className={cn(
            "size-3 transition-transform duration-200",
            expanded ? "rotate-90" : "rotate-0",
          )}
        />
      </summary>
      <ul className="mt-1 flex flex-col">
        {folder.index ? (
          <li>
            <SidebarPageLink
              page={{
                type: "page",
                name: folder.index.frontmatter.title ?? "Overview",
                slug: folder.index.slug,
                url: folder.index.url,
                frontmatter: folder.index.frontmatter,
              }}
              currentUrl={currentUrl}
              depth={depth + 1}
            />
          </li>
        ) : null}
        {folder.children.map((child, index) => (
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
  return (
    <Link
      to={page.url}
      className={cn(
        "relative flex items-center py-1.5 text-[0.82rem] leading-snug transition-colors",
        // Indentation: 2 base + (depth × 2.5) for visual hierarchy. Mono
        // font keeps the column rhythm stable.
        "pl-[var(--sidebar-pad)] pr-3",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      style={{ "--sidebar-pad": `${0.5 + depth * 0.7}rem` } as React.CSSProperties}
    >
      {isActive ? (
        <motion.span
          layoutId="docs-sidebar-active-rail"
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-foreground"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-border" />
      )}
      <span className="truncate">{page.name}</span>
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
