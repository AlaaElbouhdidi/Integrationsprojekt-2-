import { getApp } from './getApp';

test('Returns NestExpressApplication', async () => {
    const app = await getApp();
    expect(app).toBeDefined();
});
