import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './firebase/firebase-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Expense Tracker API')
    .setDescription('API docs for Expense Tracker with Firebase Auth')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalGuards(app.get(AuthGuard));

  await app.listen(8000);
  console.log('Server running on http://localhost:8000');
  console.log('Swagger docs: http://localhost:8000/api');
}
bootstrap();
