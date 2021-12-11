import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseModule } from '../../firebase/firebase.module';
import { TeamService } from './team.service';
import * as admin from 'firebase-admin';

describe('TeamService', () => {
    let service: TeamService;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [TeamService],
        }).compile();

        service = module.get<TeamService>(TeamService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
