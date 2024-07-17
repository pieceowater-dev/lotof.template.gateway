// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigAppModule } from './config/config.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigAppModule, RabbitmqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
