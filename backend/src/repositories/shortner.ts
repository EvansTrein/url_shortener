import { Repository } from 'typeorm';
import { UrlShort } from '@entities/urlShort';
import { AppDataSource } from '@config/data-source';

export class ShortnerRepo {
  private readonly repo: Repository<UrlShort>;

  constructor() {
    this.repo = AppDataSource.getRepository(UrlShort);
  }

  public async create(data: { originalUrl: string; shortUrl: string; expiresAt: Date }): Promise<UrlShort> {
    const urlShort = this.repo.create({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
      expiresAt: data.expiresAt,
    });

    return await this.repo.save(urlShort);
  }

  public async findUrl(shortUrl: string): Promise<UrlShort | null> {
    const url = await this.repo.findOneBy({ shortUrl });

    if (url) {
      url.clickCount++;
      await this.repo.save(url);
    }

    return url;
  }

  public async remove(shortUrl: string): Promise<boolean> {
    const result = await this.repo.delete({ shortUrl });

    if (result.affected === null || result.affected === undefined) return false;

    return result.affected > 0;
  }
}
