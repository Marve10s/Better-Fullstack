import { STARTER_TRACK_DEFINITIONS, type StarterTrackDefinition } from "@better-fullstack/types";

export type StarterTrack = StarterTrackDefinition;

export const STARTER_TRACKS = STARTER_TRACK_DEFINITIONS;

export function getStarterTrackBuilderSearch(track: StarterTrack) {
  return {
    preset: track.presetId,
    view: "command" as const,
  };
}

export function getStarterTracksForEcosystem(ecosystem: string) {
  return STARTER_TRACKS.filter((track) => track.ecosystem === ecosystem);
}

export function getStarterTrackById(id: string) {
  return STARTER_TRACKS.find((track) => track.id === id);
}
