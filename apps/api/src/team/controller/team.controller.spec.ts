import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from '../service/team.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import * as admin from 'firebase-admin';

describe('TeamController', () => {
    let controller: TeamController;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            controllers: [TeamController],
            providers: [TeamService],
        }).compile();

        controller = module.get<TeamController>(TeamController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
