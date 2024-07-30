// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HealthModule } from './core/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroservicesModule } from './core/microservices/microservices.module';
import { ItemsModule } from './services/items/items.module';
import { RedisModule } from './core/redis/redis.module';
import { IdempotencyInterceptor } from './core/interceptors/idempotency.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

// noinspection TypeScriptValidateTypes
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('apollo-server-core').ApolloServerPluginLandingPageLocalDefault(
          { embed: true },
        ),
      ],
    }),
    MicroservicesModule,
    HealthModule,
    RedisModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencyInterceptor,
    },
  ],
})
export class AppModule {}
