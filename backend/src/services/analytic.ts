import { AnalyticRepo } from '@repo/analytic';

export class AnalyticService {
  private readonly repo: AnalyticRepo;

  constructor(repo: AnalyticRepo) {
    this.repo = repo;
  }

  public async create(urlShort: string, ip: string): Promise<void> {
    await this.repo.create(urlShort, ip);
  }

  public async analytic(urlShort: string): Promise<{ totalClicks: number; lastIps: string[] }> {
    return await this.repo.analytic(urlShort);
  }
}
