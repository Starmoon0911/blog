import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";

vi.mock("../../database/supabase", () => ({
  supabaseAdmin: { auth: { getUser: vi.fn() } },
  supabaseAnon: { auth: { getUser: vi.fn() } },
  default: { auth: { getUser: vi.fn() } },
}));

import { createApp } from "../../../index";
import { supabaseAdmin } from "../../database/supabase";
import { env } from "../../config/env";

const mockedGetUser = supabaseAdmin.auth.getUser as unknown as ReturnType<
  typeof vi.fn
>;

describe("pipeline", () => {
  beforeEach(() => mockedGetUser.mockReset());

  it("GET /healthz returns 200 without auth", async () => {
    const app = createApp();
    const res = await request(app).get("/healthz");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/v1/admin/whoami returns 401 without token", async () => {
    const app = createApp();
    const res = await request(app).get("/api/v1/admin/whoami");
    expect(res.status).toBe(401);
  });

  it("GET /api/v1/admin/whoami returns 200 with valid token", async () => {
    mockedGetUser.mockResolvedValueOnce({
      data: { user: { id: "u1", email: "a@b.com" } },
      error: null,
    });
    const app = createApp();
    const res = await request(app)
      .get("/api/v1/admin/whoami")
      .set("Authorization", "Bearer t");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "u1", email: "a@b.com" });
  });
});
