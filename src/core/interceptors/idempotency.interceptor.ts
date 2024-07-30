import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { GqlExecutionContext } from '@nestjs/graphql';
import { createHash } from 'crypto';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;

    const keyFromReq: string | undefined = this.findIdempotencyKey(req.body);

    const idempotencyKey = keyFromReq
      ? keyFromReq
      : this.createIdempotencyKey(req.headers, req.body) || uuidv4();

    const cachedResult = await this.redisService.get(idempotencyKey);
    if (cachedResult) {
      const res = { ...cachedResult, ...{ idempotencyKey: idempotencyKey } };
      console.log(res);
      return of(res);
    }

    return next.handle().pipe(
      tap(async (result) => {
        await this.redisService.set(idempotencyKey, result, 60);
      }),
    );
  }

  private createIdempotencyKey(headers: any, body: any): string {
    const data = {
      headers,
      body,
    };
    return createHash('md5').update(JSON.stringify(data)).digest('hex');
  }

  private findIdempotencyKey(obj: any): string | undefined {
    if (obj === null || obj === undefined) {
      return undefined;
    }

    if (typeof obj === 'object') {
      if ('idempotencyKey' in obj) {
        return obj.idempotencyKey;
      }
      for (const key of Object.keys(obj)) {
        const value = this.findIdempotencyKey(obj[key]);
        if (value) {
          return value;
        }
      }
    }

    return undefined;
  }
}
