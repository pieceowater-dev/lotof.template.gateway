import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { MicroservicesModule } from '../../core/microservices/microservices.module';

@Module({
  imports: [MicroservicesModule],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
