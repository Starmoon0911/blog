import type { Request, Response, NextFunction, RequestHandler } from "express";
import { supabaseAdmin } from "../database/supabase";
import { UnauthorizedError } from "../utils/Error";

// Augment Express Request with optional user
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; email?: string | null } | null;
  }
}

export const requireAuth: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing Bearer token");
    }
    const token = authorization.replace("Bearer ", "");
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      throw new UnauthorizedError("Invalid token");
    }
    req.user = { id: data.user.id, email: data.user.email ?? null };
    next();
  } catch (err) {
    next(err);
  }
};
