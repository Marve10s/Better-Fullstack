import z from "zod";

import { CreateInputSchema, ProjectNameSchema } from "@/types";

export const CreateCommandOptionsSchema = CreateInputSchema.omit({ projectName: true }).extend({
  fromHistory: z
    .number()
    .optional()
    .describe("Replay the stack of the Nth most-recent project from history (1 = most recent)"),
  config: z
    .string()
    .optional()
    .describe("Path to a bts.jsonc/JSON config file to use as the base stack"),
  yes: z.boolean().optional().default(false).describe("Use default configuration"),
  yolo: z
    .boolean()
    .optional()
    .default(false)
    .describe("(WARNING - NOT RECOMMENDED) Bypass validations and compatibility checks"),
  verbose: z.boolean().optional().default(false).describe("Show detailed result information"),
  dryRun: z
    .boolean()
    .optional()
    .default(false)
    .describe("Preview generated file tree without writing to disk"),
  verify: z
    .boolean()
    .optional()
    .default(false)
    .describe("Run generated project checks after scaffolding without starting dev servers"),
  disableAnalytics: z.boolean().optional().default(false).describe("Disable analytics"),
  manualDb: z
    .boolean()
    .optional()
    .default(false)
    .describe("Skip automatic/manual database setup prompt and use manual setup"),
  tui: z
    .boolean()
    .optional()
    .default(false)
    .describe("Answer the prompts in the beta full-screen TUI (downloads OpenTUI once)"),
});

export const CreateCommandInputSchema = z.tuple([
  ProjectNameSchema.optional(),
  CreateCommandOptionsSchema,
]);
