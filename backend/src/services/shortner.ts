import { ERROR_RESOURCE_NOT_FOUND } from '@/errors';
import { ShortnerRepo } from '@/repositories/shortner';

export class ShortnerService {
  private readonly repo: ShortnerRepo;

  constructor(repo: ShortnerRepo) {
    this.repo = repo;
  }

	public async getOriginalUrl(url: string) {
		throw ERROR_RESOURCE_NOT_FOUND
	}
}
