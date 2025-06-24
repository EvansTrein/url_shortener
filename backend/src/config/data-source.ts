import { DataSource } from 'typeorm';
import { config } from '@config/config';
import { UrlShort } from '@/entities/urlShort';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_NAME,
  synchronize: true,
  logging: true,
  entities: [UrlShort],
  subscribers: [],
  migrations: [],
});
