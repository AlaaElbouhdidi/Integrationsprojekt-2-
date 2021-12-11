import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from '../service/event.service';
import { FirebaseModule } from '../../firebase/firebase.module';
import * as admin from 'firebase-admin';

describe('EventController', () => {
    let controller: EventController;

    beforeEach(async () => {
        if (!admin.apps.length) admin.initializeApp();
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            controllers: [EventController],
            providers: [EventService]
        }).compile();

        controller = module.get<EventController>(EventController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
