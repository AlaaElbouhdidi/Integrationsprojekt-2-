import { Module } from '@nestjs/common';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { GroupGateway } from './gateway/group.gateway';
import { GroupOwnerGuard } from './guards/group.owner.guard';
/**
 * The GroupModule
 * */
@Module({
    controllers: [GroupController],
    providers: [GroupService, FirebaseService, GroupGateway, GroupOwnerGuard],
    exports: [GroupService, FirebaseService, GroupGateway, GroupOwnerGuard]
})
export class GroupModule {}
