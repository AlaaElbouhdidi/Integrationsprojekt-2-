import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { UserModule } from '../user/user.module';
import { EventModule } from '../event/event.module';
import { GroupModule } from '../group/group.module';
import { GameModule } from '../game/game.module';
import { TeamModule } from '../team/team.module';

@Module({
    imports: [
        FirebaseModule,
        UserModule,
        EventModule,
        GroupModule,
        GameModule,
        TeamModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
