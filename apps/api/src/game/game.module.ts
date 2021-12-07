import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { GameGateway } from './gateway/game.gateway';
/**
 * The GameModule
 * */
@Module({
    controllers: [GameController],
    providers: [GameService, FirebaseService, GameGateway],
})
export class GameModule {}
