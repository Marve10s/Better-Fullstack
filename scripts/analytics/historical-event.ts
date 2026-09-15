import { createHash } from "node:crypto";

import { posthogEvent } from "../../packages/backend/src/posthog";

const namespace = Buffer.from("3c41d010260a4ae6af03659c6bb88d39", "hex");

export function historicalEventId(deployment: string, id: string) {
  const bytes = createHash("sha1")
    .update(namespace)
    .update(`${deployment}:${id}`)
    .digest()
    .subarray(0, 16);
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x50;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function historicalEvent(value: unknown, deployment: string) {
  if (
    !record(value) ||
    typeof value._id !== "string" ||
    typeof value._creationTime !== "number" ||
    !Number.isFinite(value._creationTime)
  ) {
    throw new Error("Invalid source event metadata; checkpoint was not advanced");
  }
  return posthogEvent(value, {
    eventId: historicalEventId(deployment, value._id),
    timestamp: value._creationTime,
    historical: true,
  });
}
