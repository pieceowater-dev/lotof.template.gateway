// src/health/health.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { GateMicroservicesProvider } from '../microservices/microservices.provider';

@Resolver()
export class HealthResolver {
  constructor(private templateProvider: GateMicroservicesProvider) {}

  @Query(() => String)
  async health(): Promise<string> {
    try {
      const responses = await Promise.all([
        this.templateProvider
          .sendWithTimeout<string, string>('ping', '', 50)
          .toPromise(),
      ]);

      if (responses.every((res) => res === 'PONG')) {
        return 'OK';
      } else {
        return 'Some services are not responding with PONG';
      }
    } catch (error) {
      return 'Some services are not reachable';
    }
  }
}
