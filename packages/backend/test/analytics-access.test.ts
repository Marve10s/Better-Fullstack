import { describe, expect, it } from "bun:test";

import { getTelemetryDashboardAccess } from "../convex/analytics-access";

const SECRET = "owner-only-telemetry-secret-0123456789";

describe("telemetry dashboard API access", () => {
  it("fails closed without a strong configured secret", () => {
    expect(getTelemetryDashboardAccess(`Bearer ${SECRET}`, undefined)).toBe("unconfigured");
    expect(getTelemetryDashboardAccess(`Bearer ${SECRET}`, "too-short")).toBe("unconfigured");
  });

  it("rejects missing, malformed, and incorrect bearer credentials", () => {
    expect(getTelemetryDashboardAccess(null, SECRET)).toBe("unauthorized");
    expect(getTelemetryDashboardAccess(`Basic ${SECRET}`, SECRET)).toBe("unauthorized");
    expect(getTelemetryDashboardAccess("Bearer wrong-secret", SECRET)).toBe("unauthorized");
  });

  it("accepts only the configured bearer secret", () => {
    expect(getTelemetryDashboardAccess(`Bearer ${SECRET}`, SECRET)).toBe("authorized");
    expect(getTelemetryDashboardAccess(`bearer ${SECRET}`, SECRET)).toBe("authorized");
  });
});
