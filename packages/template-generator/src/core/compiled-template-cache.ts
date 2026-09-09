import type { ProjectConfig } from "@better-fullstack/types";

import Handlebars from "handlebars";

export const COMPILED_TEMPLATE_CACHE_LIMIT = 4096;

const compiledTemplates = new Map<string, HandlebarsTemplateDelegate<ProjectConfig>>();

function compiledTemplateKey(content: string, options?: CompileOptions): string {
  if (!options) return `0:${content}`;

  const serializedOptions = JSON.stringify(options);
  return `1:${serializedOptions.length}:${serializedOptions}${content}`;
}

export function getCompiledTemplate(
  content: string,
  options?: CompileOptions,
): HandlebarsTemplateDelegate<ProjectConfig> {
  const key = compiledTemplateKey(content, options);
  const cached = compiledTemplates.get(key);
  if (cached) {
    compiledTemplates.delete(key);
    compiledTemplates.set(key, cached);
    return cached;
  }

  const compiled = Handlebars.compile<ProjectConfig>(content, options);
  if (compiledTemplates.size >= COMPILED_TEMPLATE_CACHE_LIMIT) {
    const oldest = compiledTemplates.keys().next().value;
    if (oldest !== undefined) compiledTemplates.delete(oldest);
  }
  compiledTemplates.set(key, compiled);
  return compiled;
}

export function clearCompiledTemplateCache(): void {
  compiledTemplates.clear();
}

export function getCompiledTemplateCacheSize(): number {
  return compiledTemplates.size;
}
