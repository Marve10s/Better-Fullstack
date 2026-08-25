import {
  parseStackPartSpecs,
  recommendStarterTrack,
  validateStackParts,
  type StarterTrackId,
} from "@better-fullstack/types";

const RECOMMENDATION_EVALUATION_CASES: readonly {
  id: string;
  expectedTrackId: StarterTrackId;
  brief: string;
}[] = [
  { id: "saas-subscriptions", expectedTrackId: "saas-app", brief: "subscription billing product" },
  { id: "saas-stripe", expectedTrackId: "saas-app", brief: "founder app with Stripe checkout" },
  { id: "saas-category", expectedTrackId: "saas-app", brief: "software as a service" },
  { id: "saas-paid", expectedTrackId: "saas-app", brief: "paid product with subscriptions" },
  { id: "ai-mcp", expectedTrackId: "ai-agent-app", brief: "AI agent with MCP skills" },
  { id: "ai-chat", expectedTrackId: "ai-agent-app", brief: "LLM chatbot assistant" },
  { id: "ai-copilot", expectedTrackId: "ai-agent-app", brief: "agent assisted copilot" },
  { id: "ai-rag", expectedTrackId: "ai-agent-app", brief: "RAG agent application" },
  { id: "api-fastapi", expectedTrackId: "rest-api", brief: "Python REST API with FastAPI" },
  { id: "api-typed", expectedTrackId: "rest-api", brief: "typed Python backend service" },
  { id: "api-data", expectedTrackId: "rest-api", brief: "Pydantic SQLAlchemy API" },
  { id: "api-service", expectedTrackId: "rest-api", brief: "expose a REST service" },
  { id: "java-spring", expectedTrackId: "java-api", brief: "Java API with Spring Boot" },
  { id: "java-secure", expectedTrackId: "java-api", brief: "secure JVM service" },
  { id: "java-enterprise", expectedTrackId: "java-api", brief: "enterprise Spring JPA backend" },
  { id: "java-security", expectedTrackId: "java-api", brief: "secure API with Spring Security" },
  { id: "rust-axum", expectedTrackId: "rust-backend", brief: "Rust backend with Axum" },
  { id: "rust-memory", expectedTrackId: "rust-backend", brief: "memory safe service in Rust" },
  { id: "rust-systems", expectedTrackId: "rust-backend", brief: "systems grade Rust API" },
  { id: "rust-seaorm", expectedTrackId: "rust-backend", brief: "high performance SeaORM service" },
  {
    id: "mobile-platforms",
    expectedTrackId: "mobile-app",
    brief: "mobile app for iOS and Android",
  },
  { id: "mobile-expo", expectedTrackId: "mobile-app", brief: "React Native Expo client" },
  { id: "mobile-store", expectedTrackId: "mobile-app", brief: "app store phone client" },
  { id: "mobile-uniwind", expectedTrackId: "mobile-app", brief: "native Uniwind app" },
  {
    id: "internal-dashboard",
    expectedTrackId: "internal-tool",
    brief: "internal tool admin dashboard",
  },
  { id: "internal-crud", expectedTrackId: "internal-tool", brief: "CRUD operations portal" },
  { id: "internal-backoffice", expectedTrackId: "internal-tool", brief: "backoffice admin panel" },
  { id: "internal-ops", expectedTrackId: "internal-tool", brief: "operations dashboard" },
];

const REQUIRED_BASELINE_ACCURACY = 0.85;

export function runRecommendationEvaluation() {
  const cases = RECOMMENDATION_EVALUATION_CASES.map((fixture) => {
    const first = recommendStarterTrack(fixture.brief);
    const repeatedTrackIds = Array.from({ length: 3 }, () =>
      recommendStarterTrack(fixture.brief),
    ).map((result) => result.track.id);
    const graphIssues = validateStackParts(parseStackPartSpecs(first.track.stackPartSpecs)).issues;

    return {
      caseId: fixture.id,
      expectedTrackId: fixture.expectedTrackId,
      actualTrackId: first.track.id,
      correct: first.track.id === fixture.expectedTrackId,
      deterministic: repeatedTrackIds.every((trackId) => trackId === first.track.id),
      schemaValid: graphIssues.length === 0,
      evidenceLevel: first.track.evidence.level,
      constraintCount: first.constraints.length,
    };
  });
  const correct = cases.filter((entry) => entry.correct).length;
  const accuracy = correct / cases.length;
  const deterministic = cases.every((entry) => entry.deterministic);
  const schemaValid = cases.every((entry) => entry.schemaValid);
  const constraintsPresent = cases.every((entry) => entry.constraintCount > 0);
  const baselinePasses =
    accuracy >= REQUIRED_BASELINE_ACCURACY && deterministic && schemaValid && constraintsPresent;

  return {
    schemaVersion: 1 as const,
    corpus: {
      kind: "controlled-local-fixtures" as const,
      totalCases: cases.length,
      promptTelemetryCollected: false,
    },
    baseline: {
      mode: "deterministic" as const,
      correct,
      accuracy,
      deterministic,
      schemaValid,
      constraintsPresent,
      cases,
    },
    gate: {
      requiredAccuracy: REQUIRED_BASELINE_ACCURACY,
      passed: baselinePasses,
    },
    modelEvaluation: {
      status: baselinePasses ? ("not-triggered" as const) : ("eligible" as const),
      reason: baselinePasses
        ? "The deterministic baseline meets the controlled accuracy, repeatability, graph validity, evidence, and review-constraint gate."
        : "The deterministic baseline missed a controlled gate. A model comparison may be evaluated before any product integration.",
      modelLayerEnabled: false,
    },
    decision: baselinePasses
      ? ("keep-deterministic" as const)
      : ("evaluate-model-comparison" as const),
  };
}

export function assertRecommendationEvaluationGate() {
  const report = runRecommendationEvaluation();
  if (!report.gate.passed) {
    const failures = report.baseline.cases
      .filter((entry) => !entry.correct || !entry.deterministic || !entry.schemaValid)
      .map((entry) => entry.caseId)
      .join(", ");
    throw new Error(
      `Deterministic recommendation evaluation failed at ${Math.round(report.baseline.accuracy * 100)}% accuracy. Cases: ${failures}`,
    );
  }
  return report;
}

if (import.meta.main) {
  process.stdout.write(`${JSON.stringify(assertRecommendationEvaluationGate(), null, 2)}\n`);
}
