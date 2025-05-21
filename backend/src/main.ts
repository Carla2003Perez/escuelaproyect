import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // ← Esto es clave para conectar frontend con backend
  await app.listen(3000);
}
bootstrap();
