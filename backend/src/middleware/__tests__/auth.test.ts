import { describe, it, expect, beforeEach, vi } from "vitest";
import express from "express";
import request from "supertest";

vi.mock("../../database/supabase", () => {
  return {
    supabaseAdmin: {
      auth: {
        getUser: vi.fn(),
      },
    },
    supabaseAnon: {
      auth: { getUser: vi.fn() },
    },
    default: {
      auth: { getUser: vi.fn() },
    },
  };
});

import { requireAuth } from "../auth";
import { supabaseAdmin } from "../../database/supabase";

const mockedGetUser = supabaseAdmin.auth.getUser as unknown as ReturnType<
  typeof vi.fn
>;

function makeApp() {
  const app = express();
  app.get("/protected", requireAuth, (req, res) => {
    res.json({ id: (req as any).user?.id ?? null });
  });
  // Error handler emits status+json
  app.use((err: any, _req: any, res: any, _next: any) => {
    res.status(err.statusCode ?? 500).json({ message: err.message });
  });
  return app;
}

describe("requireAuth", () => {
  beforeEach(() => {
    mockedGetUser.mockReset();
  });

  it("401 when Authorization header is missing", async () => {
    const res = await request(makeApp()).get("/protected");
    expect(res.status).toBe(401);
    expect(mockedGetUser).not.toHaveBeenCalled();
  });

  it("401 when token is invalid", async () => {
    mockedGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: { message: "bad" },
    });
    const res = await request(makeApp())
      .get("/protected")
      .set("Authorization", "Bearer bad-token");
    expect(res.status).toBe(401);
  });

  it("attaches user to req and continues on valid token", async () => {
    const fakeUser = { id: "user-1", email: "a@b.com" };
    mockedGetUser.mockResolvedValueOnce({
      data: { user: fakeUser },
      error: null,
    });
    const res = await request(makeApp())
      .get("/protected")
      .set("Authorization", "Bearer good-token");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "user-1" });
  });
});
