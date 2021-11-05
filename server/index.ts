import * as functions from 'firebase-functions';
import * as express from 'express';
import { getApp } from './src/utils/getApp';

const expressServer: express.Express = express();

const createFunction = async (expressInstance: express.Express): Promise<void> => {
    const app = await getApp(expressInstance);
    await app.init();
};

export const api = functions
    .region('europe-west1')
    .https.onRequest(async (request, response) => {
        await createFunction(expressServer);
        expressServer(request, response);
    });
