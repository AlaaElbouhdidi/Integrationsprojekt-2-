import { getApp } from './utils/getApp';
import * as express from 'express';

/**
 * Function that bootstraps the server
 */
async function bootstrap() {
    const instance = express();
    const app = await getApp(instance);
    app.listen(8000);
}

bootstrap();
