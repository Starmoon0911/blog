import { describe, it, expect, beforeEach, afterEach } from "vitest";

const originalEnv = { ...process.env };

function setEnv(overrides: Record<string, string | undefined>) {
  for (const k of Object.keys(process.env)) delete process.env[k];
  process.env = {
    ...originalEnv,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, v]) => v !== undefined),
    ),
  };
}

describe("config/env", () => {
  beforeEach(() => setEnv({}));
  afterEach(() => setEnv({}));

  it("parses a complete env", async () => {
    setEnv({
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SECRET_KEY: "secret",
      SUPABASE_ANON_KEY: "anon",
      ADMIN_EMAIL: "admin@example.com",
      ADMIN_PASSWORD: "password1234",
      ADMIN_NAME: "Admin",
      PORT: "9000",
      FRONTEND_ORIGIN: "http://localhost:3000",
      LOG_LEVEL: "debug",
      REVALIDATE_TOKEN: "token-1234567890",
    });
    const mod = await import("../env");
    expect(mod.env.PORT).toBe(9000);
    expect(mod.env.FRONTEND_ORIGIN).toBe("http://localhost:3000");
    expect(mod.env.LOG_LEVEL).toBe("debug");
    expect(mod.env.REVALIDATE_TOKEN).toBe("token-1234567890");
  });

  it("rejects missing required keys", async () => {
    setEnv({ SUPABASE_URL: "https://x.supabase.co" });
    await expect(import("../env?miss=" + Math.random())).rejects.toThrow();
  });
});
