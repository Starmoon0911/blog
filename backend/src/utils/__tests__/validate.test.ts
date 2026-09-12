import { describe, it, expect } from "vitest";
import { z } from "zod";
import { validate } from "../validate";
import { BadRequestError } from "../Error";

const schema = z.object({
  slug: z.string().min(3),
  status: z.enum(["draft", "public", "private"]),
});

describe("validate", () => {
  it("returns parsed data on success", () => {
    const out = validate(schema, { slug: "hello-world", status: "public" });
    expect(out).toEqual({ slug: "hello-world", status: "public" });
  });

  it("throws BadRequestError with joined messages on failure", () => {
    try {
      validate(schema, { slug: "x", status: "wat" });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestError);
      expect((err as Error).message).toMatch(/slug/);
      expect((err as Error).message).toMatch(/status/);
    }
  });
});
