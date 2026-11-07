import type {
  NavigableConfirmOptions,
  NavigableMultiselectOptions,
  NavigableSelectOptions,
  NavigableTextOptions,
} from "@/prompts/core/navigable";

export type PromptStep = {
  key: string;
  results: Readonly<Record<string, unknown>>;
};

export type PromptNavigation = {
  canGoBack: boolean;
  stepKey?: string;
  results?: PromptStep["results"];
};

export type PromptDriver = {
  select<T>(opts: NavigableSelectOptions<T>, navigation: PromptNavigation): Promise<T | symbol>;
  multiselect<T>(
    opts: NavigableMultiselectOptions<T>,
    navigation: PromptNavigation,
  ): Promise<T[] | symbol>;
  confirm(opts: NavigableConfirmOptions, navigation: PromptNavigation): Promise<boolean | symbol>;
  text(opts: NavigableTextOptions, navigation: PromptNavigation): Promise<string | symbol>;
};
