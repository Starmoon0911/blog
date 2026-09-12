export class AppError extends Error {
  public readonly statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, message);

    this.name = "NotFoundError";
  }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, message);

    this.name = "UnauthorizedError";
  }
}
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(403, message);

    this.name = "ForbiddenError";
  }
}
export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(400, message);
    1;
    this.name = "BadRequestError";
  }
}
