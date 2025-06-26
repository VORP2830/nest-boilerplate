import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

export default registerAs('redis', () => ({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  ttl: parseInt(process.env.REDIS_TTL, 10),
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
}));
