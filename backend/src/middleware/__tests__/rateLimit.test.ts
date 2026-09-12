import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import express from "express";
import request from "supertest";
import { rateLimit, __resetRateLimitForTests } from "../rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    __resetRateLimitForTests();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function makeApp(opts: Parameters<typeof rateLimit>[0]) {
    const app = express();
    app.use(rateLimit(opts));
    app.get("/", (_req, res) => res.json({ ok: true }));
    return app;
  }

  it("allows up to max requests in a window", async () => {
    const app = makeApp({ windowMs: 1000, max: 2 });
    await request(app).get("/").expect(200);
    await request(app).get("/").expect(200);
    await request(app).get("/").expect(429);
  });

  it("resets the count after the window", async () => {
    const app = makeApp({ windowMs: 1000, max: 1 });
    await request(app).get("/").expect(200);
    await request(app).get("/").expect(429);
    vi.advanceTimersByTime(1001);
    await request(app).get("/").expect(200);
  });

  it("sets Retry-After header in seconds", async () => {
    const app = makeApp({ windowMs: 5000, max: 1 });
    await request(app).get("/").expect(200);
    const res = await request(app).get("/");
    expect(res.status).toBe(429);
    expect(res.headers["retry-after"]).toBe("5");
  });

  it("keys by a custom function", async () => {
    const app = makeApp({
      windowMs: 1000,
      max: 1,
      keyBy: (req) => (req.headers["x-test-user"] as string) ?? "anon",
    });
    await request(app).get("/").set("x-test-user", "alice").expect(200);
    await request(app).get("/").set("x-test-user", "bob").expect(200);
    await request(app).get("/").set("x-test-user", "alice").expect(429);
  });
});
