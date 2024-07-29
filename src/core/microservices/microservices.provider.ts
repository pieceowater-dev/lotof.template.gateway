import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroservicesProvider } from '@pieceowater-dev/lotof.lib.broadcaster';

@Injectable()
export class GateMicroservicesProvider extends MicroservicesProvider {
  constructor(@Inject('TEMPLATE_SERVICE') protected client: ClientProxy) {
    super(client);
  }
}
