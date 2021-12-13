import { Test, TestingModule } from '@nestjs/testing';
import { TeamGateway } from './team.gateway';

describe('TeamGateway', () => {
    let gateway: TeamGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TeamGateway]
        }).compile();

        gateway = module.get<TeamGateway>(TeamGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
