import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseModule } from '../../firebase/firebase.module';
import { AppGateway } from './app.gateway';

describe('AppGateway', () => {
    let gateway: AppGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [AppGateway],
        }).compile();

        gateway = module.get<AppGateway>(AppGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
