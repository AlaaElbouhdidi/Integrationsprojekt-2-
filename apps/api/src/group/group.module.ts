import { Module } from '@nestjs/common';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
/**
 * The GroupModule
 * */
@Module({
    controllers: [GroupController],
    providers: [GroupService, FirebaseService],
})
export class GroupModule {}
