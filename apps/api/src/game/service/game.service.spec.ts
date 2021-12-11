import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import * as admin from 'firebase-admin';

describe('GameService', () => {
    let service: GameService;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [GameService]
        }).compile();

        service = module.get<GameService>(GameService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
