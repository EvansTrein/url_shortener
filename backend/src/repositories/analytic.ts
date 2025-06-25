import { Repository } from 'typeorm';
import { Analytic } from '@entities/analytic';
import { AppDataSource } from '@config/data-source';
import { ERROR_RESOURCE_NOT_FOUND } from '@/errors';

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

  public async analytic(urlShort: string): Promise<{ totalClicks: number; lastIps: string[] }> {
    const totalClicks = await this.repo.count({ where: { urlShort } });

    if (totalClicks === 0) throw ERROR_RESOURCE_NOT_FOUND;

    const lastIpsQuery = this.repo
      .createQueryBuilder('analytic')
      .select('analytic.ipAddr', 'ip')
      .where('analytic.urlShort = :urlShort', { urlShort })
      .orderBy('analytic.eventDate', 'DESC')
      .limit(5)
      .getRawMany();

    const lastIps = (await lastIpsQuery).map((r: any) => r.ip).filter(Boolean);

    return { totalClicks, lastIps };
  }
}
