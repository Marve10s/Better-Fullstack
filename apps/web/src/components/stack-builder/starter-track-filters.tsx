import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  STARTER_TRACK_AUTH_IDS,
  STARTER_TRACK_DATABASE_IDS,
  STARTER_TRACK_DEPLOYMENT_TARGET_IDS,
  STARTER_TRACK_PACKAGE_MANAGER_IDS,
  STARTER_TRACK_RUNTIME_IDS,
  STARTER_TRACK_WORKSPACE_SHAPE_IDS,
  StarterTrackFiltersSchema,
  type StarterTrackFilters,
} from "@better-fullstack/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterKey = keyof StarterTrackFilters;

const FILTERS = [
  {
    key: "evidence",
    label: "Evidence",
    values: CAPABILITY_EVIDENCE_LEVEL_IDS,
  },
  { key: "runtime", label: "Runtime", values: STARTER_TRACK_RUNTIME_IDS },
  {
    key: "deploymentTarget",
    label: "Deploy",
    values: STARTER_TRACK_DEPLOYMENT_TARGET_IDS,
  },
  {
    key: "packageManager",
    label: "Packages",
    values: STARTER_TRACK_PACKAGE_MANAGER_IDS,
  },
  { key: "database", label: "Database", values: STARTER_TRACK_DATABASE_IDS },
  { key: "auth", label: "Auth", values: STARTER_TRACK_AUTH_IDS },
  {
    key: "workspaceShape",
    label: "Workspace",
    values: STARTER_TRACK_WORKSPACE_SHAPE_IDS,
  },
] as const satisfies readonly {
  key: FilterKey;
  label: string;
  values: readonly string[];
}[];

function displayValue(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function StarterTrackFilters({
  filters,
  onChange,
}: {
  filters: StarterTrackFilters;
  onChange: (filters: StarterTrackFilters) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2" aria-label="Starter track filters">
      {FILTERS.map((filter) => (
        <Select
          key={filter.key}
          value={filters[filter.key] ?? "all"}
          onValueChange={(rawValue: unknown) => {
            const value = typeof rawValue === "string" ? rawValue : "all";
            onChange(
              StarterTrackFiltersSchema.parse({
                ...filters,
                [filter.key]: value === "all" ? undefined : value,
              }),
            );
          }}
        >
          <SelectTrigger size="sm" aria-label={filter.label}>
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All {filter.label.toLowerCase()}</SelectItem>
            {filter.values.map((value) => (
              <SelectItem key={value} value={value}>
                {displayValue(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
