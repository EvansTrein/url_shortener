import { logger } from '@/logger';
import { Repository } from 'typeorm';
import { Analytic } from '@entities/analytic';
import { AppDataSource } from '@config/data-source';

export class AnalyticRepo {
  private readonly repo: Repository<Analytic>;

  constructor() {
    this.repo = AppDataSource.getRepository(Analytic);
  }
}
