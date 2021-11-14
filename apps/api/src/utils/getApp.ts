import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as firebase from 'firebase-admin';

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
    if (firebase.apps.length === 0) {
        this.firebaseApp = firebase.initializeApp();
    }
    const config = new DocumentBuilder()
        .setTitle('Mate Team API')
        .setDescription('Dokumentation der API von Mate Team')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    app.enableCors();
    return app;
}
