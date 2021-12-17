import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // vai deixar passar apenas se tiver os parametros corretos
      forbidNonWhitelisted: true, // se tiver atributos a mais é barrado a request
      transform: true, // tipa a requisição igual está no modelo de dto
    }),
  );
  await app.listen(3000);
  const urlApp = await app.getUrl();
  console.log(`Application is running on ${urlApp}`);
}
bootstrap();
