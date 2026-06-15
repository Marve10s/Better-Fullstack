import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

import { mdxComponents } from "@/components/docs/mdx";
import { localizeContentHeading } from "@/lib/i18n/content-copy";

function plainTextFromChildren(children: ReactNode): string | null {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (!Array.isArray(children)) return null;

  let text = "";
  for (const child of children) {
    if (typeof child !== "string" && typeof child !== "number") return null;
    text += String(child);
  }
  return text;
}

function localizedHeadingChildren(children: ReactNode): ReactNode {
  const text = plainTextFromChildren(children);
  return text ? localizeContentHeading(text) : children;
}

function LocalizedH2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return <h2 {...props}>{localizedHeadingChildren(children)}</h2>;
}

function LocalizedH3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  return <h3 {...props}>{localizedHeadingChildren(children)}</h3>;
}

function LocalizedH4({ children, ...props }: ComponentPropsWithoutRef<"h4">) {
  return <h4 {...props}>{localizedHeadingChildren(children)}</h4>;
}

export const localizedContentMdxComponents = {
  ...mdxComponents,
  h2: LocalizedH2,
  h3: LocalizedH3,
  h4: LocalizedH4,
} as unknown as Record<string, ComponentType<unknown>>;
