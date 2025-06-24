import { logger } from '@/logger';
import { Repository } from 'typeorm';
import { UrlShort } from '@entities/urlShort';
import { AppDataSource } from '@config/data-source';

export class ShortnerRepo {
  private readonly repo: Repository<UrlShort>;

  constructor() {
    this.repo = AppDataSource.getRepository(UrlShort);
  }

  public async create(data: { originalUrl: string; shortUrl: string; expiresAt: Date }): Promise<UrlShort> {
    try {
      const urlShort = this.repo.create({
        originalUrl: data.originalUrl,
        shortUrl: data.shortUrl,
        expiresAt: data.expiresAt,
      });

      const savedUrl = await this.repo.save(urlShort);

      logger.info(`Created successfully: ${data.shortUrl}`, { module: 'repositories' });
      return savedUrl;
    } catch (error) {
      logger.error('Failed to create short URL - error: %o', error, { module: 'repositories' });
      throw error;
    }
  }
}
