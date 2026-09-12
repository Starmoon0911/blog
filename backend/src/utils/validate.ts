import { z, type ZodTypeAny } from "zod";
import { BadRequestError } from "./Error";

export function validate<T extends ZodTypeAny>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const message = result.error.issues
    .map((e) => `${e.path.join(".") || "(root)"}: ${e.message}`)
    .join("; ");
  throw new BadRequestError(message);
}
