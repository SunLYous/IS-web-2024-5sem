import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { ElapsedTimeInterceptor } from './elapsed-time-interceptor/elapsed-time-interceptor.interceptor';
import { CacheInterceptor } from './etag/etag.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ElapsedTimeInterceptor());
  app.useGlobalInterceptors(new CacheInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Fruit Store API')
    .setDescription('Документация для REST API фруктового магазина')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useStaticAssets(join(__dirname, '..', 'static', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'static', 'views'));

  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'static', 'views', 'partials'));

  await app.listen(process.env.Port || 3000);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}

bootstrap();
