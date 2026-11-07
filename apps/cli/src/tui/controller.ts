import type {
  NavigableConfirmOptions,
  NavigableMultiselectOptions,
  NavigableSelectOptions,
  NavigableTextOptions,
} from "@/prompts/core/navigable";
import type { PromptDriver, PromptNavigation } from "@/prompts/core/prompt-driver";

import { UserCancelledError } from "@/presentation/errors";
import { GO_BACK_SYMBOL } from "@/presentation/navigation";
import { appendProgress, type ProgressLine } from "@/tui/progress";

export type TuiOption = {
  value: unknown;
  label: string;
  hint?: string;
  disabled?: boolean;
};

type PromptBase = {
  message: string;
  navigation: PromptNavigation;
  error?: string;
};

export type TuiPrompt =
  | (PromptBase & { kind: "select"; options: TuiOption[]; cursor: number })
  | (PromptBase & {
      kind: "multiselect";
      options: TuiOption[];
      cursor: number;
      selected: unknown[];
      required: boolean;
      validate?: (values: unknown[]) => string | undefined;
    })
  | (PromptBase & { kind: "confirm"; options: TuiOption[]; cursor: number })
  | (PromptBase & {
      kind: "text";
      input: string;
      placeholder?: string;
      defaultValue?: string;
      validate?: (value: string | undefined) => string | Error | undefined;
    });

export type TuiDecision = {
  stepKey?: string;
  message: string;
  value: unknown;
  answer: string;
};

export type TuiReview = {
  lines: string[];
  command: string;
};

export type TuiKey = {
  name: string;
  ctrl?: boolean;
  meta?: boolean;
  sequence?: string;
};

type Pending = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
};

export type TuiLanding = {
  projectName: string;
  stack: string[];
  nextSteps: string[];
  command: string;
  tree: string[];
  elapsedMs: number;
  failures: string[];
};

export type TuiPhase =
  | { kind: "idle" }
  | { kind: "prompt"; prompt: TuiPrompt }
  | { kind: "review"; review: TuiReview; offset: number }
  | { kind: "launch"; startedAt: number }
  | { kind: "landed"; landing: TuiLanding; landedAt: number; copied: boolean };

export type TuiWindow = { start: number; count: number; columnStep: number };

function firstEnabled(options: TuiOption[], preferred: number): number {
  if (options[preferred] && !options[preferred].disabled) return preferred;
  const index = options.findIndex((option) => !option.disabled);
  return index === -1 ? 0 : index;
}

function moveAcross(options: TuiOption[], cursor: number, step: number): number {
  const lastColumn = Math.floor((options.length - 1) / Math.abs(step));
  const column = Math.floor(cursor / Math.abs(step)) + Math.sign(step);
  if (column < 0 || column > lastColumn) return cursor;
  const target = Math.min(cursor + step, options.length - 1);
  return options[target]?.disabled ? moveCursor(options, target, Math.sign(step)) : target;
}

function moveCursor(options: TuiOption[], cursor: number, step: number): number {
  if (options.length === 0) return cursor;
  let next = cursor;
  for (let i = 0; i < options.length; i++) {
    next = (next + step + options.length) % options.length;
    if (!options[next]?.disabled) return next;
  }
  return cursor;
}

function toOptions<T>(options: NavigableSelectOptions<T>["options"]): TuiOption[] {
  return options.map((option) => ({
    value: option.value,
    label: option.label ?? String(option.value),
    hint: option.hint,
    disabled: option.disabled,
  }));
}

function isPrintable(key: TuiKey): key is TuiKey & { sequence: string } {
  return (
    !key.ctrl &&
    !key.meta &&
    typeof key.sequence === "string" &&
    key.sequence.length > 0 &&
    [...key.sequence].every((char) => char.charCodeAt(0) >= 32 && char.charCodeAt(0) !== 127)
  );
}

export class TuiController implements PromptDriver {
  phase: TuiPhase = { kind: "idle" };
  cancelled = false;
  decisions: TuiDecision[] = [];
  results: Readonly<Record<string, unknown>> = {};
  reviewRows = 1;
  notices: string[] = [];
  progress: ProgressLine[] = [];
  window: TuiWindow = { start: 0, count: 9, columnStep: 0 };
  showWhy = false;
  copyCommand: ((text: string) => boolean) | undefined;
  onAbort: (() => void) | undefined;
  private pending: Pending | undefined;
  private listeners = new Set<() => void>();

  constructor(readonly initialProjectName?: string) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  addNotice(text: string): void {
    if (this.phase.kind === "launch" || this.phase.kind === "landed") {
      this.progress = appendProgress(this.progress, text);
      return this.changed();
    }
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) return;
    this.notices = [...this.notices, ...lines].slice(-20);
    this.changed();
  }

  launch(firstStep: string, now = Date.now()): void {
    this.progress = [{ text: firstStep, state: "active" }];
    this.phase = { kind: "launch", startedAt: now };
    this.changed();
  }

  land(landing: TuiLanding, now = Date.now()): Promise<void> {
    if (this.cancelled) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      this.pending = { resolve: () => resolve(), reject };
      this.phase = { kind: "landed", landing, landedAt: now, copied: false };
      this.changed();
    });
  }

  get prompt(): TuiPrompt | undefined {
    return this.phase.kind === "prompt" ? this.phase.prompt : undefined;
  }

  get highlighted(): TuiOption | undefined {
    const prompt = this.prompt;
    if (!prompt || prompt.kind === "text") return undefined;
    return prompt.options[prompt.cursor];
  }

  select<T>(opts: NavigableSelectOptions<T>, navigation: PromptNavigation): Promise<T | symbol> {
    const options = toOptions(opts.options);
    const initial = options.findIndex((option) => option.value === opts.initialValue);
    return this.ask({
      kind: "select",
      message: opts.message,
      navigation,
      options,
      cursor: firstEnabled(options, Math.max(initial, 0)),
    });
  }

  multiselect<T>(
    opts: NavigableMultiselectOptions<T>,
    navigation: PromptNavigation,
  ): Promise<T[] | symbol> {
    const options = toOptions(opts.options);
    const selected: unknown[] = [...(opts.initialValues ?? [])];
    return this.ask({
      kind: "multiselect",
      message: opts.message,
      navigation,
      options,
      cursor: firstEnabled(options, 0),
      selected,
      required: opts.required ?? true,
      validate: opts.validate as ((values: unknown[]) => string | undefined) | undefined,
    });
  }

  confirm(opts: NavigableConfirmOptions, navigation: PromptNavigation): Promise<boolean | symbol> {
    const options = [
      { value: true, label: opts.active ?? "Yes" },
      { value: false, label: opts.inactive ?? "No" },
    ];
    return this.ask({
      kind: "confirm",
      message: opts.message,
      navigation,
      options,
      cursor: (opts.initialValue ?? true) ? 0 : 1,
    });
  }

  text(opts: NavigableTextOptions, navigation: PromptNavigation): Promise<string | symbol> {
    return this.ask({
      kind: "text",
      message: opts.message,
      navigation,
      input: opts.initialValue ?? "",
      placeholder: opts.placeholder,
      defaultValue: opts.defaultValue,
      validate: opts.validate,
    });
  }

  review(review: TuiReview): Promise<void> {
    if (this.cancelled) return Promise.reject(new UserCancelledError("Operation cancelled"));
    return new Promise<void>((resolve, reject) => {
      this.pending = { resolve: () => resolve(), reject };
      this.phase = { kind: "review", review, offset: 0 };
      this.changed();
    });
  }

  cancel(): void {
    const pending = this.pending;
    this.pending = undefined;
    if (this.phase.kind === "landed") return pending?.resolve(undefined);
    const launching = this.phase.kind === "launch";
    this.cancelled = true;
    this.phase = { kind: "idle" };
    pending?.reject(new UserCancelledError("Operation cancelled"));
    if (launching) this.onAbort?.();
  }

  handleKey(key: TuiKey): void {
    if (key.ctrl && key.name === "c") return this.cancel();
    if (this.phase.kind === "review") return this.handleReviewKey(key);
    if (this.phase.kind === "landed") return this.handleLandedKey(key);
    const prompt = this.prompt;
    if (!prompt) return;
    if (prompt.kind === "text") return this.handleTextKey(prompt, key);
    if (key.sequence === "?") {
      this.showWhy = !this.showWhy;
      return this.changed();
    }
    const digit = /^[1-9]$/.test(key.sequence ?? "") ? Number(key.sequence) : undefined;
    if (digit !== undefined) return this.quickPick(prompt, digit);

    if (key.name === "escape" || key.name === "b" || key.name === "backspace") {
      if (prompt.navigation.canGoBack) this.goBack();
      return;
    }
    if (key.name === "up" || key.name === "k")
      prompt.cursor = moveCursor(prompt.options, prompt.cursor, -1);
    else if (key.name === "down" || key.name === "j")
      prompt.cursor = moveCursor(prompt.options, prompt.cursor, 1);
    else if (prompt.kind === "confirm" && (key.name === "left" || key.name === "right")) {
      prompt.cursor = prompt.cursor === 0 ? 1 : 0;
    } else if (this.window.columnStep > 0 && (key.name === "left" || key.name === "h")) {
      prompt.cursor = moveAcross(prompt.options, prompt.cursor, -this.window.columnStep);
    } else if (this.window.columnStep > 0 && (key.name === "right" || key.name === "l")) {
      prompt.cursor = moveAcross(prompt.options, prompt.cursor, this.window.columnStep);
    } else if (prompt.kind === "confirm" && (key.name === "y" || key.name === "n")) {
      prompt.cursor = key.name === "y" ? 0 : 1;
      return this.submitChoice(prompt);
    } else if (prompt.kind === "multiselect" && key.name === "space") {
      const option = prompt.options[prompt.cursor];
      if (option && !option.disabled) {
        prompt.selected = prompt.selected.includes(option.value)
          ? prompt.selected.filter((value) => value !== option.value)
          : [...prompt.selected, option.value];
        prompt.error = undefined;
      }
    } else if (prompt.kind === "multiselect" && key.name === "a") {
      const allSelected = prompt.selected.length === prompt.options.length;
      prompt.selected = allSelected ? [] : prompt.options.map((option) => option.value);
      prompt.error = undefined;
    } else if (key.name === "return") {
      return prompt.kind === "multiselect"
        ? this.submitMultiple(prompt)
        : this.submitChoice(prompt);
    } else return;
    this.changed();
  }

  private quickPick(prompt: Exclude<TuiPrompt, { kind: "text" }>, digit: number): void {
    if (digit > this.window.count) return;
    const index = this.window.start + digit - 1;
    const option = prompt.options[index];
    if (!option || option.disabled) return;
    prompt.cursor = index;
    if (prompt.kind !== "multiselect") return this.submitChoice(prompt);
    prompt.selected = prompt.selected.includes(option.value)
      ? prompt.selected.filter((value) => value !== option.value)
      : [...prompt.selected, option.value];
    prompt.error = undefined;
    this.changed();
  }

  private handleLandedKey(key: TuiKey): void {
    if (this.phase.kind !== "landed") return;
    if (key.name === "c") {
      this.phase.copied = this.copyCommand?.(this.phase.landing.command) ?? false;
      return this.changed();
    }
    if (key.name === "return" || key.name === "q" || key.name === "escape") {
      const pending = this.pending;
      this.pending = undefined;
      this.changed();
      pending?.resolve(undefined);
    }
  }

  private handleReviewKey(key: TuiKey): void {
    if (this.phase.kind !== "review") return;
    if (key.name === "up" || key.name === "down" || key.name === "k" || key.name === "j") {
      const step = key.name === "up" || key.name === "k" ? -1 : 1;
      const last = Math.max(0, this.phase.review.lines.length - this.reviewRows);
      this.phase.offset = Math.min(last, Math.max(0, this.phase.offset + step));
      this.changed();
    } else if (key.name === "return") {
      const pending = this.pending;
      this.pending = undefined;
      this.phase = { kind: "idle" };
      this.changed();
      pending?.resolve(undefined);
    } else if (key.name === "escape" || key.name === "q") {
      this.cancel();
    }
  }

  private handleTextKey(prompt: Extract<TuiPrompt, { kind: "text" }>, key: TuiKey): void {
    if (key.name === "escape") {
      if (prompt.navigation.canGoBack) this.goBack();
      return;
    }
    if (key.name === "return") {
      const value = prompt.input.trim() ? prompt.input : (prompt.defaultValue ?? "");
      const issue = prompt.validate?.(prompt.input);
      if (issue) {
        prompt.error = issue instanceof Error ? issue.message : issue;
        return this.changed();
      }
      return this.finish(value, value || "(empty)");
    }
    if (key.name === "backspace") prompt.input = prompt.input.slice(0, -1);
    else if (isPrintable(key)) prompt.input += key.sequence;
    else return;
    prompt.error = undefined;
    this.changed();
  }

  private submitChoice(prompt: Extract<TuiPrompt, { kind: "select" | "confirm" }>): void {
    const option = prompt.options[prompt.cursor];
    if (!option || option.disabled) return;
    this.finish(option.value, option.label);
  }

  private submitMultiple(prompt: Extract<TuiPrompt, { kind: "multiselect" }>): void {
    const values = prompt.selected;
    const labels = values.map(
      (value) => prompt.options.find((option) => option.value === value)?.label ?? String(value),
    );
    const issue =
      prompt.validate?.(values) ??
      (prompt.required && values.length === 0 ? "Select at least one option (space)." : undefined);
    if (issue) {
      prompt.error = issue;
      return this.changed();
    }
    this.finish(values, labels.join(", ") || "none");
  }

  private goBack(): void {
    this.decisions = this.decisions.slice(0, -1);
    this.settle(GO_BACK_SYMBOL);
  }

  private finish(value: unknown, answer: string): void {
    const prompt = this.prompt;
    if (prompt) {
      this.decisions = [
        ...this.decisions,
        { stepKey: prompt.navigation.stepKey, message: prompt.message, value, answer },
      ];
    }
    this.settle(value);
  }

  private settle(value: unknown): void {
    const pending = this.pending;
    this.pending = undefined;
    this.phase = { kind: "idle" };
    this.changed();
    pending?.resolve(value);
  }

  private ask<T>(prompt: TuiPrompt): Promise<T> {
    if (this.cancelled) return Promise.reject(new UserCancelledError("Operation cancelled"));
    if (prompt.navigation.results) this.results = { ...prompt.navigation.results };
    return new Promise<T>((resolve, reject) => {
      this.pending = { resolve: (value) => resolve(value as T), reject };
      this.phase = { kind: "prompt", prompt };
      this.changed();
    });
  }

  private changed(): void {
    for (const listener of this.listeners) listener();
  }
}
