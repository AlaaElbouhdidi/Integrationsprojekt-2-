import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseModule } from '../../firebase/firebase.module';
import { GroupService } from './group.service';
import * as admin from 'firebase-admin';

describe('GroupService', () => {
    let service: GroupService;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [GroupService],
        }).compile();

        service = module.get<GroupService>(GroupService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
