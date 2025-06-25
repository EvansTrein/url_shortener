import { ERROR_INVALID_ORIGINAL_URL, ERROR_INVALID_EXPIRES_AT } from '@/errors';
import { logger } from '@/logger';
import { AnalyticService } from '@services/analytic';
import { ShortnerService } from '@services/shortner';
import { isValidUrl } from '@/utils/utils';
import { Request, Response, NextFunction } from 'express';

export class ShortnerController {
  private readonly service: ShortnerService;
  private readonly analytic: AnalyticService;

  constructor(service: ShortnerService, analytic: AnalyticService) {
    this.service = service;
    this.analytic = analytic;
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

      res.status(201).json({ shortUrl: result });
      logger.info('Created successfully', { module: 'controller' });
    } catch (error) {
      next(error);
    }
  }

  public async redirect(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { shortUrl } = req.params;
    try {
      logger.debug(`Redirect request for short URL: ${shortUrl}`, { module: 'controller' });

      const originalUrl = await this.service.redirect(shortUrl);

      res.redirect(302, originalUrl);
      logger.info('Redirect successfully', { module: 'controller' });
    } catch (error) {
      logger.warn(`Failed redirect - ${error}`, { module: 'controller' });
      next(error);
      return;
    }

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip?.replace('::ffff:', '');
    if (!ip) {
      logger.warn('Failed to get IP, the transition will not be saved to analytics', { module: 'controller' });
      return;
    }

    try {
      await this.analytic.create(shortUrl, ip);
      logger.info('Successfully saved to analytics', { module: 'controller' });
    } catch (error) {
      logger.warn(`Failed saved to analytics - ${error}`, { module: 'controller' });
    }
  }

  public async info(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { shortUrl } = req.params;
    try {
      const url = await this.service.info(shortUrl);

      res.status(200).json(url);
      logger.info('Info about url successfully', { module: 'controller' });
    } catch (error) {
      logger.warn(`Failed redirect - ${error}`, { module: 'controller' });
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { shortUrl } = req.params;
  }
}
