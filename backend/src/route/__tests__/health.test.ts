import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import healthRouter from "../health.route";

const app = express();
app.use(healthRouter);

describe("GET /healthz", () => {
  it("returns 200 with status ok", async () => {
    const res = await request(app).get("/healthz");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
