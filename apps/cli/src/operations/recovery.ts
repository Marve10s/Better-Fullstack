import { z } from "zod";

import {
  recoveryManagementOutputSchema,
  recoveryOutputSchema,
} from "@/mcp/mcp-lifecycle-output-schemas";
import { defineOperation, projectDirInput, sanitizePath } from "@/operations/operation";

const transactionIdInput = z.string().uuid().describe("Recovery transaction ID");

export const listProjectRecoveryPointsOperation = defineOperation({
  name: "list_project_recovery_points",
  title: "List project recovery points",
  description:
    "Lists lifecycle recovery points with operation, status, integrity, and restore safety. This does not modify the project.",
  input: z.object({ projectDir: projectDirInput }),
  output: recoveryManagementOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { listMcpProjectRecoveryPoints } = await import("@/mcp/mcp-project-lifecycle.js");
    return listMcpProjectRecoveryPoints(sanitizePath(input.projectDir));
  },
});

export const getProjectRecoveryPointOperation = defineOperation({
  name: "get_project_recovery_point",
  title: "Show project recovery point",
  description:
    "Shows one recovery point and validates its metadata, backup hashes, and current restore preconditions without writing.",
  input: z.object({ projectDir: projectDirInput, transactionId: transactionIdInput }),
  output: recoveryManagementOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { getMcpProjectRecoveryPoint } = await import("@/mcp/mcp-project-lifecycle.js");
    return getMcpProjectRecoveryPoint(sanitizePath(input.projectDir), input.transactionId);
  },
});

export const verifyProjectRecoveryPointOperation = defineOperation({
  name: "verify_project_recovery_point",
  title: "Verify project recovery point",
  description:
    "Checks one recovery point's metadata, backup hashes, and current restore preconditions without writing.",
  input: z.object({ projectDir: projectDirInput, transactionId: transactionIdInput }),
  output: recoveryManagementOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { verifyMcpProjectRecoveryPoint } = await import("@/mcp/mcp-project-lifecycle.js");
    return verifyMcpProjectRecoveryPoint(sanitizePath(input.projectDir), input.transactionId);
  },
});

export const pruneProjectRecoveryPointsOperation = defineOperation({
  name: "prune_project_recovery_points",
  title: "Prune project recovery points",
  description:
    "Previews retention candidates and returns a review token. With apply true, pass that unchanged token to delete only the reviewed terminal, valid recovery points outside the age and newest-count safeguards. Pending and invalid points are retained.",
  input: z.object({
    projectDir: projectDirInput,
    olderThanDays: z
      .number()
      .int()
      .min(0)
      .optional()
      .default(30)
      .describe("Only consider terminal points at least this old"),
    keep: z
      .number()
      .int()
      .min(0)
      .optional()
      .default(5)
      .describe("Always retain this many newest valid recovery points"),
    apply: z
      .boolean()
      .optional()
      .default(false)
      .describe("Delete the previewed candidates with reviewToken; false returns a dry-run result"),
    reviewToken: z
      .string()
      .optional()
      .describe("Exact token returned by the latest prune preview; required when apply is true"),
  }),
  output: recoveryManagementOutputSchema,
  safety: "destructive",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { pruneMcpProjectRecoveryPoints } = await import("@/mcp/mcp-project-lifecycle.js");
    return pruneMcpProjectRecoveryPoints(
      sanitizePath(input.projectDir),
      input.olderThanDays,
      input.keep,
      input.apply,
      input.reviewToken,
    );
  },
});

export const recoverProjectTransactionOperation = defineOperation({
  name: "recover_project_transaction",
  title: "Recover project transaction",
  description:
    "Restores every file bound to a successful or interrupted Better Fullstack lifecycle transaction. The transaction can be recovered once, then project checks should be rerun.",
  input: z.object({
    projectDir: projectDirInput,
    transactionId: z.string().uuid().describe("Recovery transaction ID returned by apply"),
  }),
  output: recoveryOutputSchema,
  safety: "destructive",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { recoverMcpProjectTransaction } = await import("@/mcp/mcp-project-lifecycle.js");
    return recoverMcpProjectTransaction(sanitizePath(input.projectDir), input.transactionId);
  },
});
