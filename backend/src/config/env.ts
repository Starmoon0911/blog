import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SECRET_KEY: z.string().min(1),
  SUPABASE_ANON_KEY: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_NAME: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(9000),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  REVALIDATE_TOKEN: z.string().min(16),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = Object.freeze(envSchema.parse(process.env));
