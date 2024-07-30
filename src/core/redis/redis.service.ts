// src/core/redis/redis.service.ts
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly client: Redis) {}

  async set(key: string, value: any, expirationInSeconds: number) {
    await this.client.set(
      key,
      JSON.stringify(value),
      'EX',
      expirationInSeconds,
    );
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
