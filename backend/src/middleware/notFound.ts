import { type Request, type Response, type NextFunction } from "express";
import { NotFoundError } from "../utils/Error";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}
