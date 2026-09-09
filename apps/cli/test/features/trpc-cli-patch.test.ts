import * as effect from "effect";
import { describe, expect, it } from "bun:test";
import { toJsonSchema } from "trpc-cli/dist/json-schema.js";
import { z } from "zod";

describe("trpc-cli optional schema dependencies", () => {
  it("keeps Zod metadata conversion behavior", () => {
    const result = toJsonSchema(z.object({ name: z.string().describe("Project name") }), {});

    expect(result.success).toBe(true);
    if (!result.success) throw new Error(result.error);
    expect(result.value.properties?.name).toMatchObject({
      description: "Project name",
      type: "string",
    });
  });

  it("keeps Effect schema conversion through trpc-cli's optional dependency injection", () => {
    const schema = effect.Schema.standardSchemaV1(
      effect.Schema.Struct({ name: effect.Schema.String }),
    );
    const result = toJsonSchema(schema, { effect });

    expect(result.success).toBe(true);
    if (!result.success) throw new Error(result.error);
    expect(result.value.properties?.name).toMatchObject({ type: "string" });
  });

  it("keeps automatic Effect schema conversion when the module was not injected", () => {
    const schema = effect.Schema.standardSchemaV1(
      effect.Schema.Struct({ name: effect.Schema.String }),
    );
    const result = toJsonSchema(schema, {});

    expect(result.success).toBe(true);
    if (!result.success) throw new Error(result.error);
    expect(result.value.properties?.name).toMatchObject({ type: "string" });
  });
});
