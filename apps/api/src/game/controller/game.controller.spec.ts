import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from '../service/game.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import * as admin from 'firebase-admin';

describe('GameController', () => {
    let controller: GameController;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            controllers: [GameController],
            providers: [GameService],
        }).compile();

        controller = module.get<GameController>(GameController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
