import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { environment } from '@env';
import * as express from 'express';
import * as packagejson from '../package.json';
import { join } from 'path';
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
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        server
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useStaticAssets(join(__dirname, 'docs', 'mate-team'), {
        prefix: '/docs/mate-team',
    });
    app.useStaticAssets(join(__dirname, 'docs', 'api'), {
        prefix: '/docs/api/',
    });
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
