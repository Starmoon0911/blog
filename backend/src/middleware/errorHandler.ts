import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/Error";
import logger from "../utils/logger";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  logger.error({ err }, "unhandled error");
  return res.status(500).json({
    message: "Internal server error",
  });
}
