import winston from "winston";
import { config } from '../environment/config';
const { combine, timestamp, colorize, simple } = winston.format;

export const Logger = winston.createLogger({
    level: config.logger.level,
    format: combine(colorize(), timestamp(), simple()),
    transports: [new winston.transports.Console()],
});
