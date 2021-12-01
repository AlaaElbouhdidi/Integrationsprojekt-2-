import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { environment } from '@env';
import { join } from 'path';
import { ServiceAccount } from 'firebase-admin';
import * as express from 'express';
import * as firebaseServiceAccount from '../serviceAccount.json';
import * as admin from 'firebase-admin';
import * as packagejson from '../package.json';

/**
 * Instance that is required to initialize the app
 */
export const expressInstance: express.Express = express();
/**
 * Function that returns the app
 * @returns {INestApplication}
 */

export async function getApp(): Promise<INestApplication> {
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
    const server = new ExpressAdapter(expressInstance);
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        server
    );
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useStaticAssets(join(__dirname, 'docs', 'mate-team'), {
        prefix: '/docs/mate-team',
    });
    app.useStaticAssets(join(__dirname, 'docs', 'api'), {
        prefix: '/docs/api/',
    });
    // app.useStaticAssets(join(__dirname, '..', 'mate-team'), {
    //     prefix: '/',
    // });
    const config = new DocumentBuilder()
        .setTitle('Mate Team API')
        .addServer(environment.apiUrl)
        .setDescription(packagejson.description)
        .setVersion(packagejson.version)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs/swagger', app, document);
    app.enableCors();
    return app;
}
