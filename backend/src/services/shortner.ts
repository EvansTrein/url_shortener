import { generateRandomStr } from '@/utils/utils';
import { ShortnerRepo } from '@repo/shortner';
import { config } from '@config/config';
import { UrlShort } from '@/entities/urlShort';

export class ShortnerService {
  private readonly repo: ShortnerRepo;

  constructor(repo: ShortnerRepo) {
    this.repo = repo;
  }

  public async shorten(originalUrl: string, expiresAt: Date | undefined): Promise<UrlShort> {
    const shortUrl = `${config.DOMAIN}/${generateRandomStr(10)}`;
    if (expiresAt === undefined) {
      const now = new Date();
      now.setHours(now.getDay() + 1);
      expiresAt = now;
    }

    return await this.repo.create({ originalUrl: originalUrl, shortUrl: shortUrl, expiresAt: expiresAt });
  }
}
