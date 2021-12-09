import { Module } from '@nestjs/common';
import { TeamService } from './service/team.service';
import { TeamController } from './controller/team.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { TeamGateway } from './gateway/team.gateway';
import { TeamOwnerGuard } from './guards/team.owner.guard';
/**
 * The TeamModule
 * */
@Module({
    controllers: [TeamController],
    providers: [TeamService, FirebaseService, TeamGateway, TeamOwnerGuard],
    exports: [TeamService, FirebaseService, TeamGateway, TeamOwnerGuard],
})
export class TeamModule {}
