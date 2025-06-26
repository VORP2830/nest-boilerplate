import { Global, Module } from '@nestjs/common';
import { Logger, ConsoleLogger } from '@nestjs/common';
import { LoggerService } from './pino.logger';

@Global()
@Module({
  providers: [
    {
      provide: Logger,
      useClass: LoggerService,
    },
    {
      provide: ConsoleLogger,
      useClass: LoggerService,
    },
    LoggerService,
  ],
  exports: [Logger, ConsoleLogger, LoggerService],
})
export class LoggerModule {}
