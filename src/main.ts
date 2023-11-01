import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.APP_PORT || 5000;
  const options = new DocumentBuilder()
    .setTitle('Backend Fullstack Challenge')
    .setDescription('Backend API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .setExternalDoc('Download Collection', '/backend/docs-json')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  if (process.env?.NODE_ENV !== 'prod')
    SwaggerModule.setup('backend/docs', app, document);
  await app.listen(port);
  console.log('Backend Fullstack Challenge Running on port ' + port);
}
bootstrap();
