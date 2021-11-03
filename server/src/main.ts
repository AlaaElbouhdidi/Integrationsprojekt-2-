import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Mate Team API')
        .setDescription('Dokumentation der API von Mate Team')
        .setVersion('1.0')
        .addTag('ip2')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(8000);
}
bootstrap();
