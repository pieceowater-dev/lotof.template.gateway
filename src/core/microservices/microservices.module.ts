// src/microservices/microservices.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { createRabbitMQOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TEMPLATE_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          ...createRabbitMQOptions('template_queue', configService),
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesModule {}
