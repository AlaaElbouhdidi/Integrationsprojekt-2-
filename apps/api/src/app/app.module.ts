import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { EventModule } from '../event/event.module';
import { GroupModule } from '../group/group.module';
import { GameModule } from '../game/game.module';
import { TeamModule } from '../team/team.module';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { AppGateway } from './gateway/app.gateway';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
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
            rootPath: join(__dirname, '..', 'mate-team'),
            exclude: ['/api*','/docs*'],
            serveStaticOptions: {
                redirect: false
            }
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AppGateway,
        {
            provide: APP_GUARD,
            useClass: FirebaseAuthGuard,
        },
    ],
})
export class AppModule {}
