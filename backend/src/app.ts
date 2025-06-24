import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import http from 'http';
import { Request, Response, NextFunction } from 'express';
import { ShortnerController } from '@/controllers/shortner';
import { errorMiddleware } from '@controllers/middlewares';
import { initRouterShortner } from '@/routes/shortner';
import { logger } from './logger';
import { ShortnerRepo } from '@/repositories/shortner';
import { ShortnerService } from '@/services/shortner';
import { config } from '@config/config';
import { AppDataSource } from '@config/data-source';

export class App {
  private server: http.Server;

  constructor() {
    const expressInst = express();
    this.server = http.createServer(expressInst);

    AppDataSource.initialize()
      .then(() => {
        logger.info('Successful connection to database', { module: 'config' });
      })
      .catch((error) => {
        logger.error(`Failed to connect to database - error: ${error}`, { module: 'config' });
        throw error;
      });

    expressInst.use(
      cors({
        origin: config.CLIENT_ORIGINS,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
      })
    );

    expressInst.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes time window
        max: 200, // limit each IP to 200 requests per window
      })
    );

    expressInst.use(express.json());
    expressInst.use(express.urlencoded({ extended: true }));

    const shortnerRepo = new ShortnerRepo();

    const rateService = new ShortnerService(shortnerRepo);
    const rateController = new ShortnerController(rateService);

    expressInst.use('/api', initRouterShortner(rateController));

    expressInst.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      errorMiddleware(err, req, res, next);
    });
  }

  public async start(port: string): Promise<void> {
    this.server.listen(port, () => {
      logger.info(`http server running on port - ${port}`, { module: 'app' });
    });
  }

  public async stop(): Promise<void> {
    logger.info('Starting graceful shutdown', { module: 'app' });

    await new Promise<void>((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          logger.error('Error during server close:', { error: err }, { module: 'app' });
          return reject(err);
        }
        logger.info('HTTP server closed', { module: 'app' });
        resolve();
      });
    });

    await AppDataSource.destroy()
      .then(() => {
        logger.info('Postgres connection closed', { module: 'app' });
      })
      .catch((error) => {
        logger.info('Error postgres connection error', { error: error }, { module: 'app' });
        throw error;
      });
  }
}
