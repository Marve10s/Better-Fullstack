import { expect, test } from "bun:test";

import { collectEntryAssets } from "@scripts/performance-entry-assets.mjs";

test("budgets real entries and shared static dependencies without charging lazy routes", () => {
  const assets = collectEntryAssets({
    tiny: { file: "assets/index-tiny.js" },
    client: {
      isEntry: true,
      file: "assets/app.js",
      imports: ["react", "router"],
      css: ["assets/app.css"],
      dynamicImports: ["builder"],
    },
    react: { file: "assets/react.js", imports: ["shared"] },
    router: { file: "assets/router.js", imports: ["shared"] },
    shared: { file: "assets/shared.js", css: ["assets/app.css", "assets/shared.css"] },
    builder: { file: "assets/builder.js" },
  });

  expect(assets.js).toEqual([
    "assets/app.js",
    "assets/react.js",
    "assets/router.js",
    "assets/shared.js",
  ]);
  expect(assets.css).toEqual(["assets/app.css", "assets/shared.css"]);
});

test("fails closed when a static entry dependency is missing", () => {
  expect(() =>
    collectEntryAssets({
      client: { isEntry: true, file: "assets/app.js", imports: ["missing"] },
    }),
  ).toThrow("Missing static dependency");
  expect(() => collectEntryAssets({})).toThrow("no JavaScript entry");
});
