import {
  createStarterTrackFilterSearchParams,
  parseStarterTrackFilters,
  type StarterTrackFilters,
} from "@better-fullstack/types";
import {
  STACK_SELECTION_URL_KEYS,
  createStackSelectionSearchParams as createStackSearchParams,
  normalizeStackSelection as normalizeStackStateSelections,
  parseStackSelectionFromSearch as parseStackFromSearch,
} from "@better-fullstack/types/stack-translation";
import { useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import type { StackSearchParams } from "@/lib/stack/stack-search-schema";

import { normalizeCampaignSlug } from "@/lib/campaign/campaign";
import { PRESET_TEMPLATES } from "@/lib/stack/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack/stack-defaults";
import {
  createDefaultMultiEcosystemShareStack,
  getStackSharePath,
} from "@/lib/stack/stack-share-paths";

type BuilderViewMode = "command" | "preview" | "run" | "presets" | "saved";

type InitialBuilderState = {
  stack: StackState;
  viewMode: BuilderViewMode;
  selectedFile: string;
  campaign?: string;
  starterTrackFilters: StarterTrackFilters;
  initialized: boolean;
};

function searchToStack(search: StackSearchParams | undefined): StackState {
  if (!search) return DEFAULT_STACK;

  return parseStackFromSearch(search);
}

export function getInitialBuilderState(
  search: StackSearchParams | undefined,
  fallbackStack?: StackState,
): InitialBuilderState {
  if (!search) {
    return {
      stack: fallbackStack ?? createDefaultMultiEcosystemShareStack(),
      viewMode: "command",
      selectedFile: "",
      campaign: undefined,
      starterTrackFilters: {},
      initialized: Boolean(fallbackStack),
    };
  }

  const hasStackSelection = Object.values(STACK_SELECTION_URL_KEYS).some(
    (key) => search[key as keyof StackSearchParams] !== undefined,
  );
  const presetId = search.preset;
  const preset = presetId ? PRESET_TEMPLATES.find((t) => t.id === presetId) : undefined;

  return {
    stack: preset
      ? ({ ...DEFAULT_STACK, ...preset.stack } as StackState)
      : hasStackSelection
        ? searchToStack(search)
        : (fallbackStack ?? createDefaultMultiEcosystemShareStack()),
    viewMode: search.view || "command",
    selectedFile: search.file || "",
    campaign: normalizeCampaignSlug(search.campaign),
    starterTrackFilters: parseStarterTrackFilters(search),
    initialized: true,
  };
}

export function createLiveBuilderSearchParams(
  stack: StackState,
  viewMode: BuilderViewMode,
  selectedFile: string,
  campaign?: string,
  starterTrackFilters: StarterTrackFilters = {},
): URLSearchParams {
  const params = createStackSearchParams(normalizeStackStateSelections(stack));

  if (viewMode !== "command") {
    params.set("view", viewMode);
  }

  if (selectedFile) {
    params.set("file", selectedFile);
  }

  const normalizedCampaign = normalizeCampaignSlug(campaign);
  if (normalizedCampaign) {
    params.set("campaign", normalizedCampaign);
  }

  for (const [key, value] of createStarterTrackFilterSearchParams(starterTrackFilters)) {
    params.set(key, value);
  }

  return params;
}

export function useStackState(fallbackStack?: StackState) {
  const search = useSearch({ strict: false }) as StackSearchParams | undefined;
  const initialState = useRef<InitialBuilderState | null>(null);
  if (!initialState.current) {
    initialState.current = getInitialBuilderState(search, fallbackStack);
  }

  const [stack, setStackState] = useState<StackState>(initialState.current.stack);
  const [viewMode, setViewModeState] = useState<BuilderViewMode>(initialState.current.viewMode);
  const [selectedFile, setSelectedFileState] = useState<string>(initialState.current.selectedFile);
  const [campaign, setCampaign] = useState<string | undefined>(initialState.current.campaign);
  const [starterTrackFilters, setStarterTrackFilters] = useState<StarterTrackFilters>(
    initialState.current.starterTrackFilters,
  );
  const initialized = useRef(initialState.current.initialized);

  useEffect(() => {
    if (!initialized.current && search) {
      initialized.current = true;

      const nextInitialState = getInitialBuilderState(search, fallbackStack);
      setStackState(nextInitialState.stack);
      setViewModeState(nextInitialState.viewMode);
      setSelectedFileState(nextInitialState.selectedFile);
      setCampaign(nextInitialState.campaign);
      setStarterTrackFilters(nextInitialState.starterTrackFilters);
    }
  }, [fallbackStack, search]);

  // Sync view mode when search params change after initial mount (e.g. navbar links)
  useEffect(() => {
    if (initialized.current && search?.view) {
      setViewModeState(search.view);
    }
  }, [search?.view]);

  useEffect(() => {
    setCampaign(search?.campaign);
  }, [search?.campaign]);

  useEffect(() => {
    setStarterTrackFilters(parseStarterTrackFilters(search ?? {}));
  }, [search]);

  useEffect(() => {
    if (!initialized.current) return;

    const url = new URL(window.location.href);
    const sharePath = getStackSharePath(stack);
    if (
      sharePath &&
      url.pathname.toLowerCase() === sharePath.toLowerCase() &&
      !url.search &&
      viewMode === "command" &&
      !selectedFile
    ) {
      return;
    }

    const nextParams = createLiveBuilderSearchParams(
      stack,
      viewMode,
      selectedFile,
      campaign,
      starterTrackFilters,
    );
    const nextSearch = nextParams.toString();
    const basePath = url.pathname === "/stack" || url.pathname === "/new" ? url.pathname : "/new";
    const nextUrl = nextSearch ? `${basePath}?${nextSearch}` : basePath;
    const currentUrl = `${url.pathname}${url.search}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }, [campaign, stack, starterTrackFilters, viewMode, selectedFile]);

  const updateStack = useCallback(
    (updates: Partial<StackState> | ((prev: StackState) => Partial<StackState>)) => {
      setStackState((currentStack) => {
        const newUpdates = typeof updates === "function" ? updates(currentStack) : updates;
        return { ...currentStack, ...newUpdates };
      });
    },
    [],
  );

  const setViewMode = useCallback((mode: BuilderViewMode) => {
    setViewModeState(mode);
  }, []);

  const setSelectedFile = useCallback((filePath: string | null) => {
    setSelectedFileState(filePath || "");
  }, []);

  return [
    stack,
    updateStack,
    viewMode,
    setViewMode,
    selectedFile,
    setSelectedFile,
    campaign,
    starterTrackFilters,
    setStarterTrackFilters,
  ] as const;
}
