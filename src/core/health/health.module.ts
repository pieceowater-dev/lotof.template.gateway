// src/health/health.module.ts
import { Module } from '@nestjs/common';
import { HealthResolver } from './health.resolver';
import { MicroservicesModule } from '../microservices/microservices.module';

@Module({
  imports: [MicroservicesModule],
  providers: [HealthResolver],
})
export class HealthModule {}
