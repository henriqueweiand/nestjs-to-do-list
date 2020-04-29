import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import projectConfig from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('NestJS testes')
    .setDescription('The testes')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey' }, 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(projectConfig.port);
  logger.log(`Application listening on port ${projectConfig.port}`);
}
bootstrap();
