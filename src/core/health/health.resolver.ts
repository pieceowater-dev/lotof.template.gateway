// src/health/health.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Resolver()
export class HealthResolver {
  constructor(
    @Inject('TEMPLATE_SERVICE') private readonly templateClient: ClientProxy,
  ) {}

  @Query(() => String)
  async health(): Promise<string> {
    try {
      const responses = await Promise.all([
        this.templateClient.send<string, string>('ping', '').toPromise(),
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
