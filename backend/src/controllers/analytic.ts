import { logger } from '@/logger';
import { AnalyticService } from '@services/analytic';
import { Request, Response, NextFunction } from 'express';

export class AnalyticController {
  private readonly service: AnalyticService;

  constructor(service: AnalyticService) {
    this.service = service;
  }

  public async analytic(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { shortUrl } = req.params;
    try {
      const result = await this.service.analytic(shortUrl);

      res.status(200).json(result);
      logger.info('Analytic successfully', { module: 'controller' });
    } catch (error) {
      logger.warn(`Failed analytic - ${error}`, { module: 'controller' });
      next(error);
    }
  }
}
