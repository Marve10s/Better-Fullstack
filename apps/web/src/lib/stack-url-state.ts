import { useSearch } from "@tanstack/react-router";
import {
  createStackSelectionSearchParams as createStackSearchParams,
  normalizeStackSelection as normalizeStackStateSelections,
  parseStackSelectionFromSearch as parseStackFromSearch,
} from "@better-fullstack/types/stack-translation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { StackSearchParams } from "@/lib/stack-search-schema";

import { PRESET_TEMPLATES } from "@/lib/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { getStackSharePath } from "@/lib/stack-share-paths";

type BuilderViewMode = "command" | "preview" | "presets" | "saved";

type InitialBuilderState = {
  stack: StackState;
  viewMode: BuilderViewMode;
  selectedFile: string;
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
      stack: fallbackStack ?? DEFAULT_STACK,
      viewMode: "command",
      selectedFile: "",
      initialized: Boolean(fallbackStack),
    };
  }

  const presetId = search.preset;
  const preset = presetId ? PRESET_TEMPLATES.find((t) => t.id === presetId) : undefined;

  return {
    stack: preset ? ({ ...DEFAULT_STACK, ...preset.stack } as StackState) : searchToStack(search),
    viewMode: search.view || "command",
    selectedFile: search.file || "",
    initialized: true,
  };
}

function createLiveBuilderSearchParams(
  stack: StackState,
  viewMode: "command" | "preview" | "presets" | "saved",
  selectedFile: string,
): URLSearchParams {
  const params = createStackSearchParams(normalizeStackStateSelections(stack));

  if (viewMode !== "command") {
    params.set("view", viewMode);
  }

  if (selectedFile) {
    params.set("file", selectedFile);
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
  const initialized = useRef(initialState.current.initialized);

  useEffect(() => {
    if (!initialized.current && search) {
      initialized.current = true;

      const nextInitialState = getInitialBuilderState(search, fallbackStack);
      setStackState(nextInitialState.stack);
      setViewModeState(nextInitialState.viewMode);
      setSelectedFileState(nextInitialState.selectedFile);
    }
  }, [fallbackStack, search]);

  // Sync view mode when search params change after initial mount (e.g. navbar links)
  useEffect(() => {
    if (initialized.current && search?.view) {
      setViewModeState(search.view);
    }
  }, [search?.view]);

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

    const nextParams = createLiveBuilderSearchParams(stack, viewMode, selectedFile);
    const nextSearch = nextParams.toString();
    const basePath = url.pathname === "/stack" || url.pathname === "/new" ? url.pathname : "/new";
    const nextUrl = nextSearch ? `${basePath}?${nextSearch}` : basePath;
    const currentUrl = `${url.pathname}${url.search}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }, [stack, viewMode, selectedFile]);

  const updateStack = useCallback(
    (updates: Partial<StackState> | ((prev: StackState) => Partial<StackState>)) => {
      setStackState((currentStack) => {
        const newUpdates = typeof updates === "function" ? updates(currentStack) : updates;
        return { ...currentStack, ...newUpdates };
      });
    },
    [],
  );

  const setViewMode = useCallback((mode: "command" | "preview" | "presets" | "saved") => {
    setViewModeState(mode);
  }, []);

  const setSelectedFile = useCallback((filePath: string | null) => {
    setSelectedFileState(filePath || "");
  }, []);

  return [stack, updateStack, viewMode, setViewMode, selectedFile, setSelectedFile] as const;
}
