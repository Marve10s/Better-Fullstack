export function toDotnetIdentifierSegment(value: string): string {
  const cleaned = value
    .replace(/[^A-Za-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
  const segment = cleaned || "App";
  return /^[A-Za-z_]/.test(segment) ? segment : `App${segment}`;
}
