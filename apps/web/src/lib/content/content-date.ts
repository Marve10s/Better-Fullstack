import { getLocaleDateTag } from "@/lib/i18n/locales";
import { getLocale } from "@/paraglide/runtime.js";

// Parsed as UTC so a reader west of Greenwich does not see the previous day.
export function formatContentDate(date: string): string;
export function formatContentDate(date: string | undefined): string | null;
export function formatContentDate(date: string | undefined): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(getLocaleDateTag(getLocale()), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
