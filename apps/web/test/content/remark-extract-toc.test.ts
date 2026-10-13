import type { Heading, Root } from "mdast";

import { describe, expect, it } from "bun:test";

import { remarkExtractToc } from "@/lib/docs/remark-extract-toc";

function headingIds(texts: string[]): (string | undefined)[] {
  const headings: Heading[] = texts.map((value) => ({
    type: "heading",
    depth: 2,
    children: [{ type: "text", value }],
  }));
  const tree: Root = { type: "root", children: [...headings] };
  remarkExtractToc()(tree);
  return headings.map((heading) => (heading.data?.hProperties as { id?: string } | undefined)?.id);
}

describe("remark heading ids", () => {
  it("keeps letters from every script in localized headings", () => {
    expect(
      headingIds([
        "Manual setup",
        "Configuración manual",
        "手動セットアップ",
        "Ручне налаштування",
      ]),
    ).toEqual(["manual-setup", "configuración-manual", "手動セットアップ", "ручне-налаштування"]);
  });
});
