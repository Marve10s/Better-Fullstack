declare module "virtual:content-meta" {
  export const docsMeta: ReadonlyArray<{
    filePath: string;
    frontmatter: Record<string, unknown>;
  }>;
  export const guidesMeta: ReadonlyArray<{
    filePath: string;
    frontmatter: Record<string, unknown>;
  }>;
}
