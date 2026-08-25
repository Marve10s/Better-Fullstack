import {
  recommendStarterTrack,
  STARTER_TRACK_DEFINITIONS,
  type StarterTrackId,
} from "@better-fullstack/types";

import { PRESET_TEMPLATES } from "@/lib/stack/constant";

type PresetTemplate = (typeof PRESET_TEMPLATES)[number];

export interface PresetRecommendation {
  presetId: string;
  presetName: string;
  matchedTerms: string[];
  rationale: string;
}

const TRACK_ID_BY_PRESET = new Map<string, StarterTrackId>(
  STARTER_TRACK_DEFINITIONS.map((track) => [track.presetId, track.id]),
);

export function recommendPresetFromBrief(
  brief: string,
  pool: readonly PresetTemplate[] = PRESET_TEMPLATES,
): PresetRecommendation {
  const presets = pool.length > 0 ? pool : PRESET_TEMPLATES;
  const trackIds = presets.flatMap((preset) => {
    const trackId = TRACK_ID_BY_PRESET.get(preset.id);
    return trackId ? [trackId] : [];
  });

  if (trackIds.length === 0) {
    const fallback = presets[0];
    return {
      presetId: fallback.id,
      presetName: fallback.name,
      matchedTerms: [],
      rationale: `No canonical starter track exists in this preset set. Start with ${fallback.name} and review its selections.`,
    };
  }

  const recommendation = recommendStarterTrack(brief, { trackIds });
  const preset = presets.find((candidate) => candidate.id === recommendation.track.presetId);
  if (!preset) {
    throw new Error(`Starter track '${recommendation.track.id}' has no builder preset.`);
  }

  return {
    presetId: preset.id,
    presetName: preset.name,
    matchedTerms: recommendation.matchedTerms,
    rationale: recommendation.rationale,
  };
}
