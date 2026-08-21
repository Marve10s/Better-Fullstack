import type { Heading, Root } from "mdast";

import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

type RemarkPlugin = () => (tree: Root) => void;

export type TocEntry = {
  depth: number;
  id: string;
  text: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const remarkExtractToc: RemarkPlugin = () => {
  return (tree) => {
    const entries: TocEntry[] = [];

    visit(tree, "heading", (node: Heading) => {
      const text = toString(node).trim();
      if (!text) return;
      const id = slugify(text);

      const data = node.data ?? (node.data = {});
      const hProperties = (data.hProperties ?? (data.hProperties = {})) as {
        id?: string;
        [key: string]: unknown;
      };
      hProperties.id = id;

      if (node.depth === 1) return;

      entries.push({
        depth: node.depth,
        id,
        text,
      });
    });

    /* eslint-disable @typescript-eslint/no-explicit-any */
    tree.children.push({
      type: "mdxjsEsm",
      value: `export const toc = ${JSON.stringify(entries)};`,
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              attributes: [],
              specifiers: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "toc" },
                    init: {
                      type: "ArrayExpression",
                      elements: entries.map((entry) => ({
                        type: "ObjectExpression",
                        properties: [
                          {
                            type: "Property",
                            method: false,
                            shorthand: false,
                            computed: false,
                            kind: "init",
                            key: { type: "Identifier", name: "depth" },
                            value: {
                              type: "Literal",
                              value: entry.depth,
                              raw: String(entry.depth),
                            },
                          },
                          {
                            type: "Property",
                            method: false,
                            shorthand: false,
                            computed: false,
                            kind: "init",
                            key: { type: "Identifier", name: "id" },
                            value: {
                              type: "Literal",
                              value: entry.id,
                              raw: JSON.stringify(entry.id),
                            },
                          },
                          {
                            type: "Property",
                            method: false,
                            shorthand: false,
                            computed: false,
                            kind: "init",
                            key: { type: "Identifier", name: "text" },
                            value: {
                              type: "Literal",
                              value: entry.text,
                              raw: JSON.stringify(entry.text),
                            },
                          },
                        ],
                      })),
                    },
                  },
                ],
              },
            },
          ],
        } as any,
      },
    } as any);
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
};
