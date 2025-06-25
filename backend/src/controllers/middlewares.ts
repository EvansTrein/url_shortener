import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors';
import { logger } from '@/logger';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error('Response error - %o', err);
    } else {
      logger.warn(`Response error - ${err}`);
    }

    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  logger.error('Internal server error - %o', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
