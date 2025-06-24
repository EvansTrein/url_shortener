import { logger } from '@/logger';
import { ShortnerService } from '@services/shortner';
import { Request, Response, NextFunction } from 'express';

export class ShortnerController {
  private readonly service: ShortnerService;

  constructor(service: ShortnerService) {
    this.service = service;
  }

  public async shorten(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async redirect(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { shortUrl } = req.params;
    try {
      logger.debug(`Redirect request for short URL: ${shortUrl}`, { module: 'controller' });

      const originalUrl = await this.service.getOriginalUrl(shortUrl);

      // res.redirect(originalUrl);
    } catch (error) {
      logger.warn(`Failed redirect - ${error}`, { module: 'controller' });
      next(error);
    }
  }

  public async info(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
