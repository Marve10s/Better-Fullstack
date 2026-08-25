const SHA256 = /^[0-9a-f]{64}$/i;

export function getExpectedCapabilityProducerFingerprint(receipt?: unknown): string | undefined {
  const fingerprint = process.env.BTS_CAPABILITY_PRODUCER_FINGERPRINT;
  if (fingerprint && SHA256.test(fingerprint)) return fingerprint.toLowerCase();
  if (receipt !== undefined) {
    throw new Error("This CLI build cannot validate capability evidence receipts.");
  }
  return undefined;
}
