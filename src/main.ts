import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Transform payloads to be objects typed according to their DTO classes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );

  await app.listen(3000);
  // // view routes
  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  // console.dir(router, {depth: null});
}
bootstrap();
