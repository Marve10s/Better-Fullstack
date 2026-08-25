import type { BetterTStackConfig } from "@better-fullstack/types";

export type RecipeKind = "resource" | "route";

export type RecipePlannedFile = {
  path: string;
  action: "create" | "update";
  content: string;
  preimageSha256: string | null;
  postimageSha256: string;
};

export type RecipeOwnedArtifact = {
  path: string;
  ownership: "full" | "managed-region";
  regionId?: string;
  entry?: string;
};

export type RecipeVerificationCheck = {
  id: string;
  command?: string;
  description: string;
};

export type RecipeAdapterPlan = {
  adapterId: string;
  adapterVersion: number;
  maintenanceOwner: string;
  recipeId: string;
  name: string;
  summary: string;
  persistent: boolean;
  ownerPartId: string | null;
  files: RecipePlannedFile[];
  ownedArtifacts: RecipeOwnedArtifact[];
  checks: RecipeVerificationCheck[];
  migrationGuidance: string[];
};

export type RecipeAdapterContext = {
  projectDir: string;
  config: BetterTStackConfig;
  kind: RecipeKind;
  requestedName: string;
  databasePackageName: string | null;
  name: string;
  typeName: string;
};

export type RecipeAdapterSupport = { supported: true } | { supported: false; reason: string };

export type RecipeAdapter = {
  id: string;
  version: number;
  maintenanceOwner: string;
  verificationRecipe: string;
  demandEvidence: string;
  supports: (context: RecipeAdapterContext) => RecipeAdapterSupport;
  plan: (context: RecipeAdapterContext) => Promise<RecipeAdapterPlan>;
};
