declare module "virtual:content-meta" {
  type ContentMetaEntry = {
    filePath: string;
    frontmatter: Record<string, unknown>;
    localizedFrontmatter?: Partial<Record<"es" | "zh", Record<string, unknown>>>;
  };

  export const docsMeta: ReadonlyArray<ContentMetaEntry>;
  export const guidesMeta: ReadonlyArray<ContentMetaEntry>;
  export const blogMeta: ReadonlyArray<ContentMetaEntry>;
}
