import type { Ecosystem } from "@/types";

import { getConfigScopePromptKeys, type ConfigScope } from "@/prompts/core/config-scope";

const PROMPTS_BEFORE_SCOPED_KEYS = 4;
const REVIEW_CHAPTERS = 1;

export type ChapterContext = {
  ecosystem?: Ecosystem;
  scope?: ConfigScope;
  selectedSectionIds?: readonly string[];
  answered: number;
  reviewing: boolean;
};

export type ChapterProgress = { position: number; total: number };

export function chapterProgress(context: ChapterContext): ChapterProgress {
  const scopedKeys = getConfigScopePromptKeys(
    context.ecosystem ?? "typescript",
    context.scope ?? "core",
    [...(context.selectedSectionIds ?? [])],
  );
  const position = context.answered + 1;
  const total = Math.max(PROMPTS_BEFORE_SCOPED_KEYS + scopedKeys.size + REVIEW_CHAPTERS, position);
  return { position: context.reviewing ? total : position, total };
}
