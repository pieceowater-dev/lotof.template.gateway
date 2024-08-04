// src/microservices/microservices.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { createRabbitMQOptions } from '../config/rabbitmq.config';
import { TemplateGateMicroservicesProvider } from './microservices.template-provider';

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
  providers: [TemplateGateMicroservicesProvider],
  exports: [ClientsModule, TemplateGateMicroservicesProvider],
})
export class MicroservicesModule {}
