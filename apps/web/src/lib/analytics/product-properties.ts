import {
  sanitizeTelemetryStackDimension,
  TELEMETRY_STACK_DIMENSION_KEYS,
} from "@better-fullstack/types/telemetry";

import {
  isProductPropertyKey,
  sanitizeAllowedProperty,
  type ProductAnalyticsProperties,
} from "@/lib/analytics/product-analytics";

const STACK_DIMENSION_KEYS = new Set<string>(TELEMETRY_STACK_DIMENSION_KEYS);

/**
 * Retain only bounded product identifiers and numeric counters. This browser
 * path never sends project names, filenames, source edits, runtime output,
 * prompts, URLs, env values, or raw errors.
 */
export function sanitizeProductProperties(
  properties: ProductAnalyticsProperties = {},
): ProductAnalyticsProperties {
  const safe: ProductAnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    if (!isProductPropertyKey(key)) continue;
    const dimension = sanitizeTelemetryStackDimension(key, value);
    if (dimension !== undefined) {
      safe[key] = dimension;
      continue;
    }
    if (STACK_DIMENSION_KEYS.has(key)) continue;
    const allowed = sanitizeAllowedProperty(key, value);
    if (allowed !== undefined) safe[key] = allowed;
  }
  return safe;
}
