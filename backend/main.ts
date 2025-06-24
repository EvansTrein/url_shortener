import { App } from './src/app';
import { logger } from './src/logger';
import { config } from './src/config/config';

const app = new App();

app.start(config.API_PORT as string);

const gracefulShutdown = async () => {
  logger.info('Received shutdown signal', { module: 'main' });
  try {
    await app.stop();
    logger.info('Shutdown complete', { module: 'main' });
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown', { error: error }, { module: 'main' });
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);
