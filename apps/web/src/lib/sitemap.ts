import { getAllPages } from "@/lib/docs/source";
import { getAllGuidePages } from "@/lib/guides/source";
import {
  generateSitemapXmlFromEntries,
  getSitemapEntriesFromPages,
  type SitemapEntry,
} from "@/lib/sitemap-core";

export function getSitemapEntries(): SitemapEntry[] {
  return getSitemapEntriesFromPages({
    docsPages: getAllPages(),
    guidePages: getAllGuidePages(),
  });
}

export function generateSitemapXml() {
  return generateSitemapXmlFromEntries(getSitemapEntries());
}
