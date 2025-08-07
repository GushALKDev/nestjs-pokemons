import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get('port');

  app.setGlobalPrefix('api/v2'); // Set global prefix for all routes

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(port);
}
bootstrap();
