import winston from 'winston';
import { config } from '@config/config';

const logLevel = config.ENV

const colorizer = winston.format.colorize();
const consoleFormat = winston.format.printf(({ timestamp, level, message, module, ...meta }) => {
  const actualModule = module || meta.module || 'global';
  const coloredLevel = colorizer.colorize(level, level.toUpperCase());
  let finalMessage = message;
  if (typeof message !== 'string') {
    finalMessage = JSON.stringify(message, null, 2);
  }
  return `[${timestamp}]-[${coloredLevel}][${actualModule}]: ${finalMessage}`;
});

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.splat(),
    consoleFormat
  ),
  defaultMeta: { module: 'global' },
  transports: [new winston.transports.Console()],
});
