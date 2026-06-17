declare module "virtual:content-meta" {
  import type { LocalizedContentLocale } from "@/lib/i18n/locales";

  type ContentMetaEntry = {
    filePath: string;
    frontmatter: Record<string, unknown>;
    localizedFrontmatter?: Partial<Record<LocalizedContentLocale, Record<string, unknown>>>;
  };

  export const docsMeta: ReadonlyArray<ContentMetaEntry>;
  export const guidesMeta: ReadonlyArray<ContentMetaEntry>;
  export const blogMeta: ReadonlyArray<ContentMetaEntry>;
}
