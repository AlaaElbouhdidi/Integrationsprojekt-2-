import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import * as admin from 'firebase-admin';
import { GameModule } from '../game.module';

describe('GameController', () => {
    let controller: GameController;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [GameModule]
        }).compile();

        controller = module.get<GameController>(GameController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
