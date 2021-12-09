import { Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventController } from './controller/event.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { EventGateway } from './gateway/event.gateway';
import { EventOwnerGuard } from './guards/event.owner.guard';



/**
 * The EventModule
 * */
@Module({
    controllers: [EventController],
    providers: [EventService, FirebaseService, EventGateway, EventOwnerGuard],
    exports: [EventService, FirebaseService, EventGateway, EventOwnerGuard]
})
export class EventModule {}
