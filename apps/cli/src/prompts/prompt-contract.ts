export type PromptOption<T> = {
  value: T;
  label: string;
  hint?: string;
};

export type PromptSingleResolution<T> = {
  shouldPrompt: boolean;
  mode: "single";
  options: PromptOption<T>[];
  initialValue?: T;
  autoValue?: T;
};

export type PromptMultiResolution<T> = {
  shouldPrompt: boolean;
  mode: "multiple";
  options: PromptOption<T>[];
  initialValue?: T[];
  autoValue?: T[];
};

export type PromptResolution<T> = PromptSingleResolution<T> | PromptMultiResolution<T>;

export function createStaticSinglePromptResolution<T>(
  options: PromptOption<T>[],
  initialValue: T,
  selectedValue?: T,
): PromptSingleResolution<T> {
  return selectedValue !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: selectedValue,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue,
      };
}

export function createStaticMultiPromptResolution<T>(
  options: PromptOption<T>[],
  initialValue: T[],
  selectedValue?: T[],
): PromptMultiResolution<T> {
  return selectedValue !== undefined
    ? {
        shouldPrompt: false,
        mode: "multiple",
        options,
        autoValue: selectedValue,
      }
    : {
        shouldPrompt: true,
        mode: "multiple",
        options,
        initialValue,
      };
}
