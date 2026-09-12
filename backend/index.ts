import "dotenv/config";
import express from "express";
import type { Express } from "express";
import cors from "cors";
import logger from "./src/utils/logger";
import { errorHandler } from "./src/middleware/errorHandler";
import { notFoundHandler } from "./src/middleware/notFound";
import { rateLimit } from "./src/middleware/rateLimit";
import { requireAuth } from "./src/middleware/auth";
import { env } from "./src/config/env";
import Auth from "./src/route/auth.route";
import healthRouter from "./src/route/health.route";

export function createApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
    }),
  );

  // Public surfaces
  app.use(healthRouter);

  // Default per-IP rate limit on the API surface. Specific endpoints
  // (login, comments) layer tighter limits via additional rateLimit() calls.
  const apiLimiter = rateLimit({ windowMs: 60_000, max: 120 });
  app.use("/api/v1", apiLimiter, Auth);

  // Admin-only sample route — proves requireAuth wiring.
  // Other admin routers will be added by the Admin Dashboard plan and mount
  // requireAuth on their own sub-paths.
  const adminRouter = express.Router();
  adminRouter.get("/admin/whoami", requireAuth, (req, res) => {
    res.json({ id: req.user?.id, email: req.user?.email });
  });
  app.use("/api/v1", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

if (process.env.NODE_ENV !== "test" && !process.env.VITEST) {
  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "server listening");
  });
}
