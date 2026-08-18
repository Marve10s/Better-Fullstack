import type { Analytics, Frontend } from "@better-fullstack/types";

import { describe, expect, it } from "bun:test";

import { validatePreflightConfig } from "../src/preflight-validation";
import { makeConfig } from "./_fixtures/config-factory";

function analyticsWarning(frontend: Frontend, analytics: Analytics) {
	const result = validatePreflightConfig(
		makeConfig({
			frontend: [frontend],
			backend: "hono",
			runtime: "bun",
			database: "none",
			orm: "none",
			api: "none",
			auth: "none",
			analytics,
		}),
	);
	return result.warnings.find((warning) => warning.ruleId === "analytics-no-frontend");
}

describe("analytics preflight", () => {
	it("warns when the provider has no template for the chosen frontend", () => {
		expect(analyticsWarning("vue", "plausible")).toBeDefined();
		expect(analyticsWarning("astro", "posthog")).toBeDefined();
		expect(analyticsWarning("astro", "umami")).toBeDefined();
	});

	it("stays quiet for provider-supported frontends", () => {
		expect(analyticsWarning("vue", "posthog")).toBeUndefined();
		expect(analyticsWarning("astro", "vercel-analytics")).toBeUndefined();
		expect(analyticsWarning("vue", "ga4")).toBeUndefined();
	});
});
