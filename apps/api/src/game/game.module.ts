import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';

@Module({
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}
