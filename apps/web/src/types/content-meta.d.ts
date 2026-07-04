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

declare module "virtual:localized-content" {
  import type { BlogMdxModule } from "@/lib/blog/mdx-loaders";
  import type { DocMdxModule, RawMdxModule } from "@/lib/docs/mdx-loaders";
  import type { GuideMdxModule } from "@/lib/guides/mdx-loaders";

  export const localizedDocsMdxLoaders: Record<string, () => Promise<DocMdxModule>>;
  export const localizedDocsRawMdxLoaders: Record<string, () => Promise<RawMdxModule>>;
  export const localizedGuideMdxLoaders: Record<string, () => Promise<GuideMdxModule>>;
  export const localizedBlogMdxLoaders: Record<string, () => Promise<BlogMdxModule>>;
}
