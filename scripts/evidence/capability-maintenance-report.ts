#!/usr/bin/env bun

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  CapabilityEvidenceReceiptSchema,
  GOLDEN_RUNTIME_RECIPES,
  type CapabilityEvidenceReceipt,
} from "@better-fullstack/types";

export const CAPABILITY_MAINTENANCE_REPORT_SCHEMA_VERSION = 1 as const;

export type CapabilityMaintenanceDecision = "keep" | "watch" | "quarantine";

export function buildCapabilityMaintenanceReport(receiptValues: readonly unknown[]) {
  const receipts = receiptValues
    .map((value) => CapabilityEvidenceReceiptSchema.parse(value))
    .sort((left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt));
  if (receipts.length === 0) throw new Error("At least one capability receipt is required");

  const recipes = GOLDEN_RUNTIME_RECIPES.map((recipe) => {
    const samples = receipts.flatMap((receipt) => {
      const result = receipt.recipes.find((entry) => entry.id === recipe.id);
      return result ? [{ receipt, result }] : [];
    });
    const latest = samples.at(-1);
    const failedRuns = samples.filter(({ result }) => !result.success).length;
    const flakyRuns = samples.reduce((total, { result }) => total + result.flakyRuns, 0);
    const repairMinutes = samples.reduce((total, { result }) => total + result.repairMinutes, 0);
    const dependencyChanges = samples.reduce(
      (total, { result }) => total + result.dependencyChanges,
      0,
    );
    const maintainedRuns = samples.filter(({ result }) => result.maintainerPresent).length;
    const maintainerCoverage = samples.length === 0 ? 0 : maintainedRuns / samples.length;
    const recurringCostScore =
      failedRuns * 10 +
      flakyRuns * 3 +
      repairMinutes +
      dependencyChanges * 2 +
      (samples.length - maintainedRuns) * 20;
    const decision: CapabilityMaintenanceDecision =
      latest?.result.success === false || maintainerCoverage < 1
        ? "quarantine"
        : flakyRuns > 0 || repairMinutes >= 120 || dependencyChanges >= 10
          ? "watch"
          : "keep";

    return {
      recipeId: recipe.id,
      definitionVersion: recipe.definitionVersion,
      maintainer: recipe.maintainer,
      runs: samples.length,
      passedRuns: samples.length - failedRuns,
      failedRuns,
      flakyRuns,
      repairMinutes,
      dependencyChanges,
      maintainerCoverage,
      recurringCostScore,
      latestReceiptAt: latest?.receipt.createdAt ?? null,
      latestSuccess: latest?.result.success ?? null,
      decision,
    };
  });

  return {
    schemaVersion: CAPABILITY_MAINTENANCE_REPORT_SCHEMA_VERSION,
    receiptCount: receipts.length,
    period: {
      from: receipts[0]!.createdAt,
      to: receipts.at(-1)!.createdAt,
    },
    summary: {
      keep: recipes.filter((recipe) => recipe.decision === "keep").length,
      watch: recipes.filter((recipe) => recipe.decision === "watch").length,
      quarantine: recipes.filter((recipe) => recipe.decision === "quarantine").length,
      totalFlakyRuns: recipes.reduce((total, recipe) => total + recipe.flakyRuns, 0),
      totalRepairMinutes: recipes.reduce((total, recipe) => total + recipe.repairMinutes, 0),
      totalDependencyChanges: recipes.reduce(
        (total, recipe) => total + recipe.dependencyChanges,
        0,
      ),
    },
    recipes,
  };
}

function markdown(report: ReturnType<typeof buildCapabilityMaintenanceReport>): string {
  return [
    "# Capability maintenance report",
    "",
    `Receipt period: ${report.period.from} to ${report.period.to}`,
    "",
    "| Recipe | Runs | Failed | Flaky | Repair minutes | Dependency changes | Maintainer coverage | Decision |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    ...report.recipes.map(
      (recipe) =>
        `| ${recipe.recipeId} | ${recipe.runs} | ${recipe.failedRuns} | ${recipe.flakyRuns} | ${recipe.repairMinutes} | ${recipe.dependencyChanges} | ${Math.round(recipe.maintainerCoverage * 100)}% | ${recipe.decision} |`,
    ),
    "",
  ].join("\n");
}

async function loadReceipts(paths: readonly string[]): Promise<CapabilityEvidenceReceipt[]> {
  return await Promise.all(
    paths.map(async (path) =>
      CapabilityEvidenceReceiptSchema.parse(
        JSON.parse(await readFile(resolve(path), "utf8")) as unknown,
      ),
    ),
  );
}

if (import.meta.main) {
  const paths = process.argv.slice(2).filter((argument) => argument !== "--markdown");
  if (paths.length === 0) {
    throw new Error(
      "Usage: bun run scripts/evidence/capability-maintenance-report.ts [--markdown] <receipt.json>...",
    );
  }
  const report = buildCapabilityMaintenanceReport(await loadReceipts(paths));
  process.stdout.write(
    process.argv.includes("--markdown") ? markdown(report) : `${JSON.stringify(report, null, 2)}\n`,
  );
}
