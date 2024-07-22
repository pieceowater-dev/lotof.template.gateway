// src/core/config/rabbitmq.config.ts
import { ConfigService } from '@nestjs/config';

export const createRabbitMQOptions = (configService: ConfigService) => ({
  urls: [configService.get<string>('RABBITMQ_URL')],
  queueOptions: {
    durable: false,
  },
  socketOptions: {
    heartbeatIntervalInSeconds: 60,
    reconnectTimeInSeconds: 10,
  },
});
