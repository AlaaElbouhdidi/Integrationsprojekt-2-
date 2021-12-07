import { Test, TestingModule } from '@nestjs/testing';
import { EventModule } from '../../event/event.module';
import { FirebaseModule } from '../../firebase/firebase.module';
import { AppGateway } from './app.gateway';
import * as admin from 'firebase-admin';
if (!admin.apps.length) admin.initializeApp();

describe('AppGateway', () => {
    let gateway: AppGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule, EventModule],
            providers: [AppGateway]
        }).compile();

        gateway = module.get<AppGateway>(AppGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
