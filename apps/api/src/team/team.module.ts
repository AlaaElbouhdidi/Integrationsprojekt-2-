import { Module } from '@nestjs/common';
import { TeamService } from './service/team.service';
import { TeamController } from './controller/team.controller';

@Module({
    controllers: [TeamController],
    providers: [TeamService],
})
export class TeamModule {}
