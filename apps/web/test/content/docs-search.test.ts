import { describe, expect, it } from "bun:test";

import ja from "../../content/i18n/ja.json";
import ko from "../../content/i18n/ko.json";
import uk from "../../content/i18n/uk.json";
import zhHant from "../../content/i18n/zh-Hant.json";
import zh from "../../content/i18n/zh.json";
import { buildSearchSections, createDocSearch } from "../../src/lib/docs/search";

describe("localized docs search", () => {
  for (const [locale, content, term] of [
    ["ja", ja, "選択肢"],
    ["zh", zh, "项目"],
    ["zh-Hant", zhHant, "專案"],
    ["ko", ko, "프로젝트"],
    ["uk", uk, "проєкт"],
  ] as const) {
    it(`finds ${locale} words inside translated prose`, async () => {
      const entry = content.docs["cli/create.mdx"];
      const sections = buildSearchSections([
        { url: "/docs/cli/create", rawSource: entry.body, frontmatter: entry.frontmatter },
      ]);
      const search = await createDocSearch(sections, locale);

      expect((await search.query(term))[0]?.pageUrl).toBe("/docs/cli/create");
      expect(await search.query("unrelatedwordthatdoesnotexist")).toEqual([]);
    });
  }

  it("preserves English stemming", async () => {
    const search = await createDocSearch(
      buildSearchSections([
        { url: "/docs/test", rawSource: "Configuring connections", frontmatter: { title: "Test" } },
      ]),
    );
    expect((await search.query("configure"))[0]?.pageUrl).toBe("/docs/test");
  });
});
