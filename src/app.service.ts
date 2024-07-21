// src/app.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('TEMPLATE_SERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello Universe!';
  }

  async pingTemplateMicroservice(): Promise<string> {
    console.log('ping sent!');
    return this.client.send<string, string>('ping', '').toPromise();
  }
}
