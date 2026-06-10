import { getCategoryOptionIds, type OptionCategory } from "@better-fullstack/types";
import { BACKEND_VALUES, EXAMPLES_VALUES } from "@better-fullstack/types/schemas";

type ScientificNotation = {
  mantissa: string;
  exponent: number;
};

const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
const OBSERVABLE_UNIVERSE_SAND_GRAINS = 7.5e24;
const UNIVERSE_AGE_YEARS = 13.8e9;

function powerSetSize(values: readonly string[]): bigint {
  const nonNoneCount = values.filter((value) => value !== "none").length;
  return 2n ** BigInt(nonNoneCount);
}

function multiplyCounts(counts: readonly number[]): bigint {
  return counts.reduce((acc, count) => acc * BigInt(count), 1n);
}

function optionIds(category: OptionCategory): readonly string[] {
  return getCategoryOptionIds(category);
}

function optionCount(category: OptionCategory): number {
  return optionIds(category).length;
}

function mergedOptionIds(categories: readonly OptionCategory[]): string[] {
  return [
    ...new Set(categories.flatMap((category) => optionIds(category))),
  ];
}

function formatScientificFromBigInt(value: bigint, precision = 3): ScientificNotation {
  const str = value.toString();
  const exponent = str.length - 1;
  const digits = str.slice(0, precision).padEnd(precision, "0");
  const mantissa =
    digits.length <= 1
      ? digits
      : `${digits[0]}.${digits.slice(1).replace(/0+$/, "") || "0"}`.replace(/\.0$/, "");
  return { mantissa, exponent };
}

function formatScientificFromNumber(value: number, precision = 3): ScientificNotation {
  if (!Number.isFinite(value) || value <= 0) {
    return { mantissa: "0", exponent: 0 };
  }
  const [mantissaStr, exponentStr] = value.toExponential(precision - 1).split("e");
  return { mantissa: mantissaStr.replace(/\.0+$/, ""), exponent: Number.parseInt(exponentStr, 10) };
}

const typescriptSingleSelectCategories = [
  "database",
  "orm",
  "runtime",
  "astroIntegration",
  "packageManager",
  "dbSetup",
  "api",
  "auth",
  "payments",
  "webDeploy",
  "serverDeploy",
  "ai",
  "backendLibraries",
  "stateManagement",
  "forms",
  "testing",
  "email",
  "cssFramework",
  "uiLibrary",
  "validation",
  "realtime",
  "jobQueue",
  "cms",
  "caching",
  "animation",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "analytics",
  "search",
  "fileStorage",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

const rustSingleSelectCategories = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "packageManager",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

const pythonSingleSelectCategories = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonTaskQueue",
  "pythonQuality",
  "packageManager",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

const goSingleSelectCategories = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "packageManager",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

const elixirSingleSelectCategories = [
  "elixirWebFramework",
  "elixirOrm",
  "elixirAuth",
  "elixirApi",
  "elixirRealtime",
  "elixirJobs",
  "elixirValidation",
  "elixirHttp",
  "elixirJson",
  "elixirEmail",
  "elixirCaching",
  "elixirObservability",
  "elixirTesting",
  "elixirQuality",
  "elixirDeploy",
  "packageManager",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

const typescriptSingleSelectCounts = [
  BACKEND_VALUES.length,
  ...typescriptSingleSelectCategories.map(optionCount),
] as const;

const rustSingleSelectCounts = rustSingleSelectCategories.map(optionCount);
const pythonSingleSelectCounts = pythonSingleSelectCategories.map(optionCount);
const goSingleSelectCounts = goSingleSelectCategories.map(optionCount);
const elixirSingleSelectCounts = elixirSingleSelectCategories.map(optionCount);

const typescriptCombinations =
  multiplyCounts(typescriptSingleSelectCounts) *
  powerSetSize(mergedOptionIds(["webFrontend", "nativeFrontend"])) *
  powerSetSize(mergedOptionIds(["codeQuality", "documentation", "appPlatforms"])) *
  powerSetSize(EXAMPLES_VALUES) *
  powerSetSize(optionIds("aiDocs"));

const rustCombinations =
  multiplyCounts(rustSingleSelectCounts) *
  powerSetSize(optionIds("rustLibraries")) *
  powerSetSize(optionIds("aiDocs"));

const pythonCombinations =
  multiplyCounts(pythonSingleSelectCounts) * powerSetSize(optionIds("aiDocs"));

const goCombinations = multiplyCounts(goSingleSelectCounts) * powerSetSize(optionIds("aiDocs"));

const elixirCombinations =
  multiplyCounts(elixirSingleSelectCounts) * powerSetSize(optionIds("aiDocs"));

const totalCombinations =
  typescriptCombinations + rustCombinations + pythonCombinations + goCombinations + elixirCombinations;
const yoloCombinations = totalCombinations * 2n;

const yearsAtOneMillisecondPerCombination = Number(totalCombinations) / MILLISECONDS_PER_YEAR;
const universeLifetimesAtOneMillisecondPerCombination =
  yearsAtOneMillisecondPerCombination / UNIVERSE_AGE_YEARS;
const ratioToUniverseSand = Number(totalCombinations) / OBSERVABLE_UNIVERSE_SAND_GRAINS;

export const combinationsMetrics = {
  totalCombinations,
  yoloCombinations,
  totalScientific: formatScientificFromBigInt(totalCombinations),
  yearsAtOneMillisecondScientific: formatScientificFromNumber(
    yearsAtOneMillisecondPerCombination,
  ),
  universeLifetimesScientific: formatScientificFromNumber(
    universeLifetimesAtOneMillisecondPerCombination,
  ),
  universeSandRatioScientific: formatScientificFromNumber(ratioToUniverseSand),
};
