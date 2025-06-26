import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';

import { LoggerModule } from './logger/logger.module';
import { CustomThrottlerGuard } from 'src/common/guards/throttle.guard';

import dbConfig from './config/db.config';
import cacheConfig from './config/cache.config';
import throttleConfig from './config/throttle.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        dbConfig,
        cacheConfig,
        throttleConfig,
      ],
    }),

    LoggerModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),

    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
    }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('throttle'),
    }),

    ScheduleModule.forRoot(),
  ],
  exports: [LoggerModule, TypeOrmModule, CacheModule, ThrottlerModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class CoreModule {}
