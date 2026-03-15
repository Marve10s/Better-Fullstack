import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

// ── Mock data ────────────────────────────────────────────────────────
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

const PRODUCTS: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Product ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) || ""}`,
  category: ["Electronics", "Clothing", "Books", "Home", "Sports"][i % 5],
  price: Math.round((Math.random() * 200 + 10) * 100) / 100,
  rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
}));

export const Route = createFileRoute("/showcase/table")({
  component: TableShowcase,
});

// ── Traditional: manual table ────────────────────────────────────────
function TraditionalTable() {
  const [sortKey, setSortKey] = useState<keyof Product>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const sorted = [...PRODUCTS].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sortDir === "asc" ? cmp : -cmp;
  });
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(PRODUCTS.length / pageSize);

  const toggleSort = (key: keyof Product) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Manual sort state, manual pagination, manual rendering
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {(["name", "category", "price", "rating"] as const).map((key) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="cursor-pointer px-3 py-2 text-left font-medium hover:text-foreground"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortKey === key && (sortDir === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.category}</td>
                <td className="px-3 py-2">{`$${p.price.toFixed(2)}`}</td>
                <td className="px-3 py-2">{p.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="rounded border border-border px-2 py-1 disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className="rounded border border-border px-2 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ── TanStack Table ───────────────────────────────────────────────────
const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
    cell: (info) => info.getValue().toFixed(1),
  }),
];

function TanStackTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: PRODUCTS,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Declarative columns — sorting & pagination are plugins
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-primary/20">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-3 py-2 text-left font-medium hover:text-primary"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ↑"
                      : header.column.getIsSorted() === "desc"
                        ? " ↓"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-primary/10">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded border border-primary/30 px-2 py-1 text-primary disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded border border-primary/30 px-2 py-1 text-primary disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ── Page layout ──────────────────────────────────────────────────────
function TableShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/showcase"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Showcase
      </Link>
      <h1 className="mb-2 text-3xl font-bold">TanStack Table</h1>
      <p className="mb-8 text-muted-foreground">
        A headless table engine — define columns declaratively, get sorting,
        filtering, and pagination as composable plugins.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 rounded-t-lg border border-red-500/20 bg-red-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">
              Traditional: manual table logic
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-border p-4 opacity-75">
            <TraditionalTable />
          </div>
        </section>

        <section>
          <div className="mb-3 rounded-t-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              TanStack Table
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-primary/20 p-4">
            <TanStackTable />
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Why TanStack Table?</strong> Manual
        tables require re-implementing sort, filter, and pagination for every
        table. TanStack Table provides a headless state machine — you own the
        markup, it owns the logic. Add features like column resizing, row
        selection, or grouping by composing model functions.
      </div>
    </div>
  );
}
