export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ERROR_RESOURCE_NOT_FOUND = new AppError('Resource not found', 404);
