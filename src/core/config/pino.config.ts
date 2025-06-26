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

const socketTransport = pino.transport({
  target: 'pino-socket',
  options: {
    address: '159.223.125.10',
    port: 5050,
    mode: 'tcp',
    reconnect: true,
    timeout: 3000,
  },
});

export const configuration = pino(
  pinoConfig,
  pino.multistream([consoleTransport, socketTransport])
);
