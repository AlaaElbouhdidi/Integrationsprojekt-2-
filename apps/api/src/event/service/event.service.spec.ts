import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseModule } from '../../firebase/firebase.module';
import { EventService } from './event.service';
import * as admin from 'firebase-admin';

describe('EventService', () => {
    let service: EventService;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [EventService]
        }).compile();

        service = module.get<EventService>(EventService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
