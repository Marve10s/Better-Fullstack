export type PromptOption<T> = {
  value: T;
  label: string;
  hint?: string;
};

export type PromptResolution<T> = {
  shouldPrompt: boolean;
  mode: "single" | "multiple";
  options: PromptOption<T>[];
  initialValue?: T | T[];
  autoValue?: T | T[];
};
