import { ERROR_INVALID_ORIGINAL_URL, ERROR_INVALID_EXPIRES_AT } from '@/errors';
import { logger } from '@/logger';
import { isValidUrl } from '@/utils/utils';
import { ShortnerService } from '@services/shortner';
import { Request, Response, NextFunction } from 'express';

export class ShortnerController {
  private readonly service: ShortnerService;

  constructor(service: ShortnerService) {
    this.service = service;
  }

  public async shorten(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { originalUrl, expiresAt } = req.body;

      if (typeof originalUrl !== 'string' || originalUrl.trim() === '' || !isValidUrl(originalUrl)) {
        next(ERROR_INVALID_ORIGINAL_URL);
        return;
      }

      let parsedExpiresAt: Date | undefined;
      if (expiresAt !== undefined) {
        if (typeof expiresAt !== 'string') {
          next(ERROR_INVALID_EXPIRES_AT);
          return;
        }

        parsedExpiresAt = new Date(expiresAt);
        if (isNaN(parsedExpiresAt.getTime())) {
          next(ERROR_INVALID_EXPIRES_AT);
          return;
        }

        if (parsedExpiresAt <= new Date()) {
          next(ERROR_INVALID_EXPIRES_AT);
          return;
        }
      }

      const result = await this.service.shorten(originalUrl, parsedExpiresAt);

      res.status(201).json({ shortUrl: result.shortUrl });
    } catch (error) {
      next(error);
    }
  }

  public async redirect(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { shortUrl } = req.params;
    try {
      logger.debug(`Redirect request for short URL: ${shortUrl}`, { module: 'controller' });

      // const originalUrl = await this.service.getOriginalUrl(shortUrl);

      // res.redirect(originalUrl);
    } catch (error) {
      logger.warn(`Failed redirect - ${error}`, { module: 'controller' });
      next(error);
    }
  }

  public async info(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
