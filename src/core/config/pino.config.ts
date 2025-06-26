import pino from 'pino';
import * as os from 'os';

const pinoConfig = {
  base: {
    service: 'nest-boilerplate',
    environment: process.env.ENVIRONMENT || 'production',
    hostname: os.hostname(),
  },
  formatters: {
    level(label: string) {
      return { level: label };
    },
  },
};

const consoleTransport = {
  stream: process.stdout,
};

export const configuration = pino(
  pinoConfig,
  pino.multistream([consoleTransport])
);