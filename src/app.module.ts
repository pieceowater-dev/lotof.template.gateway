// src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { HealthModule } from './health/health.module'

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
        require('apollo-server-core').ApolloServerPluginLandingPageLocalDefault({ embed: true })
      ],
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}