import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { asyncHandler } from "../asyncHandler";

describe("asyncHandler", () => {
  it("forwards thrown errors to the express error pipeline", async () => {
    const boom = new Error("boom");
    const app = express();
    app.get(
      "/",
      asyncHandler(async (_req, _res) => {
        throw boom;
      }),
    );
    // Express default error handler returns 500; we just assert the error reaches it.
    const res = await request(app).get("/");
    expect(res.status).toBe(500);
  });

  it("returns the awaited value normally", async () => {
    const app = express();
    app.get(
      "/",
      asyncHandler(async (_req, res) => {
        res.json({ ok: true });
      }),
    );
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
