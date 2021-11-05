import { getApp } from './getApp';
import * as express from 'express';

test('Returns NestExpressApplication', async () => {
    const app = await getApp(express());
    expect(app).toBeDefined();
});
