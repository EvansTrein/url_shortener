import { logger } from '@/logger';
import { Repository } from 'typeorm';
import { UrlShort } from '@entities/urlShort';
import { AppDataSource } from '@config/data-source';

export class ShortnerRepo {
  private readonly repo: Repository<UrlShort>;

  constructor() {
    this.repo = AppDataSource.getRepository(UrlShort);
  }
}
