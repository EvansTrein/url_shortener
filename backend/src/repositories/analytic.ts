import { Repository } from 'typeorm';
import { Analytic } from '@entities/analytic';
import { AppDataSource } from '@config/data-source';

export class AnalyticRepo {
  private readonly repo: Repository<Analytic>;

  constructor() {
    this.repo = AppDataSource.getRepository(Analytic);
  }

  public async create(urlShort: string, ip: string): Promise<void> {
    const analytic = this.repo.create({
      urlShort,
      ipAddr: ip,
    });

    await this.repo.save(analytic);
  }
}
