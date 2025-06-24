export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ERROR_RESOURCE_NOT_FOUND = new AppError('Resource not found', 404);
export const ERROR_INVALID_ORIGINAL_URL = new AppError('Missing or invalid original URL', 400);
export const ERROR_INVALID_EXPIRES_AT = new AppError('Invalid or past date for expiresAt', 400);
