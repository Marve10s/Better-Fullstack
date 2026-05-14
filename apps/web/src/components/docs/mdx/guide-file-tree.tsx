import type { ReactNode } from "react";

type FileTreeItem = {
  name: ReactNode;
  description?: ReactNode;
  children?: FileTreeItem[];
};

const EMPTY_TREE_ITEMS: FileTreeItem[] = [];

export function GuideFileTree({
  title,
  items = EMPTY_TREE_ITEMS,
  children,
}: {
  title?: ReactNode;
  items?: FileTreeItem[];
  children?: ReactNode;
}) {
  return (
    <section className="not-prose my-5 rounded-md border border-border bg-muted/10 p-4">
      {title ? (
        <div className="mb-3 font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.06em]">
          {title}
        </div>
      ) : null}
      {items.length > 0 ? <FileTreeList items={items} /> : null}
      {children ? <div className="text-sm [&_code]:font-mono [&_ul]:m-0 [&_ul]:space-y-1">{children}</div> : null}
    </section>
  );
}

function FileTreeList({ items, depth = 0 }: { items: FileTreeItem[]; depth?: number }) {
  return (
    <ul className="m-0 space-y-1 p-0 text-sm">
      {items.map((item) => (
        <li key={`${depth}-${String(item.name)}`} className="list-none">
          <div className="flex min-w-0 items-start gap-2">
            <span className="mt-[0.62rem] h-px w-3 shrink-0 bg-border" aria-hidden="true" />
            <div className="min-w-0">
              <span className="font-mono text-foreground text-xs">{item.name}</span>
              {item.description ? (
                <span className="ml-2 text-muted-foreground text-xs">{item.description}</span>
              ) : null}
            </div>
          </div>
          {item.children?.length ? (
            <div className="ml-3 border-border border-l pl-3">
              <FileTreeList items={item.children} depth={depth + 1} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
