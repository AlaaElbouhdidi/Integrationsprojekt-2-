import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { EventModule } from '../event/event.module';
import { GroupModule } from '../group/group.module';
import { GameModule } from '../game/game.module';
import { TeamModule } from '../team/team.module';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { join } from 'path';
/**
 * The AppModule
 * */
@Module({
    imports: [
        FirebaseModule,
        EventModule,
        GroupModule,
        GameModule,
        TeamModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'docs'),
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: FirebaseAuthGuard,
        },
    ],
})
export class AppModule {}
