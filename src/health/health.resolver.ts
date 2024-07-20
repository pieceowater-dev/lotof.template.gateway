// src/health/health.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { greet } from '@pieceowater-dev/lotof.lib.broadcaster';

@Resolver()
export class HealthResolver {
  @Query(() => String)
  health(): string {
    console.log(greet('pieceowater'));
    return 'OK';
  }
}
