import { AnalyticRepo } from '@repo/analytic';

export class AnalyticService {
  private readonly repo: AnalyticRepo;

  constructor(repo: AnalyticRepo) {
    this.repo = repo;
  }

	
}