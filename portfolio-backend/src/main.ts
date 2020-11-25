import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(MyLogger));
  await app.listen(3000);
}
bootstrap();
