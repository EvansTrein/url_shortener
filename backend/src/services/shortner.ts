import { generateRandomStr } from '@/utils/utils';
import { ShortnerRepo } from '@repo/shortner';
import { config } from '@config/config';
import { ERROR_RESOURCE_NOT_FOUND, ERROR_URL_EXPIRED } from '@/errors';
import { UrlShort } from '@entities/urlShort';

export class ShortnerService {
  private readonly repo: ShortnerRepo;

  constructor(repo: ShortnerRepo) {
    this.repo = repo;
  }

  public async shorten(originalUrl: string, expiresAt: Date | undefined): Promise<string> {
    const shortUrl = generateRandomStr(10);

    if (expiresAt === undefined) {
      const now = new Date();
      now.setHours(now.getHours() + 24);
      // now.setSeconds(now.getSeconds() + 10);
      expiresAt = now;
    }

    const result = await this.repo.create({ originalUrl: originalUrl, shortUrl: shortUrl, expiresAt: expiresAt });

    return `${config.DOMAIN}/${result.shortUrl}`;
  }

  public async redirect(shortUrl: string): Promise<string> {
    const url = await this.repo.findUrl(shortUrl);

    if (!url) {
      throw ERROR_RESOURCE_NOT_FOUND;
    }

    if (url.expiresAt < new Date()) {
      throw ERROR_URL_EXPIRED;
    }

    return url.originalUrl;
  }

  public async info(shortUrl: string): Promise<UrlShort> {
    const result = await this.repo.findUrl(shortUrl);

    if (!result) {
      throw ERROR_RESOURCE_NOT_FOUND;
    }

    return result;
  }

  public async delete(shortUrl: string): Promise<void> {
    const result = await this.repo.remove(shortUrl);

    if (!result) {
      throw ERROR_RESOURCE_NOT_FOUND;
    }
  }
}
