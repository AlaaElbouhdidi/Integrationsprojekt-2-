import { Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventController } from './controller/event.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
import { EventGateway } from './gateway/event.gateway';
/**
 * The EventModule
 * */
@Module({
    controllers: [EventController],
    providers: [EventService, FirebaseService, EventGateway],
    exports: [EventService, FirebaseService, EventGateway],
})
export class EventModule {}
