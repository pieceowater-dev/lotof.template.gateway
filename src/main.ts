import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // check to config -> https://docs.nestjs.com/techniques/validation
    } as ValidationPipeOptions),
  );

  const configService = app.get(ConfigService);

  // noinspection TypeScriptValidateTypes
  const port = configService.get<number>('PORT') || 3000;

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
