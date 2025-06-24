import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { logger } from '@/logger';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(`Responce error - ${err}`);
    }

    logger.warn(`Responce error - ${err}`);
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  logger.error(`Internal server error - ${err}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
