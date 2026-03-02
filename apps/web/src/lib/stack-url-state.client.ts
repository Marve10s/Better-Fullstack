"use client";

import { useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { DEFAULT_STACK, type StackState } from "@/lib/constant";

import type { StackSearchParams } from "./stack-search-schema";

import { parseStackFromSearch } from "./stack-url-state.shared";

export function useStackState() {
  const [stack, setStackState] = useState<StackState>(DEFAULT_STACK);
  const [viewMode, setViewModeState] = useState<"command" | "preview">("command");
  const [selectedFile, setSelectedFileState] = useState<string>("");
  const initialized = useRef(false);

  // @ts-expect-error - route path typing with strict: false
  const search = useSearch({ from: "/new", strict: false }) as StackSearchParams | undefined;

  useEffect(() => {
    if (!initialized.current && search) {
      initialized.current = true;
      setStackState(parseStackFromSearch(search));
      setViewModeState(search.view || "command");
      setSelectedFileState(search.file || "");
    }
  }, [search]);

  const updateStack = useCallback(
    (updates: Partial<StackState> | ((prev: StackState) => Partial<StackState>)) => {
      setStackState((currentStack) => {
        const newUpdates = typeof updates === "function" ? updates(currentStack) : updates;
        return { ...currentStack, ...newUpdates };
      });
    },
    [],
  );

  const setViewMode = useCallback((mode: "command" | "preview") => {
    setViewModeState(mode);
  }, []);

  const setSelectedFile = useCallback((filePath: string | null) => {
    setSelectedFileState(filePath || "");
  }, []);

  return [stack, updateStack, viewMode, setViewMode, selectedFile, setSelectedFile] as const;
}
