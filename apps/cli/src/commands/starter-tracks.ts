import {
  getStarterTrackCatalog,
  normalizeStackSelection,
  recommendStarterTrack,
  stackSelectionToProjectConfig,
  type ProjectConfig,
  type StarterTrackFilters,
  type StarterTrackId,
} from "@better-fullstack/types";

import { generateReproducibleCommand } from "../utils/generate-reproducible-command";

export type StarterTrackCatalogOptions = {
  ecosystem?: ProjectConfig["ecosystem"];
  filters?: StarterTrackFilters;
  receipt?: unknown;
  trackId?: StarterTrackId;
};

export function getStarterTracksResult(options: StarterTrackCatalogOptions = {}) {
  const catalog = getStarterTrackCatalog({
    filters: options.filters,
    receipt: options.receipt,
  });
  const tracks = catalog.tracks.filter(
    (track) =>
      (!options.ecosystem || track.ecosystem === options.ecosystem) &&
      (!options.trackId || track.id === options.trackId),
  );

  return {
    ...catalog,
    ecosystem: options.ecosystem ?? null,
    trackId: options.trackId ?? null,
    total: tracks.length,
    tracks,
  };
}

export function getStarterTrackRecommendation(options: {
  brief: string;
  ecosystem?: ProjectConfig["ecosystem"];
  projectName?: string;
  receipt?: unknown;
}) {
  const projectName = options.projectName ?? "my-app";
  const recommendation = recommendStarterTrack(options.brief, {
    ecosystem: options.ecosystem,
    receipt: options.receipt,
  });
  const selection = normalizeStackSelection({
    ...recommendation.track.selection,
    projectName,
  });
  const config = stackSelectionToProjectConfig(selection, {
    projectDir: `/${projectName}`,
    relativePath: projectName,
  });

  return {
    ...recommendation,
    projectName,
    track: {
      ...recommendation.track,
      selection,
    },
    reproducibleCommand: generateReproducibleCommand(config),
  };
}
