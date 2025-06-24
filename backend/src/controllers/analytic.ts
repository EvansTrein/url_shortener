import { logger } from '@/logger';
import { AnalyticService } from '@services/analytic';
import { Request, Response, NextFunction } from 'express';

export class AnalyticController {
  private readonly service: AnalyticService;

  constructor(service: AnalyticService) {
    this.service = service;
  }

  public async analytic(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
