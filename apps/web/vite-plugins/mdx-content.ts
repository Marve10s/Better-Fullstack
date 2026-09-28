import type { Plugin } from "vite";

import mdx from "@mdx-js/rollup";

export function mdxContentPlugin(options: Parameters<typeof mdx>[0]): Plugin {
  const plugin = mdx(options);
  const transform = plugin.transform;
  return {
    ...plugin,
    enforce: "pre",
    transform(code, id) {
      // Raw imports feed full-text search and Markdown exports, not React components.
      if (new URLSearchParams(id.split("?")[1]).has("raw")) return;
      return transform.call(this, code, id);
    },
  };
}
