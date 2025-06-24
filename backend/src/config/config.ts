import dotenv from 'dotenv';
dotenv.config({ path: 'local.env' });

interface IConfig {
  ENV: string | undefined;
  API_PORT: string | undefined;
  DOMAIN: string | undefined;
  POSTGRES_PATH: string | undefined;
  CLIENT_ORIGINS: string | undefined;

  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_PORT: string | undefined;
  POSTGRES_HOST: string | undefined;
  POSTGRES_NAME: string | undefined;
}

export const config: IConfig = {
  ENV: process.env.ENV,
  API_PORT: process.env.API_PORT,
  DOMAIN: process.env.DOMAIN,
  POSTGRES_PATH: process.env.POSTGRES_PATH,
  CLIENT_ORIGINS: process.env.CLIENT_ORIGINS,

  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_NAME: process.env.POSTGRES_NAME,
};
