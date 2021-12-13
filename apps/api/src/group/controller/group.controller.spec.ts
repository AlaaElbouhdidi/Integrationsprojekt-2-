import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from '../service/group.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import * as admin from 'firebase-admin';

describe('GroupController', () => {
    let controller: GroupController;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            controllers: [GroupController],
            providers: [GroupService]
        }).compile();

        controller = module.get<GroupController>(GroupController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
