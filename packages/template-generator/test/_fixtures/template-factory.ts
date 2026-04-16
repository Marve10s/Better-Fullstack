import type { TemplateData } from "../../src/template-handlers/utils";

export function makeTemplates(
  entries: Record<string, string> | Array<[string, string]>,
): TemplateData {
  return new Map(Array.isArray(entries) ? entries : Object.entries(entries));
}
