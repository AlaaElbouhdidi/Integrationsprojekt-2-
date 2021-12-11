import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import * as admin from 'firebase-admin';
import { TeamModule } from '../team.module';

describe('TeamController', () => {
    let controller: TeamController;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [TeamModule]
        }).compile();
        controller = module.get<TeamController>(TeamController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
