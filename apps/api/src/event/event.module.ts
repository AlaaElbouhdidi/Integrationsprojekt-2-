import { Logger, Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventController } from './controller/event.controller';
import { FirebaseService } from '../firebase/service/firebase.service';
/**
 * The EventModule
 * */
@Module({
    controllers: [EventController],
    providers: [EventService, FirebaseService, Logger],
})
export class EventModule {}
