import * as functions from 'firebase-functions';
import { getApp, expressInstance } from './utils/getApp';

export const api = functions
    .region('europe-west1')
    .https.onRequest(async (request, response) => {
        await getApp().then((app) => app.init());
        expressInstance(request, response);
    });
