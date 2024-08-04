// src/health/health.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { TemplateGateMicroservicesProvider } from '../microservices/microservices.template-provider';

@Resolver()
export class HealthResolver {
  constructor(private templateProvider: TemplateGateMicroservicesProvider) {}

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
