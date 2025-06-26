import { ConsoleLogger, Injectable } from '@nestjs/common';
import { asyncLocalStorage } from 'src/common/interceptors/logging.interceptor';
import { configuration } from '../config/pino.config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logger = configuration;

  private getContext() {
    return asyncLocalStorage.getStore();
  }

  private buildLog(message: string) {
    const ctx = this.getContext() || {};
    return { message: message, ...ctx };
  }

  override log(message: any) {
    this.logger.info(this.buildLog(message));
  }

  override error(message: any, trace?: string) {
    this.logger.error({ ...this.buildLog(message), trace });
  }

  override warn(message: any) {
    this.logger.warn(this.buildLog(message));
  }

  override debug(message: any) {
    this.logger.debug(this.buildLog(message));
  }

  override verbose(message: any) {
    this.logger.info(this.buildLog(message));
  }
}
