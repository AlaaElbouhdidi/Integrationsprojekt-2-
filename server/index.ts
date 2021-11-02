import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as functions from 'firebase-functions';

const expressServer: express.Express = express();

const createFunction = async (
  expressInstance: express.Express,
): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const config = new DocumentBuilder()
    .setTitle('Mate Team API')
    .setDescription('Dokumentation der API von Mate Team')
    .setVersion('1.0')
    .addTag('ip2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.init();
};

export const api = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  });
