import { getApp } from './getApp';
import * as admin from 'firebase-admin';
if (!admin.apps.length) admin.initializeApp();

test('Returns NestExpressApplication', async () => {
    const app = await getApp();
    expect(app).toBeDefined();
});
