import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { GameGateway } from './gateway/game.gateway';
import { GameOwnerGuard } from './guards/game.owner.guard';
import { GroupService } from '../group/service/group.service';
/**
 * The GameModule
 * */
@Module({
    controllers: [GameController],
    providers: [
        GameService,
        FirebaseService,
        GameGateway,
        GameOwnerGuard,
        GroupService
    ],
    exports: [GameService, FirebaseService, GameGateway, GameOwnerGuard]
})
export class GameModule {}
