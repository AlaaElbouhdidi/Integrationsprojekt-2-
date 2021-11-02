import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './src/app.module';
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
  await app.init();
};

export const api = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  });
