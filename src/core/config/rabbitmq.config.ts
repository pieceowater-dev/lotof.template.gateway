// src/core/config/rabbitmq.config.ts
import { ConfigService } from '@nestjs/config';
import { ClientProvider, Transport } from '@nestjs/microservices';

export const createRabbitMQOptions = (
  queue: string,
  configService: ConfigService,
): ClientProvider => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>('RABBITMQ_URL')],
    queue: queue,
    queueOptions: {
      durable: true,
    },
    socketOptions: {
      heartbeatIntervalInSeconds: 60,
      reconnectTimeInSeconds: 10,
    },
  },
});
