const BINARY_TEMPLATE_PREFIX = "../../../packages/template-generator/templates-binary/";

const binaryTemplateModules = import.meta.glob(
  "../../../packages/template-generator/templates-binary/**/*",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as Record<string, string>;

const binaryTemplateUrls = new Map(
  Object.entries(binaryTemplateModules).map(([modulePath, url]) => [
    modulePath.slice(BINARY_TEMPLATE_PREFIX.length),
    url,
  ]),
);

export async function loadBinaryTemplate(sourcePath: string): Promise<Uint8Array> {
  const url = binaryTemplateUrls.get(sourcePath);
  if (!url) {
    throw new Error(`Missing browser binary template: ${sourcePath}`);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load browser binary template: ${sourcePath}`);
  }

  return new Uint8Array(await response.arrayBuffer());
}
