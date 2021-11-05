import { getApp } from './utils/getApp';

/**
 * Function that bootstraps the server
 */
async function bootstrap() {
    const app = await getApp();
    app.listen(8000);
}

bootstrap();
