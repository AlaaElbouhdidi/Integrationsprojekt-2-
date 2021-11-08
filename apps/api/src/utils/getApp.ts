import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount, AppOptions } from 'firebase-admin';
import * as express from 'express';
import * as admin from 'firebase-admin';

/**
 * Instance that is required to initialize the app
 */
export const expressInstance: express.Express = express();

/**
 * Function that returns the app
 * @returns {INestApplication}
 */
export async function getApp(): Promise<INestApplication> {
    const server = new ExpressAdapter(expressInstance);
    const app = await NestFactory.create(AppModule, server);
    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const adminConfig: ServiceAccount = {
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g,'\n'),
        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };
    const options: AppOptions = {
        credential: admin.credential.cert(adminConfig)
    }
    admin.initializeApp(options, "Mate Team")
    const config = new DocumentBuilder()
        .setTitle('Mate Team API')
        .setDescription('Dokumentation der API von Mate Team')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    app.enableCors();
    return app;
}
