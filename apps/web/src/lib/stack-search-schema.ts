import { z } from "zod";

import { DEFAULT_STACK } from "./constant";
import { stackUrlKeys } from "./stack-url-keys";
import { isArrayStackKey, stackStateKeys } from "./stack-url-state.shared";

const commaSeparatedArray = (defaultValue: string[]) =>
  z
    .string()
    .transform((val) => val.split(",").filter(Boolean))
    .catch([...defaultValue]);

const stackSearchShape: Record<string, z.ZodTypeAny> = {};
const ecosystemSchema = z
  .enum(["typescript", "rust", "python", "go"])
  .catch(DEFAULT_STACK.ecosystem);

for (const stackKey of stackStateKeys) {
  const urlKey = stackUrlKeys[stackKey];
  const defaultValue = DEFAULT_STACK[stackKey];

  if (stackKey === "ecosystem") {
    stackSearchShape[urlKey] = ecosystemSchema;
    continue;
  }

  if (isArrayStackKey(stackKey)) {
    stackSearchShape[urlKey] = commaSeparatedArray(defaultValue as string[]);
    continue;
  }

  stackSearchShape[urlKey] = z.string().catch(String(defaultValue ?? ""));
}

export const stackSearchSchema = z.object({
  ...stackSearchShape,
  view: z.enum(["command", "preview"]).catch("command"),
  file: z.string().catch(""),
});

export type StackSearchParams = z.infer<typeof stackSearchSchema>;
