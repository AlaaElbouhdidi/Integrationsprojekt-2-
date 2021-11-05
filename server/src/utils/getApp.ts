import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

/**
 * Function that returns the app
 * @returns {INestApplication}
 */
export async function getApp(instance: express.Express): Promise<INestApplication> {
    const server = new ExpressAdapter(instance);
    const app = await NestFactory.create(AppModule, server);
    const config = new DocumentBuilder()
        .setTitle('Mate Team API')
        .setDescription('Dokumentation der API von Mate Team')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    return app;
}
