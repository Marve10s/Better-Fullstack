import type { Heading, Root } from "mdast";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

type RemarkPlugin = () => (tree: Root) => void;

/**
 * A heading entry exported from each compiled MDX module.
 *
 * `id` is the GitHub-style slug used as the anchor target. `depth` is the
 * heading level (h2-h4 are typically rendered in the sidebar TOC). `text`
 * is the rendered heading text with markdown stripped.
 */
export type TocEntry = {
  depth: number;
  id: string;
  text: string;
};

/**
 * Convert heading text into a kebab-case slug compatible with
 * `rehype-slug`'s GitHub-style algorithm. We do this ourselves instead of
 * pulling in `github-slugger` since the markdown content here is plain
 * ASCII and the small subset of normalizations is easy to spell out.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Remark plugin that walks every `heading` node, builds a TOC entry list,
 * and emits an ESM `export const toc = [...]` so importers can read it as a
 * named export from the compiled MDX module.
 *
 * We deliberately ignore h1 because each docs page renders the page title
 * outside the MDX content (from frontmatter), so the body's TOC starts at
 * h2.
 */
export const remarkExtractToc: RemarkPlugin = () => {
  return (tree) => {
    const entries: TocEntry[] = [];

    visit(tree, "heading", (node: Heading) => {
      const text = toString(node).trim();
      if (!text) return;
      const id = slugify(text);

      // Ensure the rendered <h2|h3|h4> element gets an `id` attribute so
      // anchor links + active-heading observation can target it. Setting
      // it here (instead of via rehype-slug) keeps the slug algorithm in
      // a single place — guaranteeing TOC entries always match DOM ids.
      const data = node.data ?? (node.data = {});
      const hProperties = (data.hProperties ?? (data.hProperties = {})) as {
        id?: string;
        [key: string]: unknown;
      };
      hProperties.id = id;

      // h1 is rendered outside the MDX body (from frontmatter), so we
      // assign an id but skip it in the TOC entries.
      if (node.depth === 1) return;

      entries.push({
        depth: node.depth,
        id,
        text,
      });
    });

    // Inject `export const toc = [...]` as an ESM statement at the end of
    // the MDX AST. `mdxjsEsm` is the node type produced by
    // `remark-mdx-frontmatter` for similar named exports.
    //
    // The estree below is hand-rolled (we don't pull in acorn/escodegen for
    // a single object literal). It's cast to `any` because the upstream
    // ESTree types in `@types/mdast` and the `mdxjsEsm` node type require
    // fields like `attributes` and source-position metadata that are not
    // actually consulted at build time — the value string is parsed by
    // `acorn` inside MDX's pipeline and the synthesized estree is only a
    // hint. Asserting here keeps the runtime behaviour while staying
    // strict-mode clean.
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
                            value: { type: "Literal", value: entry.depth, raw: String(entry.depth) },
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
