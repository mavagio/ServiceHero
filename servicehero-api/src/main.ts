import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({origin: 'http://localhost:3000', methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH', 'UPDATE']});
  await app.listen(process.env.PORT);
}
bootstrap();
