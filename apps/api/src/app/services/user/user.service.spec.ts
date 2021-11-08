import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { FirebaseModule } from '../../modules/firebase.module';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
