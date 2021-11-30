import { getApp } from './utils/getApp';
import { ServiceAccount } from 'firebase-admin';
import { environment } from '@env';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseServiceAccount from './serviceAccount.json';

const { project_id, client_email, private_key } = firebaseServiceAccount;

const serviceAccount: ServiceAccount = {
    projectId: project_id,
    clientEmail: client_email,
    privateKey: private_key,
};

if (!admin.apps.length)
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

async function bootstrap() {
    const app = await getApp();
    await app.listen(environment.port, async () => {
        console.log(`Server started on http://localhost:${environment.port}`);
    });
}

bootstrap();

