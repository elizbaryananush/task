import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api')
  app.use(cookie_parser())
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(3001);
}
bootstrap();
