import { getAllPages } from "@/lib/docs/source";
import { getAllGuidePages } from "@/lib/guides/source";
import { generateSitemapXmlFromEntries, getSitemapEntriesFromPages } from "@/lib/sitemap-core";

export function generateSitemapXml() {
  return generateSitemapXmlFromEntries(
    getSitemapEntriesFromPages({
      docsPages: getAllPages(),
      guidePages: getAllGuidePages(),
    }),
  );
}
