import { environment } from '@env';
import { getApp } from './utils/getApp';

async function bootstrap() {
    const app = await getApp();
    await app.listen(environment.port, async () => {
        console.log(`Server started on http://localhost:${environment.port}`);
    });
}

bootstrap();

