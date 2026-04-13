import { useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import type { StackSearchParams } from "@/lib/stack-search-schema";

import { PRESET_TEMPLATES } from "@/lib/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { normalizeStackStateSelections } from "@/lib/stack-option-normalization";
import {
  createStackSearchParams,
  parseStackFromSearch,
  parseStackFromUrlRecord,
} from "@/lib/stack-url-state.shared";

export function loadStackParams(
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>,
): Promise<StackState> | StackState {
  const parseSync = (params: Record<string, string | string[] | undefined>): StackState =>
    parseStackFromUrlRecord(params);

  if (searchParams instanceof Promise) {
    return searchParams.then(parseSync);
  }
  return parseSync(searchParams);
}

export function serializeStackParams(basePath: string, stack: StackState): string {
  const queryString = createStackSearchParams(stack).toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export type LoadedStackState = StackState;

function searchToStack(search: StackSearchParams | undefined): StackState {
  if (!search) return DEFAULT_STACK;

  return parseStackFromSearch(search);
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

export function useStackState() {
  const [stack, setStackState] = useState<StackState>(DEFAULT_STACK);
  const [viewMode, setViewModeState] = useState<"command" | "preview" | "presets" | "saved">(
    "command",
  );
  const [selectedFile, setSelectedFileState] = useState<string>("");
  const initialized = useRef(false);

  // @ts-expect-error - route path typing with strict: false
  const search = useSearch({ from: "/new", strict: false }) as StackSearchParams | undefined;

  useEffect(() => {
    if (!initialized.current && search) {
      initialized.current = true;

      const presetId = search.preset;
      const preset = presetId
        ? PRESET_TEMPLATES.find((t) => t.id === presetId)
        : undefined;

      if (preset) {
        setStackState({ ...DEFAULT_STACK, ...preset.stack } as StackState);
      } else {
        setStackState(searchToStack(search));
      }

      setViewModeState(search.view || "command");
      setSelectedFileState(search.file || "");
    }
  }, [search]);

  // Sync view mode when search params change after initial mount (e.g. navbar links)
  useEffect(() => {
    if (initialized.current && search?.view) {
      setViewModeState(search.view);
    }
  }, [search?.view]);

  useEffect(() => {
    if (!initialized.current) return;

    const url = new URL(window.location.href);
    const nextParams = createLiveBuilderSearchParams(stack, viewMode, selectedFile);
    const nextSearch = nextParams.toString();
    const nextUrl = nextSearch ? `${url.pathname}?${nextSearch}` : url.pathname;
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
