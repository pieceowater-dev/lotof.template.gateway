import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroservicesProvider } from '@pieceowater-dev/lotof.lib.broadcaster';

@Injectable()
export class TemplateGateMicroservicesProvider extends MicroservicesProvider {
  constructor(
    @Inject('TEMPLATE_SERVICE') protected templateClient: ClientProxy,
  ) {
    super(templateClient);
  }
}
