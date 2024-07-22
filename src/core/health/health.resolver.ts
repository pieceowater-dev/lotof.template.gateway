// src/health/health.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError, timeout } from 'rxjs';

@Resolver()
export class HealthResolver {
  constructor(
    @Inject('TEMPLATE_SERVICE') private readonly templateClient: ClientProxy,
  ) {}

  @Query(() => String)
  async health(): Promise<string> {
    try {
      const responses = await Promise.all([
        this.templateClient
          .send<string, string>('ping', '')
          .pipe(
            timeout(10000),
            catchError((err) => {
              if (err.name === 'TimeoutError') {
                throw new Error('Request timed out');
              }
              return throwError(err);
            }),
          )
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
