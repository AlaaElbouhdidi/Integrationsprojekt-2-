import { Module } from '@nestjs/common';
import { TeamService } from './service/team.service';
import { TeamController } from './controller/team.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { TeamGateway } from './gateway/team.gateway';
/**
 * The TeamModule
 * */
@Module({
    controllers: [TeamController],
    providers: [TeamService, FirebaseService, TeamGateway],
})
export class TeamModule {}
